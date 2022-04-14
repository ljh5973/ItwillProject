import React from "react";

function HorizonLine({text}) {
    return (
        <div className="horizonline">
            <span>{text}</span>
            {/*  텍스트를 받아서 사용하겠다 */}
        </div>
    );
}

export default HorizonLine;