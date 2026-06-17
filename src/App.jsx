import './style.css'
import React, { useEffect, useState } from 'react'

const products = [
  {
    id: 1,
    name: 'Crystal Love',
    category: 'Glass Water Pipes',
    price: '£99.99',
    stock: 1,
    weight: 1.4,
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
  category: 'Glass Water Pipes',
  price: '£49.99',
  stock: 1,
  weight: 0.65,
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
  stock: 0,
  weight: 0.3,
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
  stock: 2,
  weight: 0.6,
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
  stock: 2,
  weight: 0.6,
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
  stock: 1,
  weight: 0.3,
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
  stock: 2,
  weight: 0.3,
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
  stock: 1,
  weight: 0.65,
  image: '/DigDual.png',
  details: [
    'Dual percolator filtration system',
    'Borosilicate glass construction',
    'Stable rounded base',
    'Includes glass accessories',
    'Durable Chongz design',
  ]
},
{
  id: 9,
  name: "CHONGZ DR DEATH TRIPLE DIFFUSER WATER PIPE GREEN 52CM",
  category: 'Glass Water Pipes',
  price: '£99.99',
  stock: 1,
  weight: 1.6,
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
  stock: 1,
  weight: 1.6,
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
  stock: 1,
  weight: 1.6,
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
  stock: 1,
  weight: 1.6,
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
  stock: 1,
  weight: 1.6,
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
  name: 'CHONGZ NOVA SUPREME GLASS ICE WATERPIPE GREEN',
  category: 'Glass Water Pipes',
  price: '£49.99',
  stock: 1,
  weight: 1,
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
  name: 'CHONGZ NOVA SUPREME GLASS ICE WATERPIPE PURPLE',
  category: 'Glass Water Pipes',
  price: '£49.99',
  stock: 1,
  weight: 1,
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
  name: 'CHONGZ NOVA SUPREME GLASS ICE WATERPIPE PINK',
  category: 'Glass Water Pipes',
  price: '£49.99',
  stock: 1,
  weight: 1,
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
},
{
  id: 17,
  name: 'Chongz Triple Honeycomb Percolator Glass Water Pipe Blue',
  category: 'Glass Water Pipes',
  price: '£59.99',
  stock: 1,
  weight: 0.6,
  image: '/triple-honeycomb-blue.png',
  details: [
    'Triple honeycomb disc percolator system',
    'Blue accented borosilicate glass',
    'Straight tube design',
    'Removable glass bowl included',
    'Enhanced filtration and cooling',
    'Wide stable base',
    'Premium Chongz glass construction',
    'Suitable for adult smoking accessories collections',
    'Available in Blue, Pink and Amber'
  ]
},
{
  id: 18,
  name: 'Chongz Triple Honeycomb Percolator Glass Water Pipe Pink',
  category: 'Glass Water Pipes',
  price: '£59.99',
  stock: 1,
  weight: 0.6,
  image: '/triple-honeycomb-pink.png',
  details: [
    'Triple honeycomb disc percolator system',
    'Pink accented borosilicate glass',
    'Straight tube design',
    'Removable glass bowl included',
    'Enhanced filtration and cooling',
    'Wide stable base',
    'Premium Chongz glass construction',
    'Suitable for adult smoking accessories collections',
    'Available in Blue, Pink and Amber'
  ]
},
{
  id: 19,
  name: 'Chongz Triple Honeycomb Percolator Glass Water Pipe Amber',
  category: 'Glass Water Pipes',
  price: '£59.99',
  stock: 1,
  weight: 0.6,
  image: '/triple-honeycomb-amber.png',
  details: [
    'Triple honeycomb disc percolator system',
    'Amber accented borosilicate glass',
    'Straight tube design',
    'Removable glass bowl included',
    'Enhanced filtration and cooling',
    'Wide stable base',
    'Premium Chongz glass construction',
    'Suitable for adult smoking accessories collections',
    'Available in Blue, Pink and Amber'
  ]
},
{
  id: 20,
  name: 'Chongz V For Victory Chromed Blue Glass Water Pipe 40cm',
  category: 'Glass Water Pipes',
  price: '£94.99',
  stock: 1,
  weight: 1.8,
  image: '/v-for-victory-blue.png',
  details: [
    'Height: 40cm',
    'Chromed blue finish',
    'Distinctive V-shaped beaker base',
    'Straight tube design',
    'Removable glass bowl included',
    'Durable borosilicate glass',
    'Wide stable base',
    'Premium Chongz glass construction',
    'Suitable for adult smoking accessories collections'
  ]
},
{
  id: 21,
  name: 'Chongz Dead Head Glass Water Pipe Blue',
  category: 'Glass Water Pipes',
  price: '£49.99',
  stock: 1,
  weight: 1.4,
  image: '/dead-head-blue.png',
  details: [
    'Dead Head graphic design',
    'Blue accented glass',
    'Beaker style base',
    '9mm glass construction',
    'Removable glass bowl included',
    'Wide stable base',
    'Premium Chongz glassware',
    'Suitable for adult smoking accessories collections',
    'Also available in Pink, Green and White'
  ]
},
{
  id: 22,
  name: 'Chongz Dead Head Glass Water Pipe Pink',
  category: 'Glass Water Pipes',
  price: '£49.99',
  stock: 1,
  weight: 1.4,
  image: '/dead-head-pink.png',
  details: [
    'Dead Head graphic design',
    'Pink accented glass',
    'Beaker style base',
    '9mm glass construction',
    'Removable glass bowl included',
    'Wide stable base',
    'Premium Chongz glassware',
    'Suitable for adult smoking accessories collections',
    'Also available in Blue, Green and White'
  ]
},
{
  id: 23,
  name: 'Chongz Dead Head Glass Water Pipe Green',
  category: 'Glass Water Pipes',
  price: '£49.99',
  stock: 1,
  weight: 1.4,
  image: '/dead-head-green.png',
  details: [
    'Dead Head graphic design',
    'Green accented glass',
    'Beaker style base',
    '9mm glass construction',
    'Removable glass bowl included',
    'Wide stable base',
    'Premium Chongz glassware',
    'Suitable for adult smoking accessories collections',
    'Also available in Blue, Pink and White'
  ]
},
{
  id: 24,
  name: 'Chongz Dead Head Glass Water Pipe White',
  category: 'Glass Water Pipes',
  price: '£49.99',
  stock: 1,
  weight: 1.4,
  image: '/dead-head-white.png',
  details: [
    'Dead Head graphic design',
    'White accented glass',
    'Beaker style base',
    '9mm glass construction',
    'Removable glass bowl included',
    'Wide stable base',
    'Premium Chongz glassware',
    'Suitable for adult smoking accessories collections',
    'Also available in Blue, Pink and Green'
  ]
},
{
  id: 25,
  name: 'Chongz Rola Kola Glass Water Pipe Green',
  category: 'Glass Water Pipes',
  price: '£44.99',
  stock: 1,
  weight: 0.4,
  image: '/2-system-green.png',
  details: [
    'Dual chamber filtration system',
    'Green accented borosilicate glass',
    'Compact straight body design',
    'Removable glass bowl included',
    'Built-in percolator filtration',
    'Premium Chongz glass construction',
    'Wide stable base',
    'Enhanced cooling and smoother draws',
    'Suitable for adult smoking accessories collections',
    'Also available in Pink'
  ]
},
{
  id: 26,
  name: 'Chongz Grifter Glass Water Pipe Pink',
  category: 'Glass Water Pipes',
  price: '£44.99',
  stock: 1,
  weight: 0.4,
  image: '/2-system-pink.png',
  details: [
    'Dual chamber filtration system',
    'Pink accented borosilicate glass',
    'Compact straight body design',
    'Removable glass bowl included',
    'Built-in percolator filtration',
    'Premium Chongz glass construction',
    'Wide stable base',
    'Enhanced cooling and smoother draws',
    'Suitable for adult smoking accessories collections',
    'Also available in Green'
  ]
},
{
  id: 27,
  name: 'Cookies x G Pen Nova Vaporizer Blue',
  category: 'Accessories',
  price: '£39.99',
  stock: 1,
  weight: 0.25,
  image: '/cookies-gpen-nova-blue.png',
  details: [
    'Cookies x G Pen collaboration',
    'Portable vaporizer device',
    'Full ceramic atomizer',
    'Variable voltage settings',
    '300mAh rechargeable battery',
    'Micro USB charging',
    'Compact pocket-sized design',
    'Easy-clean mouthpiece system',
    'Premium blue finish',
  ]
},
{
  id: 28,
  name: 'Luxe Glass Kingsize Papers',
  category: 'Papers',
  price: '£0.99',
  stock: 38,
  weight: 0.01,
  image: '/luxe-glass-kingsize-papers.png',
  details: [
    'Kingsize clear rolling papers',
    'Made from plant cellulose',
    'Transparent paper design',
    'Slow and even burn',
    'Original Luxe Glass papers',
  ]
},
{
  id: 29,
  name: 'RAW Organic Kingsize Slim Papers',
  category: 'Papers',
  price: '£1.29',
  stock: 134,
  weight: 0.01,
  image: '/raw-organic-hemp-kingsize-slim.png',
  details: [
    'Kingsize slim papers',
    'Made from organic hemp',
    'Natural unrefined paper',
    'Vegan friendly',
    'Slow burning design',
    'RAW authentic product'
  ]
},
{
  id: 30,
  name: 'RAW Classic Kingsize Slim Papers',
  category: 'Papers',
  price: '£1.29',
  stock: 0,
  weight: 0.01,
  image: '/raw-classic-kingsize-slim.png',
  details: [
    'Kingsize slim papers',
    'Natural unrefined paper',
    'Made from pure plant fibres',
    'Slow and even burn',
    'Classic RAW paper',
    'Authentic RAW product'
  ]
},
{
  id: 31,
  name: 'Royal Hemparillo Wraps',
  category: 'Papers',
  price: '£1.99',
  stock: 100,
  image: '/royal-blunts-hemparillo.png',
  weight: 0.02,
  options: {
    label: 'Flavour',
values: [
  { name: 'Strawberry', stock: 13 },
  { name: 'Mango Haze', stock: 12 },
  { name: 'Bubble Gum', stock: 13 },
  { name: 'Grape', stock: 0 },
  { name: 'Sweets', stock: 11 },
  { name: 'Berries', stock: 12 },
  { name: 'Cali Fire', stock: 12 },
  { name: 'Purple Haze', stock: 14 }
]
  },
  details: [
    'Tobacco-free hemp wraps',
    '4 wraps per pack',
    'Royal Hemparillo range',
    'All natural wraps',
    'Available in multiple flavours',
'our hemp wraps are made from industrial hemp fibre and do not contain CBD, THC or cannabinoids'
  ]
},
{
  id: 32,
  name: 'Cyclones Pre-Rolled Cone',
  category: 'Papers',
  price: '£0.99',
  stock: 100,
  image: '/cyclones-cone-blunts.png',
  weight: 0.02,
  options: {
    label: 'Flavour',
    values: [
  { name: 'Blueberry', stock: 23 },
  { name: 'Peach', stock: 21 },
  { name: 'Grape', stock: 23 },
  { name: 'Rock Star', stock: 23 },
  { name: 'Black Widow', stock: 20 },
  { name: 'Cherry', stock: 19 },
  { name: 'Strawberry', stock: 23 },
  { name: 'White Chocolate', stock: 20 },
]
  },
  details: [
    'Pre-rolled cone',
    'Ready to fill',
    'Slow burning wrap',
    'Available in multiple flavours',
    'Cyclones original product'
  ]
},
{
  id: 33,
  name: "Juicy Jay's Jones Cones",
  category: 'Papers',
  price: '£0.99',
  stock: 100,
  image: '/juicy-jays-jones-cones.png',
  weight: 0.02,
  options: {
    label: 'Flavour',
values: [
  { name: 'Blackberry Jones', stock: 16 },
  { name: 'Watermelon Jones', stock: 15 }
]
  },
  details: [
    'Pre-rolled flavoured cones',
    'Includes reusable packing stick',
    'Ready to fill',
    'Slow burning paper',
    'Juicy Jay flavour range'
  ]
},
{
  id: 34,
  name: 'Cyclones Hemp Cones',
  category: 'Papers',
  price: '£1.99',
  stock: 100,
  image: '/cyclones-hemp-cones.png',
  weight: 0.02,
  options: {
    label: 'Flavour',
 values: [
  { name: 'Red Alert', stock: 9 },
  { name: 'Blue', stock: 9 },
  { name: 'Mean Green', stock: 6 },
  { name: 'Purple', stock: 10 }
]
  },
  details: [
    'Hemp cone',
    'Pre-rolled cone',
    'Ready to fill',
    'Natural hemp wrap',
    'Available in multiple flavours',
'our hemp wraps are made from industrial hemp fibre and do not contain CBD, THC or cannabinoids'
  ]
},
{
  id: 35,
  name: 'Large Twist Chamber Glass Pipe',
  category: 'Accessories',
  price: '£9.99',
  stock: 1,
  image: '/twist-chamber-glass-pipe.png',
  weight: 0.10,
  details: [
    'Glass tube with twist-feed mechanism',
    'Rotating internal spiral',
    'Reusable design',
    'Easy to disassemble for cleaning',
    'Compact portable size'
  ]
},
{
  id: 36,
  name: 'Stainless Steel Compression Press',
  category: 'Accessories',
  price: '£14.99',
  stock: 1,
  image: '/stainless-steel-compression-press.png',
  weight: 0.55,
  details: [
    'Heavy-duty stainless steel construction',
    'Threaded compression mechanism',
    'Compact portable design',
    'Precision machined finish',
    'Durable reusable tool'
  ]
}
]

const categories = ['All', 'Glass Water Pipes', 'Accessories', 'Grinders', 'Papers']

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)

const [productScrollPosition, setProductScrollPosition] = useState(0)

useEffect(() => {
  if (selectedProduct) {
    window.scrollTo(0, 0)
  }
}, [selectedProduct])
useEffect(() => {
  const handleBackButton = () => {
 if (selectedProduct) {
  localStorage.removeItem('selectedProductId')
  setSelectedProduct(null)
  setTimeout(() => {
    window.scrollTo(0, productScrollPosition)
  }, 0)
}
  }

  window.addEventListener('popstate', handleBackButton)

  return () => {
    window.removeEventListener('popstate', handleBackButton)
  }
}, [selectedProduct, productScrollPosition])
  const [selectedCategory, setSelectedCategory] = useState('All')
const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem('smokologyCart')
  return savedCart ? JSON.parse(savedCart) : []
})
  const [cartOpen, setCartOpen] = useState(false)
const [addedMessage, setAddedMessage] = useState(null)
const [selectedOption, setSelectedOption] = useState('')
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

return [
  ...currentCart,
  {
    ...product,
    quantity: 1,
    selectedOption
  }
]
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

const totalWeight = cart.reduce((sum, item) => {
  return sum + ((item.weight || 0) * item.quantity)
}, 0)

const shippingCost = totalWeight === 0 ? 0 : totalWeight <= 1 ? 3.99 : totalWeight <= 2 ? 5.99 : totalWeight <= 10 ? 7.35 : 0

const shippingMethod =
  totalWeight === 0
    ? ""
    : totalWeight <= 1
      ? "Royal Mail Tracked 48 - Small Parcel"
      : totalWeight <= 2
        ? "Royal Mail Tracked 48 - Medium Parcel"
        : totalWeight <= 10
          ? "Royal Mail Tracked 48 - Large Parcel"
          : "Please contact us for delivery quote"

const orderTotal = cartTotal + shippingCost

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
          <button onClick={() => {
  setSelectedProduct(null)
  setTimeout(() => {
    window.scrollTo(0, productScrollPosition)
  }, 0)
}}>
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
  ? 'Select a flavour'
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
{(
  selectedProduct.options && selectedOption
    ? selectedProduct.options.values.find(
        (option) => option.name === selectedOption
      )?.stock
    : selectedProduct.stock
) > 0 ? (
  <button
    onClick={() => {
      if (selectedProduct.options && !selectedOption) {
        alert(`Please select a ${selectedProduct.options.label}`)
        return
      }

      addToCart(selectedProduct)
    }}
  >
    Add to Basket
  </button>
) : (
  <button disabled>
    Out of Stock
  </button>
)}

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
                onClick={() => {
setProductScrollPosition(window.scrollY)
window.history.pushState({ productOpen: true }, '', window.location.href)
setSelectedProduct(product)
}}
              />

              <div className="product-info">
                <p className="brand-tag">{product.category}</p>
                <h3 onClick={() => {
  setProductScrollPosition(window.scrollY)
  window.history.pushState({ productOpen: true }, '', window.location.href)
  setSelectedProduct(product)
}}>{product.name}</h3>
                <p className="price">{product.price}</p>

                <button onClick={() => {
  setProductScrollPosition(window.scrollY)
  window.history.pushState({ productOpen: true }, '', window.location.href)
  setSelectedProduct(product)
}}>
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

  <button
    onClick={() => {
      setCurrentPage('delivery')
      window.scrollTo(0, 0)
    }}
  >
    Delivery Information
  </button>

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

const totalWeight = cart.reduce((sum, item) => {
  return sum + ((item.weight || 0) * item.quantity)
}, 0)

const shippingCost = totalWeight === 0 ? 0 : totalWeight <= 1 ? 3.99 : totalWeight <= 2 ? 5.99 : totalWeight <= 10 ? 7.35 : 0

const shippingMethod =
  totalWeight === 0
    ? ""
    : totalWeight <= 1
      ? "Royal Mail Tracked 48 - Small Parcel"
      : totalWeight <= 2
        ? "Royal Mail Tracked 48 - Medium Parcel"
        : totalWeight <= 10
          ? "Royal Mail Tracked 48 - Large Parcel"
          : "Please contact us for delivery quote"

const orderTotal = cartTotal + shippingCost

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

{item.selectedOption && (
  <p>Flavour: {item.selectedOption}</p>
)}

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
  <strong>Items total:</strong>
  <strong>£{cartTotal.toFixed(2)}</strong>
</div>

<div className="cart-total">
  <strong>{shippingMethod}</strong>
  <strong>£{shippingCost.toFixed(2)}</strong>
</div>

<div className="cart-total">
  <strong>Total:</strong>
  <strong>£{orderTotal.toFixed(2)}</strong>
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
              href={`mailto:smokeshop154@gmail.com?subject=New Smokology Scotland Order&body=Order:%0D%0A${orderItems}%0D%0A%0D%0AItems Total: £${cartTotal.toFixed(2)}%0D%0ADelivery: ${shippingMethod} - £${shippingCost.toFixed(2)}%0D%0ATotal: £${orderTotal.toFixed(2)}%0D%0A%0D%0ACustomer Details:%0D%0A${customerDetails}`}
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