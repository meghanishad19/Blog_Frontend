import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const lebelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };

const AddBlog = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const sendRequest = async() =>{
    const res = await axios.post("http://localhost:6000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.image,
      user:localStorage.getItem("userId")
    }).catch(err=>console.log(err));
    const data = await res.data;
    return data
  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(()=>navigate("/blogs"));
  }

  return (
    <div>
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
          <TextField name="title" onChange={handleChange} value={inputs.title} margin="normal" variant="outlined" />
          <InputLabel sx={lebelStyles}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} margin="normal" variant="outlined" />
          <InputLabel sx={lebelStyles}>ImageURL</InputLabel>
          <TextField name="image" onChange={handleChange} value={inputs.image} margin="normal" variant="outlined" />

          <Button sx={{mt:2, borderRadius:4}} variant="contained" type="submit">Submit</Button>

        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
