import { Radio } from "antd";
import React from "react";
const { Group } = Radio;
const CheckoutType = ({
  checkoutType,
  setCheckoutType,
}: {
  checkoutType: string;
  setCheckoutType: any;
}) => {
  return (
    <div className="mb-4  space-y-2">
      <div>
        <strong>Checkout Type</strong>
      </div>
      <Group
        value={checkoutType}
        onChange={(e) => setCheckoutType(e.target.value)}
      >
        <Radio value="card">credit card</Radio>
        <Radio value="cash">Cash</Radio>
      </Group>
    </div>
  );
};

export default CheckoutType;
