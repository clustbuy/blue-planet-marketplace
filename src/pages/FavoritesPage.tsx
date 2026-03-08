import MarketLayout from "@/components/MarketLayout";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/data/mockData";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FavoritesPage = () => {
  const favorites = mockProducts.slice(0, 6);

  if (favorites.length === 0) {
    return (
      <MarketLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Избранное пусто</h1>
          <p className="text-muted-foreground mb-6">Добавляйте товары в избранное, чтобы не потерять</p>
          <Link to="/catalog">
            <Button>Перейти в каталог</Button>
          </Link>
        </div>
      </MarketLayout>
    );
  }

  return (
    <MarketLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Избранное</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MarketLayout>
  );
};

export default FavoritesPage;
