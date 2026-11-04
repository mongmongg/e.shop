import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import Footer from "../components/shared/Footer";

export default function Root() {
  return (
    <>
      <MainNavigation />
      <main className="pt-14 mb-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
