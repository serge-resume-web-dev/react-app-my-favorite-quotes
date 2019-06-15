import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { NavLink, Redirect } from 'react-router-dom'

import { fetchProjectbyId } from "../../store/actions/projectActions"

import './ProjectDetails.scss'

class ProjectDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
    }
  }
  setRedirect = () => {
    this.setState({
      redirect: true,
    })
  }
  componentDidMount() {
    this.props.fetchProjectById(this.props.match.params.id);
    window.scrollTo(0, 0);
  }
  render() {
    const projectById = this.props.projectById;
    if (this.state.redirect) {
      return <Redirect to="/" />
    }else{
      return (
        <React.Fragment>
        <div className="project-details-backdrop"  onClick={this.setRedirect}></div>
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content project-content">
              <span className="card-title">
                <NavLink to="/" title="GO BACK">
                  <i className="fas fa-backward"></i>
                </NavLink>
                <h3>
                  {projectById ? projectById.title : null}
                </h3>
                <p>
                  By {
                    projectById ? projectById.author : 'Unknown Author'
                  }
                </p>
              </span>
              <p style={{ fontSize: '18px' }}>{projectById ? projectById.content : null} </p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted user:  {projectById ? projectById.postedBy : null}</div>
              <div>{projectById ? projectById.date : null}</div>
            </div>
          </div>
        </div>
        </React.Fragment>
      );
    }
    
  }
}

const mapStateToProps = (state) => (
  {
    projectById: state.project.projectById
  }
)

const mapDispatchToProps = dispatch => (
  {
    fetchProjectById: (id) => dispatch(fetchProjectbyId(id)),
  }
)

ProjectDetails.propTypes = {
  projectById: PropTypes.object,
  fetchProjectById: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)