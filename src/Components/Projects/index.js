import React from 'react';
import { InBrowserOnly } from '../../utils/InBrowserOnly';
import NavMain from '../NavMain';
import NavSide from '../NavSide';
import ProjectSummary from '../ProjectSummary';
import PortfolioImage from '../PortfolioImage';
import portfolioData from '../../portfolio-data';
import './index.scss';

const projects = portfolioData;
const keyLeft = 37;
// const keyUp = 38;
const keyRight = 39;
// const keyDown = 40;

class Projects extends React.Component {
  constructor() {
    super();

    this.state = {
      currentProjectIdx: 0,
    };

    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidMount () {
    this.preloadImages();
    this.bindEventListeners();
  }

  componentWillUnmount() {
    this.unbindEventListeners();
  }

  bindEventListeners() {
    document.addEventListener('keydown', this.handleKeypress);
  }

  unbindEventListeners() {
    document.removeEventListener('keydown', this.handleKeypress);
  }

  preloadImages() {
    // give the page load a head start
    const delay = 100;

    setTimeout(() => {
      projects.forEach((project) => {
        const img = new Image();
        img.src = project.image;
      });
    }, delay);
  }

  getProjectIdx(newIdx) {
    const projectsLen = projects.length;

    if (typeof newIdx === 'undefined') {
      return 0;
    }

    // wrap to bottom
    if (newIdx >= projectsLen) {
      return 0;
    }

    // wrap to top
    if (newIdx < 0) {
      return projectsLen - 1;
    }

    return newIdx;
  }

  handleClickPrev() {
    const currProjIdx = this.getProjectIdx(this.state.currentProjectIdx - 1);
    this.setState({currentProjectIdx: currProjIdx});
    window.scrollTo(0, 0);
  }

  handleClickNext() {
    const currProjIdx = this.getProjectIdx(this.state.currentProjectIdx + 1);
    this.setState({currentProjectIdx: currProjIdx});
    window.scrollTo(0, 0);
  }

  handleKeypress(e) {
    if (e.keyCode === keyLeft) {
      this.handleClickPrev();
    }

    if (e.keyCode === keyRight) {
      this.handleClickNext();
    }
  }

  getProjectFromIdx(targetIdx) {
    return projects.find((project, idx) => {
      return idx === targetIdx;
    });
  }

  render() {
    const project = this.getProjectFromIdx(this.state.currentProjectIdx);
    const link = project.link || project.linkPortfolio;

    return (
      <InBrowserOnly>
        <div className="page page-projects side-arrows">
          <NavMain activePage='projects'/>

          <div className="page-inner">
            <div className="projects__nav arrow-prev">
              <button className="icon-arrow-up" onClick={this.handleClickPrev}></button>
            </div>

            <section className="two-col-panel scroll portfolio-panel portfolio-summary-section">
              <div className="portfolio-summary">
                { // todo
                  projects.map((project, idx) => {
                    return <ProjectSummary project={project} key={idx} isCurrentProject={this.state.currentProjectIdx === idx} />
                  })
                }
              </div>
            </section>

            <section className="two-col-panel portfolio-panel">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <PortfolioImage project={project} currentProjectIdx={this.state.currentProjectIdx} />
              </a>
            </section>

            <div className="projects__nav arrow-next">
              <button className="icon-arrow-up" onClick={this.handleClickNext}></button>
            </div>
          </div>

          <NavSide />
        </div>
      </InBrowserOnly>
    );
  }
}

export default Projects;
