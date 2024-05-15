import { useUnit } from 'effector-react'
import { useLang } from '@/hooks/useLang'
import MainPageSection from './MainPageSection'
import { $bestsellerProducts } from '@/context/goods/state'
import { getBestsellerProductsFx } from '@/context/goods'

const BestsellerGoods = () => {
	// const goods = useUnit($bestsellerProducts);
	const goods = [
    {
        _id: '1',
        type: 'jetFlame',
        category: 'lighters',
        collection: 'jetFlames',
        price: 12.99,
        name: 'Product1',
        description: 'Description for Product1',
        characteristics: { color: 'yellow', size: 'M' },
        images: ['https://lh3.googleusercontent.com/a/ACg8ocJkXZB5zjxMxdQM5FmxXlJFhhNtKJqInvyJQRpcN3DsLkVGdZT3=s83-c-mo'],
        vendorCode: 'V1234',
        inStock: '10',
        isBestseller: true,
        isNew: false,
        sizes: {inBlocks: true, inBoxes: true},
        popularity: 100
    },
    {
        _id: '2',
        type: 'lighters',
        category: 'jetFlames',
        collection: 'Collection2',
        price: 24.99,
        name: 'Product2',
        description: 'Description for Product2',
        characteristics: { color: 'yellow', size: 'L' },
        images: ['https://lh3.googleusercontent.com/a/ACg8ocJkXZB5zjxMxdQM5FmxXlJFhhNtKJqInvyJQRpcN3DsLkVGdZT3=s83-c-mo'],
        vendorCode: 'V5678',
        inStock: '5',
        isBestseller: true,
        isNew: true,
        sizes: {inBlocks: true, inBoxes: true},
        popularity: 150
    }
];
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
