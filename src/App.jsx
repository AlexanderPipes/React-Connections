import { useState } from 'react';

const names = [
  "dan","is","very","short","Liam","is","extremely","mean","Alex","is","mucho","wholesome","Tom","is","super","dumb"
]

const matches = [
  [0,1,2,3],
  [4,5,6,7],
  [8,9,10,11],
  [12,13,14,15]
]

function Square( {value, onSquareClick, isActive} ) {
  console.log(isActive);
  let classStr = isActive ? "active square" : "inactive square";
  return <button className={classStr} onClick={onSquareClick}>
    {value}
    </button>;
}

function SubmitButton({onSubClick} ) {
  return <button className="bttn" onClick={onSubClick}>
    Submit
    </button>;
}

function Board(  ) {
  /*
   const [gameState, setGameState] = usestate(Array(16).fill({
    isActive: false,
    isEnabled: true
   }))
   */
  const [active, setActive] = useState(Array(16).fill(false));
  
  function handleClick(i) {
    const count = active.filter(Boolean).length;
    if(count>=4 && active[i] === false) { 
      return;
    } else {
      let nextActive = active.slice();
      nextActive[i] = !active[i];
      setActive(nextActive);
    }
  }

  function checkMatch() {
    const trueIndex = getTrueIndex()
    let j = 0
    for(let i=0; i<matches.length; i++) {
      const [a, b, c, d] = matches[i];
      if (trueIndex[0] === a && trueIndex[1] === b && trueIndex[2] === c && trueIndex[3] === d) {
        alert("Match made in heaven!")
        break;
      } else if(i === matches.length-1) {
        alert("Not a match!")
      }
    }
  }

  function getTrueIndex() {
    let trueArray = []
    for( let i=0; i<active.length; i++) {
      if (active[i] === true) {
        trueArray.push(i);
      }
    }
    return trueArray;
  }
  
  return (
    <>
      <div className = "board-row">
        <Square value={names[0]} isActive={active[0]} onSquareClick={() => handleClick(0)} />
        <Square value={names[1]} isActive={active[1]} onSquareClick={() => handleClick(1)} />
        <Square value={names[2]} isActive={active[2]} onSquareClick={() => handleClick(2)} />
        <Square value={names[3]} isActive={active[3]} onSquareClick={() => handleClick(3)} />
      </div>
      <div className = "board-row">
        <Square value={names[4]} isActive={active[4]} onSquareClick={() => handleClick(4)} />
        <Square value={names[5]} isActive={active[5]} onSquareClick={() => handleClick(5)} />
        <Square value={names[6]} isActive={active[6]} onSquareClick={() => handleClick(6)} />
        <Square value={names[7]} isActive={active[7]} onSquareClick={() => handleClick(7)} />
      </div>
      <div className = "board-row">
        <Square value={names[8]} isActive={active[8]} onSquareClick={() => handleClick(8)} />
        <Square value={names[9]} isActive={active[9]} onSquareClick={() => handleClick(9)} />
        <Square value={names[10]} isActive={active[10]} onSquareClick={() => handleClick(10)} />
        <Square value={names[11]} isActive={active[11]} onSquareClick={() => handleClick(11)} />
      </div>
      <div className = "board-row">
        <Square value={names[12]} isActive={active[12]} onSquareClick={() => handleClick(12)} />
        <Square value={names[13]} isActive={active[13]} onSquareClick={() => handleClick(13)} />
        <Square value={names[14]} isActive={active[14]} onSquareClick={() => handleClick(14)} />
        <Square value={names[15]} isActive={active[15]} onSquareClick={() => handleClick(15)} />
      </div>
      <div className = "board-row">
       <SubmitButton onSubClick={() => checkMatch()}/>
      </div>
    </>
  )
}

export default function Game() {
  const [selectedCount, setSelectedCount] = useState(0);
  return (
    <>
      <div>
        <Board /> 
      </div>
    </>
  )
}
