import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import * as apiHabitacion from '../../services/apiHabitacion';
import * as apiReserva from '../../services/apiReserva';
import * as apiPersona from '../../services/apiPersona';
import './ReservaList.css';

const ReservaList = () => {
	const [reservas, setReservas] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [editMode, setEditMode] = useState(null);
	const [personas, setPersonas] = useState([]);
	const [habitaciones, setHabitaciones] = useState([]);

	useEffect(() => {
		fetchReserva();
	}, []);

	const fetchReserva = async () => {
		try {
			const data = await apiReserva.fetchReserva();

			setReservas(data);
		} catch (error) {
			console.error(`Error al obtener reservas: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al obtener reservas: ${error}`);
		}

		try {
			const data = await apiPersona.fetchPersona();

			setPersonas(data);
		} catch (error) {
			console.error(`Error al obtener persona: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al obtener persona: ${error}`);
		}

		try {
			const data = await apiHabitacion.fetchHabitacion();

			setHabitaciones(data);
		} catch (error) {
			console.error(`Error al obtener habitaciones: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al obtener habitaciones: ${error}`);
		}
	};

	const updateReserva = async (id, data) => {
		try {
			const response = await apiReserva.updateReserva(id, data);

			setShowAlert(true);
			setAlertMessage(`${response}`);
			setEditMode(null);
		} catch (error) {
			console.error(`Error al actualizar reserva: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al actualizar reserva: ${error}`);
		}
		fetchReserva();
	};

	const deleteReserva = async (id) => {
		try {
			const response = await apiReserva.deleteReserva(id);

			setShowAlert(true);
			setAlertMessage(`${response}`);
		} catch (error) {
			console.error(`Error al eliminar reserva: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al eliminar reserva: ${error}`);
		}
		fetchReserva();
	};

	return (
		<div className="container">
			<h1>Lista de Reservas</h1>
			{showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
			<ul>
				{reservas.map((reserva) => (
					<li key={reserva.id}>
						<span>ID:{reserva.id} </span>

						{editMode === reserva.id ? (
							<>
								<label>
									<span>Fecha de reserva:</span>
									<input
										type="date"
										value={reserva.fechareserva}
										onChange={(e) =>
											setReservas(
												reservas.map((p) => (p.id === reserva.id ? { ...p, fechareserva: e.target.value } : p))
											)
										}
									/>
								</label>
								<label>
									<span>Fecha de entrada:</span>
									<input
										type="date"
										value={reserva.fechaentrada}
										onChange={(e) =>
											setReservas(
												reservas.map((p) => (p.id === reserva.id ? { ...p, fechaentrada: e.target.value } : p))
											)
										}
									/>
								</label>
								<label>
									<span>Fecha de salida:</span>
									<input
										type="date"
										value={reserva.fechasalida}
										onChange={(e) =>
											setReservas(
												reservas.map((p) => (p.id === reserva.id ? { ...p, fechasalida: e.target.value } : p))
											)
										}
									/>
								</label>
								<label>
									<span>Persona:</span>
									<select
										value={reserva.personaid}
										onChange={(e) =>
											setReservas(reservas.map((p) => (p.id === reserva.id ? { ...p, personaid: e.target.value } : p)))
										}
										required
									>
										<option value="">Seleccionar Persona</option>
										{personas.map((persona) => (
											<option key={persona.id} value={persona.id}>
												{persona.nombrecompleto}
											</option>
										))}
									</select>
								</label>
								<label>
									<span>Habitación:</span>
									<select
										value={reserva.habitacionid}
										onChange={(e) =>
											setReservas(
												reservas.map((p) => (p.id === reserva.id ? { ...p, habitacionid: e.target.value } : p))
											)
										}
										required
									>
										<option value="">Seleccionar Habitación</option>
										{habitaciones.map((habitacion) => (
											<option key={habitacion.id} value={habitacion.id}>
												{`Piso ${habitacion.habitacionpiso} - Nro ${habitacion.habitacionnro}`}
											</option>
										))}
									</select>
								</label>
								<label>
									<span>Dias de reserva:</span>
									<input
										type="number"
										value={reserva.cantidaddias}
										onChange={(e) =>
											setReservas(
												reservas.map((p) => (p.id === reserva.id ? { ...p, cantidaddias: e.target.value } : p))
											)
										}
									/>
								</label>
								<div className="edit-buttons">
									<button style={{ backgroundColor: '#2ecc71' }} onClick={() => updateReserva(reserva.id, reserva)}>
										Actualizar
									</button>
								</div>
							</>
						) : (
							<>
								<span>Fecha de Reserva: {reserva.fechareserva}</span>
								<span>Fecha de Entrada: {reserva.fechaentrada}</span>
								<span>Fecha de Salida: {reserva.fechasalida}</span>
								<span>Persona: {reserva.persona}</span>
								<span>Habitación: {reserva.habitacion}</span>
								<span>Monto de Reserva: {reserva.montoreserva}</span>
								<div>
									<button onClick={() => deleteReserva(reserva.id)}>Eliminar</button>
									<button style={{ backgroundColor: '#2ecc71' }} onClick={() => setEditMode(reserva.id)}>
										Editar
									</button>
								</div>
							</>
						)}
					</li>
				))}
			</ul>
			<Link to="/Reserva/agregar" className="link">
				Ir a Agregar de Reservas
			</Link>
			<br />
			<Link to="/" className="link">
				Inicio
			</Link>
		</div>
	);
};

export default ReservaList;
