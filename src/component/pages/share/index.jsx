"use client";
import CustomTable from "@/component/common/table";
import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import LoadingIcon from "@/component/assets/icons/gif/loading.gif";
import { ViewComfy } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";

const { Box, MenuItem, ListItemIcon } = require("@mui/material");

const Share = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const location = usePathname();

  useEffect(() => {
    localStorage.setItem("share", location);
  }, [location]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://satsangapi.glitch.me/share?id=${id}`)
      .then((res) => {
        axios
          .get(
            `https://satsangapi.glitch.me/sharedata?id=${res.data.res[0].share.toString()}`
          )
          .then((res) => {
            setData(res.data.res);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "Name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "Badge_ID",
        header: "Badge ID",
        size: 150,
      },
      {
        accessorKey: "In_active",
        header: "Status",
        size: 150,
      },
    ];
  }, []);

  const tableOptions = {
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          closeMenu();
          router.push(`/shareview/${row.id}`);
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <ViewComfy />
        </ListItemIcon>
        View
      </MenuItem>,
    ],
  };

  return (
    <Box
      sx={{
        margin: "1rem",
      }}
    >
      {loading ? (
        <Image src={LoadingIcon} width="65" height="65" alt="Loading" />
      ) : (
        <CustomTable
          columns={columns}
          data={data}
          tableOptions={tableOptions}
        />
      )}
    </Box>
  );
};

export default Share;
