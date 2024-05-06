'use client'
import {
  ICatalogCategoryOptions,
} from '@/types/catalog'
import {
  catalog,
  setCatalogCategoryOptions,
  setFiltersPopup,
} from '.'

export const $catalogCategoryOptions = catalog
  .createStore<ICatalogCategoryOptions>({})
  .on(setCatalogCategoryOptions, (_, options) => ({ ...options }))

export const $filtersPopup = catalog
  .createStore(false)
  .on(setFiltersPopup, (_, value) => value)