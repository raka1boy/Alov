import Image from 'next/image';
import { useLang } from '@/hooks/useLang';
import { formatPrice } from '@/lib/utils/common';
import { IOrderCartItemProps } from '@/types/order';
import styles from '@/styles/order/index.module.scss';

const OrderCartItemTable = ({ item, position }: IOrderCartItemProps) => {
	const { lang, translations } = useLang();

	return (
		<tr>
			<td className={styles.order__list__item__table__name}>
				<span>{position}.</span>
				<Image src={item.image} alt={item.name} width={109} height={109} />
				<span>{item.name}</span>
			</td>
			<td className={styles.order__list__item__table__block}>
				<span>
					{item.size.toUpperCase() === 'INBLOCKS' ? 'По блочно' : 'По коробкам'}
				</span>
			</td>
			<td className={styles.order__list__item__table__block}>
				<span>
					{
						(translations[lang].catalog as { [index: string]: string })[
							item.color
						]
					}
				</span>
			</td>
			<td className={styles.order__list__item__table__block}>
				<span>{item.count} шт.</span>
			</td>
			<td className={styles.order__list__item__table__block}>
				<span>{formatPrice(+item.price * +item.count)} ₽</span>
			</td>
		</tr>
	);
};

export default OrderCartItemTable;
