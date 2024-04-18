'use client';
import Link from 'next/link';
import { useLang } from '@/hooks/useLang';

const BuyersListItems = () => {
	const { lang, translations } = useLang();
	return (
		<>
			<li className='accordion__item'>
				<Link
					href='/about'
					className='accordion__title nav-menu__link'
					aria-label='Открыть вкладку "О нас"'>
					{translations[lang].main_menu.about}
				</Link>
			</li>
			<li className='accordion__item'>
				<Link
					href='/blog'
					className='nav-menu__link'
					aria-label='Открыть вкладку "Блог"'>
					{translations[lang].main_menu.blog}
				</Link>
			</li>
			<li className='accordion__item'>
				<Link
					href='/shipping-and-payment'
					className='nav-menu__link'
					aria-label='Открыть вкладку "Доставка и оплата"'>
					{translations[lang].main_menu.shipping}
				</Link>
			</li>
			<li className='accordion__item'>
				<Link
					href='/purchase-returns'
					className='nav-menu__link'
					aria-label='Открыть вкладку "Возврат товара"'>
					{translations[lang].main_menu.returns}
				</Link>
			</li>
		</>
	);
};

export default BuyersListItems;
