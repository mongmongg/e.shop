import { NavLink } from "react-router-dom";
export default function SideMenu({ handleDrawer }) {
  const cssClass = ({ isActive }) => (isActive ? "border-b-2 w-30" : "");
  return (
    <ul className="flex flex-col pl-12 gap-4 py-8">
      <NavLink to="/" end onClick={handleDrawer} className={cssClass}>
        Product
      </NavLink>
      <NavLink to="/signin" onClick={handleDrawer} className={cssClass}>
        Sign in
      </NavLink>
      <NavLink to="/signup" onClick={handleDrawer} className={cssClass}>
        Sign up
      </NavLink>
    </ul>
  );
}
