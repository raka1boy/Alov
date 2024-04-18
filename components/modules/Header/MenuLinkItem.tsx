import { IMenuLinkItemProps } from '@/types/modules';
import Link from 'next/link';

const MenuLinkItem = ({
	item,
	handleRedirectToCatalog,
}: IMenuLinkItemProps) => {
	const onRedirect = () => {
		handleRedirectToCatalog(item.href);
	};
	return (
		<li key={item.id} className='accordion__subitem'>
			<Link
				href={item.href}
				className='accordion__link'
				onClick={onRedirect}
				aria-label='Перейти на товар'>
				{item.text}
			</Link>
		</li>
	);
};

export default MenuLinkItem;
