import { Alert, Snackbar } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';

const SnackBarError = () => {
	const { error, setError } = useAuth();

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') return;
		setError({ ...error, isActive: false });
	};

	return (
		<Snackbar
			open={error.isActive}
			autoHideDuration={4000}
			onClose={handleErrorClose}>
			<Alert onClose={handleErrorClose} severity="error">
				{error.message}
			</Alert>
		</Snackbar>
	);
};

export default SnackBarError;
