export interface IAccordionProps {
	children: React.ReactNode
	title: JSX.Element | string
	titleClass: string
	rotateIconClass?: string
}

export interface IMenuLinkItemProps {
	item: {
		id: number
		text: string
		href: string
	}
	handleRedirectToCatalog: (arg0: string) => void
}

export type TListName = 'catalog' | 'buyers' | 'contacts';