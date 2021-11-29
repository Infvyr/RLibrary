import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
	const navigate = useNavigate();

	return (
		<Grid
			container
			spacing={2}
			sx={{ mt: '-5px', mb: 1.5, justifyContent: 'flex-end' }}>
			<Button
				onClick={() => navigate('/reset-password', { replace: true })}
				sx={{
					textTransform: 'capitalize',
				}}>
				Forgot password?
			</Button>
		</Grid>
	);
};

export default ResetPassword;
