import axios from "axios";
import qs from "qs";
import md5 from "blueimp-md5";
import { config } from "../config/config";
import { Http } from "../utils/util";

class Auth {
  static successRspCode = "0000";
  static successResultCode = "00";
  /* 登录 */
  static async getLogin(data) {
    const { userName, userPwd } = data;
    const requestData = {
      data: JSON.stringify({
        userName,
        userPwd: md5(userPwd),
      }),
    };
    try {
      const res = await axios({
        url: `${config.ARCHIVE_BASE_URL}system/userLogin`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(requestData),
      });
      const { data } = res;
      if (data.rspCode === Auth.successRspCode) {
        return data.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  /* 获取左侧菜单栏 */
  static async getUserModel() {
    return await Http.archiveRequest({
      url: `user/queryUserModel`,
    });
  }
}

export { Auth };
