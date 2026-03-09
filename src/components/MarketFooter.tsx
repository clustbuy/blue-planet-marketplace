import { Link } from "react-router-dom";

const footerLinks = {
  "Покупателям": ["Частые вопросы", "Покупать как бизнес", "Доставка по клику из пункта выдачи", "Юридическая информация", "Как обрабатываем ваши персональные данные", "Гид по безопасности"],
  "Продавцам и партнёрам": ["Продавать товары", "Открыть пункт выдачи", "Предложить помещение", "Развозить грузы", "Доставлять заказы"],
  "Наши проекты": ["Маркет Guru", "Маркет Stream", "Маркет Track"],
  "Компания": ["О нас", "Пресс-служба", "Контакты", "Вакансии", "Сообщить о мошенничестве", "Социальные сети"],
  "Приложение": ["Android и iOS"],
};

const MarketFooter = () => {
  return (
    <footer className="mt-auto" style={{ background: '#2d2d2d' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-sm mb-3">{title}</h4>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-[13px] transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-4 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          © Маркет 2004–2026. Все права защищены. <Link to="#" style={{ color: 'rgba(255,255,255,0.4)' }}>Применяются рекомендательные технологии</Link>
        </div>
      </div>
    </footer>
  );
};

export default MarketFooter;
