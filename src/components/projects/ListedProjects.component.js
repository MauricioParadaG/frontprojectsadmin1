import React, {useContext, useEffect} from 'react';
import ProjectComponent from './Project.component';
import {ProjectContext} from '../../context/projects/projectContext';

import AlertContext from '../../context/alerts/alertContext';

const ListedProjectsComponent = () => {

    const alertContext = useContext(AlertContext);
    const {alert, showAlert} = alertContext;

    //useContext State-> projectsContext.newProjectsState
    const projectsContext = useContext(ProjectContext);

    // Getting the data of projects from the Database
    useEffect(() => {
        if(projectsContext.message){
            showAlert(projectsContext.message.msg, projectsContext.message.category);
        }

        projectsContext.setNewProjectsState();
        //eslint-disable-next-line
    }, [projectsContext.message]);
    

    if (projectsContext.newProjectsState.length === 0) return <p>Add your first project</p>; 

    

    return (
        <ul className="listed-projects">
            { alert ? ( <div className={`alert ${alert.category}`}> {alert.msg} </div> )  : null }

            {projectsContext.newProjectsState.map(project =>(
            <ProjectComponent
            key={project._id}
            newProjectsState={project}
            />
        ))} 
        </ul>
    )
}

export default ListedProjectsComponent;
