import CryptoJS from 'crypto-js'

class Encrypt {
 // 秘钥
 static key = '5RkLWI/aWIU+wumb1UmR/eUZC1iP2liF'
 // 加密
 static encryptByDes(data) {
   const keyHex = CryptoJS.enc.Utf8.parse(Encrypt.key)
   const encryptData = CryptoJS.TripleDES.encrypt(data, keyHex, {
     iv: CryptoJS.enc.Utf8.parse('01234567'),
     mode: CryptoJS.mode.CBC,
     padding: CryptoJS.pad.Pkcs7
   })
   return encryptData.toString()
 }
 // 解密
 static decryptByDes(data) {
   const keyHex = CryptoJS.enc.Utf8.parse(Encrypt.key)
   const decryptData = CryptoJS.TripleDES.decrypt({
     ciphertext: CryptoJS.enc.Base64.parse(data)
   }, keyHex, {
     iv: CryptoJS.enc.Utf8.parse('01234567'),
     mode: CryptoJS.mode.CBC,
     padding: CryptoJS.pad.Pkcs7
   })
   return decryptData.toString(CryptoJS.enc.Utf8)
 }
}

export default Encrypt
