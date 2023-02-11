import defaultHandleActions from './handleActions';

export default function getReducer(reducers, state, handleActions, namespace) {
  // Support reducer enhancer
  // e.g. reducers: [realReducers, enhancer]
  return Array.isArray(reducers)
    ? reducers[1](
        (handleActions || defaultHandleActions)(reducers[0], state, namespace),
      )
    : (handleActions || defaultHandleActions)(reducers || {}, state, namespace);
}
