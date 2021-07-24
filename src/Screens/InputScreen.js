import React, { useState } from "react";
import { dbService } from "../fbase";

const InputScreen = ({ userObject }) => {
	const [money, setMoney] = useState("");
	const [nessesary, setNessesary] = useState(Boolean);
	const [memo, setMemo] = useState("");
	const [error, setError] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();

		const today = new Date().toISOString().substring(0, 10);
		const dataObject = {
			value: money,
			nessesary,
			memo,
			date: today,
		};

		const res = await dbService
			.collection(`${userObject.email}`)
			.add(dataObject);
		setMoney("");
		setMemo("");
		console.log(res);
	};
	return (
		<div>
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
				<label for="nessesary">필요한</label>
				<input
					type="radio"
					name="nessesaryCheck"
					id="unnessesary"
					value={nessesary}
					onClick={(e) => setNessesary(false)}
				/>
				<label for="unnessesary">불필요한</label>
				<input
					type="text"
					value={memo}
					placeholder="메모를 입력하세요."
					onChange={(e) => setMemo(e.target.value)}
				/>
				<input type="submit" value="submit" />
				<input type="button" value="cancel" />
			</form>
		</div>
	);
};

export default InputScreen;
