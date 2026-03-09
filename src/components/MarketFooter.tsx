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
    <footer className="mt-auto" style={{ background: '#d3d4dd3d', borderTop: '1px solid #e2e7ed' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 pb-6" style={{ borderBottom: '1px solid #e2e7ed' }}>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-3" style={{ color: '#1a2332' }}>{title}</h4>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-[13px] transition-colors" style={{ color: '#64748b' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#1a2332')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
              {title === "Приложение" && (
                <div className="text-center mt-4">
                  <img src="/images/qr-app.png" alt="QR-код приложения" className="w-[120px] h-[120px] mx-auto mb-2" />
                  <span className="text-xs" style={{ color: '#64748b' }}>ОС Аврора</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pt-4 text-xs flex items-center justify-between" style={{ color: '#999' }}>
          <div>© Маркет 2004–2026. Все права защищены. <Link to="#" style={{ color: '#7b68ee' }}>Применяются рекомендательные технологии</Link></div>
          <div className="flex gap-2">
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ background: '#e2e7ed', color: '#64748b' }} aria-label="ВКонтакте">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.734 3.23C14.734 12.813 14 12.126 14 11.11V7.603A1.104 1.104 0 0 0 12.896 6.5h-2.474a1.982 1.982 0 0 0-1.75.813s1.255-.204 1.255 1.49c0 .42.022 1.626.04 2.64a.73.73 0 0 1-1.272.503 21.54 21.54 0 0 1-2.498-4.543.693.693 0 0 0-.63-.403h-2.99a.508.508 0 0 0-.48.685C3.005 10.175 6.918 18 11.38 18h1.878a.742.742 0 0 0 .742-.742v-1.135a.73.73 0 0 1 1.23-.53l2.247 2.112a1.09 1.09 0 0 0 .746.295h2.953c1.424 0 1.424-.988.687-1.688-.26-.247-3.307-3.592-3.307-3.592a.726.726 0 0 1-.084-.925s2.344-3.292 2.722-4.39c.178-.514-.157-.905-.647-.905z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ background: '#e2e7ed', color: '#64748b' }} aria-label="Одноклассники">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm4.26 3.78a8.5 8.5 0 0 1-3.02 1.27l2.9 2.87a1.25 1.25 0 1 1-1.77 1.77L12 16.82l-2.37 2.37a1.25 1.25 0 1 1-1.77-1.77l2.9-2.87a8.5 8.5 0 0 1-3.02-1.27 1.25 1.25 0 1 1 1.4-2.08 6 6 0 0 0 5.72 0 1.25 1.25 0 1 1 1.4 2.08z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ background: '#e2e7ed', color: '#64748b' }} aria-label="Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketFooter;
