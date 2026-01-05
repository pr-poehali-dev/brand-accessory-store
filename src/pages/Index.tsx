import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ProductCatalog } from '@/components/store/ProductCatalog';
import { CartSheet } from '@/components/store/CartSheet';
import { InfoSections } from '@/components/store/InfoSections';
import { Product, CartItem, PRODUCTS } from '@/components/store/types';

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('catalog');
  const [flyingItems, setFlyingItems] = useState<{ id: string; startX: number; startY: number; image: string }[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderForm, setOrderForm] = useState({ fullName: '', phone: '', address: '' });
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  const addToCart = (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    const cartRect = cartButtonRef.current?.getBoundingClientRect();

    if (cartRect) {
      const flyingId = `${product.id}-${Date.now()}`;
      setFlyingItems(prev => [...prev, {
        id: flyingId,
        startX: buttonRect.left + buttonRect.width / 2,
        startY: buttonRect.top + buttonRect.height / 2,
        image: product.image
      }]);

      setTimeout(() => {
        setFlyingItems(prev => prev.filter(item => item.id !== flyingId));
      }, 800);
    }

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

  const updateOrderForm = (field: string, value: string) => {
    setOrderForm(prev => ({ ...prev, [field]: value }));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 relative">
      {flyingItems.map(item => {
        const cartRect = cartButtonRef.current?.getBoundingClientRect();
        const endX = cartRect ? cartRect.left + cartRect.width / 2 : 0;
        const endY = cartRect ? cartRect.top + cartRect.height / 2 : 0;

        return (
          <div
            key={item.id}
            className="fixed z-[100] pointer-events-none"
            style={{
              left: `${item.startX}px`,
              top: `${item.startY}px`,
              width: '60px',
              height: '60px',
              animation: 'flyToCart 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
              '--end-x': `${endX - item.startX}px`,
              '--end-y': `${endY - item.startY}px`,
            } as React.CSSProperties}
          >
            <img 
              src={item.image} 
              alt="Flying item" 
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
        );
      })}
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

            <CartSheet 
              cart={cart}
              totalItems={totalItems}
              totalPrice={totalPrice}
              showCheckout={showCheckout}
              orderForm={orderForm}
              cartButtonRef={cartButtonRef}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onShowCheckout={setShowCheckout}
              onUpdateForm={updateOrderForm}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'catalog' && (
          <ProductCatalog products={PRODUCTS} onAddToCart={addToCart} />
        )}
        
        <InfoSections activeSection={activeSection} />
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
