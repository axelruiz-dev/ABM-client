import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio/Inicio';
import PersonaList from './pages/Persona/PersonaList';
import PersonaForm from './pages/Persona/PersonaForm';
import HabitacionForm from './pages/Habitacion/HabitacionForm';
import HabitacionList from './pages/Habitacion/HabitacionList';
import ReservaForm from './pages/Reserva/ReservaForm';
import ReservaList from './pages/Reserva/ReservaList';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Inicio />} />
				<Route path="/Persona" element={<PersonaList />} />
				<Route path="/Persona/agregar" element={<PersonaForm />} />
				<Route path="/Habitacion/agregar" element={<HabitacionForm />} />
				<Route path="/Habitacion" element={<HabitacionList />} />
				<Route path="/Reserva/agregar" element={<ReservaForm />} />
				<Route path="/Reserva" element={<ReservaList />} />
			</Routes>
		</Router>
	);
};

export default App;
