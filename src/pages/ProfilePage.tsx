import MarketLayout from "@/components/MarketLayout";
import { Button } from "@/components/ui/button";
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: Package, label: "Мои заказы", desc: "3 активных заказа", to: "#" },
  { icon: Heart, label: "Избранное", desc: "12 товаров", to: "/favorites" },
  { icon: MapPin, label: "Адреса доставки", desc: "2 адреса", to: "#" },
  { icon: CreditCard, label: "Способы оплаты", desc: "Visa •••• 4242", to: "#" },
  { icon: Settings, label: "Настройки", desc: "Уведомления, безопасность", to: "#" },
];

const orders = [
  { id: "MK-28431", date: "5 марта 2026", status: "В пути", statusColor: "bg-primary", items: 2, total: 10280 },
  { id: "MK-27995", date: "1 марта 2026", status: "Доставлен", statusColor: "bg-success", items: 1, total: 5990 },
  { id: "MK-26712", date: "18 февраля 2026", status: "Доставлен", statusColor: "bg-success", items: 3, total: 15670 },
];

const ProfilePage = () => {
  return (
    <MarketLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-card rounded-xl border p-5 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full header-gradient flex items-center justify-center">
                  <User className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Иван Петров</h2>
                  <p className="text-sm text-muted-foreground">ivan@example.com</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border overflow-hidden">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors border-b last:border-0"
                >
                  <item.icon className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
              <button className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors w-full text-left text-destructive">
                <LogOut className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">Выйти</span>
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-6">Мои заказы</h1>
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-card rounded-xl border p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-semibold text-foreground">Заказ {order.id}</span>
                      <span className="text-sm text-muted-foreground ml-3">{order.date}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-primary-foreground ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{order.items} товаров</span>
                    <span className="font-bold text-foreground">{new Intl.NumberFormat("ru-RU").format(order.total)} ₽</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MarketLayout>
  );
};

export default ProfilePage;
