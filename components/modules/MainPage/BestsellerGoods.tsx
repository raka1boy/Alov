import { useUnit } from 'effector-react'
import { getBestsellerProductsFx } from '@/api/main-page'
import { $bestsellerProducts } from '@/context/goods'
import { useLang } from '@/hooks/useLang'
import MainPageSection from './MainPageSection'
import { describe } from 'node:test'

const BestsellerGoods = () => {
	const goods = [{
		_id: 101,
		type: 'lighters',
		category: 'autogen',
		price: 200,
		name: 'abobus',
		description: 'bebra',
		vendorCode: '23232',
		images: ['/img/example.jpg'],
		inStock: '3',
		isBestseller: true,
		isNew: false,
		popularity: '23'
	}]
  const spinner = useUnit(getBestsellerProductsFx.pending)
  const { lang, translations } = useLang()

  return (
    <MainPageSection
      title={translations[lang].main_page.bestsellers_title}
      goods={goods}
      spinner={spinner}
    />
  )
}

export default BestsellerGoods