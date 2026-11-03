import { useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Twitter,
  X,
} from "lucide-react";
import NotFound from "./pages/NotFound";

const ASSETS = {
  charredCarrots: "/images/charred-carrots.jpg",
  misoRoastedSquash: "/images/Miso-roasted-squash.jpg",
  sundayRoast: "/images/Sunday-Roast.jpg",

  lemonade: "/images/lemonade.jpg",
  coldCoffee: "/images/Cold-coffee.jpg",
  wattleLatte: "/images/Wattle-latte.jpg",
  ginger: "/images/Ginger.jpg",
  yarraValley: "/images/Yarra-valley.jpg",
  coastalPale: "/images/Coastal-pale.jpg",
  botanicals: "/images/botanical-tonic.jpg",

  oliveOilCake: "/images/Olive-oil-cake.jpg",
  saltedChocolatePot: "/images/Salted-chocolate-pot.jpg",
  lamingtonMess: "/images/Lamington-mess.jpg",
  macadamiaPavlova: "/images/Macadamia-pavlova.jpg",
  roastedPeachRicotta: "/images/Roasted-peach-ricotta.jpg",
  affogato: "/images/Affogato.jpg",
  cheeseQuince: "/images/Chees-quince.jpg",

  hero: "/images/hero-chef-yard.jpg",
  menu: "/images/menu-board.jpg",
  jar: "/images/pantry-jar.jpg",
  supper: "/images/blog-supper.jpg",
  spice: "/images/product-spice.jpg",
};

type Product = {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  image: string;
  featured?: boolean;
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  {
    id: "chili-crisp",
    name: "House Chili Crisp",
    type: "Pantry staple",
    price: 14,
    description: "Slow-cooked aromatics, smoked chile, and toasted sesame. Spoon generously.",
    image: ASSETS.jar,
    featured: true,
  },
  {
    id: "smoked-spice",
    name: "Smoked Spice Blend",
    type: "Finishing spice",
    price: 12,
    description: "A warm, wood-fired blend for vegetables, eggs, grains, and everything in between.",
    image: ASSETS.spice,
    featured: true,
  },
  {
    id: "supper-box",
    name: "Sunday Supper Box",
    type: "Serves two",
    price: 48,
    description: "A rotating chef's menu with a fresh main, sides, and something sweet to finish.",
    image: ASSETS.supper,
    featured: true,
  },
  {
    id: "seasonal-table",
    name: "Seasonal Table Kit",
    type: "Dinner party",
    price: 72,
    description: "Our favorite pantry goods, a playlist, and the little details for a slow evening in.",
    image: ASSETS.menu,
  },
];

const menuItems = [
  { category: "Set Menu", name: "The Chef Yard Table", detail: "six seasonal courses, shared sides, something sweet", price: 68, image: ASSETS.supper },
  { category: "Set Menu", name: "Long Lunch", detail: "three courses, garden salad, house sourdough", price: 48, image: ASSETS.menu },
  { category: "Set Menu", name: "Sunday Roast", detail: "slow roast, crisp potatoes, greens, pan jus", price: 42, image: ASSETS.sundayRoast },
  { category: "Set Menu", name: "Little Yard Menu", detail: "smaller plates and a sweet finish for young guests", price: 24, image: ASSETS.jar },
  { category: "Set Menu", name: "Plant-led Feast", detail: "market vegetables, grains, herbs, and bright sauces", price: 54, image: ASSETS.menu },
  { category: "Set Menu", name: "Chef's Counter", detail: "a front-row tasting menu with kitchen stories", price: 85, image: ASSETS.supper },
  { category: "Set Menu", name: "The Gathering", detail: "family-style plates for four to six guests", price: 72, image: ASSETS.hero },
  { category: "Mains & Starters", name: "Charred carrots & whipped feta", detail: "coriander, hot honey, herbs", price: 12, image: ASSETS.charredCarrots },
  { category: "Mains & Starters", name: "Miso roasted squash", detail: "sesame, spring onion, chili crisp", price: 15, image: ASSETS.misoRoastedSquash },
  { category: "Mains & Starters", name: "Crispy chicken thigh", detail: "lemon potatoes, salsa verde", price: 19, image: ASSETS.hero },
  { category: "Mains & Starters", name: "Market fish of the day", detail: "citrus butter, coastal herbs, garden greens", price: 28, image: ASSETS.menu },
  { category: "Mains & Starters", name: "Herb butter sourdough", detail: "cultured butter, smoked salt", price: 7, image: ASSETS.jar },
  { category: "Mains & Starters", name: "Lemon herb pasta", detail: "parmesan, black pepper, garden greens", price: 17, image: ASSETS.supper },
  { category: "Mains & Starters", name: "Spiced lamb shoulder", detail: "mint, labneh, charred flatbread", price: 26, image: ASSETS.hero },
  { category: "Beverages", name: "House lemonade", detail: "lemon myrtle, native mint, sparkling water", price: 7, image: ASSETS.lemonade },
  { category: "Beverages", name: "Cold brew coffee", detail: "single origin, oat or dairy milk", price: 6, image: ASSETS.coldCoffee },
  { category: "Beverages", name: "Wattle seed latte", detail: "roasted wattle seed, honey, steamed milk", price: 7, image: ASSETS.wattleLatte },
  { category: "Beverages", name: "Ginger & finger lime spritz", detail: "bright citrus, ginger, soda", price: 9, image: ASSETS.ginger },
  { category: "Beverages", name: "Yarra Valley pinot noir", detail: "red berries, soft spice, a clean finish", price: 14, image: ASSETS.yarraValley },
  { category: "Beverages", name: "Coastal pale ale", detail: "bright, crisp, brewed nearby", price: 11, image: ASSETS.coastalPale },
  { category: "Beverages", name: "Native botanical tonic", detail: "quandong, lemon myrtle, aromatic bitters", price: 10, image: ASSETS.botanicals },
  { category: "Desserts", name: "Olive oil cake", detail: "citrus curd, crème fraîche", price: 9, image: ASSETS.oliveOilCake },
  { category: "Desserts", name: "Salted chocolate pot", detail: "roasted hazelnut, flaky salt", price: 8, image: ASSETS.saltedChocolatePot },
  { category: "Desserts", name: "Lamington mess", detail: "coconut, raspberry, soft vanilla sponge", price: 12, image: ASSETS.lamingtonMess },
  { category: "Desserts", name: "Macadamia pavlova", detail: "passionfruit, cream, native berries", price: 13, image: ASSETS.macadamiaPavlova },
  { category: "Desserts", name: "Roasted peach & ricotta", detail: "wattle honey, lemon verbena", price: 11, image: ASSETS.roastedPeachRicotta },
  { category: "Desserts", name: "Affogato", detail: "vanilla bean gelato, espresso, almond praline", price: 10, image: ASSETS.affogato },
  { category: "Desserts", name: "Cheese & quince", detail: "three Australian cheeses, lavosh, quince", price: 18, image: ASSETS.cheeseQuince },
];

const menuGroups = [
  { slug: "set-menu", label: "Set Menu", eyebrow: "The considered menu", title: <>A little<br /><em>of everything.</em></>, copy: "A generous sequence of Chef Yard favourites, designed for long lunches, celebrations, and letting the kitchen choose the good stuff." },
  { slug: "mains-starters", label: "Mains & Starters", eyebrow: "From the kitchen", title: <>The good stuff<br /><em>right now.</em></>, copy: "Small plates, market finds, and the dishes our cooks are most excited to send out tonight." },
  { slug: "beverages", label: "Beverages", eyebrow: "Something to sip", title: <>Pour something<br /><em>bright.</em></>, copy: "Native botanicals, local wines, cold drinks, and a little coffee to keep the table going." },
  { slug: "desserts", label: "Desserts", eyebrow: "The sweet finish", title: <>Stay for<br /><em>something sweet.</em></>, copy: "A final plate for the table, made with Australian fruit, toasted nuts, and just enough indulgence." },
];

const journalPosts = [
  { title: "The Sunday table is a state of mind", category: "Kitchen notes", date: "October 18, 2026", image: ASSETS.supper, excerpt: "A few rituals, a little music, and the kind of meal that makes everyone stay for one more glass." },
  { title: "Five ways to make vegetables the main event", category: "From the garden", date: "October 04, 2026", image: ASSETS.menu, excerpt: "Our chef's shortcut to food that feels generous, bright, and deeply satisfying." },
  { title: "Meet the pantry: house chili crisp", category: "Pantry club", date: "September 22, 2026", image: ASSETS.jar, excerpt: "The story behind our most reached-for jar — and why it belongs on breakfast." },
];

const navLinks = [
  { href: "/events", label: "Events" },
  { href: "/book-a-table", label: "Book a Table" },
];

function Logo() {
  return (
    <Link href="/" className="brand" aria-label="Chef Yard home">
      <span className="brand-mark"><span>CY</span></span>
      <span className="brand-copy"><strong>chef yard</strong><small>neighborhood kitchen</small></span>
    </Link>
  );
}

function Header({ cartCount }: { cartCount: number }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const isActive = (href: string) => href === "/" ? location === "/" : location.startsWith(href);

  return (
    <header className="site-header">
      <div className="announcement"><span>Open for supper Tuesday–Sunday</span><span>•</span><span>Pickup from 4pm</span><Link href="/book-a-table">Book a table <ArrowRight size={13} /></Link></div>
      <div className="nav-wrap container">
        <Logo />
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          <div className="nav-menu" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
            <button className={isActive("/menu") ? "active" : ""} onClick={() => setMenuOpen((value) => !value)}>Menu <ChevronDown size={13} /></button>
            <div className={`menu-dropdown ${menuOpen ? "show" : ""}`}>
              <Link href="/menu" onClick={() => setOpen(false)}>Full menu</Link>
              {menuGroups.map((group) => <Link key={group.slug} href={`/menu/${group.slug}`} onClick={() => setOpen(false)}>{group.label}</Link>)}
            <Link href="/special-items" onClick={() => setOpen(false)}>special items</Link>
            </div>
          </div>
          {navLinks.map((link) => <Link key={link.href} href={link.href} className={isActive(link.href) ? "active" : ""} onClick={() => setOpen(false)}>{link.label}</Link>)}
          {/* <div className="nav-shop" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
            <button className={isActive("/special-items") ? "active" : ""} onClick={() => setShopOpen((value) => !value)}>Shop <ChevronDown size={13} /></button>
            <div className={`shop-dropdown ${shopOpen ? "show" : ""}`}>
              <Link href="/special-items" onClick={() => setOpen(false)}>Shop all</Link>
              <Link href="/product/chili-crisp" onClick={() => setOpen(false)}>Single product</Link>
            </div>
          </div> */}
          <Link href="/contact" className={isActive("/contact") ? "active" : ""} onClick={() => setOpen(false)}>Contact</Link>
        </nav>
        <Link href="/cart" className="cart-link" aria-label={`Cart, ${cartCount} items`}><ShoppingBag size={18} /><span>{cartCount}</span></Link>
        <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">{open ? <X /> : <MenuIcon />}</button>
      </div>
    </header>
  );
}

function Footer({ cartCount }: { cartCount: number }) {
  return (
    <footer className="site-footer">
      <div className="footer-ribbon"><span>Australian produce</span><i></i><span>Neighbourhood tables</span><i></i><span>Open Tuesday–Sunday</span></div>
      <div className="container footer-grid">
        <div className="footer-brand-block"><Logo /><p className="footer-blurb">A neighbourhood kitchen for slow food, good company, and pantry things worth bringing home.</p><div className="socials"><a href="#instagram" aria-label="Instagram"><Instagram size={16} /></a><a href="#facebook" aria-label="Facebook"><Facebook size={16} /></a><a href="#twitter" aria-label="Twitter"><Twitter size={16} /></a></div></div>
        <div><p className="footer-label">Explore</p><div className="footer-links"><Link href="/">Home</Link><Link href="/events">Events</Link><Link href="/about">Our story</Link><Link href="/about">About Us</Link><Link href="/book-a-table">Book a table</Link></div></div>
        <div><p className="footer-label">Order</p><div className="footer-links"><Link href="/menu">Full menu</Link><Link href="/checkout">Checkout</Link><Link href="/special-items">Pantry shop</Link><Link href="/cart">Your basket ({cartCount})</Link></div></div>
        <div><p className="footer-label">Find us</p><p>Melbourne, Australia</p><p className="footer-hours">Tue–Thu · 11am–9pm<br />Fri–Sun · 10am–10pm</p><div className="footer-signup"><input placeholder="Your email" aria-label="Your email" /><button aria-label="Subscribe"><ArrowRight size={16} /></button></div></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Chef Yard Kitchen</span><span>Copyright © 2026 Byteheart</span></div>
    </footer>
  );
}

function Layout({ children, cartCount }: { children: React.ReactNode; cartCount: number }) {
  return <><Header cartCount={cartCount} /><main>{children}</main><Footer cartCount={cartCount} /></>;
}

function SectionLabel({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><span></span>{children}</p>; }
function ButtonLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) { return <Link href={href} className={`button ${secondary ? "button-secondary" : ""}`}>{children}<ArrowRight size={16} /></Link>; }

function PageIntro({ eyebrow, title, copy, image }: { eyebrow: string; title: React.ReactNode; copy: string; image?: string }) {
  return <section className={`page-intro ${image ? "with-image" : ""}`}>
    <div className="container page-intro-grid"><div><SectionLabel>{eyebrow}</SectionLabel><h1>{title}</h1><p className="lede">{copy}</p></div>{image && <div className="intro-image"><img src={image} alt="" /></div>}</div>
  </section>;
}

// ---- Home menu preview line with add-to-cart (reuses menu-card-buy styles) ----
function HomeMenuLine({ item, addToCart }: { item: typeof menuItems[number]; addToCart: (product: Product, quantity: number) => void }) {
  const [added, setAdded] = useState(false);
  const add = () => {
    addToCart(
      {
        id: `menu-${item.name}`,
        name: item.name,
        type: item.category,
        price: item.price,
        description: item.detail,
        image: item.image,
      },
      1
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };
  return (
    <div className="menu-line">
      <div>
        <span>{item.category}</span>
        <h3>{item.name}</h3>
        <small>{item.detail}</small>
      </div>
      <div className="menu-card-buy">
        <strong>${item.price}</strong>
        <button onClick={add}>
          {added ? <><Check size={13} /> Added</> : <><Plus size={13} /> Add</>}
        </button>
      </div>
    </div>
  );
}

function HomePage({ addToCart }: { addToCart: (product: Product, quantity: number) => void }) {
  return <>
    <section className="hero-section"><div className="hero-image" style={{ backgroundImage: `url(${ASSETS.hero})` }}></div><div className="hero-overlay"></div><div className="container hero-content"><div className="hero-kicker"><span className="dot"></span> Food worth gathering for</div><h1>Come hungry.<br /><em>Leave lighter.</em></h1><p>Chef Yard is a neighborhood kitchen serving generous food, warm tables, and pantry things made to travel home with you.</p><div className="hero-actions"><ButtonLink href="/menu">See the menu</ButtonLink><ButtonLink href="/about" secondary>Our story</ButtonLink></div></div><div className="hero-note"><span>Tonight's table</span><strong>Roast squash<br />+ whipped feta</strong><small>served from 5pm</small></div><div className="hero-scroll">Scroll to explore <span></span></div></section>
    <section className="intro-band"><div className="container intro-grid"><div><SectionLabel>The Chef Yard way</SectionLabel><h2>Seasonal food.<br /><em>Unfussy joy.</em></h2></div><div className="intro-copy"><p>We cook the kind of food that makes a Tuesday feel like a small occasion. Produce-led plates, a little fire, and a room that feels like it has been expecting you.</p><ButtonLink href="/about" secondary>Get to know us</ButtonLink></div></div></section>
    <section className="feature-food section-pad"><div className="container"><div className="section-heading"><div><SectionLabel>From the kitchen</SectionLabel><h2>What we're serving<br /><em>right now</em></h2></div><ButtonLink href="/menu" secondary>View full menu</ButtonLink></div><div className="food-feature-grid"><div className="food-photo"><img src={ASSETS.menu} alt="Seasonal dishes laid out on a table" /><span className="photo-stamp">made<br />today</span></div><div className="menu-preview">{menuItems.slice(0, 4).map((item) => <HomeMenuLine item={item} key={item.name} addToCart={addToCart} />)}</div></div></div></section>
    <section className="service-strip"><div className="container service-strip-grid"><div><SectionLabel>More than dinner</SectionLabel><h2>Make a little room<br /><em>for good things.</em></h2></div><div className="service-list"><Link href="/services"><span>01</span><div><strong>Private suppers</strong><small>Long tables, short menus, no rush.</small></div><ArrowRight /></Link><Link href="/services"><span>02</span><div><strong>Chef at home</strong><small>Let us bring the good part to you.</small></div><ArrowRight /></Link><Link href="/special-items"><span>03</span><div><strong>Pantry club</strong><small>Small-batch things for everyday cooking.</small></div><ArrowRight /></Link></div></div></section>
    <section className="journal-section section-pad"><div className="container"><div className="section-heading"><div><SectionLabel>From the journal</SectionLabel><h2>Notes from<br /><em>the yard</em></h2></div><ButtonLink href="/blog" secondary>Read the journal</ButtonLink></div><div className="journal-grid">{journalPosts.map((post) => <ArticleCard key={post.title} post={post} />)}</div></div></section>
    <section className="pantry-callout"><div className="container pantry-grid"><div className="pantry-copy"><SectionLabel>Take a little home</SectionLabel><h2>The pantry<br /><em>is open.</em></h2><p>House-made condiments, finishing salts, and the things we reach for every day. A quiet shortcut to better cooking.</p><ButtonLink href="/special-items">Shop pantry</ButtonLink></div><div className="pantry-art"><img src={ASSETS.jar} alt="Chef Yard house chili crisp jar" /><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><span className="hand-note">always<br />on the table</span></div></div></section>
  </>;
}

function ArticleCard({ post }: { post: typeof journalPosts[number] }) {
  return <Link href="/blog" className="article-card"><div className="article-image"><img src={post.image} alt="" /><span>{post.category}</span></div><div className="article-meta"><span>{post.date}</span><ArrowRight size={15} /></div><h3>{post.title}</h3><p>{post.excerpt}</p></Link>;
}

function MenuItemCard({ item, index, addToCart }: { item: typeof menuItems[number]; index: number; addToCart: (product: Product, quantity: number) => void }) {
  const [added, setAdded] = useState(false);
  const add = () => { addToCart({ id: `menu-${item.name}`, name: item.name, type: item.category, price: item.price, description: item.detail, image: item.image }, 1); setAdded(true); window.setTimeout(() => setAdded(false), 1600); };
  return <article className="menu-card"><img src={item.image} alt={item.name} /><div className="menu-card-number">{String(index + 1).padStart(2, "0")}</div><div><span>{item.category}</span><h3>{item.name}</h3><p>{item.detail}</p></div><div className="menu-card-buy"><strong>${item.price}</strong><button onClick={add}>{added ? <><Check size={13} /> Added</> : <><Plus size={13} /> Add</>}</button></div></article>;
}

function MenuPage({ addToCart }: { addToCart: (product: Product, quantity: number) => void }) {
  const [active, setActive] = useState("All");
  const categories = ["All", ...menuGroups.map((group) => group.label)];
  const shown = active === "All" ? menuItems : menuItems.filter((item) => item.category === active);
  return <><PageIntro eyebrow="The menu" title={<>Good food,<br /><em>no fuss.</em></>} copy="Choose a considered set menu, order from the specials, or build your own table from bright plates, good drinks, and a sweet finish." image={ASSETS.menu} /><section className="menu-page section-pad"><div className="container"><div className="category-tabs">{categories.map((category) => <button key={category} className={active === category ? "active" : ""} onClick={() => setActive(category)}>{category}</button>)}</div><div className="full-menu-grid">{shown.map((item, index) => <MenuItemCard item={item} index={index} key={item.name} addToCart={addToCart} />)}</div><div className="menu-note"><Sparkles size={18} /><p><strong>Allergen note:</strong> We are happy to guide you through the menu. Please ask a member of the team before ordering.</p></div></div></section></>;
}

function MenuCategoryPage({ group, addToCart }: { group: typeof menuGroups[number]; addToCart: (product: Product, quantity: number) => void }) {
  const items = menuItems.filter((item) => item.category === group.label);
  return <><PageIntro eyebrow={group.eyebrow} title={group.title} copy={group.copy} image={items[0]?.image ?? ASSETS.menu} /><section className="menu-page section-pad"><div className="container"><div className="category-page-head"><div><SectionLabel>{group.label}</SectionLabel><h2> plates for the table</h2></div><Link href="/menu" className="under-link">See all menus <ArrowRight size={14} /></Link></div><div className="full-menu-grid">{items.map((item, index) => <MenuItemCard item={item} index={index} key={item.name} addToCart={addToCart} />)}</div><div className="menu-note"><Sparkles size={18} /><p><strong>Every plate is made to order.</strong> Menus change with the Australian seasons, so a few details may move with the market.</p></div></div></section></>;
}

function EventsPage() {
  const [sent, setSent] = useState(false);
  return <><PageIntro eyebrow="Events at Chef Yard" title={<>Make it a night<br /><em>to remember.</em></>} copy="From long-table dinners in our Sydney-style dining room to relaxed courtyard celebrations, we make events feel warm, generous, and unmistakably yours." image={ASSETS.supper} /><section className="events-page section-pad"><div className="container"><div className="event-intro"><div><SectionLabel>Choose your setting</SectionLabel><h2>Good people.<br /><em>Great setting.</em></h2></div><p>Tell us what you are planning and our events team will shape the food, flow, and little details around it. We host birthdays, engagement dinners, team nights, launches, and the celebrations that do not need a reason.</p></div><div className="event-grid"><div className="event-card"><img src={ASSETS.hero} alt="Private dining table set for an evening event" /><div><span>01 · Private dining</span><h3>The Orchard Room</h3><p>Our intimate indoor room for 12–28 guests, with a seasonal shared menu and dedicated service.</p></div></div><div className="event-card"><img src={ASSETS.menu} alt="Shared plates prepared for a group event" /><div><span>02 · Group dining</span><h3>The Long Table</h3><p>A relaxed communal setup for 30–70 guests, generous plates, and a drinks package built around your night.</p></div></div><div className="event-card"><img src={ASSETS.jar} alt="Chef Yard pantry items for event gifting" /><div><span>03 · Add a little extra</span><h3>Pantry favours</h3><p>Take-home chili crisp, custom menus, florals, and thoughtful details your guests will actually use.</p></div></div></div><div className="booking-layout"><div><SectionLabel>Event enquiry</SectionLabel><h2>Start planning<br /><em>your gathering.</em></h2><p className="booking-copy">Complete the form and we will reply within one business day with availability, menu ideas, and a tailored estimate.</p></div><form className="booking-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><div className="form-grid"><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Phone number<input required placeholder="+61 4XX XXX XXX" /></label><label>Event date<input required type="date" /></label><label>Estimated guests<select required defaultValue=""><option value="" disabled>Select guest count</option><option>8–15 guests</option><option>16–30 guests</option><option>31–70 guests</option><option>70+ guests</option></select></label><label>Event type<select required defaultValue=""><option value="" disabled>Choose an occasion</option><option>Birthday or celebration</option><option>Corporate event</option><option>Engagement or wedding</option><option>Product launch</option><option>Other</option></select></label><label className="full">Tell us about your event<textarea required placeholder="Preferred start time, menu ideas, dietary needs, and anything else we should know..."></textarea></label></div><button className="button" type="submit">{sent ? <><Check size={16} /> Enquiry sent</> : <>Send enquiry <ArrowRight size={16} /></>}</button></form></div></div></section></>;
}

function BookTablePage() {
  const [sent, setSent] = useState(false);
  return <><PageIntro eyebrow="Book a table" title={<>Save a seat<br /><em>for supper.</em></>} copy="Bring your appetite. We will take care of the rest. For groups of 8 or more, visit our Events page so we can plan something special." image={ASSETS.menu} /><section className="reservation-page section-pad"><div className="container booking-layout"><div className="reservation-copy"><SectionLabel>Reservations</SectionLabel><h2>Pull up a chair<br /><em>in the yard.</em></h2><p className="reservation-copy">Tables are held for 15 minutes. For same-day bookings, call the kitchen directly. We are open Tuesday to Sunday for lunch, dinner, and long afternoons that turn into dinner.</p><div className="reservation-note"><Clock3 size={18} /><div><strong>Opening hours</strong><span>Tue–Thu · 11am–9pm<br />Fri–Sun · 10am–10pm<br />Monday · closed</span></div></div><div className="reservation-note"><MapPin size={18} /><div><strong>Find us</strong><span>Melbourne, Australia</span></div></div></div><form className="booking-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><div className="form-grid"><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Phone number<input required placeholder="+61 4XX XXX XXX" /></label><label>Guests<select required defaultValue=""><option value="" disabled>Number of guests</option><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5–7 guests</option></select></label><label>Date<input required type="date" /></label><label>Preferred time<select required defaultValue=""><option value="" disabled>Select a time</option><option>11:30 am</option><option>12:30 pm</option><option>5:30 pm</option><option>6:30 pm</option><option>7:30 pm</option><option>8:30 pm</option></select></label><label>Occasion<select defaultValue=""><option value="">No special occasion</option><option>Birthday</option><option>Date night</option><option>Anniversary</option><option>Business meal</option></select></label><label>Seating preference<select defaultValue=""><option value="">No preference</option><option>Indoor dining room</option><option>Courtyard</option><option>High table</option></select></label><label className="full">Dietary requirements or notes<textarea placeholder="Allergies, accessibility needs, high chair request..."></textarea></label></div><button className="button" type="submit">{sent ? <><Check size={16} /> Request received</> : <>Request a table <ArrowRight size={16} /></>}</button><small className="form-footnote">This is a booking request. Our team will confirm your table by email or phone.</small></form></div></section></>;
}

function ServicesPage() {
  const services = [
    { number: "01", title: "Private suppers", copy: "Gather your favorite people around a long table and let us take care of the rest. Seasonal menus, generous pours, and a room that is all yours.", tag: "From 8 guests" },
    { number: "02", title: "Chef at home", copy: "A little Chef Yard magic, wherever you are. We bring the menu, the prep, and the easy feeling of being looked after.", tag: "From 10 guests" },
    { number: "03", title: "Kitchen workshops", copy: "Get your hands in it. Small groups, big flavors, and practical recipes you will actually make again on Tuesday.", tag: "Monthly" },
  ];
  return <><PageIntro eyebrow="Gather here" title={<>Make a night<br /><em>of it.</em></>} copy="Some meals need a little more room. From intimate celebrations to team tables, we make gatherings feel generous, relaxed, and entirely yours." image={ASSETS.supper} /><section className="services-page section-pad"><div className="container services-list">{services.map((service) => <div className="service-card" key={service.number}><div className="service-card-top"><span>{service.number}</span><span>{service.tag}</span></div><h2>{service.title}</h2><p>{service.copy}</p><Link href="/contact" className="under-link">Enquire about this <ArrowRight size={14} /></Link></div>)}</div></section><section className="quote-band"><div className="container"><span className="quote-mark">“</span><blockquote>We came for dinner and left with a new favorite way to celebrate.</blockquote><p>— Maya, private supper guest</p></div></section></>;
}

function BlogPage() {
  return <><PageIntro eyebrow="The journal" title={<>Stories for<br /><em>the table.</em></>} copy="Kitchen notes, pantry obsessions, and the simple pleasure of making something good for people you love." image={ASSETS.supper} /><section className="blog-page section-pad"><div className="container"><div className="blog-feature"><img src={ASSETS.supper} alt="Friends sharing a supper" /><div><SectionLabel>Featured story</SectionLabel><h2>The Sunday table is a state of mind</h2><p>A few rituals, a little music, and the kind of meal that makes everyone stay for one more glass. Our guide to a slower, better Sunday.</p><Link href="/blog" className="under-link">Read the story <ArrowRight size={14} /></Link></div></div><div className="section-heading blog-heading"><div><SectionLabel>More from the kitchen</SectionLabel><h2>Keep reading</h2></div><span className="post-count">03 stories</span></div><div className="journal-grid">{journalPosts.map((post) => <ArticleCard key={post.title} post={post} />)}</div></div></section></>;
}

function AboutPage() {
  return <><PageIntro eyebrow="Our story" title={<>A kitchen with<br /><em>good neighbors.</em></>} copy="Chef Yard started with a borrowed table, a market bag full of vegetables, and a belief that the best food is the food that gets shared." image={ASSETS.hero} /><section className="about-story section-pad"><div className="container about-grid"><div className="about-statement"><SectionLabel>What we believe</SectionLabel><h2>Food should feel<br /><em>like an invitation.</em></h2></div><div className="about-copy"><p className="large-copy">We cook with the seasons, follow our appetite, and keep the room warm enough that nobody checks the time. Chef Yard is a neighborhood kitchen, a pantry club, and a standing invitation to pull up a chair.</p><p>Our menus are shaped by what growers bring us and what our cooks want to eat. There is technique here, but never for show. Just good ingredients, generous portions, and a little something unexpected around the corner.</p><ButtonLink href="/contact" secondary>Come say hello</ButtonLink></div></div></section><section className="values-section"><div className="container"><div className="value-grid"><div><span>01</span><h3>Follow the market</h3><p>We buy what is bright, local, and ready to be enjoyed today.</p></div><div><span>02</span><h3>Keep it generous</h3><p>More herbs, another slice, stay for dessert. There is always room.</p></div><div><span>03</span><h3>Make it yours</h3><p>Take the recipe, change the rules, and bring us your version next time.</p></div></div></div></section></>;
}

function ShopPage() {
  return <><PageIntro eyebrow="The pantry" title={<>Little luxuries<br /><em>for every day.</em></>} copy="Small-batch goods made in our kitchen and chosen for yours. Stock up, gift well, and make Tuesday taste like more." image={ASSETS.jar} /><section className="shop-page section-pad"><div className="container"><div className="shop-toolbar"><span>{products.length} pantry things</span><button>Sort by <ChevronDown size={14} /></button></div><div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.id} />)}</div></div></section></>;
}

function ProductCard({ product }: { product: Product }) {
  return <Link href={`/product/${product.id}`} className="product-card"><div className="product-image"><img src={product.image} alt={product.name} />{product.featured && <span className="product-badge">Kitchen favorite</span>}<span className="quick-view">View product <ArrowRight size={14} /></span></div><div className="product-info"><div><span>{product.type}</span><h3>{product.name}</h3></div><strong>${product.price}</strong></div></Link>;
}

function ProductPage({ addToCart }: { addToCart: (product: Product, quantity: number) => void }) {
  const [location] = useLocation();
  const id = location.split("/").pop();
  const product = products.find((item) => item.id === id) ?? products[0];
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const add = () => { addToCart(product, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 2400); };
  return <section className="product-detail section-pad"><div className="container product-detail-grid"><div className="product-detail-image"><img src={product.image} alt={product.name} /><span>Made in the Chef Yard kitchen</span></div><div className="product-detail-copy"><Link href="/special-items" className="back-link"><ChevronLeft size={15} /> Back to the pantry</Link><SectionLabel>{product.type}</SectionLabel><h1>{product.name}</h1><div className="rating"><span>{[1, 2, 3, 4, 5].map((star) => <Star size={14} fill="currentColor" key={star} />)}</span><small>24 kitchen notes</small></div><p className="product-lede">{product.description}</p><div className="product-price">${product.price}<small> / jar</small></div><div className="product-detail-actions"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={15} /></button></div><button className="button" onClick={add}>{added ? <><Check size={16} /> Added to cart</> : <>Add to cart <ShoppingBag size={16} /></>}</button></div><div className="product-details"><div><span>Good with</span><p>Eggs, roasted vegetables, grilled bread, noodles, and midnight snacks.</p></div><div><span>Keep it</span><p>In a cool, dry place. Refrigerate after opening and use within 6 weeks.</p></div></div></div></div></section>;
}

function CartPage({ cart, setCart }: { cart: CartItem[]; setCart: React.Dispatch<React.SetStateAction<CartItem[]>> }) {
  const updateQuantity = (id: string, delta: number) => setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const remove = (id: string) => setCart((items) => items.filter((item) => item.id !== id));
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <section className="cart-page section-pad"><div className="container"><PageTitle eyebrow="Your basket" title={<>Good things<br /><em>coming up.</em></>} /><div className="cart-layout">{cart.length > 0 ? <><div className="cart-items">{cart.map((item) => <div className="cart-row" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-row-copy"><span>{item.type}</span><h3>{item.name}</h3><button onClick={() => remove(item.id)}>Remove</button></div><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button></div><strong>${item.price * item.quantity}</strong></div>)}</div><OrderSummary subtotal={subtotal} /></> : <EmptyCart />}</div></div></section>;
}

function PageTitle({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) { return <div className="page-title"><SectionLabel>{eyebrow}</SectionLabel><h1>{title}</h1></div>; }
function EmptyCart() { return <div className="empty-cart"><ShoppingBag size={34} /><h2>Your basket is waiting.</h2><p>Find something good for the kitchen, then come back here.</p><ButtonLink href="/special-items">Browse the pantry</ButtonLink></div>; }
function OrderSummary({ subtotal }: { subtotal: number }) { return <aside className="order-summary"><p className="footer-label">Order summary</p><div><span>Subtotal</span><strong>${subtotal}</strong></div><div><span>Delivery</span><span>Calculated at checkout</span></div><div className="summary-total"><span>Total</span><strong>${subtotal}</strong></div><ButtonLink href="/checkout">Continue to checkout</ButtonLink><small>Pickup is free from Chef Yard. Local delivery available Tuesday–Sunday.</small></aside>; }

function CheckoutPage({ cart }: { cart: CartItem[] }) {
  const [submitted, setSubmitted] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (submitted) return <section className="success-page section-pad"><div className="container"><Check size={34} /><SectionLabel>Order received</SectionLabel><h1>See you<br /><em>at the table.</em></h1><p>Thanks for your order. We will send a little note with pickup details shortly.</p><ButtonLink href="/special-items">Keep browsing</ButtonLink></div></section>;
  return <section className="checkout-page section-pad"><div className="container"><PageTitle eyebrow="Checkout" title={<>Almost<br /><em>there.</em></>} /><div className="checkout-layout"><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="form-section"><div className="form-heading"><span>01</span><h2>Your details</h2></div><div className="form-grid"><label>First name<input required placeholder="Maya" /></label><label>Last name<input required placeholder="Rivera" /></label><label className="full">Email<input required type="email" placeholder="maya@example.com" /></label><label className="full">Phone<input required placeholder="+1 555 012 3456" /></label></div></div><div className="form-section"><div className="form-heading"><span>02</span><h2>Collection</h2></div><div className="collection-options"><label><input required type="radio" name="collection" defaultChecked /> <span><strong>Pick up from Chef Yard</strong><small>Melbourne · Ready in 2 hours</small></span></label><label><input type="radio" name="collection" /> <span><strong>Local delivery</strong><small>Tuesday–Sunday · $6 delivery fee</small></span></label></div></div><div className="form-section"><div className="form-heading"><span>03</span><h2>Note to the kitchen</h2></div><textarea placeholder="Anything we should know?"></textarea></div><button className="button" type="submit">Place order <ArrowRight size={16} /></button></form><aside className="order-summary checkout-summary"><p className="footer-label">Your order</p>{cart.length === 0 ? <p>Your basket is empty.</p> : cart.map((item) => <div className="checkout-item" key={item.id}><span>{item.quantity} × {item.name}</span><strong>${item.price * item.quantity}</strong></div>)}<div className="summary-total"><span>Total</span><strong>${subtotal}</strong></div><small>Your order is confirmed when you click Place order. No payment is collected in this demo storefront.</small></aside></div></div></section>;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return <><PageIntro eyebrow="Come by" title={<>Pull up<br /><em>a chair.</em></>} copy="Questions, bookings, pantry notes, or just want to say hello? We would love to hear from you." image={ASSETS.hero} /><section className="contact-page section-pad"><div className="container contact-grid"><div className="contact-details"><div className="contact-detail"><MapPin size={19} /><div><span>Find us</span><p>Melbourne, Australia</p></div></div><div className="contact-detail"><Clock3 size={19} /><div><span>Opening hours</span><p>Tue–Thu · 11am–9pm<br />Fri–Sun · 10am–10pm<br />Monday · closed</p></div></div><div className="contact-detail"><Mail size={19} /><div><span>Write to us</span><p>hello@chefyard.example<br />+1 555 018 2040</p></div></div></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><SectionLabel>Send a note</SectionLabel><h2>What’s on your mind?</h2><label>Your name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Message<textarea required placeholder="Tell us a little more..."></textarea></label><button className="button" type="submit">{sent ? <><Check size={16} /> Note sent</> : <>Send it our way <ArrowRight size={16} /></>}</button></form></div></section></>;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const addToCart = (product: Product, quantity: number) => setCart((items) => { const existing = items.find((item) => item.id === product.id); return existing ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { ...product, quantity }]; });
  return <Layout cartCount={cartCount}><Switch><Route path="/"><HomePage addToCart={addToCart} /></Route><Route path="/menu"><MenuPage addToCart={addToCart} /></Route>{menuGroups.map((group) => <Route key={group.slug} path={`/menu/${group.slug}`}><MenuCategoryPage group={group} addToCart={addToCart} /></Route>)}<Route path="/events" component={EventsPage} /><Route path="/book-a-table" component={BookTablePage} /><Route path="/services" component={ServicesPage} /><Route path="/blog" component={BlogPage} /><Route path="/about" component={AboutPage} /><Route path="/special-items" component={ShopPage} /><Route path="/product/:id"><ProductPage addToCart={addToCart} /></Route><Route path="/cart"><CartPage cart={cart} setCart={setCart} /></Route><Route path="/checkout"><CheckoutPage cart={cart} /></Route><Route path="/contact" component={ContactPage} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></Layout>;
}

export default App;