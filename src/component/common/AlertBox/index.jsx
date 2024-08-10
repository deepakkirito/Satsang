"use client";
const { Alert, Box } = require("@mui/material");
import { Message_data } from "@/lib/context";
import { useContext, useEffect } from "react";

const AlertBox = () => {
  const { message, setMessage } = useContext(
    Message_data || {
      alert: [
        {
          type: "",
          content: "",
        },
      ],
    }
  );

  useEffect(() => {
    message?.alert[0].content !== "" &&
      setMessage({
        ...message,
        alert: [
          {
            type: "",
            content: "",
          },
        ],
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      message?.alert[0].content !== "" &&
        setMessage({
          ...message,
          alert: [
            {
              type: "",
              content: "",
            },
          ],
        });
    }, 7000);
  }, [message]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "6rem",
        right:
          message?.alert?.length && message?.alert[0].content !== ""
            ? "0"
            : "-15rem",
        opacity:
          message?.alert?.length && message?.alert[0].content !== ""
            ? "1"
            : "0",
        transition: "all 500ms",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {message?.alert?.length &&
        message?.alert?.map((data, index) => {
          return (
            <Alert severity={data.type}>
              {data.content || "Loaded Successfully"}
            </Alert>
          );
        })}
    </Box>
  );
};

export default AlertBox;
