import { IBaseEffectProps } from './common'

export interface IFavoriteItem {
  _id: string
  clientId: string
  userId: string
  productId: string
  image: string
  name: string
  price: string
  vendorCode: string
  category: string
  inStock: string
}

export interface IAddProductsFromLSToFavoriteFx {
  jwt: string
  favoriteItems: IFavoriteItem[]
}

export type IDeleteFavoriteItemsFx = IBaseEffectProps