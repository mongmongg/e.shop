import { ImSpinner2 } from "react-icons/im";
import MainNavigation from "./MainNavigation";

import Footer from "../components/shared/Footer";

export default function LoadingPage() {
  return (
    <>
      <MainNavigation />
      <main className="pt-14 mb-10">
        <article className="mx-16 min-h-130 w-full flex flex-col gap-4 items-center justify-center">
          <ImSpinner2 className="w-10 h-10 animate-spin" />
          <p className="text-xl">Loading...</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
