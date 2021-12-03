import { Grid, TextField } from '@mui/material';

const EmailField = ({ register, errors }) => (
	<Grid item xs={12}>
		<TextField
			{...register('email', {
				required: 'Please fill in this required field!',
			})}
			type="email"
			label="Email address"
			error={errors?.email ? true : false}
			helperText={errors?.email && errors?.email?.message}
			fullWidth
			required
		/>
	</Grid>
);

export default EmailField;
