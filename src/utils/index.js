export const convertData = (message) => {
	return JSON.parse(message.data);
};

export const copy = (text) => {
	navigator.clipboard.writeText(text);
};
