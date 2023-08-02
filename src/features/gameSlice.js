import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      gameStarted:false,
}
export const gameSlice = createSlice({
     name:'gameStatus',
     initialState,
     reducers: {
          startGame: (state) => {
               state.gameStarted = true
          },
          stopGame: (state) => {
              state.gameStarted = false
          }
     }
})

export const { startGame, stopGame } = gameSlice.actions

export default gameSlice.reducer