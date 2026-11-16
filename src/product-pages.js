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
