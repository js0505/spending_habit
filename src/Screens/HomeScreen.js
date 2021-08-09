import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authService, dbService } from "../fbase";

const HomeScreen = ({ userObject }) => {
	const [trueValue, setTrueValue] = useState(0);
	const [falseValue, setFalseValue] = useState(0);
	// const today = new Date().toISOString().substring(0, 10);
	const month = new Date().toISOString().substring(0, 7);

	useEffect(() => {
		dbService
			.collection(`${userObject.email}`)
			.where("month", "==", month)
			.where("nessesary", "==", true)
			.get()
			.then((res) =>
				res.docs.map((item) =>
					setTrueValue((prev) => parseInt(item.data().value) + prev)
				)
			);

		dbService
			.collection(`${userObject.email}`)
			.where("month", "==", month)
			.where("nessesary", "==", false)
			.get()
			.then((res) =>
				res.docs.map((item) =>
					setFalseValue((prev) => parseInt(item.data().value) + prev)
				)
			);
	}, [month, userObject.email]);

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
			<h1>Home</h1>
			<h2>
				{month.substring(0, 4)}년 {month.substring(5, 8)}월
			</h2>
			<div>
				이번달 지출 : <span>{trueValue + falseValue}</span>
			</div>
			<div>
				필요한 지출 : <span>{trueValue}</span>
			</div>
			<div>
				불필요한 지출 : <span>{falseValue}</span>
			</div>
			<Link to="/stat">
				<button>통계</button>
			</Link>
			<Link to="/input">
				<button>입력</button>
			</Link>
			<button onClick={onSignoutHandler}>Log Out</button>
		</div>
	);
};

export default HomeScreen;
