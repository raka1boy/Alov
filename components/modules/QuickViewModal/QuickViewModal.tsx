import { closeQuickViewModal } from '@/context/modals';
import { formatPrice, removeOverflowHiddenFromBody } from '@/lib/utils/common';
import styles from '@/styles/quick-view-modal/index.module.scss';
import QuickViewModalSlider from './QuickViewModalSlider';
import { useCartAction } from '@/hooks/useCartAction';
import { useProductImages } from '@/hooks/useProductImages';
import ProductAvailable from '@/components/elements/ProductAvaliable/ProductAvaliable';
import { useLang } from '@/hooks/useLang';
import ProductCounter from '../ProductsListItem/ProductCounter';
import AddToCartButton from '../ProductsListItem/AddToCartButton';
import Link from 'next/link';
import ProductItemActionButton from '@/components/elements/ProductItemActionButton/ProductItemActionButton';
import { ICartItem } from '@/types/cart';
import { setIsAddToFavorites } from '@/context/favorites';

const QuickViewModal = () => {
	const {
		product,
		count,
		existingItem,
		setCount,
		handleAddToCart,
		addToCartSpinner,
		updateCountSpinner,
		allCurrentCartItemCount,
	} = useCartAction();
	const { lang, translations } = useLang();
	const handleCloseModal = () => {
		removeOverflowHiddenFromBody();
		closeQuickViewModal();
	};

	const addToCart = () => {
		setIsAddToFavorites(false);
		console.log(count);
		handleAddToCart(count);
	};

	const images = useProductImages(product);

	return (
		<div className={styles.modal}>
			<button
				className={`button-reset ${styles.modal__close}`}
				onClick={handleCloseModal}
			/>
			<div className={styles.modal__actions}>
				<ProductItemActionButton
					text={translations[lang].product.add_to_favorites}
					iconClass='actions__btn_favorite'
					withTooltip={false}
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
				</div>
				<div className={styles.modal__right__bottom}>
					<span className={styles.product__count_title}>
						{translations[lang].product.count}
					</span>
					<div className={styles.modal__right__bottom__inner}>
						<ProductCounter
							className={`counter ${styles.modal__right__bottom__counter}`}
							count={count}
							totalCount={+product.inStock}
							initialCount={+(existingItem?.count || 1)}
							setCount={setCount}
							cartItem={existingItem as ICartItem}
							updateCountAsync={false}
						/>
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
	);
};

export default QuickViewModal;
