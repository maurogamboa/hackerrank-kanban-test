export const addTask = ({ stageId, task }) => ({
  type: 'ADD_TASK',
  payload: { 
    stageId: stageId,
    task: task, 
  },
});
