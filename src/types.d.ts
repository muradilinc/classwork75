export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductMutation {
  title: string;
  price: string;
  description: string;
}