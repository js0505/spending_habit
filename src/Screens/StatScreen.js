import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { Link } from "react-router-dom";

const StatScreen = ({ userObject }) => {
	const today = new Date().toISOString().substring(0, 10);
	const [date, setDate] = useState(today);
	const [list, setList] = useState([]);

	useEffect(() => {
		const getList = async () => {
			await dbService
				.collection(`${userObject.email}`)
				.where("date", "==", date)
				.get()
				.then((res) => {
					const data = res.docs.map((item) => ({
						id: item.id,
						...item.data(),
					}));
					setList(data);
				});
		};
		getList();
	}, [date, userObject.email]);
	return (
		<>
			<Link to="/">뒤로가기</Link>
			<div>
				<input
					type="date"
					onChange={(e) => setDate(e.target.value)}
					defaultValue={today}
				/>
			</div>
			<div>
				<h1>True</h1>
				{list.map((item) =>
					item.nessesary === true ? (
						<Link to={`/update/${item.id}`}>
							<div>{item.value}</div>
							<div>{item.memo}</div>
						</Link>
					) : (
						""
					)
				)}
			</div>
			<div>
				<h1>False</h1>
				{list.map((item) =>
					item.nessesary === false ? (
						<Link to={`/update/${item.id}`}>
							<div>{item.value}</div>
							<div>{item.memo}</div>
						</Link>
					) : (
						""
					)
				)}
			</div>
		</>
	);
};

export default StatScreen;
