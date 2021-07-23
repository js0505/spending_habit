import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => {
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
			<button>통계</button>
			<Link to="/input">
				<button>입력</button>
			</Link>
		</div>
	);
};

export default HomeScreen;
