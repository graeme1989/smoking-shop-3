// Royal Mail Click & Drop online Tracked 48 guide, effective 5 October 2026.
const smallParcel = { maxGrams: 2000, pricePence: 375, size: 'Small Parcel' }
const mediumParcelRates = [
  { maxGrams: 2000, pricePence: 570, size: 'Medium Parcel' },
  { maxGrams: 10000, pricePence: 755, size: 'Medium Parcel' },
  { maxGrams: 20000, pricePence: 1225, size: 'Medium Parcel' },
]

export const FREE_DELIVERY_SUBTOTAL_PENCE = 10000

export function getUkPostage(cart, subtotalPence = 0) {
  if (!cart.length) return { totalGrams: 0, pricePence: 0, service: '' }

  const totalGrams = cart.reduce((total, item) =>
    total + Math.round(item.weight * 1000) * item.quantity, 0)
  // Multiple glass pipes need room for separate protective wrapping.
  const glassPipeCount = cart.reduce((total, item) =>
    total + (item.category === 'Glass Water Pipes' ? item.quantity : 0), 0)
  const canUseSmallParcel = glassPipeCount < 2 && !cart.some((item) => item.minimumParcel === 'medium')
  const rate = canUseSmallParcel && totalGrams <= smallParcel.maxGrams
    ? smallParcel
    : mediumParcelRates.find(({ maxGrams }) => totalGrams <= maxGrams)

  const freeDelivery = rate?.maxGrams === 2000 && subtotalPence >= FREE_DELIVERY_SUBTOTAL_PENCE

  return {
    totalGrams,
    pricePence: freeDelivery ? 0 : rate?.pricePence ?? null,
    service: rate ? `Royal Mail Tracked 48 · ${rate.size}` : 'Delivery quote required',
  }
}

export const deliveryPath = '/delivery-and-ordering/'
export const deliveryTitle = 'Delivery & Ordering'
export const deliveryDescription = 'See UK delivery estimates, free-delivery conditions and how to email an order to Smokology Scotland.'
export const deliveryInformation = [
  'Add your items to the basket and enter your delivery details. The basket shows an estimated postage charge based on the items and parcel size.',
  `Royal Mail Tracked 48 estimates start at £${(smallParcel.pricePence / 100).toFixed(2)} for a small parcel up to 2 kg and £${(mediumParcelRates[0].pricePence / 100).toFixed(2)} for a medium parcel up to 2 kg. Heavier parcels may cost more.`,
  `Free UK delivery applies to orders of £${FREE_DELIVERY_SUBTOTAL_PENCE / 100} or more that fit in one Royal Mail Tracked 48 parcel up to 2 kg.`,
  'Choose Email Order to open a prefilled draft in your email app. Review the details and send the draft to us. If the basket cannot estimate postage, choose Request Delivery Quote instead.',
  'We check the packed weight, dimensions and destination, then confirm delivery costs and how to pay by email before taking payment.',
  'Orders are usually dispatched within 1–2 working days of confirmed payment. Delivery times are estimates, and we provide tracking where available.',
]

export const deliveryMetadata = {
  title: `${deliveryTitle} | Smokology Scotland`,
  description: deliveryDescription,
  canonical: `https://smokologyscotland.co.uk${deliveryPath}`,
}
