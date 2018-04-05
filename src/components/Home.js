import React, { Component } from 'react';
import {connect} from 'react-redux';
import {completeTask,recieveTasks} from './../ducks/reducer';
import axios from 'axios';

class Home extends Component {
  constructor(){
    super();

    this.state={
      tasks:[],
      newTask:'',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({tasks:nextProps.state.tasks},()=>this.displayTasks);
  }

  addTask(){
    axios.post('https://practiceapi.devmountain.com/api/tasks',{title:this.state.newTask})
      .then(res=>this.props.recieveTasks(res.data))
      .catch(err=>alert(err))
  }

  deleteTask(e){
    axios.delete(`https://practiceapi.devmountain.com/api/tasks/${e}`)
      .then(res=>this.props.recieveTasks(res.data))
        .catch(err=>console.log(err))
  }

  completeTask(e){
    this.props.completeTask(e);
    alert(e)

    axios.put(`https://practiceapi.devmountain.com/api/tasks/${e}`)
      .then(res=>this.props.recieveTasks(res.data))
      .catch(err=>console.log(err))
  }

  displayTasks(){
    if(this.state.tasks.length > 0){
      return this.state.tasks.map(e=>{
        return(<div className="taskDiv">
        <div className="task">{e.completed ? <strike>{e.title}</strike> : e.title}</div>
        <button onClick={()=>this.completeTask(e.id)}>{e.completed ? "Uncomplete" : "Complete"}</button> <div onClick={()=>this.deleteTask(e.id)}>X</div>
      </div>)
      })
    }
  }
  render() {
    return (
      <div>
        <div className="toDo">
          <h1>TO-DO:</h1>
          <input onChange={e=>this.setState({newTask:e.target.value})}/>
          <br />
          <button onClick={()=>this.addTask()}>Add new To-Do</button>
        </div>

        <div className="taskList">
          {this.displayTasks()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    state:state,
  }
}

export default connect(mapStateToProps,{completeTask,recieveTasks})(Home);