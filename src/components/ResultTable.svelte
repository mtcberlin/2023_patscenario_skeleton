<script lang="ts">
	import { storeTableData, storeChartData } from '../routes/stores.js';

	//needs to stay
	$: table = Object.values($storeTableData);



</script>


<div class="table-wrp table-container">
	<table class="relative table table-cell-fit	">
		<thead>
			<tr>
				<th class="sticky">Country</th>
				<th class="sticky">Fee Type</th>
				<th class="sticky">Language</th>
				<th class="sticky">Complexity</th>
				<th class="sticky">Year 1</th>
				<th class="sticky">Year 2</th>
				<th class="sticky">Year 3</th>
				<th class="sticky">Year 4</th>
				<th class="sticky">Year 5</th>
				<th class="sticky">Year 6</th>
				<th class="sticky">Year 7</th>
				<th class="sticky">Year 8</th>
				<th class="sticky">Year 9</th>
				<th class="sticky">Year 10</th>
				<th class="sticky">Year 11</th>
				<th class="sticky">Year 12</th>
				<th class="sticky">Year 13</th>
				<th class="sticky">Year 14</th>
				<th class="sticky">Year 15</th>
				<th class="sticky">Year 16</th>
				<th class="sticky">Year 17</th>
				<th class="sticky">Year 18</th>
				<th class="sticky">Year 19</th>
				<th class="sticky">Year 20</th>
			</tr>
		</thead>
		<tbody class="divide-y">
			{#each table as values, i}
				<tr>
					<td>{values['year_1']['country_name']}</td>
					<td>Maintenance Fee</td>
					<td>{values['year_1']['uip_multiselect_country_filing_Lang']}</td>
					<td>{values['year_1']['uip_complexity']}</td>
					{#each Object.keys(values) as year}
						<td>{values[year].maintenance_fee}</td>
					{/each}
				</tr>
				<tr>
					<td />
					<td>Filing Fee</td>
					<td />
					<td />
					{#each Object.keys(values) as year}
						<td>{values[year].filing_fee}</td>
					{/each}
				</tr>
				<tr>
					<td />
					<td>Examination Fee</td>
					<td />
					<td />
					{#each Object.keys(values) as year}
						<td>{values[year].examination_fee}</td>
					{/each}
				</tr>
				<tr>
					<td />
					<td>Publication Fee</td>
					<td />
					<td />
					{#each Object.keys(values) as year}
						<td>{values[year].publication_fee}</td>
					{/each}
				</tr>
				<tr>
					<td />
					<td>Grant Fee</td>
					<td />
					<td />
					{#each Object.keys(values) as year}
						<td>{values[year].grant_fee}</td>
					{/each}
				</tr>
				<tr>
					<td />
					<td>Attorney Fee</td>
					<td />
					<td />
					{#each Object.keys(values) as year}
						<td>{values[year].attorney_fee}</td>
					{/each}
				</tr>
				<tr>
					<td />
					<td>Translation Fee</td>
					<td />
					<td />
					{#each Object.keys(values) as year}
						<td>{values[year].translation_fee}</td>
					{/each}
				</tr>
				<tr>
					<td />
					<td class="font-bold">Sum</td>
					<td />
					<td />
					{#each Object.keys(values) as year}
						<td class="font-bold">{values[year].sum_fee}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
