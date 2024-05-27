import React, { useEffect, useState } from 'react'
import { AuthClient } from '@dfinity/auth-client'
import { canisterId, createActor } from 'declarations/dma_backend'

function Faucet({ userPrincipal }) {
  const [message, setMessage] = useState('')

  const handleClick = async () => {
    const authClient = await AuthClient.create()
    if (!(await authClient.isAuthenticated()))
      return alert('You need to be logged in first!')

    setMessage('Funding...')
    const identity = authClient.getIdentity()
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    })

    const result = await authenticatedCanister.fundWallet()
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

  const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
      let start = text.substring(0, startChars)
      let end = text.substring(text.length - endChars, text.length)
      while (start.length + end.length < maxLength) {
        start = start + '.'
      }
      return start + end
    }
    return text
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free DMA tokens here! Claim 10,000 DMA coins to your account{' '}
        {userPrincipal && userPrincipal.length > 10 && (
          <strong>{truncate(userPrincipal, 5, 3, 11)}</strong>
        )}
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
