
interface Word {
  id: number;
  name: string;
  figure: string;
  definition: string;
}

interface Phrase {
  id: number;
  qoute: string;
  author: string;
}

interface Colors {
  id: number;
  bg: string;
  color: string;
}

export type { Word, Phrase, Colors };