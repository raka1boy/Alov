'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { closeCatalogMenu } from '@/context/modals';
import { $catalogMenuIsOpen } from '@/context/modals/state';
import { useLang } from '@/hooks/useLang';
import { useMenuAnimation } from '@/hooks/useMenuAnimation';
import Header from './Header';
import { removeOverflowHiddenFromBody } from '@/lib/utils/common';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CatalogMenuButton from './CatalogMenuButton';
import CatalogMenuList from './CatalogMenuList';
import Accordion from '../Accordion/Accordion';
import Link from 'next/link';

const CatalogMenu = () => {
	const catalogMenuIsOpen = useUnit($catalogMenuIsOpen);
	const [activeListId, setActiveListId] = useState<number>(0);
	const { lang, translations } = useLang();
	const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(
		2,
		catalogMenuIsOpen
	);

	const isMedia450 = useMediaQuery(450);

	const handleCloseMenu = (): void => {
		removeOverflowHiddenFromBody();
		closeCatalogMenu();
		setActiveListId(0);
	};

	const isActiveList = (id: number): boolean => {
		return activeListId === id;
	};

	const items = [
		{
			name: translations[lang].main_menu.lighters,
			id: 1,
			items: [
				translations[lang].comparison.flintLighters,
				translations[lang].comparison.jetFlames,
				translations[lang].comparison.metalFlintLights,
				translations[lang].comparison.metalJets,
				translations[lang].comparison.metalTurboChargedLighters,
				translations[lang].comparison.piezoFlashlights,
				translations[lang].comparison.turboChargedFlashlights,
				translations[lang].comparison.turboChargedLighters,
			],
			handler: () => setActiveListId(1),
		},
	];

	return (
		<div className='catalog-menu' style={{ zIndex: popupZIndex }}>
			<AnimatePresence>
				{catalogMenuIsOpen && (
					<motion.aside
						initial={{ inlineSize: 0 }}
						animate={{
							inlineSize: '100%',
						}}
						exit={{
							inlineSize: 0,
							transition: { delay: 0.7, duration: 0.3 },
						}}
						className='catalog-menu__aside'>
						<div className='catalog-menu__header'>
							<Header />
						</div>
						<motion.div
							className='catalog-menu__inner'
							initial='closed'
							animate='open'
							exit='closed'
							variants={sideVariants}>
							<motion.button
								className='button-reset catalog-menu__close'
								variants={itemVariants}
								onClick={handleCloseMenu}
							/>
							<motion.h2
								variants={itemVariants}
								className='catalog-menu__title'>
								{translations[lang].main_menu.catalog}
							</motion.h2>
							<ul className='list-reset catalog-menu__list'>
								{items.map(({ id, name, items, handler }) => {
									const buttonProps = (isActive: boolean) => ({
										handler: handler as VoidFunction,
										name,
										isActive,
									});

									const isCurrentList = (
										showList: boolean,
										currentId: number
									) => showList && id === currentId;

									return (
										<motion.li
											key={id}
											variants={itemVariants}
											className='catalog-menu__list__item'>
											{!isMedia450 && (
												<>
													{id === 1 && (
														<CatalogMenuButton
															{...buttonProps(isActiveList(1))}
														/>
													)}
												</>
											)}
											{!isMedia450 && (
												<AnimatePresence>
													{isCurrentList(isActiveList(1), 1) && (
														<CatalogMenuList items={items} />
													)}
												</AnimatePresence>
											)}
											{isMedia450 && (
												<Accordion
													title={name}
													titleClass='button-reset accordion__title'>
													<ul className='list-reset catalog__accordion__list'>
														{items.map((title, i) => (
															<li
																key={i}
																className='catalog__accordion__list__item'>
																<Link
																	href='/catalog'
																	className='accordion__link'>
																	{title}
																</Link>
															</li>
														))}
													</ul>
												</Accordion>
											)}
										</motion.li>
									);
								})}
							</ul>
						</motion.div>
					</motion.aside>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CatalogMenu;
