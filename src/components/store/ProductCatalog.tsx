import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from './types';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ProductCatalog = ({ products, onAddToCart }: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gradient-purple via-gradient-magenta to-gradient-orange bg-clip-text text-transparent" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Брендовые аксессуары
        </h2>
        <p className="text-lg text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Премиальная коллекция для вашего стиля
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? 'bg-gradient-to-r from-gradient-purple to-gradient-magenta hover:opacity-90' : ''}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <Card key={product.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in border-0">
            <div className="relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <Badge className="absolute top-4 right-4 bg-white/90 text-black font-bold border-0">
                {product.brand}
              </Badge>
            </div>
            <div className="p-6">
              <div className="mb-2">
                <Badge variant="outline" className="text-xs">{product.category}</Badge>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-magenta bg-clip-text text-transparent">
                  {product.price.toLocaleString()} ₽
                </span>
                <Button 
                  onClick={(e) => onAddToCart(product, e)}
                  className="bg-gradient-to-r from-gradient-purple to-gradient-magenta hover:from-gradient-magenta hover:to-gradient-orange transition-all duration-300"
                >
                  <Icon name="ShoppingBag" size={18} className="mr-2" />
                  В корзину
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};