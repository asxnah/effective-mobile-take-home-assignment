export const truncate = (text: string, words = 14) => {
	return text.split(' ').slice(0, words).join(' ') + '...';
};
