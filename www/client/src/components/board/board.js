import React, { Component } from "react";
import "./board.css";
import "./boardCards.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import API from '../../utils/API';
import { isUndefined } from "util";
import GameOver from '../gameOver/gameOver'


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
* Moves an item from one list to another list. this function is working as expected
*/

const move = (source, destination, droppableSource, droppableDestination) => {

    const sourceClone = Array.from(source);

    const destClone = Array.from(destination);


    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
};

class GameBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerAChamp: this.props.p2champ,
            playerAHand: this.props.p2deck,
            playerAField: [],
            playerAGraveyard: [],
            playerBChamp: this.props.p1champ,
            playerBHand: this.props.p1deck,
            playerBField: [],
            playerBGraveyard: [],
            playerATurn: false,
            playerBturn: true,
            playerAMana: 20,
            playerBMana: 20,
            aMaxMana: 20,
            bMaxMana: 20,
            player1name: this.props.p1name,
            player2name: this.props.p2name,
            currentPlayerTurn: this.props.p1name,
            isAttacked: false,
            isKilled: false
        }


        this.id2List = {
            playerHandA: 'playerAHand',
            fieldA: 'playerAField',
            playerHandB: 'playerBHand',
            fieldB: 'playerBField',
        };
    }

    componentDidMount = () => {
        // var audio = new Audio('./sounds/attack.mp3');
        // audio.play();
        API.joinGame(updates => {
            console.log(updates);
            console.log(this.state)
            if(this.state.currentPlayerTurn !== updates.currentPlayerTurn){
                window.changeTurn()
                let modal = document.getElementById("myModal");
                setTimeout(function(){ modal.style.display = "block";}, 300);
                setTimeout(function(){ modal.style.display = "none"; }, 2500);
            }
            if (updates.playerDisconnected === true){
                let modal = document.getElementById("myModalQuit");
                setTimeout(function(){ modal.style.display = "block";}, 300);
                
                setTimeout(function(){window.location.reload()}, 3000)
            }

            if (updates.playerAField && updates.playerAField.length > 0 && this.state.playerAField.length > 0 && updates.playerAField.length === this.state.playerAField.length && this.state.currentPlayerTurn === updates.currentPlayerTurn){
                
                for (let i = 0; i < updates.playerAField.length; i++){
                    
                    let attackACard = false
                    if (this.state.playerAField[i].Health !== updates.playerAField[i].Health){
                        attackACard = true
                    }
                    if (attackACard){
                        
                        window.attack()
                    }
                
                }}

                
                if (updates.playerBField && updates.playerBField.length > 0 && this.state.playerBField.length > 0 && updates.playerBField.length === this.state.playerBField.length && this.state.currentPlayerTurn === updates.currentPlayerTurn) {
                
                
                for (let i = 0; i < updates.playerBField.length; i++){
                    
                    let attackACard = false
                    if (this.state.playerBField[i].Health !== updates.playerBField[i].Health){
                        attackACard = true
                    }
                    if (attackACard){
                        
                        window.attack()
                    }
                }
                }
            
            if (updates.player1 && updates.player2) {
                
                if (updates.playerAField && updates.playerAField.length > this.state.playerAField.length  || updates.playerBField && updates.playerBField.length > this.state.playerBField.length){
                    
                    window.playCard1()
                    
                }
                if (updates.playerAField && updates.playerAField.length < this.state.playerAField.length  || updates.playerBField && updates.playerBField.length < this.state.playerBField.length){
                    
                    window.death()
                  
                }

                if (updates.playerAChamp && updates.playerAChamp !== this.state.playerAChamp  || updates.playerBChamp && updates.playerBChamp !== this.state.playerBChamp){
                    
                    //seems like other sounds are getting triggered
                    window.championAttack()
                  
                }
                
                if (updates.playerAMana === 0) {
                    this.setState({
                        playerAChamp: updates.playerAChamp || this.state.playerAChamp,
                        playerAHand: updates.playerAHand || this.state.playerAHand,
                        playerAField: updates.playerAField || this.state.playerAField,
                        playerAGraveyard: updates.playerAGraveyard || this.state.playerAGraveyard,
                        playerBChamp: updates.playerBChamp || this.state.playerBChamp,
                        playerBHand: updates.playerBHand || this.state.playerBHand,
                        playerBField: updates.playerBField || this.state.playerBField,
                        playerBGraveyard: updates.playerBGraveyard || this.state.playerBGraveyard,
                        playerATurn: this.state.playerATurn,
                        playerBturn: this.state.playerBturn,
                        playerAMana: updates.playerAMana, 
                        playerBMana: updates.playerBMana || this.state.playerBMana,
                        aMaxMana: updates.aMaxMana || this.state.aMaxMana,
                        bMaxMana: updates.bMaxMana || this.state.bMaxMana,
                        currentPlayerTurn: updates.currentPlayerTurn || this.props.p1name
                    }
                    )
                } else if (updates.playerBMana === 0) {
                    this.setState({
                        playerAChamp: updates.playerAChamp || this.state.playerAChamp,
                        playerAHand: updates.playerAHand || this.state.playerAHand,
                        playerAField: updates.playerAField || this.state.playerAField,
                        playerAGraveyard: updates.playerAGraveyard || this.state.playerAGraveyard,
                        playerBChamp: updates.playerBChamp || this.state.playerBChamp,
                        playerBHand: updates.playerBHand || this.state.playerBHand,
                        playerBField: updates.playerBField || this.state.playerBField,
                        playerBGraveyard: updates.playerBGraveyard || this.state.playerBGraveyard,
                        playerATurn: this.state.playerATurn,
                        playerBturn: this.state.playerBturn,
                        playerAMana: updates.playerAMana || this.state.playerAMana,
                        playerBMana: updates.playerBMana,
                        aMaxMana: updates.aMaxMana || this.state.aMaxMana,
                        bMaxMana: updates.bMaxMana || this.state.bMaxMana,
                        currentPlayerTurn: updates.currentPlayerTurn || this.props.p1name
                    }
                    )
                } else if (updates.playerATurn || updates.playerBturn) {
                    this.setState({
                        playerAChamp: updates.playerAChamp || this.state.playerAChamp,
                        playerAHand: updates.playerAHand || this.state.playerAHand,
                        playerAField: updates.playerAField || this.state.playerAField,
                        playerAGraveyard: updates.playerAGraveyard || this.state.playerAGraveyard,
                        playerBChamp: updates.playerBChamp || this.state.playerBChamp,
                        playerBHand: updates.playerBHand || this.state.playerBHand,
                        playerBField: updates.playerBField || this.state.playerBField,
                        playerBGraveyard: updates.playerBGraveyard || this.state.playerBGraveyard,
                        playerATurn: updates.playerATurn,
                        playerBturn: updates.playerBturn,
                        playerAMana: updates.playerAMana || this.state.playerAMana,
                        playerBMana: updates.playerBMana || this.state.playerBMana,
                        aMaxMana: updates.aMaxMana || this.state.aMaxMana,
                        bMaxMana: updates.bMaxMana || this.state.bMaxMana,
                        currentPlayerTurn: updates.currentPlayerTurn || this.props.p1name
                    }
                    )
                } else {
                    this.setState({
                        playerAChamp: updates.playerAChamp || this.state.playerAChamp,
                        playerAHand: updates.playerAHand || this.state.playerAHand,
                        playerAField: updates.playerAField || this.state.playerAField,
                        playerAGraveyard: updates.playerAGraveyard || this.state.playerAGraveyard,
                        playerBChamp: updates.playerBChamp || this.state.playerBChamp,
                        playerBHand: updates.playerBHand || this.state.playerBHand,
                        playerBField: updates.playerBField || this.state.playerBField,
                        playerBGraveyard: updates.playerBGraveyard || this.state.playerBGraveyard,
                        playerATurn: this.state.playerATurn,
                        playerBturn: this.state.playerBturn,
                        playerAMana: updates.playerAMana || this.state.playerAMana,
                        playerBMana: updates.playerBMana || this.state.playerBMana,
                        aMaxMana: updates.aMaxMana || this.state.aMaxMana,
                        bMaxMana: updates.bMaxMana || this.state.bMaxMana,
                        currentPlayerTurn: updates.currentPlayerTurn || this.props.p1name
                    }
                    )
                }
                
            }
        })
    }

    changeATurn = () => {

        if (this.state.playerATurn === false) {
            return
        } else {
            let currentAMaxMana = this.state.aMaxMana
            let newMana;
            let modal = document.getElementById("myModal");
            if (currentAMaxMana <= 45) {
                currentAMaxMana += 5;
                newMana = currentAMaxMana
                API.changeAsTurn(currentAMaxMana, newMana, this.state.player1name)
            }
            else {
                currentAMaxMana = 50;
                newMana = currentAMaxMana;
                API.changeAsTurn(currentAMaxMana, newMana, this.state.player1name)
            }
            
        }
    }

    changeBTurn = () => {

        if (this.state.playerBturn === false) {
            return
        } else {
            let currentBMaxMana = this.state.bMaxMana
            let newMana;
            
            if (currentBMaxMana <= 45) {
                currentBMaxMana += 5
                newMana = currentBMaxMana;
                API.changeBsTurn(currentBMaxMana, newMana, this.state.player2name);
            }
            else {
                currentBMaxMana = 50;
                newMana = currentBMaxMana;
                API.changeBsTurn(currentBMaxMana, newMana, this.state.player2name)
            }
            
        }
    }

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;
        

        // dropped outside the list
        if (!destination) {
            
            return;
        }
        if (source.droppableId > 0 && destination.droppableId === "fieldA") {
            return
        }
        if (source.droppableId > 0 && destination.droppableId === "fieldB") {
            return
        }
        if (source.droppableId === "fieldB" && destination.droppableId === "fieldB") {
            return
        }


        //playing a card for top player
        if (source.droppableId === "playerHandA" && destination.droppableId === "fieldA" && this.state.playerATurn === true) {
            let currentMana = this.state.playerAMana;
            if (currentMana >= 10) {
                const result = move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );
                currentMana -= 10;
                let playerAField = result.fieldA
                let playerAHand = result.playerHandA
                let playerAMana = currentMana
                
               
                API.playAHand(playerAField, playerAHand, playerAMana)
            } else {
                
                let modal = document.getElementById("myModalManaPlay");
                setTimeout(function(){ modal.style.display = "block";}, 300);
                setTimeout(function(){ modal.style.display = "none"; }, 2500);
            }
            
        }
        //playing a card for bottom player
        if (source.droppableId === "playerHandB" && destination.droppableId === "fieldB" && this.state.playerBturn === true) {
            let currentMana = this.state.playerBMana;
            if (currentMana >= 10) {
                const result = move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );
                currentMana -= 10;
                let playerBField = result.fieldB
                let playerBHand = result.playerHandB
                let playerBMana = currentMana
                let name = this.state.player1name
                
                
                API.playBHand(playerBField, playerBHand, playerBMana, name)
                
            } else {
                
                let modal = document.getElementById("myModalManaPlay");
                setTimeout(function(){ modal.style.display = "block";}, 300);
                setTimeout(function(){ modal.style.display = "none"; }, 2500);
            }
        }
        //attacking player A Champion

        if (source.droppableId !== "playerHandB" && destination.droppableId === "playerChampionA") {

            if (this.state.playerBturn) {
                
                var playerBField = this.state.playerBField;
                var playerBMana = this.state.playerBMana;
                var playerAChampion = this.state.playerAChamp;
                var playerBGraveyard = this.state.playerBGraveyard
                var attackingCardIndex;
                var defendingCardIndex = 0;

                if (playerBMana >= 9) {
                    for (var i = 0; i < playerBField.length; i++) {
                        if (playerBField[i].id === result.source.droppableId) {
                            attackingCardIndex = i
                        }
                    }
                    if (attackingCardIndex === undefined) {
                       
                        return
                    } else {

                        

                        var attackingCardType = playerBField[attackingCardIndex].TypeText;
                        var defendingCardWeakness = playerAChampion[defendingCardIndex].WeakAgainstText;
                        var defendingCardStrength = playerAChampion[defendingCardIndex].StrongAgainstText;

                        

                        if (attackingCardType === defendingCardWeakness) {
                            playerAChampion[0].Health -= 10;
                            playerBMana -= 9;
                        } else if (attackingCardType === defendingCardStrength) {
                            playerAChampion[0].Health -= 3;
                            playerBField[attackingCardIndex].Health -= 3;
                            playerBMana -= 9;
                        } else {
                            playerAChampion[0].Health -= 6;
                            playerBMana -= 9;
                        }

                        if (playerBField[attackingCardIndex].Health <= 0) {
                            var removedBCard = playerBField.splice(attackingCardIndex, 1);
                            playerBGraveyard.push(removedBCard);
                        }
                        window.attack()
                        API.attackAChampion(playerAChampion, playerBField, playerBMana, playerBGraveyard)
                    }
                } else {
                    //not enough mana
                    let modal = document.getElementById("myModalManaAttack");
                    setTimeout(function(){ modal.style.display = "block";}, 300);
                    setTimeout(function(){ modal.style.display = "none"; }, 2500);
                }
            }

        }

        //attacking playerB Champ

        if (source.droppableId !== "playerHandA" && destination.droppableId === "playerChampionB") {

            if (this.state.playerATurn) {
                
                var playerAField = this.state.playerAField;
                var playerAMana = this.state.playerAMana;
                var playerBChampion = this.state.playerBChamp;
                var playerAGraveyard = this.state.playerAGraveyard
                var attackingCardIndex;
                var defendingCardIndex = 0;

                if (playerAMana >= 9) {
                    for (var i = 0; i < playerAField.length; i++) {
                        if (playerAField[i].id === result.source.droppableId) {
                            attackingCardIndex = i
                        }
                    }
                    if (attackingCardIndex === undefined) {
                       
                        return
                    } else {
                        

                        var attackingCardType = playerAField[attackingCardIndex].TypeText;
                        var defendingCardWeakness = playerBChampion[defendingCardIndex].WeakAgainstText;
                        var defendingCardStrength = playerBChampion[defendingCardIndex].StrongAgainstText;

                       

                        if (attackingCardType === defendingCardWeakness) {
                            playerBChampion[0].Health -= 10;
                            playerAMana -= 9;
                        } else if (attackingCardType === defendingCardStrength) {
                            playerBChampion[0].Health -= 3;
                            playerAField[attackingCardIndex].Health -= 3;
                            playerAMana -= 9;
                        } else {
                            playerBChampion[0].Health -= 6;
                            playerAMana -= 9;
                        }

                        if (playerAField[attackingCardIndex].Health <= 0) {
                            var removedACard = playerAField.splice(attackingCardIndex, 1);
                            playerAGraveyard.push(removedACard);
                        }
                        window.attack()
                        API.attackBChampion(playerBChampion, playerAField, playerAMana, playerAGraveyard)
                    }
                } else {
                    //some popup saying you do not have enough mana
                    let modal = document.getElementById("myModalManaAttack");
                    setTimeout(function(){ modal.style.display = "block";}, 300);
                    setTimeout(function(){ modal.style.display = "none"; }, 2500);
                }

            }
        }
        //attacking a minion
        if (destination.droppableId !== "playerChampionA" && destination.droppableId !== "playerChampionB" && source.droppableId !== "fieldA" && source.droppableId !== "fieldB" && source.droppableId !== "playerHandA" && source.droppableId !== "playerHandB") {
            
            if (this.state.playerATurn) {
                var playerAField = this.state.playerAField;
                var playerBField = this.state.playerBField;
                var playerAMana = this.state.playerAMana;
                var playerBGraveyard = this.state.playerBGraveyard;
                var playerAGraveyard = this.state.playerAGraveyard;
                var attackingCardIndex;
                var defendingCardIndex;

                if (playerAMana >= 9) {

                    for (var i = 0; i < playerAField.length; i++) {
                        if (playerAField[i].id === result.source.droppableId) {
                            attackingCardIndex = i
                        }
                    }
                    for (var j = 0; j < playerBField.length; j++) {
                        if (playerBField[j].id === result.destination.droppableId) {
                            defendingCardIndex = j
                        }
                    }
                    

                    if (defendingCardIndex === undefined) {
                        
                        return
                    } else if (attackingCardIndex === undefined) {
                       

                    } else {

                        var attackingCardType = playerAField[attackingCardIndex].TypeText;
                        var defendingCardWeakness = playerBField[defendingCardIndex].WeakAgainst;
                        var defendingCardStrength = playerBField[defendingCardIndex].StrongAgainst;
                        

                        if (attackingCardType === defendingCardWeakness) {
                            playerBField[defendingCardIndex].Health -= 10;
                            playerAMana -= 9;
                        } else if (attackingCardType === defendingCardStrength) {
                            playerBField[defendingCardIndex].Health -= 3;
                            playerAField[attackingCardIndex].Health -= 3;
                            playerAMana -= 9;
                        } else {
                            playerBField[defendingCardIndex].Health -= 6;
                            playerAMana -= 9;
                        }

                        if (playerBField[defendingCardIndex].Health <= 0) {
                            var removedBCard = playerBField.splice(defendingCardIndex, 1);
                            playerBGraveyard.push(removedBCard);
                        }

                        if (playerAField[attackingCardIndex].Health <= 0) {
                            var removedACard = playerAField.splice(attackingCardIndex, 1);
                            playerAGraveyard.push(removedACard);
                        }

                        window.attack()
                        API.attackBMinion(playerAField, playerBField, playerAMana, playerBGraveyard, playerAGraveyard)

                    }
                }
                else {
                    //add some modal to say out of mana
                    
                    let modal = document.getElementById("myModalManaAttack");
                    setTimeout(function(){ modal.style.display = "block";}, 300);
                    setTimeout(function(){ modal.style.display = "none"; }, 2500);
                }
            }
            //player B's turn
            else {
                var playerAField = this.state.playerAField;
                var playerBField = this.state.playerBField;
                var playerBMana = this.state.playerBMana;
                var playerAGraveyard = this.state.playerAGraveyard;
                var playerBGraveyard = this.state.playerBGraveyard;
                var attackingCardIndex;
                var defendingCardIndex;

                if (playerBMana >= 9) {

                    for (var i = 0; i < playerBField.length; i++) {
                        if (playerBField[i].id === result.source.droppableId) {
                            attackingCardIndex = i
                        }
                    }
                    for (var j = 0; j < playerAField.length; j++) {
                        if (playerAField[j].id === result.destination.droppableId) {
                            defendingCardIndex = j
                        }
                    }
                    

                    if (defendingCardIndex === undefined) {
                        
                        return
                    } else if (attackingCardIndex === undefined) {
                       
                    }
                    else {

                        var attackingCardType = playerBField[attackingCardIndex].TypeText;
                        var defendingCardWeakness = playerAField[defendingCardIndex].WeakAgainst;
                        var defendingCardStrength = playerAField[defendingCardIndex].StrongAgainst;
                        

                        if (attackingCardType === defendingCardWeakness) {
                            playerAField[defendingCardIndex].Health -= 10;
                            playerBMana -= 9;
                        } else if (attackingCardType === defendingCardStrength) {
                            playerAField[defendingCardIndex].Health -= 3;
                            playerBField[attackingCardIndex].Health -= 3;
                            playerBMana -= 9;
                        } else {
                            playerAField[defendingCardIndex].Health -= 6;
                            playerBMana -= 9;
                        }

                        if (playerAField[defendingCardIndex].Health <= 0) {
                            var removedACard = playerAField.splice(defendingCardIndex, 1);
                            playerAGraveyard.push(removedACard);
                        }

                        if (playerBField[attackingCardIndex].Health <= 0) {
                            var removedBCard = playerBField.splice(attackingCardIndex, 1);
                            playerBGraveyard.push(removedBCard);
                        }

                        window.attack()
                        API.attackAMinion(playerBField, playerAField, playerBMana, playerAGraveyard, playerBGraveyard)
                        
                    }
                }
                else {
                    //add some modal to say out of mana
                    
                    let modal = document.getElementById("myModalManaAttack");
                    setTimeout(function(){ modal.style.display = "block";}, 300);
                    setTimeout(function(){ modal.style.display = "none"; }, 2500);
                }
            }
        }

    };

    render() {
        if (this.state.playerAChamp[0].Health <= 0 || (this.state.playerAField.length === 0 && this.state.playerAHand.length === 0)) {
            return (
                <GameOver value={this.state} winner={'playerB'} player1 ={this.state.player1name} player2 ={this.state.player2name}></GameOver>
            )
        } else if (this.state.playerBChamp[0].Health <= 0 || (this.state.playerBField.length === 0 && this.state.playerBHand.length === 0)) {
            return (
                <GameOver value={this.state} winner={'playerA'} player1 ={this.state.player1name} player2 ={this.state.player2name}></GameOver>
            )
        } else
            return (

                <DragDropContext onDragEnd={this.onDragEnd}>

                    <div className="outerContainer">

                        <div className="containerA">

                            <div className="rowA">

                                <div className="playerNameA">
                                    {this.state.player2name}
                                </div>

                                <div className="playerManaA">
                                    {this.state.playerAMana}
                                </div>

                                <div className="endTurnA" onClick={this.changeATurn}>
                                    End Turn
                                </div>

                                <Droppable droppableId="playerChampionA">
                                    {(provided) => (
                                        <div className="championA" ref={provided.innerRef}>
                                            {this.state.playerAChamp.map((champion) => (
                                                <div
                                                    className="playedChampionCard"
                                                    id={champion.id}
                                                    key={champion.id}
                                                >
                                                    <p className="playedChampionHealth">{champion.Health || 2}</p>
                                                    <img className="playedChampionWeakness" src={champion.WeakAgainst} alt="" width="42" height="1"></img>
                                                    <img className="playedChampionStrength" src={champion.StrongAgainst} alt="" width="5" height="1"></img>
                                                    <img className="playedChampionPortrait" src={champion.Img} alt=""></img>
                                                </div>

                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                <Droppable droppableId="playerHandA">
                                    {(provided) => (
                                        <div className="playerHandA" ref={provided.innerRef}>
                                            {this.state.playerAHand.map((minion, index) => (
                                                <Draggable
                                                    key={minion.id}
                                                    draggableId={minion.id}
                                                    index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="minionHandCardA"
                                                            id={minion.id}
                                                            key={minion.id}
                                                        >
                                                            <h3 className="MinionHandName">{minion.Name || "Minion"}</h3>
                                                            <p className="minionHandHealth">{minion.Health || 2}</p>

                                                            <div className="ability">
                                                                <span className="minionHandAttack1">{minion.Attack1Name || "Ability 1"}</span>
                                                                <span className="minionHandAttack1Power"><br></br>Dmg: {minion.Attack1Power}</span>
                                                                <span className="minionHandAttack1Cost">Cost: {minion.Attack1Cost}</span>
                                                            </div>

                                                            <img className="minionHandWeakness" src={minion.WeakAgainstImg} alt="" width="42" height="1"></img>
                                                            <img className="minionHandStrength" src={minion.StrongAgainstImg} alt="" width="5" height="1"></img>
                                                            <img className="minionHandPortrait" src={minion.Img} alt=""></img>

                                                        </div>


                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}

                                        </div>
                                    )
                                    }

                                </Droppable>
                            </div>
                            <Droppable droppableId="fieldA">
                                {(provided) => (
                                    <div className="fieldA" ref={provided.innerRef}>
                                        {this.state.playerAField.map((minion, index) => (
                                            <Droppable droppableId={minion.id} key={minion.id}>
                                                {(provided) => (
                                                    <div className="droppableMinion" ref={provided.innerRef} key={minion.id} >
                                                        <Draggable
                                                            key={minion.id}
                                                            draggableId={minion.id}
                                                            index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="minionFieldCardA"
                                                                    id={minion.id}
                                                                    key={minion.id}
                                                                >

                                                                    <div className="innerA">

                                                                        <p className="minionFieldHealth">{minion.Health || 2}</p>

                                                                        <div className="abilityField">
                                                                            <span className="minionFieldAttack1">{minion.Attack1Name || "Ability 1"}</span>
                                                                            <span className="minionFieldAttack1Power"><br></br>{minion.Attack1Power}</span>
                                                                            <span className="minionFieldAttack1Cost">{minion.Attack1Cost}</span>
                                                                        </div>

                                                                        <img className="minionFieldWeakness" src={minion.WeakAgainstImg} alt="" width="42" height="1"></img>
                                                                        <img className="minionFieldStrength" src={minion.StrongAgainstImg} alt="" width="5" height="1"></img>
                                                                        <img className="minionFieldPortrait" src={minion.Img} alt=""></img>
                                                                    </div>

                                                                </div>


                                                            )}
                                                        </Draggable>
                                                        {provided.placeholder}
                                                    </div>

                                                )}
                                            </Droppable>
                                        ))}
                                        {provided.placeholder}

                                    </div>
                                )
                                }
                            </Droppable>

                        </div>

                        {/* --------------------------------------------------Turn Popup-------------------------------------------------------*/}
                        <div id="myModal" class="modal">

                            <div class="modal-content">
                                <p>{this.state.currentPlayerTurn + "'s Turn"}</p>
                            </div>

                        </div>

                        <div id="myModalManaPlay" class="modal">

                            <div class="modal-content">
                                <p>You need at least 10 mana to play a card</p>
                            </div>

                        </div>

                        <div id="myModalManaAttack" class="modal">

                            <div class="modal-content">
                                <p>You need at least 9 mana to attack a card</p>
                            </div>

                        </div>

                         <div id="myModalQuit" class="modal">

                        <div class="modal-content">
                                    <p>{"Player Disconnected, heading to lobby"}</p>
                                </div>

                            </div>


                        <div className="containerB">

                            <Droppable droppableId="fieldB">
                                {(provided) => (
                                    <div className="fieldB" ref={provided.innerRef}>
                                        {this.state.playerBField.map((minion, index) => (
                                            <Droppable droppableId={minion.id} key={minion.id}>
                                                {(provided) => (
                                                    <div className="droppableMinion" ref={provided.innerRef} key={minion.id}>
                                                        <Draggable
                                                            key={minion.id}
                                                            draggableId={minion.id}
                                                            index={index}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="minionFieldCardB"
                                                                    id={minion.id}
                                                                    key={minion.id}
                                                                >
                                                                    <div className="innerB">

                                                                        <p className="minionFieldHealth">{minion.Health || 2}</p>

                                                                        <div className="abilityField">
                                                                            <span className="minionFieldAttack1">{minion.Attack1Name || "Ability 1"}</span>
                                                                            <span className="minionFieldAttack1Power"><br></br>{minion.Attack1Power}</span>
                                                                            <span className="minionFieldAttack1Cost">{minion.Attack1Cost}</span>
                                                                        </div>

                                                                        <img className="minionFieldWeakness" src={minion.WeakAgainstImg} alt="" width="42" height="1"></img>
                                                                        <img className="minionFieldStrength" src={minion.StrongAgainstImg} alt="" width="5" height="1"></img>
                                                                        <img className="minionFieldPortrait" src={minion.Img} alt=""></img>
                                                                    </div>
                                                                </div>


                                                            )}
                                                        </Draggable>
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        ))}
                                        {provided.placeholder}

                                    </div>
                                )
                                }
                            </Droppable>

                            <div className="rowB">

                                <div className="endTurnB" onClick={this.changeBTurn}>
                                    End Turn
                                </div>

                                <div className="playerManaB">
                                    {this.state.playerBMana}
                                </div>

                                <div className="playerNameB">
                                    {this.state.player1name}
                                </div>

                                <Droppable droppableId="playerChampionB">
                                    {(provided) => (
                                        <div className="championB" ref={provided.innerRef}>
                                            {this.state.playerBChamp.map((champion) => (
                                                <div
                                                    className="playedChampionCard"
                                                    id={champion.id}
                                                    key={champion.id}
                                                >
                                                    <p className="playedChampionHealth">{champion.Health || 2}</p>
                                                    <img className="playedChampionWeakness" src={champion.WeakAgainst} alt="" width="42" height="1"></img>
                                                    <img className="playedChampionStrength" src={champion.StrongAgainst} alt="" width="5" height="1"></img>
                                                    <img className="playedChampionPortrait" src={champion.Img} alt=""></img>
                                                </div>

                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                <Droppable droppableId="playerHandB">
                                    {(provided) => (
                                        <div className="playerHandB" ref={provided.innerRef}>
                                            {this.state.playerBHand.map((minion, index) => (
                                                <Draggable
                                                    key={minion.id}
                                                    draggableId={minion.id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="minionHandCardB"
                                                            id={minion.id}
                                                            key={minion.id}
                                                        >
                                                            <h3 className="MinionHandName">{minion.Name || "Minion"}</h3>
                                                            <p className="minionHandHealth">{minion.Health || 2}</p>

                                                            <div className="ability">
                                                                <span className="minionHandAttack1">{minion.Attack1Name || "Ability 1"}</span>
                                                                <span className="minionHandAttack1Power"><br></br>Dmg: {minion.Attack1Power}</span>
                                                                <span className="minionHandAttack1Cost">Cost: {minion.Attack1Cost}</span>
                                                            </div>

                                                            <img className="minionHandWeakness" src={minion.WeakAgainstImg} alt="" width="42" height="1"></img>
                                                            <img className="minionHandStrength" src={minion.StrongAgainstImg} alt="" width="5" height="1"></img>
                                                            <img className="minionHandPortrait" src={minion.Img} alt=""></img>

                                                        </div>

                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}

                                        </div>
                                    )
                                    }
                                </Droppable>
                            </div>
                        </div>


                    </div>
                </DragDropContext>
            )
    }
}
export default GameBoard;