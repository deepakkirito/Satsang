"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingIcon from "@/component/assets/icons/gif/loading.gif";
import Image from "next/image";
import { foregroundColor, textColor } from "@/component/assets/css";
import { useRouter } from "next/navigation";

const { Box, Typography, Button } = require("@mui/material");

const View = ({ id = "" }) => {
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [imageData, setImageData] = useState("loading");
  const router = useRouter();

  useEffect(() => {
    setImgLoading(true);
    setLoading(true);
    id &&
      axios
        .get(`https://satsangapi.glitch.me/userbyid?id=${id}&img=false`)
        .then((res) => {
          setLoading(false);
          setUserData(res.data.res[0]);
          axios
            .get(`https://satsangapi.glitch.me/userbyid?id=${id}&img=true`)
            .then((res) => {
              setImgLoading(true);
              setImageData(res.data.res[0].Pic);
            })
            .catch((err) => {
              setImgLoading(false);
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setImgLoading(false);
        });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`https://satsangapi.glitch.me/user?delId=${id}`)
      .then((res) => {
        router.push("/dashboard");
        setMessage({
          ...message,
          alert: [
            {
              type: "success",
              content: "Data deleted successfully",
            },
          ],
        });
      })
      .catch((err) => {
        window.location.reload();
      });
  };

  return (
    <Box
      sx={{
        margin: "1rem",
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {imageData !== "loading" ? (
          <Image
            src={imageData}
            alt="profile"
            width={150}
            height={2000}
            style={{
              height: "auto",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              backgroundColor: foregroundColor,
            }}
          />
        ) : (
          <>
            <Image src={LoadingIcon} width="65" height="65" alt="Loading" />
            Loading Image...
          </>
        )}
        <Button variant="contained" onClick={() => router.push("/edit/" + id)}>
          Edit
        </Button>
        <Button variant="contained" onClick={() => handleDelete()}>
          Delete
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {Object.keys(userData)?.length ? (
          Object.keys(userData).map((data, index) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  color: textColor,
                  backgroundColor: foregroundColor,
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  {data.split("_").map((item) => `${item} `)}:-
                </Typography>

                <Typography
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  {Object.values(userData)[index] || "-"}
                </Typography>
              </Box>
            );
          })
        ) : (
          <Box>
            <Image src={LoadingIcon} width="65" height="65" alt="Loading" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default View;
