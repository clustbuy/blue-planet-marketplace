import MarketLayout from "@/components/MarketLayout";
import ProductCard from "@/components/ProductCard";
import { mockProducts, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";

const CatalogPage = () => {
  const [priceRange, setPriceRange] = useState([0, 35000]);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <MarketLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4">
          <span className="hover:text-primary cursor-pointer">Главная</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">Каталог</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Каталог товаров</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Фильтры
            </Button>
            <Select defaultValue="popular">
              <SelectTrigger className="w-44 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">По популярности</SelectItem>
                <SelectItem value="price-asc">Сначала дешёвые</SelectItem>
                <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="new">Новинки</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
            <div className="bg-card rounded-xl border p-4 space-y-6 sticky top-36">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Категории</h3>
                <div className="space-y-2">
                  {categories.slice(0, 6).map((cat) => (
                    <label key={cat.name} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox />
                      <span className="text-sm text-foreground">{cat.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{cat.count.toLocaleString("ru-RU")}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Цена, ₽</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={50000}
                  step={500}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{priceRange[0].toLocaleString("ru-RU")} ₽</span>
                  <span>{priceRange[1].toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Рейтинг</h3>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5].map((r) => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox />
                      <span className="text-sm text-foreground">от {r} ⭐</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full">Применить</Button>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-1 mt-8">
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                  className="w-9 h-9"
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MarketLayout>
  );
};

export default CatalogPage;
