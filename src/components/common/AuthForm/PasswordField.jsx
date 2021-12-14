import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';

const PasswordField = ({ register, errors }) => {
	const minLength = 6;
	const [showPassword, setShowPassword] = useState('');

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = event => event.preventDefault();

	return (
		<Grid item xs={12}>
			<FormControl variant="outlined" fullWidth>
				<InputLabel htmlFor="password" required>
					Password
				</InputLabel>
				<OutlinedInput
					{...register('password', {
						required: 'This field is required!',
						minLength: {
							value: minLength,
							message: `Password must have at least ${minLength} characters`,
						},
					})}
					type={showPassword ? 'text' : 'password'}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end">
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					label="Password"
					error={errors?.password ? true : false}
				/>
				<Typography
					variant="caption"
					component="p"
					sx={{
						marginTop: '3px',
						marginRight: '14px',
						marginLeft: '14px',
						color: red[500],
					}}>
					{errors?.password && errors?.password?.message}
				</Typography>
			</FormControl>
		</Grid>
	);
};

export default PasswordField;
