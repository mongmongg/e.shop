import { useEffect } from "react";
import { useAddItemToCart } from "../../hooks/useCart";
import { cartActions } from "../../../store/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Line from "../UI/Line";
import { useProductById } from "../../hooks/useProduct";
import { BASE_URL } from "../../util/http";

export default function CartItem({ item }) {
  const { mutate: updateItem } = useAddItemToCart();
  const { data } = useProductById({ pId: item.id });
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );
  const handleAddToCart = (event) => {
    event.stopPropagation();
    dispatch(
      cartActions.addToCart({
        id: item.id,
        name: item.name,
        summary: item.summary,
        price: item.price,
        quantity: 1,
      }),
    );
  };
  useEffect(() => {
    let timer;
    if (items.length > 0) {
      timer = setTimeout(() => {
        updateItem({ data: { items, totalQuantity, totalPrice } });
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [items, totalQuantity, totalPrice, updateItem]);

  const handleMinusBtn = (event) => {
    event.stopPropagation();
    dispatch(cartActions.removeItemFromCart(item.id));
  };

  const server = BASE_URL;

  return (
    <li className="w-full h-50 flex gap-8 mt-4 max-lg:h-50 max-md:flex-col max-md:gap-2 max-md:h-auto ">
      <div className="max-w-80 max-lg:w-50 max-lg:h-fit max-md:w-full overflow-hidden">
        <img
          src={`${data.product.image}`}
          className="object-cover"
        ></img>
      </div>
      <div>
        <p className="text-lg mb-2! max-lg:text">{item.name}</p>
        <p className="text-gray-500 max-lg:text-sm">{item.summary}</p>
        <p className="text-2xl mb-2! max-lg:text-lg">{item.price} THB</p>
        <div className="flex items-center gap-4 w-26 mb-1 bg-black/10 px-4 py-2 rounded-full max-lg:w-20 max-lg:px-2">
          <FaMinus
            onClick={handleMinusBtn}
            className="hover:cursor-pointer max-lg:text-xs"
          />
          <p className="max-lg:text-xs">{item.quantity}</p>
          <FaPlus
            className="hover:cursor-pointer max-lg:text-xs"
            onClick={handleAddToCart}
          />
        </div>

        <p className="text-gray-700 max-lg:text-sm">
          Subtotal: <span className="font-semibold">{item.totalPrice} THB</span>
        </p>
      </div>
      <Line />
    </li>
  );
}
