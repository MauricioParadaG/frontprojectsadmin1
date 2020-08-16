import React, {useContext, useState} from 'react';

import {ProjectContext} from '../../context/projects/projectContext';

const NewProjectComponent = () => {

    // getting the state of the form with useContext and Reducer -> projectsContext.newProjectFormState
    const projectsContext = useContext(ProjectContext);



    const [newProject, setNewProjectState] = useState({
        name:''
    }
    );

    const onChangeProject = event => {
        setNewProjectState({
            ...newProject,
            // adding an ID - uuid library
            //id: uuid(),
            // adding the form info to the state
            [event.target.name]: event.target.value
        });
    }  

    const onSubmit = event => {
        event.preventDefault();

        if (newProject.name === '') {
            projectsContext.setShowErrorFormState();
            return;
        }

        projectsContext.setAddToListState(newProject);

        setNewProjectState({
            name:''
        })

    }

    const onClick = () => {
        projectsContext.setShowFormState()
    }


    return (
        <>
            <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={onClick}
            >
            New Project   
            </button>

            { (projectsContext.newProjectFormState) ?
                <form 
                className="form-new-project"
                onSubmit={onSubmit}
                >
                    <input type="text"
                    className="input-text"
                    placeholder="Project Name"
                    name="name"
                    onChange={onChangeProject}
                    value={newProject.name}
                    />
    
                    <input type="submit"
                    className="btn btn-block btn-primary"
                    value="Add Project"
                    />
    
                </form>

                :
                null 

            }

        { (projectsContext.formErrorState) ?
          <p className="message error">A project name is required</p>

        : null
        
        }

        </>
    )
}

export default NewProjectComponent;
