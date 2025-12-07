import React from "react";

export const BoxyBorder = () => {
  return (
    <>
      <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2 z-30"></span>
      <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2 z-30"></span>
      <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2 z-30"></span>
      <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2 z-30"></span>
    </>
  );
};
