'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useUnit } from 'effector-react';
import { $isAuth } from '@/context/auth/state';
import { loginCheckFx } from '@/context/user';
import Link from 'next/link';
import Logo from '@/components/elements/Logo/Logo';
import { useLang } from '@/hooks/useLang';
import Menu from './Menu';
import { openMenu, openSearchModal } from '@/context/modals';
import {
	addOverflowHiddenToBody,
	handleOpenAuthPopup,
	triggerLoginCheck,
} from '@/lib/utils/common';
import { TModal } from '@/types/types';
import CartPopup from './CartPopup/CartPopup';
import HeaderProfile from './HeaderProfile';
import { useEffect } from 'react';
import { setLang } from '@/context/lang';
import {
	addProductsFromLSToFavorites,
	setFavoritesFromLS,
	setShouldShowEmptyFavorites,
} from '@/context/favorites';
import {
	addProductsFromLSToCart,
	setCartFromLS,
	setShouldShowEmpty,
} from '@/context/cart';

const Header = () => {
	const isAuth = useUnit($isAuth);
	const loginCheckSpinner = useUnit(loginCheckFx.pending);
	const { lang, translations } = useLang()

	const handleOpenModal = (currModal: TModal) => {
		addOverflowHiddenToBody();
		switch (currModal) {
			case 'menu':
				openMenu();
				break;
			case 'search':
				openSearchModal();
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		const auth = JSON.parse(localStorage.getItem('auth') as string);
		const lang = JSON.parse(localStorage.getItem('lang') as string);
		const cart = JSON.parse(localStorage.getItem('cart') as string);
		const favoritesFromLS = JSON.parse(
			localStorage.getItem('favorites') as string
		);
		if (lang) {
			if (lang === 'ru' || lang === 'en') {
				setLang(lang);
			}
		}

		triggerLoginCheck();

		if (!favoritesFromLS || !favoritesFromLS?.length) {
			setShouldShowEmptyFavorites(true);
		}

		if (!cart || !cart?.length) {
			setShouldShowEmpty(true);
		}

		if (auth?.accessToken) {
			return;
		}

		if (cart && Array.isArray(cart)) {
			if (!cart.length) {
				setShouldShowEmpty(true);
			} else {
				setCartFromLS(cart);
			}
		}

		if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
			if (!favoritesFromLS.length) {
				setShouldShowEmptyFavorites(true);
			} else {
				setFavoritesFromLS(favoritesFromLS);
			}
		}
	}, []);

	useEffect(() => {
		if (isAuth) {
			const auth = JSON.parse(localStorage.getItem('auth') as string);
			const cartFromLS = JSON.parse(localStorage.getItem('cart') as string);
			const favoritesFromLS = JSON.parse(
				localStorage.getItem('favorites') as string
			);

			if (cartFromLS && Array.isArray(cartFromLS)) {
				addProductsFromLSToCart({
					jwt: auth.accessToken,
					cartItems: cartFromLS,
				});
			}

			if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
				addProductsFromLSToFavorites({
					jwt: auth.accessToken,
					favoriteItems: favoritesFromLS,
				});
			}
		}
	}, [isAuth]);

	return (
		<header className='header'>
			<div className='container header__container'>
				<button
					className='button-reset header__burger'
					onClick={() => handleOpenModal('menu')}
					aria-label='Открыть менюшку'>
					{translations[lang].header.menu_button}
				</button>
				<Menu />
				<div className='header__logo'>
					<Logo />
				</div>
				<ul className='header__links list-reset'>
					<li className='header__item list-reset'>
						<button
							className='button-reset header__button header__button--search'
							onClick={() => handleOpenModal('search')}
							aria-label='Открыть поиск'
						/>
					</li>
					<li className='header__item'>
						<Link
							href='/favorites'
							className='header__button header__button--favorites'
							aria-label='Открыть избранное'
						/>
					</li>
					<li className='header__item'>
						<CartPopup />
					</li>
					<li className='header__item header__item--profile'>
						{isAuth ? (
							<HeaderProfile />
						) : loginCheckSpinner ? (
							<FontAwesomeIcon icon={faSpinner} spin />
						) : (
							<button
								className='button-reset header__button header__button--profile'
								onClick={handleOpenAuthPopup}
							/>
						)}
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
