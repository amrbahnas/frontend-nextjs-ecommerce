import React from "react";
import { Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteAddress } from "../../_api/mutation";
import { formatAddress } from "@/utils/formatAddress";
import { useTranslations } from "next-intl";

const AddressCard = ({
  address,
  handleEdit,
  refetch,
}: {
  address: AddressType;
  handleEdit: (address: AddressType) => void;
  refetch: () => void;
}) => {
  const t = useTranslations("Profile.addresses");
  const { deleteAddress, deleteAddressIsPending } = useDeleteAddress(
    address.id
  );
  return (
    <div
      key={address.id}
      className="flex justify-between items-center p-4 border rounded-lg"
    >
      <span className="flex-1 truncate">{formatAddress(address)}</span>
      <div className="flex gap-2">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => handleEdit(address)}
          title={t("edit")}
        />
        <Popconfirm
          title={t("delete.title")}
          description={t("delete.confirm")}
          okText={t("delete.yes")}
          cancelText={t("delete.no")}
          onConfirm={() =>
            deleteAddress(
              {},
              {
                onSuccess: refetch,
              }
            )
          }
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            loading={deleteAddressIsPending}
            disabled={deleteAddressIsPending}
            title={t("delete.title")}
          />
        </Popconfirm>
      </div>
    </div>
  );
};

export default AddressCard;
