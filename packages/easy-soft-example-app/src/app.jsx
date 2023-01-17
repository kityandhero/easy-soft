import { getStore, Provider } from 'easy-soft-dva';
import { Component } from 'react';

// import { Provider } from 'react-redux';
import './app.less';

class App extends Component {
  constructor(props) {
    super(props);

    this.initDva();
  }

  initDva = () => {
    this.store = getStore([]);
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}

export default App;
