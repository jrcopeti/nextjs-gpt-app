import { StaticImageData } from "next/image";

export interface QueryTourTypes {
  city: string;
  country: string;
  userId: string;
}

export interface cityCountryInput {
  city: string;
  country: string;
  userId: string;
}

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | object
  | JsonValue[];

export interface TourProps {
  id: string;
  city: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  image: string | null;
  stops: JsonValue[];
  userId: string;
  countryFlag: string;
}

export interface HeroProps {
  imgData: StaticImageData;
  imgAlt: string;
  title: string;
  path: string;
  subtitle: string;
  linkText: string;
}
