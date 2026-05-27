import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Star,
  Menu,
  X,
  Filter,
  CreditCard,
  Lock,
  CheckCircle2,
  Flame,
  Sparkles,
} from 'lucide-react'

const products = [
  { id: 1,
    name: 'Chongz Cristal Love double percolator waterpipe',
    category: 'Glassware',
    price: 99.99,
    rating: 5.0,
    art: 'glass',
    description: 'Dark tinted borosilicate glass with a bold shelf-ready look.'
  }
]

const categories = ['All', 'Glassware', 'Pipes', 'Accessories', 'Maintenance', 'Parts']

function Button({ children, variant = 'primary', ...props }) {
  return <button className={`btn ${variant === 'outline' ? 'btn-outline' : 'btn-primary'}`} {...props}>{children}</button>
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>
}

function ProductArt({ type }) {
  return (
    <div className={`product-art ${type}`}>
      <div className="glow" />
      <div className="art-line one" />
      <div className="art-line two" />
      <div className="art-object" />
      <span>{type.toUpperCase()}</span>
    </div>
  )
}

export default function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [ageConfirmed, setAgeConfirmed] = useState(false)
  const [cart, setCart] = useState([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const cartTotal = cart.reduce((total, product) => total + product.price, 0)

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || product.category === category
    return matchesSearch && matchesCategory
  }), [search, category])

  const addToCart = (product) => setCart((currentCart) => [...currentCart, product])

  const handleCheckout = (event) => {
    event.preventDefault()
    alert('Checkout placeholder: connect this form to your approved payment gateway before launch.')
  }

  if (!ageConfirmed) {
    return (
      <div className="age-page">
        <Card className="age-card">
          <div className="age-icon"><ShieldCheck /></div>
          <h1>Adults Only</h1>
          <p>This store sells smoking accessories and is intended only for adults of legal purchasing age in your location.</p>
          <div className="button-row">
            <Button onClick={() => setAgeConfirmed(true)}>Enter store</Button>
            <Button variant="outline" onClick={() => window.location.href = 'https://www.google.com'}>Leave site</Button>
          </div>
          <small>Add legal terms, privacy policy, returns policy, and local compliance requirements before launch.</small>
        </Card>
      </div>
    )
  }

  return (
    <div className="site">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-icon"><Flame /></div>
            <div><strong>Smokology Scotland</strong><span>Adult smoking accessories</span></div>
          </div>
          <nav className="desktop-nav">
            <a href="#shop">Shop</a><a href="#why">Why us</a><a href="#checkout">Checkout</a><a href="#compliance">Compliance</a><a href="#contact">Contact</a>
          </nav>
          <div className="desktop-actions"><Button variant="outline">Sign in</Button><Button onClick={() => setCheckoutOpen(true)}>Cart · {cart.length}</Button></div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="mobile-nav"><a href="#shop">Shop</a><a href="#why">Why us</a><a href="#checkout">Checkout</a><a href="#compliance">Compliance</a><a href="#contact">Contact</a></div>}
      </header>

      <main>
        <section className="hero">
          <div className="smoke smoke-one" /><div className="smoke smoke-two" />
          <div className="hero-grid">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="pill"><Sparkles size={16} /> Adults only · Discreet delivery · Quality checked</p>
              <h1>Modern smoking gear with a darker edge.</h1>
              <p className="hero-text">A sharp online store for glassware, pipes, grinders, trays, parts, and cleaning accessories.</p>
              <div className="button-row left"><a className="btn btn-primary" href="#shop">Shop products</a><a className="btn btn-outline" href="#compliance">Read store policy</a></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="hero-display">
              <div className="display-card main-piece"><div className="tube" /><div className="base" /><div className="bowl" /></div>
              <div className="display-card grinder-piece"><div className="grinder-top" /><div className="grinder-bottom" /></div>
              <div className="display-card tray-piece">SMOKOLOGY</div>
            </motion.div>
          </div>
        </section>

        <section id="why" className="features">
          {[{ icon: ShieldCheck, title: 'Age checked', text: 'Built for adult-only sales with clear age-restricted messaging.' }, { icon: Truck, title: 'Discreet shipping', text: 'Plain packaging options and simple delivery information.' }, { icon: Star, title: 'Curated quality', text: 'A focused range of practical products and replacement parts.' }].map((item) => <Card key={item.title}><item.icon className="feature-icon" /><h3>{item.title}</h3><p>{item.text}</p></Card>)}
        </section>

        <section id="shop" className="shop section">
          <div className="section-head">
            <div><p className="eyebrow">Shop</p><h2>Featured products</h2></div>
            <div className="filters">
              <label><Search /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" /></label>
              <label><Filter /><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => <Card key={product.id} className="product-card"><img className="product-photo" src="/blackout-glass-water-pipe.png" alt={product.name} /><div className="product-body"><div className="product-title-row"><div><span>{product.category}</span><h3>{product.name}</h3></div><strong>£{product.price.toFixed(2)}</strong></div><p>{product.description}</p><div className="product-actions"><div className="rating"><Star /> {product.rating}</div><Button onClick={() => addToCart(product)}>Add to cart</Button></div></div></Card>)}
          </div>
        </section>

        <section id="checkout" className="checkout section">
          <div className="checkout-info"><p className="eyebrow">Payments</p><h2>Secure checkout setup</h2><p>This checkout is ready to connect to an approved payment gateway or high-risk merchant account. Do not connect a processor until they confirm your product range is permitted.</p><div className="mini-grid">{[{ icon: CreditCard, title: 'Gateway ready', text: 'Connect API keys after approval.' }, { icon: Lock, title: 'Secure form', text: 'Use hosted checkout/tokenised fields.' }, { icon: CheckCircle2, title: 'Policy first', text: 'Confirm product approval before trading.' }].map((item) => <Card key={item.title}><item.icon className="feature-icon" /><h3>{item.title}</h3><p>{item.text}</p></Card>)}</div></div>
          <Card className="order-card"><div className="order-head"><div><h3>Order summary</h3><p>{cart.length} item{cart.length === 1 ? '' : 's'} in cart</p></div><strong>£{cartTotal.toFixed(2)}</strong></div><div className="cart-items">{cart.length === 0 ? <p className="empty-cart">Your cart is empty. Add products above to test the checkout.</p> : cart.map((item, index) => <div key={`${item.id}-${index}`} className="cart-item"><span>{item.name}</span><strong>£{item.price.toFixed(2)}</strong></div>)}</div><form onSubmit={handleCheckout} className="checkout-form"><input placeholder="Full name" required /><input placeholder="Email address" type="email" required /><input placeholder="Delivery address" required /><select defaultValue="" required><option value="" disabled>Choose approved payment provider</option><option>Approved high-risk merchant gateway</option><option>Bank transfer / manual invoice</option><option>Cash on collection</option></select><Button disabled={cart.length === 0}>Continue to payment</Button><small>Placeholder only: real card fields should be embedded through your approved gateway using hosted checkout or tokenised payment elements.</small></form></Card>
        </section>

        {checkoutOpen && <div className="modal-backdrop"><Card className="cart-modal"><div className="modal-head"><h3>Cart</h3><button onClick={() => setCheckoutOpen(false)}><X /></button></div><p>{cart.length} item{cart.length === 1 ? '' : 's'} · £{cartTotal.toFixed(2)}</p><a className="btn btn-primary wide" href="#checkout" onClick={() => setCheckoutOpen(false)}>Go to checkout</a></Card></div>}

        <section id="compliance" className="compliance section dark"><h2>Responsible retail policy</h2><p>This store template is written for adult smoking accessories. Before launch, confirm local rules on age verification, restricted products, payment processors, shipping, returns, advertising, and marketplace policies.</p><div className="policy-grid"><div>Use robust age checks before purchase.</div><div>Avoid illegal-drug claims or unsafe usage claims.</div><div>Display clear terms, returns, privacy, and shipping policies.</div></div></section>
        <section id="contact" className="contact section"><h2>Need help choosing?</h2><p>Add your customer support details here.</p><form className="contact-form"><input placeholder="Name" /><input placeholder="Email" /><textarea placeholder="Message" /><Button>Send message</Button></form></section>
      </main>
      <footer><p>© 2026 SmokeSupply. Adult smoking accessories only.</p><div><a href="#">Terms</a><a href="#">Privacy</a><a href="#">Returns</a></div></footer>
    </div>
  )
}
