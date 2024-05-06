import { closeAuthPopup, openAuthPopup, setIsAuth } from '@/context/auth';
import { loginCheck } from '@/context/user';
import { ICartItem } from '@/types/cart';
import { EventCallable } from 'effector'
import toast from 'react-hot-toast'

export const removeOverflowHiddenFromBody = () => {
	const body = document.querySelector('body') as HTMLBodyElement;
	body.classList.remove('overflow-hidden');
};

export const addOverflowHiddenToBody = (paddingInlineEnd = '') => {
	const body = document.querySelector('body') as HTMLBodyElement;
	body.classList.add('overflow-hidden');
	paddingInlineEnd && (body.style.paddingInlineEnd = paddingInlineEnd);
};

export const getWindowWidth = () => {
	const { innerWidth: windowWidth } =
		typeof window !== 'undefined' ? window : { innerWidth: 0 };
	return { windowWidth };
};

export const handleCloseModal = (closeModalFunc: VoidFunction) => {
	closeModalFunc();
	removeOverflowHiddenFromBody();
};

export const formatPrice = (x: number) =>
	x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const idGenerator = () => {
	const S4 = () =>
		(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	return (
		S4() +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		S4() +
		S4()
	);
};

export const handleOpenAuthPopup = () => {
	addOverflowHiddenToBody();
	openAuthPopup();
};

export const handleCloseAuthPopup = () => {
	removeOverflowHiddenFromBody();
	closeAuthPopup();
};

export const closeAuthPopupWhenSomeModalOpened = (
	showQuickViewModal: boolean
) => {
	if (showQuickViewModal) {
		closeAuthPopup();
		return;
	}
	handleCloseAuthPopup();
};

export const isUserAuth = () => {
	const auth = JSON.parse(localStorage.getItem('auth') as string);

	if (!auth?.accessToken) {
		setIsAuth(false);
		return false;
	}

	return true;
};

export const triggerLoginCheck = () => {
	if (!isUserAuth()) {
		return;
	}

	const auth = JSON.parse(localStorage.getItem('auth') as string);

	loginCheck({ jwt: auth.accessToken });
};

export const isItemInList = (array: ICartItem[], productId: string) =>
	array.some((item) => item.productId === productId);

export const deleteProductFromLS = <T>(
	id: string,
	key: string,
	event: EventCallable<T>,
	setShouldShowEmpty: (arg0: boolean) => void,
	message: string,
	withToast = true
) => {
	let items = JSON.parse(localStorage.getItem(key) as string);

	if (!items) {
		items = [];
	}

	const updatedItems = items.filter(
		(item: { clientId: string }) => item.clientId !== id
	);

	localStorage.setItem(key, JSON.stringify(updatedItems));
	event(updatedItems);
	withToast && toast.success(message);

	if (!updatedItems.length) {
		setShouldShowEmpty(true);
	}
};
