import { createSlice } from "@reduxjs/toolkit"

const initialState = {
     randomNumber:[]
}

export const numberSlice = createSlice({
      name:'luckyNumbers',
      initialState,
      reducers: {
           populateLuckyNumber: (state, action) => {
                      state.randomNumber = action.payload
           },
           cleanLuckyNumbers: (state) => {
             state.randomNumber = []
           }
      }
})

export const { populateLuckyNumber, cleanLuckyNumbers } = numberSlice.actions

export default numberSlice.reducer