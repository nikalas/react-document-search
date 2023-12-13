import useTranslations from "./translations"; // TODO: This can be removed once proper i18n translations are working
import { fieldClasses } from "./DocumentSearch";

export const SearchField = ({ search, setSearch, className = "" }) => {
	const __ = useTranslations(); // TODO: This can be removed once proper i18n translations are working

	return (
		<div className={`${className} flex flex-col w-full p-4 mx-auto `}>
			<header className="mb-2 text-xs font-semibold uppercase">
				{__("Search", "dbyh")}:
			</header>

			<input
				className={fieldClasses}
				type="text"
				value={search}
				onChange={(event) => setSearch(event.target.value)}
			/>
		</div>
	);
};
