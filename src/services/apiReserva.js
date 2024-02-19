import axios from 'axios';
import { url } from '../../src/utils/config.js';

const apiUrl = `${url}/reserva`;

export const fetchReserva = async () => {
	try {
		const response = await axios.get(apiUrl);
		return response.data;
	} catch (error) {
		throw error.response.data.errores[0].msg;
	}
};

export const addReserva = async (data) => {
	try {
		const response = await axios.post(apiUrl, data);
		return response.data.message;
	} catch (error) {
		throw error.response.data.errores[0].msg;
	}
};

export const updateReserva = async (id, data) => {
	try {
		const response = await axios.put(`${apiUrl}/${id}`, data);
		return response.data.message;
	} catch (error) {
		throw error.response.data.errores[0].msg;
	}
};

export const deleteReserva = async (id) => {
	try {
		const response = await axios.delete(`${apiUrl}/${id}`);
		return response.data.message;
	} catch (error) {
		throw error.response.data.errores[0].msg;
	}
};
