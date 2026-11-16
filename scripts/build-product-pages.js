import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { products } from '../src/products.js'
import { productMetadata, productPath } from '../src/product-pages.js'

const html = await readFile('dist/index.html', 'utf8')
const escape = (value) => String(value).replace(/[&<>"']/g, (character) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])

for (const product of products) {
  const { title, description, canonical } = productMetadata(product)
  const directory = `dist${productPath(product)}`
  const detail = `<main><h1>${escape(product.name)}</h1><p>${escape(product.price)}</p><ul>${product.details.map((item) => `<li>${escape(item)}</li>`).join('')}</ul><a href="/">Browse all products</a></main>`
  await mkdir(directory, { recursive: true })
  await writeFile(directory + 'index.html', html
    .replace(/<title>.*?<\/title>/, () => `<title>${escape(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, (_, start) => start + escape(description))
    .replace(/(<link rel="canonical" href=")[^"]*/, (_, start) => start + escape(canonical))
    .replace('<div id="root"></div>', () => `<div id="root">${detail}</div>`))
}

const urls = [productMetadata(null).canonical, ...products.map((product) => productMetadata(product).canonical)]
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escape(url)}</loc></url>`).join('\n')}\n</urlset>\n`)
await writeFile('dist/robots.txt', 'User-agent: *\nSitemap: https://smokologyscotland.co.uk/sitemap.xml\n')
