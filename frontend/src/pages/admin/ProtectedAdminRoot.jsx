import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCheckAuthStatus } from "../../hooks/useUserData";
import MainNavigation from "../MainNavigation";
import Footer from "../../components/shared/Footer";

export default function ProtectedAdminRoot() {
  const { data, isLoading } = useCheckAuthStatus();
  const navigate = useNavigate();
  useEffect(() => {
    if ((data && !data.isAdmin) || !data) {
      navigate("/");
    }
  }, [data, navigate]);
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
