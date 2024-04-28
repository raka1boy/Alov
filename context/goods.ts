'use client';
import { Effect, createDomain, sample } from 'effector';
import { Gate, createGate } from 'effector-react';
import { getBestsellerProductsFx, getNewProductsFx } from '@/api/main-page';
import { IProduct } from '@/types/common';

const goods = createDomain();

export const MainPageGate = createGate();

const createGoodsStore = (effect: Effect<void, [], Error>) =>
	goods
		.createStore([])
		.on(effect.done, (_, { result }) => result)
		.on(effect.fail, (_, { error }) => {
			console.error(error.message);
		});

export const setCurrentProduct = goods.createEvent<IProduct>();

const setupGoodsSample = (
	effect: Effect<void, [], Error>,
	gate: Gate<unknown>
) =>
	sample({
		clock: gate.open,
		target: effect,
	});

export const $newProducts = createGoodsStore(getNewProductsFx);
export const $bestsellerProducts = createGoodsStore(getBestsellerProductsFx);

setupGoodsSample(getNewProductsFx, MainPageGate);
setupGoodsSample(getBestsellerProductsFx, MainPageGate);

export const $currentProduct = goods
	.createStore<IProduct>({} as IProduct)
	.on(setCurrentProduct, (_, product) => product)
