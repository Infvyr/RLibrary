import { useState } from 'react';
import { Register, Login } from '../components';
import { GridContainer, Header, AuthSider } from '../components';

const Dashboard = () => {
	const [isLogged, setIsLogged] = useState(false);

	return (
		<GridContainer>
			<Header isLogged={isLogged} setIsLogged={setIsLogged} />
			<AuthSider isLogged={isLogged} />
			{!isLogged ? <Register /> : <Login />}
		</GridContainer>
	);
};

export default Dashboard;
