import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomeScreen, InputScreen, LoginScreen } from "../Screens";
const ScreenRouter = ({ userObject, isLoggedIn }) => {
	return (
		<Router>
			<Switch>
				{isLoggedIn ? (
					<>
						<Route path="/" exact>
							<HomeScreen />
						</Route>
						<Route path="/input" exact>
							<InputScreen />
						</Route>
					</>
				) : (
					<>
						<Route path="/" exact>
							<LoginScreen />
						</Route>
					</>
				)}
			</Switch>
		</Router>
	);
};

export default ScreenRouter;
