import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAddToCartButtonProps } from '@/types/goods';

const AddToCartButton = ({
	handleAddToCart,
	addToCartSpinner,
	text,
	btnDisabled = false,
	className,
}: IAddToCartButtonProps) => (
	<button
		className={`button-reset ${className}`}
		disabled={btnDisabled}
		onClick={handleAddToCart}>
		{addToCartSpinner ? (
			<FontAwesomeIcon icon={faSpinner} spin color='#000' />
		) : (
			text
		)}
	</button>
);

export default AddToCartButton;
