import React, {useContext} from 'react';
import {ProjectContext} from '../../context/projects/projectContext';
//
import {taskContext} from '../../context/task/taskContext';

const ProjectComponent = props => {

    const projectsContext = useContext(ProjectContext);
    const tasksContext = useContext(taskContext);

    const onClick = () => {
        projectsContext.setselectedProjectState(props.newProjectsState.id);

        tasksContext.setNewTasksState(props.newProjectsState.id);
    }

    return (
        <li>
            
            <button
            type="button"
            className="btn btn-blank"
            onClick={onClick}
            >
                {props.newProjectsState.name}
            </button>
        </li>
    )
}

export default ProjectComponent;
