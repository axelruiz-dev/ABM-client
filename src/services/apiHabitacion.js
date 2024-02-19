import axios from 'axios';
import { url } from '../../src/utils/config.js';

const apiUrl = `${url}/habitacion`;

export const fetchHabitacion = async () => {
	try {
		const response = await axios.get(apiUrl);
		return response.data;
	} catch (error) {
		throw error.response.data.errores[0].msg;
	}
};

export const fetchHabitacionDisponible = async (data) => {
	console.log(data);
	try {
		const response = await axios.post(`${apiUrl}/disponible`, data);
		return response.data;
	} catch (error) {
		throw error.response.data.errores[0].msg;
	}
};

export const addHabitacion = async (data) => {
	try {
		const response = await axios.post(apiUrl, data);
		return response.data.message;
	} catch (error) {
		throw error.response.data.errores[0].msg;
	}
};

export const updateHabitacion = async (id, data) => {
	try {
		const response = await axios.put(`${apiUrl}/${id}`, data);
		return response.data.message;
	} catch (error) {
		throw error.response.data.errores[0].msg;
	}
};

export const deleteHabitacion = async (id) => {
	try {
		const response = await axios.delete(`${apiUrl}/${id}`);
		return response.data.message;
	} catch (error) {
		throw error.response.data.errores[0].msg;
	}
};
