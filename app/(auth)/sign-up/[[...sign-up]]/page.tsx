import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-2 text-white mb-6 md:mb-8 lg:mb-10">
          <Image src={"/logo.svg"} alt="logo_image" width={50} height={50} />
          <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
            Ecommerce
          </h1>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
