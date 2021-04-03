export default function storeReducer(state, action) {

  const canMove = (stageId) => {
    return {
      moveLeft: stageId > 0,
      moveRight: stageId < state.board.length - 1,
    }
  }

  switch (action.type) {
    case 'ADD_TASK':
      const newstate = {...state};
      newstate.board[action.payload.stageId].tasks.push({
        name: action.payload.task, 
        ...canMove(action.payload.stageId)
      });
      return newstate;
    default:
      return {...state}
  }
  
}