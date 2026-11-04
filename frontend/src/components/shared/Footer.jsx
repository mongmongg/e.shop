import {
  FaOpencart,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-black grid grid-cols-3 min-h-80 text-white [&_p]:text-gray-500 [&_p]:text-sm px-18 py-18 max-md:px-2 ">
      <section>
        <div className="flex flex-cols gap-1 items-center text-xl mb-2">
          <FaOpencart />
          <h2>e.store</h2>
        </div>
        <p className="text-sm">Shopping new fashion with us</p>
      </section>
      <section className="mx-auto text-left leading-8 text-gray-500">
        <Link to="products" className="hover:text-white">
          Our Products
        </Link>
      </section>
      <section>
        <h2 className="mb-2">Get rewards for shopping</h2>
        <p>
          Subscribe to get special offers. The more you shop, the more you get
        </p>
        <form className="my-2">
          <label htmlFor="email"></label>
          <p className="flex items-center justify-between gap-2 border  border-white/25 px-2 py-2">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your e-mail address here"
              className="text-sm w-full py-1"
            />
            <FaChevronRight className="text-md" />
          </p>
        </form>
        <div className="flex gap-4 mt-8">
          <FaInstagram />
          <FaFacebookF />
          <FaTwitter />
        </div>
      </section>
    </footer>
  );
}
