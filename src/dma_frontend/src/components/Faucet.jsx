import React, { useEffect, useState } from 'react'
import { dma_backend } from 'declarations/dma_backend'

function Faucet() {
  const [message, setMessage] = useState('')

  const handleClick = async () => {
    setMessage('Funding...')
    const result = await dma_backend.fundWallet()
    setMessage(result.toString())
  }

  useEffect(() => {
    let timeoutId
    if (message !== '') {
      timeoutId = setTimeout(() => {
        setMessage('')
      }, 3000)
    }

    // Cleanup function to clear the timeout when the component unmounts or before setting a new timeout
    return () => clearTimeout(timeoutId)
  }, [message])

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free DMA tokens here! Claim 10,000 DMA coins to your account.
      </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={message != ''}>
          {message ? message : 'Grab It!'}
        </button>
      </p>
    </div>
  )
}

export default Faucet
