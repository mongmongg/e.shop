import { useSuspenseQuery } from "@tanstack/react-query";
import CardItem from "../components/Card/CardItem";
import CardItemList from "../components/Card/CartItemList";
import { fetchProducts } from "../util/http";
import { Suspense } from "react";
export default function Products({ header }) {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => fetchProducts({ signal }),
  });
  const products = data.products;
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
          {/* <CardItem
            image={productImg}
            name="Blazer"
            summary="women blazer"
            price="399"
            id="1"
          />
          <CardItem
            image={productImg}
            name="Blazer"
            summary="women blazer"
            price="399"
            id="1"
          />
          <CardItem
            image={productImg}
            name="Blazer"
            summary="women blazer"
            price="399"
            id="1"
          /> */}
        </CardItemList>
      </section>
    </article>
  );
}
