import { useMediaQuery } from "@mui/material";
import { green, grey } from "@mui/material/colors";

const textColorMode = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    return prefersDarkMode ? "#fff" : grey[900];
};

const bgColorMode = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    return prefersDarkMode ? "#161C24" : "#fff";
};

const btnSuccessBgColorMode = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    return prefersDarkMode ? green[800] : green[600];
};

const btnSuccesHoverBgColorMode = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    return prefersDarkMode ? green[600] : green[700];
};

const customBoxShadow = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    return prefersDarkMode
        ? null
        : "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 6px 32px -4px";
};

export {
    textColorMode,
    bgColorMode,
    btnSuccessBgColorMode,
    btnSuccesHoverBgColorMode,
    customBoxShadow,
};
