import { closeAuthPopup, openAuthPopup } from '@/context/auth'

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
  addOverflowHiddenToBody()
  openAuthPopup()
}

export const handleCloseAuthPopup = () => {
  removeOverflowHiddenFromBody()
  closeAuthPopup()
}

export const closeAuthPopupWhenSomeModalOpened = (
  showQuickViewModal: boolean,
) => {
  if (showQuickViewModal) {
    closeAuthPopup()
    return
  }
  handleCloseAuthPopup()
}