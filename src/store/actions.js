import { ADD_TASK, DELETE_TASK, MOVE_TASK } from "./const"

export const addTask = ({ stageId, task }) => ({
  type: ADD_TASK,
  payload: { 
    stageId: stageId,
    task: task, 
  },
});

export const deleteTask = ({ stageId, task }) => ({
  type: DELETE_TASK,
  payload: { 
    stageId: stageId,
    task: task, 
  },
});

export const moveTask = ({ stageId, task, destStageId }) => ({
  type: MOVE_TASK,
  payload: { 
    stageId: stageId,
    task: task, 
    destinationId: destStageId
  },
});
