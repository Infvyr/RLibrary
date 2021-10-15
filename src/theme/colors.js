import { useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";

export const textColorMode = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    return prefersDarkMode ? grey[50] : grey[900];
};

export const bgColorMode = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    return prefersDarkMode ? grey[900] : grey[50];
};
