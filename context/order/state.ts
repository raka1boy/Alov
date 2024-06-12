'use client';
import { IOrderDetailsValues, IAlovAddressData } from '@/types/order';
import {
	getAlovOfficesByCityFx,
	order,
	setCashPaymentTb,
	setChosenCourierAddressData,
	setChosenPickupAddressData,
	setCourierAddressData,
	setCourierTab,
	setMapInstance,
	setOnlinePaymentTb,
	setOrderDetailsValues,
	setPickupTab,
	setShouldLoadAlovData,
	setShouldShowCourierAddressData,
} from '.';

export const $alovDataByCity = order
	.createStore<IAlovAddressData[]>([])
	.on(getAlovOfficesByCityFx.done, (_, { result }) => result);

export const $pickupTab = order
	.createStore<boolean>(true)
	.on(setPickupTab, (_, value) => value);

export const $courierTab = order
	.createStore<boolean>(false)
	.on(setCourierTab, (_, value) => value);

export const $mapInstance = order
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	.createStore<any>({})
	.on(setMapInstance, (_, map) => map);

export const $shouldLoadAlovData = order
	.createStore(false)
	.on(setShouldLoadAlovData, (_, value) => value);

export const $chosenPickupAddressData = order
	.createStore<Partial<IAlovAddressData>>({})
	.on(setChosenPickupAddressData, (_, value) => value);

export const $chosenCourierAddressData = order
	.createStore<Partial<IAlovAddressData>>({})
	.on(setChosenCourierAddressData, (_, value) => value);

export const $shouldShowCourierAddressData = order
	.createStore(false)
	.on(setShouldShowCourierAddressData, (_, value) => value);

export const $courierAddressData = order
	.createStore<IAlovAddressData>({} as IAlovAddressData)
	.on(setCourierAddressData, (_, value) => value);

export const $onlinePaymentTab = order
	.createStore<boolean>(true)
	.on(setOnlinePaymentTb, (_, value) => value);

export const $cashPaymentTab = order
	.createStore<boolean>(false)
	.on(setCashPaymentTb, (_, value) => value);

export const $orderDetailsValues = order
	.createStore<IOrderDetailsValues>({} as IOrderDetailsValues)
	.on(setOrderDetailsValues, (_, value) => value);
