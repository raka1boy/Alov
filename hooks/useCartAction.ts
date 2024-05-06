import { useUnit } from 'effector-react';
import { useMemo, useState } from 'react';
import { isUserAuth } from '@/lib/utils/common';
import { addCartItemToLS, addItemToCart } from '@/lib/utils/cart';
import { updateCartItemCount } from '@/context/cart';
import { useGoodsByAuth } from './useGoodsByAuth';
import { $currentProduct } from '@/context/goods/state';
import { $cart, $cartFromLs } from '@/context/cart/state';

export const useCartAction = () => {
	const product = useUnit($currentProduct);
	const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs);
	const currentCartItems = currentCartByAuth.filter(
		(item) => item.productId === product._id
	);
	const existingItem = currentCartByAuth.find(
		(item) => item.productId === product._id
	);
	const [addToCartSpinner, setAddToCartSpinner] = useState(false);
	const [updateCountSpinner, setUpdateCountSpinner] = useState(false);
	const [count, setCount] = useState(+(existingItem?.count as string) || 1);

	const handleAddToCart = (countFromCounter?: number) => {
		if (existingItem) {
			if (!isUserAuth()) {
				addCartItemToLS(product, countFromCounter || 1);
				return;
			}

			const auth = JSON.parse(localStorage.getItem('auth') as string);
			const updatedCountWithSize = !!countFromCounter
				? +existingItem.count !== countFromCounter
					? countFromCounter
					: +existingItem.count + 1
				: +existingItem.count + 1;

			updateCartItemCount({
				jwt: auth.accessToken,
				id: existingItem._id as string,
				setSpinner: setUpdateCountSpinner,
				count: updatedCountWithSize,
			});

			addCartItemToLS(product, countFromCounter || 1);
			return;
		}
	};

	const allCurrentCartItemCount = useMemo(
		() => currentCartItems.reduce((a, { count }) => a + +count, 0),
		[currentCartItems]
	);

	return {
		product,
		addToCartSpinner,
		currentCartItems,
		handleAddToCart,
		setCount,
		count,
		existingItem,
		currentCartByAuth,
		setAddToCartSpinner,
		updateCountSpinner,
		allCurrentCartItemCount,
	};
};
