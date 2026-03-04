export interface Post {
  id: number;
  slug: string;
  category: string;
  tags: string[];
  date: string;
  title: string;
  desc: string;
  content?: string;
  file?: string;
  image?: string;
}

export interface CategoryStructure {
  [key: string]: string[];
}
