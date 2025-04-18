import React from "react";
import { IProduct } from "../_interfaces";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface IProps {
  products: IProduct[];
}
const ProductList = ({ products }: IProps) => {
  if (products.length < 1) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
        {Array.from({ length: 8 }, (_, idx) => {
          return <ProductCardSkeleton key={idx} />;
        })}
      </div>
    );
  }
  const renderProducts = products?.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
      {renderProducts}
    </div>
  );
};

export default ProductList;
