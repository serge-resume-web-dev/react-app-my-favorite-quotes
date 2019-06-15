import React from 'react'
import PropTypes from 'prop-types'

import ProjectSummary from './ProjectSummary'

const ProjectList = ({projects, searchTitle, searchAuthor}) => {
  return (
    <div className="project-list section col s12 m6"> 
     { 
       projects && projects.map(item =>
        <ProjectSummary key={item.id}
          project={item} 
          searchTitle={searchTitle}
          searchAuthor={searchAuthor}
        />
      )
      }
    </div>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.array, 
  searchTitle: PropTypes.string, 
  searchAuthor: PropTypes.string,
}

export default ProjectList