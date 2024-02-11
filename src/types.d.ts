export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string | null;
  category?: Category;
}

export interface ProductMutation {
  category: string;
  title: string;
  price: string;
  description: string;
  image: File | null;
}

export interface Category {
  _id: string;
  title: string;
  description: string;
}