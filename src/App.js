import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {recieveTasks} from './ducks/reducer';
import Home from './components/Home';
class App extends Component {
  constructor(){
    super();
  
  }
  componentDidMount(){
    axios.get('https://practiceapi.devmountain.com/api/tasks')
      .then(res=>this.props.recieveTasks(res.data))
      .catch(err=>console.log(err));
  }
  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    state:state,
  }
}
export default connect(mapStateToProps,{recieveTasks})(App);
