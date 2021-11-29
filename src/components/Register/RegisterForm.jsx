import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signOut,
} from 'firebase/auth';
import { Alert, Grid, Snackbar } from '@mui/material';
import { NameField, EmailField, PasswordField, SubmitButton } from '../';

const RegisterForm = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [signUpError, setSignUpError] = useState({
		message: '',
		isActive: false,
	});

	const navigate = useNavigate();

	const handleRegister = (name, email, password) => {
		const auth = getAuth();

		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				// const firebaseUser = userCredential.user;

				updateProfile(auth.currentUser, {
					displayName: name,
				});

				setUser({ name: '', email: '', password: '' });

				signOut(auth)
					.then(() => navigate('/', { replace: true }))
					.catch(console.log);
			})
			.catch(signUpError => {
				if (signUpError) {
					console.error('Provided email is already in use');
					setSignUpError({
						message: 'Provided email is already in use',
						isActive: true,
					});
				}
			});
	};

	const handleChange = prop => event =>
		setUser({ ...user, [prop]: event.target.value });

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') return;
		setSignUpError({ ...signUpError, isActive: false });
	};

	return (
		<Grid container spacing={2}>
			<NameField name={user.name} handleChange={handleChange('name')} />
			<EmailField email={user.email} handleChange={handleChange('email')} />
			<PasswordField
				password={user.password}
				handleChange={handleChange('password')}
			/>
			{user.name && user.email && user.password && (
				<SubmitButton
					btnTitle="Sign up"
					handleClick={e => {
						e.preventDefault();
						handleRegister(user.name, user.email, user.password);
					}}
				/>
			)}
			<Snackbar
				open={signUpError.isActive}
				autoHideDuration={6000}
				onClose={handleErrorClose}>
				<Alert onClose={handleErrorClose} severity="error">
					{signUpError.message}
				</Alert>
			</Snackbar>
		</Grid>
	);
};

export default RegisterForm;
