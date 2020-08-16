import React, {useContext, useEffect} from 'react';
import ProjectComponent from './Project.component';
import {ProjectContext} from '../../context/projects/projectContext';

const ListedProjectsComponent = () => {

    //useContext State-> projectsContext.newProjectsState
    const projectsContext = useContext(ProjectContext);

    // Getting the data of projects from the Database
    useEffect(() => {
        projectsContext.setNewProjectsState();
        //eslint-disable-next-line
    }, []);

    if (projectsContext.newProjectsState.length === 0) return <p>Add your first project</p>; 

    

    return (
        <ul className="listed-projects">
            {projectsContext.newProjectsState.map(project =>(
            <ProjectComponent
            key={project.id}
            newProjectsState={project}
            />
        ))} 
        </ul>
    )
}

export default ListedProjectsComponent;
