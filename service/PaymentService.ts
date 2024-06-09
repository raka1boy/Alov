import axios from 'axios';

const PAYMENT_API_URL = '/api/payment';

interface PaymentResponse {
  confirmation_url: string;
}

export const createPayment = async (amount: number): Promise<PaymentResponse> => {
  const response = await axios.post(PAYMENT_API_URL, { amount });
  return response.data;
};
