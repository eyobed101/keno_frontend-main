import React from 'react'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {background, newArray} from '../assets'
import { motion, useAnimationControls } from 'framer-motion'
import { duration } from '@mui/material';
import { Tube } from '../assets/Image';

function ShowSelectedNumber({buttonArray, setButtonArray})
{    
      const gameState = useSelector((state) => state.game)
      const luckyNumbers = useSelector((state) => state.luckyNumbers)
      const [selectedImg, setSelectedImg] = useState("")
      const [numPos, setNumPos] = useState(-1)
      const [initialPos, setInitialPos] = useState({ y:1080, opacity:1 })
      const [animate, setAnimate] = useState({y: -200})
      const controls = useAnimationControls()
      let myInterval = null;
      const animVariants = {
             initial: {
                y:1080,
                scale: 1,
                zIndex: 0,
                transition: {duration: 1}
             },
             move1: {
                 y:[1080, 500],
                 transition: {
                      duration: 0.5,
                      times: [0, 0.9]
                 }
             },
             move2: {
                  y:[500, -900],
                  transition: {
                       duration: 0.5,
                       times: [0, 0.9]
                  }
             },
             grow1: {
                 scale:[1, 3],
                 transition: {
                    duration: 1.5,
                    times: [0, 0.1]
                 }
             },
             grow2: {
                  scale:[3, 1],
                
                  transition: {
                        duration: 0.5,
                        times: [0, 0.1]
                     }

             },
             hover1: {
                  zIndex:300,
                  transition: {
                        duration: 0.5, 
                        // delay: 0.5, 
                  }
             },
             hover2: {
                  zIndex:50,
                  transition: {
                        duration: 0.5, 
                        // delay: 0.5, 
                  }
             }
      }
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
                        myInterval =  setTimeout(async () => {
                              setNumPos(numPos + 1)
                              setSelectedImg(newArray[0][luckyNumbers.randomNumber[numPos] - 1].default)
                              let btnArray = [...buttonArray]
                              let number = btnArray[luckyNumbers.randomNumber[numPos] - 1]
                              btnArray[luckyNumbers.randomNumber[numPos] - 1] = {clicked:true, num:number.num}
                              controls.start("move1").then(async() => {
                                    controls.start("grow1");
                                    controls.start("hover1");
                                    await new Promise(done => setTimeout(() => done(), 1500));
                                     controls.start("move2");
                                     controls.start("hover2");
                                     controls.start("grow2").then(() => {
                                          controls.set("initial");
                                     });

                                  
                              })
                              // console.log(number)
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
     
        
     return <div>
                  <img src={Tube} width='720' height='1080' style={{ position:'relative', right:'120px', zIndex:"70" }} />
                  <motion.img src={selectedImg} height="150px" width="150px" initial="initial" variants={animVariants} animate = {controls}
                  style={{ position:"absolute", right:"250px", zIndex:"0" }}/>
            </div>
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
        <div className="App" style={{ backgroundColor:'#b71310', width:"100vw", height:"100vh", overflow:'hidden', }}>
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
                           <ShowSelectedNumber buttonArray={buttonArray} setButtonArray={setButtonArray} />
                 </Col>
                </Row>
          </Container>
        </div>
  )
}