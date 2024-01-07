export interface Art {
  id: number;
  title: string;
  thumbnail: {
    lqip?: string | null;
    alt_text?: string;
  };
  artist_display: string;
}

export interface ArtDetail extends Art {
  medium_display: string;
  dimensions: string;
  credit_line: string;
  image_id: string;
  date_display: string;
  artist_display: string;
  main_reference_number: string;
  api_link: string;
  description: string | null;
  place_of_origin: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface User extends UserCredentials {
  username: string;
  last_login_date: string | null;
  art_works_claimed: Art[];
}

export interface APIResponse {
  data: Omit<User, "password">[];
  message: string;
}
