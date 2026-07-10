import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

const formats = ['stylish', 'plain']

describe('Gendiff functionality', () => {
  test.each(formats)('should format diff as %s', (formatName) => {
    const expected = readFile(`expected_${formatName}.txt`)

    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), formatName)).toEqual(expected)
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), formatName)).toEqual(expected)
  })
})
