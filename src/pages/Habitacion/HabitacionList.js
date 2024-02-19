import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import * as apiHabitacion from '../../services/apiHabitacion';
import './HabitacionList.css';

const HabitacionList = () => {
	const [habitaciones, setHabitaciones] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [editMode, setEditMode] = useState(null);

	useEffect(() => {
		fetchHabitacion();
	}, []);

	const fetchHabitacion = async () => {
		try {
			const data = await apiHabitacion.fetchHabitacion();

			setHabitaciones(data);
		} catch (error) {
			console.error(`Error al obtener habitaciones: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al obtener habitaciones: ${error}`);
		}
	};

	const updateHabitacion = async (id, updatedData) => {
		try {
			const response = await apiHabitacion.updateHabitacion(id, updatedData);

			setShowAlert(true);
			setAlertMessage(`${JSON.stringify(response)}`);
			setEditMode(null);
		} catch (error) {
			console.error(`Error al actualizar habitación: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al actualizar habitación: ${error}`);
		}
		fetchHabitacion();
	};

	const deleteHabitacion = async (id) => {
		try {
			const response = await apiHabitacion.deleteHabitacion(id);

			setShowAlert(true);
			setAlertMessage(`${JSON.stringify(response)}`);
		} catch (error) {
			console.error(`Error al eliminar habitación: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al eliminar habitación: ${error}`);
		}
		fetchHabitacion();
	};

	return (
		<div className="container">
			<h1>Lista de Habitaciones</h1>
			{showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
			<ul>
				{habitaciones.map((habitacion) => (
					<li key={habitacion.id}>
						<span>ID: {habitacion.id}</span>
						{editMode === habitacion.id ? (
							<>
								<label>
									<span>Piso de la Habitación:</span>
									<input
										type="number"
										value={habitacion.habitacionpiso}
										onChange={(e) =>
											setHabitaciones(
												habitaciones.map((h) => (h.id === habitacion.id ? { ...h, habitacionpiso: e.target.value } : h))
											)
										}
									/>
								</label>
								<label>
									<span>Número de la Habitación:</span>
									<input
										type="number"
										value={habitacion.habitacionnro}
										onChange={(e) =>
											setHabitaciones(
												habitaciones.map((h) => (h.id === habitacion.id ? { ...h, habitacionnro: e.target.value } : h))
											)
										}
									/>
								</label>
								<label>
									<span>Cantidad de Camas:</span>
									<input
										type="number"
										value={habitacion.cantcamas}
										onChange={(e) =>
											setHabitaciones(
												habitaciones.map((h) => (h.id === habitacion.id ? { ...h, cantcamas: e.target.value } : h))
											)
										}
									/>
								</label>
								<label>
									<span>Cuenta con televisión:</span>
									<select
										value={habitacion.tienetelevision ? 'Si' : 'No'}
										onChange={(e) =>
											setHabitaciones(
												habitaciones.map((h) =>
													h.id === habitacion.id ? { ...h, tienetelevision: e.target.value === 'Si' } : h
												)
											)
										}
									>
										<option value="Si">Si</option>
										<option value="No">No</option>
									</select>
								</label>

								<label>
									<span>Cuenta con frigobar:</span>
									<select
										value={habitacion.tienefrigobar ? 'Si' : 'No'}
										onChange={(e) =>
											setHabitaciones(
												habitaciones.map((h) =>
													h.id === habitacion.id ? { ...h, tienefrigobar: e.target.value === 'Si' } : h
												)
											)
										}
									>
										<option value="Si">Si</option>
										<option value="No">No</option>
									</select>
								</label>

								<div className="edit-buttons">
									<button
										style={{ backgroundColor: '#2ecc71' }}
										onClick={() => updateHabitacion(habitacion.id, habitacion)}
									>
										Actualizar
									</button>
								</div>
							</>
						) : (
							<>
								<span>Piso de la Habitación: {habitacion.habitacionpiso}</span>
								<span>Número de la Habitación: {habitacion.habitacionnro}</span>
								<span>Cantidad de Camas: {habitacion.cantcamas}</span>
								<span>Cuenta con televisor: {habitacion.tienetelevision ? 'Sí' : 'No'}</span>
								<span>Cuenta con frigobar: {habitacion.tienefrigobar ? 'Sí' : 'No'}</span>

								<div>
									<button onClick={() => deleteHabitacion(habitacion.id)}>Eliminar</button>
									<button style={{ backgroundColor: '#2ecc71' }} onClick={() => setEditMode(habitacion.id)}>
										Editar
									</button>
								</div>
							</>
						)}
					</li>
				))}
			</ul>
			<Link to="/Habitacion/agregar" className="link">
				Ir a Agregar de Habitaciones
			</Link>
			<br />
			<Link to="/" className="link">
				Inicio
			</Link>
		</div>
	);
};

export default HabitacionList;
