import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function Images() {
  return (
    <>
      <div className="section section-images">
        <Container>
          <Row>
            <Col md="12" style={{width:"100%", position:"relative"}}>
              <div className="hero-images-container"
           
              >
                <img
                  alt="..."
                  src={require("assets/img/pic4767592.png")}
                  style={{float: "left", position:"relative"}}
                ></img>
                  <p    style={{WebkitTextStrokeColor:"black", WebkitTextStrokeWidth:1, WebkitTextSizeAdjust:30, backgroundColor:"White", backgroundBlendMode:"subtract"}}> Animalchemists is a strategy card game designed by Jon Cohn with vibrant art by Anastas Ermolina(Lucky Luau).
In Animalchemists, Players take the role of their favorite Animal Alchemist as they gather ingredients to craft potions and cast spells to see who is the most powerful!
</p>

              </div>
 
            </Col>
    
          </Row>
        </Container>
        
      </div>
    </>
  );
}

export default Images;
