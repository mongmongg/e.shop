import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams, useSearchParams } from "react-router-dom";
import PageContent from "../components/shared/PageContent";
import Button from "../components/UI/Button";
import { MdCancel } from "react-icons/md";
import { usePaymentComplete } from "../hooks/useCart";
import { useEffect } from "react";
import LoadingPage from "./LoadingPage";

export default function Payment() {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const { oId } = useParams();

  const { mutate: paymentUpdate, data, isPending } = usePaymentComplete();
  useEffect(() => {
    paymentUpdate({ oId, session_id });
  }, []);

  if (isPending || !data) {
    return <LoadingPage />;
  }
  const isSuccess = data?.status === "paid";

  return (
    <PageContent header={`Payment ${isSuccess ? "Successful" : "Cancelled"}`}>
      <article className="col-span-3 mx-auto text-center mt-10">
        {isSuccess ? (
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        ) : (
          <MdCancel className="text-red-500 text-5xl mx-auto mb-4" />
        )}
        <h1 className="text-lg font-semibold">
          Payment {`${isSuccess ? "Successful" : "Cancelled"}`}
        </h1>
        <p className="mb-4!">
          {`${isSuccess ? "Thank you for your purchase, Payment successful, and your order is comfirmed" : "Your payment has been cancelled"}`}
        </p>
        <Link to="/">
          <Button black>Go to Homepage</Button>
        </Link>
      </article>
    </PageContent>
  );
}
