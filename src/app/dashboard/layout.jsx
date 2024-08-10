import Navbar from "@/component/common/Navbar";
import { Box } from "@mui/material";

const { default: AlertBox } = require("@/component/common/AlertBox");

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      {children}
      <AlertBox />
    </Box>
  );
};

export default Layout;
