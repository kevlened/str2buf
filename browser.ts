/**
 * Parse a binary string from a Uint8Array
 * 
 * @param {Uint8Array} uint8Array
 * @returns {String}
 */
export function fromUint8Array(uint8Array) {
  return uint8Array.reduce((ag, c) => ag += String.fromCharCode(c), '')
}

/**
 * Create a Uint8Array from a binary string
 * 
 * @param {String} binaryStr
 * @returns {Uint8Array}
 */
export function toUint8Array(binaryStr) {
  return new Uint8Array(binaryStr.length).map((v, i) => binaryStr.charCodeAt(i))
}

/**
 * Create an ArrayBuffer from a binary string
 * 
 * @param {ArrayBuffer} buffer
 * @returns {String}
 */
export function fromBuffer(buffer) {
  return fromUint8Array(new Uint8Array(buffer))
}

/**
 * Parse a binary string from an ArrayBuffer
 * 
 * @param {String} binaryStr
 * @returns {ArrayBuffer}
 */
export function toBuffer(binaryStr) {
  return toUint8Array(binaryStr).buffer
}

export default {
  fromUint8Array,
  toUint8Array,
  fromBuffer,
  toBuffer
}
