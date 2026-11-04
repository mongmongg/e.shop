import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "../store/store";
import "./App.css";
import Root from "./pages/Root";
import Home from "./pages/Home";
// import ProductDetail from "./pages/ProductDetail";
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
import AllProducts from "./pages/AllProducts";
import Authentication from "./pages/Authentication";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import ErrorPage from "./pages/ErrorPage";
import { queryClient } from "./util/http";
import { lazy } from "react";
import { Suspense } from "react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/products",
          element: <AllProducts />,
        },
        {
          path: "/products/:pId",
          element: <ProductDetail />,
        },
        { path: "/cart", element: <Cart /> },
        { path: "/cart/checkout", element: <Checkout /> },
        { path: "/order", element: <Order /> },
        { path: "auth", element: <Authentication /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Suspense fallback={<p>Loading</p>}>
          <RouterProvider router={router}></RouterProvider>
        </Suspense>
      </Provider>
    </QueryClientProvider>
  );
}
export default App;
