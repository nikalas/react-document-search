// import { __ } from "@wordpress/i18n";
import useTranslations from "./translations"; // TODO: This can be removed once proper i18n translations are working
import { useState, useEffect } from "react";
import { Flag } from "./Flag";

/**
 * Renders a search result item with document information and download link.
 * @param {Object} props - The component props.
 * @param {Object} props.result - The search result object.
 * @param {Object} props.fileLanguage - The selected file language.
 * @returns {JSX.Element} - The Result component.
 */
export function Result({ result, selectedLanguage, languages }) {
	const titleClasses = "text-[10px] font-bold uppercase underline block";
	// const boxClasses = "font-semibold lg:pl-4 lg:pr-4";
	const [filteredFile, setFilteredFile] = useState();
	const [showLanguageWarning, setShowLanguageWarning] = useState(false);
	const __ = useTranslations(); // TODO: This can be removed once proper i18n translations are working

	/**
	 * Set what file to display based on the selected language.
	 */
	useEffect(() => {
		setFilteredFile(filterFileOnLanguage(result.acf.d_files));
	}, [result, selectedLanguage]);

	/**
	 * Show language warning if the selected language does not match the file language.
	 */
	useEffect(() => {
		const isLanguageMismatch =
			selectedLanguage.value !== "all" &&
			filteredFile &&
			filteredFile.sub_lang !== selectedLanguage.value.toUpperCase();
		setShowLanguageWarning(isLanguageMismatch);
	}, [filteredFile, selectedLanguage]);

	/**
	 * Returns the URL of the file to be displayed based on the selected language.
	 * @param {Array} files - An array of files to search through.
	 * @returns {Object|Boolean} - The file object if found, false if no file is found.
	 */
	const filterFileOnLanguage = (files) => {
		let file;

		// set to true to enable all console logs
		const debug = false;
		debug && console.log(files, selectedLanguage); // Debug

		// File has chosen language and is not false
		file = files.find((file) => {
			return (
				file.sub_lang === selectedLanguage.value.toUpperCase() &&
				file.sub_file !== false
			);
		});
		debug && console.log("Document has chosen language?", file); // Debug

		// File does not have chosen language, but has english
		if (!file) {
			file = files.find((file) => {
				return file.sub_lang === "EN" && file.sub_file !== false;
			});
			debug &&
				console.log(
					"Document does not have requested language but has english?",
					file
				); // Debug
		}

		// File does not have English but has any other language
		if (!file) {
			file = files.find((file) => {
				return file.sub_file !== false;
			});
			debug && console.log("First non empty file for document is", file); // Debug
		}

		// There are no actual files connected
		if (!file) {
			debug &&
				console.error("No actual files connected to this document", files); // Debug
			return false;
		}

		return file;
	};

	/**
	 * Returns the language name based on the language code.
	 * @param {String} item - The language code.
	 * @returns {String} - The language name.
	 * @example getFilteredLanguage("EN") // English
	 * @example getFilteredLanguage("SV") // Swedish
	 */
	function getFilteredLanguage(item) {
		return Object.values(
			languages.find((lang) => Object.keys(lang)[0] === item)
		)[0];
	}

	const boxClasses =
		"font-semibold lg:pl-2 lg:my-2 lg:border-l border-dotted border-primary-200 grid grid-cols-2 sm:grid-cols-1  place-content-baseline";
	const liClasses =
		"before:content-[unset] font-semibold leading-[1.7rem] p-0 !mb-0";
	return (
		<div
			className={`relative leading-[1.7rem] text-gray-400 md:p-8 p-4 bg-white border border-gray-200 rounded-md shadow-md`}
		>
			{showLanguageWarning && (
				<div className="inset-x-0 text-center font-light mx-auto absolute -mt-[1.65rem] md:-mt-[2.625rem] w-fit py-0.5 px-3 rounded-full text-xs text-gray-400  bg-secondary-300 ">
					{__("Not available in the selected language", "dbyh")}
				</div>
			)}

			<div className="grid w-full gap-2 lg:grid-cols-5 sm:grid-cols-2 ">
				<document-title class={`${boxClasses} !border-none`}>
					<header className={titleClasses}>{__("Title", "dbyh")}</header>
					<span className="break-words text-primary-500">
						{result.post_title || "-"}
					</span>
				</document-title>

				<document-type class={boxClasses}>
					<header className={titleClasses}>
						{__("Document type", "dbyh")}
					</header>
					{(result.document_type && (
						<ul className="m-0 ">
							{result.document_type?.map((type, index) => (
								<li
									className={liClasses}
									key={index}
								>
									{type.name}
								</li>
							))}
						</ul>
					)) ||
						"-"}
				</document-type>

				<document-pressure class={boxClasses}>
					<header className={titleClasses}>
						{__("Pressure class", "dbyh")}
					</header>
					<span>{result.acf?.d_comp_class || "-"}</span>
				</document-pressure>

				<document-language class={boxClasses}>
					<header className={titleClasses}>{__("Language", "dbyh")}</header>
					<div className="flex items-center gap-2">
						{filteredFile && (
							<Flag
								className="h-5 rounded-sm"
								language={filteredFile?.sub_lang}
								languageName={getFilteredLanguage(
									filteredFile?.sub_lang?.toUpperCase()
								)}
							/>
						)}
						<span>
							{filteredFile
								? getFilteredLanguage(filteredFile?.sub_lang?.toUpperCase())
								: "-"}
						</span>
					</div>
				</document-language>

				<document-info
					class={`${boxClasses} block lg:order-none order-12 lg:row-span-3`}
				>
					<header className={titleClasses}>{__("Other info", "dbyh")}</header>
					<p
						className=""
						dangerouslySetInnerHTML={{
							__html: result.acf.d_information,
						}}
					/>
				</document-info>

				{/* This acts as a divider between the two rows of the grid */}
				<div className="hidden col-span-4 my-auto border-b border-dotted lg:block border-primary-200" />

				<product-family class={`${boxClasses} !border-none`}>
					<header className={titleClasses}>
						{__("Product family", "dbyh")}
					</header>
					{result.product_family?.length > 0 ? (
						<ul className="m-0 ">
							{result.product_family?.map((type, index) => (
								<li
									className={liClasses}
									key={index}
								>
									{type.name}
								</li>
							))}
						</ul>
					) : (
						"-"
					)}
				</product-family>

				<product-type class={boxClasses}>
					<header className={titleClasses}>{__("Product type", "dbyh")}</header>
					{result.product_type?.length > 0 ? (
						<ul className="m-0 ">
							{result.product_type?.map((type, index) => (
								<li
									className={liClasses}
									key={index}
								>
									{type.name}
								</li>
							))}
						</ul>
					) : (
						"-"
					)}
				</product-type>

				<product-dimensions class={boxClasses}>
					<header className={titleClasses}>
						{__("Product dimensions", "dbyh")}
					</header>
					{result.acf.d_dimension || "-"}
				</product-dimensions>

				<document-download class={`${boxClasses} order-last`}>
					<header className={`${titleClasses} mb-4`}>
						{__("Download", "dbyh")}
					</header>
					{filteredFile ? (
						<a
							download
							href={filteredFile.sub_file.url}
						>
							<svg
								width="64"
								height="32"
								viewBox="0 0 64 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									width="64"
									height="32"
									rx="8"
									fill="#0062AE"
								/>
								<path
									d="M32 8C29.8783 8 27.8434 8.84285 26.3431 10.3431C24.8429 11.8434 24 13.8783 24 16C24 18.1217 24.8429 20.1566 26.3431 21.6569C27.8434 23.1571 29.8783 24 32 24C34.1217 24 36.1566 23.1571 37.6569 21.6569C39.1571 20.1566 40 18.1217 40 16C40 13.8783 39.1571 11.8434 37.6569 10.3431C36.1566 8.84285 34.1217 8 32 8ZM35.7781 17.2063L32.4312 20.3281C32.3125 20.4375 32.1594 20.5 32 20.5C31.8406 20.5 31.6844 20.4375 31.5687 20.3281L28.2219 17.2063C28.0813 17.075 28 16.8906 28 16.6969C28 16.3125 28.3125 16 28.6969 16H30.5V13C30.5 12.4469 30.9469 12 31.5 12H32.5C33.0531 12 33.5 12.4469 33.5 13V16H35.3031C35.6875 16 36 16.3125 36 16.6969C36 16.8906 35.9187 17.075 35.7781 17.2063Z"
									fill="white"
								/>
							</svg>
						</a>
					) : (
						<span>{__("No file available", "dbyh")}</span>
					)}
				</document-download>
			</div>
		</div>
	);
}

export function Results(props) {
	const results = props.results;
	return (
		<>
			{results &&
				results.map((result) => (
					<Result
						key={result.ID}
						result={result}
						{...props}
					/>
				))}
		</>
	);
}
