export const MintDiamonNFT = () => {
  return (
    <>
      <h2>Mint an NFT</h2>
      <p>
        Go to{' '}
        <a
          href="https://polygonscan.com/address/0x9a323979dD8AebC6ecc156d965C417D39Eb61a5B#writeContract"
          target="_blank"
          rel="noreferrer"
        >
          our diamond NFT smart contract
        </a>{' '}
        and mint yourself a Diamond NFT that will last forever.
      </p>
      <p>
        To mint yourself a unique diamond, pick a number of your choice and
        enter it in the “mint” function.
      </p>
      <p style={{ color: '#f55' }}>
        If the gas is too high, it means that diamond is already taken. Please
        try a new one!
      </p>
      <p>
        This will show up in your OpenSea shortly, which you can see here:{' '}
        <a href="https://opensea.io/account" target="_blank" rel="noreferrer">
          https://opensea.io/account
        </a>
      </p>
    </>
  )
}
