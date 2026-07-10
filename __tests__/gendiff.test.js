import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { readFileSync } from 'node:fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim()

describe('genDiff - flat JSON comparison', () => {
  test('should compare two flat JSON files correctly', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const expected = readFixture('expected-flat.txt')

    const result = genDiff(filepath1, filepath2)

    expect(result).toBe(expected)
  })

  test('should return string result', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')

    const result = genDiff(filepath1, filepath2)

    expect(typeof result).toBe('string')
    expect(result.startsWith('{')).toBe(true)
    expect(result.endsWith('}')).toBe(true)
  })

  test('should return no changes for identical files', () => {
    const filepath1 = getFixturePath('file1.json')

    const result = genDiff(filepath1, filepath1)

    const hasChanges = result.split('\n').some((line) => /^\s*[+-]/.test(line))
    expect(hasChanges).toBe(false)
  })

  test('should compare two flat YAML files correctly', () => {
    const filepath1 = getFixturePath('file1.yml')
    const filepath2 = getFixturePath('file2.yaml')
    const expected = readFixture('expected-flat.txt')

    const result = genDiff(filepath1, filepath2)

    expect(result).toBe(expected)
  })

  test('should compare JSON and YAML files (mixed formats)', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.yaml')
    const expected = readFixture('expected-flat.txt')

    const result = genDiff(filepath1, filepath2)

    expect(result).toBe(expected)
  })
})
