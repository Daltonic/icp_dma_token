import React, { useEffect, useState } from 'react'
import { canisterId, createActor } from 'declarations/dma_backend'
import { Principal } from '@dfinity/principal'
import { AuthClient } from '@dfinity/auth-client'

function Transfer() {
  const [account, setAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleClick = async () => {
    if (!account || !amount || amount < 1) return
    const authClient = await AuthClient.create()
    if (!(await authClient.isAuthenticated()))
      return alert('You need to be logged in first!')

    setMessage('Transfering...')

    const identity = authClient.getIdentity()
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    })

    const principal = Principal.fromText(account)
    const result = await authenticatedCanister.transfer(
      principal,
      Number(amount)
    )
    setMessage(result.toString())

    setAccount('')
    setAmount('')
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
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button
            id="btn-transfer"
            onClick={handleClick}
            disabled={message != ''}
          >
            {message ? message : 'Transfer'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Transfer
