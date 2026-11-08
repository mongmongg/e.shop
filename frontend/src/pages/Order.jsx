import PageContent from "../components/shared/PageContent";
import image from "/hero/hero-1.jpg";
import { getOrder } from "../util/order-http";
import { useQuery } from "@tanstack/react-query";

export default function Order() {
  const { data } = useQuery({
    queryKey: ["order"],
    queryFn: ({ signal }) => getOrder({ signal }),
  });
  const orders = data?.orders || [];
  return (
    <PageContent header="Your Orders">
      <OrderContent>
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </OrderContent>
    </PageContent>
  );
}
export function OrderContent({ children }) {
  return <ul className="mt-4 mx-auto col-span-3 w-[80%]">{children}</ul>;
}
export function OrderItem({ order, isAdmin }) {
  const date = new Date(order.date);
  const formatedDate = date.toLocaleDateString("en-TH", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const handleStatusChange = (event, status) => {
    if (event.target.value !== status) {
      console.log(event.target.value);
      // update to server
    }
  };

  return (
    <li className="w-full h-50 flex gap-8 mt-4 max-lg:h-50 max-md:flex-col max-md:gap-2 max-md:h-auto ">
      <img src={image} className="max-lg:w-50 max-lg:h-fit max-md:w-full"></img>
      <div>
        <p className="text-lg mb-2! max-lg:text">Order: {order._id}</p>
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
