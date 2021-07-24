import React, { useState } from "react";

const StatScreen = () => {
	const today = new Date().toISOString().substring(0, 10);

	return (
		<div>
			<input type="date" value={today}></input>
		</div>
	);
};

export default StatScreen;
