import { IBrowserPages } from '../puppeteer'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const SEED =
  'shoot patch inherit vacuum follow cool worry gallery fan flip picnic card'
const PASSWORD = 'password'
export const setupNewMetamaskAccount = async (pages: IBrowserPages) => {
  await pages.metamask.bringToFront()
  const getStartedBtn = await pages.metamask.waitForSelector(
    '.first-time-flow__button',
    { visible: true }
  )
  await getStartedBtn.click()
  await sleep(1000)
  const importBtn = await pages.metamask.$x(
    "//button[contains(., 'Import wallet')]"
  )
  await importBtn[0].click()
  const noThanksBtn = await pages.metamask.$x(
    "//button[contains(., 'No Thanks')]"
  )
  await noThanksBtn[0].click()
  await sleep(1000)
  const seedArr = SEED.split(' ')
  // for (const seed of seedArr) {
  //   const idx = seedArr.indexOf(seed)
  //   const input = `#import-srp__srp-word-${idx}`
  //   await pages.metamask.$eval(input, (el: any) => (el.value = seed))
  //   await sleep(500)
  // }
  await sleep(200)
  await pages.metamask.$eval(
    '#import-srp__srp-word-0',
    (el: any) => (el.value = seedArr[0])
  )
  await pages.metamask.$eval(
    '#import-srp__srp-word-1',
    (el: any) => (el.value = seedArr[1])
  )

  await pages.metamask.$eval(
    '#import-srp__srp-word-2',
    (el: any) => (el.value = seedArr[2])
  )

  await pages.metamask.$eval(
    '#import-srp__srp-word-3',
    (el: any) => (el.value = seedArr[3])
  )

  await pages.metamask.$eval(
    '#import-srp__srp-word-4',
    (el: any) => (el.value = seedArr[4])
  )

  await pages.metamask.$eval(
    '#import-srp__srp-word-5',
    (el: any) => (el.value = seedArr[5])
  )

  await pages.metamask.$eval(
    '#import-srp__srp-word-6',
    (el: any) => (el.value = seedArr[6])
  )

  await pages.metamask.$eval(
    '#import-srp__srp-word-7',
    (el: any) => (el.value = seedArr[7])
  )

  await pages.metamask.$eval(
    '#import-srp__srp-word-8',
    (el: any) => (el.value = seedArr[8])
  )

  await pages.metamask.$eval(
    '#import-srp__srp-word-9',
    (el: any) => (el.value = seedArr[9])
  )

  await pages.metamask.$eval(
    '#import-srp__srp-word-10',
    (el: any) => (el.value = seedArr[10])
  )

  await pages.metamask.$eval(
    '#import-srp__srp-word-11',
    (el: any) => (el.value = seedArr[11])
  )

  // await pages.metamask.$eval('#password', (el: any) => (el.value = PASSWORD))
  // await pages.metamask.$eval(
  //   '#confirm-password',
  //   (el: any) => (el.value = PASSWORD)
  // )
  // const checkbox = await pages.metamask.$('#create-new-vault__terms-checkbox')
  // await checkbox.click()
  // await pages.metamask.$x("//button[contains(., 'Import')]")[0].click()

  return
}
