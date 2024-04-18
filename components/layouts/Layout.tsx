'use client';
import { useUnit } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx'
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Header from '../modules/Header/Header';
import MobileNavbar from '../modules/MobileNavbar/MobileNavbar';
import SearchModal from '../modules/Header/SearchModal';
import { $searchModalIsOpen, closeSearchModal } from '@/context/modal';
import { handleCloseModal } from '@/lib/utils/common'
import Footer from '../modules/Footer/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const isMedia800 = useMediaQuery(800);
	const searchModal = useUnit($searchModalIsOpen);

	return (
		<>
			<Header />
			{children}
			{isMedia800 && <MobileNavbar />}
			<AnimatePresence>
				{searchModal && (
					<motion.div
						initial={{ opacity: 0, zIndex: 102 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}>
						<SearchModal />
					</motion.div>
				)}
			</AnimatePresence>
			<div
				className={clsx({
					['header__search-overlay']: true,
					['overlay-active']: searchModal,
				})}
				onClick={() => handleCloseModal(closeSearchModal)}
			/>
			<Footer/>
		</>
	);
};

export default Layout;
