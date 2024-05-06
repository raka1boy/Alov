import { useUnit } from 'effector-react';
import { getBestsellerProductsFx } from '@/api/main-page';
import { $bestsellerProducts } from '@/context/goods/state';
import { useLang } from '@/hooks/useLang';
import MainPageSection from './MainPageSection';

const BestsellerGoods = () => {
	//const goods = useUnit($bestsellerProducts);
	const goods = [{
		_id: '2323',
		type: 'bebra',
		description: 'bebraa',
		isBestseller: true,
		isNew: false,
		popularity: '21332',
		images: ['/public/img/example.jpg'],
		name: 'bebra',
		price: 2323,
		vendorCode: '232',
		category: 'lighters',
		inStock: '2323'}]
	const spinner = useUnit(getBestsellerProductsFx.pending);
	const { lang, translations } = useLang();

	return (
		<MainPageSection
			title={translations[lang].main_page.bestsellers_title}
			goods={goods}
			spinner={spinner}
		/>
	);
};

export default BestsellerGoods;
