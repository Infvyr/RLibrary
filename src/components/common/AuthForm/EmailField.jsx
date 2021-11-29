import { Grid, TextField } from '@mui/material';
import { useEmailError } from '../../../hooks/useError';

const EmailField = ({ email, handleChange }) => {
	const [isError, helperText, setError] = useEmailError();

	return (
		<Grid item xs={12}>
			<TextField
				id="email"
				type="email"
				label="Email address"
				value={email}
				onChange={handleChange}
				onInput={setError}
				error={isError}
				helperText={helperText}
				fullWidth
				required
			/>
		</Grid>
	);
};

export default EmailField;
