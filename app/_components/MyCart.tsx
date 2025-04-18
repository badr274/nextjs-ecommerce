import Image from "next/image";
import { useShoppingCart } from "../_context/ShoppingCartContext";
import Link from "next/link";

const MyCart = ({
  open,
  setCartOpen,
}: {
  open: boolean;
  setCartOpen: (cartOpen: boolean) => void;
}) => {
  const { shoppingCart } = useShoppingCart();
  const renderShoppingCartItems = shoppingCart.map((item) => {
    const { thumbnail, title, category, price } = item.product;
    return (
      <li key={item.id} className="flex items-center gap-4">
        <Image
          src={thumbnail.url}
          alt="cart_image"
          className="size-16 rounded-sm object-cover"
          width={100}
          height={100}
        />

        <div>
          <h3 className="text-sm text-gray-900 line-clamp-1">{title}</h3>

          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
            <div>
              <dt className="inline">Category:</dt>
              <dd className="inline">{category}</dd>
            </div>

            <div>
              <dt className="inline">Price:</dt>
              <dd className="inline">${price}</dd>
            </div>
          </dl>
        </div>
      </li>
    );
  });
  return (
    <div
      className={`h-[350px] w-[300px] ${
        open ? "block" : "hidden"
      } bg-gray-100 rounded-md border border-black/50
        shadow-sm absolute !z-[999] mx-10 right-10 top-12 p-5 overflow-auto `}
    >
      <div className="mt-4 space-y-6">
        {shoppingCart.length ? (
          <ul className="space-y-4">{renderShoppingCartItems}</ul>
        ) : (
          <div className="text-center">Your cart is empty.</div>
        )}

        <div className="space-y-4 text-center">
          <Link
            href="/cart"
            className="block rounded-sm bg-primary text-white border border-gray-600 px-5 py-3 text-sm transition hover:ring-1 hover:ring-gray-400"
            onClick={() => setCartOpen(false)}
          >
            View my cart ({shoppingCart.length})
          </Link>

          <Link
            href={"/"}
            className="inline-block cursor-pointer text-sm  text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
            onClick={() => setCartOpen(false)}
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
