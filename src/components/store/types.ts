export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Кожаная сумка Premium', price: 45900, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/ef5cce7c-0296-453c-af4c-fabea5d29d9e.jpg', category: 'Сумки', brand: 'LUXURY' },
  { id: 2, name: 'Солнцезащитные очки Elite', price: 18500, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/84512ad1-20b1-41fa-bbcf-eec30050aa85.jpg', category: 'Очки', brand: 'FASHION' },
  { id: 3, name: 'Наручные часы Designer', price: 89900, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/616cd6eb-ffea-4069-8524-7d4001dcc6c2.jpg', category: 'Часы', brand: 'PREMIUM' },
  { id: 4, name: 'Кожаный кошелек Signature', price: 12900, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/ef5cce7c-0296-453c-af4c-fabea5d29d9e.jpg', category: 'Кошельки', brand: 'LUXURY' },
  { id: 5, name: 'Очки авиаторы Classic', price: 22000, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/84512ad1-20b1-41fa-bbcf-eec30050aa85.jpg', category: 'Очки', brand: 'STYLE' },
  { id: 6, name: 'Спортивные часы Tech', price: 65000, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/616cd6eb-ffea-4069-8524-7d4001dcc6c2.jpg', category: 'Часы', brand: 'SPORT' },
];
