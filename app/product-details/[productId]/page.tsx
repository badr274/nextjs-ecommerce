"use client";
import BreadCrumb from "@/app/_components/BreadCrumb";
import ProductDetails from "@/app/product-details/_components/ProductDetails";
import SimilarProducts from "../_components/SimilarProducts";
import { useEffect, useState } from "react";
import {
  getProductDetails,
  getSimilarProducts,
} from "@/app/_utils/ProductApis";
import { IProduct } from "@/app/_interfaces";
import { useParams, usePathname, useRouter } from "next/navigation";

const SingleProduct = () => {
  const path = usePathname();
  const router = useRouter();
  const params = useParams<{ productId: string }>();
  const [productDetails, setProductDetails] = useState<IProduct>(
    {} as IProduct
  );
  const [similarProducts, setSimilarProducts] = useState<IProduct[]>(
    [] as IProduct[]
  );
  useEffect(() => {
    // Product Dtails
    (() => {
      getProductDetails(params.productId).then((res) =>
        setProductDetails(res.data.data)
      );
      // Similar Products
      getSimilarProducts(productDetails.category).then((res) => {
        setSimilarProducts(res.data.data);
      });
      router.refresh();
    })();
  }, [params.productId, productDetails.category, router]);
  return (
    <div className="container relative mx-auto mt-12 md:mt-15 flex flex-col gap-10">
      <BreadCrumb path={path} id={productDetails.id as number | string} />
      <ProductDetails productDetails={productDetails} />
      <SimilarProducts
        similarProducts={similarProducts}
        id={productDetails.id as number}
      />
    </div>
  );
};

export default SingleProduct;
