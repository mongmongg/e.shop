import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function Root() {
  return (
    <>
      <MainNavigation />
      <main className="pt-14">
        <Outlet />
      </main>
    </>
  );
}
