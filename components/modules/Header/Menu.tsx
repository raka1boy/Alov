import { closeMenu } from '@/context/modals';
import { useLang } from '@/hooks/useLang';
import { $menuIsOpen } from '@/context/modals/state';

import { useUnit } from 'effector-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { clsx } from 'clsx';

import { removeOverflowHiddenFromBody } from '@/lib/utils/common';
import { setLang } from '@/context/lang';
import { AllowedLangs } from '@/constants/lang';
import Logo from '@/components/elements/Logo/Logo';
import Accordion from '../Accordion/Accordion';
import { usePathname } from 'next/navigation';
import MenuLinkItem from './MenuLinkItem';
import { TListName } from '@/types/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import BuyersListItems from './BuyersListItems';
import ContactsListItems from './ContactsListItems';

const Menu = () => {
	const [activeListId, setActiveListId] = useState<number>(0);
	const menuIsOpen = useUnit<boolean>($menuIsOpen);

	const pathName = usePathname();

	const isMedia800 = useMediaQuery(800);

	const { lang, translations } = useLang();

	const toggleSwitchLang = (lang: string) => {
		setLang(lang as AllowedLangs);
		localStorage.setItem('lang', JSON.stringify(lang));
	};

	const handleCloseMenu = () => {
		removeOverflowHiddenFromBody();
		closeMenu();
		handleShowList(0);
	};

	const handleRedirectToCatalog = (path: string) => {
		if (pathName.includes('/catalog')) {
			window.history.pushState({ path }, '', path);
			window.location.reload();
		}
		handleCloseMenu();
	};

	const handleShowList = (listId: TListName) => {
		setActiveListId(listId);
	};

	const lightersLinks = [
		{
			id: 1,
			text: translations[lang].lighters.flintLighters,
			href: '/catalog/lighters?offset=0&type=flintLighters',
		},
		{
			id: 2,
			text: translations[lang].lighters.jetFlames,
			href: '/catalog/lighters?offset=0&type=jetFlames',
		},
		{
			id: 3,
			text: translations[lang].lighters.metalFlintLights,
			href: '/catalog/lighters?offset=0&type=metalFlintLights',
		},
		{
			id: 4,
			text: translations[lang].lighters.metalJets,
			href: '/catalog/lighters?offset=0&type=metalJets',
		},
		{
			id: 5,
			text: translations[lang].lighters.metalTurboChargedLighters,
			href: '/catalog/lighters?offset=0&type=metalTurboChargedLighters',
		},
		{
			id: 6,
			text: translations[lang].lighters.piezoLighters,
			href: '/catalog/lighters?offset=0&type=piezoLighters',
		},
		{
			id: 7,
			text: translations[lang].lighters.piezoFlashlights,
			href: '/catalog/lighters?offset=0&type=piezoFlashlights',
		},
		{
			id: 8,
			text: translations[lang].lighters.turboChargedFlashlights,
			href: '/catalog/lighters?offset=0&type=turboChargedFlashlights',
		},
		{
			id: 9,
			text: translations[lang].lighters.turboChargedLighters,
			href: '/catalog/lighters?offset=0&type=turboChargedLighters',
		},
	];

	return (
		<nav
			className={clsx({
				['nav-menu']: true,
				['open']: menuIsOpen,
				['close']: !menuIsOpen,
			})}>
			<div className='container nav-menu__container'>
				<div
					className={clsx({
						['nav-menu__logo']: true,
						['open']: menuIsOpen,
					})}>
					<Logo />
				</div>
				<img
					className={clsx({
						['nav-menu__bg']: true,
						['open']: menuIsOpen,
					})}
					src={`/img/menu-bg${isMedia800 ? '-small' : ''}.png`}
					alt='background for menu'
				/>
				<button
					className={clsx({
						['button-reset nav-menu__close']: true,
						['open']: menuIsOpen,
					})}
					onClick={handleCloseMenu}
					aria-label='Закрыть менюшку'
				/>
				<div
					className={clsx({
						['nav-menu__lang']: true,
						['open']: menuIsOpen,
					})}>
					<button
						className={clsx({
							['button-reset nav-menu__button']: true,
							['lang-active']: lang === 'ru',
						})}
						onClick={() => toggleSwitchLang('ru')}
						aria-label='Поменять язык на русский'>
						RU
					</button>
					<button
						className={clsx({
							['button-reset nav-menu__button']: true,
							['lang-active']: lang === 'en',
						})}
						onClick={() => toggleSwitchLang('en')}
						aria-label='Поменять язык на английский'>
						EN
					</button>
				</div>
				<ul
					className={clsx({
						['list-reset nav-menu__list']: true,
						['open']: menuIsOpen,
					})}>
					{!isMedia800 && (
						<li className='nav-menu__item'>
								<Accordion
									title={translations[lang].main_menu.lighters}
									titleClass='button-reset list__button'>
									<ul className='list-reset accordion__list'>
									{lightersLinks.map((item) => (
											<MenuLinkItem
												key={item.id}
												item={item}
												handleRedirectToCatalog={handleRedirectToCatalog}
											/>
										))}
								</ul>
								</Accordion>
						</li>
					)}
					<li className='nav-menu__item'>
						<Accordion
							title={translations[lang].main_menu.buyers}
							titleClass='button-reset list__button'>
							<ul className='list-reset accordion__list'>
								<BuyersListItems />
							</ul>
						</Accordion>
					</li>
					<li className='nav-menu__item'>
						<Accordion
							title={translations[lang].main_menu.contacts}
							titleClass='button-reset list__button'>
							<ul className='list-reset accordion__list'>
								<ContactsListItems />
							</ul>
						</Accordion>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Menu;
