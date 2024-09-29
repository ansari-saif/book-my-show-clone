export type Body_login_login_access_token = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type BookingCreate = {
  booking_time: string
  total_amount: number
  user_id: string
  show_id: string
}

export type BookingDetailCreate = {
  price: number
  booking_id: string
  seat_id: string
}

export type BookingDetailPublic = {
  price: number
  id: string
  booking_id: string
  seat_id: string
}

export type BookingDetailUpdate = {
  price?: number | null
  booking_id?: string | null
  seat_id?: string | null
}

export type BookingDetailsPublic = {
  data: Array<BookingDetailPublic>
  count: number
}

export type BookingPublic = {
  booking_time: string
  total_amount: number
  id: string
  user_id: string
  show_id: string
}

export type BookingUpdate = {
  booking_time?: string | null
  total_amount?: number | null
  user_id?: string | null
  show_id?: string | null
}

export type BookingsPublic = {
  data: Array<BookingPublic>
  count: number
}

export type CastCreate = {
  name: string
  role_in_movie: string
  movie_id: string
}

export type CastPublic = {
  name: string
  role_in_movie: string
  id: string
  movie_id: string
}

export type CastUpdate = {
  name?: string | null
  role_in_movie?: string | null
}

export type CastsPublic = {
  data: Array<CastPublic>
  count: number
}

export type CinemaCategoriesPublic = {
  data: Array<CinemaCategoryPublic>
  count: number
}

export type CinemaCategoryCreate = {
  category_name: string
}

export type CinemaCategoryPublic = {
  category_name: string
  id: string
}

export type CinemaCategoryUpdate = {
  category_name?: string | null
}

export type CinemaCreate = {
  name: string
  address: string
  phone_number?: string | null
  city_id: string
}

export type CinemaPublic = {
  name: string
  address: string
  phone_number?: string | null
  id: string
  city_id: string
}

export type CinemaUpdate = {
  name?: string | null
  address?: string | null
  phone_number?: string | null
}

export type CinemasPublic = {
  data: Array<CinemaPublic>
  count: number
}

export type CitiesPublic = {
  data: Array<CityPublic>
  count: number
}

export type CityCreate = {
  city_name: string
  state: string | null
  country: string | null
}

export type CityPublic = {
  city_name: string
  state: string | null
  country: string | null
  id: string
}

export type CityUpdate = {
  city_name?: string | null
  state?: string | null
  country?: string | null
}

export type CrewCreate = {
  name: string
  role: string
  movie_id: string
}

export type CrewPublic = {
  name: string
  role: string
  id: string
  movie_id: string
}

export type CrewUpdate = {
  name?: string | null
  role?: string | null
}

export type CrewsPublic = {
  data: Array<CrewPublic>
  count: number
}

export type HTTPValidationError = {
  detail?: Array<ValidationError>
}

export type HomePageDataCreate = {
  section_name: string
  movie_ids: Array<string>
}

export type HomePageDataPublic = {
  section_name: string
  movie_ids: Array<string>
  id: string
}

export type HomePageDataUpdate = {
  section_name?: string | null
  movie_ids?: Array<string> | null
}

export type HomePageDatasPublic = {
  data: Array<HomePageDataPublic>
  count: number
}

export type Message = {
  message: string
}

export type MovieCreate = {
  title: string
  genre: string
  duration: number
  description?: string | null
  release_date?: string | null
  rating?: number | null
  is_recommended?: boolean
  you_might_also_like?: Array<string> | null
}

export type MovieFormatCreate = {
  format: string
  language: string
  movie_id: string
}

export type MovieFormatPublic = {
  format: string
  language: string
  id: string
  movie_id: string
}

export type MovieFormatUpdate = {
  format?: string | null
  language?: string | null
}

export type MovieFormatsPublic = {
  data: Array<MovieFormatPublic>
  count: number
}

export type MovieImageCreate = {
  image_url: string
  image_type: string
  movie_id: string
}

export type MovieImagePublic = {
  image_url: string
  image_type: string
  id: string
  movie_id: string
}

export type MovieImageUpdate = {
  image_url?: string | null
  image_type?: string | null
}

export type MovieImagesPublic = {
  data: Array<MovieImagePublic>
  count: number
}

export type MoviePricingCreate = {
  price: number
  movie_id: string
  cinema_id: string
  format_id: string
}

export type MoviePricingPublic = {
  price: number
  id: string
  movie_id: string
  cinema_id: string
  category_id: string
  format_id: string
}

export type MoviePricingUpdate = {
  price?: number | null
  movie_id?: string | null
  cinema_id?: string | null
  category_id?: string | null
  format_id?: string | null
}

export type MoviePricingsPublic = {
  data: Array<MoviePricingPublic>
  count: number
}

export type MoviePublic = {
  title: string
  genre: string
  duration: number
  description?: string | null
  release_date?: string | null
  rating?: number | null
  is_recommended?: boolean
  you_might_also_like?: Array<string> | null
  id: string
}

export type MovieUpdate = {
  title?: string | null
  genre?: string | null
  duration?: number | null
  description?: string | null
  release_date?: string | null
  rating?: number | null
  is_recommended?: boolean | null
  you_might_also_like?: Array<string> | null
}

export type MoviesPublic = {
  data: Array<MoviePublic>
  count: number
}

export type NewPassword = {
  token: string
  new_password: string
}

export type PaymentCreate = {
  payment_method: string
  payment_status: string
  amount_paid: number
  booking_id: string
}

export type PaymentPublic = {
  payment_method: string
  payment_status: string
  amount_paid: number
  id: string
  booking_id: string
}

export type PaymentUpdate = {
  payment_method?: string | null
  payment_status?: string | null
  amount_paid?: number | null
}

export type PaymentsPublic = {
  data: Array<PaymentPublic>
  count: number
}

export type ReviewCreate = {
  rating: number
  review_text?: string | null
  is_top_review?: boolean
  user_id: string
  movie_id: string
}

export type ReviewPublic = {
  rating: number
  review_text?: string | null
  is_top_review?: boolean
  id: string
  user_id: string
  movie_id: string
}

export type ReviewUpdate = {
  rating?: number | null
  review_text?: string | null
  is_top_review?: boolean | null
}

export type ReviewsPublic = {
  data: Array<ReviewPublic>
  count: number
  movie_id: string
}

export type ScreenCreate = {
  screen_name: string
  capacity: number
  cinema_id: string
}

export type ScreenPublic = {
  screen_name: string
  capacity: number
  id: string
  cinema_id: string
}

export type ScreenUpdate = {
  screen_name?: string | null
  capacity?: number | null
}

export type ScreensPublic = {
  data: Array<ScreenPublic>
  count: number
}

export type SeatCreate = {
  seat_number: string
  seat_type: string
  is_available?: boolean
  screen_id: string
}

export type SeatPublic = {
  seat_number: string
  seat_type: string
  is_available?: boolean
  id: string
  screen_id: string
}

export type SeatUpdate = {
  seat_number?: string | null
  seat_type?: string | null
  is_available?: boolean | null
}

export type SeatsPublic = {
  data: Array<SeatPublic>
  count: number
}

export type ShowCreate = {
  show_time: string
  movie_id: string
  screen_id: string
}

export type ShowPublic = {
  show_time: string
  id: string
  movie_id: string
  screen_id: string
}

export type ShowUpdate = {
  show_time?: string | null
  movie_id?: string | null
  screen_id?: string | null
}

export type ShowsPublic = {
  data: Array<ShowPublic>
  count: number
}

export type Token = {
  access_token: string
  token_type?: string
}

export type UpdatePassword = {
  current_password: string
  new_password: string
}

export type UserCreate = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  mobile?: string | null
  password: string
}

export type UserPublic = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  mobile?: string | null
  id: string
}

export type UserRegister = {
  email: string
  password: string
  full_name?: string | null
}

export type UserUpdate = {
  email?: string | null
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  mobile?: string | null
  password?: string | null
}

export type UserUpdateMe = {
  full_name?: string | null
  email?: string | null
}

export type UsersPublic = {
  data: Array<UserPublic>
  count: number
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}
