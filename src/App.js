import React, { useEffect, useState } from "react";
import ScreenRouter from "./Components/ScreenRouter";
import { authService } from "./fbase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";
const App = () => {
	//like Loading...
	const [init, setInit] = useState(false);
	//로그인 시에 로그인한 유저의 정보저장.
	const [userObject, setUserObject] = useState(null);

	useEffect(() => {
		//로그인 상태의 변화를 체크하는 '이벤트리스너'
		//로그인이 실행되면 userObject에 필요한 데이터를 저장하고
		// profile에서 로그아웃이 실행되면 이벤트 리스너로 로그아웃 상태가 확인되어서
		// else 의 state 변경으로 재 랜더링 되어 처리됨.
		authService.onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
				//로그인한 유저정보 저장.
				//필요한 정보만 가져올 수 있도록 가공.
				setUserObject({
					displayName: user.displayName,
					uid: user.uid,
					email: user.email,
					//그냥 updateProfile 함수를 실행하는 용도?
					updateProfile: (args) => user.updateProfile(args),
				});
			} else {
				//userObject 상태 변경으로 다시 랜더링 실행.
				setUserObject(null);
			}
			setInit(true);
		});
	}, []);
	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col sm={12} md={3} className="text-center">
					<main>
						{init ? (
							<ScreenRouter
								isLoggedIn={Boolean(userObject)}
								userObject={userObject}
							/>
						) : (
							"Initializing.."
						)}
					</main>
				</Col>
			</Row>
		</Container>
	);
};

export default App;
