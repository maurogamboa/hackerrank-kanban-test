import React from "react";
import "./index.css";
import KanbanTask from "../kanban-task/index"
import KanbanAddInput from "../bankan-add-input/index"
import { useStore } from '../../store/store';
import { deleteTask, moveTask } from '../../store/actions';

const KanbanBoard = () => {
  const [ {board}, dispatch]  = useStore();

  const onDeleteTask = (stageId) => (task) => {
    dispatch(deleteTask({stageId, task}));
  }

  const onMoveTask = (stageId) => (task, direction) => {
    const destStageId = direction === 'left' ? stageId - 1 : stageId + 1;
    dispatch(moveTask({stageId, task, destStageId}));
  }

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <KanbanAddInput  />
      </section>

      <div className="mt-50 layout-row">
          {board.map((stage, i) => {
              return (
                  <div className="card outlined ml-20 mt-0" key={`${i}`}>
                      <div className="card-text">
                          <h4>{stage.stageName}</h4>
                          <ul className="styled mt-50" data-testid={`stage-${i}`}>
                              {stage.tasks.map((task, index) => {
                                  return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                    <KanbanTask task={task} onDelete={onDeleteTask(i)} onMove={onMoveTask(i)} />
                                  </li>
                              })}
                          </ul>
                      </div>
                  </div>
              )
          })}
      </div>
    </div>
  );

}

export default KanbanBoard;