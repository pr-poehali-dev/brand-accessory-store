import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface InfoSectionsProps {
  activeSection: string;
}

export const InfoSections = ({ activeSection }: InfoSectionsProps) => {
  if (activeSection === 'delivery') {
    return (
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
    );
  }

  if (activeSection === 'warranty') {
    return (
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
    );
  }

  if (activeSection === 'contacts') {
    return (
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
    );
  }

  return null;
};
