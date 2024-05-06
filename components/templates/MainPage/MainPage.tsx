'use client';
import { useGate } from 'effector-react';
import Categories from '@/components/modules/MainPage/Categories/Categories';
import Hero from '@/components/modules/MainPage/Hero/Hero';
import { MainPageGate } from '@/context/goods';
import BestsellerGoods from '@/components/modules/MainPage/BestsellerGoods';
import { usePageTitle } from '@/hooks/usePageTitle';

const MainPage = () => {
	useGate(MainPageGate);
	usePageTitle('main');
	return (
		<main>
			<Hero />
			<Categories />
			<BestsellerGoods />
		</main>
	);
};

export default MainPage;
