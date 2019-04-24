import { Component } from 'react';

class ErrorSwallower extends Component {
  state = {
    error: null,
  };
  componentDidCatch(e) {
    this.setState({ error: e });
    console.error('error occurred', e);
  }
  render() {
    if (this.state.error) {
      return null;
    }
    return this.props.children;
  }
}

export default ErrorSwallower;
