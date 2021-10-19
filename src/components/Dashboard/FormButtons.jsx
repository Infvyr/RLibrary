/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const FormButtons = () => {
    return (
        <div
            css={css`
                display: flex;
                align-items: center;
                gap: 16px;
                margin-bottom: 1.25rem;
            `}
        >
            <Button
                variant="outlined"
                size="large"
                color="inherit"
                sx={{
                    borderColor: "rgba(145, 158, 171, 0.32)",
                    minWidth: "125px",
                    minHeight: "56px",
                }}
            >
                <GoogleIcon size="small" sx={{ color: "#DB4437" }} />
            </Button>
            <Button
                variant="outlined"
                size="large"
                color="inherit"
                sx={{
                    borderColor: "rgba(145, 158, 171, 0.32)",
                    minWidth: "125px",
                    minHeight: "56px",
                }}
            >
                <FacebookIcon size="small" sx={{ color: "#4267B2" }} />
            </Button>
        </div>
    );
};

export default FormButtons;
