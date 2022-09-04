export type TagData = {
  id: string;
  name: string;
  description: string;
  filter_ignore?: boolean;
  hidden?: boolean;
  brew?: string;
};

export type TagRef = { id: string; val?: number };
