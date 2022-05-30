import fetch from 'node-fetch'
import fs from 'fs-extra'
import AdmZip from 'adm-zip'

const METAMASK_EXTENSION_BASE =
  'https://api.github.com/repos/metamask/metamask-extension/releases'

const DOWNLOAD_PATH = './scripts'

;(async () => {
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
      zip.extractAllTo(`${DOWNLOAD_PATH}/metamask-extension`, true)
    })
  } catch (error) {
    console.error(error)
  }
})()
