/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';

import {
	EmailField,
	PasswordField,
	SubmitButton,
	ResetPassword,
	SnackBarError,
} from '../';
import { Grid } from '@mui/material';

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
	});

	const { signInUser, setSignInError, message, setMessage } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const onSubmit = useCallback(async data => {
		try {
			await signInUser(data.email, data.password);
			navigate(location.state?.path || '/view', { replace: true });
			setMessage({ ...message, successMessage: '' });
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

			<SnackBarError />
		</Grid>
	);
};

export default LoginForm;
