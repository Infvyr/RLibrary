/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
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
	} = useForm({ mode: 'onBlur' });

	const { registerUser, signOutUser } = useAuth();

	const onSubmit = data =>
		registerUser(data.email, data.password)
			.then(() => {
				updateProfile(getAuth().currentUser, {
					displayName: data.name,
				});

				// reset user state and form inputs value
				setUser({ name: '', email: '', password: '' });
				reset();

				if (signUpSuccess) {
					console.warn('User has been successfully registered');
					setSignUpSuccess({
						message: 'You have signed up successfully!',
						isActive: true,
					});
				}

				// sign out automatically sign in user after successfully registered user
				signOutUser()
					.then(() => navigate('/', { replace: true }))
					.catch(error => console.error(error.message));
			})
			.catch(signUpError => {
				if (signUpError) {
					console.error('Provided email is already in use or ', signUpError);
					setSignUpError({
						message: 'Provided email is already in use. Try out another one!',
						isActive: true,
					});
					setUser({ ...user, email: '' });
				}
			});

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
				open={
					signUpSuccess.isActive ? signUpSuccess.isActive : signUpError.isActive
				}
				autoHideDuration={signUpSuccess.isActive ? 2000 : 3000}
				onClose={handleSnackbarClose}>
				<Alert
					onClose={handleSnackbarClose}
					severity={signUpSuccess.isActive ? 'success' : 'error'}>
					{signUpSuccess.isActive ? signUpSuccess.message : signUpError.message}
				</Alert>
			</Snackbar>
		</Grid>
	);
};

export default RegisterForm;
