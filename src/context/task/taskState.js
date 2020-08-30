import React, { useReducer } from 'react';
//import {v4 as uuid} from "uuid";

import taskContext from './taskContext';
import TaskReducer from './taskReducer';
import {GET_TASKSBYID, ADDNEWTASK_TOLIST, FORM_VALIDATION, DELETE_TASK, ONGOING_TASK, UPDATE_TASK} from '../../types/index';

import clientAxios from '../../config/axios';

const TaskState = props => {

    /* Old simulator for data from database
    const newTasks = [
        
    ];
    */

    const initialState = {
    /*
        // Simulating that comming form a database
        newTasks : [
        {id: 1, name: 'Task 1', completed: true, projectId: 1},
        {id: 2, name: 'Task 2', completed: false, projectId: 2},
        {id: 3, name: 'Task 3', completed: true, projectId: 3},
        {id: 4, name: 'Task 4', completed: false, projectId: 4},
        {id: 5, name: 'Task 5', completed: true, projectId: 1},
        {id: 6, name: 'Task 6', completed: false, projectId: 2}
    ],
    */
        //form : false,
        formError: false,
        taskProjectData: [],
        taskSelected: null
    }

    // Dispatch
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    /*
    // Get tasks by projectId from outside
    const setNewTasksState = projectId =>{
        dispatch({
            type: GET_TASKSBYID,
            payload: projectId
        })
    };
    */
    // Get tasks by projectId from outside
    const setNewTasksState = async project =>{
        //console.log(project);
        try {
            const apiAnswerofForm = await clientAxios.get('/api/tasks', {params: {project}});
            //console.log(apiAnswerofForm);
        dispatch({
            type: GET_TASKSBYID,
            payload: apiAnswerofForm.data.tasks
        })

        } catch (error) {
            console.log(error);
        }
    };


    /*
    // Put newTasks into the list
    const setAddTaskToList = newTask =>{
        //newProject.id = uuid();
        // Insert to newTasks State
        dispatch({
            type: ADDNEWTASK_TOLIST,
            payload: newTask
        })
    }
    */

        // Put newTasks into the list
    const setAddTaskToList = async newTask =>{
        //console.log(newTask);
        try {
            const apiAnswerofForm = await clientAxios.post('/api/tasks', newTask);
            console.log(apiAnswerofForm);
            
        // Insert to newTasks State
        dispatch({
            type: ADDNEWTASK_TOLIST,
            payload: apiAnswerofForm.data.task
        })

        } catch (error) {
            console.log(error);
        }
    };

    // Errors while trying to add a newTask
    const setShowErrorFormState = () =>{
        dispatch({
            type: FORM_VALIDATION
        })
    };

    
    const setDeleteTask = async (newTaskId, project) =>{
        try {
            await clientAxios.delete(`/api/tasks/${newTaskId}`, {params: {project}});
        dispatch({
            type: DELETE_TASK,
            payload: newTaskId
        })
        } catch (error) {
            console.log(error);
        }
    };

    /*
    // Change the complete from true to false 
    const setCompleteTask = newTask =>{
        dispatch({
            type: COMPLETE_TASK,
            payload: newTask
        })
    };
    */
    // Update a task that after been edited
    const setUpdateTask = async newTask =>{
        //console.log(newTask);
        try {
            const apiAnswerofForm = await clientAxios.put(`/api/tasks/${newTask._id}`, newTask);
            console.log(apiAnswerofForm);

        dispatch({
            type: UPDATE_TASK,
            payload: apiAnswerofForm.data.task
        })
        } catch (error) {
            console.log(error);
        }
    };

    // Get a task that is going to be edited
    const getOngoingTask = newTask =>{
        dispatch({
            type: ONGOING_TASK,
            payload: newTask
        })
    };
    
    
    return (
        <taskContext.Provider
        value={{
            //newTasksState: state.newTasks,
            taskProjectDataState: state.taskProjectData,
            formErrorState: state.formError,
            selectedTaskState: state.taskSelected,
            setNewTasksState,
            setAddTaskToList,
            setShowErrorFormState,
            setDeleteTask,
            //setCompleteTask, Joining this with setUpdateTask
            getOngoingTask,
            setUpdateTask
          }}
        >
            {props.children}
        </taskContext.Provider>
    )

};

export default TaskState;
