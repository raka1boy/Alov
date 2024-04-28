import type { Metadata } from 'next';
import PagesLayout from '@/components/layouts/PagesLayout';
import './globalStyles/normalize.css';
import './globalStyles/globals.css';
import './globalStyles/header.css';
import './globalStyles/menu.css';
import './globalStyles/mobile-navbar.css';
import './globalStyles/catalog-menu.css';
import './globalStyles/search-modal.css';
import './globalStyles/cart-popup.css';
import './globalStyles/slick-theme.css';
import './globalStyles/slick.css';
import './globalStyles/auth-popup.css'
import './globalStyles/footer.css';

export const metadata: Metadata = {
	title: 'Alov — Магазин зажигалок',
	description: 'Самый крупный поставщик в России',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <PagesLayout>{children}</PagesLayout>;
}
