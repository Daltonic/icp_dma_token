import React, { useEffect, useState } from 'react'
import { dma_backend } from 'declarations/dma_backend'
import { AuthClient } from '@dfinity/auth-client'

function Header({ authed }) {
  const [name, setName] = useState('')

  const onLogout = async () => {
    const authClient = await AuthClient.create()
    await authClient.logout()
    window.location.reload()
  }

  const onLogin = async () => {
    const authClient = await AuthClient.create()
    await authClient.login({
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      onSuccess: async () => {
        console.log('Successfully logged in')
        window.location.reload()
      },
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const name = await dma_backend.getName()
      setName(name)
    }

    fetchData()
  }, [])
  return (
    <header>
      <div className="blue window" id="logo">
        <h1>
          <span role="img" aria-label="tap emoji">
            💎
          </span>
          {name}
        </h1>
        {!authed ? (
          <button onClick={onLogin}>Login</button>
        ) : (
          <button onClick={onLogout}>Logout</button>
        )}
      </div>
    </header>
  )
}

export default Header
