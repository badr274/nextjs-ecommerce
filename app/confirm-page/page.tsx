import Image from "next/image";
import Link from "next/link";

const PaymentConfirm = () => {
  return (
    <div className="flex flex-col items-center justify-center px-5 mt-4">
      <Image
        src={"/verified.gif"}
        alt="verified_image"
        width={130}
        height={130}
      />
      <h2 className="text-2xl">Payment Successfully !</h2>
      <p>
        We sent an email with your order confirmation along with Digital Content
      </p>
      <Link
        href={"/"}
        className="p-2 mt-6 text-white rounded-md bg-primary hover:bg-dark-primary duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default PaymentConfirm;
