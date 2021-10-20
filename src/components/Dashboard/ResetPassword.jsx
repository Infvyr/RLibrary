import { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
	const [checked, setChecked] = useState(false);

	const handleChange = event => {
		setChecked(event.target.checked);
	};

	return (
		<Grid container spacing={2} sx={{ mt: '-5px', mb: 3 }}>
			<Grid item xs={6}>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={checked}
								onChange={handleChange}
								inputProps={{ 'aria-label': 'controlled' }}
								sx={{ pt: 0, pb: 0 }}
							/>
						}
						label="Remember me"
					/>
				</FormGroup>
			</Grid>
			<Grid item xs={6} textAlign="right">
				<Link to="/reset-password">Forgot password?</Link>
			</Grid>
		</Grid>
	);
};

export default ResetPassword;
