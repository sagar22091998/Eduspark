import React, { Component } from 'react';
import MainRouter from "./components/SubComponents/MainRouter/MainRouter"

//Redux
import { Provider } from "react-redux"
import store from './store';

class App extends Component {

  render(){
    return (
      <Provider store={store}>
        <MainRouter/>
      </Provider>
    );
  }
}

export default App;