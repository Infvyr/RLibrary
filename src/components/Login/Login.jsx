import {useState} from "react";
import {Box, Divider, Typography, Alert, AlertTitle, Link} from '@mui/material';
import { FormHeading, FormButtons, LoginForm } from '..';
import { grey } from '@mui/material/colors';

const Login = () => {
	const [demoCredentials, ] = useState({
		email: 'username@mail.com',
		password: 'password'
	});

	const [copySuccess, setCopySuccess] = useState('')

	const copyToClipBoard = async (text) => {
		try {
			await navigator.clipboard.writeText(text)
			if(text === demoCredentials.email) setCopySuccess('Email copied!')
			if(text === demoCredentials.password) setCopySuccess('Password copied!');
			setTimeout(() => setCopySuccess(''), 1300)
		}
		catch(err) {
			setCopySuccess('Failed to copy!');
		}
	}

	return (
		<Box
			sx={{
				gridColumn: { xs: 'span 12', md: 'span 8' },
				maxWidth: { xs: '100%', md: '540px' },
				width: '100%',
				p: 3,
				mt: 2,
				mb: 2,
				ml: 'auto',
				mr: 'auto',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}>
			<FormHeading
				heading="Sign in to RLibrary"
				subtitle="Enter your details below."
			/>
			<FormButtons />
			<Divider
				sx={{
					mb: '1.25rem',
					mt: '1.25rem',
					'&::after, &::before': { transform: 'none' },
				}}>
				<Typography variant="body2" color={grey[600]}>
					OR
				</Typography>
			</Divider>
			<Alert severity="info">
				<AlertTitle>Demo credentials:</AlertTitle>
				Email: {' '}
				<Link
					href="#"
					underline="none"
					title="Click to copy email to clipboard"
					onClick={() => copyToClipBoard(demoCredentials.email)}
				>
					{demoCredentials.email}
				</Link
				> <br />
				Password: {' '}
				<Link
					href="#"
					underline="none"
					title="Click to copy password to clipboard"
					onClick={() => copyToClipBoard(demoCredentials.password)}
				>
					{demoCredentials.password}
				</Link>
				{copySuccess && <b style={{marginTop: '0.75rem', display: 'block'}}>{copySuccess}</b>}
			</Alert>
			<br/>
			<LoginForm />
		</Box>
	)
}

export default Login;
