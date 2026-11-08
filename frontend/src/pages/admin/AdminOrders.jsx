import PageContent from "../../components/shared/PageContent";
import { getOrder } from "../../util/order-http";
import { useQuery } from "@tanstack/react-query";
import { OrderContent, OrderItem, Item } from "../Order";

export default function AdminOrders() {
  const { data } = useQuery({
    queryKey: ["order"],
    queryFn: ({ signal }) => getOrder({ signal }),
  });
  const orders = data?.orders || [];
  return (
    <PageContent header="Orders">
      <OrderContent>
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} isAdmin />
        ))}
      </OrderContent>
    </PageContent>
  );
}
