"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useShoppingCart } from "../_context/ShoppingCartContext";
import MyCart from "./MyCart";

const Header = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { shoppingCart } = useShoppingCart();

  return (
    !(pathname === "/sign-up" || pathname === "/sign-in") && (
      <header className="bg-white drop-shadow-lg relative z-[999]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex h-16 items-center justify-between">
            <Link href={"/"} className="md:flex md:items-center md:gap-12">
              <Image
                src={"/logo.svg"}
                alt="logo_image"
                width={50}
                height={50}
                className="w-[40px] md:w-[50px] cursor-pointer"
              />
            </Link>

            <div className="hidden md:block">
              <nav aria-label="Global ">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      Home
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      Explore
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      Projects
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      About Us
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {!user ? (
                <div className="flex items-center gap-1 md:gap-4">
                  <Link
                    className="rounded-md cursor-pointer bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-dark-primary duration-300"
                    href="/sign-in"
                  >
                    Login
                  </Link>

                  <Link
                    className="rounded-md cursor-pointer bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
                    href="/sign-up"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2  md:gap-4 ">
                  <div className="flex">
                    <ShoppingCart
                      className="text-dark-primary cursor-pointer"
                      onClick={() => setCartOpen((prev) => !prev)}
                    />
                    <span className="text-red-800">
                      ({shoppingCart.length})
                    </span>
                  </div>
                  <MyCart open={cartOpen} setCartOpen={setCartOpen} />
                  <UserButton />
                </div>
              )}

              <div className="relative inline-flex md:hidden">
                <div onClick={() => setMenuOpen((prev) => !prev)}>
                  <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  role="menu"
                  className={`absolute end-0 top-10 duration-300 ${
                    menuOpen ? "block" : "hidden"
                  } w-56 overflow-hidden rounded border border-gray-300 bg-white shadow-sm`}
                >
                  <Link
                    href="/"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    role="menuitem"
                  >
                    Home
                  </Link>

                  <a
                    href="#"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    role="menuitem"
                  >
                    Explore
                  </a>

                  <a
                    href="#"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    role="menuitem"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    role="menuitem"
                  >
                    About Us
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    role="menuitem"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
