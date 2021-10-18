/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NoImage from "../../images/no-image.png";

const AuthSiderImage = ({
    containerClass,
    imagePath = NoImage,
    imageAlt = "image",
    styles,
}) => {
    return (
        <figure
            className={containerClass ?? null}
            css={css`
                ${styles}
            `}
        >
            <img src={imagePath} alt={imageAlt} />
        </figure>
    );
};

export default AuthSiderImage;
