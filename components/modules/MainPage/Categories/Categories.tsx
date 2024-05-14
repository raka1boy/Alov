'use client';
import Image from 'next/image';
import Link from 'next/link';
import AllLink from '@/components/elements/AllLink/AllLink';
import useImagePreloader from '@/hooks/useImagePreloader';
import { useLang } from '@/hooks/useLang';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import img1 from '@/public/img/lighters/flintLighters.jpg';
import img2 from '@/public/img/lighters/jetFlames.jpg';
import img3 from '@/public/img/lighters/metalFlint.jpg';
import img4 from '@/public/img/lighters/metalJets.jpg';
import img5 from '@/public/img/lighters/metalTurboCharged.jpg';
import img6 from '@/public/img/lighters/piezoFlash.jpg';
import img7 from '@/public/img/lighters/piezoLighters.jpg';
import img8 from '@/public/img/lighters/turboCharged.jpg';
import img9 from '@/public/img/lighters/turboChargedFlashlights.jpg';
import styles from '@/styles/main-page/index.module.scss';
import MainSlider from '../MainSlider';

const Categories = () => {
	const { lang, translations } = useLang();
	const isMedia490 = useMediaQuery(490);
	const { handleLoadingImageComplete, imgSpinner } = useImagePreloader();
	const imgSpinnerClass = imgSpinner ? styles.img_loading : '';

	const images = [
		{ src: img1, id: 1, title: translations[lang].lighters.flintLighters },
		{ src: img2, id: 2, title: translations[lang].lighters.jetFlames },
		{ src: img3, id: 3, title: translations[lang].lighters.metalFlintLights },
		{ src: img4, id: 4, title: translations[lang].lighters.metalJets },
		{
			src: img5,
			id: 5,
			title: translations[lang].lighters.metalTurboChargedLighters,
		},
		{ src: img6, id: 6, title: translations[lang].lighters.piezoFlashlights },
		{ src: img7, id: 7, title: translations[lang].lighters.piezoLighters },
		{
			src: img8,
			id: 8,
			title: translations[lang].lighters.turboChargedLighters,
		},
		{
			src: img9,
			id: 9,
			title: translations[lang].lighters.turboChargedFlashlights,
		},
	];

	return (
		<section className={styles.categories}>
			<div className={`container ${styles.categories__container}`}>
				<h2 className={`site-title ${styles.categories__title}`}>
					{translations[lang].main_page.category_title}
				</h2>
				<div className={styles.categories__inner}>
					<AllLink />
					{!isMedia490 && (
						<div className={`${styles.categories__container}`}>
							<Link
								href='/catalog/lighters?offset=0&type=flintLighters'
								className={`${styles.categories__container__first} ${styles.categories__img} ${imgSpinnerClass}`}>
								<Image
									src={img1}
									alt='Lighters'
									className='transition-opacity opacity-0 duration'
									onLoad={handleLoadingImageComplete}
								/>
								<span>{translations[lang].lighters.flintLighters}</span>
							</Link>
							<Link
								href='/catalog/lighters?offset=0&type=jetFlames'
								className={`${styles.categories__container__second} ${styles.categories__img} ${imgSpinnerClass}`}>
								<Image
									src={img2}
									alt='Lighters'
									className='transition-opacity opacity-0 duration'
									onLoad={handleLoadingImageComplete}
								/>
								<span>{translations[lang].lighters.jetFlames}</span>
							</Link>
							<Link
								href='/catalog/lighters?offset=0&type=metalFlintLights'
								className={`${styles.categories__container__third} ${styles.categories__img} ${imgSpinnerClass}`}>
								<Image
									src={img3}
									alt='Lighters'
									className='transition-opacity opacity-0 duration'
									onLoad={handleLoadingImageComplete}
								/>
								<span>{translations[lang].lighters.metalFlintLights}</span>
							</Link>
							<Link
								href='/catalog/lighters?offset=0&type=metalJets'
								className={`${styles.categories__container__fourth} ${styles.categories__img} ${imgSpinnerClass}`}>
								<Image
									src={img4}
									alt='Lighters'
									className='transition-opacity opacity-0 duration'
									onLoad={handleLoadingImageComplete}
								/>
								<span>{translations[lang].lighters.metalJets}</span>
							</Link>
							<Link
								href='/catalog/lighters?offset=0&type=metalTurboChargedLighters'
								className={`${styles.categories__container__fifth} ${styles.categories__img} ${imgSpinnerClass}`}>
								<Image
									src={img5}
									alt='Lighters'
									className='transition-opacity opacity-0 duration'
									onLoad={handleLoadingImageComplete}
								/>
								<span>
									{translations[lang].lighters.metalTurboChargedLighters}
								</span>
							</Link>
							<Link
								href='/catalog/lighters?offset=0&type=piezoFlashlights'
								className={`${styles.categories__container__sixth} ${styles.categories__img} ${imgSpinnerClass}`}>
								<Image
									src={img6}
									alt='Lighters'
									className='transition-opacity opacity-0 duration'
									onLoad={handleLoadingImageComplete}
								/>
								<span>{translations[lang].lighters.piezoFlashlights}</span>
							</Link>
							<Link
								href='/catalog/lighters?offset=0&type=piezoLighters'
								className={`${styles.categories__container__seventh} ${styles.categories__img} ${imgSpinnerClass}`}>
								<Image
									src={img7}
									alt='Lighters'
									className='transition-opacity opacity-0 duration'
									onLoad={handleLoadingImageComplete}
								/>
								<span>{translations[lang].lighters.piezoLighters}</span>
							</Link>
							<Link
								href='/catalog/lighters?offset=0&type=turboChargedLighters'
								className={`${styles.categories__container__eighth} ${styles.categories__img} ${imgSpinnerClass}`}>
								<Image
									src={img8}
									alt='Lighters'
									className='transition-opacity opacity-0 duration'
									onLoad={handleLoadingImageComplete}
								/>
								<span>
									{translations[lang].lighters.turboChargedLighters}
								</span>
							</Link>
							<Link
								href='/catalog/lighters?offset=0&type=turboChargedFlashlights'
								className={`${styles.categories__container__ninth} ${styles.categories__img} ${imgSpinnerClass}`}>
								<Image
									src={img9}
									alt='Lighters'
									className='transition-opacity opacity-0 duration'
									onLoad={handleLoadingImageComplete}
								/>
								<span>{translations[lang].lighters.turboChargedFlashlights}</span>
							</Link>
						</div>
					)}
					{isMedia490 && <MainSlider images={images} />}
				</div>
			</div>
		</section>
	);
};

export default Categories;
