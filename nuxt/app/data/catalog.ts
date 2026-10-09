export interface CatalogWheel {
  name: string
  type: 'FORGED' | 'CAST'
  image: string
  crop: string
  colors: string
  shape: string
  series?: string
}
export const catalogWheels: CatalogWheel[] = [
  { name: 'VV1R', type: 'FORGED', image: '8c888', crop: 'silver', colors: '71d4e', shape: 'a8167' },
  { name: 'VS-ML211', type: 'CAST', image: '047c3', crop: 'red', colors: 'b476f', shape: 'ec25d' },
  { name: 'VV1R', type: 'FORGED', image: 'd9af7', crop: 'gold', colors: 'b476f', shape: 'a8167' },
  { name: 'VS-66', type: 'CAST', image: 'a02cf', crop: 'standard', colors: '71d4e', shape: 'cc758' },
  { name: 'VIVE VS-09', type: 'FORGED', image: 'a02cf', crop: 'standard', colors: 'b476f', shape: 'a8167' },
  { name: 'VS-16', type: 'CAST', image: '15b8e', crop: 'standard', colors: 'b476f', shape: 'a8167' },
  { name: 'VXE-73', type: 'FORGED', image: 'bdace', crop: 'wide-low', colors: '71d4e', shape: 'a8167' },
  { name: 'VIVE VS-06', type: 'FORGED', image: 'a412a', crop: 'wide', colors: 'b476f', shape: 'a8167' },
]

// Preview grouping until the production product feed supplies series/fitment metadata.
catalogWheels.forEach((wheel, index) => { wheel.series = ['STREET', 'STREET', 'OFF-ROAD', 'RACING'][index % 4] })
export const catalogAccessories = [
  { name: 'Aluminum Valve Stem', image: 'f55e1', type: 'valve' },
  { name: 'Chrome Lug Nuts & Bolts', image: '2256e', type: 'chrome' },
  { name: 'Zinc Lug Nuts & Bolts', image: '01c7d', type: 'zinc' },
]
