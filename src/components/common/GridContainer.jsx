import { Box } from '@mui/material';

const GridContainer = ({ children, gap = null }) => {
	return (
		<Box
			display="grid"
			gridTemplateColumns="repeat(12, 1fr)"
			gap={gap}
			sx={{
				minHeight: 'inherit',
			}}>
			{children}
		</Box>
	);
};

export default GridContainer;
