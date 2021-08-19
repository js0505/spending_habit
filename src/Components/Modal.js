import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
	box-sizing: border-box;
	display: ${(props) => (props.open ? "block" : "none")};
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 99;
	background-color: rgb(0, 0, 0, 0.4);
`;

const Contents = styled.div`
	box-sizing: border-box;
	margin: 10% auto;
	width: 30%;
	height: 60%;
	background-color: white;
	padding: 30px;
`;

const Modal = ({ open, close }) => {
	return (
		<ModalContainer open={open}>
			<Contents>
				<button onClick={close}>Close</button>
				<h1>Modal</h1>
			</Contents>
		</ModalContainer>
	);
};

Modal.defaultProps = {
	open: false,
	close: false,
};

export default Modal;
