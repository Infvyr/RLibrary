import { Box } from "@mui/material";
import { bgColorMode, textColorMode } from "../../theme/colors";

const GridContainer = ({ children, gap = null }) => {
    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={gap}
            sx={{
                minHeight: "inherit",
                bgcolor: bgColorMode,
                color: textColorMode,
            }}
        >
            {children}
        </Box>
    );
};

export default GridContainer;
