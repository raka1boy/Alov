import axios from 'axios';

const BOXBERRY_API_URL = 'https://api.boxberry.ru/json.php';
const API_KEY = process.env.NEXT_PUBLIC_BOXBERRY_API;

interface City {
	Code: string;
	Name: string;
}

interface Point {
	Code: string;
	Address: string;
	City: string;
}

class BoxberryService {
	static async getCities(): Promise<City[]> {
		try {
			const response = await axios.get(BOXBERRY_API_URL, {
				params: {
					token: API_KEY,
					method: 'ListCities',
				},
			});
			return response.data;
		} catch (error) {
			console.error('Ошибка при получении списка городов', error);
			throw new Error('Не удалось загрузить города');
		}
	}

	static async getPoints(cityCode: string): Promise<Point[]> {
		try {
			const response = await axios.get(BOXBERRY_API_URL, {
				params: {
					token: API_KEY,
					method: 'ListPoints',
					CityCode: cityCode,
				},
			});
			return response.data;
		} catch (error) {
			console.error('Ошибка при получении пунктов выдачи', error);
			throw new Error('Не удалось загрузить пункты выдачи');
		}
	}
}

export default BoxberryService;
export type { City, Point };
