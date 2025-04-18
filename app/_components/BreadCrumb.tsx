import { Home } from "lucide-react";
import Link from "next/link";

const BreadCrumb = ({ path, id }: { path: string; id: number | string }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol
        className="flex w-fit overflow-hidden  relative rounded border
       border-gray-300 bg-white text-sm text-gray-700
        dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
      >
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 h-10 bg-gray-100 px-4 leading-10 transition-colors hover:text-gray-900 dark:bg-gray-700 dark:hover:text-white"
          >
            <Home size={"16px"} />
            Home
          </Link>
        </li>

        <li className="relative flex items-center">
          <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180 dark:bg-gray-700"></span>

          <a className="flex h-10 pr-4 pl-6 leading-10 transition-colors hover:text-gray-900 dark:hover:text-white">
            {path?.split("/")[1]}
          </a>
        </li>
        <li className="relative flex items-center">
          <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180 dark:bg-gray-700"></span>

          <a className="flex h-10 pr-4 pl-6 leading-10 transition-colors hover:text-gray-900 dark:hover:text-white">
            {id}
          </a>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
