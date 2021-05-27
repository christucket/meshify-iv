export interface ITweet {
  id: string;
  text: string;
}

export interface ITweetMetaData {
  ids: string[];
  count: number;
  word: string;
  weight: number;
}

export interface IWordCloud {
  text: string;
  value: number
}