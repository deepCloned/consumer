import CryptoJS from "crypto-js";

class Encrypt {
  static secrect = CryptoJS.enc.Utf8.parse("5RkLWI/aWIU+wumb1UmR/eUZ");
  static config = {
    iv: CryptoJS.enc.Utf8.parse("01234567"),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };
  /**
   * 加密
   * @param data 需要加密的数据
   */
  static encryptByDES(data) {
    return CryptoJS.TripleDES.encrypt(
      data,
      Encrypt.secrect,
      Encrypt.config
    ).toString();
  }

  /**
   * 解密
   * @param data 需要解密的数据
   */
  static decryptByDES(data) {
    return CryptoJS.TripleDES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(data),
      },
      Encrypt.secrect,
      Encrypt.config
    ).toString(CryptoJS.enc.Utf8);
  }
}

class Http {
  static request() {}
}

export { Http };
