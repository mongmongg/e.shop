import SummaryCart from "../components/Cart/SummaryCart";
import PageContent from "../components/shared/PageContent";
import Input from "../components/Form/Input";
import Form from "../components/Form/Form";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { usePayment } from "../hooks/useCart";
import { useCheckAuthStatus } from "../hooks/useUserData";

export default function Checkout() {
  const { totalPrice, totalQuantity } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.auth);
  const [firstName, lastName] = userData.fullname.split(" ");
  const { data, mutate: paymentMutate } = usePayment();
  //console.log(data);
  const handleOrder = (data) => {
    console.log(data);
    data.email = userData.email;
    paymentMutate({ data });
  };
  return (
    <Form onSubmit={handleOrder}>
      <PageContent header="Checking Out">
        <section className="max-w-130 col-span-2 mx-auto right max-md:col-span-1">
          <Container>
            <Head>Contact</Head>
            <Input
              label="E-mail Address"
              type="email"
              name="email"
              disabled
              defaultValue={userData.email}
            ></Input>
          </Container>
          <Container>
            <Head>Customer Information</Head>
            <FlexContainer>
              <Input
                label="First Name"
                name="firstName"
                defaultValue={firstName}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                defaultValue={lastName}
                required
              />
            </FlexContainer>
            <Input label="Address" name="address" textarea rows="1" required />
            <FlexContainer>
              <Input label="City" name="city" required />
              <Input label="Postal Code" name="postal" required />
            </FlexContainer>
            <Input
              label="Phone Number"
              name="phone"
              minLength="10"
              maxLength="10"
              required
            />
          </Container>
          <Container>
            <Link
              to="/cart"
              className="font-semibold flex gap-2 items-center hover:underline-offset-4 hover:underline"
            >
              <FaArrowAltCircleLeft /> <span>Back to cart</span>
            </Link>
          </Container>
        </section>
        <SummaryCart
          totalQuantity={totalQuantity}
          totalPrice={totalPrice}
          actionBtn="Continue to payment"
        />
      </PageContent>
    </Form>
  );
}

function Head({ children }) {
  return <h2 className="text-xl font-semibold mb-2">{children}</h2>;
}
function Container({ children }) {
  return <div className="mb-6">{children}</div>;
}
function FlexContainer({ children }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}
