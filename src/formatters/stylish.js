import isPlainObject from 'lodash/isPlainObject.js'

// Формула Хекслета: глубина * 4 - 2 пробела для спецсимволов (+/-)
const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2)
const bracketIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount)

// Функция для красивого вывода объектов, которые являются просто значениями
const stringify = (value, depth) => {
  if (!isPlainObject(value)) {
    return String(value)
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`
  )

  return `{\n${lines.join('\n')}\n${bracketIndent(depth)}}`
}

const stylish = (tree) => {
  const iter = (node, depth) => {
    switch (node.type) {
      case 'nested': {
        const lines = node.children.flatMap((child) => iter(child, depth + 1))
        return `${indent(depth)}  ${node.key}: {\n${lines.join('\n')}\n${bracketIndent(depth)}}`
      }
      case 'added':
        return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`
      case 'deleted':
        return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`
      case 'changed':
        return [
          `${indent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ]
      case 'unchanged':
        return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  }

  const result = tree.flatMap((node) => iter(node, 1))
  return `{\n${result.join('\n')}\n}`
}

export default stylish
