import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductById } from "../hooks/useProduct";
import { FaMinus, FaPlus } from "react-icons/fa6";

import image from "/hero/hero-1.jpg";
import Button from "../components/UI/Button";
import AddToCartButton from "../components/Cart/AddToCartButton";

export default function ProductDetail() {
  const [amount, setAmount] = useState(1);
  const { pId } = useParams();
  const { data, isLoading } = useProductById({ pId });

  const prod = data.product;
  const isAdmin = true; //check isAdmin?

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
        {!isAdmin && (
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
          </div>
        )}

        {isAdmin && (
          <div className="mt-4">
            <Link to="edit">
              <Button className="bg-black text-white w-full max-md:text-sm hover:bg-black/70">
                Edit
              </Button>
            </Link>
          </div>
        )}
        {/* <Button>Add to Cart</Button> */}
      </div>
    </section>
  );
}
