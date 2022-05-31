/// <reference types="cypress" />
import { puppet } from '../support/puppeteer'
import { setupNewMetamaskAccount } from '../support/metamask'
const config = (on, config) => {
  on(
    'before:browser:launch',
    (browser = { name: '', isHeadless: true }, launchOptions) => {
      // if (browser.name === 'chrome' && browser.isHeadless) {
      //   launchOptions.args.push(
      //     '--start-fullscreen',
      //     '--disable-background-timer-throttling',
      //     '--disable-backgrounding-occluded-windows',
      //     '--disable-renderer-backgrounding'
      //   )
      //   launchOptions.extensions.push('./cypress/support/metamask/extension')
      //   return launchOptions
      // }
      // const currentPort = launchOptions.args.find(
      //   (arg) => arg.slice(0, 23) === '--remote-debugging-port'
      // ).split('=')[1]
      // puppet.setDebuggingPort(currentPort)
      // launchOptions.extensions.push('./cypress/support/metamask/extension')
      return launchOptions
    }
  )
  on('task', {
    async setupMetamask() {
      const pages = await puppet.initBrowser()
      await setupNewMetamaskAccount(pages)
      return null
    },
  })
}

export default config
