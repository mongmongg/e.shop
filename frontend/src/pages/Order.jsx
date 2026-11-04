import PageContent from "../components/shared/PageContent";
import image from "/hero/hero-1.jpg";

export default function Order() {
  return (
    <PageContent header="Your Orders">
      <ul className="mt-4 mx-auto col-span-3 w-[80%]">
        <li className="w-full h-50 flex gap-8 mt-4 max-lg:h-50 max-md:flex-col max-md:gap-2 max-md:h-auto ">
          <img
            src={image}
            className="max-lg:w-50 max-lg:h-fit max-md:w-full"
          ></img>
          <div>
            <p className="text-lg mb-2! max-lg:text">Order #id</p>
            <p className="text-2xl mb-2! max-lg:text-lg">total price - date</p>
            <ul className="mb-2">
              {/* map here */}
              <OrderItem />
              <OrderItem />
              <OrderItem />
            </ul>
            <p className="text-gray-700 max-lg:text-sm">
              Status: <span className="font-semibold">paid</span>
            </p>
          </div>
        </li>
      </ul>
    </PageContent>
  );
}

function OrderItem() {
  return (
    <li className="flex">
      <p className="text-gray-500 max-lg:text-sm">
        product name - <span>price THB </span>
        <span>(price THB x quantity)</span>
      </p>
    </li>
  );
}
