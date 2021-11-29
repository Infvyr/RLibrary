import { Grid } from '@mui/material';
import { AppBarView } from '../components';

const AppView = () => {
	return (
		<Grid container spacing={2} sx={{ mt: 0 }}>
			<AppBarView />
		</Grid>
	);
};

export default AppView;
