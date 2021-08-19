import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
	HomeScreen,
	InputScreen,
	LoginScreen,
	StatScreen,
	UpdateScreen,
} from "../Screens";


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
							<StatScreen userObject={userObject} />
						</Route>
						<Route path="/update/:id" exact>
							<UpdateScreen userObject={userObject} />
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
