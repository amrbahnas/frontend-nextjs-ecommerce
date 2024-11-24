import React from "react";

export const Error = ({ error }: { error: any }) => {
  const [show, setShow] = React.useState(true);
  return (
    error &&
    show && (
      <div className="text-red-600 text-lg">
        {String(error)}
        <button
          onClick={() => setShow(false)}
          className="text-red-600 text-lg underline pl-2"
        >
          ok
        </button>
      </div>
    )
  );
};
