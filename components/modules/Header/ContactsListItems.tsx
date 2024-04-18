'use client';
import Link from 'next/link';
import { useLang } from '@/hooks/useLang';

const ContactsListItems = () => {
	const { lang, translations } = useLang();
	return (
		<>
			<li className='accordion__item'>
				<a href='tel:+79119877721' className='accordion__title nav-menu__link'>
					+7 (911) 987 77 21
				</a>
			</li>
			<li className='accordion__item'>
				<a href='mailto:example@gmail.com' className='nav-menu__link'>
					ex@yandex.ru
				</a>
			</li>
			<li className='accordion__item'>
				<Link href='https://t.me/' className='nav-menu__link'>
					{translations[lang].main_menu.tg}
				</Link>
			</li>
			<li className='accordion__item'>
				<Link href='https://vk.com/' className='nav-menu__link'>
					{translations[lang].main_menu.vk}
				</Link>
			</li>
		</>
	);
};

export default ContactsListItems;
