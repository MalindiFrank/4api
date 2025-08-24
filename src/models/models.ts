interface Word {
  id: number;
  name: string;
  figure: string;
  definition: string;
}

interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface Color {
  id: number;
  bg: string;
  color: string;
}

export type { Word, Quote, Color };