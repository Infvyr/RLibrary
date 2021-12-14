/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';

import { Grid } from '@mui/material';
import {
	NameField,
	EmailField,
	PasswordField,
	SubmitButton,
	ConditionalSnackbar,
} from '../';

const RegisterForm = () => {
	const { registerUser, signOutUser, message, setMessage } = useAuth();
	const navigate = useNavigate();
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = useCallback(async data => {
		try {
			await registerUser(data.email, data.password).then(() => {
				updateProfile(getAuth().currentUser, {
					displayName: data.name,
				});

				// reset form inputs value
				reset();

				if (!message.isSuccess) {
					setMessage({
						...message,
						successMessage: 'You have signed up successfully!',
						isSuccess: true,
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
				setMessage({
					...message,
					errorMessage:
						'Provided email is already in use. Try out another one!',
					isError: true,
				});
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
					<NameField register={register} errors={errors} />
					<EmailField register={register} errors={errors} />
					<PasswordField register={register} errors={errors} />
					<SubmitButton btnTitle="Sign up" isValid={isValid} />
				</form>
			</Grid>

			<ConditionalSnackbar />
		</Grid>
	);
};

export default RegisterForm;
