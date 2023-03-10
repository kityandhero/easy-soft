import {
  getGuid,
  getTacitlyState,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

export function buildSchedulingControl() {
  return {
    namespace: 'schedulingControl',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *setSimpleValue({ alias }, { put }) {
        const dataAdjust = { simpleText: getGuid() };

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
