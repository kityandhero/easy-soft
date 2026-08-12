import { NAMESPACE_SEP } from './constants';

export default function createPromiseMiddleware(app) {
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
    return Boolean(
      model && model.effects && Object.hasOwn(model.effects, type),
    );
  }
}
