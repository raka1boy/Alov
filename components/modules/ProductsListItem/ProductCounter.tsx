import { IProductCounterProps } from '@/types/goods'

const ProductCounter = ({ className, count }: IProductCounterProps) => (
	<div className={className}>
		<button className='button-reset' />
		<span>{count}</span>
		<button className='button-reset' />
	</div>
);

export default ProductCounter;
