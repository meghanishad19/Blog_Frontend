import { CardMedia } from '@mui/material';
import React from 'react';


const Test = (props) => {
  return (
    <div>
    <CardMedia
    component="img"
    height="194"
    image={props.image}
  
  />
  {console.log(props.image)}
  </div>
  )
}

export default Test