import stylish from './stylish.js'

const format = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree)
    default:
      throw new Error(`Unknown format: ${formatName}`)
  }
}

export default format
