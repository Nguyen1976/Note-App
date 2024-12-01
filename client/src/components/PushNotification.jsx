import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useState } from "react";
import { createClient } from "graphql-ws";
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from "../utils/constants";
import { Badge, Menu, MenuItem } from "@mui/material";

const client = createClient({
  url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

const query = `
subscription PushNotification {
  notification {
    message
  }
}
`;

function PushNotification() {
  const [invisible, setInvisible] = useState(true);
  const [notification, setNotification] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    (async () => {
      const onNext = (data) => {
        setInvisible(false);

        const message = data?.data?.notification?.message;
        setNotification(message);
        console.log("[PUSH NOTIFICATION]", { data });
      };

      await new Promise((resolve, reject) => {
        client.subscribe(
          {
            query,
          },
          {
            next: onNext,
            error: reject,
            complete: resolve,
          }
        );
      });
    })();
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
    setNotification("");
    setInvisible(true); // ẩn badge khi thông báo đã xem
  };

  const handleClick = (e) => {
    if (notification) {
      setAnchorEl(e.currentTarget);
    }
  };

  return (
    <>
      <Badge color="secondary" variant="dot" invisible={invisible}>
        <NotificationsIcon onClick={handleClick} />
      </Badge>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>{notification}</MenuItem>
      </Menu>
    </>
  );
}

export default PushNotification;
