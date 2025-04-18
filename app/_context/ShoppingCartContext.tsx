"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProduct } from "../_interfaces";
import { useUser } from "@clerk/nextjs";
import { getCartItems } from "../_utils/CartApis";
interface ICart {
  id: string | number;
  documentId: string;
  product: IProduct;
}
interface IContext {
  shoppingCart: ICart[];
  setShoppingCart: Dispatch<SetStateAction<ICart[]>>;
}
export const ShoppingCartContext = createContext<IContext | undefined>(
  undefined
);

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [shoppingCart, setShoppingCart] = useState<ICart[]>([]);
  useEffect(() => {
    if (user) {
      getCartItems(user?.primaryEmailAddress?.emailAddress as string).then(
        (res) => {
          res.data.data.forEach(
            (item: {
              id: number | string;
              documentId: string;
              products: IProduct[];
            }) => {
              setShoppingCart((prev) => [
                ...prev,
                {
                  id: item?.id,
                  documentId: item.documentId,
                  product: item?.products[0],
                },
              ]);
            }
          );
        }
      );
    }
  }, [user, user?.primaryEmailAddress?.emailAddress]);

  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, setShoppingCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
}
