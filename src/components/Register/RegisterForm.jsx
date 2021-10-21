import { useState, useRef } from 'react';
import {
	Alert,
	AlertTitle,
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

import { useAuth } from '../../contexts/AuthContext';

const RegisterForm = () => {
	const [values, setValues] = useState({
		password: '',
		showPassword: false,
	});

	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const passwordRef = useRef();
	const emailRef = useRef();

	const { signUp, currentUser } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await signUp(
				firstNameRef.current.value,
				lastNameRef.current.value,
				passwordRef.current.value,
				emailRef.current.value
			);
		} catch (error) {
			setError('Failed to create an account');
		}
	}

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
		<>
			{JSON.stringify(currentUser)}
			{error && (
				<Alert severity="error" sx={{ mb: 4 }}>
					<AlertTitle>Error</AlertTitle>
					{error}
				</Alert>
			)}
			<form autoComplete="off" onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							label="First name"
							id="firstName"
							fullWidth
							required
							ref={firstNameRef}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Last name"
							id="lastName"
							fullWidth
							required
							ref={lastNameRef}
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
								ref={passwordRef}
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
						<TextField
							type="email"
							label="Email address"
							id="email"
							fullWidth
							required
							ref={emailRef}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							type="submit"
							variant="contained"
							size="large"
							disabled={loading}
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
							Register
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default RegisterForm;
