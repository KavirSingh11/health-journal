import React from "react";
import { connect } from "react-redux";

import { signout } from "../../actions/authActions";
class Dashboard extends React.Component {
	componentDidMount() {
		console.log(this.props);
	}

	handleLogout() {
		this.props.signout();
	}

	render() {
		return (
			<div>
				<div>Welcome {this.props.name}</div>
				<button onClick={() => this.handleLogout()}>Logout</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuthenticated,
		email: state.auth.user.email,
		name: state.auth.user.name,
		token: state.auth.token,
		error: state.error,
	};
};

export default connect(mapStateToProps, {
	signout,
})(Dashboard);
