import { useContext, useState } from "react";
import GameChip from "../game-chip/GameChip";
import "./index.scss";
import { GameContext } from "../../App";

export default function GameChipSelector() {
  const { pickedChip, setPickedChip,currentGameMode } = useContext(GameContext);

  const gameOver = () => {
    setPickedChip(null); // Refreshing selected chip
  }

  return (
    <div className="game-chip-selector">
      {currentGameMode === "normal" ?
        <div id="normal">
          <GameChip type="paper" onClick = {() => setPickedChip("paper")}/>
          <GameChip type="scissors" onClick = {() => setPickedChip("scissors")}/>
          <div className="span-2">
            <GameChip type="rock" onClick = {() => setPickedChip("rock")}/>
          </div>
        </div>
          : 
        <div id="advanced">
          <div className="span-2">
            <GameChip type="scissors" onClick = {() => setPickedChip("scissors")}/>
          </div>
          <div className="second-layer">
            <GameChip type="spock" onClick = {() => setPickedChip("spock")}/>
            <GameChip type="paper" onClick = {() => setPickedChip("paper")}/>
          </div>
          <div className="third-layer">
            <GameChip type="lizard" onClick = {() => setPickedChip("lizard")}/>
            <GameChip type="rock" onClick = {() => setPickedChip("rock")}/>
          </div>
        </div>
      }
    </div>
  );
}
