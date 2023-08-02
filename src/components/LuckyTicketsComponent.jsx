import React from 'react'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'

function LuckyTicketsComponent({luckyTickets, ticketArray, luckyNumbers}) {
  let myLuckyTickets = luckyTickets
  let numbersArray = luckyNumbers
  const [ticketIdArray, setTicketIdArray] = useState([])
  useEffect(()=> {
         for(let i = 0; i < myLuckyTickets.length; i++)
         {
                ticketIdArray.push(myLuckyTickets[i].ticket)
         }
        
  }, [myLuckyTickets]);
  return (
    <div>
        {
             ticketArray.map((result, idx) => {
                    if(ticketIdArray.includes(result.id)) {
                        return <p>
                             {
                                result.id
                             } 
                             :
                             {
                                  result.numbers.map((num) => {
                                          if(numbersArray.includes(num)) {
                                              return <p style={{ color:'red', display:'inline' }}> { num } </p>
                                          } else {
                                              return <p style={{ color:'blue', display:'inline' }}> { num } </p>
                                          }
                                  })
                             }
                        </p>
                    }
             })
        }
    </div>
  )
}

export default LuckyTicketsComponent