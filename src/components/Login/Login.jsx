import { Box, Divider, Typography } from '@mui/material';
import { FormHeading, FormButtons, LoginForm } from '..';
import { grey } from '@mui/material/colors';

const Login = () => (
	<Box
		sx={{
			gridColumn: { xs: 'span 12', md: 'span 8' },
			maxWidth: { xs: '100%', md: '540px' },
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
		<LoginForm />
	</Box>
);

export default Login;
