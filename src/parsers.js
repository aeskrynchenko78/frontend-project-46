import fs from 'node:fs'
import path from 'node:path'

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)

  // Добавляем проверку: существует ли файл и файл ли это
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`)
  }
  if (!fs.lstatSync(absolutePath).isFile()) {
    throw new Error(`Path is not a file: ${absolutePath}`)
  }

  const data = fs.readFileSync(absolutePath, 'utf-8')
  const ext = path.extname(absolutePath).toLowerCase()

  if (ext === '.json') {
    return JSON.parse(data)
  }

  throw new Error(`Unsupported file format: ${ext}`)
}

export default parseFile
