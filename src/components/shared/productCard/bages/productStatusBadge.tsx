import { Badge } from "antd";
import React from "react";

const ProductStatusBadge = ({
  status,
  children,
}: {
  status: ProductStatus;
  children: React.ReactNode;
}) => {
  const color = {
    trending: "red",
    featured: "blue",
    popular: "green",
    normal: "gray",
    "most-sold": "purple",
    "new-arrival": "yellow",
  }[status];

  const text = {
    trending: "Trending",
    featured: "Featured",
    popular: "Popular",
    normal: "Normal",
    "most-sold": "Most Sold",
    "new-arrival": "New Arrival",
  }[status];

  return (
    <Badge.Ribbon color={color} text={text}>
      {children}
    </Badge.Ribbon>
  );
};

export default ProductStatusBadge;
