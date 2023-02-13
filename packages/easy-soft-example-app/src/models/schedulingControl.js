import {
  getTacitlyState,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-dva';
import {
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
} from 'easy-soft-utility';

import {
  checkTicketValidityData,
  exchangePhoneData,
  getAdministrativeDivisionFullData,
  getCustomerData,
  getMetaDataData,
  refreshSessionData,
  registerData,
  registerWithWeChatData,
  signInSilentData,
} from '../services/schedulingControl';

export function buildSchedulingControl() {
  return {
    namespace: 'schedulingControl',

    state: {
      initialLocationModeComplete: false,
      modelNameListVisible: false,
      ticketValidityProcessDetection: false,
      signInProcessDetection: false,
      ...getTacitlyState(),
    },

    effects: {
      *refreshSession({ payload, alias }, { call, put }) {
        const response = yield call(refreshSessionData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *checkTicketValidity({ payload, alias }, { call, put }) {
        const response = yield call(checkTicketValidityData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *exchangePhone({ payload, alias }, { call, put }) {
        const response = yield call(exchangePhoneData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *signInSilent({ payload, alias }, { call, put }) {
        const response = yield call(signInSilentData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *getMetaData({ payload, alias }, { call, put }) {
        const response = yield call(getMetaDataData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *getCustomer({ payload, alias }, { call, put }) {
        const response = yield call(getCustomerData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *getFullAdministrativeDivisionData({ payload, alias }, { call, put }) {
        const response = yield call(getAdministrativeDivisionFullData, payload);

        const dataAdjust = pretreatmentRemoteListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *registerWithWeChat({ payload, alias }, { call, put }) {
        const response = yield call(registerWithWeChatData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *register({ payload, alias }, { call, put }) {
        const response = yield call(registerData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *setLocationResult({ payload }, { put }) {
        yield put({
          type: 'changeLocationResult',
          payload,
        });
      },
      *setSignInResult({ payload }, { put }) {
        yield put({
          type: 'changeSignInResult',
          payload,
        });
      },
      *setTicketValidityProcessDetection({ payload }, { put }) {
        yield put({
          type: 'changeTicketValidityProcessDetection',
          payload,
        });
      },
      *setSignInProcessDetection({ payload }, { put }) {
        yield put({
          type: 'changeSignInProcessDetection',
          payload,
        });
      },
    },

    reducers: {
      changeWeather(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
      changeLocationResult(state, { payload }) {
        return {
          ...state,
          locationResult: payload,
        };
      },
      changeSignInResult(state, { payload }) {
        return {
          ...state,
          signInResult: payload,
        };
      },
      changeTicketValidityProcessDetection(state, { payload }) {
        return {
          ...state,
          ticketValidityProcessDetection: payload,
        };
      },
      changeSignInProcessDetection(state, { payload }) {
        return {
          ...state,
          signInProcessDetection: payload,
        };
      },
      ...reducerCollection,
    },
  };
}
