"use client";
import { useEffect, useState } from "react";
import { getLatestProducts } from "../_utils/ProductApis";
import ProductList from "./ProductList";
import { ArrowRightIcon } from "lucide-react";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getLatestProducts().then((res) => {
      setProducts(res.data.data);
    });
  }, []);
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl tracking-tighter lg:text-3xl xl:text-4xl  font-bold">
          Brand New
        </h2>
        <a
          href="#"
          className="capitalize text-dark-primary flex items-center gap-1 hover:translate-x-0.75 duration-300"
        >
          <span>view all collection</span> <ArrowRightIcon size={"18px"} />
        </a>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default ProductSection;
