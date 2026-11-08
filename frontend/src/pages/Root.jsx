import { Outlet, useNavigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import Footer from "../components/shared/Footer";
import { useCheckAuthStatus } from "../hooks/useUserData";
import { useEffect, useLayoutEffect } from "react";

export default function Root() {
  const { data, isLoading } = useCheckAuthStatus();
  const navigate = useNavigate();
  useEffect(() => {
    if (data && data.isAdmin) {
      navigate("/admin");
    }
  }, [data, navigate]);
  console.log(data);
  if (!isLoading) {
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
}
