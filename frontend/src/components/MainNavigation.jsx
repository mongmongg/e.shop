import { MdDehaze, MdOutlineShoppingBag } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
export default function MainNavigation() {
  const handleDrawer = () => {
    console.log("Clicked");
  };
  return (
    <header className="w-full flex justify-between items-center py-4 px-4">
      <MdDehaze className="w-5 h-5" onClick={handleDrawer} />
      <div className="flex flex-row gap-2 w-full justify-center items-center absolute">
        <FaOpencart />
        <span>e.store</span>
      </div>
      <nav>
        <ul className="flex flex-row gap-4 items-center max-md:hidden [&_li]:hover:text-red">
          <li>About</li>
          <li>FAQs</li>
          <li
            className="px-2 py-2 rounded-[50%] border-2 border-gray-400"
            onClick={handleDrawer}
          >
            <MdOutlineShoppingBag className="w-4 h-4 m-auto text-gray-600" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
