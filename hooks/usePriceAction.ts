import { useEffect, useState } from 'react';

export const usePriceAction = (count: number, initialPrice: number) => {
  const [price, setPrice] = useState(initialPrice);

  useEffect(() => {
    setPrice(initialPrice * count);
  }, [count]);

  const increasePrice = () => setPrice((prevPrice) => prevPrice + initialPrice);
  const decreasePrice = () => setPrice((prevPrice) => prevPrice - initialPrice);

  return { price, increasePrice, decreasePrice };
};
