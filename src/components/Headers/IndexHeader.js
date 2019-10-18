/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components

function IndexHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../assets/img/header.jpg"),
            width:"100%"
          }}
          ref={pageHeader}
        ></div>
        <Container
        style={{
          backgroundImage: "url(" + require("../../assets/img/header.jpg"),
          width:"100%", opacity:"40%" 
        }}
        >
          <div className="content-center brand">
            <img
              alt="..."
              className="n-logo"
              src={require("../../assets/img/rglogo1.png")}
            ></img>
            <h1 className="h1-seo"  style={{color:"white"}}>Breaking News:</h1>
            <h3 
              style={{color:"white"}}
            >
              
              Ravenscroft Games in talks with CardLords to develop Animalchemists conversion for the Android and iOS.</h3>
          </div>
      
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
