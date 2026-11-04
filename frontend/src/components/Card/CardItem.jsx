import { useNavigate } from "react-router-dom";
import AddToCartButton from "../Cart/AddToCartButton";

export default function CardItem({ image, name, summary, price, id }) {
  const navigate = useNavigate();
  const handleDetailItem = () => {
    navigate(`/products/${id}`);
  };

  return (
    <li
      className="w-80 h-100 rounded-xl px-2 py-2 max-md:w-50 max-md:h-75 max-lg:w-62 max-lg:h-85 max-sm:mx-auto max-sm:w-45 hover:cursor-pointer"
      onClick={handleDetailItem}
    >
      <div className="bg-black h-6/10 rounded-xl overflow-hidden">
        <img
          src={image}
          className="object-center object-cover w-full h-full"
        ></img>
      </div>
      <div className="mt-2 [&_p]:max-md:text-sm">
        <p className="text-lg font-semibold ">{name}</p>
        <p className="text-gray-700 text-sm max-md:!text-xs">{summary}</p>
        <p className="font-semibold">${price}</p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <AddToCartButton
          id={id}
          summary={summary}
          name={name}
          price={price}
          className="bg-black text-white w-full max-md:text-sm"
        />
      </div>
    </li>
  );
}
