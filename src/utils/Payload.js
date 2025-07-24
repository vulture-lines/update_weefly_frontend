// cryptoHelper.js
import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("12345678901234567890123456789012"); // 32-byte key
const iv = CryptoJS.enc.Utf8.parse("1234567890123456"); // 16-byte IV

export const encryptPayload = (data) => {
  const stringData = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(stringData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString(); // Base64 string
};

export const decryptPayload = (cipherText) => {
  const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedText);
};
