const SHOW = '@@DVA_LOADING/SHOW';
const HIDE = '@@DVA_LOADING/HIDE';
const NAMESPACE = 'loading';

export function createLoading(options = {}) {
  const namespace = options.namespace || NAMESPACE;

  const { only = [], except = [] } = options;
  if (only.length > 0 && except.length > 0) {
    throw new Error(
      'It is ambiguous to configure `only` and `except` items at the same time.',
    );
  }

  const initialState = {
    global: false,
    models: {},
    effects: {},
  };

  const extraReducers = {
    [namespace](state = initialState, { type, payload }) {
      const { namespace: ns, actionType } = payload || {};

      let returnValue;

      switch (type) {
        case SHOW: {
          returnValue = {
            ...state,
            global: true,
            models: { ...state.models, [ns]: true },
            effects: { ...state.effects, [actionType]: true },
          };
          break;
        }
        case HIDE: {
          const effects = { ...state.effects, [actionType]: false };
          const models = {
            ...state.models,
            [ns]: Object.keys(effects).some((at) => {
              const _namespace = at.split('/')[0];
              if (_namespace !== ns) return false;
              return effects[at];
            }),
          };
          const global = Object.keys(models).some((n) => {
            return models[n];
          });
          returnValue = {
            ...state,
            global,
            models,
            effects,
          };
          break;
        }
        default: {
          returnValue = state;
          break;
        }
      }
      return returnValue;
    },
  };

  function onEffect(effect, { put }, model, actionType) {
    const { namespace: ns } = model;
    return (only.length === 0 && except.length === 0) ||
      (only.length > 0 && only.includes(actionType)) ||
      (except.length > 0 && !except.includes(actionType))
      ? function* (...arguments_) {
          yield put({ type: SHOW, payload: { namespace: ns, actionType } });
          yield effect(...arguments_);
          yield put({ type: HIDE, payload: { namespace: ns, actionType } });
        }
      : effect;
  }

  return {
    extraReducers,
    onEffect,
  };
}

/**
 * placeholder function
 */
export async function empty() {
  return {};
}
