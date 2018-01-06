export function fromUint8Array(uint8Array) {
  let binary = ''
  for (let b = 0, bl = uint8Array.length; b < bl; b++) {
    binary += String.fromCharCode(uint8Array[b])
  }
  return binary
}

export function toUint8Array(binaryStr) {
  const uint8Array = new Uint8Array(binaryStr.length);
  for (let s = 0, sl = binaryStr.length; s < sl; s++) {
    uint8Array[s] = binaryStr.charCodeAt(s);
  }
  return uint8Array;
}

export function fromBuffer(buffer) {
  return fromUint8Array(new Uint8Array(buffer))
}

export function toBuffer(binaryStr) {
  return toUint8Array(binaryStr).buffer
}

export default {
  fromUint8Array,
  toUint8Array,
  fromBuffer,
  toBuffer
}
