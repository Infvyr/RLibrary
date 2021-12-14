import { Box, CircularProgress } from '@mui/material';

const ProgressElement = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				height: '100vh',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: '#f3f3f3',
			}}>
			<CircularProgress />
		</Box>
	);
};

export { ProgressElement };
