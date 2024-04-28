import { ICatalogMenuButtonProps } from '@/types/modules';

const CatalogMenuButton = ({
	name,
	isActive,
	handler,
}: ICatalogMenuButtonProps) => (
	<button
		className='button-reset catalog-menu__item__btn'
		onClick={handler}
		style={{
			color: isActive ? '#909090' : '#424242',
		}}>
		{name}
	</button>
);

export default CatalogMenuButton;
