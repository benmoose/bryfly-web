export interface DomainImage {
  id: string
  index: number
  publicId: string
  secureUrl: string
  resourceType: 'image'
  placeholderUrl: string
  width: number
  height: number
  format: string
  context?: object
}
