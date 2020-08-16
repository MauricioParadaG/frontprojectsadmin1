import React, {useContext, useState, useEffect} from 'react';
import {ProjectContext} from '../../context/projects/projectContext';
import {taskContext} from '../../context/task/taskContext';

const FormTaskComponent = () => {

    const projectsContext = useContext(ProjectContext);
    const tasksContext = useContext(taskContext);

    useEffect(() => {
        if(tasksContext.selectedTaskState !== null){
            setNewTaskState(tasksContext.selectedTaskState)
        } else {
            setNewTaskState({
                name:''
            })
          }
    }, [tasksContext.selectedTaskState]);


    const [newTask, setNewTaskState] = useState({
        name:''
    }
    );

    // Checking that a project got selected
    if(!projectsContext.selectedProjectState) return null;

    const [actualProject] = projectsContext.selectedProjectState;

    const onChangeTask = event => {
        setNewTaskState({
            ...newTask,
            // adding an ID - uuid library
            //id: uuid(),
            // adding the form info to the state
            [event.target.name]: event.target.value
        });
    }  


    const onSubmit = event => {
        event.preventDefault();

        if (newTask.name === '') {
            tasksContext.setShowErrorFormState();
            return;
        }

        // Checking if is editing or adding new task
        if(tasksContext.selectedTaskState === null){
            // adding some fields to the newTasks state
            newTask.completed = false;
            newTask.projectId = actualProject.id;

            tasksContext.setAddTaskToList(newTask);
        } 
        tasksContext.setUpdateTask(newTask);


        // Sending the new task to the Listed Tasks
        tasksContext.setNewTasksState(actualProject.id);

        setNewTaskState({
            name:''
        })
    }

    return (
        <div className="formular">
            <form onSubmit={onSubmit}>
                <div className="container-input">
                    <input type="text"
                    className="input-text"
                    placeholder="Task Name..."
                    name="name"
                    onChange={onChangeTask}
                    value={newTask.name}
                    />
                </div>

                <div className="container-input">
                    <input type="submit"
                    className="btn btn-primary btn-submit btn-block"
                    value={tasksContext.selectedTaskState ? 'Edit task' : 'Add task'} 
                    />
                </div>
            </form>

            { (tasksContext.formErrorState) ?
            <p className="message error">A task name is required</p>

            : null
            
            }

        </div>
    )
}

export default FormTaskComponent;
