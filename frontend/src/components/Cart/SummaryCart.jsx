import Line from "../UI/Line";
import Button from "../UI/Button";
import { useSelector } from "react-redux";

export default function SummaryCart({
  actionBtn,
  onAction,
  totalQuantity,
  totalPrice,
}) {
  const sumCss = "text-xl font-semibold max-lg:text-md";
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // const handleActionBtn = () => {
  //   onAction();
  // };
  return (
    <div className="bg-black/10 px-6 py-8 w-full lg:max-w-80 max-h-75">
      <FlexContent>
        <p className={sumCss}>Order Summary</p>
        <p className={sumCss}>{totalQuantity} item(s)</p>
      </FlexContent>
      <Line />
      <FlexContent>
        <p>Item's total</p>
        <p>{totalQuantity}</p>
      </FlexContent>
      <Line />
      <FlexContent>
        <p className={sumCss}>Order total</p>
        <p className={sumCss}>{totalPrice} THB</p>
      </FlexContent>
      <div className="mt-8 flex gap-4">
        <Button
          onClick={onAction}
          disabled={!isAuthenticated}
          className={`w-full  text-white hover:bg-black/80 ${!isAuthenticated ? "bg-black/80" : "bg-black"}`}
        >
          {actionBtn}
        </Button>
      </div>
      {!isAuthenticated && (
        <p className="text-sm my-2! ">*Please sign in before check out</p>
      )}
    </div>
  );
}

function FlexContent({ children }) {
  return <div className="flex flex-cols justify-between mb-4 ">{children}</div>;
}
