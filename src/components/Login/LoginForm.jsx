/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';

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
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
	});

	const onSubmit = data => {
		const auth = getAuth();

		signInWithEmailAndPassword(auth, data.email, data.password)
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

	const handleChange = prop => event => {
		setUser({ ...user, [prop]: event.target.value });
	};

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
