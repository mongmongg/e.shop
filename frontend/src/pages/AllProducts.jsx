import { FaSearchengin } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Button from "../components/UI/Button";
import Products from "./Products";
import { Link } from "react-router-dom";

export default function AllProducts() {
  return (
    <>
      <section className="flex justify-end gap-2 mx-8 mt-4">
        <form>
          <label htmlFor="product"></label>
          <div className="flex items-center justify-between gap-1 px-4 bg-gray-300/30 border border-white/25 rounded-full overflow-hidden ">
            <input
              type="text"
              name="product"
              id="product"
              placeholder="search..."
              className=" py-2 focus:outline-none w"
            />
            <FaSearchengin className="text-gray-500 hover:cursor-pointer" />
          </div>
        </form>
        <TagButton tag="women" title="Women" />
        <TagButton tag="men" title="Men" />
      </section>
      <Products header="All Products" />;
    </>
  );
}

function TagButton({ tag, title }) {
  let btnCss = "text-sm border border-gray-400/10 shadow-sm";
  const [searchParam] = useSearchParams();
  const search = searchParam.get("search");
  btnCss = `${btnCss} ${search && search === tag ? "bg-black text-white" : ""}`;

  return (
    <Link to={`?search=${tag}`}>
      <Button className={btnCss}>{title}</Button>
    </Link>
  );
}
