import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(false);
	const [error, setError] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			let data;
			if (newAccount) {
				//새 계정 생성
				data = await authService.createUserWithEmailAndPassword(
					email,
					password
				);
			} else {
				// 로그인
				data = await authService.signInWithEmailAndPassword(email, password);
			}
			console.log(data);
		} catch (e) {
			setError(e.message);
		}
	};

	const onSocialClick = async (e) => {
		const {
			target: { name },
		} = e;

		//공급자 설정
		let provider;
		if (name === "google") {
			provider = new firebaseInstance.auth.GoogleAuthProvider();
		} else if (name === "github") {
			provider = new firebaseInstance.auth.GithubAuthProvider();
		}
		//팝업을 이용해서 공급자 계정으로 가입.
		const data = await authService.signInWithPopup(provider);
		console.log(data);
	};

	const newAccountToggle = () => setNewAccount(!newAccount);
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={onSubmit}>
				<input
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Enter password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input type="submit" value={newAccount ? "회원가입" : "로그인"} />
			</form>
			{error && error}
			<span onClick={newAccountToggle}>
				{newAccount ? "로그인" : "회원가입"}
			</span>
			<div>
				<button onClick={onSocialClick} name="google">
					Continue With Google
				</button>
				<button onClick={onSocialClick} name="github">
					Continue With Github
				</button>
			</div>
		</div>
	);
};

export default LoginScreen;
