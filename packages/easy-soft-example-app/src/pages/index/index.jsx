import { Component } from 'react';
import { View } from '@tarojs/components';

import { testLogger } from '../../utils/logTest';

import './index.less';

class Index extends Component {
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  doTest = () => {
    testLogger();
  };

  render() {
    this.doTest();

    return <View className="index"></View>;
  }
}

export default Index;
