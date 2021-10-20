import { Container } from '@mui/material';
import { ResetPasswordForm } from '../components';
import { bgColorMode, textColorMode } from '../theme/colors';

const ResetPassword = () => {
	return (
		<Container
			maxWidth="xxl"
			sx={{
				minHeight: 'inherit',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: bgColorMode,
				color: textColorMode,
			}}>
			<ResetPasswordForm />
		</Container>
	);
};

export default ResetPassword;
