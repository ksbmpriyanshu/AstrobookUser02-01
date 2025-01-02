import { combineReducers } from 'redux';
import { CLEAN_STORE } from '../actionTypes/ProviderActionTypes';
import provider from './provider';
import customer from './customer';
import astrologer from './astrologer';
import setting from './setting';
import home from './home';
import live from './live';
import chat from './chat';
import history from './history';
import kundli from './kundli';
import blogs from './blogs';
import ecommerce from './ecommerce';
import astromall from './astromall';
import pooja from './pooja';

const rootReducer = combineReducers({
  setting,
  provider,
  customer,
  astrologer,
  home,
  live,
  chat,
  history,
  kundli,
  blogs,
  ecommerce,
  astromall,
  pooja
});

const appReducer = (state, action) => {
  if (action.type == CLEAN_STORE) {
    state = undefined;
  }
  return rootReducer(state, action);
};

export default appReducer;
