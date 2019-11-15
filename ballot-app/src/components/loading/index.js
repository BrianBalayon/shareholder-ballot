import React from "react";
import ReactLoading from "react-loading";

const Loading = ({color, height, type, width}) => (
    <div className="Container to-center">
        <div>
            <ReactLoading type={type} color={color} height={height} width={width}/>
        </div>
    </div>
);

Loading.defaultProps = {
    color: "black",
    height: 400,
    type: "bars",
    width: 400
};

export default Loading;
