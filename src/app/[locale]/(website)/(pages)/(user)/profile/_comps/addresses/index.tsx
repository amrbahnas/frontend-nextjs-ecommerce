"use client";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useState } from "react";
import { useGetAddresses } from "../../_api/query";
import AddressCard from "./addressCard";
import AddressModal from "./addressModal";

const Addresses = () => {
  const { addresses, addressesIsLoading, addressesRefetch } = useGetAddresses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    null
  );

  const handleEdit = (address: AddressType) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedAddress(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg  ">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-xl font-semibold">My Addresses</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Address
        </Button>
      </div>

      <Spin spinning={addressesIsLoading}>
        <div className="space-y-4">
          {addresses?.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              handleEdit={handleEdit}
              refetch={addressesRefetch}
            />
          ))}
        </div>
      </Spin>

      <AddressModal
        open={isModalOpen}
        onClose={handleModalClose}
        initialData={selectedAddress}
        addressesRefetch={addressesRefetch}
      />
    </div>
  );
};

export default Addresses;
