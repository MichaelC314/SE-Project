// 32 byte key
const SECRET_KEY = 'RwGZ2zAeWrQsEe/APYZEPtP7PJ0Il3jQAR6SkD6Z9u4='; // AES-256

// Function to hash the secret key to ensure it is 256 bits (32 bytes)
// This must be done or you end up with Data errors (found that out).
// This derives an AES enc. key from the SECRET_KEY
// It does this by using a PBKDF2 key derivation function.
const deriveKey = async () => {
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    stringToArrayBuffer(SECRET_KEY),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new Uint8Array(16), // This salt is constant, simply because it easier. For actual prod code you'd want randomized salt.
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-CBC', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

// AES works blocks of 16 bytes, so we have to pad the data
// to get it to a size multiple of 16 bytes
const padData = (data) => {
  const blockSize = 16; // AES block size
  const paddingLength = blockSize - (data.byteLength % blockSize);
  const paddedData = new Uint8Array(data.byteLength + paddingLength);
  paddedData.set(new Uint8Array(data));

  for (let i = data.byteLength; i < paddedData.byteLength; i++) {
    paddedData[i] = paddingLength;
  }

  return paddedData.buffer;
};

// Removes padding
const unpadData = (data) => {
  const lastByte = new Uint8Array(data)[data.byteLength - 1];
  return data.slice(0, data.byteLength - lastByte); // Remove padding
};

// Converts string to ArrayBuffer
const stringToArrayBuffer = (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

// ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer) => {
  const binary = String.fromCharCode(...new Uint8Array(buffer));
  return btoa(binary);
};

// Now back to ArrayBuffer
const base64ToArrayBuffer = (base64) => {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// AES encryption function (AES-256-CBC)
export const encryptData = async (data) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(16)); // Generate random IV

  // Derive the AES key (256-bit key)
  const key = await deriveKey();

  // Pad data to fit AES block size
  const paddedData = padData(stringToArrayBuffer(data));

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-CBC', iv },
    key,
    paddedData
  );

  // Return IV and encrypted data as Base64 strings
  return {
    iv: arrayBufferToBase64(iv),
    encryptedData: arrayBufferToBase64(encryptedBuffer),
  };
};

// AES decryption function (AES-256-CBC)
export const decryptData = async (encryptedData, iv) => {
  // Derive the AES key (256-bit key)
  const key = await deriveKey();

  // Convert the Base64-encoded data back to ArrayBuffers
  const ivBuffer = base64ToArrayBuffer(iv);
  const encryptedBuffer = base64ToArrayBuffer(encryptedData);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: ivBuffer },
    key,
    encryptedBuffer
  );

  // Unpad the decrypted data
  const unpaddedData = unpadData(decryptedBuffer);

  // Convert the decrypted data to a string
  const decoder = new TextDecoder();
  return decoder.decode(unpaddedData);
};
