import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { dbService } from "../fbase";

const UpdateScreen = ({ userObject }) => {
	const { id } = useParams();
	const history = useHistory();
	const [date, setDate] = useState("");
	const [money, setMoney] = useState(0);
	const [nessesary, setNessesary] = useState(Boolean);
	const [memo, setMemo] = useState("");
	const month = date.substring(0, 7);
	useEffect(() => {
		dbService
			.doc(`${userObject.email}/${id}`)
			.get()
			.then((res) => {
				setMoney(res.data().value);
				setNessesary(res.data().nessesary);
				setMemo(res.data().memo);
				setDate(res.data().date);
			});
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		await dbService.doc(`${userObject.email}/${id}`).update({
			value: money,
			nessesary,
			memo,
			date,
			month,
		});
		history.push("/stat");
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
					checked={nessesary ? true : false}
					onChange={(e) => setNessesary(true)}
				/>
				<label for="nessesary">필요한</label>
				<input
					type="radio"
					name="nessesaryCheck"
					id="unnessesary"
					value={nessesary}
					checked={nessesary ? false : true}
					onChange={(e) => setNessesary(false)}
				/>
				<label for="unnessesary">불필요한</label>
				<input
					type="text"
					value={memo}
					placeholder="메모를 입력하세요."
					onChange={(e) => setMemo(e.target.value)}
				/>
				<input
					type="date"
					onChange={(e) => setDate(e.target.value)}
					defaultValue={date}
				/>
				<input type="submit" value="submit" />
				<Link to="/">
					<input type="button" value="cancel" />
				</Link>
			</form>
		</div>
	);
};

export default UpdateScreen;
