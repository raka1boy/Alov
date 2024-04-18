'use client';

import Link from 'next/link';
import Logo from '@/components/elements/Logo/Logo';
import { useLang } from '@/hooks/useLang';
import Menu from './Menu';
import { openMenu, openSearchModal } from '@/context/modal';
import { addOverflowHiddenToBody } from '@/lib/utils/common';
import { TModal } from '@/types/types';
import CartPopup from './CartPopup/CartPopup';

const Header = () => {
	const { lang, translations } = useLang();

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
						<Link
							href='/comparison'
							className='header__button header__button--comparison'
							aria-label='Открыть сравнение'
						/>
					</li>
					<li className='header__item'>
						<CartPopup />
					</li>
					<li className='header__item header__item--profile'>
						<Link
							href='/profile'
							className='header__button header__button--profile'
							aria-label='Открыть личный кабинет'
						/>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
