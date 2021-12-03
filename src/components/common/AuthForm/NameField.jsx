import { Grid, TextField } from '@mui/material';

const RegisterName = ({ register, errors }) => (
	<Grid item xs={12}>
		<TextField
			{...register('name', {
				required: 'Please fill in this required field!',
				pattern: {
					value: /[A-Za-z]+$/i,
					message: 'The name must contain only letters',
				},
				minLength: {
					value: 2,
					message: 'The name must be at least 2 characters long!',
				},
			})}
			label="Name"
			error={errors?.name ? true : false}
			helperText={errors?.name && errors?.name?.message}
			fullWidth
			required
		/>
	</Grid>
);

export default RegisterName;
