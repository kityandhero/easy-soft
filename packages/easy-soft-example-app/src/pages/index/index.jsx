import { Component } from 'react';
// import { connect } from 'react-redux';
import { Button, Text, View } from '@tarojs/components';

// import { add, asyncAdd, minus } from '../../actions/counter';
import './index.less';

// definePageConfig({
//   navigationBarTitleText: '首页',
// });

// @connect(
//   ({ counter }) => ({
//     counter,
//   }),
//   (dispatch) => ({
//     add() {
//       dispatch(add());
//     },
//     dec() {
//       dispatch(minus());
//     },
//     asyncAdd() {
//       dispatch(asyncAdd());
//     },
//   }),
// )
class Index extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Button className="add_btn" onClick={this.props.add}>
          +
        </Button>
        <Button className="dec_btn" onClick={this.props.dec}>
          -
        </Button>
        <Button className="dec_btn" onClick={this.props.asyncAdd}>
          async
        </Button>
        <View>
          <Text>{this.props.counter.num}</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
        </View>
      </View>
    );
  }
}

export default Index;
