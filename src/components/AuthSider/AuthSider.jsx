import { Box, Paper } from '@mui/material';
import { AuthSiderTitle, AuthSiderImage } from '../';
import { bgColorMode, customBoxShadow } from '../../theme/colors';

import registerSiderImagePath from '../../images/illustration_register.png';
import loginSiderImagePath from '../../images/illustration_login.png';

const AuthSider = ({ isActiveLoginComponent }) => {
	const registerSiderImageAttr = {
		containerClass: 'register-sider-image',
		imagePath: registerSiderImagePath,
		styles: `margin-bottom: auto;`,
	};

	const loginSiderImageAttr = {
		containerClass: 'login-sider-image',
		imagePath: loginSiderImagePath,
		styles: `margin-bottom: auto;`,
	};

	return (
		<Box gridColumn="span 4" sx={{ height: '100%' }}>
			<Paper
				elevation={1}
				sx={{
					p: 3,
					ml: 2,
					mt: 2,
					mb: 2,
					display: { md: 'flex', sm: 'none', xs: 'none' },
					gap: 2,
					flexDirection: 'column',
					justifyContent: 'center',
					height: 'calc(100% - 32px)',
					width: '100%',
					maxWidth: '420px',
					boxShadow: customBoxShadow,
					bgcolor: bgColorMode,
				}}>
				{!isActiveLoginComponent ? (
					<>
						<AuthSiderTitle
							title="Manage the job more effectively with RLibrary"
							variant="h4"
							styles={{ margin: 'auto 0px 40px' }}
						/>
						<AuthSiderImage {...registerSiderImageAttr} />
					</>
				) : (
					<>
						<AuthSiderTitle
							title="Hi, Welcome Back"
							variant="h4"
							styles={{ margin: 'auto 0px 40px' }}
						/>
						<AuthSiderImage {...loginSiderImageAttr} />
					</>
				)}
			</Paper>
		</Box>
	);
};

export default AuthSider;
