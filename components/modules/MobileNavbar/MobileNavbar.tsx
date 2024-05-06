'use client';
import Link from 'next/link';
import {
  closeCatalogMenu,
  closeMenu,
  openCatalogMenu,
  openMenu,
} from '@/context/modals'
import { useLang } from '@/hooks/useLang';
import { addOverflowHiddenToBody } from '@/lib/utils/common';
import { TAction } from '@/types/types';
import CatalogMenu from '../Header/CatalogMenu';

const MobileNavbar = () => {
	const { lang, translations } = useLang();

	const handleMenuAction = (action: TAction) => () => {
		addOverflowHiddenToBody(action === 'openCatalogMenu' ? '0' : '');
		if (action === 'openMenu') {
			closeCatalogMenu();
			openMenu();
		} else if (action === 'openCatalogMenu') {
			openCatalogMenu();
			closeMenu();
		}
	};

	return (
		<>
			<CatalogMenu />
			<div className='mobile-navbar'>
				<Link
					href='/'
					className='mobile-navbar__button'
					aria-label='Открыть главную страницу'>
					{translations[lang].breadcrumbs.main}
				</Link>
				<button
					className='button-reset mobile-navbar__button'
					onClick={handleMenuAction('openCatalogMenu')}
					aria-label='Открыть модуль "Каталог"'>
					{translations[lang].breadcrumbs.catalog}
				</button>
				<Link
					href='/favorites'
					className='mobile-navbar__button'
					aria-label='Открыть избранное'>
					{translations[lang].breadcrumbs.favorites}
				</Link>
				<Link
					href='/cart'
					className='mobile-navbar__button'
					aria-label='Открыть корзину'>
					{translations[lang].breadcrumbs.cart}
				</Link>
				<button
					className='button-reset mobile-navbar__button'
					onClick={handleMenuAction('openMenu')}
					aria-label='Открыть модуль "Ещё"'>
					{translations[lang].common.more}
				</button>
			</div>
		</>
	);
};

export default MobileNavbar;
