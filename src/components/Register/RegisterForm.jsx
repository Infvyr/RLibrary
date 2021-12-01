/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signOut,
} from 'firebase/auth';
import { useForm } from 'react-hook-form';

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
	const [signUpSuccess, setSignUpSuccess] = useState({
		message: '',
		isActive: false,
	});
	const navigate = useNavigate();
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: 'onSubmit' });

	const onSubmit = data => {
		const auth = getAuth();

		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then(() => {
				updateProfile(auth.currentUser, {
					displayName: data.name,
				});

				setUser({ name: '', email: '', password: '' });
				reset();

				if (signUpSuccess) {
					console.warn('User has been successfully registered');
					setSignUpSuccess({
						message: 'You have signed up successfully!',
						isActive: true,
					});
				}

				signOut(auth)
					.then(() => navigate('/', { replace: true }))
					.catch(error => console.error(error.message));
			})
			.catch(signUpError => {
				if (signUpError) {
					console.error('Provided email is already in use');
					setSignUpError({
						message: 'Provided email is already in use. Try out another one!',
						isActive: true,
					});
					setUser({ ...user, email: '' });
				}
			});
	};

	const handleChange = prop => event =>
		setUser({ ...user, [prop]: event.target.value });

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') return;

		if (signUpSuccess.isActive)
			return setSignUpSuccess({ ...signUpSuccess, isActive: false });
		if (signUpError.isActive)
			return setSignUpError({ ...signUpError, isActive: false });
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					css={css`
						display: flex;
						flex-direction: column;
						gap: 1em;
					`}>
					<NameField
						name={user.name}
						handleChange={handleChange('name')}
						register={register}
						errors={errors}
					/>
					<EmailField
						email={user.email}
						handleChange={handleChange('email')}
						register={register}
						errors={errors}
					/>
					<PasswordField
						password={user.password}
						handleChange={handleChange('password')}
						register={register}
						errors={errors}
					/>
					<SubmitButton btnTitle="Sign up" isValid={isValid} />
				</form>
			</Grid>

			<Snackbar
				open={signUpSuccess.isActive}
				autoHideDuration={2000}
				onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity="success">
					{signUpSuccess.message}
				</Alert>
			</Snackbar>

			<Snackbar
				open={signUpError.isActive}
				autoHideDuration={4500}
				onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity="error">
					{signUpError.message}
				</Alert>
			</Snackbar>
		</Grid>
	);
};

export default RegisterForm;
