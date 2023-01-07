<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import {
		storeTableData,
		storeUserCho,
		storeUserCountries,
		storeShowEdit,
		storeChartData
	} from '../routes/stores.js';
	import RadialStackedBar from './RadialStackedBar.svelte';
	import ResultTable from './ResultTable.svelte';
	import { onMount } from 'svelte';

	//Scoll to top of page on load

	onMount(() => {
		const pageContentElement = document.getElementById('page-content');
		pageContentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});

	// Handle Show Hide Edit Form
	$: $storeUserCountries, updateTableData();
	$storeShowEdit = false;

	// Get Fees based on years (i)

	function getFilingFee(i, filingFee) {
		if (i === 1) {
			return filingFee;
		} else {
			return 0;
		}
	}
	function getExaminationFee(i, examinationFee) {
		if (i === 2) {
			return examinationFee;
		} else {
			return 0;
		}
	}
	function getPublicationFee(i, publicationFee) {
		if (i === 2) {
			return publicationFee;
		} else {
			return 0;
		}
	}
	function getGrantFee(i, grantFee) {
		if (i === 3) {
			return grantFee;
		} else {
			return 0;
		}
	}
	// Get Attorney - Fees

	function getAttorneyFees(
		i,
		uip_complexity,
		uip_basic_fee,
		uip_quick_examination,
		uip_normal_examination,
		uip_extended_examination
	) {
		if (i === 1 && uip_complexity === 'quick') {
			return parseInt(uip_basic_fee, 10) + parseInt(uip_quick_examination, 10);
		} else if (i === 1 && uip_complexity === 'normal') {
			return parseInt(uip_basic_fee, 10) + parseInt(uip_normal_examination, 10);
		} else if (i === 1 && uip_complexity === 'extended') {
			return parseInt(uip_basic_fee, 10) + parseInt(uip_extended_examination, 10);
		} else if (i === 2 && uip_complexity === 'quick') {
			return parseInt(uip_quick_examination, 10);
		} else if (i >= 1 && i <= 3 && uip_complexity === 'normal') {
			return parseInt(uip_normal_examination, 10);
		} else if (i >= 1 && i <= 6 && uip_complexity === 'extended') {
			return parseInt(uip_extended_examination, 10);
		} else {
			return 0;
		}
	}

	// Translation needed?

	function compareTranslations(translationFrom, translationTo) {
		if (
			translationFrom === null ||
			translationFrom === undefined ||
			translationTo === null ||
			translationTo === undefined
		) {
			return 'no';
		}
		let translationNeeded = 'no';

		try {
			const uipLanguages = translationFrom.split(',');
			const nationalLanguages = translationTo.split(',');
			for (const language of nationalLanguages) {
				if (!uipLanguages.includes(language)) {
					translationNeeded = 'yes';
					break;
				}
			}
		} catch (e) {
			console.log('Error while comparing translations', e);
		}

		return translationNeeded;
	}

	// Translation costs

	console.log($storeUserCho.uip_multiselect_country_filing);
	function translationgetcost(i, translationFrom, translationTo) {
		if (
			translationFrom === null ||
			translationFrom === undefined ||
			translationTo === null ||
			translationTo === undefined
		) {
			return '0';
		}
		let translationcosts = 0;

		const uipLanguages = translationFrom.split(',');
		const nationalLanguages = translationTo.split(',');
		for (const language of nationalLanguages) {
			if (!uipLanguages.includes(language) && i === 1) {
				translationcosts =
					(Number($storeUserCho.uip_words_claims) + Number($storeUserCho.uip_words)) *
					Number($storeUserCho.uip_translation_fee);
				break;
			}
		}
		return translationcosts;
	}
	// build Array for Table & Charts

	const updateTableData = () => {
		const result = Object.values($storeUserCountries)
			.sort((a, b) => {
				if (a.country_name < b.country_name) {
					return -1;
				} else if (a.country_name > b.country_name) {
					return 1;
				} else {
					return 0;
				}
			})
			.reduce((acc, item) => {
				acc[item.country_code] = {};

				for (let i = 1; i <= 20; i++) {
					const property = `year_${i}`;
					acc[item.country_code][property] = {
						year: i,
						filing_fee: getFilingFee(i, item.filing_fee),
						examination_fee: getExaminationFee(i, item.examination_fee),
						publication_fee: getPublicationFee(i, item.publication_fee),
						grant_fee: getGrantFee(i, item.grant_fee),
						uip_drawings: item.uip_drawings,
						uip_words: item.uip_words,
						attorney_fee: getAttorneyFees(
							i,
							item.uip_complexity,
							item.uip_basic_fee,
							item.uip_quick_examination,
							item.uip_normal_examination,
							item.uip_extended_examination
						),
						uip_words_claims: item.uip_words_claims,
						uip_translation_fee: item.uip_translation_fee,
						uip_pages: item.uip_pages,
						uip_complexity: item.uip_complexity,
						uip_claims: item.uip_claims,
						uip_multiselect_country_filing_subsequent:
							item.uip_multiselect_country_filing_subsequent,
						uip_multiselect_country_filing_Lang: item.uip_multiselect_country_filing_Lang,
						country_name: item.country_name,
						country_code: item.country_code,
						translation_need: compareTranslations(
							item.uip_multiselect_country_filing_Lang,
							item.language_requirements_national
						),
						translation_fee: translationgetcost(
							i,
							item.uip_multiselect_country_filing_Lang,
							item.language_requirements_national
						),
						maintenance_fee: item[`maintenance_year_${i}`] || 0,
						sum_fee:
							getFilingFee(i, item.filing_fee) +
							getExaminationFee(i, item.examination_fee) +
							getAttorneyFees(
								i,
								item.uip_complexity,
								item.uip_basic_fee,
								item.uip_quick_examination,
								item.uip_normal_examination,
								item.uip_extended_examination
							) +
							getGrantFee(i, item.grant_fee) +
							getPublicationFee(i, item.publication_fee) +
							(item[`maintenance_year_${i}`] || 0)
					};
				}

				return acc;
			}, {});

		// console.log('result:', result);

		$storeTableData = result;
		console.log('storeTableData', $storeTableData);
	};

	// const to scroll to top of view
	const scrollTo = (node) => {
		node.scrollTo({ behavior: 'smooth', block: 'end', inline: 'nearest' });
	};

	$: console.log('storechartData', JSON.stringify($storeChartData));
</script>

<!-- {JSON.stringify($storeTableData)} -->
<div use:scrollTo>
	<br /><br />
	<h2 style="margin-bottom:30px">Results</h2>
	<RadialStackedBar />
</div>
<br /><br />
<ResultTable />
