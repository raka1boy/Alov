import Link from 'next/link';
import { forwardRef } from 'react';
import { withClickOutside } from '@/components/hocs/withClickOutside';
import { IWrappedComponentProps } from '@/types/hocs';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const { lang, translations } = useLang();
		const toggleShowPopup = (value: boolean) => {
			setOpen(value);
		};
		return (
			<div className='cart-popup' ref={ref}>
				<ul className='list-reset cart-popup__cart-list'>
					<li className='header__item'>
						<Link
							href='/cart'
							className='header__button header__button--cart'
							aria-label='Открыть корзину'
							onMouseEnter={() => toggleShowPopup(true)}
						/>
						<AnimatePresence>
							{open && (
								<motion.div
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0 }}
									className='cart-popup__wrapper'
									onMouseLeave={() => toggleShowPopup(false)}>
									<span className='cart-popup__arrow' />
									<button
										className='button-reset cart-popup__close'
										onClick={() => toggleShowPopup(false)}
									/>
									<h3 className='cart-popup__title'>
										{translations[lang].breadcrumbs.cart}
									</h3>
									<ul className='list-reset cart-popup__cart-list'>
										<li className='cart-popup__cart-list__empty-cart' />
									</ul>
									<div className='cart-popup__footer'>
										<div className='cart-popup__footer__inner'>
											<span>{translations[lang].common.order_price}:</span>
											<span>0 Bebra Coin</span>
										</div>
										<Link href='/order' className='cart-popup__footer__link'>
											{translations[lang].order.make_order}
										</Link>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</li>
				</ul>
			</div>
		);
	}
);

CartPopup.displayName = 'CartPopup';

export default withClickOutside(CartPopup);
