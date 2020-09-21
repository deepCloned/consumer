import request from '@/utils/request'
import Encrypt from '@/utils/encrypt'

export default async function baseRequest({ url, method, data = {}}) {
  const requestConfig = {
    url: 'api/' + url,
    method
  }
  if (method === 'post') {
    requestConfig.data = data
  } else if (method === 'get') {
    requestConfig.params = data
  }
  const res = await request(requestConfig)
  console.log(res)
  if (res.rspCode === '0000') {
    res.data = Encrypt.decryptByDes(JSON.parse(res.data))
    return JSON.parse(res.data)
  }
}
