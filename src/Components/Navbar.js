import React from "react";
// import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { authService } from "../fbase";
import { Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";

const SButton = styled(Button)`
	font-size: 1.5rem;
`;

const Navbar = () => {
	const onSignoutHandler = (e) => {
		e.preventDefault();
		const logoutAlert = window.confirm("Log out?");
		if (logoutAlert) {
			authService.signOut();
			return;
		}
	};

	return (
		<Row>
			<Col>
				<SButton variant="outline-success">
					<LinkContainer to="/stat">
						<i className="far fa-chart-bar" />
					</LinkContainer>
				</SButton>
			</Col>
			<Col>
				{/* <button onClick={onSignoutHandler}>Log Out</button> */}
				<SButton variant="outline-success">
					<LinkContainer to="/input">
						<i className="far fa-plus-square" />
					</LinkContainer>
				</SButton>
			</Col>
		</Row>
	);
};

export default Navbar;
