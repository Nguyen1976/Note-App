import { Box, Card, CardContent, Grid, List, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, Outlet, useParams, useLoaderData } from "react-router-dom";

function NodeList() {
  const { noteId } = useParams(); // Lấy noteId từ URL
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const data = useLoaderData();

  useEffect(() => {
    // Cập nhật activeNoteId khi noteId trong URL thay đổi
    setActiveNoteId(noteId);
  }, [noteId]);

  return (
    <Grid container height="100%">
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#F0EBE3",
          height: "100%",
          overflowY: "auto",
          padding: "10px",
          textAlign: "left",
        }}
      >
        <List
          subheader={
            <Box>
              <Typography>Notes</Typography>
            </Box>
          }
        >
          {data.folder.notes.map(({ content, id }) => {
            return (
              <Link
                key={id} // Chỉ dùng id làm key
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    mb: "5px,",
                    backgroundColor:
                      id === activeNoteId ? "rgba(255 211 140)" : null,
                  }}
                >
                  <CardContent
                    sx={{ "&last-child": { pb: "10px" }, padding: "10px" }}
                  >
                    <div
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || "Empty"}`,
                      }}
                    ></div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        {/* Outlet sẽ render nội dung tương ứng với URL */}
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default NodeList;
