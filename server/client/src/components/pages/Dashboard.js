import React from "react";
import { connect } from "react-redux";

import Modal from "../Modal";
import { signout } from "../../actions/authActions";
import {
	getLifts,
	addLift,
	editLift,
	deleteLift,
	getLiftHistory,
} from "../../actions/itemActions";
import "../../css/dashboard.css";
class Dashboard extends React.Component {
	state = {
		detailLift: null,
		showModal: false,
		modalType: null,
		modalFunction: null,
		modalItem: null,
		editItemName: null,
		newLift: {
			email: this.props.email,
			name: null,
			sets: null,
			reps: null,
			weight: null,
		},
	};
	async componentDidMount() {
		await this.props.getLifts(this.props.email);
		await this.setState({ detailLift: this.props.lifts[0] });
	}
	/*-----------------------------------------------------------------------------------------------------------
	Helper Functions
------------------------------------------------------------------------------------------------------------*/
	handleLogout() {
		this.props.signout();
	}
	showModal() {
		this.setState({ showModal: true });
	}
	hideModal() {
		this.setState({ showModal: false });
	}
	resetNewLift() {
		this.setState({
			...this.state.newLift,
			email: this.props.email,
			name: null,
			sets: null,
			reps: null,
			weight: null,
		});
	}
	getModalFunction() {
		const modalType = this.state.modalType;
		if (modalType === "createLift") {
			return this.addLift();
		}
		if (modalType === "editLift") {
			return this.editLift();
		}
		if (modalType === "addHistory") {
		}
		if (modalType === "editHistory") {
		}
	}
	getModalType() {
		const modalType = this.state.modalType;
		if (modalType === "createLift") {
			return this.renderCreateLiftModal();
		}
		if (modalType === "editLift") {
			return this.renderEditLiftModal();
		}
		if (modalType === "addHistory") {
		}
		if (modalType === "editHistory") {
		}
	}
	/*-----------------------------------------------------------------------------------------------------------
	CRUD functions
------------------------------------------------------------------------------------------------------------*/
	addLift() {
		const lift = this.state.newLift;
		this.props.addLift(
			lift.email,
			lift.name,
			lift.sets,
			lift.reps,
			lift.weight
		);
		this.resetNewLift();
		this.hideModal();
	}

	editLift() {
		const email = this.props.email;
		const name = this.state.detailLift.name;
		const newInfo = this.state.newLift;
		this.props.editLift(email, name, newInfo);
		this.resetNewLift();
		this.hideModal();
		this.forceUpdate();
	}

	async deleteLift() {
		await this.props.deleteLift(this.props.email, this.state.detailLift.name);
		await this.setState({ detailLift: this.props.lifts[0] });
		this.hideModal();
	}
	/*-----------------------------------------------------------------------------------------------------------
	Modal Render Functions
------------------------------------------------------------------------------------------------------------*/
	renderCreateLiftModal() {
		return (
			<div className="modal-content">
				<h1 className="modal-header">Create New Lift</h1>
				<div className="modal-form">
					<input
						className="modal-input"
						placeholder="Enter Lift Name"
						type="text"
						onChange={(e) =>
							this.setState({
								newLift: { ...this.state.newLift, name: e.target.value },
							})
						}
					/>
					<input
						className="modal-input"
						placeholder="How many sets?"
						type="number"
						onChange={(e) =>
							this.setState({
								newLift: { ...this.state.newLift, sets: e.target.value },
							})
						}
					/>
					<input
						className="modal-input"
						placeholder="How many reps?"
						type="number"
						onChange={(e) =>
							this.setState({
								newLift: { ...this.state.newLift, reps: e.target.value },
							})
						}
					/>
					<input
						className="modal-input"
						placeholder="Starting weight"
						type="number"
						onChange={(e) =>
							this.setState({
								newLift: { ...this.state.newLift, weight: e.target.value },
							})
						}
					/>
				</div>
			</div>
		);
	}
	renderEditLiftModal() {
		return (
			<div>
				<h1>Edit {this.state.detailLift.name}</h1>
				<div className="modal-form">
					<div className="edit-field">
						<div className="edit-field-title">Name</div>
						<input
							className="modal-input"
							defaultValue={this.state.newLift.name}
							type="text"
							onChange={(e) =>
								this.setState({
									newLift: { ...this.state.newLift, name: e.target.value },
								})
							}
						/>
					</div>

					<div className="edit-field">
						<div className="edit-field-title">Sets</div>
						<input
							className="modal-input"
							defaultValue={this.state.newLift.sets}
							type="number"
							onChange={(e) =>
								this.setState({
									newLift: { ...this.state.newLift, sets: e.target.value },
								})
							}
						/>
					</div>

					<div className="edit-field">
						<div className="edit-field-title">Reps</div>
						<input
							className="modal-input"
							defaultValue={this.state.newLift.reps}
							type="number"
							onChange={(e) =>
								this.setState({
									newLift: { ...this.state.newLift, reps: e.target.value },
								})
							}
						/>
					</div>

					<div className="edit-field">
						<div className="edit-field-title">Weight</div>
						<input
							className="modal-input"
							defaultValue={this.state.newLift.weight}
							type="number"
							onChange={(e) =>
								this.setState({
									newLift: { ...this.state.newLift, weight: e.target.value },
								})
							}
						/>
					</div>
				</div>
				<button
					className="modal-button delete"
					onClick={() => this.deleteLift()}
				>
					Delete Lift
				</button>
			</div>
		);
	}

	renderAddHistoryModal() {
		return (
			<div>
				<h1>Add Lift</h1>
				<div></div>
			</div>
		);
	}
	renderEditHistoryModal() {
		return (
			<div>
				<h1>Edit Lift</h1>
				<div></div>
			</div>
		);
	}

	/*-----------------------------------------------------------------------------------------------------------
	Render Functions
------------------------------------------------------------------------------------------------------------*/

	renderLifts() {
		return this.props.lifts.map((lift) => {
			return (
				<div key={lift.name}>
					<button
						className="lift-item"
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
			<div className="lift-info">
				{this.state.detailLift.name}:{this.state.detailLift.weight}
				{console.log(this.props.history)}
				<button
					className="edit-lift"
					onClick={() => {
						this.setState({ newLift: this.state.detailLift });
						this.setState({ modalType: "editLift" });
						this.showModal();
					}}
				>
					Edit
				</button>
			</div>
		);
		//display graph of growth in weight
		//show other growth stats like flat increase and percentage increase
		//^ based on curr weight and weight in first entry (api call needs to be sorted by date entered)
	}

	render() {
		return (
			<div className="dashboard">
				{this.state.showModal ? (
					<Modal
						toggleModal={() => this.hideModal()}
						modalFunction={() => this.getModalFunction()}
					>
						{this.getModalType()}
					</Modal>
				) : null}
				<div className="heading">
					<div className="greeting">Welcome {this.props.name}</div>
					<button
						className="add-lift"
						onClick={() => {
							this.setState({ modalType: "createLift" });
							this.showModal();
						}}
					>
						+
					</button>
					<button onClick={() => this.handleLogout()}>Logout</button>
				</div>
				{this.state.detailLift ? this.renderInfo() : null}

				<div className="lifts-list">{this.renderLifts()}</div>
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
	addLift,
	editLift,
	deleteLift,
	getLiftHistory,
})(Dashboard);
