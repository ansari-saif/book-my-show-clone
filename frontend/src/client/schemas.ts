export const $Body_login_login_access_token = {
  properties: {
    grant_type: {
      type: "any-of",
      contains: [
        {
          type: "string",
          pattern: "password",
        },
        {
          type: "null",
        },
      ],
    },
    username: {
      type: "string",
      isRequired: true,
    },
    password: {
      type: "string",
      isRequired: true,
    },
    scope: {
      type: "string",
      default: "",
    },
    client_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    client_secret: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $BookingCreate = {
  properties: {
    booking_time: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    total_amount: {
      type: "number",
      isRequired: true,
    },
    user_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    show_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $BookingDetailCreate = {
  properties: {
    price: {
      type: "number",
      isRequired: true,
    },
    booking_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    seat_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $BookingDetailPublic = {
  properties: {
    price: {
      type: "number",
      isRequired: true,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    booking_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    seat_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $BookingDetailUpdate = {
  properties: {
    price: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    booking_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "uuid",
        },
        {
          type: "null",
        },
      ],
    },
    seat_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "uuid",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $BookingDetailsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "BookingDetailPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $BookingPublic = {
  properties: {
    booking_time: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    total_amount: {
      type: "number",
      isRequired: true,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    user_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    show_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $BookingUpdate = {
  properties: {
    booking_time: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "date-time",
        },
        {
          type: "null",
        },
      ],
    },
    total_amount: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    user_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "uuid",
        },
        {
          type: "null",
        },
      ],
    },
    show_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "uuid",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $BookingsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "BookingPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $CastCreate = {
  properties: {
    name: {
      type: "string",
      isRequired: true,
    },
    role_in_movie: {
      type: "string",
      isRequired: true,
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $CastPublic = {
  properties: {
    name: {
      type: "string",
      isRequired: true,
    },
    role_in_movie: {
      type: "string",
      isRequired: true,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $CastUpdate = {
  properties: {
    name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    role_in_movie: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $CastsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "CastPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $CinemaCategoriesPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "CinemaCategoryPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $CinemaCategoryCreate = {
  properties: {
    category_name: {
      type: "string",
      isRequired: true,
      maxLength: 100,
    },
  },
} as const

export const $CinemaCategoryPublic = {
  properties: {
    category_name: {
      type: "string",
      isRequired: true,
      maxLength: 100,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $CinemaCategoryUpdate = {
  properties: {
    category_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $CinemaCreate = {
  properties: {
    name: {
      type: "string",
      isRequired: true,
    },
    address: {
      type: "string",
      isRequired: true,
    },
    phone_number: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    city_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $CinemaPublic = {
  properties: {
    name: {
      type: "string",
      isRequired: true,
    },
    address: {
      type: "string",
      isRequired: true,
    },
    phone_number: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    city_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $CinemaUpdate = {
  properties: {
    name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    address: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    phone_number: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $CinemasPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "CinemaPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $CitiesPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "CityPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $CityCreate = {
  properties: {
    city_name: {
      type: "string",
      isRequired: true,
      maxLength: 100,
    },
    state: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 100,
        },
        {
          type: "null",
        },
      ],
      isRequired: true,
    },
    country: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 100,
        },
        {
          type: "null",
        },
      ],
      isRequired: true,
    },
  },
} as const

export const $CityPublic = {
  properties: {
    city_name: {
      type: "string",
      isRequired: true,
      maxLength: 100,
    },
    state: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 100,
        },
        {
          type: "null",
        },
      ],
      isRequired: true,
    },
    country: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 100,
        },
        {
          type: "null",
        },
      ],
      isRequired: true,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $CityUpdate = {
  properties: {
    city_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    state: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    country: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $CrewCreate = {
  properties: {
    name: {
      type: "string",
      isRequired: true,
    },
    role: {
      type: "string",
      isRequired: true,
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $CrewPublic = {
  properties: {
    name: {
      type: "string",
      isRequired: true,
    },
    role: {
      type: "string",
      isRequired: true,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $CrewUpdate = {
  properties: {
    name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    role: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $CrewsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "CrewPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $HTTPValidationError = {
  properties: {
    detail: {
      type: "array",
      contains: {
        type: "ValidationError",
      },
    },
  },
} as const

export const $HomePageDataCreate = {
  properties: {
    section_name: {
      type: "string",
      isRequired: true,
      maxLength: 100,
    },
    movie_ids: {
      type: "array",
      contains: {
        type: "string",
        format: "uuid",
      },
      isRequired: true,
    },
  },
} as const

export const $HomePageDataPublic = {
  properties: {
    section_name: {
      type: "string",
      isRequired: true,
      maxLength: 100,
    },
    movie_ids: {
      type: "array",
      contains: {
        type: "string",
        format: "uuid",
      },
      isRequired: true,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $HomePageDataUpdate = {
  properties: {
    section_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    movie_ids: {
      type: "any-of",
      contains: [
        {
          type: "array",
          contains: {
            type: "string",
            format: "uuid",
          },
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $HomePageDatasPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "HomePageDataPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $Message = {
  properties: {
    message: {
      type: "string",
      isRequired: true,
    },
  },
} as const

export const $MovieCreate = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    genre: {
      type: "string",
      isRequired: true,
    },
    duration: {
      type: "number",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    release_date: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "date-time",
        },
        {
          type: "null",
        },
      ],
    },
    rating: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    is_recommended: {
      type: "boolean",
      default: false,
    },
    you_might_also_like: {
      type: "any-of",
      contains: [
        {
          type: "array",
          contains: {
            type: "string",
            format: "uuid",
          },
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $MovieFormatCreate = {
  properties: {
    format: {
      type: "string",
      isRequired: true,
    },
    language: {
      type: "string",
      isRequired: true,
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $MovieFormatPublic = {
  properties: {
    format: {
      type: "string",
      isRequired: true,
    },
    language: {
      type: "string",
      isRequired: true,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $MovieFormatUpdate = {
  properties: {
    format: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    language: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $MovieFormatsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "MovieFormatPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $MovieImageCreate = {
  properties: {
    image_url: {
      type: "string",
      isRequired: true,
      maxLength: 500,
    },
    image_type: {
      type: "string",
      isRequired: true,
      maxLength: 50,
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $MovieImagePublic = {
  properties: {
    image_url: {
      type: "string",
      isRequired: true,
      maxLength: 500,
    },
    image_type: {
      type: "string",
      isRequired: true,
      maxLength: 50,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $MovieImageUpdate = {
  properties: {
    image_url: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    image_type: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $MovieImagesPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "MovieImagePublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $MoviePricingCreate = {
  properties: {
    price: {
      type: "number",
      isRequired: true,
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    cinema_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    format_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $MoviePricingPublic = {
  properties: {
    price: {
      type: "number",
      isRequired: true,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    cinema_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    category_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    format_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $MoviePricingUpdate = {
  properties: {
    price: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    movie_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "uuid",
        },
        {
          type: "null",
        },
      ],
    },
    cinema_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "uuid",
        },
        {
          type: "null",
        },
      ],
    },
    category_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "uuid",
        },
        {
          type: "null",
        },
      ],
    },
    format_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "uuid",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $MoviePricingsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "MoviePricingPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $MoviePublic = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    genre: {
      type: "string",
      isRequired: true,
    },
    duration: {
      type: "number",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    release_date: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "date-time",
        },
        {
          type: "null",
        },
      ],
    },
    rating: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    is_recommended: {
      type: "boolean",
      default: false,
    },
    you_might_also_like: {
      type: "any-of",
      contains: [
        {
          type: "array",
          contains: {
            type: "string",
            format: "uuid",
          },
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $MovieUpdate = {
  properties: {
    title: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    genre: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    duration: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    release_date: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "date-time",
        },
        {
          type: "null",
        },
      ],
    },
    rating: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    is_recommended: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    you_might_also_like: {
      type: "any-of",
      contains: [
        {
          type: "array",
          contains: {
            type: "string",
            format: "uuid",
          },
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $MoviesPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "MoviePublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $NewPassword = {
  properties: {
    token: {
      type: "string",
      isRequired: true,
    },
    new_password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const

export const $PaymentCreate = {
  properties: {
    payment_method: {
      type: "string",
      isRequired: true,
    },
    payment_status: {
      type: "string",
      isRequired: true,
    },
    amount_paid: {
      type: "number",
      isRequired: true,
    },
    booking_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $PaymentPublic = {
  properties: {
    payment_method: {
      type: "string",
      isRequired: true,
    },
    payment_status: {
      type: "string",
      isRequired: true,
    },
    amount_paid: {
      type: "number",
      isRequired: true,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    booking_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $PaymentUpdate = {
  properties: {
    payment_method: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    payment_status: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    amount_paid: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $PaymentsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "PaymentPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $ReviewCreate = {
  properties: {
    rating: {
      type: "number",
      isRequired: true,
    },
    review_text: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_top_review: {
      type: "boolean",
      default: false,
    },
    user_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $ReviewPublic = {
  properties: {
    rating: {
      type: "number",
      isRequired: true,
    },
    review_text: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_top_review: {
      type: "boolean",
      default: false,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    user_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $ReviewUpdate = {
  properties: {
    rating: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    review_text: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_top_review: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $ReviewsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "ReviewPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $ScreenCreate = {
  properties: {
    screen_name: {
      type: "string",
      isRequired: true,
    },
    capacity: {
      type: "number",
      isRequired: true,
    },
    cinema_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $ScreenPublic = {
  properties: {
    screen_name: {
      type: "string",
      isRequired: true,
    },
    capacity: {
      type: "number",
      isRequired: true,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    cinema_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $ScreenUpdate = {
  properties: {
    screen_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    capacity: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $ScreensPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "ScreenPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $SeatCreate = {
  properties: {
    seat_number: {
      type: "string",
      isRequired: true,
    },
    seat_type: {
      type: "string",
      isRequired: true,
    },
    is_available: {
      type: "boolean",
      default: true,
    },
    screen_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $SeatPublic = {
  properties: {
    seat_number: {
      type: "string",
      isRequired: true,
    },
    seat_type: {
      type: "string",
      isRequired: true,
    },
    is_available: {
      type: "boolean",
      default: true,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    screen_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $SeatUpdate = {
  properties: {
    seat_number: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    seat_type: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_available: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $SeatsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "SeatPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $ShowCreate = {
  properties: {
    show_time: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    screen_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $ShowPublic = {
  properties: {
    show_time: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    movie_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    screen_id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $ShowUpdate = {
  properties: {
    show_time: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "date-time",
        },
        {
          type: "null",
        },
      ],
    },
    movie_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "uuid",
        },
        {
          type: "null",
        },
      ],
    },
    screen_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "uuid",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $ShowsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "ShowPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $Token = {
  properties: {
    access_token: {
      type: "string",
      isRequired: true,
    },
    token_type: {
      type: "string",
      default: "bearer",
    },
  },
} as const

export const $UpdatePassword = {
  properties: {
    current_password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
    new_password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const

export const $UserCreate = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    mobile: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const

export const $UserPublic = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    mobile: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $UserRegister = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UserUpdate = {
  properties: {
    email: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "email",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    mobile: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    password: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 40,
          minLength: 8,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UserUpdateMe = {
  properties: {
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    email: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "email",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UsersPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "UserPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $ValidationError = {
  properties: {
    loc: {
      type: "array",
      contains: {
        type: "any-of",
        contains: [
          {
            type: "string",
          },
          {
            type: "number",
          },
        ],
      },
      isRequired: true,
    },
    msg: {
      type: "string",
      isRequired: true,
    },
    type: {
      type: "string",
      isRequired: true,
    },
  },
} as const
