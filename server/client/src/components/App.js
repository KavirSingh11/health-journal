import React from "react";
import { connect } from "react-redux";

import Login from "./pages/Login";

class App extends React.Component {
	render() {
		return (
			<div>
				<div>App</div>
				<Login />
			</div>
		);
	}
}

export default App;
