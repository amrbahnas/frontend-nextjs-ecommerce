import Link from "next/link";

import { useToggleProductWishlist } from "@/api/actions";
import useUserStore from "@/store/useUserStore";
import { Divider } from "antd";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import AddProductToCard from "./addProductToCard";
import NextImage from "./ui/nextImage";
import { CiHeart } from "react-icons/ci";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className=" flex flex-col gap-4  bg-gray-100   overflow-hidden rounded-md  hover:shadow-lg  relative">
      <Link href={"/product/" + product._id} key={product._id}>
        <div className="relative w-full h-72 overflow-hidden">
          <NextImage
            src={product?.imageCover || "/product.png"}
            alt=""
            fill
            sizes="25vw"
            className=" object-cover "
          />
        </div>
        <div className="flex justify-between mt-2 px-3">
          <span className="font-medium ">{product.title}</span>
          <span className="font-semibold">${product.price}</span>
        </div>
        <span
          className="px-3 text-sm text-gray-700"
          style={{ height: "3rem", overflow: "hidden" }}
        >
          {product.description}
        </span>
      </Link>
      <WishlistButton productId={product._id} />
      <Divider className="!my-0" />
      <div className="px-3 pb-3">
        <AddProductToCard
          product={product}
          options={{ color: product.colors[0], quantity: 1 }}
        />
      </div>
    </div>
  );
};

export default ProductCard;

const WishlistButton = ({ productId }: { productId: string }) => {
  const user = useUserStore((state) => state.user);
  const wishlist = user?.wishlist || [];
  const setUser = useUserStore((state) => state.setUser);

  const [isWithlisted, setIsWithlisted] = useState(
    wishlist.includes(productId)
  );

  const { toggleWishlist, isPending } = useToggleProductWishlist(productId);
  const handleToggleWishlist = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsWithlisted((prev) => !prev);
    toggleWishlist(
      {},
      {
        onSuccess: (res) => {
          setUser({
            ...user,
            wishlist: res.data.wishlist,
          });
        },
        onError: () => {
          setIsWithlisted((prev) => !prev);
        },
      }
    );
  };
  return (
    <div
      onClick={handleToggleWishlist}
      className="absolute top-4 right-4 cursor-pointer"
    >
      {isWithlisted ? (
        <FaHeart size={25} color="red" />
      ) : (
        <CiHeart size={25} color="black" />
      )}
    </div>
  );
};
