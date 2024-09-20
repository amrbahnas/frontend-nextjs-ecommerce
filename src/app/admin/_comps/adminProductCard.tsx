import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useAdminDeleteProduct } from "../_api/actions";
import { Button } from "antd";
import { toast } from "react-toastify";
const AdminProductCard = ({
  product,
  refetchProduct,
}: {
  product: Product;
  refetchProduct: any;
}) => {
  const { imageCover, _id, description } = product;
  const { deleteProduct, deleteLoading } = useAdminDeleteProduct(_id);

  const handleDelete = async () => {
    deleteProduct(
      {},
      {
        onSuccess: () => {
          toast.success("Product deleted successfully");
          refetchProduct();
        },
      }
    );
  };

  return (
    <div
      className="flex items-start justify-center w-full gap-4 p-2 shadow-lg item "
      key={product.id}
    >
      <Image
        src={imageCover}
        alt="Product image"
        width={250}
        height={250}
        className=" bg-white basis-1/6"
      />
      <div className="flex-1 info">
        <Link href={"/product/" + _id} target="_blank">
          <h3 className="mb-3 underline capitalize cursor-pointer decoration-1 underline-offset-4 hover:text-buttonBg">
            {product.title}
          </h3>
        </Link>

        <p className="text-gray-500">{description?.substring(0, 50)}</p>
        <span className="price text-sky-700 text-md">${product.price}</span>
      </div>
      <div className="flex self-center gap-6 text-center delete basis-1/6 mg:gap-10">
        <Link href={"products/" + product.id}>
          <CiEdit
            size={30}
            className="text-white cursor-pointer hover:scale-110"
          />
        </Link>
        <Button
          type="text"
          className="!p-0"
          disabled={deleteLoading}
          loading={deleteLoading}
          onClick={handleDelete}
        >
          <MdDeleteOutline
            size={30}
            className="text-red-600 cursor-pointer hover:scale-110 "
          />
        </Button>
      </div>
    </div>
  );
};

export default AdminProductCard;
