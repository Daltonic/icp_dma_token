import { useState } from 'react'
import { dma_backend } from 'declarations/dma_backend'
import Balance from './components/Balance'
import Faucet from './components/Faucet'
import Transfer from './components/Transfer'
import Header from './components/Header'

function App() {
  return (
    <div id="screen">
      <Header />
      <Faucet />
      <Balance />
      <Transfer />
    </div>
  )
}

export default App
