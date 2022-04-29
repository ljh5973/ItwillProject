import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeartImg from './redHeart.gif'
import EmptyHeartImg from './blackHeart.png'

const Heart = styled.img` width:50px color:red } `;
const HeartButton = ({ like, onClick }) => {
    return (
        <Heart src={like ? HeartImg : EmptyHeartImg} onClick={onClick} />);
};
export default HeartButton;