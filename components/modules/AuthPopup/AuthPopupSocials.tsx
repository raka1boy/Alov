import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGithub,
	faGoogle,
	faVk,
	faYandex,
} from '@fortawesome/free-brands-svg-icons';

const AuthPopupSocials = ({
	handleSignupWithOAuth,
}: {
	handleSignupWithOAuth: VoidFunction;
}) => (
	<div className='cart-body__socials'>
		<button
			className='button-reset socials__btn gh-color'
			onClick={handleSignupWithOAuth}>
			<FontAwesomeIcon icon={faGithub} />
		</button>
		<button
			className='button-reset socials__btn g-color'
			onClick={handleSignupWithOAuth}>
			<FontAwesomeIcon icon={faGoogle} />
		</button>
		<button
			className='button-reset socials__btn y-color'
			onClick={handleSignupWithOAuth}>
			<FontAwesomeIcon icon={faYandex} />
		</button>
		<button
			className='button-reset socials__btn vk-color'
			onClick={handleSignupWithOAuth}>
			<FontAwesomeIcon icon={faVk} />
		</button>
	</div>
);

export default AuthPopupSocials;
