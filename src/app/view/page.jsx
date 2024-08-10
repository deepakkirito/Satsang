"use client"
import { Box } from "@mui/material";

const { useRouter } = require("next/navigation");
const { useEffect } = require("react");

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);
  return <Box></Box>;
};

export default Page;
