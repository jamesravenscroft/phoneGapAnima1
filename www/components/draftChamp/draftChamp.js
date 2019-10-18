import React, { Component } from "react";
import championList from "./champions"
import "./DraftChampion.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraftMinion from "../draftMinion/draftMinion";
import API from '../../utils/API';
import Lobby from "../lobby/lobby";



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



class DraftChamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champions: championList.championList,
      player1champion: [],
      player2champion: [],
      player1name: "",
      player2name: "",
      p1c:false,
      p2c:false,
    }

    this.id2List = {
      droppable: 'champions',
      droppable2: 'player1champion',
      droppable3: 'player2champion'
    }

  }

  assignNames = () => {
    if (this.state.player1name === "") {
      this.setState({
        player1name: this.props.name
      })
    } else {
      this.setState({
        player2name: this.props.name
      })
    }
  }

  componentDidMount = () => {
    API.assignNames(this.props.name)
    API.joinGame(updates => {
      

      if (updates.playerDisconnected === true){
          let modal = document.getElementById("myModalQuit");
          setTimeout(function(){ modal.style.display = "block";}, 300);
          
          setTimeout(function(){window.location.reload()}, 3000)
      }
      
      if (updates.player1 && updates.player2) {
        window.soundtrack()
        this.setState({
          player1champion: updates.player1.champion || [],
          player2champion: updates.player2.champion || [],
          champions: updates.champions || championList.championList,
          player1name: updates.player1name || "",
          player2name: updates.player2name || "",
          playerDisconnected: false,
        })

        if (this.state.player1champion.length > 0 && this.state.p1c === false){
          window.playCard1();
          this.setState({
            p1c:true
          })
        }

        if (this.state.player2champion.length > 0 && this.state.p2c === false){
          window.playCard1();
          this.setState({
            p2c:true
          })
        }

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

    if (source.droppableId === 'droppable' && destination.droppableId === 'droppable') {
      return
    }
    
    if (source.droppableId === 'droppable' && destination.droppableId === "droppable2" && this.state.player1champion.length > 0) {
      
      return;
    }

    if (source.droppableId === 'droppable' && destination.droppableId === "droppable3" && this.state.player2champion.length > 0) {
      
      return;
    }

    if (source.droppableId === 'droppable' || destination.droppableId !== 'droppable') {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      // for testing the sound effects
      

      API.draftChampion(result.droppable, result[destination.droppableId])
    }

    
  };

  render() {
    if (this.state.playerDisconnected === true){
      window.location.reload();
    }
    else if (this.state.player1champion.length > 0 && this.state.player2champion.length > 0) {
      return (
        <DraftMinion p1champ={this.state.player1champion} p2champ={this.state.player2champion} champions={this.state.champions} p1name={this.state.player1name} p2name={this.state.player2name}></DraftMinion>

      )
    } else
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="container">


            <div className="row1">

              <div className="player2Name">
                <h1 className="headerText">{this.state.player2name || "Waiting for Opponent"}</h1>
              </div>

              <div className="championHeader">
                <h1 className="headerText">Choose your champion</h1>
              </div>

              <div className="player1Name">
                <h1 className="headerText">{this.state.player1name || "Waiting for Opponent"}</h1>
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
                    ref={provided.innerRef} className="chosenChampion1">
                    <h3 className="chosenText">Chosen Champion</h3>
                    {this.state.player2champion.map((p2Champion, index) => (
                      <Draggable
                        key={p2Champion.id}
                        draggableId={p2Champion.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}

                            className="chosenChampionCard" id={p2Champion.id} key={p2Champion.id}>

                            <h3 className="championName">{p2Champion.name || "champion"}</h3>
                            <p className="championHealth">{p2Champion.Health || 2}</p>

                            <img className="championCost" src={p2Champion.type} alt="" width="42" height="42"></img>
                            <img className="championWeakness" src={p2Champion.WeakAgainst} alt="" width="42" height="1"></img>
                            <img className="championStrength" src={p2Champion.StrongAgainst} alt="" width="5" height="1"></img>
                            <img className="championPortrait" src={p2Champion.Img} alt=""></img>

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

                  <div className="championContainer" ref={provided.innerRef}>

                    {this.state.champions.map((champion, index) => (
                      <Draggable
                        key={champion.id}
                        draggableId={champion.id}
                        index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="championCard"
                            id={champion.id}
                            key={champion.id}
                          >

                            <h3 className="championName">{champion.name || "champion"}</h3>
                            <p className="championHealth">{champion.Health || 2}</p>

                            <img className="championCost" src={champion.type} alt="" width="42" height="42"></img>
                            <img className="championWeakness" src={champion.WeakAgainst} alt="" width="42" height="1"></img>
                            <img className="championStrength" src={champion.StrongAgainst} alt="" width="5" height="1"></img>
                            <img className="championPortrait" src={champion.Img} alt=""></img>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )
                }
              </Droppable>
              <Droppable droppableId="droppable2">
                {(provided) => (

                  <div
                    ref={provided.innerRef} className="chosenChampion2">
                    <h3 className="chosenText">Chosen Champion</h3>
                    {this.state.player1champion.map((p1champion, index) => (
                      <Draggable
                        key={p1champion.id}
                        draggableId={p1champion.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}

                            className="chosenChampionCard" id={p1champion.id} key={p1champion.id}>

                            <h3 className="championName">{p1champion.name || "champion"}</h3>
                            <p className="championHealth">{p1champion.Health || 2}</p>

                            <img className="championCost" src={p1champion.type} alt="" width="42" height="42"></img>
                            <img className="championWeakness" src={p1champion.WeakAgainst} alt="" width="42" height="1"></img>
                            <img className="championStrength" src={p1champion.StrongAgainst} alt="" width="5" height="1"></img>
                            <img className="championPortrait" src={p1champion.Img} alt=""></img>

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
export default DraftChamp;