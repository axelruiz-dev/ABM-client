import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import * as apiPersona from '../../services/apiPersona';
import './PersonaList.css';

const PersonaList = () => {
	const [personas, setPersonas] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [editMode, setEditMode] = useState(null);

	useEffect(() => {
		fetchPersona();
	}, []);

	const fetchPersona = async () => {
		try {
			const data = await apiPersona.fetchPersona();

			setPersonas(data);
		} catch (error) {
			console.error(`Error al obtener persona: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al obtener persona: ${error}`);
		}
	};

	const updatePersona = async (id, updatedData) => {
		try {
			const response = await apiPersona.updatePersona(id, updatedData);

			setShowAlert(true);
			setAlertMessage(`${response}`);
			setEditMode(null);
		} catch (error) {
			console.error(`Error al actualizar persona: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al actualizar persona: ${error}`);
		}
		fetchPersona();
	};

	const deletePersona = async (id) => {
		try {
			const response = await apiPersona.deletePersona(id);

			setShowAlert(true);
			setAlertMessage(`${response}`);
		} catch (error) {
			console.error(`Error al eliminar persona: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al eliminar persona: ${error}`);
		}
		fetchPersona();
	};

	return (
		<div className="container">
			<h1>Lista de Personas</h1>
			{showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
			<ul>
				{personas.map((persona) => (
					<li key={persona.id}>
						<span>ID: {persona.id}</span>
						{editMode === persona.id ? (
							<>
								<label>
									<span>Nombre Completo:</span>
									<input
										type="text"
										value={persona.nombrecompleto}
										onChange={(e) =>
											setPersonas(
												personas.map((p) => (p.id === persona.id ? { ...p, nombrecompleto: e.target.value } : p))
											)
										}
									/>
								</label>
								<label>
									<span>Nro Documento:</span>
									<input
										type="text"
										value={persona.nrodocumento}
										onChange={(e) =>
											setPersonas(
												personas.map((p) => (p.id === persona.id ? { ...p, nrodocumento: e.target.value } : p))
											)
										}
									/>
								</label>
								<label>
									<span>Correo:</span>
									<input
										type="email"
										value={persona.correo}
										onChange={(e) =>
											setPersonas(personas.map((p) => (p.id === persona.id ? { ...p, correo: e.target.value } : p)))
										}
									/>
								</label>
								<label>
									<span>Teléfono:</span>
									<input
										type="text"
										value={persona.telefono}
										onChange={(e) =>
											setPersonas(personas.map((p) => (p.id === persona.id ? { ...p, telefono: e.target.value } : p)))
										}
									/>
								</label>
								<div className="edit-buttons">
									<button style={{ backgroundColor: '#2ecc71' }} onClick={() => updatePersona(persona.id, persona)}>
										Actualizar
									</button>
								</div>
							</>
						) : (
							<>
								<span>Nombre Completo: {persona.nombrecompleto}</span>
								<span>Nro Documento: {persona.nrodocumento}</span>
								<span>Correo: {persona.correo}</span>
								<span>Teléfono: {persona.telefono}</span>
								<div>
									<button onClick={() => deletePersona(persona.id)}>Eliminar</button>
									<button style={{ backgroundColor: '#2ecc71' }} onClick={() => setEditMode(persona.id)}>
										Editar
									</button>
								</div>
							</>
						)}
					</li>
				))}
			</ul>
			<Link to="/Persona/agregar" className="link">
				Ir a Agregar de Personas
			</Link>
			<br />
			<Link to="/" className="link">
				Inicio
			</Link>
		</div>
	);
};

export default PersonaList;
