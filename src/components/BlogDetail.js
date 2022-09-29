import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const lebelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:4000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:4000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  console.log(blog);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
  };
  
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:4000/api/blog/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data
  }

  const handleDelete = () => {
    deleteRequest().then((data) => console.log(data));
  }

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(60,251,217,1) 4%, rgba(0,212,255,1) 100%)"
            borderRadius={8}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={2}
            display="flex"
            flexDirection={"column"}
            width={"75%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h3"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>

            <InputLabel sx={lebelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={lebelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={lebelStyles}>ImageURL</InputLabel>
            <TextField
              name="image"
              onChange={handleChange}
              value={inputs.image}
              margin="normal"
              variant="outlined"
            />

            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              type="submit"
            >
              Update
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
