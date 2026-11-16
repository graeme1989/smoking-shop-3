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

  const model = product.name === product.name.toUpperCase()
    ? product.name.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase()).replace(/(\d+)Cm\b/g, '$1cm')
    : product.name
  const name = product.id === 1 ? `${model} 35cm Glass Water Pipe` : model
  const specifications = product.details
    .filter((detail) => /^(Height|Size|Material|Glass thickness|Colour|Percolator): /.test(detail))
    .filter((detail) => !name.toLowerCase().includes(detail.split(': ')[1].toLowerCase()))
    .slice(0, 2)
  return {
    title: `${name} | Smokology Scotland`,
    description: [`${name}.`, ...specifications.map((detail) => `${detail}.`), 'UK delivery from Smokology Scotland.'].join(' '),
    canonical: origin + productPath(product),
  }
}

export function relatedProducts(product, catalogue) {
  const brand = product.name.split(' ')[0].toLowerCase()
  const matches = catalogue.filter((candidate) => candidate.id !== product.id && candidate.category === product.category)
  const inStock = (candidate) => candidate.options
    ? candidate.options.values.some(({ stock }) => stock > 0)
    : candidate.stock > 0
  const score = (candidate) =>
    2 * Number(inStock(candidate)) + Number(candidate.name.toLowerCase().startsWith(brand + ' '))
  return matches.sort((a, b) => score(b) - score(a)).slice(0, 3)
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
