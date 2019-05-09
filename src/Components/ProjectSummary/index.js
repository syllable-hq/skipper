import React from 'react';

import './index.scss';

class ProjectSummary extends React.Component {
  render() {
    const {
      project,
    } = this.props;

    const link = project.link || project.linkPortfolio;

    return (
      <div className="project-summary" data-is-current-project={this.props.isCurrentProject} >
        <div className="project-summary__name">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <span className="pipe">|</span>
            {project.name}
            <span className="pipe">|</span>
          </a>
        </div>
        <div className="project-summary__text">
          {project.summary}
        </div>
        <div className="project-summary__skills">
          {
            project.skills.map(skill => {
              return <span className="skill" key={skill}>
                <span className="pipe">|</span>
                <span>{skill}</span>
              </span>
            })
          }
          {/*one more to cap it off*/}
          <span className="pipe">|</span>
        </div>
      </div>
    );
  }
}

export default ProjectSummary;
