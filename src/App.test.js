import React from 'react';
import App from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

const renderApp = () => render(<App/>);

afterEach(() => {
	cleanup()
});

// elements in App by data-testids
const testIds = {
	createTaskInput: 'create-task-input',
	createTaskButton: 'create-task-button',
	moveBackButton: 'move-back-button',
	moveForwardButton: 'move-forward-button',
	deleteButton: 'delete-button',
	stages: ['stage-0', 'stage-1', 'stage-2', 'stage-3'],
};

test('Clicking on Create Task Button should add it to first stage and do nothing if input is empty' , () => {
	const {
		getByTestId, queryByTestId
	} = renderApp();

	const createTaskInput = getByTestId(testIds.createTaskInput);
	const createTaskButton = getByTestId(testIds.createTaskButton);
	const backlogStage = getByTestId(testIds.stages[0]);
	const toDoStage = getByTestId(testIds.stages[1]);

	const taskName = 'task 1';
	const taskId = `${taskName.split(' ').join('-')}-name`;
	fireEvent.change(createTaskInput, {
		target: { value: taskName }
	});

	expect(backlogStage).not.toContainElement(queryByTestId(taskId));
	expect(toDoStage).not.toContainElement(queryByTestId(taskId));
	fireEvent.click(createTaskButton);
	expect(backlogStage).toContainElement(queryByTestId(taskId));
	expect(toDoStage).not.toContainElement(queryByTestId(taskId));
	expect(createTaskInput.value).toBeFalsy();

	const initialLength = backlogStage.children.length;
	fireEvent.change(createTaskInput, {
		target: { value: '' }
	});
	fireEvent.click(createTaskButton);

	expect(backlogStage.children.length).toBe(initialLength);
});

test('For a task in stage 0, backward icon is disabled and forward icon is enabled', () => {
	const {
		getByTestId, queryByTestId
	} = renderApp();

	const createTaskInput = getByTestId(testIds.createTaskInput);
	const createTaskButton = getByTestId(testIds.createTaskButton);
	const backlogStage = getByTestId(testIds.stages[0]);

	const taskName = 'task 2-1';
	const taskId = `${taskName.split(' ').join('-')}-name`;
	const taskBackIconId = `${taskName.split(' ').join('-')}-back`;
	const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;
	
	fireEvent.change(createTaskInput, {
		target: { value: taskName }
	});

	fireEvent.click(createTaskButton);
	expect(backlogStage).toContainElement(queryByTestId(taskId));
	expect(getByTestId(taskBackIconId).hasAttribute('disabled')).toBe(true);
	expect(getByTestId(taskForwardIconId).hasAttribute('disabled')).toBeFalsy();
});

test('For a task in stage 0, can be moved forward till stage 4 and check for icons are enabled/disabled correctly', () => {
	const {
		getByTestId, queryByTestId
	} = renderApp();

	const createTaskInput = getByTestId(testIds.createTaskInput);
	const createTaskButton = getByTestId(testIds.createTaskButton);
	const backlogStage = getByTestId(testIds.stages[0]);
	const toDoStage = getByTestId(testIds.stages[1]);
	const onGoingStage = getByTestId(testIds.stages[2]);
	const doneStage = getByTestId(testIds.stages[3]);

	const taskName = 'task 3-1';
	const taskId = `${taskName.split(' ').join('-')}-name`;
	const taskBackIconId = `${taskName.split(' ').join('-')}-back`;
	const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;
	
	expect(backlogStage).not.toContainElement(queryByTestId(taskId));
	expect(toDoStage).not.toContainElement(queryByTestId(taskId));
	expect(onGoingStage).not.toContainElement(queryByTestId(taskId));
	expect(doneStage).not.toContainElement(queryByTestId(taskId));

	fireEvent.change(createTaskInput, {
		target: { value: taskName }
	});

	fireEvent.click(createTaskButton);
	expect(backlogStage).toContainElement(queryByTestId(taskId));
	expect(toDoStage).not.toContainElement(queryByTestId(taskId));
	expect(onGoingStage).not.toContainElement(queryByTestId(taskId));
	expect(doneStage).not.toContainElement(queryByTestId(taskId));

	fireEvent.click(getByTestId(taskForwardIconId));

	expect(backlogStage).not.toContainElement(queryByTestId(taskId));
	expect(toDoStage).toContainElement(queryByTestId(taskId));
	expect(onGoingStage).not.toContainElement(queryByTestId(taskId));
	expect(doneStage).not.toContainElement(queryByTestId(taskId));
	expect(getByTestId(taskBackIconId).hasAttribute('disabled')).toBeFalsy();
	expect(getByTestId(taskForwardIconId).hasAttribute('disabled')).toBeFalsy();

	fireEvent.click(getByTestId(taskForwardIconId));

	expect(backlogStage).not.toContainElement(queryByTestId(taskId));
	expect(toDoStage).not.toContainElement(queryByTestId(taskId));
	expect(onGoingStage).toContainElement(queryByTestId(taskId));
	expect(doneStage).not.toContainElement(queryByTestId(taskId));
	expect(getByTestId(taskBackIconId).hasAttribute('disabled')).toBeFalsy();
	expect(getByTestId(taskForwardIconId).hasAttribute('disabled')).toBeFalsy();
	
	fireEvent.click(getByTestId(taskForwardIconId));
	expect(backlogStage).not.toContainElement(queryByTestId(taskId));
	expect(toDoStage).not.toContainElement(queryByTestId(taskId));
	expect(onGoingStage).not.toContainElement(queryByTestId(taskId));
	expect(doneStage).toContainElement(queryByTestId(taskId));

	expect(getByTestId(taskBackIconId).hasAttribute('disabled')).toBeFalsy();
	expect(getByTestId(taskForwardIconId).hasAttribute('disabled')).toBe(true);
});

test('For a task in stage 4, can be moved backward till stage 0 and check for icons are enabled/disabled correctly', () => {
	const {
		getByTestId, queryByTestId
	} = renderApp();

	const createTaskInput = getByTestId(testIds.createTaskInput);
	const createTaskButton = getByTestId(testIds.createTaskButton);
	const backlogStage = getByTestId(testIds.stages[0]);
	const toDoStage = getByTestId(testIds.stages[1]);
	const onGoingStage = getByTestId(testIds.stages[2]);
	const doneStage = getByTestId(testIds.stages[3]);

	const taskName = 'task 4-1';
	const taskId = `${taskName.split(' ').join('-')}-name`;
	const taskBackIconId = `${taskName.split(' ').join('-')}-back`;
	const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;

	fireEvent.change(createTaskInput, {
		target: { value: taskName }
	});

	fireEvent.click(createTaskButton);
	fireEvent.click(getByTestId(taskForwardIconId));
	fireEvent.click(getByTestId(taskForwardIconId));
	fireEvent.click(getByTestId(taskForwardIconId));
	
	fireEvent.click(getByTestId(taskBackIconId));
	expect(backlogStage).not.toContainElement(queryByTestId(taskId));
	expect(toDoStage).not.toContainElement(queryByTestId(taskId));
	expect(onGoingStage).toContainElement(queryByTestId(taskId));
	expect(doneStage).not.toContainElement(queryByTestId(taskId));
	expect(getByTestId(taskBackIconId).hasAttribute('disabled')).toBeFalsy();
	expect(getByTestId(taskForwardIconId).hasAttribute('disabled')).toBeFalsy();

	fireEvent.click(getByTestId(taskBackIconId));
	expect(backlogStage).not.toContainElement(queryByTestId(taskId));
	expect(toDoStage).toContainElement(queryByTestId(taskId));
	expect(onGoingStage).not.toContainElement(queryByTestId(taskId));
	expect(doneStage).not.toContainElement(queryByTestId(taskId));
	expect(getByTestId(taskBackIconId).hasAttribute('disabled')).toBeFalsy();
	expect(getByTestId(taskForwardIconId).hasAttribute('disabled')).toBeFalsy();

	fireEvent.click(getByTestId(taskBackIconId));
	expect(backlogStage).toContainElement(queryByTestId(taskId));
	expect(toDoStage).not.toContainElement(queryByTestId(taskId));
	expect(onGoingStage).not.toContainElement(queryByTestId(taskId));
	expect(doneStage).not.toContainElement(queryByTestId(taskId));
	expect(getByTestId(taskBackIconId).hasAttribute('disabled')).toBe(true);
	expect(getByTestId(taskForwardIconId).hasAttribute('disabled')).toBeFalsy();
});


test('Clicking on delete should delete the task in stage 0', () => {
	const {
		getByTestId, queryByTestId
	} = renderApp();

	const createTaskInput = getByTestId(testIds.createTaskInput);
	const createTaskButton = getByTestId(testIds.createTaskButton);
	const backlogStage = getByTestId(testIds.stages[0]);

	const taskName = 'task 5-1';
	const taskId = `${taskName.split(' ').join('-')}-name`;
	const taskDeleteIconId = `${taskName.split(' ').join('-')}-delete`;

	fireEvent.change(createTaskInput, {
		target: { value: taskName }
	});

	fireEvent.click(createTaskButton);

	expect(backlogStage).toContainElement(queryByTestId(taskId));
	expect(getByTestId(taskDeleteIconId).hasAttribute('disabled')).toBe(false);
	fireEvent.click(getByTestId(taskDeleteIconId));
	expect(backlogStage).not.toContainElement(queryByTestId(taskId));
});

test('Clicking on delete should delete the task in stage 1', () => {
	const {
		getByTestId, queryByTestId
	} = renderApp();

	const createTaskInput = getByTestId(testIds.createTaskInput);
	const createTaskButton = getByTestId(testIds.createTaskButton);
	const toDoStage = getByTestId(testIds.stages[1]);

	const taskName = 'task 6-1';
	const taskId = `${taskName.split(' ').join('-')}-name`;
	const taskDeleteIconId = `${taskName.split(' ').join('-')}-delete`;
	const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;

	fireEvent.change(createTaskInput, {
		target: { value: taskName }
	});

	fireEvent.click(createTaskButton);
	fireEvent.click(getByTestId(taskForwardIconId));

	expect(toDoStage).toContainElement(queryByTestId(taskId));
	expect(getByTestId(taskDeleteIconId).hasAttribute('disabled')).toBe(false);
	fireEvent.click(getByTestId(taskDeleteIconId));
	expect(toDoStage).not.toContainElement(queryByTestId(taskId));
});

test('Clicking on delete should delete the task in stage 2', () => {
	const {
		getByTestId, queryByTestId
	} = renderApp();

	const createTaskInput = getByTestId(testIds.createTaskInput);
	const createTaskButton = getByTestId(testIds.createTaskButton);
	const activeStage = getByTestId(testIds.stages[2]);

	const taskName = 'task 7-1';
	const taskId = `${taskName.split(' ').join('-')}-name`;
	const taskDeleteIconId = `${taskName.split(' ').join('-')}-delete`;
	const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;

	fireEvent.change(createTaskInput, {
		target: { value: taskName }
	});

	fireEvent.click(createTaskButton);
	fireEvent.click(getByTestId(taskForwardIconId));
	fireEvent.click(getByTestId(taskForwardIconId));

	expect(activeStage).toContainElement(queryByTestId(taskId));
	expect(getByTestId(taskDeleteIconId).hasAttribute('disabled')).toBe(false);
	fireEvent.click(getByTestId(taskDeleteIconId));
	expect(activeStage).not.toContainElement(queryByTestId(taskId));
});

test('Clicking on delete should delete the task in stage 3', () => {
	const {
		getByTestId, queryByTestId
	} = renderApp();

	const createTaskInput = getByTestId(testIds.createTaskInput);
	const createTaskButton = getByTestId(testIds.createTaskButton);
	const doneStage = getByTestId(testIds.stages[3]);

	const taskName = 'task 8-1';
	const taskId = `${taskName.split(' ').join('-')}-name`;
	const taskDeleteIconId = `${taskName.split(' ').join('-')}-delete`;
	const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;

	fireEvent.change(createTaskInput, {
		target: { value: taskName }
	});

	fireEvent.click(createTaskButton);
	fireEvent.click(getByTestId(taskForwardIconId));
	fireEvent.click(getByTestId(taskForwardIconId));
	fireEvent.click(getByTestId(taskForwardIconId));

	expect(doneStage).toContainElement(queryByTestId(taskId));
	expect(getByTestId(taskDeleteIconId).hasAttribute('disabled')).toBe(false);
	fireEvent.click(getByTestId(taskDeleteIconId));
	expect(doneStage).not.toContainElement(queryByTestId(taskId));
});

test('after many forward and back operations, tasks are in correct state', () => {
	const {
		getByTestId, queryByTestId
	} = renderApp();

	const createTaskInput = getByTestId(testIds.createTaskInput);
	const createTaskButton = getByTestId(testIds.createTaskButton);
	const backlogStage = getByTestId(testIds.stages[0]);
	const toDoStage = getByTestId(testIds.stages[1]);
	const onGoingStage = getByTestId(testIds.stages[2]);
	const doneStage = getByTestId(testIds.stages[3]);

	const backlogInitialLength = backlogStage.children.length;
	const todoInitialLength = toDoStage.children.length;
    const onGoingInitialLength = onGoingStage.children.length;
	const doneInitialLength = doneStage.children.length;
	
	fireEvent.change(createTaskInput, {
		target: { value: 'task 9-1' }
	});
	fireEvent.click(createTaskButton);

	fireEvent.change(createTaskInput, {
		target: { value: 'task 9-2' }
	});
	fireEvent.click(createTaskButton);

	fireEvent.change(createTaskInput, {
		target: { value: 'task 9-3' }
	});
	fireEvent.click(createTaskButton);
	fireEvent.click(getByTestId(`task-9-3-forward`))

	fireEvent.change(createTaskInput, {
		target: { value: 'task 9-4' }
	});
	fireEvent.click(createTaskButton);
	fireEvent.click(getByTestId(`task-9-4-forward`))

	fireEvent.change(createTaskInput, {
		target: { value: 'task 9-5' }
	});
	fireEvent.click(createTaskButton);
	fireEvent.click(getByTestId(`task-9-5-forward`));
	fireEvent.click(getByTestId(`task-9-5-forward`))

	fireEvent.change(createTaskInput, {
		target: { value: 'task 9-6' }
	});
	fireEvent.click(createTaskButton);
	fireEvent.click(getByTestId(`task-9-6-forward`));
	fireEvent.click(getByTestId(`task-9-6-forward`))

	fireEvent.change(createTaskInput, {
		target: { value: 'task 9-7' }
	});
	fireEvent.click(createTaskButton);
	fireEvent.click(getByTestId(`task-9-7-forward`));
	fireEvent.click(getByTestId(`task-9-7-forward`));
	fireEvent.click(getByTestId(`task-9-7-forward`))

	fireEvent.change(createTaskInput, {
		target: { value: 'task 9-8' }
	});
	fireEvent.click(createTaskButton);
	fireEvent.click(getByTestId(`task-9-8-forward`));
	fireEvent.click(getByTestId(`task-9-8-forward`));
	fireEvent.click(getByTestId(`task-9-8-forward`))
	
	expect(backlogStage.children.length).toBe(backlogInitialLength + 2);
	expect(backlogStage.contains(getByTestId('task-9-1-name'))).toEqual(true);
	expect(backlogStage.contains(getByTestId('task-9-2-name'))).toEqual(true);
	expect(getByTestId('task-9-1-name').innerHTML).toBe('task 9-1');
	expect(getByTestId('task-9-2-name').innerHTML).toBe('task 9-2');
	expect(toDoStage.children.length).toBe(todoInitialLength + 2);
	expect(toDoStage.contains(getByTestId('task-9-3-name'))).toEqual(true);
	expect(toDoStage.contains(getByTestId('task-9-4-name'))).toEqual(true);
	expect(getByTestId('task-9-3-name').innerHTML).toBe('task 9-3');
	expect(getByTestId('task-9-4-name').innerHTML).toBe('task 9-4');
	expect(onGoingStage.children.length).toBe(onGoingInitialLength + 2);
	expect(onGoingStage.contains(getByTestId('task-9-5-name'))).toEqual(true);
	expect(onGoingStage.contains(getByTestId('task-9-6-name'))).toEqual(true);
	expect(getByTestId('task-9-5-name').innerHTML).toBe('task 9-5');
	expect(getByTestId('task-9-6-name').innerHTML).toBe('task 9-6');
	expect(doneStage.children.length).toBe(doneInitialLength + 2);
	expect(doneStage.contains(getByTestId('task-9-7-name'))).toEqual(true);
	expect(doneStage.contains(getByTestId('task-9-8-name'))).toEqual(true);
	expect(getByTestId('task-9-7-name').innerHTML).toBe('task 9-7');
	expect(getByTestId('task-9-8-name').innerHTML).toBe('task 9-8');
});

test('tasks are in correct state after multiple move and deletions', () => {
	const {
		getByTestId, queryByTestId
	} = renderApp();

	const createTaskInput = getByTestId(testIds.createTaskInput);
	const createTaskButton = getByTestId(testIds.createTaskButton);
	const backlogStage = getByTestId(testIds.stages[0]);
	const onGoingStage = getByTestId(testIds.stages[2]);

	const backlogInitialLength = backlogStage.children.length;
    const onGoingInitialLength = onGoingStage.children.length;
	
	fireEvent.change(createTaskInput, {
		target: { value: 'task 10-1' }
	});
	fireEvent.click(createTaskButton);

	fireEvent.change(createTaskInput, {
		target: { value: 'task 10-2' }
	});
	fireEvent.click(createTaskButton);

	fireEvent.click(getByTestId(`task-10-1-forward`));
	fireEvent.click(getByTestId(`task-10-2-forward`));
	fireEvent.click(getByTestId(`task-10-2-forward`));
	fireEvent.click(getByTestId(`task-10-1-delete`))

	fireEvent.change(createTaskInput, {
		target: { value: 'task 10-3' }
	});
	fireEvent.click(createTaskButton);

	expect(backlogStage.children.length).toBe(backlogInitialLength + 1);
	expect(backlogStage.contains(getByTestId('task-10-3-name'))).toBe(true);
	expect(getByTestId('task-10-3-name').innerHTML).toBe('task 10-3');
	
	expect(onGoingStage.children.length).toBe(onGoingInitialLength + 1);
    expect(onGoingStage.contains(getByTestId('task-10-2-name'))).toBe(true);
    expect(getByTestId('task-10-2-name').innerHTML).toBe('task 10-2');
});