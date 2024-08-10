"use client";

import Share from "@/component/pages/share";
const { Box } = require("@mui/material");

const Page = ({ params: { id } }) => {
  return (
    <Box marginTop={"1rem"}>
      <Share id={id} />
    </Box>
  );
};
export default Page;
