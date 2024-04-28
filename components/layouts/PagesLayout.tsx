'use client';
import { Toaster } from 'react-hot-toast';
import { useUnit } from 'effector-react';
import { $showQuickViewModal, closeQuickViewModal } from '@/context/modal';
import Layout from './Layout';
import clsx from 'clsx';
import {
	handleCloseAuthPopup,
	removeOverflowHiddenFromBody,
} from '@/lib/utils/common';
import { $openAuthPopup } from '@/context/auth';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	const showQuickViewModal = useUnit($showQuickViewModal);
	const openAuthPopup = useUnit($openAuthPopup);
	const handleCloseQuickViewModal = () => {
		removeOverflowHiddenFromBody();
		closeQuickViewModal();
	};
	return (
		<html lang='ru'>
			<body>
				<Layout>{children}</Layout>
				<div
					className={clsx({
						[`quick-view-modal-overlay`]: true,
						[`overlay-active`]: showQuickViewModal,
					})}
					onClick={handleCloseQuickViewModal}
				/>
				<div
					className={clsx({
						[`auth-overlay`]: true,
						[`overlay-active`]: openAuthPopup,
					})}
					onClick={handleCloseAuthPopup}
				/>
				<Toaster position='top-center' reverseOrder={false} />
			</body>
		</html>
	);
};

export default PagesLayout;
