import { useMemo, useEffect, Suspense, lazy, memo } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
	Outlet,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { ProgressElement } from './components';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const AppView = lazy(() => import('./pages/AppView'));

import { isEmptyObject } from './helpers/functions';

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
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Suspense fallback={<ProgressElement />}>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/reset-password" element={<ResetPassword />} />
							{/* <Route
								path="/view"
								element={
									<ProtectedRoute>
										<AppView />
									</ProtectedRoute>
								}
							/> */}
							<Route element={<ProtectedRoute />}>
								<Route path="/view" element={<AppView />} />
							</Route>
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default memo(App);

function ProtectedRoute() {
	const { currentUser } = useAuth();
	const location = useLocation();
	// const navigate = useNavigate();

	if (isEmptyObject(currentUser)) {
		return <Navigate to="/" state={{ from: location }} />;
	}

	return <Outlet />;
}
