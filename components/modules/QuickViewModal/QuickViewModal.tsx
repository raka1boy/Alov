import Link from 'next/link';
import { closeQuickViewModal } from '@/context/modals';
import { formatPrice, removeOverflowHiddenFromBody } from '@/lib/utils/common';
import QuickViewModalSlider from './QuickViewModalSlider';
import { useCartAction } from '@/hooks/useCartAction';
import { useProductImages } from '@/hooks/useProductImages';
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable';
import ProductColor from '../ProductsListItem/ProductColor';
import { useLang } from '@/hooks/useLang';
import ProductSizeTableButton from '../ProductsListItem/ProductSizeTableButton';
import ProductSizesItem from '../ProductsListItem/ProductSizesItem';
import ProductCounter from '../ProductsListItem/ProductCounter';
import AddToCartButton from '../ProductsListItem/AddToCartButton';
import ProductItemActionButton from '@/components/elements/ProductItemActionButton/ProductItemActionButton';
import { ICartItem } from '@/types/cart';
import { useFavoritesAction } from '@/hooks/useFavoritesAction';
import { setIsAddToFavorites } from '@/context/favorites';
import stylesForProduct from '@/styles/product-list-item/index.module.scss';
import styles from '@/styles/quick-view-modal/index.module.scss';

const QuickViewModal = () => {
	const { lang, translations } = useLang();
	const {
		product,
		selectedSize,
		setSelectedSize,
		handleAddToCart,
		addToCartSpinner,
		updateCountSpinner,
		currentCartItems,
		allCurrentCartItemCount,
		setCount,
		existingItem,
		count,
	} = useCartAction();
	const images = useProductImages(product);
	const {
		handleAddProductToFavorites,
		addToFavoritesSpinner,
		isProductInFavorites,
	} = useFavoritesAction(product);

	const handleCloseModal = () => {
		removeOverflowHiddenFromBody();
		closeQuickViewModal();
	};

	const addToCart = () => {
		setIsAddToFavorites(false);
		handleAddToCart(count);
	};


	return (
		<div className={styles.modal}>
			<button
				className={`button-reset ${styles.modal__close}`}
				onClick={handleCloseModal}
			/>
			<div className={styles.modal__actions}>
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
					withTooltip={false}
					callback={handleAddProductToFavorites}
				/>
			</div>
			<div className={styles.modal__left}>
				<QuickViewModalSlider images={images} />
			</div>
			<div className={styles.modal__right}>
				<h3 className={styles.modal__right__title}>{product.name}</h3>
				<div className={styles.modal__right__price}>
					{formatPrice(+product.price)} ₽
				</div>
				<div className={styles.modal__right__info}>
					<ProductAvailable
						vendorCode={product.vendorCode}
						inStock={+product.inStock}
					/>
					<ProductColor color={product.characteristics.color} />
					{Object.keys(product.sizes).length ? (
						<div className={styles.modal__right__info__size}>
							<div className={styles.modal__right__info__size__inner}>
								<span className={stylesForProduct.product__size_title}>
									{translations[lang].catalog.size}
								</span>
								<ProductSizeTableButton
									sizes={product.sizes}
									type={product.type}
									className={`sizes-table-btn ${styles.modal__right__info__sizes_btn}`}
								/>
							</div>
							<ul className={`list-reset ${styles.modal__right__info__sizes}`}>
								{Object.entries(product.sizes).map(([key, value], i) => (
									<ProductSizesItem
										key={i}
										currentSize={[key, value]}
										selectedSize={selectedSize}
										setSelectedSize={setSelectedSize}
										currentCartItems={currentCartItems}
									/>
								))}
							</ul>
						</div>
					) : (
						''
					)}
					<div className={styles.modal__right__bottom}>
						<span className={stylesForProduct.product__count_title}>
							{translations[lang].product.count}
						</span>
						<div className={styles.modal__right__bottom__inner}>
							{!!selectedSize ? (
								<ProductCounter
									className={`counter ${styles.modal__right__bottom__counter}`}
									count={count}
									totalCount={+product.inStock}
									initialCount={+(existingItem?.count || (selectedSize === 'inBlocks' ? 50 : 12))}
									setCount={setCount}
									cartItem={existingItem as ICartItem}
									updateCountAsync={false}
									selectedSize={selectedSize}
								/>
							) : (
								<div
									className={`counter ${styles.modal__right__bottom__counter}`}
									style={{ justifyContent: 'center' }}>
									<span>
										{translations[lang].product.total_in_cart}{' '}
										{allCurrentCartItemCount}
									</span>
								</div>
							)}
							<AddToCartButton
								className={styles.modal__right__bottom__add}
								text={translations[lang].product.to_cart}
								handleAddToCart={addToCart}
								addToCartSpinner={addToCartSpinner || updateCountSpinner}
								btnDisabled={
									addToCartSpinner ||
									updateCountSpinner ||
									allCurrentCartItemCount === +product.inStock
								}
							/>
						</div>
					</div>
				</div>
				<div className={styles.modal__right__more}>
					<Link
						href={`/catalog/${product.category}/${product._id}`}
						className={styles.modal__right__more__link}
						onClick={handleCloseModal}>
						{translations[lang].product.more}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default QuickViewModal;
