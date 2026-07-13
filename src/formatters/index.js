import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const format = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree)
    case 'plain':
      return plain(tree)
    case 'json':
      return json(tree)
    default:
      throw new Error(`Unknown format: ${formatName}`)
  }
}

export default format
