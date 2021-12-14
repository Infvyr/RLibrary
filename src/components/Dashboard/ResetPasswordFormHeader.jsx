/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
	btnSuccesHoverBgColorMode,
	btnSuccessBgColorMode,
} from '../../theme/colors';

const ResetPasswordFormHeader = () => {
	const navigate = useNavigate();

	return (
		<Grid
			container
			maxWidth={{ md: '480px' }}
			margin={{ md: 'auto', xs: ' 0 0 auto' }}>
			<Typography
				variant="h4"
				marginBottom="16px"
				fontWeight={500}
				fontSize={{ xs: 'x-large', md: 'xx-large' }}>
				Forgot your password?
			</Typography>
			<Typography variant="body1" marginBottom="16px">
				Please enter the email address associated with your account and We will
				email you a link to reset your password.
			</Typography>
			<TextField type="email" label="Email address" fullWidth required />
			<Button
				variant="outlined"
				fullWidth
				disableRipple
				sx={{
					mt: 2,
					mb: 2,
					color: '#fff',
					backgroundColor: btnSuccessBgColorMode,
					textTransform: 'capitalize',
					minHeight: '56px',

					':hover': {
						backgroundColor: btnSuccesHoverBgColorMode,
					},
				}}>
				Reset password
			</Button>
			<Button
				variant="text"
				fullWidth
				disableRipple
				onClick={() => navigate('/', { replace: true })}
				css={css`
					min-height: 56px;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					text-transform: capitalize;
					transition: background-color 300ms ease;

					&:hover {
						background-color: rgba(0, 171, 85, 0.08);
					}
				`}>
				Back
			</Button>
		</Grid>
	);
};

export default ResetPasswordFormHeader;
