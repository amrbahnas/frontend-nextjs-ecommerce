import React from "react";
import { Form, GetProps } from "antd";
const { Item: AntdItem } = Form;

type ItemProps = GetProps<typeof AntdItem>;

const Item = (props: ItemProps) => {
  return <AntdItem style={{ marginBottom: 0 }} {...props} />;
};

export default Item;
