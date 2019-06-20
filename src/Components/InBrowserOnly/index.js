import React from 'react';

class InBrowserOnly extends React.Component {
  state = { mounted: false }
  componentDidMount() { this.setState({ mounted: true }) }
  render() {
    if (!this.state.mounted) return null;
    return this.props.children;
  }
}

export default InBrowserOnly;