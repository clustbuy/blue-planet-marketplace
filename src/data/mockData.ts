import { Product } from "@/components/ProductCard";

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Беспроводные наушники с активным шумоподавлением Premium",
    price: 5990,
    oldPrice: 8990,
    rating: 4.8,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    badge: "Хит продаж",
    seller: "TechStore"
  },
  {
    id: 2,
    title: "Смарт-часы с AMOLED дисплеем и мониторингом здоровья",
    price: 12490,
    oldPrice: 15990,
    rating: 4.6,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    badge: "Новинка",
    seller: "GadgetWorld"
  },
  {
    id: 3,
    title: "Кроссовки спортивные для бега Air Comfort",
    price: 4290,
    oldPrice: 6490,
    rating: 4.7,
    reviews: 1543,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    seller: "SportLine"
  },
  {
    id: 4,
    title: "Рюкзак городской водонепроницаемый 25л",
    price: 2990,
    rating: 4.5,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    seller: "BagMaster"
  },
  {
    id: 5,
    title: "Портативная Bluetooth колонка 20Вт с RGB подсветкой",
    price: 3490,
    oldPrice: 4990,
    rating: 4.4,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    badge: "Скидка",
    seller: "AudioPro"
  },
  {
    id: 6,
    title: "Набор кухонных ножей из дамасской стали 6 предметов",
    price: 7890,
    oldPrice: 11990,
    rating: 4.9,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop",
    badge: "Топ",
    seller: "КухняПро"
  },
  {
    id: 7,
    title: "Увлажнитель воздуха ультразвуковой с ароматизацией",
    price: 2490,
    rating: 4.3,
    reviews: 321,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    seller: "HomeComfort"
  },
  {
    id: 8,
    title: "Механическая клавиатура RGB с горячей заменой свитчей",
    price: 6790,
    oldPrice: 8990,
    rating: 4.7,
    reviews: 1123,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
    badge: "Выбор покупателей",
    seller: "KeyboardLab"
  },
  {
    id: 9,
    title: "Фитнес-браслет с пульсоксиметром и GPS трекером",
    price: 3290,
    oldPrice: 4590,
    rating: 4.5,
    reviews: 765,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
    seller: "FitGear"
  },
  {
    id: 10,
    title: "Кофемашина автоматическая с капучинатором Barista Pro",
    price: 24990,
    oldPrice: 32990,
    rating: 4.8,
    reviews: 543,
    image: "https://images.unsplash.com/photo-1517467139951-f5a925c9f2e0?w=400&h=400&fit=crop",
    badge: "Премиум",
    seller: "CoffeeHouse"
  },
  {
    id: 11,
    title: "Электросамокат складной 350Вт запас хода 30км",
    price: 19990,
    oldPrice: 27990,
    rating: 4.6,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=400&fit=crop",
    badge: "Скидка",
    seller: "RideCity"
  },
  {
    id: 12,
    title: "Парфюмерная вода унисекс Aqua Fresh 100ml",
    price: 1990,
    oldPrice: 3490,
    rating: 4.4,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    seller: "PerfumeBox"
  },
];

export const categories = [
  { name: "Электроника", icon: "📱", count: 45230 },
  { name: "Одежда", icon: "👕", count: 128340 },
  { name: "Дом и сад", icon: "🏠", count: 67890 },
  { name: "Красота и здоровье", icon: "💄", count: 34560 },
  { name: "Спорт и отдых", icon: "⚽", count: 23450 },
  { name: "Детские товары", icon: "🧸", count: 18920 },
  { name: "Продукты питания", icon: "🍎", count: 56780 },
  { name: "Автотовары", icon: "🚗", count: 12340 },
  { name: "Книги", icon: "📚", count: 89120 },
  { name: "Зоотовары", icon: "🐾", count: 7650 },
];

export const banners = [
  { title: "Весенняя распродажа", subtitle: "Скидки до 70% на тысячи товаров", color: "from-primary to-primary-dark" },
  { title: "Бесплатная доставка", subtitle: "От 2000 ₽ по всей России", color: "from-success to-emerald-600" },
  { title: "Кэшбэк до 30%", subtitle: "На первый заказ в приложении", color: "from-accent to-orange-600" },
];
