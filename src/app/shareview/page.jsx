"use client";
import { Box } from "@mui/material";
import { Share } from "next/font/google";

const { useRouter } = require("next/navigation");
const { useEffect } = require("react");

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);
  return <Box></Box>;
};

export default Page;
