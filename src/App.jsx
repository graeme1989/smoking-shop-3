import { analyticsPreference, measurementId, setAnalyticsPreference, startAnalytics, trackBasketAdd, trackEmailOrderClick, trackPage } from './analytics.js'
import { products } from './products.js'
import { catalogueCategories, categoryMetadata, productPath, productMetadata, relatedProducts } from './product-pages.js'
import { FREE_DELIVERY_SUBTOTAL_PENCE, deliveryInformation, deliveryMetadata, deliveryPath, deliveryTitle, getUkPostage } from './postage.js'
import './style.css'
import React, { useEffect, useState } from 'react'

function productFromUrl() {
  const id = window.location.pathname.match(/^\/products\/(\d+)\/?$/)?.[1]
    ?? new URLSearchParams(window.location.search).get('product')
  return products.find((product) => String(product.id) === id) ?? null
}

function productUrl(product) {
  const url = new URL(window.location.href)
  url.pathname = product ? productPath(product) : '/'
  url.searchParams.delete('product')
  return url
}

function availableStock(product, option) {
  return product.options
    ? product.options.values.find((value) => value.name === option)?.stock ?? 0
    : product.stock
}

function sameBasketItem(first, second) {
  return first.id === second.id && (first.selectedOption || '') === (second.selectedOption || '')
}

function basketQuantity(cart, product, selectedOption) {
  return cart.find((item) => sameBasketItem(item, { ...product, selectedOption }))?.quantity ?? 0
}

function readBasket() {
  try {
    const saved = JSON.parse(localStorage.getItem('smokologyCart'))
    if (!Array.isArray(saved)) return []
    return saved.reduce((cart, item) => {
      const productId = item?.id === 1002 && item.name === 'Cookies Glow Tray' ? 1004 : item?.id
      const product = products.find(({ id }) => id === productId)
      if (!product || !Number.isSafeInteger(item.quantity) || item.quantity <= 0) return cart
      const selectedOption = product.options ? item.selectedOption : ''
      const existing = basketQuantity(cart, product, selectedOption)
      const quantity = Math.min(existing + item.quantity, availableStock(product, selectedOption))
      if (!quantity) return cart
      const line = { ...product, selectedOption, quantity }
      return [...cart.filter((entry) => !sameBasketItem(entry, line)), line]
    }, [])
  } catch {
    return []
  }
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(productFromUrl)
  const [productScrollPosition, setProductScrollPosition] = useState(0)
  const [showAnalytics, setShowAnalytics] = useState(() => Boolean(measurementId && !analyticsPreference()))

  const chooseAnalytics = (preference) => {
    setAnalyticsPreference(preference)
    setShowAnalytics(false)
    if (preference === 'deny' && window.gtag) {
      window['ga-disable-' + measurementId] = true
      window.location.reload()
      return
    }
    startAnalytics()
    trackPage(selectedProduct)
  }

  const analyticsControls = measurementId && (
    <div className="analytics-controls" aria-label="Analytics preferences">
      {showAnalytics ? <>
        <p>Allow optional analytics to help us understand how people use the shop?</p>
        <button onClick={() => chooseAnalytics('allow')}>Allow analytics</button>
        <button onClick={() => chooseAnalytics('deny')}>Decline analytics</button>
      </> : <button onClick={() => setShowAnalytics(true)}>Analytics preferences</button>}
    </div>
  )

  useEffect(() => {
    if (selectedProduct) window.scrollTo(0, 0)
    const category = catalogueCategories.find(({ path }) => path === window.location.pathname)
    const metadata = window.location.pathname === deliveryPath ? deliveryMetadata
      : !selectedProduct && category?.heading ? categoryMetadata(category)
      : productMetadata(selectedProduct)
    const { title, description, canonical } = metadata
    document.title = title
    document.querySelector('meta[name="description"]').content = description
    document.querySelector('link[rel="canonical"]').href = canonical
    startAnalytics()
    trackPage(selectedProduct)
  }, [selectedProduct])

  useEffect(() => {
    const syncProduct = () => {
      const product = productFromUrl()
      setSelectedProduct(product)
      setSelectedOption('')
      setAddedMessage(null)
      if (!product) requestAnimationFrame(() => window.scrollTo(0, productScrollPosition))
    }
    window.addEventListener('popstate', syncProduct)
    return () => window.removeEventListener('popstate', syncProduct)
  }, [productScrollPosition])

  const openProduct = (event, product) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setProductScrollPosition(window.scrollY)
    window.history.pushState({ fromCatalogue: true }, '', productUrl(product))
    setSelectedOption('')
    setAddedMessage(null)
    setSelectedProduct(product)
  }

  const closeProduct = () => {
    if (window.history.state?.fromCatalogue) {
      window.history.back()
      return
    }
    window.history.replaceState(null, '', productUrl(null))
    setSelectedProduct(null)
    setSelectedOption('')
    setAddedMessage(null)
    requestAnimationFrame(() => window.scrollTo(0, productScrollPosition))
  }

  const activeCategory = catalogueCategories.find(({ path }) => path === window.location.pathname) ?? catalogueCategories[0]
  const selectedCategory = activeCategory.name
const [currentPage, setCurrentPage] = useState(() => window.location.pathname === deliveryPath ? 'delivery' : 'home')
  const [cart, setCart] = useState(readBasket)
  const [cartOpen, setCartOpen] = useState(false)
const [addedMessage, setAddedMessage] = useState(null)
const [selectedOption, setSelectedOption] = useState('')
useEffect(() => {
  localStorage.setItem('smokologyCart', JSON.stringify(cart))
}, [cart])
  const getPriceNumber = (price) => Number(price.replace('£', ''))
  const openCart = () => {
    if (selectedProduct) closeProduct()
    setAddedMessage(null)
    setCartOpen(true)
  }

  const addToCart = (product, option = '') => {
    const line = { ...product, selectedOption: option, quantity: 1 }
    const limit = availableStock(product, option)
    if (basketQuantity(cart, product, option) >= limit) return

    setCart((current) => {
      const quantity = basketQuantity(current, product, option)
      if (quantity >= limit) return current
      if (!quantity) return [...current, line]
      return current.map((item) => sameBasketItem(item, line)
        ? { ...item, quantity: item.quantity + 1 }
        : item)
    })
    setAddedMessage(product)
    trackBasketAdd(product, option)
  }

  const changeQuantity = (line, change) => {
    setCart((current) => current.map((item) => sameBasketItem(item, line)
      ? { ...item, quantity: Math.min(item.quantity + change, availableStock(item, item.selectedOption)) }
      : item).filter((item) => item.quantity > 0))
  }

  const removeFromCart = (line) => {
    setCart((current) => current.filter((item) => !sameBasketItem(item, line)))
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const cartTotal = cart.reduce(
    (total, item) => total + getPriceNumber(item.price) * item.quantity,
    0
  )

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  if (selectedProduct) {
    return (
      <div className="site">
        <button className="cart-button" onClick={openCart}>
          Basket ({cartItemCount})
</button>
{addedMessage && (
  <div className="added-popup">
    <h3>✓ Added to Basket</h3>
    <p>{addedMessage.name} has been added successfully.</p>

    <div className="added-popup-buttons">
      <button onClick={() => setAddedMessage(null)}>
        Continue Shopping
      </button>

      <button
onClick={openCart}
      >
        View Basket
      </button>
    </div>
  </div>
)}


        <main className="product-page">
          <button onClick={closeProduct}>
            ← Back to products
          </button>

          <div className="product-detail">
            <img className="detail-image" src={selectedProduct.image} alt={selectedProduct.name} />

            <div>
              <p className="brand-tag">{selectedProduct.category}</p>
              <h1>{selectedProduct.name}</h1>
              <p className="price">{selectedProduct.price}</p>

              <h3>Specifications</h3>
<ul>
  {selectedProduct.details.map((detail) => (
    <li key={detail}>{detail}</li>
  ))}
</ul>

<p><strong>Weight:</strong> {selectedProduct.weight}kg</p>

{(
  selectedProduct.options
    ? selectedOption
      ? selectedProduct.options.values.find(
          (option) => option.name === selectedOption
        )?.stock
      : 1
    : selectedProduct.stock
) > 0 ? (
  <p>
    <strong>In Stock:</strong>{' '}
    {selectedProduct.options && selectedOption
      ? selectedProduct.options.values.find(
          (option) => option.name === selectedOption
        )?.stock
      : selectedProduct.options
  ? `Select a ${selectedProduct.options.label.toLowerCase()}`
  : selectedProduct.stock}
  </p>
) : (
  <p><strong>Out of Stock</strong></p>
)}

{selectedProduct.options && (
  <div style={{ marginBottom: '20px' }}>
    <label>
      {selectedProduct.options.label}
    </label>

    <select
      value={selectedOption}
      onChange={(event) => setSelectedOption(event.target.value)}
      style={{
        display: 'block',
        marginTop: '8px',
        padding: '10px',
        width: '100%'
      }}
    >
      <option value="">
        Select {selectedProduct.options.label}
      </option>

      {selectedProduct.options.values.map((option) => (
  <option key={option.name} value={option.name}>
    {option.name}
  </option>
))}
    </select>
  </div>
)}

<div className="detail-button-row">
<button
  disabled={basketQuantity(cart, selectedProduct, selectedOption) >= availableStock(selectedProduct, selectedOption)}
  onClick={() => addToCart(selectedProduct, selectedOption)}
>
  {selectedProduct.options && !selectedOption
    ? `Select ${selectedProduct.options.label.toLowerCase()}`
    : availableStock(selectedProduct, selectedOption) === 0
      ? 'Out of Stock'
      : basketQuantity(cart, selectedProduct, selectedOption) >= availableStock(selectedProduct, selectedOption)
        ? 'All available stock in basket'
        : 'Add to Basket'}
</button>

  <a
    href="https://www.instagram.com/edinburghsmokeshop"
    target="_blank"
    rel="noreferrer"
  >
    <button>Enquire on Instagram</button>
  </a>
</div>

              <p style={{ marginTop: '20px', color: '#cbd5e1' }}>
                Email: smokeshop154@gmail.com
              </p>
            </div>
          </div>
          <section aria-labelledby="related-products-heading">
            <h2 id="related-products-heading">Related products</h2>
            <ul>
              {relatedProducts(selectedProduct, products).map((product) => (
                <li key={product.id}><a href={productPath(product)}>{product.name}</a></li>
              ))}
            </ul>
          </section>
        </main>
        {analyticsControls}
      </div>
    )
  }

  return (
    <div className="site">
      <button
  className="cart-button"
 onClick={openCart}
>
  Basket ({cartItemCount})
</button>
{addedMessage && (
  <div className="added-popup">
    <h3>✓ Added to Basket</h3>
    <p>{addedMessage.name} has been added successfully.</p>

    <div className="added-popup-buttons">
      <button onClick={() => setAddedMessage(null)}>
        Continue Shopping
      </button>

      <button
        onClick={() => {
          setAddedMessage(null)
          setCartOpen(true)
        }}
      >
        View Basket
      </button>
    </div>
  </div>
)}

      {cartOpen && (
        <CartPanel
          cart={cart}
          cartTotal={cartTotal}
          changeQuantity={changeQuantity}
          removeFromCart={removeFromCart}
          setCartOpen={setCartOpen}
        />
      )}

      <header className="store-header">
        <div className="brand">
          <div className="brand-logo">S</div>
          <div>
            <h2>Smokology Scotland</h2>
            <p>Adult smoking accessories</p>
          </div>
        </div>

        <a
          href="https://www.instagram.com/edinburghsmokeshop"
          target="_blank"
          rel="noreferrer"
        >
          <button>Instagram</button>
        </a>
      </header>

{currentPage !== 'home' ? (
  <LegalPage
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
/>
) : (
  <>

      <main className="products-section">
        <div>
          <h1>{activeCategory.heading ?? 'Glass Water Pipes, Grinders & Rolling Papers'}</h1>
          {activeCategory.description && <p>{activeCategory.description}</p>}
          <p style={{ color: '#cbd5e1', fontSize: '20px', marginBottom: '30px' }}>
            Add products to your basket and email your order.
          </p>
        </div>

        <nav className="category-row" aria-label="Product categories">
          {catalogueCategories.map(({ name, path }) => (
            <a
              key={path}
              href={path}
              aria-current={selectedCategory === name ? 'page' : undefined}
              className={selectedCategory === name ? 'button active-category' : 'button category-button'}
            >
              {name}
            </a>
          ))}
        </nav>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <a href={productUrl(product)} onClick={(event) => openProduct(event, product)}>
                <img className="product-photo" src={product.image} alt={product.name} />
              </a>

              <div className="product-info">
                <p className="brand-tag">{product.category}</p>
                <h3><a href={productUrl(product)} onClick={(event) => openProduct(event, product)}>{product.name}</a></h3>
                <p className="price">{product.price}</p>
                <a className="button" href={productUrl(product)} onClick={(event) => openProduct(event, product)}>
                  View Details
                </a>
                {!product.options && (
                  <button
                    disabled={basketQuantity(cart, product, '') >= availableStock(product, '')}
                    onClick={() => addToCart(product)}
                  >
                    {product.stock ? 'Add to Basket' : 'Out of Stock'}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>

 {analyticsControls}
 <footer className="site-footer">
  <button
    onClick={() => {
      setCurrentPage('privacy')
      window.scrollTo(0, 0)
    }}
  >
    Privacy Policy
  </button>

  <button
    onClick={() => {
      setCurrentPage('about')
      window.scrollTo(0, 0)
    }}
  >
    About Us
  </button>

  <button
    onClick={() => {
      setCurrentPage('contact')
      window.scrollTo(0, 0)
    }}
  >
    Contact Us
  </button>

  <button
    onClick={() => {
      setCurrentPage('terms')
      window.scrollTo(0, 0)
    }}
  >
    Terms & Conditions
  </button>

  <button
    onClick={() => {
      setCurrentPage('returns')
      window.scrollTo(0, 0)
    }}
  >
    Returns & Refunds
  </button>

  <a className="button" href={deliveryPath}>{deliveryTitle}</a>

  <button
    onClick={() => {
      setCurrentPage('age')
      window.scrollTo(0, 0)
    }}
  >
    Age Restriction Policy
  </button>

  <p>© 2026 Smokology Scotland</p>
  <p>smokeshop154@gmail.com</p>
</footer>
    </>
  )}
    </div>
  )
}

function CartPanel({
  cart,
  cartTotal,
  changeQuantity,
  removeFromCart,
  setCartOpen
}) {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [orderNotes, setOrderNotes] = useState('')

  const { totalGrams, pricePence, service } = getUkPostage(cart, Math.round(cartTotal * 100))
  const needsQuote = pricePence === null
  const remainingPence = FREE_DELIVERY_SUBTOTAL_PENCE - Math.round(cartTotal * 100)
  const shippingCost = pricePence / 100
  const orderTotal = cartTotal + shippingCost

  const orderItems = cart.map((item) => {
    const option = item.selectedOption ? ` (${item.options.label}: ${item.selectedOption})` : ''
    return `${item.name}${option} x ${item.quantity} - ${item.price} each`
  })
  const delivery = needsQuote ? service : `${service} - estimated £${shippingCost.toFixed(2)}`
  const email = encodeURIComponent([
    'Order:', ...orderItems, '', `Items total: £${cartTotal.toFixed(2)}`,
    `Delivery: ${delivery}`,
    ...(needsQuote ? [] : [`Estimated total: £${orderTotal.toFixed(2)}`]),
    '', `Name: ${customerName}`, `Email: ${customerEmail}`, `Phone: ${customerPhone}`,
    `Delivery address: ${customerAddress}`, `Order notes: ${orderNotes}`
  ].join('\r\n'))

  return (
    <div className="cart-overlay">
      <aside className="cart-panel">
        <div className="cart-header">
          <h2>Your Basket</h2>
          <button onClick={() => setCartOpen(false)}>×</button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your basket is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={JSON.stringify([item.id, item.selectedOption])}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>

{item.selectedOption && (
  <p>{item.options.label}: {item.selectedOption}</p>
)}

                  <p>{item.price}</p>

                  <div className="quantity-row">
                    <button onClick={() => changeQuantity(item, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button disabled={item.quantity >= availableStock(item, item.selectedOption)} onClick={() => changeQuantity(item, 1)}>+</button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
  <strong>Items total:</strong>
  <strong>£{cartTotal.toFixed(2)}</strong>
</div>

<div className="cart-total">
  <strong>{service} · {totalGrams / 1000} kg of products</strong>
  {!needsQuote && <strong>{pricePence === 0 ? 'Free' : `£${shippingCost.toFixed(2)}`}</strong>}
</div>

{totalGrams <= 2000 && remainingPence > 0 && (
  <p>Add £{(remainingPence / 100).toFixed(2)} in products for free UK delivery if your order fits in one parcel up to 2 kg.</p>
)}

{!needsQuote && <div className="cart-total">
  <strong>Estimated total:</strong>
  <strong>£{orderTotal.toFixed(2)}</strong>
</div>}

            <div className="checkout-form">
              <h3>Delivery Details</h3>

              <input
                type="text"
                placeholder="Full name"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
              />

              <input
                type="email"
                placeholder="Email address"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
              />

              <input
                type="tel"
                placeholder="Phone number"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
              />

              <textarea
                placeholder="Delivery address"
                value={customerAddress}
                onChange={(event) => setCustomerAddress(event.target.value)}
              />

              <textarea
                placeholder="Order notes"
                value={orderNotes}
                onChange={(event) => setOrderNotes(event.target.value)}
              />
            </div>
<p
  style={{
    textAlign: 'center',
    color: '#cbd5e1',
    fontSize: '14px',
    marginBottom: '16px'
  }}
>
  Free UK delivery on orders of £{FREE_DELIVERY_SUBTOTAL_PENCE / 100} or more that fit in one parcel up to 2 kg. Other UK postage is estimated from the basket weight. We confirm the price after checking the packed weight, dimensions and destination, before you pay. Email your order to arrange payment and delivery.
</p>
            <a
              href={`mailto:smokeshop154@gmail.com?subject=${encodeURIComponent('New Smokology Scotland Order')}&body=${email}`}
              className="button checkout-button"
              onClick={() => trackEmailOrderClick(needsQuote)}
            >
              {needsQuote ? 'Request Delivery Quote' : 'Email Order'}
            </a>
          </>
        )}
      </aside>
    </div>
  )

}

function LegalPage({ currentPage, setCurrentPage }) {
  const pages = {
    privacy: {
      title: 'Privacy Policy',
      content: [
        'Smokology Scotland respects your privacy and is committed to protecting your personal information.',
        'When you place an order or contact us, we may collect your name, email address, phone number, delivery address, order details, and any information you choose to provide.',
        'We use this information to process orders, contact customers, arrange delivery, respond to enquiries, and keep basic business records.',
        'We do not sell your personal information.',
        ...(measurementId ? ['With your permission, we use Google Analytics to measure visits, product views, basket activity and clicks that open an order or delivery quote email. Use Analytics preferences to change your choice.'] : []),
        'Customer information may be shared only where necessary with delivery providers, payment providers, or where required by law.',
        'To request access, correction, or deletion of your personal information, contact us at smokeshop154@gmail.com.'
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      content: [
        'This website is operated as Smokology Scotland, an online store for adult smoking accessories.',
        'By using this website or placing an order, you confirm that you are at least 18 years old.',
        'All products are sold strictly for lawful use by adults only.',
        'Product descriptions, prices, and availability may change at any time.',
        'Orders are not confirmed until payment and delivery details have been agreed.',
        'We reserve the right to refuse or cancel any order where age, payment, stock, delivery, or legal concerns arise.',
        'Nothing in these terms affects your statutory rights.'
      ]
    },
    returns: {
      title: 'Returns & Refunds',
      content: [
        'If an item arrives faulty, damaged, broken, or incorrect, please contact us as soon as possible at smokeshop154@gmail.com with your order details and photos where possible.',
        'For online orders, customers may cancel within 14 days of receiving their order, provided the item is unused, unopened where hygiene applies, undamaged, and returned in resaleable condition.',
        'Customers are responsible for returning unwanted items unless the item is faulty, damaged, broken, or incorrect.',
        'Used smoking accessories cannot usually be returned unless faulty.',
        'Refunds will be processed after the returned item has been received and checked.',
        'We may reduce a refund if an item has been used, damaged, or handled beyond what is necessary to inspect it.'
      ]
    },
    delivery: { title: deliveryTitle, content: deliveryInformation },
age: {
  title: 'Age Restriction Policy',
  content: [
    'Smokology Scotland sells legal smoking accessories only. We do not sell tobacco products, nicotine products, CBD products, THC products, cannabinoids, cannabis, controlled substances, or vaping products.',
    'You must be 18 or over to use this website, place an order, or purchase any product.',
    'By placing an order, you confirm that you are at least 18 years old.',
    'We reserve the right to request proof of age before accepting or completing an order.',
    'Orders may be refused or cancelled if we believe the customer is under 18 or cannot provide suitable age verification.',
    'Products must not be purchased for anyone under the age of 18.',
'Any hemp-based products sold on this website are made from industrial hemp fibre and do not contain CBD, THC, cannabinoids, nicotine, tobacco, or controlled substances.'
  ]
},

about: {
  title: 'About Us',
  content: [
    'Smokology Scotland is a Scottish online retailer specialising in quality adult smoking accessories.',
    'We focus on reliable products, fair pricing, and straightforward customer service.',
    'Our aim is to provide customers with a simple and professional shopping experience.',
    'We are committed to clear product information and responsive support.'
  ]
},

contact: {
  title: 'Contact Us',
  content: [
    'Email: smokeshop154@gmail.com',
    'Instagram: @edinburghsmokeshop',
    'For customer enquiries, please contact us using the details above.'
  ]
}
}

  const page = pages[currentPage]

  return (
    <main className="legal-page">
      {window.location.pathname === deliveryPath ? (
        <a className="button" href="/">← Back to products</a>
      ) : (
        <button onClick={() => setCurrentPage('home')}>← Back to products</button>
      )}

      <h1>{page.title}</h1>

      {page.content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <p>
        Contact: smokeshop154@gmail.com
      </p>
    </main>
  )
}