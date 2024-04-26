export interface IProductSubtitleProps {
  subtitleClassName?: string
  subtitleRectClassName?: string
}

export interface IProductItemActionButtonProps {
  text: string
  iconClass: string
  spinner?: boolean
  callback?: VoidFunction
  withTooltip?: boolean
  marginBottom?: number
}

export interface IProductAvailableProps {
	vendorCode: string
	inStock: number
}