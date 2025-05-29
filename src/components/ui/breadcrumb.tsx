import Container from "@/components/ui/container";
import DisableLink from "@/components/ui/disableLink";
import { Breadcrumb as BreadcrumbAntd } from "antd";
import { usePathname } from "next/navigation";
import React, { memo } from "react";
import { FaHome } from "react-icons/fa";

const disabledList = ["auth"];
const itemIsDisabled = (item: string) => disabledList.includes(item);

const Breadcrumb: React.FC = () => {
  const pathName = usePathname();

  const FilteredPathNameArray = pathName
    .split("/")
    .filter((route) => !/\d/.test(route)); // remove number from path

  const pathNameArray = FilteredPathNameArray.map((item, index) => {
    return {
      title: (
        <DisableLink
          disabled={
            index === FilteredPathNameArray.length - 1 || itemIsDisabled(item)
          }
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

export default memo(Breadcrumb);
