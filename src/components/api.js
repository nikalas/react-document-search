const baseUrl = "http://dev.somas.se";

const getResults = async (params = "") => {
	// console.log(params); //! REMOVE
	const response = await fetch(
		baseUrl + `/wp-json/dbyh/v1/document/?${params ? `${params}` : ""}`
	);
	const data = await response.json();
	// console.log(response); //! REMOVE
	// console.log(data); //! REMOVE
	return data;
};

const getFilterOptions = async (slug) => {
	const response = await fetch(baseUrl + `/wp-json/wp/v2/${slug}`);
	const data = await response.json();
	return data;
};

const getLanguages = async () => {
	const response = await fetch(baseUrl + `/wp-json/dbyh/v1/languages`);
	const data = await response.json();
	// data && console.log(getLanguages, data); //! REMOVE
	return data;
};

export { getResults, getFilterOptions, getLanguages };
