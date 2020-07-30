import React from "react";
import { connect } from "react-redux";

import { loadUser } from "../actions/authActions";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

class App extends React.Component {
	componentDidMount() {
		if (this.props.token) {
			this.props.loadUser(this.props.token);
		}
	}
	render() {
		return (
			<div>
				<div>App</div>
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
