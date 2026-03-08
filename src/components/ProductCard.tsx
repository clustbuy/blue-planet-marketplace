import { Star, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  seller: string;
}

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-card rounded-xl border shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground border-0 text-xs">
            {product.badge}
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground border-0 text-xs">
            -{discount}%
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 bg-card/80 backdrop-blur-sm hover:bg-card opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
          onClick={(e) => { e.preventDefault(); }}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-xs font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        <h3 className="text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <p className="text-xs text-muted-foreground">{product.seller}</p>

        <div className="mt-auto pt-2 flex items-end justify-between">
          <div>
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="ml-1.5 text-xs text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <Button
            size="icon"
            className="h-8 w-8 rounded-lg"
            onClick={(e) => { e.preventDefault(); }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
export { formatPrice };
