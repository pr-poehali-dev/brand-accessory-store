import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { CartItem } from './types';

interface CartSheetProps {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  showCheckout: boolean;
  orderForm: { fullName: string; phone: string; address: string };
  cartButtonRef: React.RefObject<HTMLButtonElement>;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveFromCart: (id: number) => void;
  onShowCheckout: (show: boolean) => void;
  onUpdateForm: (field: string, value: string) => void;
}

export const CartSheet = ({
  cart,
  totalItems,
  totalPrice,
  showCheckout,
  orderForm,
  cartButtonRef,
  onUpdateQuantity,
  onRemoveFromCart,
  onShowCheckout,
  onUpdateForm
}: CartSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button ref={cartButtonRef} variant="outline" size="icon" className="relative">
          <Icon name="ShoppingCart" size={20} />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-gradient-magenta to-gradient-orange border-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
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
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 ml-auto"
                          onClick={() => onRemoveFromCart(item.id)}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              {!showCheckout ? (
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Итого:</span>
                    <span className="bg-gradient-to-r from-gradient-purple to-gradient-magenta bg-clip-text text-transparent">
                      {totalPrice.toLocaleString()} ₽
                    </span>
                  </div>
                  <Button 
                    onClick={() => onShowCheckout(true)}
                    className="w-full bg-gradient-to-r from-gradient-purple via-gradient-magenta to-gradient-orange hover:opacity-90 transition-opacity" 
                    size="lg"
                  >
                    Оформить заказ
                  </Button>
                </div>
              ) : (
                <div className="border-t pt-4 mt-4 space-y-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => onShowCheckout(false)}
                    className="mb-2"
                  >
                    <Icon name="ArrowLeft" size={18} className="mr-2" />
                    Назад к корзине
                  </Button>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">ФИО</Label>
                      <Input 
                        id="fullName"
                        placeholder="Иванов Иван Иванович"
                        value={orderForm.fullName}
                        onChange={(e) => onUpdateForm('fullName', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={orderForm.phone}
                        onChange={(e) => onUpdateForm('phone', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Адрес доставки</Label>
                      <Input 
                        id="address"
                        placeholder="г. Москва, ул. Примерная, д. 1, кв. 1"
                        value={orderForm.address}
                        onChange={(e) => onUpdateForm('address', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Товары ({totalItems} шт.)</span>
                      <span>{totalPrice.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Доставка</span>
                      <span>{totalPrice >= 50000 ? 'Бесплатно' : '500 ₽'}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Итого:</span>
                      <span className="bg-gradient-to-r from-gradient-purple to-gradient-magenta bg-clip-text text-transparent">
                        {(totalPrice >= 50000 ? totalPrice : totalPrice + 500).toLocaleString()} ₽
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-gradient-purple via-gradient-magenta to-gradient-orange hover:opacity-90 transition-opacity" 
                    size="lg"
                    disabled={!orderForm.fullName || !orderForm.phone || !orderForm.address}
                  >
                    <Icon name="Check" size={18} className="mr-2" />
                    Подтвердить заказ
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
