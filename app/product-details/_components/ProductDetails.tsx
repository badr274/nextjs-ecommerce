import { IProduct } from "../../_interfaces";
import Image from "next/image";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { addToCart } from "@/app/_utils/CartApis";
import { useShoppingCart } from "@/app/_context/ShoppingCartContext";

const ProductDetails = ({ productDetails }: { productDetails: IProduct }) => {
  const { user } = useUser();
  const router = useRouter();
  const { setShoppingCart, shoppingCart } = useShoppingCart();
  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const data = {
        data: {
          username: user.fullName as string,
          email: user.primaryEmailAddress?.emailAddress as string,
          products: [productDetails.documentId as string],
        },
      };

      addToCart(data).then((res) => {
        setShoppingCart(() => [
          ...shoppingCart,
          {
            id: res.data.data.id,
            documentId: res.data.data.documentId,
            product: productDetails,
          },
        ]);
      });
    }
  };
  if (!productDetails.documentId)
    return (
      <div
        role="status"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8"
      >
        <div className="h-[300px] w-full bg-gray-200 rounded-lg dark:bg-gray-700  mb-4"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[100px] mb-5 md:mb-8"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-1"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-1"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-1"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-4"></div>
          <div className="h-5 bg-gray-200 rounded-md dark:bg-gray-700 max-w-[160px]"></div>
        </div>
      </div>
    );
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
      <div>
        <Image
          src={productDetails?.thumbnail?.url}
          alt="product_image"
          width={1000}
          height={400}
          className="rounded-lg h-[300px] md:h-[400px] object-cover"
        />
      </div>
      <div>
        <h2 className="text-xl mb-2 md:mb-3 md:text-2xl lg:text-3xl font-bold">
          {productDetails.title}
        </h2>
        <strong className="text-gray-400">{productDetails.category}</strong>
        <p className="text:sm md:text-base mt-5 md:mt-8">
          {productDetails.description}
        </p>
        <span className="flex gap-1 text-gray-700 text-sm items-center mt-1 md:mt-2">
          {productDetails.instantDelivery ? (
            <BadgeCheck className="text-primary text-sm" />
          ) : (
            <AlertOctagon className="text-red-700" />
          )}
          Eligiable for instant delivery
        </span>
        <p className="text-2xl md:text-3xl text-primary font-semibold my-4 md:my-7">
          ${productDetails.price}
        </p>
        <button
          type="button"
          className="text-white bg-primary hover:bg-dark-primary flex items-center gap-1 px-3 py-2 md:px-4 md:py-3 rounded-md cursor-pointer duration-300"
          onClick={handleAddToCart}
        >
          Add to cart <ShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
