import fs from 'fs'
import path from 'path'

// Функция для получения данных из файла
const parseFile = (filepath) => {
  // path.resolve превращает относительный путь в абсолютный
  // от того места, откуда запущена команда (process.cwd())
  const absolutePath = path.resolve(filepath)

  // Читаем файл синхронно
  const data = fs.readFileSync(absolutePath, 'utf-8')

  // Определяем расширение файла
  const ext = path.extname(absolutePath).toLowerCase()

  // Пока поддерживаем только JSON
  if (ext === '.json') {
    return JSON.parse(data)
  }

  throw new Error(`Unsupported file format: ${ext}`)
}

export default parseFile
