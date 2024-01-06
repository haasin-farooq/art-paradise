export interface User {
  username: string;
  email: string;
  password: string;
  last_login_date: string | null;
}

export interface Art {
  id: number;
  title: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text?: string;
  };
  artist_display: string;
}
