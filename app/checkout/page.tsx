import { Suspense } from "react";
import CheckoutClient from "./_components/CheckoutClient";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<h1>جاري التحميل...</h1>}>
      <CheckoutClient />
    </Suspense>
  );
}
