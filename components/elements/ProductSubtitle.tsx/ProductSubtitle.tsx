import { useLang } from '@/hooks/useLang';
import { IProductSubtitleProps } from '@/types/elements';

const ProductSubtitle = ({
	subtitleClassName,
	subtitleRectClassName,
}: IProductSubtitleProps) => {
	const { lang, translations } = useLang();
	return (
		<div className={subtitleClassName}>
			<div className={subtitleRectClassName} />
			<span>{translations[lang].main_page.hero_description}</span>
		</div>
	);
};

export default ProductSubtitle;
