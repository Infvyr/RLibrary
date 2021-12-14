import { Typography } from "@mui/material";

const AuthSiderTitle = ({ variant, title, fontWeight = 500, styles = "" }) => {
    return (
        <Typography
            variant={variant}
            sx={{ fontWeight: `${fontWeight}`, ...styles }}
        >
            {title}
        </Typography>
    );
};

export default AuthSiderTitle;
