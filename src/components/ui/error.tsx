import React, { useEffect } from "react";

export const Error = ({
  error,
  hideOkButton,
}: {
  error: any;
  hideOkButton?: boolean;
}) => {
  const [show, setShow] = React.useState(true);
  useEffect(() => {
    setShow(true);
  }, [error]);
  return (
    error &&
    show && (
      <div className="text-red-600 text-lg">
        {String(error)}
        {!hideOkButton && (
          <button
            onClick={() => setShow(false)}
            className="text-red-600 text-lg underline pl-2"
          >
            ok
          </button>
        )}
      </div>
    )
  );
};
