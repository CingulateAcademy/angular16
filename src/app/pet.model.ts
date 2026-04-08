export interface Pet {
  id: number;
  name: string;
  breed: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit';
  price: number;
  imageUrl: string;
  description: string;
}