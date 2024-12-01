export interface DomainImage {
  id: string
  publicId: string
  secureUrl: string
  resourceType: 'image'
  placeholderUrl: string
  width: number
  height: number
  format: string
  createdAt: string
  context?: object
}

export interface DomainImageIterable extends DomainImage {
  index: number
}
