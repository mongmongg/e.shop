import { Suspense } from "react";
import Hero from "../components/Hero";
import { useAllProducts } from "../hooks/useProduct";
import CardItemList from "../components/Card/CartItemList";
import CardItem from "../components/Card/CardItem";

import LoadingPage from "./LoadingPage";

export default function Home() {
  const { data, isLoading } = useAllProducts({ max: 3 });
  const products = data.products;
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingPage />}>
        <article id="products" className="mt-16">
          <section className="mx-6 max-md:mx-2">
            <h1 className="text-4xl font-header text-center mb-8">
              New Arrivals Products
            </h1>
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
      </Suspense>
    </>
  );
}
