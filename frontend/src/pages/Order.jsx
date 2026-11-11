import PageContent from "../components/shared/PageContent";
import { useGetOrder, useUpdateOrder } from "../hooks/useOrder";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import { useProductById } from "../hooks/useProduct";

export default function Order() {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const { data, isLoading } = useGetOrder({ isAdmin });

  const orders = data.orders;
  return (
    <PageContent header={isAdmin ? "Customer Orders" : "Your Orders"}>
      <OrderContent>
        {!isLoading && (!orders || orders.length <= 0) && (
          <div className=" col-span-3 w-full mt-8 text-center">
            <h1 className="mb-4 text-xl">You have no ordered yet</h1>
            <Link to="/products">
              <Button black>Start Shopping</Button>
            </Link>
          </div>
        )}
        {!isLoading &&
          orders &&
          orders.map((order) => (
            <OrderItem key={order._id} order={order} isAdmin={isAdmin} />
          ))}
      </OrderContent>
    </PageContent>
  );
}
export function OrderContent({ children }) {
  return <ul className="mt-4 mx-auto col-span-3 w-[80%]">{children}</ul>;
}
export function OrderItem({ order, isAdmin }) {
  const { mutate } = useUpdateOrder();

  const { data } = useProductById({
    pId: order.productsData.items[order.productsData.items.length - 1].id,
  });
  const date = new Date(order.date);
  const formatedDate = date.toLocaleDateString("en-TH", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const handleStatusChange = (event, status) => {
    if (event.target.value !== status) {
      mutate({ id: order._id, status: event.target.value });
    }
  };

  return (
    <li className="w-full h-50 flex gap-8 mt-4 max-lg:h-50 max-md:flex-col max-md:gap-2 max-md:h-auto ">
      <div className="max-w-80 max-lg:w-50 max-lg:h-fit max-md:w-full overflow-hidden">
        <img
          src={data.product.image}
          className="max-lg:w-50 max-lg:h-fit max-md:w-full"
        ></img>
      </div>
      <div>
        <p className="text-lg mb-2! max-lg:text">Order: {order._id}</p>
        {isAdmin && (
          <p className="text-lg mb-2! max-lg:text">
            User: {order.userData.email}
          </p>
        )}
        <p className="text-2xl mb-2! max-lg:text-lg">
          {order.productsData.totalPrice} THB - {formatedDate}
        </p>
        <ul className="mb-2">
          {order.productsData.items.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </ul>
        <div>
          <p className="text-gray-700 max-lg:text-sm">
            Status:
            {!isAdmin && <span className="font-semibold">{order.status}</span>}
            {isAdmin && (
              <select
                name="status"
                defaultValue={order.status}
                onChange={(event) => handleStatusChange(event, order.status)}
              >
                <option value="pending">pending</option>
                <option value="paid">paid</option>
                <option value="unpaid">unpaid</option>
                <option value="delivery">out for delivery</option>
                <option value="delivered">delivered</option>
              </select>
            )}
          </p>
        </div>
      </div>
    </li>
  );
}

export function Item({ name, price, quantity }) {
  return (
    <li className="flex">
      <p className="text-gray-500 max-lg:text-sm">
        {name} - <span>{price} THB </span>
        <span>
          ({price} THB x {quantity})
        </span>
      </p>
    </li>
  );
}
