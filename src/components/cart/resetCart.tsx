import { Button, Popconfirm } from "antd";
import React from "react";

const ResetCart = ({ handleResetCart }: { handleResetCart: () => void }) => {
  return (
    <Popconfirm
      title="You will lose all items in your cart ?"
      okText="Ok"
      cancelText="Cancel"
      onConfirm={handleResetCart}
    >
      <Button className="text-xs  text-gray-500 !p-0 underline" type="link">
        Reset Cart
      </Button>
    </Popconfirm>
  );
};

export default ResetCart;
