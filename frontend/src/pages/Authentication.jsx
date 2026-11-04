import { useSearchParams } from "react-router-dom";
import image from "/hero/hero-2.jpg";
import Button from "../components/UI/Button";
import Form from "../components/Form/Form";
import SigninForm from "../components/Form/SigninForm";
import SignupForm from "../components/Form/SignupForm";
import { useAuth } from "../hooks/useUserData";
import { useNavigate } from "react-router-dom";
export default function Authentication() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "signin";
  const navigate = useNavigate();
  const { mutate } = useAuth({
    isLogin,
    onSuccessFallback: () => {
      navigate("/");
    },
  });
  const handleSubmit = (data) => {
    console.log(data);
    mutate({ data });
  };
  return (
    <article className="mt-8 grid grid-cols-2 w-full min-h-120">
      <Form onSubmit={handleSubmit} className="ml-40 mr-30">
        <h1 className="text-2xl font-semibold">
          {isLogin ? "Sign in" : "Sign up"}
        </h1>
        <span className="text-gray-700">
          {isLogin
            ? "Sign in to access your account, orders, and saved details."
            : "Register now for exclusive offers and order updates"}
        </span>
        {/* error message */}
        {/* <span className="">error</span> */}
        {isLogin && <SigninForm />}
        {!isLogin && <SignupForm />}
        <Button className="bg-black text-white max-md:text-sm">
          {isLogin ? "Sign in" : "Sign up"}
        </Button>
      </Form>
      <section className="bg-black mr-8 rounded-xl overflow-hidden">
        <img src={image} className="w-full h-full object-cover"></img>
      </section>
    </article>
  );
}
