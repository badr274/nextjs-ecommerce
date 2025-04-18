const ProductCardSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="h-[250px] w-full bg-gray-200 rounded-lg dark:bg-gray-700 "></div>

      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px] mb-2"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  w-[60px]"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[60px]"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
