import clsx from 'clsx';
import { useLang } from '@/hooks/useLang';
import { IProductsListItemProps } from '@/types/modules';
import styles from '@/styles/product-list-item/index.module.scss';
import ProductLabel from './ProductLabel';
import ProductItemActionButton from '@/components/elements/ProductItemActionButton/ProductItemActionButton';
import Link from 'next/link';
import Image from 'next/image';
import ProductAvailable from '@/components/elements/ProductAvaliable/ProductAvaliable';
import { formatPrice } from '@/lib/utils/common';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const ProductsListItem = ({ item, title }: IProductsListItemProps) => {
	const { lang, translations } = useLang();
	const isTitleForNew = title === translations[lang].main_page.new_title;
	const isMedia800 = useMediaQuery(800);

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
				<ProductItemActionButton
					text={translations[lang].product.add_to_comparison}
					iconClass='actions__btn_comparison'
				/>
				{!isMedia800 && (
					<ProductItemActionButton
						text={translations[lang].product.quick_view}
						iconClass='actions__btn_quick_view'
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
					{formatPrice(+item.price)} руб.
				</span>
			</div>
			<button className={`button-reset ${styles.list__item__cart}`}>
				{translations[lang].product.to_cart}
			</button>
		</li>
	);
};

export default ProductsListItem;
