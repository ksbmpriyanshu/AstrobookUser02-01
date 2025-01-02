import {
  View,
  Text,
  FlatList,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import LiveItem from './components/LiveItem';
import {Colors} from '../../assets/style';
import MyStatusBar from '../../components/MyStatusbar';
import {colors} from '../../config/Constants1';
import ZegoExpressEngine from 'zego-express-engine-reactnative';

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 50,
};

const LiveScreen = ({liveAstroListData, route}) => {
  const flatListRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [layout, setLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    return () => {
      if (ZegoExpressEngine.instance()) {
        console.log('[LZP] destroyEngine');
        ZegoExpressEngine.destroyEngine();
      }
    };
  }, []);

  const onViewRef = useRef((viewableItems: any) => {
    if (viewableItems?.viewableItems?.length > 0) {
      const index = viewableItems?.viewableItems?.[0]?.index;
      setVisibleIndex(index);
    }
  });

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <LiveItem
          layout={layout}
          liveData={item}
          paused={index !== visibleIndex}
          playing={index === visibleIndex}
          index={index}
        />
      );
    },
    [layout, visibleIndex],
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.black}}>
      <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle="light-content"
      />
      <View
        style={{flex: 1}}
        onLayout={e => {
          setLayout(e.nativeEvent.layout);
        }}>
        <FlatList
          ref={flatListRef}
          data={[route?.params?.data]}
          renderItem={renderItem}
          initialNumToRender={1}
          // initialScrollIndex={route?.params?.index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // decelerationRate="fast"
          pagingEnabled
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewRef.current}
          // initialScrollIndex={1}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  liveAstroListData: state.astrologer.liveAstroListData,
  commentsData: state.live.commentsData,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(LiveScreen);
