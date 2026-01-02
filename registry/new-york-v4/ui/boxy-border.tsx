import React from "react"

export const BoxyBorder = () => {
  return (
    <>
      <span className="border-primary absolute -top-px -left-px z-50 block size-2 border-t-2 border-l-2"></span>
      <span className="border-primary absolute -top-px -right-px z-50 block size-2 border-t-2 border-r-2"></span>
      <span className="border-primary absolute -bottom-px -left-px z-50 block size-2 border-b-2 border-l-2"></span>
      <span className="border-primary absolute -right-px -bottom-px z-50 block size-2 border-r-2 border-b-2"></span>
    </>
  )
}
