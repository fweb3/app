import fetch from 'node-fetch'
import AdmZip from 'adm-zip'
import fs from 'fs-extra'

const METAMASK_EXTENSION_BASE =
  'https://api.github.com/repos/metamask/metamask-extension/releases'

const DOWNLOAD_PATH = './cypress/support/metamask'

export const checkAndDownloadMetamask = async (): Promise<string> => {
  const metamaskPath = `${DOWNLOAD_PATH}/extension/metamask-extension.zip`
  if (!fs.existsSync(metamaskPath)) {
    await fetchMetamask()
    return metamaskPath
  }
  return metamaskPath
}

const fetchMetamask = async () => {
  try {
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

    writer.close(() => {
      const zip = new AdmZip(zipFile)
      zip.extractAllTo(`${DOWNLOAD_PATH}/extension`, true)
    })
  } catch (error) {
    console.error(error)
  }
}
