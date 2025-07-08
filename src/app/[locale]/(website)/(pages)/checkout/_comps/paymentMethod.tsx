"use client";
import useParamsService from "@/hooks/global/useParamsService";
import { CreditCardOutlined, DollarOutlined } from "@ant-design/icons";
import { Radio, Space } from "antd";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

const PaymentMethod = () => {
  const t = useTranslations("checkout.payment");
  const { setParams, getParams } = useParamsService("okay I will");

  useEffect(() => {
    setParams("paymentMethod", "credit");
  }, []);

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{t("title")}</h3>
      <Radio.Group
        onChange={(e) => setParams("paymentMethod", e.target.value)}
        value={getParams("paymentMethod")}
        defaultValue={"credit"}
      >
        <Space direction="vertical" className="w-full">
          <Radio value="credit" className="w-full !p-4 border rounded-lg">
            <div className="ms-2 flex items-center">
              <CreditCardOutlined className="text-xl me-2" />
              <div>
                <div className="font-medium">{t("creditCard.title")}</div>
                <div className="text-gray-500">
                  {t("creditCard.description")}
                </div>
              </div>
            </div>
          </Radio>
          <Radio value="cash" className="w-full !p-4 border rounded-lg">
            <div className="ms-2 flex items-center">
              <DollarOutlined className="text-xl me-2" />
              <div>
                <div className="font-medium">{t("cashOnDelivery.title")}</div>
                <div className="text-gray-500">
                  {t("cashOnDelivery.description")}
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
