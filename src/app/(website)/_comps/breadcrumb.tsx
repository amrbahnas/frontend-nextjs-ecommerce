import Container from "@/components/container";
import DisableLink from "@/components/ui/disableLink";
import { Breadcrumb as BreadcrumbAntd } from "antd";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHome } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

const Breadcrumb: React.FC = () => {
  const pathName = usePathname();

  const FilteredPathNameArray = pathName
    .split("/")
    .filter((route) => !/\d/.test(route)); // remove any route with numbers

  const pathNameArray = FilteredPathNameArray.map((item, index) => {
    return {
      title: (
        <DisableLink
          disabled={index === FilteredPathNameArray.length - 1}
          href={item === "" ? "/" : `/${item}`}
          className=" capitalize  "
        >
          {item === "" ? <FaHome className=" mt-1" /> : item}
        </DisableLink>
      ),
    };
  });

  if (pathName === "/") {
    return null;
  }

  return (
    <Container className=" py-3">
      <BreadcrumbAntd items={pathNameArray} />
    </Container>
  );
};

export default Breadcrumb;
