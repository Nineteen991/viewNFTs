export default function Modal({ openModal, setOpenModal }) {
  const cards = 
    <div className='nft-card' >
      <div className='nft-details'>{ 
          Object.entries(openModal).map(([key, value], index) => (
            <p key={index}>
              {key}: <span className="value-span">{value}</span>
            </p>
          )) 
        }
        <button className="btn opensea-link">
          <a 
            href={`https://opensea.io/assets?search[query]=${openModal.token_address}`}
            className='opensea-link'
          >
            View at OpenSea.io
          </a>
        </button>
      </div>
    </div>
  
  return (
    openModal
      ? (
        <div className="modal">
          <div 
            className="modal-shadow" 
            onClick={ () => setOpenModal(null) }
          >
          </div>

          { cards }

        </div>
      )
      : null
  )
}