"use client";
import {
  activeColor,
  foregroundColor,
  textColor,
} from "@/component/assets/css";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Message_data } from "@/lib/context";
import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const location = usePathname();
  const router = useRouter();
  const { message, setMessage } = useContext(Message_data);

  useEffect(() => {
    if (localStorage.getItem("login") !== "true") {
      localStorage.setItem("redirect", location);
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    router.push("/login");
    localStorage.removeItem("login");
    setMessage({
      ...message,
      alert: [
        {
          type: "success",
          content: "Logged out successfully",
        },
      ],
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: foregroundColor,
        paddingRight: "1rem",
        position: "fixed",
        top: "0rem",
        width: "100vw",
        zIndex: "10",
        paddingRight: "1rem"
      }}
    >
      <Box
        sx={{
          display: "flex",
          section: {
            padding: "1.5rem 1rem",
            cursor: "pointer",
            borderRight: "0.5px solid",
            borderColor: activeColor,
            fontSize: "12px"
          },
        }}
      >
        <Divider orientation="vertical" flexItem />
        <Typography
          id="dashboard"
          component="section"
          sx={{
            backgroundColor: location.includes("dashboard")
              ? activeColor
              : "transparent",
            color: location.includes("dashboard")
              ? foregroundColor
              : activeColor,
          }}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography
          component="section"
          id="newsevadaar"
          sx={{
            backgroundColor: location.includes("newsevadaar")
              ? "#10131a"
              : "transparent",
            color: location.includes("newsevadaar")
              ? foregroundColor
              : activeColor,
          }}
          onClick={() => router.push("/newsevadaar")}
        >
          New Sevadaar
        </Typography>
        <Divider orientation="vertical" flexItem />
      </Box>
      <Box>
        <Button
        variant="contained"
          sx={{
            color: textColor,
            fontSize: "12px"
          }}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
