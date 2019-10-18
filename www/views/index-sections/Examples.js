import React from "react";
// import { Link } from "react-router-dom";
// reactstrap components
import { Button, Container, Row } from "reactstrap";

// core components

function Examples() {
  return (
    <>
      <div className="section section-examples" data-background-color="black">
        <div className="space-50"></div>
        <Container className="text-center">
          <Row>
            <div className="col">
              <a href="examples/landing-page.html" target="_blank">
                <img
                  alt="..."
                  className="img-raised"
                  src={require("../../assets/img/pic4905414.jpg")}
                ></img>
              </a>
            
              <p>Players choose their ingredients in order to craft specific potions using a single action per turn. If they have what they need, a potion may be crafted, but be aware of what other players are crafting as the ultimate goal is to turn those potions into spells. The player with the best spells (by point value) at the end of the game is the winner!</p>
            </div>
            <div className="col">
              <a href="examples/profile-page.html" target="_blank">
                <img
                  alt="..."
                  className="img-raised"
                  src={require("../../assets/img/pic4905412.jpg")}
                ></img>
              </a>
            
             <p> Jon Cohn is a game designer out of Southern California, he hosts a game design podcast “Making The Dough” and has designed the games: Council of the Creepies, Dragon Ball Z: Over 9000, Ghostbusters: Blackout, Grind House, King of the Creepies, Munchkin Teenage Mutant Ninja Turtles.
<br></br>
Animalchemists is the newest game Published by CardLords, and will fit nicely with the rest of their game sets including: Take the Gold, The Pirate’s Flag, Fallen Treasures, Lucky Luau, BattleGoats and BattleGoats: Reinforced. All of which can be purchased on their website: www.cardlords.com
</p>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Examples;
