import { closeSearchModal } from '@/context/modal';
import { useLang } from '@/hooks/useLang';
import { handleCloseModal } from '@/lib/utils/common';

const SearchModal = () => {
	const { lang, translations } = useLang();

	const handleInputFocus = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
	) => {
		e.target.classList.add('with_value');
	};

	const handleInputBlur = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
	) => {
		if (e.target.value) {
			return;
		}
		e.target.classList.remove('with_value');
	};

	return (
		<div className='search-modal'>
			<button
				className='button-reset search-modal__close'
				onClick={() => handleCloseModal(closeSearchModal)}
			/>
			<h3 className='search-modal__title'>
				{translations[lang].header.search_products}
			</h3>
			<div className='search-modal__top'>
				<label className='search-modal__label'>
					<input type='text' className='search-modal__input' onFocus={handleInputFocus} onBlur={handleInputBlur}/>
					<span className='search-modal__floating-label'>
						{translations[lang].header.search_infos}
					</span>
				</label>
			</div>
		</div>
	);
};

export default SearchModal;
