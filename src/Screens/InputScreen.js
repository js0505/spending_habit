import React, { useState } from "react";

const InputScreen = () => {
	const [money, setMoney] = useState("");
	const [nessesary, setNessesary] = useState(Boolean);
	const [memo, setMemo] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div>
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
