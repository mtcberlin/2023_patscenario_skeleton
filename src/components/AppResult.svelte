<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import {
		storeTableData,
		storeUserCho,
		storeUserCountries,
		storeShowEdit,
		storeChartData,
	} from '../routes/stores.js';
	import ResultTable from './ResultTable.svelte';
	
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


	//LAYERCAKE
	import { LayerCake, ScaledSvg, Html, flatten } from 'layercake';
  import { stack } from 'd3-shape';
  import { scaleOrdinal } from 'd3-scale';
  import { format, precisionFixed } from 'd3-format';
  import { timeParse, timeFormat } from 'd3-time-format';

  import AxisX from '../components/AxisX.html.svelte';
  import AxisY from '../components/AxisY.html.svelte';
  import AreaStacked from '../components/AreaStacked.svelte';

  // This example loads csv data as json using @rollup/plugin-dsv
	import data from '../_data/fruit';
	$: console.log("ChartData", $storeChartData);

  const xKey = 'month';
  const yKey = [0, 1];
  const zKey = 'key';

  const parseDate = timeParse('%Y-%m-%d');

  const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
  const seriesColors = ['#ff00cc', '#ff7ac7', '#ffb3c0', '#ffe4b8'];

  data.forEach(d => {
    d[xKey] = typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey];
    seriesNames.forEach(name => {
      d[name] = +d[name];
    });
  });

  /* --------------------------------------------
   * Create a stacked data structure
   */
  const stackData = stack()
    .keys(seriesNames);

  const series = stackData(data);

  const formatTickX = timeFormat('%b. %-d')
  const formatTickY = d => format(`.${precisionFixed(d)}s`)(d);

  
</script>

<!-- {JSON.stringify($storeTableData)} -->
<div use:scrollTo>
	<ResultTable />
</div><br><br>
<div class="chart-container">
	<LayerCake
	  ssr={true}
	  percentRange={true}
	  padding={{ top: 0, right: 0, bottom: 20, left: 17 }}
	  x={d => d.data[xKey]}
	  y={yKey}
	  z={zKey}
	  zScale={scaleOrdinal()}
	  zDomain={seriesNames}
	  zRange={seriesColors}
	  flatData={flatten(series)}
	  data={series}
	>
	  <Html>
		<AxisX
		  formatTick={formatTickX}
		  tickMarks={true}
		/>
		<AxisY
		  baseline={true}
		  formatTick={formatTickY}
		/>
	  </Html>
	  <ScaledSvg>
		<AreaStacked/>
	  </ScaledSvg>
	</LayerCake>
  </div>