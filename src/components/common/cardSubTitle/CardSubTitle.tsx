

interface CardSubTitleProps {
    title: string;
    fontSize?: string;
}

const CardSubTitle = (props: CardSubTitleProps) => {

    return (
        <>
            <p
                style={{ fontSize: props?.fontSize ? props?.fontSize : '14px' }}
                className="font-bold text-sm lg:text-base text-text-400 dark:text-max"
            >
                {(props?.title)}
            </p>
        </>
    );
};

export default CardSubTitle;
