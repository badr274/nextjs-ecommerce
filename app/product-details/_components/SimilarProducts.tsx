import ProductCard from "@/app/_components/ProductCard";
import ProductCardSkeleton from "@/app/_components/ProductCardSkeleton";
import { IProduct } from "@/app/_interfaces";

const SimilarProducts = ({
  similarProducts,
  id,
}: {
  similarProducts: IProduct[];
  id: number;
}) => {
  if (similarProducts.length < 1) {
    return (
      <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
        {Array.from({ length: 4 }, (_, idx) => {
          return <ProductCardSkeleton key={idx} />;
        })}
      </div>
    );
  }
  const renderSimilarProducts = similarProducts
    .filter((product) => product.id !== id)
    .map((proudct) => {
      return <ProductCard key={proudct.id} product={proudct} />;
    });
  return (
    <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
      {renderSimilarProducts}
    </div>
  );
};

export default SimilarProducts;
