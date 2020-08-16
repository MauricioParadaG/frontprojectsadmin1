import React, {useContext, useEffect} from 'react';
import {taskContext} from '../../context/task/taskContext';
//import {ProjectContext} from '../../context/projects/projectContext';

const TaskComponent = props => {

    //const projectsContext = useContext(ProjectContext);
    const tasksContext = useContext(taskContext);

    const onClickDelete = () => {
        tasksContext.setDeleteTask(props.newTasksState.id);
        tasksContext.setNewTasksState(props.newTasksState.projectId);
    }

    const onClickComplete = () => {
        if(props.newTasksState.completed){
            props.newTasksState.completed = false;
        } else {
            props.newTasksState.completed = true;
        }
        tasksContext.setCompleteTask(props.newTasksState);
    }

    const onClickEdit = () => {
        tasksContext.getOngoingTask(props.newTasksState);
    }
    

    return (
        <>
          <li className="task shadow">
            <p>{props.newTasksState.name}</p>  

            <div className="status">
                {props.newTasksState.completed ? 
                
                <button type="button"
                className="complete"
                onClick={onClickComplete}
                >Completed</button>
                
                : 
                <button type="button"
                className="incomplete"
                onClick={onClickComplete}
                >Not Completed</button>
                }
            </div>

                <div className="actions">
                    <button type="button"
                    className="btn btn-primary"
                    onClick={onClickEdit}
                    >
                        Edit
                    </button>

                    <button type="button"
                    className="btn btn-secondary"
                    onClick={onClickDelete} 
                    >
                        Delete
                    </button>
                </div>

          </li>
          
        </>
    )
}

export default TaskComponent;
