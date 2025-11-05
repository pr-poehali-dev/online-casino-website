import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  specs: {
    display?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    battery?: string;
    camera?: string;
  };
  featured?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'UltraPhone X Pro',
    price: 89990,
    category: 'Смартфоны',
    image: 'https://cdn.poehali.dev/projects/de9596b4-4dc3-4b8b-82a1-720a308efe43/files/dc166566-c706-4474-9122-9fe04afb99a0.jpg',
    specs: {
      display: '6.7" OLED 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12 ГБ',
      storage: '256 ГБ',
      battery: '5000 мАч',
      camera: '200 МП'
    },
    featured: true
  },
  {
    id: 2,
    name: 'SmartWatch Ultra',
    price: 34990,
    category: 'Умные часы',
    image: 'https://cdn.poehali.dev/projects/de9596b4-4dc3-4b8b-82a1-720a308efe43/files/521a40bf-1ff7-41c3-b3ed-712e92260a3e.jpg',
    specs: {
      display: '1.9" AMOLED',
      battery: '7 дней',
      processor: 'Dual-core'
    },
    featured: true
  },
  {
    id: 3,
    name: 'AirPods Max Pro',
    price: 24990,
    category: 'Наушники',
    image: 'https://cdn.poehali.dev/projects/de9596b4-4dc3-4b8b-82a1-720a308efe43/files/48f1b952-01c6-499f-bade-21938ed1f981.jpg',
    specs: {
      battery: '30 часов',
      processor: 'H2 чип'
    },
    featured: true
  },
  {
    id: 4,
    name: 'Tablet Pro 12.9',
    price: 69990,
    category: 'Планшеты',
    image: '/placeholder.svg',
    specs: {
      display: '12.9" Liquid Retina',
      processor: 'M2',
      ram: '8 ГБ',
      storage: '128 ГБ',
      battery: '10 часов'
    }
  },
  {
    id: 5,
    name: 'Gaming Laptop X1',
    price: 149990,
    category: 'Ноутбуки',
    image: '/placeholder.svg',
    specs: {
      display: '15.6" 240Hz',
      processor: 'Intel i9-14900H',
      ram: '32 ГБ',
      storage: '1 ТБ SSD'
    }
  },
  {
    id: 6,
    name: 'Smart Speaker Max',
    price: 14990,
    category: 'Умный дом',
    image: '/placeholder.svg',
    specs: {
      processor: 'Quad-core'
    }
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<'home' | 'catalog' | 'about' | 'contact'>('home');

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TechStore
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Button
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
              >
                Главная
              </Button>
              <Button
                variant={activeSection === 'catalog' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('catalog')}
              >
                Каталог
              </Button>
              <Button
                variant={activeSection === 'about' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('about')}
              >
                О магазине
              </Button>
              <Button
                variant={activeSection === 'contact' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('contact')}
              >
                Контакты
              </Button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cartItemsCount > 0 ? `${cartItemsCount} товар(ов) в корзине` : 'Корзина пуста'}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <Icon name="ShoppingBag" size={48} className="mb-4 opacity-50" />
                      <p>Добавьте товары в корзину</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.category}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.id, -1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.id, 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                  </div>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                                <p className="font-bold mt-2">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Separator />
                      <div className="flex items-center justify-between text-lg font-bold">
                        <span>Итого:</span>
                        <span>{cartTotal.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                        <Icon name="ArrowRight" size={20} className="ml-2" />
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-12 md:p-20 text-white">
              <div className="relative z-10 max-w-2xl">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">Новинки 2024</Badge>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Технологии будущего уже здесь
                </h2>
                <p className="text-xl mb-8 text-white/90">
                  Флагманская электроника с доставкой по всей России. Официальная гарантия 2 года.
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => setActiveSection('catalog')}
                >
                  Смотреть каталог
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <Icon name="Smartphone" size={400} />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Хиты продаж</h3>
                  <p className="text-muted-foreground">Самые популярные товары этого месяца</p>
                </div>
                <Button variant="outline" onClick={() => setActiveSection('catalog')}>
                  Все товары
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover"
                        />
                        <Badge className="absolute top-4 left-4 bg-secondary">{product.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="mb-2">{product.name}</CardTitle>
                      <CardDescription className="mb-4">
                        <div className="space-y-1 mt-3">
                          {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2 text-sm">
                              <Icon name="Check" size={14} className="text-primary" />
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex items-center justify-between">
                      <span className="text-2xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
                      <Button onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-2">Каталог товаров</h2>
              <p className="text-muted-foreground">Полный ассортимент электроники и гаджетов</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-secondary">{product.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="mb-2">{product.name}</CardTitle>
                    <CardDescription>
                      <div className="space-y-1 mt-3">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2 text-sm">
                            <Icon name="Check" size={14} className="text-primary" />
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex items-center justify-between">
                    <span className="text-2xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
                    <Button onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-4">О магазине</h2>
              <p className="text-xl text-muted-foreground">
                TechStore — ваш надежный партнер в мире высоких технологий
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Shield" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Гарантия качества</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Официальная гарантия 2 года на все товары. Только оригинальная продукция.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Truck" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Быстрая доставка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Доставка по России от 1 дня. Бесплатно при заказе от 50 000 ₽.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Headphones" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Поддержка 24/7</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Квалифицированные консультанты ответят на все ваши вопросы.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Наша история</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  TechStore основан в 2020 году группой энтузиастов, влюбленных в технологии.
                  За это время мы выросли из небольшого интернет-магазина в один из крупнейших
                  ритейлеров электроники в России.
                </p>
                <p>
                  Мы работаем напрямую с производителями, что позволяет нам предлагать
                  конкурентные цены и гарантировать подлинность каждого товара. Наша миссия —
                  делать передовые технологии доступными для каждого.
                </p>
                <p>
                  Более 50 000 довольных клиентов доверяют нам свои покупки. Присоединяйтесь
                  к нашей технологической семье!
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-4">Контакты</h2>
              <p className="text-xl text-muted-foreground">
                Свяжитесь с нами любым удобным способом
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" size={20} />
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lg font-semibold">8 (800) 555-35-35</p>
                  <p className="text-sm text-muted-foreground">Бесплатно по России, 24/7</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Mail" size={20} />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lg font-semibold">info@techstore.ru</p>
                  <p className="text-sm text-muted-foreground">Ответим в течение часа</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" size={20} />
                    Адрес
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lg font-semibold">г. Москва, ул. Тверская, д. 1</p>
                  <p className="text-sm text-muted-foreground">Пн-Вс: 10:00 - 22:00</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageCircle" size={20} />
                    Мессенджеры
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex gap-3">
                    <Button size="icon" variant="outline">
                      <Icon name="MessageCircle" size={20} />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Icon name="Send" size={20} />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Icon name="Mail" size={20} />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">WhatsApp, Telegram, Viber</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Остались вопросы?</CardTitle>
                <CardDescription>Заполните форму и мы свяжемся с вами в ближайшее время</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Имя</label>
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Сообщение</label>
                    <textarea
                      placeholder="Ваш вопрос или комментарий"
                      rows={5}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <Button size="lg" className="w-full">
                    Отправить сообщение
                    <Icon name="Send" size={18} className="ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-muted mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Zap" size={16} className="text-white" />
                </div>
                <span className="font-bold text-lg">TechStore</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ваш надежный партнер в мире высоких технологий с 2020 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Смартфоны</li>
                <li>Ноутбуки</li>
                <li>Планшеты</li>
                <li>Аксессуары</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О компании</li>
                <li>Доставка и оплата</li>
                <li>Гарантия</li>
                <li>Возврат товара</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>8 (800) 555-35-35</li>
                <li>info@techstore.ru</li>
                <li>г. Москва, ул. Тверская, д. 1</li>
              </ul>
            </div>
          </div>
          <Separator className="mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2024 TechStore. Все права защищены.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span>Политика конфиденциальности</span>
              <span>•</span>
              <span>Условия использования</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}