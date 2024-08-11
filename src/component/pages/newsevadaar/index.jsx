"use client";
import { foregroundColor, textColor } from "@/component/assets/css";
import { useEffect, useState } from "react";
import { Message_data } from "@/lib/context";
import { useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const { Box, TextField, Typography, Button } = require("@mui/material");
import LoadingIcon from "@/component/assets/icons/gif/loading.gif";
import Image from "next/image";

const dataFields = {
  Pic: "",
  Name: "",
  Badge_ID: "",
  Father_husband: "",
  Aadhaar: "",
  Gender: "",
  Age: "",
  Dob: "",
  Contact_no_1: "",
  Contact_no_2: "",
  Emergency_number: "",
  Current_address: "",
  Status: "",
  In_active: "",
  Date_of_initiation: "",
  Area_location: "",
  Satsang_place: "",
};

const NewSevadaar = ({ id }) => {
  const [userData, setUserData] = useState(dataFields);
  const { message, setMessage } = useContext(Message_data);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    const currentDate = new Date().getFullYear();
    setUserData({ ...userData, Age: currentDate - userData["Dob"].split("-")[0] });
  }, [userData["Dob"]]);

  const handleAdd = async () => {
    setLoading(true);
    const alert = [];
    userData["Name"] === "" &&
      alert.push({
        type: "error",
        content: "Aleast write Name before adding",
      });
    userData["Aadhaar"].length > 12 &&
      alert.push({
        type: "error",
        content: "Aadhaar Number can not be greater than 12 numbers",
      });
    userData["Contact_no_1"].length > 10 &&
      alert.push({
        type: "error",
        content: `Contact No 1 can not be greater than 10 numbers`,
      });
    userData["Contact_no_2"].length > 10 &&
      alert.push({
        type: "error",
        content: `Contact No 2 can not be greater than 10 numbers`,
      });
    userData["Emergency_number"].length > 10 &&
      alert.push({
        type: "error",
        content: `Contact No 1 can not be greater than 10 numbers`,
      });

    if (alert?.length) {
      setMessage({ ...message, alert: alert });
      setLoading(false);
    } else {
      axios
        .post("https://satsangapi.glitch.me/user", { userData: userData })
        .then((res, err) => {
          setMessage({
            ...message,
            alert: [
              {
                type: "success",
                content: "New Sevadaar added successfully",
              },
            ],
          });
          router.push("/dashboard");
          setLoading(false);
        })
        .catch((err) => {
          setMessage({
            ...message,
            alert: [
              {
                type: "error",
                content: "Something went wrong. Try again!!!",
              },
            ],
          });
          setLoading(false);
        });
    }
  };

  const handleChange = async (data) => {
    if (data.name == "Pic") {
      let b64fileP = await toBase64(data.value);
      userData.Pic = b64fileP;
      setUserData({ ...userData, [data.name]: userData.Pic });
    } else {
      setUserData({ ...userData, [data.name]: data.value });
    }
  };

  useEffect(() => {
    setLoadingData(true);
    id &&
      axios
        .get(`https://satsangapi.glitch.me/userbyid?id=${id}`)
        .then((res) => {
          const userData = res.data.res[0];
          !userData?.Pic
            ? (userData.Pic =
                "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg")
            : "";
          setUserData({
            ...userData,
            Pic: !userData?.Pic
              ? (userData.Pic =
                  "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg")
              : userData?.Pic,
            Name: userData?.Name,
            Badge_ID: userData?.Badge_ID,
            Father_husband: userData?.Father_husband,
            Aadhaar: userData?.Aadhaar,
            Gender: userData?.Gender,
            Age: userData?.Age,
            Dob: userData?.Dob,
            Contact_no_1: userData?.Contact_no_1,
            Contact_no_2: userData?.Contact_no_2,
            Emergency_number: userData?.Emergency_number,
            Current_address: userData?.Current_address,
            Status: userData?.Status,
            In_active: userData?.In_active,
            Date_of_initiation: userData?.Date_of_initiation,
            Area_location: userData?.Area_location,
            Satsang_place: userData?.Satsang_place,
          });
          setLoadingData(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingData(false);
        });
    !id && setLoadingData(false);
  }, [id]);

  const handleUpdate = () => {
    setLoading(true);
    axios
      .put(`https://satsangapi.glitch.me/user?id=${id}`, {
        userData: userData,
      })
      .then((res) => {
        setMessage({
          ...message,
          alert: [
            {
              type: "success",
              content: "Updated successfully",
            },
          ],
        });
        router.push("/dashboard");
        setLoading(false);
      })
      .catch((err) => {
        setMessage({
          ...message,
          alert: [
            {
              type: "error",
              content: "Something went wrong. Try again!!!",
            },
          ],
        });
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: foregroundColor,
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          flexWrap: "wrap",
          margin: "1rem",
          borderRadius: "0.5rem",
          "& .MuiFormControl-root": {
            "& .MuiFormLabel-root": {
              color: textColor,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: textColor,
            },
            "& .MuiInputBase-input": {
              width: { xs: "80vw" },
              color: textColor,
            },
          },
        }}
      >
        {!loadingData ? (
          Object.keys(dataFields).map((item, index) => {
            if (item === "Pic") {
              return (
                <Box>
                  <Typography variant="h5" color={textColor}>
                    Profile Pic
                  </Typography>
                  {userData?.Pic && (
                    <img
                      src={userData.Pic}
                      alt="Profile"
                      style={{
                        width: "85vw",
                        height: "auto",
                        margin: "auto",
                      }}
                    ></img>
                  )}
                  <input
                    type="file"
                    name="Pic"
                    accept="image/*"
                    onChange={(event) =>
                      handleChange({ name: item, value: event.target.files[0] })
                    }
                    style={{
                      color: textColor,
                    }}
                  ></input>
                </Box>
              );
            }
            if (item === "Date_of_initiation" || item == "Dob") {
              return (
                <TextField
                  type="date"
                  label={item.split("_").map((data) => `${data} `)}
                  InputLabelProps={{ shrink: true }}
                  value={userData[item].split("T")[0]}
                  onChange={(event) =>
                    handleChange({ name: item, value: event.target.value })
                  }
                />
              );
            } else {
              return (
                <Box>
                  <TextField
                    id={item}
                    type="text"
                    value={userData[item]}
                    label={item.split("_").map((data) => `${data} `)}
                    multiline
                    onChange={(event) =>
                      handleChange({ name: item, value: event.target.value })
                    }
                    disabled={item === "Age"}
                  />
                </Box>
              );
            }
          })
        ) : (
          <Image src={LoadingIcon} width="65" height="65" alt="Loading" />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem 0",
        }}
      >
        {!loading ? (
          <Button
            variant="contained"
            onClick={() => (id ? handleUpdate() : handleAdd())}
          >
            {id ? "Update" : "Add Sevadaar"}
          </Button>
        ) : (
          <Image src={LoadingIcon} width="65" height="65" alt="Loading" />
        )}
      </Box>
    </Box>
  );
};

export default NewSevadaar;
