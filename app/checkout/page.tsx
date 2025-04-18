"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY}`
);
const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const options: StripeElementsOptions = {
    payment_method_types: ["card"],
    mode: "payment",
    currency: "usd",
    amount: 100,
  };
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount as string} />
      </Elements>
    </Suspense>
  );
};

export default CheckoutPage;
