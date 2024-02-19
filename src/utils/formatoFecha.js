export const formatoFecha = () => {
	//xxxx-xx--xx
	const currentDate = new Date();
	const formatoFecha = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
		.toString()
		.padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
	return formatoFecha;
};
