import { Search, ShoppingCart, User, Menu, Heart, MapPin, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const categories = [
  "Электроника", "Одежда", "Дом и сад", "Красота", "Спорт", 
  "Детям", "Продукты", "Авто", "Книги", "Зоотовары"
];

const MarketHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="header-gradient">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <span className="text-primary-foreground font-bold text-xl hidden sm:block">Маркет</span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative flex">
                <Input
                  placeholder="Искать товары..."
                  className="rounded-r-none border-0 bg-primary-foreground h-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                />
                <Button size="default" className="rounded-l-none bg-accent hover:bg-accent/90 border-0 h-10 px-5">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Link to="/favorites">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs border-0">
                  3
                </Badge>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-primary-foreground/10 md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories bar */}
      <div className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className={`${menuOpen ? 'flex flex-col py-2' : 'hidden'} md:flex md:flex-row md:items-center md:h-10 gap-1 md:gap-0 overflow-x-auto`}>
            <Link 
              to="/catalog" 
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-light rounded-md transition-colors whitespace-nowrap"
            >
              <Menu className="h-4 w-4" />
              Каталог
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/catalog?category=${encodeURIComponent(cat)}`}
                className="px-3 py-1.5 text-sm text-foreground hover:text-primary hover:bg-primary-light rounded-md transition-colors whitespace-nowrap"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MarketHeader;
