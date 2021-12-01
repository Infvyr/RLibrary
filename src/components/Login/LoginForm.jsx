import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert, Grid, Snackbar } from '@mui/material';
import { EmailField, PasswordField, SubmitButton, ResetPassword } from '../';

const LoginForm = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [signInError, setSignInError] = useState({
		message: '',
		isActive: false,
	});
	const navigate = useNavigate();

	const handleChange = prop => event => {
		setUser({ ...user, [prop]: event.target.value });
	};

	const handleLogin = (email, password) => {
		const auth = getAuth();

		signInWithEmailAndPassword(auth, email, password)
			.then(() => navigate('/view', { replace: true }))
			.catch(signInError => {
				if (signInError) {
					console.error("Provided email or password doesn't match");
					setSignInError({
						message: "Provided email or password doesn't match",
						isActive: true,
					});
				}
			});
	};

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') return;
		setSignInError({ ...signInError, isActive: false });
	};

	return (
		<Grid container spacing={2}>
			<EmailField email={user.email} handleChange={handleChange('email')} />
			<PasswordField
				password={user.password}
				handleChange={handleChange('password')}
			/>
			<Grid item xs={12}>
				<ResetPassword />
				<SubmitButton
					btnTitle="Sign in"
					handleClick={e => {
						e.preventDefault();
						handleLogin(user.email, user.password);
					}}
				/>
			</Grid>
			<Snackbar
				open={signInError.isActive}
				autoHideDuration={6000}
				onClose={handleErrorClose}>
				<Alert onClose={handleErrorClose} severity="error">
					{signInError.message}
				</Alert>
			</Snackbar>
		</Grid>
	);
};

export default LoginForm;
