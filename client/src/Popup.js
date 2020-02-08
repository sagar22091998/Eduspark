import React, { Component } from 'react';


class Popup extends Component{
  


  render(){
    return(
       <div class="Popup-Overlay">
         <div class="Popup-Main">
           <div onClick={this.props.toggleError} class="Popup-Close">X</div>
           <div class="Popup-Content">
           <h2>TATTI KHAYEGA</h2>
           <p>Garam garam naram naram</p>
           <a href="#">Kha le</a>
           </div>
        </div>
      </div>     
    );
  }
}

export default Popup;