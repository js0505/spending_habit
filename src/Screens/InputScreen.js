import React, { useState } from "react";
import { dbService } from "../fbase";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";

const InputScreen = ({ userObject }) => {
	const history = useHistory();
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

	const onCancelEvent = (e) => {
		const confirmCancel = window.confirm("Cancel?");
		if (!confirmCancel) {
			return;
		} else {
			history.push("/");
		}
	};

	return (
		<div>
			{error && error}
			<Form onSubmit={onSubmit}>
				<Form.Group className="mb-3" controlId="money">
					<Form.Control
						type="text"
						value={money}
						onChange={(e) => setMoney(e.target.value)}
						placeholder="금액을 입력하세요."
					/>
				</Form.Group>
				<div>
					<Form.Check
						type={"radio"}
						id={`nessesary`}
						name="radio"
						label={`필요한`}
						onClick={() => setNessesary(true)}
						value={nessesary}
					/>
					<Form.Check
						type={"radio"}
						id={`unnessesary`}
						name="radio"
						label={`불필요한`}
						onClick={() => setNessesary(false)}
						value={nessesary}
					/>
				</div>

				<Form.Group className="mb-3" controlId="memo">
					<Form.Control
						type="text"
						value={memo}
						placeholder="메모를 입력하세요."
						onChange={(e) => setMemo(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="date">
					<Form.Control
						type="date"
						onChange={(e) => setDate(e.target.value)}
						value={today}
					/>
				</Form.Group>
				<Row>
					<Col>
						<Button variant="outline-success" type="submit">
							Submit
						</Button>
					</Col>
					<Col>
						<Button variant="outline-success" onClick={onCancelEvent}>
							Cancel
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default InputScreen;
