/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { AuthSiderTitle } from "..";

const Header = ({ isLogged, setIsLogged }) => {
    return (
        <header
            css={css`
                position: absolute;
                top: 0;
                padding: 15px 24px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                @media (min-width: 900px) {
                    padding: 40px 40px 0 40px;
                    align-items: flex-start;
                }
            `}
        >
            <AuthSiderTitle
                title="RLibrary"
                variant="h3"
                styles={{ marginBottom: "auto" }}
            />

            <>
                <Typography variant="body2">
                    {!isLogged ? (
                        <>
                            Already have an account?&nbsp;
                            <a
                                href="#!"
                                title="Login"
                                onClick={() => setIsLogged(!isLogged)}
                            >
                                <b>Login</b>
                            </a>
                        </>
                    ) : (
                        <>
                            Don't have an account?&nbsp;
                            <a
                                href="#!"
                                title="Register"
                                onClick={() => setIsLogged(!isLogged)}
                            >
                                <b>Get started</b>
                            </a>
                        </>
                    )}
                </Typography>
            </>
        </header>
    );
};

export default Header;
