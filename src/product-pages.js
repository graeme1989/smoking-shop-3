const origin = 'https://smokologyscotland.co.uk'

export function productPath(product) {
  return `/products/${product.id}/`
}

export function productMetadata(product) {
  if (!product) return {
    title: 'Glass Water Pipes, Grinders & Rolling Papers UK | Smokology Scotland',
    description: 'Shop glass water pipes, Chongz grinders, rolling papers and adult smoking accessories from Smokology Scotland, with UK delivery.',
    canonical: origin + '/',
  }

  return {
    title: `${product.name} | Smokology Scotland`,
    description: `${product.name} from Smokology Scotland. ${product.details.slice(0, 2).join('. ')}. ${product.price}.`,
    canonical: origin + productPath(product),
  }
}

export const catalogueCategories = [
  { name: 'All', path: '/' },
  { name: 'Glass Water Pipes', path: '/glass-water-pipes/', heading: 'Glass Water Pipes', description: 'Browse glass water pipes with UK delivery, including Chongz recycler and percolator models.' },
  { name: 'Accessories', path: '/accessories/', heading: 'Smoking Accessories', description: 'Browse adult smoking accessories with UK delivery, including rolling trays and storage jars.' },
  { name: 'Grinders', path: '/grinders/', heading: 'Grinders', description: 'Shop Chongz grinders and compare models, prices and stock, with UK delivery.' },
  { name: 'Papers', path: '/rolling-papers/', heading: 'Rolling Papers', description: 'Browse rolling papers from Smokology Scotland and check available options, with UK delivery.' },
]

export function categoryMetadata(category) {
  return {
    title: `${category.heading} UK | Smokology Scotland`,
    description: category.description,
    canonical: origin + category.path,
  }
}
