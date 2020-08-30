import React, {useContext} from 'react';
import {taskContext} from '../../context/task/taskContext';
import ProjectContext from '../../context/projects/projectContext';

const TaskComponent = props => {

    const projectsContext = useContext(ProjectContext);
    const {selectedProjectState} = projectsContext;

    const tasksContext = useContext(taskContext);

    // Extracting the actual project
    const [actualProject] = selectedProjectState;

    const onClickDelete = () => {
        tasksContext.setDeleteTask(props.newTasksState._id, actualProject._id);
        tasksContext.setNewTasksState(props.newTasksState.projectId);
    }

    const onClickComplete = () => {
        if(props.newTasksState.state){
            props.newTasksState.state = false;
        } else {
            props.newTasksState.state = true;
        }
        //tasksContext.setCompleteTask(props.newTasksState); changed for setUpdateTask
        tasksContext.setUpdateTask(props.newTasksState);
    }

    const onClickEdit = () => {
        tasksContext.getOngoingTask(props.newTasksState);
    }
    

    return (
        <>
          <li className="task shadow">
            <p>{props.newTasksState.name}</p>  

            <div className="status">
                {props.newTasksState.state ? 
                
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
