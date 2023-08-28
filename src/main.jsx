import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage';
import  { BrowserRouter, Routes, Route, Router} from "react-router-dom";
import GamePage from './components/GamePage';
import GamePageLatest from './components/GamePageLatest';
import { Provider } from 'react-redux'
// import Keno from './components/keno-anim';


import store from './store'
// import './index.css'

function KenoUI() {
   return  (<BrowserRouter>
          <Routes>
                <Route index element={<Homepage/>}/>
                {/* <Route path='/game' element={<GamePage/>}/> */}
                <Route path='/game' element={<GamePageLatest/>}/>
                {/* <Route path='/Keno' element={<Keno/>}/> */}
          </Routes> 
      </BrowserRouter>);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <KenoUI/>
  </Provider>,
)
