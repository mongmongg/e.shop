import { NavLink } from "react-router-dom";

export default function NavItem({ to, children, ...props }) {
  const cssClass = ({ isActive }) =>
    isActive
      ? "px-4 py-6 bg-black text-white"
      : "hover:bg-black/50 hover:text-white px-4 py-6";
  return (
    <li>
      <NavLink to={to} className={cssClass} {...props}>
        {children}
      </NavLink>
    </li>
  );
}
