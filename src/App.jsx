import './style.css'
import React, { useState } from 'react'

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
    image: 'flog-em-dual.png',
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
      'Premium Chongz glassware',
      'Also available in Green and Purple'
    ]
  }
]

const categories = ['All', 'Glass Water Pipes', 'Accessories', 'Grinders', 'Papers']

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  if (selectedProduct) {
    return (
      <div className="site">
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

              <a
                href="https://www.instagram.com/edinburghsmokeshop"
                target="_blank"
                rel="noreferrer"
              >
                <button>Enquire to Buy</button>
              </a>

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

      <main className="products-section">
        <div>
          <h1>Products</h1>
          <p style={{ color: '#cbd5e1', fontSize: '20px', marginBottom: '30px' }}>
            Order via Instagram or email: smokeshop154@gmail.com
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
            <article
              className="product-card"
              key={product.id}
              onClick={() => setSelectedProduct(product)}
            >
              <img className="product-photo" src={product.image} alt={product.name} />

              <div className="product-info">
                <p className="brand-tag">{product.category}</p>
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <button>View Details</button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
