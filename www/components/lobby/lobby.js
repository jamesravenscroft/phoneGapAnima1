import React from "react";
import "../lobby/lobby.css"
import DraftChamp from "../draftChamp/draftChamp";
import API from "../../utils/API";



class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sockets: this.props.value,
      joinAGame: false,
      name: "",
      playerDisconnected: this.props.playerDisconnect || false
    }
  }


  joinGame = () => {
    
    if (this.state.name !== "") {
      window.playCard1();
      API.joinNewGame();
      this.setState({
        joinAGame: true,
      })
    }
    
    console.log("clicked!")
  }

  updateInput = (evt) => {
    this.setState({
      name: evt.target.value
    })
  }



  render() {
    if (this.state.joinAGame === true) {
      return (
        <DraftChamp name={this.state.name}></DraftChamp>
      )
    } else {
      return <div className="lobbyContainer">

        <div className="panels">

          <div className="leftPanel">

            <div className="imgContainer">

              <p className="title">PokeDecks</p>

            </div>


          </div>



          <div className="rightPanel">

            <div className="createGame">
              <div className="header">Create a New Game</div>
              <input type="text" name="name" className="inputField" placeholder="Enter your name" value={this.state.name} onChange={this.updateInput}></input>
              <br></br>
              <button className="createGameBtn" onClick={this.joinGame} >Create a Game </button>

            </div>

            <div className="joinGame">
              <div className="header">Join a Game</div>
              <input type="text" name="name" className="inputField inputFieldName" value={this.state.name} onChange={this.updateInput} placeholder="Enter your name"></input>

              <br></br>
              <button className="joinGameBtn" onClick={this.joinGame}>Join a Game </button>

            </div>


          </div>

        </div>
      </div>;
    }
  }
}

export default Lobby;