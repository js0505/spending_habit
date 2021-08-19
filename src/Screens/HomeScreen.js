import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { dbService } from "../fbase";
import { ListGroup, Row, Col } from "react-bootstrap";

const HomeScreen = ({ userObject }) => {
	const [trueValue, setTrueValue] = useState(0);
	const [falseValue, setFalseValue] = useState(0);
	// const today = new Date().toISOString().substring(0, 10);
	const month = new Date().toISOString().substring(0, 7);
	console.log(trueValue);

	useEffect(() => {
		dbService
			.collection(`${userObject.email}`)
			.where("month", "==", month)
			.where("nessesary", "==", true)
			.get()
			.then((res) =>
				res.docs.map((item) =>
					setTrueValue((prev) => parseInt(item.data().value) + prev)
				)
			);

		dbService
			.collection(`${userObject.email}`)
			.where("month", "==", month)
			.where("nessesary", "==", false)
			.get()
			.then((res) =>
				res.docs.map((item) =>
					setFalseValue((prev) => parseInt(item.data().value) + prev)
				)
			);
	}, [month, userObject.email]);

	return (
		<div>
			<h1 className="my-3">Spending habit</h1>
			<h3 className="my-3">
				{month.substring(0, 4)}년 {month.substring(5, 8)}월
			</h3>
			<ListGroup variant="flush" className="my-3">
				<ListGroup.Item>
					<Row>
						<Col>이번달 지출 : </Col>
						<Col>
							<span>{trueValue + falseValue} 원</span>
						</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item>
					<Row>
						<Col>필요한 지출 : </Col>
						<Col>
							<span>{trueValue} 원</span>
						</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item>
					<Row>
						<Col>불필요한 지출 : </Col>
						<Col>
							<span>{falseValue} 원</span>
						</Col>
					</Row>
				</ListGroup.Item>
			</ListGroup>
			<Navbar />
		</div>
	);
};

export default HomeScreen;
