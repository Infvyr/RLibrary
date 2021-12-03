import React from 'react';
import ReactDOM from 'react-dom';
import './firebase/utils';

import App from './App';

import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
