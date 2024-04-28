import { useUnit } from 'effector-react';
import { $showQuickViewModal } from '@/context/modal';
import { closeAuthPopupWhenSomeModalOpened } from '@/lib/utils/common';

const AuthPopupClose = () => {
	const showQuickViewModal = useUnit($showQuickViewModal);

	const closePopup = () =>
		closeAuthPopupWhenSomeModalOpened(showQuickViewModal);

	return (
		<button className='button-reset auth-popup__close' onClick={closePopup} />
	);
};

export default AuthPopupClose;
