import React, { Component } from "react";
import './draftMinion.css';

class MinionCards extends Component {

return(){

<div className= "minionCard">
        <h3 className="MinionName">{minion.name || "Minion"}</h3>
        <p className="minionHealth">{minion.health || 2}</p>
        <p className="minionAttack1">{minion.attack1 || "Ability 1"}</p>
        <p className="minionAttack1Cost">{minion.attack1cost}</p>
        <p className="minionAttack2">{minion.attack2 || "Ability 2"}</p>
        <p className="minionAttack2Cost">{minion.attack2cost}</p>
        <p className="minionCost">{minion.playCost || 6}</p>
        <p className="minionWeakness">{minion.weakness}</p>
        <p className="minionStrength">{minion.strength}</p>
        <img className= "minionPortrait" src={minion.image} alt=""></img>
    </div>

}}