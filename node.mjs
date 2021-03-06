export function fromUint8Array(uint8Array) {
  return new Buffer(uint8Array).toString('binary')
}

export function toUint8Array(binaryStr) {
  return new Uint8Array(Buffer.from(binaryStr, 'binary'))
}

export function fromBuffer(buffer) {
  return fromUint8Array(new Uint8Array(buffer))
}

export function toBuffer(binaryStr) {
  return toUint8Array(binaryStr).buffer
}
