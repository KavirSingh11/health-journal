import React from "react";
import { connect } from "react-redux";

import Modal from "../Modal";
import Chart from "../Chart";
import { signout } from "../../actions/authActions";
import {
	getLifts,
	addLift,
	editLift,
	deleteLift,
	getAllHistory,
	getDateHistory,
	addToHistory,
	editHistory,
	deleteHistory,
} from "../../actions/itemActions";
import "../../css/dashboard.css";
class Dashboard extends React.Component {
	state = {
		showModal: false,
		modalType: null,
		modalFunction: null,
		modalItem: null,

		detailLift: null,
		editItemName: null,

		newLift: {
			email: this.props.email,
			name: null,
			sets: null,
			reps: null,
			weight: null,
		},

		newWeight: null,
		newDate: null,
	};

	componentDidMount() {
		this.loadData();
		this.setDate();
	}
	async loadData() {
		await this.props.getLifts(this.props.email);
		await this.props.getAllHistory(this.props.email, this.props.lifts[0].name);
		this.setState({ detailLift: this.props.lifts[0] });
	}
	setDate() {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, "0");
		var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + "-" + dd + "-" + yyyy;

		this.setState({ newDate: today });
	}
	/*-----------------------------------------------------------------------------------------------------------
	Helper Functions
------------------------------------------------------------------------------------------------------------*/
	handleLogout() {
		this.props.signout();
	}

	getLiftsOnDate() {
		return;
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

	showModal() {
		this.setState({ showModal: true });
	}
	hideModal() {
		this.setState({ showModal: false });
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
			return this.addHistory();
		}
		if (modalType === "editHistory") {
			return this.editHistory();
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
			return this.renderAddHistoryModal();
		}
		if (modalType === "editHistory") {
			return this.renderEditHistoryModal();
		}
	}
	/*-----------------------------------------------------------------------------------------------------------
	CRUD functions
------------------------------------------------------------------------------------------------------------*/
	addLift() {
		const lift = this.state.newLift;
		console.log(lift);
		this.props.addLift(
			lift.email,
			lift.name,
			lift.sets,
			lift.reps,
			lift.weight
		);
		this.props.addToHistory(
			lift.email,
			lift.name,
			this.state.newDate,
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

	addHistory() {
		this.props.addToHistory(
			this.props.email,
			this.state.detailLift.name,
			this.state.newDate,
			this.state.newWeight
		);
		this.setDate();
		this.setState({ newWeight: null });
		this.hideModal();
	}
	editHistory() {}
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
				<h1 style={{ paddingLeft: "15px" }}>
					Add {this.state.detailLift.name}
				</h1>
				<div className="modal-form">
					<input
						placeholder="How much weight?"
						type="number"
						onChange={(e) =>
							this.setState({
								newWeight: e.target.value,
							})
						}
					/>
					<input
						defaultValue={this.state.newDate}
						type="text"
						onChange={(e) => this.setState({ newDate: e.target.value })}
					/>
				</div>
			</div>
		);
	}
	renderEditHistoryModal() {
		return (
			<div>
				<h1>Edit {this.state.detailLift.name} lifts</h1>
				<div className="history-list">
					{this.props.history.map((item) => {
						return (
							<div>
								<input defaultValue={item.date.slice(0, 10)} type="text" />
								<input defaultValue={item.weight} type="number" />
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	/*-----------------------------------------------------------------------------------------------------------
	Render Functions

	NOTES: 
		- fix header and add a footer

------------------------------------------------------------------------------------------------------------*/

	renderLifts() {
		return this.props.lifts.map((lift) => {
			return (
				<div key={lift.name}>
					<button
						className="lift-item"
						onClick={() => {
							this.setState({ detailLift: lift });
							this.props.getAllHistory(this.props.email, lift.name);
						}}
					>
						<h1 className="lift-name">{lift.name}</h1>
						<button
							className="enter-history"
							onClick={() => {
								this.setState({ modalType: "addHistory" });
								this.showModal();
							}}
						>
							+
						</button>
					</button>
				</div>
			);
		});
	}

	renderInfo() {
		//get history of the lift

		return (
			<div className="lift-info">
				<Chart
					lift={this.state.detailLift.name}
					weights={this.props.history.map((item) => item.weight)}
					dates={this.props.history.map((item) =>
						this.props.history.length > 5
							? item.date.slice(5, 10)
							: item.date.slice(0, 10)
					)}
					startWeight={this.state.detailLift.weight}
				/>
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
				{/* <button
					className="edit-history"
					onClick={() => {
						this.setState({ modalType: "editHistory" });
						this.showModal();
					}}
				>
					Edit History
				</button> */}
			</div>
		);
	}

	render() {
		if (this.props.isLoading) {
			return <div>Loading</div>;
		}
		return (
			<div className="user-screen">
				{this.state.showModal ? (
					<Modal
						toggleModal={() => this.hideModal()}
						modalFunction={() => this.getModalFunction()}
					>
						{this.getModalType()}
					</Modal>
				) : null}
				<div className="dashboard">
					<div className="heading">
						<div className="greeting">Welcome {this.props.name}</div>
						<div className="title-card">LifTrack</div>
					</div>
					{this.state.detailLift ? this.renderInfo() : null}

					<div className="lifts-list">{this.renderLifts()}</div>

					<div className="footer">
						<button className="logout" onClick={() => this.handleLogout()}>
							Logout
						</button>

						<button
							className="add-lift"
							onClick={() => {
								this.setState({ modalType: "createLift" });
								this.showModal();
							}}
						>
							+
						</button>
					</div>
				</div>
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
	getAllHistory,
	getDateHistory,
	addToHistory,
	editHistory,
	deleteHistory,
})(Dashboard);
