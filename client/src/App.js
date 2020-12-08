/** @format */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Company from './pages/Company';
import User from './pages/User';

const App = () => {
	return (
		<>
			<ToastContainer />
			<Switch>
				<Route exact path={'/user'} component={User} />
				<Route exact path={'/company'} component={Company} />
			</Switch>
		</>
	);
};

export default App;
