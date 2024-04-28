export interface IProduct {
	_id: number
	type: string
	category: string
	price: number
	name: string
	description: string
	vendorCode: string
	images: string[]
	inStock: string
	isBestseller: boolean
	isNew: boolean
	popularity: string
	errorMessage?: string
}

export interface IBaseEffectProps {
  jwt: string
  id: string
  setSpinner: (arg0: boolean) => void
}