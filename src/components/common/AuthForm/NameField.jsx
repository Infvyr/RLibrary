import { Grid, TextField } from '@mui/material';
import { useTextError } from '../../../hooks/useError';

const inputProps = {
	pattern: '[A-Za-z]*',
	minLength: 2,
};

const RegisterName = ({ name, handleChange }) => {
	const [isError, helperText, setError] = useTextError();

	return (
		<Grid item xs={12}>
			<TextField
				id="name"
				label="Name"
				value={name}
				inputProps={inputProps}
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

export default RegisterName;
