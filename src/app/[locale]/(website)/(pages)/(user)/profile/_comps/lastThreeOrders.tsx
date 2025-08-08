import dayjs from "dayjs";
import Link from "next/link";
import { FiPackage } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { Image } from "antd";

const LastThreeOrders = ({
  lastThreeOrders,
}: {
  lastThreeOrders: OrderType[];
}) => {
  const t = useTranslations("Profile");

  return (
    <div className="space-y-4">
      {lastThreeOrders.map((order) => (
        <Link href={`/orders/${order.id}`} key={order.id}>
          <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <div>
              <Image
                src={order.orderItems[0].imageCover || ""}
                alt={order.orderItems[0].title || ""}
                width={50}
                height={50}
                className="object-cover rounded-lg shrink-0"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col w-full">
                <p className="font-medium truncate line-clamp-1  w-[80%] max-w-60">
                  {order.orderItems.map((item) => item.title).join(", ")}
                </p>
                <span className="text-sm text-gray-500">
                  {dayjs(order.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                ${order.totalOrderPrice?.toFixed(2)}
              </div>
            </div>
          </div>
        </Link>
      ))}
      {lastThreeOrders.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          {t("sections.noOrders")}
        </div>
      )}
    </div>
  );
};

export default LastThreeOrders;
