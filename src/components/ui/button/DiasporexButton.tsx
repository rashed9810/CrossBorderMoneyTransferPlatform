


interface DiasporexButtonProps {
    bgColor?: string;
    textColor?: string;
    fontSize?: string;
    children: React.ReactNode;
    px?: string;
    py?: string;
    fullWidth?: boolean;
    handleClick?: () => void;
    cursorPointer?: boolean;
    isHidden?: boolean;
    isDisabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    borderRadius?: string;
}

const DiasporexButton: React.FC<DiasporexButtonProps> = ({
    bgColor,
    textColor,
    fontSize,
    children,
    px,
    py,
    fullWidth,
    handleClick,
    cursorPointer,
    isHidden,
    isDisabled,
    type,
    borderRadius
}) => {
    return (
        <button
            disabled={isDisabled}
            type={type || 'button'}
            onClick={handleClick}
            style={{
                color: `${textColor}`,
                backgroundColor: bgColor,
                // fontSize: fontSize ? fontSize : '10px',
                padding: `${py} ${px}`,
                width: fullWidth ? '100%' : 'auto',
                cursor: cursorPointer ? 'pointer' : 'default',
                display: isHidden ? 'none' : 'block',
                // backgroundColor: `${props.isDisabled ? '#95a5a6' : 'currentColor'}`,
                borderRadius: borderRadius || '4px',
            }}
            className={`rounded-[5px] font-[500] transition-all flex items-center gap-3 justify-center text-center  hover:opacity-90 text-[10px] sm:text-xs`}
        >
            {children}
        </button>
    );
};

export default DiasporexButton;
