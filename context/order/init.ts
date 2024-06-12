import { sample } from 'effector';
import {
	getAlovOfficesByCity,
	getAlovOfficesByCityFx,
	makePayment,
	makePaymentFx,
} from '.';

sample({
	clock: getAlovOfficesByCity,
	source: {},
	fn: (_, data) => data,
	target: getAlovOfficesByCityFx,
});

sample({
	clock: makePayment,
	source: {},
	fn: (_, data) => data,
	target: makePaymentFx,
});
