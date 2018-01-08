export function fromUint8Array(uint8Array) {
  return uint8Array.reduce((ag, c) => ag += String.fromCharCode(c), '')
}

export function toUint8Array(binaryStr) {
  return new Uint8Array(binaryStr.length).map((v, i) => binaryStr.charCodeAt(i))
}

export function fromBuffer(buffer) {
  return fromUint8Array(new Uint8Array(buffer))
}

export function toBuffer(binaryStr) {
  return toUint8Array(binaryStr).buffer
}
