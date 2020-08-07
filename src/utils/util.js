import CryptoJS from "crypto-js";
import axios from 'axios';
import qs from 'qs';
import {config} from '../config/config';

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
    return CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(data),
      },
      Encrypt.secrect,
      Encrypt.config
    ).toString(CryptoJS.enc.Utf8);
  }
}

class Http {
  /* archive */
  static async archiveRequest({method, url, data}) {
    return await Http._request({
      baseUrl: config.ARCHIVE_BASE_URL,
      url,
      data,
      method
    })
  }
  /* consumer */
  static async consumerRequest({method, url, data}) {
    return await Http._request({
      baseUrl: config.CONSUMER_BASE_URL,
      url,
      data,
      method,
    })
  }
  /* 通用请求方法 */
  static async _request({baseUrl, url, method='POST', data={}}) {
    try {
      const res = await axios({
        url: `${baseUrl}${url}`,
        method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
      })
      return res
    } catch(err) {
      console.log('请求失败', err)
    }
  }
}

export {
  Http
};