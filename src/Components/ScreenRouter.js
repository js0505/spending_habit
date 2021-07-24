import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomeScreen, InputScreen, LoginScreen, StatScreen } from "../Screens";
const ScreenRouter = ({ userObject, isLoggedIn }) => {
	return (
		<Router>
			<Switch>
				{isLoggedIn ? (
					<>
						<Route path="/" exact>
							<HomeScreen userObject={userObject} />
						</Route>
						<Route path="/input" exact>
							<InputScreen userObject={userObject} />
						</Route>
						<Route path="/stat" exact>
							<StatScreen />
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
