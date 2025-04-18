import React from "react";
import { IProduct } from "../_interfaces";
import Image from "next/image";
import { List } from "lucide-react";
import Link from "next/link";
interface IProps {
  product: IProduct;
}
const ProductCard = ({ product }: IProps) => {
  const { documentId, thumbnail, title, category, price } = product;
  return (
    <Link href={`/product-details/${documentId}`}>
      <div className="flex flex-col bg-slate-50 rounded-md  hover:-translate-y-2 hover:shadow-md hover:shadow-gray-500 duration-300">
        <Image
          className="rounded-t-lg object-cover h-[180px] cursor-pointer"
          src={thumbnail.url}
          alt="product_image"
          width={1000}
          height={400}
        />

        <div className="p-4 flex-1 flex items-center justify-between">
          <div>
            <h5 className="mb-1 text-sm line-clamp-1 lg:text-base font-semibold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <div className="flex gap-x-1 items-center text-[12px] text-gray-600 font-medium">
              <List />
              <span>{category}</span>
            </div>
          </div>
          <strong>${price}</strong>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
