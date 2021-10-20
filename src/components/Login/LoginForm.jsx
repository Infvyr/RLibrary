/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import {
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
	btnSuccessBgColorMode,
	btnSuccesHoverBgColorMode,
} from '../../theme/colors';

const LoginForm = () => {
	const [values, setValues] = useState({
		password: '',
		showPassword: false,
	});

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	return (
		<form autoComplete="off">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						type="email"
						label="Email address"
						id="email"
						fullWidth
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel htmlFor="outlined-adornment-password" required>
							Password
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end">
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						size="large"
						fullWidth
						disableRipple
						sx={{
							color: '#fff',
							backgroundColor: btnSuccessBgColorMode,
							textTransform: 'capitalize',
							minHeight: '56px',

							':hover': {
								backgroundColor: btnSuccesHoverBgColorMode,
							},
						}}>
						Login
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default LoginForm;
