import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import { Layout } from './components/Layout/Layout'
import { setTokenGetter } from './services/authToken'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import Spinner from './components/Ui/Spinner'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />


    </BrowserRouter>
  )
}

export default App