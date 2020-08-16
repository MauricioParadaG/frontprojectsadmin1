import React, {useContext} from 'react';
import TaskComponent from './Task.component';

import {ProjectContext} from '../../context/projects/projectContext';
import {taskContext} from '../../context/task/taskContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListedTasksComponent = () => {

    const projectsContext = useContext(ProjectContext);
    const tasksContext = useContext(taskContext);

    // Checking that a project got selected
    if(!projectsContext.selectedProjectState) return <h2>Select a project</h2>;

    const [actualProject] = projectsContext.selectedProjectState;

    //const newTasks = [];
/*
    // Getting the data of tasks from the Database
    useEffect(() => {
        tasksContext.setNewProjectsState();
    }, []);
*/

    const onClick = () => {
        projectsContext.setDeleteProjectState(actualProject.id)
    }

    return (
        <>
            <h2>Project: {actualProject.name}</h2>

            <ul className="listed-tasks">

            { tasksContext.taskProjectDataState.length === 0 ?
            <li className="task"><p>There is not a task created yet</p></li>
            :
            <TransitionGroup>
            {tasksContext.taskProjectDataState.map(task =>(
                <CSSTransition
                key={task.id}
                timeout={200}
                classNames="task">
                    <TaskComponent
                    newTasksState={task}
                    />
                </CSSTransition>
            ))}
        
            </TransitionGroup>

            }
            </ul>
        
            <button type="button"
                className="btn btn-primary"
                onClick = {onClick}
                >
                Delete Project &times;
            </button>

        </>
    )
}

export default ListedTasksComponent;
