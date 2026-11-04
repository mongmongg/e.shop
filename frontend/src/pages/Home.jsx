import { Suspense } from "react";
import Hero from "../components/Hero";
import Products from "./Products";


export default function Home() {
  
  return (
    <>
      <Hero />
      <Suspense>
        <Products header="New Arrivals Products" />
      </Suspense>
    </>
  );
}
