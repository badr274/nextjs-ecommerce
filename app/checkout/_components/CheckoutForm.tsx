/* eslint-disable @typescript-eslint/no-explicit-any */
import { useShoppingCart } from "@/app/_context/ShoppingCartContext";
import { deleteCartItem } from "@/app/_utils/CartApis";
import { createOrder } from "@/app/_utils/OrderApis";
import { useUser } from "@clerk/nextjs";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";

const CheckoutForm = ({ amount }: { amount: number | string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState(null);
  const { shoppingCart } = useShoppingCart();
  const { user } = useUser();
  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const handleError = (error: any) => {
      setLoading(false);
      setErrorMessage(error.message);
    };
    // Invoke create order and send email
    handleCreateOrder();
    sendEmail();
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const res = await fetch("api/create-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    });
    const { clientSecret } = await res.json();
    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/confirm-page",
      },
    });
    if (result.error) {
      console.log(result.error.message);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  // Handel Order creation
  const handleCreateOrder = () => {
    const orderProducts: number | string[] = [];
    shoppingCart.forEach((item) =>
      orderProducts.push(item.product.documentId as string)
    );
    const orderData = {
      data: {
        username: user?.fullName as string,
        email: user?.primaryEmailAddress?.emailAddress as string,
        products: orderProducts,
        amount: amount as number,
      },
    };
    createOrder(orderData).then((res) => {
      if (res) {
        shoppingCart.forEach((ele) => {
          deleteCartItem(ele.documentId);
        });
      }
    });
  };
  // Hanlde send email
  const sendEmail = async () => {
    await fetch("api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
      }),
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-20 md:mt-28 container">
        <PaymentElement />
        <button
          className={`w-full mt-8 py-3 md:py-4 md:w-1/2 flex items-center justify-center gap-1 mx-auto 
              duration-200 text-white font-semibold rounded-lg cursor-pointer ${loading ? "bg-primary/50" : "bg-primary"}`}
        >
          {loading ? (
            <>
              {" "}
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
