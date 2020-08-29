import React, { useReducer } from 'react';
//import {v4 as uuid} from "uuid";

import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {FORM_PROJECT, GET_PROJECTS, ADDNEWPROJECT_TOLIST, FORM_VALIDATION, SELECTED_PROJECT, DELETE_PROJECT, PROJECTDELETE_ERROR} from '../../types/index';

import clientAxios from '../../config/axios';

// Data simulation from outside, with the backend it is not anymore required

////////////////////////////////

const ProjectState = props => {

    /* Not required anymore as the projects now are comming from an endpoint
    const newProjects = [
        {id: 1, name: 'Project A'},
        {id: 2, name: 'Project B'},
        {id: 3, name: 'Project C'},
        {id: 4, name: 'MERN Project'},
    ];
    */

    const initialState = {
        newProjects : [],
        form : false,
        formError: false,
        selectedProject: null,
        message: null
    }

    // Dispatch
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // CRUD Project

    const setShowFormState = () =>{
        dispatch({
            type: FORM_PROJECT
        })
    }

    /*
    // Get name projects from inside this state, this was only done for data simulation.
    const setNewProjectsState = () =>{
        dispatch({
            type: GET_PROJECTS,
            payload: newProjects
        })
    }
    */
    // Getting the projects from the database
   const setNewProjectsState = async () =>{
        try {
            const apiAnswerofForm = await clientAxios.get('/api/projects');
            //console.log(apiAnswerofForm);
        
        dispatch({
            type: GET_PROJECTS,
            payload: apiAnswerofForm.data.projects
        })
        } catch (error) {
            console.log(error.response.data.msg);
         //   console.log("paso por aqui? token login al carrer");
            // define error msg to reducer
            const alert = {
                msg: 'There was an error while getting the list of projects',
                category: 'alert-error'
            }

            dispatch({
                type: PROJECTDELETE_ERROR,
                payload: alert
            })
        }
    }

    /*
    // Put newProjects into the list
    const setAddToListState = newProject =>{
        newProject.id = uuid();
        // Insert to newProjects State
        dispatch({
            type: ADDNEWPROJECT_TOLIST,
            payload: newProject
        })
    }
    */

    // Adding newProjects into the database
    const setAddToListState = async newProject =>{

        try {
            const apiAnswerofForm = await clientAxios.post('/api/projects', newProject);
            //console.log(apiAnswerofForm);
            
        // Insert to newProjects State
        dispatch({
            type: ADDNEWPROJECT_TOLIST,
            payload: apiAnswerofForm.data
        })

        } catch (error) {
            console.log(error.response.data.msg);
         //   console.log("paso por aqui? token login al carrer");
            // define error msg to reducer
            const alert = {
                msg: 'There was an error while deleting a project',
                category: 'alert-error'
            }

            dispatch({
                type: PROJECTDELETE_ERROR,
                payload: alert
            })
        }
    }


    // Errors while trying to add a newProject
    const setShowErrorFormState = () =>{
        dispatch({
            type: FORM_VALIDATION
        })
    }

    // Changing the selected project information
    const setselectedProjectState = newProjectID =>{
        dispatch({
            type: SELECTED_PROJECT,
            payload: newProjectID
        })
    }

    const setDeleteProjectState = async newProjectID =>{
        try {
            await clientAxios.delete(`/api/projects/${newProjectID}`);

            dispatch({
                type: DELETE_PROJECT,
                payload: newProjectID
            })
        } catch (error) {
            console.log(error.response.data.msg);
         //   console.log("paso por aqui? token login al carrer");
            // define error msg to reducer
            const alert = {
                msg: 'There was an error while deleting a project',
                category: 'alert-error'
            }

            dispatch({
                type: PROJECTDELETE_ERROR,
                payload: alert
            })
        }
    }


    return (
        <projectContext.Provider
        value={{
            newProjectsState: state.newProjects,
            newProjectFormState: state.form,
            formErrorState: state.formError,
            selectedProjectState: state.selectedProject,
            message: state.message,
            setShowFormState,
            setNewProjectsState,
            setAddToListState,
            setShowErrorFormState,
            setselectedProjectState,
            setDeleteProjectState
          }}
        >
            {props.children}
        </projectContext.Provider>
    )

};

export default ProjectState;
