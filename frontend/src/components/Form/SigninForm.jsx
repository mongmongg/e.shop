import { Link } from "react-router-dom";
import Input from "./Input";
import { useEffect } from "react";
export default function SigninForm({ resetError }) {
  useEffect(() => {
    resetError();
  }, []);
  return (
    <section className="mt-4">
      <Input
        name="email"
        label="Email Adress"
        type="email"
        placeholder="you@example.com"
      />
      <Input
        name="password"
        label="Password"
        type="password"
        minLength="8"
        placeholder="At least 8 characters"
      />
      <p className="py-4 text-gray-700">
        New here?
        <Link
          to="/auth/?mode=signup"
          className="ml-1 text-black font-semibold  hover:underline  hover:underline-offset-4"
        >
          Create an account
        </Link>
      </p>
    </section>
  );
}
