import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useUserData";
import image from "/hero/hero-2.jpg";
import Button from "../components/UI/Button";
import Form from "../components/Form/Form";
import SigninForm from "../components/Form/SigninForm";
import SignupForm from "../components/Form/SignupForm";
export default function Authentication() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "signin";
  const navigate = useNavigate();
  const { mutate, isError, error, reset } = useAuth({
    isLogin,
    onSuccessFallback: () => {
      navigate("/");
    },
  });
  const handleSubmit = (data) => {
    mutate({ data });
  };
  return (
    <article className="mt-8 grid grid-cols-2 w-full min-h-120 max-md:grid-cols-1">
      <Form onSubmit={handleSubmit} className="ml-40 mr-30 max-md:mx-8">
        <h1 className="text-2xl font-semibold">
          {isLogin ? "Sign in" : "Sign up"}
        </h1>
        <span className="text-gray-700">
          {isLogin
            ? "Sign in to access your account, orders, and saved details."
            : "Register now for exclusive offers and order updates"}
        </span>
        {isLogin && <SigninForm resetError={reset} />}
        {!isLogin && <SignupForm resetError={reset} />}
        {isError && <p className="text-red-500 my-2!">{error.message}</p>}
        <Button black>{isLogin ? "Sign in" : "Sign up"}</Button>
      </Form>
      <section className="bg-black mr-8 rounded-xl overflow-hidden max-md:hidden">
        <img src={image} className="w-full h-full object-cover"></img>
      </section>
    </article>
  );
}
