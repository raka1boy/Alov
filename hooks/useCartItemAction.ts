import { useState } from 'react';
import { ICartItem } from '@/types/cart';
import { usePriceAction } from './usePriceAction';
import { usePriceAnimation } from './usePriceAnimation';
import { deleteProductFromLS, isUserAuth } from '@/lib/utils/common';
import {
	deleteProductFromCart,
	setCartFromLS,
	setShouldShowEmpty,
} from '@/context/cart';

export const useCartItemAction = (cartItem: ICartItem) => {
	const [deleteSpinner, setDeleteSpinner] = useState(false);
	const [count, setCount] = useState(+cartItem.count);
	const { price, increasePrice, decreasePrice } = usePriceAction(
		+cartItem.count,
		+cartItem.price
	);
	const {
		setFrom,
		setTo,
		value: animatedPrice,
	} = usePriceAnimation(+cartItem.price, +cartItem.price * +cartItem.count);

	const increasePriceWithAnimation = () => {
		increasePrice();
		setFrom(price);
		setTo(price + +cartItem.price * (cartItem.size === 'inBlocks' ? 50 : 1000));
	};

	const decreasePriceWithAnimation = () => {
		decreasePrice();
		setFrom(price);
		setTo(price - +cartItem.price * (cartItem.size === 'inBlocks' ? 50 : 1000));
	};

	const handleDeleteCartItem = () => {
		if (!isUserAuth()) {
			deleteProductFromLS(
				cartItem.clientId,
				'cart',
				setCartFromLS,
				setShouldShowEmpty,
				'Удалено из корзины!'
			);
			return;
		}

		const auth = JSON.parse(localStorage.getItem('auth') as string);

		deleteProductFromLS(
			cartItem.clientId,
			'cart',
			setCartFromLS,
			setShouldShowEmpty,
			'',
			false
		);
		deleteProductFromCart({
			jwt: auth.accessToken,
			id: cartItem._id,
			setSpinner: setDeleteSpinner,
		});
	};

	return {
		deleteSpinner,
		price,
		count,
		setCount,
		increasePrice,
		decreasePrice,
		increasePriceWithAnimation,
		decreasePriceWithAnimation,
		setFrom,
		setTo,
		animatedPrice,
		handleDeleteCartItem,
	};
};
