import { Link } from "react-router-dom";
import { useEffect } from "react";
import Input from "./Input";
export default function SignupForm({ resetError }) {
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
      <Input name="fullname" label="Full Name" placeholder="Jane Doe" />
      <p className="flex gap-4">
        <input type="checkbox" name="terms" id="terms" required></input>
        <label htmlFor="terms">Membership agreement</label>
      </p>
      <p className="py-4 text-gray-700">
        Already have an account?
        <Link
          to="/auth/?mode=signin"
          className="ml-1 text-black font-semibold  hover:underline  hover:underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </section>
  );
}
