import './style.css'
import React, { useEffect, useState } from 'react'

const products = [
  {
    id: 1,
    name: 'Blackout Glass Water Pipe',
    category: 'Glass Water Pipes',
    price: '£99.99',
    image: '/blackout-glass-water-pipe.png',
    details: [
      'Height: 35cm',
      'Material: Premium borosilicate glass',
      'Percolator: Double chamber',
      'Colour: Blackout tinted finish',
      'Smooth airflow and premium filtration'
    ]
  },
  {
    id: 2,
    name: 'Flog Em Dual Glass Water Pipe',
    category: '/Glass Water Pipes',
    price: '£49.99',
    image: '/flog-em-dual.png',
    details: [
      'Height: 25cm',
      'Material: Borosilicate glass',
      'Percolator: Dual filtration',
      'Colour: Green accented glass',
      'Compact design with clean pull'
    ]
  },
  {
    id: 3,
    name: 'Chongz 7 Part Grinder',
    category: 'Grinders',
    price: '£34.99',
    image: '/chongz-7-part.png',
    details: [
      'Size: 92mm',
      'Material: Aluminium',
      'Colour: Blue',
      '7-part modular chamber system',
      'Interchangeable mesh screen and grinder plates',
      'Storage top with premium Chongz construction'
    ]
  },
  {
    id: 4,
    name: 'Chongz Vapor Trail Blue Glass Honeycomb Percolator Water Pipe 22cm',
    category: 'Glass Water Pipes',
    price: '£34.99',
    image: '/chongz-vapor-trail.png',
    details: [
      'Height: 22cm',
      'Glass thickness: 5mm',
      'Blue accented glass',
      'Blue honeycomb percolator',
      'Bent shape with fixed stem',
      'Includes 14mm female clear dome and nail',
      'Includes 14mm female clear cone piece',
      'Also available in other colours'
    ]
  },
  {
    id: 5,
    name: 'Chongz Nimrod Pink Glass Honeycomb Percolator Water Pipe 22cm',
    category: 'Glass Water Pipes',
    price: '£34.99',
    image: '/NimrodGlass.png',
    details: [
      'Height: 22cm',
      'Glass thickness: 5mm',
      'Pink accented glass',
      'Pink honeycomb percolator',
      'Bent shape with fixed stem',
      'Includes 14mm female clear dome and nail',
      'Includes 14mm female clear cone piece',
      'Premium honeycomb percolation system',
      'Durable Chongz glass construction',
      'Also available in other colours'
    ]
  },
  {
    id: 6,
    name: "CHONGZ 'GLASS JAW' RECYCLER WATER PIPE GREEN",
    category: 'Glass Water Pipes',
    price: '£39.99',
    image: '/ChongzGlassJaw.png',
    details: [
      'Height: 16cm',
      'Green accented glass',
      'Recycler-style glass design',
      'Compact 3-piece glass kit',
      'Includes glass accessories',
      'Portable size for easy storage and transport',
      'Durable Chongz glass construction',
      'Designed for smooth filtration',
      'Also available in other colours'
    ]
  },
  {
    id: 7,
    name: "CHONGZ 'MAIN LINE' RECYCLER WATER PIPE TEAL",
    category: 'Glass Water Pipes',
    price: '£39.99',
    image: '/MainLine.png',
    details: [
      'Compact recycler-style glass design',
      'Teal accented glass',
      'Continuous water filtration system',
      'Includes glass accessories',
      'Durable Chongz glass construction',
      'Premium glassware design',
      'Also available in other colours'
    ]
  },
  {
    id: 8,
    name: 'CHONGZ DIG DUAL SYSTEM PERCOLATOR WATER PIPE',
    category: 'Glass Water Pipes',
    price: '£39.99',
    image: '/DigDual.png',
    details: [
      'Dual percolator filtration system',
      'Borosilicate glass construction',
      'Stable rounded base',
      'Includes glass accessories',
      'Durable Chongz design',
      'Suitable for dry herb use'
    ]
  },
  {
    id: 9,
    name: "CHONGZ DR DEATH TRIPLE DIFFUSER WATER PIPE GREEN 52CM",
    category: 'Glass Water Pipes',
    price: '£99.99',
    image: '/dr-death-green.png',
    details: [
      'Height: 52cm',
      'Glass Thickness: 6mm',
      'Triple diffuser filtration system',
      'Premium borosilicate glass construction',
      'Multiple chamber design',
      'Ice shelf for cooler filtration',
      '18mm male cone piece included',
      'Green accented glasswork',
      'Part of the Dr Death colour collection'
    ]
  },
  {
    id: 10,
    name: "CHONGZ DR DEATH TRIPLE DIFFUSER WATER PIPE MINT GREEN 52CM",
    category: 'Glass Water Pipes',
    price: '£99.99',
    image: '/dr-death-mint.png',
    details: [
      'Height: 52cm',
      'Glass Thickness: 6mm',
      'Triple diffuser filtration system',
      'Premium borosilicate glass construction',
      'Multiple chamber design',
      'Ice shelf for cooler filtration',
      '18mm male cone piece included',
      'Mint green accented glasswork',
      'Part of the Dr Death colour collection'
    ]
  },
  {
    id: 11,
    name: "CHONGZ DR DEATH TRIPLE DIFFUSER WATER PIPE BLACK 52CM",
    category: 'Glass Water Pipes',
    price: '£99.99',
    image: '/dr-death-black.png',
    details: [
      'Height: 52cm',
      'Glass Thickness: 6mm',
      'Triple diffuser filtration system',
      'Premium borosilicate glass construction',
      'Multiple chamber design',
      'Ice shelf for cooler filtration',
      '18mm male cone piece included',
      'Black accented glasswork',
      'Part of the Dr Death colour collection'
    ]
  },
  {
    id: 12,
    name: "CHONGZ DR DEATH TRIPLE DIFFUSER WATER PIPE BLUE 52CM",
    category: 'Glass Water Pipes',
    price: '£99.99',
    image: '/dr-death-blue.png',
    details: [
      'Height: 52cm',
      'Glass Thickness: 6mm',
      'Triple diffuser filtration system',
      'Premium borosilicate glass construction',
      'Multiple chamber design',
      'Ice shelf for cooler filtration',
      '18mm male cone piece included',
      'Blue accented glasswork',
      'Part of the Dr Death colour collection'
    ]
  },
  {
    id: 13,
    name: "CHONGZ DR DEATH TRIPLE DIFFUSER WATER PIPE WHITE 52CM",
    category: 'Glass Water Pipes',
    price: '£99.99',
    image: '/dr-death-white.png',
    details: [
      'Height: 52cm',
      'Glass Thickness: 6mm',
      'Triple diffuser filtration system',
      'Premium borosilicate glass construction',
      'Multiple chamber design',
      'Ice shelf for cooler filtration',
      '18mm male cone piece included',
      'White accented glasswork',
      'Part of the Dr Death colour collection'
    ]
  },
  {
    id: 14,
    name: 'CHONGZ 40CM PLUG 9MM BEAKER GLASS ICE WATERPIPE GREEN',
    category: 'Glass Water Pipes',
    price: '£49.99',
    image: '/plug-green.png',
    details: [
      'Height: 40cm',
      'Glass Thickness: 9mm',
      'Beaker style base',
      'Ice Water Pipe design',
      'Heavy-duty glass construction',
      'Green accented neck',
      'Stable square-style beaker base',
      'Premium Chongz glassware',
      'Also available in Purple and Pink'
    ]
  },
  {
    id: 15,
    name: 'CHONGZ 40CM PLUG 9MM BEAKER GLASS ICE WATERPIPE PURPLE',
    category: 'Glass Water Pipes',
    price: '£49.99',
    image: '/plug-purple.png',
    details: [
      'Height: 40cm',
      'Glass Thickness: 9mm',
      'Beaker style base',
      'Ice Water Pipe design',
      'Heavy-duty glass construction',
      'Purple accented neck',
      'Stable square-style beaker base',
      'Premium Chongz glassware',
      'Also available in Green and Pink'
    ]
  },
  {
    id: 16,
    name: 'CHONGZ 40CM PLUG 9MM BEAKER GLASS ICE WATERPIPE PINK',
    category: 'Glass Water Pipes',
    price: '£49.99',
    image: '/plug-pink.png',
    details: [
      'Height: 40cm',
      'Glass Thickness: 9mm',
      'Beaker style base',
      'Ice Water Pipe design',
      'Heavy-duty glass construction',
      'Pink accented neck',
      'Stable square-style beaker base',
      'Premium Change glassware',
      'Also available in Green and Purple'
    ]
  },
{
  id: 17,
  name: 'Chongz Triple Honeycomb Percolator Glass Water Pipe Blue',
  category: 'Glass Water Pipes',
  price: '£59.99',
  image: '/triple-honeycomb-blue.png',
  details: [
    'Triple honeycomb disc percolator system',
    'Blue accented borosilicate glass',
    'Straight tube design',
    'Removable glass bowl included',
    'Enhanced filtration and cooling',
    'Wide stable base',
    'Premium Chongz glass construction',
    'Suitable for adult smoking accessories collections'
  ]
}
]

const categories = ['All', 'Glass Water Pipes', 'Accessories', 'Grinders', 'Papers']

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem('smokologyCart')
  return savedCart ? JSON.parse(savedCart) : []
})
  const [cartOpen, setCartOpen] = useState(false)
const [addedMessage, setAddedMessage] = useState(null)
useEffect(() => {
  localStorage.setItem('smokologyCart', JSON.stringify(cart))
}, [cart])
  const getPriceNumber = (price) => Number(price.replace('£', ''))
const openCart = () => {
  setSelectedProduct(null)

  setTimeout(() => {
    setCartOpen(true)
  }, 0)
}

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

return [...currentCart, { ...product, quantity: 1 }]
})

setAddedMessage(product)

// setTimeout(() => {
//   setAddedMessage(null)
// }, 4000)
}
  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    )
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

  const emailBody = cart
    .map(
      (item) =>
        `${item.name} x ${item.quantity} - ${item.price}`
    )
    .join('%0D%0A')

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
onClick={() => {
  setAddedMessage(null)
  setSelectedProduct(null)
  setCartOpen(true)
}}
      >
        View Basket
      </button>
    </div>
  </div>
)}


        <main className="product-page">
          <button onClick={() => setSelectedProduct(null)}>
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

              <div className="detail-button-row">
  <button onClick={() => addToCart(selectedProduct)}>
    Add to Basket
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
        </main>
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
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
          setCartOpen={setCartOpen}
          emailBody={emailBody}
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
          <h1>Products</h1>
          <p style={{ color: '#cbd5e1', fontSize: '20px', marginBottom: '30px' }}>
            Add products to your basket and email your order.
          </p>
        </div>

        <div className="category-row">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'active-category' : 'category-button'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <img
                className="product-photo"
                src={product.image}
                alt={product.name}
                onClick={() => setSelectedProduct(product)}
              />

              <div className="product-info">
                <p className="brand-tag">{product.category}</p>
                <h3 onClick={() => setSelectedProduct(product)}>{product.name}</h3>
                <p className="price">{product.price}</p>

                <button onClick={() => setSelectedProduct(product)}>
                  View Details
                </button>

                <button onClick={() => addToCart(product)}>
                  Add to Basket
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="site-footer">
        <button onClick={() => setCurrentPage('privacy')}>
          Privacy Policy
        </button>

<button onClick={() => setCurrentPage('about')}>
  About Us
</button>

<button onClick={() => setCurrentPage('contact')}>
  Contact Us
</button>

        <button onClick={() => setCurrentPage('terms')}>
          Terms & Conditions
        </button>

        <button onClick={() => setCurrentPage('returns')}>
          Returns & Refunds
        </button>

        <button onClick={() => setCurrentPage('delivery')}>
          Delivery Information
        </button>

        <button onClick={() => setCurrentPage('age')}>
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
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  setCartOpen
}) {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [orderNotes, setOrderNotes] = useState('')

  const orderItems = cart
    .map((item) => `${item.name} x ${item.quantity} - ${item.price}`)
    .join('%0D%0A')

  const customerDetails = `
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Delivery Address: ${customerAddress}
Order Notes: ${orderNotes}
`
    .replaceAll('\n', '%0D%0A')

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
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>

                  <div className="quantity-row">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <strong>Total:</strong>
              <strong>£{cartTotal.toFixed(2)}</strong>
            </div>

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
  Online card payments are coming soon. For now, submit your order and we will contact you to arrange payment and delivery.
</p>
            <a
              href={`mailto:smokeshop154@gmail.com?subject=New Smokology Scotland Order&body=Order:%0D%0A${orderItems}%0D%0A%0D%0ATotal: £${cartTotal.toFixed(2)}%0D%0A%0D%0ACustomer Details:%0D%0A${customerDetails}`}
            >
              <button className="checkout-button">
                Email Order
              </button>
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
    delivery: {
      title: 'Delivery Information',
      content: [
        'Delivery charges are calculated based on the total packed weight, parcel size, destination, and available Royal Mail delivery service.',
        'Delivery charges will be confirmed before payment is taken.',
        'Larger or heavier glass items may cost more to deliver due to weight, size, and protective packaging requirements.',
        'Orders are usually dispatched within 1–2 working days after payment is confirmed.',
        'Delivery times are estimates and may vary depending on the delivery provider.',
        'Tracking information will be provided where available.',
        'Customers are responsible for providing accurate delivery details.'
      ]
    },
age: {
  title: 'Age Restriction Policy',
  content: [
    'Smokology Scotland sells adult smoking accessories only.',
    'You must be 18 or over to use this website, place an order, or purchase any product.',
    'By placing an order, you confirm that you are at least 18 years old.',
    'We reserve the right to request proof of age before accepting or completing an order.',
    'Orders may be refused or cancelled if we believe the customer is under 18 or cannot provide suitable age verification.',
    'Products must not be purchased for anyone under the age of 18.'
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
      <button onClick={() => setCurrentPage('home')}>
        ← Back to products
      </button>

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