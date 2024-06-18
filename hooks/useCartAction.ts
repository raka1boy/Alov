import { useUnit } from 'effector-react';
import { useMemo, useState } from 'react';
import { isUserAuth } from '@/lib/utils/common';
import {
	addCartItemToLS,
	addItemToCart,
	addProductToCartBySizeTable,
} from '@/lib/utils/cart';
import { updateCartItemCount } from '@/context/cart';
import { useGoodsByAuth } from './useGoodsByAuth';
import { $currentProduct } from '@/context/goods/state';
import { $cart, $cartFromLs } from '@/context/cart/state';

export const useCartAction = (isSizeTable = false) => {
	const product = useUnit($currentProduct);
	const [selectedSize, setSelectedSize] = useState('');
	const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs);
	const currentCartItems = currentCartByAuth.filter(
		(item) => item.productId === product._id
	);
	const cartItemBySize = currentCartItems.find(
		(item) => item.size === selectedSize
	);
	const existingItem = currentCartByAuth.find(
		(item) => item.productId === product._id && item.size === selectedSize
	);
	const [addToCartSpinner, setAddToCartSpinner] = useState(false);
	const [updateCountSpinner, setUpdateCountSpinner] = useState(false);
	const [count, setCount] = useState(
		+(existingItem?.count as string) ||
			(selectedSize === 'inBlocks' ? 50 : 1000)
	);

	const handleAddToCart = (countFromCounter?: number) => {
		if (existingItem) {
			if (!isUserAuth()) {
				addCartItemToLS(
					product,
					selectedSize,
					countFromCounter || (selectedSize === 'inBlocks' ? 50 : 1000)
				);
				return;
			}

			const auth = JSON.parse(localStorage.getItem('auth') as string);
			const updatedCountWithSize = !!countFromCounter
				? +existingItem.count !== countFromCounter
					? countFromCounter
					: +existingItem.count + (selectedSize === 'inBlocks' ? 50 : 1000)
				: +existingItem.count + (selectedSize === 'inBlocks' ? 50 : 1000);

			updateCartItemCount({
				jwt: auth.accessToken,
				id: existingItem._id as string,
				setSpinner: setUpdateCountSpinner,
				count: selectedSize.length
					? updatedCountWithSize
					: +existingItem.count + (selectedSize === 'inBlocks' ? 50 : 1000),
			});

			addCartItemToLS(
				product,
				selectedSize,
				countFromCounter || (selectedSize === 'inBlocks' ? 50 : 1000)
			);
			return;
		}

		if (isSizeTable) {
			addItemToCart(
				product,
				setAddToCartSpinner,
				countFromCounter || (selectedSize === 'inBlocks' ? 50 : 1000),
				selectedSize
			);
			return;
		}

		addProductToCartBySizeTable(
			product,
			setAddToCartSpinner,
			countFromCounter || (selectedSize === 'inBlocks' ? 50 : 1000),
			selectedSize
		);
	};

	const allCurrentCartItemCount = useMemo(
		() =>
			currentCartItems.reduce((a, { count }) => a + +count, 0) +
			(selectedSize === 'inBlocks' ? 50 : 1000),
		[currentCartItems]
	);

	return {
		product,
		setSelectedSize,
		selectedSize,
		addToCartSpinner,
		currentCartItems,
		cartItemBySize,
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
