/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { useUnit } from 'effector-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import {
	$chosenCourierAddressData,
	$chosenPickupAddressData,
	$courierTab,
	$pickupTab,
	$shouldShowCourierAddressData,
} from '@/context/order/state';
import OrderTitle from './OrderTitle';
import TabControls from './TabControls';
import { setCourierTab, setPickupTab } from '@/context/order';
import { basePropsForMotion } from '@/constants/motion';
import { openMapModal } from '@/context/modals';
import CourierAddressInfo from './CourierAddressInfo';
import styles from '@/styles/order/index.module.scss';
import useScript from '@/hooks/useScript';

const OrderDelivery = () => {
	const { lang, translations } = useLang();
	const pickupTab = useUnit($pickupTab);
	const courierTab = useUnit($courierTab);
	const [shouldLoadMap, setShouldLoadMap] = useState(false);
	const chosenPickupAddressData = useUnit($chosenPickupAddressData);
	const chosenCourierAddressData = useUnit($chosenCourierAddressData);
	const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
	const shouldShowCourierAddressData = useUnit($shouldShowCourierAddressData);
	useScript('https://points.boxberry.de/js/boxberry.js');
	useScript('https://cdn.jsdelivr.net/npm/@cdek-it/widget@3');

	const callbackFunction = (data: any) => {
		console.log(data);
	};

	const handlePickupTab = () => {
		if (pickupTab) {
			return;
		}

		setPickupTab(true);
		setCourierTab(false);
		boxberry.open(
			callbackFunction,
			process.env.NEXT_PUBLIC_BOXBERRY_API,
			'Москва'
		);
	};

	const handleCourierTab = () => {
		if (courierTab) {
			return;
		}

		setPickupTab(false);
		setCourierTab(true);
		//@ts-ignore
		new window.CDEKWidget({
			from: {
				country_code: 'RU',
				city: 'Домодедово',
				postal_code: 630009,
				code: 270,
				address: 'ул. Большевистская, д. 101',
			},
			root: 'cdek-map',
			apiKey: process.env.NEXT_PUBLIC_YANDEX_API_KEY,
			canChoose: true,
			servicePath: 'https://some-site.com/service.php',
			debug: false,
			defaultLocation: [55.724819136434675, 37.621930349431366],
			lang: 'rus',
			currency: 'RUB',
			onReady() {
				alert('Виджет загружен');
			},
			onCalculate() {
				alert('Расчет стоимости доставки произведен');
			},
			onChoose() {
				alert('Доставка выбрана');
			},
		});
	};

	return (
		<>
			<OrderTitle orderNumber='2' text={translations[lang].order.delivery} />
			<div className={styles.order__list__item__delivery}>
				<TabControls
					handleTab1={handlePickupTab}
					handleTab2={handleCourierTab}
					tab1Active={pickupTab}
					tab2Active={courierTab}
					tab1Text={translations[lang].order.pickup_free}
					tab2Text={translations[lang].order.courier_delivery}
				/>
				{pickupTab && (
					<>
						<motion.div
							className={styles.order__list__item__delivery__pickup}
							{...basePropsForMotion}>
							<p></p>
						</motion.div>
					</>
				)}
				{courierTab && (
					<motion.div
						className={styles.order__list__item__delivery__pickup}
						{...basePropsForMotion}
						id='cdek-map'
						style={{ width: 800, height: 600 }}>
						<p></p>
					</motion.div>
				)}
			</div>
		</>
	);
};

export default OrderDelivery;
