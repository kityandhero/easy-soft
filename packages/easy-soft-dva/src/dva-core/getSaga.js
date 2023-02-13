import invariant from 'invariant';
import * as sagaEffects from 'redux-saga/effects';
import warning from 'warning';

import { NAMESPACE_SEP } from './constants';
import prefixType from './prefixType';

function noop() {}

export default function getSaga(
  effects,
  model,
  onError,
  onEffect,
  options = {},
) {
  return function* () {
    for (const key in effects) {
      if (Object.prototype.hasOwnProperty.call(effects, key)) {
        const watcher = getWatcher(
          key,
          effects[key],
          model,
          onError,
          onEffect,
          options,
        );
        const task = yield sagaEffects.fork(watcher);
        yield sagaEffects.fork(function* () {
          yield sagaEffects.take(`${model.namespace}/@@CANCEL_EFFECTS`);
          yield sagaEffects.cancel(task);
        });
      }
    }
  };
}

function getWatcher(key, _effect, model, onError, onEffect, options) {
  let effect = _effect;
  let type = 'takeEvery';
  let ms;
  let delayMs;

  if (Array.isArray(_effect)) {
    [effect] = _effect;
    const options_ = _effect[1];
    if (options_ && options_.type) {
      ({ type } = options_);
      if (type === 'throttle') {
        invariant(
          options_.ms,
          'app.start: opts.ms should be defined if type is throttle',
        );
        ({ ms } = options_);
      }
      if (type === 'poll') {
        invariant(
          options_.delay,
          'app.start: opts.delay should be defined if type is poll',
        );
        ({ delay: delayMs } = options_);
      }
    }
    invariant(
      ['watcher', 'takeEvery', 'takeLatest', 'throttle', 'poll'].includes(type),
      'app.start: effect type should be takeEvery, takeLatest, throttle, poll or watcher',
    );
  }

  function* sagaWithCatch(...arguments_) {
    const { __dva_resolve: resolve = noop, __dva_reject: reject = noop } =
      arguments_.length > 0 ? arguments_[0] : {};
    try {
      yield sagaEffects.put({ type: `${key}${NAMESPACE_SEP}@@start` });
      const returnValue = yield effect(
        // eslint-disable-next-line unicorn/prefer-spread
        ...arguments_.concat(createEffects(model, options)),
      );
      yield sagaEffects.put({ type: `${key}${NAMESPACE_SEP}@@end` });
      resolve(returnValue);
    } catch (error_) {
      onError(error_, {
        key,
        effectArgs: arguments_,
      });
      if (!error_._doNotReject) {
        reject(error_);
      }
    }
  }

  const sagaWithOnEffect = applyOnEffect(onEffect, sagaWithCatch, model, key);

  switch (type) {
    case 'watcher': {
      return sagaWithCatch;
    }
    case 'takeLatest': {
      return function* () {
        yield sagaEffects.takeLatest(key, sagaWithOnEffect);
      };
    }
    case 'throttle': {
      return function* () {
        yield sagaEffects.throttle(ms, key, sagaWithOnEffect);
      };
    }
    case 'poll': {
      return function* () {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        function delay(timeout) {
          return new Promise((resolve) => setTimeout(resolve, timeout));
        }
        function* pollSagaWorker(sagaEffectCollection, action) {
          const { call } = sagaEffectCollection;
          while (true) {
            yield call(sagaWithOnEffect, action);
            yield call(delay, delayMs);
          }
        }
        const { call, take, race } = sagaEffects;
        while (true) {
          const action = yield take(`${key}-start`);
          yield race([
            call(pollSagaWorker, sagaEffects, action),
            take(`${key}-stop`),
          ]);
        }
      };
    }
    default: {
      return function* () {
        yield sagaEffects.takeEvery(key, sagaWithOnEffect);
      };
    }
  }
}

function createEffects(model, options) {
  function assertAction(type, name) {
    invariant(type, 'dispatch: action should be a plain Object with type');

    const { namespacePrefixWarning = true } = options;

    if (namespacePrefixWarning) {
      warning(
        type.indexOf(`${model.namespace}${NAMESPACE_SEP}`) !== 0,
        `[${name}] ${type} should not be prefixed with namespace ${model.namespace}`,
      );
    }
  }
  function put(action) {
    const { type } = action;
    assertAction(type, 'sagaEffects.put');
    return sagaEffects.put({ ...action, type: prefixType(type, model) });
  }

  // The operator `put` doesn't block waiting the returned promise to resolve.
  // Using `put.resolve` will wait until the promsie resolve/reject before resuming.
  // It will be helpful to organize multi-effects in order,
  // and increase the reusability by seperate the effect in stand-alone pieces.
  // https://github.com/redux-saga/redux-saga/issues/336
  function putResolve(action) {
    const { type } = action;
    assertAction(type, 'sagaEffects.put.resolve');
    return sagaEffects.put.resolve({
      ...action,
      type: prefixType(type, model),
    });
  }
  put.resolve = putResolve;

  function take(type) {
    if (typeof type === 'string') {
      assertAction(type, 'sagaEffects.take');
      return sagaEffects.take(prefixType(type, model));
    } else if (Array.isArray(type)) {
      return sagaEffects.take(
        type.map((t) => {
          if (typeof t === 'string') {
            assertAction(t, 'sagaEffects.take');
            return prefixType(t, model);
          }
          return t;
        }),
      );
    } else {
      return sagaEffects.take(type);
    }
  }
  return { ...sagaEffects, put, take };
}

function applyOnEffect(fns, effect, model, key) {
  for (const function_ of fns) {
    effect = function_(effect, sagaEffects, model, key);
  }
  return effect;
}
