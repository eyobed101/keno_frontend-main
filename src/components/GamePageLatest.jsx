import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { background, newArray } from "../assets";
import { motion, useAnimationControls } from "framer-motion";
import { duration } from "@mui/material";
import {
  Tube,
  pipe,
  pipet,
  num4,
  selected_orange,
  selected_yellow,
} from "../assets/Image";
// import '../assets/ball.css';
// import '../assets/index.css';
import "../assets/animation.css";

function ShowSelectedNumber({ buttonArray, setButtonArray }) {
  const gameState = useSelector((state) => state.game);
  const luckyNumbers = useSelector((state) => state.luckyNumbers);
  const [selectedImg, setSelectedImg] = useState("");
  const [numPos, setNumPos] = useState(-1);
  const [initialPos, setInitialPos] = useState({ y: 1080, opacity: 1 });
  const [animate, setAnimate] = useState({ y: -200 });
  const controls = useAnimationControls();
  let myInterval = null;
  const animVariants = {
    initial: {
      y: 1080,
      scale: 1,
      zIndex: 0,
      transition: { duration: 1 },
    },
    move1: {
      y: [1080, 500],
      transition: {
        duration: 0.5,
        times: [0, 0.9],
      },
    },
    move2: {
      y: [500, -900],
      transition: {
        duration: 0.5,
        times: [0, 0.9],
      },
    },
    grow1: {
      scale: [1, 3],
      transition: {
        duration: 1.5,
        times: [0, 0.1],
      },
    },
    grow2: {
      scale: [3, 1],

      transition: {
        duration: 0.5,
        times: [0, 0.1],
      },
    },
    hover1: {
      zIndex: 300,
      transition: {
        duration: 0.5,
        // delay: 0.5,
      },
    },
    hover2: {
      zIndex: 50,
      transition: {
        duration: 0.5,
        // delay: 0.5,
      },
    },
  };
  const renewButton = () => {
    // setButtonArray([{clicked:false, num:-1}])
    // for(let i = 1; i <= 80; i++)
    // {
    //        setButtonArray(b => [...b, {clicked:false, num:i}])
    // }
    let newButtonArray = buttonArray.map((number, idx) => {
      return { clicked: false, num: number.num };
    });
    setButtonArray(newButtonArray);
  };

  useEffect(() => {
    console.log(numPos);
    console.log(luckyNumbers.randomNumber.length);
    if (gameState.gameStarted) {
      if (numPos === -1) {
        renewButton();
        setNumPos(numPos + 1);
        console.log("the numPos inside ", numPos);
      }
      if (numPos < 20 && numPos >= -1) {
        // document.getElementById('animatingBall').classList.remove('animate-draw-ball')
        // document.getElementById('animatingBall').classList.add('animate-draw-ball')
        myInterval = setTimeout(async () => {
          setNumPos(numPos + 1);
          setSelectedImg(
            newArray[0][luckyNumbers.randomNumber[numPos] - 1].default
          );
          let btnArray = [...buttonArray];
          let number = btnArray[luckyNumbers.randomNumber[numPos] - 1];
          document
            .getElementById("animatingBall")
            .classList.add("animate-draw-ball");
          btnArray[luckyNumbers.randomNumber[numPos] - 1] = {
            clicked: true,
            num: number.num,
          };
          // console.log(number)
          setButtonArray(btnArray);

          await new Promise((done) => setTimeout(() => done(), 3000));
          document
            .getElementById("animatingBall")
            .classList.remove("animate-draw-ball");
        }, 5000);
      } else {
        //  setNumPos(-1)
        clearInterval(myInterval);
      }
    } else {
      setNumPos(-1);
    }
  }, [numPos, gameState.gameStarted]);

  return (
    <div>
      <img
        src={pipet}
        // width="100%"
        // height="100%"
        className="pipe-image-transparent"
      />
      <img src={pipe} className="pipe-image" />
      <img src={selectedImg} id="animatingBall" className="ball-image" />
    </div>
  );
}
export default function GamePageLatest() {
  const NUMBER_LIMIT = 80;
  let [buttonArray, setButtonArray] = useState([{ clicked: false, num: -1 }]);
  let [randomNumber, setRandomNumber] = useState([]);
  const gameState = useSelector((state) => state.game);
  const luckyNumbers = useSelector((state) => state.luckyNumbers);

  useEffect(() => {
    setButtonArray([]);
    console.log(newArray);
    const generateNumber = () => {
      for (let i = 1; i <= NUMBER_LIMIT; i++) {
        setButtonArray((b) => [...b, { clicked: false, num: i }]);
      }
    };
    generateNumber();
  }, []);
  return (
    //   <div style={{ backgroundColor:'#b71310', width:"100vw", height:"100vh", overflow:'hidden', }}>
    <Container
      fluid
      style={{
        background: "linear-gradient(90deg,#800500,#e11d06,#ff1b00)",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Col lg={8}>
          <div style={{ marginLeft: "5%" }}>
            <span
              style={{
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "4rem",
                background:
                  "-webkit-linear-gradient(top,#fce300 30%,#796719 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0rem 0rem 0.2rem rgb(28,26,26))",
              }}
            >
              DRAW
            </span>
            {buttonArray.map((btn, idx) => {
              if (btn.num % 10 == 1) {
                return (
                  <>
                    <br />{" "}
                    <Button
                      style={{
                        width: "5.5rem",
                        borderRadius: "1.4rem",
                        fontSize: "3rem",
                        borderStyle: "none",
                        fontWeight: "600",
                        fontFamily: "euro-regular,sans-serif",
                        backgroundImage: btn.clicked
                          ? btn.num > 40
                            ? `url(${selected_orange})`
                            : `url(${selected_yellow})`
                          : `url(${num4})`,
                        opacity: 0.65,
                        backgroundSize: "100%",
                        height: "4.8rem",
                        color: btn.clicked ? "black" : "#f90f03",
                      }}
                      className="btn btn-primary"
                    >
                      {btn.num}
                    </Button>
                  </>
                );
              }
              return (
                <Button
                  className="btn"
                  style={{
                    width: "5.5rem",
                    fontSize: "3rem",
                    height: "4.8rem",
                    borderRadius: "1.4rem",
                    borderStyle: "none",
                    border: btn.clicked ? "none" : "none",
                    backgroundImage: btn.clicked
                      ? btn.num > 40
                        ? `url(${selected_orange})`
                        : `url(${selected_yellow})`
                      : `url(${num4})`,

                    opacity: 0.65,
                    backgroundSize: "100%",
                    textAlign: "center",
                    fontWeight: "600",
                    fontFamily: "euro-regular,sans-serif",
                    marginLeft: "5px",
                    marginTop: "5px",
                    color: btn.clicked ? "black" : "#f90f03",
                  }}
                >
                  {btn.num}
                </Button>
              );
            })}
          </div>
        </Col>
        <Col lg={4}>
          <ShowSelectedNumber
            buttonArray={buttonArray}
            setButtonArray={setButtonArray}
          />
        </Col>
      </Row>
    </Container>
    //   </div>
  );
}
