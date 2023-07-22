import { useEffect, useRef, useState } from "react";
import { useFilters } from "components/home/filters-provider";
import { CaseIcon } from "components/icons/case";

const Search = () => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [searchTerm, setSearchTerm] = useState("");
  const { searchTerm: savedSearchTerm, updateSearchTerm } = useFilters();

  useEffect(() => {
    if (searchTerm === savedSearchTerm) return;

    timeoutRef.current = setTimeout(() => updateSearchTerm(searchTerm), 500);

    return () => clearTimeout(timeoutRef.current);
  }, [searchTerm, savedSearchTerm, updateSearchTerm]);

  return (
    <form
      role="search"
      className="font-roboto flex justify-center items-center rounded-lg bg-[url('/images/backgroundImg.png')]"
    >
      <div className="w-full flex items-center gap-2 mx-4 lg:mx-52 my-11 bg-white rounded-4 shadow-brand-sm p-1">
        <CaseIcon />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 outline-none placeholder:text-xs"
          placeholder="Title, companies, expertise or benefits"
        />
        <button
          type="button"
          className="bg-brand-blue text-white rounded-4 py-3.5 px-7 lg:px-12 font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export { Search };
