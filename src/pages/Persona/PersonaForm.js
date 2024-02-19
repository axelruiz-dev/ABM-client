import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import * as apiPersona from '../../services/apiPersona';
import './PersonaForm.css';

const PersonaForm = () => {
	const [nombreCompleto, setNombreCompleto] = useState('');
	const [nroDocumento, setNroDocumento] = useState('');
	const [correo, setCorreo] = useState('');
	const [telefono, setTelefono] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await apiPersona.addPersona({
				nombrecompleto: nombreCompleto,
				nrodocumento: nroDocumento,
				correo: correo,
				telefono: telefono,
			});

			setShowAlert(true);
			setAlertMessage(`${response}`);

			setNombreCompleto('');
			setNroDocumento('');
			setCorreo('');
			setTelefono('');
		} catch (error) {
			console.error(`Error al agregar persona: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al agregar persona: ${error}`);
		}
	};
	return (
		<div className="form-container">
			<h2>Agregar Persona</h2>
			<form onSubmit={handleSubmit} className="form">
				<label>
					Nombre Completo:
					<input type="text" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} required />
				</label>
				<br />
				<label>
					Nro Documento:
					<input type="text" value={nroDocumento} onChange={(e) => setNroDocumento(e.target.value)} required />
				</label>
				<br />
				<label>
					Correo:
					<input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
				</label>
				<br />
				<label>
					Teléfono:
					<input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
				</label>
				<br />
				<button type="submit" className="submit-button">
					Agregar Persona
				</button>
				<br />
			</form>
			<Link to="/Persona" className="link">
				Ir a Lista de Personas
			</Link>
			<br />
			<br />
			<Link to="/" className="link">
				Inicio
			</Link>
			{showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
		</div>
	);
};

export default PersonaForm;
