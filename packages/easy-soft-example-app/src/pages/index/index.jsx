import { Component } from 'react';
import { View } from '@tarojs/components';

import { doTest } from '../../utils/testAssist';

import './index.less';

class Index extends Component {
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  doTest = () => {
    doTest();
  };

  render() {
    this.doTest();

    return <View className="index">Hello Word</View>;
  }
}

export default Index;
