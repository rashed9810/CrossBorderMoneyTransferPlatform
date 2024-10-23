import React from "react";

type LoadingSpinnerProps = {
    width?: string;
    height?: string;
    color?: string;
    borderWidth?: string;
};

const LoadingSpin: React.FC<LoadingSpinnerProps> = ({ borderWidth, color, width, height }) => {
    return (
        <div
            style={{
                width: width,
                height: height,
                borderWidth: borderWidth,
                borderColor: color,
            }}
            className={`animate-spin rounded-full`}></div>
    );
};

export default LoadingSpin;