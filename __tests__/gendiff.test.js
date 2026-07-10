import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

const expected = readFile('expected_stylish.txt')

test.each([
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yml'],
  ['file1.json', 'file2.yml'],
])('genDiff with %s and %s', (file1, file2) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2))).toEqual(expected)
})
