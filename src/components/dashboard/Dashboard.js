import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import { fetchProjects } from "../../store/actions/projectActions"

import ProjectList from '../projects/ProjectList'
import Loader from '../UI/Loader/Loader'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: '',
      searchAuthor: ''
    }
  }
  
  onChange1 = e => {
    this.setState({
      searchTitle: e.target.value,
    })
  }
  onChange2 = e => {
    this.setState({
      searchAuthor: e.target.value,
    })
  }
  componentDidMount(){
    this.props.fetchNewProjects()
  }
  
  render() {
    
    const projectArray = this.props.projects 
    ? Object.keys(this.props.projects).map(key=>Object.assign({}, this.props.projects[key], {id: key} )) 
    : [] ;

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="input-field col s12 m6">
            <i className="material-icons prefix">search</i>
            <input 
              id="icon_prefix" 
              type="text" 
              className="validate" 
              onChange = {this.onChange1} 
              style={{borderBottom: '2px solid #e91e63 ', color: '#e91e63'}}
            />
            <label htmlFor="icon_prefix" style={{color: '#e91e63'}}>Search by title</label>
          </div>
          <div className="input-field col s12 m6">
            <i className="material-icons prefix">search</i>
            <input 
              id="icon_prefix" 
              type="text" 
              className="validate" 
              onChange = {this.onChange2} 
              style={{borderBottom: '2px solid #e91e63 ', color: '#e91e63'}}
            />
            <label htmlFor="icon_prefix" style={{color: '#e91e63'}}>Search by author</label>
          </div>
        </div>
        {
          this.props.loading && projectArray.length===0
          ? <Loader/>
          :<div className="row">
            <ProjectList 
                projects={projectArray} 
                searchTitle={this.state.searchTitle}
                searchAuthor={this.state.searchAuthor}
            />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    projects: state.project.projects,
    loading: state.project.loading
  }
}

const mapDispatchToProps = dispatch =>(
  {
    fetchNewProjects: ()=>{
      dispatch(fetchProjects())
    }
  }
)

Dashboard.propTypes =  {
  projects: PropTypes.oneOfType([
    PropTypes.object, PropTypes.array,
  ]),
  loading: PropTypes.bool,
  fetchNewProjects: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)