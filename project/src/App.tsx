import { createContext, Dispatch, useReducer } from 'react'
import './App.css'
import User from './type/User'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { Provider } from 'react-redux'
import store from './store/store'
import { Box } from '@mui/system'


import { backgroundStyle } from './style/style'
import { userContxtType, userReducer } from './type/UserActionType'

export const UserContext = createContext<userContxtType>([{} as User, () => { }])


function App() {
  const [user, userDispatch] = useReducer(userReducer, {} as User)
  return (
    <>
      <Box sx={backgroundStyle}>

        <UserContext value={[user, userDispatch]}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </UserContext>
        
      </Box>
    </>
  )
}

export default App
