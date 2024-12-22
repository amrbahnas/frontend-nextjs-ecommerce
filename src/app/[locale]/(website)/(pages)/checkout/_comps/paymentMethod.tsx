"use client";
import useParamsService from "@/hooks/global/useParamsService";
import { CreditCardOutlined, DollarOutlined } from "@ant-design/icons";
import { Radio, Space } from "antd";
import { useEffect } from "react";

const PaymentMethod = () => {
  const { setParams, getParams } = useParamsService("okay I will");

  useEffect(() => {
    setParams("paymentMethod", "credit");
  }, []);

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
      <Radio.Group
        onChange={(e) => setParams("paymentMethod", e.target.value)}
        value={getParams("paymentMethod")}
        defaultValue={"credit"}
      >
        <Space direction="vertical" className="w-full">
          <Radio value="credit" className="w-full !p-4 border rounded-lg">
            <div className="ml-2 flex items-center">
              <CreditCardOutlined className="text-xl mr-2" />
              <div>
                <div className="font-medium">Credit Card</div>
                <div className="text-gray-500">
                  Pay securely with your credit card
                </div>
              </div>
            </div>
          </Radio>
          <Radio value="cash" className="w-full !p-4 border rounded-lg">
            <div className="ml-2 flex items-center">
              <DollarOutlined className="text-xl mr-2" />
              <div>
                <div className="font-medium">Cash on Delivery</div>
                <div className="text-gray-500">
                  Pay when you receive your order
                </div>
              </div>
            </div>
          </Radio>
        </Space>
      </Radio.Group>
    </div>
  );
};

export default PaymentMethod;
