import { Link } from "react-router-dom";

const footerLinks = {
  "Покупателям": ["Как оформить заказ", "Способы оплаты", "Доставка", "Возврат товара", "FAQ"],
  "Партнёрам": ["Продавайте на Маркете", "Документация API", "Реклама на сайте"],
  "Компания": ["О нас", "Вакансии", "Пресс-центр", "Контакты"],
};

const MarketFooter = () => {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg header-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-xl text-foreground">Маркет</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Маркетплейс с миллионами товаров от проверенных продавцов
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          © 2026 Маркет. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default MarketFooter;
