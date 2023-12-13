import { useState, useEffect } from "react";

/**
 * This function fetches translations from the WordPress REST API, and caches
 * them in localStorage.
 * @returns {Array} - An array of translation objects.
 */
const useTranslations = () => {
	const [translations, setTranslations] = useState({});
	const baseUrl = "http://dev.somas.se";

	useEffect(() => {
		//! don't actually fetch translations while reviewing
		return __;

		const cachedTranslations = localStorage.getItem("WP_SEARCH_TRANSLATIONS");
		if (cachedTranslations) {
			setTranslations(JSON.parse(cachedTranslations));
		}
		fetch(
			`${baseUrl}/wp-json/dbyh/v1/translations/?block_name=block-dock-search`
		)
			.then((response) => response.json())
			.then((data) => {
				// console.log("translations updated"); // DEBUG
				if (JSON.stringify(data) !== cachedTranslations) {
					localStorage.setItem("WP_SEARCH_TRANSLATIONS", JSON.stringify(data));
					setTranslations(data);
					// console.log("translations updated"); // DEBUG
				}
			})
			.catch((error) => console.error("Error fetching translations:", error));
	}, []);

	const __ = (key) => {
		return translations[key] || key;
	};

	return __;
};

export default useTranslations;
