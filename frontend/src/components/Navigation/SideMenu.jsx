import { NavLink } from "react-router-dom";
export default function SideMenu({
  handleDrawer,
  isAdmin,
  isAuthenticated,
  handleLogout,
}) {
  return (
    <ul className="flex flex-col pl-12 gap-4 py-8">
      {!isAdmin && (
        <NavItem to="/" end>
          Home
        </NavItem>
      )}
      <NavItem to="products" end>
        Products
      </NavItem>
      {isAdmin && <NavItem to="products/new">New product</NavItem>}
      {!isAuthenticated && <NavItem to="auth/?mode=signin">Sign in</NavItem>}
      {isAuthenticated && (
        <>
          <NavItem to="orders">Order</NavItem>
          <NavItem to="orders" onClick={handleLogout}>
            Log out
          </NavItem>
        </>
      )}
    </ul>
  );
}

function NavItem({ children, ...props }) {
  const cssClass = ({ isActive }) => (isActive ? "border-b-2 w-30" : "");

  return (
    <NavLink className={cssClass} {...props}>
      {children}
    </NavLink>
  );
}
