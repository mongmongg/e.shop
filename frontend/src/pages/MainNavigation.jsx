import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useUserData";
import { useGetCart } from "../hooks/useCart";

import { MdDehaze, MdOutlineShoppingBag } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import SideDrawer from "../components/Navigation/SideDrawer";
import NavItem from "../components/Navigation/NavItem";
import SideMenu from "../components/Navigation/SideMenu";
export default function MainNavigation() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  useGetCart();

  const { mutate } = useLogout();
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  const handleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };
  const handleLogout = () => {
    mutate({});
  };
  const quantity = useSelector((state) => state.cart.totalQuantity);
  let totalQuantity;
  totalQuantity = quantity;

  return (
    <>
      {drawerIsOpen && (
        <SideDrawer>
          <SideMenu
            handleDrawer={handleDrawer}
            isAdmin={isAdmin}
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
          />
        </SideDrawer>
      )}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-2">
        <div
          className="px-2 py-2 z-10 hover:cursor-pointer md:hidden "
          onClick={handleDrawer}
        >
          <MdDehaze className="w-6 h-6" />
        </div>
        <div className="flex flex-row gap-2 justify-center items-center text-lg">
          <FaOpencart />
          <Link to={isAdmin ? "/admin/products" : "/"}>e.store</Link>
        </div>
        <nav>
          <ul className="flex flex-row items-start [&_li]:max-md:hidden">
            {!isAdmin && (
              <NavItem to="/" end>
                Home
              </NavItem>
            )}
            <NavItem to="products" end>
              Products
            </NavItem>
            {isAdmin && <NavItem to="products/new">New product</NavItem>}
            {!isAuthenticated && (
              <NavItem to="auth/?mode=signin">Sign in</NavItem>
            )}
            {isAuthenticated && (
              <>
                <NavItem to="orders">Order</NavItem>
                <li onClick={handleLogout}>
                  <a className="px-4 py-6 hover:cursor-pointer hover:bg-black/50 hover:text-white">
                    Log out
                  </a>
                </li>
              </>
            )}
            {!isAdmin && (
              <li className="relative px-2 hover:cursor-pointer max-md:inline-flex!">
                <Link to="/cart" className=" relative">
                  <MdOutlineShoppingBag className="w-7 h-7 m-auto text-black " />
                  <span className="absolute flex justify-center items-center bg-black text-white rounded-[50%] bottom-3 left-4 text-xs w-5 h-5 text-center">
                    {totalQuantity}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
