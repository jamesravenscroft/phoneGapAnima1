import React from "react";
import IndexHeader from "../components/Headers/IndexHeader.js";
import DarkFooter from "../components/Footers/DarkFooter.js";
import Images from "./index-sections/Images.js";
import Examples from "./index-sections/Examples.js";
function Index() {
    React.useEffect(() => {
      document.body.classList.add("index-page");
      document.body.classList.add("sidebar-collapse");
      document.documentElement.classList.remove("nav-open");
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      return function cleanup() {
        document.body.classList.remove("index-page");
        document.body.classList.remove("sidebar-collapse");
      };
    });
    return (
      <>
      
        <div className="wrapper">
          <IndexHeader />
          <div className="main">
            <Images 
               style={{marginBottom:"-100", position:"relative", padding:0}}
              />
    
            <Examples
              style={{marginTop:"-100", position:"relative", padding:0}}
            />
 
          </div>
          <DarkFooter />
        </div>
      </>
    );
  }
  
  export default Index;