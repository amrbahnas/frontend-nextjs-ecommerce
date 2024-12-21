import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useAdminDeleteProduct } from "../products/_api/actions";
import { Button, Popconfirm } from "antd";
import toast from "react-hot-toast";
import NextImage from "@/components/ui/nextImage";
const AdminProductCard = ({
  product,
  refetchProduct,
}: {
  product: Product;
  refetchProduct: any;
}) => {
  const { imageCover, id, description } = product;
  const { deleteProduct, deleteLoading } = useAdminDeleteProduct(id);

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
      className="flex items-start justify-center w-full gap-4 p-2  border-2 rounded-md  flex-wrap bg-gray-100 "
      key={product.id}
    >
      <NextImage
        src={imageCover}
        alt="Product image"
        width={250}
        height={250}
        className=" bg-white basis-1/6"
      />
      <div className="flex-1 info">
        <Link href={"/product/" + id} target="_blank">
          <h3 className="mb-3 underline capitalize cursor-pointer decoration-1 underline-offset-4 hover:text-buttonBg">
            {product.title}
          </h3>
        </Link>

        <p className="text-gray-500">{description?.substring(0, 50)}</p>
        <span className="price text-sky-700 text-md">${product.price}</span>
      </div>
      <div className="flex self-center gap-3 text-center items-center ">
        <Link href={"products/" + product.id}>
          <CiEdit size={25} className="  cursor-pointer hover:scale-110" />
        </Link>
        <Popconfirm
          title="Are you sure delete this Product?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleDelete}
          disabled={deleteLoading}
        >
          <Button
            type="text"
            className="!p-0"
            disabled={deleteLoading}
            loading={deleteLoading}
          >
            <MdDeleteOutline
              size={25}
              className="text-red-600 cursor-pointer hover:scale-110 "
            />
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default AdminProductCard;
