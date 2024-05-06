import clsx from 'clsx';
import { useLang } from '@/hooks/useLang';
import { IProductsListItemProps } from '@/types/modules';
import styles from '@/styles/product-list-item/index.module.scss';
import ProductLabel from './ProductLabel';
import ProductItemActionButton from '@/components/elements/ProductItemActionButton/ProductItemActionButton';
import Link from 'next/link';
import Image from 'next/image';
import ProductAvailable from '@/components/elements/ProductAvaliable/ProductAvaliable';
import {
	addOverflowHiddenToBody,
	formatPrice,
	isItemInList,
} from '@/lib/utils/common';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { showQuickViewModal } from '@/context/modals';
import { setIsAddToFavorites } from '@/context/favorites';
import { setCurrentProduct } from '@/context/goods';
import { addItemToCart } from '@/lib/utils/cart';
import { useCartAction } from '@/hooks/useCartAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ProductsListItem = ({ item, title }: IProductsListItemProps) => {
	const { lang, translations } = useLang();
	const isTitleForNew = title === translations[lang].main_page.new_title;
	const { addToCartSpinner, setAddToCartSpinner, currentCartByAuth } =
		useCartAction();
	const isProductInCart = isItemInList(currentCartByAuth, item._id);

	const isMedia800 = useMediaQuery(800);

	const handleShowQuickViewModal = () => {
		addOverflowHiddenToBody();
		showQuickViewModal();
		setCurrentProduct(item);
	};

	const addToCart = () => {
		setIsAddToFavorites(false);
		addItemToCart(item, setAddToCartSpinner, 1);
	};

	return (
		<li className={styles.list__item}>
			{title ? (
				<span
					className={clsx({
						[`${styles.list__item__label}`]: true,
						[`${styles.list__item__new}`]: isTitleForNew,
						[`${styles.list__item__bestseller}`]: !isTitleForNew,
					})}>
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
					text={translations[lang].product.add_to_favorites}
					iconClass='actions__btn_favorite'
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
				<Image src={item.images[0]} alt={item.name} fill objectFit='contain' />
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
				onClick={addToCart}
				className={`button-reset ${styles.list__item__cart} ${
					isProductInCart ? styles.list__item__cart_added : ''
				}`}
				disabled={addToCartSpinner}
				style={addToCartSpinner ? { minInlineSize: 125, blockSize: 48 } : {}}>
				{addToCartSpinner ? (
					<FontAwesomeIcon icon={faSpinner} spin color='#000' />
				) : isProductInCart ? (
					translations[lang].product.in_cart
				) : (
					translations[lang].product.to_cart
				)}
			</button>
		</li>
	);
};

export default ProductsListItem;
