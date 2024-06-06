/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import toast from 'react-hot-toast';
import { useUnit } from 'effector-react';
import { useCartAction } from '@/hooks/useCartAction';
import { closeSizeTableByCheck, isUserAuth } from '@/lib/utils/common';
import { useLang } from '@/hooks/useLang';
import AddToCartButton from '../ProductsListItem/AddToCartButton';
import ProductCountBySize from '../ProductsListItem/ProductCountBySize';
import { addProductToFavorites } from '@/context/favorites';
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth';
import { addFavoriteItemToLS } from '@/lib/utils/favorites';
import { useFavoritesAction } from '@/hooks/useFavoritesAction';
import {
	$isAddToFavorites,
	$favorites,
	$favoritesFromLS,
} from '@/context/favorites/state';
import { $showQuickViewModal } from '@/context/modals/state';
import { $sizeTableSizes } from '@/context/sizeTable/state';
import styles from '@/styles/size-table/index.module.scss';

const SizeTable = () => {
	const { lang, translations } = useLang();
	const showQuickViewModal = useUnit($showQuickViewModal);
	const isAddToFavorites = useUnit($isAddToFavorites);
	const {
		selectedSize,
		setSelectedSize,
		handleAddToCart,
		cartItemBySize,
		addToCartSpinner,
		currentCartItems,
		updateCountSpinner,
		product,
	} = useCartAction(true);
	const { addToFavoritesSpinner, setAddToFavoritesSpinner } =
		useFavoritesAction(product);
	const productSizes = useUnit($sizeTableSizes);
	const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS);
	const currentFavoriteItems = currentFavoritesByAuth.filter(
		(item) => item.productId === product._id
	);
	const favoriteItemBySize = currentFavoriteItems.find(
		(item) => item.size === selectedSize
	);

	const handleSelectBlockSize = () => setSelectedSize('inBlocks');

	const handleSelectBoxesSize = () => setSelectedSize('inBoxes');

	const isSizeSelected = (size: string) => selectedSize === size;

	const checkInFavorites = (size: string) =>
		currentFavoriteItems.find((item) => item.size === size);

	const sizes = [
		{
			id: 1,
			headCircumference: '50-100-150',
			manufacturerSize: 'По блокам',
			selectHandler: handleSelectBlockSize,
			isSelected: isSizeSelected('inBlocks'),
			isAvailable: productSizes.sizes.inBlocks,
			isInFavorites: checkInFavorites('inBlocks'),
		},
		{
			id: 2,
			headCircumference: '1000-2000',
			manufacturerSize: 'По коробкам',
			selectHandler: handleSelectBoxesSize,
			isSelected: isSizeSelected('inBoxes'),
			isAvailable: productSizes.sizes.inBoxes,
			isInFavorites: checkInFavorites('inBoxes'),
		},
	];

	const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal);

	const addToCart = () =>
		handleAddToCart(
			+(cartItemBySize?.count || (selectedSize === 'inBlocks' ? 50 : 1000))
		);

	const trProps = (item: {
		id: number;
		headCircumference: string;
		manufacturerSize: string;
		selectHandler: () => void;
		isSelected: boolean;
		isAvailable: boolean;
	}) => ({
		onClick: item.selectHandler,
		style: {
			backgroundColor:
				item.isSelected || selectedSize === item.manufacturerSize.toLowerCase()
					? '#f9932c'
					: 'transparent',
			pointerEvents: item.isAvailable ? 'auto' : 'none',
			opacity: item.isAvailable ? 1 : 0.5,
			color: item.isAvailable ? '#fff' : 'rgba(22, 22, 22, .2)',
		},
	});

	const handleAddProductToFavorites = () => {
		if (!isUserAuth()) {
			addFavoriteItemToLS(product, selectedSize);
			return;
		}

		if (favoriteItemBySize) {
			toast.success('Добавлено в избранное!');
			return;
		}

		const auth = JSON.parse(localStorage.getItem('auth') as string);

		const clientId = addFavoriteItemToLS(product, selectedSize, false);

		addProductToFavorites({
			jwt: auth.accessToken,
			productId: product._id,
			setSpinner: setAddToFavoritesSpinner,
			size: selectedSize,
			category: product.category,
			clientId,
		});
	};

	return (
		<div className={`${styles.size_table} ${styles.size_table_headdress}`}>
			<button
				className={`button-reset ${styles.size_table__close}`}
				onClick={handleCloseSizeTable}
			/>
			<h2 className={styles.size_table__title}>
				{translations[lang].size_table.title}
			</h2>
			<div className={styles.size_table__inner}>
				<table className={styles.size_table__table}>
					<thead>
						<tr>
							<th>{translations[lang].size_table.head_circumference}</th>
							<th>{translations[lang].size_table.size}</th>
						</tr>
					</thead>
					<tbody>
						{sizes.map((sizeItem) => (
							<tr
								key={sizeItem.id}
								{...(trProps(
									sizeItem
								) as React.HTMLAttributes<HTMLTableRowElement>)}>
								<style>
									{
										'\
							td{\
								color:black;\
							}\
						'
									}
								</style>
								<td>
									{sizeItem.isInFavorites && (
										<span className={styles.size_table__favorite} />
									)}
									{sizeItem.headCircumference}
								</td>
								<td>
									<ProductCountBySize
										size={sizeItem.manufacturerSize}
										products={currentCartItems}
									/>
									{sizeItem.manufacturerSize}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<AddToCartButton
				className={`${styles.size_table__btn} ${styles.size_table__btn_favorite}`}
				handleAddToCart={
					isAddToFavorites ? handleAddProductToFavorites : addToCart
				}
				addToCartSpinner={
					addToCartSpinner || updateCountSpinner || addToFavoritesSpinner
				}
				btnDisabled={
					!!!selectedSize ||
					addToCartSpinner ||
					updateCountSpinner ||
					addToFavoritesSpinner
				}
				text={
					isAddToFavorites
						? translations[lang].product.to_favorite
						: translations[lang].product.to_cart
				}
			/>
		</div>
	);
};

export default SizeTable;
