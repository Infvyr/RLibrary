import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import {
	btnSuccesHoverBgColorMode,
	btnSuccessBgColorMode,
} from '../../theme/colors';

const ResetPasswordFormHeader = () => {
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
				href="/"
				variant="text"
				fullWidth
				disableRipple
				sx={{
					backgroundColor: 'transparent',
					textTransform: 'capitalize',
					minHeight: '56px',

					':hover': {
						backgroundColor: 'rgba(0, 171, 85, 0.08)',
					},
				}}>
				Back
			</Button>
		</Grid>
	);
};

export default ResetPasswordFormHeader;
