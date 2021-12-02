import { useMemo, useEffect, Suspense, lazy, memo } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useLocation,
} from 'react-router-dom';
import { AuthContextProvider, useAuth } from './contexts/AuthContext';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { ProgressElement } from './components';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const AppView = lazy(() => import('./pages/AppView'));

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
		<AuthContextProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Suspense fallback={<ProgressElement />}>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/reset-password" element={<ResetPassword />} />
							{/* <Route path="/view" element={<AppView />} /> */}
							<Route
								path="/view"
								element={
									<RequireAuth>
										<AppView />
									</RequireAuth>
								}
							/>
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</ThemeProvider>
		</AuthContextProvider>
	);
}

export default memo(App);

function RequireAuth({ children }) {
	const { currentUser } = useAuth();
	let location = useLocation();

	console.log('RequireAuth', currentUser);

	if (currentUser === null)
		return <Navigate to="/" state={{ from: location }} />;
	// if (!currentUser) return <Navigate to="/" state={{ from: location }} />;

	return children;
}
