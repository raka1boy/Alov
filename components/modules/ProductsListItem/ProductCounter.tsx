import { updateCartItemCount } from '@/context/cart';
import { updateCartItemCountInLS } from '@/lib/utils/cart';
import { isUserAuth } from '@/lib/utils/common';
import { IProductCounterProps } from '@/types/goods';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const ProductCounter = ({
	className,
	count,
	initialCount,
	totalCount,
	setCount,
	increasePrice,
	decreasePrice,
	cartItem,
	updateCountAsync,
	selectedSize,
}: IProductCounterProps) => {
	const [spinner, setSpinner] = useState(false);
	const [disableIncrease, setDisableIncrease] = useState(false);
	const [disableDecrease, setDisableDecrease] = useState(false);
	const currentTotalCount = +cartItem?.inStock || totalCount;
	const currentInitialCount = +cartItem?.count || initialCount || 1;

	useEffect(() => {
		if (count === (selectedSize === 'inBlocks' ? 50 : 12)) {
			setDisableDecrease(true);
		} else {
			setDisableDecrease(false);
		}

		if (count === currentTotalCount) {
			setDisableIncrease(true);
		} else {
			setDisableIncrease(false);
		}
	}, [count, currentTotalCount]);

	useEffect(() => {
		setCount(currentInitialCount as number);
	}, [currentInitialCount]);

	const updateCountWithRequest = (count: number) => {
		updateCartItemCountInLS(cartItem.clientId, count);

		if (!isUserAuth()) {
			return;
		}

		const auth = JSON.parse(localStorage.getItem('auth') as string);

		updateCartItemCount({
			jwt: auth.accessToken,
			id: cartItem._id,
			setSpinner,
			count,
		});
	};

	const increase = async () => {
		increasePrice && increasePrice();
		setDisableDecrease(false);
		if (selectedSize === 'inBlocks') setCount(count + 50);
		else setCount(count + 12);

		if (updateCountAsync) {
			if (selectedSize === 'inBlocks') updateCountWithRequest(count + 50);
			else updateCountWithRequest(count + 12);
		}
	};

	const decrease = async () => {
		decreasePrice && decreasePrice();
		setDisableIncrease(false);
		if (selectedSize === 'inBlocks') setCount(count - 50);
		else setCount(count - 12);

		if (updateCountAsync) {
			if (selectedSize === 'inBlocks') updateCountWithRequest(count - 50);
			else updateCountWithRequest(count - 12);
		}
	};

	return (
		<div className={className}>
			<button
				className='button-reset'
				onClick={decrease}
				disabled={disableDecrease || spinner}
			/>
			<span>{spinner ? <FontAwesomeIcon icon={faSpinner} spin /> : count}</span>
			<button
				className='button-reset'
				onClick={increase}
				disabled={disableIncrease || spinner}
			/>
		</div>
	);
};
export default ProductCounter;
