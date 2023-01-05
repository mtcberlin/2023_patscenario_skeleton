<script lang="ts">
	import { storeTableData, storeChartData } from '../routes/stores.js';

	//needs to stay
	$: table = Object.values($storeTableData);



</script>

<h2 style="margin-bottom:30px">Results</h2>
<div class="table-container">
	<table class="table table-cell-fit	">
		<thead>
			<tr>
				<th>Country</th>
				<th>Fee Type</th>
				<th>Language</th>
				<th>Complexity</th>
				<th>Year 1</th>
				<th>Year 2</th>
				<th>Year 3</th>
				<th>Year 4</th>
				<th>Year 5</th>
				<th>Year 6</th>
				<th>Year 7</th>
				<th>Year 8</th>
				<th>Year 9</th>
				<th>Year 10</th>
				<th>Year 11</th>
				<th>Year 12</th>
				<th>Year 13</th>
				<th>Year 14</th>
				<th>Year 15</th>
				<th>Year 16</th>
				<th>Year 17</th>
				<th>Year 18</th>
				<th>Year 19</th>
				<th>Year 20</th>
			</tr>
		</thead>
		<tbody>
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
