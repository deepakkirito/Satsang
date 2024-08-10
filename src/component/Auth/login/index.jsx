"use client";
import Image from "next/image";
const { Box, Typography, TextField, Button } = require("@mui/material");
import { useEffect, useState } from "react";
import axios from "axios";
import { Message_data } from "@/lib/context";
import { useContext } from "react";

import Namaste from "@/component/assets/icons/png/namaste.png";
import LoadingIcon from "@/component/assets/icons/gif/loading.gif";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { message, setMessage } = useContext(Message_data);
  const [redirect, setRedirect] = useState("");
  useEffect(() => {
    localStorage.getItem("login") === "true" && router.push("/dashboard");
    localStorage.getItem("redirect") &&
      setRedirect(localStorage.getItem("redirect"));
  }, []);

  const handleLogin = () => {
    setLoading(true);
    axios
      .get(
        `https://satsangapi.glitch.me/login?username=${loginData.username}&password=${loginData.password}`
      )
      .then((data) => {
        if (data.data.res == "success") {
          window.localStorage.setItem("login", "true");
          router.push(redirect !== "" ? redirect : "/dashboard");
          localStorage.removeItem("redirect");
          setTimeout(() => {
            setLoading(false);
            setMessage({
              ...message,
              alert: [{ type: "success", content: "Login Successfully" }],
            });
          }, 1000);
        } else if (data.data.res == "invalid") {
          setLoading(false);
          window.localStorage.setItem("login", "false");
          setMessage({
            ...message,
            alert: [
              {
                type: "error",
                content: "Incorrect username or password",
              },
            ],
          });
        }
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "95vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
        }}
      >
        <Box
          sx={{
            color: "#87c3ff80",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Box>
            <Typography variant="h4">Satsang Login</Typography>
            <Typography fontSize={"0.75rem"}>(Center: Vasundhara)</Typography>
          </Box>
          <Typography>A data record application for Satsang</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "70vw",
            margin: "auto",
            "& .MuiFormControl-root": {
              position: "relative",
              zIndex: "10",
              label: {
                color: "#87c3ff80",
              },
              input: {
                color: "#c6dff9",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#87c3ff80",
              },
            },
          }}
        >
          <TextField
            type="text"
            label="Username"
            value={loginData.username}
            onChange={(event) =>
              setLoginData({ ...loginData, username: event.target.value })
            }
          />
          <TextField
            type="password"
            label="Password"
            value={loginData.password}
            onChange={(event) =>
              setLoginData({ ...loginData, password: event.target.value })
            }
          />
          {!loading ? (
            <Button
              variant="outlined"
              disabled={!loginData.username || !loginData.password}
              onClick={handleLogin}
            >
              Login
            </Button>
          ) : (
            <Box>
              <Image src={LoadingIcon} width="65" height="65" alt="Loading" />
            </Box>
          )}
        </Box>
        <Box>
          <Image src={Namaste} width={100} height={100} alt="namaste" />
          <Typography>Radha Swami</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
