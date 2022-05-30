export const initializeMetamask = async () => {
  
}

// async initialSetup({ secretWords, network, password }) {
//     const isCustomNetwork =
//       process.env.NETWORK_NAME && process.env.RPC_URL && process.env.CHAIN_ID;

//     await puppeteer.init();
//     await puppeteer.assignWindows();
//     await puppeteer.metamaskWindow().waitForTimeout(1000);
//     await puppeteer.metamaskWindow().bringToFront()
//     if (
//       (await puppeteer.metamaskWindow().$(unlockPageElements.unlockPage)) ===
//       null
//     ) {
//       await module.exports.confirmWelcomePage();
//       await module.exports.importWallet(secretWords, password);
//       if (isCustomNetwork) {
//         await module.exports.addNetwork(network);
//       } else {
//         await module.exports.changeNetwork(network);
//       }
//       walletAddress = await module.exports.getWalletAddress();
//       await puppeteer.switchToCypressWindow();
//       return true;
//     } else {
//       await module.exports.unlock(password);
//       walletAddress = await module.exports.getWalletAddress();
//       await puppeteer.switchToCypressWindow();
//       return true;
//     }
//   },
