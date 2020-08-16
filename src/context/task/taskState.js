import React, { useReducer } from 'react';
//import {v4 as uuid} from "uuid";

import taskContext from './taskContext';
import TaskReducer from './taskReducer';
import {GET_TASKSBYID, ADDNEWTASK_TOLIST, FORM_VALIDATION, DELETE_TASK, COMPLETE_TASK, ONGOING_TASK, UPDATE_TASK} from '../../types/index';

// Simulando datos que llegan de 


/////////////////////////////////

const TaskState = props => {

    const newTasks = [
        
    ];

    const initialState = {
        newTasks : [
        {id: 1, name: 'Task 1', completed: true, projectId: 1},
        {id: 2, name: 'Task 2', completed: false, projectId: 2},
        {id: 3, name: 'Task 3', completed: true, projectId: 3},
        {id: 4, name: 'Task 4', completed: false, projectId: 4},
        {id: 5, name: 'Task 5', completed: true, projectId: 1},
        {id: 6, name: 'Task 6', completed: false, projectId: 2}
    ],
        //form : false,
        formError: false,
        taskProjectData: null,
        taskSelected: null
    }

    // Dispatch
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // Get tasks by projectId from outside
    const setNewTasksState = projectId =>{
        dispatch({
            type: GET_TASKSBYID,
            payload: projectId
        })
    };

    // Put newTasks into the list
    const setAddTaskToList = newTask =>{
        //newProject.id = uuid();
        // Insert to newTasks State
        dispatch({
            type: ADDNEWTASK_TOLIST,
            payload: newTask
        })
    }

    // Errors while trying to add a newTask
    const setShowErrorFormState = () =>{
        dispatch({
            type: FORM_VALIDATION
        })
    }

    
    const setDeleteTask = newTaskId =>{
        dispatch({
            type: DELETE_TASK,
            payload: newTaskId
        })
    }
    // Change the complete from true to false 
    const setCompleteTask = newTask =>{
        dispatch({
            type: COMPLETE_TASK,
            payload: newTask
        })
    }

    // Get a task that is going to be edited
    const getOngoingTask = newTask =>{
        dispatch({
            type: ONGOING_TASK,
            payload: newTask
        })
    }
    
    // Update a task that after been edited
    const setUpdateTask = newTask =>{
        dispatch({
            type: UPDATE_TASK,
            payload: newTask
        })
    }


/*
    // Put newTasks into the list
    const setAddToListState = newProject =>{
        newProject.id = uuid();
        // Insert to newTasks State
        dispatch({
            type: ADDNEWPROJECT_TOLIST,
            payload: newProject
        })
    }
*/


    return (
        <taskContext.Provider
        value={{
            newTasksState: state.newTasks,
            taskProjectDataState: state.taskProjectData,
            formErrorState: state.formError,
            selectedTaskState: state.taskSelected,
            setNewTasksState,
            setAddTaskToList,
            setShowErrorFormState,
            setDeleteTask,
            setCompleteTask,
            getOngoingTask,
            setUpdateTask
          }}
        >
            {props.children}
        </taskContext.Provider>
    )

};

export default TaskState;
