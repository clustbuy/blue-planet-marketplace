import MarketLayout from "@/components/MarketLayout";
import { formatPrice } from "@/components/ProductCard";
import { mockProducts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CartItem {
  product: typeof mockProducts[0];
  quantity: number;
}

const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>([
    { product: mockProducts[0], quantity: 1 },
    { product: mockProducts[2], quantity: 2 },
    { product: mockProducts[5], quantity: 1 },
  ]);

  const updateQty = (id: number, delta: number) => {
    setItems(items.map(item =>
      item.product.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.product.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const oldTotal = items.reduce((sum, item) => sum + (item.product.oldPrice || item.product.price) * item.quantity, 0);
  const savings = oldTotal - subtotal;

  if (items.length === 0) {
    return (
      <MarketLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Корзина пуста</h1>
          <p className="text-muted-foreground mb-6">Добавьте товары, чтобы оформить заказ</p>
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
        <h1 className="text-2xl font-bold text-foreground mb-6">
          Корзина <span className="text-muted-foreground font-normal text-lg">({items.length})</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart items */}
          <div className="flex-1 space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="bg-card rounded-xl border p-4 flex gap-4">
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded-lg" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`} className="text-sm font-medium text-foreground hover:text-primary line-clamp-2">
                    {product.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">Продавец: {product.seller}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded-lg">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQty(product.id, -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQty(product.id, 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">{formatPrice(product.price * quantity)}</div>
                      {product.oldPrice && (
                        <div className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice * quantity)}</div>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-destructive" onClick={() => removeItem(product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-card rounded-xl border p-5 sticky top-36 space-y-4">
              <h3 className="font-semibold text-foreground text-lg">Итого</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Товары ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span className="text-foreground">{formatPrice(oldTotal)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Скидка</span>
                    <span className="text-destructive">-{formatPrice(savings)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="text-success">Бесплатно</span>
                </div>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-foreground text-lg">К оплате</span>
                <span className="font-bold text-foreground text-lg">{formatPrice(subtotal)}</span>
              </div>
              <Button className="w-full h-12 text-base">Оформить заказ</Button>
            </div>
          </div>
        </div>
      </div>
    </MarketLayout>
  );
};

export default CartPage;
