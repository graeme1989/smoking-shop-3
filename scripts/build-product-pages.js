import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { products } from '../src/products.js'
import { catalogueCategories, categoryMetadata, productMetadata, productPath, relatedProducts } from '../src/product-pages.js'

import { deliveryInformation, deliveryMetadata, deliveryPath, deliveryTitle } from '../src/postage.js'

const html = await readFile('dist/index.html', 'utf8')
const escape = (value) => String(value).replace(/[&<>"']/g, (character) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])

async function writePage(path, { title, description, canonical }, markup) {
  const directory = `dist${path}`
  await mkdir(directory, { recursive: true })
  await writeFile(directory + 'index.html', html
    .replace(/<title>.*?<\/title>/, () => `<title>${escape(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, (_, start) => start + escape(description))
    .replace(/(<link rel="canonical" href=")[^"]*/, (_, start) => start + escape(canonical))
    .replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`))
}

const categoryLinks = `<nav aria-label="Product categories">${catalogueCategories.map(({ path, name }) => `<a href="${path}">${escape(name)}</a>`).join(' ')}</nav>`
const categories = catalogueCategories.filter(({ heading }) => heading)

for (const product of products) {
  const category = categories.find(({ name }) => name === product.category)
  const related = relatedProducts(product, products).map((item) => `<li><a href="${productPath(item)}">${escape(item.name)}</a></li>`).join('')
  const detail = `<main><h1>${escape(product.name)}</h1><p>${escape(product.price)}</p><ul>${product.details.map((item) => `<li>${escape(item)}</li>`).join('')}</ul><a href="${category.path}">Browse ${escape(category.heading)}</a><section><h2>Related products</h2><ul>${related}</ul></section></main>`
  await writePage(productPath(product), productMetadata(product), detail)
}

for (const category of catalogueCategories) {
  const matching = category.heading ? products.filter(({ category: name }) => name === category.name) : products
  const links = matching.map((product) => `<li><a href="${productPath(product)}">${escape(product.name)}</a> ${escape(product.price)}</li>`).join('')
  const metadata = category.heading ? categoryMetadata(category) : productMetadata(null)
  await writePage(category.path, metadata, `<main><h1>${escape(category.heading ?? 'Glass Water Pipes, Grinders & Rolling Papers')}</h1><p>${escape(metadata.description)}</p>${categoryLinks}<p><a href="${deliveryPath}">${escape(deliveryTitle)}</a></p><ul>${links}</ul></main>`)
}

await writePage(deliveryPath, deliveryMetadata, `<main><h1>${escape(deliveryTitle)}</h1>${deliveryInformation.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}<a href="/">Back to products</a></main>`)

const urls = [deliveryMetadata.canonical, productMetadata(null).canonical, ...categories.map((category) => categoryMetadata(category).canonical), ...products.map((product) => productMetadata(product).canonical)]
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escape(url)}</loc></url>`).join('\n')}\n</urlset>\n`)
await writeFile('dist/robots.txt', 'User-agent: *\nSitemap: https://smokologyscotland.co.uk/sitemap.xml\n')
