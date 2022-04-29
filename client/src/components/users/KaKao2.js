import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const Post = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;
  const setZip = props.setZip;

  const onCompletePost = (data) => {
    console.log(data.address);
    setAddress(data.address);
    setZip(data.zonecode);
  };

  const postCodeStyle = {
    margin:0,
    padding:0,
    display: "block",
    position: "fixed",
    top: "35%",
    right:'200px',
    width: "500px",
    height: "465px",
    padding: "7px",
    backgroundColor: "white",
    border:"1px solid #777",
    borderRadius:'10px',
    zIndex: 100, 
  };

  

  return (
    <>
    
        <DaumPostcode
          style={postCodeStyle}
          autoClose
          onComplete={onCompletePost}

        />
     
    </>
  );
};

export default Post;