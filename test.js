const assert = require('assert')

const demoSigArray = new Uint8Array([11,153,104,103,31,85,244,157,150,178,90,18,11,213,126,1,240,33,90,223,11,24,240,7,87,203,178,39,141,252,200,56])
const demoSigBuffer = new Buffer(demoSigArray)
const demoArray = new Uint8Array([104,101,108,108,111])
const demoBuffer = new Buffer(demoArray)
const demoStr = 'hello'

function createBigArray(size) {
  const ab = new ArrayBuffer(size)
  while(size--) {
    ab[size] = 104
  }
  return new Uint8Array(ab)
}

function ab2buf(ab) {
  return Buffer.from(new Uint8Array(ab));
}

function run(str2buf, version) {
  assert.equal(str2buf.fromUint8Array(demoArray), demoStr,
    `str2buf.fromUint8Array did not transform correctly:
    ${str2buf.fromUint8Array(demoArray)} should equal ${demoStr}`)

  assert.ok(Buffer.from(str2buf.toUint8Array(demoStr)).equals(demoBuffer),
    `str2buf.toUint8Array did not transform correctly:
    ${str2buf.toUint8Array(demoStr)} should equal ${demoArray}`)

  assert.ok(new Buffer(str2buf.toUint8Array(str2buf.fromUint8Array(demoArray)))
    .equals(demoBuffer),
    'str2buf.toUint8Array(str2buf.fromUint8Array()) did not transform correctly')

  assert.equal(str2buf.fromUint8Array(str2buf.toUint8Array(demoStr)), demoStr,
    'str2buf.fromUint8Array(str2buf.toUint8Array()) did not transform correctly')

  assert.equal(str2buf.fromBuffer(demoArray.buffer), demoStr,
    'str2buf.fromBuffer did not transform correctly')

  assert.ok(ab2buf(str2buf.toBuffer(demoStr)).equals(demoBuffer),
    'str2buf.toBuffer did not transform correctly')

  assert.ok(ab2buf(str2buf.toBuffer(str2buf.fromBuffer(demoArray.buffer))).equals(demoBuffer),
    'str2buf.toBuffer(str2buf.fromBuffer()) did not transform correctly')

  assert.ok(ab2buf(str2buf.toBuffer(str2buf.fromBuffer(demoSigArray.buffer))).equals(demoSigBuffer),
    'str2buf.toBuffer(str2buf.fromBuffer()) for the signature did not transform correctly')

  assert.equal(str2buf.fromBuffer(str2buf.toBuffer(demoStr)), demoStr,
    'str2buf.fromBuffer(str2buf.toBuffer()) did not transform correctly')

  console.log(`✅ Success for ${version}!`)

  const n = 1000
  let c = n
  const size = 25003
  const bigArray = createBigArray(size)
  const bigString = str2buf.fromUint8Array(bigArray)
  console.log(`⏱ ${version} performance on ${n} arrays or strings of size ${size}:`)

  console.time(`str2buf.fromUint8Array`)
  c = n
  while (c--) {
    str2buf.fromUint8Array(bigArray)
  }
  console.timeEnd(`str2buf.fromUint8Array`)

  console.time(`str2buf.toUint8Array`)
  c = n
  while (c--) {
    str2buf.toUint8Array(bigString)
  }
  console.timeEnd(`str2buf.toUint8Array`)

  console.time(`str2buf.fromBuffer`)
  c = n
  while (c--) {
    str2buf.fromBuffer(bigArray.buffer)
  }
  console.timeEnd(`str2buf.fromBuffer`)

  console.time(`str2buf.toBuffer`)
  c = n
  while (c--) {
    str2buf.toBuffer(bigString)
  }
  console.timeEnd(`str2buf.toBuffer`)

  console.log('')
}

run(require('./dist/str2buf.js'), 'browser')
run(require('.'), 'node')
