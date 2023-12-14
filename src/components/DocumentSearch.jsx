import useTranslations from "./translations"; // TODO: This can be removed once proper i18n translations are working
// import { __ } from "@wordpress/i18n";
import React, { useState, useEffect } from "react";
import { getResults } from "./api";
import { getLanguages } from "./api";
import { Filter } from "./Filter";
import { Results } from "./Results";
import { SearchField } from "./SearchField";
import { LanguageFilter } from "./LanguageFilter";
import { MessageWrapper } from "./MessageWrapper";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const fieldClasses =
	"rounded h-16 pl-8 items-center flex shadow-inner-md  bg-white";

export function DocumentSearch() {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState([]);
	const [languages, setLanguages] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState({
		value: "all",
		label: "All",
	}); //TODO Should this be set by url?
	const [languagesIsDisabled, setLanguagesIsDisabled] = useState(true);
	const __ = useTranslations(); // TODO: This can be removed once proper i18n translations are working

	const hasSearched = search !== "" || Object.keys(filters).length > 0;
	const showNoResultsMessage = hasSearched && !results.length;

	/**
	 * Fetch results on search and filter change
	 */
	useEffect(() => {
		// Set search param
		const searchParam = search ? `&search=${search}` : "";

		// Set filter params
		const filterParams = Object.entries(filters)
			.filter(([key, value]) => value !== "")
			.map(([key, value]) => `${key}=${value}`)
			.join("&");

		// Join params
		const params = [searchParam, filterParams].filter(Boolean).join("&");

		// Get results
		params && setLoading(true);
		params &&
			getResults(params)
				.then((data) => {
					// console.log("getResults resolved");
					setResults(data);
					setLoading(false);
				})
				.catch((error) => {
					console.log("getResults error", error);
				})
				.finally(() => {
					// console.log("getResults finally");
					setLoading(false);
				});
	}, [search, filters]);

	/**
	 * Fetch languages on mount
	 */
	useEffect(() => {
		getLanguages().then((data) => {
			setLanguages(data);
		});
		return;
	}, []);

	/**
	 *  Language filter is disabled until results are loaded
	 */
	useEffect(() => {
		if (results.length > 0) setLanguagesIsDisabled(false);
	}, [results]);

	const handleLanguageChange = (val) => {
		// console.table(val); //! REMOVE
		setSelectedLanguage(val);
	};

	// Not used
	const handleReset = () => {
		setSearch("");
		setResults([]);
		setFilters([]);
	};

	// setTimeout(() => {
	//  setSearch("si 10");
	// } ,500 );

	const [parent] = useAutoAnimate();

	return (
		<search-box class="max-w-screen-xl block mx-auto">
			<div className="mb-8 bg-gray-100 border border-gray-200 rounded-md shadow-md md:py-14">
				<search-filters class="grid sm:grid-cols-2 max-w-screen-md mx-auto">
					{[
						{
							name: __("Document type", "dbyh"),
							slug: "document-type",
						},

						{
							name: __("Product family", "dbyh"),
							slug: "product-family",
						},

						{
							name: __("Product type", "dbyh"),
							slug: "product-type",
						},
					].map((filter) => (
						<Filter
							key={filter.slug}
							className="w-full mt-4 uppercase"
							filter={filter}
							filters={filters}
							setFilters={setFilters}
						/>
					))}

					{
						<LanguageFilter
							className="w-full mt-4 uppercase"
							languages={languages}
							setLanguages={setLanguages}
							onLanguageChange={handleLanguageChange}
							isDisabled={languagesIsDisabled}
						/>
					}
				</search-filters>
				<SearchField
					search={search}
					setSearch={setSearch}
					className="max-w-screen-md"
				/>
			</div>
			<div
				id="results-wrapper"
				className="max-w-screen-xl"
			>
				{loading && <MessageWrapper message={`${__("Loading", "dbyh")}...`} />}
				{!loading && showNoResultsMessage && (
					<MessageWrapper message={`${__("No results found", "dbyh")}`} />
				)}

				<search-results
					ref={parent}
					class="grid grid-cols-1 gap-8 max-w-screen-xl"
				>
					{!loading && (
						<Results
							results={results}
							selectedLanguage={selectedLanguage}
							languages={languages}
						/>
					)}
				</search-results>
			</div>
		</search-box>
	);
}
