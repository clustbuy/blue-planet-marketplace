import MarketLayout from "@/components/MarketLayout";
import ProductCard from "@/components/ProductCard";
import { mockProducts, categories, banners } from "@/data/mockData";
import { ChevronRight, Truck, Shield, RotateCcw, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const features = [
  { icon: Truck, text: "Бесплатная доставка от 2000 ₽" },
  { icon: Shield, text: "Гарантия качества товаров" },
  { icon: RotateCcw, text: "Возврат в течение 30 дней" },
  { icon: Clock, text: "Доставка за 1-2 дня" },
];

const Index = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MarketLayout>
      {/* Banner carousel */}
      <section className="container mx-auto px-4 pt-4">
        <div className="relative rounded-2xl overflow-hidden h-40 sm:h-52 md:h-64">
          {banners.map((banner, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-gradient-to-r ${banner.color} flex items-center px-8 md:px-16 transition-opacity duration-500 ${i === currentBanner ? 'opacity-100' : 'opacity-0'}`}
            >
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-2">{banner.title}</h2>
                <p className="text-primary-foreground/80 text-sm md:text-lg">{banner.subtitle}</p>
              </div>
            </div>
          ))}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentBanner ? 'bg-primary-foreground w-6' : 'bg-primary-foreground/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features bar */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f) => (
            <div key={f.text} className="flex items-center gap-3 bg-card rounded-xl p-3 border shadow-card">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-foreground">{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Категории</h2>
          <Link to="/catalog" className="text-sm text-primary hover:underline flex items-center gap-1">
            Все <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/catalog?category=${encodeURIComponent(cat.name)}`}
              className="bg-card rounded-xl border shadow-card hover:shadow-card-hover p-4 flex flex-col items-center gap-2 transition-all group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-medium text-foreground text-center group-hover:text-primary transition-colors">{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat.count.toLocaleString("ru-RU")} товаров</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular products */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Популярные товары</h2>
          <Link to="/catalog" className="text-sm text-primary hover:underline flex items-center gap-1">
            Смотреть все <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Deals section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">🔥 Скидки дня</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {mockProducts.filter(p => p.oldPrice).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </MarketLayout>
  );
};

export default Index;
