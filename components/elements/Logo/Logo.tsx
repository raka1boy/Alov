import Link from 'next/link';

const Logo = () => (
	<Link className='logo' href='/' aria-label='Перейти на главную страницу'>
		<img className='logo__image' src='/svg/logo.svg' alt='Alov Logo' />
	</Link>
);

export default Logo;
