<script lang="ts">
	import { supaData, storeShowEdit, storeShowResult, storeUserCho } from '../routes/stores.js';
	import { writable, type Writable } from 'svelte/store';
	let storeMultiple: Writable<any[]> = writable(['A', 'B']);
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import MultiSelect from 'svelte-multiselect';
	export let uip_translation_fee: number;
	export let uip_pages: number;
	export let form: HTMLFormElement;
	export let editForm;
	function toggleShow() {
		$storeShowEdit = !storeShowResult;
	}

	//Scroll to top of view
	onMount(() => {
		const pageContentElement = document.getElementById('page-content');
		pageContentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
	// const to scroll to top of view
	const scrollIntoView = (node) => {
		node.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
	};
	//Transform data for multiselect
	const transformedvalues = Object.values($supaData).map((value) => {
		return { value: value.country_code, label: value.country_name };
	});
	const transformedvaluesLang = Object.values($supaData).map((value) => {
		return { value: value.country_code, label: value.country_code };
	});

	let selected: string[];
	let value: string[] = [];
	//$: console.log('Data', $supaData);
	//$: console.log('Form', $storeUserCho);
	$: showResults = false;
	$: editForm = true;
	// Input fields Config
	$: uip_multiselect_country_filing = [];
	$: uip_multiselect_country_filing_value = uip_multiselect_country_filing
		.map((country) => country.value)
		.join(',');
	$: uip_multiselect_country_filing_Lang =
		uip_multiselect_country_filing_Lang ?? form?.uip_multiselect_country_filing_Lang;
	$: uip_multiselect_country_filing_subsequent = '';
	$: selectedIds = '';
	$: uip_translation_fee = 0.15;
	$: uip_pages = 22;
	$: uip_drawings = 2;
	$: uip_claims = 12;
	$: uip_words = 15000;
	$: uip_words_claims = 2275;
	$: uip_basic_fee = 800;
	$: uip_quick_examination = 750;
	$: uip_normal_examination = 1000;
	$: uip_extended_examination = 1250;
	$: uip_complexity = 'quick';
	$: dynamic_table_rows = '';
	// $: uip_multiselect_country_filing_value = [];
	$: uip_multiselect_country_filing_Lang_value = [];
	$: uip_multiselect_country_filing_Lang_display =
		form?.uip_multiselect_country_filing_Lang_value ?? uip_multiselect_country_filing_Lang;
	$: console.log('und?', uip_multiselect_country_filing);
</script>

<form
	method="POST"
	action="?/formcalc"
	use:enhance={() =>
		({ update }) =>
			update({ reset: false })}
>
	<h2 style="margin-bottom:30px" use:scrollIntoView>Base Config</h2>

	<!-- add multiselect from tailwind ui -->
	<!-- <label for="uip_multiselect_country_filing">First filing in</label>
	<select
		class="border-primary-500 focus:bg-white"
		bind:value={uip_multiselect_country_filing}
		name="uip_multiselect_country_filing"
		multiple
	>
		
		{#each transformedvalues as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	<pre>selected = {JSON.stringify(selected)}</pre>
	<label for="uip_multiselect_country_filing">First filing in</label> -->
	<MultiSelect 
		--sms-options-bg="white" 
		--sms-min-height="32pt"
		--sms-border="1px solid #890c58"
		--sms-border-radius="8pt"
		--sms-text-color="#000"
		id="uip_multiselect_country_filing"
		name="uip_multiselect_country_filing"
		options={transformedvalues}
		bind:selected={uip_multiselect_country_filing}
		placeholder="Select countries"
		outerDivClass="outer"
	/>
	<!-- Needed hidden Input for Array (from Multiselect) Conversion -->
	<input
		type="hidden"
		name="uip_multiselect_country_filing_value"
		value={uip_multiselect_country_filing_value}
	/>
	<label for="uip_multiselect_country_filing_Lang"
		>Language in which the first filing is available</label
	>
	<select
		bind:value={uip_multiselect_country_filing_Lang}
		name="uip_multiselect_country_filing_Lang"
		class="border-primary-500 focus:bg-white"
		placeholder={form?.uip_multiselect_country_filing_Lang ??
			uip_multiselect_country_filing_Lang_value}
	>
		<option value="DE">German</option>
		<option value="EN">English</option>
		<option value="ES">Spanish</option>
	</select>
	<input
		type="hidden"
		name="uip_multiselect_country_filing_Lang_value"
		value={uip_multiselect_country_filing_Lang}
	/>

	<label for="uip_translation_fee">Translation Fees in ??? / Word</label>
	<input
		class="border-primary-500 focus:bg-white"
		type="number"
		name="uip_translation_fee"
		value={form?.uip_translation_fee ?? uip_translation_fee}
		step={0.01}
	/>

	<h2 style="margin-bottom:20px; margin-top:20px">Average Document</h2>
	<label for="uip_pages">Pages</label>
	<input
		class="border-primary-500 focus:bg-white"
		type="number"
		name="uip_pages"
		label="Pages"
		value={form?.uip_pages ?? uip_pages}
	/>
	<label for="uip_drawings">Drawings</label>
	<input
		class="border-primary-500 focus:bg-white"
		type="number"
		name="uip_drawings"
		value={form?.uip_drawings ?? uip_drawings}
	/>
	<label for="uip_claims">Claims</label>
	<input
		class="border-primary-500 focus:bg-white"
		type="number"
		name="uip_claims"
		value={form?.uip_claims ?? uip_claims}
	/>
	<label for="uip_words">Words</label>
	<input
		class="border-primary-500 focus:bg-white"
		type="number"
		name="uip_words"
		value={form?.uip_words ?? uip_words}
	/>
	<label for="uip_words_claims">Words in Claims only</label>
	<input
		class="border-primary-500 focus:bg-white"
		type="number"
		name="uip_words_claims"
		value={form?.uip_words_claims ?? uip_words_claims}
	/>

	<h2 style="margin-bottom:20px; margin-top:20px">
		Patent Attorney Fees for national Applications
	</h2>
	<label for="uip_basic_fee">Basic Fee (one time) ???</label>
	<input
		class="border-primary-500 focus:bg-white"
		type="number"
		name="uip_basic_fee"
		value={form?.uip_basic_fee ?? uip_basic_fee}
	/>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label>Quick examination (1-2 assesments/per year, 2 years) ???</label>
	<input
		class="border-primary-500 focus:bg-white"
		type="number"
		name="uip_quick_examination"
		value={form?.uip_quick_examination ?? uip_quick_examination}
	/>
	<label for="uip_normal_examination">Normal examination (2 assesments/per year, 3 years) ???</label>
	<input
		class="border-primary-500 focus:bg-white"
		type="number"
		name="uip_normal_examination"
		value={form?.uip_normal_examination ?? uip_normal_examination}
	/>
	<label for="uip_extended_examination"
		>Extended examination (3-5 assesments/per year, 6 years) ???</label
	>
	<input
		class="border-primary-500 focus:bg-white"
		type="number"
		name="uip_extended_examination"
		value={form?.uip_extended_examination ?? uip_extended_examination}
	/>

	<h2 style="margin-bottom:20px; margin-top:20px">Complexity</h2>
	<label for="uip_complexity">Complexity</label>
	<select
		class="border-primary-500 focus:bg-white"
		name="uip_complexity"
		selected={form?.uip_complexity ?? uip_complexity}
	>
		<option value="quick">quick</option>
		<option value="normal">normal</option>
		<option value="extended">extended</option>
	</select>
	<label for="uip_complexity">Estimated date for granting the patent</label>
	<select
		bind:value={uip_multiselect_country_filing_subsequent}
		name="uip_multiselect_country_filing_subsequent"
		class="border-primary-500 focus:bg-white"
		multiple
	>
		<!-- add foreach options from const transformedvalues -->
		{#each transformedvalues as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	<input
		type="hidden"
		name="uip_multiselect_country_filing_subsequent_value"
		value={uip_multiselect_country_filing_subsequent}
	/>
	<br /><br />
	<button class="btn btn-filled-primary btn-base">Submit</button>

	<br /><br />
</form>
