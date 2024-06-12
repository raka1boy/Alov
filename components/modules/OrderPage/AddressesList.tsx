import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUnit } from 'effector-react';
import {
	getAlovOfficesByCityFx,
	setChosenPickupAddressData,
	setShouldLoadAlovData,
	setShouldShowCourierAddressData,
} from '@/context/order';
import {
	$chosenPickupAddressData,
	$alovDataByCity,
	$shouldLoadAlovData,
} from '@/context/order/state';
import { useLang } from '@/hooks/useLang';
import { useTTMap } from '@/hooks/useTTMap';
import { IAddressesListProps, IAlovAddressData } from '@/types/order';
import PickupAddressItem from './PickupAddressItem';
import styles from '@/styles/order/index.module.scss';

const AddressesList = ({
	listClassName,
	handleSelectAddressByMarkers,
}: IAddressesListProps) => {
	const { lang, translations } = useLang();
	const alovDataByCity = useUnit($alovDataByCity);
	const chosenPickupAddressData = useUnit($chosenPickupAddressData);
	const shouldLoadAlovData = useUnit($shouldLoadAlovData);
	const { handleSelectAddress } = useTTMap();
	const loadAlovDataSpinner = useUnit(
		getAlovOfficesByCityFx.pending
	);

	const handleChosenAddressData = (data: Partial<IAlovAddressData>) => {
		setShouldLoadAlovData(false);
		setChosenPickupAddressData(data);
		setShouldShowCourierAddressData(false);
	};

	return (
		<>
			{shouldLoadAlovData && (
				<>
					{loadAlovDataSpinner && (
						<span
							className={styles.order__list__item__delivery__inner__spinner}>
							<FontAwesomeIcon icon={faSpinner} spin color='#fff' size='2x' />
						</span>
					)}
					{!loadAlovDataSpinner && (
						<ul className={`list-reset ${listClassName}`}>
							{alovDataByCity?.length ? (
								alovDataByCity.map((item) => (
									<PickupAddressItem
										key={item.place_id}
										addressItem={item}
										handleChosenAddressData={handleChosenAddressData}
										handleSelectAddress={
											handleSelectAddressByMarkers || handleSelectAddress
										}
									/>
								))
							) : (
								<span>{translations[lang].common.nothing_is_found}</span>
							)}
						</ul>
					)}
				</>
			)}
			{!!chosenPickupAddressData.address_line1 && !shouldLoadAlovData && (
				<div className={styles.order__list__item__delivery__pickup__choose}>
					<span>{chosenPickupAddressData.address_line1}</span>
					<span>
						{chosenPickupAddressData.address_line2},{' '}
						{chosenPickupAddressData.city}
					</span>
				</div>
			)}
		</>
	);
};

export default AddressesList;
