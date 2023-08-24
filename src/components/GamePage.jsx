import React from 'react'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {background} from '../assets'
import { motion, useAnimationControls } from 'framer-motion'
import { duration } from '@mui/material';
import { Tube } from '../assets/Image';
// import '../assets/ball.css';

function ShowSelectedNumber({buttonArray, setButtonArray})
{    
     
     return 
}
export default function GamePage() {
    const NUMBER_LIMIT = 80
    let [buttonArray, setButtonArray] = useState([{clicked:false, num:-1}])
    let [randomNumber, setRandomNumber] = useState([])
    const gameState = useSelector((state) => state.game)
    const luckyNumbers = useSelector((state) => state.luckyNumbers)
    const [numPos, setNumPos] = useState(-1)
    const [selectedNum, setSelectedNum] = useState(0)
    const elementRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rectangleId, setRectangleId] = useState('')
    const [rectangle_x, setRectangleX] = useState(0)
//     var rectangle_x = 0;
   const [rectangle_y, setRectangleY] = useState(0)

   const [circle_x, setCircleX] = useState(0)
   const [circle_y, setCircleY] = useState(0)
   const animVariants = {
        
   }

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
                      myInterval =  setTimeout(async () => {
                              setNumPos(numPos + 1)
                              let btnArray = [...buttonArray]
                        //     setSelectedNum(luckyNumbers.randomNumber[numPos])
                              let number = btnArray[luckyNumbers.randomNumber[numPos] - 1]
                              setRectangleId(number.num)
                              btnArray[luckyNumbers.randomNumber[numPos] - 1] = {clicked:true, num:number.num}
                              // console.log(number)
                            setButtonArray(btnArray)
                       }, 2950) 
                      
                 } else {
                      //  setNumPos(-1)
                      clearInterval(myInterval);
                 }
         }
         else {
            setNumPos(-1)
         }
      //    setShowAnimation(false)
        
    }, [numPos, gameState.gameStarted, elementRef])
    useEffect(() => {
     
      function handleResize() {
        const x = elementRef.current.offsetLeft;
        const y = elementRef.current.offsetTop;
        setPosition({ x, y });
      }
      function getOffset(el) {
            if(gameState.gameStarted) {
                  const rect = el.getBoundingClientRect();
                  return {
                    left: rect.left + window.scrollX,
                    top: rect.top + window.scrollY,
                  };
            }
           return {
              left: 0,
              top: 0
           }
      }
      console.log(rectangleId)
      setRectangleX(getOffset(document.getElementById(rectangleId)).left);
      setRectangleY(getOffset(document.getElementById(rectangleId)).top);
      console.log(rectangle_x, rectangle_y);
      var circleId = 'circle';
    
     
      setCircleX(getOffset(document.getElementById(circleId)).left);
      setCircleY( getOffset(document.getElementById(circleId)).top)
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }, [rectangleId, elementRef]);
    document.documentElement.style.setProperty(
      '--mouse-x',
       rectangle_x + 'px'
    );
    document.documentElement.style.setProperty(
      '--mouse-y',
      rectangle_y + 'px'
    );
    useEffect(() => {
        setButtonArray([])
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
          <Row className='justify-content-center'>
              <Col lg={12} style={{ marginTop:"50px" }}>
                    <div  ref={elementRef}>
                    {
                          buttonArray.map((btn, idx) => {
                                  if((btn.num % 10)  == 1)
                                  {
                                        return <> 
                                          <br/> <Button className="btn rectangle" style={{ width:"120px", height:"100px", borderStyle:'none', borderRadius:"15px", backgroundColor: btn.clicked ? "yellow" : "#C84949", marginLeft:"5px", marginTop:"5px", fontWeight:'bolder', color: btn.clicked ? 'black' : "white", fontSize:"26px"}} id={btn.num}>{ btn.num }</Button>
                                        </> 
                                  }
                                  return (
                                      <Button className="btn rectangle" style={{ width:"120px", height:"100px", borderStyle:'none', borderRadius:"15px", backgroundColor: btn.clicked ? "yellow" : "#C84949", marginLeft:"5px", marginTop:"5px",fontWeight:'bolder', color: btn.clicked ? 'black' : "white", fontSize:"26px"}} id={btn.num}>{ btn.num }</Button>
                                    //   <Button className="btn rectangle" style={{ width:"90px", height:"90px", borderStyle:'none', borderRadius:"15px", backgroundColor: "#C84949", marginLeft:"5px", marginTop:"5px", color: "white", fontSize:"26px"}} id={btn.num}>{ btn.num }</Button>
                                  )
                          })
                    }
                     {
                         gameState.gameStarted ?  <div id="circle">
                         <p>
                               {rectangleId}
                         </p>
                      </div> : <></>
                  }
                    </div>
                 </Col>
                </Row>
          </Container>
        </div>
  )
}