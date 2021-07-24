import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

const StatScreen = ({ userObject }) => {
	const today = new Date().toISOString().substring(0, 10);
	const [date, setDate] = useState(today);
	const [list, setList] = useState([]);

	useEffect(() => {
		dbService
			.collection(`${userObject.email}`)
			.where("date", "==", date)
			.where("nessesary", "==", true)
			.get()
			.then((res) => {
				const data = res.docs.map((item) => ({
					id: item.id,
					...item.data(),
				}));
				setList(data);
			});
	}, [date]);
	const onButtonClick = async (e) => {
		const nessesary = e.target.id === "true" ? true : false;

		await dbService
			.collection(`${userObject.email}`)
			.where("date", "==", date)
			.where("nessesary", "==", nessesary)
			.get()
			.then((res) => {
				const data = res.docs.map((item) => ({
					id: item.id,
					...item.data(),
				}));
				setList(data);
			});
	};

	return (
		<>
			<div>
				<input
					type="date"
					onChange={(e) => setDate(e.target.value)}
					defaultValue={today}
				/>
			</div>
			<button onClick={onButtonClick} id="true">
				필요한 소비 내역
			</button>
			<button onClick={onButtonClick} id="false">
				불필요한 소비 내역
			</button>
			{list &&
				list.map((item) => (
					<div>
						<span>{item.value}</span>
						<span>{item.memo}</span>
					</div>
				))}
		</>
	);
};

export default StatScreen;
