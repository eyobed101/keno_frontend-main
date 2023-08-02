import React from "react";
import { Button, Card } from "react-bootstrap";
// import Icon from 'react-bootstrap-icons'
import { XCircle } from "react-bootstrap-icons";
import {
  treasure,
  jaguar,
  ball,
  car,
  billiard,
  jag,
  horseback,
  jumping,
  sedan,
  menu,
} from "../assets";

export const Header = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#191818",
        padding: "0px 10px 40px 10px",
      }}
    >
      <div style={{ marginLeft: "10px" }}>
        <Button
          style={{ backgroundColor: "#191818", border: "none", color: "white" }}
        >
          <img src={treasure} width="35px" color="white" />
        </Button>
        <Button
          style={{ backgroundColor: "#191818", border: "none", color: "white" }}
        >
          <img src={jaguar} width="40px" color="white" />
        </Button>
        <Button
          style={{ backgroundColor: "#191818", border: "none", color: "white" }}
        >
          <img src={ball} width="30px" color="white" />
        </Button>
        <Button
          style={{ backgroundColor: "#191818", border: "none", color: "white" }}
        >
          <img src={car} width="35px" color="white" />
        </Button>
        <Button
          style={{ backgroundColor: "#191818", border: "none", color: "white" }}
        >
          <img src={billiard} width="50px" color="white" />
        </Button>
        <Button
          style={{ backgroundColor: "#191818", border: "none", color: "white" }}
        >
          <img src={jag} width="40px" color="white" />
        </Button>
        <Button
          style={{ backgroundColor: "#191818", border: "none", color: "white" }}
        >
          <img src={horseback} width="35px" color="white" />
        </Button>
        <Button
          style={{ backgroundColor: "#191818", border: "none", color: "white" }}
        >
          <img src={jumping} width="35px" color="white" />
        </Button>
        <Button
          style={{ backgroundColor: "#191818", border: "none", color: "white" }}
        >
          <img src={sedan} width="40px" color="white" />
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <img
          src={menu}
          width="30px"
          height="30px"
          color="white"
          style={{ marginRight: "5px", marginTop: "10px" }}
        />
        <img src={billiard} width="50px" color="white" />
        <h6
          style={{
            color: "white",
            marginLeft: "5px",
            marginTop: "15px",
            fontWeight: "400",
          }}
        >
          KENO
        </h6>
      </div>
      <div style={{ display: "flex", marginRight: "20px", width: "400px" }}>
        {/* <Card
          style={{
            display: "flex",
            width: "100%",
            border: "none",
            boxShadow: "0px 15px 15px rgb(0, 0, 0, 0.7)",
          }}
        >
          <Card.Header
            style={{
              backgroundColor: "#191818",
              border: "none",
              borderBottom: "5px solid #111111",
            }}
          >
            <h6 style={{ textAlign: "center", color: "rgb(233, 108, 46)" }}>
              Betslip
            </h6>
          </Card.Header>
          <Card.Body style={{ backgroundColor: "#191818", border: "none" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" , paddingBottom:"10px"}}>
                <Button style={{backgroundColor:"rgb(233, 108, 46)", borderColor:"rgb(233, 108, 46)", borderRadius:"3px"}}>SINGLE</Button>
                <Button style={{backgroundColor:"#191818",  borderColor:"rgb(233, 108, 46)",borderRadius:"3px"}}>MULTIPLES</Button>
              </div>
              <h6 style={{textAlign:"center", color:"#99A3A4", marginBottom:"20px"}}>Add more bets</h6>
              <div style={{display:"flex", width:"100%"}}>
                <Button style={{width:"20%", borderRadius:"0px", marginRight:"2px", border:"none", padding:"10px"}}>CLEAR</Button>
                <Button style={{width:"80%", borderRadius:"0px", backgroundColor:"green",border:"none", padding:"10px"}}>PLACE BET</Button>
              </div>
            </div>
          </Card.Body>
          <Card.Footer style={{backgroundColor:"#191818"}}>
           
          </Card.Footer>
        </Card> */}
      </div>
    </div>
  );
};
