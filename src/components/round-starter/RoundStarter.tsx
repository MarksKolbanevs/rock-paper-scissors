import { useContext, useEffect, useState } from "react";
import GameChip, { ChipType } from "../game-chip/GameChip";
import "./index.scss";
import { GameContext } from "../../App";


export default function RoundStarter(){
    const {pickedChip, setPickedChip,setScore,score } = useContext(GameContext);
    const [computerPickedChip, setComputerPickedChip] = useState<ChipType>(null);
    const [winner,setWinner] = useState("");

    useEffect(() => {
        startRound();
    },[]);
    
    const startRound = () =>{
        const options = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * options.length);
        const pickedComputerChip = options[randomIndex]; // Local variable that runs in this render

        setComputerPickedChip(pickedComputerChip as ChipType);

        if (pickedChip === pickedComputerChip) {
            return setWinner("tie");
        } else if (
            (pickedChip === 'rock' && (pickedComputerChip === 'scissors' || pickedComputerChip === 'lizard')) ||
            (pickedChip === 'paper' && (pickedComputerChip === 'rock' || pickedComputerChip === 'spock')) ||
            (pickedChip === 'scissors' && (pickedComputerChip === 'paper' || pickedComputerChip === 'lizard')) ||
            (pickedChip === 'spock' && (pickedComputerChip === 'rock' || pickedComputerChip === 'scissors')) ||
            (pickedChip === 'lizard' && (pickedComputerChip === 'spock' || pickedComputerChip === 'paper'))
        ) {
            return setWinner("user");
        } else {
            return setWinner("computer");
        }
    }
    
    const startNewRoundOrResetGame = () =>{
        switch (winner) {
            case "user":
                setPickedChip(null);
                setScore(score + 1);
                break;
            case "computer":
                setPickedChip(null);
                setScore(0);
              break;
            case "tie":
                setPickedChip(null);
                break;
        }
    }

    return (
        <div className="round-starter">
            <div className="round-starter-item">
                <h1>YOU PICKED</h1>
                {winner === "user" ? <GameChip type={pickedChip} activated/> : <GameChip type={pickedChip}/>}
            </div>
            {/* Start new game that will be showed on big screens */}
            {winner.length > 0 ?
                <div className={winner.length > 0 ? "play-again-container hide-on-small-screen" : "play-again-container hide-on-small-screen"}>
                    {winner === "computer" ? <h1>YOU LOSE</h1> : winner === "user" ? <h1>YOU WIN</h1> : (<h1>TIE</h1>)}
                    <button className="play-again__button" onClick={startNewRoundOrResetGame}>PLAY AGAIN</button>
                </div>
            :null} 
            <div className="round-starter-item">
                <h1>THE HOUSE PICKED</h1>
                {winner === "computer" ? <GameChip type={computerPickedChip} activated/> : <GameChip type={computerPickedChip}/>}  
            </div>
            {/* Start new game that will be showed on small screens */}
            {winner.length > 0 ?
            <div className="play-again-container show-on-small-screen span-2">
                {winner === "computer" ? <h1>YOU LOSE</h1> : winner === "user" ? <h1>YOU WIN</h1> : (<h1>TIE</h1>)}
                <button className="play-again__button" onClick={startNewRoundOrResetGame}>PLAY AGAIN</button>
            </div>
            :null}
        </div>
    )
}