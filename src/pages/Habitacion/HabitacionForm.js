import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import * as apiHabitacion from '../../services/apiHabitacion';
import './HabitacionForm.css';

const HabitacionForm = () => {
	const [habitacionPiso, setHabitacionPiso] = useState('');
	const [habitacionNro, setHabitacionNro] = useState('');
	const [cantCamas, setCantCamas] = useState('');
	const [tieneTelevision, setTieneTelevision] = useState(true);
	const [tieneFrigobar, setTieneFrigobar] = useState(true);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await apiHabitacion.addHabitacion({
				habitacionpiso: habitacionPiso,
				habitacionnro: habitacionNro,
				cantcamas: cantCamas,
				tienetelevision: tieneTelevision,
				tienefrigobar: tieneFrigobar,
			});
			setShowAlert(true);
			setAlertMessage(`${response}`);

			setHabitacionPiso('');
			setHabitacionNro('');
			setCantCamas('');
			setTieneTelevision(true);
			setTieneFrigobar(true);
		} catch (error) {
			console.error(`Error al agregar habitación: ${error}`);
			setShowAlert(true);
			setAlertMessage(`Error al agregar habitación: ${error}`);
		}
	};

	return (
		<div className="form-container">
			<h2>Agregar Habitación</h2>
			<form onSubmit={handleSubmit} className="form">
				<label>
					Piso:
					<input type="number" value={habitacionPiso} onChange={(e) => setHabitacionPiso(e.target.value)} required />
				</label>
				<br />
				<label>
					Número de Habitación:
					<input type="number" value={habitacionNro} onChange={(e) => setHabitacionNro(e.target.value)} required />
				</label>
				<br />
				<label>
					Cantidad de Camas:
					<input type="number" value={cantCamas} onChange={(e) => setCantCamas(e.target.value)} required />
				</label>
				<br />
				<label>
					Tiene Televisión:
					<select value={tieneTelevision ? 'Si' : 'No'} onChange={(e) => setTieneTelevision(e.target.value === 'Si')}>
						<option value="Si">Si</option>
						<option value="No">No</option>
					</select>
				</label>
				<br />
				<label>
					Tiene Frigobar:
					<select value={tieneFrigobar ? 'Si' : 'No'} onChange={(e) => setTieneFrigobar(e.target.value === 'Si')}>
						<option value="Si">Si</option>
						<option value="No">No</option>
					</select>
				</label>
				<br />

				<button type="submit" className="submit-button">
					Agregar Habitación
				</button>
				<br />
			</form>
			<Link to="/Habitacion" className="link">
				Ir a Lista de Habitaciones
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

export default HabitacionForm;
