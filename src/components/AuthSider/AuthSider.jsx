import { Box, Paper } from "@mui/material";
import { AuthSiderTitle, AuthSiderImage } from "../";

import registerSiderImagePath from "../../images/illustration_register.png";
// import loginSiderImagePath from "../../images/illustration_login.png";

const AuthSider = () => {
    const registerSiderImageClass = "register-sider-image";

    const registerSsiderImageAttr = {
        containerClass: registerSiderImageClass,
        imagePath: registerSiderImagePath,
        styles: `margin-bottom: auto;`,
    };

    return (
        <Box gridColumn="span 4" sx={{ height: "100%" }}>
            <Paper
                elevation={1}
                sx={{
                    p: 3,
                    ml: 2,
                    mt: 2,
                    mb: 2,
                    display: { md: "flex", sm: "none", xs: "none" },
                    gap: 2,
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "calc(100% - 32px)",
                    width: "100%",
                    maxWidth: "420px",
                    boxShadow:
                        "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 6px 32px -4px",
                }}
            >
                <AuthSiderTitle
                    title="RLibrary"
                    variant="h3"
                    styles={{ marginBottom: "auto" }}
                />
                <AuthSiderTitle
                    title="Manage the job more effectively with RLibrary"
                    variant="h4"
                />
                <AuthSiderImage {...registerSsiderImageAttr} />
            </Paper>
        </Box>
    );
};

export default AuthSider;
