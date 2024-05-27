import Balance from './components/Balance'
import Faucet from './components/Faucet'
import Transfer from './components/Transfer'
import Header from './components/Header'
import { AuthClient } from '@dfinity/auth-client'
import { useEffect, useState } from 'react'

const App = () => {
  const [account, setAccount] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const authClient = await AuthClient.create()
    handleAuthenticated(authClient)
  }

  const handleAuthenticated = async (authClient) => {
    const identity = await authClient.getIdentity()
    const userPrincipal = await identity.getPrincipal().toString()
    setAccount(userPrincipal)
    console.log(userPrincipal)
  }

  return (
    <div id="screen">
      <Header authed={account != '' && account.length > 10} />
      <Faucet userPrincipal={account} />
      <Balance />
      <Transfer />
    </div>
  )
}

export default App
