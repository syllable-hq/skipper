import React from 'react';
import LazyImg from '../LazyImg';

import './index.scss';

class PortfolioImage extends React.Component {
  constructor() {
    super();

    this.state = {
      currentSlide: 0,
    };
  }

  render() {
    const {
      project,
    } = this.props;

    return (
      <React.Fragment>
        <LazyImg src={project.image } alt={project.name}  />
      </React.Fragment>
    );
  }
}

export default PortfolioImage;
