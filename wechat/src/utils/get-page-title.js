import defaultSettings from '@/settings'

const title = defaultSettings.title || '企业微信管理平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
