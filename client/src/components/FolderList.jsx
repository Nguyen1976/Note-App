/* eslint-disable react/prop-types */
import { Box, Card, CardContent, List, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function FolderList({ folders }) {
  const { folderId } = useParams();

  const [activeFolderId, setActiveFolderId] = useState(folderId);

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#7d9d9c",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
      }}
      subheader={
        <Box>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folders
          </Typography>
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={`${id}-${name}`}
            to={`/folders/${id}`}
            style={{
              textDecoration: "none",
            }}
            onClick={() => setActiveFolderId(id)}
          >
            <Card
              sx={{
                mb: "5px",
                backgroundColor:
                  id === activeFolderId ? "rgb(255, 211, 140)" : null,
              }}
            >
              <CardContent
                sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}

export default FolderList;
