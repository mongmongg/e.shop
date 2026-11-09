import { Suspense } from "react";
import Hero from "../components/Hero";
import Products from "./Products";
import LoadingPage from "./LoadingPage";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingPage />}>
        <Products header="New Arrivals Products" />
      </Suspense>
    </>
  );
}
