import CardItem from "../components/Card/CardItem";
import CardItemList from "../components/Card/CartItemList";
import { Suspense } from "react";
import { useAllProducts } from "../hooks/useProduct";
import { useSearchParams } from "react-router-dom";
import { useSearchProducts } from "../hooks/useProduct";

export default function Products({ header }) {
  const { data, isLoading } = useAllProducts({});
  const [searchParam] = useSearchParams();
  const searchTerm = searchParam.get("search");
  const { data: searchProoduct } = useSearchProducts({
    searchTerm,
  });
  let products;
  if (searchTerm !== "all") {
    products = searchProoduct.products;
  } else {
    products = data.products;
  }
  return (
    <article id="products" className="mt-16">
      <section className="mx-6 max-md:mx-2">
        <h1 className="text-4xl font-header text-center mb-8">{header}</h1>
        <CardItemList>
          <Suspense>
            {products.length > 0 &&
              products.map((prod) => (
                <CardItem
                  key={prod._id}
                  image={prod.image}
                  name={prod.name}
                  summary={prod.summary}
                  price={prod.price}
                  id={prod._id}
                />
              ))}
          </Suspense>
        </CardItemList>
      </section>
    </article>
  );
}
