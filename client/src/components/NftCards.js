import { useContext } from 'react'

import { Context } from '../Context'

export default function NftCards({ setOpenModal }) {
  const { nftBalances } = useContext(Context)

  const cards = nftBalances.nfts.result.map((nft, index) => (
    <div className='nft-card' key={ index } onClick={ () => setOpenModal(nft) }>
      <h3 className='nft-name'>{ nft.name }</h3>
    </div>
  ))

  return (
    <>
      {cards}
    </>
  )
}