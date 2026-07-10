import sortBy from 'lodash/sortBy.js'
import union from 'lodash/union.js'
import has from 'lodash/has.js'
import isPlainObject from 'lodash/isPlainObject.js'
import isEqual from 'lodash/isEqual.js'
import parseFile from './parsers.js'
import format from './formatters/index.js'

const buildTree = (data1, data2) => {
  // Получаем упорядоченный массив всех уникальных ключей
  const keys = sortBy(union(Object.keys(data1), Object.keys(data2)))

  return keys.map((key) => {
    if (!has(data1, key)) {
      return { key, type: 'added', value: data2[key] }
    }
    if (!has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] }
    }
    // Если оба значения — плоские объекты, уходим в рекурсию
    if (isPlainObject(data1[key]) && isPlainObject(data2[key])) {
      return { key, type: 'nested', children: buildTree(data1[key], data2[key]) }
    }
    if (!isEqual(data1[key], data2[key])) {
      return { key, type: 'changed', oldValue: data1[key], newValue: data2[key] }
    }
    return { key, type: 'unchanged', value: data1[key] }
  })
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const tree = buildTree(data1, data2)

  return format(tree, formatName)
}

export default genDiff
