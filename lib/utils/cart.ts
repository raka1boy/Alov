import toast from 'react-hot-toast';
import { ICartItem } from '@/types/cart';
import { IProduct } from '@/types/common';
import { idGenerator, isUserAuth } from './common';
import {
	addProductToCart,
	setCartFromLS,
	setShouldShowEmpty,
} from '@/context/cart';

export const addItemToCart = (
	product: IProduct,
	setSpinner: (arg0: boolean) => void,
	count: number
) => {
	if (!isUserAuth()) {
		addCartItemToLS(product, count);
		return;
	}

	const auth = JSON.parse(localStorage.getItem('auth') as string);

	const clientId = addCartItemToLS(product, count, false);
	addProductToCart({
		jwt: auth.accessToken,
		setSpinner,
		productId: product._id,
		category: product.category,
		count,
		clientId,
	});
};

export const addCartItemToLS = (
	product: IProduct,
	count: number,
	withToast = true
) => {
	let cartFromLS: ICartItem[] = JSON.parse(
		localStorage.getItem('cart') as string
	);
	const clientId = idGenerator();

	if (!cartFromLS) {
		cartFromLS = [];
	}

	setShouldShowEmpty(false);

	const existingItem = cartFromLS.find(
		(item) => item.productId === product._id
	);

	if (existingItem) {
		const updatedCount =
			existingItem.count !== count ? count : +existingItem.count + 1;
		const updatedCart = cartFromLS.map((item) =>
			item.productId === existingItem.productId
				? {
						...existingItem,
						count: updatedCount,
					}
				: item
		);

		localStorage.setItem('cart', JSON.stringify(updatedCart));
		setCartFromLS(updatedCart);
		toast.success('Добавлено в корзину');
		return existingItem.clientId;
	}

	const cart = [
		...cartFromLS,
		{
			clientId,
			productId: product._id,
			count,
			image: product.images[0],
			name: product.name,
			price: product.price,
			inStock: product.inStock,
			category: product.category,
		},
	];
	localStorage.setItem('cart', JSON.stringify(cart));
	setCartFromLS(cart as ICartItem[]);
	withToast && toast.success('Добавлено в корзину');

	return clientId;
};

export const updateCartItemCountInLS = (cartItemId: string, count: number) => {
	let cart: ICartItem[] = JSON.parse(localStorage.getItem('cart') as string);

	if (!cart) {
		cart = [];
	}
	const updatedCart =
		count !== 0
			? cart.map((item) =>
					item.clientId === cartItemId ? { ...item, count } : item
				)
			: cart.filter((item) => item.clientId !== cartItemId);

	localStorage.setItem('cart', JSON.stringify(updatedCart));
	setCartFromLS(updatedCart as ICartItem[]);
};

export const countWholeCartItemsAmount = (cart: ICartItem[]) =>
	cart.reduce((defaultCount, item) => defaultCount + +item.count, 0);
