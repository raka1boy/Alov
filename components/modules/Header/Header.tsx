'use client';
import Logo from '@/components/elements/Logo/Logo';
import Link from 'next/link';
import { useLang } from '@/hooks/useLang';
import Menu from './Menu';
import { openMenu } from '@/context/modal';
import { addOverflowHiddenFromBody } from '@/lib/utils/common';

const Header = () => {
	const { lang, translations } = useLang();

	const handleOpenMenu = () => {
		addOverflowHiddenFromBody();
		openMenu();
	};

	return (
		<header className='header'>
			<div className='container header__container'>
				<button
					className='button-reset header__burger'
					onClick={handleOpenMenu}>
					{translations[lang].header.menu_button}
				</button>
				<Menu />
				<div className='header__logo'>
					<Logo />
				</div>
				<ul className='header__links list-reset'>
					<li className='header__item list-reset'>
						<button className='button-reset header__button header__button--search' />
					</li>
					<li className='header__item'>
						<Link
							href='/favorites'
							className='header__button header__button--favorites'
						/>
					</li>
					<li className='header__item'>
						<Link
							href='/comparison'
							className='header__button header__button--comparison'
						/>
					</li>
					<li className='header__item'>
						<Link
							href='/cart'
							className='header__button header__button--cart'
						/>
					</li>
					<li className='header__item header__item--profile'>
						<Link
							href='/profile'
							className='header__button header__button--profile'
						/>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
