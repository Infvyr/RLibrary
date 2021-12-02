/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, createSvgIcon } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const FacebookIcon = createSvgIcon(
	<path
		fill="currentColor"
		d="M17 3.5a.5.5 0 0 0-.5-.5H14a4.77 4.77 0 0 0-5 4.5v2.7H6.5a.5.5 0 0 0-.5.5v2.6a.5.5 0 0 0 .5.5H9v6.7a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-6.7h2.62a.5.5 0 0 0 .49-.37l.72-2.6a.5.5 0 0 0-.48-.63H13V7.5a1 1 0 0 1 1-.9h2.5a.5.5 0 0 0 .5-.5z"
	/>,
	'FB'
);

const FormButtons = () => {
	const { signInWithGoogle } = useAuth();
	const navigate = useNavigate();

	return (
		<div
			css={css`
				display: flex;
				align-items: center;
				gap: 16px;
			`}>
			<Button
				variant="outlined"
				size="large"
				color="inherit"
				sx={{
					borderColor: 'rgba(145, 158, 171, 0.32)',
					minWidth: '125px',
					minHeight: '56px',
				}}
				onClick={() =>
					signInWithGoogle()
						.then(user => {
							navigate('/view', { replace: true });
							console.log('signInWithGoogle', user);
						})
						.catch(error => console.error(error))
				}>
				<GoogleIcon size="small" sx={{ color: '#DB4437' }} />
			</Button>
			<Button
				variant="outlined"
				size="large"
				color="inherit"
				sx={{
					borderColor: 'rgba(145, 158, 171, 0.32)',
					minWidth: '125px',
					minHeight: '56px',
				}}>
				<FacebookIcon size="small" sx={{ color: '#4267B2' }} />
			</Button>
		</div>
	);
};

export default FormButtons;
