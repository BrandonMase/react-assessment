const iState ={
    tasks:[],
}

const ADD_TASK = "ADD_TASK"
export function AddTask(action){
    return {
        type:ADD_TASK,
        payload:action,
    }
}

const DELETE_TASK = "DELETE_TASK";
export function deleteTask(action){
    return{
        type:DELETE_TASK,
        payload:action,
    }
}

const UPDATE_TASK = "UPDATE_TASK";
export function updateTask(action){
    return {
        type:UPDATE_TASK,
        payload:action,
    }
}

const COMPLETE_TASK = "COMPLETE_TASK";
export function completeTask(action){
    return {
        type:COMPLETE_TASK,
        payload:action
    }
}

const RECEIVE_TASKS = "RECEIVE_TASKS";
export function recieveTasks(action){
    return {
        type:RECEIVE_TASKS,
        payload:action
    }
}

export default function (state = iState, action) {
    let newState = {...state}
    let index = '';
    switch(action.type){
        case RECEIVE_TASKS:
            newState.tasks = action.payload;
            return newState;

        case ADD_TASK:
            newState.tasks.push(action.payload);
            return newState;
        
        case DELETE_TASK:
            return newState.filter(e=>e.id === action.payload ? false :true);
        
        case UPDATE_TASK:
            index = newState.findIndex(e=>e.id);

            newState.tasks[index] = action.payload;
            return newState;

        case COMPLETE_TASK:
            index = newState.tasks.findIndex(e=>e.id === action.payload)
            
            newState.tasks[index].completed = !newState.tasks[index].completed;

            return newState;
        default:
          return {...newState}
        
    }
}