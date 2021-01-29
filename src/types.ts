export type TStars = {
  image: string | undefined;
  actor: string;
  character: string;
};

export type TReview = {
  title: string;
  date: string;
  raiting: string;
  text: string;
};

export type TType = "series" | "movie" | "mini-series";

export type TData = {
  uid: string;
  title?: string;
  year?: string;
  plot?: string;
  storylinePlot?: string;
  poster?: string;
  duration?: string;
  raiting?: number | string;
  metascore?: number | string;
  genres?: string[];
  reviews?: Array<TReview>;
  stars?: Array<TStars>;
  type?: TType;
  director?: string;
};

export type TReviewConfig = "title"| "raiting"| "date"| "text"
export type TMainConfig = "title" | "year" | "director" | "genres" | "raiting" | "metascore" | "plot" | "poster" | "storylinePlot" | "duration" | "type" | "stars";

export type TExtractConfig = {main: TMainConfig[],reviews: TReviewConfig[]}
