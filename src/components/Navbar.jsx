import { Box } from '@mui/material';
import React from 'react'
import { Button, Container } from 'react-bootstrap'
// import Icon from 'react-bootstrap-icons'
import { XCircle } from 'react-bootstrap-icons';
import { dollar, cancel } from '../assets';
import { CurrencyDollar } from 'react-bootstrap-icons';
import { useDispatch} from 'react-redux';



export const Navbar = () => {
  const dispatch = useDispatch();


  const toggleActive = () => {
    dispatch({ type: 'TOGGLE_ACTIVE' });
  };

  return (
    <>
    <div style={{position: "relative",zIndex: "10",width:"100%", boxShadow:"0px 5px 10px rgb(255, 255, 255, 0.25)",display:"flex", justifyContent:"space-between", alignItems:"center", backgroundColor:"#111111", padding:"10px"}}>
      <div style={{marginLeft:"10px"}}><h3 style={{color:"#E96C2E"}}>Retail Logo</h3></div>
      <div>
        <Button style={{backgroundColor:"#F0801D", padding:"10px 20px", marginRight:"10px", fontWeight:"600", border:"none"}} size='md'>Cashier Options</Button>
        <Button style={{backgroundColor:"#FCB65C", padding:"10px 20px", marginRight:"10px", fontWeight:"600", border:"none", justifyContent:"center"}} size="md">Cancel 
          <img src={cancel} width="20px" style={{marginLeft:"10px"}}/></Button>
        <Button onClick={toggleActive}  style={{backgroundColor:"#78BD67", padding:"10px 20px", marginRight:"5px", fontWeight:"600", border:"none", justifyContent:"center"}} size="md">Redeem 
        <CurrencyDollar width="30px"/></Button>
      </div>
      <div style={{display:"flex"}}>

        <h6  style={{color:"white", marginRight:"20px", paddingTop:"5px"}}>Keno Sample</h6>
        <h5  style={{color:"#E96C2E", marginRight:"10px"}}>Logout</h5>
        </div>
    </div>
    </>
  )
  
}
