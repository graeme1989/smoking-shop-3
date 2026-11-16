export const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()
const preferenceKey = 'smokology-analytics'
let lastPage

export function analyticsPreference() {
  return localStorage.getItem(preferenceKey) ?? ''
}

export function setAnalyticsPreference(preference) {
  localStorage.setItem(preferenceKey, preference)
}

export function startAnalytics() {
  if (!measurementId || analyticsPreference() !== 'allow' || window.gtag) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { send_page_view: false, allow_google_signals: false })
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId)
  document.head.append(script)
}

export function trackPage(product) {
  if (!window.gtag || analyticsPreference() !== 'allow') return
  const page = window.location.href
  if (lastPage === page) return
  lastPage = page
  window.gtag('event', 'page_view', { page_location: page, page_title: document.title })
  if (product) window.gtag('event', 'view_item', { currency: 'GBP', items: [analyticsItem(product)] })
}

function analyticsItem(product, option) {
  return {
    item_id: String(product.id),
    item_name: product.name,
    item_category: product.category,
    item_variant: option || undefined,
    price: Number(product.price.replace('£', '')),
    quantity: 1,
  }
}

export function trackBasketAdd(product, option) {
  if (!window.gtag || analyticsPreference() !== 'allow') return
  const item = analyticsItem(product, option)
  window.gtag('event', 'add_to_cart', { currency: 'GBP', value: item.price, items: [item] })
}
