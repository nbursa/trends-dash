export interface Location {
  id: number
  name: string
  location_name: string
  image: string | null
  location_image: string | null
  primary_phone: string
  address: string | null
  city: string | null
  state: string | null
  zip: string | null
  zip_code: string | null
  country: string | null
  review_count: number
  ave_review_rating: number | null
  map_url: string | null
  website_url: string | null
}
