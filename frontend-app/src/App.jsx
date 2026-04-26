import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import { Layout } from './components/Layout/Layout'
import { setTokenGetter } from './services/authToken'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import Spinner from './components/Ui/Spinner'

import { DeleteAccountHandler } from './components/auth/DeleteAccountHandler'

function App() {

  const { getToken, isLoaded } = useAuth()

  useEffect(() => {
    setTokenGetter(getToken)
  }, [])

  if (!isLoaded) {
    return <Spinner />
  }

  return (
    <BrowserRouter>

   
      <Layout>
        <AppRouter />
      </Layout>

    </BrowserRouter>
  )
}

export default App