import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const FormHeading = ({ heading, subtitle }) => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                {heading}
            </Typography>
            <Typography variant="subtitle1" paragraph color={grey[600]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default FormHeading;
