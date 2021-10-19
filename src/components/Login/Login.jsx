import { Box, Divider, Typography } from "@mui/material";
import { FormHeading, FormButtons, LoginForm } from "..";
import { grey } from "@mui/material/colors";

const Login = () => {
    return (
        <Box
            sx={{
                gridColumn: { xs: "span 12", md: "span 8" },
                maxWidth: { xs: "100%", md: "75%" },
                p: 3,
                mt: 2,
                mb: 2,
                ml: "auto",
                mr: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <FormHeading
                heading="Get started absolutely free."
                subtitle="Free forever. No credit card needed."
            />
            <FormButtons />
            <Divider>
                <Typography variant="body2" color={grey[600]}>
                    OR
                </Typography>
            </Divider>
            <LoginForm />
        </Box>
    );
};

export default Login;
