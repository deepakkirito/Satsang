const { Box, Button } = require("@mui/material");
import {
  activeColor,
  foregroundColor,
  textColor,
} from "@/component/assets/css";

const ActionDrawer = ({ options = [] }) => {
  return (
    <Box
      sx={{
        backgroundColor: foregroundColor,
        borderRadius: "1rem",
        padding: "1rem",
        margin: "1rem",
        display: "flex",
        gap: "1rem",
        flexWrap: "nowrap",
      }}
    >
      {options?.length &&
        options.map(({ name, action, disabled }, index) => {
          return (
            <Button
              variant="contained"
              onClick={action}
              sx={{
                borderRadius: "1rem",
                backgroundColor: activeColor,
                color: foregroundColor,
              }}
              disabled={disabled}
            >
              {name}
            </Button>
          );
        })}
    </Box>
  );
};

export default ActionDrawer;
