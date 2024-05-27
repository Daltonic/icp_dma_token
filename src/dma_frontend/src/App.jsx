import Balance from './components/Balance'
import Faucet from './components/Faucet'
import Transfer from './components/Transfer'
import Header from './components/Header'
import { AuthClient } from '@dfinity/auth-client'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const authClient = await AuthClient.create()

    if (await authClient.isAuthenticated()) {
      console.log('User authenticated')
    } else {
      authClient.login({
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        onSuccess: async () => {
          handleAuthenticated(authClient)
        },
      })
    }
  }

  const handleAuthenticated = async (authClient) => {
    console.log('Logged in successfully!')
  }

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
