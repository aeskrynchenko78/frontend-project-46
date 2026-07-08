import parseFile from './parsers.js'

const genDiff = (filepath1, filepath2) => {
  // Парсим файлы в JS-объекты
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  // Временный вывод, чтобы проверить, что парсинг работает
  // В следующем шаге мы заменим это на реальное сравнение
  return `File 1 data:\n${JSON.stringify(data1, null, 2)}\n\nFile 2 data:\n${JSON.stringify(data2, null, 2)}`
}

export default genDiff
