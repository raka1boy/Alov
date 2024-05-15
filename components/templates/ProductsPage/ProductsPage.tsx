/* eslint-disable indent */
'use client';
import ReactPaginate from 'react-paginate';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProductFilters } from '@/hooks/useProductFilters';
import { IProductsPage } from '@/types/catalog';
import { basePropsForMotion } from '@/constants/motion';
import ProductsListItem from '@/components/modules/ProductsListItem/ProductsListItem';
import { useLang } from '@/hooks/useLang';
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount';
import { setCatalogCategoryOptions } from '@/context/catalog';
import CatalogFilters from '@/components/modules/CatalogFilters/CategoryFilters';
import { useWatchedProducts } from '@/hooks/useWatchedProducts';
import WatchedProducts from '@/components/modules/WatchedProducts/WatchedProducts';
import styles from '@/styles/catalog/index.module.scss';
import skeletonStyles from '@/styles/skeleton/index.module.scss';

const ProductsPage = ({ searchParams, pageName }: IProductsPage) => {
	const { lang, translations } = useLang();
	const {
		products,
		productsSpinner,
		paginationProps,
		handlePageChange,
		handleApplyFiltersWithCategory,
		handleApplyFiltersWithPrice,
		handleApplyFiltersWithSizes,
		handleApplyFiltersWithColors,
		handleApplyFiltersBySort,
	} = useProductFilters(searchParams, pageName, pageName === 'catalog');
	const { watchedProducts } = useWatchedProducts();

	useEffect(() => {
		switch (pageName) {
			case 'catalog':
				setCatalogCategoryOptions({
					rootCategoryOptions: [
						{
							id: 2,
							title: translations[lang].main_menu.lighters,
							href: '/catalog/lighters',
						},
					],
				});
				break;
			case 'lighters':
				setCatalogCategoryOptions({
					lightersCategoryOptions: [
						{
							id: 1,
							title: translations[lang].lighters.flintLighters,
							filterHandler: () => handleApplyFiltersWithCategory('flintLighters'),
						},
						{
							id: 2,
							title: translations[lang].lighters.jetFlames,
							filterHandler: () =>
								handleApplyFiltersWithCategory('jetFlames'),
						},
						{
							id: 3,
							title: translations[lang].lighters.metalFlintLights,
							filterHandler: () => handleApplyFiltersWithCategory('metalFlintLights'),
						},
						{
							id: 4,
							title: translations[lang].lighters.metalJets,
							filterHandler: () => handleApplyFiltersWithCategory('metalJets'),
						},
						{
							id: 5,
							title: translations[lang].lighters.metalTurboChargedLighters,
							filterHandler: () => handleApplyFiltersWithCategory('metalTurboChargedLighters'),
						},
						{
							id: 6,
							title: translations[lang].lighters.piezoFlashlights,
							filterHandler: () => handleApplyFiltersWithCategory('piezoFlashlights'),
						},
						{
							id: 7,
							title: translations[lang].lighters.piezoLighters,
							filterHandler: () => handleApplyFiltersWithCategory('piezoLighters'),
						},
						{
							id: 8,
							title: translations[lang].lighters.turboChargedFlashlights,
							filterHandler: () => handleApplyFiltersWithCategory('turboChargedFlashlights'),
						},
						{
							id: 9,
							title: translations[lang].lighters.turboChargedLighters,
							filterHandler: () => handleApplyFiltersWithCategory('turboChargedLighters'),
						},
					],
				});
				break;
			default:
				break;
		}
	}, [lang]);

	return (
		<>
			<HeadingWithCount
				count={products.count}
				title={
					(translations[lang].breadcrumbs as { [index: string]: string })[
						pageName
					]
				}
				spinner={productsSpinner}
			/>
			<CatalogFilters
				handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
				handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
				handleApplyFiltersWithColors={handleApplyFiltersWithColors}
				handleApplyFiltersBySort={handleApplyFiltersBySort}
			/>
			{productsSpinner && (
				<motion.ul
					{...basePropsForMotion}
					className={skeletonStyles.skeleton}
					style={{ marginBottom: 60 }}>
					{Array.from(new Array(12)).map((_, i) => (
						<li key={i} className={skeletonStyles.skeleton__item}>
							<div className={skeletonStyles.skeleton__item__light} />
						</li>
					))}
				</motion.ul>
			)}
			{!productsSpinner && (
				<motion.ul
					{...basePropsForMotion}
					className={`list-reset ${styles.catalog__list}`}>
					{(products.items || []).map((item) => (
						<ProductsListItem key={item._id} item={item} />
					))}
				</motion.ul>
			)}
			{!products.items?.length && !productsSpinner && (
				<div className={styles.catalog__list__empty}>
					{translations[lang].common.nothing_is_found}
				</div>
			)}
			<div className={styles.catalog__bottom}>
				<ReactPaginate
					{...paginationProps}
					nextLabel={<span>{translations[lang].catalog.next_page}</span>}
					previousLabel={
						<span>{translations[lang].catalog.previous_page}</span>
					}
					onPageChange={handlePageChange}
				/>
			</div>
			{!!watchedProducts.items?.length && (
				<WatchedProducts watchedProducts={watchedProducts} />
			)}
		</>
	);
};

export default ProductsPage;
