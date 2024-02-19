import React, { useState, useEffect } from 'react';
import Alert from '../../components/Alert';
import { formatoFecha } from '../../utils/formatoFecha';
import { Link } from 'react-router-dom';
import * as apiHabitacion from '../../services/apiHabitacion';
import * as apiReserva from '../../services/apiReserva';
import * as apiPersona from '../../services/apiPersona';
import './ReservaForm.css';

const ReservaForm = () => {
	const [fechareserva, setFechaReserva] = useState(formatoFecha());
	const [fechaentrada, setFechaEntrada] = useState(formatoFecha());
	const [fechasalida, setFechaSalida] = useState(formatoFecha());
	const [habitacionid, setHabitacionId] = useState('');
	const [personaid, setPersonaId] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [personas, setPersonas] = useState([]);
	const [filtroPersona, setFiltroPersona] = useState('');
	const [habitaciones, setHabitaciones] = useState([]);
	const [filtroHabitacion, setFiltroHabitacion] = useState('');
	const [cantidaddias, setCantidadDias] = useState(1);

	useEffect(() => {
		// Obtener la lista de personas y habitaciones al cargar el componente
		fetchPersona();
		fetchHabitacionDisponible(fechaentrada, fechasalida);
	}, [fechaentrada, fechasalida]);

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

	const handlePersonaChange = (e) => {
		// Actualizar el ID de la persona cuando cambie la selección
		setPersonaId(e.target.value);
	};

	const personasFiltradas = personas.filter((persona) => {
		const nombre = persona.nombrecompleto ? persona.nombrecompleto.toLowerCase() : '';

		return nombre.includes(filtroPersona.toLowerCase());
	});

	const fetchHabitacionDisponible = async (fechaentrada, fechasalida) => {
		try {
			const data = await apiHabitacion.fetchHabitacionDisponible({
				fechaentrada,
				fechasalida,
			});

			setHabitaciones(data);
			console.log(data);
		} catch (error) {
			console.error(`Error al obtener habitaciones: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al obtener habitaciones: ${error}`);
		}
	};

	const handleHabitacionChange = (e) => {
		// Actualizar el ID de la habitación cuando cambie la selección
		setHabitacionId(e.target.value);
	};

	const habitacionesFiltradas = habitaciones.filter((habitacion) => {
		const identificacionHabitacion = `${habitacion.id}-${habitacion.habitacionpiso}-${habitacion.habitacionnro}`;

		return identificacionHabitacion.includes(filtroHabitacion.toLowerCase());
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await apiReserva.addReserva({
				fechareserva,
				fechaentrada,
				fechasalida,
				habitacionid,
				personaid,
				cantidaddias,
			});
			setShowAlert(true);
			setAlertMessage(`${response}`);

			setFechaReserva(formatoFecha());
			setFechaEntrada(formatoFecha());
			setFechaSalida(formatoFecha());
			setHabitacionId('');
			setPersonaId('');
			setCantidadDias(1);
		} catch (error) {
			console.error(`Error al agregar reserva: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al agregar reserva: ${error}`);
		}
	};

	return (
		<div className="form-container">
			<h2>Agregar Reserva</h2>
			<form onSubmit={handleSubmit} className="form">
				<label>
					Fecha de Reserva:
					<input type="date" value={fechareserva} onChange={(e) => setFechaReserva(e.target.value)} readOnly required />
				</label>
				<br />
				<label>
					Fecha de Entrada:
					<input type="date" value={fechaentrada} onChange={(e) => setFechaEntrada(e.target.value)} required />
				</label>
				<br />
				<label>
					Fecha de Salida:
					<input type="date" value={fechasalida} onChange={(e) => setFechaSalida(e.target.value)} required />
				</label>
				<br />
				<label>
					Persona:
					<select value={personaid} onChange={handlePersonaChange} required>
						<option value="">Seleccionar Persona</option>
						{/* Mapear las personas filtradas para mostrar en el desplegable */}
						{personasFiltradas.map((persona) => (
							<option key={persona.id} value={persona.id}>
								{persona.nombrecompleto}
							</option>
						))}
					</select>
				</label>
				<br />
				<label>
					Habitación:
					<select value={habitacionid} onChange={handleHabitacionChange} required>
						<option value="">Seleccionar Habitación</option>
						{/* Mapear las habitaciones filtradas para mostrar en el desplegable */}
						{habitacionesFiltradas.map((habitacion) => (
							<option key={habitacion.id} value={habitacion.id}>
								{`${habitacion.id}- Piso ${habitacion.habitacionpiso} - Nro ${habitacion.habitacionnro}`}
							</option>
						))}
					</select>
				</label>
				<br />
				<label>
					Cantidad de Días:
					<input type="number" value={cantidaddias} onChange={(e) => setCantidadDias(e.target.value)} required />
				</label>
				<br />
				<button type="submit" className="submit-button">
					Agregar Reserva
				</button>
				<br />
			</form>
			<Link to="/Reserva" className="link">
				Ir a Lista de Reservas
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

export default ReservaForm;
