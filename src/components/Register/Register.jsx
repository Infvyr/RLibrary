import { Box, Divider, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FormHeading, FormButtons, RegisterForm } from '..';

const Register = () => {
	return (
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
				heading="Get started absolutely free."
				subtitle="Free forever. No credit card needed."
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
			<RegisterForm />
		</Box>
	);
};

export default Register;
