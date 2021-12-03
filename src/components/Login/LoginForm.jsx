/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';

import { EmailField, PasswordField, SubmitButton, ResetPassword } from '../';
import { Alert, Grid, Snackbar } from '@mui/material';

const LoginForm = () => {
	const [signInError, setSignInError] = useState({
		message: '',
		isActive: false,
	});
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
	});
	const { signInUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const onSubmit = useCallback(async data => {
		try {
			await signInUser(data.email, data.password);
			navigate(location.state?.path || '/view', { replace: true });
		} catch (error) {
			switch (error.code) {
				case 'auth/user-not-found':
					setSignInError({
						message: 'Please verify the correctness of your email address!',
						isActive: true,
					});
					break;
				case 'auth/wrong-password':
					setSignInError({
						message: 'Please verify the correctness of your password!',
						isActive: true,
					});
					break;

				case 'auth/too-many-requests':
					setSignInError({
						message:
							"We're sorry! Too many requests at time. Please try again later!",
						isActive: true,
					});
					break;

				default:
					setSignInError({
						message: error.message,
						isActive: true,
					});
					break;
			}
		}
	}, []);

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') return;
		setSignInError({ ...signInError, isActive: false });
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
					<EmailField register={register} errors={errors} />
					<PasswordField register={register} errors={errors} />
					<SubmitButton btnTitle="Sign up" isValid={isValid} />
				</form>
			</Grid>

			<Snackbar
				open={signInError.isActive}
				autoHideDuration={4000}
				onClose={handleErrorClose}>
				<Alert onClose={handleErrorClose} severity="error">
					{signInError.message}
				</Alert>
			</Snackbar>
		</Grid>
	);
};

export default LoginForm;
