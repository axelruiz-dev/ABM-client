import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
	return (
		<div className="inicio-container">
			<nav>
				<ul className="menu-list">
					<li>
						<Link to="/Persona" className="link">
							<div className="card">
								<h3>Personas</h3>
								<p>Explora información sobre personas</p>
							</div>
						</Link>
					</li>
					<li>
						<Link to="/Habitacion" className="link">
							<div className="card">
								<h3>Habitaciones</h3>
								<p>Descubre nuestras opciones de habitaciones</p>
							</div>
						</Link>
					</li>
					<li>
						<Link to="/Reserva" className="link">
							<div className="card">
								<h3>Reservas</h3>
								<p>Realiza y gestiona reservas fácilmente</p>
							</div>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Inicio;
