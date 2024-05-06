'use client';
import { createDomain } from 'effector';
import { ICatalogCategoryOptions } from '@/types/catalog';

export const catalog = createDomain();

export const setCatalogCategoryOptions =
	catalog.createEvent<Partial<ICatalogCategoryOptions>>();
export const updateSizesOptionBySize = catalog.createEvent<string>();
export const updateColorsOptionByCode = catalog.createEvent<string>();
export const setColors = catalog.createEvent<string[]>();
export const setSizes = catalog.createEvent<string[]>();
export const setFiltersPopup = catalog.createEvent<boolean>();
