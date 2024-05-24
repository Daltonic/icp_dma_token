import React, { useState } from 'react'
import { dma_backend } from 'declarations/dma_backend'
import { Principal } from '@dfinity/principal'

function Balance() {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [symbol, setSymbol] = useState('')

  const handleClick = async () => {
    const principal = Principal.fromText(account)
    const result = await dma_backend.balanceOf(principal)
    const symbol = await dma_backend.getSymbol()

    setBalance(result.toLocaleString())
    setSymbol(symbol)
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button id="btn-request-balance" onClick={handleClick}>
          Check Balance
        </button>
      </p>
      {balance && (
        <p>This account has a balance of {balance + ' ' + symbol}.</p>
      )}
    </div>
  )
}

export default Balance
