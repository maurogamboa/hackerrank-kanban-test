import { ADD_TASK, DELETE_TASK, MOVE_TASK } from "./const";
export default function storeReducer(state, action) {

  const canMove = (stageId) => {
    return {
      moveLeft: stageId > 0,
      moveRight: stageId < state.board.length - 1,
    }
  }

  const newstate = {...state};

  switch (action.type) {
    case ADD_TASK:
      newstate.board[action.payload.stageId].tasks.push({
        name: action.payload.task, 
        stage: action.payload.stageId,
        ...canMove(action.payload.stageId)
      });
      return newstate;
      
    case DELETE_TASK:
      {
        const stageid = action.payload.stageId; 
        const { tasks } = newstate.board[stageid]; 
        newstate.board[stageid].tasks = tasks.filter((task) => 
          !(task.name === action.payload.task)
        ); 
        return newstate;
      }

    case MOVE_TASK:
      {
        //Delete
        const stageid = action.payload.stageId; 
        const { tasks } = newstate.board[stageid]; 
        newstate.board[stageid].tasks = tasks.filter((task) => 
          !(task.name === action.payload.task)
        ); 
        //Push new
        const destStageId = action.payload.destinationId;
        newstate.board[destStageId].tasks.push({
          name: action.payload.task, 
          stage: destStageId,
          ...canMove(destStageId)
        });

        return newstate;
      }

    default:
      return newstate
  }
  
}