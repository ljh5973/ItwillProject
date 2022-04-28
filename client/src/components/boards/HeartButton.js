import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeartImg from './heartRed.png'
import EmptyHeartImg from './heartBlack.png'

const Heart = styled.img` width:50px } `;
const HeartButton = ({ like, onClick }) => {
    return (
        <Heart src={like ? HeartImg : EmptyHeartImg} onClick={onClick} />);
};
export default HeartButton;

