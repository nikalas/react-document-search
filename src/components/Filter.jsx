import useTranslations from "./translations"; // TODO: This can be removed once proper i18n translations are working
// import { __ } from "@wordpress/i18n";

import { useState, useEffect } from "react";
import Select from "react-select";
import { getFilterOptions, getLanguages } from "./api";
import { fieldClasses } from "./DocumentSearch";

export const Filter = ({
	filter,
	filters,
	setFilters,
	onLanguageChange,
	className = "",
}) => {
	const [options, setOptions] = useState([]);
	const __ = useTranslations(); // TODO: This can be removed once proper i18n translations are working

	useEffect(() => {
		if (filter.slug === "language") {
			getLanguages().then((data) => {
				setOptions(data);
				// console.log('lang:', data); //! REMOVE
			});
			return;
		}
		getFilterOptions(filter.slug).then((data) => {
			setOptions(data);
			// console.log('filter:', data); //! REMOVE
		});
	}, [filter.slug]);

	const handleLanguageChange = (val) => {
		const value = val;
		onLanguageChange(value);
	};

	// options && console.log(options); //! REMOVE
	// console.log(filter.slug); //! REMOVE
	return (
		<div className={`${className}`}>
			<div className="flex flex-col w-full p-4">
				<header className="mb-2 text-xs font-semibold">{filter.name}:</header>
				<div className="w-full p-0.5">
					{filter.slug == "language" &&
						(options.length > 0 ? (
							<Select
								classNames={{
									valueContainer: () => fieldClasses,
								}}
								defaultValue={{
									value: "all",
									label: __("All", "dbyh"),
								}}
								options={[
									{ value: "", label: "All" },
									...options?.map((option) => ({
										value: Object.keys(option)[0],
										label: Object.values(option)[0],
									})),
								]}
								onChange={(val) => handleLanguageChange(val)}
							/>
						) : (
							<div className={fieldClasses}>{__("Loading", "dbyh")}...</div>
						))}

					{filter.slug !== "language" &&
						(options.length > 0 ? (
							<Select
								classNames={{
									valueContainer: () => fieldClasses,
								}}
								defaultValue={{ value: "", label: __("All", "dbyh") }}
								onChange={
									(event) =>
										setFilters({
											...filters,
											[filter.slug]: event.value,
										}) //&& console.log(filters[filter.id]) //! REMOVE
								}
								options={[
									{ value: "", label: __("All", "dbyh") },
									...options?.map((option) => ({
										value: option.id,
										label: option.name,
									})),
								]}
							/>
						) : (
							<div className={fieldClasses}>{__("Loading", "dbyh")}...</div>
						))}
				</div>
			</div>
		</div>
	);
};
