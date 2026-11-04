import { useRouteError, Link } from "react-router-dom";
import MainNavigation from "./MainNavigation";

import Footer from "../components/shared/Footer";
import Button from "../components/UI/Button";
export default function ErrorPage() {
  const error = useRouteError();
  let message;
  if (error.status === 404) {
    message = "Sorry, the page you are looking for does not exist.";
  }
  if (error.status === 401 || error.status === 403) {
    message =
      "You do not have permission to view this page. Please sign in first.";
  }
  if (error.status === 500) {
    message = "Somthing went wrong on our servers. Please try again later.";
  }
  return (
    <>
      <MainNavigation />
      <main className="pt-14 mb-10">
        <article className="mx-16 min-h-130 w-full flex flex-col gap-4 items-center justify-center">
          <h1 className="text-2xl font-semibold mb-4">
            {error.status} {error.statusText}
          </h1>
          <p>
            {message} <span>Click button bellow to go to the home page</span>
          </p>
          <Button className="bg-black text-white hover:bg-black/70">
            <Link>Back to Home page</Link>
          </Button>
        </article>
      </main>
      <Footer />
    </>
  );
}
