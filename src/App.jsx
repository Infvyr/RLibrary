import { useMemo, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { AuthProvider } from './contexts/AuthContext';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import ResetPassword from "./pages/ResetPassword";

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

    useEffect(() => {
        document.body.setAttribute(
            "data-theme",
            prefersDarkMode ? "dark" : "light"
        );
    }, [prefersDarkMode]);

    return (
        // <AuthProvider>
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Dashboard />
                    </Route>
                    <Route path="/reset-password" exact>
                        <ResetPassword />
                    </Route>

                    <Route path="*" exact>
                        <ErrorPage />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
        // </AuthProvider>
    );
}

export default App;
