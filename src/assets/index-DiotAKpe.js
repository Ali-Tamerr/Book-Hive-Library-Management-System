(function () {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) u(o);
  new MutationObserver((o) => {
    for (const d of o)
      if (d.type === "childList")
        for (const m of d.addedNodes)
          m.tagName === "LINK" && m.rel === "modulepreload" && u(m);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(o) {
    const d = {};
    return (
      o.integrity && (d.integrity = o.integrity),
      o.referrerPolicy && (d.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (d.credentials = "omit")
          : (d.credentials = "same-origin"),
      d
    );
  }
  function u(o) {
    if (o.ep) return;
    o.ep = !0;
    const d = i(o);
    fetch(o.href, d);
  }
})();
function Jb(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default")
    ? n.default
    : n;
}
var Yo = { exports: {} },
  Ss = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Om;
function $b() {
  if (Om) return Ss;
  Om = 1;
  var n = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.fragment");
  function i(u, o, d) {
    var m = null;
    if (
      (d !== void 0 && (m = "" + d),
      o.key !== void 0 && (m = "" + o.key),
      "key" in o)
    ) {
      d = {};
      for (var p in o) p !== "key" && (d[p] = o[p]);
    } else d = o;
    return (
      (o = d.ref),
      { $$typeof: n, type: u, key: m, ref: o !== void 0 ? o : null, props: d }
    );
  }
  return ((Ss.Fragment = l), (Ss.jsx = i), (Ss.jsxs = i), Ss);
}
var Dm;
function Pb() {
  return (Dm || ((Dm = 1), (Yo.exports = $b())), Yo.exports);
}
var f = Pb(),
  Go = { exports: {} },
  he = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mm;
function Wb() {
  if (Mm) return he;
  Mm = 1;
  var n = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.portal"),
    i = Symbol.for("react.fragment"),
    u = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    d = Symbol.for("react.consumer"),
    m = Symbol.for("react.context"),
    p = Symbol.for("react.forward_ref"),
    b = Symbol.for("react.suspense"),
    y = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    S = Symbol.for("react.activity"),
    E = Symbol.iterator;
  function T(_) {
    return _ === null || typeof _ != "object"
      ? null
      : ((_ = (E && _[E]) || _["@@iterator"]),
        typeof _ == "function" ? _ : null);
  }
  var N = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    j = Object.assign,
    g = {};
  function A(_, Q, $) {
    ((this.props = _),
      (this.context = Q),
      (this.refs = g),
      (this.updater = $ || N));
  }
  ((A.prototype.isReactComponent = {}),
    (A.prototype.setState = function (_, Q) {
      if (typeof _ != "object" && typeof _ != "function" && _ != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, _, Q, "setState");
    }),
    (A.prototype.forceUpdate = function (_) {
      this.updater.enqueueForceUpdate(this, _, "forceUpdate");
    }));
  function R() {}
  R.prototype = A.prototype;
  function q(_, Q, $) {
    ((this.props = _),
      (this.context = Q),
      (this.refs = g),
      (this.updater = $ || N));
  }
  var Z = (q.prototype = new R());
  ((Z.constructor = q), j(Z, A.prototype), (Z.isPureReactComponent = !0));
  var k = Array.isArray;
  function F() {}
  var K = { H: null, A: null, T: null, S: null },
    V = Object.prototype.hasOwnProperty;
  function P(_, Q, $) {
    var W = $.ref;
    return {
      $$typeof: n,
      type: _,
      key: Q,
      ref: W !== void 0 ? W : null,
      props: $,
    };
  }
  function ee(_, Q) {
    return P(_.type, Q, _.props);
  }
  function le(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === n;
  }
  function se(_) {
    var Q = { "=": "=0", ":": "=2" };
    return (
      "$" +
      _.replace(/[=:]/g, function ($) {
        return Q[$];
      })
    );
  }
  var me = /\/+/g;
  function ce(_, Q) {
    return typeof _ == "object" && _ !== null && _.key != null
      ? se("" + _.key)
      : Q.toString(36);
  }
  function pe(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (
          (typeof _.status == "string"
            ? _.then(F, F)
            : ((_.status = "pending"),
              _.then(
                function (Q) {
                  _.status === "pending" &&
                    ((_.status = "fulfilled"), (_.value = Q));
                },
                function (Q) {
                  _.status === "pending" &&
                    ((_.status = "rejected"), (_.reason = Q));
                },
              )),
          _.status)
        ) {
          case "fulfilled":
            return _.value;
          case "rejected":
            throw _.reason;
        }
    }
    throw _;
  }
  function M(_, Q, $, W, ie) {
    var oe = typeof _;
    (oe === "undefined" || oe === "boolean") && (_ = null);
    var ve = !1;
    if (_ === null) ve = !0;
    else
      switch (oe) {
        case "bigint":
        case "string":
        case "number":
          ve = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case n:
            case l:
              ve = !0;
              break;
            case v:
              return ((ve = _._init), M(ve(_._payload), Q, $, W, ie));
          }
      }
    if (ve)
      return (
        (ie = ie(_)),
        (ve = W === "" ? "." + ce(_, 0) : W),
        k(ie)
          ? (($ = ""),
            ve != null && ($ = ve.replace(me, "$&/") + "/"),
            M(ie, Q, $, "", function (St) {
              return St;
            }))
          : ie != null &&
            (le(ie) &&
              (ie = ee(
                ie,
                $ +
                  (ie.key == null || (_ && _.key === ie.key)
                    ? ""
                    : ("" + ie.key).replace(me, "$&/") + "/") +
                  ve,
              )),
            Q.push(ie)),
        1
      );
    ve = 0;
    var Ye = W === "" ? "." : W + ":";
    if (k(_))
      for (var Te = 0; Te < _.length; Te++)
        ((W = _[Te]), (oe = Ye + ce(W, Te)), (ve += M(W, Q, $, oe, ie)));
    else if (((Te = T(_)), typeof Te == "function"))
      for (_ = Te.call(_), Te = 0; !(W = _.next()).done; )
        ((W = W.value), (oe = Ye + ce(W, Te++)), (ve += M(W, Q, $, oe, ie)));
    else if (oe === "object") {
      if (typeof _.then == "function") return M(pe(_), Q, $, W, ie);
      throw (
        (Q = String(_)),
        Error(
          "Objects are not valid as a React child (found: " +
            (Q === "[object Object]"
              ? "object with keys {" + Object.keys(_).join(", ") + "}"
              : Q) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return ve;
  }
  function J(_, Q, $) {
    if (_ == null) return _;
    var W = [],
      ie = 0;
    return (
      M(_, W, "", "", function (oe) {
        return Q.call($, oe, ie++);
      }),
      W
    );
  }
  function I(_) {
    if (_._status === -1) {
      var Q = _._result;
      ((Q = Q()),
        Q.then(
          function ($) {
            (_._status === 0 || _._status === -1) &&
              ((_._status = 1), (_._result = $));
          },
          function ($) {
            (_._status === 0 || _._status === -1) &&
              ((_._status = 2), (_._result = $));
          },
        ),
        _._status === -1 && ((_._status = 0), (_._result = Q)));
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var ne =
      typeof reportError == "function"
        ? reportError
        : function (_) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var Q = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof _ == "object" &&
                  _ !== null &&
                  typeof _.message == "string"
                    ? String(_.message)
                    : String(_),
                error: _,
              });
              if (!window.dispatchEvent(Q)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", _);
              return;
            }
            console.error(_);
          },
    de = {
      map: J,
      forEach: function (_, Q, $) {
        J(
          _,
          function () {
            Q.apply(this, arguments);
          },
          $,
        );
      },
      count: function (_) {
        var Q = 0;
        return (
          J(_, function () {
            Q++;
          }),
          Q
        );
      },
      toArray: function (_) {
        return (
          J(_, function (Q) {
            return Q;
          }) || []
        );
      },
      only: function (_) {
        if (!le(_))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return _;
      },
    };
  return (
    (he.Activity = S),
    (he.Children = de),
    (he.Component = A),
    (he.Fragment = i),
    (he.Profiler = o),
    (he.PureComponent = q),
    (he.StrictMode = u),
    (he.Suspense = b),
    (he.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K),
    (he.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (_) {
        return K.H.useMemoCache(_);
      },
    }),
    (he.cache = function (_) {
      return function () {
        return _.apply(null, arguments);
      };
    }),
    (he.cacheSignal = function () {
      return null;
    }),
    (he.cloneElement = function (_, Q, $) {
      if (_ == null)
        throw Error(
          "The argument must be a React element, but you passed " + _ + ".",
        );
      var W = j({}, _.props),
        ie = _.key;
      if (Q != null)
        for (oe in (Q.key !== void 0 && (ie = "" + Q.key), Q))
          !V.call(Q, oe) ||
            oe === "key" ||
            oe === "__self" ||
            oe === "__source" ||
            (oe === "ref" && Q.ref === void 0) ||
            (W[oe] = Q[oe]);
      var oe = arguments.length - 2;
      if (oe === 1) W.children = $;
      else if (1 < oe) {
        for (var ve = Array(oe), Ye = 0; Ye < oe; Ye++)
          ve[Ye] = arguments[Ye + 2];
        W.children = ve;
      }
      return P(_.type, ie, W);
    }),
    (he.createContext = function (_) {
      return (
        (_ = {
          $$typeof: m,
          _currentValue: _,
          _currentValue2: _,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (_.Provider = _),
        (_.Consumer = { $$typeof: d, _context: _ }),
        _
      );
    }),
    (he.createElement = function (_, Q, $) {
      var W,
        ie = {},
        oe = null;
      if (Q != null)
        for (W in (Q.key !== void 0 && (oe = "" + Q.key), Q))
          V.call(Q, W) &&
            W !== "key" &&
            W !== "__self" &&
            W !== "__source" &&
            (ie[W] = Q[W]);
      var ve = arguments.length - 2;
      if (ve === 1) ie.children = $;
      else if (1 < ve) {
        for (var Ye = Array(ve), Te = 0; Te < ve; Te++)
          Ye[Te] = arguments[Te + 2];
        ie.children = Ye;
      }
      if (_ && _.defaultProps)
        for (W in ((ve = _.defaultProps), ve))
          ie[W] === void 0 && (ie[W] = ve[W]);
      return P(_, oe, ie);
    }),
    (he.createRef = function () {
      return { current: null };
    }),
    (he.forwardRef = function (_) {
      return { $$typeof: p, render: _ };
    }),
    (he.isValidElement = le),
    (he.lazy = function (_) {
      return { $$typeof: v, _payload: { _status: -1, _result: _ }, _init: I };
    }),
    (he.memo = function (_, Q) {
      return { $$typeof: y, type: _, compare: Q === void 0 ? null : Q };
    }),
    (he.startTransition = function (_) {
      var Q = K.T,
        $ = {};
      K.T = $;
      try {
        var W = _(),
          ie = K.S;
        (ie !== null && ie($, W),
          typeof W == "object" &&
            W !== null &&
            typeof W.then == "function" &&
            W.then(F, ne));
      } catch (oe) {
        ne(oe);
      } finally {
        (Q !== null && $.types !== null && (Q.types = $.types), (K.T = Q));
      }
    }),
    (he.unstable_useCacheRefresh = function () {
      return K.H.useCacheRefresh();
    }),
    (he.use = function (_) {
      return K.H.use(_);
    }),
    (he.useActionState = function (_, Q, $) {
      return K.H.useActionState(_, Q, $);
    }),
    (he.useCallback = function (_, Q) {
      return K.H.useCallback(_, Q);
    }),
    (he.useContext = function (_) {
      return K.H.useContext(_);
    }),
    (he.useDebugValue = function () {}),
    (he.useDeferredValue = function (_, Q) {
      return K.H.useDeferredValue(_, Q);
    }),
    (he.useEffect = function (_, Q) {
      return K.H.useEffect(_, Q);
    }),
    (he.useEffectEvent = function (_) {
      return K.H.useEffectEvent(_);
    }),
    (he.useId = function () {
      return K.H.useId();
    }),
    (he.useImperativeHandle = function (_, Q, $) {
      return K.H.useImperativeHandle(_, Q, $);
    }),
    (he.useInsertionEffect = function (_, Q) {
      return K.H.useInsertionEffect(_, Q);
    }),
    (he.useLayoutEffect = function (_, Q) {
      return K.H.useLayoutEffect(_, Q);
    }),
    (he.useMemo = function (_, Q) {
      return K.H.useMemo(_, Q);
    }),
    (he.useOptimistic = function (_, Q) {
      return K.H.useOptimistic(_, Q);
    }),
    (he.useReducer = function (_, Q, $) {
      return K.H.useReducer(_, Q, $);
    }),
    (he.useRef = function (_) {
      return K.H.useRef(_);
    }),
    (he.useState = function (_) {
      return K.H.useState(_);
    }),
    (he.useSyncExternalStore = function (_, Q, $) {
      return K.H.useSyncExternalStore(_, Q, $);
    }),
    (he.useTransition = function () {
      return K.H.useTransition();
    }),
    (he.version = "19.2.0"),
    he
  );
}
var Um;
function or() {
  return (Um || ((Um = 1), (Go.exports = Wb())), Go.exports);
}
var D = or();
const zm = Jb(D);
var ko = { exports: {} },
  Ns = {},
  Ko = { exports: {} },
  Xo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Bm;
function Ib() {
  return (
    Bm ||
      ((Bm = 1),
      (function (n) {
        function l(M, J) {
          var I = M.length;
          M.push(J);
          e: for (; 0 < I; ) {
            var ne = (I - 1) >>> 1,
              de = M[ne];
            if (0 < o(de, J)) ((M[ne] = J), (M[I] = de), (I = ne));
            else break e;
          }
        }
        function i(M) {
          return M.length === 0 ? null : M[0];
        }
        function u(M) {
          if (M.length === 0) return null;
          var J = M[0],
            I = M.pop();
          if (I !== J) {
            M[0] = I;
            e: for (var ne = 0, de = M.length, _ = de >>> 1; ne < _; ) {
              var Q = 2 * (ne + 1) - 1,
                $ = M[Q],
                W = Q + 1,
                ie = M[W];
              if (0 > o($, I))
                W < de && 0 > o(ie, $)
                  ? ((M[ne] = ie), (M[W] = I), (ne = W))
                  : ((M[ne] = $), (M[Q] = I), (ne = Q));
              else if (W < de && 0 > o(ie, I))
                ((M[ne] = ie), (M[W] = I), (ne = W));
              else break e;
            }
          }
          return J;
        }
        function o(M, J) {
          var I = M.sortIndex - J.sortIndex;
          return I !== 0 ? I : M.id - J.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var d = performance;
          n.unstable_now = function () {
            return d.now();
          };
        } else {
          var m = Date,
            p = m.now();
          n.unstable_now = function () {
            return m.now() - p;
          };
        }
        var b = [],
          y = [],
          v = 1,
          S = null,
          E = 3,
          T = !1,
          N = !1,
          j = !1,
          g = !1,
          A = typeof setTimeout == "function" ? setTimeout : null,
          R = typeof clearTimeout == "function" ? clearTimeout : null,
          q = typeof setImmediate < "u" ? setImmediate : null;
        function Z(M) {
          for (var J = i(y); J !== null; ) {
            if (J.callback === null) u(y);
            else if (J.startTime <= M)
              (u(y), (J.sortIndex = J.expirationTime), l(b, J));
            else break;
            J = i(y);
          }
        }
        function k(M) {
          if (((j = !1), Z(M), !N))
            if (i(b) !== null) ((N = !0), F || ((F = !0), se()));
            else {
              var J = i(y);
              J !== null && pe(k, J.startTime - M);
            }
        }
        var F = !1,
          K = -1,
          V = 5,
          P = -1;
        function ee() {
          return g ? !0 : !(n.unstable_now() - P < V);
        }
        function le() {
          if (((g = !1), F)) {
            var M = n.unstable_now();
            P = M;
            var J = !0;
            try {
              e: {
                ((N = !1), j && ((j = !1), R(K), (K = -1)), (T = !0));
                var I = E;
                try {
                  t: {
                    for (
                      Z(M), S = i(b);
                      S !== null && !(S.expirationTime > M && ee());
                    ) {
                      var ne = S.callback;
                      if (typeof ne == "function") {
                        ((S.callback = null), (E = S.priorityLevel));
                        var de = ne(S.expirationTime <= M);
                        if (((M = n.unstable_now()), typeof de == "function")) {
                          ((S.callback = de), Z(M), (J = !0));
                          break t;
                        }
                        (S === i(b) && u(b), Z(M));
                      } else u(b);
                      S = i(b);
                    }
                    if (S !== null) J = !0;
                    else {
                      var _ = i(y);
                      (_ !== null && pe(k, _.startTime - M), (J = !1));
                    }
                  }
                  break e;
                } finally {
                  ((S = null), (E = I), (T = !1));
                }
                J = void 0;
              }
            } finally {
              J ? se() : (F = !1);
            }
          }
        }
        var se;
        if (typeof q == "function")
          se = function () {
            q(le);
          };
        else if (typeof MessageChannel < "u") {
          var me = new MessageChannel(),
            ce = me.port2;
          ((me.port1.onmessage = le),
            (se = function () {
              ce.postMessage(null);
            }));
        } else
          se = function () {
            A(le, 0);
          };
        function pe(M, J) {
          K = A(function () {
            M(n.unstable_now());
          }, J);
        }
        ((n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (M) {
            M.callback = null;
          }),
          (n.unstable_forceFrameRate = function (M) {
            0 > M || 125 < M
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (V = 0 < M ? Math.floor(1e3 / M) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return E;
          }),
          (n.unstable_next = function (M) {
            switch (E) {
              case 1:
              case 2:
              case 3:
                var J = 3;
                break;
              default:
                J = E;
            }
            var I = E;
            E = J;
            try {
              return M();
            } finally {
              E = I;
            }
          }),
          (n.unstable_requestPaint = function () {
            g = !0;
          }),
          (n.unstable_runWithPriority = function (M, J) {
            switch (M) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                M = 3;
            }
            var I = E;
            E = M;
            try {
              return J();
            } finally {
              E = I;
            }
          }),
          (n.unstable_scheduleCallback = function (M, J, I) {
            var ne = n.unstable_now();
            switch (
              (typeof I == "object" && I !== null
                ? ((I = I.delay),
                  (I = typeof I == "number" && 0 < I ? ne + I : ne))
                : (I = ne),
              M)
            ) {
              case 1:
                var de = -1;
                break;
              case 2:
                de = 250;
                break;
              case 5:
                de = 1073741823;
                break;
              case 4:
                de = 1e4;
                break;
              default:
                de = 5e3;
            }
            return (
              (de = I + de),
              (M = {
                id: v++,
                callback: J,
                priorityLevel: M,
                startTime: I,
                expirationTime: de,
                sortIndex: -1,
              }),
              I > ne
                ? ((M.sortIndex = I),
                  l(y, M),
                  i(b) === null &&
                    M === i(y) &&
                    (j ? (R(K), (K = -1)) : (j = !0), pe(k, I - ne)))
                : ((M.sortIndex = de),
                  l(b, M),
                  N || T || ((N = !0), F || ((F = !0), se()))),
              M
            );
          }),
          (n.unstable_shouldYield = ee),
          (n.unstable_wrapCallback = function (M) {
            var J = E;
            return function () {
              var I = E;
              E = J;
              try {
                return M.apply(this, arguments);
              } finally {
                E = I;
              }
            };
          }));
      })(Xo)),
    Xo
  );
}
var qm;
function eg() {
  return (qm || ((qm = 1), (Ko.exports = Ib())), Ko.exports);
}
var Vo = { exports: {} },
  rt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Lm;
function tg() {
  if (Lm) return rt;
  Lm = 1;
  var n = or();
  function l(b) {
    var y = "https://react.dev/errors/" + b;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        y += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return (
      "Minified React error #" +
      b +
      "; visit " +
      y +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function i() {}
  var u = {
      d: {
        f: i,
        r: function () {
          throw Error(l(522));
        },
        D: i,
        C: i,
        L: i,
        m: i,
        X: i,
        S: i,
        M: i,
      },
      p: 0,
      findDOMNode: null,
    },
    o = Symbol.for("react.portal");
  function d(b, y, v) {
    var S =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: S == null ? null : "" + S,
      children: b,
      containerInfo: y,
      implementation: v,
    };
  }
  var m = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(b, y) {
    if (b === "font") return "";
    if (typeof y == "string") return y === "use-credentials" ? y : "";
  }
  return (
    (rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u),
    (rt.createPortal = function (b, y) {
      var v =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11))
        throw Error(l(299));
      return d(b, y, null, v);
    }),
    (rt.flushSync = function (b) {
      var y = m.T,
        v = u.p;
      try {
        if (((m.T = null), (u.p = 2), b)) return b();
      } finally {
        ((m.T = y), (u.p = v), u.d.f());
      }
    }),
    (rt.preconnect = function (b, y) {
      typeof b == "string" &&
        (y
          ? ((y = y.crossOrigin),
            (y =
              typeof y == "string"
                ? y === "use-credentials"
                  ? y
                  : ""
                : void 0))
          : (y = null),
        u.d.C(b, y));
    }),
    (rt.prefetchDNS = function (b) {
      typeof b == "string" && u.d.D(b);
    }),
    (rt.preinit = function (b, y) {
      if (typeof b == "string" && y && typeof y.as == "string") {
        var v = y.as,
          S = p(v, y.crossOrigin),
          E = typeof y.integrity == "string" ? y.integrity : void 0,
          T = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
        v === "style"
          ? u.d.S(b, typeof y.precedence == "string" ? y.precedence : void 0, {
              crossOrigin: S,
              integrity: E,
              fetchPriority: T,
            })
          : v === "script" &&
            u.d.X(b, {
              crossOrigin: S,
              integrity: E,
              fetchPriority: T,
              nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            });
      }
    }),
    (rt.preinitModule = function (b, y) {
      if (typeof b == "string")
        if (typeof y == "object" && y !== null) {
          if (y.as == null || y.as === "script") {
            var v = p(y.as, y.crossOrigin);
            u.d.M(b, {
              crossOrigin: v,
              integrity: typeof y.integrity == "string" ? y.integrity : void 0,
              nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            });
          }
        } else y == null && u.d.M(b);
    }),
    (rt.preload = function (b, y) {
      if (
        typeof b == "string" &&
        typeof y == "object" &&
        y !== null &&
        typeof y.as == "string"
      ) {
        var v = y.as,
          S = p(v, y.crossOrigin);
        u.d.L(b, v, {
          crossOrigin: S,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          type: typeof y.type == "string" ? y.type : void 0,
          fetchPriority:
            typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
          referrerPolicy:
            typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
          imageSrcSet:
            typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
          imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
          media: typeof y.media == "string" ? y.media : void 0,
        });
      }
    }),
    (rt.preloadModule = function (b, y) {
      if (typeof b == "string")
        if (y) {
          var v = p(y.as, y.crossOrigin);
          u.d.m(b, {
            as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
            crossOrigin: v,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          });
        } else u.d.m(b);
    }),
    (rt.requestFormReset = function (b) {
      u.d.r(b);
    }),
    (rt.unstable_batchedUpdates = function (b, y) {
      return b(y);
    }),
    (rt.useFormState = function (b, y, v) {
      return m.H.useFormState(b, y, v);
    }),
    (rt.useFormStatus = function () {
      return m.H.useHostTransitionStatus();
    }),
    (rt.version = "19.2.0"),
    rt
  );
}
var Hm;
function lg() {
  if (Hm) return Vo.exports;
  Hm = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (l) {
        console.error(l);
      }
  }
  return (n(), (Vo.exports = tg()), Vo.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qm;
function ag() {
  if (Qm) return Ns;
  Qm = 1;
  var n = eg(),
    l = or(),
    i = lg();
  function u(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function o(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function d(e) {
    var t = e,
      a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (a = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function m(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function b(e) {
    if (d(e) !== e) throw Error(u(188));
  }
  function y(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var a = e, s = t; ; ) {
      var r = a.return;
      if (r === null) break;
      var c = r.alternate;
      if (c === null) {
        if (((s = r.return), s !== null)) {
          a = s;
          continue;
        }
        break;
      }
      if (r.child === c.child) {
        for (c = r.child; c; ) {
          if (c === a) return (b(r), e);
          if (c === s) return (b(r), t);
          c = c.sibling;
        }
        throw Error(u(188));
      }
      if (a.return !== s.return) ((a = r), (s = c));
      else {
        for (var h = !1, x = r.child; x; ) {
          if (x === a) {
            ((h = !0), (a = r), (s = c));
            break;
          }
          if (x === s) {
            ((h = !0), (s = r), (a = c));
            break;
          }
          x = x.sibling;
        }
        if (!h) {
          for (x = c.child; x; ) {
            if (x === a) {
              ((h = !0), (a = c), (s = r));
              break;
            }
            if (x === s) {
              ((h = !0), (s = c), (a = r));
              break;
            }
            x = x.sibling;
          }
          if (!h) throw Error(u(189));
        }
      }
      if (a.alternate !== s) throw Error(u(190));
    }
    if (a.tag !== 3) throw Error(u(188));
    return a.stateNode.current === a ? e : t;
  }
  function v(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = v(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var S = Object.assign,
    E = Symbol.for("react.element"),
    T = Symbol.for("react.transitional.element"),
    N = Symbol.for("react.portal"),
    j = Symbol.for("react.fragment"),
    g = Symbol.for("react.strict_mode"),
    A = Symbol.for("react.profiler"),
    R = Symbol.for("react.consumer"),
    q = Symbol.for("react.context"),
    Z = Symbol.for("react.forward_ref"),
    k = Symbol.for("react.suspense"),
    F = Symbol.for("react.suspense_list"),
    K = Symbol.for("react.memo"),
    V = Symbol.for("react.lazy"),
    P = Symbol.for("react.activity"),
    ee = Symbol.for("react.memo_cache_sentinel"),
    le = Symbol.iterator;
  function se(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (le && e[le]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var me = Symbol.for("react.client.reference");
  function ce(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === me ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case j:
        return "Fragment";
      case A:
        return "Profiler";
      case g:
        return "StrictMode";
      case k:
        return "Suspense";
      case F:
        return "SuspenseList";
      case P:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case N:
          return "Portal";
        case q:
          return e.displayName || "Context";
        case R:
          return (e._context.displayName || "Context") + ".Consumer";
        case Z:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case K:
          return (
            (t = e.displayName || null),
            t !== null ? t : ce(e.type) || "Memo"
          );
        case V:
          ((t = e._payload), (e = e._init));
          try {
            return ce(e(t));
          } catch {}
      }
    return null;
  }
  var pe = Array.isArray,
    M = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    I = { pending: !1, data: null, method: null, action: null },
    ne = [],
    de = -1;
  function _(e) {
    return { current: e };
  }
  function Q(e) {
    0 > de || ((e.current = ne[de]), (ne[de] = null), de--);
  }
  function $(e, t) {
    (de++, (ne[de] = e.current), (e.current = t));
  }
  var W = _(null),
    ie = _(null),
    oe = _(null),
    ve = _(null);
  function Ye(e, t) {
    switch (($(oe, t), $(ie, e), $(W, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? em(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = em(t)), (e = tm(t, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (Q(W), $(W, e));
  }
  function Te() {
    (Q(W), Q(ie), Q(oe));
  }
  function St(e) {
    e.memoizedState !== null && $(ve, e);
    var t = W.current,
      a = tm(t, e.type);
    t !== a && ($(ie, e), $(W, a));
  }
  function kt(e) {
    (ie.current === e && (Q(W), Q(ie)),
      ve.current === e && (Q(ve), (bs._currentValue = I)));
  }
  var $t, sa;
  function Ae(e) {
    if ($t === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        (($t = (t && t[1]) || ""),
          (sa =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      $t +
      e +
      sa
    );
  }
  var jr = !1;
  function Er(e, t) {
    if (!e || jr) return "";
    jr = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var X = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(X.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(X, []);
                } catch (H) {
                  var B = H;
                }
                Reflect.construct(e, [], X);
              } else {
                try {
                  X.call();
                } catch (H) {
                  B = H;
                }
                e.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (H) {
                B = H;
              }
              (X = e()) &&
                typeof X.catch == "function" &&
                X.catch(function () {});
            }
          } catch (H) {
            if (H && B && typeof H.stack == "string") return [H.stack, B.stack];
          }
          return [null, null];
        },
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var r = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        "name",
      );
      r &&
        r.configurable &&
        Object.defineProperty(s.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var c = s.DetermineComponentFrameRoot(),
        h = c[0],
        x = c[1];
      if (h && x) {
        var w = h.split(`
`),
          z = x.split(`
`);
        for (
          r = s = 0;
          s < w.length && !w[s].includes("DetermineComponentFrameRoot");
        )
          s++;
        for (; r < z.length && !z[r].includes("DetermineComponentFrameRoot"); )
          r++;
        if (s === w.length || r === z.length)
          for (
            s = w.length - 1, r = z.length - 1;
            1 <= s && 0 <= r && w[s] !== z[r];
          )
            r--;
        for (; 1 <= s && 0 <= r; s--, r--)
          if (w[s] !== z[r]) {
            if (s !== 1 || r !== 1)
              do
                if ((s--, r--, 0 > r || w[s] !== z[r])) {
                  var Y =
                    `
` + w[s].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      Y.includes("<anonymous>") &&
                      (Y = Y.replace("<anonymous>", e.displayName)),
                    Y
                  );
                }
              while (1 <= s && 0 <= r);
            break;
          }
      }
    } finally {
      ((jr = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : "") ? Ae(a) : "";
  }
  function _y(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ae(e.type);
      case 16:
        return Ae("Lazy");
      case 13:
        return e.child !== t && t !== null
          ? Ae("Suspense Fallback")
          : Ae("Suspense");
      case 19:
        return Ae("SuspenseList");
      case 0:
      case 15:
        return Er(e.type, !1);
      case 11:
        return Er(e.type.render, !1);
      case 1:
        return Er(e.type, !0);
      case 31:
        return Ae("Activity");
      default:
        return "";
    }
  }
  function Rc(e) {
    try {
      var t = "",
        a = null;
      do ((t += _y(e, a)), (a = e), (e = e.return));
      while (e);
      return t;
    } catch (s) {
      return (
        `
Error generating stack: ` +
        s.message +
        `
` +
        s.stack
      );
    }
  }
  var wr = Object.prototype.hasOwnProperty,
    _r = n.unstable_scheduleCallback,
    Cr = n.unstable_cancelCallback,
    Cy = n.unstable_shouldYield,
    Ty = n.unstable_requestPaint,
    Nt = n.unstable_now,
    Ay = n.unstable_getCurrentPriorityLevel,
    Oc = n.unstable_ImmediatePriority,
    Dc = n.unstable_UserBlockingPriority,
    Us = n.unstable_NormalPriority,
    Ry = n.unstable_LowPriority,
    Mc = n.unstable_IdlePriority,
    Oy = n.log,
    Dy = n.unstable_setDisableYieldValue,
    An = null,
    jt = null;
  function Ol(e) {
    if (
      (typeof Oy == "function" && Dy(e),
      jt && typeof jt.setStrictMode == "function")
    )
      try {
        jt.setStrictMode(An, e);
      } catch {}
  }
  var Et = Math.clz32 ? Math.clz32 : zy,
    My = Math.log,
    Uy = Math.LN2;
  function zy(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((My(e) / Uy) | 0)) | 0);
  }
  var zs = 256,
    Bs = 262144,
    qs = 4194304;
  function ia(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Ls(e, t, a) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var r = 0,
      c = e.suspendedLanes,
      h = e.pingedLanes;
    e = e.warmLanes;
    var x = s & 134217727;
    return (
      x !== 0
        ? ((s = x & ~c),
          s !== 0
            ? (r = ia(s))
            : ((h &= x),
              h !== 0
                ? (r = ia(h))
                : a || ((a = x & ~e), a !== 0 && (r = ia(a)))))
        : ((x = s & ~c),
          x !== 0
            ? (r = ia(x))
            : h !== 0
              ? (r = ia(h))
              : a || ((a = s & ~e), a !== 0 && (r = ia(a)))),
      r === 0
        ? 0
        : t !== 0 &&
            t !== r &&
            (t & c) === 0 &&
            ((c = r & -r),
            (a = t & -t),
            c >= a || (c === 32 && (a & 4194048) !== 0))
          ? t
          : r
    );
  }
  function Rn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function By(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Uc() {
    var e = qs;
    return ((qs <<= 1), (qs & 62914560) === 0 && (qs = 4194304), e);
  }
  function Tr(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function On(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function qy(e, t, a, s, r, c) {
    var h = e.pendingLanes;
    ((e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0));
    var x = e.entanglements,
      w = e.expirationTimes,
      z = e.hiddenUpdates;
    for (a = h & ~a; 0 < a; ) {
      var Y = 31 - Et(a),
        X = 1 << Y;
      ((x[Y] = 0), (w[Y] = -1));
      var B = z[Y];
      if (B !== null)
        for (z[Y] = null, Y = 0; Y < B.length; Y++) {
          var H = B[Y];
          H !== null && (H.lane &= -536870913);
        }
      a &= ~X;
    }
    (s !== 0 && zc(e, s, 0),
      c !== 0 && r === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(h & ~t)));
  }
  function zc(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var s = 31 - Et(t);
    ((e.entangledLanes |= t),
      (e.entanglements[s] = e.entanglements[s] | 1073741824 | (a & 261930)));
  }
  function Bc(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var s = 31 - Et(a),
        r = 1 << s;
      ((r & t) | (e[s] & t) && (e[s] |= t), (a &= ~r));
    }
  }
  function qc(e, t) {
    var a = t & -t;
    return (
      (a = (a & 42) !== 0 ? 1 : Ar(a)),
      (a & (e.suspendedLanes | t)) !== 0 ? 0 : a
    );
  }
  function Ar(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Rr(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Lc() {
    var e = J.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Em(e.type));
  }
  function Hc(e, t) {
    var a = J.p;
    try {
      return ((J.p = e), t());
    } finally {
      J.p = a;
    }
  }
  var Dl = Math.random().toString(36).slice(2),
    lt = "__reactFiber$" + Dl,
    dt = "__reactProps$" + Dl,
    Ua = "__reactContainer$" + Dl,
    Or = "__reactEvents$" + Dl,
    Ly = "__reactListeners$" + Dl,
    Hy = "__reactHandles$" + Dl,
    Qc = "__reactResources$" + Dl,
    Dn = "__reactMarker$" + Dl;
  function Dr(e) {
    (delete e[lt], delete e[dt], delete e[Or], delete e[Ly], delete e[Hy]);
  }
  function za(e) {
    var t = e[lt];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Ua] || a[lt])) {
        if (
          ((a = t.alternate),
          t.child !== null || (a !== null && a.child !== null))
        )
          for (e = um(e); e !== null; ) {
            if ((a = e[lt])) return a;
            e = um(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function Ba(e) {
    if ((e = e[lt] || e[Ua])) {
      var t = e.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return e;
    }
    return null;
  }
  function Mn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function qa(e) {
    var t = e[Qc];
    return (
      t ||
        (t = e[Qc] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function et(e) {
    e[Dn] = !0;
  }
  var Yc = new Set(),
    Gc = {};
  function ra(e, t) {
    (La(e, t), La(e + "Capture", t));
  }
  function La(e, t) {
    for (Gc[e] = t, e = 0; e < t.length; e++) Yc.add(t[e]);
  }
  var Qy = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    kc = {},
    Kc = {};
  function Yy(e) {
    return wr.call(Kc, e)
      ? !0
      : wr.call(kc, e)
        ? !1
        : Qy.test(e)
          ? (Kc[e] = !0)
          : ((kc[e] = !0), !1);
  }
  function Hs(e, t, a) {
    if (Yy(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var s = t.toLowerCase().slice(0, 5);
            if (s !== "data-" && s !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
  }
  function Qs(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function al(e, t, a, s) {
    if (s === null) e.removeAttribute(a);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + s);
    }
  }
  function Dt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Xc(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Gy(e, t, a) {
    var s = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof s < "u" &&
      typeof s.get == "function" &&
      typeof s.set == "function"
    ) {
      var r = s.get,
        c = s.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return r.call(this);
          },
          set: function (h) {
            ((a = "" + h), c.call(this, h));
          },
        }),
        Object.defineProperty(e, t, { enumerable: s.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (h) {
            a = "" + h;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Mr(e) {
    if (!e._valueTracker) {
      var t = Xc(e) ? "checked" : "value";
      e._valueTracker = Gy(e, t, "" + e[t]);
    }
  }
  function Vc(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      s = "";
    return (
      e && (s = Xc(e) ? (e.checked ? "true" : "false") : e.value),
      (e = s),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function Ys(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var ky = /[\n"\\]/g;
  function Mt(e) {
    return e.replace(ky, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Ur(e, t, a, s, r, c, h, x) {
    ((e.name = ""),
      h != null &&
      typeof h != "function" &&
      typeof h != "symbol" &&
      typeof h != "boolean"
        ? (e.type = h)
        : e.removeAttribute("type"),
      t != null
        ? h === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + Dt(t))
          : e.value !== "" + Dt(t) && (e.value = "" + Dt(t))
        : (h !== "submit" && h !== "reset") || e.removeAttribute("value"),
      t != null
        ? zr(e, h, Dt(t))
        : a != null
          ? zr(e, h, Dt(a))
          : s != null && e.removeAttribute("value"),
      r == null && c != null && (e.defaultChecked = !!c),
      r != null &&
        (e.checked = r && typeof r != "function" && typeof r != "symbol"),
      x != null &&
      typeof x != "function" &&
      typeof x != "symbol" &&
      typeof x != "boolean"
        ? (e.name = "" + Dt(x))
        : e.removeAttribute("name"));
  }
  function Zc(e, t, a, s, r, c, h, x) {
    if (
      (c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (e.type = c),
      t != null || a != null)
    ) {
      if (!((c !== "submit" && c !== "reset") || t != null)) {
        Mr(e);
        return;
      }
      ((a = a != null ? "" + Dt(a) : ""),
        (t = t != null ? "" + Dt(t) : a),
        x || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((s = s ?? r),
      (s = typeof s != "function" && typeof s != "symbol" && !!s),
      (e.checked = x ? e.checked : !!s),
      (e.defaultChecked = !!s),
      h != null &&
        typeof h != "function" &&
        typeof h != "symbol" &&
        typeof h != "boolean" &&
        (e.name = h),
      Mr(e));
  }
  function zr(e, t, a) {
    (t === "number" && Ys(e.ownerDocument) === e) ||
      e.defaultValue === "" + a ||
      (e.defaultValue = "" + a);
  }
  function Ha(e, t, a, s) {
    if (((e = e.options), t)) {
      t = {};
      for (var r = 0; r < a.length; r++) t["$" + a[r]] = !0;
      for (a = 0; a < e.length; a++)
        ((r = t.hasOwnProperty("$" + e[a].value)),
          e[a].selected !== r && (e[a].selected = r),
          r && s && (e[a].defaultSelected = !0));
    } else {
      for (a = "" + Dt(a), t = null, r = 0; r < e.length; r++) {
        if (e[r].value === a) {
          ((e[r].selected = !0), s && (e[r].defaultSelected = !0));
          return;
        }
        t !== null || e[r].disabled || (t = e[r]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Fc(e, t, a) {
    if (
      t != null &&
      ((t = "" + Dt(t)), t !== e.value && (e.value = t), a == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + Dt(a) : "";
  }
  function Jc(e, t, a, s) {
    if (t == null) {
      if (s != null) {
        if (a != null) throw Error(u(92));
        if (pe(s)) {
          if (1 < s.length) throw Error(u(93));
          s = s[0];
        }
        a = s;
      }
      (a == null && (a = ""), (t = a));
    }
    ((a = Dt(t)),
      (e.defaultValue = a),
      (s = e.textContent),
      s === a && s !== "" && s !== null && (e.value = s),
      Mr(e));
  }
  function Qa(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ky = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function $c(e, t, a) {
    var s = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? s
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : s
        ? e.setProperty(t, a)
        : typeof a != "number" || a === 0 || Ky.has(t)
          ? t === "float"
            ? (e.cssFloat = a)
            : (e[t] = ("" + a).trim())
          : (e[t] = a + "px");
  }
  function Pc(e, t, a) {
    if (t != null && typeof t != "object") throw Error(u(62));
    if (((e = e.style), a != null)) {
      for (var s in a)
        !a.hasOwnProperty(s) ||
          (t != null && t.hasOwnProperty(s)) ||
          (s.indexOf("--") === 0
            ? e.setProperty(s, "")
            : s === "float"
              ? (e.cssFloat = "")
              : (e[s] = ""));
      for (var r in t)
        ((s = t[r]), t.hasOwnProperty(r) && a[r] !== s && $c(e, r, s));
    } else for (var c in t) t.hasOwnProperty(c) && $c(e, c, t[c]);
  }
  function Br(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Xy = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Vy =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Gs(e) {
    return Vy.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function nl() {}
  var qr = null;
  function Lr(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Ya = null,
    Ga = null;
  function Wc(e) {
    var t = Ba(e);
    if (t && (e = t.stateNode)) {
      var a = e[dt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (Ur(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name,
            ),
            (t = a.name),
            a.type === "radio" && t != null)
          ) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + Mt("" + t) + '"][type="radio"]',
              ),
                t = 0;
              t < a.length;
              t++
            ) {
              var s = a[t];
              if (s !== e && s.form === e.form) {
                var r = s[dt] || null;
                if (!r) throw Error(u(90));
                Ur(
                  s,
                  r.value,
                  r.defaultValue,
                  r.defaultValue,
                  r.checked,
                  r.defaultChecked,
                  r.type,
                  r.name,
                );
              }
            }
            for (t = 0; t < a.length; t++)
              ((s = a[t]), s.form === e.form && Vc(s));
          }
          break e;
        case "textarea":
          Fc(e, a.value, a.defaultValue);
          break e;
        case "select":
          ((t = a.value), t != null && Ha(e, !!a.multiple, t, !1));
      }
    }
  }
  var Hr = !1;
  function Ic(e, t, a) {
    if (Hr) return e(t, a);
    Hr = !0;
    try {
      var s = e(t);
      return s;
    } finally {
      if (
        ((Hr = !1),
        (Ya !== null || Ga !== null) &&
          (Ai(), Ya && ((t = Ya), (e = Ga), (Ga = Ya = null), Wc(t), e)))
      )
        for (t = 0; t < e.length; t++) Wc(e[t]);
    }
  }
  function Un(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var s = a[dt] || null;
    if (s === null) return null;
    a = s[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((s = !s.disabled) ||
          ((e = e.type),
          (s = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !s));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function") throw Error(u(231, t, typeof a));
    return a;
  }
  var sl = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Qr = !1;
  if (sl)
    try {
      var zn = {};
      (Object.defineProperty(zn, "passive", {
        get: function () {
          Qr = !0;
        },
      }),
        window.addEventListener("test", zn, zn),
        window.removeEventListener("test", zn, zn));
    } catch {
      Qr = !1;
    }
  var Ml = null,
    Yr = null,
    ks = null;
  function ef() {
    if (ks) return ks;
    var e,
      t = Yr,
      a = t.length,
      s,
      r = "value" in Ml ? Ml.value : Ml.textContent,
      c = r.length;
    for (e = 0; e < a && t[e] === r[e]; e++);
    var h = a - e;
    for (s = 1; s <= h && t[a - s] === r[c - s]; s++);
    return (ks = r.slice(e, 1 < s ? 1 - s : void 0));
  }
  function Ks(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Xs() {
    return !0;
  }
  function tf() {
    return !1;
  }
  function ht(e) {
    function t(a, s, r, c, h) {
      ((this._reactName = a),
        (this._targetInst = r),
        (this.type = s),
        (this.nativeEvent = c),
        (this.target = h),
        (this.currentTarget = null));
      for (var x in e)
        e.hasOwnProperty(x) && ((a = e[x]), (this[x] = a ? a(c) : c[x]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? Xs
          : tf),
        (this.isPropagationStopped = tf),
        this
      );
    }
    return (
      S(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = Xs));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = Xs));
        },
        persist: function () {},
        isPersistent: Xs,
      }),
      t
    );
  }
  var ua = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Vs = ht(ua),
    Bn = S({}, ua, { view: 0, detail: 0 }),
    Zy = ht(Bn),
    Gr,
    kr,
    qn,
    Zs = S({}, Bn, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Xr,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== qn &&
              (qn && e.type === "mousemove"
                ? ((Gr = e.screenX - qn.screenX), (kr = e.screenY - qn.screenY))
                : (kr = Gr = 0),
              (qn = e)),
            Gr);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : kr;
      },
    }),
    lf = ht(Zs),
    Fy = S({}, Zs, { dataTransfer: 0 }),
    Jy = ht(Fy),
    $y = S({}, Bn, { relatedTarget: 0 }),
    Kr = ht($y),
    Py = S({}, ua, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Wy = ht(Py),
    Iy = S({}, ua, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    e0 = ht(Iy),
    t0 = S({}, ua, { data: 0 }),
    af = ht(t0),
    l0 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    a0 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    n0 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function s0(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = n0[e])
        ? !!t[e]
        : !1;
  }
  function Xr() {
    return s0;
  }
  var i0 = S({}, Bn, {
      key: function (e) {
        if (e.key) {
          var t = l0[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Ks(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? a0[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Xr,
      charCode: function (e) {
        return e.type === "keypress" ? Ks(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Ks(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    r0 = ht(i0),
    u0 = S({}, Zs, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    nf = ht(u0),
    o0 = S({}, Bn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Xr,
    }),
    c0 = ht(o0),
    f0 = S({}, ua, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    d0 = ht(f0),
    h0 = S({}, Zs, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    m0 = ht(h0),
    p0 = S({}, ua, { newState: 0, oldState: 0 }),
    y0 = ht(p0),
    b0 = [9, 13, 27, 32],
    Vr = sl && "CompositionEvent" in window,
    Ln = null;
  sl && "documentMode" in document && (Ln = document.documentMode);
  var g0 = sl && "TextEvent" in window && !Ln,
    sf = sl && (!Vr || (Ln && 8 < Ln && 11 >= Ln)),
    rf = " ",
    uf = !1;
  function of(e, t) {
    switch (e) {
      case "keyup":
        return b0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function cf(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var ka = !1;
  function v0(e, t) {
    switch (e) {
      case "compositionend":
        return cf(t);
      case "keypress":
        return t.which !== 32 ? null : ((uf = !0), rf);
      case "textInput":
        return ((e = t.data), e === rf && uf ? null : e);
      default:
        return null;
    }
  }
  function x0(e, t) {
    if (ka)
      return e === "compositionend" || (!Vr && of(e, t))
        ? ((e = ef()), (ks = Yr = Ml = null), (ka = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return sf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var S0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function ff(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!S0[e.type] : t === "textarea";
  }
  function df(e, t, a, s) {
    (Ya ? (Ga ? Ga.push(s) : (Ga = [s])) : (Ya = s),
      (t = Bi(t, "onChange")),
      0 < t.length &&
        ((a = new Vs("onChange", "change", null, a, s)),
        e.push({ event: a, listeners: t })));
  }
  var Hn = null,
    Qn = null;
  function N0(e) {
    Fh(e, 0);
  }
  function Fs(e) {
    var t = Mn(e);
    if (Vc(t)) return e;
  }
  function hf(e, t) {
    if (e === "change") return t;
  }
  var mf = !1;
  if (sl) {
    var Zr;
    if (sl) {
      var Fr = "oninput" in document;
      if (!Fr) {
        var pf = document.createElement("div");
        (pf.setAttribute("oninput", "return;"),
          (Fr = typeof pf.oninput == "function"));
      }
      Zr = Fr;
    } else Zr = !1;
    mf = Zr && (!document.documentMode || 9 < document.documentMode);
  }
  function yf() {
    Hn && (Hn.detachEvent("onpropertychange", bf), (Qn = Hn = null));
  }
  function bf(e) {
    if (e.propertyName === "value" && Fs(Qn)) {
      var t = [];
      (df(t, Qn, e, Lr(e)), Ic(N0, t));
    }
  }
  function j0(e, t, a) {
    e === "focusin"
      ? (yf(), (Hn = t), (Qn = a), Hn.attachEvent("onpropertychange", bf))
      : e === "focusout" && yf();
  }
  function E0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Fs(Qn);
  }
  function w0(e, t) {
    if (e === "click") return Fs(t);
  }
  function _0(e, t) {
    if (e === "input" || e === "change") return Fs(t);
  }
  function C0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var wt = typeof Object.is == "function" ? Object.is : C0;
  function Yn(e, t) {
    if (wt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var a = Object.keys(e),
      s = Object.keys(t);
    if (a.length !== s.length) return !1;
    for (s = 0; s < a.length; s++) {
      var r = a[s];
      if (!wr.call(t, r) || !wt(e[r], t[r])) return !1;
    }
    return !0;
  }
  function gf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function vf(e, t) {
    var a = gf(e);
    e = 0;
    for (var s; a; ) {
      if (a.nodeType === 3) {
        if (((s = e + a.textContent.length), e <= t && s >= t))
          return { node: a, offset: t - e };
        e = s;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = gf(a);
    }
  }
  function xf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? xf(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Sf(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Ys(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Ys(e.document);
    }
    return t;
  }
  function Jr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var T0 = sl && "documentMode" in document && 11 >= document.documentMode,
    Ka = null,
    $r = null,
    Gn = null,
    Pr = !1;
  function Nf(e, t, a) {
    var s =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Pr ||
      Ka == null ||
      Ka !== Ys(s) ||
      ((s = Ka),
      "selectionStart" in s && Jr(s)
        ? (s = { start: s.selectionStart, end: s.selectionEnd })
        : ((s = (
            (s.ownerDocument && s.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (s = {
            anchorNode: s.anchorNode,
            anchorOffset: s.anchorOffset,
            focusNode: s.focusNode,
            focusOffset: s.focusOffset,
          })),
      (Gn && Yn(Gn, s)) ||
        ((Gn = s),
        (s = Bi($r, "onSelect")),
        0 < s.length &&
          ((t = new Vs("onSelect", "select", null, t, a)),
          e.push({ event: t, listeners: s }),
          (t.target = Ka))));
  }
  function oa(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a["Webkit" + e] = "webkit" + t),
      (a["Moz" + e] = "moz" + t),
      a
    );
  }
  var Xa = {
      animationend: oa("Animation", "AnimationEnd"),
      animationiteration: oa("Animation", "AnimationIteration"),
      animationstart: oa("Animation", "AnimationStart"),
      transitionrun: oa("Transition", "TransitionRun"),
      transitionstart: oa("Transition", "TransitionStart"),
      transitioncancel: oa("Transition", "TransitionCancel"),
      transitionend: oa("Transition", "TransitionEnd"),
    },
    Wr = {},
    jf = {};
  sl &&
    ((jf = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Xa.animationend.animation,
      delete Xa.animationiteration.animation,
      delete Xa.animationstart.animation),
    "TransitionEvent" in window || delete Xa.transitionend.transition);
  function ca(e) {
    if (Wr[e]) return Wr[e];
    if (!Xa[e]) return e;
    var t = Xa[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in jf) return (Wr[e] = t[a]);
    return e;
  }
  var Ef = ca("animationend"),
    wf = ca("animationiteration"),
    _f = ca("animationstart"),
    A0 = ca("transitionrun"),
    R0 = ca("transitionstart"),
    O0 = ca("transitioncancel"),
    Cf = ca("transitionend"),
    Tf = new Map(),
    Ir =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Ir.push("scrollEnd");
  function Kt(e, t) {
    (Tf.set(e, t), ra(t, [e]));
  }
  var Js =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == "object" &&
                  e !== null &&
                  typeof e.message == "string"
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", e);
              return;
            }
            console.error(e);
          },
    Ut = [],
    Va = 0,
    eu = 0;
  function $s() {
    for (var e = Va, t = (eu = Va = 0); t < e; ) {
      var a = Ut[t];
      Ut[t++] = null;
      var s = Ut[t];
      Ut[t++] = null;
      var r = Ut[t];
      Ut[t++] = null;
      var c = Ut[t];
      if (((Ut[t++] = null), s !== null && r !== null)) {
        var h = s.pending;
        (h === null ? (r.next = r) : ((r.next = h.next), (h.next = r)),
          (s.pending = r));
      }
      c !== 0 && Af(a, r, c);
    }
  }
  function Ps(e, t, a, s) {
    ((Ut[Va++] = e),
      (Ut[Va++] = t),
      (Ut[Va++] = a),
      (Ut[Va++] = s),
      (eu |= s),
      (e.lanes |= s),
      (e = e.alternate),
      e !== null && (e.lanes |= s));
  }
  function tu(e, t, a, s) {
    return (Ps(e, t, a, s), Ws(e));
  }
  function fa(e, t) {
    return (Ps(e, null, null, t), Ws(e));
  }
  function Af(e, t, a) {
    e.lanes |= a;
    var s = e.alternate;
    s !== null && (s.lanes |= a);
    for (var r = !1, c = e.return; c !== null; )
      ((c.childLanes |= a),
        (s = c.alternate),
        s !== null && (s.childLanes |= a),
        c.tag === 22 &&
          ((e = c.stateNode), e === null || e._visibility & 1 || (r = !0)),
        (e = c),
        (c = c.return));
    return e.tag === 3
      ? ((c = e.stateNode),
        r &&
          t !== null &&
          ((r = 31 - Et(a)),
          (e = c.hiddenUpdates),
          (s = e[r]),
          s === null ? (e[r] = [t]) : s.push(t),
          (t.lane = a | 536870912)),
        c)
      : null;
  }
  function Ws(e) {
    if (50 < cs) throw ((cs = 0), (co = null), Error(u(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Za = {};
  function D0(e, t, a, s) {
    ((this.tag = e),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = s),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function _t(e, t, a, s) {
    return new D0(e, t, a, s);
  }
  function lu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function il(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = _t(e.tag, t, e.key, e.mode)),
          (a.elementType = e.elementType),
          (a.type = e.type),
          (a.stateNode = e.stateNode),
          (a.alternate = e),
          (e.alternate = a))
        : ((a.pendingProps = t),
          (a.type = e.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = e.flags & 65011712),
      (a.childLanes = e.childLanes),
      (a.lanes = e.lanes),
      (a.child = e.child),
      (a.memoizedProps = e.memoizedProps),
      (a.memoizedState = e.memoizedState),
      (a.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (a.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = e.sibling),
      (a.index = e.index),
      (a.ref = e.ref),
      (a.refCleanup = e.refCleanup),
      a
    );
  }
  function Rf(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return (
      a === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = a.childLanes),
          (e.lanes = a.lanes),
          (e.child = a.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = a.memoizedProps),
          (e.memoizedState = a.memoizedState),
          (e.updateQueue = a.updateQueue),
          (e.type = a.type),
          (t = a.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function Is(e, t, a, s, r, c) {
    var h = 0;
    if (((s = e), typeof e == "function")) lu(e) && (h = 1);
    else if (typeof e == "string")
      h = qb(e, a, W.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case P:
          return ((e = _t(31, a, t, r)), (e.elementType = P), (e.lanes = c), e);
        case j:
          return da(a.children, r, c, t);
        case g:
          ((h = 8), (r |= 24));
          break;
        case A:
          return (
            (e = _t(12, a, t, r | 2)),
            (e.elementType = A),
            (e.lanes = c),
            e
          );
        case k:
          return ((e = _t(13, a, t, r)), (e.elementType = k), (e.lanes = c), e);
        case F:
          return ((e = _t(19, a, t, r)), (e.elementType = F), (e.lanes = c), e);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case q:
                h = 10;
                break e;
              case R:
                h = 9;
                break e;
              case Z:
                h = 11;
                break e;
              case K:
                h = 14;
                break e;
              case V:
                ((h = 16), (s = null));
                break e;
            }
          ((h = 29),
            (a = Error(u(130, e === null ? "null" : typeof e, ""))),
            (s = null));
      }
    return (
      (t = _t(h, a, t, r)),
      (t.elementType = e),
      (t.type = s),
      (t.lanes = c),
      t
    );
  }
  function da(e, t, a, s) {
    return ((e = _t(7, e, s, t)), (e.lanes = a), e);
  }
  function au(e, t, a) {
    return ((e = _t(6, e, null, t)), (e.lanes = a), e);
  }
  function Of(e) {
    var t = _t(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function nu(e, t, a) {
    return (
      (t = _t(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Df = new WeakMap();
  function zt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Df.get(e);
      return a !== void 0
        ? a
        : ((t = { value: e, source: t, stack: Rc(t) }), Df.set(e, t), t);
    }
    return { value: e, source: t, stack: Rc(t) };
  }
  var Fa = [],
    Ja = 0,
    ei = null,
    kn = 0,
    Bt = [],
    qt = 0,
    Ul = null,
    Pt = 1,
    Wt = "";
  function rl(e, t) {
    ((Fa[Ja++] = kn), (Fa[Ja++] = ei), (ei = e), (kn = t));
  }
  function Mf(e, t, a) {
    ((Bt[qt++] = Pt), (Bt[qt++] = Wt), (Bt[qt++] = Ul), (Ul = e));
    var s = Pt;
    e = Wt;
    var r = 32 - Et(s) - 1;
    ((s &= ~(1 << r)), (a += 1));
    var c = 32 - Et(t) + r;
    if (30 < c) {
      var h = r - (r % 5);
      ((c = (s & ((1 << h) - 1)).toString(32)),
        (s >>= h),
        (r -= h),
        (Pt = (1 << (32 - Et(t) + r)) | (a << r) | s),
        (Wt = c + e));
    } else ((Pt = (1 << c) | (a << r) | s), (Wt = e));
  }
  function su(e) {
    e.return !== null && (rl(e, 1), Mf(e, 1, 0));
  }
  function iu(e) {
    for (; e === ei; )
      ((ei = Fa[--Ja]), (Fa[Ja] = null), (kn = Fa[--Ja]), (Fa[Ja] = null));
    for (; e === Ul; )
      ((Ul = Bt[--qt]),
        (Bt[qt] = null),
        (Wt = Bt[--qt]),
        (Bt[qt] = null),
        (Pt = Bt[--qt]),
        (Bt[qt] = null));
  }
  function Uf(e, t) {
    ((Bt[qt++] = Pt),
      (Bt[qt++] = Wt),
      (Bt[qt++] = Ul),
      (Pt = t.id),
      (Wt = t.overflow),
      (Ul = e));
  }
  var at = null,
    Be = null,
    Ee = !1,
    zl = null,
    Lt = !1,
    ru = Error(u(519));
  function Bl(e) {
    var t = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (Kn(zt(t, e)), ru);
  }
  function zf(e) {
    var t = e.stateNode,
      a = e.type,
      s = e.memoizedProps;
    switch (((t[lt] = e), (t[dt] = s), a)) {
      case "dialog":
        (Se("cancel", t), Se("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        Se("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ds.length; a++) Se(ds[a], t);
        break;
      case "source":
        Se("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (Se("error", t), Se("load", t));
        break;
      case "details":
        Se("toggle", t);
        break;
      case "input":
        (Se("invalid", t),
          Zc(
            t,
            s.value,
            s.defaultValue,
            s.checked,
            s.defaultChecked,
            s.type,
            s.name,
            !0,
          ));
        break;
      case "select":
        Se("invalid", t);
        break;
      case "textarea":
        (Se("invalid", t), Jc(t, s.value, s.defaultValue, s.children));
    }
    ((a = s.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      t.textContent === "" + a ||
      s.suppressHydrationWarning === !0 ||
      Wh(t.textContent, a)
        ? (s.popover != null && (Se("beforetoggle", t), Se("toggle", t)),
          s.onScroll != null && Se("scroll", t),
          s.onScrollEnd != null && Se("scrollend", t),
          s.onClick != null && (t.onclick = nl),
          (t = !0))
        : (t = !1),
      t || Bl(e, !0));
  }
  function Bf(e) {
    for (at = e.return; at; )
      switch (at.tag) {
        case 5:
        case 31:
        case 13:
          Lt = !1;
          return;
        case 27:
        case 3:
          Lt = !0;
          return;
        default:
          at = at.return;
      }
  }
  function $a(e) {
    if (e !== at) return !1;
    if (!Ee) return (Bf(e), (Ee = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type),
          (a =
            !(a !== "form" && a !== "button") || _o(e.type, e.memoizedProps))),
        (a = !a)),
      a && Be && Bl(e),
      Bf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(u(317));
      Be = rm(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(u(317));
      Be = rm(e);
    } else
      t === 27
        ? ((t = Be), $l(e.type) ? ((e = Oo), (Oo = null), (Be = e)) : (Be = t))
        : (Be = at ? Qt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function ha() {
    ((Be = at = null), (Ee = !1));
  }
  function uu() {
    var e = zl;
    return (
      e !== null &&
        (bt === null ? (bt = e) : bt.push.apply(bt, e), (zl = null)),
      e
    );
  }
  function Kn(e) {
    zl === null ? (zl = [e]) : zl.push(e);
  }
  var ou = _(null),
    ma = null,
    ul = null;
  function ql(e, t, a) {
    ($(ou, t._currentValue), (t._currentValue = a));
  }
  function ol(e) {
    ((e._currentValue = ou.current), Q(ou));
  }
  function cu(e, t, a) {
    for (; e !== null; ) {
      var s = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), s !== null && (s.childLanes |= t))
          : s !== null && (s.childLanes & t) !== t && (s.childLanes |= t),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function fu(e, t, a, s) {
    var r = e.child;
    for (r !== null && (r.return = e); r !== null; ) {
      var c = r.dependencies;
      if (c !== null) {
        var h = r.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var x = c;
          c = r;
          for (var w = 0; w < t.length; w++)
            if (x.context === t[w]) {
              ((c.lanes |= a),
                (x = c.alternate),
                x !== null && (x.lanes |= a),
                cu(c.return, a, e),
                s || (h = null));
              break e;
            }
          c = x.next;
        }
      } else if (r.tag === 18) {
        if (((h = r.return), h === null)) throw Error(u(341));
        ((h.lanes |= a),
          (c = h.alternate),
          c !== null && (c.lanes |= a),
          cu(h, a, e),
          (h = null));
      } else h = r.child;
      if (h !== null) h.return = r;
      else
        for (h = r; h !== null; ) {
          if (h === e) {
            h = null;
            break;
          }
          if (((r = h.sibling), r !== null)) {
            ((r.return = h.return), (h = r));
            break;
          }
          h = h.return;
        }
      r = h;
    }
  }
  function Pa(e, t, a, s) {
    e = null;
    for (var r = t, c = !1; r !== null; ) {
      if (!c) {
        if ((r.flags & 524288) !== 0) c = !0;
        else if ((r.flags & 262144) !== 0) break;
      }
      if (r.tag === 10) {
        var h = r.alternate;
        if (h === null) throw Error(u(387));
        if (((h = h.memoizedProps), h !== null)) {
          var x = r.type;
          wt(r.pendingProps.value, h.value) ||
            (e !== null ? e.push(x) : (e = [x]));
        }
      } else if (r === ve.current) {
        if (((h = r.alternate), h === null)) throw Error(u(387));
        h.memoizedState.memoizedState !== r.memoizedState.memoizedState &&
          (e !== null ? e.push(bs) : (e = [bs]));
      }
      r = r.return;
    }
    (e !== null && fu(t, e, a, s), (t.flags |= 262144));
  }
  function ti(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!wt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function pa(e) {
    ((ma = e),
      (ul = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function nt(e) {
    return qf(ma, e);
  }
  function li(e, t) {
    return (ma === null && pa(e), qf(e, t));
  }
  function qf(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), ul === null)) {
      if (e === null) throw Error(u(308));
      ((ul = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else ul = ul.next = t;
    return a;
  }
  var M0 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, s) {
                  e.push(s);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (a) {
                  return a();
                }));
            };
          },
    U0 = n.unstable_scheduleCallback,
    z0 = n.unstable_NormalPriority,
    Ze = {
      $$typeof: q,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function du() {
    return { controller: new M0(), data: new Map(), refCount: 0 };
  }
  function Xn(e) {
    (e.refCount--,
      e.refCount === 0 &&
        U0(z0, function () {
          e.controller.abort();
        }));
  }
  var Vn = null,
    hu = 0,
    Wa = 0,
    Ia = null;
  function B0(e, t) {
    if (Vn === null) {
      var a = (Vn = []);
      ((hu = 0),
        (Wa = bo()),
        (Ia = {
          status: "pending",
          value: void 0,
          then: function (s) {
            a.push(s);
          },
        }));
    }
    return (hu++, t.then(Lf, Lf), t);
  }
  function Lf() {
    if (--hu === 0 && Vn !== null) {
      Ia !== null && (Ia.status = "fulfilled");
      var e = Vn;
      ((Vn = null), (Wa = 0), (Ia = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function q0(e, t) {
    var a = [],
      s = {
        status: "pending",
        value: null,
        reason: null,
        then: function (r) {
          a.push(r);
        },
      };
    return (
      e.then(
        function () {
          ((s.status = "fulfilled"), (s.value = t));
          for (var r = 0; r < a.length; r++) (0, a[r])(t);
        },
        function (r) {
          for (s.status = "rejected", s.reason = r, r = 0; r < a.length; r++)
            (0, a[r])(void 0);
        },
      ),
      s
    );
  }
  var Hf = M.S;
  M.S = function (e, t) {
    ((Nh = Nt()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        B0(e, t),
      Hf !== null && Hf(e, t));
  };
  var ya = _(null);
  function mu() {
    var e = ya.current;
    return e !== null ? e : ze.pooledCache;
  }
  function ai(e, t) {
    t === null ? $(ya, ya.current) : $(ya, t.pool);
  }
  function Qf() {
    var e = mu();
    return e === null ? null : { parent: Ze._currentValue, pool: e };
  }
  var en = Error(u(460)),
    pu = Error(u(474)),
    ni = Error(u(542)),
    si = { then: function () {} };
  function Yf(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function Gf(e, t, a) {
    switch (
      ((a = e[a]),
      a === void 0 ? e.push(t) : a !== t && (t.then(nl, nl), (t = a)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), Kf(e), e);
      default:
        if (typeof t.status == "string") t.then(nl, nl);
        else {
          if (((e = ze), e !== null && 100 < e.shellSuspendCounter))
            throw Error(u(482));
          ((e = t),
            (e.status = "pending"),
            e.then(
              function (s) {
                if (t.status === "pending") {
                  var r = t;
                  ((r.status = "fulfilled"), (r.value = s));
                }
              },
              function (s) {
                if (t.status === "pending") {
                  var r = t;
                  ((r.status = "rejected"), (r.reason = s));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), Kf(e), e);
        }
        throw ((ga = t), en);
    }
  }
  function ba(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function"
        ? ((ga = a), en)
        : a;
    }
  }
  var ga = null;
  function kf() {
    if (ga === null) throw Error(u(459));
    var e = ga;
    return ((ga = null), e);
  }
  function Kf(e) {
    if (e === en || e === ni) throw Error(u(483));
  }
  var tn = null,
    Zn = 0;
  function ii(e) {
    var t = Zn;
    return ((Zn += 1), tn === null && (tn = []), Gf(tn, e, t));
  }
  function Fn(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function ri(e, t) {
    throw t.$$typeof === E
      ? Error(u(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          u(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e,
          ),
        ));
  }
  function Xf(e) {
    function t(O, C) {
      if (e) {
        var U = O.deletions;
        U === null ? ((O.deletions = [C]), (O.flags |= 16)) : U.push(C);
      }
    }
    function a(O, C) {
      if (!e) return null;
      for (; C !== null; ) (t(O, C), (C = C.sibling));
      return null;
    }
    function s(O) {
      for (var C = new Map(); O !== null; )
        (O.key !== null ? C.set(O.key, O) : C.set(O.index, O), (O = O.sibling));
      return C;
    }
    function r(O, C) {
      return ((O = il(O, C)), (O.index = 0), (O.sibling = null), O);
    }
    function c(O, C, U) {
      return (
        (O.index = U),
        e
          ? ((U = O.alternate),
            U !== null
              ? ((U = U.index), U < C ? ((O.flags |= 67108866), C) : U)
              : ((O.flags |= 67108866), C))
          : ((O.flags |= 1048576), C)
      );
    }
    function h(O) {
      return (e && O.alternate === null && (O.flags |= 67108866), O);
    }
    function x(O, C, U, G) {
      return C === null || C.tag !== 6
        ? ((C = au(U, O.mode, G)), (C.return = O), C)
        : ((C = r(C, U)), (C.return = O), C);
    }
    function w(O, C, U, G) {
      var re = U.type;
      return re === j
        ? Y(O, C, U.props.children, G, U.key)
        : C !== null &&
            (C.elementType === re ||
              (typeof re == "object" &&
                re !== null &&
                re.$$typeof === V &&
                ba(re) === C.type))
          ? ((C = r(C, U.props)), Fn(C, U), (C.return = O), C)
          : ((C = Is(U.type, U.key, U.props, null, O.mode, G)),
            Fn(C, U),
            (C.return = O),
            C);
    }
    function z(O, C, U, G) {
      return C === null ||
        C.tag !== 4 ||
        C.stateNode.containerInfo !== U.containerInfo ||
        C.stateNode.implementation !== U.implementation
        ? ((C = nu(U, O.mode, G)), (C.return = O), C)
        : ((C = r(C, U.children || [])), (C.return = O), C);
    }
    function Y(O, C, U, G, re) {
      return C === null || C.tag !== 7
        ? ((C = da(U, O.mode, G, re)), (C.return = O), C)
        : ((C = r(C, U)), (C.return = O), C);
    }
    function X(O, C, U) {
      if (
        (typeof C == "string" && C !== "") ||
        typeof C == "number" ||
        typeof C == "bigint"
      )
        return ((C = au("" + C, O.mode, U)), (C.return = O), C);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case T:
            return (
              (U = Is(C.type, C.key, C.props, null, O.mode, U)),
              Fn(U, C),
              (U.return = O),
              U
            );
          case N:
            return ((C = nu(C, O.mode, U)), (C.return = O), C);
          case V:
            return ((C = ba(C)), X(O, C, U));
        }
        if (pe(C) || se(C))
          return ((C = da(C, O.mode, U, null)), (C.return = O), C);
        if (typeof C.then == "function") return X(O, ii(C), U);
        if (C.$$typeof === q) return X(O, li(O, C), U);
        ri(O, C);
      }
      return null;
    }
    function B(O, C, U, G) {
      var re = C !== null ? C.key : null;
      if (
        (typeof U == "string" && U !== "") ||
        typeof U == "number" ||
        typeof U == "bigint"
      )
        return re !== null ? null : x(O, C, "" + U, G);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case T:
            return U.key === re ? w(O, C, U, G) : null;
          case N:
            return U.key === re ? z(O, C, U, G) : null;
          case V:
            return ((U = ba(U)), B(O, C, U, G));
        }
        if (pe(U) || se(U)) return re !== null ? null : Y(O, C, U, G, null);
        if (typeof U.then == "function") return B(O, C, ii(U), G);
        if (U.$$typeof === q) return B(O, C, li(O, U), G);
        ri(O, U);
      }
      return null;
    }
    function H(O, C, U, G, re) {
      if (
        (typeof G == "string" && G !== "") ||
        typeof G == "number" ||
        typeof G == "bigint"
      )
        return ((O = O.get(U) || null), x(C, O, "" + G, re));
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case T:
            return (
              (O = O.get(G.key === null ? U : G.key) || null),
              w(C, O, G, re)
            );
          case N:
            return (
              (O = O.get(G.key === null ? U : G.key) || null),
              z(C, O, G, re)
            );
          case V:
            return ((G = ba(G)), H(O, C, U, G, re));
        }
        if (pe(G) || se(G))
          return ((O = O.get(U) || null), Y(C, O, G, re, null));
        if (typeof G.then == "function") return H(O, C, U, ii(G), re);
        if (G.$$typeof === q) return H(O, C, U, li(C, G), re);
        ri(C, G);
      }
      return null;
    }
    function te(O, C, U, G) {
      for (
        var re = null, we = null, ae = C, ge = (C = 0), je = null;
        ae !== null && ge < U.length;
        ge++
      ) {
        ae.index > ge ? ((je = ae), (ae = null)) : (je = ae.sibling);
        var _e = B(O, ae, U[ge], G);
        if (_e === null) {
          ae === null && (ae = je);
          break;
        }
        (e && ae && _e.alternate === null && t(O, ae),
          (C = c(_e, C, ge)),
          we === null ? (re = _e) : (we.sibling = _e),
          (we = _e),
          (ae = je));
      }
      if (ge === U.length) return (a(O, ae), Ee && rl(O, ge), re);
      if (ae === null) {
        for (; ge < U.length; ge++)
          ((ae = X(O, U[ge], G)),
            ae !== null &&
              ((C = c(ae, C, ge)),
              we === null ? (re = ae) : (we.sibling = ae),
              (we = ae)));
        return (Ee && rl(O, ge), re);
      }
      for (ae = s(ae); ge < U.length; ge++)
        ((je = H(ae, O, ge, U[ge], G)),
          je !== null &&
            (e &&
              je.alternate !== null &&
              ae.delete(je.key === null ? ge : je.key),
            (C = c(je, C, ge)),
            we === null ? (re = je) : (we.sibling = je),
            (we = je)));
      return (
        e &&
          ae.forEach(function (ta) {
            return t(O, ta);
          }),
        Ee && rl(O, ge),
        re
      );
    }
    function ue(O, C, U, G) {
      if (U == null) throw Error(u(151));
      for (
        var re = null,
          we = null,
          ae = C,
          ge = (C = 0),
          je = null,
          _e = U.next();
        ae !== null && !_e.done;
        ge++, _e = U.next()
      ) {
        ae.index > ge ? ((je = ae), (ae = null)) : (je = ae.sibling);
        var ta = B(O, ae, _e.value, G);
        if (ta === null) {
          ae === null && (ae = je);
          break;
        }
        (e && ae && ta.alternate === null && t(O, ae),
          (C = c(ta, C, ge)),
          we === null ? (re = ta) : (we.sibling = ta),
          (we = ta),
          (ae = je));
      }
      if (_e.done) return (a(O, ae), Ee && rl(O, ge), re);
      if (ae === null) {
        for (; !_e.done; ge++, _e = U.next())
          ((_e = X(O, _e.value, G)),
            _e !== null &&
              ((C = c(_e, C, ge)),
              we === null ? (re = _e) : (we.sibling = _e),
              (we = _e)));
        return (Ee && rl(O, ge), re);
      }
      for (ae = s(ae); !_e.done; ge++, _e = U.next())
        ((_e = H(ae, O, ge, _e.value, G)),
          _e !== null &&
            (e &&
              _e.alternate !== null &&
              ae.delete(_e.key === null ? ge : _e.key),
            (C = c(_e, C, ge)),
            we === null ? (re = _e) : (we.sibling = _e),
            (we = _e)));
      return (
        e &&
          ae.forEach(function (Fb) {
            return t(O, Fb);
          }),
        Ee && rl(O, ge),
        re
      );
    }
    function Ue(O, C, U, G) {
      if (
        (typeof U == "object" &&
          U !== null &&
          U.type === j &&
          U.key === null &&
          (U = U.props.children),
        typeof U == "object" && U !== null)
      ) {
        switch (U.$$typeof) {
          case T:
            e: {
              for (var re = U.key; C !== null; ) {
                if (C.key === re) {
                  if (((re = U.type), re === j)) {
                    if (C.tag === 7) {
                      (a(O, C.sibling),
                        (G = r(C, U.props.children)),
                        (G.return = O),
                        (O = G));
                      break e;
                    }
                  } else if (
                    C.elementType === re ||
                    (typeof re == "object" &&
                      re !== null &&
                      re.$$typeof === V &&
                      ba(re) === C.type)
                  ) {
                    (a(O, C.sibling),
                      (G = r(C, U.props)),
                      Fn(G, U),
                      (G.return = O),
                      (O = G));
                    break e;
                  }
                  a(O, C);
                  break;
                } else t(O, C);
                C = C.sibling;
              }
              U.type === j
                ? ((G = da(U.props.children, O.mode, G, U.key)),
                  (G.return = O),
                  (O = G))
                : ((G = Is(U.type, U.key, U.props, null, O.mode, G)),
                  Fn(G, U),
                  (G.return = O),
                  (O = G));
            }
            return h(O);
          case N:
            e: {
              for (re = U.key; C !== null; ) {
                if (C.key === re)
                  if (
                    C.tag === 4 &&
                    C.stateNode.containerInfo === U.containerInfo &&
                    C.stateNode.implementation === U.implementation
                  ) {
                    (a(O, C.sibling),
                      (G = r(C, U.children || [])),
                      (G.return = O),
                      (O = G));
                    break e;
                  } else {
                    a(O, C);
                    break;
                  }
                else t(O, C);
                C = C.sibling;
              }
              ((G = nu(U, O.mode, G)), (G.return = O), (O = G));
            }
            return h(O);
          case V:
            return ((U = ba(U)), Ue(O, C, U, G));
        }
        if (pe(U)) return te(O, C, U, G);
        if (se(U)) {
          if (((re = se(U)), typeof re != "function")) throw Error(u(150));
          return ((U = re.call(U)), ue(O, C, U, G));
        }
        if (typeof U.then == "function") return Ue(O, C, ii(U), G);
        if (U.$$typeof === q) return Ue(O, C, li(O, U), G);
        ri(O, U);
      }
      return (typeof U == "string" && U !== "") ||
        typeof U == "number" ||
        typeof U == "bigint"
        ? ((U = "" + U),
          C !== null && C.tag === 6
            ? (a(O, C.sibling), (G = r(C, U)), (G.return = O), (O = G))
            : (a(O, C), (G = au(U, O.mode, G)), (G.return = O), (O = G)),
          h(O))
        : a(O, C);
    }
    return function (O, C, U, G) {
      try {
        Zn = 0;
        var re = Ue(O, C, U, G);
        return ((tn = null), re);
      } catch (ae) {
        if (ae === en || ae === ni) throw ae;
        var we = _t(29, ae, null, O.mode);
        return ((we.lanes = G), (we.return = O), we);
      } finally {
      }
    };
  }
  var va = Xf(!0),
    Vf = Xf(!1),
    Ll = !1;
  function yu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function bu(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function Hl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ql(e, t, a) {
    var s = e.updateQueue;
    if (s === null) return null;
    if (((s = s.shared), (Ce & 2) !== 0)) {
      var r = s.pending;
      return (
        r === null ? (t.next = t) : ((t.next = r.next), (r.next = t)),
        (s.pending = t),
        (t = Ws(e)),
        Af(e, null, a),
        t
      );
    }
    return (Ps(e, s, t, a), Ws(e));
  }
  function Jn(e, t, a) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))
    ) {
      var s = t.lanes;
      ((s &= e.pendingLanes), (a |= s), (t.lanes = a), Bc(e, a));
    }
  }
  function gu(e, t) {
    var a = e.updateQueue,
      s = e.alternate;
    if (s !== null && ((s = s.updateQueue), a === s)) {
      var r = null,
        c = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var h = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          (c === null ? (r = c = h) : (c = c.next = h), (a = a.next));
        } while (a !== null);
        c === null ? (r = c = t) : (c = c.next = t);
      } else r = c = t;
      ((a = {
        baseState: s.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: c,
        shared: s.shared,
        callbacks: s.callbacks,
      }),
        (e.updateQueue = a));
      return;
    }
    ((e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = t) : (e.next = t),
      (a.lastBaseUpdate = t));
  }
  var vu = !1;
  function $n() {
    if (vu) {
      var e = Ia;
      if (e !== null) throw e;
    }
  }
  function Pn(e, t, a, s) {
    vu = !1;
    var r = e.updateQueue;
    Ll = !1;
    var c = r.firstBaseUpdate,
      h = r.lastBaseUpdate,
      x = r.shared.pending;
    if (x !== null) {
      r.shared.pending = null;
      var w = x,
        z = w.next;
      ((w.next = null), h === null ? (c = z) : (h.next = z), (h = w));
      var Y = e.alternate;
      Y !== null &&
        ((Y = Y.updateQueue),
        (x = Y.lastBaseUpdate),
        x !== h &&
          (x === null ? (Y.firstBaseUpdate = z) : (x.next = z),
          (Y.lastBaseUpdate = w)));
    }
    if (c !== null) {
      var X = r.baseState;
      ((h = 0), (Y = z = w = null), (x = c));
      do {
        var B = x.lane & -536870913,
          H = B !== x.lane;
        if (H ? (Ne & B) === B : (s & B) === B) {
          (B !== 0 && B === Wa && (vu = !0),
            Y !== null &&
              (Y = Y.next =
                {
                  lane: 0,
                  tag: x.tag,
                  payload: x.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var te = e,
              ue = x;
            B = t;
            var Ue = a;
            switch (ue.tag) {
              case 1:
                if (((te = ue.payload), typeof te == "function")) {
                  X = te.call(Ue, X, B);
                  break e;
                }
                X = te;
                break e;
              case 3:
                te.flags = (te.flags & -65537) | 128;
              case 0:
                if (
                  ((te = ue.payload),
                  (B = typeof te == "function" ? te.call(Ue, X, B) : te),
                  B == null)
                )
                  break e;
                X = S({}, X, B);
                break e;
              case 2:
                Ll = !0;
            }
          }
          ((B = x.callback),
            B !== null &&
              ((e.flags |= 64),
              H && (e.flags |= 8192),
              (H = r.callbacks),
              H === null ? (r.callbacks = [B]) : H.push(B)));
        } else
          ((H = {
            lane: B,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null,
          }),
            Y === null ? ((z = Y = H), (w = X)) : (Y = Y.next = H),
            (h |= B));
        if (((x = x.next), x === null)) {
          if (((x = r.shared.pending), x === null)) break;
          ((H = x),
            (x = H.next),
            (H.next = null),
            (r.lastBaseUpdate = H),
            (r.shared.pending = null));
        }
      } while (!0);
      (Y === null && (w = X),
        (r.baseState = w),
        (r.firstBaseUpdate = z),
        (r.lastBaseUpdate = Y),
        c === null && (r.shared.lanes = 0),
        (Xl |= h),
        (e.lanes = h),
        (e.memoizedState = X));
    }
  }
  function Zf(e, t) {
    if (typeof e != "function") throw Error(u(191, e));
    e.call(t);
  }
  function Ff(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++) Zf(a[e], t);
  }
  var ln = _(null),
    ui = _(0);
  function Jf(e, t) {
    ((e = gl), $(ui, e), $(ln, t), (gl = e | t.baseLanes));
  }
  function xu() {
    ($(ui, gl), $(ln, ln.current));
  }
  function Su() {
    ((gl = ui.current), Q(ln), Q(ui));
  }
  var Ct = _(null),
    Ht = null;
  function Yl(e) {
    var t = e.alternate;
    ($(Xe, Xe.current & 1),
      $(Ct, e),
      Ht === null &&
        (t === null || ln.current !== null || t.memoizedState !== null) &&
        (Ht = e));
  }
  function Nu(e) {
    ($(Xe, Xe.current), $(Ct, e), Ht === null && (Ht = e));
  }
  function $f(e) {
    e.tag === 22
      ? ($(Xe, Xe.current), $(Ct, e), Ht === null && (Ht = e))
      : Gl();
  }
  function Gl() {
    ($(Xe, Xe.current), $(Ct, Ct.current));
  }
  function Tt(e) {
    (Q(Ct), Ht === e && (Ht = null), Q(Xe));
  }
  var Xe = _(0);
  function oi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Ao(a) || Ro(a)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var cl = 0,
    ye = null,
    De = null,
    Fe = null,
    ci = !1,
    an = !1,
    xa = !1,
    fi = 0,
    Wn = 0,
    nn = null,
    L0 = 0;
  function Ge() {
    throw Error(u(321));
  }
  function ju(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!wt(e[a], t[a])) return !1;
    return !0;
  }
  function Eu(e, t, a, s, r, c) {
    return (
      (cl = c),
      (ye = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (M.H = e === null || e.memoizedState === null ? Md : Hu),
      (xa = !1),
      (c = a(s, r)),
      (xa = !1),
      an && (c = Wf(t, a, s, r)),
      Pf(e),
      c
    );
  }
  function Pf(e) {
    M.H = ts;
    var t = De !== null && De.next !== null;
    if (((cl = 0), (Fe = De = ye = null), (ci = !1), (Wn = 0), (nn = null), t))
      throw Error(u(300));
    e === null ||
      Je ||
      ((e = e.dependencies), e !== null && ti(e) && (Je = !0));
  }
  function Wf(e, t, a, s) {
    ye = e;
    var r = 0;
    do {
      if ((an && (nn = null), (Wn = 0), (an = !1), 25 <= r))
        throw Error(u(301));
      if (((r += 1), (Fe = De = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((M.H = Ud), (c = t(a, s)));
    } while (an);
    return c;
  }
  function H0() {
    var e = M.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? In(t) : t),
      (e = e.useState()[0]),
      (De !== null ? De.memoizedState : null) !== e && (ye.flags |= 1024),
      t
    );
  }
  function wu() {
    var e = fi !== 0;
    return ((fi = 0), e);
  }
  function _u(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function Cu(e) {
    if (ci) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      ci = !1;
    }
    ((cl = 0), (Fe = De = ye = null), (an = !1), (Wn = fi = 0), (nn = null));
  }
  function ot() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Fe === null ? (ye.memoizedState = Fe = e) : (Fe = Fe.next = e), Fe);
  }
  function Ve() {
    if (De === null) {
      var e = ye.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = De.next;
    var t = Fe === null ? ye.memoizedState : Fe.next;
    if (t !== null) ((Fe = t), (De = e));
    else {
      if (e === null)
        throw ye.alternate === null ? Error(u(467)) : Error(u(310));
      ((De = e),
        (e = {
          memoizedState: De.memoizedState,
          baseState: De.baseState,
          baseQueue: De.baseQueue,
          queue: De.queue,
          next: null,
        }),
        Fe === null ? (ye.memoizedState = Fe = e) : (Fe = Fe.next = e));
    }
    return Fe;
  }
  function di() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function In(e) {
    var t = Wn;
    return (
      (Wn += 1),
      nn === null && (nn = []),
      (e = Gf(nn, e, t)),
      (t = ye),
      (Fe === null ? t.memoizedState : Fe.next) === null &&
        ((t = t.alternate),
        (M.H = t === null || t.memoizedState === null ? Md : Hu)),
      e
    );
  }
  function hi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return In(e);
      if (e.$$typeof === q) return nt(e);
    }
    throw Error(u(438, String(e)));
  }
  function Tu(e) {
    var t = null,
      a = ye.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var s = ye.alternate;
      s !== null &&
        ((s = s.updateQueue),
        s !== null &&
          ((s = s.memoCache),
          s != null &&
            (t = {
              data: s.data.map(function (r) {
                return r.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = di()), (ye.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), s = 0; s < e; s++) a[s] = ee;
    return (t.index++, a);
  }
  function fl(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function mi(e) {
    var t = Ve();
    return Au(t, De, e);
  }
  function Au(e, t, a) {
    var s = e.queue;
    if (s === null) throw Error(u(311));
    s.lastRenderedReducer = a;
    var r = e.baseQueue,
      c = s.pending;
    if (c !== null) {
      if (r !== null) {
        var h = r.next;
        ((r.next = c.next), (c.next = h));
      }
      ((t.baseQueue = r = c), (s.pending = null));
    }
    if (((c = e.baseState), r === null)) e.memoizedState = c;
    else {
      t = r.next;
      var x = (h = null),
        w = null,
        z = t,
        Y = !1;
      do {
        var X = z.lane & -536870913;
        if (X !== z.lane ? (Ne & X) === X : (cl & X) === X) {
          var B = z.revertLane;
          if (B === 0)
            (w !== null &&
              (w = w.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              X === Wa && (Y = !0));
          else if ((cl & B) === B) {
            ((z = z.next), B === Wa && (Y = !0));
            continue;
          } else
            ((X = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
              w === null ? ((x = w = X), (h = c)) : (w = w.next = X),
              (ye.lanes |= B),
              (Xl |= B));
          ((X = z.action),
            xa && a(c, X),
            (c = z.hasEagerState ? z.eagerState : a(c, X)));
        } else
          ((B = {
            lane: X,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            w === null ? ((x = w = B), (h = c)) : (w = w.next = B),
            (ye.lanes |= X),
            (Xl |= X));
        z = z.next;
      } while (z !== null && z !== t);
      if (
        (w === null ? (h = c) : (w.next = x),
        !wt(c, e.memoizedState) && ((Je = !0), Y && ((a = Ia), a !== null)))
      )
        throw a;
      ((e.memoizedState = c),
        (e.baseState = h),
        (e.baseQueue = w),
        (s.lastRenderedState = c));
    }
    return (r === null && (s.lanes = 0), [e.memoizedState, s.dispatch]);
  }
  function Ru(e) {
    var t = Ve(),
      a = t.queue;
    if (a === null) throw Error(u(311));
    a.lastRenderedReducer = e;
    var s = a.dispatch,
      r = a.pending,
      c = t.memoizedState;
    if (r !== null) {
      a.pending = null;
      var h = (r = r.next);
      do ((c = e(c, h.action)), (h = h.next));
      while (h !== r);
      (wt(c, t.memoizedState) || (Je = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (a.lastRenderedState = c));
    }
    return [c, s];
  }
  function If(e, t, a) {
    var s = ye,
      r = Ve(),
      c = Ee;
    if (c) {
      if (a === void 0) throw Error(u(407));
      a = a();
    } else a = t();
    var h = !wt((De || r).memoizedState, a);
    if (
      (h && ((r.memoizedState = a), (Je = !0)),
      (r = r.queue),
      Mu(ld.bind(null, s, r, e), [e]),
      r.getSnapshot !== t || h || (Fe !== null && Fe.memoizedState.tag & 1))
    ) {
      if (
        ((s.flags |= 2048),
        sn(9, { destroy: void 0 }, td.bind(null, s, r, a, t), null),
        ze === null)
      )
        throw Error(u(349));
      c || (cl & 127) !== 0 || ed(s, t, a);
    }
    return a;
  }
  function ed(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = ye.updateQueue),
      t === null
        ? ((t = di()), (ye.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function td(e, t, a, s) {
    ((t.value = a), (t.getSnapshot = s), ad(t) && nd(e));
  }
  function ld(e, t, a) {
    return a(function () {
      ad(t) && nd(e);
    });
  }
  function ad(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !wt(e, a);
    } catch {
      return !0;
    }
  }
  function nd(e) {
    var t = fa(e, 2);
    t !== null && gt(t, e, 2);
  }
  function Ou(e) {
    var t = ot();
    if (typeof e == "function") {
      var a = e;
      if (((e = a()), xa)) {
        Ol(!0);
        try {
          a();
        } finally {
          Ol(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: fl,
        lastRenderedState: e,
      }),
      t
    );
  }
  function sd(e, t, a, s) {
    return ((e.baseState = a), Au(e, De, typeof s == "function" ? s : fl));
  }
  function Q0(e, t, a, s, r) {
    if (bi(e)) throw Error(u(485));
    if (((e = t.action), e !== null)) {
      var c = {
        payload: r,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (h) {
          c.listeners.push(h);
        },
      };
      (M.T !== null ? a(!0) : (c.isTransition = !1),
        s(c),
        (a = t.pending),
        a === null
          ? ((c.next = t.pending = c), id(t, c))
          : ((c.next = a.next), (t.pending = a.next = c)));
    }
  }
  function id(e, t) {
    var a = t.action,
      s = t.payload,
      r = e.state;
    if (t.isTransition) {
      var c = M.T,
        h = {};
      M.T = h;
      try {
        var x = a(r, s),
          w = M.S;
        (w !== null && w(h, x), rd(e, t, x));
      } catch (z) {
        Du(e, t, z);
      } finally {
        (c !== null && h.types !== null && (c.types = h.types), (M.T = c));
      }
    } else
      try {
        ((c = a(r, s)), rd(e, t, c));
      } catch (z) {
        Du(e, t, z);
      }
  }
  function rd(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (s) {
            ud(e, t, s);
          },
          function (s) {
            return Du(e, t, s);
          },
        )
      : ud(e, t, a);
  }
  function ud(e, t, a) {
    ((t.status = "fulfilled"),
      (t.value = a),
      od(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next),
        a === t ? (e.pending = null) : ((a = a.next), (t.next = a), id(e, a))));
  }
  function Du(e, t, a) {
    var s = e.pending;
    if (((e.pending = null), s !== null)) {
      s = s.next;
      do ((t.status = "rejected"), (t.reason = a), od(t), (t = t.next));
      while (t !== s);
    }
    e.action = null;
  }
  function od(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function cd(e, t) {
    return t;
  }
  function fd(e, t) {
    if (Ee) {
      var a = ze.formState;
      if (a !== null) {
        e: {
          var s = ye;
          if (Ee) {
            if (Be) {
              t: {
                for (var r = Be, c = Lt; r.nodeType !== 8; ) {
                  if (!c) {
                    r = null;
                    break t;
                  }
                  if (((r = Qt(r.nextSibling)), r === null)) {
                    r = null;
                    break t;
                  }
                }
                ((c = r.data), (r = c === "F!" || c === "F" ? r : null));
              }
              if (r) {
                ((Be = Qt(r.nextSibling)), (s = r.data === "F!"));
                break e;
              }
            }
            Bl(s);
          }
          s = !1;
        }
        s && (t = a[0]);
      }
    }
    return (
      (a = ot()),
      (a.memoizedState = a.baseState = t),
      (s = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: cd,
        lastRenderedState: t,
      }),
      (a.queue = s),
      (a = Rd.bind(null, ye, s)),
      (s.dispatch = a),
      (s = Ou(!1)),
      (c = Lu.bind(null, ye, !1, s.queue)),
      (s = ot()),
      (r = { state: t, dispatch: null, action: e, pending: null }),
      (s.queue = r),
      (a = Q0.bind(null, ye, r, c, a)),
      (r.dispatch = a),
      (s.memoizedState = e),
      [t, a, !1]
    );
  }
  function dd(e) {
    var t = Ve();
    return hd(t, De, e);
  }
  function hd(e, t, a) {
    if (
      ((t = Au(e, t, cd)[0]),
      (e = mi(fl)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var s = In(t);
      } catch (h) {
        throw h === en ? ni : h;
      }
    else s = t;
    t = Ve();
    var r = t.queue,
      c = r.dispatch;
    return (
      a !== t.memoizedState &&
        ((ye.flags |= 2048),
        sn(9, { destroy: void 0 }, Y0.bind(null, r, a), null)),
      [s, c, e]
    );
  }
  function Y0(e, t) {
    e.action = t;
  }
  function md(e) {
    var t = Ve(),
      a = De;
    if (a !== null) return hd(t, a, e);
    (Ve(), (t = t.memoizedState), (a = Ve()));
    var s = a.queue.dispatch;
    return ((a.memoizedState = e), [t, s, !1]);
  }
  function sn(e, t, a, s) {
    return (
      (e = { tag: e, create: a, deps: s, inst: t, next: null }),
      (t = ye.updateQueue),
      t === null && ((t = di()), (ye.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((s = a.next), (a.next = e), (e.next = s), (t.lastEffect = e)),
      e
    );
  }
  function pd() {
    return Ve().memoizedState;
  }
  function pi(e, t, a, s) {
    var r = ot();
    ((ye.flags |= e),
      (r.memoizedState = sn(
        1 | t,
        { destroy: void 0 },
        a,
        s === void 0 ? null : s,
      )));
  }
  function yi(e, t, a, s) {
    var r = Ve();
    s = s === void 0 ? null : s;
    var c = r.memoizedState.inst;
    De !== null && s !== null && ju(s, De.memoizedState.deps)
      ? (r.memoizedState = sn(t, c, a, s))
      : ((ye.flags |= e), (r.memoizedState = sn(1 | t, c, a, s)));
  }
  function yd(e, t) {
    pi(8390656, 8, e, t);
  }
  function Mu(e, t) {
    yi(2048, 8, e, t);
  }
  function G0(e) {
    ye.flags |= 4;
    var t = ye.updateQueue;
    if (t === null) ((t = di()), (ye.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function bd(e) {
    var t = Ve().memoizedState;
    return (
      G0({ ref: t, nextImpl: e }),
      function () {
        if ((Ce & 2) !== 0) throw Error(u(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function gd(e, t) {
    return yi(4, 2, e, t);
  }
  function vd(e, t) {
    return yi(4, 4, e, t);
  }
  function xd(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function () {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Sd(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), yi(4, 4, xd.bind(null, t, e), a));
  }
  function Uu() {}
  function Nd(e, t) {
    var a = Ve();
    t = t === void 0 ? null : t;
    var s = a.memoizedState;
    return t !== null && ju(t, s[1]) ? s[0] : ((a.memoizedState = [e, t]), e);
  }
  function jd(e, t) {
    var a = Ve();
    t = t === void 0 ? null : t;
    var s = a.memoizedState;
    if (t !== null && ju(t, s[1])) return s[0];
    if (((s = e()), xa)) {
      Ol(!0);
      try {
        e();
      } finally {
        Ol(!1);
      }
    }
    return ((a.memoizedState = [s, t]), s);
  }
  function zu(e, t, a) {
    return a === void 0 || ((cl & 1073741824) !== 0 && (Ne & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = Eh()), (ye.lanes |= e), (Xl |= e), a);
  }
  function Ed(e, t, a, s) {
    return wt(a, t)
      ? a
      : ln.current !== null
        ? ((e = zu(e, a, s)), wt(e, t) || (Je = !0), e)
        : (cl & 42) === 0 || ((cl & 1073741824) !== 0 && (Ne & 261930) === 0)
          ? ((Je = !0), (e.memoizedState = a))
          : ((e = Eh()), (ye.lanes |= e), (Xl |= e), t);
  }
  function wd(e, t, a, s, r) {
    var c = J.p;
    J.p = c !== 0 && 8 > c ? c : 8;
    var h = M.T,
      x = {};
    ((M.T = x), Lu(e, !1, t, a));
    try {
      var w = r(),
        z = M.S;
      if (
        (z !== null && z(x, w),
        w !== null && typeof w == "object" && typeof w.then == "function")
      ) {
        var Y = q0(w, s);
        es(e, t, Y, Ot(e));
      } else es(e, t, s, Ot(e));
    } catch (X) {
      es(e, t, { then: function () {}, status: "rejected", reason: X }, Ot());
    } finally {
      ((J.p = c),
        h !== null && x.types !== null && (h.types = x.types),
        (M.T = h));
    }
  }
  function k0() {}
  function Bu(e, t, a, s) {
    if (e.tag !== 5) throw Error(u(476));
    var r = _d(e).queue;
    wd(
      e,
      r,
      t,
      I,
      a === null
        ? k0
        : function () {
            return (Cd(e), a(s));
          },
    );
  }
  function _d(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: I,
      baseState: I,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: fl,
        lastRenderedState: I,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: fl,
          lastRenderedState: a,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Cd(e) {
    var t = _d(e);
    (t.next === null && (t = e.alternate.memoizedState),
      es(e, t.next.queue, {}, Ot()));
  }
  function qu() {
    return nt(bs);
  }
  function Td() {
    return Ve().memoizedState;
  }
  function Ad() {
    return Ve().memoizedState;
  }
  function K0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Ot();
          e = Hl(a);
          var s = Ql(t, e, a);
          (s !== null && (gt(s, t, a), Jn(s, t, a)),
            (t = { cache: du() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function X0(e, t, a) {
    var s = Ot();
    ((a = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      bi(e)
        ? Od(t, a)
        : ((a = tu(e, t, a, s)), a !== null && (gt(a, e, s), Dd(a, t, s))));
  }
  function Rd(e, t, a) {
    var s = Ot();
    es(e, t, a, s);
  }
  function es(e, t, a, s) {
    var r = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (bi(e)) Od(t, r);
    else {
      var c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var h = t.lastRenderedState,
            x = c(h, a);
          if (((r.hasEagerState = !0), (r.eagerState = x), wt(x, h)))
            return (Ps(e, t, r, 0), ze === null && $s(), !1);
        } catch {
        } finally {
        }
      if (((a = tu(e, t, r, s)), a !== null))
        return (gt(a, e, s), Dd(a, t, s), !0);
    }
    return !1;
  }
  function Lu(e, t, a, s) {
    if (
      ((s = {
        lane: 2,
        revertLane: bo(),
        gesture: null,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      bi(e))
    ) {
      if (t) throw Error(u(479));
    } else ((t = tu(e, a, s, 2)), t !== null && gt(t, e, 2));
  }
  function bi(e) {
    var t = e.alternate;
    return e === ye || (t !== null && t === ye);
  }
  function Od(e, t) {
    an = ci = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (e.pending = t));
  }
  function Dd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var s = t.lanes;
      ((s &= e.pendingLanes), (a |= s), (t.lanes = a), Bc(e, a));
    }
  }
  var ts = {
    readContext: nt,
    use: hi,
    useCallback: Ge,
    useContext: Ge,
    useEffect: Ge,
    useImperativeHandle: Ge,
    useLayoutEffect: Ge,
    useInsertionEffect: Ge,
    useMemo: Ge,
    useReducer: Ge,
    useRef: Ge,
    useState: Ge,
    useDebugValue: Ge,
    useDeferredValue: Ge,
    useTransition: Ge,
    useSyncExternalStore: Ge,
    useId: Ge,
    useHostTransitionStatus: Ge,
    useFormState: Ge,
    useActionState: Ge,
    useOptimistic: Ge,
    useMemoCache: Ge,
    useCacheRefresh: Ge,
  };
  ts.useEffectEvent = Ge;
  var Md = {
      readContext: nt,
      use: hi,
      useCallback: function (e, t) {
        return ((ot().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: nt,
      useEffect: yd,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null),
          pi(4194308, 4, xd.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return pi(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        pi(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = ot();
        t = t === void 0 ? null : t;
        var s = e();
        if (xa) {
          Ol(!0);
          try {
            e();
          } finally {
            Ol(!1);
          }
        }
        return ((a.memoizedState = [s, t]), s);
      },
      useReducer: function (e, t, a) {
        var s = ot();
        if (a !== void 0) {
          var r = a(t);
          if (xa) {
            Ol(!0);
            try {
              a(t);
            } finally {
              Ol(!1);
            }
          }
        } else r = t;
        return (
          (s.memoizedState = s.baseState = r),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: r,
          }),
          (s.queue = e),
          (e = e.dispatch = X0.bind(null, ye, e)),
          [s.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = ot();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Ou(e);
        var t = e.queue,
          a = Rd.bind(null, ye, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: Uu,
      useDeferredValue: function (e, t) {
        var a = ot();
        return zu(a, e, t);
      },
      useTransition: function () {
        var e = Ou(!1);
        return (
          (e = wd.bind(null, ye, e.queue, !0, !1)),
          (ot().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, a) {
        var s = ye,
          r = ot();
        if (Ee) {
          if (a === void 0) throw Error(u(407));
          a = a();
        } else {
          if (((a = t()), ze === null)) throw Error(u(349));
          (Ne & 127) !== 0 || ed(s, t, a);
        }
        r.memoizedState = a;
        var c = { value: a, getSnapshot: t };
        return (
          (r.queue = c),
          yd(ld.bind(null, s, c, e), [e]),
          (s.flags |= 2048),
          sn(9, { destroy: void 0 }, td.bind(null, s, c, a, t), null),
          a
        );
      },
      useId: function () {
        var e = ot(),
          t = ze.identifierPrefix;
        if (Ee) {
          var a = Wt,
            s = Pt;
          ((a = (s & ~(1 << (32 - Et(s) - 1))).toString(32) + a),
            (t = "_" + t + "R_" + a),
            (a = fi++),
            0 < a && (t += "H" + a.toString(32)),
            (t += "_"));
        } else ((a = L0++), (t = "_" + t + "r_" + a.toString(32) + "_"));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: qu,
      useFormState: fd,
      useActionState: fd,
      useOptimistic: function (e) {
        var t = ot();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = a),
          (t = Lu.bind(null, ye, !0, a)),
          (a.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: Tu,
      useCacheRefresh: function () {
        return (ot().memoizedState = K0.bind(null, ye));
      },
      useEffectEvent: function (e) {
        var t = ot(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((Ce & 2) !== 0) throw Error(u(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Hu = {
      readContext: nt,
      use: hi,
      useCallback: Nd,
      useContext: nt,
      useEffect: Mu,
      useImperativeHandle: Sd,
      useInsertionEffect: gd,
      useLayoutEffect: vd,
      useMemo: jd,
      useReducer: mi,
      useRef: pd,
      useState: function () {
        return mi(fl);
      },
      useDebugValue: Uu,
      useDeferredValue: function (e, t) {
        var a = Ve();
        return Ed(a, De.memoizedState, e, t);
      },
      useTransition: function () {
        var e = mi(fl)[0],
          t = Ve().memoizedState;
        return [typeof e == "boolean" ? e : In(e), t];
      },
      useSyncExternalStore: If,
      useId: Td,
      useHostTransitionStatus: qu,
      useFormState: dd,
      useActionState: dd,
      useOptimistic: function (e, t) {
        var a = Ve();
        return sd(a, De, e, t);
      },
      useMemoCache: Tu,
      useCacheRefresh: Ad,
    };
  Hu.useEffectEvent = bd;
  var Ud = {
    readContext: nt,
    use: hi,
    useCallback: Nd,
    useContext: nt,
    useEffect: Mu,
    useImperativeHandle: Sd,
    useInsertionEffect: gd,
    useLayoutEffect: vd,
    useMemo: jd,
    useReducer: Ru,
    useRef: pd,
    useState: function () {
      return Ru(fl);
    },
    useDebugValue: Uu,
    useDeferredValue: function (e, t) {
      var a = Ve();
      return De === null ? zu(a, e, t) : Ed(a, De.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Ru(fl)[0],
        t = Ve().memoizedState;
      return [typeof e == "boolean" ? e : In(e), t];
    },
    useSyncExternalStore: If,
    useId: Td,
    useHostTransitionStatus: qu,
    useFormState: md,
    useActionState: md,
    useOptimistic: function (e, t) {
      var a = Ve();
      return De !== null
        ? sd(a, De, e, t)
        : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: Tu,
    useCacheRefresh: Ad,
  };
  Ud.useEffectEvent = bd;
  function Qu(e, t, a, s) {
    ((t = e.memoizedState),
      (a = a(s, t)),
      (a = a == null ? t : S({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var Yu = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var s = Ot(),
        r = Hl(s);
      ((r.payload = t),
        a != null && (r.callback = a),
        (t = Ql(e, r, s)),
        t !== null && (gt(t, e, s), Jn(t, e, s)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var s = Ot(),
        r = Hl(s);
      ((r.tag = 1),
        (r.payload = t),
        a != null && (r.callback = a),
        (t = Ql(e, r, s)),
        t !== null && (gt(t, e, s), Jn(t, e, s)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Ot(),
        s = Hl(a);
      ((s.tag = 2),
        t != null && (s.callback = t),
        (t = Ql(e, s, a)),
        t !== null && (gt(t, e, a), Jn(t, e, a)));
    },
  };
  function zd(e, t, a, s, r, c, h) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(s, c, h)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Yn(a, s) || !Yn(r, c)
          : !0
    );
  }
  function Bd(e, t, a, s) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(a, s),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(a, s),
      t.state !== e && Yu.enqueueReplaceState(t, t.state, null));
  }
  function Sa(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var s in t) s !== "ref" && (a[s] = t[s]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = S({}, a));
      for (var r in e) a[r] === void 0 && (a[r] = e[r]);
    }
    return a;
  }
  function qd(e) {
    Js(e);
  }
  function Ld(e) {
    console.error(e);
  }
  function Hd(e) {
    Js(e);
  }
  function gi(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function Qd(e, t, a) {
    try {
      var s = e.onCaughtError;
      s(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  function Gu(e, t, a) {
    return (
      (a = Hl(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        gi(e, t);
      }),
      a
    );
  }
  function Yd(e) {
    return ((e = Hl(e)), (e.tag = 3), e);
  }
  function Gd(e, t, a, s) {
    var r = a.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var c = s.value;
      ((e.payload = function () {
        return r(c);
      }),
        (e.callback = function () {
          Qd(t, a, s);
        }));
    }
    var h = a.stateNode;
    h !== null &&
      typeof h.componentDidCatch == "function" &&
      (e.callback = function () {
        (Qd(t, a, s),
          typeof r != "function" &&
            (Vl === null ? (Vl = new Set([this])) : Vl.add(this)));
        var x = s.stack;
        this.componentDidCatch(s.value, {
          componentStack: x !== null ? x : "",
        });
      });
  }
  function V0(e, t, a, s, r) {
    if (
      ((a.flags |= 32768),
      s !== null && typeof s == "object" && typeof s.then == "function")
    ) {
      if (
        ((t = a.alternate),
        t !== null && Pa(t, a, r, !0),
        (a = Ct.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Ht === null ? Ri() : a.alternate === null && ke === 0 && (ke = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = r),
              s === si
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([s])) : t.add(s),
                  mo(e, s, r)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              s === si
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([s]),
                      }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue),
                      a === null ? (t.retryQueue = new Set([s])) : a.add(s)),
                  mo(e, s, r)),
              !1
            );
        }
        throw Error(u(435, a.tag));
      }
      return (mo(e, s, r), Ri(), !1);
    }
    if (Ee)
      return (
        (t = Ct.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = r),
            s !== ru && ((e = Error(u(422), { cause: s })), Kn(zt(e, a))))
          : (s !== ru && ((t = Error(u(423), { cause: s })), Kn(zt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (r &= -r),
            (e.lanes |= r),
            (s = zt(s, a)),
            (r = Gu(e.stateNode, s, r)),
            gu(e, r),
            ke !== 4 && (ke = 2)),
        !1
      );
    var c = Error(u(520), { cause: s });
    if (
      ((c = zt(c, a)),
      os === null ? (os = [c]) : os.push(c),
      ke !== 4 && (ke = 2),
      t === null)
    )
      return !0;
    ((s = zt(s, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = r & -r),
            (a.lanes |= e),
            (e = Gu(a.stateNode, s, e)),
            gu(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (c = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (c !== null &&
                  typeof c.componentDidCatch == "function" &&
                  (Vl === null || !Vl.has(c)))))
          )
            return (
              (a.flags |= 65536),
              (r &= -r),
              (a.lanes |= r),
              (r = Yd(r)),
              Gd(r, e, a, s),
              gu(a, r),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var ku = Error(u(461)),
    Je = !1;
  function st(e, t, a, s) {
    t.child = e === null ? Vf(t, null, a, s) : va(t, e.child, a, s);
  }
  function kd(e, t, a, s, r) {
    a = a.render;
    var c = t.ref;
    if ("ref" in s) {
      var h = {};
      for (var x in s) x !== "ref" && (h[x] = s[x]);
    } else h = s;
    return (
      pa(t),
      (s = Eu(e, t, a, h, c, r)),
      (x = wu()),
      e !== null && !Je
        ? (_u(e, t, r), dl(e, t, r))
        : (Ee && x && su(t), (t.flags |= 1), st(e, t, s, r), t.child)
    );
  }
  function Kd(e, t, a, s, r) {
    if (e === null) {
      var c = a.type;
      return typeof c == "function" &&
        !lu(c) &&
        c.defaultProps === void 0 &&
        a.compare === null
        ? ((t.tag = 15), (t.type = c), Xd(e, t, c, s, r))
        : ((e = Is(a.type, null, s, t, t.mode, r)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((c = e.child), !Pu(e, r))) {
      var h = c.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : Yn), a(h, s) && e.ref === t.ref)
      )
        return dl(e, t, r);
    }
    return (
      (t.flags |= 1),
      (e = il(c, s)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Xd(e, t, a, s, r) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Yn(c, s) && e.ref === t.ref)
        if (((Je = !1), (t.pendingProps = s = c), Pu(e, r)))
          (e.flags & 131072) !== 0 && (Je = !0);
        else return ((t.lanes = e.lanes), dl(e, t, r));
    }
    return Ku(e, t, a, s, r);
  }
  function Vd(e, t, a, s) {
    var r = s.children,
      c = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      s.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((c = c !== null ? c.baseLanes | a : a), e !== null)) {
          for (s = t.child = e.child, r = 0; s !== null; )
            ((r = r | s.lanes | s.childLanes), (s = s.sibling));
          s = r & ~c;
        } else ((s = 0), (t.child = null));
        return Zd(e, t, c, a, s);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && ai(t, c !== null ? c.cachePool : null),
          c !== null ? Jf(t, c) : xu(),
          $f(t));
      else
        return (
          (s = t.lanes = 536870912),
          Zd(e, t, c !== null ? c.baseLanes | a : a, a, s)
        );
    } else
      c !== null
        ? (ai(t, c.cachePool), Jf(t, c), Gl(), (t.memoizedState = null))
        : (e !== null && ai(t, null), xu(), Gl());
    return (st(e, t, r, a), t.child);
  }
  function ls(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function Zd(e, t, a, s, r) {
    var c = mu();
    return (
      (c = c === null ? null : { parent: Ze._currentValue, pool: c }),
      (t.memoizedState = { baseLanes: a, cachePool: c }),
      e !== null && ai(t, null),
      xu(),
      $f(t),
      e !== null && Pa(e, t, s, !0),
      (t.childLanes = r),
      null
    );
  }
  function vi(e, t) {
    return (
      (t = Si({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Fd(e, t, a) {
    return (
      va(t, e.child, null, a),
      (e = vi(t, t.pendingProps)),
      (e.flags |= 2),
      Tt(t),
      (t.memoizedState = null),
      e
    );
  }
  function Z0(e, t, a) {
    var s = t.pendingProps,
      r = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ee) {
        if (s.mode === "hidden")
          return ((e = vi(t, s)), (t.lanes = 536870912), ls(null, e));
        if (
          (Nu(t),
          (e = Be)
            ? ((e = im(e, Lt)),
              (e = e !== null && e.data === "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Ul !== null ? { id: Pt, overflow: Wt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Of(e)),
                (a.return = t),
                (t.child = a),
                (at = t),
                (Be = null)))
            : (e = null),
          e === null)
        )
          throw Bl(t);
        return ((t.lanes = 536870912), null);
      }
      return vi(t, s);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var h = c.dehydrated;
      if ((Nu(t), r))
        if (t.flags & 256) ((t.flags &= -257), (t = Fd(e, t, a)));
        else if (t.memoizedState !== null)
          ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(u(558));
      else if (
        (Je || Pa(e, t, a, !1), (r = (a & e.childLanes) !== 0), Je || r)
      ) {
        if (
          ((s = ze),
          s !== null && ((h = qc(s, a)), h !== 0 && h !== c.retryLane))
        )
          throw ((c.retryLane = h), fa(e, h), gt(s, e, h), ku);
        (Ri(), (t = Fd(e, t, a)));
      } else
        ((e = c.treeContext),
          (Be = Qt(h.nextSibling)),
          (at = t),
          (Ee = !0),
          (zl = null),
          (Lt = !1),
          e !== null && Uf(t, e),
          (t = vi(t, s)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = il(e.child, { mode: s.mode, children: s.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function xi(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(u(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Ku(e, t, a, s, r) {
    return (
      pa(t),
      (a = Eu(e, t, a, s, void 0, r)),
      (s = wu()),
      e !== null && !Je
        ? (_u(e, t, r), dl(e, t, r))
        : (Ee && s && su(t), (t.flags |= 1), st(e, t, a, r), t.child)
    );
  }
  function Jd(e, t, a, s, r, c) {
    return (
      pa(t),
      (t.updateQueue = null),
      (a = Wf(t, s, a, r)),
      Pf(e),
      (s = wu()),
      e !== null && !Je
        ? (_u(e, t, c), dl(e, t, c))
        : (Ee && s && su(t), (t.flags |= 1), st(e, t, a, c), t.child)
    );
  }
  function $d(e, t, a, s, r) {
    if ((pa(t), t.stateNode === null)) {
      var c = Za,
        h = a.contextType;
      (typeof h == "object" && h !== null && (c = nt(h)),
        (c = new a(s, c)),
        (t.memoizedState =
          c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = Yu),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = s),
        (c.state = t.memoizedState),
        (c.refs = {}),
        yu(t),
        (h = a.contextType),
        (c.context = typeof h == "object" && h !== null ? nt(h) : Za),
        (c.state = t.memoizedState),
        (h = a.getDerivedStateFromProps),
        typeof h == "function" && (Qu(t, a, h, s), (c.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function" ||
          (typeof c.UNSAFE_componentWillMount != "function" &&
            typeof c.componentWillMount != "function") ||
          ((h = c.state),
          typeof c.componentWillMount == "function" && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == "function" &&
            c.UNSAFE_componentWillMount(),
          h !== c.state && Yu.enqueueReplaceState(c, c.state, null),
          Pn(t, s, c, r),
          $n(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == "function" && (t.flags |= 4194308),
        (s = !0));
    } else if (e === null) {
      c = t.stateNode;
      var x = t.memoizedProps,
        w = Sa(a, x);
      c.props = w;
      var z = c.context,
        Y = a.contextType;
      ((h = Za), typeof Y == "object" && Y !== null && (h = nt(Y)));
      var X = a.getDerivedStateFromProps;
      ((Y =
        typeof X == "function" ||
        typeof c.getSnapshotBeforeUpdate == "function"),
        (x = t.pendingProps !== x),
        Y ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((x || z !== h) && Bd(t, c, s, h)),
        (Ll = !1));
      var B = t.memoizedState;
      ((c.state = B),
        Pn(t, s, c, r),
        $n(),
        (z = t.memoizedState),
        x || B !== z || Ll
          ? (typeof X == "function" && (Qu(t, a, X, s), (z = t.memoizedState)),
            (w = Ll || zd(t, a, w, s, B, z, h))
              ? (Y ||
                  (typeof c.UNSAFE_componentWillMount != "function" &&
                    typeof c.componentWillMount != "function") ||
                  (typeof c.componentWillMount == "function" &&
                    c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == "function" &&
                    c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof c.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = s),
                (t.memoizedState = z)),
            (c.props = s),
            (c.state = z),
            (c.context = h),
            (s = w))
          : (typeof c.componentDidMount == "function" && (t.flags |= 4194308),
            (s = !1)));
    } else {
      ((c = t.stateNode),
        bu(e, t),
        (h = t.memoizedProps),
        (Y = Sa(a, h)),
        (c.props = Y),
        (X = t.pendingProps),
        (B = c.context),
        (z = a.contextType),
        (w = Za),
        typeof z == "object" && z !== null && (w = nt(z)),
        (x = a.getDerivedStateFromProps),
        (z =
          typeof x == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function") ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((h !== X || B !== w) && Bd(t, c, s, w)),
        (Ll = !1),
        (B = t.memoizedState),
        (c.state = B),
        Pn(t, s, c, r),
        $n());
      var H = t.memoizedState;
      h !== X ||
      B !== H ||
      Ll ||
      (e !== null && e.dependencies !== null && ti(e.dependencies))
        ? (typeof x == "function" && (Qu(t, a, x, s), (H = t.memoizedState)),
          (Y =
            Ll ||
            zd(t, a, Y, s, B, H, w) ||
            (e !== null && e.dependencies !== null && ti(e.dependencies)))
            ? (z ||
                (typeof c.UNSAFE_componentWillUpdate != "function" &&
                  typeof c.componentWillUpdate != "function") ||
                (typeof c.componentWillUpdate == "function" &&
                  c.componentWillUpdate(s, H, w),
                typeof c.UNSAFE_componentWillUpdate == "function" &&
                  c.UNSAFE_componentWillUpdate(s, H, w)),
              typeof c.componentDidUpdate == "function" && (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof c.componentDidUpdate != "function" ||
                (h === e.memoizedProps && B === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != "function" ||
                (h === e.memoizedProps && B === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = s),
              (t.memoizedState = H)),
          (c.props = s),
          (c.state = H),
          (c.context = w),
          (s = Y))
        : (typeof c.componentDidUpdate != "function" ||
            (h === e.memoizedProps && B === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != "function" ||
            (h === e.memoizedProps && B === e.memoizedState) ||
            (t.flags |= 1024),
          (s = !1));
    }
    return (
      (c = s),
      xi(e, t),
      (s = (t.flags & 128) !== 0),
      c || s
        ? ((c = t.stateNode),
          (a =
            s && typeof a.getDerivedStateFromError != "function"
              ? null
              : c.render()),
          (t.flags |= 1),
          e !== null && s
            ? ((t.child = va(t, e.child, null, r)),
              (t.child = va(t, null, a, r)))
            : st(e, t, a, r),
          (t.memoizedState = c.state),
          (e = t.child))
        : (e = dl(e, t, r)),
      e
    );
  }
  function Pd(e, t, a, s) {
    return (ha(), (t.flags |= 256), st(e, t, a, s), t.child);
  }
  var Xu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Vu(e) {
    return { baseLanes: e, cachePool: Qf() };
  }
  function Zu(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Rt), e);
  }
  function Wd(e, t, a) {
    var s = t.pendingProps,
      r = !1,
      c = (t.flags & 128) !== 0,
      h;
    if (
      ((h = c) ||
        (h =
          e !== null && e.memoizedState === null ? !1 : (Xe.current & 2) !== 0),
      h && ((r = !0), (t.flags &= -129)),
      (h = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ee) {
        if (
          (r ? Yl(t) : Gl(),
          (e = Be)
            ? ((e = im(e, Lt)),
              (e = e !== null && e.data !== "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Ul !== null ? { id: Pt, overflow: Wt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Of(e)),
                (a.return = t),
                (t.child = a),
                (at = t),
                (Be = null)))
            : (e = null),
          e === null)
        )
          throw Bl(t);
        return (Ro(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var x = s.children;
      return (
        (s = s.fallback),
        r
          ? (Gl(),
            (r = t.mode),
            (x = Si({ mode: "hidden", children: x }, r)),
            (s = da(s, r, a, null)),
            (x.return = t),
            (s.return = t),
            (x.sibling = s),
            (t.child = x),
            (s = t.child),
            (s.memoizedState = Vu(a)),
            (s.childLanes = Zu(e, h, a)),
            (t.memoizedState = Xu),
            ls(null, s))
          : (Yl(t), Fu(t, x))
      );
    }
    var w = e.memoizedState;
    if (w !== null && ((x = w.dehydrated), x !== null)) {
      if (c)
        t.flags & 256
          ? (Yl(t), (t.flags &= -257), (t = Ju(e, t, a)))
          : t.memoizedState !== null
            ? (Gl(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Gl(),
              (x = s.fallback),
              (r = t.mode),
              (s = Si({ mode: "visible", children: s.children }, r)),
              (x = da(x, r, a, null)),
              (x.flags |= 2),
              (s.return = t),
              (x.return = t),
              (s.sibling = x),
              (t.child = s),
              va(t, e.child, null, a),
              (s = t.child),
              (s.memoizedState = Vu(a)),
              (s.childLanes = Zu(e, h, a)),
              (t.memoizedState = Xu),
              (t = ls(null, s)));
      else if ((Yl(t), Ro(x))) {
        if (((h = x.nextSibling && x.nextSibling.dataset), h)) var z = h.dgst;
        ((h = z),
          (s = Error(u(419))),
          (s.stack = ""),
          (s.digest = h),
          Kn({ value: s, source: null, stack: null }),
          (t = Ju(e, t, a)));
      } else if (
        (Je || Pa(e, t, a, !1), (h = (a & e.childLanes) !== 0), Je || h)
      ) {
        if (
          ((h = ze),
          h !== null && ((s = qc(h, a)), s !== 0 && s !== w.retryLane))
        )
          throw ((w.retryLane = s), fa(e, s), gt(h, e, s), ku);
        (Ao(x) || Ri(), (t = Ju(e, t, a)));
      } else
        Ao(x)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = w.treeContext),
            (Be = Qt(x.nextSibling)),
            (at = t),
            (Ee = !0),
            (zl = null),
            (Lt = !1),
            e !== null && Uf(t, e),
            (t = Fu(t, s.children)),
            (t.flags |= 4096));
      return t;
    }
    return r
      ? (Gl(),
        (x = s.fallback),
        (r = t.mode),
        (w = e.child),
        (z = w.sibling),
        (s = il(w, { mode: "hidden", children: s.children })),
        (s.subtreeFlags = w.subtreeFlags & 65011712),
        z !== null ? (x = il(z, x)) : ((x = da(x, r, a, null)), (x.flags |= 2)),
        (x.return = t),
        (s.return = t),
        (s.sibling = x),
        (t.child = s),
        ls(null, s),
        (s = t.child),
        (x = e.child.memoizedState),
        x === null
          ? (x = Vu(a))
          : ((r = x.cachePool),
            r !== null
              ? ((w = Ze._currentValue),
                (r = r.parent !== w ? { parent: w, pool: w } : r))
              : (r = Qf()),
            (x = { baseLanes: x.baseLanes | a, cachePool: r })),
        (s.memoizedState = x),
        (s.childLanes = Zu(e, h, a)),
        (t.memoizedState = Xu),
        ls(e.child, s))
      : (Yl(t),
        (a = e.child),
        (e = a.sibling),
        (a = il(a, { mode: "visible", children: s.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((h = t.deletions),
          h === null ? ((t.deletions = [e]), (t.flags |= 16)) : h.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function Fu(e, t) {
    return (
      (t = Si({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Si(e, t) {
    return ((e = _t(22, e, null, t)), (e.lanes = 0), e);
  }
  function Ju(e, t, a) {
    return (
      va(t, e.child, null, a),
      (e = Fu(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Id(e, t, a) {
    e.lanes |= t;
    var s = e.alternate;
    (s !== null && (s.lanes |= t), cu(e.return, t, a));
  }
  function $u(e, t, a, s, r, c) {
    var h = e.memoizedState;
    h === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: s,
          tail: a,
          tailMode: r,
          treeForkCount: c,
        })
      : ((h.isBackwards = t),
        (h.rendering = null),
        (h.renderingStartTime = 0),
        (h.last = s),
        (h.tail = a),
        (h.tailMode = r),
        (h.treeForkCount = c));
  }
  function eh(e, t, a) {
    var s = t.pendingProps,
      r = s.revealOrder,
      c = s.tail;
    s = s.children;
    var h = Xe.current,
      x = (h & 2) !== 0;
    if (
      (x ? ((h = (h & 1) | 2), (t.flags |= 128)) : (h &= 1),
      $(Xe, h),
      st(e, t, s, a),
      (s = Ee ? kn : 0),
      !x && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Id(e, a, t);
        else if (e.tag === 19) Id(e, a, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (r) {
      case "forwards":
        for (a = t.child, r = null; a !== null; )
          ((e = a.alternate),
            e !== null && oi(e) === null && (r = a),
            (a = a.sibling));
        ((a = r),
          a === null
            ? ((r = t.child), (t.child = null))
            : ((r = a.sibling), (a.sibling = null)),
          $u(t, !1, r, a, c, s));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, r = t.child, t.child = null; r !== null; ) {
          if (((e = r.alternate), e !== null && oi(e) === null)) {
            t.child = r;
            break;
          }
          ((e = r.sibling), (r.sibling = a), (a = r), (r = e));
        }
        $u(t, !0, a, null, c, s);
        break;
      case "together":
        $u(t, !1, null, null, void 0, s);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function dl(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Xl |= t.lanes),
      (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Pa(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(u(153));
    if (t.child !== null) {
      for (
        e = t.child, a = il(e, e.pendingProps), t.child = a, a.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (a = a.sibling = il(e, e.pendingProps)),
          (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function Pu(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && ti(e)));
  }
  function F0(e, t, a) {
    switch (t.tag) {
      case 3:
        (Ye(t, t.stateNode.containerInfo),
          ql(t, Ze, e.memoizedState.cache),
          ha());
        break;
      case 27:
      case 5:
        St(t);
        break;
      case 4:
        Ye(t, t.stateNode.containerInfo);
        break;
      case 10:
        ql(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Nu(t), null);
        break;
      case 13:
        var s = t.memoizedState;
        if (s !== null)
          return s.dehydrated !== null
            ? (Yl(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? Wd(e, t, a)
              : (Yl(t), (e = dl(e, t, a)), e !== null ? e.sibling : null);
        Yl(t);
        break;
      case 19:
        var r = (e.flags & 128) !== 0;
        if (
          ((s = (a & t.childLanes) !== 0),
          s || (Pa(e, t, a, !1), (s = (a & t.childLanes) !== 0)),
          r)
        ) {
          if (s) return eh(e, t, a);
          t.flags |= 128;
        }
        if (
          ((r = t.memoizedState),
          r !== null &&
            ((r.rendering = null), (r.tail = null), (r.lastEffect = null)),
          $(Xe, Xe.current),
          s)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Vd(e, t, a, t.pendingProps));
      case 24:
        ql(t, Ze, e.memoizedState.cache);
    }
    return dl(e, t, a);
  }
  function th(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Je = !0;
      else {
        if (!Pu(e, a) && (t.flags & 128) === 0) return ((Je = !1), F0(e, t, a));
        Je = (e.flags & 131072) !== 0;
      }
    else ((Je = !1), Ee && (t.flags & 1048576) !== 0 && Mf(t, kn, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var s = t.pendingProps;
          if (((e = ba(t.elementType)), (t.type = e), typeof e == "function"))
            lu(e)
              ? ((s = Sa(e, s)), (t.tag = 1), (t = $d(null, t, e, s, a)))
              : ((t.tag = 0), (t = Ku(null, t, e, s, a)));
          else {
            if (e != null) {
              var r = e.$$typeof;
              if (r === Z) {
                ((t.tag = 11), (t = kd(null, t, e, s, a)));
                break e;
              } else if (r === K) {
                ((t.tag = 14), (t = Kd(null, t, e, s, a)));
                break e;
              }
            }
            throw ((t = ce(e) || e), Error(u(306, t, "")));
          }
        }
        return t;
      case 0:
        return Ku(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((s = t.type), (r = Sa(s, t.pendingProps)), $d(e, t, s, r, a));
      case 3:
        e: {
          if ((Ye(t, t.stateNode.containerInfo), e === null))
            throw Error(u(387));
          s = t.pendingProps;
          var c = t.memoizedState;
          ((r = c.element), bu(e, t), Pn(t, s, null, a));
          var h = t.memoizedState;
          if (
            ((s = h.cache),
            ql(t, Ze, s),
            s !== c.cache && fu(t, [Ze], a, !0),
            $n(),
            (s = h.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: s, isDehydrated: !1, cache: h.cache }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              t = Pd(e, t, s, a);
              break e;
            } else if (s !== r) {
              ((r = zt(Error(u(424)), t)), Kn(r), (t = Pd(e, t, s, a)));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                Be = Qt(e.firstChild),
                  at = t,
                  Ee = !0,
                  zl = null,
                  Lt = !0,
                  a = Vf(t, null, s, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((ha(), s === r)) {
              t = dl(e, t, a);
              break e;
            }
            st(e, t, s, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          xi(e, t),
          e === null
            ? (a = dm(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : Ee ||
                ((a = t.type),
                (e = t.pendingProps),
                (s = qi(oe.current).createElement(a)),
                (s[lt] = t),
                (s[dt] = e),
                it(s, a, e),
                et(s),
                (t.stateNode = s))
            : (t.memoizedState = dm(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState,
              )),
          null
        );
      case 27:
        return (
          St(t),
          e === null &&
            Ee &&
            ((s = t.stateNode = om(t.type, t.pendingProps, oe.current)),
            (at = t),
            (Lt = !0),
            (r = Be),
            $l(t.type) ? ((Oo = r), (Be = Qt(s.firstChild))) : (Be = r)),
          st(e, t, t.pendingProps.children, a),
          xi(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ee &&
            ((r = s = Be) &&
              ((s = Eb(s, t.type, t.pendingProps, Lt)),
              s !== null
                ? ((t.stateNode = s),
                  (at = t),
                  (Be = Qt(s.firstChild)),
                  (Lt = !1),
                  (r = !0))
                : (r = !1)),
            r || Bl(t)),
          St(t),
          (r = t.type),
          (c = t.pendingProps),
          (h = e !== null ? e.memoizedProps : null),
          (s = c.children),
          _o(r, c) ? (s = null) : h !== null && _o(r, h) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((r = Eu(e, t, H0, null, null, a)), (bs._currentValue = r)),
          xi(e, t),
          st(e, t, s, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ee &&
            ((e = a = Be) &&
              ((a = wb(a, t.pendingProps, Lt)),
              a !== null
                ? ((t.stateNode = a), (at = t), (Be = null), (e = !0))
                : (e = !1)),
            e || Bl(t)),
          null
        );
      case 13:
        return Wd(e, t, a);
      case 4:
        return (
          Ye(t, t.stateNode.containerInfo),
          (s = t.pendingProps),
          e === null ? (t.child = va(t, null, s, a)) : st(e, t, s, a),
          t.child
        );
      case 11:
        return kd(e, t, t.type, t.pendingProps, a);
      case 7:
        return (st(e, t, t.pendingProps, a), t.child);
      case 8:
        return (st(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (st(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return (
          (s = t.pendingProps),
          ql(t, t.type, s.value),
          st(e, t, s.children, a),
          t.child
        );
      case 9:
        return (
          (r = t.type._context),
          (s = t.pendingProps.children),
          pa(t),
          (r = nt(r)),
          (s = s(r)),
          (t.flags |= 1),
          st(e, t, s, a),
          t.child
        );
      case 14:
        return Kd(e, t, t.type, t.pendingProps, a);
      case 15:
        return Xd(e, t, t.type, t.pendingProps, a);
      case 19:
        return eh(e, t, a);
      case 31:
        return Z0(e, t, a);
      case 22:
        return Vd(e, t, a, t.pendingProps);
      case 24:
        return (
          pa(t),
          (s = nt(Ze)),
          e === null
            ? ((r = mu()),
              r === null &&
                ((r = ze),
                (c = du()),
                (r.pooledCache = c),
                c.refCount++,
                c !== null && (r.pooledCacheLanes |= a),
                (r = c)),
              (t.memoizedState = { parent: s, cache: r }),
              yu(t),
              ql(t, Ze, r))
            : ((e.lanes & a) !== 0 && (bu(e, t), Pn(t, null, null, a), $n()),
              (r = e.memoizedState),
              (c = t.memoizedState),
              r.parent !== s
                ? ((r = { parent: s, cache: s }),
                  (t.memoizedState = r),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = r),
                  ql(t, Ze, s))
                : ((s = c.cache),
                  ql(t, Ze, s),
                  s !== r.cache && fu(t, [Ze], a, !0))),
          st(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function hl(e) {
    e.flags |= 4;
  }
  function Wu(e, t, a, s, r) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (r & 335544128) === r))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Th()) e.flags |= 8192;
        else throw ((ga = si), pu);
    } else e.flags &= -16777217;
  }
  function lh(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !bm(t)))
      if (Th()) e.flags |= 8192;
      else throw ((ga = si), pu);
  }
  function Ni(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Uc() : 536870912), (e.lanes |= t), (cn |= t)));
  }
  function as(e, t) {
    if (!Ee)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            (t.alternate !== null && (a = t), (t = t.sibling));
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = e.tail;
          for (var s = null; a !== null; )
            (a.alternate !== null && (s = a), (a = a.sibling));
          s === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (s.sibling = null);
      }
  }
  function qe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      s = 0;
    if (t)
      for (var r = e.child; r !== null; )
        ((a |= r.lanes | r.childLanes),
          (s |= r.subtreeFlags & 65011712),
          (s |= r.flags & 65011712),
          (r.return = e),
          (r = r.sibling));
    else
      for (r = e.child; r !== null; )
        ((a |= r.lanes | r.childLanes),
          (s |= r.subtreeFlags),
          (s |= r.flags),
          (r.return = e),
          (r = r.sibling));
    return ((e.subtreeFlags |= s), (e.childLanes = a), t);
  }
  function J0(e, t, a) {
    var s = t.pendingProps;
    switch ((iu(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (qe(t), null);
      case 1:
        return (qe(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (s = null),
          e !== null && (s = e.memoizedState.cache),
          t.memoizedState.cache !== s && (t.flags |= 2048),
          ol(Ze),
          Te(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            ($a(t)
              ? hl(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), uu())),
          qe(t),
          null
        );
      case 26:
        var r = t.type,
          c = t.memoizedState;
        return (
          e === null
            ? (hl(t),
              c !== null ? (qe(t), lh(t, c)) : (qe(t), Wu(t, r, null, s, a)))
            : c
              ? c !== e.memoizedState
                ? (hl(t), qe(t), lh(t, c))
                : (qe(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps),
                e !== s && hl(t),
                qe(t),
                Wu(t, r, e, s, a)),
          null
        );
      case 27:
        if (
          (kt(t),
          (a = oe.current),
          (r = t.type),
          e !== null && t.stateNode != null)
        )
          e.memoizedProps !== s && hl(t);
        else {
          if (!s) {
            if (t.stateNode === null) throw Error(u(166));
            return (qe(t), null);
          }
          ((e = W.current),
            $a(t) ? zf(t) : ((e = om(r, s, a)), (t.stateNode = e), hl(t)));
        }
        return (qe(t), null);
      case 5:
        if ((kt(t), (r = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== s && hl(t);
        else {
          if (!s) {
            if (t.stateNode === null) throw Error(u(166));
            return (qe(t), null);
          }
          if (((c = W.current), $a(t))) zf(t);
          else {
            var h = qi(oe.current);
            switch (c) {
              case 1:
                c = h.createElementNS("http://www.w3.org/2000/svg", r);
                break;
              case 2:
                c = h.createElementNS("http://www.w3.org/1998/Math/MathML", r);
                break;
              default:
                switch (r) {
                  case "svg":
                    c = h.createElementNS("http://www.w3.org/2000/svg", r);
                    break;
                  case "math":
                    c = h.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      r,
                    );
                    break;
                  case "script":
                    ((c = h.createElement("div")),
                      (c.innerHTML = "<script><\/script>"),
                      (c = c.removeChild(c.firstChild)));
                    break;
                  case "select":
                    ((c =
                      typeof s.is == "string"
                        ? h.createElement("select", { is: s.is })
                        : h.createElement("select")),
                      s.multiple
                        ? (c.multiple = !0)
                        : s.size && (c.size = s.size));
                    break;
                  default:
                    c =
                      typeof s.is == "string"
                        ? h.createElement(r, { is: s.is })
                        : h.createElement(r);
                }
            }
            ((c[lt] = t), (c[dt] = s));
            e: for (h = t.child; h !== null; ) {
              if (h.tag === 5 || h.tag === 6) c.appendChild(h.stateNode);
              else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                ((h.child.return = h), (h = h.child));
                continue;
              }
              if (h === t) break e;
              for (; h.sibling === null; ) {
                if (h.return === null || h.return === t) break e;
                h = h.return;
              }
              ((h.sibling.return = h.return), (h = h.sibling));
            }
            t.stateNode = c;
            e: switch ((it(c, r, s), r)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                s = !!s.autoFocus;
                break e;
              case "img":
                s = !0;
                break e;
              default:
                s = !1;
            }
            s && hl(t);
          }
        }
        return (
          qe(t),
          Wu(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a),
          null
        );
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== s && hl(t);
        else {
          if (typeof s != "string" && t.stateNode === null) throw Error(u(166));
          if (((e = oe.current), $a(t))) {
            if (
              ((e = t.stateNode),
              (a = t.memoizedProps),
              (s = null),
              (r = at),
              r !== null)
            )
              switch (r.tag) {
                case 27:
                case 5:
                  s = r.memoizedProps;
              }
            ((e[lt] = t),
              (e = !!(
                e.nodeValue === a ||
                (s !== null && s.suppressHydrationWarning === !0) ||
                Wh(e.nodeValue, a)
              )),
              e || Bl(t, !0));
          } else
            ((e = qi(e).createTextNode(s)), (e[lt] = t), (t.stateNode = e));
        }
        return (qe(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((s = $a(t)), a !== null)) {
            if (e === null) {
              if (!s) throw Error(u(318));
              if (
                ((e = t.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(u(557));
              e[lt] = t;
            } else
              (ha(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (qe(t), (e = !1));
          } else
            ((a = uu()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (Tt(t), t) : (Tt(t), null);
          if ((t.flags & 128) !== 0) throw Error(u(558));
        }
        return (qe(t), null);
      case 13:
        if (
          ((s = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((r = $a(t)), s !== null && s.dehydrated !== null)) {
            if (e === null) {
              if (!r) throw Error(u(318));
              if (
                ((r = t.memoizedState),
                (r = r !== null ? r.dehydrated : null),
                !r)
              )
                throw Error(u(317));
              r[lt] = t;
            } else
              (ha(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (qe(t), (r = !1));
          } else
            ((r = uu()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = r),
              (r = !0));
          if (!r) return t.flags & 256 ? (Tt(t), t) : (Tt(t), null);
        }
        return (
          Tt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = s !== null),
              (e = e !== null && e.memoizedState !== null),
              a &&
                ((s = t.child),
                (r = null),
                s.alternate !== null &&
                  s.alternate.memoizedState !== null &&
                  s.alternate.memoizedState.cachePool !== null &&
                  (r = s.alternate.memoizedState.cachePool.pool),
                (c = null),
                s.memoizedState !== null &&
                  s.memoizedState.cachePool !== null &&
                  (c = s.memoizedState.cachePool.pool),
                c !== r && (s.flags |= 2048)),
              a !== e && a && (t.child.flags |= 8192),
              Ni(t, t.updateQueue),
              qe(t),
              null)
        );
      case 4:
        return (Te(), e === null && So(t.stateNode.containerInfo), qe(t), null);
      case 10:
        return (ol(t.type), qe(t), null);
      case 19:
        if ((Q(Xe), (s = t.memoizedState), s === null)) return (qe(t), null);
        if (((r = (t.flags & 128) !== 0), (c = s.rendering), c === null))
          if (r) as(s, !1);
          else {
            if (ke !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((c = oi(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      as(s, !1),
                      e = c.updateQueue,
                      t.updateQueue = e,
                      Ni(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (Rf(a, e), (a = a.sibling));
                  return (
                    $(Xe, (Xe.current & 1) | 2),
                    Ee && rl(t, s.treeForkCount),
                    t.child
                  );
                }
                e = e.sibling;
              }
            s.tail !== null &&
              Nt() > Ci &&
              ((t.flags |= 128), (r = !0), as(s, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = oi(c)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Ni(t, e),
                as(s, !0),
                s.tail === null &&
                  s.tailMode === "hidden" &&
                  !c.alternate &&
                  !Ee)
              )
                return (qe(t), null);
            } else
              2 * Nt() - s.renderingStartTime > Ci &&
                a !== 536870912 &&
                ((t.flags |= 128), (r = !0), as(s, !1), (t.lanes = 4194304));
          s.isBackwards
            ? ((c.sibling = t.child), (t.child = c))
            : ((e = s.last),
              e !== null ? (e.sibling = c) : (t.child = c),
              (s.last = c));
        }
        return s.tail !== null
          ? ((e = s.tail),
            (s.rendering = e),
            (s.tail = e.sibling),
            (s.renderingStartTime = Nt()),
            (e.sibling = null),
            (a = Xe.current),
            $(Xe, r ? (a & 1) | 2 : a & 1),
            Ee && rl(t, s.treeForkCount),
            e)
          : (qe(t), null);
      case 22:
      case 23:
        return (
          Tt(t),
          Su(),
          (s = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== s && (t.flags |= 8192)
            : s && (t.flags |= 8192),
          s
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (qe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : qe(t),
          (a = t.updateQueue),
          a !== null && Ni(t, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (s = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (s = t.memoizedState.cachePool.pool),
          s !== a && (t.flags |= 2048),
          e !== null && Q(ya),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          ol(Ze),
          qe(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function $0(e, t) {
    switch ((iu(t), t.tag)) {
      case 1:
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          ol(Ze),
          Te(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (kt(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Tt(t), t.alternate === null)) throw Error(u(340));
          ha();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 13:
        if (
          (Tt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(u(340));
          ha();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (Q(Xe), null);
      case 4:
        return (Te(), null);
      case 10:
        return (ol(t.type), null);
      case 22:
      case 23:
        return (
          Tt(t),
          Su(),
          e !== null && Q(ya),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (ol(Ze), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ah(e, t) {
    switch ((iu(t), t.tag)) {
      case 3:
        (ol(Ze), Te());
        break;
      case 26:
      case 27:
      case 5:
        kt(t);
        break;
      case 4:
        Te();
        break;
      case 31:
        t.memoizedState !== null && Tt(t);
        break;
      case 13:
        Tt(t);
        break;
      case 19:
        Q(Xe);
        break;
      case 10:
        ol(t.type);
        break;
      case 22:
      case 23:
        (Tt(t), Su(), e !== null && Q(ya));
        break;
      case 24:
        ol(Ze);
    }
  }
  function ns(e, t) {
    try {
      var a = t.updateQueue,
        s = a !== null ? a.lastEffect : null;
      if (s !== null) {
        var r = s.next;
        a = r;
        do {
          if ((a.tag & e) === e) {
            s = void 0;
            var c = a.create,
              h = a.inst;
            ((s = c()), (h.destroy = s));
          }
          a = a.next;
        } while (a !== r);
      }
    } catch (x) {
      Oe(t, t.return, x);
    }
  }
  function kl(e, t, a) {
    try {
      var s = t.updateQueue,
        r = s !== null ? s.lastEffect : null;
      if (r !== null) {
        var c = r.next;
        s = c;
        do {
          if ((s.tag & e) === e) {
            var h = s.inst,
              x = h.destroy;
            if (x !== void 0) {
              ((h.destroy = void 0), (r = t));
              var w = a,
                z = x;
              try {
                z();
              } catch (Y) {
                Oe(r, w, Y);
              }
            }
          }
          s = s.next;
        } while (s !== c);
      }
    } catch (Y) {
      Oe(t, t.return, Y);
    }
  }
  function nh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Ff(t, a);
      } catch (s) {
        Oe(e, e.return, s);
      }
    }
  }
  function sh(e, t, a) {
    ((a.props = Sa(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (s) {
      Oe(e, t, s);
    }
  }
  function ss(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var s = e.stateNode;
            break;
          case 30:
            s = e.stateNode;
            break;
          default:
            s = e.stateNode;
        }
        typeof a == "function" ? (e.refCleanup = a(s)) : (a.current = s);
      }
    } catch (r) {
      Oe(e, t, r);
    }
  }
  function It(e, t) {
    var a = e.ref,
      s = e.refCleanup;
    if (a !== null)
      if (typeof s == "function")
        try {
          s();
        } catch (r) {
          Oe(e, t, r);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (r) {
          Oe(e, t, r);
        }
      else a.current = null;
  }
  function ih(e) {
    var t = e.type,
      a = e.memoizedProps,
      s = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && s.focus();
          break e;
        case "img":
          a.src ? (s.src = a.src) : a.srcSet && (s.srcset = a.srcSet);
      }
    } catch (r) {
      Oe(e, e.return, r);
    }
  }
  function Iu(e, t, a) {
    try {
      var s = e.stateNode;
      (gb(s, e.type, a, t), (s[dt] = t));
    } catch (r) {
      Oe(e, e.return, r);
    }
  }
  function rh(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && $l(e.type)) ||
      e.tag === 4
    );
  }
  function eo(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || rh(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && $l(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function to(e, t, a) {
    var s = e.tag;
    if (s === 5 || s === 6)
      ((e = e.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a
            ).insertBefore(e, t)
          : ((t =
              a.nodeType === 9
                ? a.body
                : a.nodeName === "HTML"
                  ? a.ownerDocument.body
                  : a),
            t.appendChild(e),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = nl)));
    else if (
      s !== 4 &&
      (s === 27 && $l(e.type) && ((a = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (to(e, t, a), e = e.sibling; e !== null; )
        (to(e, t, a), (e = e.sibling));
  }
  function ji(e, t, a) {
    var s = e.tag;
    if (s === 5 || s === 6)
      ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (
      s !== 4 &&
      (s === 27 && $l(e.type) && (a = e.stateNode), (e = e.child), e !== null)
    )
      for (ji(e, t, a), e = e.sibling; e !== null; )
        (ji(e, t, a), (e = e.sibling));
  }
  function uh(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var s = e.type, r = t.attributes; r.length; )
        t.removeAttributeNode(r[0]);
      (it(t, s, a), (t[lt] = e), (t[dt] = a));
    } catch (c) {
      Oe(e, e.return, c);
    }
  }
  var ml = !1,
    $e = !1,
    lo = !1,
    oh = typeof WeakSet == "function" ? WeakSet : Set,
    tt = null;
  function P0(e, t) {
    if (((e = e.containerInfo), (Eo = Ki), (e = Sf(e)), Jr(e))) {
      if ("selectionStart" in e)
        var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var s = a.getSelection && a.getSelection();
          if (s && s.rangeCount !== 0) {
            a = s.anchorNode;
            var r = s.anchorOffset,
              c = s.focusNode;
            s = s.focusOffset;
            try {
              (a.nodeType, c.nodeType);
            } catch {
              a = null;
              break e;
            }
            var h = 0,
              x = -1,
              w = -1,
              z = 0,
              Y = 0,
              X = e,
              B = null;
            t: for (;;) {
              for (
                var H;
                X !== a || (r !== 0 && X.nodeType !== 3) || (x = h + r),
                  X !== c || (s !== 0 && X.nodeType !== 3) || (w = h + s),
                  X.nodeType === 3 && (h += X.nodeValue.length),
                  (H = X.firstChild) !== null;
              )
                ((B = X), (X = H));
              for (;;) {
                if (X === e) break t;
                if (
                  (B === a && ++z === r && (x = h),
                  B === c && ++Y === s && (w = h),
                  (H = X.nextSibling) !== null)
                )
                  break;
                ((X = B), (B = X.parentNode));
              }
              X = H;
            }
            a = x === -1 || w === -1 ? null : { start: x, end: w };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      wo = { focusedElem: e, selectionRange: a }, Ki = !1, tt = t;
      tt !== null;
    )
      if (
        ((t = tt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = t), (tt = e));
      else
        for (; tt !== null; ) {
          switch (((t = tt), (c = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue),
                (e = e !== null ? e.events : null),
                e !== null)
              )
                for (a = 0; a < e.length; a++)
                  ((r = e[a]), (r.ref.impl = r.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                ((e = void 0),
                  (a = t),
                  (r = c.memoizedProps),
                  (c = c.memoizedState),
                  (s = a.stateNode));
                try {
                  var te = Sa(a.type, r);
                  ((e = s.getSnapshotBeforeUpdate(te, c)),
                    (s.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ue) {
                  Oe(a, a.return, ue);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)
                )
                  To(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      To(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (tt = e));
            break;
          }
          tt = t.return;
        }
  }
  function ch(e, t, a) {
    var s = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (yl(e, a), s & 4 && ns(5, a));
        break;
      case 1:
        if ((yl(e, a), s & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (h) {
              Oe(a, a.return, h);
            }
          else {
            var r = Sa(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(r, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (h) {
              Oe(a, a.return, h);
            }
          }
        (s & 64 && nh(a), s & 512 && ss(a, a.return));
        break;
      case 3:
        if ((yl(e, a), s & 64 && ((e = a.updateQueue), e !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            Ff(e, t);
          } catch (h) {
            Oe(a, a.return, h);
          }
        }
        break;
      case 27:
        t === null && s & 4 && uh(a);
      case 26:
      case 5:
        (yl(e, a), t === null && s & 4 && ih(a), s & 512 && ss(a, a.return));
        break;
      case 12:
        yl(e, a);
        break;
      case 31:
        (yl(e, a), s & 4 && hh(e, a));
        break;
      case 13:
        (yl(e, a),
          s & 4 && mh(e, a),
          s & 64 &&
            ((e = a.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((a = ib.bind(null, a)), _b(e, a)))));
        break;
      case 22:
        if (((s = a.memoizedState !== null || ml), !s)) {
          ((t = (t !== null && t.memoizedState !== null) || $e), (r = ml));
          var c = $e;
          ((ml = s),
            ($e = t) && !c ? bl(e, a, (a.subtreeFlags & 8772) !== 0) : yl(e, a),
            (ml = r),
            ($e = c));
        }
        break;
      case 30:
        break;
      default:
        yl(e, a);
    }
  }
  function fh(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), fh(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Dr(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Le = null,
    mt = !1;
  function pl(e, t, a) {
    for (a = a.child; a !== null; ) (dh(e, t, a), (a = a.sibling));
  }
  function dh(e, t, a) {
    if (jt && typeof jt.onCommitFiberUnmount == "function")
      try {
        jt.onCommitFiberUnmount(An, a);
      } catch {}
    switch (a.tag) {
      case 26:
        ($e || It(a, t),
          pl(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        $e || It(a, t);
        var s = Le,
          r = mt;
        ($l(a.type) && ((Le = a.stateNode), (mt = !1)),
          pl(e, t, a),
          ms(a.stateNode),
          (Le = s),
          (mt = r));
        break;
      case 5:
        $e || It(a, t);
      case 6:
        if (
          ((s = Le),
          (r = mt),
          (Le = null),
          pl(e, t, a),
          (Le = s),
          (mt = r),
          Le !== null)
        )
          if (mt)
            try {
              (Le.nodeType === 9
                ? Le.body
                : Le.nodeName === "HTML"
                  ? Le.ownerDocument.body
                  : Le
              ).removeChild(a.stateNode);
            } catch (c) {
              Oe(a, t, c);
            }
          else
            try {
              Le.removeChild(a.stateNode);
            } catch (c) {
              Oe(a, t, c);
            }
        break;
      case 18:
        Le !== null &&
          (mt
            ? ((e = Le),
              nm(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                a.stateNode,
              ),
              gn(e))
            : nm(Le, a.stateNode));
        break;
      case 4:
        ((s = Le),
          (r = mt),
          (Le = a.stateNode.containerInfo),
          (mt = !0),
          pl(e, t, a),
          (Le = s),
          (mt = r));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (kl(2, a, t), $e || kl(4, a, t), pl(e, t, a));
        break;
      case 1:
        ($e ||
          (It(a, t),
          (s = a.stateNode),
          typeof s.componentWillUnmount == "function" && sh(a, t, s)),
          pl(e, t, a));
        break;
      case 21:
        pl(e, t, a);
        break;
      case 22:
        (($e = (s = $e) || a.memoizedState !== null), pl(e, t, a), ($e = s));
        break;
      default:
        pl(e, t, a);
    }
  }
  function hh(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        gn(e);
      } catch (a) {
        Oe(t, t.return, a);
      }
    }
  }
  function mh(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        gn(e);
      } catch (a) {
        Oe(t, t.return, a);
      }
  }
  function W0(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new oh()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new oh()),
          t
        );
      default:
        throw Error(u(435, e.tag));
    }
  }
  function Ei(e, t) {
    var a = W0(e);
    t.forEach(function (s) {
      if (!a.has(s)) {
        a.add(s);
        var r = rb.bind(null, e, s);
        s.then(r, r);
      }
    });
  }
  function pt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var s = 0; s < a.length; s++) {
        var r = a[s],
          c = e,
          h = t,
          x = h;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if ($l(x.type)) {
                ((Le = x.stateNode), (mt = !1));
                break e;
              }
              break;
            case 5:
              ((Le = x.stateNode), (mt = !1));
              break e;
            case 3:
            case 4:
              ((Le = x.stateNode.containerInfo), (mt = !0));
              break e;
          }
          x = x.return;
        }
        if (Le === null) throw Error(u(160));
        (dh(c, h, r),
          (Le = null),
          (mt = !1),
          (c = r.alternate),
          c !== null && (c.return = null),
          (r.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) (ph(t, e), (t = t.sibling));
  }
  var Xt = null;
  function ph(e, t) {
    var a = e.alternate,
      s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (pt(t, e),
          yt(e),
          s & 4 && (kl(3, e, e.return), ns(3, e), kl(5, e, e.return)));
        break;
      case 1:
        (pt(t, e),
          yt(e),
          s & 512 && ($e || a === null || It(a, a.return)),
          s & 64 &&
            ml &&
            ((e = e.updateQueue),
            e !== null &&
              ((s = e.callbacks),
              s !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? s : a.concat(s))))));
        break;
      case 26:
        var r = Xt;
        if (
          (pt(t, e),
          yt(e),
          s & 512 && ($e || a === null || It(a, a.return)),
          s & 4)
        ) {
          var c = a !== null ? a.memoizedState : null;
          if (((s = e.memoizedState), a === null))
            if (s === null)
              if (e.stateNode === null) {
                e: {
                  ((s = e.type),
                    (a = e.memoizedProps),
                    (r = r.ownerDocument || r));
                  t: switch (s) {
                    case "title":
                      ((c = r.getElementsByTagName("title")[0]),
                        (!c ||
                          c[Dn] ||
                          c[lt] ||
                          c.namespaceURI === "http://www.w3.org/2000/svg" ||
                          c.hasAttribute("itemprop")) &&
                          ((c = r.createElement(s)),
                          r.head.insertBefore(
                            c,
                            r.querySelector("head > title"),
                          )),
                        it(c, s, a),
                        (c[lt] = e),
                        et(c),
                        (s = c));
                      break e;
                    case "link":
                      var h = pm("link", "href", r).get(s + (a.href || ""));
                      if (h) {
                        for (var x = 0; x < h.length; x++)
                          if (
                            ((c = h[x]),
                            c.getAttribute("href") ===
                              (a.href == null || a.href === ""
                                ? null
                                : a.href) &&
                              c.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              c.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              c.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            h.splice(x, 1);
                            break t;
                          }
                      }
                      ((c = r.createElement(s)),
                        it(c, s, a),
                        r.head.appendChild(c));
                      break;
                    case "meta":
                      if (
                        (h = pm("meta", "content", r).get(
                          s + (a.content || ""),
                        ))
                      ) {
                        for (x = 0; x < h.length; x++)
                          if (
                            ((c = h[x]),
                            c.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              c.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              c.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              c.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              c.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            h.splice(x, 1);
                            break t;
                          }
                      }
                      ((c = r.createElement(s)),
                        it(c, s, a),
                        r.head.appendChild(c));
                      break;
                    default:
                      throw Error(u(468, s));
                  }
                  ((c[lt] = e), et(c), (s = c));
                }
                e.stateNode = s;
              } else ym(r, e.type, e.stateNode);
            else e.stateNode = mm(r, s, e.memoizedProps);
          else
            c !== s
              ? (c === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : c.count--,
                s === null
                  ? ym(r, e.type, e.stateNode)
                  : mm(r, s, e.memoizedProps))
              : s === null &&
                e.stateNode !== null &&
                Iu(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (pt(t, e),
          yt(e),
          s & 512 && ($e || a === null || It(a, a.return)),
          a !== null && s & 4 && Iu(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if (
          (pt(t, e),
          yt(e),
          s & 512 && ($e || a === null || It(a, a.return)),
          e.flags & 32)
        ) {
          r = e.stateNode;
          try {
            Qa(r, "");
          } catch (te) {
            Oe(e, e.return, te);
          }
        }
        (s & 4 &&
          e.stateNode != null &&
          ((r = e.memoizedProps), Iu(e, r, a !== null ? a.memoizedProps : r)),
          s & 1024 && (lo = !0));
        break;
      case 6:
        if ((pt(t, e), yt(e), s & 4)) {
          if (e.stateNode === null) throw Error(u(162));
          ((s = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = s;
          } catch (te) {
            Oe(e, e.return, te);
          }
        }
        break;
      case 3:
        if (
          ((Qi = null),
          (r = Xt),
          (Xt = Li(t.containerInfo)),
          pt(t, e),
          (Xt = r),
          yt(e),
          s & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            gn(t.containerInfo);
          } catch (te) {
            Oe(e, e.return, te);
          }
        lo && ((lo = !1), yh(e));
        break;
      case 4:
        ((s = Xt),
          (Xt = Li(e.stateNode.containerInfo)),
          pt(t, e),
          yt(e),
          (Xt = s));
        break;
      case 12:
        (pt(t, e), yt(e));
        break;
      case 31:
        (pt(t, e),
          yt(e),
          s & 4 &&
            ((s = e.updateQueue),
            s !== null && ((e.updateQueue = null), Ei(e, s))));
        break;
      case 13:
        (pt(t, e),
          yt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (_i = Nt()),
          s & 4 &&
            ((s = e.updateQueue),
            s !== null && ((e.updateQueue = null), Ei(e, s))));
        break;
      case 22:
        r = e.memoizedState !== null;
        var w = a !== null && a.memoizedState !== null,
          z = ml,
          Y = $e;
        if (
          ((ml = z || r),
          ($e = Y || w),
          pt(t, e),
          ($e = Y),
          (ml = z),
          yt(e),
          s & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = r ? t._visibility & -2 : t._visibility | 1,
              r && (a === null || w || ml || $e || Na(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                w = a = t;
                try {
                  if (((c = w.stateNode), r))
                    ((h = c.style),
                      typeof h.setProperty == "function"
                        ? h.setProperty("display", "none", "important")
                        : (h.display = "none"));
                  else {
                    x = w.stateNode;
                    var X = w.memoizedProps.style,
                      B =
                        X != null && X.hasOwnProperty("display")
                          ? X.display
                          : null;
                    x.style.display =
                      B == null || typeof B == "boolean" ? "" : ("" + B).trim();
                  }
                } catch (te) {
                  Oe(w, w.return, te);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                w = t;
                try {
                  w.stateNode.nodeValue = r ? "" : w.memoizedProps;
                } catch (te) {
                  Oe(w, w.return, te);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                w = t;
                try {
                  var H = w.stateNode;
                  r ? sm(H, !0) : sm(w.stateNode, !1);
                } catch (te) {
                  Oe(w, w.return, te);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (a === t && (a = null), (t = t.return));
            }
            (a === t && (a = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        s & 4 &&
          ((s = e.updateQueue),
          s !== null &&
            ((a = s.retryQueue),
            a !== null && ((s.retryQueue = null), Ei(e, a))));
        break;
      case 19:
        (pt(t, e),
          yt(e),
          s & 4 &&
            ((s = e.updateQueue),
            s !== null && ((e.updateQueue = null), Ei(e, s))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (pt(t, e), yt(e));
    }
  }
  function yt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, s = e.return; s !== null; ) {
          if (rh(s)) {
            a = s;
            break;
          }
          s = s.return;
        }
        if (a == null) throw Error(u(160));
        switch (a.tag) {
          case 27:
            var r = a.stateNode,
              c = eo(e);
            ji(e, c, r);
            break;
          case 5:
            var h = a.stateNode;
            a.flags & 32 && (Qa(h, ""), (a.flags &= -33));
            var x = eo(e);
            ji(e, x, h);
            break;
          case 3:
          case 4:
            var w = a.stateNode.containerInfo,
              z = eo(e);
            to(e, z, w);
            break;
          default:
            throw Error(u(161));
        }
      } catch (Y) {
        Oe(e, e.return, Y);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function yh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (yh(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function yl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (ch(e, t.alternate, t), (t = t.sibling));
  }
  function Na(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (kl(4, t, t.return), Na(t));
          break;
        case 1:
          It(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == "function" && sh(t, t.return, a),
            Na(t));
          break;
        case 27:
          ms(t.stateNode);
        case 26:
        case 5:
          (It(t, t.return), Na(t));
          break;
        case 22:
          t.memoizedState === null && Na(t);
          break;
        case 30:
          Na(t);
          break;
        default:
          Na(t);
      }
      e = e.sibling;
    }
  }
  function bl(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var s = t.alternate,
        r = e,
        c = t,
        h = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (bl(r, c, a), ns(4, c));
          break;
        case 1:
          if (
            (bl(r, c, a),
            (s = c),
            (r = s.stateNode),
            typeof r.componentDidMount == "function")
          )
            try {
              r.componentDidMount();
            } catch (z) {
              Oe(s, s.return, z);
            }
          if (((s = c), (r = s.updateQueue), r !== null)) {
            var x = s.stateNode;
            try {
              var w = r.shared.hiddenCallbacks;
              if (w !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < w.length; r++)
                  Zf(w[r], x);
            } catch (z) {
              Oe(s, s.return, z);
            }
          }
          (a && h & 64 && nh(c), ss(c, c.return));
          break;
        case 27:
          uh(c);
        case 26:
        case 5:
          (bl(r, c, a), a && s === null && h & 4 && ih(c), ss(c, c.return));
          break;
        case 12:
          bl(r, c, a);
          break;
        case 31:
          (bl(r, c, a), a && h & 4 && hh(r, c));
          break;
        case 13:
          (bl(r, c, a), a && h & 4 && mh(r, c));
          break;
        case 22:
          (c.memoizedState === null && bl(r, c, a), ss(c, c.return));
          break;
        case 30:
          break;
        default:
          bl(r, c, a);
      }
      t = t.sibling;
    }
  }
  function ao(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && Xn(a)));
  }
  function no(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Xn(e)));
  }
  function Vt(e, t, a, s) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (bh(e, t, a, s), (t = t.sibling));
  }
  function bh(e, t, a, s) {
    var r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Vt(e, t, a, s), r & 2048 && ns(9, t));
        break;
      case 1:
        Vt(e, t, a, s);
        break;
      case 3:
        (Vt(e, t, a, s),
          r & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Xn(e))));
        break;
      case 12:
        if (r & 2048) {
          (Vt(e, t, a, s), (e = t.stateNode));
          try {
            var c = t.memoizedProps,
              h = c.id,
              x = c.onPostCommit;
            typeof x == "function" &&
              x(
                h,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0,
              );
          } catch (w) {
            Oe(t, t.return, w);
          }
        } else Vt(e, t, a, s);
        break;
      case 31:
        Vt(e, t, a, s);
        break;
      case 13:
        Vt(e, t, a, s);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (h = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? Vt(e, t, a, s)
              : is(e, t)
            : c._visibility & 2
              ? Vt(e, t, a, s)
              : ((c._visibility |= 2),
                rn(e, t, a, s, (t.subtreeFlags & 10256) !== 0 || !1)),
          r & 2048 && ao(h, t));
        break;
      case 24:
        (Vt(e, t, a, s), r & 2048 && no(t.alternate, t));
        break;
      default:
        Vt(e, t, a, s);
    }
  }
  function rn(e, t, a, s, r) {
    for (
      r = r && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;
    ) {
      var c = e,
        h = t,
        x = a,
        w = s,
        z = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          (rn(c, h, x, w, r), ns(8, h));
          break;
        case 23:
          break;
        case 22:
          var Y = h.stateNode;
          (h.memoizedState !== null
            ? Y._visibility & 2
              ? rn(c, h, x, w, r)
              : is(c, h)
            : ((Y._visibility |= 2), rn(c, h, x, w, r)),
            r && z & 2048 && ao(h.alternate, h));
          break;
        case 24:
          (rn(c, h, x, w, r), r && z & 2048 && no(h.alternate, h));
          break;
        default:
          rn(c, h, x, w, r);
      }
      t = t.sibling;
    }
  }
  function is(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          s = t,
          r = s.flags;
        switch (s.tag) {
          case 22:
            (is(a, s), r & 2048 && ao(s.alternate, s));
            break;
          case 24:
            (is(a, s), r & 2048 && no(s.alternate, s));
            break;
          default:
            is(a, s);
        }
        t = t.sibling;
      }
  }
  var rs = 8192;
  function un(e, t, a) {
    if (e.subtreeFlags & rs)
      for (e = e.child; e !== null; ) (gh(e, t, a), (e = e.sibling));
  }
  function gh(e, t, a) {
    switch (e.tag) {
      case 26:
        (un(e, t, a),
          e.flags & rs &&
            e.memoizedState !== null &&
            Lb(a, Xt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        un(e, t, a);
        break;
      case 3:
      case 4:
        var s = Xt;
        ((Xt = Li(e.stateNode.containerInfo)), un(e, t, a), (Xt = s));
        break;
      case 22:
        e.memoizedState === null &&
          ((s = e.alternate),
          s !== null && s.memoizedState !== null
            ? ((s = rs), (rs = 16777216), un(e, t, a), (rs = s))
            : un(e, t, a));
        break;
      default:
        un(e, t, a);
    }
  }
  function vh(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function us(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var s = t[a];
          ((tt = s), Sh(s, e));
        }
      vh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (xh(e), (e = e.sibling));
  }
  function xh(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (us(e), e.flags & 2048 && kl(9, e, e.return));
        break;
      case 3:
        us(e);
        break;
      case 12:
        us(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), wi(e))
          : us(e);
        break;
      default:
        us(e);
    }
  }
  function wi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var s = t[a];
          ((tt = s), Sh(s, e));
        }
      vh(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (kl(8, t, t.return), wi(t));
          break;
        case 22:
          ((a = t.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), wi(t)));
          break;
        default:
          wi(t);
      }
      e = e.sibling;
    }
  }
  function Sh(e, t) {
    for (; tt !== null; ) {
      var a = tt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          kl(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var s = a.memoizedState.cachePool.pool;
            s != null && s.refCount++;
          }
          break;
        case 24:
          Xn(a.memoizedState.cache);
      }
      if (((s = a.child), s !== null)) ((s.return = a), (tt = s));
      else
        e: for (a = e; tt !== null; ) {
          s = tt;
          var r = s.sibling,
            c = s.return;
          if ((fh(s), s === a)) {
            tt = null;
            break e;
          }
          if (r !== null) {
            ((r.return = c), (tt = r));
            break e;
          }
          tt = c;
        }
    }
  }
  var I0 = {
      getCacheForType: function (e) {
        var t = nt(Ze),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return nt(Ze).controller.signal;
      },
    },
    eb = typeof WeakMap == "function" ? WeakMap : Map,
    Ce = 0,
    ze = null,
    xe = null,
    Ne = 0,
    Re = 0,
    At = null,
    Kl = !1,
    on = !1,
    so = !1,
    gl = 0,
    ke = 0,
    Xl = 0,
    ja = 0,
    io = 0,
    Rt = 0,
    cn = 0,
    os = null,
    bt = null,
    ro = !1,
    _i = 0,
    Nh = 0,
    Ci = 1 / 0,
    Ti = null,
    Vl = null,
    We = 0,
    Zl = null,
    fn = null,
    vl = 0,
    uo = 0,
    oo = null,
    jh = null,
    cs = 0,
    co = null;
  function Ot() {
    return (Ce & 2) !== 0 && Ne !== 0 ? Ne & -Ne : M.T !== null ? bo() : Lc();
  }
  function Eh() {
    if (Rt === 0)
      if ((Ne & 536870912) === 0 || Ee) {
        var e = Bs;
        ((Bs <<= 1), (Bs & 3932160) === 0 && (Bs = 262144), (Rt = e));
      } else Rt = 536870912;
    return ((e = Ct.current), e !== null && (e.flags |= 32), Rt);
  }
  function gt(e, t, a) {
    (((e === ze && (Re === 2 || Re === 9)) || e.cancelPendingCommit !== null) &&
      (dn(e, 0), Fl(e, Ne, Rt, !1)),
      On(e, a),
      ((Ce & 2) === 0 || e !== ze) &&
        (e === ze &&
          ((Ce & 2) === 0 && (ja |= a), ke === 4 && Fl(e, Ne, Rt, !1)),
        el(e)));
  }
  function wh(e, t, a) {
    if ((Ce & 6) !== 0) throw Error(u(327));
    var s = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Rn(e, t),
      r = s ? ab(e, t) : ho(e, t, !0),
      c = s;
    do {
      if (r === 0) {
        on && !s && Fl(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), c && !tb(a))) {
          ((r = ho(e, t, !1)), (c = !1));
          continue;
        }
        if (r === 2) {
          if (((c = t), e.errorRecoveryDisabledLanes & c)) var h = 0;
          else
            ((h = e.pendingLanes & -536870913),
              (h = h !== 0 ? h : h & 536870912 ? 536870912 : 0));
          if (h !== 0) {
            t = h;
            e: {
              var x = e;
              r = os;
              var w = x.current.memoizedState.isDehydrated;
              if ((w && (dn(x, h).flags |= 256), (h = ho(x, h, !1)), h !== 2)) {
                if (so && !w) {
                  ((x.errorRecoveryDisabledLanes |= c), (ja |= c), (r = 4));
                  break e;
                }
                ((c = bt),
                  (bt = r),
                  c !== null &&
                    (bt === null ? (bt = c) : bt.push.apply(bt, c)));
              }
              r = h;
            }
            if (((c = !1), r !== 2)) continue;
          }
        }
        if (r === 1) {
          (dn(e, 0), Fl(e, t, 0, !0));
          break;
        }
        e: {
          switch (((s = e), (c = r), c)) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Fl(s, t, Rt, !Kl);
              break e;
            case 2:
              bt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && ((r = _i + 300 - Nt()), 10 < r)) {
            if ((Fl(s, t, Rt, !Kl), Ls(s, 0, !0) !== 0)) break e;
            ((vl = t),
              (s.timeoutHandle = lm(
                _h.bind(
                  null,
                  s,
                  a,
                  bt,
                  Ti,
                  ro,
                  t,
                  Rt,
                  ja,
                  cn,
                  Kl,
                  c,
                  "Throttled",
                  -0,
                  0,
                ),
                r,
              )));
            break e;
          }
          _h(s, a, bt, Ti, ro, t, Rt, ja, cn, Kl, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    el(e);
  }
  function _h(e, t, a, s, r, c, h, x, w, z, Y, X, B, H) {
    if (
      ((e.timeoutHandle = -1),
      (X = t.subtreeFlags),
      X & 8192 || (X & 16785408) === 16785408)
    ) {
      ((X = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: nl,
      }),
        gh(t, c, X));
      var te =
        (c & 62914560) === c ? _i - Nt() : (c & 4194048) === c ? Nh - Nt() : 0;
      if (((te = Hb(X, te)), te !== null)) {
        ((vl = c),
          (e.cancelPendingCommit = te(
            Uh.bind(null, e, t, c, a, s, r, h, x, w, Y, X, null, B, H),
          )),
          Fl(e, c, h, !z));
        return;
      }
    }
    Uh(e, t, c, a, s, r, h, x, w);
  }
  function tb(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var s = 0; s < a.length; s++) {
          var r = a[s],
            c = r.getSnapshot;
          r = r.value;
          try {
            if (!wt(c(), r)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
        ((a.return = t), (t = a));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Fl(e, t, a, s) {
    ((t &= ~io),
      (t &= ~ja),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      s && (e.warmLanes |= t),
      (s = e.expirationTimes));
    for (var r = t; 0 < r; ) {
      var c = 31 - Et(r),
        h = 1 << c;
      ((s[c] = -1), (r &= ~h));
    }
    a !== 0 && zc(e, a, t);
  }
  function Ai() {
    return (Ce & 6) === 0 ? (fs(0), !1) : !0;
  }
  function fo() {
    if (xe !== null) {
      if (Re === 0) var e = xe.return;
      else ((e = xe), (ul = ma = null), Cu(e), (tn = null), (Zn = 0), (e = xe));
      for (; e !== null; ) (ah(e.alternate, e), (e = e.return));
      xe = null;
    }
  }
  function dn(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), Sb(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (vl = 0),
      fo(),
      (ze = e),
      (xe = a = il(e.current, null)),
      (Ne = t),
      (Re = 0),
      (At = null),
      (Kl = !1),
      (on = Rn(e, t)),
      (so = !1),
      (cn = Rt = io = ja = Xl = ke = 0),
      (bt = os = null),
      (ro = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var s = e.entangledLanes;
    if (s !== 0)
      for (e = e.entanglements, s &= t; 0 < s; ) {
        var r = 31 - Et(s),
          c = 1 << r;
        ((t |= e[r]), (s &= ~c));
      }
    return ((gl = t), $s(), a);
  }
  function Ch(e, t) {
    ((ye = null),
      (M.H = ts),
      t === en || t === ni
        ? ((t = kf()), (Re = 3))
        : t === pu
          ? ((t = kf()), (Re = 4))
          : (Re =
              t === ku
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (At = t),
      xe === null && ((ke = 1), gi(e, zt(t, e.current))));
  }
  function Th() {
    var e = Ct.current;
    return e === null
      ? !0
      : (Ne & 4194048) === Ne
        ? Ht === null
        : (Ne & 62914560) === Ne || (Ne & 536870912) !== 0
          ? e === Ht
          : !1;
  }
  function Ah() {
    var e = M.H;
    return ((M.H = ts), e === null ? ts : e);
  }
  function Rh() {
    var e = M.A;
    return ((M.A = I0), e);
  }
  function Ri() {
    ((ke = 4),
      Kl || ((Ne & 4194048) !== Ne && Ct.current !== null) || (on = !0),
      ((Xl & 134217727) === 0 && (ja & 134217727) === 0) ||
        ze === null ||
        Fl(ze, Ne, Rt, !1));
  }
  function ho(e, t, a) {
    var s = Ce;
    Ce |= 2;
    var r = Ah(),
      c = Rh();
    ((ze !== e || Ne !== t) && ((Ti = null), dn(e, t)), (t = !1));
    var h = ke;
    e: do
      try {
        if (Re !== 0 && xe !== null) {
          var x = xe,
            w = At;
          switch (Re) {
            case 8:
              (fo(), (h = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ct.current === null && (t = !0);
              var z = Re;
              if (((Re = 0), (At = null), hn(e, x, w, z), a && on)) {
                h = 0;
                break e;
              }
              break;
            default:
              ((z = Re), (Re = 0), (At = null), hn(e, x, w, z));
          }
        }
        (lb(), (h = ke));
        break;
      } catch (Y) {
        Ch(e, Y);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (ul = ma = null),
      (Ce = s),
      (M.H = r),
      (M.A = c),
      xe === null && ((ze = null), (Ne = 0), $s()),
      h
    );
  }
  function lb() {
    for (; xe !== null; ) Oh(xe);
  }
  function ab(e, t) {
    var a = Ce;
    Ce |= 2;
    var s = Ah(),
      r = Rh();
    ze !== e || Ne !== t
      ? ((Ti = null), (Ci = Nt() + 500), dn(e, t))
      : (on = Rn(e, t));
    e: do
      try {
        if (Re !== 0 && xe !== null) {
          t = xe;
          var c = At;
          t: switch (Re) {
            case 1:
              ((Re = 0), (At = null), hn(e, t, c, 1));
              break;
            case 2:
            case 9:
              if (Yf(c)) {
                ((Re = 0), (At = null), Dh(t));
                break;
              }
              ((t = function () {
                ((Re !== 2 && Re !== 9) || ze !== e || (Re = 7), el(e));
              }),
                c.then(t, t));
              break e;
            case 3:
              Re = 7;
              break e;
            case 4:
              Re = 5;
              break e;
            case 7:
              Yf(c)
                ? ((Re = 0), (At = null), Dh(t))
                : ((Re = 0), (At = null), hn(e, t, c, 7));
              break;
            case 5:
              var h = null;
              switch (xe.tag) {
                case 26:
                  h = xe.memoizedState;
                case 5:
                case 27:
                  var x = xe;
                  if (h ? bm(h) : x.stateNode.complete) {
                    ((Re = 0), (At = null));
                    var w = x.sibling;
                    if (w !== null) xe = w;
                    else {
                      var z = x.return;
                      z !== null ? ((xe = z), Oi(z)) : (xe = null);
                    }
                    break t;
                  }
              }
              ((Re = 0), (At = null), hn(e, t, c, 5));
              break;
            case 6:
              ((Re = 0), (At = null), hn(e, t, c, 6));
              break;
            case 8:
              (fo(), (ke = 6));
              break e;
            default:
              throw Error(u(462));
          }
        }
        nb();
        break;
      } catch (Y) {
        Ch(e, Y);
      }
    while (!0);
    return (
      (ul = ma = null),
      (M.H = s),
      (M.A = r),
      (Ce = a),
      xe !== null ? 0 : ((ze = null), (Ne = 0), $s(), ke)
    );
  }
  function nb() {
    for (; xe !== null && !Cy(); ) Oh(xe);
  }
  function Oh(e) {
    var t = th(e.alternate, e, gl);
    ((e.memoizedProps = e.pendingProps), t === null ? Oi(e) : (xe = t));
  }
  function Dh(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Jd(a, t, t.pendingProps, t.type, void 0, Ne);
        break;
      case 11:
        t = Jd(a, t, t.pendingProps, t.type.render, t.ref, Ne);
        break;
      case 5:
        Cu(t);
      default:
        (ah(a, t), (t = xe = Rf(t, gl)), (t = th(a, t, gl)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Oi(e) : (xe = t));
  }
  function hn(e, t, a, s) {
    ((ul = ma = null), Cu(t), (tn = null), (Zn = 0));
    var r = t.return;
    try {
      if (V0(e, r, t, a, Ne)) {
        ((ke = 1), gi(e, zt(a, e.current)), (xe = null));
        return;
      }
    } catch (c) {
      if (r !== null) throw ((xe = r), c);
      ((ke = 1), gi(e, zt(a, e.current)), (xe = null));
      return;
    }
    t.flags & 32768
      ? (Ee || s === 1
          ? (e = !0)
          : on || (Ne & 536870912) !== 0
            ? (e = !1)
            : ((Kl = e = !0),
              (s === 2 || s === 9 || s === 3 || s === 6) &&
                ((s = Ct.current),
                s !== null && s.tag === 13 && (s.flags |= 16384))),
        Mh(t, e))
      : Oi(t);
  }
  function Oi(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Mh(t, Kl);
        return;
      }
      e = t.return;
      var a = J0(t.alternate, t, gl);
      if (a !== null) {
        xe = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        xe = t;
        return;
      }
      xe = t = e;
    } while (t !== null);
    ke === 0 && (ke = 5);
  }
  function Mh(e, t) {
    do {
      var a = $0(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (xe = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        xe = e;
        return;
      }
      xe = e = a;
    } while (e !== null);
    ((ke = 6), (xe = null));
  }
  function Uh(e, t, a, s, r, c, h, x, w) {
    e.cancelPendingCommit = null;
    do Di();
    while (We !== 0);
    if ((Ce & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= eu),
        qy(e, a, c, h, x, w),
        e === ze && ((xe = ze = null), (Ne = 0)),
        (fn = t),
        (Zl = e),
        (vl = a),
        (uo = c),
        (oo = r),
        (jh = s),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            ub(Us, function () {
              return (Hh(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (s = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || s)
      ) {
        ((s = M.T), (M.T = null), (r = J.p), (J.p = 2), (h = Ce), (Ce |= 4));
        try {
          P0(e, t, a);
        } finally {
          ((Ce = h), (J.p = r), (M.T = s));
        }
      }
      ((We = 1), zh(), Bh(), qh());
    }
  }
  function zh() {
    if (We === 1) {
      We = 0;
      var e = Zl,
        t = fn,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = M.T), (M.T = null));
        var s = J.p;
        J.p = 2;
        var r = Ce;
        Ce |= 4;
        try {
          ph(t, e);
          var c = wo,
            h = Sf(e.containerInfo),
            x = c.focusedElem,
            w = c.selectionRange;
          if (
            h !== x &&
            x &&
            x.ownerDocument &&
            xf(x.ownerDocument.documentElement, x)
          ) {
            if (w !== null && Jr(x)) {
              var z = w.start,
                Y = w.end;
              if ((Y === void 0 && (Y = z), "selectionStart" in x))
                ((x.selectionStart = z),
                  (x.selectionEnd = Math.min(Y, x.value.length)));
              else {
                var X = x.ownerDocument || document,
                  B = (X && X.defaultView) || window;
                if (B.getSelection) {
                  var H = B.getSelection(),
                    te = x.textContent.length,
                    ue = Math.min(w.start, te),
                    Ue = w.end === void 0 ? ue : Math.min(w.end, te);
                  !H.extend && ue > Ue && ((h = Ue), (Ue = ue), (ue = h));
                  var O = vf(x, ue),
                    C = vf(x, Ue);
                  if (
                    O &&
                    C &&
                    (H.rangeCount !== 1 ||
                      H.anchorNode !== O.node ||
                      H.anchorOffset !== O.offset ||
                      H.focusNode !== C.node ||
                      H.focusOffset !== C.offset)
                  ) {
                    var U = X.createRange();
                    (U.setStart(O.node, O.offset),
                      H.removeAllRanges(),
                      ue > Ue
                        ? (H.addRange(U), H.extend(C.node, C.offset))
                        : (U.setEnd(C.node, C.offset), H.addRange(U)));
                  }
                }
              }
            }
            for (X = [], H = x; (H = H.parentNode); )
              H.nodeType === 1 &&
                X.push({ element: H, left: H.scrollLeft, top: H.scrollTop });
            for (
              typeof x.focus == "function" && x.focus(), x = 0;
              x < X.length;
              x++
            ) {
              var G = X[x];
              ((G.element.scrollLeft = G.left), (G.element.scrollTop = G.top));
            }
          }
          ((Ki = !!Eo), (wo = Eo = null));
        } finally {
          ((Ce = r), (J.p = s), (M.T = a));
        }
      }
      ((e.current = t), (We = 2));
    }
  }
  function Bh() {
    if (We === 2) {
      We = 0;
      var e = Zl,
        t = fn,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = M.T), (M.T = null));
        var s = J.p;
        J.p = 2;
        var r = Ce;
        Ce |= 4;
        try {
          ch(e, t.alternate, t);
        } finally {
          ((Ce = r), (J.p = s), (M.T = a));
        }
      }
      We = 3;
    }
  }
  function qh() {
    if (We === 4 || We === 3) {
      ((We = 0), Ty());
      var e = Zl,
        t = fn,
        a = vl,
        s = jh;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (We = 5)
        : ((We = 0), (fn = Zl = null), Lh(e, e.pendingLanes));
      var r = e.pendingLanes;
      if (
        (r === 0 && (Vl = null),
        Rr(a),
        (t = t.stateNode),
        jt && typeof jt.onCommitFiberRoot == "function")
      )
        try {
          jt.onCommitFiberRoot(An, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (s !== null) {
        ((t = M.T), (r = J.p), (J.p = 2), (M.T = null));
        try {
          for (var c = e.onRecoverableError, h = 0; h < s.length; h++) {
            var x = s[h];
            c(x.value, { componentStack: x.stack });
          }
        } finally {
          ((M.T = t), (J.p = r));
        }
      }
      ((vl & 3) !== 0 && Di(),
        el(e),
        (r = e.pendingLanes),
        (a & 261930) !== 0 && (r & 42) !== 0
          ? e === co
            ? cs++
            : ((cs = 0), (co = e))
          : (cs = 0),
        fs(0));
    }
  }
  function Lh(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Xn(t)));
  }
  function Di() {
    return (zh(), Bh(), qh(), Hh());
  }
  function Hh() {
    if (We !== 5) return !1;
    var e = Zl,
      t = uo;
    uo = 0;
    var a = Rr(vl),
      s = M.T,
      r = J.p;
    try {
      ((J.p = 32 > a ? 32 : a), (M.T = null), (a = oo), (oo = null));
      var c = Zl,
        h = vl;
      if (((We = 0), (fn = Zl = null), (vl = 0), (Ce & 6) !== 0))
        throw Error(u(331));
      var x = Ce;
      if (
        ((Ce |= 4),
        xh(c.current),
        bh(c, c.current, h, a),
        (Ce = x),
        fs(0, !1),
        jt && typeof jt.onPostCommitFiberRoot == "function")
      )
        try {
          jt.onPostCommitFiberRoot(An, c);
        } catch {}
      return !0;
    } finally {
      ((J.p = r), (M.T = s), Lh(e, t));
    }
  }
  function Qh(e, t, a) {
    ((t = zt(a, t)),
      (t = Gu(e.stateNode, t, 2)),
      (e = Ql(e, t, 2)),
      e !== null && (On(e, 2), el(e)));
  }
  function Oe(e, t, a) {
    if (e.tag === 3) Qh(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Qh(t, e, a);
          break;
        } else if (t.tag === 1) {
          var s = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof s.componentDidCatch == "function" &&
              (Vl === null || !Vl.has(s)))
          ) {
            ((e = zt(a, e)),
              (a = Yd(2)),
              (s = Ql(t, a, 2)),
              s !== null && (Gd(a, s, t, e), On(s, 2), el(s)));
            break;
          }
        }
        t = t.return;
      }
  }
  function mo(e, t, a) {
    var s = e.pingCache;
    if (s === null) {
      s = e.pingCache = new eb();
      var r = new Set();
      s.set(t, r);
    } else ((r = s.get(t)), r === void 0 && ((r = new Set()), s.set(t, r)));
    r.has(a) ||
      ((so = !0), r.add(a), (e = sb.bind(null, e, t, a)), t.then(e, e));
  }
  function sb(e, t, a) {
    var s = e.pingCache;
    (s !== null && s.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      ze === e &&
        (Ne & a) === a &&
        (ke === 4 || (ke === 3 && (Ne & 62914560) === Ne && 300 > Nt() - _i)
          ? (Ce & 2) === 0 && dn(e, 0)
          : (io |= a),
        cn === Ne && (cn = 0)),
      el(e));
  }
  function Yh(e, t) {
    (t === 0 && (t = Uc()), (e = fa(e, t)), e !== null && (On(e, t), el(e)));
  }
  function ib(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), Yh(e, a));
  }
  function rb(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var s = e.stateNode,
          r = e.memoizedState;
        r !== null && (a = r.retryLane);
        break;
      case 19:
        s = e.stateNode;
        break;
      case 22:
        s = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    (s !== null && s.delete(t), Yh(e, a));
  }
  function ub(e, t) {
    return _r(e, t);
  }
  var Mi = null,
    mn = null,
    po = !1,
    Ui = !1,
    yo = !1,
    Jl = 0;
  function el(e) {
    (e !== mn &&
      e.next === null &&
      (mn === null ? (Mi = mn = e) : (mn = mn.next = e)),
      (Ui = !0),
      po || ((po = !0), cb()));
  }
  function fs(e, t) {
    if (!yo && Ui) {
      yo = !0;
      do
        for (var a = !1, s = Mi; s !== null; ) {
          if (e !== 0) {
            var r = s.pendingLanes;
            if (r === 0) var c = 0;
            else {
              var h = s.suspendedLanes,
                x = s.pingedLanes;
              ((c = (1 << (31 - Et(42 | e) + 1)) - 1),
                (c &= r & ~(h & ~x)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((a = !0), Xh(s, c));
          } else
            ((c = Ne),
              (c = Ls(
                s,
                s === ze ? c : 0,
                s.cancelPendingCommit !== null || s.timeoutHandle !== -1,
              )),
              (c & 3) === 0 || Rn(s, c) || ((a = !0), Xh(s, c)));
          s = s.next;
        }
      while (a);
      yo = !1;
    }
  }
  function ob() {
    Gh();
  }
  function Gh() {
    Ui = po = !1;
    var e = 0;
    Jl !== 0 && xb() && (e = Jl);
    for (var t = Nt(), a = null, s = Mi; s !== null; ) {
      var r = s.next,
        c = kh(s, t);
      (c === 0
        ? ((s.next = null),
          a === null ? (Mi = r) : (a.next = r),
          r === null && (mn = a))
        : ((a = s), (e !== 0 || (c & 3) !== 0) && (Ui = !0)),
        (s = r));
    }
    ((We !== 0 && We !== 5) || fs(e), Jl !== 0 && (Jl = 0));
  }
  function kh(e, t) {
    for (
      var a = e.suspendedLanes,
        s = e.pingedLanes,
        r = e.expirationTimes,
        c = e.pendingLanes & -62914561;
      0 < c;
    ) {
      var h = 31 - Et(c),
        x = 1 << h,
        w = r[h];
      (w === -1
        ? ((x & a) === 0 || (x & s) !== 0) && (r[h] = By(x, t))
        : w <= t && (e.expiredLanes |= x),
        (c &= ~x));
    }
    if (
      ((t = ze),
      (a = Ne),
      (a = Ls(
        e,
        e === t ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      (s = e.callbackNode),
      a === 0 ||
        (e === t && (Re === 2 || Re === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        s !== null && s !== null && Cr(s),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((a & 3) === 0 || Rn(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((s !== null && Cr(s), Rr(a))) {
        case 2:
        case 8:
          a = Dc;
          break;
        case 32:
          a = Us;
          break;
        case 268435456:
          a = Mc;
          break;
        default:
          a = Us;
      }
      return (
        (s = Kh.bind(null, e)),
        (a = _r(a, s)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      s !== null && s !== null && Cr(s),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Kh(e, t) {
    if (We !== 0 && We !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (Di() && e.callbackNode !== a) return null;
    var s = Ne;
    return (
      (s = Ls(
        e,
        e === ze ? s : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      s === 0
        ? null
        : (wh(e, s, t),
          kh(e, Nt()),
          e.callbackNode != null && e.callbackNode === a
            ? Kh.bind(null, e)
            : null)
    );
  }
  function Xh(e, t) {
    if (Di()) return null;
    wh(e, t, !0);
  }
  function cb() {
    Nb(function () {
      (Ce & 6) !== 0 ? _r(Oc, ob) : Gh();
    });
  }
  function bo() {
    if (Jl === 0) {
      var e = Wa;
      (e === 0 && ((e = zs), (zs <<= 1), (zs & 261888) === 0 && (zs = 256)),
        (Jl = e));
    }
    return Jl;
  }
  function Vh(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : Gs("" + e);
  }
  function Zh(e, t) {
    var a = t.ownerDocument.createElement("input");
    return (
      (a.name = t.name),
      (a.value = t.value),
      e.id && a.setAttribute("form", e.id),
      t.parentNode.insertBefore(a, t),
      (e = new FormData(e)),
      a.parentNode.removeChild(a),
      e
    );
  }
  function fb(e, t, a, s, r) {
    if (t === "submit" && a && a.stateNode === r) {
      var c = Vh((r[dt] || null).action),
        h = s.submitter;
      h &&
        ((t = (t = h[dt] || null)
          ? Vh(t.formAction)
          : h.getAttribute("formAction")),
        t !== null && ((c = t), (h = null)));
      var x = new Vs("action", "action", null, s, r);
      e.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (s.defaultPrevented) {
                if (Jl !== 0) {
                  var w = h ? Zh(r, h) : new FormData(r);
                  Bu(
                    a,
                    { pending: !0, data: w, method: r.method, action: c },
                    null,
                    w,
                  );
                }
              } else
                typeof c == "function" &&
                  (x.preventDefault(),
                  (w = h ? Zh(r, h) : new FormData(r)),
                  Bu(
                    a,
                    { pending: !0, data: w, method: r.method, action: c },
                    c,
                    w,
                  ));
            },
            currentTarget: r,
          },
        ],
      });
    }
  }
  for (var go = 0; go < Ir.length; go++) {
    var vo = Ir[go],
      db = vo.toLowerCase(),
      hb = vo[0].toUpperCase() + vo.slice(1);
    Kt(db, "on" + hb);
  }
  (Kt(Ef, "onAnimationEnd"),
    Kt(wf, "onAnimationIteration"),
    Kt(_f, "onAnimationStart"),
    Kt("dblclick", "onDoubleClick"),
    Kt("focusin", "onFocus"),
    Kt("focusout", "onBlur"),
    Kt(A0, "onTransitionRun"),
    Kt(R0, "onTransitionStart"),
    Kt(O0, "onTransitionCancel"),
    Kt(Cf, "onTransitionEnd"),
    La("onMouseEnter", ["mouseout", "mouseover"]),
    La("onMouseLeave", ["mouseout", "mouseover"]),
    La("onPointerEnter", ["pointerout", "pointerover"]),
    La("onPointerLeave", ["pointerout", "pointerover"]),
    ra(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    ra(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    ra("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    ra(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    ra(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    ra(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var ds =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    mb = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(ds),
    );
  function Fh(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var s = e[a],
        r = s.event;
      s = s.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var h = s.length - 1; 0 <= h; h--) {
            var x = s[h],
              w = x.instance,
              z = x.currentTarget;
            if (((x = x.listener), w !== c && r.isPropagationStopped()))
              break e;
            ((c = x), (r.currentTarget = z));
            try {
              c(r);
            } catch (Y) {
              Js(Y);
            }
            ((r.currentTarget = null), (c = w));
          }
        else
          for (h = 0; h < s.length; h++) {
            if (
              ((x = s[h]),
              (w = x.instance),
              (z = x.currentTarget),
              (x = x.listener),
              w !== c && r.isPropagationStopped())
            )
              break e;
            ((c = x), (r.currentTarget = z));
            try {
              c(r);
            } catch (Y) {
              Js(Y);
            }
            ((r.currentTarget = null), (c = w));
          }
      }
    }
  }
  function Se(e, t) {
    var a = t[Or];
    a === void 0 && (a = t[Or] = new Set());
    var s = e + "__bubble";
    a.has(s) || (Jh(t, e, 2, !1), a.add(s));
  }
  function xo(e, t, a) {
    var s = 0;
    (t && (s |= 4), Jh(a, e, s, t));
  }
  var zi = "_reactListening" + Math.random().toString(36).slice(2);
  function So(e) {
    if (!e[zi]) {
      ((e[zi] = !0),
        Yc.forEach(function (a) {
          a !== "selectionchange" && (mb.has(a) || xo(a, !1, e), xo(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[zi] || ((t[zi] = !0), xo("selectionchange", !1, t));
    }
  }
  function Jh(e, t, a, s) {
    switch (Em(t)) {
      case 2:
        var r = Gb;
        break;
      case 8:
        r = kb;
        break;
      default:
        r = Bo;
    }
    ((a = r.bind(null, t, a, e)),
      (r = void 0),
      !Qr ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (r = !0),
      s
        ? r !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: r })
          : e.addEventListener(t, a, !0)
        : r !== void 0
          ? e.addEventListener(t, a, { passive: r })
          : e.addEventListener(t, a, !1));
  }
  function No(e, t, a, s, r) {
    var c = s;
    if ((t & 1) === 0 && (t & 2) === 0 && s !== null)
      e: for (;;) {
        if (s === null) return;
        var h = s.tag;
        if (h === 3 || h === 4) {
          var x = s.stateNode.containerInfo;
          if (x === r) break;
          if (h === 4)
            for (h = s.return; h !== null; ) {
              var w = h.tag;
              if ((w === 3 || w === 4) && h.stateNode.containerInfo === r)
                return;
              h = h.return;
            }
          for (; x !== null; ) {
            if (((h = za(x)), h === null)) return;
            if (((w = h.tag), w === 5 || w === 6 || w === 26 || w === 27)) {
              s = c = h;
              continue e;
            }
            x = x.parentNode;
          }
        }
        s = s.return;
      }
    Ic(function () {
      var z = c,
        Y = Lr(a),
        X = [];
      e: {
        var B = Tf.get(e);
        if (B !== void 0) {
          var H = Vs,
            te = e;
          switch (e) {
            case "keypress":
              if (Ks(a) === 0) break e;
            case "keydown":
            case "keyup":
              H = r0;
              break;
            case "focusin":
              ((te = "focus"), (H = Kr));
              break;
            case "focusout":
              ((te = "blur"), (H = Kr));
              break;
            case "beforeblur":
            case "afterblur":
              H = Kr;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              H = lf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              H = Jy;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              H = c0;
              break;
            case Ef:
            case wf:
            case _f:
              H = Wy;
              break;
            case Cf:
              H = d0;
              break;
            case "scroll":
            case "scrollend":
              H = Zy;
              break;
            case "wheel":
              H = m0;
              break;
            case "copy":
            case "cut":
            case "paste":
              H = e0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              H = nf;
              break;
            case "toggle":
            case "beforetoggle":
              H = y0;
          }
          var ue = (t & 4) !== 0,
            Ue = !ue && (e === "scroll" || e === "scrollend"),
            O = ue ? (B !== null ? B + "Capture" : null) : B;
          ue = [];
          for (var C = z, U; C !== null; ) {
            var G = C;
            if (
              ((U = G.stateNode),
              (G = G.tag),
              (G !== 5 && G !== 26 && G !== 27) ||
                U === null ||
                O === null ||
                ((G = Un(C, O)), G != null && ue.push(hs(C, G, U))),
              Ue)
            )
              break;
            C = C.return;
          }
          0 < ue.length &&
            ((B = new H(B, te, null, a, Y)),
            X.push({ event: B, listeners: ue }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((B = e === "mouseover" || e === "pointerover"),
            (H = e === "mouseout" || e === "pointerout"),
            B &&
              a !== qr &&
              (te = a.relatedTarget || a.fromElement) &&
              (za(te) || te[Ua]))
          )
            break e;
          if (
            (H || B) &&
            ((B =
              Y.window === Y
                ? Y
                : (B = Y.ownerDocument)
                  ? B.defaultView || B.parentWindow
                  : window),
            H
              ? ((te = a.relatedTarget || a.toElement),
                (H = z),
                (te = te ? za(te) : null),
                te !== null &&
                  ((Ue = d(te)),
                  (ue = te.tag),
                  te !== Ue || (ue !== 5 && ue !== 27 && ue !== 6)) &&
                  (te = null))
              : ((H = null), (te = z)),
            H !== te)
          ) {
            if (
              ((ue = lf),
              (G = "onMouseLeave"),
              (O = "onMouseEnter"),
              (C = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ue = nf),
                (G = "onPointerLeave"),
                (O = "onPointerEnter"),
                (C = "pointer")),
              (Ue = H == null ? B : Mn(H)),
              (U = te == null ? B : Mn(te)),
              (B = new ue(G, C + "leave", H, a, Y)),
              (B.target = Ue),
              (B.relatedTarget = U),
              (G = null),
              za(Y) === z &&
                ((ue = new ue(O, C + "enter", te, a, Y)),
                (ue.target = U),
                (ue.relatedTarget = Ue),
                (G = ue)),
              (Ue = G),
              H && te)
            )
              t: {
                for (ue = pb, O = H, C = te, U = 0, G = O; G; G = ue(G)) U++;
                G = 0;
                for (var re = C; re; re = ue(re)) G++;
                for (; 0 < U - G; ) ((O = ue(O)), U--);
                for (; 0 < G - U; ) ((C = ue(C)), G--);
                for (; U--; ) {
                  if (O === C || (C !== null && O === C.alternate)) {
                    ue = O;
                    break t;
                  }
                  ((O = ue(O)), (C = ue(C)));
                }
                ue = null;
              }
            else ue = null;
            (H !== null && $h(X, B, H, ue, !1),
              te !== null && Ue !== null && $h(X, Ue, te, ue, !0));
          }
        }
        e: {
          if (
            ((B = z ? Mn(z) : window),
            (H = B.nodeName && B.nodeName.toLowerCase()),
            H === "select" || (H === "input" && B.type === "file"))
          )
            var we = hf;
          else if (ff(B))
            if (mf) we = _0;
            else {
              we = E0;
              var ae = j0;
            }
          else
            ((H = B.nodeName),
              !H ||
              H.toLowerCase() !== "input" ||
              (B.type !== "checkbox" && B.type !== "radio")
                ? z && Br(z.elementType) && (we = hf)
                : (we = w0));
          if (we && (we = we(e, z))) {
            df(X, we, a, Y);
            break e;
          }
          (ae && ae(e, B, z),
            e === "focusout" &&
              z &&
              B.type === "number" &&
              z.memoizedProps.value != null &&
              zr(B, "number", B.value));
        }
        switch (((ae = z ? Mn(z) : window), e)) {
          case "focusin":
            (ff(ae) || ae.contentEditable === "true") &&
              ((Ka = ae), ($r = z), (Gn = null));
            break;
          case "focusout":
            Gn = $r = Ka = null;
            break;
          case "mousedown":
            Pr = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Pr = !1), Nf(X, a, Y));
            break;
          case "selectionchange":
            if (T0) break;
          case "keydown":
          case "keyup":
            Nf(X, a, Y);
        }
        var ge;
        if (Vr)
          e: {
            switch (e) {
              case "compositionstart":
                var je = "onCompositionStart";
                break e;
              case "compositionend":
                je = "onCompositionEnd";
                break e;
              case "compositionupdate":
                je = "onCompositionUpdate";
                break e;
            }
            je = void 0;
          }
        else
          ka
            ? of(e, a) && (je = "onCompositionEnd")
            : e === "keydown" &&
              a.keyCode === 229 &&
              (je = "onCompositionStart");
        (je &&
          (sf &&
            a.locale !== "ko" &&
            (ka || je !== "onCompositionStart"
              ? je === "onCompositionEnd" && ka && (ge = ef())
              : ((Ml = Y),
                (Yr = "value" in Ml ? Ml.value : Ml.textContent),
                (ka = !0))),
          (ae = Bi(z, je)),
          0 < ae.length &&
            ((je = new af(je, e, null, a, Y)),
            X.push({ event: je, listeners: ae }),
            ge
              ? (je.data = ge)
              : ((ge = cf(a)), ge !== null && (je.data = ge)))),
          (ge = g0 ? v0(e, a) : x0(e, a)) &&
            ((je = Bi(z, "onBeforeInput")),
            0 < je.length &&
              ((ae = new af("onBeforeInput", "beforeinput", null, a, Y)),
              X.push({ event: ae, listeners: je }),
              (ae.data = ge))),
          fb(X, e, z, a, Y));
      }
      Fh(X, t);
    });
  }
  function hs(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function Bi(e, t) {
    for (var a = t + "Capture", s = []; e !== null; ) {
      var r = e,
        c = r.stateNode;
      if (
        ((r = r.tag),
        (r !== 5 && r !== 26 && r !== 27) ||
          c === null ||
          ((r = Un(e, a)),
          r != null && s.unshift(hs(e, r, c)),
          (r = Un(e, t)),
          r != null && s.push(hs(e, r, c))),
        e.tag === 3)
      )
        return s;
      e = e.return;
    }
    return [];
  }
  function pb(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function $h(e, t, a, s, r) {
    for (var c = t._reactName, h = []; a !== null && a !== s; ) {
      var x = a,
        w = x.alternate,
        z = x.stateNode;
      if (((x = x.tag), w !== null && w === s)) break;
      ((x !== 5 && x !== 26 && x !== 27) ||
        z === null ||
        ((w = z),
        r
          ? ((z = Un(a, c)), z != null && h.unshift(hs(a, z, w)))
          : r || ((z = Un(a, c)), z != null && h.push(hs(a, z, w)))),
        (a = a.return));
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var yb = /\r\n?/g,
    bb = /\u0000|\uFFFD/g;
  function Ph(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        yb,
        `
`,
      )
      .replace(bb, "");
  }
  function Wh(e, t) {
    return ((t = Ph(t)), Ph(e) === t);
  }
  function Me(e, t, a, s, r, c) {
    switch (a) {
      case "children":
        typeof s == "string"
          ? t === "body" || (t === "textarea" && s === "") || Qa(e, s)
          : (typeof s == "number" || typeof s == "bigint") &&
            t !== "body" &&
            Qa(e, "" + s);
        break;
      case "className":
        Qs(e, "class", s);
        break;
      case "tabIndex":
        Qs(e, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Qs(e, a, s);
        break;
      case "style":
        Pc(e, s, c);
        break;
      case "data":
        if (t !== "object") {
          Qs(e, "data", s);
          break;
        }
      case "src":
      case "href":
        if (s === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (
          s == null ||
          typeof s == "function" ||
          typeof s == "symbol" ||
          typeof s == "boolean"
        ) {
          e.removeAttribute(a);
          break;
        }
        ((s = Gs("" + s)), e.setAttribute(a, s));
        break;
      case "action":
      case "formAction":
        if (typeof s == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof c == "function" &&
            (a === "formAction"
              ? (t !== "input" && Me(e, t, "name", r.name, r, null),
                Me(e, t, "formEncType", r.formEncType, r, null),
                Me(e, t, "formMethod", r.formMethod, r, null),
                Me(e, t, "formTarget", r.formTarget, r, null))
              : (Me(e, t, "encType", r.encType, r, null),
                Me(e, t, "method", r.method, r, null),
                Me(e, t, "target", r.target, r, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          e.removeAttribute(a);
          break;
        }
        ((s = Gs("" + s)), e.setAttribute(a, s));
        break;
      case "onClick":
        s != null && (e.onclick = nl);
        break;
      case "onScroll":
        s != null && Se("scroll", e);
        break;
      case "onScrollEnd":
        s != null && Se("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(u(61));
          if (((a = s.__html), a != null)) {
            if (r.children != null) throw Error(u(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "muted":
        e.muted = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          s == null ||
          typeof s == "function" ||
          typeof s == "boolean" ||
          typeof s == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((a = Gs("" + s)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        s != null && typeof s != "function" && typeof s != "symbol"
          ? e.setAttribute(a, "" + s)
          : e.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        s && typeof s != "function" && typeof s != "symbol"
          ? e.setAttribute(a, "")
          : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        s === !0
          ? e.setAttribute(a, "")
          : s !== !1 &&
              s != null &&
              typeof s != "function" &&
              typeof s != "symbol"
            ? e.setAttribute(a, s)
            : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        s != null &&
        typeof s != "function" &&
        typeof s != "symbol" &&
        !isNaN(s) &&
        1 <= s
          ? e.setAttribute(a, s)
          : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s)
          ? e.removeAttribute(a)
          : e.setAttribute(a, s);
        break;
      case "popover":
        (Se("beforetoggle", e), Se("toggle", e), Hs(e, "popover", s));
        break;
      case "xlinkActuate":
        al(e, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
        break;
      case "xlinkArcrole":
        al(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
        break;
      case "xlinkRole":
        al(e, "http://www.w3.org/1999/xlink", "xlink:role", s);
        break;
      case "xlinkShow":
        al(e, "http://www.w3.org/1999/xlink", "xlink:show", s);
        break;
      case "xlinkTitle":
        al(e, "http://www.w3.org/1999/xlink", "xlink:title", s);
        break;
      case "xlinkType":
        al(e, "http://www.w3.org/1999/xlink", "xlink:type", s);
        break;
      case "xmlBase":
        al(e, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
        break;
      case "xmlLang":
        al(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
        break;
      case "xmlSpace":
        al(e, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
        break;
      case "is":
        Hs(e, "is", s);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = Xy.get(a) || a), Hs(e, a, s));
    }
  }
  function jo(e, t, a, s, r, c) {
    switch (a) {
      case "style":
        Pc(e, s, c);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(u(61));
          if (((a = s.__html), a != null)) {
            if (r.children != null) throw Error(u(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof s == "string"
          ? Qa(e, s)
          : (typeof s == "number" || typeof s == "bigint") && Qa(e, "" + s);
        break;
      case "onScroll":
        s != null && Se("scroll", e);
        break;
      case "onScrollEnd":
        s != null && Se("scrollend", e);
        break;
      case "onClick":
        s != null && (e.onclick = nl);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Gc.hasOwnProperty(a))
          e: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((r = a.endsWith("Capture")),
              (t = a.slice(2, r ? a.length - 7 : void 0)),
              (c = e[dt] || null),
              (c = c != null ? c[a] : null),
              typeof c == "function" && e.removeEventListener(t, c, r),
              typeof s == "function")
            ) {
              (typeof c != "function" &&
                c !== null &&
                (a in e
                  ? (e[a] = null)
                  : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, s, r));
              break e;
            }
            a in e
              ? (e[a] = s)
              : s === !0
                ? e.setAttribute(a, "")
                : Hs(e, a, s);
          }
    }
  }
  function it(e, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Se("error", e), Se("load", e));
        var s = !1,
          r = !1,
          c;
        for (c in a)
          if (a.hasOwnProperty(c)) {
            var h = a[c];
            if (h != null)
              switch (c) {
                case "src":
                  s = !0;
                  break;
                case "srcSet":
                  r = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, t));
                default:
                  Me(e, t, c, h, a, null);
              }
          }
        (r && Me(e, t, "srcSet", a.srcSet, a, null),
          s && Me(e, t, "src", a.src, a, null));
        return;
      case "input":
        Se("invalid", e);
        var x = (c = h = r = null),
          w = null,
          z = null;
        for (s in a)
          if (a.hasOwnProperty(s)) {
            var Y = a[s];
            if (Y != null)
              switch (s) {
                case "name":
                  r = Y;
                  break;
                case "type":
                  h = Y;
                  break;
                case "checked":
                  w = Y;
                  break;
                case "defaultChecked":
                  z = Y;
                  break;
                case "value":
                  c = Y;
                  break;
                case "defaultValue":
                  x = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null) throw Error(u(137, t));
                  break;
                default:
                  Me(e, t, s, Y, a, null);
              }
          }
        Zc(e, c, x, w, z, h, r, !1);
        return;
      case "select":
        (Se("invalid", e), (s = h = c = null));
        for (r in a)
          if (a.hasOwnProperty(r) && ((x = a[r]), x != null))
            switch (r) {
              case "value":
                c = x;
                break;
              case "defaultValue":
                h = x;
                break;
              case "multiple":
                s = x;
              default:
                Me(e, t, r, x, a, null);
            }
        ((t = c),
          (a = h),
          (e.multiple = !!s),
          t != null ? Ha(e, !!s, t, !1) : a != null && Ha(e, !!s, a, !0));
        return;
      case "textarea":
        (Se("invalid", e), (c = r = s = null));
        for (h in a)
          if (a.hasOwnProperty(h) && ((x = a[h]), x != null))
            switch (h) {
              case "value":
                s = x;
                break;
              case "defaultValue":
                r = x;
                break;
              case "children":
                c = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(u(91));
                break;
              default:
                Me(e, t, h, x, a, null);
            }
        Jc(e, s, r, c);
        return;
      case "option":
        for (w in a)
          if (a.hasOwnProperty(w) && ((s = a[w]), s != null))
            switch (w) {
              case "selected":
                e.selected =
                  s && typeof s != "function" && typeof s != "symbol";
                break;
              default:
                Me(e, t, w, s, a, null);
            }
        return;
      case "dialog":
        (Se("beforetoggle", e),
          Se("toggle", e),
          Se("cancel", e),
          Se("close", e));
        break;
      case "iframe":
      case "object":
        Se("load", e);
        break;
      case "video":
      case "audio":
        for (s = 0; s < ds.length; s++) Se(ds[s], e);
        break;
      case "image":
        (Se("error", e), Se("load", e));
        break;
      case "details":
        Se("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (Se("error", e), Se("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in a)
          if (a.hasOwnProperty(z) && ((s = a[z]), s != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                Me(e, t, z, s, a, null);
            }
        return;
      default:
        if (Br(t)) {
          for (Y in a)
            a.hasOwnProperty(Y) &&
              ((s = a[Y]), s !== void 0 && jo(e, t, Y, s, a, void 0));
          return;
        }
    }
    for (x in a)
      a.hasOwnProperty(x) && ((s = a[x]), s != null && Me(e, t, x, s, a, null));
  }
  function gb(e, t, a, s) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var r = null,
          c = null,
          h = null,
          x = null,
          w = null,
          z = null,
          Y = null;
        for (H in a) {
          var X = a[H];
          if (a.hasOwnProperty(H) && X != null)
            switch (H) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                w = X;
              default:
                s.hasOwnProperty(H) || Me(e, t, H, null, s, X);
            }
        }
        for (var B in s) {
          var H = s[B];
          if (((X = a[B]), s.hasOwnProperty(B) && (H != null || X != null)))
            switch (B) {
              case "type":
                c = H;
                break;
              case "name":
                r = H;
                break;
              case "checked":
                z = H;
                break;
              case "defaultChecked":
                Y = H;
                break;
              case "value":
                h = H;
                break;
              case "defaultValue":
                x = H;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null) throw Error(u(137, t));
                break;
              default:
                H !== X && Me(e, t, B, H, s, X);
            }
        }
        Ur(e, h, x, w, z, Y, c, r);
        return;
      case "select":
        H = h = x = B = null;
        for (c in a)
          if (((w = a[c]), a.hasOwnProperty(c) && w != null))
            switch (c) {
              case "value":
                break;
              case "multiple":
                H = w;
              default:
                s.hasOwnProperty(c) || Me(e, t, c, null, s, w);
            }
        for (r in s)
          if (
            ((c = s[r]),
            (w = a[r]),
            s.hasOwnProperty(r) && (c != null || w != null))
          )
            switch (r) {
              case "value":
                B = c;
                break;
              case "defaultValue":
                x = c;
                break;
              case "multiple":
                h = c;
              default:
                c !== w && Me(e, t, r, c, s, w);
            }
        ((t = x),
          (a = h),
          (s = H),
          B != null
            ? Ha(e, !!a, B, !1)
            : !!s != !!a &&
              (t != null ? Ha(e, !!a, t, !0) : Ha(e, !!a, a ? [] : "", !1)));
        return;
      case "textarea":
        H = B = null;
        for (x in a)
          if (
            ((r = a[x]),
            a.hasOwnProperty(x) && r != null && !s.hasOwnProperty(x))
          )
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Me(e, t, x, null, s, r);
            }
        for (h in s)
          if (
            ((r = s[h]),
            (c = a[h]),
            s.hasOwnProperty(h) && (r != null || c != null))
          )
            switch (h) {
              case "value":
                B = r;
                break;
              case "defaultValue":
                H = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(u(91));
                break;
              default:
                r !== c && Me(e, t, h, r, s, c);
            }
        Fc(e, B, H);
        return;
      case "option":
        for (var te in a)
          if (
            ((B = a[te]),
            a.hasOwnProperty(te) && B != null && !s.hasOwnProperty(te))
          )
            switch (te) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Me(e, t, te, null, s, B);
            }
        for (w in s)
          if (
            ((B = s[w]),
            (H = a[w]),
            s.hasOwnProperty(w) && B !== H && (B != null || H != null))
          )
            switch (w) {
              case "selected":
                e.selected =
                  B && typeof B != "function" && typeof B != "symbol";
                break;
              default:
                Me(e, t, w, B, s, H);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ue in a)
          ((B = a[ue]),
            a.hasOwnProperty(ue) &&
              B != null &&
              !s.hasOwnProperty(ue) &&
              Me(e, t, ue, null, s, B));
        for (z in s)
          if (
            ((B = s[z]),
            (H = a[z]),
            s.hasOwnProperty(z) && B !== H && (B != null || H != null))
          )
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null) throw Error(u(137, t));
                break;
              default:
                Me(e, t, z, B, s, H);
            }
        return;
      default:
        if (Br(t)) {
          for (var Ue in a)
            ((B = a[Ue]),
              a.hasOwnProperty(Ue) &&
                B !== void 0 &&
                !s.hasOwnProperty(Ue) &&
                jo(e, t, Ue, void 0, s, B));
          for (Y in s)
            ((B = s[Y]),
              (H = a[Y]),
              !s.hasOwnProperty(Y) ||
                B === H ||
                (B === void 0 && H === void 0) ||
                jo(e, t, Y, B, s, H));
          return;
        }
    }
    for (var O in a)
      ((B = a[O]),
        a.hasOwnProperty(O) &&
          B != null &&
          !s.hasOwnProperty(O) &&
          Me(e, t, O, null, s, B));
    for (X in s)
      ((B = s[X]),
        (H = a[X]),
        !s.hasOwnProperty(X) ||
          B === H ||
          (B == null && H == null) ||
          Me(e, t, X, B, s, H));
  }
  function Ih(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function vb() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType("resource"), s = 0;
        s < a.length;
        s++
      ) {
        var r = a[s],
          c = r.transferSize,
          h = r.initiatorType,
          x = r.duration;
        if (c && x && Ih(h)) {
          for (h = 0, x = r.responseEnd, s += 1; s < a.length; s++) {
            var w = a[s],
              z = w.startTime;
            if (z > x) break;
            var Y = w.transferSize,
              X = w.initiatorType;
            Y &&
              Ih(X) &&
              ((w = w.responseEnd), (h += Y * (w < x ? 1 : (x - z) / (w - z))));
          }
          if ((--s, (t += (8 * (c + h)) / (r.duration / 1e3)), e++, 10 < e))
            break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection &&
      ((e = navigator.connection.downlink), typeof e == "number")
      ? e
      : 5;
  }
  var Eo = null,
    wo = null;
  function qi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function em(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function tm(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function _o(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Co = null;
  function xb() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === Co
        ? !1
        : ((Co = e), !0)
      : ((Co = null), !1);
  }
  var lm = typeof setTimeout == "function" ? setTimeout : void 0,
    Sb = typeof clearTimeout == "function" ? clearTimeout : void 0,
    am = typeof Promise == "function" ? Promise : void 0,
    Nb =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof am < "u"
          ? function (e) {
              return am.resolve(null).then(e).catch(jb);
            }
          : lm;
  function jb(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function $l(e) {
    return e === "head";
  }
  function nm(e, t) {
    var a = t,
      s = 0;
    do {
      var r = a.nextSibling;
      if ((e.removeChild(a), r && r.nodeType === 8))
        if (((a = r.data), a === "/$" || a === "/&")) {
          if (s === 0) {
            (e.removeChild(r), gn(t));
            return;
          }
          s--;
        } else if (
          a === "$" ||
          a === "$?" ||
          a === "$~" ||
          a === "$!" ||
          a === "&"
        )
          s++;
        else if (a === "html") ms(e.ownerDocument.documentElement);
        else if (a === "head") {
          ((a = e.ownerDocument.head), ms(a));
          for (var c = a.firstChild; c; ) {
            var h = c.nextSibling,
              x = c.nodeName;
            (c[Dn] ||
              x === "SCRIPT" ||
              x === "STYLE" ||
              (x === "LINK" && c.rel.toLowerCase() === "stylesheet") ||
              a.removeChild(c),
              (c = h));
          }
        } else a === "body" && ms(e.ownerDocument.body);
      a = r;
    } while (a);
    gn(t);
  }
  function sm(e, t) {
    var a = e;
    e = 0;
    do {
      var s = a.nextSibling;
      if (
        (a.nodeType === 1
          ? t
            ? ((a._stashedDisplay = a.style.display),
              (a.style.display = "none"))
            : ((a.style.display = a._stashedDisplay || ""),
              a.getAttribute("style") === "" && a.removeAttribute("style"))
          : a.nodeType === 3 &&
            (t
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ""))
              : (a.nodeValue = a._stashedText || "")),
        s && s.nodeType === 8)
      )
        if (((a = s.data), a === "/$")) {
          if (e === 0) break;
          e--;
        } else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || e++;
      a = s;
    } while (a);
  }
  function To(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (To(a), Dr(a));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function Eb(e, t, a, s) {
    for (; e.nodeType === 1; ) {
      var r = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!s && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (s) {
        if (!e[Dn])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((c = e.getAttribute("rel")),
                c === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                c !== r.rel ||
                e.getAttribute("href") !==
                  (r.href == null || r.href === "" ? null : r.href) ||
                e.getAttribute("crossorigin") !==
                  (r.crossOrigin == null ? null : r.crossOrigin) ||
                e.getAttribute("title") !== (r.title == null ? null : r.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((c = e.getAttribute("src")),
                (c !== (r.src == null ? null : r.src) ||
                  e.getAttribute("type") !== (r.type == null ? null : r.type) ||
                  e.getAttribute("crossorigin") !==
                    (r.crossOrigin == null ? null : r.crossOrigin)) &&
                  c &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = r.name == null ? null : "" + r.name;
        if (r.type === "hidden" && e.getAttribute("name") === c) return e;
      } else return e;
      if (((e = Qt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function wb(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !a) ||
        ((e = Qt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function im(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !t) ||
        ((e = Qt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Ao(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ro(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState !== "loading")
    );
  }
  function _b(e, t) {
    var a = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || a.readyState !== "loading") t();
    else {
      var s = function () {
        (t(), a.removeEventListener("DOMContentLoaded", s));
      };
      (a.addEventListener("DOMContentLoaded", s), (e._reactRetry = s));
    }
  }
  function Qt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Oo = null;
  function rm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0) return Qt(e.nextSibling);
          t--;
        } else
          (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") ||
            t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function um(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return e;
          t--;
        } else (a !== "/$" && a !== "/&") || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function om(e, t, a) {
    switch (((t = qi(a)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(u(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(u(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function ms(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Dr(e);
  }
  var Yt = new Map(),
    cm = new Set();
  function Li(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var xl = J.d;
  J.d = { f: Cb, r: Tb, D: Ab, C: Rb, L: Ob, m: Db, X: Ub, S: Mb, M: zb };
  function Cb() {
    var e = xl.f(),
      t = Ai();
    return e || t;
  }
  function Tb(e) {
    var t = Ba(e);
    t !== null && t.tag === 5 && t.type === "form" ? Cd(t) : xl.r(e);
  }
  var pn = typeof document > "u" ? null : document;
  function fm(e, t, a) {
    var s = pn;
    if (s && typeof t == "string" && t) {
      var r = Mt(t);
      ((r = 'link[rel="' + e + '"][href="' + r + '"]'),
        typeof a == "string" && (r += '[crossorigin="' + a + '"]'),
        cm.has(r) ||
          (cm.add(r),
          (e = { rel: e, crossOrigin: a, href: t }),
          s.querySelector(r) === null &&
            ((t = s.createElement("link")),
            it(t, "link", e),
            et(t),
            s.head.appendChild(t))));
    }
  }
  function Ab(e) {
    (xl.D(e), fm("dns-prefetch", e, null));
  }
  function Rb(e, t) {
    (xl.C(e, t), fm("preconnect", e, t));
  }
  function Ob(e, t, a) {
    xl.L(e, t, a);
    var s = pn;
    if (s && e && t) {
      var r = 'link[rel="preload"][as="' + Mt(t) + '"]';
      t === "image" && a && a.imageSrcSet
        ? ((r += '[imagesrcset="' + Mt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (r += '[imagesizes="' + Mt(a.imageSizes) + '"]'))
        : (r += '[href="' + Mt(e) + '"]');
      var c = r;
      switch (t) {
        case "style":
          c = yn(e);
          break;
        case "script":
          c = bn(e);
      }
      Yt.has(c) ||
        ((e = S(
          {
            rel: "preload",
            href: t === "image" && a && a.imageSrcSet ? void 0 : e,
            as: t,
          },
          a,
        )),
        Yt.set(c, e),
        s.querySelector(r) !== null ||
          (t === "style" && s.querySelector(ps(c))) ||
          (t === "script" && s.querySelector(ys(c))) ||
          ((t = s.createElement("link")),
          it(t, "link", e),
          et(t),
          s.head.appendChild(t)));
    }
  }
  function Db(e, t) {
    xl.m(e, t);
    var a = pn;
    if (a && e) {
      var s = t && typeof t.as == "string" ? t.as : "script",
        r =
          'link[rel="modulepreload"][as="' + Mt(s) + '"][href="' + Mt(e) + '"]',
        c = r;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = bn(e);
      }
      if (
        !Yt.has(c) &&
        ((e = S({ rel: "modulepreload", href: e }, t)),
        Yt.set(c, e),
        a.querySelector(r) === null)
      ) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(ys(c))) return;
        }
        ((s = a.createElement("link")),
          it(s, "link", e),
          et(s),
          a.head.appendChild(s));
      }
    }
  }
  function Mb(e, t, a) {
    xl.S(e, t, a);
    var s = pn;
    if (s && e) {
      var r = qa(s).hoistableStyles,
        c = yn(e);
      t = t || "default";
      var h = r.get(c);
      if (!h) {
        var x = { loading: 0, preload: null };
        if ((h = s.querySelector(ps(c)))) x.loading = 5;
        else {
          ((e = S({ rel: "stylesheet", href: e, "data-precedence": t }, a)),
            (a = Yt.get(c)) && Do(e, a));
          var w = (h = s.createElement("link"));
          (et(w),
            it(w, "link", e),
            (w._p = new Promise(function (z, Y) {
              ((w.onload = z), (w.onerror = Y));
            })),
            w.addEventListener("load", function () {
              x.loading |= 1;
            }),
            w.addEventListener("error", function () {
              x.loading |= 2;
            }),
            (x.loading |= 4),
            Hi(h, t, s));
        }
        ((h = { type: "stylesheet", instance: h, count: 1, state: x }),
          r.set(c, h));
      }
    }
  }
  function Ub(e, t) {
    xl.X(e, t);
    var a = pn;
    if (a && e) {
      var s = qa(a).hoistableScripts,
        r = bn(e),
        c = s.get(r);
      c ||
        ((c = a.querySelector(ys(r))),
        c ||
          ((e = S({ src: e, async: !0 }, t)),
          (t = Yt.get(r)) && Mo(e, t),
          (c = a.createElement("script")),
          et(c),
          it(c, "link", e),
          a.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        s.set(r, c));
    }
  }
  function zb(e, t) {
    xl.M(e, t);
    var a = pn;
    if (a && e) {
      var s = qa(a).hoistableScripts,
        r = bn(e),
        c = s.get(r);
      c ||
        ((c = a.querySelector(ys(r))),
        c ||
          ((e = S({ src: e, async: !0, type: "module" }, t)),
          (t = Yt.get(r)) && Mo(e, t),
          (c = a.createElement("script")),
          et(c),
          it(c, "link", e),
          a.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        s.set(r, c));
    }
  }
  function dm(e, t, a, s) {
    var r = (r = oe.current) ? Li(r) : null;
    if (!r) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((t = yn(a.href)),
            (a = qa(r).hoistableStyles),
            (s = a.get(t)),
            s ||
              ((s = { type: "style", instance: null, count: 0, state: null }),
              a.set(t, s)),
            s)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          e = yn(a.href);
          var c = qa(r).hoistableStyles,
            h = c.get(e);
          if (
            (h ||
              ((r = r.ownerDocument || r),
              (h = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              c.set(e, h),
              (c = r.querySelector(ps(e))) &&
                !c._p &&
                ((h.instance = c), (h.state.loading = 5)),
              Yt.has(e) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                Yt.set(e, a),
                c || Bb(r, e, a, h.state))),
            t && s === null)
          )
            throw Error(u(528, ""));
          return h;
        }
        if (t && s !== null) throw Error(u(529, ""));
        return null;
      case "script":
        return (
          (t = a.async),
          (a = a.src),
          typeof a == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = bn(a)),
              (a = qa(r).hoistableScripts),
              (s = a.get(t)),
              s ||
                ((s = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(t, s)),
              s)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(u(444, e));
    }
  }
  function yn(e) {
    return 'href="' + Mt(e) + '"';
  }
  function ps(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function hm(e) {
    return S({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function Bb(e, t, a, s) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (s.loading = 1)
      : ((t = e.createElement("link")),
        (s.preload = t),
        t.addEventListener("load", function () {
          return (s.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (s.loading |= 2);
        }),
        it(t, "link", a),
        et(t),
        e.head.appendChild(t));
  }
  function bn(e) {
    return '[src="' + Mt(e) + '"]';
  }
  function ys(e) {
    return "script[async]" + e;
  }
  function mm(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var s = e.querySelector('style[data-href~="' + Mt(a.href) + '"]');
          if (s) return ((t.instance = s), et(s), s);
          var r = S({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (s = (e.ownerDocument || e).createElement("style")),
            et(s),
            it(s, "style", r),
            Hi(s, a.precedence, e),
            (t.instance = s)
          );
        case "stylesheet":
          r = yn(a.href);
          var c = e.querySelector(ps(r));
          if (c) return ((t.state.loading |= 4), (t.instance = c), et(c), c);
          ((s = hm(a)),
            (r = Yt.get(r)) && Do(s, r),
            (c = (e.ownerDocument || e).createElement("link")),
            et(c));
          var h = c;
          return (
            (h._p = new Promise(function (x, w) {
              ((h.onload = x), (h.onerror = w));
            })),
            it(c, "link", s),
            (t.state.loading |= 4),
            Hi(c, a.precedence, e),
            (t.instance = c)
          );
        case "script":
          return (
            (c = bn(a.src)),
            (r = e.querySelector(ys(c)))
              ? ((t.instance = r), et(r), r)
              : ((s = a),
                (r = Yt.get(c)) && ((s = S({}, a)), Mo(s, r)),
                (e = e.ownerDocument || e),
                (r = e.createElement("script")),
                et(r),
                it(r, "link", s),
                e.head.appendChild(r),
                (t.instance = r))
          );
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((s = t.instance), (t.state.loading |= 4), Hi(s, a.precedence, e));
    return t.instance;
  }
  function Hi(e, t, a) {
    for (
      var s = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        r = s.length ? s[s.length - 1] : null,
        c = r,
        h = 0;
      h < s.length;
      h++
    ) {
      var x = s[h];
      if (x.dataset.precedence === t) c = x;
      else if (c !== r) break;
    }
    c
      ? c.parentNode.insertBefore(e, c.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function Do(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Mo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Qi = null;
  function pm(e, t, a) {
    if (Qi === null) {
      var s = new Map(),
        r = (Qi = new Map());
      r.set(a, s);
    } else ((r = Qi), (s = r.get(a)), s || ((s = new Map()), r.set(a, s)));
    if (s.has(e)) return s;
    for (
      s.set(e, null), a = a.getElementsByTagName(e), r = 0;
      r < a.length;
      r++
    ) {
      var c = a[r];
      if (
        !(
          c[Dn] ||
          c[lt] ||
          (e === "link" && c.getAttribute("rel") === "stylesheet")
        ) &&
        c.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var h = c.getAttribute(t) || "";
        h = e + h;
        var x = s.get(h);
        x ? x.push(c) : s.set(h, [c]);
      }
    }
    return s;
  }
  function ym(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        a,
        t === "title" ? e.querySelector("head > title") : null,
      ));
  }
  function qb(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled),
              typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function bm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Lb(e, t, a, s) {
    if (
      a.type === "stylesheet" &&
      (typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var r = yn(s.href),
          c = t.querySelector(ps(r));
        if (c) {
          ((t = c._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (e.count++, (e = Yi.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = c),
            et(c));
          return;
        }
        ((c = t.ownerDocument || t),
          (s = hm(s)),
          (r = Yt.get(r)) && Do(s, r),
          (c = c.createElement("link")),
          et(c));
        var h = c;
        ((h._p = new Promise(function (x, w) {
          ((h.onload = x), (h.onerror = w));
        })),
          it(c, "link", s),
          (a.instance = c));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = Yi.bind(e)),
          t.addEventListener("load", a),
          t.addEventListener("error", a)));
    }
  }
  var Uo = 0;
  function Hb(e, t) {
    return (
      e.stylesheets && e.count === 0 && ki(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var s = setTimeout(function () {
              if ((e.stylesheets && ki(e, e.stylesheets), e.unsuspend)) {
                var c = e.unsuspend;
                ((e.unsuspend = null), c());
              }
            }, 6e4 + t);
            0 < e.imgBytes && Uo === 0 && (Uo = 62500 * vb());
            var r = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 &&
                    (e.stylesheets && ki(e, e.stylesheets), e.unsuspend))
                ) {
                  var c = e.unsuspend;
                  ((e.unsuspend = null), c());
                }
              },
              (e.imgBytes > Uo ? 50 : 800) + t,
            );
            return (
              (e.unsuspend = a),
              function () {
                ((e.unsuspend = null), clearTimeout(s), clearTimeout(r));
              }
            );
          }
        : null
    );
  }
  function Yi() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) ki(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Gi = null;
  function ki(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Gi = new Map()),
        t.forEach(Qb, e),
        (Gi = null),
        Yi.call(e)));
  }
  function Qb(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Gi.get(e);
      if (a) var s = a.get(null);
      else {
        ((a = new Map()), Gi.set(e, a));
        for (
          var r = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            c = 0;
          c < r.length;
          c++
        ) {
          var h = r[c];
          (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") &&
            (a.set(h.dataset.precedence, h), (s = h));
        }
        s && a.set(null, s);
      }
      ((r = t.instance),
        (h = r.getAttribute("data-precedence")),
        (c = a.get(h) || s),
        c === s && a.set(null, r),
        a.set(h, r),
        this.count++,
        (s = Yi.bind(this)),
        r.addEventListener("load", s),
        r.addEventListener("error", s),
        c
          ? c.parentNode.insertBefore(r, c.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(r, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var bs = {
    $$typeof: q,
    Provider: null,
    Consumer: null,
    _currentValue: I,
    _currentValue2: I,
    _threadCount: 0,
  };
  function Yb(e, t, a, s, r, c, h, x, w) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Tr(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Tr(0)),
      (this.hiddenUpdates = Tr(null)),
      (this.identifierPrefix = s),
      (this.onUncaughtError = r),
      (this.onCaughtError = c),
      (this.onRecoverableError = h),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = w),
      (this.incompleteTransitions = new Map()));
  }
  function gm(e, t, a, s, r, c, h, x, w, z, Y, X) {
    return (
      (e = new Yb(e, t, a, h, w, z, Y, X, x)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = _t(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = du()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: s, isDehydrated: a, cache: t }),
      yu(c),
      e
    );
  }
  function vm(e) {
    return e ? ((e = Za), e) : Za;
  }
  function xm(e, t, a, s, r, c) {
    ((r = vm(r)),
      s.context === null ? (s.context = r) : (s.pendingContext = r),
      (s = Hl(t)),
      (s.payload = { element: a }),
      (c = c === void 0 ? null : c),
      c !== null && (s.callback = c),
      (a = Ql(e, s, t)),
      a !== null && (gt(a, e, t), Jn(a, e, t)));
  }
  function Sm(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function zo(e, t) {
    (Sm(e, t), (e = e.alternate) && Sm(e, t));
  }
  function Nm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = fa(e, 67108864);
      (t !== null && gt(t, e, 67108864), zo(e, 67108864));
    }
  }
  function jm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ot();
      t = Ar(t);
      var a = fa(e, t);
      (a !== null && gt(a, e, t), zo(e, t));
    }
  }
  var Ki = !0;
  function Gb(e, t, a, s) {
    var r = M.T;
    M.T = null;
    var c = J.p;
    try {
      ((J.p = 2), Bo(e, t, a, s));
    } finally {
      ((J.p = c), (M.T = r));
    }
  }
  function kb(e, t, a, s) {
    var r = M.T;
    M.T = null;
    var c = J.p;
    try {
      ((J.p = 8), Bo(e, t, a, s));
    } finally {
      ((J.p = c), (M.T = r));
    }
  }
  function Bo(e, t, a, s) {
    if (Ki) {
      var r = qo(s);
      if (r === null) (No(e, t, s, Xi, a), wm(e, s));
      else if (Xb(r, e, t, a, s)) s.stopPropagation();
      else if ((wm(e, s), t & 4 && -1 < Kb.indexOf(e))) {
        for (; r !== null; ) {
          var c = Ba(r);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var h = ia(c.pendingLanes);
                  if (h !== 0) {
                    var x = c;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; h; ) {
                      var w = 1 << (31 - Et(h));
                      ((x.entanglements[1] |= w), (h &= ~w));
                    }
                    (el(c), (Ce & 6) === 0 && ((Ci = Nt() + 500), fs(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((x = fa(c, 2)), x !== null && gt(x, c, 2), Ai(), zo(c, 2));
            }
          if (((c = qo(s)), c === null && No(e, t, s, Xi, a), c === r)) break;
          r = c;
        }
        r !== null && s.stopPropagation();
      } else No(e, t, s, null, a);
    }
  }
  function qo(e) {
    return ((e = Lr(e)), Lo(e));
  }
  var Xi = null;
  function Lo(e) {
    if (((Xi = null), (e = za(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = m(t)), e !== null)) return e;
          e = null;
        } else if (a === 31) {
          if (((e = p(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Xi = e), null);
  }
  function Em(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Ay()) {
          case Oc:
            return 2;
          case Dc:
            return 8;
          case Us:
          case Ry:
            return 32;
          case Mc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ho = !1,
    Pl = null,
    Wl = null,
    Il = null,
    gs = new Map(),
    vs = new Map(),
    ea = [],
    Kb =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function wm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Pl = null;
        break;
      case "dragenter":
      case "dragleave":
        Wl = null;
        break;
      case "mouseover":
      case "mouseout":
        Il = null;
        break;
      case "pointerover":
      case "pointerout":
        gs.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        vs.delete(t.pointerId);
    }
  }
  function xs(e, t, a, s, r, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: s,
          nativeEvent: c,
          targetContainers: [r],
        }),
        t !== null && ((t = Ba(t)), t !== null && Nm(t)),
        e)
      : ((e.eventSystemFlags |= s),
        (t = e.targetContainers),
        r !== null && t.indexOf(r) === -1 && t.push(r),
        e);
  }
  function Xb(e, t, a, s, r) {
    switch (t) {
      case "focusin":
        return ((Pl = xs(Pl, e, t, a, s, r)), !0);
      case "dragenter":
        return ((Wl = xs(Wl, e, t, a, s, r)), !0);
      case "mouseover":
        return ((Il = xs(Il, e, t, a, s, r)), !0);
      case "pointerover":
        var c = r.pointerId;
        return (gs.set(c, xs(gs.get(c) || null, e, t, a, s, r)), !0);
      case "gotpointercapture":
        return (
          (c = r.pointerId),
          vs.set(c, xs(vs.get(c) || null, e, t, a, s, r)),
          !0
        );
    }
    return !1;
  }
  function _m(e) {
    var t = za(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = m(a)), t !== null)) {
            ((e.blockedOn = t),
              Hc(e.priority, function () {
                jm(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = p(a)), t !== null)) {
            ((e.blockedOn = t),
              Hc(e.priority, function () {
                jm(a);
              }));
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Vi(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = qo(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var s = new a.constructor(a.type, a);
        ((qr = s), a.target.dispatchEvent(s), (qr = null));
      } else return ((t = Ba(a)), t !== null && Nm(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function Cm(e, t, a) {
    Vi(e) && a.delete(t);
  }
  function Vb() {
    ((Ho = !1),
      Pl !== null && Vi(Pl) && (Pl = null),
      Wl !== null && Vi(Wl) && (Wl = null),
      Il !== null && Vi(Il) && (Il = null),
      gs.forEach(Cm),
      vs.forEach(Cm));
  }
  function Zi(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ho ||
        ((Ho = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, Vb)));
  }
  var Fi = null;
  function Tm(e) {
    Fi !== e &&
      ((Fi = e),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        Fi === e && (Fi = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            s = e[t + 1],
            r = e[t + 2];
          if (typeof s != "function") {
            if (Lo(s || a) === null) continue;
            break;
          }
          var c = Ba(a);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Bu(c, { pending: !0, data: r, method: a.method, action: s }, s, r));
        }
      }));
  }
  function gn(e) {
    function t(w) {
      return Zi(w, e);
    }
    (Pl !== null && Zi(Pl, e),
      Wl !== null && Zi(Wl, e),
      Il !== null && Zi(Il, e),
      gs.forEach(t),
      vs.forEach(t));
    for (var a = 0; a < ea.length; a++) {
      var s = ea[a];
      s.blockedOn === e && (s.blockedOn = null);
    }
    for (; 0 < ea.length && ((a = ea[0]), a.blockedOn === null); )
      (_m(a), a.blockedOn === null && ea.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (s = 0; s < a.length; s += 3) {
        var r = a[s],
          c = a[s + 1],
          h = r[dt] || null;
        if (typeof c == "function") h || Tm(a);
        else if (h) {
          var x = null;
          if (c && c.hasAttribute("formAction")) {
            if (((r = c), (h = c[dt] || null))) x = h.formAction;
            else if (Lo(r) !== null) continue;
          } else x = h.action;
          (typeof x == "function" ? (a[s + 1] = x) : (a.splice(s, 3), (s -= 3)),
            Tm(a));
        }
      }
  }
  function Am() {
    function e(c) {
      c.canIntercept &&
        c.info === "react-transition" &&
        c.intercept({
          handler: function () {
            return new Promise(function (h) {
              return (r = h);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      (r !== null && (r(), (r = null)), s || setTimeout(a, 20));
    }
    function a() {
      if (!s && !navigation.transition) {
        var c = navigation.currentEntry;
        c &&
          c.url != null &&
          navigation.navigate(c.url, {
            state: c.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var s = !1,
        r = null;
      return (
        navigation.addEventListener("navigate", e),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(a, 100),
        function () {
          ((s = !0),
            navigation.removeEventListener("navigate", e),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            r !== null && (r(), (r = null)));
        }
      );
    }
  }
  function Qo(e) {
    this._internalRoot = e;
  }
  ((Ji.prototype.render = Qo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(u(409));
      var a = t.current,
        s = Ot();
      xm(a, s, e, t, null, null);
    }),
    (Ji.prototype.unmount = Qo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (xm(e.current, 2, null, e, null, null), Ai(), (t[Ua] = null));
        }
      }));
  function Ji(e) {
    this._internalRoot = e;
  }
  Ji.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Lc();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < ea.length && t !== 0 && t < ea[a].priority; a++);
      (ea.splice(a, 0, e), a === 0 && _m(e));
    }
  };
  var Rm = l.version;
  if (Rm !== "19.2.0") throw Error(u(527, Rm, "19.2.0"));
  J.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(u(188))
        : ((e = Object.keys(e).join(",")), Error(u(268, e)));
    return (
      (e = y(t)),
      (e = e !== null ? v(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var Zb = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.2.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var $i = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!$i.isDisabled && $i.supportsFiber)
      try {
        ((An = $i.inject(Zb)), (jt = $i));
      } catch {}
  }
  return (
    (Ns.createRoot = function (e, t) {
      if (!o(e)) throw Error(u(299));
      var a = !1,
        s = "",
        r = qd,
        c = Ld,
        h = Hd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (s = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (r = t.onUncaughtError),
          t.onCaughtError !== void 0 && (c = t.onCaughtError),
          t.onRecoverableError !== void 0 && (h = t.onRecoverableError)),
        (t = gm(e, 1, !1, null, null, a, s, null, r, c, h, Am)),
        (e[Ua] = t.current),
        So(e),
        new Qo(t)
      );
    }),
    (Ns.hydrateRoot = function (e, t, a) {
      if (!o(e)) throw Error(u(299));
      var s = !1,
        r = "",
        c = qd,
        h = Ld,
        x = Hd,
        w = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (s = !0),
          a.identifierPrefix !== void 0 && (r = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (c = a.onUncaughtError),
          a.onCaughtError !== void 0 && (h = a.onCaughtError),
          a.onRecoverableError !== void 0 && (x = a.onRecoverableError),
          a.formState !== void 0 && (w = a.formState)),
        (t = gm(e, 1, !0, t, a ?? null, s, r, w, c, h, x, Am)),
        (t.context = vm(null)),
        (a = t.current),
        (s = Ot()),
        (s = Ar(s)),
        (r = Hl(s)),
        (r.callback = null),
        Ql(a, r, s),
        (a = s),
        (t.current.lanes = a),
        On(t, a),
        el(t),
        (e[Ua] = t.current),
        So(e),
        new Ji(t)
      );
    }),
    (Ns.version = "19.2.0"),
    Ns
  );
}
var Ym;
function ng() {
  if (Ym) return ko.exports;
  Ym = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (l) {
        console.error(l);
      }
  }
  return (n(), (ko.exports = ag()), ko.exports);
}
var sg = ng(),
  xn = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(n) {
      return (
        this.listeners.add(n),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(n), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  ig = {
    setTimeout: (n, l) => setTimeout(n, l),
    clearTimeout: (n) => clearTimeout(n),
    setInterval: (n, l) => setInterval(n, l),
    clearInterval: (n) => clearInterval(n),
  },
  rg = class {
    #e = ig;
    #t = !1;
    setTimeoutProvider(n) {
      this.#e = n;
    }
    setTimeout(n, l) {
      return this.#e.setTimeout(n, l);
    }
    clearTimeout(n) {
      this.#e.clearTimeout(n);
    }
    setInterval(n, l) {
      return this.#e.setInterval(n, l);
    }
    clearInterval(n) {
      this.#e.clearInterval(n);
    }
  },
  Ea = new rg();
function ug(n) {
  setTimeout(n, 0);
}
var Ta = typeof window > "u" || "Deno" in globalThis;
function ft() {}
function og(n, l) {
  return typeof n == "function" ? n(l) : n;
}
function tc(n) {
  return typeof n == "number" && n >= 0 && n !== 1 / 0;
}
function Sp(n, l) {
  return Math.max(n + (l || 0) - Date.now(), 0);
}
function la(n, l) {
  return typeof n == "function" ? n(l) : n;
}
function Gt(n, l) {
  return typeof n == "function" ? n(l) : n;
}
function Gm(n, l) {
  const {
    type: i = "all",
    exact: u,
    fetchStatus: o,
    predicate: d,
    queryKey: m,
    stale: p,
  } = n;
  if (m) {
    if (u) {
      if (l.queryHash !== pc(m, l.options)) return !1;
    } else if (!_s(l.queryKey, m)) return !1;
  }
  if (i !== "all") {
    const b = l.isActive();
    if ((i === "active" && !b) || (i === "inactive" && b)) return !1;
  }
  return !(
    (typeof p == "boolean" && l.isStale() !== p) ||
    (o && o !== l.state.fetchStatus) ||
    (d && !d(l))
  );
}
function km(n, l) {
  const { exact: i, status: u, predicate: o, mutationKey: d } = n;
  if (d) {
    if (!l.options.mutationKey) return !1;
    if (i) {
      if (Aa(l.options.mutationKey) !== Aa(d)) return !1;
    } else if (!_s(l.options.mutationKey, d)) return !1;
  }
  return !((u && l.state.status !== u) || (o && !o(l)));
}
function pc(n, l) {
  return (l?.queryKeyHashFn || Aa)(n);
}
function Aa(n) {
  return JSON.stringify(n, (l, i) =>
    lc(i)
      ? Object.keys(i)
          .sort()
          .reduce((u, o) => ((u[o] = i[o]), u), {})
      : i,
  );
}
function _s(n, l) {
  return n === l
    ? !0
    : typeof n != typeof l
      ? !1
      : n && l && typeof n == "object" && typeof l == "object"
        ? Object.keys(l).every((i) => _s(n[i], l[i]))
        : !1;
}
var cg = Object.prototype.hasOwnProperty;
function Np(n, l) {
  if (n === l) return n;
  const i = Km(n) && Km(l);
  if (!i && !(lc(n) && lc(l))) return l;
  const o = (i ? n : Object.keys(n)).length,
    d = i ? l : Object.keys(l),
    m = d.length,
    p = i ? new Array(m) : {};
  let b = 0;
  for (let y = 0; y < m; y++) {
    const v = i ? y : d[y],
      S = n[v],
      E = l[v];
    if (S === E) {
      ((p[v] = S), (i ? y < o : cg.call(n, v)) && b++);
      continue;
    }
    if (
      S === null ||
      E === null ||
      typeof S != "object" ||
      typeof E != "object"
    ) {
      p[v] = E;
      continue;
    }
    const T = Np(S, E);
    ((p[v] = T), T === S && b++);
  }
  return o === m && b === o ? n : p;
}
function sr(n, l) {
  if (!l || Object.keys(n).length !== Object.keys(l).length) return !1;
  for (const i in n) if (n[i] !== l[i]) return !1;
  return !0;
}
function Km(n) {
  return Array.isArray(n) && n.length === Object.keys(n).length;
}
function lc(n) {
  if (!Xm(n)) return !1;
  const l = n.constructor;
  if (l === void 0) return !0;
  const i = l.prototype;
  return !(
    !Xm(i) ||
    !i.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(n) !== Object.prototype
  );
}
function Xm(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}
function fg(n) {
  return new Promise((l) => {
    Ea.setTimeout(l, n);
  });
}
function ac(n, l, i) {
  return typeof i.structuralSharing == "function"
    ? i.structuralSharing(n, l)
    : i.structuralSharing !== !1
      ? Np(n, l)
      : l;
}
function dg(n, l, i = 0) {
  const u = [...n, l];
  return i && u.length > i ? u.slice(1) : u;
}
function hg(n, l, i = 0) {
  const u = [l, ...n];
  return i && u.length > i ? u.slice(0, -1) : u;
}
var yc = Symbol();
function jp(n, l) {
  return !n.queryFn && l?.initialPromise
    ? () => l.initialPromise
    : !n.queryFn || n.queryFn === yc
      ? () => Promise.reject(new Error(`Missing queryFn: '${n.queryHash}'`))
      : n.queryFn;
}
function Ep(n, l) {
  return typeof n == "function" ? n(...l) : !!n;
}
var mg = class extends xn {
    #e;
    #t;
    #l;
    constructor() {
      (super(),
        (this.#l = (n) => {
          if (!Ta && window.addEventListener) {
            const l = () => n();
            return (
              window.addEventListener("visibilitychange", l, !1),
              () => {
                window.removeEventListener("visibilitychange", l);
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#l);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(n) {
      ((this.#l = n),
        this.#t?.(),
        (this.#t = n((l) => {
          typeof l == "boolean" ? this.setFocused(l) : this.onFocus();
        })));
    }
    setFocused(n) {
      this.#e !== n && ((this.#e = n), this.onFocus());
    }
    onFocus() {
      const n = this.isFocused();
      this.listeners.forEach((l) => {
        l(n);
      });
    }
    isFocused() {
      return typeof this.#e == "boolean"
        ? this.#e
        : globalThis.document?.visibilityState !== "hidden";
    }
  },
  bc = new mg();
function nc() {
  let n, l;
  const i = new Promise((o, d) => {
    ((n = o), (l = d));
  });
  ((i.status = "pending"), i.catch(() => {}));
  function u(o) {
    (Object.assign(i, o), delete i.resolve, delete i.reject);
  }
  return (
    (i.resolve = (o) => {
      (u({ status: "fulfilled", value: o }), n(o));
    }),
    (i.reject = (o) => {
      (u({ status: "rejected", reason: o }), l(o));
    }),
    i
  );
}
var pg = ug;
function yg() {
  let n = [],
    l = 0,
    i = (p) => {
      p();
    },
    u = (p) => {
      p();
    },
    o = pg;
  const d = (p) => {
      l
        ? n.push(p)
        : o(() => {
            i(p);
          });
    },
    m = () => {
      const p = n;
      ((n = []),
        p.length &&
          o(() => {
            u(() => {
              p.forEach((b) => {
                i(b);
              });
            });
          }));
    };
  return {
    batch: (p) => {
      let b;
      l++;
      try {
        b = p();
      } finally {
        (l--, l || m());
      }
      return b;
    },
    batchCalls:
      (p) =>
      (...b) => {
        d(() => {
          p(...b);
        });
      },
    schedule: d,
    setNotifyFunction: (p) => {
      i = p;
    },
    setBatchNotifyFunction: (p) => {
      u = p;
    },
    setScheduler: (p) => {
      o = p;
    },
  };
}
var Ie = yg(),
  bg = class extends xn {
    #e = !0;
    #t;
    #l;
    constructor() {
      (super(),
        (this.#l = (n) => {
          if (!Ta && window.addEventListener) {
            const l = () => n(!0),
              i = () => n(!1);
            return (
              window.addEventListener("online", l, !1),
              window.addEventListener("offline", i, !1),
              () => {
                (window.removeEventListener("online", l),
                  window.removeEventListener("offline", i));
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#l);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(n) {
      ((this.#l = n), this.#t?.(), (this.#t = n(this.setOnline.bind(this))));
    }
    setOnline(n) {
      this.#e !== n &&
        ((this.#e = n),
        this.listeners.forEach((i) => {
          i(n);
        }));
    }
    isOnline() {
      return this.#e;
    }
  },
  ir = new bg();
function gg(n) {
  return Math.min(1e3 * 2 ** n, 3e4);
}
function wp(n) {
  return (n ?? "online") === "online" ? ir.isOnline() : !0;
}
var sc = class extends Error {
  constructor(n) {
    (super("CancelledError"),
      (this.revert = n?.revert),
      (this.silent = n?.silent));
  }
};
function _p(n) {
  let l = !1,
    i = 0,
    u;
  const o = nc(),
    d = () => o.status !== "pending",
    m = (j) => {
      if (!d()) {
        const g = new sc(j);
        (E(g), n.onCancel?.(g));
      }
    },
    p = () => {
      l = !0;
    },
    b = () => {
      l = !1;
    },
    y = () =>
      bc.isFocused() &&
      (n.networkMode === "always" || ir.isOnline()) &&
      n.canRun(),
    v = () => wp(n.networkMode) && n.canRun(),
    S = (j) => {
      d() || (u?.(), o.resolve(j));
    },
    E = (j) => {
      d() || (u?.(), o.reject(j));
    },
    T = () =>
      new Promise((j) => {
        ((u = (g) => {
          (d() || y()) && j(g);
        }),
          n.onPause?.());
      }).then(() => {
        ((u = void 0), d() || n.onContinue?.());
      }),
    N = () => {
      if (d()) return;
      let j;
      const g = i === 0 ? n.initialPromise : void 0;
      try {
        j = g ?? n.fn();
      } catch (A) {
        j = Promise.reject(A);
      }
      Promise.resolve(j)
        .then(S)
        .catch((A) => {
          if (d()) return;
          const R = n.retry ?? (Ta ? 0 : 3),
            q = n.retryDelay ?? gg,
            Z = typeof q == "function" ? q(i, A) : q,
            k =
              R === !0 ||
              (typeof R == "number" && i < R) ||
              (typeof R == "function" && R(i, A));
          if (l || !k) {
            E(A);
            return;
          }
          (i++,
            n.onFail?.(i, A),
            fg(Z)
              .then(() => (y() ? void 0 : T()))
              .then(() => {
                l ? E(A) : N();
              }));
        });
    };
  return {
    promise: o,
    status: () => o.status,
    cancel: m,
    continue: () => (u?.(), o),
    cancelRetry: p,
    continueRetry: b,
    canStart: v,
    start: () => (v() ? N() : T().then(N), o),
  };
}
var Cp = class {
    #e;
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      (this.clearGcTimeout(),
        tc(this.gcTime) &&
          (this.#e = Ea.setTimeout(() => {
            this.optionalRemove();
          }, this.gcTime)));
    }
    updateGcTime(n) {
      this.gcTime = Math.max(this.gcTime || 0, n ?? (Ta ? 1 / 0 : 300 * 1e3));
    }
    clearGcTimeout() {
      this.#e && (Ea.clearTimeout(this.#e), (this.#e = void 0));
    }
  },
  vg = class extends Cp {
    #e;
    #t;
    #l;
    #n;
    #a;
    #i;
    #r;
    constructor(n) {
      (super(),
        (this.#r = !1),
        (this.#i = n.defaultOptions),
        this.setOptions(n.options),
        (this.observers = []),
        (this.#n = n.client),
        (this.#l = this.#n.getQueryCache()),
        (this.queryKey = n.queryKey),
        (this.queryHash = n.queryHash),
        (this.#e = Vm(this.options)),
        (this.state = n.state ?? this.#e),
        this.scheduleGc());
    }
    get meta() {
      return this.options.meta;
    }
    get promise() {
      return this.#a?.promise;
    }
    setOptions(n) {
      if (
        ((this.options = { ...this.#i, ...n }),
        this.updateGcTime(this.options.gcTime),
        this.state && this.state.data === void 0)
      ) {
        const l = Vm(this.options);
        l.data !== void 0 &&
          (this.setData(l.data, { updatedAt: l.dataUpdatedAt, manual: !0 }),
          (this.#e = l));
      }
    }
    optionalRemove() {
      !this.observers.length &&
        this.state.fetchStatus === "idle" &&
        this.#l.remove(this);
    }
    setData(n, l) {
      const i = ac(this.state.data, n, this.options);
      return (
        this.#s({
          data: i,
          type: "success",
          dataUpdatedAt: l?.updatedAt,
          manual: l?.manual,
        }),
        i
      );
    }
    setState(n, l) {
      this.#s({ type: "setState", state: n, setStateOptions: l });
    }
    cancel(n) {
      const l = this.#a?.promise;
      return (this.#a?.cancel(n), l ? l.then(ft).catch(ft) : Promise.resolve());
    }
    destroy() {
      (super.destroy(), this.cancel({ silent: !0 }));
    }
    reset() {
      (this.destroy(), this.setState(this.#e));
    }
    isActive() {
      return this.observers.some((n) => Gt(n.options.enabled, this) !== !1);
    }
    isDisabled() {
      return this.getObserversCount() > 0
        ? !this.isActive()
        : this.options.queryFn === yc ||
            this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
    }
    isStatic() {
      return this.getObserversCount() > 0
        ? this.observers.some((n) => la(n.options.staleTime, this) === "static")
        : !1;
    }
    isStale() {
      return this.getObserversCount() > 0
        ? this.observers.some((n) => n.getCurrentResult().isStale)
        : this.state.data === void 0 || this.state.isInvalidated;
    }
    isStaleByTime(n = 0) {
      return this.state.data === void 0
        ? !0
        : n === "static"
          ? !1
          : this.state.isInvalidated
            ? !0
            : !Sp(this.state.dataUpdatedAt, n);
    }
    onFocus() {
      (this.observers
        .find((l) => l.shouldFetchOnWindowFocus())
        ?.refetch({ cancelRefetch: !1 }),
        this.#a?.continue());
    }
    onOnline() {
      (this.observers
        .find((l) => l.shouldFetchOnReconnect())
        ?.refetch({ cancelRefetch: !1 }),
        this.#a?.continue());
    }
    addObserver(n) {
      this.observers.includes(n) ||
        (this.observers.push(n),
        this.clearGcTimeout(),
        this.#l.notify({ type: "observerAdded", query: this, observer: n }));
    }
    removeObserver(n) {
      this.observers.includes(n) &&
        ((this.observers = this.observers.filter((l) => l !== n)),
        this.observers.length ||
          (this.#a &&
            (this.#r ? this.#a.cancel({ revert: !0 }) : this.#a.cancelRetry()),
          this.scheduleGc()),
        this.#l.notify({ type: "observerRemoved", query: this, observer: n }));
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      this.state.isInvalidated || this.#s({ type: "invalidate" });
    }
    async fetch(n, l) {
      if (
        this.state.fetchStatus !== "idle" &&
        this.#a?.status() !== "rejected"
      ) {
        if (this.state.data !== void 0 && l?.cancelRefetch)
          this.cancel({ silent: !0 });
        else if (this.#a) return (this.#a.continueRetry(), this.#a.promise);
      }
      if ((n && this.setOptions(n), !this.options.queryFn)) {
        const p = this.observers.find((b) => b.options.queryFn);
        p && this.setOptions(p.options);
      }
      const i = new AbortController(),
        u = (p) => {
          Object.defineProperty(p, "signal", {
            enumerable: !0,
            get: () => ((this.#r = !0), i.signal),
          });
        },
        o = () => {
          const p = jp(this.options, l),
            y = (() => {
              const v = {
                client: this.#n,
                queryKey: this.queryKey,
                meta: this.meta,
              };
              return (u(v), v);
            })();
          return (
            (this.#r = !1),
            this.options.persister ? this.options.persister(p, y, this) : p(y)
          );
        },
        m = (() => {
          const p = {
            fetchOptions: l,
            options: this.options,
            queryKey: this.queryKey,
            client: this.#n,
            state: this.state,
            fetchFn: o,
          };
          return (u(p), p);
        })();
      (this.options.behavior?.onFetch(m, this),
        (this.#t = this.state),
        (this.state.fetchStatus === "idle" ||
          this.state.fetchMeta !== m.fetchOptions?.meta) &&
          this.#s({ type: "fetch", meta: m.fetchOptions?.meta }),
        (this.#a = _p({
          initialPromise: l?.initialPromise,
          fn: m.fetchFn,
          onCancel: (p) => {
            (p instanceof sc &&
              p.revert &&
              this.setState({ ...this.#t, fetchStatus: "idle" }),
              i.abort());
          },
          onFail: (p, b) => {
            this.#s({ type: "failed", failureCount: p, error: b });
          },
          onPause: () => {
            this.#s({ type: "pause" });
          },
          onContinue: () => {
            this.#s({ type: "continue" });
          },
          retry: m.options.retry,
          retryDelay: m.options.retryDelay,
          networkMode: m.options.networkMode,
          canRun: () => !0,
        })));
      try {
        const p = await this.#a.start();
        if (p === void 0)
          throw new Error(`${this.queryHash} data is undefined`);
        return (
          this.setData(p),
          this.#l.config.onSuccess?.(p, this),
          this.#l.config.onSettled?.(p, this.state.error, this),
          p
        );
      } catch (p) {
        if (p instanceof sc) {
          if (p.silent) return this.#a.promise;
          if (p.revert) {
            if (this.state.data === void 0) throw p;
            return this.state.data;
          }
        }
        throw (
          this.#s({ type: "error", error: p }),
          this.#l.config.onError?.(p, this),
          this.#l.config.onSettled?.(this.state.data, p, this),
          p
        );
      } finally {
        this.scheduleGc();
      }
    }
    #s(n) {
      const l = (i) => {
        switch (n.type) {
          case "failed":
            return {
              ...i,
              fetchFailureCount: n.failureCount,
              fetchFailureReason: n.error,
            };
          case "pause":
            return { ...i, fetchStatus: "paused" };
          case "continue":
            return { ...i, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...i,
              ...Tp(i.data, this.options),
              fetchMeta: n.meta ?? null,
            };
          case "success":
            const u = {
              ...i,
              data: n.data,
              dataUpdateCount: i.dataUpdateCount + 1,
              dataUpdatedAt: n.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: "success",
              ...(!n.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
            return ((this.#t = n.manual ? u : void 0), u);
          case "error":
            const o = n.error;
            return {
              ...i,
              error: o,
              errorUpdateCount: i.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: i.fetchFailureCount + 1,
              fetchFailureReason: o,
              fetchStatus: "idle",
              status: "error",
            };
          case "invalidate":
            return { ...i, isInvalidated: !0 };
          case "setState":
            return { ...i, ...n.state };
        }
      };
      ((this.state = l(this.state)),
        Ie.batch(() => {
          (this.observers.forEach((i) => {
            i.onQueryUpdate();
          }),
            this.#l.notify({ query: this, type: "updated", action: n }));
        }));
    }
  };
function Tp(n, l) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: wp(l.networkMode) ? "fetching" : "paused",
    ...(n === void 0 && { error: null, status: "pending" }),
  };
}
function Vm(n) {
  const l =
      typeof n.initialData == "function" ? n.initialData() : n.initialData,
    i = l !== void 0,
    u = i
      ? typeof n.initialDataUpdatedAt == "function"
        ? n.initialDataUpdatedAt()
        : n.initialDataUpdatedAt
      : 0;
  return {
    data: l,
    dataUpdateCount: 0,
    dataUpdatedAt: i ? (u ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: i ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var xg = class extends xn {
  constructor(n, l) {
    (super(),
      (this.options = l),
      (this.#e = n),
      (this.#s = null),
      (this.#r = nc()),
      this.bindMethods(),
      this.setOptions(l));
  }
  #e;
  #t = void 0;
  #l = void 0;
  #n = void 0;
  #a;
  #i;
  #r;
  #s;
  #p;
  #d;
  #h;
  #o;
  #c;
  #u;
  #m = new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.#t.addObserver(this),
      Zm(this.#t, this.options) ? this.#f() : this.updateResult(),
      this.#v());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return ic(this.#t, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return ic(this.#t, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    ((this.listeners = new Set()),
      this.#x(),
      this.#S(),
      this.#t.removeObserver(this));
  }
  setOptions(n) {
    const l = this.options,
      i = this.#t;
    if (
      ((this.options = this.#e.defaultQueryOptions(n)),
      this.options.enabled !== void 0 &&
        typeof this.options.enabled != "boolean" &&
        typeof this.options.enabled != "function" &&
        typeof Gt(this.options.enabled, this.#t) != "boolean")
    )
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean",
      );
    (this.#N(),
      this.#t.setOptions(this.options),
      l._defaulted &&
        !sr(this.options, l) &&
        this.#e
          .getQueryCache()
          .notify({
            type: "observerOptionsUpdated",
            query: this.#t,
            observer: this,
          }));
    const u = this.hasListeners();
    (u && Fm(this.#t, i, this.options, l) && this.#f(),
      this.updateResult(),
      u &&
        (this.#t !== i ||
          Gt(this.options.enabled, this.#t) !== Gt(l.enabled, this.#t) ||
          la(this.options.staleTime, this.#t) !== la(l.staleTime, this.#t)) &&
        this.#y());
    const o = this.#b();
    u &&
      (this.#t !== i ||
        Gt(this.options.enabled, this.#t) !== Gt(l.enabled, this.#t) ||
        o !== this.#u) &&
      this.#g(o);
  }
  getOptimisticResult(n) {
    const l = this.#e.getQueryCache().build(this.#e, n),
      i = this.createResult(l, n);
    return (
      Ng(this, i) &&
        ((this.#n = i), (this.#i = this.options), (this.#a = this.#t.state)),
      i
    );
  }
  getCurrentResult() {
    return this.#n;
  }
  trackResult(n, l) {
    return new Proxy(n, {
      get: (i, u) => (
        this.trackProp(u),
        l?.(u),
        u === "promise" &&
          (this.trackProp("data"),
          !this.options.experimental_prefetchInRender &&
            this.#r.status === "pending" &&
            this.#r.reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled",
              ),
            )),
        Reflect.get(i, u)
      ),
    });
  }
  trackProp(n) {
    this.#m.add(n);
  }
  getCurrentQuery() {
    return this.#t;
  }
  refetch({ ...n } = {}) {
    return this.fetch({ ...n });
  }
  fetchOptimistic(n) {
    const l = this.#e.defaultQueryOptions(n),
      i = this.#e.getQueryCache().build(this.#e, l);
    return i.fetch().then(() => this.createResult(i, l));
  }
  fetch(n) {
    return this.#f({ ...n, cancelRefetch: n.cancelRefetch ?? !0 }).then(
      () => (this.updateResult(), this.#n),
    );
  }
  #f(n) {
    this.#N();
    let l = this.#t.fetch(this.options, n);
    return (n?.throwOnError || (l = l.catch(ft)), l);
  }
  #y() {
    this.#x();
    const n = la(this.options.staleTime, this.#t);
    if (Ta || this.#n.isStale || !tc(n)) return;
    const i = Sp(this.#n.dataUpdatedAt, n) + 1;
    this.#o = Ea.setTimeout(() => {
      this.#n.isStale || this.updateResult();
    }, i);
  }
  #b() {
    return (
      (typeof this.options.refetchInterval == "function"
        ? this.options.refetchInterval(this.#t)
        : this.options.refetchInterval) ?? !1
    );
  }
  #g(n) {
    (this.#S(),
      (this.#u = n),
      !(
        Ta ||
        Gt(this.options.enabled, this.#t) === !1 ||
        !tc(this.#u) ||
        this.#u === 0
      ) &&
        (this.#c = Ea.setInterval(() => {
          (this.options.refetchIntervalInBackground || bc.isFocused()) &&
            this.#f();
        }, this.#u)));
  }
  #v() {
    (this.#y(), this.#g(this.#b()));
  }
  #x() {
    this.#o && (Ea.clearTimeout(this.#o), (this.#o = void 0));
  }
  #S() {
    this.#c && (Ea.clearInterval(this.#c), (this.#c = void 0));
  }
  createResult(n, l) {
    const i = this.#t,
      u = this.options,
      o = this.#n,
      d = this.#a,
      m = this.#i,
      b = n !== i ? n.state : this.#l,
      { state: y } = n;
    let v = { ...y },
      S = !1,
      E;
    if (l._optimisticResults) {
      const V = this.hasListeners(),
        P = !V && Zm(n, l),
        ee = V && Fm(n, i, l, u);
      ((P || ee) && (v = { ...v, ...Tp(y.data, n.options) }),
        l._optimisticResults === "isRestoring" && (v.fetchStatus = "idle"));
    }
    let { error: T, errorUpdatedAt: N, status: j } = v;
    E = v.data;
    let g = !1;
    if (l.placeholderData !== void 0 && E === void 0 && j === "pending") {
      let V;
      (o?.isPlaceholderData && l.placeholderData === m?.placeholderData
        ? ((V = o.data), (g = !0))
        : (V =
            typeof l.placeholderData == "function"
              ? l.placeholderData(this.#h?.state.data, this.#h)
              : l.placeholderData),
        V !== void 0 && ((j = "success"), (E = ac(o?.data, V, l)), (S = !0)));
    }
    if (l.select && E !== void 0 && !g)
      if (o && E === d?.data && l.select === this.#p) E = this.#d;
      else
        try {
          ((this.#p = l.select),
            (E = l.select(E)),
            (E = ac(o?.data, E, l)),
            (this.#d = E),
            (this.#s = null));
        } catch (V) {
          this.#s = V;
        }
    this.#s && ((T = this.#s), (E = this.#d), (N = Date.now()), (j = "error"));
    const A = v.fetchStatus === "fetching",
      R = j === "pending",
      q = j === "error",
      Z = R && A,
      k = E !== void 0,
      K = {
        status: j,
        fetchStatus: v.fetchStatus,
        isPending: R,
        isSuccess: j === "success",
        isError: q,
        isInitialLoading: Z,
        isLoading: Z,
        data: E,
        dataUpdatedAt: v.dataUpdatedAt,
        error: T,
        errorUpdatedAt: N,
        failureCount: v.fetchFailureCount,
        failureReason: v.fetchFailureReason,
        errorUpdateCount: v.errorUpdateCount,
        isFetched: v.dataUpdateCount > 0 || v.errorUpdateCount > 0,
        isFetchedAfterMount:
          v.dataUpdateCount > b.dataUpdateCount ||
          v.errorUpdateCount > b.errorUpdateCount,
        isFetching: A,
        isRefetching: A && !R,
        isLoadingError: q && !k,
        isPaused: v.fetchStatus === "paused",
        isPlaceholderData: S,
        isRefetchError: q && k,
        isStale: gc(n, l),
        refetch: this.refetch,
        promise: this.#r,
        isEnabled: Gt(l.enabled, n) !== !1,
      };
    if (this.options.experimental_prefetchInRender) {
      const V = (le) => {
          K.status === "error"
            ? le.reject(K.error)
            : K.data !== void 0 && le.resolve(K.data);
        },
        P = () => {
          const le = (this.#r = K.promise = nc());
          V(le);
        },
        ee = this.#r;
      switch (ee.status) {
        case "pending":
          n.queryHash === i.queryHash && V(ee);
          break;
        case "fulfilled":
          (K.status === "error" || K.data !== ee.value) && P();
          break;
        case "rejected":
          (K.status !== "error" || K.error !== ee.reason) && P();
          break;
      }
    }
    return K;
  }
  updateResult() {
    const n = this.#n,
      l = this.createResult(this.#t, this.options);
    if (
      ((this.#a = this.#t.state),
      (this.#i = this.options),
      this.#a.data !== void 0 && (this.#h = this.#t),
      sr(l, n))
    )
      return;
    this.#n = l;
    const i = () => {
      if (!n) return !0;
      const { notifyOnChangeProps: u } = this.options,
        o = typeof u == "function" ? u() : u;
      if (o === "all" || (!o && !this.#m.size)) return !0;
      const d = new Set(o ?? this.#m);
      return (
        this.options.throwOnError && d.add("error"),
        Object.keys(this.#n).some((m) => {
          const p = m;
          return this.#n[p] !== n[p] && d.has(p);
        })
      );
    };
    this.#j({ listeners: i() });
  }
  #N() {
    const n = this.#e.getQueryCache().build(this.#e, this.options);
    if (n === this.#t) return;
    const l = this.#t;
    ((this.#t = n),
      (this.#l = n.state),
      this.hasListeners() && (l?.removeObserver(this), n.addObserver(this)));
  }
  onQueryUpdate() {
    (this.updateResult(), this.hasListeners() && this.#v());
  }
  #j(n) {
    Ie.batch(() => {
      (n.listeners &&
        this.listeners.forEach((l) => {
          l(this.#n);
        }),
        this.#e
          .getQueryCache()
          .notify({ query: this.#t, type: "observerResultsUpdated" }));
    });
  }
};
function Sg(n, l) {
  return (
    Gt(l.enabled, n) !== !1 &&
    n.state.data === void 0 &&
    !(n.state.status === "error" && l.retryOnMount === !1)
  );
}
function Zm(n, l) {
  return Sg(n, l) || (n.state.data !== void 0 && ic(n, l, l.refetchOnMount));
}
function ic(n, l, i) {
  if (Gt(l.enabled, n) !== !1 && la(l.staleTime, n) !== "static") {
    const u = typeof i == "function" ? i(n) : i;
    return u === "always" || (u !== !1 && gc(n, l));
  }
  return !1;
}
function Fm(n, l, i, u) {
  return (
    (n !== l || Gt(u.enabled, n) === !1) &&
    (!i.suspense || n.state.status !== "error") &&
    gc(n, i)
  );
}
function gc(n, l) {
  return Gt(l.enabled, n) !== !1 && n.isStaleByTime(la(l.staleTime, n));
}
function Ng(n, l) {
  return !sr(n.getCurrentResult(), l);
}
function Jm(n) {
  return {
    onFetch: (l, i) => {
      const u = l.options,
        o = l.fetchOptions?.meta?.fetchMore?.direction,
        d = l.state.data?.pages || [],
        m = l.state.data?.pageParams || [];
      let p = { pages: [], pageParams: [] },
        b = 0;
      const y = async () => {
        let v = !1;
        const S = (N) => {
            Object.defineProperty(N, "signal", {
              enumerable: !0,
              get: () => (
                l.signal.aborted
                  ? (v = !0)
                  : l.signal.addEventListener("abort", () => {
                      v = !0;
                    }),
                l.signal
              ),
            });
          },
          E = jp(l.options, l.fetchOptions),
          T = async (N, j, g) => {
            if (v) return Promise.reject();
            if (j == null && N.pages.length) return Promise.resolve(N);
            const R = (() => {
                const F = {
                  client: l.client,
                  queryKey: l.queryKey,
                  pageParam: j,
                  direction: g ? "backward" : "forward",
                  meta: l.options.meta,
                };
                return (S(F), F);
              })(),
              q = await E(R),
              { maxPages: Z } = l.options,
              k = g ? hg : dg;
            return {
              pages: k(N.pages, q, Z),
              pageParams: k(N.pageParams, j, Z),
            };
          };
        if (o && d.length) {
          const N = o === "backward",
            j = N ? jg : $m,
            g = { pages: d, pageParams: m },
            A = j(u, g);
          p = await T(g, A, N);
        } else {
          const N = n ?? d.length;
          do {
            const j = b === 0 ? (m[0] ?? u.initialPageParam) : $m(u, p);
            if (b > 0 && j == null) break;
            ((p = await T(p, j)), b++);
          } while (b < N);
        }
        return p;
      };
      l.options.persister
        ? (l.fetchFn = () =>
            l.options.persister?.(
              y,
              {
                client: l.client,
                queryKey: l.queryKey,
                meta: l.options.meta,
                signal: l.signal,
              },
              i,
            ))
        : (l.fetchFn = y);
    },
  };
}
function $m(n, { pages: l, pageParams: i }) {
  const u = l.length - 1;
  return l.length > 0 ? n.getNextPageParam(l[u], l, i[u], i) : void 0;
}
function jg(n, { pages: l, pageParams: i }) {
  return l.length > 0 ? n.getPreviousPageParam?.(l[0], l, i[0], i) : void 0;
}
var Eg = class extends Cp {
  #e;
  #t;
  #l;
  #n;
  constructor(n) {
    (super(),
      (this.#e = n.client),
      (this.mutationId = n.mutationId),
      (this.#l = n.mutationCache),
      (this.#t = []),
      (this.state = n.state || Ap()),
      this.setOptions(n.options),
      this.scheduleGc());
  }
  setOptions(n) {
    ((this.options = n), this.updateGcTime(this.options.gcTime));
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(n) {
    this.#t.includes(n) ||
      (this.#t.push(n),
      this.clearGcTimeout(),
      this.#l.notify({ type: "observerAdded", mutation: this, observer: n }));
  }
  removeObserver(n) {
    ((this.#t = this.#t.filter((l) => l !== n)),
      this.scheduleGc(),
      this.#l.notify({ type: "observerRemoved", mutation: this, observer: n }));
  }
  optionalRemove() {
    this.#t.length ||
      (this.state.status === "pending"
        ? this.scheduleGc()
        : this.#l.remove(this));
  }
  continue() {
    return this.#n?.continue() ?? this.execute(this.state.variables);
  }
  async execute(n) {
    const l = () => {
        this.#a({ type: "continue" });
      },
      i = {
        client: this.#e,
        meta: this.options.meta,
        mutationKey: this.options.mutationKey,
      };
    this.#n = _p({
      fn: () =>
        this.options.mutationFn
          ? this.options.mutationFn(n, i)
          : Promise.reject(new Error("No mutationFn found")),
      onFail: (d, m) => {
        this.#a({ type: "failed", failureCount: d, error: m });
      },
      onPause: () => {
        this.#a({ type: "pause" });
      },
      onContinue: l,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#l.canRun(this),
    });
    const u = this.state.status === "pending",
      o = !this.#n.canStart();
    try {
      if (u) l();
      else {
        (this.#a({ type: "pending", variables: n, isPaused: o }),
          await this.#l.config.onMutate?.(n, this, i));
        const m = await this.options.onMutate?.(n, i);
        m !== this.state.context &&
          this.#a({ type: "pending", context: m, variables: n, isPaused: o });
      }
      const d = await this.#n.start();
      return (
        await this.#l.config.onSuccess?.(d, n, this.state.context, this, i),
        await this.options.onSuccess?.(d, n, this.state.context, i),
        await this.#l.config.onSettled?.(
          d,
          null,
          this.state.variables,
          this.state.context,
          this,
          i,
        ),
        await this.options.onSettled?.(d, null, n, this.state.context, i),
        this.#a({ type: "success", data: d }),
        d
      );
    } catch (d) {
      try {
        throw (
          await this.#l.config.onError?.(d, n, this.state.context, this, i),
          await this.options.onError?.(d, n, this.state.context, i),
          await this.#l.config.onSettled?.(
            void 0,
            d,
            this.state.variables,
            this.state.context,
            this,
            i,
          ),
          await this.options.onSettled?.(void 0, d, n, this.state.context, i),
          d
        );
      } finally {
        this.#a({ type: "error", error: d });
      }
    } finally {
      this.#l.runNext(this);
    }
  }
  #a(n) {
    const l = (i) => {
      switch (n.type) {
        case "failed":
          return { ...i, failureCount: n.failureCount, failureReason: n.error };
        case "pause":
          return { ...i, isPaused: !0 };
        case "continue":
          return { ...i, isPaused: !1 };
        case "pending":
          return {
            ...i,
            context: n.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: n.isPaused,
            status: "pending",
            variables: n.variables,
            submittedAt: Date.now(),
          };
        case "success":
          return {
            ...i,
            data: n.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1,
          };
        case "error":
          return {
            ...i,
            data: void 0,
            error: n.error,
            failureCount: i.failureCount + 1,
            failureReason: n.error,
            isPaused: !1,
            status: "error",
          };
      }
    };
    ((this.state = l(this.state)),
      Ie.batch(() => {
        (this.#t.forEach((i) => {
          i.onMutationUpdate(n);
        }),
          this.#l.notify({ mutation: this, type: "updated", action: n }));
      }));
  }
};
function Ap() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var wg = class extends xn {
  constructor(n = {}) {
    (super(),
      (this.config = n),
      (this.#e = new Set()),
      (this.#t = new Map()),
      (this.#l = 0));
  }
  #e;
  #t;
  #l;
  build(n, l, i) {
    const u = new Eg({
      client: n,
      mutationCache: this,
      mutationId: ++this.#l,
      options: n.defaultMutationOptions(l),
      state: i,
    });
    return (this.add(u), u);
  }
  add(n) {
    this.#e.add(n);
    const l = Pi(n);
    if (typeof l == "string") {
      const i = this.#t.get(l);
      i ? i.push(n) : this.#t.set(l, [n]);
    }
    this.notify({ type: "added", mutation: n });
  }
  remove(n) {
    if (this.#e.delete(n)) {
      const l = Pi(n);
      if (typeof l == "string") {
        const i = this.#t.get(l);
        if (i)
          if (i.length > 1) {
            const u = i.indexOf(n);
            u !== -1 && i.splice(u, 1);
          } else i[0] === n && this.#t.delete(l);
      }
    }
    this.notify({ type: "removed", mutation: n });
  }
  canRun(n) {
    const l = Pi(n);
    if (typeof l == "string") {
      const u = this.#t.get(l)?.find((o) => o.state.status === "pending");
      return !u || u === n;
    } else return !0;
  }
  runNext(n) {
    const l = Pi(n);
    return typeof l == "string"
      ? (this.#t
          .get(l)
          ?.find((u) => u !== n && u.state.isPaused)
          ?.continue() ?? Promise.resolve())
      : Promise.resolve();
  }
  clear() {
    Ie.batch(() => {
      (this.#e.forEach((n) => {
        this.notify({ type: "removed", mutation: n });
      }),
        this.#e.clear(),
        this.#t.clear());
    });
  }
  getAll() {
    return Array.from(this.#e);
  }
  find(n) {
    const l = { exact: !0, ...n };
    return this.getAll().find((i) => km(l, i));
  }
  findAll(n = {}) {
    return this.getAll().filter((l) => km(n, l));
  }
  notify(n) {
    Ie.batch(() => {
      this.listeners.forEach((l) => {
        l(n);
      });
    });
  }
  resumePausedMutations() {
    const n = this.getAll().filter((l) => l.state.isPaused);
    return Ie.batch(() => Promise.all(n.map((l) => l.continue().catch(ft))));
  }
};
function Pi(n) {
  return n.options.scope?.id;
}
var _g = class extends xn {
    #e;
    #t = void 0;
    #l;
    #n;
    constructor(l, i) {
      (super(),
        (this.#e = l),
        this.setOptions(i),
        this.bindMethods(),
        this.#a());
    }
    bindMethods() {
      ((this.mutate = this.mutate.bind(this)),
        (this.reset = this.reset.bind(this)));
    }
    setOptions(l) {
      const i = this.options;
      ((this.options = this.#e.defaultMutationOptions(l)),
        sr(this.options, i) ||
          this.#e
            .getMutationCache()
            .notify({
              type: "observerOptionsUpdated",
              mutation: this.#l,
              observer: this,
            }),
        i?.mutationKey &&
        this.options.mutationKey &&
        Aa(i.mutationKey) !== Aa(this.options.mutationKey)
          ? this.reset()
          : this.#l?.state.status === "pending" &&
            this.#l.setOptions(this.options));
    }
    onUnsubscribe() {
      this.hasListeners() || this.#l?.removeObserver(this);
    }
    onMutationUpdate(l) {
      (this.#a(), this.#i(l));
    }
    getCurrentResult() {
      return this.#t;
    }
    reset() {
      (this.#l?.removeObserver(this), (this.#l = void 0), this.#a(), this.#i());
    }
    mutate(l, i) {
      return (
        (this.#n = i),
        this.#l?.removeObserver(this),
        (this.#l = this.#e.getMutationCache().build(this.#e, this.options)),
        this.#l.addObserver(this),
        this.#l.execute(l)
      );
    }
    #a() {
      const l = this.#l?.state ?? Ap();
      this.#t = {
        ...l,
        isPending: l.status === "pending",
        isSuccess: l.status === "success",
        isError: l.status === "error",
        isIdle: l.status === "idle",
        mutate: this.mutate,
        reset: this.reset,
      };
    }
    #i(l) {
      Ie.batch(() => {
        if (this.#n && this.hasListeners()) {
          const i = this.#t.variables,
            u = this.#t.context,
            o = {
              client: this.#e,
              meta: this.options.meta,
              mutationKey: this.options.mutationKey,
            };
          l?.type === "success"
            ? (this.#n.onSuccess?.(l.data, i, u, o),
              this.#n.onSettled?.(l.data, null, i, u, o))
            : l?.type === "error" &&
              (this.#n.onError?.(l.error, i, u, o),
              this.#n.onSettled?.(void 0, l.error, i, u, o));
        }
        this.listeners.forEach((i) => {
          i(this.#t);
        });
      });
    }
  },
  Cg = class extends xn {
    constructor(n = {}) {
      (super(), (this.config = n), (this.#e = new Map()));
    }
    #e;
    build(n, l, i) {
      const u = l.queryKey,
        o = l.queryHash ?? pc(u, l);
      let d = this.get(o);
      return (
        d ||
          ((d = new vg({
            client: n,
            queryKey: u,
            queryHash: o,
            options: n.defaultQueryOptions(l),
            state: i,
            defaultOptions: n.getQueryDefaults(u),
          })),
          this.add(d)),
        d
      );
    }
    add(n) {
      this.#e.has(n.queryHash) ||
        (this.#e.set(n.queryHash, n), this.notify({ type: "added", query: n }));
    }
    remove(n) {
      const l = this.#e.get(n.queryHash);
      l &&
        (n.destroy(),
        l === n && this.#e.delete(n.queryHash),
        this.notify({ type: "removed", query: n }));
    }
    clear() {
      Ie.batch(() => {
        this.getAll().forEach((n) => {
          this.remove(n);
        });
      });
    }
    get(n) {
      return this.#e.get(n);
    }
    getAll() {
      return [...this.#e.values()];
    }
    find(n) {
      const l = { exact: !0, ...n };
      return this.getAll().find((i) => Gm(l, i));
    }
    findAll(n = {}) {
      const l = this.getAll();
      return Object.keys(n).length > 0 ? l.filter((i) => Gm(n, i)) : l;
    }
    notify(n) {
      Ie.batch(() => {
        this.listeners.forEach((l) => {
          l(n);
        });
      });
    }
    onFocus() {
      Ie.batch(() => {
        this.getAll().forEach((n) => {
          n.onFocus();
        });
      });
    }
    onOnline() {
      Ie.batch(() => {
        this.getAll().forEach((n) => {
          n.onOnline();
        });
      });
    }
  },
  Tg = class {
    #e;
    #t;
    #l;
    #n;
    #a;
    #i;
    #r;
    #s;
    constructor(n = {}) {
      ((this.#e = n.queryCache || new Cg()),
        (this.#t = n.mutationCache || new wg()),
        (this.#l = n.defaultOptions || {}),
        (this.#n = new Map()),
        (this.#a = new Map()),
        (this.#i = 0));
    }
    mount() {
      (this.#i++,
        this.#i === 1 &&
          ((this.#r = bc.subscribe(async (n) => {
            n && (await this.resumePausedMutations(), this.#e.onFocus());
          })),
          (this.#s = ir.subscribe(async (n) => {
            n && (await this.resumePausedMutations(), this.#e.onOnline());
          }))));
    }
    unmount() {
      (this.#i--,
        this.#i === 0 &&
          (this.#r?.(), (this.#r = void 0), this.#s?.(), (this.#s = void 0)));
    }
    isFetching(n) {
      return this.#e.findAll({ ...n, fetchStatus: "fetching" }).length;
    }
    isMutating(n) {
      return this.#t.findAll({ ...n, status: "pending" }).length;
    }
    getQueryData(n) {
      const l = this.defaultQueryOptions({ queryKey: n });
      return this.#e.get(l.queryHash)?.state.data;
    }
    ensureQueryData(n) {
      const l = this.defaultQueryOptions(n),
        i = this.#e.build(this, l),
        u = i.state.data;
      return u === void 0
        ? this.fetchQuery(n)
        : (n.revalidateIfStale &&
            i.isStaleByTime(la(l.staleTime, i)) &&
            this.prefetchQuery(l),
          Promise.resolve(u));
    }
    getQueriesData(n) {
      return this.#e.findAll(n).map(({ queryKey: l, state: i }) => {
        const u = i.data;
        return [l, u];
      });
    }
    setQueryData(n, l, i) {
      const u = this.defaultQueryOptions({ queryKey: n }),
        d = this.#e.get(u.queryHash)?.state.data,
        m = og(l, d);
      if (m !== void 0)
        return this.#e.build(this, u).setData(m, { ...i, manual: !0 });
    }
    setQueriesData(n, l, i) {
      return Ie.batch(() =>
        this.#e
          .findAll(n)
          .map(({ queryKey: u }) => [u, this.setQueryData(u, l, i)]),
      );
    }
    getQueryState(n) {
      const l = this.defaultQueryOptions({ queryKey: n });
      return this.#e.get(l.queryHash)?.state;
    }
    removeQueries(n) {
      const l = this.#e;
      Ie.batch(() => {
        l.findAll(n).forEach((i) => {
          l.remove(i);
        });
      });
    }
    resetQueries(n, l) {
      const i = this.#e;
      return Ie.batch(
        () => (
          i.findAll(n).forEach((u) => {
            u.reset();
          }),
          this.refetchQueries({ type: "active", ...n }, l)
        ),
      );
    }
    cancelQueries(n, l = {}) {
      const i = { revert: !0, ...l },
        u = Ie.batch(() => this.#e.findAll(n).map((o) => o.cancel(i)));
      return Promise.all(u).then(ft).catch(ft);
    }
    invalidateQueries(n, l = {}) {
      return Ie.batch(
        () => (
          this.#e.findAll(n).forEach((i) => {
            i.invalidate();
          }),
          n?.refetchType === "none"
            ? Promise.resolve()
            : this.refetchQueries(
                { ...n, type: n?.refetchType ?? n?.type ?? "active" },
                l,
              )
        ),
      );
    }
    refetchQueries(n, l = {}) {
      const i = { ...l, cancelRefetch: l.cancelRefetch ?? !0 },
        u = Ie.batch(() =>
          this.#e
            .findAll(n)
            .filter((o) => !o.isDisabled() && !o.isStatic())
            .map((o) => {
              let d = o.fetch(void 0, i);
              return (
                i.throwOnError || (d = d.catch(ft)),
                o.state.fetchStatus === "paused" ? Promise.resolve() : d
              );
            }),
        );
      return Promise.all(u).then(ft);
    }
    fetchQuery(n) {
      const l = this.defaultQueryOptions(n);
      l.retry === void 0 && (l.retry = !1);
      const i = this.#e.build(this, l);
      return i.isStaleByTime(la(l.staleTime, i))
        ? i.fetch(l)
        : Promise.resolve(i.state.data);
    }
    prefetchQuery(n) {
      return this.fetchQuery(n).then(ft).catch(ft);
    }
    fetchInfiniteQuery(n) {
      return ((n.behavior = Jm(n.pages)), this.fetchQuery(n));
    }
    prefetchInfiniteQuery(n) {
      return this.fetchInfiniteQuery(n).then(ft).catch(ft);
    }
    ensureInfiniteQueryData(n) {
      return ((n.behavior = Jm(n.pages)), this.ensureQueryData(n));
    }
    resumePausedMutations() {
      return ir.isOnline()
        ? this.#t.resumePausedMutations()
        : Promise.resolve();
    }
    getQueryCache() {
      return this.#e;
    }
    getMutationCache() {
      return this.#t;
    }
    getDefaultOptions() {
      return this.#l;
    }
    setDefaultOptions(n) {
      this.#l = n;
    }
    setQueryDefaults(n, l) {
      this.#n.set(Aa(n), { queryKey: n, defaultOptions: l });
    }
    getQueryDefaults(n) {
      const l = [...this.#n.values()],
        i = {};
      return (
        l.forEach((u) => {
          _s(n, u.queryKey) && Object.assign(i, u.defaultOptions);
        }),
        i
      );
    }
    setMutationDefaults(n, l) {
      this.#a.set(Aa(n), { mutationKey: n, defaultOptions: l });
    }
    getMutationDefaults(n) {
      const l = [...this.#a.values()],
        i = {};
      return (
        l.forEach((u) => {
          _s(n, u.mutationKey) && Object.assign(i, u.defaultOptions);
        }),
        i
      );
    }
    defaultQueryOptions(n) {
      if (n._defaulted) return n;
      const l = {
        ...this.#l.queries,
        ...this.getQueryDefaults(n.queryKey),
        ...n,
        _defaulted: !0,
      };
      return (
        l.queryHash || (l.queryHash = pc(l.queryKey, l)),
        l.refetchOnReconnect === void 0 &&
          (l.refetchOnReconnect = l.networkMode !== "always"),
        l.throwOnError === void 0 && (l.throwOnError = !!l.suspense),
        !l.networkMode && l.persister && (l.networkMode = "offlineFirst"),
        l.queryFn === yc && (l.enabled = !1),
        l
      );
    }
    defaultMutationOptions(n) {
      return n?._defaulted
        ? n
        : {
            ...this.#l.mutations,
            ...(n?.mutationKey && this.getMutationDefaults(n.mutationKey)),
            ...n,
            _defaulted: !0,
          };
    }
    clear() {
      (this.#e.clear(), this.#t.clear());
    }
  },
  Rp = D.createContext(void 0),
  Ke = (n) => {
    const l = D.useContext(Rp);
    if (!l)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return l;
  },
  Ag = ({ client: n, children: l }) => (
    D.useEffect(
      () => (
        n.mount(),
        () => {
          n.unmount();
        }
      ),
      [n],
    ),
    f.jsx(Rp.Provider, { value: n, children: l })
  ),
  Op = D.createContext(!1),
  Rg = () => D.useContext(Op);
Op.Provider;
function Og() {
  let n = !1;
  return {
    clearReset: () => {
      n = !1;
    },
    reset: () => {
      n = !0;
    },
    isReset: () => n,
  };
}
var Dg = D.createContext(Og()),
  Mg = () => D.useContext(Dg),
  Ug = (n, l) => {
    (n.suspense || n.throwOnError || n.experimental_prefetchInRender) &&
      (l.isReset() || (n.retryOnMount = !1));
  },
  zg = (n) => {
    D.useEffect(() => {
      n.clearReset();
    }, [n]);
  },
  Bg = ({
    result: n,
    errorResetBoundary: l,
    throwOnError: i,
    query: u,
    suspense: o,
  }) =>
    n.isError &&
    !l.isReset() &&
    !n.isFetching &&
    u &&
    ((o && n.data === void 0) || Ep(i, [n.error, u])),
  qg = (n) => {
    if (n.suspense) {
      const i = (o) => (o === "static" ? o : Math.max(o ?? 1e3, 1e3)),
        u = n.staleTime;
      ((n.staleTime = typeof u == "function" ? (...o) => i(u(...o)) : i(u)),
        typeof n.gcTime == "number" && (n.gcTime = Math.max(n.gcTime, 1e3)));
    }
  },
  Lg = (n, l) => n.isLoading && n.isFetching && !l,
  Hg = (n, l) => n?.suspense && l.isPending,
  Pm = (n, l, i) =>
    l.fetchOptimistic(n).catch(() => {
      i.clearReset();
    });
function Qg(n, l, i) {
  const u = Rg(),
    o = Mg(),
    d = Ke(),
    m = d.defaultQueryOptions(n);
  (d.getDefaultOptions().queries?._experimental_beforeQuery?.(m),
    (m._optimisticResults = u ? "isRestoring" : "optimistic"),
    qg(m),
    Ug(m, o),
    zg(o));
  const p = !d.getQueryCache().get(m.queryHash),
    [b] = D.useState(() => new l(d, m)),
    y = b.getOptimisticResult(m),
    v = !u && n.subscribed !== !1;
  if (
    (D.useSyncExternalStore(
      D.useCallback(
        (S) => {
          const E = v ? b.subscribe(Ie.batchCalls(S)) : ft;
          return (b.updateResult(), E);
        },
        [b, v],
      ),
      () => b.getCurrentResult(),
      () => b.getCurrentResult(),
    ),
    D.useEffect(() => {
      b.setOptions(m);
    }, [m, b]),
    Hg(m, y))
  )
    throw Pm(m, b, o);
  if (
    Bg({
      result: y,
      errorResetBoundary: o,
      throwOnError: m.throwOnError,
      query: d.getQueryCache().get(m.queryHash),
      suspense: m.suspense,
    })
  )
    throw y.error;
  return (
    d.getDefaultOptions().queries?._experimental_afterQuery?.(m, y),
    m.experimental_prefetchInRender &&
      !Ta &&
      Lg(y, u) &&
      (p ? Pm(m, b, o) : d.getQueryCache().get(m.queryHash)?.promise)
        ?.catch(ft)
        .finally(() => {
          b.updateResult();
        }),
    m.notifyOnChangeProps ? y : b.trackResult(y)
  );
}
function Al(n, l) {
  return Qg(n, xg);
}
function Pe(n, l) {
  const i = Ke(),
    [u] = D.useState(() => new _g(i, n));
  D.useEffect(() => {
    u.setOptions(n);
  }, [u, n]);
  const o = D.useSyncExternalStore(
      D.useCallback((m) => u.subscribe(Ie.batchCalls(m)), [u]),
      () => u.getCurrentResult(),
      () => u.getCurrentResult(),
    ),
    d = D.useCallback(
      (m, p) => {
        u.mutate(m, p).catch(ft);
      },
      [u],
    );
  if (o.error && Ep(u.options.throwOnError, [o.error])) throw o.error;
  return { ...o, mutate: d, mutateAsync: o.mutate };
}
var Zo = { exports: {} },
  Fo = {};
/**
 * @license React
 * react-compiler-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wm;
function Yg() {
  if (Wm) return Fo;
  Wm = 1;
  var n = or().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return (
    (Fo.c = function (l) {
      return n.H.useMemoCache(l);
    }),
    Fo
  );
}
var Im;
function Gg() {
  return (Im || ((Im = 1), (Zo.exports = Yg())), Zo.exports);
}
var fe = Gg();
/**
 * react-router v7.9.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var ep = "popstate";
function kg(n = {}) {
  function l(u, o) {
    let { pathname: d, search: m, hash: p } = u.location;
    return rc(
      "",
      { pathname: d, search: m, hash: p },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default",
    );
  }
  function i(u, o) {
    return typeof o == "string" ? o : Cs(o);
  }
  return Xg(l, i, null, n);
}
function He(n, l) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(l);
}
function Zt(n, l) {
  if (!n) {
    typeof console < "u" && console.warn(l);
    try {
      throw new Error(l);
    } catch {}
  }
}
function Kg() {
  return Math.random().toString(36).substring(2, 10);
}
function tp(n, l) {
  return { usr: n.state, key: n.key, idx: l };
}
function rc(n, l, i = null, u) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...(typeof l == "string" ? Sn(l) : l),
    state: i,
    key: (l && l.key) || u || Kg(),
  };
}
function Cs({ pathname: n = "/", search: l = "", hash: i = "" }) {
  return (
    l && l !== "?" && (n += l.charAt(0) === "?" ? l : "?" + l),
    i && i !== "#" && (n += i.charAt(0) === "#" ? i : "#" + i),
    n
  );
}
function Sn(n) {
  let l = {};
  if (n) {
    let i = n.indexOf("#");
    i >= 0 && ((l.hash = n.substring(i)), (n = n.substring(0, i)));
    let u = n.indexOf("?");
    (u >= 0 && ((l.search = n.substring(u)), (n = n.substring(0, u))),
      n && (l.pathname = n));
  }
  return l;
}
function Xg(n, l, i, u = {}) {
  let { window: o = document.defaultView, v5Compat: d = !1 } = u,
    m = o.history,
    p = "POP",
    b = null,
    y = v();
  y == null && ((y = 0), m.replaceState({ ...m.state, idx: y }, ""));
  function v() {
    return (m.state || { idx: null }).idx;
  }
  function S() {
    p = "POP";
    let g = v(),
      A = g == null ? null : g - y;
    ((y = g), b && b({ action: p, location: j.location, delta: A }));
  }
  function E(g, A) {
    p = "PUSH";
    let R = rc(j.location, g, A);
    y = v() + 1;
    let q = tp(R, y),
      Z = j.createHref(R);
    try {
      m.pushState(q, "", Z);
    } catch (k) {
      if (k instanceof DOMException && k.name === "DataCloneError") throw k;
      o.location.assign(Z);
    }
    d && b && b({ action: p, location: j.location, delta: 1 });
  }
  function T(g, A) {
    p = "REPLACE";
    let R = rc(j.location, g, A);
    y = v();
    let q = tp(R, y),
      Z = j.createHref(R);
    (m.replaceState(q, "", Z),
      d && b && b({ action: p, location: j.location, delta: 0 }));
  }
  function N(g) {
    return Vg(g);
  }
  let j = {
    get action() {
      return p;
    },
    get location() {
      return n(o, m);
    },
    listen(g) {
      if (b) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(ep, S),
        (b = g),
        () => {
          (o.removeEventListener(ep, S), (b = null));
        }
      );
    },
    createHref(g) {
      return l(o, g);
    },
    createURL: N,
    encodeLocation(g) {
      let A = N(g);
      return { pathname: A.pathname, search: A.search, hash: A.hash };
    },
    push: E,
    replace: T,
    go(g) {
      return m.go(g);
    },
  };
  return j;
}
function Vg(n, l = !1) {
  let i = "http://localhost";
  (typeof window < "u" &&
    (i =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    He(i, "No window.location.(origin|href) available to create URL"));
  let u = typeof n == "string" ? n : Cs(n);
  return (
    (u = u.replace(/ $/, "%20")),
    !l && u.startsWith("//") && (u = i + u),
    new URL(u, i)
  );
}
function Dp(n, l, i = "/") {
  return Zg(n, l, i, !1);
}
function Zg(n, l, i, u) {
  let o = typeof l == "string" ? Sn(l) : l,
    d = Tl(o.pathname || "/", i);
  if (d == null) return null;
  let m = Mp(n);
  Fg(m);
  let p = null;
  for (let b = 0; p == null && b < m.length; ++b) {
    let y = s1(d);
    p = a1(m[b], y, u);
  }
  return p;
}
function Mp(n, l = [], i = [], u = "", o = !1) {
  let d = (m, p, b = o, y) => {
    let v = {
      relativePath: y === void 0 ? m.path || "" : y,
      caseSensitive: m.caseSensitive === !0,
      childrenIndex: p,
      route: m,
    };
    if (v.relativePath.startsWith("/")) {
      if (!v.relativePath.startsWith(u) && b) return;
      (He(
        v.relativePath.startsWith(u),
        `Absolute route path "${v.relativePath}" nested under path "${u}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (v.relativePath = v.relativePath.slice(u.length)));
    }
    let S = Cl([u, v.relativePath]),
      E = i.concat(v);
    (m.children &&
      m.children.length > 0 &&
      (He(
        m.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${S}".`,
      ),
      Mp(m.children, l, E, S, b)),
      !(m.path == null && !m.index) &&
        l.push({ path: S, score: t1(S, m.index), routesMeta: E }));
  };
  return (
    n.forEach((m, p) => {
      if (m.path === "" || !m.path?.includes("?")) d(m, p);
      else for (let b of Up(m.path)) d(m, p, !0, b);
    }),
    l
  );
}
function Up(n) {
  let l = n.split("/");
  if (l.length === 0) return [];
  let [i, ...u] = l,
    o = i.endsWith("?"),
    d = i.replace(/\?$/, "");
  if (u.length === 0) return o ? [d, ""] : [d];
  let m = Up(u.join("/")),
    p = [];
  return (
    p.push(...m.map((b) => (b === "" ? d : [d, b].join("/")))),
    o && p.push(...m),
    p.map((b) => (n.startsWith("/") && b === "" ? "/" : b))
  );
}
function Fg(n) {
  n.sort((l, i) =>
    l.score !== i.score
      ? i.score - l.score
      : l1(
          l.routesMeta.map((u) => u.childrenIndex),
          i.routesMeta.map((u) => u.childrenIndex),
        ),
  );
}
var Jg = /^:[\w-]+$/,
  $g = 3,
  Pg = 2,
  Wg = 1,
  Ig = 10,
  e1 = -2,
  lp = (n) => n === "*";
function t1(n, l) {
  let i = n.split("/"),
    u = i.length;
  return (
    i.some(lp) && (u += e1),
    l && (u += Pg),
    i
      .filter((o) => !lp(o))
      .reduce((o, d) => o + (Jg.test(d) ? $g : d === "" ? Wg : Ig), u)
  );
}
function l1(n, l) {
  return n.length === l.length && n.slice(0, -1).every((u, o) => u === l[o])
    ? n[n.length - 1] - l[l.length - 1]
    : 0;
}
function a1(n, l, i = !1) {
  let { routesMeta: u } = n,
    o = {},
    d = "/",
    m = [];
  for (let p = 0; p < u.length; ++p) {
    let b = u[p],
      y = p === u.length - 1,
      v = d === "/" ? l : l.slice(d.length) || "/",
      S = rr(
        { path: b.relativePath, caseSensitive: b.caseSensitive, end: y },
        v,
      ),
      E = b.route;
    if (
      (!S &&
        y &&
        i &&
        !u[u.length - 1].route.index &&
        (S = rr(
          { path: b.relativePath, caseSensitive: b.caseSensitive, end: !1 },
          v,
        )),
      !S)
    )
      return null;
    (Object.assign(o, S.params),
      m.push({
        params: o,
        pathname: Cl([d, S.pathname]),
        pathnameBase: o1(Cl([d, S.pathnameBase])),
        route: E,
      }),
      S.pathnameBase !== "/" && (d = Cl([d, S.pathnameBase])));
  }
  return m;
}
function rr(n, l) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [i, u] = n1(n.path, n.caseSensitive, n.end),
    o = l.match(i);
  if (!o) return null;
  let d = o[0],
    m = d.replace(/(.)\/+$/, "$1"),
    p = o.slice(1);
  return {
    params: u.reduce((y, { paramName: v, isOptional: S }, E) => {
      if (v === "*") {
        let N = p[E] || "";
        m = d.slice(0, d.length - N.length).replace(/(.)\/+$/, "$1");
      }
      const T = p[E];
      return (
        S && !T ? (y[v] = void 0) : (y[v] = (T || "").replace(/%2F/g, "/")),
        y
      );
    }, {}),
    pathname: d,
    pathnameBase: m,
    pattern: n,
  };
}
function n1(n, l = !1, i = !0) {
  Zt(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`,
  );
  let u = [],
    o =
      "^" +
      n
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (m, p, b) => (
            u.push({ paramName: p, isOptional: b != null }),
            b ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    n.endsWith("*")
      ? (u.push({ paramName: "*" }),
        (o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : i
        ? (o += "\\/*$")
        : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, l ? void 0 : "i"), u]
  );
}
function s1(n) {
  try {
    return n
      .split("/")
      .map((l) => decodeURIComponent(l).replace(/\//g, "%2F"))
      .join("/");
  } catch (l) {
    return (
      Zt(
        !1,
        `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${l}).`,
      ),
      n
    );
  }
}
function Tl(n, l) {
  if (l === "/") return n;
  if (!n.toLowerCase().startsWith(l.toLowerCase())) return null;
  let i = l.endsWith("/") ? l.length - 1 : l.length,
    u = n.charAt(i);
  return u && u !== "/" ? null : n.slice(i) || "/";
}
function i1(n, l = "/") {
  let {
    pathname: i,
    search: u = "",
    hash: o = "",
  } = typeof n == "string" ? Sn(n) : n;
  return {
    pathname: i ? (i.startsWith("/") ? i : r1(i, l)) : l,
    search: c1(u),
    hash: f1(o),
  };
}
function r1(n, l) {
  let i = l.replace(/\/+$/, "").split("/");
  return (
    n.split("/").forEach((o) => {
      o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
    }),
    i.length > 1 ? i.join("/") : "/"
  );
}
function Jo(n, l, i, u) {
  return `Cannot include a '${n}' character in a manually specified \`to.${l}\` field [${JSON.stringify(u)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function u1(n) {
  return n.filter(
    (l, i) => i === 0 || (l.route.path && l.route.path.length > 0),
  );
}
function vc(n) {
  let l = u1(n);
  return l.map((i, u) => (u === l.length - 1 ? i.pathname : i.pathnameBase));
}
function xc(n, l, i, u = !1) {
  let o;
  typeof n == "string"
    ? (o = Sn(n))
    : ((o = { ...n }),
      He(
        !o.pathname || !o.pathname.includes("?"),
        Jo("?", "pathname", "search", o),
      ),
      He(
        !o.pathname || !o.pathname.includes("#"),
        Jo("#", "pathname", "hash", o),
      ),
      He(!o.search || !o.search.includes("#"), Jo("#", "search", "hash", o)));
  let d = n === "" || o.pathname === "",
    m = d ? "/" : o.pathname,
    p;
  if (m == null) p = i;
  else {
    let S = l.length - 1;
    if (!u && m.startsWith("..")) {
      let E = m.split("/");
      for (; E[0] === ".."; ) (E.shift(), (S -= 1));
      o.pathname = E.join("/");
    }
    p = S >= 0 ? l[S] : "/";
  }
  let b = i1(o, p),
    y = m && m !== "/" && m.endsWith("/"),
    v = (d || m === ".") && i.endsWith("/");
  return (!b.pathname.endsWith("/") && (y || v) && (b.pathname += "/"), b);
}
var Cl = (n) => n.join("/").replace(/\/\/+/g, "/"),
  o1 = (n) => n.replace(/\/+$/, "").replace(/^\/*/, "/"),
  c1 = (n) => (!n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n),
  f1 = (n) => (!n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n);
function d1(n) {
  return (
    n != null &&
    typeof n.status == "number" &&
    typeof n.statusText == "string" &&
    typeof n.internal == "boolean" &&
    "data" in n
  );
}
var zp = ["POST", "PUT", "PATCH", "DELETE"];
new Set(zp);
var h1 = ["GET", ...zp];
new Set(h1);
var Nn = D.createContext(null);
Nn.displayName = "DataRouter";
var cr = D.createContext(null);
cr.displayName = "DataRouterState";
D.createContext(!1);
var Bp = D.createContext({ isTransitioning: !1 });
Bp.displayName = "ViewTransition";
var m1 = D.createContext(new Map());
m1.displayName = "Fetchers";
var p1 = D.createContext(null);
p1.displayName = "Await";
var Ft = D.createContext(null);
Ft.displayName = "Navigation";
var Ts = D.createContext(null);
Ts.displayName = "Location";
var ll = D.createContext({ outlet: null, matches: [], isDataRoute: !1 });
ll.displayName = "Route";
var Sc = D.createContext(null);
Sc.displayName = "RouteError";
function y1(n, { relative: l } = {}) {
  He(
    jn(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: i, navigator: u } = D.useContext(Ft),
    { hash: o, pathname: d, search: m } = As(n, { relative: l }),
    p = d;
  return (
    i !== "/" && (p = d === "/" ? i : Cl([i, d])),
    u.createHref({ pathname: p, search: m, hash: o })
  );
}
function jn() {
  return D.useContext(Ts) != null;
}
function aa() {
  return (
    He(
      jn(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    D.useContext(Ts).location
  );
}
var qp =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Lp(n) {
  D.useContext(Ft).static || D.useLayoutEffect(n);
}
function na() {
  let { isDataRoute: n } = D.useContext(ll);
  return n ? A1() : b1();
}
function b1() {
  He(
    jn(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let n = D.useContext(Nn),
    { basename: l, navigator: i } = D.useContext(Ft),
    { matches: u } = D.useContext(ll),
    { pathname: o } = aa(),
    d = JSON.stringify(vc(u)),
    m = D.useRef(!1);
  return (
    Lp(() => {
      m.current = !0;
    }),
    D.useCallback(
      (b, y = {}) => {
        if ((Zt(m.current, qp), !m.current)) return;
        if (typeof b == "number") {
          i.go(b);
          return;
        }
        let v = xc(b, JSON.parse(d), o, y.relative === "path");
        (n == null &&
          l !== "/" &&
          (v.pathname = v.pathname === "/" ? l : Cl([l, v.pathname])),
          (y.replace ? i.replace : i.push)(v, y.state, y));
      },
      [l, i, d, o, n],
    )
  );
}
D.createContext(null);
function As(n, { relative: l } = {}) {
  let { matches: i } = D.useContext(ll),
    { pathname: u } = aa(),
    o = JSON.stringify(vc(i));
  return D.useMemo(() => xc(n, JSON.parse(o), u, l === "path"), [n, o, u, l]);
}
function g1(n, l) {
  return Hp(n, l);
}
function Hp(n, l, i, u, o) {
  He(
    jn(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: d } = D.useContext(Ft),
    { matches: m } = D.useContext(ll),
    p = m[m.length - 1],
    b = p ? p.params : {},
    y = p ? p.pathname : "/",
    v = p ? p.pathnameBase : "/",
    S = p && p.route;
  {
    let R = (S && S.path) || "";
    Qp(
      y,
      !S || R.endsWith("*") || R.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${y}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R === "/" ? "*" : `${R}/*`}">.`,
    );
  }
  let E = aa(),
    T;
  if (l) {
    let R = typeof l == "string" ? Sn(l) : l;
    (He(
      v === "/" || R.pathname?.startsWith(v),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${v}" but pathname "${R.pathname}" was given in the \`location\` prop.`,
    ),
      (T = R));
  } else T = E;
  let N = T.pathname || "/",
    j = N;
  if (v !== "/") {
    let R = v.replace(/^\//, "").split("/");
    j = "/" + N.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let g = Dp(n, { pathname: j });
  (Zt(
    S || g != null,
    `No routes matched location "${T.pathname}${T.search}${T.hash}" `,
  ),
    Zt(
      g == null ||
        g[g.length - 1].route.element !== void 0 ||
        g[g.length - 1].route.Component !== void 0 ||
        g[g.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${T.pathname}${T.search}${T.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let A = j1(
    g &&
      g.map((R) =>
        Object.assign({}, R, {
          params: Object.assign({}, b, R.params),
          pathname: Cl([
            v,
            d.encodeLocation
              ? d.encodeLocation(
                  R.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23"),
                ).pathname
              : R.pathname,
          ]),
          pathnameBase:
            R.pathnameBase === "/"
              ? v
              : Cl([
                  v,
                  d.encodeLocation
                    ? d.encodeLocation(
                        R.pathnameBase
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23"),
                      ).pathname
                    : R.pathnameBase,
                ]),
        }),
      ),
    m,
    i,
    u,
    o,
  );
  return l && A
    ? D.createElement(
        Ts.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...T,
            },
            navigationType: "POP",
          },
        },
        A,
      )
    : A;
}
function v1() {
  let n = T1(),
    l = d1(n)
      ? `${n.status} ${n.statusText}`
      : n instanceof Error
        ? n.message
        : JSON.stringify(n),
    i = n instanceof Error ? n.stack : null,
    u = "rgba(200,200,200, 0.5)",
    o = { padding: "0.5rem", backgroundColor: u },
    d = { padding: "2px 4px", backgroundColor: u },
    m = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", n),
    (m = D.createElement(
      D.Fragment,
      null,
      D.createElement("p", null, "💿 Hey developer 👋"),
      D.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        D.createElement("code", { style: d }, "ErrorBoundary"),
        " or",
        " ",
        D.createElement("code", { style: d }, "errorElement"),
        " prop on your route.",
      ),
    )),
    D.createElement(
      D.Fragment,
      null,
      D.createElement("h2", null, "Unexpected Application Error!"),
      D.createElement("h3", { style: { fontStyle: "italic" } }, l),
      i ? D.createElement("pre", { style: o }, i) : null,
      m,
    )
  );
}
var x1 = D.createElement(v1, null),
  S1 = class extends D.Component {
    constructor(n) {
      (super(n),
        (this.state = {
          location: n.location,
          revalidation: n.revalidation,
          error: n.error,
        }));
    }
    static getDerivedStateFromError(n) {
      return { error: n };
    }
    static getDerivedStateFromProps(n, l) {
      return l.location !== n.location ||
        (l.revalidation !== "idle" && n.revalidation === "idle")
        ? { error: n.error, location: n.location, revalidation: n.revalidation }
        : {
            error: n.error !== void 0 ? n.error : l.error,
            location: l.location,
            revalidation: n.revalidation || l.revalidation,
          };
    }
    componentDidCatch(n, l) {
      this.props.unstable_onError
        ? this.props.unstable_onError(n, l)
        : console.error(
            "React Router caught the following error during render",
            n,
          );
    }
    render() {
      return this.state.error !== void 0
        ? D.createElement(
            ll.Provider,
            { value: this.props.routeContext },
            D.createElement(Sc.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children;
    }
  };
function N1({ routeContext: n, match: l, children: i }) {
  let u = D.useContext(Nn);
  return (
    u &&
      u.static &&
      u.staticContext &&
      (l.route.errorElement || l.route.ErrorBoundary) &&
      (u.staticContext._deepestRenderedBoundaryId = l.route.id),
    D.createElement(ll.Provider, { value: n }, i)
  );
}
function j1(n, l = [], i = null, u = null, o = null) {
  if (n == null) {
    if (!i) return null;
    if (i.errors) n = i.matches;
    else if (l.length === 0 && !i.initialized && i.matches.length > 0)
      n = i.matches;
    else return null;
  }
  let d = n,
    m = i?.errors;
  if (m != null) {
    let y = d.findIndex((v) => v.route.id && m?.[v.route.id] !== void 0);
    (He(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(m).join(",")}`,
    ),
      (d = d.slice(0, Math.min(d.length, y + 1))));
  }
  let p = !1,
    b = -1;
  if (i)
    for (let y = 0; y < d.length; y++) {
      let v = d[y];
      if (
        ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (b = y),
        v.route.id)
      ) {
        let { loaderData: S, errors: E } = i,
          T =
            v.route.loader &&
            !S.hasOwnProperty(v.route.id) &&
            (!E || E[v.route.id] === void 0);
        if (v.route.lazy || T) {
          ((p = !0), b >= 0 ? (d = d.slice(0, b + 1)) : (d = [d[0]]));
          break;
        }
      }
    }
  return d.reduceRight((y, v, S) => {
    let E,
      T = !1,
      N = null,
      j = null;
    i &&
      ((E = m && v.route.id ? m[v.route.id] : void 0),
      (N = v.route.errorElement || x1),
      p &&
        (b < 0 && S === 0
          ? (Qp(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (T = !0),
            (j = null))
          : b === S &&
            ((T = !0), (j = v.route.hydrateFallbackElement || null))));
    let g = l.concat(d.slice(0, S + 1)),
      A = () => {
        let R;
        return (
          E
            ? (R = N)
            : T
              ? (R = j)
              : v.route.Component
                ? (R = D.createElement(v.route.Component, null))
                : v.route.element
                  ? (R = v.route.element)
                  : (R = y),
          D.createElement(N1, {
            match: v,
            routeContext: { outlet: y, matches: g, isDataRoute: i != null },
            children: R,
          })
        );
      };
    return i && (v.route.ErrorBoundary || v.route.errorElement || S === 0)
      ? D.createElement(S1, {
          location: i.location,
          revalidation: i.revalidation,
          component: N,
          error: E,
          children: A(),
          routeContext: { outlet: null, matches: g, isDataRoute: !0 },
          unstable_onError: u,
        })
      : A();
  }, null);
}
function Nc(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function E1(n) {
  let l = D.useContext(Nn);
  return (He(l, Nc(n)), l);
}
function w1(n) {
  let l = D.useContext(cr);
  return (He(l, Nc(n)), l);
}
function _1(n) {
  let l = D.useContext(ll);
  return (He(l, Nc(n)), l);
}
function jc(n) {
  let l = _1(n),
    i = l.matches[l.matches.length - 1];
  return (
    He(
      i.route.id,
      `${n} can only be used on routes that contain a unique "id"`,
    ),
    i.route.id
  );
}
function C1() {
  return jc("useRouteId");
}
function T1() {
  let n = D.useContext(Sc),
    l = w1("useRouteError"),
    i = jc("useRouteError");
  return n !== void 0 ? n : l.errors?.[i];
}
function A1() {
  let { router: n } = E1("useNavigate"),
    l = jc("useNavigate"),
    i = D.useRef(!1);
  return (
    Lp(() => {
      i.current = !0;
    }),
    D.useCallback(
      async (o, d = {}) => {
        (Zt(i.current, qp),
          i.current &&
            (typeof o == "number"
              ? n.navigate(o)
              : await n.navigate(o, { fromRouteId: l, ...d })));
      },
      [n, l],
    )
  );
}
var ap = {};
function Qp(n, l, i) {
  !l && !ap[n] && ((ap[n] = !0), Zt(!1, i));
}
D.memo(R1);
function R1({ routes: n, future: l, state: i, unstable_onError: u }) {
  return Hp(n, void 0, i, u, l);
}
function O1({ to: n, replace: l, state: i, relative: u }) {
  He(
    jn(),
    "<Navigate> may be used only in the context of a <Router> component.",
  );
  let { static: o } = D.useContext(Ft);
  Zt(
    !o,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.",
  );
  let { matches: d } = D.useContext(ll),
    { pathname: m } = aa(),
    p = na(),
    b = xc(n, vc(d), m, u === "path"),
    y = JSON.stringify(b);
  return (
    D.useEffect(() => {
      p(JSON.parse(y), { replace: l, state: i, relative: u });
    }, [p, y, u, l, i]),
    null
  );
}
function ct(n) {
  He(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function D1({
  basename: n = "/",
  children: l = null,
  location: i,
  navigationType: u = "POP",
  navigator: o,
  static: d = !1,
}) {
  He(
    !jn(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let m = n.replace(/^\/*/, "/"),
    p = D.useMemo(
      () => ({ basename: m, navigator: o, static: d, future: {} }),
      [m, o, d],
    );
  typeof i == "string" && (i = Sn(i));
  let {
      pathname: b = "/",
      search: y = "",
      hash: v = "",
      state: S = null,
      key: E = "default",
    } = i,
    T = D.useMemo(() => {
      let N = Tl(b, m);
      return N == null
        ? null
        : {
            location: { pathname: N, search: y, hash: v, state: S, key: E },
            navigationType: u,
          };
    }, [m, b, y, v, S, E, u]);
  return (
    Zt(
      T != null,
      `<Router basename="${m}"> is not able to match the URL "${b}${y}${v}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    T == null
      ? null
      : D.createElement(
          Ft.Provider,
          { value: p },
          D.createElement(Ts.Provider, { children: l, value: T }),
        )
  );
}
function M1({ children: n, location: l }) {
  return g1(uc(n), l);
}
function uc(n, l = []) {
  let i = [];
  return (
    D.Children.forEach(n, (u, o) => {
      if (!D.isValidElement(u)) return;
      let d = [...l, o];
      if (u.type === D.Fragment) {
        i.push.apply(i, uc(u.props.children, d));
        return;
      }
      (He(
        u.type === ct,
        `[${typeof u.type == "string" ? u.type : u.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        He(
          !u.props.index || !u.props.children,
          "An index route cannot have child routes.",
        ));
      let m = {
        id: u.props.id || d.join("-"),
        caseSensitive: u.props.caseSensitive,
        element: u.props.element,
        Component: u.props.Component,
        index: u.props.index,
        path: u.props.path,
        middleware: u.props.middleware,
        loader: u.props.loader,
        action: u.props.action,
        hydrateFallbackElement: u.props.hydrateFallbackElement,
        HydrateFallback: u.props.HydrateFallback,
        errorElement: u.props.errorElement,
        ErrorBoundary: u.props.ErrorBoundary,
        hasErrorBoundary:
          u.props.hasErrorBoundary === !0 ||
          u.props.ErrorBoundary != null ||
          u.props.errorElement != null,
        shouldRevalidate: u.props.shouldRevalidate,
        handle: u.props.handle,
        lazy: u.props.lazy,
      };
      (u.props.children && (m.children = uc(u.props.children, d)), i.push(m));
    }),
    i
  );
}
var er = "get",
  tr = "application/x-www-form-urlencoded";
function fr(n) {
  return n != null && typeof n.tagName == "string";
}
function U1(n) {
  return fr(n) && n.tagName.toLowerCase() === "button";
}
function z1(n) {
  return fr(n) && n.tagName.toLowerCase() === "form";
}
function B1(n) {
  return fr(n) && n.tagName.toLowerCase() === "input";
}
function q1(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function L1(n, l) {
  return n.button === 0 && (!l || l === "_self") && !q1(n);
}
var Wi = null;
function H1() {
  if (Wi === null)
    try {
      (new FormData(document.createElement("form"), 0), (Wi = !1));
    } catch {
      Wi = !0;
    }
  return Wi;
}
var Q1 = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function $o(n) {
  return n != null && !Q1.has(n)
    ? (Zt(
        !1,
        `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${tr}"`,
      ),
      null)
    : n;
}
function Y1(n, l) {
  let i, u, o, d, m;
  if (z1(n)) {
    let p = n.getAttribute("action");
    ((u = p ? Tl(p, l) : null),
      (i = n.getAttribute("method") || er),
      (o = $o(n.getAttribute("enctype")) || tr),
      (d = new FormData(n)));
  } else if (U1(n) || (B1(n) && (n.type === "submit" || n.type === "image"))) {
    let p = n.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let b = n.getAttribute("formaction") || p.getAttribute("action");
    if (
      ((u = b ? Tl(b, l) : null),
      (i = n.getAttribute("formmethod") || p.getAttribute("method") || er),
      (o =
        $o(n.getAttribute("formenctype")) ||
        $o(p.getAttribute("enctype")) ||
        tr),
      (d = new FormData(p, n)),
      !H1())
    ) {
      let { name: y, type: v, value: S } = n;
      if (v === "image") {
        let E = y ? `${y}.` : "";
        (d.append(`${E}x`, "0"), d.append(`${E}y`, "0"));
      } else y && d.append(y, S);
    }
  } else {
    if (fr(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((i = er), (u = null), (o = tr), (m = n));
  }
  return (
    d && o === "text/plain" && ((m = d), (d = void 0)),
    { action: u, method: i.toLowerCase(), encType: o, formData: d, body: m }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Ec(n, l) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(l);
}
function G1(n, l, i) {
  let u =
    typeof n == "string"
      ? new URL(
          n,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : n;
  return (
    u.pathname === "/"
      ? (u.pathname = `_root.${i}`)
      : l && Tl(u.pathname, l) === "/"
        ? (u.pathname = `${l.replace(/\/$/, "")}/_root.${i}`)
        : (u.pathname = `${u.pathname.replace(/\/$/, "")}.${i}`),
    u
  );
}
async function k1(n, l) {
  if (n.id in l) return l[n.id];
  try {
    let i = await import(n.module);
    return ((l[n.id] = i), i);
  } catch (i) {
    return (
      console.error(
        `Error loading route module \`${n.module}\`, reloading page...`,
      ),
      console.error(i),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function K1(n) {
  return n == null
    ? !1
    : n.href == null
      ? n.rel === "preload" &&
        typeof n.imageSrcSet == "string" &&
        typeof n.imageSizes == "string"
      : typeof n.rel == "string" && typeof n.href == "string";
}
async function X1(n, l, i) {
  let u = await Promise.all(
    n.map(async (o) => {
      let d = l.routes[o.route.id];
      if (d) {
        let m = await k1(d, i);
        return m.links ? m.links() : [];
      }
      return [];
    }),
  );
  return J1(
    u
      .flat(1)
      .filter(K1)
      .filter((o) => o.rel === "stylesheet" || o.rel === "preload")
      .map((o) =>
        o.rel === "stylesheet"
          ? { ...o, rel: "prefetch", as: "style" }
          : { ...o, rel: "prefetch" },
      ),
  );
}
function np(n, l, i, u, o, d) {
  let m = (b, y) => (i[y] ? b.route.id !== i[y].route.id : !0),
    p = (b, y) =>
      i[y].pathname !== b.pathname ||
      (i[y].route.path?.endsWith("*") && i[y].params["*"] !== b.params["*"]);
  return d === "assets"
    ? l.filter((b, y) => m(b, y) || p(b, y))
    : d === "data"
      ? l.filter((b, y) => {
          let v = u.routes[b.route.id];
          if (!v || !v.hasLoader) return !1;
          if (m(b, y) || p(b, y)) return !0;
          if (b.route.shouldRevalidate) {
            let S = b.route.shouldRevalidate({
              currentUrl: new URL(
                o.pathname + o.search + o.hash,
                window.origin,
              ),
              currentParams: i[0]?.params || {},
              nextUrl: new URL(n, window.origin),
              nextParams: b.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof S == "boolean") return S;
          }
          return !0;
        })
      : [];
}
function V1(n, l, { includeHydrateFallback: i } = {}) {
  return Z1(
    n
      .map((u) => {
        let o = l.routes[u.route.id];
        if (!o) return [];
        let d = [o.module];
        return (
          o.clientActionModule && (d = d.concat(o.clientActionModule)),
          o.clientLoaderModule && (d = d.concat(o.clientLoaderModule)),
          i &&
            o.hydrateFallbackModule &&
            (d = d.concat(o.hydrateFallbackModule)),
          o.imports && (d = d.concat(o.imports)),
          d
        );
      })
      .flat(1),
  );
}
function Z1(n) {
  return [...new Set(n)];
}
function F1(n) {
  let l = {},
    i = Object.keys(n).sort();
  for (let u of i) l[u] = n[u];
  return l;
}
function J1(n, l) {
  let i = new Set();
  return (
    new Set(l),
    n.reduce((u, o) => {
      let d = JSON.stringify(F1(o));
      return (i.has(d) || (i.add(d), u.push({ key: d, link: o })), u);
    }, [])
  );
}
function Yp() {
  let n = D.useContext(Nn);
  return (
    Ec(
      n,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    n
  );
}
function $1() {
  let n = D.useContext(cr);
  return (
    Ec(
      n,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    n
  );
}
var wc = D.createContext(void 0);
wc.displayName = "FrameworkContext";
function Gp() {
  let n = D.useContext(wc);
  return (
    Ec(n, "You must render this element inside a <HydratedRouter> element"),
    n
  );
}
function P1(n, l) {
  let i = D.useContext(wc),
    [u, o] = D.useState(!1),
    [d, m] = D.useState(!1),
    {
      onFocus: p,
      onBlur: b,
      onMouseEnter: y,
      onMouseLeave: v,
      onTouchStart: S,
    } = l,
    E = D.useRef(null);
  (D.useEffect(() => {
    if ((n === "render" && m(!0), n === "viewport")) {
      let j = (A) => {
          A.forEach((R) => {
            m(R.isIntersecting);
          });
        },
        g = new IntersectionObserver(j, { threshold: 0.5 });
      return (
        E.current && g.observe(E.current),
        () => {
          g.disconnect();
        }
      );
    }
  }, [n]),
    D.useEffect(() => {
      if (u) {
        let j = setTimeout(() => {
          m(!0);
        }, 100);
        return () => {
          clearTimeout(j);
        };
      }
    }, [u]));
  let T = () => {
      o(!0);
    },
    N = () => {
      (o(!1), m(!1));
    };
  return i
    ? n !== "intent"
      ? [d, E, {}]
      : [
          d,
          E,
          {
            onFocus: js(p, T),
            onBlur: js(b, N),
            onMouseEnter: js(y, T),
            onMouseLeave: js(v, N),
            onTouchStart: js(S, T),
          },
        ]
    : [!1, E, {}];
}
function js(n, l) {
  return (i) => {
    (n && n(i), i.defaultPrevented || l(i));
  };
}
function W1({ page: n, ...l }) {
  let { router: i } = Yp(),
    u = D.useMemo(() => Dp(i.routes, n, i.basename), [i.routes, n, i.basename]);
  return u ? D.createElement(ev, { page: n, matches: u, ...l }) : null;
}
function I1(n) {
  let { manifest: l, routeModules: i } = Gp(),
    [u, o] = D.useState([]);
  return (
    D.useEffect(() => {
      let d = !1;
      return (
        X1(n, l, i).then((m) => {
          d || o(m);
        }),
        () => {
          d = !0;
        }
      );
    }, [n, l, i]),
    u
  );
}
function ev({ page: n, matches: l, ...i }) {
  let u = aa(),
    { manifest: o, routeModules: d } = Gp(),
    { basename: m } = Yp(),
    { loaderData: p, matches: b } = $1(),
    y = D.useMemo(() => np(n, l, b, o, u, "data"), [n, l, b, o, u]),
    v = D.useMemo(() => np(n, l, b, o, u, "assets"), [n, l, b, o, u]),
    S = D.useMemo(() => {
      if (n === u.pathname + u.search + u.hash) return [];
      let N = new Set(),
        j = !1;
      if (
        (l.forEach((A) => {
          let R = o.routes[A.route.id];
          !R ||
            !R.hasLoader ||
            ((!y.some((q) => q.route.id === A.route.id) &&
              A.route.id in p &&
              d[A.route.id]?.shouldRevalidate) ||
            R.hasClientLoader
              ? (j = !0)
              : N.add(A.route.id));
        }),
        N.size === 0)
      )
        return [];
      let g = G1(n, m, "data");
      return (
        j &&
          N.size > 0 &&
          g.searchParams.set(
            "_routes",
            l
              .filter((A) => N.has(A.route.id))
              .map((A) => A.route.id)
              .join(","),
          ),
        [g.pathname + g.search]
      );
    }, [m, p, u, o, y, l, n, d]),
    E = D.useMemo(() => V1(v, o), [v, o]),
    T = I1(v);
  return D.createElement(
    D.Fragment,
    null,
    S.map((N) =>
      D.createElement("link", {
        key: N,
        rel: "prefetch",
        as: "fetch",
        href: N,
        ...i,
      }),
    ),
    E.map((N) =>
      D.createElement("link", { key: N, rel: "modulepreload", href: N, ...i }),
    ),
    T.map(({ key: N, link: j }) =>
      D.createElement("link", { key: N, nonce: i.nonce, ...j }),
    ),
  );
}
function tv(...n) {
  return (l) => {
    n.forEach((i) => {
      typeof i == "function" ? i(l) : i != null && (i.current = l);
    });
  };
}
var kp =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  kp && (window.__reactRouterVersion = "7.9.4");
} catch {}
function lv({ basename: n, children: l, window: i }) {
  let u = D.useRef();
  u.current == null && (u.current = kg({ window: i, v5Compat: !0 }));
  let o = u.current,
    [d, m] = D.useState({ action: o.action, location: o.location }),
    p = D.useCallback(
      (b) => {
        D.startTransition(() => m(b));
      },
      [m],
    );
  return (
    D.useLayoutEffect(() => o.listen(p), [o, p]),
    D.createElement(D1, {
      basename: n,
      children: l,
      location: d.location,
      navigationType: d.action,
      navigator: o,
    })
  );
}
var Kp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Xp = D.forwardRef(function (
    {
      onClick: l,
      discover: i = "render",
      prefetch: u = "none",
      relative: o,
      reloadDocument: d,
      replace: m,
      state: p,
      target: b,
      to: y,
      preventScrollReset: v,
      viewTransition: S,
      ...E
    },
    T,
  ) {
    let { basename: N } = D.useContext(Ft),
      j = typeof y == "string" && Kp.test(y),
      g,
      A = !1;
    if (typeof y == "string" && j && ((g = y), kp))
      try {
        let P = new URL(window.location.href),
          ee = y.startsWith("//") ? new URL(P.protocol + y) : new URL(y),
          le = Tl(ee.pathname, N);
        ee.origin === P.origin && le != null
          ? (y = le + ee.search + ee.hash)
          : (A = !0);
      } catch {
        Zt(
          !1,
          `<Link to="${y}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        );
      }
    let R = y1(y, { relative: o }),
      [q, Z, k] = P1(u, E),
      F = iv(y, {
        replace: m,
        state: p,
        target: b,
        preventScrollReset: v,
        relative: o,
        viewTransition: S,
      });
    function K(P) {
      (l && l(P), P.defaultPrevented || F(P));
    }
    let V = D.createElement("a", {
      ...E,
      ...k,
      href: g || R,
      onClick: A || d ? l : K,
      ref: tv(T, Z),
      target: b,
      "data-discover": !j && i === "render" ? "true" : void 0,
    });
    return q && !j
      ? D.createElement(D.Fragment, null, V, D.createElement(W1, { page: R }))
      : V;
  });
Xp.displayName = "Link";
var av = D.forwardRef(function (
  {
    "aria-current": l = "page",
    caseSensitive: i = !1,
    className: u = "",
    end: o = !1,
    style: d,
    to: m,
    viewTransition: p,
    children: b,
    ...y
  },
  v,
) {
  let S = As(m, { relative: y.relative }),
    E = aa(),
    T = D.useContext(cr),
    { navigator: N, basename: j } = D.useContext(Ft),
    g = T != null && fv(S) && p === !0,
    A = N.encodeLocation ? N.encodeLocation(S).pathname : S.pathname,
    R = E.pathname,
    q =
      T && T.navigation && T.navigation.location
        ? T.navigation.location.pathname
        : null;
  (i ||
    ((R = R.toLowerCase()),
    (q = q ? q.toLowerCase() : null),
    (A = A.toLowerCase())),
    q && j && (q = Tl(q, j) || q));
  const Z = A !== "/" && A.endsWith("/") ? A.length - 1 : A.length;
  let k = R === A || (!o && R.startsWith(A) && R.charAt(Z) === "/"),
    F =
      q != null &&
      (q === A || (!o && q.startsWith(A) && q.charAt(A.length) === "/")),
    K = { isActive: k, isPending: F, isTransitioning: g },
    V = k ? l : void 0,
    P;
  typeof u == "function"
    ? (P = u(K))
    : (P = [
        u,
        k ? "active" : null,
        F ? "pending" : null,
        g ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let ee = typeof d == "function" ? d(K) : d;
  return D.createElement(
    Xp,
    {
      ...y,
      "aria-current": V,
      className: P,
      ref: v,
      style: ee,
      to: m,
      viewTransition: p,
    },
    typeof b == "function" ? b(K) : b,
  );
});
av.displayName = "NavLink";
var nv = D.forwardRef(
  (
    {
      discover: n = "render",
      fetcherKey: l,
      navigate: i,
      reloadDocument: u,
      replace: o,
      state: d,
      method: m = er,
      action: p,
      onSubmit: b,
      relative: y,
      preventScrollReset: v,
      viewTransition: S,
      ...E
    },
    T,
  ) => {
    let N = ov(),
      j = cv(p, { relative: y }),
      g = m.toLowerCase() === "get" ? "get" : "post",
      A = typeof p == "string" && Kp.test(p),
      R = (q) => {
        if ((b && b(q), q.defaultPrevented)) return;
        q.preventDefault();
        let Z = q.nativeEvent.submitter,
          k = Z?.getAttribute("formmethod") || m;
        N(Z || q.currentTarget, {
          fetcherKey: l,
          method: k,
          navigate: i,
          replace: o,
          state: d,
          relative: y,
          preventScrollReset: v,
          viewTransition: S,
        });
      };
    return D.createElement("form", {
      ref: T,
      method: g,
      action: j,
      onSubmit: u ? b : R,
      ...E,
      "data-discover": !A && n === "render" ? "true" : void 0,
    });
  },
);
nv.displayName = "Form";
function sv(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Vp(n) {
  let l = D.useContext(Nn);
  return (He(l, sv(n)), l);
}
function iv(
  n,
  {
    target: l,
    replace: i,
    state: u,
    preventScrollReset: o,
    relative: d,
    viewTransition: m,
  } = {},
) {
  let p = na(),
    b = aa(),
    y = As(n, { relative: d });
  return D.useCallback(
    (v) => {
      if (L1(v, l)) {
        v.preventDefault();
        let S = i !== void 0 ? i : Cs(b) === Cs(y);
        p(n, {
          replace: S,
          state: u,
          preventScrollReset: o,
          relative: d,
          viewTransition: m,
        });
      }
    },
    [b, p, y, i, u, l, n, o, d, m],
  );
}
var rv = 0,
  uv = () => `__${String(++rv)}__`;
function ov() {
  let { router: n } = Vp("useSubmit"),
    { basename: l } = D.useContext(Ft),
    i = C1();
  return D.useCallback(
    async (u, o = {}) => {
      let { action: d, method: m, encType: p, formData: b, body: y } = Y1(u, l);
      if (o.navigate === !1) {
        let v = o.fetcherKey || uv();
        await n.fetch(v, i, o.action || d, {
          preventScrollReset: o.preventScrollReset,
          formData: b,
          body: y,
          formMethod: o.method || m,
          formEncType: o.encType || p,
          flushSync: o.flushSync,
        });
      } else
        await n.navigate(o.action || d, {
          preventScrollReset: o.preventScrollReset,
          formData: b,
          body: y,
          formMethod: o.method || m,
          formEncType: o.encType || p,
          replace: o.replace,
          state: o.state,
          fromRouteId: i,
          flushSync: o.flushSync,
          viewTransition: o.viewTransition,
        });
    },
    [n, l, i],
  );
}
function cv(n, { relative: l } = {}) {
  let { basename: i } = D.useContext(Ft),
    u = D.useContext(ll);
  He(u, "useFormAction must be used inside a RouteContext");
  let [o] = u.matches.slice(-1),
    d = { ...As(n || ".", { relative: l }) },
    m = aa();
  if (n == null) {
    d.search = m.search;
    let p = new URLSearchParams(d.search),
      b = p.getAll("index");
    if (b.some((v) => v === "")) {
      (p.delete("index"),
        b.filter((S) => S).forEach((S) => p.append("index", S)));
      let v = p.toString();
      d.search = v ? `?${v}` : "";
    }
  }
  return (
    (!n || n === ".") &&
      o.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"),
    i !== "/" && (d.pathname = d.pathname === "/" ? i : Cl([i, d.pathname])),
    Cs(d)
  );
}
function fv(n, { relative: l } = {}) {
  let i = D.useContext(Bp);
  He(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: u } = Vp("useViewTransitionState"),
    o = As(n, { relative: l });
  if (!i.isTransitioning) return !1;
  let d = Tl(i.currentLocation.pathname, u) || i.currentLocation.pathname,
    m = Tl(i.nextLocation.pathname, u) || i.nextLocation.pathname;
  return rr(o.pathname, m) != null || rr(o.pathname, d) != null;
}
function Zp(n, l) {
  return function () {
    return n.apply(l, arguments);
  };
}
const { toString: dv } = Object.prototype,
  { getPrototypeOf: _c } = Object,
  { iterator: dr, toStringTag: Fp } = Symbol,
  hr = ((n) => (l) => {
    const i = dv.call(l);
    return n[i] || (n[i] = i.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Jt = (n) => ((n = n.toLowerCase()), (l) => hr(l) === n),
  mr = (n) => (l) => typeof l === n,
  { isArray: En } = Array,
  vn = mr("undefined");
function Rs(n) {
  return (
    n !== null &&
    !vn(n) &&
    n.constructor !== null &&
    !vn(n.constructor) &&
    vt(n.constructor.isBuffer) &&
    n.constructor.isBuffer(n)
  );
}
const Jp = Jt("ArrayBuffer");
function hv(n) {
  let l;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (l = ArrayBuffer.isView(n))
      : (l = n && n.buffer && Jp(n.buffer)),
    l
  );
}
const mv = mr("string"),
  vt = mr("function"),
  $p = mr("number"),
  Os = (n) => n !== null && typeof n == "object",
  pv = (n) => n === !0 || n === !1,
  lr = (n) => {
    if (hr(n) !== "object") return !1;
    const l = _c(n);
    return (
      (l === null ||
        l === Object.prototype ||
        Object.getPrototypeOf(l) === null) &&
      !(Fp in n) &&
      !(dr in n)
    );
  },
  yv = (n) => {
    if (!Os(n) || Rs(n)) return !1;
    try {
      return (
        Object.keys(n).length === 0 &&
        Object.getPrototypeOf(n) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  bv = Jt("Date"),
  gv = Jt("File"),
  vv = Jt("Blob"),
  xv = Jt("FileList"),
  Sv = (n) => Os(n) && vt(n.pipe),
  Nv = (n) => {
    let l;
    return (
      n &&
      ((typeof FormData == "function" && n instanceof FormData) ||
        (vt(n.append) &&
          ((l = hr(n)) === "formdata" ||
            (l === "object" &&
              vt(n.toString) &&
              n.toString() === "[object FormData]"))))
    );
  },
  jv = Jt("URLSearchParams"),
  [Ev, wv, _v, Cv] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Jt,
  ),
  Tv = (n) =>
    n.trim ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ds(n, l, { allOwnKeys: i = !1 } = {}) {
  if (n === null || typeof n > "u") return;
  let u, o;
  if ((typeof n != "object" && (n = [n]), En(n)))
    for (u = 0, o = n.length; u < o; u++) l.call(null, n[u], u, n);
  else {
    if (Rs(n)) return;
    const d = i ? Object.getOwnPropertyNames(n) : Object.keys(n),
      m = d.length;
    let p;
    for (u = 0; u < m; u++) ((p = d[u]), l.call(null, n[p], p, n));
  }
}
function Pp(n, l) {
  if (Rs(n)) return null;
  l = l.toLowerCase();
  const i = Object.keys(n);
  let u = i.length,
    o;
  for (; u-- > 0; ) if (((o = i[u]), l === o.toLowerCase())) return o;
  return null;
}
const wa =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  Wp = (n) => !vn(n) && n !== wa;
function oc() {
  const { caseless: n, skipUndefined: l } = (Wp(this) && this) || {},
    i = {},
    u = (o, d) => {
      const m = (n && Pp(i, d)) || d;
      lr(i[m]) && lr(o)
        ? (i[m] = oc(i[m], o))
        : lr(o)
          ? (i[m] = oc({}, o))
          : En(o)
            ? (i[m] = o.slice())
            : (!l || !vn(o)) && (i[m] = o);
    };
  for (let o = 0, d = arguments.length; o < d; o++)
    arguments[o] && Ds(arguments[o], u);
  return i;
}
const Av = (n, l, i, { allOwnKeys: u } = {}) => (
    Ds(
      l,
      (o, d) => {
        i && vt(o) ? (n[d] = Zp(o, i)) : (n[d] = o);
      },
      { allOwnKeys: u },
    ),
    n
  ),
  Rv = (n) => (n.charCodeAt(0) === 65279 && (n = n.slice(1)), n),
  Ov = (n, l, i, u) => {
    ((n.prototype = Object.create(l.prototype, u)),
      (n.prototype.constructor = n),
      Object.defineProperty(n, "super", { value: l.prototype }),
      i && Object.assign(n.prototype, i));
  },
  Dv = (n, l, i, u) => {
    let o, d, m;
    const p = {};
    if (((l = l || {}), n == null)) return l;
    do {
      for (o = Object.getOwnPropertyNames(n), d = o.length; d-- > 0; )
        ((m = o[d]),
          (!u || u(m, n, l)) && !p[m] && ((l[m] = n[m]), (p[m] = !0)));
      n = i !== !1 && _c(n);
    } while (n && (!i || i(n, l)) && n !== Object.prototype);
    return l;
  },
  Mv = (n, l, i) => {
    ((n = String(n)),
      (i === void 0 || i > n.length) && (i = n.length),
      (i -= l.length));
    const u = n.indexOf(l, i);
    return u !== -1 && u === i;
  },
  Uv = (n) => {
    if (!n) return null;
    if (En(n)) return n;
    let l = n.length;
    if (!$p(l)) return null;
    const i = new Array(l);
    for (; l-- > 0; ) i[l] = n[l];
    return i;
  },
  zv = (
    (n) => (l) =>
      n && l instanceof n
  )(typeof Uint8Array < "u" && _c(Uint8Array)),
  Bv = (n, l) => {
    const u = (n && n[dr]).call(n);
    let o;
    for (; (o = u.next()) && !o.done; ) {
      const d = o.value;
      l.call(n, d[0], d[1]);
    }
  },
  qv = (n, l) => {
    let i;
    const u = [];
    for (; (i = n.exec(l)) !== null; ) u.push(i);
    return u;
  },
  Lv = Jt("HTMLFormElement"),
  Hv = (n) =>
    n.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (i, u, o) {
      return u.toUpperCase() + o;
    }),
  sp = (
    ({ hasOwnProperty: n }) =>
    (l, i) =>
      n.call(l, i)
  )(Object.prototype),
  Qv = Jt("RegExp"),
  Ip = (n, l) => {
    const i = Object.getOwnPropertyDescriptors(n),
      u = {};
    (Ds(i, (o, d) => {
      let m;
      (m = l(o, d, n)) !== !1 && (u[d] = m || o);
    }),
      Object.defineProperties(n, u));
  },
  Yv = (n) => {
    Ip(n, (l, i) => {
      if (vt(n) && ["arguments", "caller", "callee"].indexOf(i) !== -1)
        return !1;
      const u = n[i];
      if (vt(u)) {
        if (((l.enumerable = !1), "writable" in l)) {
          l.writable = !1;
          return;
        }
        l.set ||
          (l.set = () => {
            throw Error("Can not rewrite read-only method '" + i + "'");
          });
      }
    });
  },
  Gv = (n, l) => {
    const i = {},
      u = (o) => {
        o.forEach((d) => {
          i[d] = !0;
        });
      };
    return (En(n) ? u(n) : u(String(n).split(l)), i);
  },
  kv = () => {},
  Kv = (n, l) => (n != null && Number.isFinite((n = +n)) ? n : l);
function Xv(n) {
  return !!(n && vt(n.append) && n[Fp] === "FormData" && n[dr]);
}
const Vv = (n) => {
    const l = new Array(10),
      i = (u, o) => {
        if (Os(u)) {
          if (l.indexOf(u) >= 0) return;
          if (Rs(u)) return u;
          if (!("toJSON" in u)) {
            l[o] = u;
            const d = En(u) ? [] : {};
            return (
              Ds(u, (m, p) => {
                const b = i(m, o + 1);
                !vn(b) && (d[p] = b);
              }),
              (l[o] = void 0),
              d
            );
          }
        }
        return u;
      };
    return i(n, 0);
  },
  Zv = Jt("AsyncFunction"),
  Fv = (n) => n && (Os(n) || vt(n)) && vt(n.then) && vt(n.catch),
  ey = ((n, l) =>
    n
      ? setImmediate
      : l
        ? ((i, u) => (
            wa.addEventListener(
              "message",
              ({ source: o, data: d }) => {
                o === wa && d === i && u.length && u.shift()();
              },
              !1,
            ),
            (o) => {
              (u.push(o), wa.postMessage(i, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (i) => setTimeout(i))(
    typeof setImmediate == "function",
    vt(wa.postMessage),
  ),
  Jv =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(wa)
      : (typeof process < "u" && process.nextTick) || ey,
  $v = (n) => n != null && vt(n[dr]),
  L = {
    isArray: En,
    isArrayBuffer: Jp,
    isBuffer: Rs,
    isFormData: Nv,
    isArrayBufferView: hv,
    isString: mv,
    isNumber: $p,
    isBoolean: pv,
    isObject: Os,
    isPlainObject: lr,
    isEmptyObject: yv,
    isReadableStream: Ev,
    isRequest: wv,
    isResponse: _v,
    isHeaders: Cv,
    isUndefined: vn,
    isDate: bv,
    isFile: gv,
    isBlob: vv,
    isRegExp: Qv,
    isFunction: vt,
    isStream: Sv,
    isURLSearchParams: jv,
    isTypedArray: zv,
    isFileList: xv,
    forEach: Ds,
    merge: oc,
    extend: Av,
    trim: Tv,
    stripBOM: Rv,
    inherits: Ov,
    toFlatObject: Dv,
    kindOf: hr,
    kindOfTest: Jt,
    endsWith: Mv,
    toArray: Uv,
    forEachEntry: Bv,
    matchAll: qv,
    isHTMLForm: Lv,
    hasOwnProperty: sp,
    hasOwnProp: sp,
    reduceDescriptors: Ip,
    freezeMethods: Yv,
    toObjectSet: Gv,
    toCamelCase: Hv,
    noop: kv,
    toFiniteNumber: Kv,
    findKey: Pp,
    global: wa,
    isContextDefined: Wp,
    isSpecCompliantForm: Xv,
    toJSONObject: Vv,
    isAsyncFn: Zv,
    isThenable: Fv,
    setImmediate: ey,
    asap: Jv,
    isIterable: $v,
  };
function be(n, l, i, u, o) {
  (Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = n),
    (this.name = "AxiosError"),
    l && (this.code = l),
    i && (this.config = i),
    u && (this.request = u),
    o && ((this.response = o), (this.status = o.status ? o.status : null)));
}
L.inherits(be, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: L.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const ty = be.prototype,
  ly = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((n) => {
  ly[n] = { value: n };
});
Object.defineProperties(be, ly);
Object.defineProperty(ty, "isAxiosError", { value: !0 });
be.from = (n, l, i, u, o, d) => {
  const m = Object.create(ty);
  L.toFlatObject(
    n,
    m,
    function (v) {
      return v !== Error.prototype;
    },
    (y) => y !== "isAxiosError",
  );
  const p = n && n.message ? n.message : "Error",
    b = l == null && n ? n.code : l;
  return (
    be.call(m, p, b, i, u, o),
    n &&
      m.cause == null &&
      Object.defineProperty(m, "cause", { value: n, configurable: !0 }),
    (m.name = (n && n.name) || "Error"),
    d && Object.assign(m, d),
    m
  );
};
const Pv = null;
function cc(n) {
  return L.isPlainObject(n) || L.isArray(n);
}
function ay(n) {
  return L.endsWith(n, "[]") ? n.slice(0, -2) : n;
}
function ip(n, l, i) {
  return n
    ? n
        .concat(l)
        .map(function (o, d) {
          return ((o = ay(o)), !i && d ? "[" + o + "]" : o);
        })
        .join(i ? "." : "")
    : l;
}
function Wv(n) {
  return L.isArray(n) && !n.some(cc);
}
const Iv = L.toFlatObject(L, {}, null, function (l) {
  return /^is[A-Z]/.test(l);
});
function pr(n, l, i) {
  if (!L.isObject(n)) throw new TypeError("target must be an object");
  ((l = l || new FormData()),
    (i = L.toFlatObject(
      i,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (j, g) {
        return !L.isUndefined(g[j]);
      },
    )));
  const u = i.metaTokens,
    o = i.visitor || v,
    d = i.dots,
    m = i.indexes,
    b = (i.Blob || (typeof Blob < "u" && Blob)) && L.isSpecCompliantForm(l);
  if (!L.isFunction(o)) throw new TypeError("visitor must be a function");
  function y(N) {
    if (N === null) return "";
    if (L.isDate(N)) return N.toISOString();
    if (L.isBoolean(N)) return N.toString();
    if (!b && L.isBlob(N))
      throw new be("Blob is not supported. Use a Buffer instead.");
    return L.isArrayBuffer(N) || L.isTypedArray(N)
      ? b && typeof Blob == "function"
        ? new Blob([N])
        : Buffer.from(N)
      : N;
  }
  function v(N, j, g) {
    let A = N;
    if (N && !g && typeof N == "object") {
      if (L.endsWith(j, "{}"))
        ((j = u ? j : j.slice(0, -2)), (N = JSON.stringify(N)));
      else if (
        (L.isArray(N) && Wv(N)) ||
        ((L.isFileList(N) || L.endsWith(j, "[]")) && (A = L.toArray(N)))
      )
        return (
          (j = ay(j)),
          A.forEach(function (q, Z) {
            !(L.isUndefined(q) || q === null) &&
              l.append(
                m === !0 ? ip([j], Z, d) : m === null ? j : j + "[]",
                y(q),
              );
          }),
          !1
        );
    }
    return cc(N) ? !0 : (l.append(ip(g, j, d), y(N)), !1);
  }
  const S = [],
    E = Object.assign(Iv, {
      defaultVisitor: v,
      convertValue: y,
      isVisitable: cc,
    });
  function T(N, j) {
    if (!L.isUndefined(N)) {
      if (S.indexOf(N) !== -1)
        throw Error("Circular reference detected in " + j.join("."));
      (S.push(N),
        L.forEach(N, function (A, R) {
          (!(L.isUndefined(A) || A === null) &&
            o.call(l, A, L.isString(R) ? R.trim() : R, j, E)) === !0 &&
            T(A, j ? j.concat(R) : [R]);
        }),
        S.pop());
    }
  }
  if (!L.isObject(n)) throw new TypeError("data must be an object");
  return (T(n), l);
}
function rp(n) {
  const l = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g, function (u) {
    return l[u];
  });
}
function Cc(n, l) {
  ((this._pairs = []), n && pr(n, this, l));
}
const ny = Cc.prototype;
ny.append = function (l, i) {
  this._pairs.push([l, i]);
};
ny.toString = function (l) {
  const i = l
    ? function (u) {
        return l.call(this, u, rp);
      }
    : rp;
  return this._pairs
    .map(function (o) {
      return i(o[0]) + "=" + i(o[1]);
    }, "")
    .join("&");
};
function ex(n) {
  return encodeURIComponent(n)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function sy(n, l, i) {
  if (!l) return n;
  const u = (i && i.encode) || ex;
  L.isFunction(i) && (i = { serialize: i });
  const o = i && i.serialize;
  let d;
  if (
    (o
      ? (d = o(l, i))
      : (d = L.isURLSearchParams(l) ? l.toString() : new Cc(l, i).toString(u)),
    d)
  ) {
    const m = n.indexOf("#");
    (m !== -1 && (n = n.slice(0, m)),
      (n += (n.indexOf("?") === -1 ? "?" : "&") + d));
  }
  return n;
}
class up {
  constructor() {
    this.handlers = [];
  }
  use(l, i, u) {
    return (
      this.handlers.push({
        fulfilled: l,
        rejected: i,
        synchronous: u ? u.synchronous : !1,
        runWhen: u ? u.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(l) {
    this.handlers[l] && (this.handlers[l] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(l) {
    L.forEach(this.handlers, function (u) {
      u !== null && l(u);
    });
  }
}
const iy = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  tx = typeof URLSearchParams < "u" ? URLSearchParams : Cc,
  lx = typeof FormData < "u" ? FormData : null,
  ax = typeof Blob < "u" ? Blob : null,
  nx = {
    isBrowser: !0,
    classes: { URLSearchParams: tx, FormData: lx, Blob: ax },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Tc = typeof window < "u" && typeof document < "u",
  fc = (typeof navigator == "object" && navigator) || void 0,
  sx =
    Tc &&
    (!fc || ["ReactNative", "NativeScript", "NS"].indexOf(fc.product) < 0),
  ix =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  rx = (Tc && window.location.href) || "http://localhost",
  ux = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Tc,
        hasStandardBrowserEnv: sx,
        hasStandardBrowserWebWorkerEnv: ix,
        navigator: fc,
        origin: rx,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  ut = { ...ux, ...nx };
function ox(n, l) {
  return pr(n, new ut.classes.URLSearchParams(), {
    visitor: function (i, u, o, d) {
      return ut.isNode && L.isBuffer(i)
        ? (this.append(u, i.toString("base64")), !1)
        : d.defaultVisitor.apply(this, arguments);
    },
    ...l,
  });
}
function cx(n) {
  return L.matchAll(/\w+|\[(\w*)]/g, n).map((l) =>
    l[0] === "[]" ? "" : l[1] || l[0],
  );
}
function fx(n) {
  const l = {},
    i = Object.keys(n);
  let u;
  const o = i.length;
  let d;
  for (u = 0; u < o; u++) ((d = i[u]), (l[d] = n[d]));
  return l;
}
function ry(n) {
  function l(i, u, o, d) {
    let m = i[d++];
    if (m === "__proto__") return !0;
    const p = Number.isFinite(+m),
      b = d >= i.length;
    return (
      (m = !m && L.isArray(o) ? o.length : m),
      b
        ? (L.hasOwnProp(o, m) ? (o[m] = [o[m], u]) : (o[m] = u), !p)
        : ((!o[m] || !L.isObject(o[m])) && (o[m] = []),
          l(i, u, o[m], d) && L.isArray(o[m]) && (o[m] = fx(o[m])),
          !p)
    );
  }
  if (L.isFormData(n) && L.isFunction(n.entries)) {
    const i = {};
    return (
      L.forEachEntry(n, (u, o) => {
        l(cx(u), o, i, 0);
      }),
      i
    );
  }
  return null;
}
function dx(n, l, i) {
  if (L.isString(n))
    try {
      return ((l || JSON.parse)(n), L.trim(n));
    } catch (u) {
      if (u.name !== "SyntaxError") throw u;
    }
  return (i || JSON.stringify)(n);
}
const Ms = {
  transitional: iy,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (l, i) {
      const u = i.getContentType() || "",
        o = u.indexOf("application/json") > -1,
        d = L.isObject(l);
      if ((d && L.isHTMLForm(l) && (l = new FormData(l)), L.isFormData(l)))
        return o ? JSON.stringify(ry(l)) : l;
      if (
        L.isArrayBuffer(l) ||
        L.isBuffer(l) ||
        L.isStream(l) ||
        L.isFile(l) ||
        L.isBlob(l) ||
        L.isReadableStream(l)
      )
        return l;
      if (L.isArrayBufferView(l)) return l.buffer;
      if (L.isURLSearchParams(l))
        return (
          i.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          l.toString()
        );
      let p;
      if (d) {
        if (u.indexOf("application/x-www-form-urlencoded") > -1)
          return ox(l, this.formSerializer).toString();
        if ((p = L.isFileList(l)) || u.indexOf("multipart/form-data") > -1) {
          const b = this.env && this.env.FormData;
          return pr(
            p ? { "files[]": l } : l,
            b && new b(),
            this.formSerializer,
          );
        }
      }
      return d || o ? (i.setContentType("application/json", !1), dx(l)) : l;
    },
  ],
  transformResponse: [
    function (l) {
      const i = this.transitional || Ms.transitional,
        u = i && i.forcedJSONParsing,
        o = this.responseType === "json";
      if (L.isResponse(l) || L.isReadableStream(l)) return l;
      if (l && L.isString(l) && ((u && !this.responseType) || o)) {
        const m = !(i && i.silentJSONParsing) && o;
        try {
          return JSON.parse(l, this.parseReviver);
        } catch (p) {
          if (m)
            throw p.name === "SyntaxError"
              ? be.from(p, be.ERR_BAD_RESPONSE, this, null, this.response)
              : p;
        }
      }
      return l;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: ut.classes.FormData, Blob: ut.classes.Blob },
  validateStatus: function (l) {
    return l >= 200 && l < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
L.forEach(["delete", "get", "head", "post", "put", "patch"], (n) => {
  Ms.headers[n] = {};
});
const hx = L.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  mx = (n) => {
    const l = {};
    let i, u, o;
    return (
      n &&
        n
          .split(
            `
`,
          )
          .forEach(function (m) {
            ((o = m.indexOf(":")),
              (i = m.substring(0, o).trim().toLowerCase()),
              (u = m.substring(o + 1).trim()),
              !(!i || (l[i] && hx[i])) &&
                (i === "set-cookie"
                  ? l[i]
                    ? l[i].push(u)
                    : (l[i] = [u])
                  : (l[i] = l[i] ? l[i] + ", " + u : u)));
          }),
      l
    );
  },
  op = Symbol("internals");
function Es(n) {
  return n && String(n).trim().toLowerCase();
}
function ar(n) {
  return n === !1 || n == null ? n : L.isArray(n) ? n.map(ar) : String(n);
}
function px(n) {
  const l = Object.create(null),
    i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let u;
  for (; (u = i.exec(n)); ) l[u[1]] = u[2];
  return l;
}
const yx = (n) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());
function Po(n, l, i, u, o) {
  if (L.isFunction(u)) return u.call(this, l, i);
  if ((o && (l = i), !!L.isString(l))) {
    if (L.isString(u)) return l.indexOf(u) !== -1;
    if (L.isRegExp(u)) return u.test(l);
  }
}
function bx(n) {
  return n
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (l, i, u) => i.toUpperCase() + u);
}
function gx(n, l) {
  const i = L.toCamelCase(" " + l);
  ["get", "set", "has"].forEach((u) => {
    Object.defineProperty(n, u + i, {
      value: function (o, d, m) {
        return this[u].call(this, l, o, d, m);
      },
      configurable: !0,
    });
  });
}
let xt = class {
  constructor(l) {
    l && this.set(l);
  }
  set(l, i, u) {
    const o = this;
    function d(p, b, y) {
      const v = Es(b);
      if (!v) throw new Error("header name must be a non-empty string");
      const S = L.findKey(o, v);
      (!S || o[S] === void 0 || y === !0 || (y === void 0 && o[S] !== !1)) &&
        (o[S || b] = ar(p));
    }
    const m = (p, b) => L.forEach(p, (y, v) => d(y, v, b));
    if (L.isPlainObject(l) || l instanceof this.constructor) m(l, i);
    else if (L.isString(l) && (l = l.trim()) && !yx(l)) m(mx(l), i);
    else if (L.isObject(l) && L.isIterable(l)) {
      let p = {},
        b,
        y;
      for (const v of l) {
        if (!L.isArray(v))
          throw TypeError("Object iterator must return a key-value pair");
        p[(y = v[0])] = (b = p[y])
          ? L.isArray(b)
            ? [...b, v[1]]
            : [b, v[1]]
          : v[1];
      }
      m(p, i);
    } else l != null && d(i, l, u);
    return this;
  }
  get(l, i) {
    if (((l = Es(l)), l)) {
      const u = L.findKey(this, l);
      if (u) {
        const o = this[u];
        if (!i) return o;
        if (i === !0) return px(o);
        if (L.isFunction(i)) return i.call(this, o, u);
        if (L.isRegExp(i)) return i.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(l, i) {
    if (((l = Es(l)), l)) {
      const u = L.findKey(this, l);
      return !!(u && this[u] !== void 0 && (!i || Po(this, this[u], u, i)));
    }
    return !1;
  }
  delete(l, i) {
    const u = this;
    let o = !1;
    function d(m) {
      if (((m = Es(m)), m)) {
        const p = L.findKey(u, m);
        p && (!i || Po(u, u[p], p, i)) && (delete u[p], (o = !0));
      }
    }
    return (L.isArray(l) ? l.forEach(d) : d(l), o);
  }
  clear(l) {
    const i = Object.keys(this);
    let u = i.length,
      o = !1;
    for (; u--; ) {
      const d = i[u];
      (!l || Po(this, this[d], d, l, !0)) && (delete this[d], (o = !0));
    }
    return o;
  }
  normalize(l) {
    const i = this,
      u = {};
    return (
      L.forEach(this, (o, d) => {
        const m = L.findKey(u, d);
        if (m) {
          ((i[m] = ar(o)), delete i[d]);
          return;
        }
        const p = l ? bx(d) : String(d).trim();
        (p !== d && delete i[d], (i[p] = ar(o)), (u[p] = !0));
      }),
      this
    );
  }
  concat(...l) {
    return this.constructor.concat(this, ...l);
  }
  toJSON(l) {
    const i = Object.create(null);
    return (
      L.forEach(this, (u, o) => {
        u != null && u !== !1 && (i[o] = l && L.isArray(u) ? u.join(", ") : u);
      }),
      i
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([l, i]) => l + ": " + i).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(l) {
    return l instanceof this ? l : new this(l);
  }
  static concat(l, ...i) {
    const u = new this(l);
    return (i.forEach((o) => u.set(o)), u);
  }
  static accessor(l) {
    const u = (this[op] = this[op] = { accessors: {} }).accessors,
      o = this.prototype;
    function d(m) {
      const p = Es(m);
      u[p] || (gx(o, m), (u[p] = !0));
    }
    return (L.isArray(l) ? l.forEach(d) : d(l), this);
  }
};
xt.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
L.reduceDescriptors(xt.prototype, ({ value: n }, l) => {
  let i = l[0].toUpperCase() + l.slice(1);
  return {
    get: () => n,
    set(u) {
      this[i] = u;
    },
  };
});
L.freezeMethods(xt);
function Wo(n, l) {
  const i = this || Ms,
    u = l || i,
    o = xt.from(u.headers);
  let d = u.data;
  return (
    L.forEach(n, function (p) {
      d = p.call(i, d, o.normalize(), l ? l.status : void 0);
    }),
    o.normalize(),
    d
  );
}
function uy(n) {
  return !!(n && n.__CANCEL__);
}
function wn(n, l, i) {
  (be.call(this, n ?? "canceled", be.ERR_CANCELED, l, i),
    (this.name = "CanceledError"));
}
L.inherits(wn, be, { __CANCEL__: !0 });
function oy(n, l, i) {
  const u = i.config.validateStatus;
  !i.status || !u || u(i.status)
    ? n(i)
    : l(
        new be(
          "Request failed with status code " + i.status,
          [be.ERR_BAD_REQUEST, be.ERR_BAD_RESPONSE][
            Math.floor(i.status / 100) - 4
          ],
          i.config,
          i.request,
          i,
        ),
      );
}
function vx(n) {
  const l = /^([-+\w]{1,25})(:?\/\/|:)/.exec(n);
  return (l && l[1]) || "";
}
function xx(n, l) {
  n = n || 10;
  const i = new Array(n),
    u = new Array(n);
  let o = 0,
    d = 0,
    m;
  return (
    (l = l !== void 0 ? l : 1e3),
    function (b) {
      const y = Date.now(),
        v = u[d];
      (m || (m = y), (i[o] = b), (u[o] = y));
      let S = d,
        E = 0;
      for (; S !== o; ) ((E += i[S++]), (S = S % n));
      if (((o = (o + 1) % n), o === d && (d = (d + 1) % n), y - m < l)) return;
      const T = v && y - v;
      return T ? Math.round((E * 1e3) / T) : void 0;
    }
  );
}
function Sx(n, l) {
  let i = 0,
    u = 1e3 / l,
    o,
    d;
  const m = (y, v = Date.now()) => {
    ((i = v), (o = null), d && (clearTimeout(d), (d = null)), n(...y));
  };
  return [
    (...y) => {
      const v = Date.now(),
        S = v - i;
      S >= u
        ? m(y, v)
        : ((o = y),
          d ||
            (d = setTimeout(() => {
              ((d = null), m(o));
            }, u - S)));
    },
    () => o && m(o),
  ];
}
const ur = (n, l, i = 3) => {
    let u = 0;
    const o = xx(50, 250);
    return Sx((d) => {
      const m = d.loaded,
        p = d.lengthComputable ? d.total : void 0,
        b = m - u,
        y = o(b),
        v = m <= p;
      u = m;
      const S = {
        loaded: m,
        total: p,
        progress: p ? m / p : void 0,
        bytes: b,
        rate: y || void 0,
        estimated: y && p && v ? (p - m) / y : void 0,
        event: d,
        lengthComputable: p != null,
        [l ? "download" : "upload"]: !0,
      };
      n(S);
    }, i);
  },
  cp = (n, l) => {
    const i = n != null;
    return [(u) => l[0]({ lengthComputable: i, total: n, loaded: u }), l[1]];
  },
  fp =
    (n) =>
    (...l) =>
      L.asap(() => n(...l)),
  Nx = ut.hasStandardBrowserEnv
    ? ((n, l) => (i) => (
        (i = new URL(i, ut.origin)),
        n.protocol === i.protocol &&
          n.host === i.host &&
          (l || n.port === i.port)
      ))(
        new URL(ut.origin),
        ut.navigator && /(msie|trident)/i.test(ut.navigator.userAgent),
      )
    : () => !0,
  jx = ut.hasStandardBrowserEnv
    ? {
        write(n, l, i, u, o, d) {
          const m = [n + "=" + encodeURIComponent(l)];
          (L.isNumber(i) && m.push("expires=" + new Date(i).toGMTString()),
            L.isString(u) && m.push("path=" + u),
            L.isString(o) && m.push("domain=" + o),
            d === !0 && m.push("secure"),
            (document.cookie = m.join("; ")));
        },
        read(n) {
          const l = document.cookie.match(
            new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"),
          );
          return l ? decodeURIComponent(l[3]) : null;
        },
        remove(n) {
          this.write(n, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function Ex(n) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(n);
}
function wx(n, l) {
  return l ? n.replace(/\/?\/$/, "") + "/" + l.replace(/^\/+/, "") : n;
}
function cy(n, l, i) {
  let u = !Ex(l);
  return n && (u || i == !1) ? wx(n, l) : l;
}
const dp = (n) => (n instanceof xt ? { ...n } : n);
function Ra(n, l) {
  l = l || {};
  const i = {};
  function u(y, v, S, E) {
    return L.isPlainObject(y) && L.isPlainObject(v)
      ? L.merge.call({ caseless: E }, y, v)
      : L.isPlainObject(v)
        ? L.merge({}, v)
        : L.isArray(v)
          ? v.slice()
          : v;
  }
  function o(y, v, S, E) {
    if (L.isUndefined(v)) {
      if (!L.isUndefined(y)) return u(void 0, y, S, E);
    } else return u(y, v, S, E);
  }
  function d(y, v) {
    if (!L.isUndefined(v)) return u(void 0, v);
  }
  function m(y, v) {
    if (L.isUndefined(v)) {
      if (!L.isUndefined(y)) return u(void 0, y);
    } else return u(void 0, v);
  }
  function p(y, v, S) {
    if (S in l) return u(y, v);
    if (S in n) return u(void 0, y);
  }
  const b = {
    url: d,
    method: d,
    data: d,
    baseURL: m,
    transformRequest: m,
    transformResponse: m,
    paramsSerializer: m,
    timeout: m,
    timeoutMessage: m,
    withCredentials: m,
    withXSRFToken: m,
    adapter: m,
    responseType: m,
    xsrfCookieName: m,
    xsrfHeaderName: m,
    onUploadProgress: m,
    onDownloadProgress: m,
    decompress: m,
    maxContentLength: m,
    maxBodyLength: m,
    beforeRedirect: m,
    transport: m,
    httpAgent: m,
    httpsAgent: m,
    cancelToken: m,
    socketPath: m,
    responseEncoding: m,
    validateStatus: p,
    headers: (y, v, S) => o(dp(y), dp(v), S, !0),
  };
  return (
    L.forEach(Object.keys({ ...n, ...l }), function (v) {
      const S = b[v] || o,
        E = S(n[v], l[v], v);
      (L.isUndefined(E) && S !== p) || (i[v] = E);
    }),
    i
  );
}
const fy = (n) => {
    const l = Ra({}, n);
    let {
      data: i,
      withXSRFToken: u,
      xsrfHeaderName: o,
      xsrfCookieName: d,
      headers: m,
      auth: p,
    } = l;
    if (
      ((l.headers = m = xt.from(m)),
      (l.url = sy(
        cy(l.baseURL, l.url, l.allowAbsoluteUrls),
        n.params,
        n.paramsSerializer,
      )),
      p &&
        m.set(
          "Authorization",
          "Basic " +
            btoa(
              (p.username || "") +
                ":" +
                (p.password ? unescape(encodeURIComponent(p.password)) : ""),
            ),
        ),
      L.isFormData(i))
    ) {
      if (ut.hasStandardBrowserEnv || ut.hasStandardBrowserWebWorkerEnv)
        m.setContentType(void 0);
      else if (L.isFunction(i.getHeaders)) {
        const b = i.getHeaders(),
          y = ["content-type", "content-length"];
        Object.entries(b).forEach(([v, S]) => {
          y.includes(v.toLowerCase()) && m.set(v, S);
        });
      }
    }
    if (
      ut.hasStandardBrowserEnv &&
      (u && L.isFunction(u) && (u = u(l)), u || (u !== !1 && Nx(l.url)))
    ) {
      const b = o && d && jx.read(d);
      b && m.set(o, b);
    }
    return l;
  },
  _x = typeof XMLHttpRequest < "u",
  Cx =
    _x &&
    function (n) {
      return new Promise(function (i, u) {
        const o = fy(n);
        let d = o.data;
        const m = xt.from(o.headers).normalize();
        let { responseType: p, onUploadProgress: b, onDownloadProgress: y } = o,
          v,
          S,
          E,
          T,
          N;
        function j() {
          (T && T(),
            N && N(),
            o.cancelToken && o.cancelToken.unsubscribe(v),
            o.signal && o.signal.removeEventListener("abort", v));
        }
        let g = new XMLHttpRequest();
        (g.open(o.method.toUpperCase(), o.url, !0), (g.timeout = o.timeout));
        function A() {
          if (!g) return;
          const q = xt.from(
              "getAllResponseHeaders" in g && g.getAllResponseHeaders(),
            ),
            k = {
              data:
                !p || p === "text" || p === "json"
                  ? g.responseText
                  : g.response,
              status: g.status,
              statusText: g.statusText,
              headers: q,
              config: n,
              request: g,
            };
          (oy(
            function (K) {
              (i(K), j());
            },
            function (K) {
              (u(K), j());
            },
            k,
          ),
            (g = null));
        }
        ("onloadend" in g
          ? (g.onloadend = A)
          : (g.onreadystatechange = function () {
              !g ||
                g.readyState !== 4 ||
                (g.status === 0 &&
                  !(g.responseURL && g.responseURL.indexOf("file:") === 0)) ||
                setTimeout(A);
            }),
          (g.onabort = function () {
            g &&
              (u(new be("Request aborted", be.ECONNABORTED, n, g)), (g = null));
          }),
          (g.onerror = function (Z) {
            const k = Z && Z.message ? Z.message : "Network Error",
              F = new be(k, be.ERR_NETWORK, n, g);
            ((F.event = Z || null), u(F), (g = null));
          }),
          (g.ontimeout = function () {
            let Z = o.timeout
              ? "timeout of " + o.timeout + "ms exceeded"
              : "timeout exceeded";
            const k = o.transitional || iy;
            (o.timeoutErrorMessage && (Z = o.timeoutErrorMessage),
              u(
                new be(
                  Z,
                  k.clarifyTimeoutError ? be.ETIMEDOUT : be.ECONNABORTED,
                  n,
                  g,
                ),
              ),
              (g = null));
          }),
          d === void 0 && m.setContentType(null),
          "setRequestHeader" in g &&
            L.forEach(m.toJSON(), function (Z, k) {
              g.setRequestHeader(k, Z);
            }),
          L.isUndefined(o.withCredentials) ||
            (g.withCredentials = !!o.withCredentials),
          p && p !== "json" && (g.responseType = o.responseType),
          y && (([E, N] = ur(y, !0)), g.addEventListener("progress", E)),
          b &&
            g.upload &&
            (([S, T] = ur(b)),
            g.upload.addEventListener("progress", S),
            g.upload.addEventListener("loadend", T)),
          (o.cancelToken || o.signal) &&
            ((v = (q) => {
              g &&
                (u(!q || q.type ? new wn(null, n, g) : q),
                g.abort(),
                (g = null));
            }),
            o.cancelToken && o.cancelToken.subscribe(v),
            o.signal &&
              (o.signal.aborted
                ? v()
                : o.signal.addEventListener("abort", v))));
        const R = vx(o.url);
        if (R && ut.protocols.indexOf(R) === -1) {
          u(new be("Unsupported protocol " + R + ":", be.ERR_BAD_REQUEST, n));
          return;
        }
        g.send(d || null);
      });
    },
  Tx = (n, l) => {
    const { length: i } = (n = n ? n.filter(Boolean) : []);
    if (l || i) {
      let u = new AbortController(),
        o;
      const d = function (y) {
        if (!o) {
          ((o = !0), p());
          const v = y instanceof Error ? y : this.reason;
          u.abort(
            v instanceof be ? v : new wn(v instanceof Error ? v.message : v),
          );
        }
      };
      let m =
        l &&
        setTimeout(() => {
          ((m = null), d(new be(`timeout ${l} of ms exceeded`, be.ETIMEDOUT)));
        }, l);
      const p = () => {
        n &&
          (m && clearTimeout(m),
          (m = null),
          n.forEach((y) => {
            y.unsubscribe
              ? y.unsubscribe(d)
              : y.removeEventListener("abort", d);
          }),
          (n = null));
      };
      n.forEach((y) => y.addEventListener("abort", d));
      const { signal: b } = u;
      return ((b.unsubscribe = () => L.asap(p)), b);
    }
  },
  Ax = function* (n, l) {
    let i = n.byteLength;
    if (i < l) {
      yield n;
      return;
    }
    let u = 0,
      o;
    for (; u < i; ) ((o = u + l), yield n.slice(u, o), (u = o));
  },
  Rx = async function* (n, l) {
    for await (const i of Ox(n)) yield* Ax(i, l);
  },
  Ox = async function* (n) {
    if (n[Symbol.asyncIterator]) {
      yield* n;
      return;
    }
    const l = n.getReader();
    try {
      for (;;) {
        const { done: i, value: u } = await l.read();
        if (i) break;
        yield u;
      }
    } finally {
      await l.cancel();
    }
  },
  hp = (n, l, i, u) => {
    const o = Rx(n, l);
    let d = 0,
      m,
      p = (b) => {
        m || ((m = !0), u && u(b));
      };
    return new ReadableStream(
      {
        async pull(b) {
          try {
            const { done: y, value: v } = await o.next();
            if (y) {
              (p(), b.close());
              return;
            }
            let S = v.byteLength;
            if (i) {
              let E = (d += S);
              i(E);
            }
            b.enqueue(new Uint8Array(v));
          } catch (y) {
            throw (p(y), y);
          }
        },
        cancel(b) {
          return (p(b), o.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  mp = 64 * 1024,
  { isFunction: Ii } = L,
  Dx = (({ Request: n, Response: l }) => ({ Request: n, Response: l }))(
    L.global,
  ),
  { ReadableStream: pp, TextEncoder: yp } = L.global,
  bp = (n, ...l) => {
    try {
      return !!n(...l);
    } catch {
      return !1;
    }
  },
  Mx = (n) => {
    n = L.merge.call({ skipUndefined: !0 }, Dx, n);
    const { fetch: l, Request: i, Response: u } = n,
      o = l ? Ii(l) : typeof fetch == "function",
      d = Ii(i),
      m = Ii(u);
    if (!o) return !1;
    const p = o && Ii(pp),
      b =
        o &&
        (typeof yp == "function"
          ? (
              (N) => (j) =>
                N.encode(j)
            )(new yp())
          : async (N) => new Uint8Array(await new i(N).arrayBuffer())),
      y =
        d &&
        p &&
        bp(() => {
          let N = !1;
          const j = new i(ut.origin, {
            body: new pp(),
            method: "POST",
            get duplex() {
              return ((N = !0), "half");
            },
          }).headers.has("Content-Type");
          return N && !j;
        }),
      v = m && p && bp(() => L.isReadableStream(new u("").body)),
      S = { stream: v && ((N) => N.body) };
    o &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((N) => {
        !S[N] &&
          (S[N] = (j, g) => {
            let A = j && j[N];
            if (A) return A.call(j);
            throw new be(
              `Response type '${N}' is not supported`,
              be.ERR_NOT_SUPPORT,
              g,
            );
          });
      });
    const E = async (N) => {
        if (N == null) return 0;
        if (L.isBlob(N)) return N.size;
        if (L.isSpecCompliantForm(N))
          return (
            await new i(ut.origin, { method: "POST", body: N }).arrayBuffer()
          ).byteLength;
        if (L.isArrayBufferView(N) || L.isArrayBuffer(N)) return N.byteLength;
        if ((L.isURLSearchParams(N) && (N = N + ""), L.isString(N)))
          return (await b(N)).byteLength;
      },
      T = async (N, j) => {
        const g = L.toFiniteNumber(N.getContentLength());
        return g ?? E(j);
      };
    return async (N) => {
      let {
          url: j,
          method: g,
          data: A,
          signal: R,
          cancelToken: q,
          timeout: Z,
          onDownloadProgress: k,
          onUploadProgress: F,
          responseType: K,
          headers: V,
          withCredentials: P = "same-origin",
          fetchOptions: ee,
        } = fy(N),
        le = l || fetch;
      K = K ? (K + "").toLowerCase() : "text";
      let se = Tx([R, q && q.toAbortSignal()], Z),
        me = null;
      const ce =
        se &&
        se.unsubscribe &&
        (() => {
          se.unsubscribe();
        });
      let pe;
      try {
        if (
          F &&
          y &&
          g !== "get" &&
          g !== "head" &&
          (pe = await T(V, A)) !== 0
        ) {
          let _ = new i(j, { method: "POST", body: A, duplex: "half" }),
            Q;
          if (
            (L.isFormData(A) &&
              (Q = _.headers.get("content-type")) &&
              V.setContentType(Q),
            _.body)
          ) {
            const [$, W] = cp(pe, ur(fp(F)));
            A = hp(_.body, mp, $, W);
          }
        }
        L.isString(P) || (P = P ? "include" : "omit");
        const M = d && "credentials" in i.prototype,
          J = {
            ...ee,
            signal: se,
            method: g.toUpperCase(),
            headers: V.normalize().toJSON(),
            body: A,
            duplex: "half",
            credentials: M ? P : void 0,
          };
        me = d && new i(j, J);
        let I = await (d ? le(me, ee) : le(j, J));
        const ne = v && (K === "stream" || K === "response");
        if (v && (k || (ne && ce))) {
          const _ = {};
          ["status", "statusText", "headers"].forEach((ie) => {
            _[ie] = I[ie];
          });
          const Q = L.toFiniteNumber(I.headers.get("content-length")),
            [$, W] = (k && cp(Q, ur(fp(k), !0))) || [];
          I = new u(
            hp(I.body, mp, $, () => {
              (W && W(), ce && ce());
            }),
            _,
          );
        }
        K = K || "text";
        let de = await S[L.findKey(S, K) || "text"](I, N);
        return (
          !ne && ce && ce(),
          await new Promise((_, Q) => {
            oy(_, Q, {
              data: de,
              headers: xt.from(I.headers),
              status: I.status,
              statusText: I.statusText,
              config: N,
              request: me,
            });
          })
        );
      } catch (M) {
        throw (
          ce && ce(),
          M && M.name === "TypeError" && /Load failed|fetch/i.test(M.message)
            ? Object.assign(new be("Network Error", be.ERR_NETWORK, N, me), {
                cause: M.cause || M,
              })
            : be.from(M, M && M.code, N, me)
        );
      }
    };
  },
  Ux = new Map(),
  dy = (n) => {
    let l = n ? n.env : {};
    const { fetch: i, Request: u, Response: o } = l,
      d = [u, o, i];
    let m = d.length,
      p = m,
      b,
      y,
      v = Ux;
    for (; p--; )
      ((b = d[p]),
        (y = v.get(b)),
        y === void 0 && v.set(b, (y = p ? new Map() : Mx(l))),
        (v = y));
    return y;
  };
dy();
const dc = { http: Pv, xhr: Cx, fetch: { get: dy } };
L.forEach(dc, (n, l) => {
  if (n) {
    try {
      Object.defineProperty(n, "name", { value: l });
    } catch {}
    Object.defineProperty(n, "adapterName", { value: l });
  }
});
const gp = (n) => `- ${n}`,
  zx = (n) => L.isFunction(n) || n === null || n === !1,
  hy = {
    getAdapter: (n, l) => {
      n = L.isArray(n) ? n : [n];
      const { length: i } = n;
      let u, o;
      const d = {};
      for (let m = 0; m < i; m++) {
        u = n[m];
        let p;
        if (
          ((o = u),
          !zx(u) && ((o = dc[(p = String(u)).toLowerCase()]), o === void 0))
        )
          throw new be(`Unknown adapter '${p}'`);
        if (o && (L.isFunction(o) || (o = o.get(l)))) break;
        d[p || "#" + m] = o;
      }
      if (!o) {
        const m = Object.entries(d).map(
          ([b, y]) =>
            `adapter ${b} ` +
            (y === !1
              ? "is not supported by the environment"
              : "is not available in the build"),
        );
        let p = i
          ? m.length > 1
            ? `since :
` +
              m.map(gp).join(`
`)
            : " " + gp(m[0])
          : "as no adapter specified";
        throw new be(
          "There is no suitable adapter to dispatch the request " + p,
          "ERR_NOT_SUPPORT",
        );
      }
      return o;
    },
    adapters: dc,
  };
function Io(n) {
  if (
    (n.cancelToken && n.cancelToken.throwIfRequested(),
    n.signal && n.signal.aborted)
  )
    throw new wn(null, n);
}
function vp(n) {
  return (
    Io(n),
    (n.headers = xt.from(n.headers)),
    (n.data = Wo.call(n, n.transformRequest)),
    ["post", "put", "patch"].indexOf(n.method) !== -1 &&
      n.headers.setContentType("application/x-www-form-urlencoded", !1),
    hy
      .getAdapter(
        n.adapter || Ms.adapter,
        n,
      )(n)
      .then(
        function (u) {
          return (
            Io(n),
            (u.data = Wo.call(n, n.transformResponse, u)),
            (u.headers = xt.from(u.headers)),
            u
          );
        },
        function (u) {
          return (
            uy(u) ||
              (Io(n),
              u &&
                u.response &&
                ((u.response.data = Wo.call(
                  n,
                  n.transformResponse,
                  u.response,
                )),
                (u.response.headers = xt.from(u.response.headers)))),
            Promise.reject(u)
          );
        },
      )
  );
}
const my = "1.12.2",
  yr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (n, l) => {
    yr[n] = function (u) {
      return typeof u === n || "a" + (l < 1 ? "n " : " ") + n;
    };
  },
);
const xp = {};
yr.transitional = function (l, i, u) {
  function o(d, m) {
    return (
      "[Axios v" +
      my +
      "] Transitional option '" +
      d +
      "'" +
      m +
      (u ? ". " + u : "")
    );
  }
  return (d, m, p) => {
    if (l === !1)
      throw new be(
        o(m, " has been removed" + (i ? " in " + i : "")),
        be.ERR_DEPRECATED,
      );
    return (
      i &&
        !xp[m] &&
        ((xp[m] = !0),
        console.warn(
          o(
            m,
            " has been deprecated since v" +
              i +
              " and will be removed in the near future",
          ),
        )),
      l ? l(d, m, p) : !0
    );
  };
};
yr.spelling = function (l) {
  return (i, u) => (console.warn(`${u} is likely a misspelling of ${l}`), !0);
};
function Bx(n, l, i) {
  if (typeof n != "object")
    throw new be("options must be an object", be.ERR_BAD_OPTION_VALUE);
  const u = Object.keys(n);
  let o = u.length;
  for (; o-- > 0; ) {
    const d = u[o],
      m = l[d];
    if (m) {
      const p = n[d],
        b = p === void 0 || m(p, d, n);
      if (b !== !0)
        throw new be("option " + d + " must be " + b, be.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (i !== !0) throw new be("Unknown option " + d, be.ERR_BAD_OPTION);
  }
}
const nr = { assertOptions: Bx, validators: yr },
  tl = nr.validators;
let Ca = class {
  constructor(l) {
    ((this.defaults = l || {}),
      (this.interceptors = { request: new up(), response: new up() }));
  }
  async request(l, i) {
    try {
      return await this._request(l, i);
    } catch (u) {
      if (u instanceof Error) {
        let o = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(o)
          : (o = new Error());
        const d = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          u.stack
            ? d &&
              !String(u.stack).endsWith(d.replace(/^.+\n.+\n/, "")) &&
              (u.stack +=
                `
` + d)
            : (u.stack = d);
        } catch {}
      }
      throw u;
    }
  }
  _request(l, i) {
    (typeof l == "string" ? ((i = i || {}), (i.url = l)) : (i = l || {}),
      (i = Ra(this.defaults, i)));
    const { transitional: u, paramsSerializer: o, headers: d } = i;
    (u !== void 0 &&
      nr.assertOptions(
        u,
        {
          silentJSONParsing: tl.transitional(tl.boolean),
          forcedJSONParsing: tl.transitional(tl.boolean),
          clarifyTimeoutError: tl.transitional(tl.boolean),
        },
        !1,
      ),
      o != null &&
        (L.isFunction(o)
          ? (i.paramsSerializer = { serialize: o })
          : nr.assertOptions(
              o,
              { encode: tl.function, serialize: tl.function },
              !0,
            )),
      i.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (i.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (i.allowAbsoluteUrls = !0)),
      nr.assertOptions(
        i,
        {
          baseUrl: tl.spelling("baseURL"),
          withXsrfToken: tl.spelling("withXSRFToken"),
        },
        !0,
      ),
      (i.method = (i.method || this.defaults.method || "get").toLowerCase()));
    let m = d && L.merge(d.common, d[i.method]);
    (d &&
      L.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (N) => {
          delete d[N];
        },
      ),
      (i.headers = xt.concat(m, d)));
    const p = [];
    let b = !0;
    this.interceptors.request.forEach(function (j) {
      (typeof j.runWhen == "function" && j.runWhen(i) === !1) ||
        ((b = b && j.synchronous), p.unshift(j.fulfilled, j.rejected));
    });
    const y = [];
    this.interceptors.response.forEach(function (j) {
      y.push(j.fulfilled, j.rejected);
    });
    let v,
      S = 0,
      E;
    if (!b) {
      const N = [vp.bind(this), void 0];
      for (
        N.unshift(...p), N.push(...y), E = N.length, v = Promise.resolve(i);
        S < E;
      )
        v = v.then(N[S++], N[S++]);
      return v;
    }
    E = p.length;
    let T = i;
    for (; S < E; ) {
      const N = p[S++],
        j = p[S++];
      try {
        T = N(T);
      } catch (g) {
        j.call(this, g);
        break;
      }
    }
    try {
      v = vp.call(this, T);
    } catch (N) {
      return Promise.reject(N);
    }
    for (S = 0, E = y.length; S < E; ) v = v.then(y[S++], y[S++]);
    return v;
  }
  getUri(l) {
    l = Ra(this.defaults, l);
    const i = cy(l.baseURL, l.url, l.allowAbsoluteUrls);
    return sy(i, l.params, l.paramsSerializer);
  }
};
L.forEach(["delete", "get", "head", "options"], function (l) {
  Ca.prototype[l] = function (i, u) {
    return this.request(
      Ra(u || {}, { method: l, url: i, data: (u || {}).data }),
    );
  };
});
L.forEach(["post", "put", "patch"], function (l) {
  function i(u) {
    return function (d, m, p) {
      return this.request(
        Ra(p || {}, {
          method: l,
          headers: u ? { "Content-Type": "multipart/form-data" } : {},
          url: d,
          data: m,
        }),
      );
    };
  }
  ((Ca.prototype[l] = i()), (Ca.prototype[l + "Form"] = i(!0)));
});
let qx = class py {
  constructor(l) {
    if (typeof l != "function")
      throw new TypeError("executor must be a function.");
    let i;
    this.promise = new Promise(function (d) {
      i = d;
    });
    const u = this;
    (this.promise.then((o) => {
      if (!u._listeners) return;
      let d = u._listeners.length;
      for (; d-- > 0; ) u._listeners[d](o);
      u._listeners = null;
    }),
      (this.promise.then = (o) => {
        let d;
        const m = new Promise((p) => {
          (u.subscribe(p), (d = p));
        }).then(o);
        return (
          (m.cancel = function () {
            u.unsubscribe(d);
          }),
          m
        );
      }),
      l(function (d, m, p) {
        u.reason || ((u.reason = new wn(d, m, p)), i(u.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(l) {
    if (this.reason) {
      l(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(l) : (this._listeners = [l]);
  }
  unsubscribe(l) {
    if (!this._listeners) return;
    const i = this._listeners.indexOf(l);
    i !== -1 && this._listeners.splice(i, 1);
  }
  toAbortSignal() {
    const l = new AbortController(),
      i = (u) => {
        l.abort(u);
      };
    return (
      this.subscribe(i),
      (l.signal.unsubscribe = () => this.unsubscribe(i)),
      l.signal
    );
  }
  static source() {
    let l;
    return {
      token: new py(function (o) {
        l = o;
      }),
      cancel: l,
    };
  }
};
function Lx(n) {
  return function (i) {
    return n.apply(null, i);
  };
}
function Hx(n) {
  return L.isObject(n) && n.isAxiosError === !0;
}
const hc = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(hc).forEach(([n, l]) => {
  hc[l] = n;
});
function yy(n) {
  const l = new Ca(n),
    i = Zp(Ca.prototype.request, l);
  return (
    L.extend(i, Ca.prototype, l, { allOwnKeys: !0 }),
    L.extend(i, l, null, { allOwnKeys: !0 }),
    (i.create = function (o) {
      return yy(Ra(n, o));
    }),
    i
  );
}
const Qe = yy(Ms);
Qe.Axios = Ca;
Qe.CanceledError = wn;
Qe.CancelToken = qx;
Qe.isCancel = uy;
Qe.VERSION = my;
Qe.toFormData = pr;
Qe.AxiosError = be;
Qe.Cancel = Qe.CanceledError;
Qe.all = function (l) {
  return Promise.all(l);
};
Qe.spread = Lx;
Qe.isAxiosError = Hx;
Qe.mergeConfig = Ra;
Qe.AxiosHeaders = xt;
Qe.formToJSON = (n) => ry(L.isHTMLForm(n) ? new FormData(n) : n);
Qe.getAdapter = hy.getAdapter;
Qe.HttpStatusCode = hc;
Qe.default = Qe;
const {
    Axios: w3,
    AxiosError: _3,
    CanceledError: C3,
    isCancel: T3,
    CancelToken: A3,
    VERSION: R3,
    all: O3,
    Cancel: D3,
    isAxiosError: M3,
    spread: U3,
    toFormData: z3,
    AxiosHeaders: B3,
    HttpStatusCode: q3,
    formToJSON: L3,
    getAdapter: H3,
    mergeConfig: Q3,
  } = Qe,
  Qx =
    "https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net/api",
  _n = Qe.create({
    baseURL: Qx,
    headers: { "Content-Type": "application/json" },
  });
_n.interceptors.request.use(
  (n) => {
    const l = localStorage.getItem("authToken");
    if (l)
      try {
        const i = JSON.parse(l);
        n.headers.Authorization = `Bearer ${i}`;
      } catch {
        n.headers.Authorization = `Bearer ${l}`;
      }
    return n;
  },
  (n) => Promise.reject(n),
);
_n.interceptors.response.use(
  (n) => n.data,
  (n) => {
    if ((console.error("Full error object:", n), n.response)) {
      const l =
        n.response.data?.message ||
        n.response.data?.errors ||
        n.message ||
        `Server error: ${n.response.status}`;
      console.error("API Error Response:", n.response.status, n.response.data);
      const i = new Error(l);
      return (
        (i.response = n.response),
        (i.status = n.response.status),
        Promise.reject(i)
      );
    } else if (n.request) {
      console.error("Network Error - No response received:", n.message);
      const l = new Error("Network error. Please check your connection.");
      return ((l.request = n.request), Promise.reject(l));
    } else return (console.error("Error:", n.message), Promise.reject(n));
  },
);
const Rl = (n, l = {}) => _n.get(n, l),
  Oa = (n, l, i = {}) => _n.post(n, l, i),
  Cn = (n, l, i = {}) => _n.put(n, l, i),
  Da = (n, l = {}) => _n.delete(n, l),
  br = "/Users",
  by = async () => await Rl(br),
  gy = async (n) => await Oa(br, n),
  Yx = async (n, l) => await Cn(`${br}/${n}`, l),
  Gx = async (n) => await Da(`${br}/${n}`),
  kx = async (n, l) => {
    try {
      const u = (await by()).find(
        (o) =>
          o.email === n ||
          o.first_name?.toLowerCase() === n?.toLowerCase() ||
          o.last_name?.toLowerCase() === n?.toLowerCase(),
      );
      if (!u) throw new Error("User not found");
      return (
        localStorage.setItem("authToken", JSON.stringify(u)),
        localStorage.setItem("currentUser", JSON.stringify(u)),
        u
      );
    } catch (i) {
      throw (console.error("Login error:", i), i);
    }
  },
  Kx = async (n) => {
    try {
      const l = {
          first_name: n.firstName,
          last_name: n.lastName,
          email: n.email,
          phone_number: n.contact,
          password_hash: n.password,
          role: "Student",
          booksBought: [],
          booksReserved: [],
        },
        i = await gy(l);
      return (
        localStorage.setItem("authToken", JSON.stringify(i)),
        localStorage.setItem("currentUser", JSON.stringify(i)),
        i
      );
    } catch (l) {
      throw (
        console.error("Signup error:", l),
        console.error("Error details:", l.response),
        console.error("Error message:", l.message),
        l
      );
    }
  },
  Xx = () => {
    (localStorage.removeItem("authToken"),
      localStorage.removeItem("currentUser"));
  },
  vy = () => {
    const n = localStorage.getItem("currentUser");
    return n ? JSON.parse(n) : null;
  };
function Vx() {
  const n = na(),
    [l, i] = D.useState(""),
    [u, o] = D.useState(""),
    [d, m] = D.useState(""),
    [p, b] = D.useState(!1),
    y = async (v) => {
      (v.preventDefault(), m(""), b(!0));
      try {
        (await kx(l, u), n("/dashboard"));
      } catch (S) {
        m(S.message || "Login failed. Please check your credentials.");
      } finally {
        b(!1);
      }
    };
  return f.jsx("div", {
    className: "min-h-screen flex items-center justify-center bg-[#f4f6fb] p-4",
    children: f.jsxs("div", {
      className:
        "flex w-full max-w-[900px] h-[550px] bg-white rounded-[10px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]",
      children: [
        f.jsx("div", {
          className: "w-1/2 bg-white flex items-center justify-center p-10",
          children: f.jsxs("div", {
            className: "w-full max-w-[300px]",
            children: [
              f.jsx("h2", {
                className: "text-2xl font-semibold text-gray-900 mb-2",
                children: "Welcome Back !!",
              }),
              f.jsx("p", {
                className: "text-gray-600 text-sm mb-8",
                children: "Please enter your credentials to log in",
              }),
              f.jsxs("form", {
                onSubmit: y,
                children: [
                  f.jsx("input", {
                    type: "email",
                    placeholder: "Email",
                    value: l,
                    onChange: (v) => i(v.target.value),
                    required: !0,
                    className:
                      "w-full px-3 py-2 mb-4 rounded-lg border border-gray-300 outline-none focus:border-[#1e255e] text-sm",
                  }),
                  f.jsx("input", {
                    type: "password",
                    placeholder: "Password",
                    value: u,
                    onChange: (v) => o(v.target.value),
                    required: !0,
                    className:
                      "w-full px-3 py-2 mb-4 rounded-lg border border-gray-300 outline-none focus:border-[#1e255e] text-sm",
                  }),
                  d &&
                    f.jsx("p", {
                      className: "text-red-500 text-xs mb-2",
                      children: d,
                    }),
                  f.jsx("a", {
                    href: "#",
                    onClick: () => n("/forgot-password"),
                    className:
                      "block mb-4 text-sm text-gray-700 hover:underline",
                    children: "Forgot password?",
                  }),
                  f.jsx("button", {
                    type: "submit",
                    disabled: p,
                    className:
                      "w-full py-2 bg-[#000035] text-white rounded-[20px] hover:bg-[#192261] transition-colors disabled:opacity-50",
                    children: p ? "LOGGING IN..." : "SIGN IN",
                  }),
                ],
              }),
            ],
          }),
        }),
        f.jsxs("div", {
          className:
            "w-1/2 bg-[#000035] text-white flex flex-col items-center justify-center rounded-tl-[60px] rounded-bl-[60px]",
          children: [
            f.jsx("img", {
              src: "/assets/logo.svg",
              alt: "BookHive Logo",
              className: "w-20 mb-5",
            }),
            f.jsxs("h1", {
              className: "text-3xl text-center mb-3",
              children: [
                "BookHive",
                f.jsx("br", {}),
                f.jsx("span", {
                  className:
                    "block font-['Caveat',cursive] text-3xl font-medium",
                  children: "Library",
                }),
              ],
            }),
            f.jsx("p", {
              className: "text-sm text-[#d9defa] mb-5",
              children: "New to our platform? Sign Up now.",
            }),
            f.jsx("button", {
              onClick: () => n("/signup"),
              className:
                "border border-white text-white px-6 py-2 rounded-[20px] hover:bg-white hover:text-[#000035] transition-colors",
              children: "SIGN UP",
            }),
          ],
        }),
      ],
    }),
  });
}
function Zx() {
  const n = na(),
    [l, i] = D.useState({
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      password: "",
    }),
    [u, o] = D.useState(""),
    [d, m] = D.useState(!1),
    p = (y) => {
      i({ ...l, [y.target.name]: y.target.value });
    },
    b = async (y) => {
      (y.preventDefault(), o(""), m(!0));
      try {
        (console.log("Signup form submitted with:", l),
          await Kx(l),
          console.log("Signup successful, navigating to dashboard"),
          n("/dashboard"));
      } catch (v) {
        console.error("Signup failed with error:", v);
        const S =
          v?.response?.data?.message ||
          v?.message ||
          "Signup failed. Please try again.";
        (console.error("Error message:", S), o(S));
      } finally {
        m(!1);
      }
    };
  return f.jsx("div", {
    className: "min-h-screen flex items-center justify-center bg-[#f5f7fb] p-4",
    children: f.jsxs("div", {
      className:
        "flex w-full max-w-[900px] h-[520px] bg-white rounded-[10px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]",
      children: [
        f.jsxs("div", {
          className:
            "w-[45%] bg-[#000035] text-white flex flex-col items-center justify-center p-10 rounded-tr-[60px] rounded-br-[60px]",
          children: [
            f.jsx("img", {
              src: "/assets/logo.svg",
              alt: "BookHive Logo",
              className: "w-24 mb-5",
            }),
            f.jsxs("h1", {
              className: "text-3xl text-center mb-5 leading-relaxed",
              children: [
                "BookHive",
                f.jsx("br", {}),
                f.jsx("span", {
                  className:
                    "block font-['Caveat',cursive] text-3xl font-medium",
                  children: "Library",
                }),
              ],
            }),
            f.jsx("p", {
              className: "text-sm text-[#d9defa] mb-5 text-center",
              children: "Already have Account? Sign In now.",
            }),
            f.jsx("button", {
              onClick: () => n("/login"),
              className:
                "border border-white text-white px-6 py-2 rounded-[25px] hover:bg-white hover:text-[#000035] transition-colors text-sm",
              children: "SIGN IN",
            }),
          ],
        }),
        f.jsx("div", {
          className: "w-[55%] bg-white flex items-center justify-center",
          children: f.jsxs("div", {
            className: "text-center w-[85%] max-w-[400px]",
            children: [
              f.jsx("img", {
                src: "/assets/logo.svg",
                alt: "Small Logo",
                className: "w-16 mb-4 mx-auto",
              }),
              f.jsx("h2", {
                className: "text-2xl font-semibold text-[#000035] mb-2",
                children: "Sign Up",
              }),
              f.jsx("p", {
                className: "text-gray-700 text-sm mb-6",
                children: "Please provide your information to sign up.",
              }),
              f.jsxs("form", {
                onSubmit: b,
                children: [
                  f.jsxs("div", {
                    className: "flex gap-2 mb-4",
                    children: [
                      f.jsx("input", {
                        type: "text",
                        name: "firstName",
                        placeholder: "First Name",
                        value: l.firstName,
                        onChange: p,
                        required: !0,
                        className:
                          "flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#000035]",
                      }),
                      f.jsx("input", {
                        type: "text",
                        name: "lastName",
                        placeholder: "Last Name",
                        value: l.lastName,
                        onChange: p,
                        required: !0,
                        className:
                          "flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#000035]",
                      }),
                    ],
                  }),
                  f.jsxs("div", {
                    className: "flex gap-2 mb-4",
                    children: [
                      f.jsx("input", {
                        type: "text",
                        name: "contact",
                        placeholder: "Contact No",
                        value: l.contact,
                        onChange: p,
                        required: !0,
                        className:
                          "flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#000035]",
                      }),
                      f.jsx("input", {
                        type: "email",
                        name: "email",
                        placeholder: "Email",
                        value: l.email,
                        onChange: p,
                        required: !0,
                        className:
                          "flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#000035]",
                      }),
                    ],
                  }),
                  f.jsx("div", {
                    className: "mb-4",
                    children: f.jsx("input", {
                      type: "password",
                      name: "password",
                      placeholder: "Password",
                      value: l.password,
                      onChange: p,
                      required: !0,
                      className:
                        "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#000035]",
                    }),
                  }),
                  u &&
                    f.jsx("p", {
                      className: "text-red-500 text-xs mb-2",
                      children: u,
                    }),
                  f.jsx("button", {
                    type: "submit",
                    disabled: d,
                    className:
                      "w-full py-2 bg-[#000035] text-white rounded-[20px] hover:bg-[#192261] transition-colors font-medium disabled:opacity-50",
                    children: d ? "SIGNING UP..." : "SIGN UP",
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function Fx() {
  const n = fe.c(20),
    l = na(),
    [i, u] = D.useState("");
  let o;
  n[0] !== l
    ? ((o = (R) => {
        (R.preventDefault(), l("/otp"));
      }),
      (n[0] = l),
      (n[1] = o))
    : (o = n[1]);
  const d = o;
  let m;
  n[2] === Symbol.for("react.memo_cache_sentinel")
    ? ((m = f.jsx("img", {
        src: "/assets/logo.svg",
        alt: "BookHive Logo",
        className: "w-24 mb-5",
      })),
      (n[2] = m))
    : (m = n[2]);
  let p;
  n[3] === Symbol.for("react.memo_cache_sentinel")
    ? ((p = f.jsxs("h1", {
        className: "text-3xl text-center mb-5 leading-relaxed",
        children: [
          "BookHive",
          f.jsx("br", {}),
          f.jsx("span", {
            className: "block font-['Caveat',cursive] text-3xl font-medium",
            children: "Library",
          }),
        ],
      })),
      (n[3] = p))
    : (p = n[3]);
  let b;
  n[4] === Symbol.for("react.memo_cache_sentinel")
    ? ((b = f.jsxs("div", {
        className:
          "w-1/2 bg-[#000035] text-white flex flex-col items-center justify-center p-10 rounded-tr-[60px] rounded-br-[60px]",
        children: [
          m,
          p,
          f.jsxs("p", {
            className: "text-sm text-[#d9defa] text-center leading-relaxed",
            children: [
              '"Your premier digital library',
              f.jsx("br", {}),
              'for borrowing and reading books"',
            ],
          }),
        ],
      })),
      (n[4] = b))
    : (b = n[4]);
  let y;
  n[5] !== l
    ? ((y = f.jsx("button", {
        onClick: () => l("/login"),
        className:
          "absolute top-5 right-5 border border-[#000035] rounded-[20px] px-4 py-1 text-xs hover:bg-[#000035] hover:text-white transition-colors",
        children: "BACK",
      })),
      (n[5] = l),
      (n[6] = y))
    : (y = n[6]);
  let v, S, E;
  n[7] === Symbol.for("react.memo_cache_sentinel")
    ? ((v = f.jsx("img", {
        src: "/assets/logo.svg",
        alt: "Small Logo",
        className: "w-16 mb-4 mx-auto",
      })),
      (S = f.jsx("h2", {
        className: "text-xl font-semibold text-[#000035] mb-2",
        children: "Forgot Password",
      })),
      (E = f.jsx("p", {
        className: "text-gray-700 text-sm mb-5",
        children: "Please enter your email",
      })),
      (n[7] = v),
      (n[8] = S),
      (n[9] = E))
    : ((v = n[7]), (S = n[8]), (E = n[9]));
  let T;
  n[10] === Symbol.for("react.memo_cache_sentinel")
    ? ((T = (R) => u(R.target.value)), (n[10] = T))
    : (T = n[10]);
  let N;
  n[11] !== i
    ? ((N = f.jsx("input", {
        type: "email",
        placeholder: "Email",
        value: i,
        onChange: T,
        required: !0,
        className:
          "w-full px-3 py-2 mb-5 rounded-lg border border-gray-300 outline-none focus:border-[#000035] text-sm",
      })),
      (n[11] = i),
      (n[12] = N))
    : (N = n[12]);
  let j;
  n[13] === Symbol.for("react.memo_cache_sentinel")
    ? ((j = f.jsx("button", {
        type: "submit",
        className:
          "w-full py-2 bg-[#000035] text-white rounded-[20px] hover:bg-[#192261] transition-colors",
        children: "RESET PASSWORD",
      })),
      (n[13] = j))
    : (j = n[13]);
  let g;
  n[14] !== d || n[15] !== N
    ? ((g = f.jsxs("div", {
        className: "text-center w-[80%] max-w-[300px]",
        children: [v, S, E, f.jsxs("form", { onSubmit: d, children: [N, j] })],
      })),
      (n[14] = d),
      (n[15] = N),
      (n[16] = g))
    : (g = n[16]);
  let A;
  return (
    n[17] !== g || n[18] !== y
      ? ((A = f.jsx("div", {
          className:
            "min-h-screen flex items-center justify-center bg-[#f5f7fb] p-4",
          children: f.jsxs("div", {
            className:
              "flex w-full max-w-[900px] h-[500px] bg-white rounded-[10px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]",
            children: [
              b,
              f.jsxs("div", {
                className:
                  "w-1/2 bg-white flex flex-col items-center justify-center relative",
                children: [y, g],
              }),
            ],
          }),
        })),
        (n[17] = g),
        (n[18] = y),
        (n[19] = A))
      : (A = n[19]),
    A
  );
}
function Jx() {
  const n = fe.c(22),
    l = na(),
    [i, u] = D.useState("");
  let o;
  n[0] !== l
    ? ((o = (q) => {
        (q.preventDefault(), l("/reset-password"));
      }),
      (n[0] = l),
      (n[1] = o))
    : (o = n[1]);
  const d = o;
  let m;
  n[2] !== l
    ? ((m = f.jsx("button", {
        onClick: () => l("/forgot-password"),
        className:
          "absolute top-5 left-5 border border-[#000035] rounded-[20px] px-4 py-1 text-xs hover:bg-[#000035] hover:text-white transition-colors",
        children: "BACK",
      })),
      (n[2] = l),
      (n[3] = m))
    : (m = n[3]);
  let p, b, y;
  n[4] === Symbol.for("react.memo_cache_sentinel")
    ? ((p = f.jsx("img", {
        src: "/assets/logo.svg",
        alt: "Small Logo",
        className: "w-16 mb-4 mx-auto",
      })),
      (b = f.jsx("h2", {
        className: "text-xl font-semibold text-[#000035] mb-2",
        children: "Check your Mailbox",
      })),
      (y = f.jsx("p", {
        className: "text-gray-700 text-sm mb-5",
        children: "Please enter the OTP to proceed",
      })),
      (n[4] = p),
      (n[5] = b),
      (n[6] = y))
    : ((p = n[4]), (b = n[5]), (y = n[6]));
  let v;
  n[7] === Symbol.for("react.memo_cache_sentinel")
    ? ((v = (q) => u(q.target.value)), (n[7] = v))
    : (v = n[7]);
  let S;
  n[8] !== i
    ? ((S = f.jsx("input", {
        type: "text",
        placeholder: "OTP",
        value: i,
        onChange: v,
        required: !0,
        className:
          "w-full px-3 py-2 mb-5 rounded-lg border border-gray-300 outline-none focus:border-[#000035] text-sm",
      })),
      (n[8] = i),
      (n[9] = S))
    : (S = n[9]);
  let E;
  n[10] === Symbol.for("react.memo_cache_sentinel")
    ? ((E = f.jsx("button", {
        type: "submit",
        className:
          "w-full py-2 bg-[#000035] text-white rounded-[20px] hover:bg-[#192261] transition-colors",
        children: "VERIFY",
      })),
      (n[10] = E))
    : (E = n[10]);
  let T;
  n[11] !== d || n[12] !== S
    ? ((T = f.jsxs("div", {
        className: "text-center w-[80%] max-w-[300px]",
        children: [p, b, y, f.jsxs("form", { onSubmit: d, children: [S, E] })],
      })),
      (n[11] = d),
      (n[12] = S),
      (n[13] = T))
    : (T = n[13]);
  let N;
  n[14] !== m || n[15] !== T
    ? ((N = f.jsxs("div", {
        className:
          "w-1/2 bg-white flex flex-col items-center justify-center relative",
        children: [m, T],
      })),
      (n[14] = m),
      (n[15] = T),
      (n[16] = N))
    : (N = n[16]);
  let j;
  n[17] === Symbol.for("react.memo_cache_sentinel")
    ? ((j = f.jsx("img", {
        src: "/assets/logo.svg",
        alt: "BookHive Logo",
        className: "w-24 mb-5",
      })),
      (n[17] = j))
    : (j = n[17]);
  let g;
  n[18] === Symbol.for("react.memo_cache_sentinel")
    ? ((g = f.jsxs("h1", {
        className: "text-3xl text-center mb-5 leading-relaxed",
        children: [
          "BookHive",
          f.jsx("br", {}),
          f.jsx("span", {
            className: "block font-['Caveat',cursive] text-3xl font-medium",
            children: "Library",
          }),
        ],
      })),
      (n[18] = g))
    : (g = n[18]);
  let A;
  n[19] === Symbol.for("react.memo_cache_sentinel")
    ? ((A = f.jsxs("div", {
        className:
          "w-1/2 bg-[#000035] text-white flex flex-col items-center justify-center p-10 rounded-tl-[60px] rounded-bl-[60px]",
        children: [
          j,
          g,
          f.jsxs("p", {
            className: "text-sm text-[#d9defa] text-center leading-relaxed",
            children: [
              '"Your premier digital library',
              f.jsx("br", {}),
              'for borrowing and reading books"',
            ],
          }),
        ],
      })),
      (n[19] = A))
    : (A = n[19]);
  let R;
  return (
    n[20] !== N
      ? ((R = f.jsx("div", {
          className:
            "min-h-screen flex items-center justify-center bg-[#f5f7fb] p-4",
          children: f.jsxs("div", {
            className:
              "flex w-full max-w-[900px] h-[500px] bg-white rounded-[10px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]",
            children: [N, A],
          }),
        })),
        (n[20] = N),
        (n[21] = R))
      : (R = n[21]),
    R
  );
}
function $x() {
  const n = fe.c(24),
    l = na(),
    [i, u] = D.useState(""),
    [o, d] = D.useState("");
  let m;
  n[0] !== l
    ? ((m = (F) => {
        (F.preventDefault(), l("/login"));
      }),
      (n[0] = l),
      (n[1] = m))
    : (m = n[1]);
  const p = m;
  let b;
  n[2] === Symbol.for("react.memo_cache_sentinel")
    ? ((b = f.jsx("img", {
        src: "/assets/logo.svg",
        alt: "BookHive Logo",
        className: "w-24 mb-5",
      })),
      (n[2] = b))
    : (b = n[2]);
  let y;
  n[3] === Symbol.for("react.memo_cache_sentinel")
    ? ((y = f.jsxs("h1", {
        className: "text-3xl text-center mb-5 leading-relaxed",
        children: [
          "BookHive",
          f.jsx("br", {}),
          f.jsx("span", {
            className: "block font-['Caveat',cursive] text-3xl font-medium",
            children: "Library",
          }),
        ],
      })),
      (n[3] = y))
    : (y = n[3]);
  let v;
  n[4] === Symbol.for("react.memo_cache_sentinel")
    ? ((v = f.jsxs("div", {
        className:
          "w-1/2 bg-[#000035] text-white flex flex-col items-center justify-center p-10 rounded-tr-[60px] rounded-br-[60px]",
        children: [
          b,
          y,
          f.jsxs("p", {
            className: "text-sm text-[#d9defa] text-center leading-relaxed",
            children: [
              '"Your premier digital library',
              f.jsx("br", {}),
              'for borrowing and reading books"',
            ],
          }),
        ],
      })),
      (n[4] = v))
    : (v = n[4]);
  let S;
  n[5] !== l
    ? ((S = f.jsx("button", {
        onClick: () => l("/otp"),
        className:
          "absolute top-5 right-5 border border-[#000035] rounded-[20px] px-4 py-1 text-xs hover:bg-[#000035] hover:text-white transition-colors",
        children: "BACK",
      })),
      (n[5] = l),
      (n[6] = S))
    : (S = n[6]);
  let E, T, N;
  n[7] === Symbol.for("react.memo_cache_sentinel")
    ? ((E = f.jsx("img", {
        src: "/assets/logo.svg",
        alt: "Small Logo",
        className: "w-16 mb-4 mx-auto",
      })),
      (T = f.jsx("h2", {
        className: "text-xl font-semibold text-[#000035] mb-2",
        children: "Reset Password",
      })),
      (N = f.jsx("p", {
        className: "text-gray-700 text-sm mb-5",
        children: "Please enter your new password",
      })),
      (n[7] = E),
      (n[8] = T),
      (n[9] = N))
    : ((E = n[7]), (T = n[8]), (N = n[9]));
  let j;
  n[10] === Symbol.for("react.memo_cache_sentinel")
    ? ((j = (F) => u(F.target.value)), (n[10] = j))
    : (j = n[10]);
  let g;
  n[11] !== i
    ? ((g = f.jsx("input", {
        type: "password",
        placeholder: "New Password",
        value: i,
        onChange: j,
        required: !0,
        className:
          "w-full px-3 py-2 mb-4 rounded-lg border border-gray-300 outline-none focus:border-[#000035] text-sm",
      })),
      (n[11] = i),
      (n[12] = g))
    : (g = n[12]);
  let A;
  n[13] === Symbol.for("react.memo_cache_sentinel")
    ? ((A = (F) => d(F.target.value)), (n[13] = A))
    : (A = n[13]);
  let R;
  n[14] !== o
    ? ((R = f.jsx("input", {
        type: "password",
        placeholder: "Confirm Password",
        value: o,
        onChange: A,
        required: !0,
        className:
          "w-full px-3 py-2 mb-5 rounded-lg border border-gray-300 outline-none focus:border-[#000035] text-sm",
      })),
      (n[14] = o),
      (n[15] = R))
    : (R = n[15]);
  let q;
  n[16] === Symbol.for("react.memo_cache_sentinel")
    ? ((q = f.jsx("button", {
        type: "submit",
        className:
          "w-full py-2 bg-[#000035] text-white rounded-[20px] hover:bg-[#192261] transition-colors",
        children: "RESET PASSWORD",
      })),
      (n[16] = q))
    : (q = n[16]);
  let Z;
  n[17] !== p || n[18] !== R || n[19] !== g
    ? ((Z = f.jsxs("div", {
        className: "text-center w-[80%] max-w-[300px]",
        children: [
          E,
          T,
          N,
          f.jsxs("form", { onSubmit: p, children: [g, R, q] }),
        ],
      })),
      (n[17] = p),
      (n[18] = R),
      (n[19] = g),
      (n[20] = Z))
    : (Z = n[20]);
  let k;
  return (
    n[21] !== Z || n[22] !== S
      ? ((k = f.jsx("div", {
          className:
            "min-h-screen flex items-center justify-center bg-[#f5f7fb] p-4",
          children: f.jsxs("div", {
            className:
              "flex w-full max-w-[900px] h-[500px] bg-white rounded-[10px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]",
            children: [
              v,
              f.jsxs("div", {
                className:
                  "w-1/2 bg-white flex flex-col items-center justify-center relative",
                children: [S, Z],
              }),
            ],
          }),
        })),
        (n[21] = Z),
        (n[22] = S),
        (n[23] = k))
      : (k = n[23]),
    k
  );
}
const Px = () => {
  const n = fe.c(23),
    [l, i] = D.useState("");
  let u;
  n[0] === Symbol.for("react.memo_cache_sentinel")
    ? ((u = vy()), (n[0] = u))
    : (u = n[0]);
  const [o] = D.useState(u),
    m = !(window.location.pathname === "/dashboard");
  let p;
  n[1] === Symbol.for("react.memo_cache_sentinel")
    ? ((p = f.jsx("div", { className: "w-9 h-9 bg-gray-200 rounded-full" })),
      (n[1] = p))
    : (p = n[1]);
  const b = o ? `${o.first_name} ${o.last_name}` : "Loading...";
  let y;
  n[2] !== b
    ? ((y = f.jsx("h3", { className: "text-lg font-semibold", children: b })),
      (n[2] = b),
      (n[3] = y))
    : (y = n[3]);
  const v = o?.role || "User";
  let S;
  n[4] !== v
    ? ((S = f.jsx("p", { className: "text-sm text-gray-600", children: v })),
      (n[4] = v),
      (n[5] = S))
    : (S = n[5]);
  let E;
  n[6] !== y || n[7] !== S
    ? ((E = f.jsxs("div", {
        className: "flex items-center gap-3",
        children: [p, f.jsxs("div", { children: [y, S] })],
      })),
      (n[6] = y),
      (n[7] = S),
      (n[8] = E))
    : (E = n[8]);
  let T;
  n[9] === Symbol.for("react.memo_cache_sentinel")
    ? ((T = f.jsx("span", {
        className: "text-xs font-semibold",
        children: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      })),
      (n[9] = T))
    : (T = n[9]);
  let N;
  n[10] === Symbol.for("react.memo_cache_sentinel")
    ? ((N = f.jsxs("div", {
        className: "text-right",
        children: [
          T,
          f.jsx("p", {
            className: "text-xs text-gray-600",
            children: new Date().toLocaleDateString(void 0, {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          }),
        ],
      })),
      (n[10] = N))
    : (N = n[10]);
  let j;
  n[11] === Symbol.for("react.memo_cache_sentinel")
    ? ((j = (F) => i(F.target.value)), (n[11] = j))
    : (j = n[11]);
  let g;
  n[12] !== l
    ? ((g = f.jsx("input", {
        type: "text",
        id: "searchInput",
        placeholder: "Search by ID or Name",
        value: l,
        onChange: j,
        className: "px-3 py-1 bg-transparent outline-none text-xs",
      })),
      (n[12] = l),
      (n[13] = g))
    : (g = n[13]);
  let A;
  n[14] === Symbol.for("react.memo_cache_sentinel")
    ? ((A = f.jsx("button", {
        className: "bg-[#0b0c2a] text-white px-2 py-1",
        children: "🔍",
      })),
      (n[14] = A))
    : (A = n[14]);
  let R;
  n[15] !== g
    ? ((R = f.jsxs("div", {
        className: `relative bg-gray-100 rounded flex items-center overflow-hidden ${m ? "" : "hidden"}`,
        children: [g, A],
      })),
      (n[15] = g),
      (n[16] = R))
    : (R = n[16]);
  let q;
  n[17] === Symbol.for("react.memo_cache_sentinel")
    ? ((q = f.jsx("button", { className: "text-2xl", children: "⚙️" })),
      (n[17] = q))
    : (q = n[17]);
  let Z;
  n[18] !== R
    ? ((Z = f.jsxs("div", {
        className: "flex items-center gap-4",
        children: [N, R, q],
      })),
      (n[18] = R),
      (n[19] = Z))
    : (Z = n[19]);
  let k;
  return (
    n[20] !== Z || n[21] !== E
      ? ((k = f.jsxs("header", {
          className:
            "bg-white flex justify-between items-center px-6 py-3 border-b-2 border-gray-300",
          children: [E, Z],
        })),
        (n[20] = Z),
        (n[21] = E),
        (n[22] = k))
      : (k = n[22]),
    k
  );
};
function Tn(n) {
  const l = fe.c(62),
    { children: i, activeTab: u } = n,
    o = na(),
    [d, m] = D.useState(!1),
    [p, b] = D.useState("");
  let y;
  l[0] !== o
    ? ((y = () => {
        (Xx(), o("/login"));
      }),
      (l[0] = o),
      (l[1] = y))
    : (y = l[1]);
  const v = y;
  let S;
  l[2] === Symbol.for("react.memo_cache_sentinel")
    ? ((S = f.jsx("img", {
        src: "/assets/logo.svg",
        alt: "BookHive Logo",
        className: "w-16 mx-auto mb-2",
      })),
      (l[2] = S))
    : (S = l[2]);
  let E;
  l[3] === Symbol.for("react.memo_cache_sentinel")
    ? ((E = f.jsxs("div", {
        className: "text-center",
        children: [
          S,
          f.jsxs("h2", {
            className: "text-xl leading-tight",
            children: [
              "BookHive",
              f.jsx("br", {}),
              f.jsx("span", {
                className: "font-light text-[#b5b8d1]",
                children: "Library",
              }),
            ],
          }),
        ],
      })),
      (l[3] = E))
    : (E = l[3]);
  let T;
  l[4] !== o
    ? ((T = () => o("/dashboard")), (l[4] = o), (l[5] = T))
    : (T = l[5]);
  const N = `px-8 py-3 text-left transition-colors ${u === "dashboard" ? "bg-white text-[#000035] rounded-l-[30px] font-medium" : "text-[#b5b8d1] hover:bg-white/10"}`;
  let j;
  l[6] !== T || l[7] !== N
    ? ((j = f.jsx("button", {
        onClick: T,
        className: N,
        children: "🏠 Dashboard",
      })),
      (l[6] = T),
      (l[7] = N),
      (l[8] = j))
    : (j = l[8]);
  let g;
  l[9] !== o
    ? ((g = () => o("/catalog")), (l[9] = o), (l[10] = g))
    : (g = l[10]);
  const A = `px-8 py-3 text-left transition-colors ${u === "catalog" ? "bg-white text-[#000035] rounded-l-[30px] font-medium" : "text-[#b5b8d1] hover:bg-white/10"}`;
  let R;
  l[11] !== g || l[12] !== A
    ? ((R = f.jsx("button", {
        onClick: g,
        className: A,
        children: "📚 Catalog",
      })),
      (l[11] = g),
      (l[12] = A),
      (l[13] = R))
    : (R = l[13]);
  let q;
  l[14] !== o
    ? ((q = () => o("/books")), (l[14] = o), (l[15] = q))
    : (q = l[15]);
  const Z = `px-8 py-3 text-left transition-colors ${u === "books" ? "bg-white text-[#000035] rounded-l-[30px] font-medium" : "text-[#b5b8d1] hover:bg-white/10"}`;
  let k;
  l[16] !== q || l[17] !== Z
    ? ((k = f.jsx("button", {
        onClick: q,
        className: Z,
        children: "📖 Books",
      })),
      (l[16] = q),
      (l[17] = Z),
      (l[18] = k))
    : (k = l[18]);
  let F;
  l[19] !== o
    ? ((F = () => o("/user-management")), (l[19] = o), (l[20] = F))
    : (F = l[20]);
  const K = `px-8 py-3 text-left transition-colors ${u === "users" ? "bg-white text-[#000035] rounded-l-[30px] font-medium" : "text-[#b5b8d1] hover:bg-white/10"}`;
  let V;
  l[21] !== F || l[22] !== K
    ? ((V = f.jsx("button", {
        onClick: F,
        className: K,
        children: "👤 Users",
      })),
      (l[21] = F),
      (l[22] = K),
      (l[23] = V))
    : (V = l[23]);
  let P;
  l[24] !== o
    ? ((P = () => o("/reports")), (l[24] = o), (l[25] = P))
    : (P = l[25]);
  const ee = `px-8 py-3 text-left transition-colors ${u === "reports" ? "bg-white text-[#000035] rounded-l-[30px] font-medium" : "text-[#b5b8d1] hover:bg-white/10"}`;
  let le;
  l[26] !== P || l[27] !== ee
    ? ((le = f.jsx("button", {
        onClick: P,
        className: ee,
        children: "📈 Reports",
      })),
      (l[26] = P),
      (l[27] = ee),
      (l[28] = le))
    : (le = l[28]);
  let se;
  l[29] !== o
    ? ((se = () => o("/categories")), (l[29] = o), (l[30] = se))
    : (se = l[30]);
  const me = `px-8 py-3 text-left transition-colors ${u === "categories" ? "bg-white text-[#000035] rounded-l-[30px] font-medium" : "text-[#b5b8d1] hover:bg-white/10"}`;
  let ce;
  l[31] !== se || l[32] !== me
    ? ((ce = f.jsx("button", {
        onClick: se,
        className: me,
        children: "📂 Categories",
      })),
      (l[31] = se),
      (l[32] = me),
      (l[33] = ce))
    : (ce = l[33]);
  let pe;
  l[34] !== k ||
  l[35] !== V ||
  l[36] !== le ||
  l[37] !== ce ||
  l[38] !== j ||
  l[39] !== R
    ? ((pe = f.jsxs("div", {
        children: [
          E,
          f.jsxs("nav", {
            className: "mt-10 flex flex-col",
            children: [j, R, k, V, le, ce],
          }),
        ],
      })),
      (l[34] = k),
      (l[35] = V),
      (l[36] = le),
      (l[37] = ce),
      (l[38] = j),
      (l[39] = R),
      (l[40] = pe))
    : (pe = l[40]);
  let M;
  l[41] !== v
    ? ((M = f.jsx("div", {
        className: "pl-8",
        children: f.jsx("button", {
          onClick: v,
          className:
            "text-[#b5b8d1] text-sm hover:text-white transition-colors",
          children: "🚪 Log Out",
        }),
      })),
      (l[41] = v),
      (l[42] = M))
    : (M = l[42]);
  let J;
  l[43] !== pe || l[44] !== M
    ? ((J = f.jsxs("aside", {
        className:
          "w-60 bg-[#000035] text-white flex flex-col justify-between py-6",
        children: [pe, M],
      })),
      (l[43] = pe),
      (l[44] = M),
      (l[45] = J))
    : (J = l[45]);
  let I;
  l[46] !== p
    ? ((I = f.jsx(Px, { searchValue: p, setSearchValue: b })),
      (l[46] = p),
      (l[47] = I))
    : (I = l[47]);
  let ne;
  if (l[48] !== i || l[49] !== p) {
    let $;
    (l[51] !== p
      ? (($ = (W) => (W ? zm.cloneElement(W, { searchValue: p }) : null)),
        (l[51] = p),
        (l[52] = $))
      : ($ = l[52]),
      (ne = zm.Children.map(i, $)),
      (l[48] = i),
      (l[49] = p),
      (l[50] = ne));
  } else ne = l[50];
  let de;
  l[53] !== d
    ? ((de =
        d &&
        f.jsx("div", {
          className:
            "fixed inset-0 bg-[rgba(10,15,51,0.5)] flex items-center justify-center z-50",
          children: f.jsxs("div", {
            className:
              "bg-white w-96 p-6 rounded-lg shadow-[0_5px_25px_rgba(0,0,0,0.1)]",
            children: [
              f.jsx("h3", {
                className: "text-center text-lg mb-4",
                children: "Change Credentials",
              }),
              f.jsxs("form", {
                className: "space-y-3",
                children: [
                  f.jsx("label", {
                    className: "text-sm font-medium block",
                    children: "Enter Current Password",
                  }),
                  f.jsx("input", {
                    type: "password",
                    placeholder: "Enter Current Password",
                    className:
                      "w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm",
                  }),
                  f.jsx("label", {
                    className: "text-sm font-medium block",
                    children: "Enter New Password",
                  }),
                  f.jsx("input", {
                    type: "password",
                    placeholder: "Enter New Password",
                    className:
                      "w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm",
                  }),
                  f.jsx("label", {
                    className: "text-sm font-medium block",
                    children: "Confirm New Password",
                  }),
                  f.jsx("input", {
                    type: "password",
                    placeholder: "Confirm New Password",
                    className:
                      "w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm",
                  }),
                  f.jsxs("div", {
                    className: "flex justify-between gap-2 mt-4",
                    children: [
                      f.jsx("button", {
                        type: "button",
                        onClick: () => m(!1),
                        className:
                          "w-[48%] bg-gray-300 text-black rounded-lg py-2",
                        children: "Cancel",
                      }),
                      f.jsx("button", {
                        type: "submit",
                        className:
                          "w-[48%] bg-[#000035] text-white rounded-lg py-2 hover:bg-[#192261]",
                        children: "Confirm",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        })),
      (l[53] = d),
      (l[54] = de))
    : (de = l[54]);
  let _;
  l[55] !== I || l[56] !== ne || l[57] !== de
    ? ((_ = f.jsxs("main", {
        className: "flex-1 flex flex-col",
        children: [I, ne, de],
      })),
      (l[55] = I),
      (l[56] = ne),
      (l[57] = de),
      (l[58] = _))
    : (_ = l[58]);
  let Q;
  return (
    l[59] !== J || l[60] !== _
      ? ((Q = f.jsxs("div", {
          className: "flex h-screen bg-[#f5f7fb] text-[#000035]",
          children: [J, _],
        })),
        (l[59] = J),
        (l[60] = _),
        (l[61] = Q))
      : (Q = l[61]),
    Q
  );
}
const Sl = {
    all: ["users"],
    lists: () => [...Sl.all, "list"],
    list: (n) => [...Sl.lists(), { filters: n }],
    details: () => [...Sl.all, "detail"],
    detail: (n) => [...Sl.details(), n],
  },
  xy = () => {
    const n = fe.c(1);
    let l;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { queryKey: Sl.lists(), queryFn: by, staleTime: 3e5 }),
          (n[0] = l))
        : (l = n[0]),
      Al(l)
    );
  },
  Wx = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: gy,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: Sl.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  Ix = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: t2,
            onSuccess: (u, o) => {
              (l.invalidateQueries({ queryKey: Sl.detail(o.id) }),
                l.invalidateQueries({ queryKey: Sl.lists() }));
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  e2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: Gx,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: Sl.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  };
function t2(n) {
  const { id: l, data: i } = n;
  return Yx(l, i);
}
const gr = "/Books",
  l2 = async () => await Rl(gr),
  a2 = async (n) => await Oa(gr, n),
  n2 = async (n, l) => await Cn(`${gr}/${n}`, l),
  s2 = async (n) => await Da(`${gr}/${n}`),
  Nl = {
    all: ["books"],
    lists: () => [...Nl.all, "list"],
    list: (n) => [...Nl.lists(), { filters: n }],
    details: () => [...Nl.all, "detail"],
    detail: (n) => [...Nl.details(), n],
  },
  Sy = () => {
    const n = fe.c(1);
    let l;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { queryKey: Nl.lists(), queryFn: l2, staleTime: 3e5 }),
          (n[0] = l))
        : (l = n[0]),
      Al(l)
    );
  },
  i2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: a2,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: Nl.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  r2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: o2,
            onSuccess: (u, o) => {
              (l.invalidateQueries({ queryKey: Nl.detail(o.id) }),
                l.invalidateQueries({ queryKey: Nl.lists() }));
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  u2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: s2,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: Nl.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  };
function o2(n) {
  const { id: l, data: i } = n;
  return n2(l, i);
}
const vr = "/BookReservations",
  c2 = async () => await Rl(vr),
  f2 = async (n) => await Oa(vr, n),
  d2 = async (n, l) => await Cn(`${vr}/${n}`, l),
  h2 = async (n) => await Da(`${vr}/${n}`),
  jl = {
    all: ["reservations"],
    lists: () => [...jl.all, "list"],
    list: (n) => [...jl.lists(), { filters: n }],
    details: () => [...jl.all, "detail"],
    detail: (n) => [...jl.details(), n],
  },
  Ny = () => {
    const n = fe.c(1);
    let l;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { queryKey: jl.lists(), queryFn: c2, staleTime: 12e4 }),
          (n[0] = l))
        : (l = n[0]),
      Al(l)
    );
  },
  m2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: f2,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: jl.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  p2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: b2,
            onSuccess: (u, o) => {
              (l.invalidateQueries({ queryKey: jl.detail(o.id) }),
                l.invalidateQueries({ queryKey: jl.lists() }));
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  y2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: h2,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: jl.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  };
function b2(n) {
  const { id: l, data: i } = n;
  return d2(l, i);
}
const g2 = "/Branches",
  v2 = async () => await Rl(g2),
  ws = {
    all: ["branches"],
    lists: () => [...ws.all, "list"],
    list: (n) => [...ws.lists(), { filters: n }],
    details: () => [...ws.all, "detail"],
    detail: (n) => [...ws.details(), n],
  },
  x2 = () => {
    const n = fe.c(1);
    let l;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { queryKey: ws.lists(), queryFn: v2, staleTime: 3e5 }),
          (n[0] = l))
        : (l = n[0]),
      Al(l)
    );
  },
  xr = "/BookSales",
  S2 = async () => await Rl(xr),
  N2 = async (n) => await Oa(xr, n),
  j2 = async (n, l) => await Cn(`${xr}/${n}`, l),
  E2 = async (n) => await Da(`${xr}/${n}`),
  El = {
    all: ["bookSales"],
    lists: () => [...El.all, "list"],
    list: (n) => [...El.lists(), { filters: n }],
    details: () => [...El.all, "detail"],
    detail: (n) => [...El.details(), n],
  },
  jy = () => {
    const n = fe.c(1);
    let l;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { queryKey: El.lists(), queryFn: S2, staleTime: 3e5 }),
          (n[0] = l))
        : (l = n[0]),
      Al(l)
    );
  },
  w2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: N2,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: El.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  _2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: T2,
            onSuccess: (u, o) => {
              (l.invalidateQueries({ queryKey: El.detail(o.id) }),
                l.invalidateQueries({ queryKey: El.lists() }));
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  C2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: E2,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: El.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  };
function T2(n) {
  const { id: l, data: i } = n;
  return j2(l, i);
}
const A2 = "/BookReservations",
  R2 = async () => await Rl(`${A2}?filter=overdue`),
  mc = {
    all: ["overdueBooks"],
    lists: () => [...mc.all, "list"],
    list: (n) => [...mc.lists(), { filters: n }],
  },
  Ey = () => {
    const n = fe.c(1);
    let l;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { queryKey: mc.lists(), queryFn: R2, stleTime: 3e5 }),
          (n[0] = l))
        : (l = n[0]),
      Al(l)
    );
  };
function ec(n) {
  const l = fe.c(7),
    { title: i, children: u } = n;
  let o;
  l[0] !== i
    ? ((o = f.jsx("h4", {
        className: "text-sm font-medium text-[#000035] mb-3",
        children: i,
      })),
      (l[0] = i),
      (l[1] = o))
    : (o = l[1]);
  let d;
  l[2] !== u
    ? ((d = f.jsx("ul", { className: "space-y-1", children: u })),
      (l[2] = u),
      (l[3] = d))
    : (d = l[3]);
  let m;
  return (
    l[4] !== o || l[5] !== d
      ? ((m = f.jsxs("div", {
          className:
            "bg-white rounded-lg h-[380px] w-[350px] 2xl:w-[450px] border border-[#00003573] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]",
          children: [o, d],
        })),
        (l[4] = o),
        (l[5] = d),
        (l[6] = m))
      : (m = l[6]),
    m
  );
}
function O2() {
  const [n, l] = D.useState(!1),
    [i] = D.useState(vy()),
    { data: u = [], isLoading: o } = xy(),
    { data: d = [], isLoading: m } = Sy(),
    { data: p = [], isLoading: b } = Ny(),
    { data: y = [], isLoading: v } = x2(),
    { data: S = [], isLoading: E } = Ey(),
    { data: T = [], isLoading: N } = jy(),
    j = o || m || b || v || E,
    g = u.filter((V) => V.role === "Admin"),
    A = p?.length || 0,
    R = p?.filter((V) => V.returnDate || V.status === "Returned").length || 0,
    q = A - R,
    Z = {
      totalUsers: u?.length || 0,
      totalBooks: d?.length || 0,
      branchCount: y?.length || 0,
    },
    k =
      S?.slice(0, 5).map((V) => {
        const P = u.find(
          (ee) =>
            ee.id === V.user_id ||
            ee.first_name + " " + ee.last_name === V.user_name,
        );
        return {
          id: V.id,
          borrowedId: V.id,
          userName:
            V.user_name || (P ? `${P.first_name} ${P.last_name}` : "Unknown"),
          userId: V.user_id || P?.id,
        };
      }) || [],
    F = g
      .slice(0, 4)
      .map((V) => ({
        id: V.id,
        name: `${V.first_name || ""} ${V.last_name || ""}`.trim() || "Unknown",
        adminId: V.id,
      })),
    K = () => {
      const le = A || 1,
        se = le > 0 ? q / le : 0,
        me = le > 0 ? R / le : 0;
      if (le === 0 || (q === 0 && R === 0))
        return f.jsx("div", {
          className:
            "xl:w-[300px] xl:h-[300px] 2xl:h-[90%] 2xl:w-[90%] mb-6 flex items-center justify-center",
          children: f.jsx("svg", {
            width: 300,
            height: 300,
            className: "block",
            children: f.jsx("circle", {
              cx: 150,
              cy: 150,
              r: 140,
              fill: "#4b5563",
            }),
          }),
        });
      const ce = se * 360,
        pe = me * 360,
        M = (Q, $, W, ie, oe) => {
          const ve = J(Q, $, W, oe),
            Ye = J(Q, $, W, ie),
            Te = oe - ie <= 180 ? "0" : "1";
          return [
            "M",
            Q,
            $,
            "L",
            ve.x,
            ve.y,
            "A",
            W,
            W,
            0,
            Te,
            0,
            Ye.x,
            Ye.y,
            "Z",
          ].join(" ");
        },
        J = (Q, $, W, ie) => {
          const oe = ((ie - 90) * Math.PI) / 180;
          return { x: Q + W * Math.cos(oe), y: $ + W * Math.sin(oe) };
        },
        I = 0,
        ne = ce,
        de = ne,
        _ = de + pe;
      return f.jsx("div", {
        className: "w-[300px] h-[300px] mb-6 flex items-center justify-center",
        children: f.jsxs("svg", {
          width: 300,
          height: 300,
          viewBox: "0 0 300 300",
          className: "block",
          children: [
            ce > 0 &&
              f.jsx("path", { d: M(150, 150, 140, I, ne), fill: "#4b5563" }),
            pe > 0 &&
              f.jsx("path", { d: M(150, 150, 140, de, _), fill: "#000035" }),
          ],
        }),
      });
    };
  return f.jsx(Tn, {
    activeTab: "dashboard",
    children: f.jsxs("div", {
      className: "p-6 flex-1 overflow-y-auto h-screen relative",
      children: [
        f.jsxs("section", {
          className: "max-lg:grid max-lg:grid-cols-[40%_60%] gap-6 ",
          children: [
            f.jsxs("div", {
              className:
                "max-xl:bg-white rounded-lg p-6 xl:max-h-[500px] w-[600px] 2xl:max-h-screen 2xl:h-[850px] flex flex-col items-center justify-center max-xl:shadow-[0_4px_20px_rgba(0,0,0,0.05)]",
              children: [
                f.jsx(K, {}),
                f.jsxs("div", {
                  className: "flex gap-8 items-center w-full",
                  children: [
                    f.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        f.jsx("svg", {
                          width: "16",
                          height: "16",
                          viewBox: "0 0 16 16",
                          children: f.jsx("circle", {
                            cx: "8",
                            cy: "8",
                            r: "6",
                            fill: "#4b5563",
                          }),
                        }),
                        f.jsx("p", {
                          className: "text-sm text-[#6f7390]",
                          children: "Total Borrowed Books",
                        }),
                      ],
                    }),
                    f.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        f.jsx("svg", {
                          width: "16",
                          height: "16",
                          viewBox: "0 0 16 16",
                          children: f.jsx("circle", {
                            cx: "8",
                            cy: "8",
                            r: "6",
                            fill: "#000035",
                          }),
                        }),
                        f.jsx("p", {
                          className: "text-sm text-[#6f7390]",
                          children: "Total Returned Books",
                        }),
                      ],
                    }),
                  ],
                }),
                f.jsxs("div", {
                  className:
                    "flex flex-col gap-5 w-[200px] absolute xl:top-10 xl:left-[450px] 2xl:left-[800px] 2xl:w-[300px]",
                  children: [
                    f.jsx("div", {
                      className: "flex flex-col gap-4 w-full",
                      children: f.jsxs("div", {
                        className:
                          "bg-white rounded-lg p-5 flex border border-[#00003573] items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]",
                        children: [
                          f.jsx("div", {
                            className:
                              "w-12 h-12 bg-[#f5f7fb] rounded-lg flex items-center justify-center shrink-0",
                            children: f.jsx("svg", {
                              width: "24",
                              height: "24",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              className: "text-[#000035]",
                              children: f.jsx("path", {
                                d: "M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z",
                                fill: "#000035",
                              }),
                            }),
                          }),
                          f.jsxs("div", {
                            className: "flex-1",
                            children: [
                              f.jsx("h3", {
                                className:
                                  "text-3xl font-semibold text-[#000035] mb-1",
                                children: j ? "..." : String(Z.totalUsers),
                              }),
                              f.jsx("p", {
                                className: "text-xs text-[#6f7390]",
                                children: "Total User Base",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    f.jsxs("div", {
                      className:
                        "bg-white rounded-lg p-5 border border-[#00003573] w-full flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]",
                      children: [
                        f.jsx("div", {
                          className:
                            "w-12 h-12 bg-[#f5f7fb] rounded-lg  flex items-center justify-center shrink-0",
                          children: f.jsx("svg", {
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            className: "text-[#000035]",
                            children: f.jsx("path", {
                              d: "M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM18 20H6V4H18V20ZM7 9H9V7H7V9ZM15 9H17V7H15V9ZM7 13H9V11H7V13ZM15 13H17V11H15V13ZM7 17H9V15H7V17ZM15 17H17V15H15V17Z",
                              fill: "#000035",
                            }),
                          }),
                        }),
                        f.jsxs("div", {
                          className: "flex-1",
                          children: [
                            f.jsx("h3", {
                              className:
                                "text-3xl font-semibold text-[#000035] mb-1",
                              children: j ? "..." : String(Z.totalBooks),
                            }),
                            f.jsx("p", {
                              className: "text-xs text-[#6f7390]",
                              children: "Total Book Count",
                            }),
                          ],
                        }),
                      ],
                    }),
                    f.jsxs("div", {
                      className:
                        "bg-white w-full border border-[#00003573] rounded-lg p-5 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]",
                      children: [
                        f.jsx("div", {
                          className:
                            "w-12 h-12 bg-[#f5f7fb] rounded-lg flex items-center justify-center shrink-0",
                          children: f.jsx("svg", {
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            className: "text-[#000035]",
                            children: f.jsx("path", {
                              d: "M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z",
                              fill: "#000035",
                            }),
                          }),
                        }),
                        f.jsxs("div", {
                          className: "flex-1",
                          children: [
                            f.jsx("h3", {
                              className:
                                "text-3xl font-semibold text-[#000035] mb-1",
                              children: j ? "..." : String(Z.branchCount),
                            }),
                            f.jsx("p", {
                              className: "text-xs text-[#6f7390]",
                              children: "Branch Count",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            f.jsx("div", {
              className:
                "absolute xl:left-[250px] xl:bottom-7 2xl:left-[650px]",
              children: f.jsx(ec, {
                title: "Admins",
                children: j
                  ? f.jsx("li", {
                      className:
                        "text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3",
                      children: "Loading...",
                    })
                  : F.length > 0
                    ? F.map((V) =>
                        f.jsxs(
                          "li",
                          {
                            className:
                              "text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3 mb-2",
                            children: [
                              f.jsx("div", {
                                className:
                                  "w-8 h-8 bg-[#000035] rounded-lg flex items-center justify-center shrink-0",
                                children: f.jsx("svg", {
                                  width: "16",
                                  height: "16",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  className: "text-white",
                                  children: f.jsx("path", {
                                    d: "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",
                                    fill: "white",
                                  }),
                                }),
                              }),
                              f.jsxs("div", {
                                className: "flex-1",
                                children: [
                                  f.jsx("p", {
                                    className:
                                      "text-sm font-medium text-[#000035]",
                                    children: V.name,
                                  }),
                                  f.jsxs("p", {
                                    className: "text-xs text-[#6f7390]",
                                    children: ["Admin ID: ", V.adminId],
                                  }),
                                  f.jsxs("div", {
                                    className: "flex items-center gap-1 mt-1",
                                    children: [
                                      f.jsx("span", {
                                        className:
                                          "w-2 h-2 bg-[#000035] rounded-full",
                                      }),
                                      f.jsx("span", {
                                        className: "text-xs text-[#6f7390]",
                                        children: "Active",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              f.jsx("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                className: "text-[#000035] cursor-pointer",
                                children: f.jsx("path", {
                                  d: "M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12H18C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z",
                                  fill: "#000035",
                                }),
                              }),
                            ],
                          },
                          V.id,
                        ),
                      )
                    : f.jsx("li", {
                        className:
                          "text-xs bg-[#f5f7fb] p-3 rounded-lg text-gray-500",
                        children: "No admins found",
                      }),
              }),
            }),
            f.jsx("div", {
              className: "absolute xl:top-5 xl:right-10",
              children: f.jsx(ec, {
                title: "Overdue Borrowers",
                children: j
                  ? f.jsx("li", {
                      className:
                        "text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3",
                      children: "Loading...",
                    })
                  : k.length > 0
                    ? k.map((V) =>
                        f.jsxs(
                          "li",
                          {
                            className:
                              "text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3 mb-2",
                            children: [
                              f.jsx("div", {
                                className:
                                  "w-8 h-8 bg-[#000035] rounded-lg flex items-center justify-center shrink-0",
                                children: f.jsx("svg", {
                                  width: "16",
                                  height: "16",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  className: "text-white",
                                  children: f.jsx("path", {
                                    d: "M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z",
                                    fill: "white",
                                  }),
                                }),
                              }),
                              f.jsxs("div", {
                                className: "flex-1",
                                children: [
                                  f.jsx("p", {
                                    className:
                                      "text-sm font-medium text-[#000035]",
                                    children: V.userName,
                                  }),
                                  f.jsxs("p", {
                                    className: "text-xs text-[#6f7390]",
                                    children: ["Borrowed ID: ", V.borrowedId],
                                  }),
                                ],
                              }),
                              f.jsx("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                className: "text-[#000035] cursor-pointer",
                                children: f.jsx("path", {
                                  d: "M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12H18C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z",
                                  fill: "#000035",
                                }),
                              }),
                            ],
                          },
                          V.id,
                        ),
                      )
                    : f.jsx("li", {
                        className:
                          "text-xs bg-[#f5f7fb] p-3 rounded-lg text-gray-500",
                        children: "No overdue books",
                      }),
              }),
            }),
            f.jsx("div", {
              className: "absolute xl:bottom-14 xl:right-12 2xl:right-20",
              children: f.jsx(ec, {
                title: "Books Sold",
                children: j
                  ? f.jsx("li", {
                      className: "text-xs bg-[#f5f7fb] p-2 rounded-lg",
                      children: "Loading...",
                    })
                  : T.length > 0
                    ? T.map((V, P) =>
                        f.jsxs(
                          "li",
                          {
                            className: "text-xs bg-[#f5f7fb] p-2 rounded-lg",
                            children: [V.bookTitle, " by ", V.userName],
                          },
                          P,
                        ),
                      )
                    : f.jsx("li", {
                        className:
                          "text-xs bg-[#f5f7fb] p-2 rounded-lg text-gray-500",
                        children: "No books sold",
                      }),
              }),
            }),
          ],
        }),
        n &&
          f.jsx("div", {
            className:
              "fixed inset-0 bg-[rgba(10,15,51,0.5)] flex items-center justify-center z-50",
            children: f.jsxs("div", {
              className:
                "bg-white w-96 p-6 rounded-lg shadow-[0_5px_25px_rgba(0,0,0,0.1)]",
              children: [
                f.jsx("h3", {
                  className: "text-center text-lg mb-4",
                  children: "Change Credentials",
                }),
                f.jsxs("form", {
                  className: "space-y-3",
                  onSubmit: (V) => {
                    (V.preventDefault(), l(!1));
                  },
                  children: [
                    f.jsx("label", {
                      className: "text-sm font-medium block",
                      children: "Enter Current Password",
                    }),
                    f.jsx("input", {
                      type: "password",
                      placeholder: "Enter Current Password",
                      className:
                        "w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm",
                    }),
                    f.jsx("label", {
                      className: "text-sm font-medium block",
                      children: "Enter New Password",
                    }),
                    f.jsx("input", {
                      type: "password",
                      placeholder: "Enter New Password",
                      className:
                        "w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm",
                    }),
                    f.jsx("label", {
                      className: "text-sm font-medium block",
                      children: "Confirm New Password",
                    }),
                    f.jsx("input", {
                      type: "password",
                      placeholder: "Confirm New Password",
                      className:
                        "w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm",
                    }),
                    f.jsxs("div", {
                      className: "flex justify-between gap-2 mt-4",
                      children: [
                        f.jsx("button", {
                          type: "button",
                          onClick: () => l(!1),
                          className:
                            "w-[48%] bg-gray-300 text-black rounded-lg py-2",
                          children: "Cancel",
                        }),
                        f.jsx("button", {
                          type: "submit",
                          className:
                            "w-[48%] bg-[#000035] text-white rounded-lg py-2 hover:bg-[#192261]",
                          children: "Confirm",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    }),
  });
}
function wy(n) {
  const l = fe.c(11),
    { searchValue: i } = n,
    { data: u, isLoading: o } = Ey();
  let d;
  l[0] !== u
    ? ((d = u === void 0 ? [] : u), (l[0] = u), (l[1] = d))
    : (d = l[1]);
  const m = d;
  let p;
  l[2] !== m || l[3] !== i
    ? ((p = i
        ? m.filter(
            (E) =>
              E.book_title?.toLowerCase().includes(i.toLowerCase()) ||
              E.user_name?.toLowerCase().includes(i.toLowerCase()),
          )
        : m),
      (l[2] = m),
      (l[3] = i),
      (l[4] = p))
    : (p = l[4]);
  const b = p;
  let y;
  l[5] === Symbol.for("react.memo_cache_sentinel")
    ? ((y = f.jsx("thead", {
        children: f.jsxs("tr", {
          children: [
            f.jsx("th", {
              className: "p-3 border-b border-gray-300 font-semibold",
              children: "Book Title",
            }),
            f.jsx("th", {
              className: "p-3 border-b border-gray-300 font-semibold",
              children: "User Name",
            }),
            f.jsx("th", {
              className: "p-3 border-b border-gray-300 font-semibold",
              children: "Due Date",
            }),
          ],
        }),
      })),
      (l[5] = y))
    : (y = l[5]);
  let v;
  l[6] !== b || l[7] !== o
    ? ((v = o
        ? f.jsx("tr", {
            children: f.jsx("td", {
              colSpan: "3",
              className: "p-3 text-center text-gray-500",
              children: "Loading...",
            }),
          })
        : b.length === 0
          ? f.jsx("tr", {
              children: f.jsx("td", {
                colSpan: "3",
                className: "p-3 text-center text-gray-500",
                children: "No overdue books found",
              }),
            })
          : b.map(D2)),
      (l[6] = b),
      (l[7] = o),
      (l[8] = v))
    : (v = l[8]);
  let S;
  return (
    l[9] !== v
      ? ((S = f.jsx("div", {
          className: "overflow-x-auto",
          children: f.jsxs("table", {
            className: "w-full border-collapse text-left text-sm",
            children: [y, f.jsx("tbody", { children: v })],
          }),
        })),
        (l[9] = v),
        (l[10] = S))
      : (S = l[10]),
    S
  );
}
function D2(n) {
  return f.jsxs(
    "tr",
    {
      className: "border-b border-gray-200",
      children: [
        f.jsx("td", { className: "p-3", children: n.book_title }),
        f.jsx("td", { className: "p-3", children: n.user_name }),
        f.jsx("td", { className: "p-3", children: n.due_date }),
      ],
    },
    n.id,
  );
}
function Ma(n) {
  const l = fe.c(6),
    { show: i, title: u, children: o, maxWidthClass: d } = n;
  if (!i) return null;
  const m = `bg-white max-h-[90%] w-11/12 ${d || "max-w-[500px]"} rounded-lg p-5 border-2 border-[#0b0b3b]`;
  let p;
  l[0] !== u
    ? ((p = f.jsx("h3", {
        className: "text-center mb-5 text-lg text-[#0b0b3b]",
        children: u,
      })),
      (l[0] = u),
      (l[1] = p))
    : (p = l[1]);
  let b;
  return (
    l[2] !== o || l[3] !== m || l[4] !== p
      ? ((b = f.jsx("div", {
          className:
            "fixed inset-0 bg-black/60 flex items-center justify-center z-50",
          children: f.jsxs("div", {
            className: m,
            onClick: M2,
            children: [p, o],
          }),
        })),
        (l[2] = o),
        (l[3] = m),
        (l[4] = p),
        (l[5] = b))
      : (b = l[5]),
    b
  );
}
function M2(n) {
  return n.stopPropagation();
}
function U2(n) {
  const l = fe.c(66),
    {
      showPopup: i,
      editMode: u,
      formData: o,
      setFormData: d,
      handleAddUser: m,
      setShowPopup: p,
      setEditMode: b,
    } = n;
  let y;
  l[0] !== b || l[1] !== p
    ? ((y = () => {
        (p(!1), b(!1));
      }),
      (l[0] = b),
      (l[1] = p),
      (l[2] = y))
    : (y = l[2]);
  const v = u ? "Edit User" : "Add New User";
  let S;
  l[3] === Symbol.for("react.memo_cache_sentinel")
    ? ((S = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "First Name",
      })),
      (l[3] = S))
    : (S = l[3]);
  let E;
  l[4] !== o || l[5] !== d
    ? ((E = (ne) => d({ ...o, first_name: ne.target.value })),
      (l[4] = o),
      (l[5] = d),
      (l[6] = E))
    : (E = l[6]);
  let T;
  l[7] !== o.first_name || l[8] !== E
    ? ((T = f.jsxs("div", {
        children: [
          S,
          f.jsx("input", {
            type: "text",
            value: o.first_name,
            onChange: E,
            placeholder: "Enter first name",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[7] = o.first_name),
      (l[8] = E),
      (l[9] = T))
    : (T = l[9]);
  let N;
  l[10] === Symbol.for("react.memo_cache_sentinel")
    ? ((N = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Last Name",
      })),
      (l[10] = N))
    : (N = l[10]);
  let j;
  l[11] !== o || l[12] !== d
    ? ((j = (ne) => d({ ...o, last_name: ne.target.value })),
      (l[11] = o),
      (l[12] = d),
      (l[13] = j))
    : (j = l[13]);
  let g;
  l[14] !== o.last_name || l[15] !== j
    ? ((g = f.jsxs("div", {
        children: [
          N,
          f.jsx("input", {
            type: "text",
            value: o.last_name,
            onChange: j,
            placeholder: "Enter last name",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[14] = o.last_name),
      (l[15] = j),
      (l[16] = g))
    : (g = l[16]);
  let A;
  l[17] === Symbol.for("react.memo_cache_sentinel")
    ? ((A = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Email",
      })),
      (l[17] = A))
    : (A = l[17]);
  let R;
  l[18] !== o || l[19] !== d
    ? ((R = (ne) => d({ ...o, email: ne.target.value })),
      (l[18] = o),
      (l[19] = d),
      (l[20] = R))
    : (R = l[20]);
  let q;
  l[21] !== o.email || l[22] !== R
    ? ((q = f.jsxs("div", {
        children: [
          A,
          f.jsx("input", {
            type: "email",
            value: o.email,
            onChange: R,
            placeholder: "Enter email",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[21] = o.email),
      (l[22] = R),
      (l[23] = q))
    : (q = l[23]);
  let Z;
  l[24] === Symbol.for("react.memo_cache_sentinel")
    ? ((Z = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Phone Number",
      })),
      (l[24] = Z))
    : (Z = l[24]);
  let k;
  l[25] !== o || l[26] !== d
    ? ((k = (ne) => d({ ...o, phone_number: ne.target.value })),
      (l[25] = o),
      (l[26] = d),
      (l[27] = k))
    : (k = l[27]);
  let F;
  l[28] !== o.phone_number || l[29] !== k
    ? ((F = f.jsxs("div", {
        children: [
          Z,
          f.jsx("input", {
            type: "text",
            value: o.phone_number,
            onChange: k,
            placeholder: "Enter phone number",
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[28] = o.phone_number),
      (l[29] = k),
      (l[30] = F))
    : (F = l[30]);
  let K;
  l[31] !== u || l[32] !== o || l[33] !== d
    ? ((K =
        !u &&
        f.jsxs("div", {
          children: [
            f.jsx("label", {
              className: "text-sm font-medium block",
              children: "Password",
            }),
            f.jsx("input", {
              type: "password",
              value: o.password,
              onChange: (ne) => d({ ...o, password: ne.target.value }),
              placeholder: "Enter password",
              required: !0,
              className:
                "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
            }),
          ],
        })),
      (l[31] = u),
      (l[32] = o),
      (l[33] = d),
      (l[34] = K))
    : (K = l[34]);
  let V;
  l[35] === Symbol.for("react.memo_cache_sentinel")
    ? ((V = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Role",
      })),
      (l[35] = V))
    : (V = l[35]);
  let P;
  l[36] !== o || l[37] !== d
    ? ((P = (ne) => d({ ...o, role: ne.target.value })),
      (l[36] = o),
      (l[37] = d),
      (l[38] = P))
    : (P = l[38]);
  let ee, le;
  l[39] === Symbol.for("react.memo_cache_sentinel")
    ? ((ee = f.jsx("option", { value: "Student", children: "Student" })),
      (le = f.jsx("option", { value: "Admin", children: "Admin" })),
      (l[39] = ee),
      (l[40] = le))
    : ((ee = l[39]), (le = l[40]));
  let se;
  l[41] !== o.role || l[42] !== P
    ? ((se = f.jsxs("div", {
        children: [
          V,
          f.jsxs("select", {
            value: o.role,
            onChange: P,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
            children: [ee, le],
          }),
        ],
      })),
      (l[41] = o.role),
      (l[42] = P),
      (l[43] = se))
    : (se = l[43]);
  const me = u ? "Update" : "Add";
  let ce;
  l[44] !== me
    ? ((ce = f.jsx("button", {
        type: "submit",
        className:
          "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold",
        children: me,
      })),
      (l[44] = me),
      (l[45] = ce))
    : (ce = l[45]);
  let pe;
  l[46] !== b || l[47] !== p
    ? ((pe = f.jsx("button", {
        type: "button",
        onClick: () => {
          (p(!1), b(!1));
        },
        className:
          "bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-semibold",
        children: "Cancel",
      })),
      (l[46] = b),
      (l[47] = p),
      (l[48] = pe))
    : (pe = l[48]);
  let M;
  l[49] !== ce || l[50] !== pe
    ? ((M = f.jsxs("div", {
        className: "flex justify-between mt-5",
        children: [ce, pe],
      })),
      (l[49] = ce),
      (l[50] = pe),
      (l[51] = M))
    : (M = l[51]);
  let J;
  l[52] !== m ||
  l[53] !== q ||
  l[54] !== F ||
  l[55] !== K ||
  l[56] !== se ||
  l[57] !== M ||
  l[58] !== T ||
  l[59] !== g
    ? ((J = f.jsxs("form", {
        onSubmit: m,
        className: "space-y-3",
        children: [T, g, q, F, K, se, M],
      })),
      (l[52] = m),
      (l[53] = q),
      (l[54] = F),
      (l[55] = K),
      (l[56] = se),
      (l[57] = M),
      (l[58] = T),
      (l[59] = g),
      (l[60] = J))
    : (J = l[60]);
  let I;
  return (
    l[61] !== i || l[62] !== y || l[63] !== v || l[64] !== J
      ? ((I = f.jsx(Ma, { show: i, onClose: y, title: v, children: J })),
        (l[61] = i),
        (l[62] = y),
        (l[63] = v),
        (l[64] = J),
        (l[65] = I))
      : (I = l[65]),
    I
  );
}
function z2({ searchValue: n }) {
  const [l, i] = D.useState(!1),
    [u, o] = D.useState(!1),
    [d, m] = D.useState({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      role: "Student",
      password: "",
    }),
    { data: p = [], isLoading: b } = xy(),
    y = Wx(),
    v = Ix(),
    S = e2(),
    E = async (g) => {
      g.preventDefault();
      try {
        if (u && d.id) await v.mutateAsync({ id: d.id, data: d });
        else {
          const { password: A, ...R } = d;
          await y.mutateAsync({ ...R, password_hash: A });
        }
        (m({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          role: "Student",
          password: "",
        }),
          i(!1),
          o(!1));
      } catch (A) {
        (console.error("Failed to save user:", A),
          alert("Failed to save user. Please try again."));
      }
    },
    T = (g) => {
      (m({
        id: g.id,
        first_name: g.first_name || "",
        last_name: g.last_name || "",
        email: g.email || "",
        phone_number: g.phone_number || "",
        role: g.role || "Student",
        password: "",
      }),
        o(!0),
        i(!0));
    },
    N = async (g) => {
      if (window.confirm("Are you sure you want to delete this user?"))
        try {
          await S.mutateAsync(g);
        } catch {
          alert("Failed to delete user. Please try again.");
        }
    },
    j = n
      ? p.filter(
          (g) =>
            `${g.first_name || ""} ${g.last_name || ""}`
              .toLowerCase()
              .includes(n.toLowerCase()) ||
            g.email?.toLowerCase().includes(n.toLowerCase()) ||
            g.id?.toString().includes(n),
        )
      : p;
  return f.jsxs(f.Fragment, {
    children: [
      f.jsx(Tn, {
        activeTab: "users",
        children: f.jsxs("section", {
          className:
            "flex-1 bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] overflow-auto",
          children: [
            f.jsxs("div", {
              className: "flex justify-between items-center mb-4",
              children: [
                f.jsx("h2", {
                  className: "text-xl font-semibold",
                  children: "User Management",
                }),
                f.jsx("button", {
                  onClick: () => {
                    (m({
                      first_name: "",
                      last_name: "",
                      email: "",
                      phone_number: "",
                      role: "Student",
                      password: "",
                    }),
                      o(!1),
                      i(!0));
                  },
                  className:
                    "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium",
                  children: "➕ Add User",
                }),
              ],
            }),
            f.jsx("div", {
              className: "overflow-x-auto",
              children: f.jsxs("table", {
                className: "w-full border-collapse text-left text-sm",
                children: [
                  f.jsx("thead", {
                    children: f.jsxs("tr", {
                      children: [
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "ID",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Name",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Email",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Phone",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Role",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Action",
                        }),
                      ],
                    }),
                  }),
                  f.jsx("tbody", {
                    children: b
                      ? f.jsx("tr", {
                          children: f.jsx("td", {
                            colSpan: "6",
                            className: "p-3 text-center text-gray-500",
                            children: "Loading...",
                          }),
                        })
                      : j.length === 0
                        ? f.jsx("tr", {
                            children: f.jsx("td", {
                              colSpan: "6",
                              className: "p-3 text-center text-gray-500",
                              children: "No users found",
                            }),
                          })
                        : j.map((g) =>
                            f.jsxs(
                              "tr",
                              {
                                className: "border-b border-gray-200",
                                children: [
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.id,
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children:
                                      `${g.first_name || ""} ${g.last_name || ""}`.trim() ||
                                      "N/A",
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.email || "N/A",
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.phone_number || "N/A",
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.role || "Student",
                                  }),
                                  f.jsxs("td", {
                                    className: "p-3",
                                    children: [
                                      f.jsx("button", {
                                        onClick: () => T(g),
                                        className:
                                          "mr-2 text-lg hover:scale-125 transition-transform",
                                        title: "Edit",
                                        children: "✏️",
                                      }),
                                      f.jsx("button", {
                                        onClick: () => N(g.id),
                                        className:
                                          "mr-2 text-lg hover:scale-125 transition-transform",
                                        title: "Delete",
                                        children: "🗑️",
                                      }),
                                      f.jsx("button", {
                                        className:
                                          "text-lg hover:scale-125 transition-transform",
                                        title: "View",
                                        children: "📘",
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              g.id,
                            ),
                          ),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      f.jsx(U2, {
        showPopup: l,
        editMode: u,
        formData: d,
        setFormData: m,
        handleAddUser: E,
        setShowPopup: i,
        setEditMode: o,
      }),
    ],
  });
}
function B2() {
  const [n, l] = D.useState(""),
    [i, u] = D.useState(!1),
    o = async () => {
      (u(!0),
        l(`Testing...
`));
      const m = {
        first_name: "Test",
        last_name: "User",
        email: `test${Date.now()}@example.com`,
        phone_number: "1234567890",
        password_hash: "test123",
        role: "User",
      };
      try {
        l(
          (b) =>
            b +
            `
Sending data:
${JSON.stringify(m, null, 2)}

`,
        );
        const p = await Qe.post(
          "https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net/api/Users",
          m,
          { headers: { "Content-Type": "application/json" } },
        );
        l(
          (b) =>
            b +
            `✅ SUCCESS!
Response: ${JSON.stringify(p.data, null, 2)}`,
        );
      } catch (p) {
        (console.error("Full error:", p),
          l(
            (b) =>
              b +
              `❌ ERROR:
Message: ${p.message}
Status: ${p.response?.status || "No status"}
Response Data: ${JSON.stringify(p.response?.data || "No response data", null, 2)}
Request Config: ${JSON.stringify(p.config || {}, null, 2)}
`,
          ));
      } finally {
        u(!1);
      }
    },
    d = async () => {
      (u(!0),
        l(`Testing GET...
`));
      try {
        const m = await Qe.get(
          "https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net/api/Users",
        );
        l(
          (p) =>
            p +
            `✅ GET Success!
Response: ${JSON.stringify(m.data, null, 2)}`,
        );
      } catch (m) {
        l(
          (p) =>
            p +
            `❌ GET Error: ${m.message}
${JSON.stringify(m.response?.data || {}, null, 2)}`,
        );
      } finally {
        u(!1);
      }
    };
  return f.jsxs("div", {
    className: "p-8 max-w-4xl mx-auto",
    children: [
      f.jsx("h1", {
        className: "text-2xl font-bold mb-4",
        children: "API Test Page",
      }),
      f.jsxs("div", {
        className: "flex gap-4 mb-4",
        children: [
          f.jsx("button", {
            onClick: d,
            disabled: i,
            className:
              "bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50",
            children: "Test GET Users",
          }),
          f.jsx("button", {
            onClick: o,
            disabled: i,
            className:
              "bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50",
            children: "Test POST Signup",
          }),
        ],
      }),
      f.jsx("div", {
        className: "bg-gray-100 p-4 rounded",
        children: f.jsx("pre", {
          className: "whitespace-pre-wrap text-xs font-mono",
          children: n || "Click a button to test...",
        }),
      }),
      f.jsxs("div", {
        className: "mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded",
        children: [
          f.jsx("h3", {
            className: "font-bold mb-2",
            children: "Instructions:",
          }),
          f.jsxs("ol", {
            className: "list-decimal ml-4 space-y-1 text-sm",
            children: [
              f.jsx("li", {
                children: 'Click "Test GET Users" first - this should work',
              }),
              f.jsx("li", {
                children:
                  'Click "Test POST Signup" - this will show the actual error',
              }),
              f.jsx("li", {
                children:
                  "Open DevTools (F12) → Console tab to see detailed logs",
              }),
              f.jsx("li", { children: "Copy the error message and share it" }),
            ],
          }),
        ],
      }),
    ],
  });
}
const Sr = "/BookTransactions",
  q2 = async () => await Rl(Sr),
  L2 = async (n) => await Oa(Sr, n),
  H2 = async (n, l) => await Cn(`${Sr}/${n}`, l),
  Q2 = async (n) => await Da(`${Sr}/${n}`),
  wl = {
    all: ["borrowedBooks"],
    lists: () => [...wl.all, "list"],
    list: (n) => [...wl.lists(), { filters: n }],
    details: () => [...wl.all, "detail"],
    detail: (n) => [...wl.details(), n],
  },
  Y2 = () => {
    const n = fe.c(1);
    let l;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { queryKey: wl.lists(), queryFn: q2, staleTime: 3e5 }),
          (n[0] = l))
        : (l = n[0]),
      Al(l)
    );
  },
  G2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: L2,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: wl.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  k2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: X2,
            onSuccess: (u, o) => {
              (l.invalidateQueries({ queryKey: wl.detail(o.id) }),
                l.invalidateQueries({ queryKey: wl.lists() }));
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  K2 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: Q2,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: wl.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  };
function X2(n) {
  const { id: l, data: i } = n;
  return H2(l, i);
}
function V2(n) {
  const l = fe.c(59),
    {
      showPopup: i,
      editMode: u,
      formData: o,
      setFormData: d,
      handleAddBorrowedBook: m,
      setShowPopup: p,
      setEditMode: b,
    } = n;
  let y;
  l[0] !== b || l[1] !== p
    ? ((y = () => {
        (p(!1), b(!1));
      }),
      (l[0] = b),
      (l[1] = p),
      (l[2] = y))
    : (y = l[2]);
  const v = u ? "Edit Borrowed Book" : "Add New Borrowed Book";
  let S;
  l[3] === Symbol.for("react.memo_cache_sentinel")
    ? ((S = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Book ID",
      })),
      (l[3] = S))
    : (S = l[3]);
  let E;
  l[4] !== o || l[5] !== d
    ? ((E = (M) => d({ ...o, book_id: M.target.value })),
      (l[4] = o),
      (l[5] = d),
      (l[6] = E))
    : (E = l[6]);
  let T;
  l[7] !== o.book_id || l[8] !== E
    ? ((T = f.jsxs("div", {
        children: [
          S,
          f.jsx("input", {
            type: "text",
            value: o.book_id,
            onChange: E,
            placeholder: "Enter book ID",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[7] = o.book_id),
      (l[8] = E),
      (l[9] = T))
    : (T = l[9]);
  let N;
  l[10] === Symbol.for("react.memo_cache_sentinel")
    ? ((N = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "User ID",
      })),
      (l[10] = N))
    : (N = l[10]);
  let j;
  l[11] !== o || l[12] !== d
    ? ((j = (M) => d({ ...o, user_id: M.target.value })),
      (l[11] = o),
      (l[12] = d),
      (l[13] = j))
    : (j = l[13]);
  let g;
  l[14] !== o.user_id || l[15] !== j
    ? ((g = f.jsxs("div", {
        children: [
          N,
          f.jsx("input", {
            type: "text",
            value: o.user_id,
            onChange: j,
            placeholder: "Enter user ID",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[14] = o.user_id),
      (l[15] = j),
      (l[16] = g))
    : (g = l[16]);
  let A;
  l[17] === Symbol.for("react.memo_cache_sentinel")
    ? ((A = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Borrow Date",
      })),
      (l[17] = A))
    : (A = l[17]);
  let R;
  l[18] !== o || l[19] !== d
    ? ((R = (M) => d({ ...o, borrow_date: M.target.value })),
      (l[18] = o),
      (l[19] = d),
      (l[20] = R))
    : (R = l[20]);
  let q;
  l[21] !== o.borrow_date || l[22] !== R
    ? ((q = f.jsxs("div", {
        children: [
          A,
          f.jsx("input", {
            type: "date",
            value: o.borrow_date,
            onChange: R,
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[21] = o.borrow_date),
      (l[22] = R),
      (l[23] = q))
    : (q = l[23]);
  let Z;
  l[24] === Symbol.for("react.memo_cache_sentinel")
    ? ((Z = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Due Date",
      })),
      (l[24] = Z))
    : (Z = l[24]);
  let k;
  l[25] !== o || l[26] !== d
    ? ((k = (M) => d({ ...o, due_date: M.target.value })),
      (l[25] = o),
      (l[26] = d),
      (l[27] = k))
    : (k = l[27]);
  let F;
  l[28] !== o.due_date || l[29] !== k
    ? ((F = f.jsxs("div", {
        children: [
          Z,
          f.jsx("input", {
            type: "date",
            value: o.due_date,
            onChange: k,
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[28] = o.due_date),
      (l[29] = k),
      (l[30] = F))
    : (F = l[30]);
  let K;
  l[31] === Symbol.for("react.memo_cache_sentinel")
    ? ((K = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Return Date",
      })),
      (l[31] = K))
    : (K = l[31]);
  let V;
  l[32] !== o || l[33] !== d
    ? ((V = (M) => d({ ...o, return_date: M.target.value })),
      (l[32] = o),
      (l[33] = d),
      (l[34] = V))
    : (V = l[34]);
  let P;
  l[35] !== o.return_date || l[36] !== V
    ? ((P = f.jsxs("div", {
        children: [
          K,
          f.jsx("input", {
            type: "date",
            value: o.return_date,
            onChange: V,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[35] = o.return_date),
      (l[36] = V),
      (l[37] = P))
    : (P = l[37]);
  const ee = u ? "Update" : "Add";
  let le;
  l[38] !== ee
    ? ((le = f.jsx("button", {
        type: "submit",
        className:
          "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold",
        children: ee,
      })),
      (l[38] = ee),
      (l[39] = le))
    : (le = l[39]);
  let se;
  l[40] !== b || l[41] !== p
    ? ((se = f.jsx("button", {
        type: "button",
        onClick: () => {
          (p(!1), b(!1));
        },
        className:
          "bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-semibold",
        children: "Cancel",
      })),
      (l[40] = b),
      (l[41] = p),
      (l[42] = se))
    : (se = l[42]);
  let me;
  l[43] !== le || l[44] !== se
    ? ((me = f.jsxs("div", {
        className: "flex justify-between mt-5",
        children: [le, se],
      })),
      (l[43] = le),
      (l[44] = se),
      (l[45] = me))
    : (me = l[45]);
  let ce;
  l[46] !== m ||
  l[47] !== q ||
  l[48] !== F ||
  l[49] !== P ||
  l[50] !== me ||
  l[51] !== T ||
  l[52] !== g
    ? ((ce = f.jsxs("form", {
        onSubmit: m,
        className: "space-y-3",
        children: [T, g, q, F, P, me],
      })),
      (l[46] = m),
      (l[47] = q),
      (l[48] = F),
      (l[49] = P),
      (l[50] = me),
      (l[51] = T),
      (l[52] = g),
      (l[53] = ce))
    : (ce = l[53]);
  let pe;
  return (
    l[54] !== i || l[55] !== y || l[56] !== v || l[57] !== ce
      ? ((pe = f.jsx(Ma, { show: i, onClose: y, title: v, children: ce })),
        (l[54] = i),
        (l[55] = y),
        (l[56] = v),
        (l[57] = ce),
        (l[58] = pe))
      : (pe = l[58]),
    pe
  );
}
function Z2({ searchValue: n }) {
  const [l, i] = D.useState(!1),
    [u, o] = D.useState(!1),
    [d, m] = D.useState({
      book_id: "",
      user_id: "",
      borrow_date: "",
      due_date: "",
      return_date: "",
    }),
    { data: p = [], isLoading: b } = Y2(),
    y = G2(),
    v = k2(),
    S = K2(),
    E = async (g) => {
      g.preventDefault();
      try {
        (u && d.id
          ? await v.mutateAsync({ id: d.id, data: d })
          : await y.mutateAsync(d),
          m({
            book_id: "",
            user_id: "",
            borrow_date: "",
            due_date: "",
            return_date: "",
          }),
          i(!1),
          o(!1));
      } catch (A) {
        (console.error("Failed to save borrowed book:", A),
          alert("Failed to save borrowed book. Please try again."));
      }
    },
    T = (g) => {
      (m({
        id: g.id,
        book_id: g.book_id || "",
        user_id: g.user_id || "",
        borrow_date: g.borrow_date || "",
        due_date: g.due_date || "",
        return_date: g.return_date || "",
      }),
        o(!0),
        i(!0));
    },
    N = async (g) => {
      if (window.confirm("Are you sure you want to delete this record?"))
        try {
          await S.mutateAsync(g);
        } catch {
          alert("Failed to delete record. Please try again.");
        }
    },
    j = n
      ? p.filter(
          (g) =>
            g.book_title?.toLowerCase().includes(n.toLowerCase()) ||
            g.user_name?.toLowerCase().includes(n.toLowerCase()),
        )
      : p;
  return f.jsxs(f.Fragment, {
    children: [
      f.jsxs("div", {
        className: "flex justify-between items-center mb-4",
        children: [
          f.jsx("h2", {
            className: "text-xl font-semibold",
            children: "Borrowed Books",
          }),
          f.jsx("button", {
            onClick: () => {
              (m({
                book_id: "",
                user_id: "",
                borrow_date: "",
                due_date: "",
                return_date: "",
              }),
                o(!1),
                i(!0));
            },
            className:
              "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium",
            children: "➕ Add Borrowed Book",
          }),
        ],
      }),
      f.jsx("div", {
        className: "overflow-x-auto",
        children: f.jsxs("table", {
          className: "w-full border-collapse text-left text-sm",
          children: [
            f.jsx("thead", {
              children: f.jsxs("tr", {
                children: [
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Book Title",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "User Name",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Borrow Date",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Due Date",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Return Date",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Status",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Action",
                  }),
                ],
              }),
            }),
            f.jsx("tbody", {
              children: b
                ? f.jsx("tr", {
                    children: f.jsx("td", {
                      colSpan: "7",
                      className: "p-3 text-center text-gray-500",
                      children: "Loading...",
                    }),
                  })
                : j.length === 0
                  ? f.jsx("tr", {
                      children: f.jsx("td", {
                        colSpan: "7",
                        className: "p-3 text-center text-gray-500",
                        children: "No borrowed books found",
                      }),
                    })
                  : j.map((g) =>
                      f.jsxs(
                        "tr",
                        {
                          className: "border-b border-gray-200",
                          children: [
                            f.jsx("td", {
                              className: "p-3",
                              children: g.book_title,
                            }),
                            f.jsx("td", {
                              className: "p-3",
                              children: g.user_name,
                            }),
                            f.jsx("td", {
                              className: "p-3",
                              children: g.borrow_date,
                            }),
                            f.jsx("td", {
                              className: "p-3",
                              children: g.due_date,
                            }),
                            f.jsx("td", {
                              className: "p-3",
                              children: g.return_date,
                            }),
                            f.jsx("td", {
                              className: "p-3",
                              children: g.return_date ? "Returned" : "Borrowed",
                            }),
                            f.jsxs("td", {
                              className: "p-3",
                              children: [
                                f.jsx("button", {
                                  onClick: () => T(g),
                                  className:
                                    "mr-2 text-lg hover:scale-125 transition-transform",
                                  title: "Edit",
                                  children: "✏️",
                                }),
                                f.jsx("button", {
                                  onClick: () => N(g.id),
                                  className:
                                    "mr-2 text-lg hover:scale-125 transition-transform",
                                  title: "Delete",
                                  children: "🗑️",
                                }),
                              ],
                            }),
                          ],
                        },
                        g.id,
                      ),
                    ),
            }),
          ],
        }),
      }),
      f.jsx(V2, {
        showPopup: l,
        editMode: u,
        formData: d,
        setFormData: m,
        handleAddBorrowedBook: E,
        setShowPopup: i,
        setEditMode: o,
      }),
    ],
  });
}
function F2(n) {
  const l = fe.c(51),
    {
      showPopup: i,
      editMode: u,
      formData: o,
      setFormData: d,
      handleAddBookSale: m,
      setShowPopup: p,
      setEditMode: b,
    } = n;
  let y;
  l[0] !== b || l[1] !== p
    ? ((y = () => {
        (p(!1), b(!1));
      }),
      (l[0] = b),
      (l[1] = p),
      (l[2] = y))
    : (y = l[2]);
  const v = u ? "Edit Book Sale" : "Add New Book Sale";
  let S;
  l[3] === Symbol.for("react.memo_cache_sentinel")
    ? ((S = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Book ID",
      })),
      (l[3] = S))
    : (S = l[3]);
  let E;
  l[4] !== o || l[5] !== d
    ? ((E = (me) => d({ ...o, book_id: me.target.value })),
      (l[4] = o),
      (l[5] = d),
      (l[6] = E))
    : (E = l[6]);
  let T;
  l[7] !== o.book_id || l[8] !== E
    ? ((T = f.jsxs("div", {
        children: [
          S,
          f.jsx("input", {
            type: "text",
            value: o.book_id,
            onChange: E,
            placeholder: "Enter book ID",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[7] = o.book_id),
      (l[8] = E),
      (l[9] = T))
    : (T = l[9]);
  let N;
  l[10] === Symbol.for("react.memo_cache_sentinel")
    ? ((N = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "User ID",
      })),
      (l[10] = N))
    : (N = l[10]);
  let j;
  l[11] !== o || l[12] !== d
    ? ((j = (me) => d({ ...o, user_id: me.target.value })),
      (l[11] = o),
      (l[12] = d),
      (l[13] = j))
    : (j = l[13]);
  let g;
  l[14] !== o.user_id || l[15] !== j
    ? ((g = f.jsxs("div", {
        children: [
          N,
          f.jsx("input", {
            type: "text",
            value: o.user_id,
            onChange: j,
            placeholder: "Enter user ID",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[14] = o.user_id),
      (l[15] = j),
      (l[16] = g))
    : (g = l[16]);
  let A;
  l[17] === Symbol.for("react.memo_cache_sentinel")
    ? ((A = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Sale Date",
      })),
      (l[17] = A))
    : (A = l[17]);
  let R;
  l[18] !== o || l[19] !== d
    ? ((R = (me) => d({ ...o, sale_date: me.target.value })),
      (l[18] = o),
      (l[19] = d),
      (l[20] = R))
    : (R = l[20]);
  let q;
  l[21] !== o.sale_date || l[22] !== R
    ? ((q = f.jsxs("div", {
        children: [
          A,
          f.jsx("input", {
            type: "date",
            value: o.sale_date,
            onChange: R,
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[21] = o.sale_date),
      (l[22] = R),
      (l[23] = q))
    : (q = l[23]);
  let Z;
  l[24] === Symbol.for("react.memo_cache_sentinel")
    ? ((Z = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Price",
      })),
      (l[24] = Z))
    : (Z = l[24]);
  let k;
  l[25] !== o || l[26] !== d
    ? ((k = (me) => d({ ...o, price: me.target.value })),
      (l[25] = o),
      (l[26] = d),
      (l[27] = k))
    : (k = l[27]);
  let F;
  l[28] !== o.price || l[29] !== k
    ? ((F = f.jsxs("div", {
        children: [
          Z,
          f.jsx("input", {
            type: "number",
            value: o.price,
            onChange: k,
            placeholder: "Enter price",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[28] = o.price),
      (l[29] = k),
      (l[30] = F))
    : (F = l[30]);
  const K = u ? "Update" : "Add";
  let V;
  l[31] !== K
    ? ((V = f.jsx("button", {
        type: "submit",
        className:
          "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold",
        children: K,
      })),
      (l[31] = K),
      (l[32] = V))
    : (V = l[32]);
  let P;
  l[33] !== b || l[34] !== p
    ? ((P = f.jsx("button", {
        type: "button",
        onClick: () => {
          (p(!1), b(!1));
        },
        className:
          "bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-semibold",
        children: "Cancel",
      })),
      (l[33] = b),
      (l[34] = p),
      (l[35] = P))
    : (P = l[35]);
  let ee;
  l[36] !== V || l[37] !== P
    ? ((ee = f.jsxs("div", {
        className: "flex justify-between mt-5",
        children: [V, P],
      })),
      (l[36] = V),
      (l[37] = P),
      (l[38] = ee))
    : (ee = l[38]);
  let le;
  l[39] !== m ||
  l[40] !== q ||
  l[41] !== F ||
  l[42] !== ee ||
  l[43] !== T ||
  l[44] !== g
    ? ((le = f.jsxs("form", {
        onSubmit: m,
        className: "space-y-3",
        children: [T, g, q, F, ee],
      })),
      (l[39] = m),
      (l[40] = q),
      (l[41] = F),
      (l[42] = ee),
      (l[43] = T),
      (l[44] = g),
      (l[45] = le))
    : (le = l[45]);
  let se;
  return (
    l[46] !== i || l[47] !== y || l[48] !== le || l[49] !== v
      ? ((se = f.jsx(Ma, { show: i, onClose: y, title: v, children: le })),
        (l[46] = i),
        (l[47] = y),
        (l[48] = le),
        (l[49] = v),
        (l[50] = se))
      : (se = l[50]),
    se
  );
}
function J2({ searchValue: n }) {
  const [l, i] = D.useState(!1),
    [u, o] = D.useState(!1),
    [d, m] = D.useState({ book_id: "", user_id: "", sale_date: "", price: "" }),
    { data: p = [], isLoading: b } = jy(),
    y = w2(),
    v = _2(),
    S = C2(),
    E = async (g) => {
      g.preventDefault();
      try {
        (u && d.id
          ? await v.mutateAsync({ id: d.id, data: d })
          : await y.mutateAsync(d),
          m({ book_id: "", user_id: "", sale_date: "", price: "" }),
          i(!1),
          o(!1));
      } catch (A) {
        (console.error("Failed to save book sale:", A),
          alert("Failed to save book sale. Please try again."));
      }
    },
    T = (g) => {
      (m({
        id: g.id,
        book_id: g.book_id || "",
        user_id: g.user_id || "",
        sale_date: g.sale_date || "",
        price: g.price || "",
      }),
        o(!0),
        i(!0));
    },
    N = async (g) => {
      if (window.confirm("Are you sure you want to delete this record?"))
        try {
          await S.mutateAsync(g);
        } catch {
          alert("Failed to delete record. Please try again.");
        }
    },
    j = n
      ? p.filter(
          (g) =>
            g.book_title?.toLowerCase().includes(n.toLowerCase()) ||
            g.user_name?.toLowerCase().includes(n.toLowerCase()),
        )
      : p;
  return f.jsxs(f.Fragment, {
    children: [
      f.jsxs("div", {
        className: "flex justify-between items-center mb-4",
        children: [
          f.jsx("h2", {
            className: "text-xl font-semibold",
            children: "Bought Books",
          }),
          f.jsx("button", {
            onClick: () => {
              (m({ book_id: "", user_id: "", sale_date: "", price: "" }),
                o(!1),
                i(!0));
            },
            className:
              "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium",
            children: "➕ Add Book Sale",
          }),
        ],
      }),
      f.jsx("div", {
        className: "overflow-x-auto",
        children: f.jsxs("table", {
          className: "w-full border-collapse text-left text-sm",
          children: [
            f.jsx("thead", {
              children: f.jsxs("tr", {
                children: [
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Book Title",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "User Name",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Sale Date",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Price",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Action",
                  }),
                ],
              }),
            }),
            f.jsx("tbody", {
              children: b
                ? f.jsx("tr", {
                    children: f.jsx("td", {
                      colSpan: "5",
                      className: "p-3 text-center text-gray-500",
                      children: "Loading...",
                    }),
                  })
                : j.length === 0
                  ? f.jsx("tr", {
                      children: f.jsx("td", {
                        colSpan: "5",
                        className: "p-3 text-center text-gray-500",
                        children: "No book sales found",
                      }),
                    })
                  : j.map((g) =>
                      f.jsxs(
                        "tr",
                        {
                          className: "border-b border-gray-200",
                          children: [
                            f.jsx("td", {
                              className: "p-3",
                              children: g.book_title,
                            }),
                            f.jsx("td", {
                              className: "p-3",
                              children: g.user_name,
                            }),
                            f.jsx("td", {
                              className: "p-3",
                              children: g.sale_date,
                            }),
                            f.jsx("td", {
                              className: "p-3",
                              children: g.price,
                            }),
                            f.jsxs("td", {
                              className: "p-3",
                              children: [
                                f.jsx("button", {
                                  onClick: () => T(g),
                                  className:
                                    "mr-2 text-lg hover:scale-125 transition-transform",
                                  title: "Edit",
                                  children: "✏️",
                                }),
                                f.jsx("button", {
                                  onClick: () => N(g.id),
                                  className:
                                    "mr-2 text-lg hover:scale-125 transition-transform",
                                  title: "Delete",
                                  children: "🗑️",
                                }),
                              ],
                            }),
                          ],
                        },
                        g.id,
                      ),
                    ),
            }),
          ],
        }),
      }),
      f.jsx(F2, {
        showPopup: l,
        editMode: u,
        formData: d,
        setFormData: m,
        handleAddBookSale: E,
        setShowPopup: i,
        setEditMode: o,
      }),
    ],
  });
}
function $2(n) {
  const l = fe.c(43),
    {
      showPopup: i,
      editMode: u,
      formData: o,
      setFormData: d,
      handleAddReservation: m,
      setShowPopup: p,
      setEditMode: b,
    } = n;
  let y;
  l[0] !== b || l[1] !== p
    ? ((y = () => {
        (p(!1), b(!1));
      }),
      (l[0] = b),
      (l[1] = p),
      (l[2] = y))
    : (y = l[2]);
  const v = u ? "Edit Reservation" : "Add New Reservation";
  let S;
  l[3] === Symbol.for("react.memo_cache_sentinel")
    ? ((S = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Book ID",
      })),
      (l[3] = S))
    : (S = l[3]);
  let E;
  l[4] !== o || l[5] !== d
    ? ((E = (ee) => d({ ...o, book_id: ee.target.value })),
      (l[4] = o),
      (l[5] = d),
      (l[6] = E))
    : (E = l[6]);
  let T;
  l[7] !== o.book_id || l[8] !== E
    ? ((T = f.jsxs("div", {
        children: [
          S,
          f.jsx("input", {
            type: "text",
            value: o.book_id,
            onChange: E,
            placeholder: "Enter book ID",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[7] = o.book_id),
      (l[8] = E),
      (l[9] = T))
    : (T = l[9]);
  let N;
  l[10] === Symbol.for("react.memo_cache_sentinel")
    ? ((N = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "User ID",
      })),
      (l[10] = N))
    : (N = l[10]);
  let j;
  l[11] !== o || l[12] !== d
    ? ((j = (ee) => d({ ...o, user_id: ee.target.value })),
      (l[11] = o),
      (l[12] = d),
      (l[13] = j))
    : (j = l[13]);
  let g;
  l[14] !== o.user_id || l[15] !== j
    ? ((g = f.jsxs("div", {
        children: [
          N,
          f.jsx("input", {
            type: "text",
            value: o.user_id,
            onChange: j,
            placeholder: "Enter user ID",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[14] = o.user_id),
      (l[15] = j),
      (l[16] = g))
    : (g = l[16]);
  let A;
  l[17] === Symbol.for("react.memo_cache_sentinel")
    ? ((A = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Reservation Date",
      })),
      (l[17] = A))
    : (A = l[17]);
  let R;
  l[18] !== o || l[19] !== d
    ? ((R = (ee) => d({ ...o, reservation_date: ee.target.value })),
      (l[18] = o),
      (l[19] = d),
      (l[20] = R))
    : (R = l[20]);
  let q;
  l[21] !== o.reservation_date || l[22] !== R
    ? ((q = f.jsxs("div", {
        children: [
          A,
          f.jsx("input", {
            type: "date",
            value: o.reservation_date,
            onChange: R,
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[21] = o.reservation_date),
      (l[22] = R),
      (l[23] = q))
    : (q = l[23]);
  const Z = u ? "Update" : "Add";
  let k;
  l[24] !== Z
    ? ((k = f.jsx("button", {
        type: "submit",
        className:
          "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold",
        children: Z,
      })),
      (l[24] = Z),
      (l[25] = k))
    : (k = l[25]);
  let F;
  l[26] !== b || l[27] !== p
    ? ((F = f.jsx("button", {
        type: "button",
        onClick: () => {
          (p(!1), b(!1));
        },
        className:
          "bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-semibold",
        children: "Cancel",
      })),
      (l[26] = b),
      (l[27] = p),
      (l[28] = F))
    : (F = l[28]);
  let K;
  l[29] !== k || l[30] !== F
    ? ((K = f.jsxs("div", {
        className: "flex justify-between mt-5",
        children: [k, F],
      })),
      (l[29] = k),
      (l[30] = F),
      (l[31] = K))
    : (K = l[31]);
  let V;
  l[32] !== m || l[33] !== q || l[34] !== K || l[35] !== T || l[36] !== g
    ? ((V = f.jsxs("form", {
        onSubmit: m,
        className: "space-y-3",
        children: [T, g, q, K],
      })),
      (l[32] = m),
      (l[33] = q),
      (l[34] = K),
      (l[35] = T),
      (l[36] = g),
      (l[37] = V))
    : (V = l[37]);
  let P;
  return (
    l[38] !== i || l[39] !== y || l[40] !== V || l[41] !== v
      ? ((P = f.jsx(Ma, { show: i, onClose: y, title: v, children: V })),
        (l[38] = i),
        (l[39] = y),
        (l[40] = V),
        (l[41] = v),
        (l[42] = P))
      : (P = l[42]),
    P
  );
}
function P2({ searchValue: n }) {
  const [l, i] = D.useState(!1),
    [u, o] = D.useState(!1),
    [d, m] = D.useState({ book_id: "", user_id: "", reservation_date: "" }),
    { data: p = [], isLoading: b } = Ny(),
    y = m2(),
    v = p2(),
    S = y2(),
    E = async (g) => {
      g.preventDefault();
      try {
        (u && d.id
          ? await v.mutateAsync({ id: d.id, data: d })
          : await y.mutateAsync(d),
          m({ book_id: "", user_id: "", reservation_date: "" }),
          i(!1),
          o(!1));
      } catch (A) {
        (console.error("Failed to save reservation:", A),
          alert("Failed to save reservation. Please try again."));
      }
    },
    T = (g) => {
      (m({
        id: g.id,
        book_id: g.book_id || "",
        user_id: g.user_id || "",
        reservation_date: g.reservation_date || "",
      }),
        o(!0),
        i(!0));
    },
    N = async (g) => {
      if (window.confirm("Are you sure you want to delete this reservation?"))
        try {
          await S.mutateAsync(g);
        } catch {
          alert("Failed to delete reservation. Please try again.");
        }
    },
    j = n
      ? p.filter(
          (g) =>
            g.book_title?.toLowerCase().includes(n.toLowerCase()) ||
            g.user_name?.toLowerCase().includes(n.toLowerCase()),
        )
      : p;
  return f.jsxs(f.Fragment, {
    children: [
      f.jsxs("div", {
        className: "flex justify-between items-center mb-4",
        children: [
          f.jsx("h2", {
            className: "text-xl font-semibold",
            children: "Reserved Books",
          }),
          f.jsx("button", {
            onClick: () => {
              (m({ book_id: "", user_id: "", reservation_date: "" }),
                o(!1),
                i(!0));
            },
            className:
              "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium",
            children: "➕ Add Reservation",
          }),
        ],
      }),
      f.jsx("div", {
        className: "overflow-x-auto",
        children: f.jsxs("table", {
          className: "w-full border-collapse text-left text-sm",
          children: [
            f.jsx("thead", {
              children: f.jsxs("tr", {
                children: [
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Book Title",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "User Name",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Reservation Date",
                  }),
                  f.jsx("th", {
                    className: "p-3 border-b border-gray-300 font-semibold",
                    children: "Action",
                  }),
                ],
              }),
            }),
            f.jsx("tbody", {
              children: b
                ? f.jsx("tr", {
                    children: f.jsx("td", {
                      colSpan: "4",
                      className: "p-3 text-center text-gray-500",
                      children: "Loading...",
                    }),
                  })
                : j.length === 0
                  ? f.jsx("tr", {
                      children: f.jsx("td", {
                        colSpan: "4",
                        className: "p-3 text-center text-gray-500",
                        children: "No reservations found",
                      }),
                    })
                  : j.map((g) =>
                      f.jsxs(
                        "tr",
                        {
                          className: "border-b border-gray-200",
                          children: [
                            f.jsx("td", {
                              className: "p-3",
                              children: g.book_title,
                            }),
                            f.jsx("td", {
                              className: "p-3",
                              children: g.user_name,
                            }),
                            f.jsx("td", {
                              className: "p-3",
                              children: g.reservation_date,
                            }),
                            f.jsxs("td", {
                              className: "p-3",
                              children: [
                                f.jsx("button", {
                                  onClick: () => T(g),
                                  className:
                                    "mr-2 text-lg hover:scale-125 transition-transform",
                                  title: "Edit",
                                  children: "✏️",
                                }),
                                f.jsx("button", {
                                  onClick: () => N(g.id),
                                  className:
                                    "mr-2 text-lg hover:scale-125 transition-transform",
                                  title: "Delete",
                                  children: "🗑️",
                                }),
                              ],
                            }),
                          ],
                        },
                        g.id,
                      ),
                    ),
            }),
          ],
        }),
      }),
      f.jsx($2, {
        showPopup: l,
        editMode: u,
        formData: d,
        setFormData: m,
        handleAddReservation: E,
        setShowPopup: i,
        setEditMode: o,
      }),
    ],
  });
}
function W2(n) {
  const l = fe.c(37),
    { searchValue: i } = n,
    [u, o] = D.useState("borrowed");
  let d;
  l[0] === Symbol.for("react.memo_cache_sentinel")
    ? ((d = () => o("borrowed")), (l[0] = d))
    : (d = l[0]);
  const m = `px-4 py-2 rounded-md text-sm font-medium border ${u === "borrowed" ? "bg-white text-[#0b0b3b] border-[#0b0b3b8f]" : "bg-[#001b961a] border-transparent"}`;
  let p;
  l[1] !== m
    ? ((p = f.jsx("button", {
        onClick: d,
        className: m,
        children: "Borrowed Books",
      })),
      (l[1] = m),
      (l[2] = p))
    : (p = l[2]);
  let b;
  l[3] === Symbol.for("react.memo_cache_sentinel")
    ? ((b = () => o("bought")), (l[3] = b))
    : (b = l[3]);
  const y = `px-4 py-2 rounded-md text-sm font-medium border ${u === "bought" ? "bg-white text-[#0b0b3b] border-[#0b0b3b8f]" : "bg-[#001b961a] border-transparent"}`;
  let v;
  l[4] !== y
    ? ((v = f.jsx("button", {
        onClick: b,
        className: y,
        children: "Bought Books",
      })),
      (l[4] = y),
      (l[5] = v))
    : (v = l[5]);
  let S;
  l[6] === Symbol.for("react.memo_cache_sentinel")
    ? ((S = () => o("reserved")), (l[6] = S))
    : (S = l[6]);
  const E = `px-4 py-2 rounded-md text-sm font-medium border ${u === "reserved" ? "bg-white text-[#0b0b3b] border-[#0b0b3b8f]" : "bg-[#001b961a] border-transparent"}`;
  let T;
  l[7] !== E
    ? ((T = f.jsx("button", {
        onClick: S,
        className: E,
        children: "Reserved Books",
      })),
      (l[7] = E),
      (l[8] = T))
    : (T = l[8]);
  let N;
  l[9] === Symbol.for("react.memo_cache_sentinel")
    ? ((N = () => o("overdue")), (l[9] = N))
    : (N = l[9]);
  const j = `px-4 py-2 rounded-md text-sm font-medium border ${u === "overdue" ? "bg-white text-[#0b0b3b] border-[#0b0b3b8f]" : "bg-[#001b961a] border-transparent"}`;
  let g;
  l[10] !== j
    ? ((g = f.jsx("button", {
        onClick: N,
        className: j,
        children: "Overdue Borrowers",
      })),
      (l[10] = j),
      (l[11] = g))
    : (g = l[11]);
  let A;
  l[12] !== g || l[13] !== p || l[14] !== v || l[15] !== T
    ? ((A = f.jsxs("div", {
        className:
          "flex gap-2 px-6 py-3 bg-[#f8f8fb] border-b border-[#0b0b3b28]",
        children: [p, v, T, g],
      })),
      (l[12] = g),
      (l[13] = p),
      (l[14] = v),
      (l[15] = T),
      (l[16] = A))
    : (A = l[16]);
  let R;
  l[17] !== u || l[18] !== i
    ? ((R = u === "borrowed" && f.jsx(Z2, { searchValue: i })),
      (l[17] = u),
      (l[18] = i),
      (l[19] = R))
    : (R = l[19]);
  let q;
  l[20] !== u || l[21] !== i
    ? ((q = u === "bought" && f.jsx(J2, { searchValue: i })),
      (l[20] = u),
      (l[21] = i),
      (l[22] = q))
    : (q = l[22]);
  let Z;
  l[23] !== u || l[24] !== i
    ? ((Z = u === "reserved" && f.jsx(P2, { searchValue: i })),
      (l[23] = u),
      (l[24] = i),
      (l[25] = Z))
    : (Z = l[25]);
  let k;
  l[26] !== u || l[27] !== i
    ? ((k = u === "overdue" && f.jsx(wy, { searchValue: i })),
      (l[26] = u),
      (l[27] = i),
      (l[28] = k))
    : (k = l[28]);
  let F;
  l[29] !== R || l[30] !== q || l[31] !== Z || l[32] !== k
    ? ((F = f.jsxs("section", {
        className:
          "flex-1 bg-white mx-6 my-5 rounded-lg p-5 shadow-[0_2px_6px_rgba(0,0,0,0.05)] overflow-auto",
        children: [R, q, Z, k],
      })),
      (l[29] = R),
      (l[30] = q),
      (l[31] = Z),
      (l[32] = k),
      (l[33] = F))
    : (F = l[33]);
  let K;
  return (
    l[34] !== A || l[35] !== F
      ? ((K = f.jsx(Tn, {
          activeTab: "catalog",
          children: f.jsxs("div", {
            className: "flex flex-col h-screen",
            children: [A, F],
          }),
        })),
        (l[34] = A),
        (l[35] = F),
        (l[36] = K))
      : (K = l[36]),
    K
  );
}
function I2(n) {
  const l = fe.c(107),
    {
      showPopup: i,
      editMode: u,
      formData: o,
      setFormData: d,
      handleAddBook: m,
      setShowPopup: p,
      setEditMode: b,
    } = n;
  let y;
  l[0] !== b || l[1] !== p
    ? ((y = () => {
        (p(!1), b(!1));
      }),
      (l[0] = b),
      (l[1] = p),
      (l[2] = y))
    : (y = l[2]);
  const v = u ? "Edit Book" : "Add New Book";
  let S;
  l[3] === Symbol.for("react.memo_cache_sentinel")
    ? ((S = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Title",
      })),
      (l[3] = S))
    : (S = l[3]);
  let E;
  l[4] !== o || l[5] !== d
    ? ((E = (Ae) => d({ ...o, title: Ae.target.value })),
      (l[4] = o),
      (l[5] = d),
      (l[6] = E))
    : (E = l[6]);
  let T;
  l[7] !== o.title || l[8] !== E
    ? ((T = f.jsxs("div", {
        children: [
          S,
          f.jsx("input", {
            type: "text",
            value: o.title,
            onChange: E,
            placeholder: "Enter title",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[7] = o.title),
      (l[8] = E),
      (l[9] = T))
    : (T = l[9]);
  let N;
  l[10] === Symbol.for("react.memo_cache_sentinel")
    ? ((N = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Author",
      })),
      (l[10] = N))
    : (N = l[10]);
  let j;
  l[11] !== o || l[12] !== d
    ? ((j = (Ae) => d({ ...o, author: Ae.target.value })),
      (l[11] = o),
      (l[12] = d),
      (l[13] = j))
    : (j = l[13]);
  let g;
  l[14] !== o.author || l[15] !== j
    ? ((g = f.jsxs("div", {
        children: [
          N,
          f.jsx("input", {
            type: "text",
            value: o.author,
            onChange: j,
            placeholder: "Enter author",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[14] = o.author),
      (l[15] = j),
      (l[16] = g))
    : (g = l[16]);
  let A;
  l[17] === Symbol.for("react.memo_cache_sentinel")
    ? ((A = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "ISBN",
      })),
      (l[17] = A))
    : (A = l[17]);
  let R;
  l[18] !== o || l[19] !== d
    ? ((R = (Ae) => d({ ...o, isbn: Ae.target.value })),
      (l[18] = o),
      (l[19] = d),
      (l[20] = R))
    : (R = l[20]);
  let q;
  l[21] !== o.isbn || l[22] !== R
    ? ((q = f.jsxs("div", {
        children: [
          A,
          f.jsx("input", {
            type: "text",
            value: o.isbn,
            onChange: R,
            placeholder: "Enter ISBN",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[21] = o.isbn),
      (l[22] = R),
      (l[23] = q))
    : (q = l[23]);
  let Z;
  l[24] === Symbol.for("react.memo_cache_sentinel")
    ? ((Z = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Publisher",
      })),
      (l[24] = Z))
    : (Z = l[24]);
  let k;
  l[25] !== o || l[26] !== d
    ? ((k = (Ae) => d({ ...o, publisher: Ae.target.value })),
      (l[25] = o),
      (l[26] = d),
      (l[27] = k))
    : (k = l[27]);
  let F;
  l[28] !== o.publisher || l[29] !== k
    ? ((F = f.jsxs("div", {
        children: [
          Z,
          f.jsx("input", {
            type: "text",
            value: o.publisher,
            onChange: k,
            placeholder: "Enter publisher",
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[28] = o.publisher),
      (l[29] = k),
      (l[30] = F))
    : (F = l[30]);
  let K;
  l[31] === Symbol.for("react.memo_cache_sentinel")
    ? ((K = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Publication Year",
      })),
      (l[31] = K))
    : (K = l[31]);
  let V;
  l[32] !== o || l[33] !== d
    ? ((V = (Ae) => d({ ...o, publicationYear: Ae.target.value })),
      (l[32] = o),
      (l[33] = d),
      (l[34] = V))
    : (V = l[34]);
  let P;
  l[35] !== o.publicationYear || l[36] !== V
    ? ((P = f.jsxs("div", {
        children: [
          K,
          f.jsx("input", {
            type: "number",
            value: o.publicationYear,
            onChange: V,
            placeholder: "Enter publication year",
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[35] = o.publicationYear),
      (l[36] = V),
      (l[37] = P))
    : (P = l[37]);
  let ee;
  l[38] === Symbol.for("react.memo_cache_sentinel")
    ? ((ee = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Category ID",
      })),
      (l[38] = ee))
    : (ee = l[38]);
  let le;
  l[39] !== o || l[40] !== d
    ? ((le = (Ae) => d({ ...o, categoryId: Ae.target.value })),
      (l[39] = o),
      (l[40] = d),
      (l[41] = le))
    : (le = l[41]);
  let se;
  l[42] !== o.categoryId || l[43] !== le
    ? ((se = f.jsxs("div", {
        children: [
          ee,
          f.jsx("input", {
            type: "number",
            value: o.categoryId,
            onChange: le,
            placeholder: "Enter category ID",
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[42] = o.categoryId),
      (l[43] = le),
      (l[44] = se))
    : (se = l[44]);
  let me;
  l[45] === Symbol.for("react.memo_cache_sentinel")
    ? ((me = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Total Copies",
      })),
      (l[45] = me))
    : (me = l[45]);
  let ce;
  l[46] !== o || l[47] !== d
    ? ((ce = (Ae) => d({ ...o, totalCopies: Ae.target.value })),
      (l[46] = o),
      (l[47] = d),
      (l[48] = ce))
    : (ce = l[48]);
  let pe;
  l[49] !== o.totalCopies || l[50] !== ce
    ? ((pe = f.jsxs("div", {
        children: [
          me,
          f.jsx("input", {
            type: "number",
            value: o.totalCopies,
            onChange: ce,
            placeholder: "Enter total copies",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[49] = o.totalCopies),
      (l[50] = ce),
      (l[51] = pe))
    : (pe = l[51]);
  let M;
  l[52] === Symbol.for("react.memo_cache_sentinel")
    ? ((M = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Available Copies",
      })),
      (l[52] = M))
    : (M = l[52]);
  let J;
  l[53] !== o || l[54] !== d
    ? ((J = (Ae) => d({ ...o, availableCopies: Ae.target.value })),
      (l[53] = o),
      (l[54] = d),
      (l[55] = J))
    : (J = l[55]);
  let I;
  l[56] !== o.availableCopies || l[57] !== J
    ? ((I = f.jsxs("div", {
        children: [
          M,
          f.jsx("input", {
            type: "number",
            value: o.availableCopies,
            onChange: J,
            placeholder: "Enter available copies",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[56] = o.availableCopies),
      (l[57] = J),
      (l[58] = I))
    : (I = l[58]);
  let ne;
  l[59] === Symbol.for("react.memo_cache_sentinel")
    ? ((ne = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Sale Price",
      })),
      (l[59] = ne))
    : (ne = l[59]);
  let de;
  l[60] !== o || l[61] !== d
    ? ((de = (Ae) => d({ ...o, salePrice: Ae.target.value })),
      (l[60] = o),
      (l[61] = d),
      (l[62] = de))
    : (de = l[62]);
  let _;
  l[63] !== o.salePrice || l[64] !== de
    ? ((_ = f.jsxs("div", {
        children: [
          ne,
          f.jsx("input", {
            type: "number",
            value: o.salePrice,
            onChange: de,
            placeholder: "Enter sale price",
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[63] = o.salePrice),
      (l[64] = de),
      (l[65] = _))
    : (_ = l[65]);
  let Q;
  l[66] === Symbol.for("react.memo_cache_sentinel")
    ? ((Q = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Digital URL",
      })),
      (l[66] = Q))
    : (Q = l[66]);
  let $;
  l[67] !== o || l[68] !== d
    ? (($ = (Ae) => d({ ...o, digitalUrl: Ae.target.value })),
      (l[67] = o),
      (l[68] = d),
      (l[69] = $))
    : ($ = l[69]);
  let W;
  l[70] !== o.digitalUrl || l[71] !== $
    ? ((W = f.jsxs("div", {
        children: [
          Q,
          f.jsx("input", {
            type: "text",
            value: o.digitalUrl,
            onChange: $,
            placeholder: "Enter digital URL",
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[70] = o.digitalUrl),
      (l[71] = $),
      (l[72] = W))
    : (W = l[72]);
  let ie;
  l[73] === Symbol.for("react.memo_cache_sentinel")
    ? ((ie = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Description",
      })),
      (l[73] = ie))
    : (ie = l[73]);
  let oe;
  l[74] !== o || l[75] !== d
    ? ((oe = (Ae) => d({ ...o, description: Ae.target.value })),
      (l[74] = o),
      (l[75] = d),
      (l[76] = oe))
    : (oe = l[76]);
  let ve;
  l[77] !== o.description || l[78] !== oe
    ? ((ve = f.jsxs("div", {
        className: "col-span-2",
        children: [
          ie,
          f.jsx("textarea", {
            value: o.description,
            onChange: oe,
            placeholder: "Enter description",
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[77] = o.description),
      (l[78] = oe),
      (l[79] = ve))
    : (ve = l[79]);
  const Ye = u ? "Update" : "Add";
  let Te;
  l[80] !== Ye
    ? ((Te = f.jsx("button", {
        type: "submit",
        className:
          "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold",
        children: Ye,
      })),
      (l[80] = Ye),
      (l[81] = Te))
    : (Te = l[81]);
  let St;
  l[82] !== b || l[83] !== p
    ? ((St = f.jsx("button", {
        type: "button",
        onClick: () => {
          (p(!1), b(!1));
        },
        className:
          "bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-semibold",
        children: "Cancel",
      })),
      (l[82] = b),
      (l[83] = p),
      (l[84] = St))
    : (St = l[84]);
  let kt;
  l[85] !== Te || l[86] !== St
    ? ((kt = f.jsxs("div", {
        className: "col-span-2 flex justify-between mt-5",
        children: [Te, St],
      })),
      (l[85] = Te),
      (l[86] = St),
      (l[87] = kt))
    : (kt = l[87]);
  let $t;
  l[88] !== m ||
  l[89] !== q ||
  l[90] !== F ||
  l[91] !== P ||
  l[92] !== se ||
  l[93] !== pe ||
  l[94] !== I ||
  l[95] !== _ ||
  l[96] !== W ||
  l[97] !== ve ||
  l[98] !== kt ||
  l[99] !== T ||
  l[100] !== g
    ? (($t = f.jsxs("form", {
        onSubmit: m,
        className: "grid grid-cols-2 gap-4",
        children: [T, g, q, F, P, se, pe, I, _, W, ve, kt],
      })),
      (l[88] = m),
      (l[89] = q),
      (l[90] = F),
      (l[91] = P),
      (l[92] = se),
      (l[93] = pe),
      (l[94] = I),
      (l[95] = _),
      (l[96] = W),
      (l[97] = ve),
      (l[98] = kt),
      (l[99] = T),
      (l[100] = g),
      (l[101] = $t))
    : ($t = l[101]);
  let sa;
  return (
    l[102] !== i || l[103] !== y || l[104] !== v || l[105] !== $t
      ? ((sa = f.jsx(Ma, {
          show: i,
          onClose: y,
          title: v,
          maxWidthClass: "max-w-[700px]",
          children: $t,
        })),
        (l[102] = i),
        (l[103] = y),
        (l[104] = v),
        (l[105] = $t),
        (l[106] = sa))
      : (sa = l[106]),
    sa
  );
}
function e3({ searchValue: n }) {
  const [l, i] = D.useState(!1),
    [u, o] = D.useState(!1),
    [d, m] = D.useState({
      title: "",
      author: "",
      isbn: "",
      publisher: "",
      publicationYear: "",
      categoryId: "",
      totalCopies: 1,
      availableCopies: 1,
      salePrice: "",
      digitalUrl: "",
      description: "",
    }),
    { data: p = [], isLoading: b } = Sy(),
    y = i2(),
    v = r2(),
    S = u2(),
    E = async (g) => {
      g.preventDefault();
      try {
        (u && d.id
          ? await v.mutateAsync({ id: d.id, data: d })
          : await y.mutateAsync(d),
          m({
            title: "",
            author: "",
            isbn: "",
            publisher: "",
            publicationYear: "",
            categoryId: "",
            totalCopies: 1,
            availableCopies: 1,
            salePrice: "",
            digitalUrl: "",
            description: "",
          }),
          i(!1),
          o(!1));
      } catch (A) {
        (console.error("Failed to save book:", A),
          alert("Failed to save book. Please try again."));
      }
    },
    T = (g) => {
      (m({
        id: g.id,
        title: g.title || "",
        author: g.author || "",
        isbn: g.isbn || "",
        publisher: g.publisher || "",
        publicationYear: g.publicationYear || "",
        categoryId: g.categoryId || "",
        totalCopies: g.totalCopies || 1,
        availableCopies: g.availableCopies || 1,
        salePrice: g.salePrice || "",
        digitalUrl: g.digitalUrl || "",
        description: g.description || "",
      }),
        o(!0),
        i(!0));
    },
    N = async (g) => {
      if (window.confirm("Are you sure you want to delete this book?"))
        try {
          await S.mutateAsync(g);
        } catch {
          alert("Failed to delete book. Please try again.");
        }
    },
    j = n
      ? p.filter(
          (g) =>
            g.title?.toLowerCase().includes(n.toLowerCase()) ||
            g.author?.toLowerCase().includes(n.toLowerCase()) ||
            g.isbn?.toString().includes(n),
        )
      : p;
  return f.jsxs(f.Fragment, {
    children: [
      f.jsx(Tn, {
        activeTab: "books",
        children: f.jsxs("section", {
          className:
            "flex-1 bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] overflow-auto",
          children: [
            f.jsxs("div", {
              className: "flex justify-between items-center mb-4",
              children: [
                f.jsx("h2", {
                  className: "text-xl font-semibold",
                  children: "Book Management",
                }),
                f.jsx("button", {
                  onClick: () => {
                    (m({
                      title: "",
                      author: "",
                      isbn: "",
                      publisher: "",
                      publicationYear: "",
                      categoryId: "",
                      totalCopies: 1,
                      availableCopies: 1,
                      salePrice: "",
                      digitalUrl: "",
                      description: "",
                    }),
                      o(!1),
                      i(!0));
                  },
                  className:
                    "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium",
                  children: "➕ Add Book",
                }),
              ],
            }),
            f.jsx("div", {
              className: "overflow-x-auto",
              children: f.jsxs("table", {
                className: "w-full border-collapse text-left text-sm",
                children: [
                  f.jsx("thead", {
                    children: f.jsxs("tr", {
                      children: [
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "ISBN",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Title",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Author",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Publisher",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Year",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Category ID",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Total Copies",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Available",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Price",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Action",
                        }),
                      ],
                    }),
                  }),
                  f.jsx("tbody", {
                    children: b
                      ? f.jsx("tr", {
                          children: f.jsx("td", {
                            colSpan: "10",
                            className: "p-3 text-center text-gray-500",
                            children: "Loading...",
                          }),
                        })
                      : j.length === 0
                        ? f.jsx("tr", {
                            children: f.jsx("td", {
                              colSpan: "10",
                              className: "p-3 text-center text-gray-500",
                              children: "No books found",
                            }),
                          })
                        : j.map((g) =>
                            f.jsxs(
                              "tr",
                              {
                                className: "border-b border-gray-200",
                                children: [
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.isbn,
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.title,
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.author,
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.publisher,
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.publicationYear,
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.categoryId,
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.totalCopies,
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.availableCopies,
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.salePrice,
                                  }),
                                  f.jsxs("td", {
                                    className: "p-3",
                                    children: [
                                      f.jsx("button", {
                                        onClick: () => T(g),
                                        className:
                                          "mr-2 text-lg hover:scale-125 transition-transform",
                                        title: "Edit",
                                        children: "✏️",
                                      }),
                                      f.jsx("button", {
                                        onClick: () => N(g.id),
                                        className:
                                          "mr-2 text-lg hover:scale-125 transition-transform",
                                        title: "Delete",
                                        children: "🗑️",
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              g.id,
                            ),
                          ),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      f.jsx(I2, {
        showPopup: l,
        editMode: u,
        formData: d,
        setFormData: m,
        handleAddBook: E,
        setShowPopup: i,
        setEditMode: o,
      }),
    ],
  });
}
const Nr = "/Categories",
  t3 = async () => await Rl(Nr),
  l3 = async (n) => await Oa(Nr, n),
  a3 = async (n, l) => await Cn(`${Nr}/${n}`, l),
  n3 = async (n) => await Da(`${Nr}/${n}`),
  _l = {
    all: ["categories"],
    lists: () => [..._l.all, "list"],
    list: (n) => [..._l.lists(), { filters: n }],
    details: () => [..._l.all, "detail"],
    detail: (n) => [..._l.details(), n],
  },
  s3 = () => {
    const n = fe.c(1);
    let l;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { queryKey: _l.lists(), queryFn: t3, staleTime: 3e5 }),
          (n[0] = l))
        : (l = n[0]),
      Al(l)
    );
  },
  i3 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: l3,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: _l.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  r3 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: o3,
            onSuccess: (u, o) => {
              (l.invalidateQueries({ queryKey: _l.detail(o.id) }),
                l.invalidateQueries({ queryKey: _l.lists() }));
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  u3 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: n3,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: _l.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  };
function o3(n) {
  const { id: l, data: i } = n;
  return a3(l, i);
}
function c3(n) {
  const l = fe.c(35),
    {
      showPopup: i,
      editMode: u,
      formData: o,
      setFormData: d,
      handleAddCategory: m,
      setShowPopup: p,
      setEditMode: b,
    } = n;
  let y;
  l[0] !== b || l[1] !== p
    ? ((y = () => {
        (p(!1), b(!1));
      }),
      (l[0] = b),
      (l[1] = p),
      (l[2] = y))
    : (y = l[2]);
  const v = u ? "Edit Category" : "Add New Category";
  let S;
  l[3] === Symbol.for("react.memo_cache_sentinel")
    ? ((S = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Name",
      })),
      (l[3] = S))
    : (S = l[3]);
  let E;
  l[4] !== o || l[5] !== d
    ? ((E = (K) => d({ ...o, name: K.target.value })),
      (l[4] = o),
      (l[5] = d),
      (l[6] = E))
    : (E = l[6]);
  let T;
  l[7] !== o.name || l[8] !== E
    ? ((T = f.jsxs("div", {
        children: [
          S,
          f.jsx("input", {
            type: "text",
            value: o.name,
            onChange: E,
            placeholder: "Enter name",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[7] = o.name),
      (l[8] = E),
      (l[9] = T))
    : (T = l[9]);
  let N;
  l[10] === Symbol.for("react.memo_cache_sentinel")
    ? ((N = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Description",
      })),
      (l[10] = N))
    : (N = l[10]);
  let j;
  l[11] !== o || l[12] !== d
    ? ((j = (K) => d({ ...o, description: K.target.value })),
      (l[11] = o),
      (l[12] = d),
      (l[13] = j))
    : (j = l[13]);
  let g;
  l[14] !== o.description || l[15] !== j
    ? ((g = f.jsxs("div", {
        children: [
          N,
          f.jsx("input", {
            type: "text",
            value: o.description,
            onChange: j,
            placeholder: "Enter description",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[14] = o.description),
      (l[15] = j),
      (l[16] = g))
    : (g = l[16]);
  const A = u ? "Update" : "Add";
  let R;
  l[17] !== A
    ? ((R = f.jsx("button", {
        type: "submit",
        className:
          "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold",
        children: A,
      })),
      (l[17] = A),
      (l[18] = R))
    : (R = l[18]);
  let q;
  l[19] !== b || l[20] !== p
    ? ((q = f.jsx("button", {
        type: "button",
        onClick: () => {
          (p(!1), b(!1));
        },
        className:
          "bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-semibold",
        children: "Cancel",
      })),
      (l[19] = b),
      (l[20] = p),
      (l[21] = q))
    : (q = l[21]);
  let Z;
  l[22] !== R || l[23] !== q
    ? ((Z = f.jsxs("div", {
        className: "flex justify-between mt-5",
        children: [R, q],
      })),
      (l[22] = R),
      (l[23] = q),
      (l[24] = Z))
    : (Z = l[24]);
  let k;
  l[25] !== m || l[26] !== Z || l[27] !== T || l[28] !== g
    ? ((k = f.jsxs("form", {
        onSubmit: m,
        className: "space-y-3",
        children: [T, g, Z],
      })),
      (l[25] = m),
      (l[26] = Z),
      (l[27] = T),
      (l[28] = g),
      (l[29] = k))
    : (k = l[29]);
  let F;
  return (
    l[30] !== i || l[31] !== y || l[32] !== k || l[33] !== v
      ? ((F = f.jsx(Ma, { show: i, onClose: y, title: v, children: k })),
        (l[30] = i),
        (l[31] = y),
        (l[32] = k),
        (l[33] = v),
        (l[34] = F))
      : (F = l[34]),
    F
  );
}
function f3({ searchValue: n }) {
  const [l, i] = D.useState(!1),
    [u, o] = D.useState(!1),
    [d, m] = D.useState({ name: "", description: "" }),
    { data: p = [], isLoading: b } = s3(),
    y = i3(),
    v = r3(),
    S = u3(),
    E = async (g) => {
      g.preventDefault();
      try {
        (u && d.id
          ? await v.mutateAsync({ id: d.id, data: d })
          : await y.mutateAsync(d),
          m({ name: "", description: "" }),
          i(!1),
          o(!1));
      } catch (A) {
        (console.error("Failed to save category:", A),
          alert("Failed to save category. Please try again."));
      }
    },
    T = (g) => {
      (m({ id: g.id, name: g.name || "", description: g.description || "" }),
        o(!0),
        i(!0));
    },
    N = async (g) => {
      if (window.confirm("Are you sure you want to delete this category?"))
        try {
          await S.mutateAsync(g);
        } catch {
          alert("Failed to delete category. Please try again.");
        }
    },
    j = n
      ? p.filter(
          (g) =>
            g.name?.toLowerCase().includes(n.toLowerCase()) ||
            g.description?.toLowerCase().includes(n.toLowerCase()),
        )
      : p;
  return f.jsxs(f.Fragment, {
    children: [
      f.jsx(Tn, {
        activeTab: "categories",
        children: f.jsxs("section", {
          className:
            "flex-1 bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] overflow-auto",
          children: [
            f.jsxs("div", {
              className: "flex justify-between items-center mb-4",
              children: [
                f.jsx("h2", {
                  className: "text-xl font-semibold",
                  children: "Category Management",
                }),
                f.jsx("button", {
                  onClick: () => {
                    (m({ name: "", description: "" }), o(!1), i(!0));
                  },
                  className:
                    "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium",
                  children: "➕ Add Category",
                }),
              ],
            }),
            f.jsx("div", {
              className: "overflow-x-auto",
              children: f.jsxs("table", {
                className: "w-full border-collapse text-left text-sm",
                children: [
                  f.jsx("thead", {
                    children: f.jsxs("tr", {
                      children: [
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "ID",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Name",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Description",
                        }),
                        f.jsx("th", {
                          className:
                            "p-3 border-b border-gray-300 font-semibold",
                          children: "Action",
                        }),
                      ],
                    }),
                  }),
                  f.jsx("tbody", {
                    children: b
                      ? f.jsx("tr", {
                          children: f.jsx("td", {
                            colSpan: "4",
                            className: "p-3 text-center text-gray-500",
                            children: "Loading...",
                          }),
                        })
                      : j.length === 0
                        ? f.jsx("tr", {
                            children: f.jsx("td", {
                              colSpan: "4",
                              className: "p-3 text-center text-gray-500",
                              children: "No categories found",
                            }),
                          })
                        : j.map((g) =>
                            f.jsxs(
                              "tr",
                              {
                                className: "border-b border-gray-200",
                                children: [
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.id,
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.name,
                                  }),
                                  f.jsx("td", {
                                    className: "p-3",
                                    children: g.description,
                                  }),
                                  f.jsxs("td", {
                                    className: "p-3",
                                    children: [
                                      f.jsx("button", {
                                        onClick: () => T(g),
                                        className:
                                          "mr-2 text-lg hover:scale-125 transition-transform",
                                        title: "Edit",
                                        children: "✏️",
                                      }),
                                      f.jsx("button", {
                                        onClick: () => N(g.id),
                                        className:
                                          "mr-2 text-lg hover:scale-125 transition-transform",
                                        title: "Delete",
                                        children: "🗑️",
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              g.id,
                            ),
                          ),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      f.jsx(c3, {
        showPopup: l,
        editMode: u,
        formData: d,
        setFormData: m,
        handleAddCategory: E,
        setShowPopup: i,
        setEditMode: o,
      }),
    ],
  });
}
const Ac = "/Reports",
  d3 = async () => await Rl(Ac),
  h3 = async (n) => await Oa(Ac, n),
  m3 = async (n) => await Da(`${Ac}/${n}`),
  _a = {
    all: ["reports"],
    lists: () => [..._a.all, "list"],
    list: (n) => [..._a.lists(), { filters: n }],
    details: () => [..._a.all, "detail"],
    detail: (n) => [..._a.details(), n],
  },
  p3 = () => {
    const n = fe.c(1);
    let l;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { queryKey: _a.lists(), queryFn: d3, staleTime: 3e5 }),
          (n[0] = l))
        : (l = n[0]),
      Al(l)
    );
  },
  y3 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: h3,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: _a.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  },
  b3 = () => {
    const n = fe.c(2),
      l = Ke();
    let i;
    return (
      n[0] !== l
        ? ((i = {
            mutationFn: m3,
            onSuccess: () => {
              l.invalidateQueries({ queryKey: _a.lists() });
            },
          }),
          (n[0] = l),
          (n[1] = i))
        : (i = n[1]),
      Pe(i)
    );
  };
function g3(n) {
  const l = fe.c(28),
    {
      showPopup: i,
      formData: u,
      setFormData: o,
      handleAddReport: d,
      setShowPopup: m,
    } = n;
  let p;
  l[0] !== m ? ((p = () => m(!1)), (l[0] = m), (l[1] = p)) : (p = l[1]);
  let b;
  l[2] === Symbol.for("react.memo_cache_sentinel")
    ? ((b = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Report Name",
      })),
      (l[2] = b))
    : (b = l[2]);
  let y;
  l[3] !== u || l[4] !== o
    ? ((y = (R) => o({ ...u, report_name: R.target.value })),
      (l[3] = u),
      (l[4] = o),
      (l[5] = y))
    : (y = l[5]);
  let v;
  l[6] !== u.report_name || l[7] !== y
    ? ((v = f.jsxs("div", {
        children: [
          b,
          f.jsx("input", {
            type: "text",
            value: u.report_name,
            onChange: y,
            placeholder: "Enter report name",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[6] = u.report_name),
      (l[7] = y),
      (l[8] = v))
    : (v = l[8]);
  let S;
  l[9] === Symbol.for("react.memo_cache_sentinel")
    ? ((S = f.jsx("label", {
        className: "text-sm font-medium block",
        children: "Report Type",
      })),
      (l[9] = S))
    : (S = l[9]);
  let E;
  l[10] !== u || l[11] !== o
    ? ((E = (R) => o({ ...u, report_type: R.target.value })),
      (l[10] = u),
      (l[11] = o),
      (l[12] = E))
    : (E = l[12]);
  let T;
  l[13] !== u.report_type || l[14] !== E
    ? ((T = f.jsxs("div", {
        children: [
          S,
          f.jsx("input", {
            type: "text",
            value: u.report_type,
            onChange: E,
            placeholder: "Enter report type",
            required: !0,
            className:
              "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm",
          }),
        ],
      })),
      (l[13] = u.report_type),
      (l[14] = E),
      (l[15] = T))
    : (T = l[15]);
  let N;
  l[16] === Symbol.for("react.memo_cache_sentinel")
    ? ((N = f.jsx("button", {
        type: "submit",
        className:
          "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold",
        children: "Generate",
      })),
      (l[16] = N))
    : (N = l[16]);
  let j;
  l[17] !== m
    ? ((j = f.jsxs("div", {
        className: "flex justify-between mt-5",
        children: [
          N,
          f.jsx("button", {
            type: "button",
            onClick: () => {
              m(!1);
            },
            className:
              "bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-semibold",
            children: "Cancel",
          }),
        ],
      })),
      (l[17] = m),
      (l[18] = j))
    : (j = l[18]);
  let g;
  l[19] !== d || l[20] !== v || l[21] !== T || l[22] !== j
    ? ((g = f.jsxs("form", {
        onSubmit: d,
        className: "space-y-3",
        children: [v, T, j],
      })),
      (l[19] = d),
      (l[20] = v),
      (l[21] = T),
      (l[22] = j),
      (l[23] = g))
    : (g = l[23]);
  let A;
  return (
    l[24] !== i || l[25] !== p || l[26] !== g
      ? ((A = f.jsx(Ma, {
          show: i,
          onClose: p,
          title: "Generate New Report",
          children: g,
        })),
        (l[24] = i),
        (l[25] = p),
        (l[26] = g),
        (l[27] = A))
      : (A = l[27]),
    A
  );
}
function v3(n) {
  const l = fe.c(26),
    { searchValue: i } = n,
    [u, o] = D.useState(!1);
  let d;
  l[0] === Symbol.for("react.memo_cache_sentinel")
    ? ((d = { report_name: "", report_type: "" }), (l[0] = d))
    : (d = l[0]);
  const [m, p] = D.useState(d),
    { data: b, isLoading: y } = p3();
  let v;
  l[1] !== b
    ? ((v = b === void 0 ? [] : b), (l[1] = b), (l[2] = v))
    : (v = l[2]);
  const S = v,
    E = y3(),
    T = b3();
  let N;
  l[3] !== E || l[4] !== m
    ? ((N = async (ee) => {
        ee.preventDefault();
        try {
          (await E.mutateAsync(m),
            p({ report_name: "", report_type: "" }),
            o(!1));
        } catch (le) {
          (console.error("Failed to create report:", le),
            alert("Failed to create report. Please try again."));
        }
      }),
      (l[3] = E),
      (l[4] = m),
      (l[5] = N))
    : (N = l[5]);
  const j = N;
  let g;
  l[6] !== T
    ? ((g = async (ee) => {
        if (window.confirm("Are you sure you want to delete this report?"))
          try {
            await T.mutateAsync(ee);
          } catch {
            alert("Failed to delete report. Please try again.");
          }
      }),
      (l[6] = T),
      (l[7] = g))
    : (g = l[7]);
  const A = g;
  let R;
  l[8] !== S || l[9] !== i
    ? ((R = i
        ? S.filter((ee) =>
            ee.report_name?.toLowerCase().includes(i.toLowerCase()),
          )
        : S),
      (l[8] = S),
      (l[9] = i),
      (l[10] = R))
    : (R = l[10]);
  const q = R;
  let Z;
  l[11] === Symbol.for("react.memo_cache_sentinel")
    ? ((Z = f.jsxs("div", {
        className: "flex justify-between items-center mb-4",
        children: [
          f.jsx("h2", {
            className: "text-xl font-semibold",
            children: "Report Management",
          }),
          f.jsx("button", {
            onClick: () => {
              (p({ report_name: "", report_type: "" }), o(!0));
            },
            className:
              "bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium",
            children: "➕ Generate Report",
          }),
        ],
      })),
      (l[11] = Z))
    : (Z = l[11]);
  let k;
  l[12] === Symbol.for("react.memo_cache_sentinel")
    ? ((k = f.jsx("thead", {
        children: f.jsxs("tr", {
          children: [
            f.jsx("th", {
              className: "p-3 border-b border-gray-300 font-semibold",
              children: "Report Name",
            }),
            f.jsx("th", {
              className: "p-3 border-b border-gray-300 font-semibold",
              children: "Report Type",
            }),
            f.jsx("th", {
              className: "p-3 border-b border--gray-300 font-semibold",
              children: "Generated At",
            }),
            f.jsx("th", {
              className: "p-3 border-b border-gray-300 font-semibold",
              children: "Generated By",
            }),
            f.jsx("th", {
              className: "p-3 border-b border-gray-300 font-semibold",
              children: "File Path",
            }),
            f.jsx("th", {
              className: "p-3 border-b border-gray-300 font-semibold",
              children: "Action",
            }),
          ],
        }),
      })),
      (l[12] = k))
    : (k = l[12]);
  let F;
  l[13] !== q || l[14] !== A || l[15] !== y
    ? ((F = y
        ? f.jsx("tr", {
            children: f.jsx("td", {
              colSpan: "6",
              className: "p-3 text-center text-gray-500",
              children: "Loading...",
            }),
          })
        : q.length === 0
          ? f.jsx("tr", {
              children: f.jsx("td", {
                colSpan: "6",
                className: "p-3 text-center text-gray-500",
                children: "No reports found",
              }),
            })
          : q.map((ee) =>
              f.jsxs(
                "tr",
                {
                  className: "border-b border-gray-200",
                  children: [
                    f.jsx("td", { className: "p-3", children: ee.report_name }),
                    f.jsx("td", { className: "p-3", children: ee.report_type }),
                    f.jsx("td", {
                      className: "p-3",
                      children: ee.generated_at,
                    }),
                    f.jsx("td", {
                      className: "p-3",
                      children: ee.generated_by,
                    }),
                    f.jsx("td", {
                      className: "p-3",
                      children: f.jsx("a", {
                        href: ee.file_path,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "text-blue-500 hover:underline",
                        children: "Download",
                      }),
                    }),
                    f.jsx("td", {
                      className: "p-3",
                      children: f.jsx("button", {
                        onClick: () => A(ee.id),
                        className:
                          "mr-2 text-lg hover:scale-125 transition-transform",
                        title: "Delete",
                        children: "🗑️",
                      }),
                    }),
                  ],
                },
                ee.id,
              ),
            )),
      (l[13] = q),
      (l[14] = A),
      (l[15] = y),
      (l[16] = F))
    : (F = l[16]);
  let K;
  l[17] !== F
    ? ((K = f.jsx(Tn, {
        activeTab: "reports",
        children: f.jsxs("section", {
          className:
            "flex-1 bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] overflow-auto",
          children: [
            Z,
            f.jsx("div", {
              className: "overflow-x-auto",
              children: f.jsxs("table", {
                className: "w-full border-collapse text-left text-sm",
                children: [k, f.jsx("tbody", { children: F })],
              }),
            }),
          ],
        }),
      })),
      (l[17] = F),
      (l[18] = K))
    : (K = l[18]);
  let V;
  l[19] !== m || l[20] !== j || l[21] !== u
    ? ((V = f.jsx(g3, {
        showPopup: u,
        formData: m,
        setFormData: p,
        handleAddReport: j,
        setShowPopup: o,
      })),
      (l[19] = m),
      (l[20] = j),
      (l[21] = u),
      (l[22] = V))
    : (V = l[22]);
  let P;
  return (
    l[23] !== K || l[24] !== V
      ? ((P = f.jsxs(f.Fragment, { children: [K, V] })),
        (l[23] = K),
        (l[24] = V),
        (l[25] = P))
      : (P = l[25]),
    P
  );
}
function x3() {
  const n = fe.c(14);
  let l;
  n[0] === Symbol.for("react.memo_cache_sentinel")
    ? ((l = f.jsx(ct, {
        path: "/",
        element: f.jsx(O1, { to: "/login", replace: !0 }),
      })),
      (n[0] = l))
    : (l = n[0]);
  let i;
  n[1] === Symbol.for("react.memo_cache_sentinel")
    ? ((i = f.jsx(ct, { path: "/login", element: f.jsx(Vx, {}) })), (n[1] = i))
    : (i = n[1]);
  let u;
  n[2] === Symbol.for("react.memo_cache_sentinel")
    ? ((u = f.jsx(ct, { path: "/signup", element: f.jsx(Zx, {}) })), (n[2] = u))
    : (u = n[2]);
  let o;
  n[3] === Symbol.for("react.memo_cache_sentinel")
    ? ((o = f.jsx(ct, { path: "/forgot-password", element: f.jsx(Fx, {}) })),
      (n[3] = o))
    : (o = n[3]);
  let d;
  n[4] === Symbol.for("react.memo_cache_sentinel")
    ? ((d = f.jsx(ct, { path: "/otp", element: f.jsx(Jx, {}) })), (n[4] = d))
    : (d = n[4]);
  let m;
  n[5] === Symbol.for("react.memo_cache_sentinel")
    ? ((m = f.jsx(ct, { path: "/reset-password", element: f.jsx($x, {}) })),
      (n[5] = m))
    : (m = n[5]);
  let p;
  n[6] === Symbol.for("react.memo_cache_sentinel")
    ? ((p = f.jsx(ct, { path: "/dashboard", element: f.jsx(O2, {}) })),
      (n[6] = p))
    : (p = n[6]);
  let b;
  n[7] === Symbol.for("react.memo_cache_sentinel")
    ? ((b = f.jsx(ct, { path: "/overdue", element: f.jsx(wy, {}) })),
      (n[7] = b))
    : (b = n[7]);
  let y;
  n[8] === Symbol.for("react.memo_cache_sentinel")
    ? ((y = f.jsx(ct, { path: "/user-management", element: f.jsx(z2, {}) })),
      (n[8] = y))
    : (y = n[8]);
  let v;
  n[9] === Symbol.for("react.memo_cache_sentinel")
    ? ((v = f.jsx(ct, { path: "/test-api", element: f.jsx(B2, {}) })),
      (n[9] = v))
    : (v = n[9]);
  let S;
  n[10] === Symbol.for("react.memo_cache_sentinel")
    ? ((S = f.jsx(ct, { path: "/catalog", element: f.jsx(W2, {}) })),
      (n[10] = S))
    : (S = n[10]);
  let E;
  n[11] === Symbol.for("react.memo_cache_sentinel")
    ? ((E = f.jsx(ct, { path: "/books", element: f.jsx(e3, {}) })), (n[11] = E))
    : (E = n[11]);
  let T;
  n[12] === Symbol.for("react.memo_cache_sentinel")
    ? ((T = f.jsx(ct, { path: "/categories", element: f.jsx(f3, {}) })),
      (n[12] = T))
    : (T = n[12]);
  let N;
  return (
    n[13] === Symbol.for("react.memo_cache_sentinel")
      ? ((N = f.jsx(lv, {
          children: f.jsxs(M1, {
            children: [
              l,
              i,
              u,
              o,
              d,
              m,
              p,
              b,
              y,
              v,
              S,
              E,
              T,
              f.jsx(ct, { path: "/reports", element: f.jsx(v3, {}) }),
            ],
          }),
        })),
        (n[13] = N))
      : (N = n[13]),
    N
  );
}
const S3 = new Tg({
  defaultOptions: {
    queries: { refetchOnWindowFocus: !1, retry: 1, staleTime: 300 * 1e3 },
  },
});
sg.createRoot(document.getElementById("root")).render(
  f.jsx(D.StrictMode, {
    children: f.jsx(Ag, { client: S3, className: "", children: f.jsx(x3, {}) }),
  }),
);
