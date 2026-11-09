import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart.slice";
import Button from "../UI/Button";
import { useAddItemToCart } from "../../hooks/useCart";
import { useEffect } from "react";

export default function AddToCartButton({
  id,
  name,
  summary,
  price,
  quantity = 1,
  ...props
}) {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );

  const { mutate: addItem } = useAddItemToCart();
  const handleAddToCart = (event) => {
    event.stopPropagation();
    dispatch(cartActions.addToCart({ id, name, summary, price, quantity }));
  };
  useEffect(() => {
    let timer;
    if (items.length > 0) {
      timer = setTimeout(() => {
        addItem({ data: { items, totalQuantity, totalPrice } });
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [items, addItem]);
  return (
    <Button onClick={handleAddToCart} {...props} black>
      Add to Cart
    </Button>
  );
}
