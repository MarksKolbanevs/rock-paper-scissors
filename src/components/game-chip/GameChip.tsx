import React from "react";
import "./index.scss";

const types = {
    rock:{
        photoPath:"./assets/icon-rock.svg",
        borderGradient:"hsl(349, 71%, 52%), hsl(349, 70%, 56%)",
        dropShadow:"1px 10px 0px -1px #9D1334"
    },
    paper:{
        photoPath:"./assets/icon-paper.svg",
        borderGradient:"hsl(230, 89%, 62%),hsl(230, 89%, 65%)",
        dropShadow:"1px 10px 0px -1px #2B44C3"
    },
    scissors:{
        photoPath:"./assets/icon-scissors.svg",
        borderGradient:"hsl(39, 89%, 49%),hsl(40, 84%, 53%)",
        dropShadow:"1px 10px 0px -1px #C66F10"
    },
    spock:{
        "photoPath":"./assets/icon-spock.svg",
        borderGradient:"hsl(189, 59%, 53%),hsl(189, 59%, 53%)",
        dropShadow:"1px 10px 0px -1px #288BA8"
    },
    lizard:{
        "photoPath":"./assets/icon-lizard.svg",
        borderGradient:"hsl(261, 73%, 60%), hsl(261, 72%, 63%)",
        dropShadow:"1px 10px 0px -1px #5D32A6"
    }
}

export type ChipType = "rock" | "paper" | "scissors" | "lizard" | "spock" | null;

export default function GameChip(props:{type:ChipType,activated?:boolean,onClick?:() => void}){
    return(
        <React.Fragment>
        {props.type !== null ? 
            <div className={props.activated ? "game-chip-outer activated" : "game-chip-outer"} onClick = {props.onClick} style={{boxShadow:types[props.type].dropShadow,background:`linear-gradient(${types[props.type].borderGradient})`}}>
                <div className="game-chip-inner">
                      <img src={types[props.type].photoPath}/> 
                </div>
            </div>
        : null}   
        </React.Fragment>
    );
}