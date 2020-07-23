import React from "react";
import { connect } from "react-redux";

class Login extends React.Component {
	render() {
		return (
			<div className="login-page-container">
				<div className="logo"></div>
				<div className="login-options">
					<div className="email-login"></div>
					<div className="google-login"></div>
					<div className="fb-login"></div>
				</div>
				<div className="signup"></div>
			</div>
		);
	}
}

export default connect()(Login);
