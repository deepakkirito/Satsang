"use client"
import Context from "@/lib/context";

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Context>{children}</Context>
    </>
  );
};

export default LayoutWrapper;
