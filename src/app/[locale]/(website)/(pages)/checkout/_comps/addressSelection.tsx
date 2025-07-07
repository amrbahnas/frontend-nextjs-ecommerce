"use client";
import { useGetAddresses } from "@/app/[locale]/(website)/(pages)/(user)/profile/_api/query";
import { Radio, Space, Button, Spin, Empty } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import AddressModal from "@/app/[locale]/(website)/(pages)/(user)/profile/_comps/addresses/addressModal";
import useParamsService from "@/hooks/global/useParamsService";
import { formatAddress } from "@/utils/formatAddress";

const AddressSelection = () => {
  const { addresses, addressesIsLoading, addressesRefetch } = useGetAddresses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setParams, getParams } = useParamsService("okay I will");

  useEffect(() => {
    if (addresses.length === 0) return;
    setParams("address", addresses[0]?.id);
  }, [addresses]);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h3 className=" text-base sm:text-lg font-medium">
          Select Delivery Address
        </h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Address
        </Button>
      </div>

      <div className="min-h-[200px]">
        {addresses.length === 0 && !addressesIsLoading && <Empty />}
        <Spin spinning={addressesIsLoading}>
          <Radio.Group
            onChange={(e) => setParams("address", e.target.value)}
            value={getParams("address")}
            defaultValue={addresses[0]?.id}
          >
            <Space direction="vertical" className="w-full">
              {addresses?.map((address) => (
                <Radio
                  key={address.id}
                  value={address.id}
                  onClick={() => {
                    setParams("address", address.id);
                  }}
                  className="w-full !p-4 border rounded-lg"
                  checked={getParams("address") === address.id}
                >
                  <div className="ml-2">
                    <div className="font-medium">{formatAddress(address)}</div>
                    <div className="text-gray-500">Phone: {address.phone}</div>
                  </div>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Spin>
      </div>

      <AddressModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={null}
        addressesRefetch={addressesRefetch}
      />
    </div>
  );
};

export default AddressSelection;
