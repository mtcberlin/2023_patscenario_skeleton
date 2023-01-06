import { writable, derived } from 'svelte/store';

export const chosencountries = writable(0);
export const storeTableData = writable([]);
export const storeUserVal = writable(0);
export const storeUserCho = writable([]);
export const supaData = writable([]);
export const storeShowEdit = writable();
export const storeShowResult = writable();
export const storeUserCountries = writable([]);
//We calculate the stored Chart Data
export const storeChartData = derived([storeTableData], ([storeTableData]) => {
	const chart = [];

	const countriesArray = Object.entries(storeTableData);

	countriesArray.forEach(([countryCode, countryObject]) => {
		const yearsArray = Object.entries(countryObject);

		const countryChart = yearsArray.flatMap(([year, feeObject]) => {
			return [
				{
					'Year': feeObject.year,
					'Filing Fee': feeObject.filing_fee,
					'Attorney Fee': feeObject.attorney_fee,
					'Grant Fee': feeObject.grant_fee,
					'Publication Fee': feeObject.publication_fee,
					'Examination Fee': feeObject.examination_fee,
					'Maintenance Fee': feeObject.maintenance_fee,
					'Translation Fee': feeObject.translation_fee,
					'total': feeObject.sum_fee
				}
				// {
				// 	category_A: feeObject.country_code + ' - Maintenance',
				// 	group: feeObject.year,
				// 	total: feeObject.maintenance_fee
				// },
				// {
				// 	category_A: feeObject.country_code + ' - Filing Fee',
				// 	group: feeObject.year,
				// 	total: feeObject.filing_fee
				// },
				// {
				// 	category_A: feeObject.country_code + ' - Attorney Fee',
				// 	group: feeObject.year,
				// 	total: feeObject.attorney_fee
				// },
				// {
				// 	category_A: feeObject.country_code + ' - Grant Fee',
				// 	group: feeObject.year,
				// 	total: feeObject.grant_fee
				// },
				// {
				// 	category_A: feeObject.country_code + ' - Publication Fee',
				// 	group: feeObject.year,
				// 	total: feeObject.publication_fee
				// },
				// {
				// 	category_A: feeObject.country_code + ' - Examination Fee',
				// 	group: feeObject.year,
				// 	total: feeObject.examination_fee
				// },
				// {
				// 	category_A: feeObject.country_code + ' - Translation Fee',
				// 	group: feeObject.year,
				// 	total: feeObject.translation_fee
				// }
			];
		});

		chart.push(...countryChart);
	});

	return chart;
});
