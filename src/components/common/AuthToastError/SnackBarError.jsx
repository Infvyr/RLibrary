import { Alert, Snackbar } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';

const SnackBarError = () => {
	const { setSignInError, signInError } = useAuth();

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') return;
		setSignInError({ ...signInError, isActive: false });
	};

	return (
		<Snackbar
			open={signInError.isActive}
			autoHideDuration={4000}
			onClose={handleErrorClose}>
			<Alert onClose={handleErrorClose} severity="error">
				{signInError.message}
			</Alert>
		</Snackbar>
	);
};

export default SnackBarError;
