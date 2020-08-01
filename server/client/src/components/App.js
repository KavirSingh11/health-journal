import React from "react";
import { connect } from "react-redux";

import { loadUser } from "../actions/authActions";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import "../css/app.css";

class App extends React.Component {
	state = {
		maxWidth: 700,
		setClass: "",
	};
	componentDidMount() {
		if (this.props.token) {
			this.props.loadUser(this.props.token);
		}
	}
	render() {
		return (
			<div
				className="main-display"
				style={
					this.props.isAuth ? { maxWidth: "1100px" } : { maxWidth: "800px" }
				}
			>
				{!this.props.isAuth ? <Login /> : <Dashboard />}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuthenticated,
		user: state.auth.user,
		token: state.auth.token,
		error: state.error,
	};
};

export default connect(mapStateToProps, {
	loadUser,
})(App);
