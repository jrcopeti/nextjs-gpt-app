export interface ChatMessageTypes {
  role: "user" | "assistant" | "system" | "function";
  content: string | null;
}

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
}
