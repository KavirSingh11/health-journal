import React from "react";

import "../css/modal.css";
const Modal = (props) => {
	return (
		<div className="modal">
			<div className="modal-panel">
				{props.children}
				<div className="modal-controls">
					<button className="modal-button" onClick={() => props.toggleModal()}>
						Cancel
					</button>
					<button
						className="modal-button"
						onClick={() => props.modalFunction()}
					>
						Accept
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
