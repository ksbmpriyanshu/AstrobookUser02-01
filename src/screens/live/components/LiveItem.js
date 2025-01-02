import {Text, View, findNodeHandle} from 'react-native';
import React, {Component} from 'react';
import {Colors} from '../../../assets/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../config/Screen';
import ZegoExpressEngine, {
  ZegoTextureView,
} from 'zego-express-engine-reactnative';
import {connect} from 'react-redux';
import Header from './Header';
import Gift from './Gift';
import Comments from './Comments';
import Footer from './Footer';
import LinearGradient from 'react-native-linear-gradient';
import * as LiveActions from '../../../redux/actions/LiveActions';

export class LiveItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveID: this.props.liveData?.liveId,
      visible: this.props.playing,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.visible) {
      const payload = {
        startLive: this.startLive,
        liveID: this.state.liveID,
        dispatch: this.props.dispatch,
      };
      // this.props.dispatch(LiveActions.addLiveListener(payload));
    }
  }

  startLive = () => {
    ZegoExpressEngine.instance().startPlayingStream(this.state.liveID, {
      reactTag: findNodeHandle(this.refs.zego_play_view),
      viewMode: 1,
      backgroundColor: 0,
    });
  };

  render() {
    const {index, layout} = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.black,
          height: this.props.layout.height,
        }}>
        {fullScreenInfo()}
        {componentsInfo()}
      </View>
    );

    function componentsInfo() {
      return (
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.5)']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}>
          <Header />
          <View style={{flex: 1, alignItems: 'flex-end', flexDirection: 'row', }}>
            <View>
              <Gift />
              <Comments />
            </View>
          </View>
          <Footer />
        </LinearGradient>
      );
    }

    function fullScreenInfo() {
      return (
        <View style={{height: layout.height}}>
          <ZegoTextureView
            ref={`zego_play_view`}
            style={{height: layout.height}}
          />
        </View>
      );
    }

    function vedioCallScreenInfo() {
      return <View></View>;
    }
  }
}

const mapStateToProps = state => ({
  liveID: state.live.liveID,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(LiveItem);
