import { useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import { Login, Register } from './components';

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode]
	);

	useEffect(() => {
		document.body.setAttribute(
			'data-theme',
			prefersDarkMode ? 'dark' : 'light'
		);
	}, [prefersDarkMode]);

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route path="/" exact>
						<Dashboard />
					</Route>
					<Route path="/login" exact>
						<Login />
					</Route>
					{/* <Route path="/register" exact>
						<Register />
					</Route> */}
					<Route path="*" exact>
						<ErrorPage />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
