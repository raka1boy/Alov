export type TListName = 1 | 2 | 3 | 0

export type TAction = 'openMenu' | 'openCatalogMenu';

export type TModal = 'menu' | 'search';

export interface IUserGeolocation {
  features: [
    {
      properties: {
        city: string
        lon: number
        lat: number
      }
      bbox: [number, number, number, number]
    },
  ]
}