// import { __ } from "@wordpress/i18n";
import useTranslations from "./translations"; // TODO: This can be removed once proper i18n translations are working

/**
 * Renders a flag image based on the provided language code and language name.
 * @param {Object} props - The props object.
 * @param {string} props.language - The language code.
 * @param {string} props.languageName - The name of the language.
 * @param {string} props.className - The CSS class name for the image element.
 * @returns {JSX.Element} - The flag image element.
 */
export const Flag = ({ language, languageName, className }) => {
	const __ = useTranslations(); // TODO: This can be removed once proper i18n translations are working

	if (language == "EN") {
		language = "GB";
	}

	return (
		<img
			className={`${className}`}
			src={`https://www.flagsapi.com/${language}/flat/24.png`}
			alt={`${languageName} ${__("flag", "dbyh")}`}
		/>
	);
};
