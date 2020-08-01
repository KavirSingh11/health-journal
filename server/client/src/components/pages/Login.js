import React from "react";
import { connect } from "react-redux";

import { register, signin, loadUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import "../../css/login.css";

class Login extends React.Component {
	state = {
		name: "",
		email: "",
		password: "",
		showSignUp: false,
	};

	handleSignUp() {
		const { name, email, password } = this.state;

		const newUser = {
			name,
			email,
			password,
		};
		this.props.register(newUser);
	}

	handleLocalLogin() {
		const { email, password } = this.state;
		const user = {
			email,
			password,
		};
		this.props.signin(user);
	}

	renderSignUp() {
		return (
			<div className="signup-fields">
				<input
					type="text"
					placeholder="Enter Name"
					onChange={(e) => this.setState({ name: e.target.value })}
				/>
				<input
					type="email"
					placeholder="Enter Email"
					onChange={(e) => this.setState({ email: e.target.value })}
				/>
				<input
					type="text"
					placeholder="Password"
					onChange={(e) => this.setState({ password: e.target.value })}
				/>
				<button className="button submit" onClick={() => this.handleSignUp()}>
					Submit
				</button>
			</div>
		);
	}

	render() {
		return (
			<div className="login-page-container">
				<div className="logo">
					<i className="fas fa-dumbbell"></i>
				</div>
				<div className="login-options">
					<div className="email-login">
						<div className="login-fields">
							Log In With Email
							<input
								type="email"
								placeholder="Email address"
								onChange={(e) => this.setState({ email: e.target.value })}
							/>
							<input
								type="text"
								placeholder="Password"
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
							<button
								className="button submit"
								onClick={(e) => this.handleLocalLogin(e)}
							>
								Submit
							</button>
						</div>
					</div>
					<div className="oauth">
						<button className="button google-button">Login with Google</button>
						<button className="button fb-button">Login with Facebook</button>
					</div>
				</div>
				<button
					className="button signup-button"
					onClick={() => this.setState({ showSignUp: true })}
				>
					Sign Up
				</button>
				{this.state.showSignUp ? this.renderSignUp() : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuthenticated,
		token: state.auth.token,
		error: state.error,
	};
};

export default connect(mapStateToProps, {
	register,
	clearErrors,
	signin,
	loadUser,
})(Login);
