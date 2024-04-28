import { IAddToCartButtonProps } from '@/types/goods'

const AddToCartButton = ({ text, className }: IAddToCartButtonProps) => (
	<button className={`button-reset ${className}`}>{text}</button>
);
export default AddToCartButton;
