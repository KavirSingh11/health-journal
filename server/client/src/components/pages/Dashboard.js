import React from "react";
import { connect } from "react-redux";

import { signout } from "../../actions/authActions";
import { getLifts, getLiftHistory } from "../../actions/itemActions";
class Dashboard extends React.Component {
	state = {
		detailLift: null,
	};
	componentDidMount() {
		this.props.getLifts(this.props.email);
	}

	handleLogout() {
		this.props.signout();
	}

	renderLifts() {
		return this.props.lifts.map((lift) => {
			return (
				<div key={lift.name}>
					<button
						onClick={() => {
							this.setState({ detailLift: lift });
							this.props.getLiftHistory(this.props.email, lift.name);
						}}
					>
						<h1>{lift.name}</h1>
					</button>
				</div>
			);
		});
	}

	renderInfo() {
		//get history of the lift

		return (
			<div>
				{this.state.detailLift.name}:{this.state.detailLift.weight}
				{console.log(this.props.history)}
			</div>
		);
		//display graph of growth in weight
		//show other growth stats like flat increase and percentage increase
		//^ based on curr weight and weight in first entry (api call needs to be sorted by date entered)
	}

	render() {
		return (
			<div>
				<div>Welcome {this.props.name}</div>
				<button onClick={() => this.handleLogout()}>Logout</button>

				<div>{this.renderLifts()}</div>
				{this.state.detailLift ? this.renderInfo() : null}
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
		lifts: state.items.lifts,
		history: state.items.history,
		isLoading: state.items.loading,
	};
};

export default connect(mapStateToProps, {
	signout,
	getLifts,
	getLiftHistory,
})(Dashboard);
