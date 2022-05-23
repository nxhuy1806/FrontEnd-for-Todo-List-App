import { createSlice } from '@reduxjs/toolkit'
import jsCookie from 'js-cookie';
export const loggedSlice = createSlice({
    name: 'logged',
    initialState: {
        value: jsCookie.get('accessToken') !== undefined
    },
    reducers: {
        setTrue: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = true
        },
        setFalse: state => {
            state.value = false
        },
    }
})

// Action creators are generated for each case reducer function
export const { setFalse, setTrue } = loggedSlice.actions

export default loggedSlice.reducer