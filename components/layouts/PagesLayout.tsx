'use client';
import { useUnit } from 'effector-react';
import { Toaster } from 'react-hot-toast';
import { EarthoOneProvider } from '@eartho/one-client-react';
import { Next13ProgressBar } from 'next13-progressbar';
import { $showQuickViewModal } from '@/context/modals/state';
import { closeQuickViewModal } from '@/context/modals';
import Layout from './Layout';
import {
	handleCloseAuthPopup,
	removeOverflowHiddenFromBody,
} from '@/lib/utils/common';
import { $openAuthPopup } from '@/context/auth/state';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CookieAlert from '../modules/CookieAlert/CookieAlert';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	const [isClient, setIsClient] = useState(false);
	const [cookieAlertOpen, setCookieAlertOpen] = useState(false);
	const showQuickViewModal = useUnit($showQuickViewModal);
	const openAuthPopup = useUnit($openAuthPopup);

	useEffect(() => setIsClient(true), []);

	const handleCloseQuickViewModal = () => {
		removeOverflowHiddenFromBody();
		closeQuickViewModal();
	};

	useEffect(() => {
		const checkCookie = document.cookie.indexOf('CookieBy=Alov');
		checkCookie != -1
			? setCookieAlertOpen(false)
			: setTimeout(() => setCookieAlertOpen(true), 3000);
	}, []);

	return (
		<>
			{isClient ? (
				<EarthoOneProvider
					domain={`${process.env.NEXT_PUBLIC_OAUTH_DOMAIN}`}
					clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`}>
					<html lang='ru'>
						<body>
							<Next13ProgressBar height='4px' color='#f9932c' showOnShallow />
							<Layout>{children}</Layout>
							<div
								className={`quick-view-modal-overlay ${
									showQuickViewModal ? 'overlay-active' : ''
								}`}
								onClick={handleCloseQuickViewModal}
							/>
							<div
								className={`auth-overlay ${
									openAuthPopup ? 'overlay-active' : ''
								}`}
								onClick={handleCloseAuthPopup}
							/>
							{cookieAlertOpen && (
								<motion.div
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5 }}
									className='cookie-popup'>
									<CookieAlert setCookieAlertOpen={setCookieAlertOpen} />
								</motion.div>
							)}
							<Toaster position='top-center' reverseOrder={false} />
						</body>
					</html>
				</EarthoOneProvider>
			) : (
				<html lang='ru'>
					<body>
						<></>
					</body>
				</html>
			)}
		</>
	);
};

export default PagesLayout;
