import isPlainObject from 'lodash/isPlainObject.js'

// Вспомогательная функция для форматирования значений по правилам plain
const stringify = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const plain = (tree) => {
  const iter = (nodes, parentKeys) => {
    const lines = nodes.flatMap((node) => {
      // Формируем полный путь до текущего свойства через точку
      const currentPath = [...parentKeys, node.key].join('.')

      switch (node.type) {
        case 'nested':
          // Передаем обновленный массив ключей вглубь рекурсии
          return iter(node.children, [...parentKeys, node.key])
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(node.value)}`
        case 'deleted':
          return `Property '${currentPath}' was removed`
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`
        case 'unchanged':
          // Неизмененные свойства в формате plain просто игнорируются
          return []
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })

    return lines
  }

  // Запускаем рекурсию с пустым массивом родительских ключей
  const result = iter(tree, [])
  return result.join('\n')
}

export default plain
