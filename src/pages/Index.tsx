import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('catalog');

  const products: Product[] = [
    { id: 1, name: 'Кожаная сумка Premium', price: 45900, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/ef5cce7c-0296-453c-af4c-fabea5d29d9e.jpg', category: 'Сумки', brand: 'LUXURY' },
    { id: 2, name: 'Солнцезащитные очки Elite', price: 18500, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/84512ad1-20b1-41fa-bbcf-eec30050aa85.jpg', category: 'Очки', brand: 'FASHION' },
    { id: 3, name: 'Наручные часы Designer', price: 89900, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/616cd6eb-ffea-4069-8524-7d4001dcc6c2.jpg', category: 'Часы', brand: 'PREMIUM' },
    { id: 4, name: 'Кожаный кошелек Signature', price: 12900, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/ef5cce7c-0296-453c-af4c-fabea5d29d9e.jpg', category: 'Кошельки', brand: 'LUXURY' },
    { id: 5, name: 'Очки авиаторы Classic', price: 22000, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/84512ad1-20b1-41fa-bbcf-eec30050aa85.jpg', category: 'Очки', brand: 'STYLE' },
    { id: 6, name: 'Спортивные часы Tech', price: 65000, image: 'https://cdn.poehali.dev/projects/d0f78ebd-0a66-4aed-b294-cf799199a658/files/616cd6eb-ffea-4069-8524-7d4001dcc6c2.jpg', category: 'Часы', brand: 'SPORT' },
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gradient-purple via-gradient-magenta to-gradient-orange bg-clip-text text-transparent" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              LUXE STORE
            </h1>
            
            <nav className="hidden md:flex items-center gap-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
              <button 
                onClick={() => setActiveSection('catalog')}
                className={`font-medium transition-all hover:text-primary ${activeSection === 'catalog' ? 'text-primary' : 'text-gray-600'}`}
              >
                Каталог
              </button>
              <button 
                onClick={() => setActiveSection('delivery')}
                className={`font-medium transition-all hover:text-primary ${activeSection === 'delivery' ? 'text-primary' : 'text-gray-600'}`}
              >
                Доставка
              </button>
              <button 
                onClick={() => setActiveSection('warranty')}
                className={`font-medium transition-all hover:text-primary ${activeSection === 'warranty' ? 'text-primary' : 'text-gray-600'}`}
              >
                Гарантия
              </button>
              <button 
                onClick={() => setActiveSection('contacts')}
                className={`font-medium transition-all hover:text-primary ${activeSection === 'contacts' ? 'text-primary' : 'text-gray-600'}`}
              >
                Контакты
              </button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-gradient-magenta to-gradient-orange border-0">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id} className="p-4">
                          <div className="flex gap-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-8 w-8 ml-auto"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Итого:</span>
                          <span className="bg-gradient-to-r from-gradient-purple to-gradient-magenta bg-clip-text text-transparent">
                            {totalPrice.toLocaleString()} ₽
                          </span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-gradient-purple via-gradient-magenta to-gradient-orange hover:opacity-90 transition-opacity" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'catalog' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gradient-purple via-gradient-magenta to-gradient-orange bg-clip-text text-transparent" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Брендовые аксессуары
              </h2>
              <p className="text-lg text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Премиальная коллекция для вашего стиля
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
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
                        onClick={() => addToCart(product)}
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
        )}

        {activeSection === 'delivery' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gradient-purple to-gradient-magenta bg-clip-text text-transparent" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Доставка
            </h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-purple to-gradient-magenta flex items-center justify-center">
                      <Icon name="Truck" size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Курьерская доставка</h3>
                    <p className="text-muted-foreground">По Москве — 1-2 дня, бесплатно при заказе от 50 000 ₽</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-orange to-gradient-blue flex items-center justify-center">
                      <Icon name="Package" size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Доставка по России</h3>
                    <p className="text-muted-foreground">3-7 дней, стоимость рассчитывается при оформлении</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-magenta to-gradient-orange flex items-center justify-center">
                      <Icon name="MapPin" size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Самовывоз</h3>
                    <p className="text-muted-foreground">Из нашего шоурума в центре Москвы, бесплатно</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'warranty' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gradient-purple to-gradient-magenta bg-clip-text text-transparent" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Гарантия
            </h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-purple to-gradient-magenta flex items-center justify-center">
                      <Icon name="Shield" size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Гарантия подлинности</h3>
                    <p className="text-muted-foreground">100% оригинальная продукция от официальных поставщиков</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-orange to-gradient-blue flex items-center justify-center">
                      <Icon name="RefreshCw" size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Обмен и возврат</h3>
                    <p className="text-muted-foreground">14 дней на обмен и возврат товара в идеальном состоянии</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-magenta to-gradient-orange flex items-center justify-center">
                      <Icon name="Award" size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Гарантийный срок</h3>
                    <p className="text-muted-foreground">От 1 года на все товары, расширенная гарантия по запросу</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gradient-purple to-gradient-magenta bg-clip-text text-transparent" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Контакты
            </h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-purple to-gradient-magenta flex items-center justify-center">
                      <Icon name="Phone" size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-orange to-gradient-blue flex items-center justify-center">
                      <Icon name="Mail" size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email</h3>
                    <p className="text-muted-foreground">info@luxestore.ru</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-magenta to-gradient-orange flex items-center justify-center">
                      <Icon name="MapPin" size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Адрес шоурума</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Тверская, д. 10, оф. 301</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-blue to-gradient-purple flex items-center justify-center">
                      <Icon name="Clock" size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Часы работы</h3>
                    <p className="text-muted-foreground">Пн-Пт: 10:00 - 20:00, Сб-Вс: 11:00 - 19:00</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gradient-purple via-gradient-magenta to-gradient-orange bg-clip-text text-transparent" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            LUXE STORE
          </h3>
          <p className="text-gray-400 mb-6">Премиальные аксессуары для вашего стиля</p>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
              <Icon name="Instagram" size={24} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
              <Icon name="Facebook" size={24} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
              <Icon name="Twitter" size={24} />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
