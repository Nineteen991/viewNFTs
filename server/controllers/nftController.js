const { EvmChain } = require("@moralisweb3/common-evm-utils")
const Moralis = require('moralis').default
require('dotenv').config()
const api = process.env.MORALIS_API_KEY

const nftController = async (req, res) => {
  let { address, chain } = req.body

  console.log('da address22: ', chain)
  if (chain === 'POLYGON') {
    chain = EvmChain.POLYGON
  } else if (chain === 'ETHEREUM') {
    chain = EvmChain.ETHEREUM
  } else if (chain === 'BSC') {
    chain = EvmChain.BSC
  } else if (chain === 'FANTOM') {
    chain = EvmChain.FANTOM
  } else if (chain === 'AVALANCHE') {
    chain = EvmChain.AVALANCHE
  } else {
    chain = EvmChain.ETHEREUM
  }

  try {
    const [nfts] = await Promise.all([
      Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
      })
    ]);
    res.status(200).json({
      address,
      nfts
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
}

module.exports = nftController