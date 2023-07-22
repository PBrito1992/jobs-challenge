import { GlobeIcon } from "components/icons/globe";

const Filters = () => {
  return (
    <form className="w-full lg:w-3/12 font-poppins text-brand-dark-blue text-sm flex flex-col">
      <label className="flex items-center gap-3 font-medium">
        <input type="checkbox" />
        Full time
      </label>
      <fieldset className="mt-8">
        <legend className="font-bold text-sm uppercase text-brand-light-gray">
          Location
        </legend>
        <div className="w-full flex items-center gap-2 bg-white rounded-4 shadow-brand-sm mt-3.5  py-4 px-3.5">
          <GlobeIcon />
          <input
            type="search"
            className="flex-1 outline-none placeholder:text-xs"
            placeholder="Title, companies, expertise or benefits"
          />
        </div>
        <label className="flex items-center gap-3 font-medium mt-6">
          <input type="radio" />
          London
        </label>
        <label className="flex items-center gap-3 font-medium mt-4">
          <input type="radio" />
          Amsterdam
        </label>
        <label className="flex items-center gap-3 font-medium mt-4">
          <input type="radio" />
          New York
        </label>
        <label className="flex items-center gap-3 font-medium mt-4">
          <input type="radio" />
          Berlin
        </label>
      </fieldset>
    </form>
  );
};

export { Filters };
