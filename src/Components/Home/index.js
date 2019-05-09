import React from 'react';
import NavMain from '../NavMain';
import NavSide from '../NavSide';
import Lottie from 'react-lottie';
import animationData from '../../../public/logo-animation/data.json';

import './index.scss';

const loadPhaseImages = [
  {
    src: '/background-brooklyn-cropped-masked.png',
  },
  {
    src: '/clouds-tile.png',
  }
];

const delayBtwCloudsAndLogo = 500;
let loadPhase = 0;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      isStopped: false,
      isPaused: false,
      loadPhase: 0,
    };
  }

  componentDidMount() {
    this.setState({
      isLoaded: true,
    });
  }

  handleImageLoaded = e => {
    // use loadPhase instead of this.state.loadPhase to ensure that
    // react doesn't skip one when it optimizes
    ++loadPhase;

    if (loadPhase === 2) {
      this.setState({
        loadPhase: loadPhase,
      });

      setTimeout(() => {
        ++loadPhase

        this.setState({
          loadPhase: loadPhase
        });
      }, delayBtwCloudsAndLogo);
    }
  }

  handleImageError = e => {
    console.log('One of the images failed to load')
  }

  render() {
    // for temp testing
    let shouldShowClouds = true;
    let shouldShowDemo;

    if (typeof window !== 'undefined' && window.location.search.indexOf('demo') > 0) {
      shouldShowDemo = true;
    }

    const defaultOptions = {
      // loop, but we'll pause the animation at the end of each loop.
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      },
    };

    const imgSrc0 = this.state.isLoaded ? loadPhaseImages[0].src : null;
    const imgSrc1 = this.state.isLoaded ? loadPhaseImages[1].src : null;

    return (
      <div className={`page page-home ${shouldShowClouds ? 'page-clouds' : ''} ${shouldShowDemo ? 'demo' : ''}`}>
        <div className="hidden-preloaders">
          <img src={imgSrc0} onLoad={this.handleImageLoaded} onError={this.handleImageError} />
          <img src={imgSrc1} onLoad={this.handleImageLoaded} onError={this.handleImageError} />
        </div>
        <NavMain activePage='home'/>
        <div className="page-inner">
          <div className="page-panel">
            <div className="bg bg-building"
              style={this.state.loadPhase > 1 ? {
                backgroundImage: `url(${loadPhaseImages[0].src})`,
                opacity: 1,
              } : {}}
            />
            <div className="bg bg-clouds-wrap" style={this.state.loadPhase > 1 ? {
                  opacity: 1,
              } : {}}
            >
              <div className="bg bg-clouds"
                style={this.state.loadPhase > 1 ? {
                  backgroundImage: `url(${loadPhaseImages[1].src})`,
                } : {}}
              />
            </div>
            <div className="animation">
              <a href="/projects" >
              {
                this.state.loadPhase > 2 && <Lottie
                  options={defaultOptions}
                  ref={el => {this.lottie = el}}
                  isStopped={this.state.isStopped}
                  isPaused={this.state.isPaused}
                />
              }
              </a>
            </div>
          </div>
        </div>
        <NavSide />
      </div>
    );
  }
}

export default Home;
