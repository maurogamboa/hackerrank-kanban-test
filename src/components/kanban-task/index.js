import React from 'react';
import "./index.css";



const KanbanTask = ({task, onDelete, onMove}) => {

  const onClickDelete = (e) => {
    onDelete(task.name)
  }

  const onClickMove = (direction) => (e) => {
    onMove(task.name, direction);
  }
  
  return (
    <div className="li-content layout-row justify-content-between align-items-center">
      <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
      <div className="icons">
        <button 
          className="icon-only x-small mx-2" 
          data-testid={`${task.name.split(' ').join('-')}-back`}
          onClick={onClickMove('left')}  
        >
          <i className="material-icons">arrow_back</i>
        </button>
        <button 
          className="icon-only x-small mx-2" 
          data-testid={`${task.name.split(' ').join('-')}-forward`}
          onClick={onClickMove('right')} 
        >
          <i className="material-icons">arrow_forward</i>
        </button>
        <button 
          className="icon-only danger x-small mx-2" 
          data-testid={`${task.name.split(' ').join('-')}-delete`}
          onClick={onClickDelete}
        >
          <i className="material-icons">delete</i>
        </button>
      </div>
    </div>
  )
}

export default KanbanTask;