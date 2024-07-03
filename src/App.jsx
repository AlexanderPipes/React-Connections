import { act, useState } from 'react';

const initialButtonState = [
  {
    buttonName: "Blue",
    isActive: false,
    isEnabled: true,
    matchReason: "Colors",
    buttonID: 1
  },
  {
    buttonName: "Red",
    isActive: false,
    isEnabled: true,
    matchReason: "Colors",
    buttonID: 2
  },
  {
    buttonName: "Green",
    isActive: false,
    isEnabled: true,
    matchReason: "Colors",
    buttonID: 3
  },
  {
    buttonName: "Yellow",
    isActive: false,
    isEnabled: true,
    matchReason: "Colors",
    buttonID: 4
  },
  {
    buttonName: "1",
    isActive: false,
    isEnabled: true,
    matchReason: "Numbers",
    buttonID: 5
  },
  {
    buttonName: "2",
    isActive: false,
    isEnabled: true,
    matchReason: "Numbers",
    buttonID: 6
  },
  {
    buttonName: "3",
    isActive: false,
    isEnabled: true,
    matchReason: "Numbers",
    buttonID: 7
  },
  {
    buttonName: "4",
    isActive: false,
    isEnabled: true,
    matchReason: "Numbers",
    buttonID: 8
  },
  {
    buttonName: "A",
    isActive: false,
    isEnabled: true,
    matchReason: "Letters",
    buttonID: 9
  },
  {
    buttonName: "B",
    isActive: false,
    isEnabled: true,
    matchReason: "Letters",
    buttonID: 10
  },
  {
    buttonName: "C",
    isActive: false,
    isEnabled: true,
    matchReason: "Letters",
    buttonID: 11
  },
  {
    buttonName: "D",
    isActive: false,
    isEnabled: true,
    matchReason: "Letters",
    buttonID: 12
  },
  {
    buttonName: "Happy",
    isActive: false,
    isEnabled: true,
    matchReason: "That ain't falco",
    buttonID: 13
  },
  {
    buttonName: "Feet",
    isActive: false,
    isEnabled: true,
    matchReason: "That ain't falco",
    buttonID: 14
  },
  {
    buttonName: "Wombo",
    isActive: false,
    isEnabled: true,
    matchReason: "That ain't falco",
    buttonID: 15
  },
  {
    buttonName: "Combo",
    isActive: false,
    isEnabled: true,
    matchReason: "That ain't falco",
    buttonID: 16
  },
]

// when button is enabled is false I want the class to = inactive square disable
function Square({ onSquareClick, buttonState }) {
  let classStr = buttonState.isActive ? "active square" : "inactive square";
  let disable = buttonState.isEnabled ? "" : "disabled";;
  return <button className={classStr} onClick={onSquareClick} disabled={disable}>
    {buttonState.buttonName}
  </button>;
}

function SubmitButton({ onSubClick, activeButtons }) {
  let disable = activeButtons.length === 4 ? "" : "disabled";
  return <button className="bttn" onClick={onSubClick} disabled={disable}>
    Submit
  </button>;
}

function DeselectButton({ onResClick, activeButtons }) {
  let disable = activeButtons.length !== 0 ? "" : "disabled";
  return <button className="bttn" onClick={onResClick} disabled={disable}>
    Deselect
  </button>;
}

function ShuffleButton({ onShufClick, activeButtons }) {
 
  return <button className="bttn" onClick={onShufClick} >
    Shuffle
  </button>;
}

function Board() {
  const [gameState, setGameState] = useState(initialButtonState);


  function handleClick(i) {
    const count = gameState.filter(buttonState => { return buttonState.isActive; }).length;
    if (count >= 4 && gameState[i].isActive === false) {
      return;
    } else {
      //let nextActive = JSON.parse(JSON.stringify(gameState));
      let nextActive = gameState.map(a => structuredClone(a));
      nextActive[i].isActive = !gameState[i].isActive;
      setGameState(nextActive);
      console.log(nextActive);
      console.log(gameState);
    }
  }


  function checkMatch() {
    let nextEnabled = gameState.map(old => structuredClone(old));
    let activeArray = gameState.filter(item => item.isActive);
    for (let i = 0; i < nextEnabled.length; i++) {
      if (activeArray[0].matchReason !== activeArray[1].matchReason || activeArray[1].matchReason !== activeArray[2].matchReason ||
        activeArray[2].matchReason !== activeArray[3].matchReason) {
        console.log("not a match");
        deselect();ewf
        return;
      }
    }
    let trueIndex = getTrueIndex();
    for (let j = 0; j < trueIndex.length; j++) {
      let position = trueIndex[j];
      nextEnabled[position].isActive = false;
      nextEnabled[position].isEnabled = false;
    }
    setGameState(nextEnabled);
  }

  function deselect() {
    let clearState = gameState.map(old => structuredClone(old));
    clearState.map((item) => item.isActive = false)
    setGameState(clearState)
  }

  function getTrueIndex() {
    let trueArray = []
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i].isActive === true) {
        trueArray.push(i);
      }
    }
    return trueArray;
  }

  function shuffle() {
    //get the gameState objects
    //copy the entire gameState and set to shuffledArray variable
    //shuffle the entire array so that each button has a new index
    let shuffledArray = gameState.map(old => structuredClone(old));
    console.log(shuffledArray);
    let currentIndex = shuffledArray.length;
    console.log(currentIndex);
    while(currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffledArray[currentIndex],shuffledArray[randomIndex]] = [shuffledArray[randomIndex],shuffledArray[currentIndex]]
      
    }
    console.log(shuffledArray);
    setGameState(shuffledArray);
  }
  return (
    <div className="wrapper">
    <div className="board-game">
      <div className="board">
      {/* - todo: find a better way to display one box instea of the 4 disabled boxes. *
          - if all the squares with the same match reason are disabled print 1 disabled button that dispalys the match reason
          - write a function that checks each match reason to see if false and return a div that displays the match reason
       */}
      {gameState.map((square, index) => {
        if (square.isEnabled === false) {
            return (<Square
              key={index}
              buttonState={square}
              onSquareClick={() => handleClick(index)}
            />)
        }
      })}

      {gameState.map((square, index) => {
        if (square.isEnabled === true) {
            return (<Square
              key={index}
              buttonState={square}
              onSquareClick={() => handleClick(index)}
            />)
        }
      })}
      </div>
      <div className="bttn-row">
        <SubmitButton
          activeButtons={gameState.filter((item) => item.isActive)}
          onSubClick={() => checkMatch()}
        />
        <DeselectButton
          activeButtons={gameState.filter((item) => item.isActive)}
          onResClick={() => deselect()}
        />
        <ShuffleButton
          activeButtons={gameState.filter((item) => item.isActive)}
          onShufClick={() => shuffle()}
        />        
      </div>
    </div>
    </div>
  );
}

export default function Game() {

  return (
    <>
      <div>
        <Board />
      </div>
    </>
  )
}
