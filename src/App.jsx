import { useMemo, useEffect, Suspense, lazy, memo } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Outlet,
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

/*
const AuthenticatedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	return isAuthenticated ? (
		children
	) : (
		<Navigate to="/" replace state={{ path: location.pathname }} />
	);
};
*/
const PrivateOutlet = () => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	return isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate to="/" replace state={{ path: location.pathname }} />
	);
};

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
							<Route path="/view" element={<PrivateOutlet />}>
								<Route path="" element={<AppView />} />
							</Route>
							<Route path="/reset-password" element={<ResetPassword />} />
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</ThemeProvider>
		</AuthContextProvider>
	);
}

export default memo(App);
