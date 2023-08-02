import React from 'react'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {background, newArray} from '../assets'

function ShowSelectedNumber({buttonArray, setButtonArray})
{    
      const gameState = useSelector((state) => state.game)
      const luckyNumbers = useSelector((state) => state.luckyNumbers)
      const [selectedImg, setSelectedImg] = useState("")
      const [numPos, setNumPos] = useState(-1)
      let myInterval = null;
      const renewButton = () => {
            // setButtonArray([{clicked:false, num:-1}])
            // for(let i = 1; i <= 80; i++) 
            // {
            //        setButtonArray(b => [...b, {clicked:false, num:i}])
            // }
            let newButtonArray = buttonArray.map((number, idx) => {
                     return { clicked:false, num:number.num }        
            })
            setButtonArray(newButtonArray)
      }

      useEffect(() => {
            console.log(numPos)
            console.log( luckyNumbers.randomNumber.length)
            if(gameState.gameStarted) {
                   if(numPos === -1) {
                        renewButton()
                        setNumPos(numPos + 1)
                        console.log("the numPos inside ", numPos)
                   }
                   if((numPos < 20) && (numPos >= -1)) {
                        myInterval =  setTimeout(() => {
                              setNumPos(numPos + 1)
                              setSelectedImg(newArray[0][luckyNumbers.randomNumber[numPos] - 1].default)
                              let btnArray = [...buttonArray]
                              let number = btnArray[luckyNumbers.randomNumber[numPos] - 1]
                              console.log(number)
                              btnArray[luckyNumbers.randomNumber[numPos] - 1] = {clicked:true, num:number.num}
                              setButtonArray(btnArray)
                         }, 3000)  
                   } else {
                        //  setNumPos(-1)
                        clearInterval(myInterval);
                   }
           }
           else {
              setNumPos(-1)
           }
      }, [numPos, gameState.gameStarted])
     
        
    return <img src={selectedImg} height="300px" width="300px" style={{ position:"relative",  top:"300px", left:"50px" }}/> 
        
}
export default function GamePage() {
    const NUMBER_LIMIT = 80
    let [buttonArray, setButtonArray] = useState([{clicked:false, num:-1}])
    let [randomNumber, setRandomNumber] = useState([])
    const gameState = useSelector((state) => state.game)
    const luckyNumbers = useSelector((state) => state.luckyNumbers)
    
    useEffect(() => {
        setButtonArray([])
        console.log(newArray)
        const generateNumber = () => {
              for(let i = 1; i <= NUMBER_LIMIT; i++) 
              {
                     setButtonArray(b => [...b, {clicked:false, num:i}])
              }
        }
        generateNumber()
    }, [])
    return (
        <div className="App" style={{ backgroundImage:  `url(${background})`, width:"100vw", height:"100vh" }}>
          <Container>
          <Row>
              <Col lg={10} style={{ marginTop:"100px" }}>
                    <div>
                    {
                          buttonArray.map((btn, idx) => {
                                  if((btn.num % 10)  == 1)
                                  {
                                        return <> 
                                          <br/>  <Button  style={{ width:"90px", borderStyle:'none', backgroundColor: btn.clicked ? "yellow" : "#C84949", height:"90px", borderRadius:"15px", color: btn.clicked ? 'black' : "white", fontSize:"26px" }} className="btn btn-primary" >{ btn.num }</Button>
                                        </> 
                                  }
                                  return (
                                      <Button className="btn" style={{ width:"90px", height:"90px", borderStyle:'none', borderRadius:"15px", backgroundColor: btn.clicked ? "yellow" : "#C84949", marginLeft:"5px", marginTop:"5px", color: btn.clicked ? 'black' : "white", fontSize:"26px"}} >{ btn.num }</Button>
                                      
                                  )
                          })
                    }
                    </div>
                 </Col>
                 <Col lg={2} >
                      {/* <div style={{ width:"300px", height:"300px", borderRadius:"150px", backgroundImage:"linear-gradient(123deg, rgb(239, 225, 24), rgb(130, 35, 35), rgb(200, 73, 73))", marginTop:"250px" }}>
                           <h4 style={{ position:"relative",  top:"110px", left:"110px", fontSize:"70px", color:"white"}}> 30 </h4>
                      </div> */}
                           <ShowSelectedNumber buttonArray={buttonArray} setButtonArray={setButtonArray} />
                    
                 </Col>
                </Row>
          </Container>
        </div>
  )
}
