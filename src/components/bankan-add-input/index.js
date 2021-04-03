import React from 'react';
import { addTask } from '../../store/actions';
import { useStore } from '../../store/store';

const KanbanAddInput = ({onSubmit}) =>  {
  const [, dispatch]  = useStore();
  const [inputValue, setInputValue] = React.useState("");

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  }

  const onSubmitClick = () => {
    if(inputValue) {
      const newTask = {
        stageId: 0,
        task: inputValue, 
      }
      dispatch(addTask(newTask));
    }
    setInputValue("");
  }

  return (
    <React.Fragment>
      <input 
        id="create-task-input" 
        type="text" className="large" 
        placeholder="New task name" 
        data-testid="create-task-input"
        onChange={onChangeHandler}
        value={inputValue}
      />
      <button 
        type="submit" 
        className="ml-30" 
        data-testid="create-task-button"
        onClick={onSubmitClick}
      >
        Create task
      </button>
    </React.Fragment>
  )
}

export default KanbanAddInput;

