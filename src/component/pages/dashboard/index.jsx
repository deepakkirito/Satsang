"use client";
import ActionDrawer from "@/component/common/actionDrawer";
import CustomTable from "@/component/common/table";
import { CopyAll, Delete, Edit, ViewComfy } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { Message_data } from "@/lib/context";
import { useContext } from "react";
import LoadingIcon from "@/component/assets/icons/gif/loading.gif";
import Image from "next/image";
import PopupModal from "@/component/common/popupModal";
import copy from "clipboard-copy";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";

const {
  Box,
  MenuItem,
  ListItemIcon,
  Typography,
  IconButton,
  Button,
} = require("@mui/material");

const Dashboard = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState({});
  const { message, setMessage } = useContext(Message_data);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [shareId, setShareId] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: "Sevadaar Data",
  });

  const handleCopyClick = async () => {
    try {
      await copy("https://www.radhaaswami.vercel.app/share/" + shareId);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

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

  const handleShare = () => {
    setIsCopied(false);
    axios
      .post("https://satsangapi.glitch.me/share", {
        userData: { share: Object.keys(rowSelection) },
      })
      .then((res, err) => {
        setShareId(`${res.data.res._id}`);
        setMessage({
          ...message,
          alert: [
            {
              type: "success",
              content: "Link created Successfully",
            },
          ],
        });
        setOpen(true);
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
            {
              name: "Share List",
              action: handleShare,
              disabled: !Object.keys(rowSelection)?.length,
            },
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
      <PopupModal
        openModal={open}
        handleOpenModal={(val) => setOpen(val)}
        title={"Share link has been created"}
        content={"You can copy or share the link directly."}
      >
        <Box
          sx={{
            dispaly: "flex",
            gap: "1rem",
          }}
        >
          <Typography
            fontSize={"12px"}
            sx={{
              wordBreak: "break-all",
              bgcolor: "whitesmoke",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              margin: "1rem 0",
            }}
          >
            https://www.radhaaswami.vercel.app/share/{shareId}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <IconButton onClick={handleCopyClick}>
              <CopyAll />
            </IconButton>
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </Typography>
            <Button
            variant="contained"
              onClick={() => router.push(`/share/${shareId}`)}
              sx={{
                fontSize: "12px",
              }}
            >
              Go to Share Page
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <FacebookShareButton
              url={`https://www.radhaaswami.vercel.app/share/${shareId}`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <PinterestShareButton
              url={`https://www.radhaaswami.vercel.app/share/${shareId}`}
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
            <RedditShareButton
              url={`https://www.radhaaswami.vercel.app/share/${shareId}`}
            >
              <RedditIcon size={32} round />
            </RedditShareButton>
            <WhatsappShareButton
              url={`https://www.radhaaswami.vercel.app/share/${shareId}`}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={`https://www.radhaaswami.vercel.app/share/${shareId}`}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </Box>
        </Box>
      </PopupModal>
    </Box>
  );
};

export default Dashboard;
