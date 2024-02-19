// Alert.js
import React from 'react';

const Alert = ({ message, onClose }) => (
	<div className="alert-container">
		<div className="alert-content">
			<p>{message}</p>
			<button onClick={onClose}>Cerrar</button>
		</div>
	</div>
);

export default Alert;
