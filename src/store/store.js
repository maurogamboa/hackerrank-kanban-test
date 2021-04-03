import React from 'react';
import storeReducer from './reducer';

// Each task is uniquely identified by its name. 
// Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) 
// instead of any kind of index or any other attribute.
const boardInitial = {
  board: [
    {
      stageName: "Backlog",
      tasks: [
        { name: '1', stage: 0, moveLeft: false, moveRight: true},
        { name: '2', stage: 0, moveLeft: false, moveRight: true},
      ]
    },
    {
      stageName: "To Do",
      tasks: []
    },
    {
      stageName: "Ongoing",
      tasks: []
    },
    {
      stageName: "Done",
      tasks: []
    }
  ]
}

const Store = React.createContext(boardInitial);
Store.displayName = 'Store';

export const useStore = () => React.useContext(Store);

export const StoreProvider = ({ children }) => {
  const [board, dispatch] = React.useReducer(storeReducer, boardInitial);

  return (
    <Store.Provider value={[board, dispatch]}>
      { children }
    </Store.Provider>
  );
};