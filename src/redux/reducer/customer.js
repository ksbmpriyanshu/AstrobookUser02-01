import * as actionTypes from '../actionTypes';

const initialState = {
  customerData: null,
  followingListData: null,
  rechargeOfferList: null
};

const customer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_CUSTOMER_DATA:
      return {
        ...state,
        customerData: payload,
      };
    case actionTypes.SET_FOLLOWING_LIST:
      return {
        ...state,
        followingListData: payload,
      };
    case actionTypes.SET_WALLET_RECHARGE_OFFER_LIST:
      return {
        ...state,
        rechargeOfferList: payload,
      };

    default:
      return state;
  }
};

export default customer;
