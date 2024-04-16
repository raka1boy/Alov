import { $menuIsOpen, closeMenu } from '@/context/modal';
import { useLang } from '@/hooks/useLang';

import { useUnit } from 'effector-react';
import { useState } from 'react';

import { clsx } from 'clsx';

import { AnimatePresence, motion } from 'framer-motion';

import { removeOverflowHiddenFromBody } from '@/lib/utils/common';
import { setLang } from '@/context/lang';
import { AllowedLangs } from '@/constants/lang';
import Logo from '@/components/elements/Logo/Logo';
import Accordion from '../Accordion/Accordion';
import { usePathname } from 'next/navigation';
import MenuLinkItem from './MenuLinkItem';
import { TListName } from '@/types/modules';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import BuyersListItems from './BuyersListItems';
import ContactsListItems from './ContactsListItems';

const Menu = () => {
	const [showCatalogList, setShowCatalogList] = useState<boolean>(false);
	const [showBuyersList, setShowBuyersList] = useState<boolean>(false);
	const [showContactsList, setShowContactsList] = useState<boolean>(false);

	const menuIsOpen = useUnit<boolean>($menuIsOpen);

	const pathName = usePathname();

	const isMedia800 = useMediaQuery(800);
	const isMedia640 = useMediaQuery(640);

	const { lang, translations } = useLang();

	const toggleSwitchLang = (lang: string) => {
		setLang(lang as AllowedLangs);
		localStorage.setItem('lang', JSON.stringify(lang));
	};

	const handleCloseMenu = () => {
		removeOverflowHiddenFromBody();
		closeMenu();
	};

	const handleRedirectToCatalog = (path: string) => {
		if (pathName.includes('/catalog')) {
			window.history.pushState({ path }, '', path);
			window.location.reload();
		}
		handleCloseMenu();
	};

	const handleShowList = (listName: TListName) => {
		setShowCatalogList(listName === 'catalog');
		setShowBuyersList(listName === 'buyers');
		setShowContactsList(listName === 'contacts');
	};

	const lightersLinks = [
		{
			id: 1,
			text: translations[lang].comparison.gasLighter,
			href: '/catalog/lighters?offset=0&type=gas-lighter',
		},
		{
			id: 2,
			text: translations[lang].comparison.petrolLighter,
			href: '/catalog/cloth?offset=0&type=petrol-lighter',
		},
		{
			id: 3,
			text: translations[lang].comparison.electricLighter,
			href: '/catalog/cloth?offset=0&type=electric-lighter',
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
					src={`/img/menu-bg${isMedia800? '-small': ''}.png`}
					alt='background for menu'
				/>
				<button
					className={clsx({
						['button-reset nav-menu__close']: true,
						['open']: menuIsOpen,
					})}
					onClick={handleCloseMenu}
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
						onClick={() => toggleSwitchLang('ru')}>
						RU
					</button>
					<button
						className={clsx({
							['button-reset nav-menu__button']: true,
							['lang-active']: lang === 'en',
						})}
						onClick={() => toggleSwitchLang('en')}>
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
							<button
								className='button-reset list__button'
								onMouseEnter={() => handleShowList('catalog')}>
								{translations[lang].main_menu.catalog}
							</button>
							<AnimatePresence>
								{showCatalogList && (
									<motion.ul
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className='list-reset nav-menu__accordion'>
										<li className='accordion__item'>
											<Accordion
												title={translations[lang].main_menu.lighters}
												titleClass='button-reset accordion__title'>
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
									</motion.ul>
								)}
							</AnimatePresence>
						</li>
					)}
					<li className='nav-menu__item'>
						{!isMedia640 && (
							<button
								className='button-reset list__button'
								onMouseEnter={() => handleShowList('buyers')}>
								{translations[lang].main_menu.buyers}
							</button>
						)}
						{!isMedia640 && (
							<AnimatePresence>
								{showBuyersList && (
									<motion.ul
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className='list-reset nav-menu__accordion'>
										<BuyersListItems />
									</motion.ul>
								)}
							</AnimatePresence>
						)}
						{isMedia640 && (
							<Accordion
								title={translations[lang].main_menu.buyers}
								titleClass='button-reset list__button'>
								<ul className='list-reset accordion__list'>
									<BuyersListItems />
								</ul>
							</Accordion>
						)}
					</li>
					<li className='nav-menu__item'>
						{!isMedia640 && (
							<button
								className='button-reset list__button'
								onMouseEnter={() => handleShowList('contacts')}>
								{translations[lang].main_menu.contacts}
							</button>
						)}
						{!isMedia640 && (
							<AnimatePresence>
								{showContactsList && (
									<motion.ul
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className='list-reset nav-menu__accordion'>
										<ContactsListItems />
									</motion.ul>
								)}
							</AnimatePresence>
						)}
						{isMedia640 && (
							<Accordion
								title={translations[lang].main_menu.contacts}
								titleClass='button-reset list__button'>
								<ul className='list-reset accordion__list'>
									<ContactsListItems />
								</ul>
							</Accordion>
						)}
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Menu;
