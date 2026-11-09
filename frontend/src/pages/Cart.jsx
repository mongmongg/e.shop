import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useAddItemToCart } from "../hooks/useCart";

import CartItem from "../components/Cart/CartItem";
import SummaryCart from "../components/Cart/SummaryCart";
import PageContent from "../components/shared/PageContent";
import Button from "../components/UI/Button";
import { useEffect } from "react";

export default function Cart() {
  const { mutate: updateItem } = useAddItemToCart();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/cart/checkout");
  };
  useEffect(() => {
    if (totalQuantity === 0) {
      updateItem({ data: { items: [], totalQuantity: 0, totalPrice: 0 } });
    }
  }, [totalQuantity, updateItem]);

  return (
    <PageContent header="Shopping Cart">
      {items.length === 0 && (
        <div className=" col-span-3 w-full mt-8 text-center">
          <h1 className="mb-4 text-xl">Your shopping cart is empty</h1>
          <Link to="/products">
            <Button black>Start Shopping</Button>
          </Link>
        </div>
      )}
      {items.length > 0 && (
        <>
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
        </>
      )}
    </PageContent>
  );
}
