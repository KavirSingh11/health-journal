import React from "react";
import { connect } from "react-redux";

import { register } from "../../actions/authActions";
import { isEqualWith } from "lodash";
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
		console.log(this.state);
	}

	renderSignUp() {
		return (
			<div>
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
				<button onClick={() => this.handleSignUp()}>Submit</button>
			</div>
		);
	}

	render() {
		return (
			<div className="login-page-container">
				<div className="logo"></div>
				<div className="login-options">
					<div className="email-login">
						Sign In With Email
						<div>
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
							<button onClick={(e) => this.handleLocalLogin(e)}>Submit</button>
						</div>
					</div>
					<div className="google-login">
						<button>Login with Google</button>
					</div>
					<div className="fb-login">
						<button>Login with Facebook</button>
					</div>
				</div>
				<div className="signup">
					<button onClick={() => this.setState({ showSignUp: true })}>
						Sign Up
					</button>
				</div>
				{this.state.showSignUp ? this.renderSignUp() : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuthenticated,
		error: state.error,
	};
};

export default connect(mapStateToProps, {
	register,
})(Login);
