import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  ButtonGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { startGame, stopGame } from "../features/gameSlice";
import {
  populateLuckyNumber,
  cleanLuckyNumbers,
} from "../features/numberSlice";
import axios from "axios";
import gameUrls from "../config/url_config";
import { v4 as uuid } from "uuid";
import LuckyTicketsComponent from "./LuckyTicketsComponent";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import {
  ArrowLeftSquare,
  CaretLeft,
  Key,
  Shuffle,
  Trash3Fill,
  X,
} from "react-bootstrap-icons";
import PopupBox from "./ResultPopUpPage";

// import './App.css'

function Homepage() {
  const NUMBER_LIMIT = 80;
  const [count, setCount] = useState(0);
  let [buttonArray, setButtonArray] = useState([{ clicked: false, num: -1 }]);
  const [ticketArray, setTicketArray] = useState([]);
  const [numberCount, setNumberCount] = useState(0);
  const [moneySelected, setMoneySelcted] = useState(10);
  const [gameMinutes, setGameMinutes] = useState(1);
  const [gameSeconds, setGameSeconds] = useState(0);
  const [ticketMinutes, setTicketMinutes] = useState(1);
  const [ticketStarted, setTicketStarted] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [ticketSeconds, setTicketSeconds] = useState(0);
  const [showLuckyTickets, setShowLuckyTickets] = useState(false);
  const [luckyTickets, setLuckyTickets] = useState([]);
  const [luckyNumbersGen, setLuckyNumbersGen] = useState([]);
  const [hits, setHits] = useState(0);
  const [pays, setPays] = useState([]);
  const [hitsNum, setHitsNum] = useState([]);
  const [betSlip, setBetSlip] = useState(false);
  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [ticket, setTicket] = useState({
    id: "",
    numbers: [],
    money: 0,
  });
  const moneyArray = [20, 50, 80];
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);
  const isPopupOpen = useSelector((state) => state.isPopupOpen);


  useEffect(() => {
    setButtonArray([]);
    const generateNumber = () => {
      for (let i = 1; i <= NUMBER_LIMIT; i++) {
        setButtonArray((b) => [...b, { clicked: false, num: i }]);
      }
    };
    generateNumber();
  }, []);
  useEffect(() => {
    let gameInterval = setInterval(() => {
      if (gameStarted) {
        if (gameSeconds > 0) {
          setGameSeconds(gameSeconds - 1);
        }
        if (gameSeconds === 0) {
          if (gameMinutes === 0) {
            setTicketArray([]);
            clearInterval(gameInterval);
            setTicketStarted(true);
            setShowLuckyTickets(false);
            setGameSeconds(0);
            setGameMinutes(1);
            setGameStarted(false);
            dispatch(stopGame());
            dispatch(cleanLuckyNumbers());
            //  setInterval(ticketInterval, 1000)
          } else {
            setGameMinutes(gameMinutes - 1);
            setGameSeconds(59);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(gameInterval);
    };
  }, [gameSeconds, gameStarted]);
  useEffect(() => {
    let ticketInterval = setInterval(() => {
      if (ticketStarted) {
        if (ticketSeconds > 0) {
          setTicketSeconds(ticketSeconds - 1);
        }
        if (ticketSeconds === 0) {
          if (ticketMinutes === 0) {
            let randomNumbers = [];
            for (let i = 1; i <= 20; i++) {
              var rand = Math.random() * 80 + 1;
              randomNumbers.push(Math.floor(rand));
            }
            clearInterval(ticketInterval);
            setTicketMinutes(1);
            setTicketSeconds(0);
            setTicketStarted(false);
            axios
              .post(gameUrls.drawUrl, { tickets: ticketArray })
              .then((result) => {
                if (result.status === 200) {
                  dispatch(startGame());
                  setGameStarted(true);
                  dispatch(populateLuckyNumber(result.data.numbers));
                  setLuckyNumbersGen(result.data.numbers);
                  setShowLuckyTickets(true);
                  setLuckyTickets(result.data.winners);
                  dispatch(startGame());
                  setGameStarted(true);
                  console.log(result.data);
                } else if (result.status === 201) {
                  console.log(result.status);
                } else {
                  console.log(result.status);
                }
              });
            // setInterval(gameInterval, 1000)
          } else {
            setTicketMinutes(ticketMinutes - 1);
            setTicketSeconds(59);
          }
        }
      }
    }, 1000);
    setInterval(ticketInterval, 1000);
    return () => {
      clearInterval(ticketInterval);
    };
  }, [ticketStarted, ticketSeconds]);




  const setClickedButton = (number, idx) => {
    let newArray = [...buttonArray];

    setButtonArray(newArray);
    if (!number.clicked) {
      if (numberCount < 6) {
        newArray[idx] = { clicked: !number.clicked, num: number.num };
        ticket.numbers.push(number.num);
        let num = numberCount + 1;
        setNumberCount(num);
        switch (num) {
          case 1:
            setHits(1);
            setPays([3.8]);
            setHitsNum([1]);
            break;
          case 2:
            setHits(2);
            setPays([15]);
            setHitsNum([2]);
            break;
          case 3:
            setHits(3);
            setPays([3, 35]);
            setHitsNum([2, 3]);
            break;
          case 4:
            setHits(4);
            setPays([1, 8, 100]);
            setHitsNum([2, 3, 4]);
            break;
          case 5:
            setHits(5);
            setPays([1, 3, 15, 300]);
            setHitsNum([2, 3, 4, 5]);
            break;
          case 6:
            setHits(6);
            setPays([1, 10, 70, 1800]);
            setHitsNum([3, 4, 5, 6]);

            break;
        }
      } else {
        alert("maximum ammount of numbers reached");
      }
    } else {
      newArray[idx] = { clicked: !number.clicked, num: number.num };
      let filteredNum = ticket.numbers.filter((mnum) => mnum !== number.num);
      let num = numberCount - 1;
      setNumberCount(num);
      ticket.numbers = filteredNum;
      switch (num) {
        case 1:
          setHits(1);
          setPays([3.8]);
          setHitsNum([1]);
          break;
        case 2:
          setHits(2);
          setPays([15]);
          setHitsNum([2]);
          break;
        case 3:
          setHits(3);
          setPays([3, 35]);
          setHitsNum([2, 3]);
          break;
        case 4:
          setHits(4);
          setPays([1, 8, 100]);
          setHitsNum([2, 3, 4]);
          break;
        case 5:
          setHits(5);
          setPays([1, 3, 15, 300]);
          setHitsNum([2, 3, 4, 5]);
          break;
        case 6:
          setHits(6);
          setPays([1, 10, 70, 1800]);
          setHitsNum([3, 4, 5, 6]);

          break;
      }
    }

    //  console.log(ticket)
  };
  const setMoney = (money) => {
    setMoneySelcted(money);
    console.log(ticket.money);
  };
  const generateTicket = () => {
    // if (moneySelected === 0) {
    //   alert(" please insert money ");
    //   return;
    // }
    let uid = uuid();
    ticket.id = uid;
    ticket.money = moneySelected;
    // ticketArray.push(ticket);
    // let tickets = {
    //   id: "",
    //   numbers: [],
    //   money: 0,
    // };
    setTicket(ticket);
    // setTicket(tickets);
    setBetSlip(true);
    setButtonArray([]);
    setNumberCount(0);

    const generateNumber = () => {
      for (let i = 1; i <= NUMBER_LIMIT; i++) {
        setButtonArray((b) => [...b, { clicked: false, num: i }]);
      }
    };
    generateNumber();
    // betSlip(ticket);
    // console.log(ticketArray);
  };

  const placeBet = () => {
    setBetSlip(false);
    ticket.money = moneySelected;
    setTicket(ticket);
    ticketArray.push(ticket);
    let tickets = {
      id: "",
      numbers: [],
      money: 0,
    };
    setTicket(tickets);
    setMoneySelcted(10);
    console.log(ticketArray);
  };

  const clearTicket = () => {
    let tickets = {
      id: "",
      numbers: [],
      money: 0,
    };
    setTicket(tickets);
    setBetSlip(false);
  };

  return (
    <div>
      <div style={{ boxShadow: "0px 5px 10px rgb(255, 255, 255, 0.5)" }}>
        <Navbar />
      </div>
      <div style={{ position: "relative", width: "100%" }}>
        <Header />
        <div style={{ backgroundColor: "#191818", height: "100vh" }}>
          <Container
            style={{
              maxWidth: "100%",
              height: "auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{ display: "flex", marginBottom: "10px", width: "70%" }}
              >
                <Button
                  style={{
                    display: "flex",
                    backgroundColor: "red",
                    border: "none",
                    borderRadius: "3px",
                    padding: "5px",
                    width: "15%",
                  }}
                >
                  NEXT DRAW{" "}
                  <span
                    style={{
                      marginLeft: "10px",
                      color: "#FDDA0D",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    {" "}
                    {ticketMinutes} : {ticketSeconds}{" "}
                  </span>
                </Button>
                <Button
                  style={{
                    display: "flex",
                    backgroundColor: "green",
                    border: "none",
                    borderRadius: "3px",
                    padding: "5px",
                  }}
                >
                  REPEAT{" "}
                  <span style={{ marginLeft: "5px" }}>
                    <select></select>
                  </span>
                </Button>
              </div>
              <div style={{ display: "flex", width: "70%" }}>
                <Button
                  style={{
                    display: "flex",
                    backgroundColor: "green",
                    border: "none",
                    borderRadius: "3px",
                    marginRight: "30px",
                  }}
                >
                  QUICK PICK
                  <span style={{ marginLeft: "30px" }}>
                    <select style={{ marginRight: "5px" }}></select>

                    <Shuffle size="19px" />
                  </span>
                </Button>
                <Button
                  style={{
                    display: "flex",
                    width: "20%",
                    backgroundColor: "#AE4A05",
                    border: "none",
                    borderRadius: "3px",
                    marginRight: "5px",
                    justifyContent: "space-between",
                  }}
                >
                  HEADS{" "}
                  <span
                    style={{
                      padding: "1px 13px",
                      borderRadius: "3px",
                      backgroundColor: "rgb(25, 24, 24)",
                    }}
                  >
                    2
                  </span>
                </Button>
                <Button
                  style={{
                    display: "flex",
                    backgroundColor: "#F183A1",
                    width: "20%",
                    border: "none",
                    borderRadius: "3px",
                    marginRight: "5px",
                    justifyContent: "space-between",
                  }}
                >
                  EVENS{" "}
                  <span
                    style={{
                      padding: "1px 13px",
                      borderRadius: "3px",
                      backgroundColor: "rgb(25, 24, 24)",
                    }}
                  >
                    4
                  </span>
                </Button>
                <Button
                  style={{
                    display: "flex",
                    width: "20%",
                    backgroundColor: "rgb(233, 108, 46)",
                    border: "none",
                    borderRadius: "3px",
                    marginRight: "50px",
                    justifyContent: "space-between",
                  }}
                >
                  TAILS{" "}
                  <span
                    style={{
                      padding: "1px 13px",
                      borderRadius: "3px",
                      backgroundColor: "rgb(25, 24, 24)",
                    }}
                  >
                    2
                  </span>
                </Button>
                <Button
                  style={{
                    display: "flex",
                    backgroundColor: "#F183A1",
                    border: "none",
                    borderRadius: "3px",
                  }}
                  
                >
                  CLEAR{" "}
                  <span
                    style={{
                      padding: "0px 3px",
                      textAlign: "center",
                      marginTop: "0px",
                    }}
                  >
                    <Trash3Fill />
                  </span>
                </Button>
                {isPopupOpen && (
                  <PopupBox
                    content="Check the status of the ticket here!"
                    
                  />
                )}
              </div>
            </div>
            <Row>
              <Col lg={12} style={{ display: "flex" }}>
                <div style={{ marginLeft: "20px" }}>
                  {buttonArray.map((btn, idx) => {
                    if (btn.num % 10 == 1) {
                      return (
                        <>
                          {btn.num === 41 && (
                            <hr
                              style={{
                                color: "#FDDA0D",
                                width: "70%",
                                // marginBottom: "2px",
                                boxShadow:
                                  "0px 15px 15px rgba(127, 156, 111, 0.2)",
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                            />
                          )}{" "}
                          {/* Add horizontal line when number is 41 */}
                          <br />{" "}
                          {btn.num >= 41 ? (
                            <Button
                              style={{
                                width: "45px",
                                marginRight: "40px",
                                border: "none",
                                backgroundColor: btn.clicked
                                  ? "yellow"
                                  : "rgb(233, 108, 46)",
                                height: "45px",

                                // marginBottom:"10px",
                                marginBottom: "5px",
                                borderRadius: "30px",
                                color: btn.clicked ? "black" : "white",
                              }}
                              className="btn btn-primary"
                              onClick={(e) => {
                                setClickedButton(btn, idx);
                              }}
                            >
                              {btn.num}
                            </Button>
                          ) : (
                            <Button
                              style={{
                                width: "45px",
                                marginRight: "40px",
                                border: "none",
                                backgroundColor: btn.clicked
                                  ? "yellow"
                                  : "#AE4A05",
                                height: "45px",

                                // marginBottom:"10px",
                                marginBottom: "5px",
                                borderRadius: "30px",
                                color: btn.clicked ? "black" : "white",
                              }}
                              className="btn btn-primary"
                              onClick={(e) => {
                                setClickedButton(btn, idx);
                              }}
                            >
                              {btn.num}
                            </Button>
                          )}
                        </>
                      );
                    }
                    return (
                      <>
                        <Button
                          className="btn"
                          style={{
                            width: "45px",
                            height: "45px",
                            marginRight: "40px",
                            border: "none",
                            borderRadius: "30px",
                            backgroundColor: btn.clicked
                              ? "yellow"
                              : btn.num > 41
                              ? "rgb(233, 108, 46)"
                              : "#AE4A05",
                            // marginLeft: "5px",
                            // marginTop: "5px",

                            marginBottom: "5px",
                            color: btn.clicked ? "black" : "white",
                          }}
                          onClick={
                            ticketStarted
                              ? (e) => {
                                  setClickedButton(btn, idx);
                                }
                              : () => {}
                          }
                        >
                          {btn.num}
                        </Button>
                      </>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {numberCount ? (
                    <>
                      <div style={{ marginTop: "40px" }}>
                        <Button
                          style={{
                            backgroundColor: "green",
                            border: "none",
                            padding: "10px 30px",
                            borderRadius: "3px",
                          }}
                          onClick={ticketStarted ? generateTicket : () => {}}
                        >
                          ADD TO BETSLIP
                        </Button>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "50px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h6
                          style={{
                            marginTop: "10px",
                            textAlign: "start",
                            backgroundColor: "#EA9315",
                            padding: "7px 40px 7px 5px",
                            fontWeight: "500",
                            fontSize: "15px",
                          }}
                        >
                          HIGHEST PAYOUT {pays.slice(-1)} FROM {numberCount}
                        </h6>
                        <Button
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#EA9315",
                            borderRadius: "0px",
                            border: "none",
                            height: "32px",
                            color: "black",
                          }}
                        >
                          <h1 style={{ marginTop: "-18px" }}>-</h1>
                        </Button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80%",
                          marginTop: "-8px",
                        }}
                      >
                        {/* <div style={{display:"flex",justifyItems:"space-between"}}>
                      <h6 style={{color:'white'}}>2</h6>
                      <h6 style={{color:'white'}}>1</h6>
                    </div> */}
                        {pays.map((item, index) => (
                          <Row
                            key={index}
                            style={{
                              width: "100%",
                              display: "flex",
                              backgroundColor: "#624318",
                              alignItems: "center",
                              margin: "auto",
                              borderBottom: "1px black solid",
                            }}
                          >
                            <Col
                              lg={6}
                              style={{
                                textAlign: "center",
                                color: "white",
                                fontWeight: "normal",
                              }}
                            >
                              {hitsNum[index]}
                            </Col>
                            <Col
                              lg={6}
                              style={{
                                textAlign: "center",
                                color: "white",
                                fontWeight: "normal",
                              }}
                            >
                              {item}
                            </Col>
                          </Row>
                        ))}

                        <Row
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            margin: "auto",
                          }}
                        >
                          <Col
                            lg={6}
                            style={{
                              textAlign: "center",
                              color: "white",
                              fontWeight: "normal",
                            }}
                          >
                            Hits
                          </Col>
                          <Col
                            lg={6}
                            style={{
                              textAlign: "center",
                              color: "white",
                              fontWeight: "normal",
                            }}
                          >
                            Pays
                          </Col>
                        </Row>
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        width: "280px",
                        display: "flex",
                        marginTop: "30px",
                        backgroundColor: "#6D6D6C",
                        padding: "15px 20px",
                        borderRadius: "4px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ color: "white", textAlign: "start" }}>
                        <ArrowLeftSquare size="30px" /> <br />
                        Pick 1 to 6 numbers from 80. Pick which numbers you
                        think will be randomly selected. The more you pick the
                        more you could win.
                      </p>
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={2} style={{ marginTop: "50px" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "0",
                    display: "flex",
                    width: "400px",
                  }}
                >
                  <Card
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
                      <h6
                        style={{
                          textAlign: "center",
                          color: "rgb(233, 108, 46)",
                        }}
                      >
                        Betslip
                      </h6>
                    </Card.Header>
                    <Card.Body
                      style={{
                        backgroundColor: "#191818",
                        width: "100%",
                        border: "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingBottom: "10px",
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "rgb(233, 108, 46)",
                              borderColor: "rgb(233, 108, 46)",
                              borderRadius: "3px",
                              padding: "0.5px 35px",
                            }}
                          >
                            SINGLE
                          </Button>
                          <Button
                            style={{
                              backgroundColor: "#191818",
                              borderColor: "rgb(233, 108, 46)",
                              borderRadius: "3px",
                              padding: "0.5px 35px",
                            }}
                          >
                            MULTIPLES
                          </Button>
                        </div>
                        {/* {console.log(ticket)} */}
                        {!betSlip ? (
                          <>
                            <h6
                              style={{
                                textAlign: "center",
                                color: "#99A3A4",
                                marginBottom: "30px",
                              }}
                            >
                              Add more bets
                            </h6>
                          </>
                        ) : (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div>
                                <Card
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    border: "none",
                                    borderRadius: "3px",
                                    backgroundColor: "#6D6D6C",
                                  }}
                                >
                                  <Card.Header
                                    style={{
                                      display: "flex",
                                      padding: "1px 10px",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "white",
                                        paddingTop: "5px",
                                      }}
                                    >
                                      Win {pays.slice(-1)}
                                    </p>
                                    <X
                                      size="30px"
                                      color="white"
                                      onClick={clearTicket}
                                    />
                                  </Card.Header>
                                  <Card.Body
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div style={{ color: "white" }}>
                                      Numbers :{" "}
                                      {ticket.numbers.map(
                                        (item) => item + " , "
                                      )}{" "}
                                      <t />{" "}
                                    </div>
                                    <div style={{ color: "white" }}>
                                      ID: {ticket.id}
                                    </div>
                                  </Card.Body>
                                </Card>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                }}
                              >
                                <Button
                                  style={{
                                    width: "23%",
                                    borderRadius: "4px",
                                    backgroundColor: "#C66A09",
                                    border: "none",
                                  }}
                                  onClick={() => {
                                    setMoneySelcted(10);
                                  }}
                                >
                                  10 birr
                                </Button>
                                <Button
                                  style={{
                                    width: "23%",
                                    borderRadius: "4px",
                                    backgroundColor: "#DB528A",
                                    border: "none",
                                  }}
                                  onClick={() => {
                                    setMoneySelcted(20);
                                  }}
                                >
                                  20 birr
                                </Button>
                                <Button
                                  style={{
                                    width: "23%",
                                    borderRadius: "4px",
                                    backgroundColor: "#7D52DB",
                                    border: "none",
                                  }}
                                  onClick={() => {
                                    setMoneySelcted(50);
                                  }}
                                >
                                  50 birr
                                </Button>
                                <Button
                                  style={{
                                    width: "23%",
                                    borderRadius: "4px",
                                    backgroundColor: "#4C90DA",
                                    border: "none",
                                  }}
                                  onClick={() => {
                                    setMoneySelcted(100);
                                  }}
                                >
                                  100 birr
                                </Button>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    color: "white",
                                  }}
                                >
                                  <h6>TOTAL STAKE</h6>
                                  <h6>{moneySelected} Birr</h6>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    color: "white",
                                  }}
                                >
                                  <h5>TOTAL 'TO WIN'</h5>
                                  <h5>{moneySelected * pays.slice(-1)} Birr</h5>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        <div style={{ display: "flex", width: "100%" }}>
                          <Button
                            style={{
                              width: "20%",
                              borderRadius: "0px",
                              marginRight: "2px",
                              border: "none",
                              // marginLeft:"0px",
                              backgroundColor: "#F183A1",

                              // padding: "10px",
                            }}
                            onClick={clearTicket}
                          >
                            CLEAR
                          </Button>
                          <Button
                            style={{
                              width: "80%",
                              borderRadius: "0px",
                              backgroundColor: "green",
                              border: "none",
                              padding: "10px",
                            }}
                            onClick={placeBet}
                          >
                            PLACE BET
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer
                      style={{ backgroundColor: "#191818" }}
                    ></Card.Footer>
                  </Card>
                </div>
                {/* <Row className="justify-content-center">
                <Col lg={12}>
                  <Card>
                    <Card.Header>
                      <h5>Select Money</h5>
                    </Card.Header>
                    <Card.Body>
                      Numbers:{" "}
                      {ticket.numbers.map((num) => {
                        return (
                          <span style={{ marginLeft: "10px" }}> {num} </span>
                        );
                      })}
                    </Card.Body>
                    <Card.Footer>
                      money:
                      {moneyArray.map((money) => {
                        return (
                          <Button
                            className="btn btn-primary"
                            style={{ marginLeft: "20px" }}
                            onClick={
                              ticketStarted
                                ? () => {
                                    setMoney(money);
                                  }
                                : () => {}
                            }
                          >
                            {money}
                          </Button>
                        );
                      })}{" "}
                      - <span> {moneySelected} birr </span>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg={4}>
                  <Button
                    className="btn btn-primary"
                    style={{ marginTop: "30px" }}
                    onClick={ticketStarted ? generateTicket : () => {}}
                  >
                    {" "}
                    Generate{" "}
                  </Button>
                </Col>
              </Row> */}
                {/* <Row className="justify-content-center">
                <Col lg={10}>
                  <h1
                    style={{
                      textAlign: "center",
                      marginTop: "30px",
                      fontSize: "100px",
                      backgroundColor: "#EFEFEF",
                      borderRadius: "20px",
                      padding: "10px",
                    }}
                  >
                    {ticketMinutes} : {ticketSeconds}
                  </h1>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg={10}>
                  <h1
                    style={{
                      textAlign: "center",
                      marginTop: "30px",
                      fontSize: "100px",
                      backgroundColor: "#EFEFEF",
                      borderRadius: "20px",
                      padding: "10px",
                    }}
                  >
                    {gameMinutes} : {gameSeconds}
                  </h1>
                </Col>
              </Row> */}
                {/* <Row>
                  {showLuckyTickets ? (
                    <LuckyTicketsComponent
                      luckyTickets={luckyTickets}
                      luckyNumbers={luckyNumbersGen}
                      ticketArray={ticketArray}
                    />
                  ) : (
                    <></>
                  )}
                </Row> */}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
