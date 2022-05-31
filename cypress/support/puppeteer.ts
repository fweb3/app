import fetch from 'node-fetch'
import puppeteer, { Page } from 'puppeteer-core'

export interface IBrowserPages {
  cypress: Page | null
  metamask: Page | null
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const puppet = Object.create({
  debuggingPort: '',
  setDebuggingPort(port: string) {
    this.debuggingPort = port
    return null
  },
  async initBrowser(): Promise<IBrowserPages> {
    await sleep(7000)
    const fetchedDebugRes = await fetch(
      `http://localhost:${this.debuggingPort}/json/version`
    )
    const { webSocketDebuggerUrl } = await fetchedDebugRes.json()
    const browser = await puppeteer.connect({
      browserWSEndpoint: webSocketDebuggerUrl,
      ignoreHTTPSErrors: true,
      defaultViewport: null,
    })
    await browser.isConnected()
    const pages = await browser.pages()
    const webPages = {
      cypress: null,
      metamask: null,
    }
    for (const page of pages) {
      if (page.url().includes('integration')) {
        webPages.cypress = page
      }
      if (page.url().includes('extension')) {
        webPages.metamask = page
      }
    }
    return webPages
  },
})

export { puppet }
