import Link from 'next/link'

const Logo = () => (
  <Link className='logo' href='/'>
    <img className='logo__image' src='/svg/logo.svg' alt='Alov Logo' />
  </Link>
)

export default Logo

