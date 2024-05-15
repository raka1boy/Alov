import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/hooks/useLang';
import { IProductsListItemProps } from '@/types/modules';
import {
	addOverflowHiddenToBody,
	formatPrice,
	isItemInList,
} from '@/lib/utils/common';
import ProductLabel from './ProductLabel';
import ProductItemActionButton from '@/components/elements/ProductItemActionButton/ProductItemActionButton';
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { showQuickViewModal } from '@/context/modals';
import { setCurrentProduct } from '@/context/goods';
import { productsWithoutSizes } from '@/constants/product';
import { useCartAction } from '@/hooks/useCartAction';
import { addProductToCartBySizeTable } from '@/lib/utils/cart';
import { setIsAddToFavorites } from '@/context/favorites';
import { useFavoritesAction } from '@/hooks/useFavoritesAction';
import styles from '@/styles/product-list-item/index.module.scss';

const ProductsListItem = ({ item, title, selectedSize='inBlocks'}: IProductsListItemProps) => {
	const { lang, translations } = useLang();
	const isMedia800 = useMediaQuery(800);
	const isTitleForNew = title === translations[lang].main_page.new_title;
	const { addToCartSpinner, setAddToCartSpinner, currentCartByAuth } =
		useCartAction();
	const isProductInCart = isItemInList(currentCartByAuth, item._id);
	const {
		handleAddProductToFavorites,
		addToFavoritesSpinner,
		isProductInFavorites,
	} = useFavoritesAction(item);

	const handleShowQuickViewModal = () => {
		addOverflowHiddenToBody();
		showQuickViewModal();
		setCurrentProduct(item);
	};

	const addToCart = () => {
		setIsAddToFavorites(false);
		addProductToCartBySizeTable(item, setAddToCartSpinner, (selectedSize === 'inBlocks') ? 50: 12);
	};

	return (
		<>
			<li className={styles.list__item}>
				{title ? (
					<span
						className={`${styles.list__item__label} ${
							isTitleForNew
								? styles.list__item__new
								: styles.list__item__bestseller
						}`}>
						{isTitleForNew
							? translations[lang].main_page.is_new
							: translations[lang].main_page.is_bestseller}
					</span>
				) : !item.isNew && !item.isBestseller ? (
					''
				) : (
					<ProductLabel isBestseller={item.isBestseller} isNew={item.isNew} />
				)}
				<div className={styles.list__item__actions}>
					<ProductItemActionButton
						spinner={addToFavoritesSpinner}
						text={translations[lang].product.add_to_favorites}
						iconClass={`${
							addToFavoritesSpinner
								? 'actions__btn_spinner'
								: isProductInFavorites
									? 'actions__btn_favorite_checked'
									: 'actions__btn_favorite'
						}`}
						callback={handleAddProductToFavorites}
					/>
					{!isMedia800 && (
						<ProductItemActionButton
							text={translations[lang].product.quick_view}
							iconClass='actions__btn_quick_view'
							callback={handleShowQuickViewModal}
						/>
					)}
				</div>
				<Link
					href={`/catalog/${item.category}/${item._id}`}
					className={styles.list__item__img}>
					<Image src={item.images[0]} alt={item.name} fill />
				</Link>
				<div className={styles.list__item__inner}>
					<h3 className={styles.list__item__title}>
						<Link href={`/catalog/${item.category}/${item._id}`}>
							{item.name}
						</Link>
					</h3>
					<ProductAvailable
						vendorCode={item.vendorCode}
						inStock={+item.inStock}
					/>
					<span className={styles.list__item__price}>
						{formatPrice(+item.price)} ₽
					</span>
				</div>
					<button
						className={`button-reset ${styles.list__item__cart}`}
						onClick={addToCart}>
						{translations[lang].product.to_cart}
					</button>
			</li>
		</>
	);
};

export default ProductsListItem;
