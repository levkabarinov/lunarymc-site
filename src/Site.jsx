import React from 'react';
import { ArrowUpRight, Sparkles, Pickaxe, Trophy, Coins, Users, ShieldCheck, ShoppingBag, Gamepad2, ChevronDown, Menu, X, Zap, Globe2, Blocks } from 'lucide-react';

const APP_URL = 'https://lunarymc-miniapp.vercel.app';
const REPO_URL = 'https://github.com/levkabarinov/lunarymc-miniapp';

const features = [
  { icon: Pickaxe, title: 'Minecraft-интеграция', text: 'Свяжи игровой аккаунт с профилем LunaryMC и следи за своим прогрессом.' },
  { icon: Trophy, title: 'Достижения и рейтинг', text: 'Открывай достижения, развивайся и сравнивай результаты с другими игроками.' },
  { icon: Coins, title: 'Lunary Points', text: 'Получай внутренние очки проекта и используй их в игровом магазине.' },
  { icon: ShoppingBag, title: 'Магазин', text: 'Выбирай предметы и косметику, чтобы сделать свой игровой опыт особенным.' },
  { icon: Users, title: 'Сообщество', text: 'Следи за развитием проекта и участвуй в жизни сообщества.' },
  { icon: ShieldCheck, title: 'Единый профиль', text: 'Твои игровые данные, награды и настройки собраны в одном месте.' },
];

function Site() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [faqOpen, setFaqOpen] = React.useState(0);
  const closeMenu = () => setMenuOpen(false);
  const faqs = [
    ['Что такое LunaryMC?', 'LunaryMC — проект вокруг Minecraft, который объединяет игровой профиль, достижения, рейтинг, магазин и систему Lunary Points.'],
    ['Зачем связывать Minecraft-аккаунт?', 'Привязка помогает связать игровой профиль с Mini App и использовать доступные функции проекта.'],
    ['Что такое Lunary Points?', 'Это внутренняя валюта проекта. Её можно использовать в доступных разделах магазина согласно правилам проекта.'],
  ];
  return <div className="site">
    <header className="header">
      <a className="brand" href="#top" onClick={closeMenu}><span className="brand-mark"><span>✦</span></span><span>LUNARY<span className="brand-light">MC</span><small>MINECRAFT PROJECT</small></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        <a href="#features" onClick={closeMenu}>Возможности</a><a href="#points" onClick={closeMenu}>Lunary Points</a><a href="#about" onClick={closeMenu}>О проекте</a><a href="#faq" onClick={closeMenu}>FAQ</a>
        <a className="nav-cta" href={APP_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>Открыть Mini App <ArrowUpRight size={16}/></a>
      </nav>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-grid"></div><div className="orb orb-one"></div><div className="orb orb-two"></div>
        <div className="hero-content">
          <div className="status-pill"><span className="status-dot"></span> MINECRAFT COMMUNITY PROJECT</div>
          <h1>ТВОЙ МИР.<br/><span>ТВОИ ПРАВИЛА.</span></h1>
          <p className="hero-copy">Больше, чем Minecraft. Развивай профиль, открывай достижения, зарабатывай Lunary Points и собирай свой игровой путь в одном месте.</p>
          <div className="hero-actions"><a className="btn btn-primary" href={APP_URL} target="_blank" rel="noreferrer">Перейти в Mini App <ArrowUpRight size={18}/></a><a className="btn btn-ghost" href="#features">Узнать больше <ChevronDown size={17}/></a></div>
          <div className="hero-note"><span><Sparkles size={14}/> Единая система прогресса</span><i></i><span><Globe2 size={14}/> Мир LunaryMC</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="planet-ring ring-a"></div><div className="planet-ring ring-b"></div>
          <div className="planet"><div className="planet-crater c1"></div><div className="planet-crater c2"></div><div className="planet-crater c3"></div><div className="planet-shine"></div></div>
          <div className="float-card card-top"><span className="mini-icon"><Trophy size={17}/></span><span><b>ACHIEVEMENTS</b><small>Твой следующий уровень</small></span></div>
          <div className="float-card card-bottom"><span className="mini-icon gold"><Coins size={18}/></span><span><b>LUNARY POINTS</b><small>Награды за активность</small></span><strong>✦</strong></div>
          <div className="spark s1">✦</div><div className="spark s2">✧</div><div className="spark s3">✦</div>
        </div>
        <div className="hero-bottom"><span>01 / EXPLORE THE UNIVERSE</span><span>SCROLL TO DISCOVER ↓</span></div>
      </section>

      <section className="ticker"><div><span>✦ LUNARYMC</span><b>PLAY</b><span>✦ PROGRESS</span><b>UNLOCK</b><span>✦ EXPLORE</span><b>REPEAT</b><span>✦ LUNARYMC</span></div></section>

      <section className="section features-section" id="features">
        <div className="section-heading"><div><span className="eyebrow">WHAT YOU CAN DO</span><h2>ВСЁ ДЛЯ ТВОЕГО<br/><em>ИГРОВОГО ПУТИ</em></h2></div><p>Инструменты, которые объединяют игру, прогресс и сообщество в единую систему.</p></div>
        <div className="feature-grid">{features.map((item, i) => {const Icon=item.icon;return <article className="feature-card" key={item.title}><div className="feature-top"><span className="feature-icon"><Icon size={21}/></span><span className="feature-number">0{i+1}</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="feature-line"></div></article>})}</div>
      </section>

      <section className="points-section" id="points"><div className="points-visual"><div className="coin-halo"></div><div className="coin"><span>✦</span><small>LUNARY</small></div><div className="coin-star star-a">✧</div><div className="coin-star star-b">✦</div></div><div className="points-copy"><span className="eyebrow">YOUR IN-GAME ECONOMY</span><h2>ЗАРАБАТЫВАЙ.<br/><em>ОТКРЫВАЙ.</em><br/>СОБИРАЙ.</h2><p>Lunary Points — внутренняя валюта проекта. Используй очки в магазине, открывай новые возможности и пополняй свою коллекцию.</p><a className="btn btn-primary" href={APP_URL} target="_blank" rel="noreferrer">Заглянуть в магазин <ArrowUpRight size={18}/></a></div></section>

      <section className="section about-section" id="about"><div className="about-panel"><div className="about-copy"><span className="eyebrow">WELCOME TO LUNARYMC</span><h2>НЕ ПРОСТО ИГРА.<br/><em>ЦЕЛАЯ ВСЕЛЕННАЯ.</em></h2><p>LunaryMC развивается как единая экосистема для игроков Minecraft. Мы объединяем игровой опыт и цифровые инструменты, чтобы твои достижения не терялись, а прогресс становился частью большой истории.</p><a className="text-link" href={REPO_URL} target="_blank" rel="noreferrer">Проект на GitHub <ArrowUpRight size={16}/></a></div><div className="about-symbol"><div className="cube cube-back"></div><div className="cube cube-front"><Blocks size={58}/></div><div className="cube-glow"></div><span>BUILD YOUR<br/>OWN UNIVERSE</span></div></div></section>

      <section className="section faq-section" id="faq"><div className="section-heading"><div><span className="eyebrow">NEED TO KNOW</span><h2>ЧАСТЫЕ <em>ВОПРОСЫ</em></h2></div><p>Коротко о главном.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><button className={'faq-item '+(faqOpen===i?'faq-active':'')} key={q} onClick={()=>setFaqOpen(faqOpen===i?-1:i)}><span className="faq-question"><b>0{i+1}</b>{q}</span><span className="faq-plus">{faqOpen===i?'−':'+'}</span>{faqOpen===i&&<p>{a}</p>}</button>)}</div></section>

      <section className="final-cta"><div className="cta-stars">✦　　✧　　 ✦</div><span className="eyebrow">YOUR JOURNEY STARTS HERE</span><h2>ГОТОВ ОТКРЫТЬ<br/><em>МИР LUNARYMC?</em></h2><p>Твой профиль и возможности проекта уже ждут тебя.</p><a className="btn btn-primary" href={APP_URL} target="_blank" rel="noreferrer">Открыть Mini App <ArrowUpRight size={18}/></a></section>
    </main>
    <footer className="footer"><a className="brand" href="#top"><span className="brand-mark"><span>✦</span></span><span>LUNARY<span className="brand-light">MC</span><small>MINECRAFT PROJECT</small></span></a><span>© {new Date().getFullYear()} LUNARYMC. НЕОФИЦИАЛЬНЫЙ ФАН-ПРОЕКТ.</span><a href={REPO_URL} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a></footer>
  </div>;
}
export default Site;