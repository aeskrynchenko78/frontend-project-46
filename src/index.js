import sortBy from 'lodash/sortBy.js'
import union from 'lodash/union.js'
import has from 'lodash/has.js'
import parseFile from './parsers.js'

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  // Иммутабельно получаем уникальные ключи и сортируем с помощью lodash
  // _.union объединяет массивы и убирает дубликаты
  // _.sortBy сортирует, не изменяя исходный массив
  const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  // Формируем строки с различиями (map возвращает новый массив, не мутируя старый)
  const diffLines = sortedKeys.map((key) => {
    const hasInFile1 = _.has(data1, key)
    const hasInFile2 = _.has(data2, key)

    if (!hasInFile1) {
      // Ключ добавлен
      return `  + ${key}: ${data2[key]}`
    }
    if (!hasInFile2) {
      // Ключ удален
      return `  - ${key}: ${data1[key]}`
    }
    if (data1[key] !== data2[key]) {
      // Значение изменилось (сначала минус, потом плюс — по требованию)
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`
    }
    // Значение не изменилось
    return `    ${key}: ${data1[key]}`
  })

  // Склеиваем массив в строку и оборачиваем в фигурные скобки
  return `{\n${diffLines.join('\n')}\n}`
}

export default genDiff
