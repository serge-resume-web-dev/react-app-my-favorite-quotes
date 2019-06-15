import { FETCH_PROJECTS_START, 
  FETCH_PROJECTS_SUCCESS, 
  FETCH_PROJECTS_ERROR, 
  FETCH_PROJECTS_BY_ID, 
  DELETE_PROJECT 
} from "../actions/projectActions"; 

const initState = {
  projects: [],
  loading: false,
  error: null,
  projectbyId: {},
  deletedProjectId: [],
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_START:
    return {...state, loading: true };
    case FETCH_PROJECTS_SUCCESS:
    return {...state, loading: false, projects: action.projects};
    case FETCH_PROJECTS_ERROR:
    return {...state, error: action.error};
    case FETCH_PROJECTS_BY_ID:
    return {...state, projectById: action.projectById};
    case DELETE_PROJECT:
    return {...state, deletedProjectId: action.deletedProject}
    default : return state;  
  }  
};

export default projectReducer;