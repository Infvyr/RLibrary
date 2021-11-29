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
import { usePasswordError } from '../../../hooks/useError';
import { red } from '@mui/material/colors';

const inputProps = {
	minLength: 6,
};

const PasswordField = ({ password, handleChange }) => {
	const [showPassword, setShowPassword] = useState('');
	const [isError, helperText, setError] = usePasswordError();

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = event => event.preventDefault();

	return (
		<Grid item xs={12}>
			<FormControl variant="outlined" fullWidth>
				<InputLabel htmlFor="outlined-adornment-password" required>
					Password
				</InputLabel>
				<OutlinedInput
					id="outlined-adornment-password"
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
					value={password}
					inputProps={inputProps}
					onInput={setError}
					error={isError}
					onChange={handleChange}
				/>
				{isError && (
					<Typography
						variant="caption"
						component="p"
						sx={{
							marginTop: '3px',
							marginRight: '14px',
							marginLeft: '14px',
							color: red[500],
						}}>
						{helperText}
					</Typography>
				)}
			</FormControl>
		</Grid>
	);
};

export default PasswordField;
