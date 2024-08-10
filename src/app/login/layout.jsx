import { Box } from "@mui/material";

const { default: AlertBox } = require("@/component/common/AlertBox");

const Layout = ({ children }) => {
  return (
    <Box>
      {children}
      <AlertBox />
    </Box>
  );
};

export default Layout;
