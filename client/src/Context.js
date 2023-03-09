import { createContext, useState } from 'react'

const Context = createContext()

function ContextProvider ({ children }) {
  const [openModal, setOpenModal] = useState(null)
  const [nftBalances, setNftBalances] = useState(null)

  return (
    <Context.Provider value={{
      openModal,
      setOpenModal,
      nftBalances,
      setNftBalances
    }}>
      { children }
    </Context.Provider>
  )
}

export { Context, ContextProvider }