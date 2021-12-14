import { useState } from 'react';
import { Register, Login } from '../components';
import { GridContainer, Header, AuthSider } from '../components';

const Dashboard = () => {
	const [isActiveLoginComponent, setIsActiveLoginComponent] = useState(false);

	return (
		<GridContainer>
			<Header
				isActiveLoginComponent={isActiveLoginComponent}
				setIsActiveLoginComponent={setIsActiveLoginComponent}
			/>
			<AuthSider isActiveLoginComponent={isActiveLoginComponent} />
			{!isActiveLoginComponent ? <Register /> : <Login />}
		</GridContainer>
	);
};

export default Dashboard;
