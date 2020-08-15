import React from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";

import { getAllHistory } from "../actions/itemActions";
/*Info needed for chart
    X-axis is date
    Y axis is weight
        
    X and Y is obtained through api call to history
    do not display Y label since date is stored as arbitrary string
    point is already determined by the api call sort
*/
class Chart extends React.Component {
	state = {
		chartData: {
			labels: this.props.dates,
			datasets: [
				{
					label: "Weights",
					data: this.props.weights,
					backgroundColor: ["rgba(249,247,247, 1)"],
				},
			],
		},
	};
	componentDidMount() {
		console.log(this.props);
	}

	render() {
		return (
			<div className="chart">
				<Line
					data={this.state.chartData}
					options={{
						title: {
							display: true,
							text: this.props.lift,
							fontSize: 15,
							fontColor: "#f9f7f7",
						},
						legend: {
							display: false,
						},
						scales: {
							yAxes: [
								{
									ticks: {
										fontColor: "#f9f7f7",
									},
								},
							],
							xAxes: [
								{
									ticks: {
										fontColor: "#f9f7f7",
									},
								},
							],
						},
					}}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};
export default connect(mapStateToProps, {})(Chart);
