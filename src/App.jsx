// import { useMemo } from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Typography, useMediaQuery } from '@mui/material';

function App() {
	// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	// const theme = useMemo(
	// 	() =>
	// 		createTheme({
	// 			palette: {
	// 				mode: prefersDarkMode ? 'dark' : 'light',
	// 			},
	// 		}),
	// 	[prefersDarkMode]
	// );

	return (
		// <ThemeProvider theme={theme}>
		<Container>
			<Typography variant="h1" color="primary">
				Vite + React
			</Typography>
			<Typography variant="h3" color="secondary">
				Vite
			</Typography>
			<Typography variant="body1">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
				pariatur maxime harum officia asperiores laudantium quisquam deserunt
				ullam? Dolorum eius voluptatibus non adipisci unde dicta neque voluptas
				tempora blanditiis quidem.
			</Typography>
		</Container>
		// </ThemeProvider>
	);
}

export default App;
