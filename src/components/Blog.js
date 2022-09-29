import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, description, image, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  console.log(title, isUser);

  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:6000/api/blog/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data
  }

  const handleDelete = () => {
    deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"));
  }

  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          marginTop: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "15px 15px 30px #cccc",
          },
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
       
        <CardContent>
        <hr/>
        <br/>
          <Typography variant="body2" color="text.secondary">
            <b> {userName}</b> {" : "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
