import React from 'react';
import './index.scss';

class LazyImg extends React.Component {
  constructor(props) {
    super(props);

    this.setLoader = this.setLoader.bind(this);
    this.state = { imageStatus: "" };
  }

  setLoader() {
    this.setState({ imageStatus: "loading" });
  }

  handleImageLoaded() {
    clearTimeout(this.loaderTimeout);
    this.setState({ imageStatus: "loaded" });
  }

  handleImageErrored() {
    clearTimeout(this.loaderTimeout);
    this.setState({ imageStatus: "failed to load" });
  }

  componentWillReceiveProps(props) {
    clearTimeout(this.loaderTimeout);
    this.loaderTimeout = setTimeout(this.setLoader, 50);
  }

  render() {
    return (
      <div
        className="lazy-img"
        data-status={this.state.imageStatus}
      >
        <span className="loading-icon icon-spin2 animate-spin"></span>
        <img
          src={this.props.src}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
        />
      </div>
    );
  }
}
export default LazyImg;