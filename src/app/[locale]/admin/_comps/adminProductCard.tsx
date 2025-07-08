import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useAdminDeleteProduct } from "../products/_api/actions";
import { Button, Popconfirm, Tag, Card } from "antd";
import toast from "react-hot-toast";
import NextImage from "@/components/ui/nextImage";
import { BsBox } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoStatsChartOutline } from "react-icons/io5";

const getStatusColor = (status?: ProductStatus): string => {
  if (!status) return "default";
  switch (status) {
    case "trending":
      return "volcano";
    case "featured":
      return "gold";
    case "popular":
      return "green";
    case "most-sold":
      return "cyan";
    case "new-arrival":
      return "purple";
    default:
      return "default";
  }
};

const formatStatus = (status?: ProductStatus): string => {
  if (!status) return "Unknown";
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const AdminProductCard = ({
  product,
  refetchProduct,
}: {
  product: Product;
  refetchProduct: any;
}) => {
  const { imageCover, id, description, status, quantity, category } = product;
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
    <Card
      className="group overflow-hidden hover:shadow-lg transition-all duration-300  "
      styles={{ body: { padding: 0 } }}
      actions={[
        <Link href={"products/" + product.id} key="edit">
          <Button
            type="text"
            icon={<CiEdit size={18} />}
            className="flex items-center justify-center w-full hover:text-primary hover:bg-primary/5"
          >
            Edit
          </Button>
        </Link>,
        <Popconfirm
          key="delete"
          title="Delete Product"
          description="Are you sure you want to delete this product?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleDelete}
          disabled={deleteLoading}
        >
          <Button
            danger
            type="text"
            icon={<MdDeleteOutline size={18} />}
            disabled={deleteLoading}
            loading={deleteLoading}
            className="flex items-center justify-center w-full"
          >
            Delete
          </Button>
        </Popconfirm>,
      ]}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-square">
        <NextImage
          src={imageCover}
          alt={product.title}
          fill
          className="object-cover w-full h-full"
        />
        {status && (
          <Tag
            color={getStatusColor(status)}
            className="absolute top-2 right-2 m-0"
          >
            {formatStatus(status)}
          </Tag>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <Link href={"/product/" + id} target="_blank">
          <h3 className="text-lg font-semibold hover:text-primary transition-colors duration-200 line-clamp-2 mb-2 min-h-[56px]">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 min-h-[40px]">
          {description || "No description available"}
        </p>

        {/* Product Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FaRegMoneyBillAlt className="text-gray-400 text-lg flex-shrink-0" />
            <span className="text-gray-500">Price:</span>
            <span className="font-medium text-primary ms-auto">
              ${product.price?.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MdCategory className="text-gray-400 text-lg flex-shrink-0" />
            <span className="text-gray-500">Category:</span>
            <span className="font-medium ms-auto">
              {category?.name || "Uncategorized"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsBox className="text-gray-400 text-lg flex-shrink-0" />
            <span className="text-gray-500">Stock:</span>
            <Tag
              color={quantity > 10 ? "green" : quantity > 0 ? "orange" : "red"}
              className="ms-auto"
            >
              {quantity} items
            </Tag>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminProductCard;
