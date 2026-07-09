import fs from 'node:fs'
import path from 'node:path'

const parseFile = (filepath) => {
  // Защита от path traversal согласно рекомендациям SonarCloud
  // 1. Получаем канонический путь рабочей директории с разделителем в конце
  const baseDir = fs.realpathSync(process.cwd()) + path.sep

  // 2. Формируем полный путь через path.join (не path.resolve!)
  const fullPath = path.isAbsolute(filepath)
    ? filepath
    : path.join(baseDir, filepath)

  // 3. Проверяем существование файла
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${filepath}`)
  }

  // 4. Резолвим канонический путь (устраняем ../, симлинки)
  const canonicalPath = fs.realpathSync(fullPath)

  // 5. Валидируем: путь должен быть внутри рабочей директории
  if (!canonicalPath.startsWith(baseDir)) {
    throw new Error('Access denied: file is outside working directory')
  }

  // 6. Проверяем, что это файл
  if (!fs.lstatSync(canonicalPath).isFile()) {
    throw new Error(`Path is not a file: ${filepath}`)
  }

  // 7. Читаем и парсим файл
  const data = fs.readFileSync(canonicalPath, 'utf-8')
  const ext = path.extname(canonicalPath).toLowerCase()

  if (ext === '.json') {
    return JSON.parse(data)
  }

  throw new Error(`Unsupported file format: ${ext}`)
}

export default parseFile
