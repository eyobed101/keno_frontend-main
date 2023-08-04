
import background from './background.jpg';
import ball from './games/ball.png'
import billiard from './games/billiard.png'
import car from './games/car.png'
import horseback from './games/horseback.png'
import jag from './games/jag.png'
import jaguar from './games/jaguar.png'
import sedan from './games/sedan.png'
import treasure from './games/treasure.png'
import jumping from './games/jumping.png'
import menu from './games/menu.png'
import cancel from './games/cancel.png'
import dollar from './games/dollar-sign.png'

// import LoginBG  from './LoginBG.jpg';

let ballImageArray = []
let newArray = []
function populateImport()
{
      for(let i = 1; i <= 80; i++)
      {
            ballImageArray.push(`ball-${i}`)
      }
}
populateImport()
const loadEntries = () => Promise.all(ballImageArray.map((arr) => import(`./Numbers/${arr}.png`)));
loadEntries().then((res)=>newArray.push(res))
export {
   background,
   ball,
   car,
   jag,
   jaguar,
   jumping,
   treasure,
   horseback,
   sedan,
   billiard,
   menu,
   cancel,
   dollar,
   newArray
  // LoginBG
};
