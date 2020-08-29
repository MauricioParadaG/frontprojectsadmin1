import {GET_TASKSBYID, ADDNEWTASK_TOLIST, FORM_VALIDATION, DELETE_TASK, COMPLETE_TASK, ONGOING_TASK, UPDATE_TASK} from '../../types/index';

export default (state, action) => {
    switch (action.type){            
        case GET_TASKSBYID:
            return {
                ...state,
                taskProjectData: state.taskProjectData.filter(newTask => newTask.projectId === action.payload)
            }

        case ADDNEWTASK_TOLIST:
            return {
                ...state,
                taskProjectData: [...state.taskProjectData, action.payload],
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
                taskProjectData: state.taskProjectData.filter(deleteTask => deleteTask.id !== action.payload)
                //selectedProject: null
            }  
        
        case COMPLETE_TASK:
            return {
                ...state,
                taskProjectData: state.taskProjectData.map(newTask => newTask.id === action.payload.id ?
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
                taskProjectData: state.taskProjectData.map(newTask => newTask.id === action.payload.id ?
                    action.payload
                    : newTask
                    ),
                taskSelected: null
            }


        default: 
        return state;
    }
}
