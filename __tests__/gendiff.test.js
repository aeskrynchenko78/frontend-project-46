import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

describe('Gendiff functionality', () => {
  // Тестируем текстовые форматы (stylish и plain)
  test.each(['stylish', 'plain'])('should format diff as %s', (formatName) => {
    const expected = readFile(`expected_${formatName}.txt`)

    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), formatName)).toEqual(expected)
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), formatName)).toEqual(expected)
  })

  // Тестируем формат JSON
  test('should format diff as json', () => {
    const resultJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')
    const resultYml = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')

    // Проверяем, что строка парсится корректно (это валидный JSON)
    expect(() => JSON.parse(resultJson)).not.toThrow()
    expect(() => JSON.parse(resultYml)).not.toThrow()

    // Проверяем внутреннюю структуру: корень должен быть массивом (нашим деревом)
    expect(Array.isArray(JSON.parse(resultJson))).toBe(true)
  })
})
