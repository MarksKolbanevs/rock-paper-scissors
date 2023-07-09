import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import "./index.scss";
import GameChipSelector from "./components/game-chip-selector/GameChipSelector";
import RoundStarter from "./components/round-starter/RoundStarter";
import { ChipType } from "./components/game-chip/GameChip";

interface GameContextData {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  pickedChip:ChipType;
  setPickedChip:Dispatch<SetStateAction<ChipType>>;
  currentGameMode:"normal" | "advanced";
  setCurrentGameMode:Dispatch<SetStateAction<"normal" | "advanced">>;
}

// Create a context for your provider
export const GameContext = createContext<GameContextData>({} as GameContextData);

function App() {
  const [rulesOpened,setRulesOpened] = useState(false);
  
  const [score,setScore] = useState(0);
  const [pickedChip, setPickedChip] = useState<ChipType>(null); // Update the initial value and type
  const [currentGameMode, setCurrentGameMode] = useState<"normal" | "advanced">("normal")
  
  const openCloseRules = () =>{
    setRulesOpened(!rulesOpened);
  }

  const changeGameMode = () => {
    if(currentGameMode === "normal"){
      setCurrentGameMode("advanced");
    } else if (currentGameMode === "advanced") {
      setCurrentGameMode("normal");
    }
  }
  return (
    <GameContext.Provider value={{score,setScore,pickedChip,setPickedChip,currentGameMode,setCurrentGameMode}}>
      <div className="App">
        <section>
          <header>
            <img src="./assets/logo.svg"/>
            <div className="score-container">
              <h3 className="score-text">SCORE</h3>
              <h1 className="score-point">{score}</h1>
            </div>
          </header>
          {pickedChip === null ? 
            <GameChipSelector/>
          : 
            <RoundStarter/>
          }
        </section>
        {/* Rules container */}
        <div className="actions-container">
          <button className="mode-change__button" onClick={changeGameMode}>{currentGameMode === "normal" ? "ADVANCED" : "NORMAL"}</button>
          <button className="rules__button" onClick={openCloseRules}>RULES</button> 
        </div>
        <div className="rules-absolute-container" style={rulesOpened ? {"display":"flex"} : {"display":"none"}}>
          <div className="rules-container">
            <header>
              <h1>RULES</h1>
              {/* This close rules button will hide on small screen */}
              <button className="hide-on-small-screen" onClick={openCloseRules}>
                <img src="./assets/icon-close.svg"/>
              </button>
            </header>
            {currentGameMode === "normal" ?  <img src="./assets/image-rules.svg"/> : <img src="./assets/image-rules-bonus.svg"/>}
            {/* This close rules button will be showed on small screen */}
            <footer className="show-on-small-screen">
              <button  onClick={openCloseRules}>
                <img src="./assets/icon-close.svg"/>
              </button>
            </footer>
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
