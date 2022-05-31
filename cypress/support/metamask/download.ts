import fetch from 'node-fetch'
import AdmZip from 'adm-zip'
import fs from 'fs-extra'

const METAMASK_EXTENSION_BASE =
  'https://api.github.com/repos/metamask/metamask-extension/releases'

const DOWNLOAD_PATH = './cypress/support/metamask/extension'

export const checkAndDownloadMetamask = async (): Promise<string> => {
  if (!fs.existsSync(DOWNLOAD_PATH)) {
    console.log('[-] cant find metamask in path')
    await fetchMetamask()
    return DOWNLOAD_PATH
  }
  return DOWNLOAD_PATH
}

const fetchMetamask = async () => {
  try {
    console.log('[+] fetching metamask')
    if (!fs.existsSync(DOWNLOAD_PATH)) {
      fs.mkdirSync(DOWNLOAD_PATH)
    }
    const res = await fetch(`${METAMASK_EXTENSION_BASE}/latest`)
    const json = await res.json()
    const downloadUrl = json.assets[0].browser_download_url
    const filename = json.assets[0].name
    const streamRes = await fetch(downloadUrl)

    const writer = fs.createWriteStream(`${DOWNLOAD_PATH}/${filename}`)

    for await (const chunk of streamRes.body) {
      writer.write(chunk)
    }

    const zipFile = `${DOWNLOAD_PATH}/${filename}`

    return writer.close(async () => {
      const zip = new AdmZip(zipFile)
      return zip.extractAllTo(`${DOWNLOAD_PATH}`, true)
    })
  } catch (error) {
    console.error(error)
  }
}
