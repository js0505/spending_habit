import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../fbase";

const InputScreen = ({ userObject }) => {
	let today = new Date().toISOString().substring(0, 10);
	let month = new Date().toISOString().substring(0, 7);
	const [date, setDate] = useState(today);
	const [money, setMoney] = useState("");
	const [nessesary, setNessesary] = useState(Boolean);
	const [memo, setMemo] = useState("");
	const [error, setError] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();

		const dataObject = {
			value: money,
			nessesary,
			memo,
			date,
			month,
		};

		const res = await dbService
			.collection(`${userObject.email}`)
			.add(dataObject)
			.then(console.log("success"))
			.catch((e) => setError(e));
		setMoney("");
		setMemo("");
		console.log(res);
	};

	return (
		<div>
			<Link to="/">뒤로가기</Link>
			{error && error}
			<form onSubmit={onSubmit}>
				<input
					type="text"
					value={money}
					placeholder="금액을 입력하세요."
					onChange={(e) => setMoney(e.target.value)}
				/>
				<input
					type="radio"
					name="nessesaryCheck"
					id="nessesary"
					value={nessesary}
					onClick={(e) => setNessesary(true)}
				/>
				<label htmlFor="nessesary">필요한</label>
				<input
					type="radio"
					name="nessesaryCheck"
					id="unnessesary"
					value={nessesary}
					onClick={(e) => setNessesary(false)}
				/>
				<label htmlFor="unnessesary">불필요한</label>
				<input
					type="text"
					value={memo}
					placeholder="메모를 입력하세요."
					onChange={(e) => setMemo(e.target.value)}
				/>
				<input
					type="date"
					onChange={(e) => setDate(e.target.value)}
					value={today}
				/>
				<input type="submit" value="submit" />
				<Link to="/">
					<input type="button" value="cancel" />
				</Link>
			</form>
		</div>
	);
};

export default InputScreen;
