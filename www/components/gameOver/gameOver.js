import React from "react";
import "../gameOver/gameOver.css";
import Lobby from "../lobby/lobby"
import API from "../../utils/API";



class GameOver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: this.props.winner,
            playerAChamp: this.props.value.playerAChamp,
            playerBChamp: this.props.value.playerBChamp,
            playerAField: this.props.value.playerAField,
            playerBField: this.props.value.playerBField,
            playerAHand: this.props.value.playerAHand,
            playerBHand: this.props.value.playerBHand,
            playerAGraveyard: this.props.value.playerAGraveyard,
            playerBGraveyard: this.props.value.playerBGraveyard,
            goToLobby: false,
            playerBName: this.props.player1,
            playerAName: this.props.player2
        }
    }

    goLobby = () => {
        // API.leaveGame()
        // this.setState({
        //     goToLobby: true
        // })

        setTimeout(function(){window.location.reload()}, 20)
    }

    render() {
        if (this.state.goToLobby){
            return (
            <Lobby></Lobby>
            )
        } else if (this.state.winner === "playerB") {
            return (<div className="gameOverContainer">
                <div className="innerContainer">

                    <div className="blocks">

                        {/* Left Block */}
                        <div className="left">
                            <div className="playerHeader">
                                
                            </div>
                            <div className="playerHeader">
                                {this.state.playerBName}
                            <h6>Champion Health Remaining {this.state.playerBChamp[0].Health}/80</h6>
                                <h6>Minions Remaining {this.state.playerBField.length + this.state.playerBHand.length}/5</h6>
                                <h6>Minions Destroyed {this.state.playerAGraveyard.length}/5</h6>
                            </div>

                        </div>

                        {/* Middle Block */}
                        <div className="middle">

                            <div className="winLose">
                                <p className="winLoseMsg">Victory!</p>
                            </div>

                            <br></br>

                            <div className="btnContainer">
                                <button className="goLobby" onClick={this.goLobby}>Go to Lobby</button>
                            </div>

                        </div>

                        {/* Right Block */}
                        <div className="right">

                            <div className="playerHeader">
                            {this.state.playerAName}
                            <h6>Champion Health Remaining {this.state.playerAChamp[0].Health}/80</h6>
                                <h6>Minions Remaining {this.state.playerAField.length + this.state.playerAHand.length}/5</h6>
                                <h6>Minions Destroyed {this.state.playerBGraveyard.length}/5</h6>
                            </div>

                        </div>


                    </div>


                </div>
            </div>
            )
        } else {
            return (<div className="gameOverContainer">
                <div className="innerContainer">

                    <div className="blocks">

                        {/* Left Block */}
                        <div className="left">
                            <div className="playerHeader">

                            </div>
                            <div className="playerHeader">
                            {this.state.playerAName}
                            <h6>Champion Health Remaining {this.state.playerBChamp[0].Health}/80</h6>
                                <h6>Minions Remaining {this.state.playerBField.length + this.state.playerBHand.length}/5</h6>
                                <h6>Minions Destroyed {this.state.playerAGraveyard.length}/5</h6>
                            </div>

                        </div>

                        {/* Middle Block */}
                        <div className="middle">

                            <div className="winLose">
                                <p className="winLoseMsg">Victory!</p>
                                <p> {this.state.playerAChamp[0].name}</p>
                            </div>

                            <br></br>

                            <div className="btnContainer">
                                <button className="goLobby" onClick={this.goLobby}>Go to Lobby</button>
                            </div>

                        </div>

                        {/* Right Block */}
                        <div className="right">
                            
                        <div className="playerHeader">
                            {this.state.playerAName}
                            <h6>Champion Health Remaining {this.state.playerAChamp[0].Health}/80</h6>
                                <h6>Minions Remaining {this.state.playerAField.length + this.state.playerAHand.length}/5</h6>
                                <h6>Minions Destroyed {this.state.playerBGraveyard.length}/5</h6>
                            </div>

                        </div>


                    </div>


                </div>
            </div>
            )
        }
    }
}

export default GameOver;