import React from "react";

export const Error = ({ error }: { error: any }) => {
  return error && <div className="text-red-600">{String(error)}</div>;
};
