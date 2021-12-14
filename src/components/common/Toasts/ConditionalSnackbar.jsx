import { useAuth } from '../../../contexts/AuthContext';
import { Alert, Snackbar } from '@mui/material';

const ConditionalSnackbar = () => {
	const { message, setMessage } = useAuth();

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') return;

		if (message.isSuccess)
			return setMessage({
				...message,
				isSuccess: false,
			});

		if (message.isError)
			return setMessage({
				...message,
				isError: false,
			});
	};
	return (
		<Snackbar
			open={message.isSuccess ? message.isSuccess : message.isError}
			autoHideDuration={message.isSuccess ? 3000 : 3000}
			onClose={handleSnackbarClose}>
			<Alert
				onClose={handleSnackbarClose}
				severity={message.isSuccess ? 'success' : 'error'}>
				{message.isSuccess ? message.successMessage : message.errorMessage}
			</Alert>
		</Snackbar>
	);
};

export default ConditionalSnackbar;
