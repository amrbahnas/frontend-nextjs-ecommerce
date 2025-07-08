import { Button, Popconfirm } from "antd";
import React from "react";
import { useTranslations } from "next-intl";

const ResetCart = ({ handleResetCart }: { handleResetCart: () => void }) => {
  const t = useTranslations("Cart.reset");

  return (
    <Popconfirm
      title={t("confirm")}
      okText={t("ok")}
      cancelText={t("cancel")}
      onConfirm={handleResetCart}
    >
      <Button className="text-xs text-gray-500 !p-0 underline" type="link">
        {t("title")}
      </Button>
    </Popconfirm>
  );
};

export default ResetCart;
