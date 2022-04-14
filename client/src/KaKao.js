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
   
    display: "block",
    position: "absolute",
    top: "40%",
    left: "-12px",
    width: "500px",
    height: "400px",
    padding: "7px",
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