import CryptoJS from "crypto-js";

// Function to compute SHA-1 hash
export async function hashChecksum(message) {
  function rotateLeft(n, s) {
    return (n << s) | (n >>> (32 - s));
  }

  function toHexStr(n) {
    let s = "",
      v;
    for (let i = 7; i >= 0; i--) {
      v = (n >>> (i * 4)) & 0x0f;
      s += v.toString(16);
    }
    return s;
  }

  let words = [];
  let msgLen = message.length;

  for (let i = 0; i < msgLen - 3; i += 4) {
    words.push(
      (message.charCodeAt(i) << 24) |
        (message.charCodeAt(i + 1) << 16) |
        (message.charCodeAt(i + 2) << 8) |
        message.charCodeAt(i + 3)
    );
  }

  switch (msgLen % 4) {
    case 0:
      words.push(0x080000000);
      break;
    case 1:
      words.push((message.charCodeAt(msgLen - 1) << 24) | 0x0800000);
      break;
    case 2:
      words.push(
        (message.charCodeAt(msgLen - 2) << 24) |
          (message.charCodeAt(msgLen - 1) << 16) |
          0x08000
      );
      break;
    case 3:
      words.push(
        (message.charCodeAt(msgLen - 3) << 24) |
          (message.charCodeAt(msgLen - 2) << 16) |
          (message.charCodeAt(msgLen - 1) << 8) |
          0x80
      );
      break;
  }

  while (words.length % 16 !== 14) {
    words.push(0);
  }

  words.push(msgLen >>> 29);
  words.push((msgLen << 3) & 0x0ffffffff);

  let H0 = 0x67452301;
  let H1 = 0xefcdab89;
  let H2 = 0x98badcfe;
  let H3 = 0x10325476;
  let H4 = 0xc3d2e1f0;

  let W = new Array(80);
  let a, b, c, d, e, temp;

  for (let i = 0; i < words.length; i += 16) {
    for (let t = 0; t < 16; t++) {
      W[t] = words[i + t];
    }
    for (let t = 16; t < 80; t++) {
      W[t] = rotateLeft(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    a = H0;
    b = H1;
    c = H2;
    d = H3;
    e = H4;

    for (let t = 0; t < 80; t++) {
      if (t < 20) {
        temp =
          (rotateLeft(a, 5) + ((b & c) | (~b & d)) + e + W[t] + 0x5a827999) &
          0x0ffffffff;
      } else if (t < 40) {
        temp =
          (rotateLeft(a, 5) + (b ^ c ^ d) + e + W[t] + 0x6ed9eba1) &
          0x0ffffffff;
      } else if (t < 60) {
        temp =
          (rotateLeft(a, 5) +
            ((b & c) | (b & d) | (c & d)) +
            e +
            W[t] +
            0x8f1bbcdc) &
          0x0ffffffff;
      } else {
        temp =
          (rotateLeft(a, 5) + (b ^ c ^ d) + e + W[t] + 0xca62c1d6) &
          0x0ffffffff;
      }

      e = d;
      d = c;
      c = rotateLeft(b, 30);
      b = a;
      a = temp;
    }

    H0 = (H0 + a) & 0x0ffffffff;
    H1 = (H1 + b) & 0x0ffffffff;
    H2 = (H2 + c) & 0x0ffffffff;
    H3 = (H3 + d) & 0x0ffffffff;
    H4 = (H4 + e) & 0x0ffffffff;
  }

  return (
    toHexStr(H0) + toHexStr(H1) + toHexStr(H2) + toHexStr(H3) + toHexStr(H4)
  );
}

export async function generateRandomString(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  // Generate random string of the specified length
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  // Add a timestamp for uniqueness
  const timestamp = Date.now().toString(36); // Convert timestamp to base 36
  return result + timestamp; // Combine random string with timestamp
}
export const encrypt = (data, key) => {
  const ciphertext = CryptoJS.AES.encrypt(data, key).toString();
  return ciphertext;
};

export const decrypt = (ciphertext, key) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  const originalData = bytes.toString(CryptoJS.enc.Utf8);
  return originalData;
};
