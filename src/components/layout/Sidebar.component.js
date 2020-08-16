import React from 'react';
import NewProjectComponent from '../projects/NewProject.component';
import ListedProjectsComponent from '../projects/ListedProjects.component';

const SidebarComponent = () => {
    return (
        <aside>
            <h1>MERN<span>Tasks</span> </h1>

            <NewProjectComponent/>
            
            <div className="projects">
                <h2>Projects List</h2>
                <ListedProjectsComponent/>

            </div>
        </aside>
    )
}

export default SidebarComponent;
