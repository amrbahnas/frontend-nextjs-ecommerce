import React from "react";

export const Error = ({ error }: { error: any }) => {
  return error && <div className="text-red-600 text-lg">{String(error)}</div>;
};
