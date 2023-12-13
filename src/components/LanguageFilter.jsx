import useTranslations from "./translations"; // TODO: This can be removed once proper i18n translations are working
// import { __ } from "@wordpress/i18n";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fieldClasses } from "./DocumentSearch";

export const LanguageFilter = ({
	onLanguageChange,
	isDisabled,
	languages,
	className,
}) => {
	const __ = useTranslations(); // TODO: This can be removed once proper i18n translations are working

	const handleLanguageChange = (val) => {
		const value = val;
		onLanguageChange(value);
	};

	return (
		<div className={`${className}`}>
			<div className="flex flex-col w-full p-4">
				<header className="mb-2 text-xs font-semibold">
					{__("Language", "dbyh")}:
				</header>
				<div className="w-full p-0.5">
					{languages.length > 0 ? (
						<Select
							isDisabled={isDisabled}
							classNames={{
								valueContainer: () => fieldClasses,
							}}
							defaultValue={{
								value: "all",
								label: __("All", "dbyh"),
							}}
							options={[
								{ value: "all", label: __("All", "dbyh") },
								...languages?.map((option) => ({
									value: Object.keys(option)[0],
									label: Object.values(option)[0],
								})),
							]}
							onChange={(val) => handleLanguageChange(val)}
						/>
					) : (
						<div className={fieldClasses}>{__("Loading", "dbyh")}...</div>
					)}
				</div>
			</div>
		</div>
	);
};
