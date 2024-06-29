import { useState } from 'react';

const names = [
  "dan","is","very","drunk","Liam","is","extremely","cringe","Osully","is","not","6'","Tom","is","super","dumb"
]

const matches = [
  [0,1,2,3],
  [4,5,6,7],
  [8,9,10,11],
  [12,13,14,15]
]

// when button is enabled is false I want the class to = inactive square disable
function Square( {value, onSquareClick, buttonState} ) {
  let classStr = buttonState.isActive ? "active square" : "inactive square";
  let disable = buttonState.isEnabled ? "" : "disabled";
  let match = buttonState.isEnabled ? "" : "osully isn't 6'";
  return <button className={classStr} onClick={onSquareClick} disabled={disable}>
    {value}
    </button>;
}

function SubmitButton( {onSubClick, count} ) {
  let disable = count === 4 ? "" : "disabled";
  return <button className="bttn" onClick={onSubClick} disabled = {disable}>
    Submit
    </button>;
}

function DeselectButton( {onResClick, count} ) {
  let disable = count !== 0 ? "" : "disabled";
  return <button className="bttn" onClick={onResClick} disabled = {disable}>
    Deselect
    </button>;
}
function Board(  ) {
  /*
   const [gameState, setGameState] = usestate(Array(16).fill({
    isActive: false,
    isEnabled: true
   }))
   */

  const [gameState, setGameState] = useState(Array(16).fill( {
    isActive: false,
    isEnabled: true,
    matchReason: ""
  }));
  
  const [activeCount, setActiveCount]= useState(0); 
   
  
  function handleClick(i) {
    const count = gameState.filter(buttonState => {return buttonState.isActive;}).length ;
    if(count>=4 && gameState[i].isActive === false) { 
      return;
    } else {
      //let nextActive = JSON.parse(JSON.stringify(gameState));
      let nextActive = gameState.map(a => structuredClone(a));
      nextActive[i].isActive = !gameState[i].isActive;
      setGameState(nextActive);
      console.log(nextActive);
      const newCount = nextActive.filter(buttonState => {return buttonState.isActive;}).length;
      console.log(newCount)
      disableSubButton(newCount);
    }
  }


  function checkMatch() {
    const trueIndex = getTrueIndex()
    setActiveCount(0);
    for(let i=0; i<matches.length; i++) {
      const [a, b, c, d] = matches[i];
      if (trueIndex[0] === a && trueIndex[1] === b && trueIndex[2] === c && trueIndex[3] === d) {
        let nextEnabled = gameState.map(old => structuredClone(old))
        let winningCombo = matches[i]
        for(let j=0; j<winningCombo.length; j++) {
          let position = winningCombo[j];
          nextEnabled[position].isActive = false;
          nextEnabled[position].isEnabled = false;
        }
          setGameState(nextEnabled); 
        break;
      } else if(i === matches.length-1) {
        alert("Not a match!");
        deselect();
      }
    }
  }

  function disableSubButton(count) { 
    setActiveCount(count);
  }

  function deselect() {
    let clearState = gameState.map(old => structuredClone(old));
    clearState.map((item) => item.isActive = false)
    setGameState(clearState)
    setActiveCount(0)
  }

  function getTrueIndex() {
    let trueArray = []
    for( let i=0; i<gameState.length; i++) {  
      if (gameState[i].isActive === true) {
        trueArray.push(i);
      }
    }
    return trueArray;
  }
  
  return (
    <>
   <div className="board-game">
      <div className = "board-row">
        <Square value={names[0]} buttonState={gameState[0]} onSquareClick={() => handleClick(0)} />
        <Square value={names[1]} buttonState={gameState[1]} onSquareClick={() => handleClick(1)} />
        <Square value={names[2]} buttonState={gameState[2]} onSquareClick={() => handleClick(2)} />
        <Square value={names[3]} buttonState={gameState[3]} onSquareClick={() => handleClick(3)} />
      </div>
      <div className = "board-row">
        <Square value={names[4]} buttonState={gameState[4]} onSquareClick={() => handleClick(4)} />
        <Square value={names[5]} buttonState={gameState[5]} onSquareClick={() => handleClick(5)} />
        <Square value={names[6]} buttonState={gameState[6]} onSquareClick={() => handleClick(6)} />
        <Square value={names[7]} buttonState={gameState[7]} onSquareClick={() => handleClick(7)} />
      </div>
      <div className = "board-row">
        <Square value={names[8]} buttonState={gameState[8]} onSquareClick={() => handleClick(8)} />
        <Square value={names[9]} buttonState={gameState[9]} onSquareClick={() => handleClick(9)} />
        <Square value={names[10]} buttonState={gameState[10]} onSquareClick={() => handleClick(10)} />
        <Square value={names[11]} buttonState={gameState[11]} onSquareClick={() => handleClick(11)} />
      </div>
      <div className = "board-row center">
        <Square value={names[12]} buttonState={gameState[12]} onSquareClick={() => handleClick(12)} />
        <Square value={names[13]} buttonState={gameState[13]} onSquareClick={() => handleClick(13)} />
        <Square value={names[14]} buttonState={gameState[14]} onSquareClick={() => handleClick(14)} />
        <Square value={names[15]} buttonState={gameState[15]} onSquareClick={() => handleClick(15)} />
      </div>
      <div className = "board-row">
        <SubmitButton count={activeCount} onSubClick={() => checkMatch()}/>
        <DeselectButton count={activeCount} onResClick = {() => deselect()}/>
      </div>
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
