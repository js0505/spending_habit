import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = ({ userObject }) => {
	// console.log(userObject);
	return (
		<div>
			<h1>Home</h1>
			<div>
				이번달 지출 : <span>000,000</span>
			</div>
			<div>
				필요한 지출 : <span>000,000</span>
			</div>
			<div>
				불필요한 지출 : <span>000,000</span>
			</div>
			<Link to="/stat">
				<button>통계</button>
			</Link>
			<Link to="/input">
				<button>입력</button>
			</Link>
		</div>
	);
};

export default HomeScreen;
