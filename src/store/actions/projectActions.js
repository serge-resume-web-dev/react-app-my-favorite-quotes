import axios from 'axios'

//actions:
export const FETCH_PROJECTS_START = 'FETCH_PROJECTS_START'
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR'
export const FETCH_PROJECTS_BY_ID = 'FETCH_PROJECTS_BY_ID'
export const DELETE_PROJECT = 'DELETE_PROJECT'

// action creators:
export const createProject = (newProject)=> async dispatch =>{
    try{
        const response = await axios.post('https://my-project-app-2.firebaseio.com/projects.json', newProject);
        dispatch({type: 'CREATE_PROJECT', payload: response.data})
        
    }catch(error){
        console.log(error);   
    }
}

export const deleteProject = (projectId) => async dispatch => {
    try{
        await axios.delete(`https://my-project-app-2.firebaseio.com/projects/${projectId}.json`);
        dispatch(fetchProjects());
    }catch(error){
        dispatch(fetchProjectsError(error));
    }
}

export const fetchProjects = () => async dispatch =>{
    dispatch(fetchProjectsStart());
    try{
       const response = await axios.get('https://my-project-app-2.firebaseio.com/projects.json');
        dispatch(fetchProjectsSuccess(response.data));
    }catch(error){
        dispatch(fetchProjectsError(error));
    }
}

export const fetchProjectsStart = () => {
  return {
    type: FETCH_PROJECTS_START
  }
}

export const fetchProjectsSuccess = (projects) => {
    return{
        type: FETCH_PROJECTS_SUCCESS,
        projects
    }
};

export const fetchProjectsError = (error) => {
    return{
        type: FETCH_PROJECTS_ERROR,
        error
    }
}

export const deleteProjectReport = (projectId) => {
  return {
    type: DELETE_PROJECT,
    deletedProject: projectId
  }
}

export const fetchProjectByIdSuccess = (projectById) => {
  return{
      type: FETCH_PROJECTS_BY_ID,
      projectById
  }
}

export const fetchProjectbyId = (projectId) => async dispatch=>{
    
    dispatch(fetchProjectsStart());
    try{
        const response = await axios.get(`https://my-project-app-2.firebaseio.com/projects/${projectId}.json`);
        dispatch(fetchProjectByIdSuccess(response.data));
    }catch(err){
        dispatch(fetchProjectsError(err));
        console.log(err);  
    }
}
