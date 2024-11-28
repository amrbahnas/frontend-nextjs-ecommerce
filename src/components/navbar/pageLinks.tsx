import React from "react";
import DisableLink from "../ui/disableLink";

export const PageLinks = () => {
  return (
    <div className="hidden xl:flex gap-4">
      <DisableLink disabled href={"/"}>
        Home
      </DisableLink>
      <DisableLink disabled href={"/"}>
        Shop
      </DisableLink>
      <DisableLink disabled href={"/"}>
        Deals
      </DisableLink>
      <DisableLink disabled href={"/"}>
        About
      </DisableLink>
      <DisableLink disabled href={"/"}>
        Contact
      </DisableLink>
    </div>
  );
};
