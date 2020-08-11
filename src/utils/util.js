import CryptoJS from "crypto-js";
import axios from "axios";
import qs from "qs";
import { config } from "../config/config";
import md5 from "blueimp-md5";

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
  static successCode = "0000";
  /* archive */
  static async archiveRequest({ method, url, data = {} }) {
    const requestData = JSON.stringify(data);
    const stmb = Date.now();
    const token = localStorage.getItem("token");
    const signData = `data=${encodeURIComponent(requestData)}&stmb=${stmb}`;
    const obj = {
      data: requestData,
      sign: md5(signData).toUpperCase(),
      stmb,
      token,
    };
    return await Http._request({
      baseUrl: config.ARCHIVE_BASE_URL,
      url,
      reqData: obj,
      method,
    });
  }
  /* consumer */
  static async consumerRequest({ method, url, data = {} }) {
    let requestData = JSON.stringify(data);
    const stmb = Date.now();
    const token = localStorage.getItem("token");
    let signData = encodeURIComponent(requestData);
    /**
     * 正则替换括号
     */
    const leftBracketReg = /\(+/g;
    const rightBracketReg = /\)+/g;
    signData = signData.replace(leftBracketReg, "%28");
    signData = signData.replace(rightBracketReg, "%29");
    requestData = Encrypt.encryptByDES(requestData);
    const sign = `data=${signData}&stmb=${stmb}`;
    const obj = {
      data: requestData,
      sign: md5(sign).toUpperCase(),
      stmb,
      token,
    };
    return await Http._request({
      baseUrl: config.CONSUMER_BASE_URL,
      url,
      reqData: obj,
      method,
    });
  }
  /* 通用请求方法 */
  static async _request({ baseUrl, url, method = "POST", reqData }) {
    try {
      const res = await axios({
        url: `${baseUrl}${url}`,
        method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(reqData),
      });
      const { data } = res;
      if (data.rspCode === Http.successCode) {
        /**
         * 如果请求的是 archives 的接口，返回数据需要解密
         */
        if (res.config.url.indexOf("agent") > 0) {
          return JSON.parse(Encrypt.decryptByDES(data.data));
        }
        return data.data;
      }
    } catch (err) {
      console.log("请求失败", err);
    }
  }
}

export { Http };
