import { Component } from 'react';
import {
  clearStorageSync,
  getStorageSync,
  removeStorageSync,
  setStorageSync,
} from '@tarojs/taro';

import {
  ApplicationProvider,
  initializeApplication,
  setApplicationInitialOption,
} from 'easy-soft-dva';
import {
  setLocalStorageFlusher,
  setLocalStorageGetter,
  setLocalStorageRemover,
  setLocalStorageSetter,
  setLoggerDisplaySwitch,
} from 'easy-soft-utility';

import { prepareModel } from './models';

import './app.less';

setLoggerDisplaySwitch(false);

setLocalStorageGetter(getStorageSync);
setLocalStorageSetter(setStorageSync);
setLocalStorageRemover(removeStorageSync);
setLocalStorageFlusher(clearStorageSync);

prepareModel();

setApplicationInitialOption();
initializeApplication();

class App extends Component {
  constructor(properties) {
    super(properties);
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <ApplicationProvider>{this.props.children}</ApplicationProvider>;
  }
}

export default App;
