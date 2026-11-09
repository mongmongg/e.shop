import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";
import { queryClient } from "./util/http";
import store from "../store/store";
import "./App.css";
import Root from "./pages/Root";
import ProtectedAdminRoot from "./pages/admin/ProtectedAdminRoot";

const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const Authentication = lazy(() => import("./pages/Authentication"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Cart = lazy(() => import("./pages/Cart"));
const Order = lazy(() => import("./pages/Order"));
const Payment = lazy(() => import("./pages/Payment"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const NewProduct = lazy(() => import("./pages/admin/NewProduct"));
// import Home from "./pages/Home";
// import AllProducts from "./pages/AllProducts";
// import Authentication from "./pages/Authentication";
//import Checkout from "./pages/Checkout";
// import Cart from "./pages/Cart";
// import Order from "./pages/Order";
import ErrorPage from "./pages/ErrorPage";
// import Payment from "./pages/Payment";
// import AdminProducts from "./pages/admin/AdminProducts";
// import NewProduct from "./pages/admin/NewProduct";

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
        { path: "/payment/:oId", element: <Payment /> },
        { path: "/orders", element: <Order /> },
        { path: "/auth", element: <Authentication /> },
      ],
    },
    {
      path: "/admin",
      element: <ProtectedAdminRoot />,
      children: [
        {
          index: "true",
          path: "products",
          element: <AdminProducts />,
        },
        { path: "orders", element: <Order /> },
        { path: "products/new", element: <NewProduct /> },
        { path: "products/:pId", element: <ProductDetail /> },
        { path: "products/:pId/edit", element: <NewProduct /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Suspense>
          <RouterProvider router={router}></RouterProvider>
        </Suspense>
      </Provider>
    </QueryClientProvider>
  );
}
export default App;
