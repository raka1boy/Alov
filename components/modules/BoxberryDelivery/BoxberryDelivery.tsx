import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import BoxberryService, { City, Point } from '@/service/BoxberryService';
import styles from '@/styles/boxberry-delivery/index.module.scss';

const BoxberryDelivery: React.FC = () => {
	const [cities, setCities] = useState<City[]>([]);
	const [points, setPoints] = useState<Point[]>([]);
	const [selectedCity, setSelectedCity] = useState<City | null>(null);
	const [loadingCities, setLoadingCities] = useState<boolean>(false);
	const [loadingPoints, setLoadingPoints] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCities = async () => {
			setLoadingCities(true);
			setError(null);
			try {
				const cities = await BoxberryService.getCities();
				setCities(cities);
			} catch (error) {
				setError('Не удалось загрузить города');
			} finally {
				setLoadingCities(false);
			}
		};

		fetchCities();
	}, []);

	useEffect(() => {
		const fetchPoints = async () => {
			if (selectedCity) {
				setLoadingPoints(true);
				setError(null);
				try {
					const points = await BoxberryService.getPoints(selectedCity.Code);
					setPoints(points);
				} catch (error) {
					setError('Не удалось загрузить пункты выдачи');
				} finally {
					setLoadingPoints(false);
				}
			}
		};

		fetchPoints();
	}, [selectedCity]);

	const handleCityChange = (selectedOption: City | null) => {
		setSelectedCity(selectedOption);
		setPoints([]);
	};

	return (
		<div className={styles.boxberryDelivery}>
			<h2>Выберите город</h2>
			{loadingCities ? (
				<p>Загрузка городов...</p>
			) : (
				<Select
					options={cities}
					getOptionLabel={(city) => city.Name}
					getOptionValue={(city) => city.Code}
					onChange={handleCityChange}
					placeholder='Выберите город'
					isClearable
				/>
			)}

			{error && <p className={styles.error}>{error}</p>}

			{selectedCity && (
				<div>
					<h3>Пункты выдачи в {selectedCity.Name}</h3>
					{loadingPoints ? (
						<p>Загрузка пунктов выдачи...</p>
					) : (
						<ul>
							{points.map((point) => (
								<li key={point.Code}>
									{point.Address}, {point.City}
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};

export default BoxberryDelivery;
