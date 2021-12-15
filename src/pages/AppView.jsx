import { Grid } from '@mui/material';
import { AppBarView, AppMainView, Stats } from '../components';

const AppView = () => (
	<Grid container spacing={2} sx={{ mt: 0 }}>
		<AppBarView />
		<Stats />
		<AppMainView />
	</Grid>
);

export default AppView;
