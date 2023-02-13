import { Component } from 'react';

import { getStore, Provider } from 'easy-soft-dva';
import { getModelCollection, setLoggerDisplaySwitch } from 'easy-soft-utility';

import { prepareModel } from './models';

import './app.less';

setLoggerDisplaySwitch(true);

prepareModel();

const models = getModelCollection();

class App extends Component {
  constructor(properties) {
    super(properties);

    this.initDva();
  }

  initDva = () => {
    this.store = getStore(models);
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
