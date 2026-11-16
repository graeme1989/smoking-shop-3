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
