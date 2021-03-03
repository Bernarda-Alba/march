import { Component } from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends Component {
 // componentDidUpdate가 호출될때 prevProps가 자동으로 넘어가는 모양. 따로 넘겨줄 필요는 없다
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)