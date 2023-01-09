<script lang="ts">
	import AppForm from "../components/AppForm.svelte";
	
	import {
		storeUserCho,
		supaData,
		storeUserCountries,
		storeShowEdit,
		storeShowResult
	} from './stores';
	import AppResult from '../components/AppResult.svelte';
	import type { ActionData, PageData } from './$types';
	

	//Toggle between Edit and Result
	function toggleShowEdit () {
		$storeShowEdit = true
		form.success = false
	}
	
	
	//Fetch Data
	export let data: any;
	export let form: ActionData;
	$: storeUserCho.set(form?.userChosen);
	$: supaData.set(data);
	$: $storeShowEdit = true;
	$: showResults = false;
	
	// console.log(data);
	//Convert Data
	$: values = Object.values(data);
	
	// can be removed:
	// let countries = values;
	// let userval = '';


	// Split the uip_multiselect_country_filing property into an array of country codes
	$: dataArray = Object.values(data);
	//$: console.log("storeusercho",$storeUserCho)
	// Split the uip_multiselect_country_filing property into an array of country codes
	$: filingCountries = $storeUserCho?.uip_multiselect_country_filing?.split(',');

	// Filter the dataArray to include only countries with a code that is included in filingCountries
	$: filteredCountries = dataArray.filter((country) => {
		return filingCountries?.includes(country.country_code);
	});
	// Add the properties of $storeUserVal to filteredCountries
	$: filteredCountriesCombined = filteredCountries.map((country) => {
		return Object.assign({}, country, $storeUserCho);
	});
	$: storeUserCountries.set(filteredCountriesCombined);
		
</script>


<div class="container mx-auto px-4">
	{#if $storeShowEdit}
	<AppForm bind:form />
	
	{/if}
	{#if form?.success}
		<AppResult />
		<br />
		<button class="btn btn-filled-primary btn-base" on:click={() => toggleShowEdit()}>Edit Results</button>
		
	{/if}
</div>
