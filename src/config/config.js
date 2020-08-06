const config = {
  ARCHIVE_BASE_URL: process.env.NODE_ENV === 'production' ? 'https://wechat.megameta.cn/archives/' : '/api/',
  CONSUMER_BASE_URL: process.env.NODE_ENV === 'production' ? 'https://wechat.megameta.cn/archives/' : '/agent/',
}

export {
  config
}
