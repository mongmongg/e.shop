import { FaSearchengin } from "react-icons/fa";
import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

import Button from "../components/UI/Button";
import Products from "./Products";

export default function AllProducts() {
  const [searchTerm, setSearchTerm] = useState();
  const deboncedQuery = useDebounce(searchTerm, 500);
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    if (deboncedQuery) {
      setSearchParam(`?search=${deboncedQuery}`);
    }
  }, [deboncedQuery, setSearchParam]);

  return (
    <>
      <section className="flex justify-end gap-2 mx-8 mt-4 max-md:flex-col">
        <form>
          <label htmlFor="product"></label>
          <div className="flex items-center justify-between gap-1 px-4 bg-gray-300/30 border border-white/25 rounded-full overflow-hidden ">
            <input
              type="text"
              name="product"
              id="product"
              placeholder="search..."
              onChange={(event) => setSearchTerm(event.target.value)}
              className=" py-2 focus:outline-none w"
            />
            <FaSearchengin className="text-gray-500 hover:cursor-pointer" />
          </div>
        </form>
        <div>
          <TagButton
            tag="all"
            title="All"
            onClick={() => setSearchTerm("all")}
          />
          <TagButton
            tag="women"
            title="Women"
            onClick={() => setSearchTerm("women")}
          />
          <TagButton
            tag="men"
            title="Men"
            onClick={() => setSearchTerm("men")}
          />
        </div>
      </section>
      <Products
        header={`${deboncedQuery === "all" || !deboncedQuery ? "All" : `"${deboncedQuery}"`} Products`}
        searchTerm={deboncedQuery}
      />
    </>
  );
}

function TagButton({ tag, title, ...props }) {
  let btnCss = "text-sm border border-gray-400/10 shadow-sm";
  const [searchParam] = useSearchParams();
  const search = searchParam.get("search");

  return (
    <Link to={`?search=${tag}`}>
      <Button className={btnCss} {...props} black={search && search === tag}>
        {title}
      </Button>
    </Link>
  );
}
