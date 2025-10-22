import { API_URL } from './config';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorMessage = (error: any): string => {
	if (error.response) {
		const status = error.response.status;
		if (status >= 400 && status < 500) {
			return 'Неверный запрос. Пожалуйста, проверьте введённые данные.';
		} else if (status >= 500 && status < 600) {
			return 'Сервер временно недоступен. Попробуйте позже.';
		} else {
			return `Произошла ошибка сервера: ${status}`;
		}
	} else if (error.request) {
		return 'Сервер не отвечает. Проверьте подключение к интернету.';
	} else if (error.code) {
		switch (error.code) {
			case 'ECONNABORTED':
				return 'Превышено время ожидания ответа сервера.';
			case 'ERR_NETWORK':
				return 'Проблемы с сетью. Попробуйте проверить подключение.';
			case 'ERR_BAD_OPTION_VALUE':
			case 'ERR_BAD_OPTION':
			case 'ERR_INVALID_URL':
				return 'Ошибка в настройках запроса.';
			case 'ERR_CANCELED':
				return 'Запрос был отменён.';
			default:
				return `Произошла ошибка: ${error.message || 'неизвестная ошибка'}`;
		}
	} else {
		return `Ошибка: ${error.message || 'Что-то пошло не так'}`;
	}
};

export const getData = async () => {
	try {
		const res = await axios.get(`${API_URL}/movies`);
		return { success: true, data: res.data };
	} catch (error) {
		return { success: false, data: getErrorMessage(error) };
	}
};
