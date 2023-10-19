import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: 0,
    isLoggedIn: false,
    userInfo: {}
  },
  reducers: {
    login: (state) => {
        state.isLoggedIn = true
    },
    logout: (state) => {
        state.isLoggedIn = false
    },
    setUserInfo: (state, action) => {
        state.userInfo = action.payload
    },
    setValue: (state, action) => {
        state.value = action.payload.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, setUserInfo, setValue } = authSlice.actions

export default authSlice.reducer