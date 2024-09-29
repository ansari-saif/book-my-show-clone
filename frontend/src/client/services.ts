import type { CancelablePromise } from "./core/CancelablePromise"
import { OpenAPI } from "./core/OpenAPI"
import { request as __request } from "./core/request"

import type {
  Body_login_login_access_token,
  Message,
  NewPassword,
  Token,
  UserPublic,
  UpdatePassword,
  UserCreate,
  UserRegister,
  UsersPublic,
  UserUpdate,
  UserUpdateMe,
  MovieCreate,
  MoviePublic,
  MoviesPublic,
  MovieUpdate,
  MovieFormatCreate,
  MovieFormatPublic,
  MovieFormatsPublic,
  MovieFormatUpdate,
  MovieImageCreate,
  MovieImagePublic,
  MovieImagesPublic,
  MovieImageUpdate,
  HomePageDataCreate,
  HomePageDataPublic,
  HomePageDatasPublic,
  HomePageDataUpdate,
  CitiesPublic,
  CityCreate,
  CityPublic,
  CityUpdate,
  CinemaCreate,
  CinemaPublic,
  CinemasPublic,
  CinemaUpdate,
  CinemaCategoriesPublic,
  CinemaCategoryCreate,
  CinemaCategoryPublic,
  CinemaCategoryUpdate,
  ScreenCreate,
  ScreenPublic,
  ScreensPublic,
  ScreenUpdate,
  SeatCreate,
  SeatPublic,
  SeatsPublic,
  SeatUpdate,
  ShowCreate,
  ShowPublic,
  ShowsPublic,
  ShowUpdate,
  MoviePricingCreate,
  MoviePricingPublic,
  MoviePricingsPublic,
  MoviePricingUpdate,
  CrewCreate,
  CrewPublic,
  CrewsPublic,
  CrewUpdate,
  CastCreate,
  CastPublic,
  CastsPublic,
  CastUpdate,
  ReviewCreate,
  ReviewPublic,
  ReviewsPublic,
  ReviewUpdate,
  BookingCreate,
  BookingPublic,
  BookingsPublic,
  BookingUpdate,
  BookingDetailCreate,
  BookingDetailPublic,
  BookingDetailsPublic,
  BookingDetailUpdate,
  PaymentCreate,
  PaymentPublic,
  PaymentsPublic,
  PaymentUpdate,
} from "./models"

export type TDataLoginAccessToken = {
  formData: Body_login_login_access_token
}
export type TDataRecoverPassword = {
  email: string
}
export type TDataResetPassword = {
  requestBody: NewPassword
}
export type TDataRecoverPasswordHtmlContent = {
  email: string
}

export class LoginService {
  /**
   * Login Access Token
   * OAuth2 compatible token login, get an access token for future requests
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static loginAccessToken(
    data: TDataLoginAccessToken,
  ): CancelablePromise<Token> {
    const { formData } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/login/access-token",
      formData: formData,
      mediaType: "application/x-www-form-urlencoded",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Test Token
   * Test access token
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static testToken(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/login/test-token",
    })
  }

  /**
   * Recover Password
   * Password Recovery
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static recoverPassword(
    data: TDataRecoverPassword,
  ): CancelablePromise<Message> {
    const { email } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/password-recovery/{email}",
      path: {
        email,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Reset Password
   * Reset password
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static resetPassword(
    data: TDataResetPassword,
  ): CancelablePromise<Message> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/reset-password/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Recover Password Html Content
   * HTML Content for Password Recovery
   * @returns string Successful Response
   * @throws ApiError
   */
  public static recoverPasswordHtmlContent(
    data: TDataRecoverPasswordHtmlContent,
  ): CancelablePromise<string> {
    const { email } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/password-recovery-html-content/{email}",
      path: {
        email,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadUsers = {
  limit?: number
  skip?: number
}
export type TDataCreateUser = {
  requestBody: UserCreate
}
export type TDataUpdateUserMe = {
  requestBody: UserUpdateMe
}
export type TDataUpdatePasswordMe = {
  requestBody: UpdatePassword
}
export type TDataRegisterUser = {
  requestBody: UserRegister
}
export type TDataReadUserById = {
  userId: string
}
export type TDataUpdateUser = {
  requestBody: UserUpdate
  userId: string
}
export type TDataDeleteUser = {
  userId: string
}

export class UsersService {
  /**
   * Read Users
   * Retrieve users.
   * @returns UsersPublic Successful Response
   * @throws ApiError
   */
  public static readUsers(
    data: TDataReadUsers = {},
  ): CancelablePromise<UsersPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create User
   * Create new user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static createUser(
    data: TDataCreateUser,
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/users/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read User Me
   * Get current user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserMe(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/me",
    })
  }

  /**
   * Delete User Me
   * Delete own user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUserMe(): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/users/me",
    })
  }

  /**
   * Update User Me
   * Update own user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUserMe(
    data: TDataUpdateUserMe,
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/me",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Password Me
   * Update own password.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static updatePasswordMe(
    data: TDataUpdatePasswordMe,
  ): CancelablePromise<Message> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/me/password",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Register User
   * Create new user without the need to be logged in.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static registerUser(
    data: TDataRegisterUser,
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/users/signup",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read User By Id
   * Get a specific user by id.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserById(
    data: TDataReadUserById,
  ): CancelablePromise<UserPublic> {
    const { userId } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: userId,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update User
   * Update a user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUser(
    data: TDataUpdateUser,
  ): CancelablePromise<UserPublic> {
    const { requestBody, userId } = data
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: userId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete User
   * Delete a user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUser(data: TDataDeleteUser): CancelablePromise<Message> {
    const { userId } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: userId,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export class UtilsService {
  /**
   * Health Check
   * @returns boolean Successful Response
   * @throws ApiError
   */
  public static healthCheck(): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/utils/health-check/",
    })
  }
}

export type TDataReadMovies = {
  limit?: number
  skip?: number
}
export type TDataCreateMovie = {
  requestBody: MovieCreate
}
export type TDataReadMovie = {
  id: string
}
export type TDataUpdateMovie = {
  id: string
  requestBody: MovieUpdate
}
export type TDataDeleteMovie = {
  id: string
}

export class MoviesService {
  /**
   * Read Movies
   * Retrieve movies.
   * @returns MoviesPublic Successful Response
   * @throws ApiError
   */
  public static readMovies(
    data: TDataReadMovies = {},
  ): CancelablePromise<MoviesPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/movies/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Movie
   * Create new movie.
   * @returns MoviePublic Successful Response
   * @throws ApiError
   */
  public static createMovie(
    data: TDataCreateMovie,
  ): CancelablePromise<MoviePublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/movies/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Movie
   * Get movie by ID.
   * @returns MoviePublic Successful Response
   * @throws ApiError
   */
  public static readMovie(
    data: TDataReadMovie,
  ): CancelablePromise<MoviePublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/movies/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Movie
   * Update a movie.
   * @returns MoviePublic Successful Response
   * @throws ApiError
   */
  public static updateMovie(
    data: TDataUpdateMovie,
  ): CancelablePromise<MoviePublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/movies/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Movie
   * Delete a movie.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteMovie(
    data: TDataDeleteMovie,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/movies/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadMovieFormats = {
  limit?: number
  skip?: number
}
export type TDataCreateMovieFormat = {
  requestBody: MovieFormatCreate
}
export type TDataReadMovieFormat = {
  id: string
}
export type TDataUpdateMovieFormat = {
  id: string
  requestBody: MovieFormatUpdate
}
export type TDataDeleteMovieFormat = {
  id: string
}

export class MoviesFormatService {
  /**
   * Read Movie Formats
   * @returns MovieFormatsPublic Successful Response
   * @throws ApiError
   */
  public static readMovieFormats(
    data: TDataReadMovieFormats = {},
  ): CancelablePromise<MovieFormatsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/movies_format/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Movie Format
   * @returns MovieFormatPublic Successful Response
   * @throws ApiError
   */
  public static createMovieFormat(
    data: TDataCreateMovieFormat,
  ): CancelablePromise<MovieFormatPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/movies_format/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Movie Format
   * @returns MovieFormatPublic Successful Response
   * @throws ApiError
   */
  public static readMovieFormat(
    data: TDataReadMovieFormat,
  ): CancelablePromise<MovieFormatPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/movies_format/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Movie Format
   * @returns MovieFormatPublic Successful Response
   * @throws ApiError
   */
  public static updateMovieFormat(
    data: TDataUpdateMovieFormat,
  ): CancelablePromise<MovieFormatPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/movies_format/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Movie Format
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteMovieFormat(
    data: TDataDeleteMovieFormat,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/movies_format/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadMovieImages = {
  limit?: number
  skip?: number
}
export type TDataCreateMovieImage = {
  requestBody: MovieImageCreate
}
export type TDataReadMovieImage = {
  id: string
}
export type TDataUpdateMovieImage = {
  id: string
  requestBody: MovieImageUpdate
}
export type TDataDeleteMovieImage = {
  id: string
}

export class MovieImagesService {
  /**
   * Read Movie Images
   * @returns MovieImagesPublic Successful Response
   * @throws ApiError
   */
  public static readMovieImages(
    data: TDataReadMovieImages = {},
  ): CancelablePromise<MovieImagesPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/movie_images/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Movie Image
   * @returns MovieImagePublic Successful Response
   * @throws ApiError
   */
  public static createMovieImage(
    data: TDataCreateMovieImage,
  ): CancelablePromise<MovieImagePublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/movie_images/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Movie Image
   * @returns MovieImagePublic Successful Response
   * @throws ApiError
   */
  public static readMovieImage(
    data: TDataReadMovieImage,
  ): CancelablePromise<MovieImagePublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/movie_images/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Movie Image
   * @returns MovieImagePublic Successful Response
   * @throws ApiError
   */
  public static updateMovieImage(
    data: TDataUpdateMovieImage,
  ): CancelablePromise<MovieImagePublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/movie_images/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Movie Image
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteMovieImage(
    data: TDataDeleteMovieImage,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/movie_images/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadHomePageData = {
  limit?: number
  skip?: number
}
export type TDataCreateHomePageData = {
  requestBody: HomePageDataCreate
}
export type TDataReadHomePageDataById = {
  id: string
}
export type TDataUpdateHomePageData = {
  id: string
  requestBody: HomePageDataUpdate
}
export type TDataDeleteHomePageData = {
  id: string
}

export class HomePageDataService {
  /**
   * Read Home Page Data
   * @returns HomePageDatasPublic Successful Response
   * @throws ApiError
   */
  public static readHomePageData(
    data: TDataReadHomePageData = {},
  ): CancelablePromise<HomePageDatasPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/home_page_data/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Home Page Data
   * @returns HomePageDataPublic Successful Response
   * @throws ApiError
   */
  public static createHomePageData(
    data: TDataCreateHomePageData,
  ): CancelablePromise<HomePageDataPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/home_page_data/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Home Page Data By Id
   * @returns HomePageDataPublic Successful Response
   * @throws ApiError
   */
  public static readHomePageDataById(
    data: TDataReadHomePageDataById,
  ): CancelablePromise<HomePageDataPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/home_page_data/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Home Page Data
   * @returns HomePageDataPublic Successful Response
   * @throws ApiError
   */
  public static updateHomePageData(
    data: TDataUpdateHomePageData,
  ): CancelablePromise<HomePageDataPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/home_page_data/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Home Page Data
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteHomePageData(
    data: TDataDeleteHomePageData,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/home_page_data/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadCities = {
  limit?: number
  skip?: number
}
export type TDataCreateCity = {
  requestBody: CityCreate
}
export type TDataReadCity = {
  id: string
}
export type TDataUpdateCity = {
  id: string
  requestBody: CityUpdate
}
export type TDataDeleteCity = {
  id: string
}

export class CitiesService {
  /**
   * Read Cities
   * @returns CitiesPublic Successful Response
   * @throws ApiError
   */
  public static readCities(
    data: TDataReadCities = {},
  ): CancelablePromise<CitiesPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/cities/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create City
   * @returns CityPublic Successful Response
   * @throws ApiError
   */
  public static createCity(
    data: TDataCreateCity,
  ): CancelablePromise<CityPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/cities/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read City
   * @returns CityPublic Successful Response
   * @throws ApiError
   */
  public static readCity(data: TDataReadCity): CancelablePromise<CityPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/cities/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update City
   * @returns CityPublic Successful Response
   * @throws ApiError
   */
  public static updateCity(
    data: TDataUpdateCity,
  ): CancelablePromise<CityPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/cities/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete City
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteCity(data: TDataDeleteCity): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/cities/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadCinemas = {
  limit?: number
  skip?: number
}
export type TDataCreateCinema = {
  requestBody: CinemaCreate
}
export type TDataReadCinema = {
  id: string
}
export type TDataUpdateCinema = {
  id: string
  requestBody: CinemaUpdate
}
export type TDataDeleteCinema = {
  id: string
}

export class CinemasService {
  /**
   * Read Cinemas
   * @returns CinemasPublic Successful Response
   * @throws ApiError
   */
  public static readCinemas(
    data: TDataReadCinemas = {},
  ): CancelablePromise<CinemasPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/cinemas/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Cinema
   * @returns CinemaPublic Successful Response
   * @throws ApiError
   */
  public static createCinema(
    data: TDataCreateCinema,
  ): CancelablePromise<CinemaPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/cinemas/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Cinema
   * @returns CinemaPublic Successful Response
   * @throws ApiError
   */
  public static readCinema(
    data: TDataReadCinema,
  ): CancelablePromise<CinemaPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/cinemas/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Cinema
   * @returns CinemaPublic Successful Response
   * @throws ApiError
   */
  public static updateCinema(
    data: TDataUpdateCinema,
  ): CancelablePromise<CinemaPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/cinemas/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Cinema
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteCinema(
    data: TDataDeleteCinema,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/cinemas/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadCinemaCategories = {
  limit?: number
  skip?: number
}
export type TDataCreateCinemaCategory = {
  requestBody: CinemaCategoryCreate
}
export type TDataReadCinemaCategory = {
  id: string
}
export type TDataUpdateCinemaCategory = {
  id: string
  requestBody: CinemaCategoryUpdate
}
export type TDataDeleteCinemaCategory = {
  id: string
}

export class CinemaCategoriesService {
  /**
   * Read Cinema Categories
   * @returns CinemaCategoriesPublic Successful Response
   * @throws ApiError
   */
  public static readCinemaCategories(
    data: TDataReadCinemaCategories = {},
  ): CancelablePromise<CinemaCategoriesPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/cinema_categories/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Cinema Category
   * @returns CinemaCategoryPublic Successful Response
   * @throws ApiError
   */
  public static createCinemaCategory(
    data: TDataCreateCinemaCategory,
  ): CancelablePromise<CinemaCategoryPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/cinema_categories/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Cinema Category
   * @returns CinemaCategoryPublic Successful Response
   * @throws ApiError
   */
  public static readCinemaCategory(
    data: TDataReadCinemaCategory,
  ): CancelablePromise<CinemaCategoryPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/cinema_categories/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Cinema Category
   * @returns CinemaCategoryPublic Successful Response
   * @throws ApiError
   */
  public static updateCinemaCategory(
    data: TDataUpdateCinemaCategory,
  ): CancelablePromise<CinemaCategoryPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/cinema_categories/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Cinema Category
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteCinemaCategory(
    data: TDataDeleteCinemaCategory,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/cinema_categories/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadScreens = {
  limit?: number
  skip?: number
}
export type TDataCreateScreen = {
  requestBody: ScreenCreate
}
export type TDataReadScreen = {
  id: string
}
export type TDataUpdateScreen = {
  id: string
  requestBody: ScreenUpdate
}
export type TDataDeleteScreen = {
  id: string
}

export class ScreensService {
  /**
   * Read Screens
   * @returns ScreensPublic Successful Response
   * @throws ApiError
   */
  public static readScreens(
    data: TDataReadScreens = {},
  ): CancelablePromise<ScreensPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/screens/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Screen
   * @returns ScreenPublic Successful Response
   * @throws ApiError
   */
  public static createScreen(
    data: TDataCreateScreen,
  ): CancelablePromise<ScreenPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/screens/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Screen
   * @returns ScreenPublic Successful Response
   * @throws ApiError
   */
  public static readScreen(
    data: TDataReadScreen,
  ): CancelablePromise<ScreenPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/screens/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Screen
   * @returns ScreenPublic Successful Response
   * @throws ApiError
   */
  public static updateScreen(
    data: TDataUpdateScreen,
  ): CancelablePromise<ScreenPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/screens/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Screen
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteScreen(
    data: TDataDeleteScreen,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/screens/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadSeats = {
  limit?: number
  skip?: number
}
export type TDataCreateSeat = {
  requestBody: SeatCreate
}
export type TDataReadSeat = {
  id: string
}
export type TDataUpdateSeat = {
  id: string
  requestBody: SeatUpdate
}
export type TDataDeleteSeat = {
  id: string
}

export class SeatsService {
  /**
   * Read Seats
   * @returns SeatsPublic Successful Response
   * @throws ApiError
   */
  public static readSeats(
    data: TDataReadSeats = {},
  ): CancelablePromise<SeatsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/seats/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Seat
   * @returns SeatPublic Successful Response
   * @throws ApiError
   */
  public static createSeat(
    data: TDataCreateSeat,
  ): CancelablePromise<SeatPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/seats/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Seat
   * @returns SeatPublic Successful Response
   * @throws ApiError
   */
  public static readSeat(data: TDataReadSeat): CancelablePromise<SeatPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/seats/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Seat
   * @returns SeatPublic Successful Response
   * @throws ApiError
   */
  public static updateSeat(
    data: TDataUpdateSeat,
  ): CancelablePromise<SeatPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/seats/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Seat
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteSeat(data: TDataDeleteSeat): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/seats/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadShows = {
  limit?: number
  skip?: number
}
export type TDataCreateShow = {
  requestBody: ShowCreate
}
export type TDataReadShow = {
  id: string
}
export type TDataUpdateShow = {
  id: string
  requestBody: ShowUpdate
}
export type TDataDeleteShow = {
  id: string
}

export class ShowsService {
  /**
   * Read Shows
   * @returns ShowsPublic Successful Response
   * @throws ApiError
   */
  public static readShows(
    data: TDataReadShows = {},
  ): CancelablePromise<ShowsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/shows/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Show
   * @returns ShowPublic Successful Response
   * @throws ApiError
   */
  public static createShow(
    data: TDataCreateShow,
  ): CancelablePromise<ShowPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/shows/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Show
   * @returns ShowPublic Successful Response
   * @throws ApiError
   */
  public static readShow(data: TDataReadShow): CancelablePromise<ShowPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/shows/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Show
   * @returns ShowPublic Successful Response
   * @throws ApiError
   */
  public static updateShow(
    data: TDataUpdateShow,
  ): CancelablePromise<ShowPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/shows/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Show
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteShow(data: TDataDeleteShow): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/shows/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadMoviePricing = {
  limit?: number
  skip?: number
}
export type TDataCreateMoviePricing = {
  requestBody: MoviePricingCreate
}
export type TDataUpdateMoviePricing = {
  id: string
  requestBody: MoviePricingUpdate
}
export type TDataDeleteMoviePricing = {
  id: string
}

export class MoviePricingService {
  /**
   * Read Movie Pricing
   * @returns MoviePricingsPublic Successful Response
   * @throws ApiError
   */
  public static readMoviePricing(
    data: TDataReadMoviePricing = {},
  ): CancelablePromise<MoviePricingsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/movie_pricing/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Movie Pricing
   * @returns MoviePricingPublic Successful Response
   * @throws ApiError
   */
  public static createMoviePricing(
    data: TDataCreateMoviePricing,
  ): CancelablePromise<MoviePricingPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/movie_pricing/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Movie Pricing
   * @returns MoviePricingPublic Successful Response
   * @throws ApiError
   */
  public static updateMoviePricing(
    data: TDataUpdateMoviePricing,
  ): CancelablePromise<MoviePricingPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/movie_pricing/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Movie Pricing
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteMoviePricing(
    data: TDataDeleteMoviePricing,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/movie_pricing/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadCrews = {
  limit?: number
  skip?: number
}
export type TDataCreateCrew = {
  requestBody: CrewCreate
}
export type TDataReadCrew = {
  id: string
}
export type TDataUpdateCrew = {
  id: string
  requestBody: CrewUpdate
}
export type TDataDeleteCrew = {
  id: string
}

export class CrewService {
  /**
   * Read Crews
   * @returns CrewsPublic Successful Response
   * @throws ApiError
   */
  public static readCrews(
    data: TDataReadCrews = {},
  ): CancelablePromise<CrewsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/crew/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Crew
   * @returns CrewPublic Successful Response
   * @throws ApiError
   */
  public static createCrew(
    data: TDataCreateCrew,
  ): CancelablePromise<CrewPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/crew/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Crew
   * @returns CrewPublic Successful Response
   * @throws ApiError
   */
  public static readCrew(data: TDataReadCrew): CancelablePromise<CrewPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/crew/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Crew
   * @returns CrewPublic Successful Response
   * @throws ApiError
   */
  public static updateCrew(
    data: TDataUpdateCrew,
  ): CancelablePromise<CrewPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/crew/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Crew
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteCrew(data: TDataDeleteCrew): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/crew/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadCasts = {
  limit?: number
  skip?: number
}
export type TDataCreateCast = {
  requestBody: CastCreate
}
export type TDataReadCast = {
  id: string
}
export type TDataUpdateCast = {
  id: string
  requestBody: CastUpdate
}
export type TDataDeleteCast = {
  id: string
}

export class CastService {
  /**
   * Read Casts
   * @returns CastsPublic Successful Response
   * @throws ApiError
   */
  public static readCasts(
    data: TDataReadCasts = {},
  ): CancelablePromise<CastsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/cast/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Cast
   * @returns CastPublic Successful Response
   * @throws ApiError
   */
  public static createCast(
    data: TDataCreateCast,
  ): CancelablePromise<CastPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/cast/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Cast
   * @returns CastPublic Successful Response
   * @throws ApiError
   */
  public static readCast(data: TDataReadCast): CancelablePromise<CastPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/cast/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Cast
   * @returns CastPublic Successful Response
   * @throws ApiError
   */
  public static updateCast(
    data: TDataUpdateCast,
  ): CancelablePromise<CastPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/cast/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Cast
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteCast(data: TDataDeleteCast): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/cast/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadReviews = {
  limit?: number
  skip?: number
}
export type TDataCreateReview = {
  requestBody: ReviewCreate
}
export type TDataReadReview = {
  id: string
}
export type TDataUpdateReview = {
  id: string
  requestBody: ReviewUpdate
}
export type TDataDeleteReview = {
  id: string
}

export class ReviewsService {
  /**
   * Read Reviews
   * @returns ReviewsPublic Successful Response
   * @throws ApiError
   */
  public static readReviews(
    data: TDataReadReviews = {},
  ): CancelablePromise<ReviewsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/reviews/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Review
   * @returns ReviewPublic Successful Response
   * @throws ApiError
   */
  public static createReview(
    data: TDataCreateReview,
  ): CancelablePromise<ReviewPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/reviews/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Review
   * @returns ReviewPublic Successful Response
   * @throws ApiError
   */
  public static readReview(
    data: TDataReadReview,
  ): CancelablePromise<ReviewPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/reviews/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Review
   * @returns ReviewPublic Successful Response
   * @throws ApiError
   */
  public static updateReview(
    data: TDataUpdateReview,
  ): CancelablePromise<ReviewPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/reviews/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Review
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteReview(
    data: TDataDeleteReview,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/reviews/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadBookings = {
  limit?: number
  skip?: number
}
export type TDataCreateBooking = {
  requestBody: BookingCreate
}
export type TDataReadBooking = {
  id: string
}
export type TDataUpdateBooking = {
  id: string
  requestBody: BookingUpdate
}
export type TDataDeleteBooking = {
  id: string
}

export class BookingsService {
  /**
   * Read Bookings
   * @returns BookingsPublic Successful Response
   * @throws ApiError
   */
  public static readBookings(
    data: TDataReadBookings = {},
  ): CancelablePromise<BookingsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/bookings/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Booking
   * @returns BookingPublic Successful Response
   * @throws ApiError
   */
  public static createBooking(
    data: TDataCreateBooking,
  ): CancelablePromise<BookingPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/bookings/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Booking
   * @returns BookingPublic Successful Response
   * @throws ApiError
   */
  public static readBooking(
    data: TDataReadBooking,
  ): CancelablePromise<BookingPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/bookings/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Booking
   * @returns BookingPublic Successful Response
   * @throws ApiError
   */
  public static updateBooking(
    data: TDataUpdateBooking,
  ): CancelablePromise<BookingPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/bookings/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Booking
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteBooking(
    data: TDataDeleteBooking,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/bookings/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadBookingDetails = {
  limit?: number
  skip?: number
}
export type TDataCreateBookingDetail = {
  requestBody: BookingDetailCreate
}
export type TDataReadBookingDetail = {
  id: string
}
export type TDataUpdateBookingDetail = {
  id: string
  requestBody: BookingDetailUpdate
}
export type TDataDeleteBookingDetail = {
  id: string
}

export class BookingDetailsService {
  /**
   * Read Booking Details
   * @returns BookingDetailsPublic Successful Response
   * @throws ApiError
   */
  public static readBookingDetails(
    data: TDataReadBookingDetails = {},
  ): CancelablePromise<BookingDetailsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/booking_details/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Booking Detail
   * @returns BookingDetailPublic Successful Response
   * @throws ApiError
   */
  public static createBookingDetail(
    data: TDataCreateBookingDetail,
  ): CancelablePromise<BookingDetailPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/booking_details/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Booking Detail
   * @returns BookingDetailPublic Successful Response
   * @throws ApiError
   */
  public static readBookingDetail(
    data: TDataReadBookingDetail,
  ): CancelablePromise<BookingDetailPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/booking_details/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Booking Detail
   * @returns BookingDetailPublic Successful Response
   * @throws ApiError
   */
  public static updateBookingDetail(
    data: TDataUpdateBookingDetail,
  ): CancelablePromise<BookingDetailPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/booking_details/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Booking Detail
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteBookingDetail(
    data: TDataDeleteBookingDetail,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/booking_details/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadPayments = {
  limit?: number
  skip?: number
}
export type TDataCreatePayment = {
  requestBody: PaymentCreate
}
export type TDataReadPayment = {
  id: string
}
export type TDataUpdatePayment = {
  id: string
  requestBody: PaymentUpdate
}
export type TDataDeletePayment = {
  id: string
}

export class PaymentsService {
  /**
   * Read Payments
   * @returns PaymentsPublic Successful Response
   * @throws ApiError
   */
  public static readPayments(
    data: TDataReadPayments = {},
  ): CancelablePromise<PaymentsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/payments/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Payment
   * @returns PaymentPublic Successful Response
   * @throws ApiError
   */
  public static createPayment(
    data: TDataCreatePayment,
  ): CancelablePromise<PaymentPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/payments/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Payment
   * @returns PaymentPublic Successful Response
   * @throws ApiError
   */
  public static readPayment(
    data: TDataReadPayment,
  ): CancelablePromise<PaymentPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/payments/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Payment
   * @returns PaymentPublic Successful Response
   * @throws ApiError
   */
  public static updatePayment(
    data: TDataUpdatePayment,
  ): CancelablePromise<PaymentPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/payments/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Payment
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deletePayment(
    data: TDataDeletePayment,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/payments/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
