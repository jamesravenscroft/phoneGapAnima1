import React, { Component } from "react";
import './draftMinion.css';
import minionsList from "./minions"
import DraftChamp from "../draftChamp/draftChamp";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import GameBoard from "../board/board"
import API from '../../utils/API';


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

class DraftMinion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minions: minionsList.minionsList,
      player1deck: [],
      player2deck: [],
      player1champion: this.props.p1champ,
      player2champion: this.props.p2champ,
      player1Turn: true,
      player2Turn: false,
      champions: this.props.champions,
      player1name: this.props.p1name,
      player2name: this.props.p2name,
      currentTurn: this.props.p1name
    };

    this.id2List = {
      droppable: 'minions',
      droppable2: 'player1deck',
      droppable3: 'player2deck'
    };

  }

  componentDidMount = () => {
    API.joinGame(updates => {
      if (updates.playerDisconnected === true){
        let modal = document.getElementById("myModalQuit");
        setTimeout(function(){ modal.style.display = "block";}, 300);
        
        setTimeout(function(){window.location.reload()}, 3000)
    }
      if (updates.player1 && updates.player2) {
        this.setState({
          player1deck: updates.player1.minions || [],
          player2deck: updates.player2.minions || [],
          player1Turn: updates.player1.turn,
          player2Turn: updates.player2.turn,
          minions: updates.minions,
          player1champion: updates.player1.champion,
          player2champion: updates.player2.champion,
          champions: updates.champions,
          currentTurn: updates.currentTurn || this.props.p1name
        })
      }
    })
  }

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === 'droppable2') {
        state = { selected: items };
      }

      this.setState(state);
    } if (source.droppableId === 'droppable' && destination.droppableId === "droppable2" && this.state.player1deck.length > 8) {
      
      return;
    }

    if (source.droppableId === 'droppable' && destination.droppableId === "droppable3" && this.state.player2deck.length > 8) {
      
      return;
    }

    if (source.droppableId === 'droppable' && destination.droppableId === "droppable2" && (this.state.player1Turn)) {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      API.draft1Minion(result.droppable, result[destination.droppableId], this.state.player2name)
    }

    if (source.droppableId === 'droppable' && destination.droppableId === "droppable3" && (this.state.player2Turn)) {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      API.draft2Minion(result.droppable, result[destination.droppableId], this.state.player1name)
    }

  };

  render() {
    if (this.state.player1deck.length === 5 && this.state.player2deck.length === 5) {
      return (
        <GameBoard p1deck={this.state.player1deck} p2deck={this.state.player2deck} p1champ={this.state.player1champion} p2champ={this.state.player2champion} p1name={this.state.player1name} p2name={this.state.player2name}></GameBoard>
      )
    } else {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="container">

          <div className="row1">

            <div className="player2Name">
              <h1 className="headerText">{this.state.player2name || "Waiting for Opponent"}</h1>
              <h6 className="subText">{this.state.player2champion[0].name}</h6>
            </div>

            <div className="minionHeader">
              <h1 className="headerText">Choose your minions</h1>
              <h3 className="headerText">Current Turn: {this.state.currentTurn}</h3>
            </div>

            <div className="player1Name">
              <h1 className="headerText">{this.state.player1name || "Waiting for Opponent"}</h1>
              <h6 className="subText">{this.state.player1champion[0].name}</h6>
            </div>

          </div>

          <div id="myModalQuit" class="modal">

            <div class="modal-content">
                <p>{"Player Disconnected, heading to lobby"}</p>
            </div>

          </div>

          <div className="row2">
            <Droppable droppableId="droppable3">
              {(provided) => (
                <div
                  ref={provided.innerRef} className="chosenMinion">
                  <h3 className="chosenText">Chosen Minions</h3>
                  <h6 className="chosenText">{this.state.player2deck.length}/5</h6>
                  {this.state.player2deck.map((p2deck, index) => (
                    <Draggable
                      key={p2deck.id}
                      draggableId={p2deck.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}

                          className="chosenMinionCard" id={p2deck.id} key={p2deck.id}
                        >
                          <p className="minionName">{p2deck.Name}</p>
                          <div>
                            <img className="chosenMinionPortrait" src={p2deck.Img} alt="" width="60" height="60"></img>
                          </div>
                          <img className="chosenMinionWeakness" src={p2deck.WeakAgainstImg} alt="" width="20" height="20"></img>
                          <img className="minionType" src={p2deck.Type} alt="" width="42" height="42"></img>
                          <img className="chosenMinionStrength" src={p2deck.StrongAgainstImg} alt="" width="20" height="20"></img>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="droppable">

              {(provided) => (

                <div className="minionContainer" ref={provided.innerRef}>

                  {this.state.minions.map((minion, index) => (
                    <Draggable
                      key={minion.id}
                      draggableId={minion.id}
                      index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="minionCard"
                          id={minion.id}
                          key={minion.id}
                        >
                          <h3 className="MinionName">{minion.Name || "Minion"}</h3>
                          <p className="minionHealth">{minion.Health || 2}</p>

                          <div className="ability">
                            <span className="minionAttack1">{minion.Attack1Name || "Ability 1"}</span>
                            <span className="minionAttack1Power"><br></br>{minion.Attack1Power}</span>
                            <span className="minionAttack1Cost">{minion.Attack1Cost}</span>
                          </div>

                          <img className="minionCost" src={minion.Type} alt="" width="42" height="42"></img>
                          <img className="minionWeakness" src={minion.WeakAgainstImg} alt="" width="42" height="1"></img>
                          <img className="minionStrength" src={minion.StrongAgainstImg} alt="" width="5" height="1"></img>
                          <img className="minionPortrait" src={minion.Img} alt=""></img>

                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable2">
              {(provided) => (
                <div
                  ref={provided.innerRef} className="chosenMinion">
                  <h3 className="chosenText">Chosen Minions</h3>
                  <h6 className="chosenText">{this.state.player1deck.length}/5</h6>
                  {this.state.player1deck.map((p1deck, index) => (
                    <Draggable
                      key={p1deck.id}
                      draggableId={p1deck.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}

                          className="chosenMinionCard" id={p1deck.id} key={p1deck.id}
                        >
                          <p className="minionName">{p1deck.Name}</p>
                          <div>
                            <img className="chosenMinionPortrait" src={p1deck.Img} alt="" width="60" height="60"></img>
                          </div>
                          <img className="chosenMinionWeakness" src={p1deck.WeakAgainstImg} alt="" width="20" height="20"></img>
                          <img className="minionType" src={p1deck.Type} alt="" width="42" height="42"></img>
                          <img className="chosenMinionStrength" src={p1deck.StrongAgainstImg} alt="" width="20" height="20"></img>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

          </div>

        </div>

      </DragDropContext>

    )
    } 
  }
}


export default DraftMinion;