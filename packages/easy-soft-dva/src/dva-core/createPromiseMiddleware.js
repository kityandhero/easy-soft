import { NAMESPACE_SEP } from './constants';

export default function createPromiseMiddleware(app) {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  return () => (next) => (action) => {
    const { type } = action;
    return isEffect(type)
      ? new Promise((resolve, reject) => {
          next({
            __dva_resolve: resolve,
            __dva_reject: reject,
            ...action,
          });
        })
      : next(action);
  };

  function isEffect(type) {
    if (!type || typeof type !== 'string') return false;
    const [namespace] = type.split(NAMESPACE_SEP);
    const model = app._models.find((m) => m.namespace === namespace);
    if (model && model.effects && model.effects[type]) {
      return true;
    }

    return false;
  }
}
