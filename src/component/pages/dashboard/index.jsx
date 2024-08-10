"use client";
import ActionDrawer from "@/component/common/actionDrawer";
import CustomTable from "@/component/common/table";
import { Delete, Edit, ViewComfy } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { Message_data } from "@/lib/context";
import { useContext } from "react";
import LoadingIcon from "@/component/assets/icons/gif/loading.gif";
import Image from "next/image";

const { Box, MenuItem, ListItemIcon } = require("@mui/material");

const Dashboard = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState({});
  const { message, setMessage } = useContext(Message_data);
  const [loading, setLoading] = useState(true);

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: "Sevadaar Data",
  });

  const handleExport = () => {
    const temp = data.filter((item) => {
      return Object.keys(rowSelection)?.includes(item._id);
    });
    const csv = generateCsv(csvConfig)(temp);
    download(csvConfig)(csv);
    setRowSelection({});
  };

  const handleExportAll = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://satsangapi.glitch.me/user?delId=${Object.keys(
          rowSelection
        ).toString()}`
      )
      .then((res) => {
        fetchData();
        setMessage({
          ...message,
          alert: [
            {
              type: "success",
              content: "Data deleted successfully",
            },
          ],
        });
        setRowSelection({});
      })
      .catch((err) => {
        window.location.reload();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://satsangapi.glitch.me/userall")
      .then((res) => {
        setData(res.data.res);
        setLoading(false);
      })
      .catch((err) => {
        window.location.reload();
      });
  };

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
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          closeMenu();
          router.push(`/view/${row.id}`);
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <ViewComfy />
        </ListItemIcon>
        View
      </MenuItem>,
      <MenuItem
        key={0}
        onClick={() => {
          closeMenu();
          router.push(`/edit/${row.id}`);
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Edit
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          closeMenu();
          axios
            .delete(`https://satsangapi.glitch.me/user?delId=${row.id}`)
            .then((res) => {
              fetchData();
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
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Delete
      </MenuItem>,
    ],
  };

  return (
    <Box>
      <Box>
        <ActionDrawer
          options={[
            {
              name: "Export",
              action: handleExport,
              disabled: !Object.keys(rowSelection)?.length,
            },
            { name: "Export All", action: handleExportAll },
            // {
            //   name: "Share List",
            //   action: handleExport,
            //   disabled: !Object.keys(rowSelection)?.length,
            // },
            {
              name: "Delete",
              action: handleDelete,
              disabled: !Object.keys(rowSelection)?.length,
            },
          ]}
        />
      </Box>
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
    </Box>
  );
};

export default Dashboard;
