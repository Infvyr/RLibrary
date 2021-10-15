import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery, Grid } from "@mui/material";
import { bgColorMode } from "./theme/colors";

import { Appbar } from "./components";

function App() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                sx={{
                    minHeight: "inherit",
                    bgcolor: bgColorMode,
                }}
            >
                <Appbar />
            </Grid>
        </ThemeProvider>
    );
}

export default App;
