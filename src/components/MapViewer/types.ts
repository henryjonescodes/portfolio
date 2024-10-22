export type MapViewerProps = {
  currentKey: LocationPinKeys
  setCurrentKey: React.Dispatch<React.SetStateAction<LocationPinKeys | null>>
}

export type PointOfInterest = {
  prefix: string
  title: string
  description: string
  mapTitle: string
  mapHighlights: {
    icon: string,
    text: string
  }[]
  className: string
  pinClassName: string
}

const keys = ['portland', 'paloAlto', 'nyc', 'schenectady'] as const
export type LocationPinKeys = (typeof keys)[number]