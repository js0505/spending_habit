import React from "react";
import { Link } from "react-router-dom";
import { authService } from "../fbase";

const Navbar = () => {
	const onSignoutHandler = (e) => {
		e.preventDefault();
		const logoutAlert = window.confirm("Log out?");
		if (logoutAlert) {
			authService.signOut();
			return;
		}
	};
	return (
		<div>
			<Link to="/stat">
				<button>통계</button>
			</Link>
			<Link to="/">
				<button>Home</button>
			</Link>
			<Link to="/input">
				<button>입력</button>
			</Link>
			<button onClick={onSignoutHandler}>Log Out</button>
		</div>
	);
};

export default Navbar;
