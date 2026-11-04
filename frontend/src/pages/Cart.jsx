import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "../components/Cart/CartItem";
import SummaryCart from "../components/Cart/SummaryCart";
import PageContent from "../components/shared/PageContent";

export default function Cart() {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate("/cart/checkout");
  };
  return (
    <PageContent header="Shopping Cart">
      <ul className="w-full col-span-2 max-md:col-span-1">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <SummaryCart
        actionBtn="Check Out"
        onAction={handleCheckout}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
      />
    </PageContent>
  );
}
