import { Filters } from "components/home/filters";
import { List } from "components/home/list";
import { Search } from "components/home/search";
import { NextPage } from "next";

const HomePage: NextPage = () => (
  <>
    <Search />
    <div className="flex-1 flex flex-col lg:flex-row gap-8 mt-11">
      <Filters />
      <List />
    </div>
  </>
);

export default HomePage;
