"use client";
import Image from "next/image";
import { useShoppingCart } from "../_context/ShoppingCartContext";
import { Trash2 } from "lucide-react";
import { deleteCartItem } from "../_utils/CartApis";
import Link from "next/link";

const CartPage = () => {
  const { shoppingCart } = useShoppingCart();
  const calcTotal = () => {
    let total = 0;
    shoppingCart.forEach((item) => {
      total += item.product.price;
    });
    return total.toFixed(2);
  };
  const handleDelete = (documentId: string) => {
    deleteCartItem(documentId);
    window.location.reload();
  };
  const renderCartItems = shoppingCart.map((item) => {
    const { thumbnail, title, category, price } = item.product;
    return (
      <li key={item.id} className="flex items-center gap-4">
        <Image
          src={thumbnail.url}
          alt="cart_image"
          width={100}
          height={100}
          className="size-16 rounded-sm object-cover"
        />

        <div>
          <h3 className="text-sm text-gray-900">{title}</h3>

          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
            <div>
              <dt className="inline">Category:</dt>
              <dd className="inline">{category}</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <strong>${price}</strong>
          <button
            className="text-gray-600 cursor-pointer transition hover:text-red-600"
            onClick={() => handleDelete(item.documentId as string)}
          >
            <span className="sr-only">Remove item</span>
            <Trash2 size={"16px"} />
          </button>
        </div>
      </li>
    );
  });
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            {shoppingCart.length ? (
              <ul className="space-y-4">{renderCartItems}</ul>
            ) : (
              <h2 className="text-lg text-center text-red-700">
                The cart is empty.
              </h2>
            )}

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>${calcTotal()}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <Link
                    href={`/checkout?amount=${calcTotal()}`}
                    className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="text-primary text-sm">
                  Note: All items will be sent via Email
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
