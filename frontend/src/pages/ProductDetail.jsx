import image from "/hero/hero-1.jpg";
import { useDispatch } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Button from "../components/UI/Button";
import { useState } from "react";
import { cartActions } from "../../store/cart.slice";
import AddToCartButton from "../components/Cart/AddToCartButton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchProductById } from "../util/http";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const [amount, setAmount] = useState(1);
  const { pId } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ["product"],
    queryFn: ({ signal }) => fetchProductById({ id: pId }),
  });
  const prod = data.product;
  // const handleAddToCart = (event) => {
  //   event.stopPropagation();
  //   dispatch(cartActions.addToCart({ id, name, summary, price }));
  // };
  const handleAddBtn = () => {
    setAmount((prev) => prev + 1);
  };
  const handleMinusBtn = () => {
    setAmount((prev) => (prev === 1 ? prev : prev - 1));
  };

  return (
    <section className="min-h-130 grid grid-cols-3 mx-30 mt-8 mb-16">
      <div className="col-span-2">
        <img src={image}></img>
      </div>
      <div className="mx-16 ">
        <div className="flex flex-cols justify-between mb-4 [&_p]:text-2xl [&_p]:font-semibold">
          <p>{prod.name}</p>
          <p>{prod.price} THB</p>
        </div>
        <p>{prod.description}</p>
        <div className="mt-8 flex gap-4">
          <div className="flex items-center gap-4 bg-black/10 px-4 py-2 rounded-full">
            <FaMinus
              onClick={handleMinusBtn}
              className={
                amount === 1 ? "text-gray-500" : "hover:cursor-pointer"
              }
            />
            <p>{amount}</p>
            <FaPlus className="hover:cursor-pointer" onClick={handleAddBtn} />
          </div>
          <AddToCartButton
            id={prod._id}
            summary={prod.summary}
            name={prod.name}
            price={prod.price}
            quantity={amount}
            className="w-full bg-black text-white hover:bg-black/80"
          />
          {/* <Button>Add to Cart</Button> */}
        </div>
      </div>
    </section>
  );
}
