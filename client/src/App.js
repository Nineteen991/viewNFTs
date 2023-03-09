import { useEffect, useState, useContext } from 'react'

import NftCards from './components/NftCards'
import Modal from './components/Modal'
import { Context } from './Context'
import './App.sass'

export default function App() {
  const [address, setAddress] = useState('')
  const [showNFTs, setShowNFTs] = useState(false)
  const [chain, setChain] = useState('ETHEREUM')
  const { setNftBalances, openModal, setOpenModal } = useContext(Context)

  const fetchNFTs = () => {
    setShowNFTs(false)
    setShowNFTs(true)
  }

  useEffect(() => {
    console.log('on submit: ', chain)
    if (address) {
      fetch('http://localhost:5000/balances', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, chain })
      })
        .then(res => res.json())
        .then((data) => {
          console.log('da data: ', data)
          setNftBalances(data)
        })
        .catch(error => console.error('fetch error: ', error))
    }
  }, [address, chain])

  return (
    <div className='container'>
      {
        openModal 
          ? <Modal openModal={ openModal } setOpenModal={ setOpenModal } /> 
          : (
            <>
              <div className='get-address-div'>
                <h1 className='app-title'>Find Your NFTs Here</h1>
                <h3 className='app-desc'>
                  Simply add a wallet address, choose which blockchain, and Submit
                </h3>
                <input 
                  className='get-input' 
                  placeholder='Wallet Address' 
                  name='walletAddress'
                  onChange={ e => setAddress(e.target.value) }
                  value={ address }
                />
                <div className='btns'>
                    <select 
                      name="chain" 
                      id="get-chain" 
                      className="input-seletors"
                      value={ chain }
                      onChange={ e => setChain(e.target.value) }
                    >
                      <option value="ETHEREUM">ETHEREUM</option>
                      <option value="POLYGON">POLYGON</option>
                      <option value="BSC">BSC</option>
                      <option value="FANTOM">FANTOM</option>
                      <option value="AVALANCHE">AVALANCHE</option>
                    </select>
                    <button 
                      className='submit-btn btn'
                      onClick={ () => fetchNFTs() }
                    >
                      Show NFTs
                    </button>
                </div>
              </div>

              <div className='nft-card-div'>
                { 
                  showNFTs
                    ? <NftCards setOpenModal={ setOpenModal } />
                    : null
                }
              </div>
            </>
          )}
      
      
    </div>
  )
}