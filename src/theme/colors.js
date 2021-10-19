import { useMediaQuery } from "@mui/material";
import { green, grey } from "@mui/material/colors";

const textColorMode = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    return prefersDarkMode ? grey[50] : grey[900];
};

const bgColorMode = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    return prefersDarkMode ? grey[900] : grey[50];
};

const btnSuccessBgColorMode = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    return prefersDarkMode ? green[800] : green[600];
};

const btnSuccesHoverBgColorMode = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    return prefersDarkMode ? green[600] : green[700];
};

export {
    textColorMode,
    bgColorMode,
    btnSuccessBgColorMode,
    btnSuccesHoverBgColorMode,
};
