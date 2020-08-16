import {GET_TASKSBYID, ADDNEWTASK_TOLIST, FORM_VALIDATION, DELETE_TASK, COMPLETE_TASK, ONGOING_TASK, UPDATE_TASK} from '../../types/index';

export default (state, action) => {
    switch (action.type){
/*
        case FORM_PROJECT:
            return {
                ...state,
                form: true
            }
            
        case GET_PROJECTS:
            return {
                ...state,
                newProjects: action.payload
            }

        case ADDNEWPROJECT_TOLIST:
            return {
                ...state,
                newProjects: [...state.newProjects, action.payload],
                form: false,
                formError: false
            }
            
        case FORM_VALIDATION:
            return {
                ...state,
                formError: true
            }

        case SELECTED_PROJECT:
            return {
                ...state,
                selectedProject: state.newProjects.filter(selectedProject => selectedProject.id === action.payload)
            }    

        case DELETE_PROJECT:
            return {
                ...state,
                newProjects: state.newProjects.filter(deleteProject => deleteProject.id !== action.payload),
                selectedProject: null
            }  
*/
            
        case GET_TASKSBYID:
            return {
                ...state,
                taskProjectData: state.newTasks.filter(newTask => newTask.projectId === action.payload)
            }

        case ADDNEWTASK_TOLIST:
            return {
                ...state,
                newTasks: [...state.newTasks, action.payload],
                formError: false
            }

        case FORM_VALIDATION:
            return {
                ...state,
                formError: true
            }

        case DELETE_TASK:
            return {
                ...state,
                newTasks: state.newTasks.filter(deleteTask => deleteTask.id !== action.payload)
                //selectedProject: null
            }  
        
        case COMPLETE_TASK:
            return {
                ...state,
                newTasks: state.newTasks.map(newTask => newTask.id === action.payload.id ?
                    action.payload
                    : newTask
                    )
            }

        case ONGOING_TASK:
            return {
                ...state,
                taskSelected: action.payload
            }

        case UPDATE_TASK:
            return {
                ...state,
                newTasks: state.newTasks.map(newTask => newTask.id === action.payload.id ?
                    action.payload
                    : newTask
                    ),
                taskSelected: null
            }


        default: 
        return state;
    }
}
