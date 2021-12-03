/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';

import { Alert, Grid, Snackbar } from '@mui/material';
import { NameField, EmailField, PasswordField, SubmitButton } from '../';

const RegisterForm = () => {
	const [signUpMessage, setSignUpMessage] = useState({
		errorMessage: '',
		isErrorMessageActive: false,
		successMessage: '',
		isSuccessMessageActive: false,
	});
	const navigate = useNavigate();
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: 'onBlur' });

	const { registerUser, signOutUser } = useAuth();

	const onSubmit = useCallback(async data => {
		try {
			await registerUser(data.email, data.password).then(() => {
				updateProfile(getAuth().currentUser, {
					displayName: data.name,
				});

				// reset form inputs value
				reset();

				if (signUpMessage) {
					console.warn('User has been successfully registered');
					setSignUpMessage({
						...signUpMessage,
						successMessage: 'You have signed up successfully!',
						isSuccessMessageActive: true,
					});
				}

				// sign the user out after successfully registration
				signOutUser()
					.then(() => navigate('/', { replace: true }))
					.catch(error => console.error(error.message));
			});
		} catch (error) {
			if (error) {
				console.error('Provided email is already in use or ', error);
				setSignUpMessage({
					...signUpMessage,
					errorMessage:
						'Provided email is already in use. Try out another one!',
					isErrorMessageActive: true,
				});
			}
		}
	}, []);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') return;

		if (signUpMessage.isSuccessMessageActive)
			return setSignUpMessage({
				...signUpMessage,
				isSuccessMessageActive: false,
			});

		if (signUpMessage.isErrorMessageActive)
			return setSignUpMessage({
				...signUpMessage,
				isErrorMessageActive: false,
			});
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
					<NameField register={register} errors={errors} />
					<EmailField register={register} errors={errors} />
					<PasswordField register={register} errors={errors} />
					<SubmitButton btnTitle="Sign up" isValid={isValid} />
				</form>
			</Grid>

			<Snackbar
				open={
					signUpMessage.isSuccessMessageActive
						? signUpMessage.isSuccessMessageActive
						: signUpMessage.isErrorMessageActive
				}
				autoHideDuration={signUpMessage.isSuccessMessageActive ? 3000 : 3000}
				onClose={handleSnackbarClose}>
				<Alert
					onClose={handleSnackbarClose}
					severity={signUpMessage.isSuccessMessageActive ? 'success' : 'error'}>
					{signUpMessage.isSuccessMessageActive
						? signUpMessage.successMessage
						: signUpMessage.errorMessage}
				</Alert>
			</Snackbar>
		</Grid>
	);
};

export default RegisterForm;
