import MarketLayout from "@/components/MarketLayout";
import ProductCard, { formatPrice } from "@/components/ProductCard";
import { mockProducts } from "@/data/mockData";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus, Share2 } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductPage = () => {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === Number(id)) || mockProducts[0];
  const [quantity, setQuantity] = useState(1);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const related = mockProducts.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <MarketLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4">
          <span className="hover:text-primary cursor-pointer">Главная</span>
          <span className="mx-2">/</span>
          <span className="hover:text-primary cursor-pointer">Каталог</span>
          <span className="mx-2">/</span>
          <span className="text-foreground line-clamp-1">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Product image */}
          <div className="bg-card rounded-2xl border overflow-hidden">
            <div className="aspect-square relative">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0">{product.badge}</Badge>
              )}
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm hover:bg-card">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{product.title}</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium text-foreground">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">{product.reviews} отзывов</span>
                <span className="text-sm text-muted-foreground">Продавец: {product.seller}</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-card rounded-xl border p-5">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
                    <Badge className="bg-destructive text-destructive-foreground border-0">-{discount}%</Badge>
                  </>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 my-4">
                <span className="text-sm text-muted-foreground">Количество:</span>
                <div className="flex items-center border rounded-lg">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 h-12 text-base">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  В корзину
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Delivery info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Доставка завтра</p>
                  <p className="text-muted-foreground">Бесплатно от 2000 ₽</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Гарантия 12 месяцев</p>
                  <p className="text-muted-foreground">Официальная гарантия производителя</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Возврат 30 дней</p>
                  <p className="text-muted-foreground">Без объяснения причин</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mb-10">
          <TabsList className="bg-card border w-full justify-start">
            <TabsTrigger value="description">Описание</TabsTrigger>
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы ({product.reviews})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="bg-card rounded-b-xl border border-t-0 p-6">
            <p className="text-foreground leading-relaxed">
              {product.title} — высококачественный товар от проверенного продавца {product.seller}. 
              Изготовлен из премиальных материалов с использованием передовых технологий. 
              Идеально подходит для повседневного использования, отличается надёжностью и долговечностью.
              Все товары проходят строгий контроль качества перед отправкой.
            </p>
          </TabsContent>
          <TabsContent value="specs" className="bg-card rounded-b-xl border border-t-0 p-6">
            <div className="space-y-3">
              {[
                ["Бренд", product.seller],
                ["Артикул", `MK-${product.id}00${product.id}`],
                ["Гарантия", "12 месяцев"],
                ["Страна производства", "Китай"],
                ["Вес", "0.5 кг"],
              ].map(([label, value]) => (
                <div key={label} className="flex border-b pb-2 last:border-0">
                  <span className="w-1/3 text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="bg-card rounded-b-xl border border-t-0 p-6">
            <p className="text-muted-foreground">Отзывы покупателей будут отображаться здесь.</p>
          </TabsContent>
        </Tabs>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Похожие товары</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </MarketLayout>
  );
};

export default ProductPage;
