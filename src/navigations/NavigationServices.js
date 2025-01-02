import {
  CommonActions,
  NavigationActions,
  StackActions,
} from '@react-navigation/native';

let _navigator;

export const setTopLevelNavigator = navigationRef => {
  _navigator = navigationRef;
};

export const navigate = (routeName, params) => {
  _navigator.navigate(routeName, params);
};

export const replace = (routeName, params) => {
  const replaceAction = StackActions.replace(routeName, params);
  _navigator.dispatch(replaceAction);
};

export const resetToScreen = (routeName, params) => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: routeName, params: params}],
  });

  _navigator.dispatch(resetAction);
};

export const goBack = () => {
  const backAction = CommonActions.goBack();
  _navigator.dispatch(backAction);
};

export const onPop = (val) => {
  const popAction = StackActions.pop(val);
  _navigator.dispatch(popAction);
}
