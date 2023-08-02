import { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import {v4 as uuid} from 'uuid'
import { Navbar } from './components/Navbar'


// import './App.css'

function App() {
  const NUMBER_LIMIT = 80
  const [count, setCount] = useState(0)
  let [buttonArray, setButtonArray] = useState([{clicked:false, num:-1}])
  const [ticketArray, setTicketArray] = useState([])
  const [numberCount, setNumberCount] = useState(0)
  const [moneySelected, setMoneySelcted] = useState(0)
  const [gameMinutes, setGameMinutes] = useState(1)
  const [gameSeconds, setGameSeconds] = useState(0)
  const [ticketMinutes, setTicketMinutes] = useState(0)
  const [ticketStarted, setTicketStarted] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [ticketSeconds, setTicketSeconds] = useState(30)

  const [ticket, setTicket] = useState({
        id:'',
        numbers:[],
        money:0
  })
  const moneyArray = [20, 50, 80]
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
  useEffect(() => { 
    let gameInterval = setInterval(() => {
      if(gameStarted) {
        if(gameSeconds > 0) {
          setGameSeconds(gameSeconds - 1)
           
      }
      if (gameSeconds === 0) {
            if(gameMinutes === 0) {
                  clearInterval(gameInterval)
                  setTicketStarted(true)
                  setGameSeconds(0)
                  setGameMinutes(1)
                  setGameStarted(false)
                //  setInterval(ticketInterval, 1000)
            } else {
                setGameMinutes(gameMinutes - 1)
                setGameSeconds(59)
            }
      }
      }
   
     }, 1000)
     return () => {
         clearInterval(gameInterval)
       };
  }, [gameSeconds, gameStarted])
  useEffect(() => {
    
  let ticketInterval = setInterval(() => {
          if(ticketStarted) {
            if(ticketSeconds > 0) {
              setTicketSeconds(ticketSeconds - 1)
            }
        if (ticketSeconds === 0) {
              if(ticketMinutes === 0) {
                    clearInterval(ticketInterval)
                    setGameStarted(true)
                    setTicketMinutes(0)
                    setTicketSeconds(30)
                    setTicketStarted(false)
                  //  setInterval(gameInterval, 1000)
              } else {
                  setTicketMinutes(ticketMinutes - 1)
                  setTicketSeconds(59)
              }
        }
    }
   
  }, 1000)
         setInterval(ticketInterval, 1000)
         return () => {
              clearInterval(ticketInterval)
         };
  }, [ticketStarted, ticketSeconds]);
  const setClickedButton = (number, idx) => {
         let newArray = [...buttonArray]
       
          setButtonArray(newArray)
            if(!number.clicked) { 
                if(numberCount < 5) {
                  newArray[idx] = {clicked:!number.clicked, num:number.num}
                 ticket.numbers.push(number.num)
                  let num = numberCount + 1
                  setNumberCount(num)
                } else {
                   alert("maximum ammount of numbers reached")
                }
                  
            } else {
              newArray[idx] = {clicked:!number.clicked, num:number.num}
                let filteredNum = ticket.numbers.filter(mnum => mnum !== number.num)
                 let num = numberCount - 1
                setNumberCount(num)
                ticket.numbers = filteredNum
            }
         
        //  console.log(ticket)
  }
  const setMoney = (money, idx) => {
           setMoneySelcted(money)
           console.log(ticket.money)
  }
  const generateTicket = () => {
        if(moneySelected === 0) {
             alert(" please insert money ")
             return 
        }
        let uid = uuid()
        ticket.id = uid
        ticket.money = moneySelected
        ticketArray.push(ticket)
        let tickets = {
           id:'',
          numbers:[],
          money:0
        }
        setTicket(tickets)
        setButtonArray([])
        setNumberCount(0)
        setMoneySelcted(0)
      const generateNumber = () => {
            for(let i = 1; i <= NUMBER_LIMIT; i++) 
            {
                   setButtonArray(b => [...b, {clicked:false, num:i}])
            }
      }
      generateNumber()
      console.log(ticketArray)
  }
  return (
    <div className="App">
      <Navbar />
      <Container>
        
      <Row>
          <Col lg={8}>
                <div>
                {
                      buttonArray.map((btn, idx) => {
                              if((btn.num % 10)  == 1)
                              {
                                    return <> 
                                      <br/>  <Button  style={{ width:"60px", backgroundColor: btn.clicked ? "yellow" : "#C84949", height:"60px", borderRadius:"30px", color: btn.clicked ? 'black' : "white" }} className="btn btn-primary"  onClick={(e) => { setClickedButton(btn, idx) }}>{ btn.num }</Button>
                                    </> 
                              }
                              return (
                                  <Button className="btn" style={{ width:"60px", height:"60px", borderRadius:"30px", backgroundColor: btn.clicked ? "yellow" : "#C84949", marginLeft:"5px", marginTop:"5px", color: btn.clicked ? 'black' : "white" }}   onClick={ ticketStarted ? (e) =>  {  setClickedButton(btn, idx) } : () => {}}>{ btn.num }</Button>
                                  
                              )
                      })
                }
                </div>
          </Col>
          <Col lg={4} style={{ marginTop:"50px" }}> 
            <Row className='justify-content-center'>
                <Col lg={12}>
                   <Card>
                  <Card.Header>
                       <h5>Select Money</h5>
                  </Card.Header>
                  <Card.Body>
                      Numbers: {
                          ticket.numbers.map((num) => {
                               return <span style={{ marginLeft:"10px" }}>   {num}  </span>
                          })
                      }
                  </Card.Body>
                  <Card.Footer>
                      money:
                      { 
                          moneyArray.map((money) => {
                                return <Button className='btn btn-primary' style={{ marginLeft:"20px" }}  onClick={ ticketStarted ? () => {setMoney(money)} : () => {}}>{money}</Button>
                          })
                      } -  <span> { moneySelected } birr </span> 
                  </Card.Footer>
              </Card>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col lg={4}>
                    <Button className='btn btn-primary' style={{ marginTop:"30px" }} onClick={ticketStarted ? generateTicket : ()=>{}}> Generate </Button>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col lg={10}>
                       <h1 style={{ textAlign:'center', marginTop:"30px", fontSize:"100px", backgroundColor:"#EFEFEF", borderRadius:"20px", padding:"10px" }}>{ ticketMinutes } : {ticketSeconds}</h1>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col lg={10}>
                       <h1 style={{ textAlign:'center', marginTop:"30px", fontSize:"100px", backgroundColor:"#EFEFEF", borderRadius:"20px", padding:"10px" }}>{ gameMinutes } : {gameSeconds}</h1>
                </Col>
            </Row>
          </Col>
      </Row>
      </Container>
     
    
    </div>
  )
}

export default App
