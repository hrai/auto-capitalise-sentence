(() => {
  var e = {
      150: function (e, r) {
        var s, n;
        'undefined' != typeof globalThis
          ? globalThis
          : 'undefined' != typeof self && self,
          (s = function (e) {
            'use strict';
            if (
              'undefined' == typeof browser ||
              Object.getPrototypeOf(browser) !== Object.prototype
            ) {
              const r =
                  'The message port closed before a response was received.',
                s =
                  'Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)',
                n = (e) => {
                  const n = {
                    alarms: {
                      clear: { minArgs: 0, maxArgs: 1 },
                      clearAll: { minArgs: 0, maxArgs: 0 },
                      get: { minArgs: 0, maxArgs: 1 },
                      getAll: { minArgs: 0, maxArgs: 0 },
                    },
                    bookmarks: {
                      create: { minArgs: 1, maxArgs: 1 },
                      get: { minArgs: 1, maxArgs: 1 },
                      getChildren: { minArgs: 1, maxArgs: 1 },
                      getRecent: { minArgs: 1, maxArgs: 1 },
                      getSubTree: { minArgs: 1, maxArgs: 1 },
                      getTree: { minArgs: 0, maxArgs: 0 },
                      move: { minArgs: 2, maxArgs: 2 },
                      remove: { minArgs: 1, maxArgs: 1 },
                      removeTree: { minArgs: 1, maxArgs: 1 },
                      search: { minArgs: 1, maxArgs: 1 },
                      update: { minArgs: 2, maxArgs: 2 },
                    },
                    browserAction: {
                      disable: {
                        minArgs: 0,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                      enable: {
                        minArgs: 0,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                      getBadgeBackgroundColor: { minArgs: 1, maxArgs: 1 },
                      getBadgeText: { minArgs: 1, maxArgs: 1 },
                      getPopup: { minArgs: 1, maxArgs: 1 },
                      getTitle: { minArgs: 1, maxArgs: 1 },
                      openPopup: { minArgs: 0, maxArgs: 0 },
                      setBadgeBackgroundColor: {
                        minArgs: 1,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                      setBadgeText: {
                        minArgs: 1,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                      setIcon: { minArgs: 1, maxArgs: 1 },
                      setPopup: {
                        minArgs: 1,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                      setTitle: {
                        minArgs: 1,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                    },
                    browsingData: {
                      remove: { minArgs: 2, maxArgs: 2 },
                      removeCache: { minArgs: 1, maxArgs: 1 },
                      removeCookies: { minArgs: 1, maxArgs: 1 },
                      removeDownloads: { minArgs: 1, maxArgs: 1 },
                      removeFormData: { minArgs: 1, maxArgs: 1 },
                      removeHistory: { minArgs: 1, maxArgs: 1 },
                      removeLocalStorage: { minArgs: 1, maxArgs: 1 },
                      removePasswords: { minArgs: 1, maxArgs: 1 },
                      removePluginData: { minArgs: 1, maxArgs: 1 },
                      settings: { minArgs: 0, maxArgs: 0 },
                    },
                    commands: { getAll: { minArgs: 0, maxArgs: 0 } },
                    contextMenus: {
                      remove: { minArgs: 1, maxArgs: 1 },
                      removeAll: { minArgs: 0, maxArgs: 0 },
                      update: { minArgs: 2, maxArgs: 2 },
                    },
                    cookies: {
                      get: { minArgs: 1, maxArgs: 1 },
                      getAll: { minArgs: 1, maxArgs: 1 },
                      getAllCookieStores: { minArgs: 0, maxArgs: 0 },
                      remove: { minArgs: 1, maxArgs: 1 },
                      set: { minArgs: 1, maxArgs: 1 },
                    },
                    devtools: {
                      inspectedWindow: {
                        eval: { minArgs: 1, maxArgs: 2, singleCallbackArg: !1 },
                      },
                      panels: {
                        create: {
                          minArgs: 3,
                          maxArgs: 3,
                          singleCallbackArg: !0,
                        },
                        elements: {
                          createSidebarPane: { minArgs: 1, maxArgs: 1 },
                        },
                      },
                    },
                    downloads: {
                      cancel: { minArgs: 1, maxArgs: 1 },
                      download: { minArgs: 1, maxArgs: 1 },
                      erase: { minArgs: 1, maxArgs: 1 },
                      getFileIcon: { minArgs: 1, maxArgs: 2 },
                      open: {
                        minArgs: 1,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                      pause: { minArgs: 1, maxArgs: 1 },
                      removeFile: { minArgs: 1, maxArgs: 1 },
                      resume: { minArgs: 1, maxArgs: 1 },
                      search: { minArgs: 1, maxArgs: 1 },
                      show: {
                        minArgs: 1,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                    },
                    extension: {
                      isAllowedFileSchemeAccess: { minArgs: 0, maxArgs: 0 },
                      isAllowedIncognitoAccess: { minArgs: 0, maxArgs: 0 },
                    },
                    history: {
                      addUrl: { minArgs: 1, maxArgs: 1 },
                      deleteAll: { minArgs: 0, maxArgs: 0 },
                      deleteRange: { minArgs: 1, maxArgs: 1 },
                      deleteUrl: { minArgs: 1, maxArgs: 1 },
                      getVisits: { minArgs: 1, maxArgs: 1 },
                      search: { minArgs: 1, maxArgs: 1 },
                    },
                    i18n: {
                      detectLanguage: { minArgs: 1, maxArgs: 1 },
                      getAcceptLanguages: { minArgs: 0, maxArgs: 0 },
                    },
                    identity: { launchWebAuthFlow: { minArgs: 1, maxArgs: 1 } },
                    idle: { queryState: { minArgs: 1, maxArgs: 1 } },
                    management: {
                      get: { minArgs: 1, maxArgs: 1 },
                      getAll: { minArgs: 0, maxArgs: 0 },
                      getSelf: { minArgs: 0, maxArgs: 0 },
                      setEnabled: { minArgs: 2, maxArgs: 2 },
                      uninstallSelf: { minArgs: 0, maxArgs: 1 },
                    },
                    notifications: {
                      clear: { minArgs: 1, maxArgs: 1 },
                      create: { minArgs: 1, maxArgs: 2 },
                      getAll: { minArgs: 0, maxArgs: 0 },
                      getPermissionLevel: { minArgs: 0, maxArgs: 0 },
                      update: { minArgs: 2, maxArgs: 2 },
                    },
                    pageAction: {
                      getPopup: { minArgs: 1, maxArgs: 1 },
                      getTitle: { minArgs: 1, maxArgs: 1 },
                      hide: {
                        minArgs: 1,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                      setIcon: { minArgs: 1, maxArgs: 1 },
                      setPopup: {
                        minArgs: 1,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                      setTitle: {
                        minArgs: 1,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                      show: {
                        minArgs: 1,
                        maxArgs: 1,
                        fallbackToNoCallback: !0,
                      },
                    },
                    permissions: {
                      contains: { minArgs: 1, maxArgs: 1 },
                      getAll: { minArgs: 0, maxArgs: 0 },
                      remove: { minArgs: 1, maxArgs: 1 },
                      request: { minArgs: 1, maxArgs: 1 },
                    },
                    runtime: {
                      getBackgroundPage: { minArgs: 0, maxArgs: 0 },
                      getPlatformInfo: { minArgs: 0, maxArgs: 0 },
                      openOptionsPage: { minArgs: 0, maxArgs: 0 },
                      requestUpdateCheck: { minArgs: 0, maxArgs: 0 },
                      sendMessage: { minArgs: 1, maxArgs: 3 },
                      sendNativeMessage: { minArgs: 2, maxArgs: 2 },
                      setUninstallURL: { minArgs: 1, maxArgs: 1 },
                    },
                    sessions: {
                      getDevices: { minArgs: 0, maxArgs: 1 },
                      getRecentlyClosed: { minArgs: 0, maxArgs: 1 },
                      restore: { minArgs: 0, maxArgs: 1 },
                    },
                    storage: {
                      local: {
                        clear: { minArgs: 0, maxArgs: 0 },
                        get: { minArgs: 0, maxArgs: 1 },
                        getBytesInUse: { minArgs: 0, maxArgs: 1 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        set: { minArgs: 1, maxArgs: 1 },
                      },
                      managed: {
                        get: { minArgs: 0, maxArgs: 1 },
                        getBytesInUse: { minArgs: 0, maxArgs: 1 },
                      },
                      sync: {
                        clear: { minArgs: 0, maxArgs: 0 },
                        get: { minArgs: 0, maxArgs: 1 },
                        getBytesInUse: { minArgs: 0, maxArgs: 1 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        set: { minArgs: 1, maxArgs: 1 },
                      },
                    },
                    tabs: {
                      captureVisibleTab: { minArgs: 0, maxArgs: 2 },
                      create: { minArgs: 1, maxArgs: 1 },
                      detectLanguage: { minArgs: 0, maxArgs: 1 },
                      discard: { minArgs: 0, maxArgs: 1 },
                      duplicate: { minArgs: 1, maxArgs: 1 },
                      executeScript: { minArgs: 1, maxArgs: 2 },
                      get: { minArgs: 1, maxArgs: 1 },
                      getCurrent: { minArgs: 0, maxArgs: 0 },
                      getZoom: { minArgs: 0, maxArgs: 1 },
                      getZoomSettings: { minArgs: 0, maxArgs: 1 },
                      goBack: { minArgs: 0, maxArgs: 1 },
                      goForward: { minArgs: 0, maxArgs: 1 },
                      highlight: { minArgs: 1, maxArgs: 1 },
                      insertCSS: { minArgs: 1, maxArgs: 2 },
                      move: { minArgs: 2, maxArgs: 2 },
                      query: { minArgs: 1, maxArgs: 1 },
                      reload: { minArgs: 0, maxArgs: 2 },
                      remove: { minArgs: 1, maxArgs: 1 },
                      removeCSS: { minArgs: 1, maxArgs: 2 },
                      sendMessage: { minArgs: 2, maxArgs: 3 },
                      setZoom: { minArgs: 1, maxArgs: 2 },
                      setZoomSettings: { minArgs: 1, maxArgs: 2 },
                      update: { minArgs: 1, maxArgs: 2 },
                    },
                    topSites: { get: { minArgs: 0, maxArgs: 0 } },
                    webNavigation: {
                      getAllFrames: { minArgs: 1, maxArgs: 1 },
                      getFrame: { minArgs: 1, maxArgs: 1 },
                    },
                    webRequest: {
                      handlerBehaviorChanged: { minArgs: 0, maxArgs: 0 },
                    },
                    windows: {
                      create: { minArgs: 0, maxArgs: 1 },
                      get: { minArgs: 1, maxArgs: 2 },
                      getAll: { minArgs: 0, maxArgs: 1 },
                      getCurrent: { minArgs: 0, maxArgs: 1 },
                      getLastFocused: { minArgs: 0, maxArgs: 1 },
                      remove: { minArgs: 1, maxArgs: 1 },
                      update: { minArgs: 2, maxArgs: 2 },
                    },
                  };
                  if (0 === Object.keys(n).length)
                    throw new Error(
                      'api-metadata.json has not been included in browser-polyfill'
                    );
                  class t extends WeakMap {
                    constructor(e, r) {
                      super(r), (this.createItem = e);
                    }
                    get(e) {
                      return (
                        this.has(e) || this.set(e, this.createItem(e)),
                        super.get(e)
                      );
                    }
                  }
                  const a =
                      (r, s) =>
                      (...n) => {
                        e.runtime.lastError
                          ? r.reject(new Error(e.runtime.lastError.message))
                          : s.singleCallbackArg ||
                            (n.length <= 1 && !1 !== s.singleCallbackArg)
                          ? r.resolve(n[0])
                          : r.resolve(n);
                      },
                    o = (e) => (1 == e ? 'argument' : 'arguments'),
                    g = (e, r, s) =>
                      new Proxy(r, { apply: (r, n, t) => s.call(n, e, ...t) });
                  let i = Function.call.bind(Object.prototype.hasOwnProperty);
                  const m = (e, r = {}, s = {}) => {
                      let n = Object.create(null),
                        t = {
                          has: (r, s) => s in e || s in n,
                          get(t, l, A) {
                            if (l in n) return n[l];
                            if (!(l in e)) return;
                            let c = e[l];
                            if ('function' == typeof c)
                              if ('function' == typeof r[l])
                                c = g(e, e[l], r[l]);
                              else if (i(s, l)) {
                                let r = ((e, r) =>
                                  function (s, ...n) {
                                    if (n.length < r.minArgs)
                                      throw new Error(
                                        `Expected at least ${r.minArgs} ${o(
                                          r.minArgs
                                        )} for ${e}(), got ${n.length}`
                                      );
                                    if (n.length > r.maxArgs)
                                      throw new Error(
                                        `Expected at most ${r.maxArgs} ${o(
                                          r.maxArgs
                                        )} for ${e}(), got ${n.length}`
                                      );
                                    return new Promise((t, o) => {
                                      if (r.fallbackToNoCallback)
                                        try {
                                          s[e](
                                            ...n,
                                            a({ resolve: t, reject: o }, r)
                                          );
                                        } catch (a) {
                                          console.warn(
                                            `${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,
                                            a
                                          ),
                                            s[e](...n),
                                            (r.fallbackToNoCallback = !1),
                                            (r.noCallback = !0),
                                            t();
                                        }
                                      else
                                        r.noCallback
                                          ? (s[e](...n), t())
                                          : s[e](
                                              ...n,
                                              a({ resolve: t, reject: o }, r)
                                            );
                                    });
                                  })(l, s[l]);
                                c = g(e, e[l], r);
                              } else c = c.bind(e);
                            else if (
                              'object' == typeof c &&
                              null !== c &&
                              (i(r, l) || i(s, l))
                            )
                              c = m(c, r[l], s[l]);
                            else {
                              if (!i(s, '*'))
                                return (
                                  Object.defineProperty(n, l, {
                                    configurable: !0,
                                    enumerable: !0,
                                    get: () => e[l],
                                    set(r) {
                                      e[l] = r;
                                    },
                                  }),
                                  c
                                );
                              c = m(c, r[l], s['*']);
                            }
                            return (n[l] = c), c;
                          },
                          set: (r, s, t, a) => (
                            s in n ? (n[s] = t) : (e[s] = t), !0
                          ),
                          defineProperty: (e, r, s) =>
                            Reflect.defineProperty(n, r, s),
                          deleteProperty: (e, r) =>
                            Reflect.deleteProperty(n, r),
                        },
                        l = Object.create(e);
                      return new Proxy(l, t);
                    },
                    l = (e) => ({
                      addListener(r, s, ...n) {
                        r.addListener(e.get(s), ...n);
                      },
                      hasListener: (r, s) => r.hasListener(e.get(s)),
                      removeListener(r, s) {
                        r.removeListener(e.get(s));
                      },
                    }),
                    A = new t((e) =>
                      'function' != typeof e
                        ? e
                        : function (r) {
                            const s = m(
                              r,
                              {},
                              { getContent: { minArgs: 0, maxArgs: 0 } }
                            );
                            e(s);
                          }
                    );
                  let c = !1;
                  const u = new t((e) =>
                      'function' != typeof e
                        ? e
                        : function (r, n, t) {
                            let a,
                              o,
                              g = !1,
                              i = new Promise((e) => {
                                a = function (r) {
                                  c ||
                                    (console.warn(s, new Error().stack),
                                    (c = !0)),
                                    (g = !0),
                                    e(r);
                                };
                              });
                            try {
                              o = e(r, n, a);
                            } catch (e) {
                              o = Promise.reject(e);
                            }
                            const m =
                              !0 !== o &&
                              (l = o) &&
                              'object' == typeof l &&
                              'function' == typeof l.then;
                            var l;
                            if (!0 !== o && !m && !g) return !1;
                            return (
                              (m ? o : i)
                                .then(
                                  (e) => {
                                    t(e);
                                  },
                                  (e) => {
                                    let r;
                                    (r =
                                      e &&
                                      (e instanceof Error ||
                                        'string' == typeof e.message)
                                        ? e.message
                                        : 'An unexpected error occurred'),
                                      t({
                                        __mozWebExtensionPolyfillReject__: !0,
                                        message: r,
                                      });
                                  }
                                )
                                .catch((e) => {
                                  console.error(
                                    'Failed to send onMessage rejected reply',
                                    e
                                  );
                                }),
                              !0
                            );
                          }
                    ),
                    x = ({ reject: s, resolve: n }, t) => {
                      e.runtime.lastError
                        ? e.runtime.lastError.message === r
                          ? n()
                          : s(new Error(e.runtime.lastError.message))
                        : t && t.__mozWebExtensionPolyfillReject__
                        ? s(new Error(t.message))
                        : n(t);
                    },
                    d = (e, r, s, ...n) => {
                      if (n.length < r.minArgs)
                        throw new Error(
                          `Expected at least ${r.minArgs} ${o(
                            r.minArgs
                          )} for ${e}(), got ${n.length}`
                        );
                      if (n.length > r.maxArgs)
                        throw new Error(
                          `Expected at most ${r.maxArgs} ${o(
                            r.maxArgs
                          )} for ${e}(), got ${n.length}`
                        );
                      return new Promise((e, r) => {
                        const t = x.bind(null, { resolve: e, reject: r });
                        n.push(t), s.sendMessage(...n);
                      });
                    },
                    f = {
                      devtools: { network: { onRequestFinished: l(A) } },
                      runtime: {
                        onMessage: l(u),
                        onMessageExternal: l(u),
                        sendMessage: d.bind(null, 'sendMessage', {
                          minArgs: 1,
                          maxArgs: 3,
                        }),
                      },
                      tabs: {
                        sendMessage: d.bind(null, 'sendMessage', {
                          minArgs: 2,
                          maxArgs: 3,
                        }),
                      },
                    },
                    p = {
                      clear: { minArgs: 1, maxArgs: 1 },
                      get: { minArgs: 1, maxArgs: 1 },
                      set: { minArgs: 1, maxArgs: 1 },
                    };
                  return (
                    (n.privacy = {
                      network: { '*': p },
                      services: { '*': p },
                      websites: { '*': p },
                    }),
                    m(e, f, n)
                  );
                };
              if (
                'object' != typeof chrome ||
                !chrome ||
                !chrome.runtime ||
                !chrome.runtime.id
              )
                throw new Error(
                  'This script should only be loaded in a browser extension.'
                );
              e.exports = n(chrome);
            } else e.exports = browser;
          }),
          void 0 === (n = s.apply(r, [e])) || (e.exports = n);
      },
      565: (e, r, s) => {
        'use strict';
        var n = s(555),
          t = s(150),
          a = s.n(t),
          o = s(448);
        const g = 'breaking loop';
        let i = [];
        function m() {
          var e, r, s, t;
          $(':text,textarea').on(`input.${o.Sp}`, function (e) {
            l(e.target);
          }),
            (e = document.querySelector('body')),
            (r = ['p', 'span']),
            (s = ["input[type='text']", 'textarea']),
            (t = { subtree: !0, childList: !0, characterData: !0 }),
            new MutationObserver(function (e) {
              let t = [];
              var a, i;
              console.log(e),
                $.each(e, function (a, i) {
                  try {
                    if ('childList' === i.type) {
                      if (['P'].includes(i.target.nodeName))
                        throw (l(i.target), new Error(g));
                      console.log(e);
                      var m = i.addedNodes;
                      m &&
                        m.length > 0 &&
                        (m.forEach((e) => {
                          n.k7(e) &&
                            (l(e.parentNode), (m = m.filter((e) => {})));
                        }),
                        $.each(r, function (e, r) {
                          var s = n.$v(m, r);
                          s?.length &&
                            s.each(function (e, r) {
                              n.RL(r) && l(r);
                            });
                        }),
                        $.each(s, function (e, r) {
                          var s = n.$v(m, r);
                          s?.length &&
                            s.each(function (e, r) {
                              $(r).on(`input.${o.Sp}`, function (e) {
                                l(e.target);
                              });
                            });
                        }));
                    } else
                      'characterData' === i.type && t.push(i.target.parentNode);
                  } catch (e) {
                    e.message !== g && console.log(e);
                  }
                }),
                (a = t),
                (i = []),
                $.each(a, function (e, r) {
                  -1 == $.inArray(r, i) && i.push(r);
                }),
                (t = i),
                t.forEach((e) => l(e));
            }).observe(e, t),
            $('iframe').on('load', (e) => {
              let r = e.target;
              $(r)
                .contents()
                .find(':text,textarea')
                .each((e, r) => {
                  $(r).on(`input.${o.Sp}`, function (e) {
                    l(e.target);
                  });
                });
            });
        }
        function l(e) {
          n.q0(e, n.Wf, n.wq, n.Q, n.Hd);
        }
        a()
          .storage.local.get([
            o.W5,
            o.EI,
            o.Cp,
            o.T9,
            o.oG,
            o.c0,
            o.Nd,
            o.Fr,
            o.cs,
            o.Xn,
          ])
          .then(function (e) {
            if (
              ((i = e.sitesToIgnore),
              (function (e) {
                n.aj(o.EI, e.shouldCapitaliseI),
                  n.aj(o.Cp, e.shouldCapitaliseNames),
                  n.aj(o.T9, e.shouldCapitaliseAbbreviations),
                  n.aj(o.oG, e.shouldCapitaliseLocations);
              })(e),
              (function (e) {
                n.eJ(o.c0, e.constantsKeyVal),
                  n.eJ(o.Nd, e.namesKeyVal),
                  n.eJ(o.Fr, e.abbreviationsKeyVal),
                  n.eJ(o.cs, e.locationsKeyVal),
                  n.zh(e.wordsToExclude);
              })(e),
              console.log(e),
              e && i)
            ) {
              var r = window.location.origin;
              try {
                var s = !0;
                if (
                  ($.each(i, function (e, n) {
                    r.includes(n) && (s = !1);
                  }),
                  s)
                )
                  throw (m(), new Error(g));
              } catch (e) {
                if (e.message !== g) throw e;
              }
            } else m();
          }, n.qQ),
          a().storage.onChanged.addListener(function (e, r) {
            if (
              'local' === r &&
              (n.aN(e, o.EI),
              n.aN(e, o.Cp),
              n.aN(e, o.T9),
              n.aN(e, o.oG),
              null != e.wordsToExclude)
            ) {
              const r = e.wordsToExclude.newValue;
              null != r && n.zh(r);
            }
          });
      },
      448: (e, r, s) => {
        'use strict';
        s.d(r, {
          Sp: () => n,
          W5: () => t,
          Xn: () => a,
          EI: () => o,
          Cp: () => g,
          T9: () => i,
          oG: () => m,
          c0: () => l,
          Nd: () => A,
          Fr: () => c,
          cs: () => u,
        });
        const n = 'auto-capitalise-extension',
          t = 'sitesToIgnore',
          a = 'wordsToExclude',
          o = 'shouldCapitaliseI',
          g = 'shouldCapitaliseNames',
          i = 'shouldCapitaliseAbbreviations',
          m = 'shouldCapitaliseLocations',
          l = 'constantsKeyVal',
          A = 'namesKeyVal',
          c = 'abbreviationsKeyVal',
          u = 'locationsKeyVal';
      },
      555: (e, r, s) => {
        'use strict';
        s.d(r, {
          q0: () => m,
          wq: () => A,
          aj: () => c,
          eJ: () => u,
          Wf: () => x,
          qQ: () => f,
          Q: () => p,
          Hd: () => b,
          k7: () => w,
          $v: () => v,
          RL: () => y,
          zh: () => C,
          aN: () => T,
        });
        var n = s(448);
        let t = [],
          a = { [n.EI]: !1, [n.Cp]: !1, [n.T9]: !1, [n.oG]: !1 },
          o = { [n.c0]: {}, [n.Nd]: {}, [n.Fr]: {}, [n.cs]: {} };
        const g = '&nbsp;',
          i = ['SPAN', 'DIV', 'P'];
        function m(e, r, s, t, g) {
          if (!e) return;
          let i = e.tagName;
          if (
            !(function (e, r) {
              return (
                e.isContentEditable ||
                'INPUT' === r.toUpperCase() ||
                'TEXTAREA' === r.toUpperCase()
              );
            })(e, i)
          )
            return;
          let m = t(e, i);
          if (null == m) return;
          const A = m.trim().slice(-1),
            c = A.match(/[a-z]/i);
          if (1 == m.length && !c) return;
          if (c && A.toUpperCase() === A) return;
          let u = !1;
          if (
            (m.length >= 4 &&
              '<br>' === m.slice(-4) &&
              ((m = m.slice(0, -4)), (u = !0)),
            r(m))
          ) {
            const r = (function (e) {
              const r = e.slice(-1);
              return e.substr(0, e.length - 1) + r.toUpperCase();
            })(m);
            return void g(e, i, r, u);
          }
          if (m.length >= 2 && s(m) && a[n.EI]) {
            const r = (function (e) {
              const r = e.slice(-2);
              return e.substr(0, e.length - 2) + r.toUpperCase();
            })(m);
            return void g(e, i, r, u);
          }
          l(m, e, i, o[n.c0], !0),
            a[n.Cp] && l(m, e, i, o[n.Nd], !1),
            a[n.T9] && l(m, e, i, o[n.Fr], !1),
            a[n.oG] && l(m, e, i, o[n.cs], !1);
        }
        function l(e, r, s, n, a) {
          const [o, g] =
            !0 === a
              ? (function (e, r) {
                  return d(e, r, t, !1);
                })(e, n)
              : (function (e, r) {
                  return d(e, r, t, !0);
                })(e, n);
          if ('' !== o && o !== g) {
            const n = (function (e, r, s) {
              if (e && r && s) {
                const t = [(n = e).slice(0, -1), n.slice(-1)];
                return t[0].replace(new RegExp(r + '$'), s) + t[1];
              }
              var n;
              return e;
            })(e, o, g);
            b(r, s, n, !1);
          }
        }
        function A(e) {
          return /\s+i(\s+|')$/.test(e);
        }
        function c(e, r) {
          null != r && (a[e] = r);
        }
        function u(e, r) {
          null != r && (o[e] = r);
        }
        function x(e) {
          let r = /\s*\n+\s*\w$/.test(e);
          return (
            !!r || ((r = /\w+\s*\W?([.?!])+\s+\w$/.test(e)), r || 1 == e.length)
          );
        }
        function d(e, r, s, n) {
          let t = /(\.?\w+)([^\w-])$/.exec(e);
          const a = ['', ''];
          if (t) {
            const e = t[1];
            if (null != e) {
              if (s.includes(e.toLowerCase())) return a;
              let t = (function (e, r, s) {
                return !0 === e ? s[r.toLowerCase()] : s[r];
              })(n, e, r);
              if (null != t) return [e, t];
            }
          }
          return a;
        }
        function f(e) {
          console.log(e);
        }
        function p(e, r) {
          return 'INPUT' === r.toUpperCase() || 'TEXTAREA' === r.toUpperCase()
            ? e.value
              ? e.value
              : ''
            : e.innerHTML && i.includes(r.toUpperCase())
            ? (s = e.innerHTML) &&
              1 ===
                (function (e) {
                  return (e.match(new RegExp(g, 'g')) || []).length;
                })(s)
              ? h(s, g, ' ')
              : s
            : e.innerHTML
            ? e.innerHTML
            : '';
          var s;
        }
        function h(e, r, s) {
          return e.replace(new RegExp(r + '$'), s);
        }
        function b(e, r, s, n) {
          'INPUT' !== r.toUpperCase() && 'TEXTAREA' !== r.toUpperCase()
            ? (i.includes(r.toUpperCase()) && (s = h(s, ' ', g)),
              n && (s += '<br>'),
              (e.innerHTML = s),
              (function (e) {
                let r, s;
                if (document.createRange) {
                  r = document.createRange();
                  const n = e.childNodes;
                  if (null == n) return;
                  const t = 1 == n.length ? n[0] : n[n.length - 2];
                  if (null == t) return;
                  '#text' === t.nodeName
                    ? (r.setStart(t, t.data.length), r.collapse(!1))
                    : '<br>' === t.outerHTML
                    ? (r.setStart(t, 0), r.collapse(!0))
                    : (r.selectNodeContents(e), r.collapse(!1)),
                    (s = window.getSelection()),
                    s.removeAllRanges(),
                    s.addRange(r);
                } else
                  document.selection &&
                    ((r = document.body.createTextRange()),
                    r.moveToElementText(e),
                    r.collapse(!1),
                    r.select());
              })(e))
            : (e.value = s);
        }
        function w(e) {
          const r = e.data;
          return !(
            '#text' !== e.nodeName ||
            1 !== r.length ||
            r.toUpperCase() == r ||
            !y(e.parentNode)
          );
        }
        function v(e, r) {
          return $(e).find(r).addBack(r);
        }
        function y(e) {
          return (
            (function (e) {
              return e && e.isContentEditable;
            })(e) &&
            !(function (e) {
              const r = $(e).html();
              return (!r || !/\s*<br>/.test(r)) && /<\/?[a-z][\s\S]*>/i.test(r);
            })(e)
          );
        }
        function C(e) {
          e && (t = e);
        }
        function T(e, r) {
          if (null != e[r]) {
            const s = e[r].newValue;
            null != s && c(r, s);
          }
        }
      },
    },
    r = {};
  function s(n) {
    var t = r[n];
    if (void 0 !== t) return t.exports;
    var a = (r[n] = { exports: {} });
    return e[n].call(a.exports, a, a.exports, s), a.exports;
  }
  (s.n = (e) => {
    var r = e && e.__esModule ? () => e.default : () => e;
    return s.d(r, { a: r }), r;
  }),
    (s.d = (e, r) => {
      for (var n in r)
        s.o(r, n) &&
          !s.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: r[n] });
    }),
    (s.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
    s(565),
    s(555);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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REFrUixFQUFvQlEsRUFBRUYsRUFBUSxDQUFFRyxFQUFHSCxJQUM1QkEsR0NMUk4sRUFBb0JRLEVBQUksQ0FBQ2hLLEVBQVNrSyxLQUNqQyxJQUFJLElBQUl2USxLQUFPdVEsRUFDWFYsRUFBb0JXLEVBQUVELEVBQVl2USxLQUFTNlAsRUFBb0JXLEVBQUVuSyxFQUFTckcsSUFDNUVuQixPQUFPa0UsZUFBZXNELEVBQVNyRyxFQUFLLENBQUVpRCxZQUFZLEVBQU1sRCxJQUFLd1EsRUFBV3ZRLE1DSjNFNlAsRUFBb0JXLEVBQUksQ0FBQ0MsRUFBS3ZPLElBQVVyRCxPQUFPRSxVQUFVMEMsZUFBZUQsS0FBS2lQLEVBQUt2TyxHQ0VsRjJOLEVBQW9CLEtBRU1BLEVBQW9CLE0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXRvLWNhcGl0YWxpc2UtZXh0ZW5zaW9uLy4vbm9kZV9tb2R1bGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9kaXN0L2Jyb3dzZXItcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vYXV0by1jYXBpdGFsaXNlLWV4dGVuc2lvbi8uL3NyYy9jb250ZW50LmpzIiwid2VicGFjazovL2F1dG8tY2FwaXRhbGlzZS1leHRlbnNpb24vLi9zcmMvcGx1Z2luLWNvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9hdXRvLWNhcGl0YWxpc2UtZXh0ZW5zaW9uLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2F1dG8tY2FwaXRhbGlzZS1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXV0by1jYXBpdGFsaXNlLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9hdXRvLWNhcGl0YWxpc2UtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hdXRvLWNhcGl0YWxpc2UtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXV0by1jYXBpdGFsaXNlLWV4dGVuc2lvbi93ZWJwYWNrL3N0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIsIFtcIm1vZHVsZVwiXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBmYWN0b3J5KG1vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vZCA9IHtcbiAgICAgIGV4cG9ydHM6IHt9XG4gICAgfTtcbiAgICBmYWN0b3J5KG1vZCk7XG4gICAgZ2xvYmFsLmJyb3dzZXIgPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxUaGlzIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24gKG1vZHVsZSkge1xuICAvKiB3ZWJleHRlbnNpb24tcG9seWZpbGwgLSB2MC44LjAgLSBUdWUgQXByIDIwIDIwMjEgMTE6Mjc6MzggKi9cblxuICAvKiAtKi0gTW9kZTogaW5kZW50LXRhYnMtbW9kZTogbmlsOyBqcy1pbmRlbnQtbGV2ZWw6IDIgLSotICovXG5cbiAgLyogdmltOiBzZXQgc3RzPTIgc3c9MiBldCB0dz04MDogKi9cblxuICAvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gICAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgaWYgKHR5cGVvZiBicm93c2VyID09PSBcInVuZGVmaW5lZFwiIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihicm93c2VyKSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgIGNvbnN0IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSA9IFwiVGhlIG1lc3NhZ2UgcG9ydCBjbG9zZWQgYmVmb3JlIGEgcmVzcG9uc2Ugd2FzIHJlY2VpdmVkLlwiO1xuICAgIGNvbnN0IFNFTkRfUkVTUE9OU0VfREVQUkVDQVRJT05fV0FSTklORyA9IFwiUmV0dXJuaW5nIGEgUHJvbWlzZSBpcyB0aGUgcHJlZmVycmVkIHdheSB0byBzZW5kIGEgcmVwbHkgZnJvbSBhbiBvbk1lc3NhZ2Uvb25NZXNzYWdlRXh0ZXJuYWwgbGlzdGVuZXIsIGFzIHRoZSBzZW5kUmVzcG9uc2Ugd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIHNwZWNzIChTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9Nb3ppbGxhL0FkZC1vbnMvV2ViRXh0ZW5zaW9ucy9BUEkvcnVudGltZS9vbk1lc3NhZ2UpXCI7IC8vIFdyYXBwaW5nIHRoZSBidWxrIG9mIHRoaXMgcG9seWZpbGwgaW4gYSBvbmUtdGltZS11c2UgZnVuY3Rpb24gaXMgYSBtaW5vclxuICAgIC8vIG9wdGltaXphdGlvbiBmb3IgRmlyZWZveC4gU2luY2UgU3BpZGVybW9ua2V5IGRvZXMgbm90IGZ1bGx5IHBhcnNlIHRoZVxuICAgIC8vIGNvbnRlbnRzIG9mIGEgZnVuY3Rpb24gdW50aWwgdGhlIGZpcnN0IHRpbWUgaXQncyBjYWxsZWQsIGFuZCBzaW5jZSBpdCB3aWxsXG4gICAgLy8gbmV2ZXIgYWN0dWFsbHkgbmVlZCB0byBiZSBjYWxsZWQsIHRoaXMgYWxsb3dzIHRoZSBwb2x5ZmlsbCB0byBiZSBpbmNsdWRlZFxuICAgIC8vIGluIEZpcmVmb3ggbmVhcmx5IGZvciBmcmVlLlxuXG4gICAgY29uc3Qgd3JhcEFQSXMgPSBleHRlbnNpb25BUElzID0+IHtcbiAgICAgIC8vIE5PVEU6IGFwaU1ldGFkYXRhIGlzIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRlbnQgb2YgdGhlIGFwaS1tZXRhZGF0YS5qc29uIGZpbGVcbiAgICAgIC8vIGF0IGJ1aWxkIHRpbWUgYnkgcmVwbGFjaW5nIHRoZSBmb2xsb3dpbmcgXCJpbmNsdWRlXCIgd2l0aCB0aGUgY29udGVudCBvZiB0aGVcbiAgICAgIC8vIEpTT04gZmlsZS5cbiAgICAgIGNvbnN0IGFwaU1ldGFkYXRhID0ge1xuICAgICAgICBcImFsYXJtc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsZWFyQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYm9va21hcmtzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldENoaWxkcmVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U3ViVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJyb3dzZXJBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZGlzYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVuYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5Qb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2luZ0RhdGFcIjoge1xuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ2FjaGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDb29raWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRG93bmxvYWRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRm9ybURhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVIaXN0b3J5XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlTG9jYWxTdG9yYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGFzc3dvcmRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGx1Z2luRGF0YVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29tbWFuZHNcIjoge1xuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGV4dE1lbnVzXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvb2tpZXNcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsQ29va2llU3RvcmVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZGV2dG9vbHNcIjoge1xuICAgICAgICAgIFwiaW5zcGVjdGVkV2luZG93XCI6IHtcbiAgICAgICAgICAgIFwiZXZhbFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMixcbiAgICAgICAgICAgICAgXCJzaW5nbGVDYWxsYmFja0FyZ1wiOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJwYW5lbHNcIjoge1xuICAgICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMyxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZWxlbWVudHNcIjoge1xuICAgICAgICAgICAgICBcImNyZWF0ZVNpZGViYXJQYW5lXCI6IHtcbiAgICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgXCJjYW5jZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkb3dubG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVyYXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RmlsZUljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGF1c2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVGaWxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVzdW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImV4dGVuc2lvblwiOiB7XG4gICAgICAgICAgXCJpc0FsbG93ZWRGaWxlU2NoZW1lQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaXNBbGxvd2VkSW5jb2duaXRvQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaGlzdG9yeVwiOiB7XG4gICAgICAgICAgXCJhZGRVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVSYW5nZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZVVybFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFZpc2l0c1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImkxOG5cIjoge1xuICAgICAgICAgIFwiZGV0ZWN0TGFuZ3VhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBY2NlcHRMYW5ndWFnZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGVudGl0eVwiOiB7XG4gICAgICAgICAgXCJsYXVuY2hXZWJBdXRoRmxvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImlkbGVcIjoge1xuICAgICAgICAgIFwicXVlcnlTdGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1hbmFnZW1lbnRcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEVuYWJsZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1bmluc3RhbGxTZWxmXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibm90aWZpY2F0aW9uc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBlcm1pc3Npb25MZXZlbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInBhZ2VBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwZXJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJjb250YWluc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJydW50aW1lXCI6IHtcbiAgICAgICAgICBcImdldEJhY2tncm91bmRQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UGxhdGZvcm1JbmZvXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3Blbk9wdGlvbnNQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVxdWVzdFVwZGF0ZUNoZWNrXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogM1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTmF0aXZlTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFVuaW5zdGFsbFVSTFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInNlc3Npb25zXCI6IHtcbiAgICAgICAgICBcImdldERldmljZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRSZWNlbnRseUNsb3NlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3RvcmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzdG9yYWdlXCI6IHtcbiAgICAgICAgICBcImxvY2FsXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibWFuYWdlZFwiOiB7XG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzeW5jXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwidGFic1wiOiB7XG4gICAgICAgICAgXCJjYXB0dXJlVmlzaWJsZVRhYlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGlzY2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImR1cGxpY2F0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV4ZWN1dGVTY3JpcHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvQmFja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvRm9yd2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZ2hsaWdodFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImluc2VydENTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJxdWVyeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRvcFNpdGVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndlYk5hdmlnYXRpb25cIjoge1xuICAgICAgICAgIFwiZ2V0QWxsRnJhbWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RnJhbWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJSZXF1ZXN0XCI6IHtcbiAgICAgICAgICBcImhhbmRsZXJCZWhhdmlvckNoYW5nZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3aW5kb3dzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEN1cnJlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRMYXN0Rm9jdXNlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAoT2JqZWN0LmtleXMoYXBpTWV0YWRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcGktbWV0YWRhdGEuanNvbiBoYXMgbm90IGJlZW4gaW5jbHVkZWQgaW4gYnJvd3Nlci1wb2x5ZmlsbFwiKTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogQSBXZWFrTWFwIHN1YmNsYXNzIHdoaWNoIGNyZWF0ZXMgYW5kIHN0b3JlcyBhIHZhbHVlIGZvciBhbnkga2V5IHdoaWNoIGRvZXNcbiAgICAgICAqIG5vdCBleGlzdCB3aGVuIGFjY2Vzc2VkLCBidXQgYmVoYXZlcyBleGFjdGx5IGFzIGFuIG9yZGluYXJ5IFdlYWtNYXBcbiAgICAgICAqIG90aGVyd2lzZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjcmVhdGVJdGVtXG4gICAgICAgKiAgICAgICAgQSBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBpbiBvcmRlciB0byBjcmVhdGUgdGhlIHZhbHVlIGZvciBhbnlcbiAgICAgICAqICAgICAgICBrZXkgd2hpY2ggZG9lcyBub3QgZXhpc3QsIHRoZSBmaXJzdCB0aW1lIGl0IGlzIGFjY2Vzc2VkLiBUaGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiByZWNlaXZlcywgYXMgaXRzIG9ubHkgYXJndW1lbnQsIHRoZSBrZXkgYmVpbmcgY3JlYXRlZC5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNsYXNzIERlZmF1bHRXZWFrTWFwIGV4dGVuZHMgV2Vha01hcCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNyZWF0ZUl0ZW0sIGl0ZW1zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc3VwZXIoaXRlbXMpO1xuICAgICAgICAgIHRoaXMuY3JlYXRlSXRlbSA9IGNyZWF0ZUl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICBnZXQoa2V5KSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHRoaXMuY3JlYXRlSXRlbShrZXkpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG9iamVjdCBpcyBhbiBvYmplY3Qgd2l0aCBhIGB0aGVuYCBtZXRob2QsIGFuZCBjYW5cbiAgICAgICAqIHRoZXJlZm9yZSBiZSBhc3N1bWVkIHRvIGJlaGF2ZSBhcyBhIFByb21pc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB0aGVuYWJsZS5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IGlzVGhlbmFibGUgPSB2YWx1ZSA9PiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBmdW5jdGlvbiB3aGljaCwgd2hlbiBjYWxsZWQsIHdpbGwgcmVzb2x2ZSBvciByZWplY3RcbiAgICAgICAqIHRoZSBnaXZlbiBwcm9taXNlIGJhc2VkIG9uIGhvdyBpdCBpcyBjYWxsZWQ6XG4gICAgICAgKlxuICAgICAgICogLSBJZiwgd2hlbiBjYWxsZWQsIGBjaHJvbWUucnVudGltZS5sYXN0RXJyb3JgIGNvbnRhaW5zIGEgbm9uLW51bGwgb2JqZWN0LFxuICAgICAgICogICB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIElmIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBleGFjdGx5IG9uZSBhcmd1bWVudCwgdGhlIHByb21pc2UgaXNcbiAgICAgICAqICAgcmVzb2x2ZWQgdG8gdGhhdCB2YWx1ZS5cbiAgICAgICAqIC0gT3RoZXJ3aXNlLCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB0byBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGVcbiAgICAgICAqICAgZnVuY3Rpb24ncyBhcmd1bWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHByb21pc2VcbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVzb2x1dGlvbiBhbmQgcmVqZWN0aW9uIGZ1bmN0aW9ucyBvZiBhXG4gICAgICAgKiAgICAgICAgcHJvbWlzZS5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVzb2x2ZVxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVzb2x1dGlvbiBmdW5jdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVqZWN0XG4gICAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZWplY3Rpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgd3JhcHBlZCBtZXRob2Qgd2hpY2ggaGFzIGNyZWF0ZWQgdGhlIGNhbGxiYWNrLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAgICogICAgICAgIFRoZSBnZW5lcmF0ZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBtYWtlQ2FsbGJhY2sgPSAocHJvbWlzZSwgbWV0YWRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5jYWxsYmFja0FyZ3MpID0+IHtcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgfHwgY2FsbGJhY2tBcmdzLmxlbmd0aCA8PSAxICYmIG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJnc1swXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHBsdXJhbGl6ZUFyZ3VtZW50cyA9IG51bUFyZ3MgPT4gbnVtQXJncyA9PSAxID8gXCJhcmd1bWVudFwiIDogXCJhcmd1bWVudHNcIjtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gZm9yIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuIG5hbWUgYW5kIG1ldGFkYXRhLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICAgKiAgICAgICAgVGhlIG5hbWUgb2YgdGhlIG1ldGhvZCB3aGljaCBpcyBiZWluZyB3cmFwcGVkLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5taW5BcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1pbmltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtdXN0IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggZmV3ZXIgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1heEFyZ3NcbiAgICAgICAqICAgICAgICBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG1heSBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIG1vcmUgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnXG4gICAgICAgKiAgICAgICAgV2hldGhlciBvciBub3QgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBvbmx5IHRoZSBmaXJzdFxuICAgICAgICogICAgICAgIGFyZ3VtZW50IG9mIHRoZSBjYWxsYmFjaywgYWx0ZXJuYXRpdmVseSBhbiBhcnJheSBvZiBhbGwgdGhlXG4gICAgICAgKiAgICAgICAgY2FsbGJhY2sgYXJndW1lbnRzIGlzIHJlc29sdmVkLiBCeSBkZWZhdWx0LCBpZiB0aGUgY2FsbGJhY2tcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggb25seSBhIHNpbmdsZSBhcmd1bWVudCwgdGhhdCB3aWxsIGJlXG4gICAgICAgKiAgICAgICAgcmVzb2x2ZWQgdG8gdGhlIHByb21pc2UsIHdoaWxlIGFsbCBhcmd1bWVudHMgd2lsbCBiZSByZXNvbHZlZCBhc1xuICAgICAgICogICAgICAgIGFuIGFycmF5IGlmIG11bHRpcGxlIGFyZSBnaXZlbi5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24ob2JqZWN0LCAuLi4qKX1cbiAgICAgICAqICAgICAgIFRoZSBnZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbi5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBBc3luY0Z1bmN0aW9uID0gKG5hbWUsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBhc3luY0Z1bmN0aW9uV3JhcHBlcih0YXJnZXQsIC4uLmFyZ3MpIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgQVBJIG1ldGhvZCBoYXMgY3VycmVudGx5IG5vIGNhbGxiYWNrIG9uIENocm9tZSwgYnV0IGl0IHJldHVybiBhIHByb21pc2Ugb24gRmlyZWZveCxcbiAgICAgICAgICAgICAgLy8gYW5kIHNvIHRoZSBwb2x5ZmlsbCB3aWxsIHRyeSB0byBjYWxsIGl0IHdpdGggYSBjYWxsYmFjayBmaXJzdCwgYW5kIGl0IHdpbGwgZmFsbGJhY2tcbiAgICAgICAgICAgICAgLy8gdG8gbm90IHBhc3NpbmcgdGhlIGNhbGxiYWNrIGlmIHRoZSBmaXJzdCBjYWxsIGZhaWxzLlxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzLCBtYWtlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgIH0sIG1ldGFkYXRhKSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGNiRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bmFtZX0gQVBJIG1ldGhvZCBkb2Vzbid0IHNlZW0gdG8gc3VwcG9ydCB0aGUgY2FsbGJhY2sgcGFyYW1ldGVyLCBgICsgXCJmYWxsaW5nIGJhY2sgdG8gY2FsbCBpdCB3aXRob3V0IGEgY2FsbGJhY2s6IFwiLCBjYkVycm9yKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncyk7IC8vIFVwZGF0ZSB0aGUgQVBJIG1ldGhvZCBtZXRhZGF0YSwgc28gdGhhdCB0aGUgbmV4dCBBUEkgY2FsbHMgd2lsbCBub3QgdHJ5IHRvXG4gICAgICAgICAgICAgICAgLy8gdXNlIHRoZSB1bnN1cHBvcnRlZCBjYWxsYmFjayBhbnltb3JlLlxuXG4gICAgICAgICAgICAgICAgbWV0YWRhdGEuZmFsbGJhY2tUb05vQ2FsbGJhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5ub0NhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEubm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncyk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzLCBtYWtlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgIH0sIG1ldGFkYXRhKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBleGlzdGluZyBtZXRob2Qgb2YgdGhlIHRhcmdldCBvYmplY3QsIHNvIHRoYXQgY2FsbHMgdG8gaXQgYXJlXG4gICAgICAgKiBpbnRlcmNlcHRlZCBieSB0aGUgZ2l2ZW4gd3JhcHBlciBmdW5jdGlvbi4gVGhlIHdyYXBwZXIgZnVuY3Rpb24gcmVjZWl2ZXMsXG4gICAgICAgKiBhcyBpdHMgZmlyc3QgYXJndW1lbnQsIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YCBvYmplY3QsIGZvbGxvd2VkIGJ5IGVhY2ggb2ZcbiAgICAgICAqIHRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBvcmlnaW5hbCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSBvcmlnaW5hbCB0YXJnZXQgb2JqZWN0IHRoYXQgdGhlIHdyYXBwZWQgbWV0aG9kIGJlbG9uZ3MgdG8uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2RcbiAgICAgICAqICAgICAgICBUaGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuIFRoaXMgaXMgdXNlZCBhcyB0aGUgdGFyZ2V0IG9mIHRoZSBQcm94eVxuICAgICAgICogICAgICAgIG9iamVjdCB3aGljaCBpcyBjcmVhdGVkIHRvIHdyYXAgdGhlIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHdyYXBwZXJcbiAgICAgICAqICAgICAgICBUaGUgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgYSBkaXJlY3QgaW52b2NhdGlvblxuICAgICAgICogICAgICAgIG9mIHRoZSB3cmFwcGVkIG1ldGhvZC5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8ZnVuY3Rpb24+fVxuICAgICAgICogICAgICAgIEEgUHJveHkgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gbWV0aG9kLCB3aGljaCBpbnZva2VzIHRoZSBnaXZlbiB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIGl0cyBwbGFjZS5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBNZXRob2QgPSAodGFyZ2V0LCBtZXRob2QsIHdyYXBwZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShtZXRob2QsIHtcbiAgICAgICAgICBhcHBseSh0YXJnZXRNZXRob2QsIHRoaXNPYmosIGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyLmNhbGwodGhpc09iaiwgdGFyZ2V0LCAuLi5hcmdzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4gICAgICAvKipcbiAgICAgICAqIFdyYXBzIGFuIG9iamVjdCBpbiBhIFByb3h5IHdoaWNoIGludGVyY2VwdHMgYW5kIHdyYXBzIGNlcnRhaW4gbWV0aG9kc1xuICAgICAgICogYmFzZWQgb24gdGhlIGdpdmVuIGB3cmFwcGVyc2AgYW5kIGBtZXRhZGF0YWAgb2JqZWN0cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gICAgICAgKiAgICAgICAgVGhlIHRhcmdldCBvYmplY3QgdG8gd3JhcC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gW3dyYXBwZXJzID0ge31dXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IHRyZWUgY29udGFpbmluZyB3cmFwcGVyIGZ1bmN0aW9ucyBmb3Igc3BlY2lhbCBjYXNlcy4gQW55XG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcHJlc2VudCBpbiB0aGlzIG9iamVjdCB0cmVlIGlzIGNhbGxlZCBpbiBwbGFjZSBvZiB0aGVcbiAgICAgICAqICAgICAgICBtZXRob2QgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlLiBUaGVzZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgbWV0aG9kcyBhcmUgaW52b2tlZCBhcyBkZXNjcmliZWQgaW4ge0BzZWUgd3JhcE1ldGhvZH0uXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFttZXRhZGF0YSA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgbWV0YWRhdGEgdXNlZCB0byBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlXG4gICAgICAgKiAgICAgICAgUHJvbWlzZS1iYXNlZCB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYXN5bmNocm9ub3VzLiBBbnkgZnVuY3Rpb24gaW5cbiAgICAgICAqICAgICAgICB0aGUgYHRhcmdldGAgb2JqZWN0IHRyZWUgd2hpY2ggaGFzIGEgY29ycmVzcG9uZGluZyBtZXRhZGF0YSBvYmplY3RcbiAgICAgICAqICAgICAgICBpbiB0aGUgc2FtZSBsb2NhdGlvbiBpbiB0aGUgYG1ldGFkYXRhYCB0cmVlIGlzIHJlcGxhY2VkIHdpdGggYW5cbiAgICAgICAqICAgICAgICBhdXRvbWF0aWNhbGx5LWdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgICAqICAgICAgICB7QHNlZSB3cmFwQXN5bmNGdW5jdGlvbn1cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8b2JqZWN0Pn1cbiAgICAgICAqL1xuXG4gICAgICBjb25zdCB3cmFwT2JqZWN0ID0gKHRhcmdldCwgd3JhcHBlcnMgPSB7fSwgbWV0YWRhdGEgPSB7fSkgPT4ge1xuICAgICAgICBsZXQgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB7XG4gICAgICAgICAgaGFzKHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcCBpbiB0YXJnZXQgfHwgcHJvcCBpbiBjYWNoZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZ2V0KHByb3h5VGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlW3Byb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShwcm9wIGluIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGFyZ2V0W3Byb3BdO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1ldGhvZCBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuIENoZWNrIGlmIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgICAgLy8gYW55IHdyYXBwaW5nLlxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHdyYXBwZXJzW3Byb3BdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGEgc3BlY2lhbC1jYXNlIHdyYXBwZXIgZm9yIHRoaXMgbWV0aG9kLlxuICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcE1ldGhvZCh0YXJnZXQsIHRhcmdldFtwcm9wXSwgd3JhcHBlcnNbcHJvcF0pO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYW4gYXN5bmMgbWV0aG9kIHRoYXQgd2UgaGF2ZSBtZXRhZGF0YSBmb3IuIENyZWF0ZSBhXG4gICAgICAgICAgICAgICAgLy8gUHJvbWlzZSB3cmFwcGVyIGZvciBpdC5cbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlciA9IHdyYXBBc3luY0Z1bmN0aW9uKHByb3AsIG1ldGFkYXRhW3Byb3BdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2QgdGhhdCB3ZSBkb24ndCBrbm93IG9yIGNhcmUgYWJvdXQuIFJldHVybiB0aGVcbiAgICAgICAgICAgICAgICAvLyBvcmlnaW5hbCBtZXRob2QsIGJvdW5kIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmJpbmQodGFyZ2V0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgKGhhc093blByb3BlcnR5KHdyYXBwZXJzLCBwcm9wKSB8fCBoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYW4gb2JqZWN0IHRoYXQgd2UgbmVlZCB0byBkbyBzb21lIHdyYXBwaW5nIGZvciB0aGUgY2hpbGRyZW5cbiAgICAgICAgICAgICAgLy8gb2YuIENyZWF0ZSBhIHN1Yi1vYmplY3Qgd3JhcHBlciBmb3IgaXQgd2l0aCB0aGUgYXBwcm9wcmlhdGUgY2hpbGRcbiAgICAgICAgICAgICAgLy8gbWV0YWRhdGEuXG4gICAgICAgICAgICAgIHZhbHVlID0gd3JhcE9iamVjdCh2YWx1ZSwgd3JhcHBlcnNbcHJvcF0sIG1ldGFkYXRhW3Byb3BdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIFwiKlwiKSkge1xuICAgICAgICAgICAgICAvLyBXcmFwIGFsbCBwcm9wZXJ0aWVzIGluICogbmFtZXNwYWNlLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtcIipcIl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCB0byBkbyBhbnkgd3JhcHBpbmcgZm9yIHRoaXMgcHJvcGVydHksXG4gICAgICAgICAgICAgIC8vIHNvIGp1c3QgZm9yd2FyZCBhbGwgYWNjZXNzIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlLCBwcm9wLCB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWNoZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzZXQocHJveHlUYXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZGVmaW5lUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3AsIGRlc2MpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlLCBwcm9wLCBkZXNjKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZGVsZXRlUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KGNhY2hlLCBwcm9wKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfTsgLy8gUGVyIGNvbnRyYWN0IG9mIHRoZSBQcm94eSBBUEksIHRoZSBcImdldFwiIHByb3h5IGhhbmRsZXIgbXVzdCByZXR1cm4gdGhlXG4gICAgICAgIC8vIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSB0YXJnZXQgaWYgdGhhdCB2YWx1ZSBpcyBkZWNsYXJlZCByZWFkLW9ubHkgYW5kXG4gICAgICAgIC8vIG5vbi1jb25maWd1cmFibGUuIEZvciB0aGlzIHJlYXNvbiwgd2UgY3JlYXRlIGFuIG9iamVjdCB3aXRoIHRoZVxuICAgICAgICAvLyBwcm90b3R5cGUgc2V0IHRvIGB0YXJnZXRgIGluc3RlYWQgb2YgdXNpbmcgYHRhcmdldGAgZGlyZWN0bHkuXG4gICAgICAgIC8vIE90aGVyd2lzZSB3ZSBjYW5ub3QgcmV0dXJuIGEgY3VzdG9tIG9iamVjdCBmb3IgQVBJcyB0aGF0XG4gICAgICAgIC8vIGFyZSBkZWNsYXJlZCByZWFkLW9ubHkgYW5kIG5vbi1jb25maWd1cmFibGUsIHN1Y2ggYXMgYGNocm9tZS5kZXZ0b29sc2AuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBwcm94eSBoYW5kbGVycyB0aGVtc2VsdmVzIHdpbGwgc3RpbGwgdXNlIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YFxuICAgICAgICAvLyBpbnN0ZWFkIG9mIHRoZSBgcHJveHlUYXJnZXRgLCBzbyB0aGF0IHRoZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGFyZVxuICAgICAgICAvLyBkZXJlZmVyZW5jZWQgdmlhIHRoZSBvcmlnaW5hbCB0YXJnZXRzLlxuXG4gICAgICAgIGxldCBwcm94eVRhcmdldCA9IE9iamVjdC5jcmVhdGUodGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShwcm94eVRhcmdldCwgaGFuZGxlcnMpO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHNldCBvZiB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgb2JqZWN0LCB3aGljaCBoYW5kbGVzXG4gICAgICAgKiB3cmFwcGluZyBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdGhhdCB0aG9zZSBtZXNzYWdlcyBhcmUgcGFzc2VkLlxuICAgICAgICpcbiAgICAgICAqIEEgc2luZ2xlIHdyYXBwZXIgaXMgY3JlYXRlZCBmb3IgZWFjaCBsaXN0ZW5lciBmdW5jdGlvbiwgYW5kIHN0b3JlZCBpbiBhXG4gICAgICAgKiBtYXAuIFN1YnNlcXVlbnQgY2FsbHMgdG8gYGFkZExpc3RlbmVyYCwgYGhhc0xpc3RlbmVyYCwgb3IgYHJlbW92ZUxpc3RlbmVyYFxuICAgICAgICogcmV0cmlldmUgdGhlIG9yaWdpbmFsIHdyYXBwZXIsIHNvIHRoYXQgIGF0dGVtcHRzIHRvIHJlbW92ZSBhXG4gICAgICAgKiBwcmV2aW91c2x5LWFkZGVkIGxpc3RlbmVyIHdvcmsgYXMgZXhwZWN0ZWQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtEZWZhdWx0V2Vha01hcDxmdW5jdGlvbiwgZnVuY3Rpb24+fSB3cmFwcGVyTWFwXG4gICAgICAgKiAgICAgICAgQSBEZWZhdWx0V2Vha01hcCBvYmplY3Qgd2hpY2ggd2lsbCBjcmVhdGUgdGhlIGFwcHJvcHJpYXRlIHdyYXBwZXJcbiAgICAgICAqICAgICAgICBmb3IgYSBnaXZlbiBsaXN0ZW5lciBmdW5jdGlvbiB3aGVuIG9uZSBkb2VzIG5vdCBleGlzdCwgYW5kIHJldHJpZXZlXG4gICAgICAgKiAgICAgICAgYW4gZXhpc3Rpbmcgb25lIHdoZW4gaXQgZG9lcy5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAgICovXG5cblxuICAgICAgY29uc3Qgd3JhcEV2ZW50ID0gd3JhcHBlck1hcCA9PiAoe1xuICAgICAgICBhZGRMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyLCAuLi5hcmdzKSB7XG4gICAgICAgICAgdGFyZ2V0LmFkZExpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSwgLi4uYXJncyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFzTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHJldHVybiB0YXJnZXQuaGFzTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgdGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBzIGFuIG9uUmVxdWVzdEZpbmlzaGVkIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgd2lsbCByZXR1cm4gYVxuICAgICAgICAgKiBgZ2V0Q29udGVudCgpYCBwcm9wZXJ0eSB3aGljaCByZXR1cm5zIGEgYFByb21pc2VgIHJhdGhlciB0aGFuIHVzaW5nIGFcbiAgICAgICAgICogY2FsbGJhY2sgQVBJLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxXG4gICAgICAgICAqICAgICAgICBUaGUgSEFSIGVudHJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldHdvcmsgcmVxdWVzdC5cbiAgICAgICAgICovXG5cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25SZXF1ZXN0RmluaXNoZWQocmVxKSB7XG4gICAgICAgICAgY29uc3Qgd3JhcHBlZFJlcSA9IHdyYXBPYmplY3QocmVxLCB7fVxuICAgICAgICAgIC8qIHdyYXBwZXJzICovXG4gICAgICAgICAgLCB7XG4gICAgICAgICAgICBnZXRDb250ZW50OiB7XG4gICAgICAgICAgICAgIG1pbkFyZ3M6IDAsXG4gICAgICAgICAgICAgIG1heEFyZ3M6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsaXN0ZW5lcih3cmFwcGVkUmVxKTtcbiAgICAgICAgfTtcbiAgICAgIH0pOyAvLyBLZWVwIHRyYWNrIGlmIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIGhhcyBiZWVuIGxvZ2dlZCBhdCBsZWFzdCBvbmNlLlxuXG4gICAgICBsZXQgbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nID0gZmFsc2U7XG4gICAgICBjb25zdCBvbk1lc3NhZ2VXcmFwcGVycyA9IG5ldyBEZWZhdWx0V2Vha01hcChsaXN0ZW5lciA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV3JhcHMgYSBtZXNzYWdlIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgbWF5IHNlbmQgcmVzcG9uc2VzIGJhc2VkIG9uXG4gICAgICAgICAqIGl0cyByZXR1cm4gdmFsdWUsIHJhdGhlciB0aGFuIGJ5IHJldHVybmluZyBhIHNlbnRpbmVsIHZhbHVlIGFuZCBjYWxsaW5nIGFcbiAgICAgICAgICogY2FsbGJhY2suIElmIHRoZSBsaXN0ZW5lciBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZSwgdGhlIHJlc3BvbnNlIGlzXG4gICAgICAgICAqIHNlbnQgd2hlbiB0aGUgcHJvbWlzZSBlaXRoZXIgcmVzb2x2ZXMgb3IgcmVqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHsqfSBtZXNzYWdlXG4gICAgICAgICAqICAgICAgICBUaGUgbWVzc2FnZSBzZW50IGJ5IHRoZSBvdGhlciBlbmQgb2YgdGhlIGNoYW5uZWwuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzZW5kZXJcbiAgICAgICAgICogICAgICAgIERldGFpbHMgYWJvdXQgdGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZS5cbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbigqKX0gc2VuZFJlc3BvbnNlXG4gICAgICAgICAqICAgICAgICBBIGNhbGxiYWNrIHdoaWNoLCB3aGVuIGNhbGxlZCB3aXRoIGFuIGFyYml0cmFyeSBhcmd1bWVudCwgc2VuZHNcbiAgICAgICAgICogICAgICAgIHRoYXQgdmFsdWUgYXMgYSByZXNwb25zZS5cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqICAgICAgICBUcnVlIGlmIHRoZSB3cmFwcGVkIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgd2hpY2ggd2lsbCBsYXRlclxuICAgICAgICAgKiAgICAgICAgeWllbGQgYSByZXNwb25zZS4gRmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKi9cblxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBvbk1lc3NhZ2UobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICBsZXQgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IGZhbHNlO1xuICAgICAgICAgIGxldCB3cmFwcGVkU2VuZFJlc3BvbnNlO1xuICAgICAgICAgIGxldCBzZW5kUmVzcG9uc2VQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVkU2VuZFJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmICghbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFNFTkRfUkVTUE9OU0VfREVQUkVDQVRJT05fV0FSTklORywgbmV3IEVycm9yKCkuc3RhY2spO1xuICAgICAgICAgICAgICAgIGxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyA9IHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBkaWRDYWxsU2VuZFJlc3BvbnNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbGlzdGVuZXIobWVzc2FnZSwgc2VuZGVyLCB3cmFwcGVkU2VuZFJlc3BvbnNlKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaXNSZXN1bHRUaGVuYWJsZSA9IHJlc3VsdCAhPT0gdHJ1ZSAmJiBpc1RoZW5hYmxlKHJlc3VsdCk7IC8vIElmIHRoZSBsaXN0ZW5lciBkaWRuJ3QgcmV0dXJuZWQgdHJ1ZSBvciBhIFByb21pc2UsIG9yIGNhbGxlZFxuICAgICAgICAgIC8vIHdyYXBwZWRTZW5kUmVzcG9uc2Ugc3luY2hyb25vdXNseSwgd2UgY2FuIGV4aXQgZWFybGllclxuICAgICAgICAgIC8vIGJlY2F1c2UgdGhlcmUgd2lsbCBiZSBubyByZXNwb25zZSBzZW50IGZyb20gdGhpcyBsaXN0ZW5lci5cblxuICAgICAgICAgIGlmIChyZXN1bHQgIT09IHRydWUgJiYgIWlzUmVzdWx0VGhlbmFibGUgJiYgIWRpZENhbGxTZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IC8vIEEgc21hbGwgaGVscGVyIHRvIHNlbmQgdGhlIG1lc3NhZ2UgaWYgdGhlIHByb21pc2UgcmVzb2x2ZXNcbiAgICAgICAgICAvLyBhbmQgYW4gZXJyb3IgaWYgdGhlIHByb21pc2UgcmVqZWN0cyAoYSB3cmFwcGVkIHNlbmRNZXNzYWdlIGhhc1xuICAgICAgICAgIC8vIHRvIHRyYW5zbGF0ZSB0aGUgbWVzc2FnZSBpbnRvIGEgcmVzb2x2ZWQgcHJvbWlzZSBvciBhIHJlamVjdGVkXG4gICAgICAgICAgLy8gcHJvbWlzZSkuXG5cblxuICAgICAgICAgIGNvbnN0IHNlbmRQcm9taXNlZFJlc3VsdCA9IHByb21pc2UgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKG1zZyA9PiB7XG4gICAgICAgICAgICAgIC8vIHNlbmQgdGhlIG1lc3NhZ2UgdmFsdWUuXG4gICAgICAgICAgICAgIHNlbmRSZXNwb25zZShtc2cpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAvLyBTZW5kIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaWYgdGhlIHJlamVjdGVkIHZhbHVlXG4gICAgICAgICAgICAgIC8vIGlzIGFuIGluc3RhbmNlIG9mIGVycm9yLCBvciB0aGUgb2JqZWN0IGl0c2VsZiBvdGhlcndpc2UuXG4gICAgICAgICAgICAgIGxldCBtZXNzYWdlO1xuXG4gICAgICAgICAgICAgIGlmIChlcnJvciAmJiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciB8fCB0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIF9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgLy8gUHJpbnQgYW4gZXJyb3Igb24gdGhlIGNvbnNvbGUgaWYgdW5hYmxlIHRvIHNlbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHNlbmQgb25NZXNzYWdlIHJlamVjdGVkIHJlcGx5XCIsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9OyAvLyBJZiB0aGUgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCBzZW5kIHRoZSByZXNvbHZlZCB2YWx1ZSBhcyBhXG4gICAgICAgICAgLy8gcmVzdWx0LCBvdGhlcndpc2Ugd2FpdCB0aGUgcHJvbWlzZSByZWxhdGVkIHRvIHRoZSB3cmFwcGVkU2VuZFJlc3BvbnNlXG4gICAgICAgICAgLy8gY2FsbGJhY2sgdG8gcmVzb2x2ZSBhbmQgc2VuZCBpdCBhcyBhIHJlc3BvbnNlLlxuXG5cbiAgICAgICAgICBpZiAoaXNSZXN1bHRUaGVuYWJsZSkge1xuICAgICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChzZW5kUmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICB9IC8vIExldCBDaHJvbWUga25vdyB0aGF0IHRoZSBsaXN0ZW5lciBpcyByZXBseWluZy5cblxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2sgPSAoe1xuICAgICAgICByZWplY3QsXG4gICAgICAgIHJlc29sdmVcbiAgICAgIH0sIHJlcGx5KSA9PiB7XG4gICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgLy8gRGV0ZWN0IHdoZW4gbm9uZSBvZiB0aGUgbGlzdGVuZXJzIHJlcGxpZWQgdG8gdGhlIHNlbmRNZXNzYWdlIGNhbGwgYW5kIHJlc29sdmVcbiAgICAgICAgICAvLyB0aGUgcHJvbWlzZSB0byB1bmRlZmluZWQgYXMgaW4gRmlyZWZveC5cbiAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsL2lzc3Vlcy8xMzBcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlID09PSBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVwbHkgJiYgcmVwbHkuX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fKSB7XG4gICAgICAgICAgLy8gQ29udmVydCBiYWNrIHRoZSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciBpbnRvXG4gICAgICAgICAgLy8gYW4gRXJyb3IgaW5zdGFuY2UuXG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihyZXBseS5tZXNzYWdlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXBseSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZSA9IChuYW1lLCBtZXRhZGF0YSwgYXBpTmFtZXNwYWNlT2JqLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IG1ldGFkYXRhLm1pbkFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgY29uc3Qgd3JhcHBlZENiID0gd3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2suYmluZChudWxsLCB7XG4gICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXJncy5wdXNoKHdyYXBwZWRDYik7XG4gICAgICAgICAgYXBpTmFtZXNwYWNlT2JqLnNlbmRNZXNzYWdlKC4uLmFyZ3MpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHN0YXRpY1dyYXBwZXJzID0ge1xuICAgICAgICBkZXZ0b29sczoge1xuICAgICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICAgIG9uUmVxdWVzdEZpbmlzaGVkOiB3cmFwRXZlbnQob25SZXF1ZXN0RmluaXNoZWRXcmFwcGVycylcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bnRpbWU6IHtcbiAgICAgICAgICBvbk1lc3NhZ2U6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgb25NZXNzYWdlRXh0ZXJuYWw6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0YWJzOiB7XG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMixcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2V0dGluZ01ldGFkYXRhID0ge1xuICAgICAgICBjbGVhcjoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBhcGlNZXRhZGF0YS5wcml2YWN5ID0ge1xuICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICBzZXJ2aWNlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgd2Vic2l0ZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gd3JhcE9iamVjdChleHRlbnNpb25BUElzLCBzdGF0aWNXcmFwcGVycywgYXBpTWV0YWRhdGEpO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIGNocm9tZSAhPSBcIm9iamVjdFwiIHx8ICFjaHJvbWUgfHwgIWNocm9tZS5ydW50aW1lIHx8ICFjaHJvbWUucnVudGltZS5pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBzY3JpcHQgc2hvdWxkIG9ubHkgYmUgbG9hZGVkIGluIGEgYnJvd3NlciBleHRlbnNpb24uXCIpO1xuICAgIH0gLy8gVGhlIGJ1aWxkIHByb2Nlc3MgYWRkcyBhIFVNRCB3cmFwcGVyIGFyb3VuZCB0aGlzIGZpbGUsIHdoaWNoIG1ha2VzIHRoZVxuICAgIC8vIGBtb2R1bGVgIHZhcmlhYmxlIGF2YWlsYWJsZS5cblxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3cmFwQVBJcyhjaHJvbWUpO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gYnJvd3NlcjtcbiAgfVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1icm93c2VyLXBvbHlmaWxsLmpzLm1hcFxuIiwiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgYnJvd3NlciBmcm9tICd3ZWJleHRlbnNpb24tcG9seWZpbGwnO1xuaW1wb3J0IHtcbiAgcGx1Z2luTmFtZXNwYWNlLFxuICBzaXRlc1RvSWdub3JlLFxuICBzaG91bGRDYXBpdGFsaXNlSSxcbiAgc2hvdWxkQ2FwaXRhbGlzZU5hbWVzLFxuICBzaG91bGRDYXBpdGFsaXNlQWJicmV2aWF0aW9ucyxcbiAgc2hvdWxkQ2FwaXRhbGlzZUxvY2F0aW9ucyxcbiAgY29uc3RhbnRzS2V5VmFsLFxuICBuYW1lc0tleVZhbCxcbiAgYWJicmV2aWF0aW9uc0tleVZhbCxcbiAgbG9jYXRpb25zS2V5VmFsLFxuICB3b3Jkc1RvRXhjbHVkZSxcbn0gZnJvbSAnLi9wbHVnaW4tY29uc3RhbnRzJztcblxuY29uc3QgZXJyb3JNc2cgPSAnYnJlYWtpbmcgbG9vcCc7XG5sZXQgc2l0ZXNUb0V4Y2x1ZGUgPSBbXTtcblxuYnJvd3Nlci5zdG9yYWdlLmxvY2FsXG4gIC5nZXQoW1xuICAgIHNpdGVzVG9JZ25vcmUsXG4gICAgc2hvdWxkQ2FwaXRhbGlzZUksXG4gICAgc2hvdWxkQ2FwaXRhbGlzZU5hbWVzLFxuICAgIHNob3VsZENhcGl0YWxpc2VBYmJyZXZpYXRpb25zLFxuICAgIHNob3VsZENhcGl0YWxpc2VMb2NhdGlvbnMsXG4gICAgY29uc3RhbnRzS2V5VmFsLFxuICAgIG5hbWVzS2V5VmFsLFxuICAgIGFiYnJldmlhdGlvbnNLZXlWYWwsXG4gICAgbG9jYXRpb25zS2V5VmFsLFxuICAgIHdvcmRzVG9FeGNsdWRlLFxuICBdKVxuICAudGhlbihwcm9jZXNzUmVzcG9uc2UsIHV0aWxzLm9uRXJyb3IpO1xuXG4vKiBVcGRhdGluZyB0aGUgdmFsdWUgb2YgdGhpcyBsb2NhbCBzdG9yYWdlIHZhcmlhYmxlIGluIHNldHRpbmdzLmpzIGhhcHBlbnMgQUZURVIgY29udGVudC5qcy5cbiAqIFRoZSBicm93c2VyIGRvZXNuJ3QgcmVnaXN0ZXIgdGhlIGNoYW5nZSBhbmQgZG9lc24ndCBjYXBpdGFsaXNlIEkgYnkgZGVmYXVsdCBhZnRlciBpbnN0YWxsaW5nIHRoZSBleHRlbnNpb24uXG4gKiBUaGlzIGJsb2NrIHdpbGwgY2FwdHVyZSB0aGUgZXZlbnQgYW5kIHVwZGF0ZSB0aGUgdmFsdWUgb2YgJ3Nob3VsZENhcGl0YWxpc2VJJy5cbiAqL1xuYnJvd3Nlci5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoXG4gIGNoYW5nZXMsIC8vIG9iamVjdFxuICBhcmVhTmFtZSAvLyBzdHJpbmdcbikge1xuICBpZiAoYXJlYU5hbWUgPT09ICdsb2NhbCcpIHtcbiAgICB1dGlscy50b2dnbGVPcHRpb25zVmFsdWUoY2hhbmdlcywgc2hvdWxkQ2FwaXRhbGlzZUkpO1xuICAgIHV0aWxzLnRvZ2dsZU9wdGlvbnNWYWx1ZShjaGFuZ2VzLCBzaG91bGRDYXBpdGFsaXNlTmFtZXMpO1xuICAgIHV0aWxzLnRvZ2dsZU9wdGlvbnNWYWx1ZShjaGFuZ2VzLCBzaG91bGRDYXBpdGFsaXNlQWJicmV2aWF0aW9ucyk7XG4gICAgdXRpbHMudG9nZ2xlT3B0aW9uc1ZhbHVlKGNoYW5nZXMsIHNob3VsZENhcGl0YWxpc2VMb2NhdGlvbnMpO1xuXG4gICAgaWYgKGNoYW5nZXMud29yZHNUb0V4Y2x1ZGUgIT0gbnVsbCkge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSBjaGFuZ2VzLndvcmRzVG9FeGNsdWRlLm5ld1ZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICB1dGlscy5zZXRXb3Jkc1RvRXhjbHVkZShuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vYnJvd3Nlci5ydW50aW1lLnJlbG9hZCgpIC0gcmVsb2FkIGJyb3dzZXJcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGhvb2t1cEV2ZW50SGFuZGxlcnMoKSB7XG4gIG9ic2VydmVJbnB1dFRhZ3MoKTtcbiAgb2JzZXJ2ZUh0bWxCb2R5KCk7XG5cbiAgb2JzZXJ2ZUlmcmFtZUlucHV0VGFncygpO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlSWZyYW1lSW5wdXRUYWdzKCkge1xuICAkKCdpZnJhbWUnKS5vbignbG9hZCcsIChldmVudCkgPT4ge1xuICAgIGxldCBpZnJhbWUgPSBldmVudC50YXJnZXQ7XG4gICAgJChpZnJhbWUpXG4gICAgICAuY29udGVudHMoKVxuICAgICAgLmZpbmQoJzp0ZXh0LHRleHRhcmVhJylcbiAgICAgIC5lYWNoKChfLCBpdGVtKSA9PiB7XG4gICAgICAgICQoaXRlbSkub24oYGlucHV0LiR7cGx1Z2luTmFtZXNwYWNlfWAsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGNhcGl0YWxpc2VUZXh0KGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlSW5wdXRUYWdzKCkge1xuICAkKCc6dGV4dCx0ZXh0YXJlYScpLm9uKGBpbnB1dC4ke3BsdWdpbk5hbWVzcGFjZX1gLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjYXBpdGFsaXNlVGV4dChldmVudC50YXJnZXQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0T3B0aW9ucyhpdGVtKSB7XG4gIHV0aWxzLnNldFNob3VsZENhcGl0YWxpc2VPcHRpb24oc2hvdWxkQ2FwaXRhbGlzZUksIGl0ZW0uc2hvdWxkQ2FwaXRhbGlzZUkpO1xuICB1dGlscy5zZXRTaG91bGRDYXBpdGFsaXNlT3B0aW9uKFxuICAgIHNob3VsZENhcGl0YWxpc2VOYW1lcyxcbiAgICBpdGVtLnNob3VsZENhcGl0YWxpc2VOYW1lc1xuICApO1xuICB1dGlscy5zZXRTaG91bGRDYXBpdGFsaXNlT3B0aW9uKFxuICAgIHNob3VsZENhcGl0YWxpc2VBYmJyZXZpYXRpb25zLFxuICAgIGl0ZW0uc2hvdWxkQ2FwaXRhbGlzZUFiYnJldmlhdGlvbnNcbiAgKTtcbiAgdXRpbHMuc2V0U2hvdWxkQ2FwaXRhbGlzZU9wdGlvbihcbiAgICBzaG91bGRDYXBpdGFsaXNlTG9jYXRpb25zLFxuICAgIGl0ZW0uc2hvdWxkQ2FwaXRhbGlzZUxvY2F0aW9uc1xuICApO1xufVxuXG5mdW5jdGlvbiBzZXRLZXlWYWx1ZXMoaXRlbSkge1xuICB1dGlscy5zZXRLZXlWYWx1ZShjb25zdGFudHNLZXlWYWwsIGl0ZW0uY29uc3RhbnRzS2V5VmFsKTtcbiAgdXRpbHMuc2V0S2V5VmFsdWUobmFtZXNLZXlWYWwsIGl0ZW0ubmFtZXNLZXlWYWwpO1xuICB1dGlscy5zZXRLZXlWYWx1ZShhYmJyZXZpYXRpb25zS2V5VmFsLCBpdGVtLmFiYnJldmlhdGlvbnNLZXlWYWwpO1xuICB1dGlscy5zZXRLZXlWYWx1ZShsb2NhdGlvbnNLZXlWYWwsIGl0ZW0ubG9jYXRpb25zS2V5VmFsKTtcbiAgdXRpbHMuc2V0V29yZHNUb0V4Y2x1ZGUoaXRlbS53b3Jkc1RvRXhjbHVkZSk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NSZXNwb25zZShpdGVtKSB7XG4gIHNpdGVzVG9FeGNsdWRlID0gaXRlbS5zaXRlc1RvSWdub3JlO1xuXG4gIHNldE9wdGlvbnMoaXRlbSk7XG4gIHNldEtleVZhbHVlcyhpdGVtKTtcblxuICBjb25zb2xlLmxvZyhpdGVtKTtcblxuICBpZiAoaXRlbSAmJiBzaXRlc1RvRXhjbHVkZSkge1xuICAgIC8vaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDA2MTkyL2dldC1jdXJyZW50LXVybC13aXRoLWpxdWVyeVxuICAgIHZhciBjdXJyZW50VXJsRG9tYWluID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcblxuICAgIHRyeSB7XG4gICAgICB2YXIgc2hvdWxkRW5hYmxlQ2FwaXRhbGlzaW5nT25DdXJyZW50U2l0ZSA9IHRydWU7XG5cbiAgICAgICQuZWFjaChzaXRlc1RvRXhjbHVkZSwgZnVuY3Rpb24gKF9pLCBzaXRlVG9FeGNsdWRlKSB7XG4gICAgICAgIGlmIChjdXJyZW50VXJsRG9tYWluLmluY2x1ZGVzKHNpdGVUb0V4Y2x1ZGUpKSB7XG4gICAgICAgICAgc2hvdWxkRW5hYmxlQ2FwaXRhbGlzaW5nT25DdXJyZW50U2l0ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHNob3VsZEVuYWJsZUNhcGl0YWxpc2luZ09uQ3VycmVudFNpdGUpIHtcbiAgICAgICAgaG9va3VwRXZlbnRIYW5kbGVycygpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubWVzc2FnZSAhPT0gZXJyb3JNc2cpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaG9va3VwRXZlbnRIYW5kbGVycygpO1xuICB9XG59XG5cbi8qZXNsaW50IG5vLWRlYnVnZ2VyOiBcImVycm9yXCIqL1xuZnVuY3Rpb24gb2JzZXJ2ZUh0bWxCb2R5KCkge1xuICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIHZhciBjb250ZW50RWRpdGFibGVUYWdzID0gWydwJywgJ3NwYW4nXTtcbiAgdmFyIGlucHV0VGFncyA9IFtcImlucHV0W3R5cGU9J3RleHQnXVwiLCAndGV4dGFyZWEnXTtcblxuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgbGV0IGNoYXJhY3RlckRhdGFNdXRhdGlvbnMgPSBbXTtcblxuICAgIGNvbnNvbGUubG9nKG11dGF0aW9ucyk7XG4gICAgJC5lYWNoKG11dGF0aW9ucywgZnVuY3Rpb24gKF9pLCBtdXRhdGlvbikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG4gICAgICAgICAgLy8gYWRkIHN1cHBvcnQgZm9yIGRpdiBibG9jayBpbiBnbWFpbCBhbmQgb3V0bG9va1xuICAgICAgICAgIGlmIChbJ1AnXS5pbmNsdWRlcyhtdXRhdGlvbi50YXJnZXQubm9kZU5hbWUpKSB7XG4gICAgICAgICAgICBjYXBpdGFsaXNlVGV4dChtdXRhdGlvbi50YXJnZXQpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhtdXRhdGlvbnMpO1xuICAgICAgICAgIHZhciBhZGRlZE5vZGVzID0gbXV0YXRpb24uYWRkZWROb2RlcztcbiAgICAgICAgICBpZiAoYWRkZWROb2RlcyAmJiBhZGRlZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAodXRpbHMuaXNGaXJzdFRleHRPZkVkaXRhYmxlVGV4dE5vZGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBjYXBpdGFsaXNlVGV4dChub2RlLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgICAgIGFkZGVkTm9kZXMgPSBhZGRlZE5vZGVzLmZpbHRlcigoYWRkZWROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBhZGRlZE5vZGUgIT0gbm9kZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQuZWFjaChjb250ZW50RWRpdGFibGVUYWdzLCBmdW5jdGlvbiAoX2ksIHRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgdmFyIGZpbHRlcmVkRWxzID0gdXRpbHMuZ2V0RmlsdGVyZWRFbGVtZW50cyhhZGRlZE5vZGVzLCB0YWdOYW1lKTtcblxuICAgICAgICAgICAgICBpZiAoZmlsdGVyZWRFbHM/Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkRWxzLmVhY2goZnVuY3Rpb24gKF9pbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLnNob3VsZENhcGl0YWxpc2VDb250ZW50KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhcGl0YWxpc2VUZXh0KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJC5lYWNoKGlucHV0VGFncywgZnVuY3Rpb24gKF9pLCB0YWdOYW1lKSB7XG4gICAgICAgICAgICAgIHZhciBmaWx0ZXJlZEVscyA9IHV0aWxzLmdldEZpbHRlcmVkRWxlbWVudHMoYWRkZWROb2RlcywgdGFnTmFtZSk7XG5cbiAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkRWxzPy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZEVscy5lYWNoKGZ1bmN0aW9uIChfaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkub24oYGlucHV0LiR7cGx1Z2luTmFtZXNwYWNlfWAsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjYXBpdGFsaXNlVGV4dChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hhcmFjdGVyRGF0YScpIHtcbiAgICAgICAgICBjaGFyYWN0ZXJEYXRhTXV0YXRpb25zLnB1c2gobXV0YXRpb24udGFyZ2V0LnBhcmVudE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgaWYgKGVyci5tZXNzYWdlICE9PSBlcnJvck1zZykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNoYXJhY3RlckRhdGFNdXRhdGlvbnMgPSB1bmlxdWUoY2hhcmFjdGVyRGF0YU11dGF0aW9ucyk7XG4gICAgY2hhcmFjdGVyRGF0YU11dGF0aW9ucy5mb3JFYWNoKChlbGVtZW50KSA9PiBjYXBpdGFsaXNlVGV4dChlbGVtZW50KSk7XG4gIH0pO1xuXG4gIHZhciBjb25maWcgPSB7XG4gICAgc3VidHJlZTogdHJ1ZSxcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcbiAgfTtcblxuICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgY29uZmlnKTtcbn1cblxuZnVuY3Rpb24gdW5pcXVlKGxpc3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICAkLmVhY2gobGlzdCwgZnVuY3Rpb24gKGksIGUpIHtcbiAgICBpZiAoJC5pbkFycmF5KGUsIHJlc3VsdCkgPT0gLTEpIHJlc3VsdC5wdXNoKGUpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gY2FwaXRhbGlzZVRleHQoZWxlbWVudCkge1xuICB1dGlscy5jYXBpdGFsaXNlVGV4dChcbiAgICBlbGVtZW50LFxuICAgIHV0aWxzLnNob3VsZENhcGl0YWxpc2UsXG4gICAgdXRpbHMuc2hvdWxkQ2FwaXRhbGlzZUZvckksXG4gICAgdXRpbHMuZ2V0VGV4dCxcbiAgICB1dGlscy5zZXRUZXh0XG4gICk7XG59XG4iLCJleHBvcnQgY29uc3QgcGx1Z2luTmFtZXNwYWNlID0gJ2F1dG8tY2FwaXRhbGlzZS1leHRlbnNpb24nO1xuXG5leHBvcnQgY29uc3Qgc2l0ZXNUb0lnbm9yZSA9ICdzaXRlc1RvSWdub3JlJyxcbiAgd29yZHNUb0V4Y2x1ZGUgPSAnd29yZHNUb0V4Y2x1ZGUnLFxuICBzaG91bGRDYXBpdGFsaXNlSSA9ICdzaG91bGRDYXBpdGFsaXNlSScsXG4gIHNob3VsZENhcGl0YWxpc2VOYW1lcyA9ICdzaG91bGRDYXBpdGFsaXNlTmFtZXMnLFxuICBzaG91bGRDYXBpdGFsaXNlQWJicmV2aWF0aW9ucyA9ICdzaG91bGRDYXBpdGFsaXNlQWJicmV2aWF0aW9ucycsXG4gIHNob3VsZENhcGl0YWxpc2VMb2NhdGlvbnMgPSAnc2hvdWxkQ2FwaXRhbGlzZUxvY2F0aW9ucycsXG4gIGNvbnN0YW50c0tleVZhbCA9ICdjb25zdGFudHNLZXlWYWwnLFxuICBuYW1lc0tleVZhbCA9ICduYW1lc0tleVZhbCcsXG4gIGFiYnJldmlhdGlvbnNLZXlWYWwgPSAnYWJicmV2aWF0aW9uc0tleVZhbCcsXG4gIGxvY2F0aW9uc0tleVZhbCA9ICdsb2NhdGlvbnNLZXlWYWwnO1xuIiwiaW1wb3J0IHtcbiAgc2hvdWxkQ2FwaXRhbGlzZUksXG4gIHNob3VsZENhcGl0YWxpc2VOYW1lcyxcbiAgc2hvdWxkQ2FwaXRhbGlzZUFiYnJldmlhdGlvbnMsXG4gIHNob3VsZENhcGl0YWxpc2VMb2NhdGlvbnMsXG4gIGNvbnN0YW50c0tleVZhbCxcbiAgbmFtZXNLZXlWYWwsXG4gIGFiYnJldmlhdGlvbnNLZXlWYWwsXG4gIGxvY2F0aW9uc0tleVZhbCxcbn0gZnJvbSAnLi9wbHVnaW4tY29uc3RhbnRzJztcblxubGV0IHdvcmRzVG9FeGNsdWRlID0gW107XG5leHBvcnQgbGV0IG9wdGlvbnNEaWN0aW9uYXJ5ID0ge1xuICBbc2hvdWxkQ2FwaXRhbGlzZUldOiBmYWxzZSxcbiAgW3Nob3VsZENhcGl0YWxpc2VOYW1lc106IGZhbHNlLFxuICBbc2hvdWxkQ2FwaXRhbGlzZUFiYnJldmlhdGlvbnNdOiBmYWxzZSxcbiAgW3Nob3VsZENhcGl0YWxpc2VMb2NhdGlvbnNdOiBmYWxzZSxcbn07XG5sZXQga2V5VmFsdWVEaWN0aW9uYXJ5ID0ge1xuICBbY29uc3RhbnRzS2V5VmFsXToge30sXG4gIFtuYW1lc0tleVZhbF06IHt9LFxuICBbYWJicmV2aWF0aW9uc0tleVZhbF06IHt9LFxuICBbbG9jYXRpb25zS2V5VmFsXToge30sXG59O1xuY29uc3QgbmJzcCA9ICcmbmJzcDsnO1xuY29uc3QgY29udGVudEVkaXRhYmxlVGFncyA9IFsnU1BBTicsICdESVYnLCAnUCddO1xuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGlzZVRleHQoXG4gIGVsZW1lbnQsXG4gIHNob3VsZENhcGl0YWxpc2UsXG4gIHNob3VsZENhcGl0YWxpc2VGb3JJLFxuICBnZXRUZXh0LFxuICBzZXRUZXh0XG4pIHtcbiAgaWYgKCFlbGVtZW50KSByZXR1cm47XG5cbiAgbGV0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWU7XG5cbiAgaWYgKCFpc0VkaXRhYmxlRWxlbWVudChlbGVtZW50LCB0YWdOYW1lKSkgcmV0dXJuO1xuXG4gIGxldCB0ZXh0ID0gZ2V0VGV4dChlbGVtZW50LCB0YWdOYW1lKTtcblxuICBpZiAodGV4dCA9PSBudWxsKSByZXR1cm47XG5cbiAgY29uc3QgbGFzdENoYXIgPSB0ZXh0LnRyaW0oKS5zbGljZSgtMSk7XG4gIGNvbnN0IGlzTGFzdENoYXJBbkFscGhhYmV0ID0gbGFzdENoYXIubWF0Y2goL1thLXpdL2kpO1xuXG4gIGlmICh0ZXh0Lmxlbmd0aCA9PSAxICYmICFpc0xhc3RDaGFyQW5BbHBoYWJldCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vc3VwcG9ydCBmb3IgamlyYSdzIGNvbW1lbnQgc2VjdGlvbidzIHAgdGFnc1xuICBpZiAoaXNMYXN0Q2hhckFuQWxwaGFiZXQgJiYgbGFzdENoYXIudG9VcHBlckNhc2UoKSA9PT0gbGFzdENoYXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgc2hvdWxkQXBwZW5kQnIgPSBmYWxzZTtcbiAgaWYgKHRleHQubGVuZ3RoID49IDQgJiYgdGV4dC5zbGljZSgtNCkgPT09ICc8YnI+Jykge1xuICAgIHRleHQgPSB0ZXh0LnNsaWNlKDAsIC00KTtcbiAgICBzaG91bGRBcHBlbmRCciA9IHRydWU7XG4gIH1cblxuICBpZiAoc2hvdWxkQ2FwaXRhbGlzZSh0ZXh0KSkge1xuICAgIGNvbnN0IHVwZGF0ZWRTdHIgPSBnZXRDYXBpdGFsaXNlZENvbnRlbnQodGV4dCk7XG5cbiAgICBzZXRUZXh0KGVsZW1lbnQsIHRhZ05hbWUsIHVwZGF0ZWRTdHIsIHNob3VsZEFwcGVuZEJyKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoXG4gICAgdGV4dC5sZW5ndGggPj0gMiAmJlxuICAgIHNob3VsZENhcGl0YWxpc2VGb3JJKHRleHQpICYmXG4gICAgb3B0aW9uc0RpY3Rpb25hcnlbc2hvdWxkQ2FwaXRhbGlzZUldXG4gICkge1xuICAgIGNvbnN0IHVwZGF0ZWRTdHIgPSBnZXRDYXBpdGFsaXNlZENvbnRlbnRGb3JJKHRleHQpO1xuXG4gICAgc2V0VGV4dChlbGVtZW50LCB0YWdOYW1lLCB1cGRhdGVkU3RyLCBzaG91bGRBcHBlbmRCcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY2FzZVNlbnNpdGl2ZSA9IHRydWU7XG4gIHVwZGF0ZUNvbnN0YW50KFxuICAgIHRleHQsXG4gICAgZWxlbWVudCxcbiAgICB0YWdOYW1lLFxuICAgIGtleVZhbHVlRGljdGlvbmFyeVtjb25zdGFudHNLZXlWYWxdLFxuICAgIGNhc2VTZW5zaXRpdmVcbiAgKTtcblxuICBpZiAob3B0aW9uc0RpY3Rpb25hcnlbc2hvdWxkQ2FwaXRhbGlzZU5hbWVzXSkge1xuICAgIHVwZGF0ZUNvbnN0YW50KFxuICAgICAgdGV4dCxcbiAgICAgIGVsZW1lbnQsXG4gICAgICB0YWdOYW1lLFxuICAgICAga2V5VmFsdWVEaWN0aW9uYXJ5W25hbWVzS2V5VmFsXSxcbiAgICAgICFjYXNlU2Vuc2l0aXZlXG4gICAgKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zRGljdGlvbmFyeVtzaG91bGRDYXBpdGFsaXNlQWJicmV2aWF0aW9uc10pIHtcbiAgICB1cGRhdGVDb25zdGFudChcbiAgICAgIHRleHQsXG4gICAgICBlbGVtZW50LFxuICAgICAgdGFnTmFtZSxcbiAgICAgIGtleVZhbHVlRGljdGlvbmFyeVthYmJyZXZpYXRpb25zS2V5VmFsXSxcbiAgICAgICFjYXNlU2Vuc2l0aXZlXG4gICAgKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zRGljdGlvbmFyeVtzaG91bGRDYXBpdGFsaXNlTG9jYXRpb25zXSkge1xuICAgIHVwZGF0ZUNvbnN0YW50KFxuICAgICAgdGV4dCxcbiAgICAgIGVsZW1lbnQsXG4gICAgICB0YWdOYW1lLFxuICAgICAga2V5VmFsdWVEaWN0aW9uYXJ5W2xvY2F0aW9uc0tleVZhbF0sXG4gICAgICAhY2FzZVNlbnNpdGl2ZVxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29uc3RhbnQodGV4dCwgZWxlbWVudCwgdGFnTmFtZSwga2V5VmFsdWVQYWlycywgY2FzZVNlbnNpdGl2ZSkge1xuICBjb25zdCBbbWF0Y2hlZFdvcmQsIGNvcnJlY3RlZFdvcmRdID1cbiAgICBjYXNlU2Vuc2l0aXZlID09PSB0cnVlXG4gICAgICA/IGdldENhc2VTZW5zaXRpdmVNYXRjaGluZ0FuZENvcnJlY3RlZFdvcmRzKHRleHQsIGtleVZhbHVlUGFpcnMpXG4gICAgICA6IGdldENhc2VJbnNlbnNpdGl2ZU1hdGNoaW5nQW5kQ29ycmVjdGVkV29yZHModGV4dCwga2V5VmFsdWVQYWlycyk7XG5cbiAgaWYgKG1hdGNoZWRXb3JkICE9PSAnJykge1xuICAgIGlmIChtYXRjaGVkV29yZCAhPT0gY29ycmVjdGVkV29yZCkge1xuICAgICAgY29uc3QgdXBkYXRlZFN0ciA9IGdldFVwZGF0ZWRTdHJpbmcodGV4dCwgbWF0Y2hlZFdvcmQsIGNvcnJlY3RlZFdvcmQpO1xuICAgICAgc2V0VGV4dChlbGVtZW50LCB0YWdOYW1lLCB1cGRhdGVkU3RyLCBmYWxzZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRDYXBpdGFsaXNlRm9ySSh0ZXh0KSB7XG4gIGNvbnN0IHJlZ2V4ID0gL1xccytpKFxccyt8JykkLztcbiAgY29uc3QgbWF0Y2hlcyA9IHJlZ2V4LnRlc3QodGV4dCk7XG5cbiAgcmV0dXJuIG1hdGNoZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTaG91bGRDYXBpdGFsaXNlT3B0aW9uKG9wdGlvbk5hbWUsIHZhbHVlKSB7XG4gIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgb3B0aW9uc0RpY3Rpb25hcnlbb3B0aW9uTmFtZV0gPSB2YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0S2V5VmFsdWUoa2V5VmFsdWVOYW1lLCB2YWx1ZSkge1xuICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgIGtleVZhbHVlRGljdGlvbmFyeVtrZXlWYWx1ZU5hbWVdID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZENhcGl0YWxpc2UodGV4dCkge1xuICBjb25zdCBtdWx0aWxpbmVSZWdleCA9IC9cXHMqXFxuK1xccypcXHckLztcbiAgbGV0IG1hdGNoZXMgPSBtdWx0aWxpbmVSZWdleC50ZXN0KHRleHQpO1xuXG4gIGlmIChtYXRjaGVzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBzZW50ZW5jZVJlZ2V4ID0gL1xcdytcXHMqXFxXPyhbLj8hXSkrXFxzK1xcdyQvO1xuICBtYXRjaGVzID0gc2VudGVuY2VSZWdleC50ZXN0KHRleHQpO1xuXG4gIGlmICghbWF0Y2hlcykge1xuICAgIHJldHVybiB0ZXh0Lmxlbmd0aCA9PSAxO1xuICB9XG5cbiAgcmV0dXJuIG1hdGNoZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYXNlSW5zZW5zaXRpdmVNYXRjaGluZ0FuZENvcnJlY3RlZFdvcmRzKFxuICB0ZXh0LFxuICBrZXlWYWx1ZVBhaXJzXG4pIHtcbiAgcmV0dXJuIGdldE1hdGNoaW5nQW5kQ29ycmVjdGVkV29yZHMoXG4gICAgdGV4dCxcbiAgICBrZXlWYWx1ZVBhaXJzLFxuICAgIHdvcmRzVG9FeGNsdWRlLFxuICAgIHRydWVcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhc2VTZW5zaXRpdmVNYXRjaGluZ0FuZENvcnJlY3RlZFdvcmRzKHRleHQsIGtleVZhbHVlUGFpcnMpIHtcbiAgcmV0dXJuIGdldE1hdGNoaW5nQW5kQ29ycmVjdGVkV29yZHMoXG4gICAgdGV4dCxcbiAgICBrZXlWYWx1ZVBhaXJzLFxuICAgIHdvcmRzVG9FeGNsdWRlLFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRjaGluZ0FuZENvcnJlY3RlZFdvcmRzKFxuICB0ZXh0LFxuICBrZXlWYWx1ZVBhaXJzLFxuICB3b3Jkc1RvRXhjbHVkZSxcbiAgY2FzZUluc2Vuc2l0aXZlXG4pIHtcbiAgY29uc3QgbGFzdFdvcmRSZWdleCA9IC8oXFwuP1xcdyspKFteXFx3LV0pJC87XG5cbiAgbGV0IG1hdGNoID0gbGFzdFdvcmRSZWdleC5leGVjKHRleHQpO1xuICBjb25zdCBub01hdGNoID0gWycnLCAnJ107XG5cbiAgaWYgKG1hdGNoKSB7XG4gICAgY29uc3QgbWF0Y2hlZFdvcmQgPSBtYXRjaFsxXTtcblxuICAgIGlmIChtYXRjaGVkV29yZCAhPSBudWxsKSB7XG4gICAgICBpZiAod29yZHNUb0V4Y2x1ZGUuaW5jbHVkZXMobWF0Y2hlZFdvcmQudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgcmV0dXJuIG5vTWF0Y2g7XG4gICAgICB9XG5cbiAgICAgIGxldCBjb3JyZWN0ZWRXb3JkID0gZ2V0Q29ycmVjdGVkV29yZChcbiAgICAgICAgY2FzZUluc2Vuc2l0aXZlLFxuICAgICAgICBtYXRjaGVkV29yZCxcbiAgICAgICAga2V5VmFsdWVQYWlyc1xuICAgICAgKTtcblxuICAgICAgaWYgKGNvcnJlY3RlZFdvcmQgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gW21hdGNoZWRXb3JkLCBjb3JyZWN0ZWRXb3JkXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbm9NYXRjaDtcbn1cblxuZnVuY3Rpb24gZ2V0Q29ycmVjdGVkV29yZChjYXNlSW5zZW5zaXRpdmUsIG1hdGNoZWRXb3JkLCBrZXlWYWx1ZVBhaXJzKSB7XG4gIHJldHVybiBjYXNlSW5zZW5zaXRpdmUgPT09IHRydWVcbiAgICA/IGtleVZhbHVlUGFpcnNbbWF0Y2hlZFdvcmQudG9Mb3dlckNhc2UoKV1cbiAgICA6IGtleVZhbHVlUGFpcnNbbWF0Y2hlZFdvcmRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xuICBjb25zb2xlLmxvZyhlcnJvcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0KGh0bWxDb250cm9sLCB0YWdOYW1lKSB7XG4gIGlmIChcbiAgICB0YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdJTlBVVCcgfHxcbiAgICB0YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdURVhUQVJFQSdcbiAgKSB7XG4gICAgcmV0dXJuIGh0bWxDb250cm9sLnZhbHVlID8gaHRtbENvbnRyb2wudmFsdWUgOiAnJztcbiAgfVxuXG4gIGlmIChcbiAgICBodG1sQ29udHJvbC5pbm5lckhUTUwgJiZcbiAgICBjb250ZW50RWRpdGFibGVUYWdzLmluY2x1ZGVzKHRhZ05hbWUudG9VcHBlckNhc2UoKSlcbiAgKSB7XG4gICAgcmV0dXJuIGdldFRleHRGb3JTcGFuVGFnKGh0bWxDb250cm9sLmlubmVySFRNTCk7XG4gIH1cblxuICByZXR1cm4gaHRtbENvbnRyb2wuaW5uZXJIVE1MID8gaHRtbENvbnRyb2wuaW5uZXJIVE1MIDogJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0Rm9yU3BhblRhZyh0ZXh0KSB7XG4gIGlmICh0ZXh0ICYmIGdldE5ic3BDb3VudCh0ZXh0KSA9PT0gMSkge1xuICAgIGxldCByZXN1bHQgPSByZXBsYWNlTGFzdE9jY3VycmVuY2VJblN0cmluZyh0ZXh0LCBuYnNwLCAnICcpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gdGV4dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VMYXN0T2NjdXJyZW5jZUluU3RyaW5nKFxuICBvcmlnaW5hbFRleHQsXG4gIHRleHRUb01hdGNoLFxuICByZXBsYWNlbWVudFxuKSB7XG4gIHJldHVybiBvcmlnaW5hbFRleHQucmVwbGFjZShuZXcgUmVnRXhwKHRleHRUb01hdGNoICsgJyQnKSwgcmVwbGFjZW1lbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmJzcENvdW50KHRleHQpIHtcbiAgcmV0dXJuICh0ZXh0Lm1hdGNoKG5ldyBSZWdFeHAobmJzcCwgJ2cnKSkgfHwgW10pLmxlbmd0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRleHQoaHRtbENvbnRyb2wsIHRhZ05hbWUsIHVwZGF0ZWRTdHIsIHNob3VsZEFwcGVuZEJyKSB7XG4gIGlmIChcbiAgICB0YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdJTlBVVCcgfHxcbiAgICB0YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdURVhUQVJFQSdcbiAgKSB7XG4gICAgaHRtbENvbnRyb2wudmFsdWUgPSB1cGRhdGVkU3RyO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChjb250ZW50RWRpdGFibGVUYWdzLmluY2x1ZGVzKHRhZ05hbWUudG9VcHBlckNhc2UoKSkpIHtcbiAgICB1cGRhdGVkU3RyID0gcmVwbGFjZUxhc3RPY2N1cnJlbmNlSW5TdHJpbmcodXBkYXRlZFN0ciwgJyAnLCBuYnNwKTtcbiAgfVxuXG4gIGlmIChzaG91bGRBcHBlbmRCcikge1xuICAgIHVwZGF0ZWRTdHIgKz0gJzxicj4nO1xuICB9XG5cbiAgaHRtbENvbnRyb2wuaW5uZXJIVE1MID0gdXBkYXRlZFN0cjtcbiAgc2V0RW5kT2ZDb250ZW50ZWRpdGFibGUoaHRtbENvbnRyb2wpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGaXJzdFRleHRPZkVkaXRhYmxlVGV4dE5vZGUobm9kZSkge1xuICBjb25zdCBkYXRhID0gbm9kZS5kYXRhO1xuICBjb25zdCB0ZXh0Tm9kZSA9ICcjdGV4dCc7XG5cbiAgaWYgKFxuICAgIG5vZGUubm9kZU5hbWUgPT09IHRleHROb2RlICYmXG4gICAgZGF0YS5sZW5ndGggPT09IDEgJiZcbiAgICBkYXRhLnRvVXBwZXJDYXNlKCkgIT0gZGF0YSAmJlxuICAgIHNob3VsZENhcGl0YWxpc2VDb250ZW50KG5vZGUucGFyZW50Tm9kZSlcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRFbmRPZkNvbnRlbnRlZGl0YWJsZShjb250ZW50RWRpdGFibGVFbGVtZW50KSB7XG4gIGxldCByYW5nZSwgc2VsZWN0aW9uO1xuICBpZiAoZG9jdW1lbnQuY3JlYXRlUmFuZ2UpIHtcbiAgICAvL0ZpcmVmb3gsIENocm9tZSwgT3BlcmEsIFNhZmFyaSwgSUUgOStcbiAgICByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7IC8vQ3JlYXRlIGEgcmFuZ2UgKGEgcmFuZ2UgaXMgYSBsaWtlIHRoZSBzZWxlY3Rpb24gYnV0IGludmlzaWJsZSlcbiAgICBjb25zdCBjaGlsZE5vZGVzID0gY29udGVudEVkaXRhYmxlRWxlbWVudC5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXMgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgY2hpbGROb2RlID1cbiAgICAgIGNoaWxkTm9kZXMubGVuZ3RoID09IDFcbiAgICAgICAgPyBjaGlsZE5vZGVzWzBdXG4gICAgICAgIDogY2hpbGROb2Rlc1tjaGlsZE5vZGVzLmxlbmd0aCAtIDJdO1xuICAgIC8vIGNoaWxkTm9kZXMuZm9yRWFjaCh4PT5jb25zb2xlLmxvZyh4Lm91dGVySFRNTCkpO1xuXG4gICAgaWYgKGNoaWxkTm9kZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZS5ub2RlTmFtZSA9PT0gJyN0ZXh0Jykge1xuICAgICAgcmFuZ2Uuc2V0U3RhcnQoY2hpbGROb2RlLCBjaGlsZE5vZGUuZGF0YS5sZW5ndGgpO1xuICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAoY2hpbGROb2RlLm91dGVySFRNTCA9PT0gJzxicj4nKSB7XG4gICAgICByYW5nZS5zZXRTdGFydChjaGlsZE5vZGUsIDApO1xuICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhjb250ZW50RWRpdGFibGVFbGVtZW50KTsgLy9TZWxlY3QgdGhlIGVudGlyZSBjb250ZW50cyBvZiB0aGUgZWxlbWVudCB3aXRoIHRoZSByYW5nZVxuICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpOyAvL2NvbGxhcHNlIHRoZSByYW5nZSB0byB0aGUgZW5kIHBvaW50LiBmYWxzZSBtZWFucyBjb2xsYXBzZSB0byBlbmQgcmF0aGVyIHRoYW4gdGhlIHN0YXJ0XG4gICAgfVxuXG4gICAgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpOyAvL2dldCB0aGUgc2VsZWN0aW9uIG9iamVjdCAoYWxsb3dzIHlvdSB0byBjaGFuZ2Ugc2VsZWN0aW9uKVxuICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTsgLy9yZW1vdmUgYW55IHNlbGVjdGlvbnMgYWxyZWFkeSBtYWRlXG4gICAgc2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTsgLy9tYWtlIHRoZSByYW5nZSB5b3UgaGF2ZSBqdXN0IGNyZWF0ZWQgdGhlIHZpc2libGUgc2VsZWN0aW9uXG4gIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uKSB7XG4gICAgLy9JRSA4IGFuZCBsb3dlclxuICAgIHJhbmdlID0gZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTsgLy9DcmVhdGUgYSByYW5nZSAoYSByYW5nZSBpcyBhIGxpa2UgdGhlIHNlbGVjdGlvbiBidXQgaW52aXNpYmxlKVxuICAgIHJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KGNvbnRlbnRFZGl0YWJsZUVsZW1lbnQpOyAvL1NlbGVjdCB0aGUgZW50aXJlIGNvbnRlbnRzIG9mIHRoZSBlbGVtZW50IHdpdGggdGhlIHJhbmdlXG4gICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpOyAvL2NvbGxhcHNlIHRoZSByYW5nZSB0byB0aGUgZW5kIHBvaW50LiBmYWxzZSBtZWFucyBjb2xsYXBzZSB0byBlbmQgcmF0aGVyIHRoYW4gdGhlIHN0YXJ0XG4gICAgcmFuZ2Uuc2VsZWN0KCk7IC8vU2VsZWN0IHRoZSByYW5nZSAobWFrZSBpdCB0aGUgdmlzaWJsZSBzZWxlY3Rpb25cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXBkYXRlZFN0cmluZyh0ZXh0LCBtYXRjaGVkV29yZCwgY29ycmVjdGVkV29yZCkge1xuICBpZiAodGV4dCAmJiBtYXRjaGVkV29yZCAmJiBjb3JyZWN0ZWRXb3JkKSB7XG4gICAgY29uc3Qgc3BsaXRBdCA9IChpbmRleCkgPT4gKHgpID0+IFt4LnNsaWNlKDAsIGluZGV4KSwgeC5zbGljZShpbmRleCldO1xuICAgIGNvbnN0IGFyciA9IHNwbGl0QXQoLTEpKHRleHQpO1xuXG4gICAgY29uc3QgdXBkYXRlZFN0ciA9XG4gICAgICBhcnJbMF0ucmVwbGFjZShuZXcgUmVnRXhwKG1hdGNoZWRXb3JkICsgJyQnKSwgY29ycmVjdGVkV29yZCkgKyBhcnJbMV07XG4gICAgcmV0dXJuIHVwZGF0ZWRTdHI7XG4gIH1cblxuICByZXR1cm4gdGV4dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhcGl0YWxpc2VkQ29udGVudEZvckkodGV4dCkge1xuICBjb25zdCBsYXN0VHdvQ2hhcnMgPSB0ZXh0LnNsaWNlKC0yKTtcbiAgY29uc3QgdXBkYXRlZFN0ciA9XG4gICAgdGV4dC5zdWJzdHIoMCwgdGV4dC5sZW5ndGggLSAyKSArIGxhc3RUd29DaGFycy50b1VwcGVyQ2FzZSgpO1xuICByZXR1cm4gdXBkYXRlZFN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhcGl0YWxpc2VkQ29udGVudCh0ZXh0KSB7XG4gIGNvbnN0IGxhc3RDaGFyID0gdGV4dC5zbGljZSgtMSk7XG4gIGNvbnN0IHVwZGF0ZWRTdHIgPSB0ZXh0LnN1YnN0cigwLCB0ZXh0Lmxlbmd0aCAtIDEpICsgbGFzdENoYXIudG9VcHBlckNhc2UoKTtcbiAgcmV0dXJuIHVwZGF0ZWRTdHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnRlbnRFZGl0YWJsZShlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQuaXNDb250ZW50RWRpdGFibGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJlZEVsZW1lbnRzKGFkZGVkTm9kZXMsIHRhZ05hbWUpIHtcbiAgcmV0dXJuICQoYWRkZWROb2RlcykuZmluZCh0YWdOYW1lKS5hZGRCYWNrKHRhZ05hbWUpOyAvLyBmaW5kcyBlaXRoZXIgYWRkZWQgYWxvbmUgb3IgYXMgdHJlZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkQ2FwaXRhbGlzZUNvbnRlbnQoZWxlbWVudCkge1xuICByZXR1cm4gaXNDb250ZW50RWRpdGFibGUoZWxlbWVudCkgJiYgIWNvbnRhaW5zSHRtbENvbnRlbnQoZWxlbWVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VkaXRhYmxlRWxlbWVudChlbGVtZW50LCB0YWdOYW1lKSB7XG4gIHJldHVybiAoXG4gICAgZWxlbWVudC5pc0NvbnRlbnRFZGl0YWJsZSB8fFxuICAgIHRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0lOUFVUJyB8fFxuICAgIHRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1RFWFRBUkVBJ1xuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnNIdG1sQ29udGVudChlbGVtZW50KSB7XG4gIGNvbnN0IGNvbnRlbnQgPSAkKGVsZW1lbnQpLmh0bWwoKTtcblxuICBjb25zdCBiclJlZ2V4ID0gL1xccyo8YnI+LztcbiAgLy9mb3IgZ21haWxcbiAgaWYgKGNvbnRlbnQgJiYgYnJSZWdleC50ZXN0KGNvbnRlbnQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcmVnZXggPSAvPFxcLz9bYS16XVtcXHNcXFNdKj4vaTtcbiAgY29uc3QgaGFzSHRtbFRhZyA9IHJlZ2V4LnRlc3QoY29udGVudCk7XG4gIHJldHVybiBoYXNIdG1sVGFnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0V29yZHNUb0V4Y2x1ZGUodmFsdWUpIHtcbiAgaWYgKHZhbHVlKSB7XG4gICAgd29yZHNUb0V4Y2x1ZGUgPSB2YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlT3B0aW9uc1ZhbHVlKGNoYW5nZXMsIHZhcmlhYmxlTmFtZSkge1xuICBpZiAoY2hhbmdlc1t2YXJpYWJsZU5hbWVdICE9IG51bGwpIHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGNoYW5nZXNbdmFyaWFibGVOYW1lXS5uZXdWYWx1ZTtcblxuICAgIGlmIChuZXdWYWx1ZSAhPSBudWxsKSB7XG4gICAgICBzZXRTaG91bGRDYXBpdGFsaXNlT3B0aW9uKHZhcmlhYmxlTmFtZSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXyg1NjUpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1NTUpO1xuIl0sIm5hbWVzIjpbImdsb2JhbFRoaXMiLCJzZWxmIiwibW9kdWxlIiwiYnJvd3NlciIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwicHJvdG90eXBlIiwiQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFIiwiU0VORF9SRVNQT05TRV9ERVBSRUNBVElPTl9XQVJOSU5HIiwid3JhcEFQSXMiLCJleHRlbnNpb25BUElzIiwiYXBpTWV0YWRhdGEiLCJrZXlzIiwibGVuZ3RoIiwiRXJyb3IiLCJEZWZhdWx0V2Vha01hcCIsIldlYWtNYXAiLCJjb25zdHJ1Y3RvciIsImNyZWF0ZUl0ZW0iLCJpdGVtcyIsInN1cGVyIiwidGhpcyIsImdldCIsImtleSIsImhhcyIsInNldCIsIm1ha2VDYWxsYmFjayIsInByb21pc2UiLCJtZXRhZGF0YSIsImNhbGxiYWNrQXJncyIsInJ1bnRpbWUiLCJsYXN0RXJyb3IiLCJyZWplY3QiLCJtZXNzYWdlIiwic2luZ2xlQ2FsbGJhY2tBcmciLCJyZXNvbHZlIiwicGx1cmFsaXplQXJndW1lbnRzIiwibnVtQXJncyIsIndyYXBNZXRob2QiLCJ0YXJnZXQiLCJtZXRob2QiLCJ3cmFwcGVyIiwiUHJveHkiLCJhcHBseSIsInRhcmdldE1ldGhvZCIsInRoaXNPYmoiLCJhcmdzIiwiY2FsbCIsImhhc093blByb3BlcnR5IiwiRnVuY3Rpb24iLCJiaW5kIiwid3JhcE9iamVjdCIsIndyYXBwZXJzIiwiY2FjaGUiLCJjcmVhdGUiLCJoYW5kbGVycyIsInByb3h5VGFyZ2V0IiwicHJvcCIsInJlY2VpdmVyIiwidmFsdWUiLCJuYW1lIiwibWluQXJncyIsIm1heEFyZ3MiLCJQcm9taXNlIiwiZmFsbGJhY2tUb05vQ2FsbGJhY2siLCJjYkVycm9yIiwiY29uc29sZSIsIndhcm4iLCJub0NhbGxiYWNrIiwid3JhcEFzeW5jRnVuY3Rpb24iLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJkZXNjIiwiUmVmbGVjdCIsImRlbGV0ZVByb3BlcnR5Iiwid3JhcEV2ZW50Iiwid3JhcHBlck1hcCIsImFkZExpc3RlbmVyIiwibGlzdGVuZXIiLCJoYXNMaXN0ZW5lciIsInJlbW92ZUxpc3RlbmVyIiwib25SZXF1ZXN0RmluaXNoZWRXcmFwcGVycyIsInJlcSIsIndyYXBwZWRSZXEiLCJnZXRDb250ZW50IiwibG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nIiwib25NZXNzYWdlV3JhcHBlcnMiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJ3cmFwcGVkU2VuZFJlc3BvbnNlIiwicmVzdWx0IiwiZGlkQ2FsbFNlbmRSZXNwb25zZSIsInNlbmRSZXNwb25zZVByb21pc2UiLCJyZXNwb25zZSIsInN0YWNrIiwiZXJyIiwiaXNSZXN1bHRUaGVuYWJsZSIsInRoZW4iLCJtc2ciLCJlcnJvciIsIl9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXyIsImNhdGNoIiwid3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2siLCJyZXBseSIsIndyYXBwZWRTZW5kTWVzc2FnZSIsImFwaU5hbWVzcGFjZU9iaiIsIndyYXBwZWRDYiIsInB1c2giLCJzZW5kTWVzc2FnZSIsInN0YXRpY1dyYXBwZXJzIiwiZGV2dG9vbHMiLCJuZXR3b3JrIiwib25SZXF1ZXN0RmluaXNoZWQiLCJvbk1lc3NhZ2UiLCJvbk1lc3NhZ2VFeHRlcm5hbCIsInRhYnMiLCJzZXR0aW5nTWV0YWRhdGEiLCJjbGVhciIsInByaXZhY3kiLCJzZXJ2aWNlcyIsIndlYnNpdGVzIiwiY2hyb21lIiwiaWQiLCJleHBvcnRzIiwiZXJyb3JNc2ciLCJzaXRlc1RvRXhjbHVkZSIsImhvb2t1cEV2ZW50SGFuZGxlcnMiLCJjb250ZW50RWRpdGFibGVUYWdzIiwiaW5wdXRUYWdzIiwiY29uZmlnIiwiJCIsIm9uIiwiZXZlbnQiLCJjYXBpdGFsaXNlVGV4dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJjaGFyYWN0ZXJEYXRhIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsImNoYXJhY3RlckRhdGFNdXRhdGlvbnMiLCJsaXN0IiwibG9nIiwiZWFjaCIsIl9pIiwibXV0YXRpb24iLCJ0eXBlIiwiaW5jbHVkZXMiLCJub2RlTmFtZSIsImFkZGVkTm9kZXMiLCJmb3JFYWNoIiwibm9kZSIsInBhcmVudE5vZGUiLCJmaWx0ZXIiLCJhZGRlZE5vZGUiLCJ0YWdOYW1lIiwiZmlsdGVyZWRFbHMiLCJfaW5kZXgiLCJlbGVtZW50IiwiaSIsImUiLCJpbkFycmF5Iiwib2JzZXJ2ZSIsImlmcmFtZSIsImNvbnRlbnRzIiwiZmluZCIsIl8iLCJpdGVtIiwic2l0ZXNUb0lnbm9yZSIsInNob3VsZENhcGl0YWxpc2VJIiwic2hvdWxkQ2FwaXRhbGlzZU5hbWVzIiwic2hvdWxkQ2FwaXRhbGlzZUFiYnJldmlhdGlvbnMiLCJzaG91bGRDYXBpdGFsaXNlTG9jYXRpb25zIiwic2V0T3B0aW9ucyIsImNvbnN0YW50c0tleVZhbCIsIm5hbWVzS2V5VmFsIiwiYWJicmV2aWF0aW9uc0tleVZhbCIsImxvY2F0aW9uc0tleVZhbCIsIndvcmRzVG9FeGNsdWRlIiwic2V0S2V5VmFsdWVzIiwiY3VycmVudFVybERvbWFpbiIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwic2hvdWxkRW5hYmxlQ2FwaXRhbGlzaW5nT25DdXJyZW50U2l0ZSIsInNpdGVUb0V4Y2x1ZGUiLCJjaGFuZ2VzIiwiYXJlYU5hbWUiLCJuZXdWYWx1ZSIsInBsdWdpbk5hbWVzcGFjZSIsIm9wdGlvbnNEaWN0aW9uYXJ5Iiwia2V5VmFsdWVEaWN0aW9uYXJ5IiwibmJzcCIsInNob3VsZENhcGl0YWxpc2UiLCJzaG91bGRDYXBpdGFsaXNlRm9ySSIsImdldFRleHQiLCJzZXRUZXh0IiwiaXNDb250ZW50RWRpdGFibGUiLCJ0b1VwcGVyQ2FzZSIsImlzRWRpdGFibGVFbGVtZW50IiwidGV4dCIsImxhc3RDaGFyIiwidHJpbSIsInNsaWNlIiwiaXNMYXN0Q2hhckFuQWxwaGFiZXQiLCJtYXRjaCIsInNob3VsZEFwcGVuZEJyIiwidXBkYXRlZFN0ciIsInN1YnN0ciIsImdldENhcGl0YWxpc2VkQ29udGVudCIsImxhc3RUd29DaGFycyIsImdldENhcGl0YWxpc2VkQ29udGVudEZvckkiLCJ1cGRhdGVDb25zdGFudCIsImtleVZhbHVlUGFpcnMiLCJjYXNlU2Vuc2l0aXZlIiwibWF0Y2hlZFdvcmQiLCJjb3JyZWN0ZWRXb3JkIiwiZ2V0TWF0Y2hpbmdBbmRDb3JyZWN0ZWRXb3JkcyIsImdldENhc2VTZW5zaXRpdmVNYXRjaGluZ0FuZENvcnJlY3RlZFdvcmRzIiwiZ2V0Q2FzZUluc2Vuc2l0aXZlTWF0Y2hpbmdBbmRDb3JyZWN0ZWRXb3JkcyIsImFyciIsIngiLCJyZXBsYWNlIiwiUmVnRXhwIiwiZ2V0VXBkYXRlZFN0cmluZyIsInRlc3QiLCJzZXRTaG91bGRDYXBpdGFsaXNlT3B0aW9uIiwib3B0aW9uTmFtZSIsInNldEtleVZhbHVlIiwia2V5VmFsdWVOYW1lIiwibWF0Y2hlcyIsImNhc2VJbnNlbnNpdGl2ZSIsImV4ZWMiLCJub01hdGNoIiwidG9Mb3dlckNhc2UiLCJnZXRDb3JyZWN0ZWRXb3JkIiwib25FcnJvciIsImh0bWxDb250cm9sIiwiaW5uZXJIVE1MIiwiZ2V0TmJzcENvdW50IiwicmVwbGFjZUxhc3RPY2N1cnJlbmNlSW5TdHJpbmciLCJvcmlnaW5hbFRleHQiLCJ0ZXh0VG9NYXRjaCIsInJlcGxhY2VtZW50IiwiY29udGVudEVkaXRhYmxlRWxlbWVudCIsInJhbmdlIiwic2VsZWN0aW9uIiwiY3JlYXRlUmFuZ2UiLCJjaGlsZE5vZGVzIiwiY2hpbGROb2RlIiwic2V0U3RhcnQiLCJkYXRhIiwiY29sbGFwc2UiLCJvdXRlckhUTUwiLCJzZWxlY3ROb2RlQ29udGVudHMiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJhZGRSYW5nZSIsImJvZHkiLCJjcmVhdGVUZXh0UmFuZ2UiLCJtb3ZlVG9FbGVtZW50VGV4dCIsInNlbGVjdCIsInNldEVuZE9mQ29udGVudGVkaXRhYmxlIiwiaXNGaXJzdFRleHRPZkVkaXRhYmxlVGV4dE5vZGUiLCJzaG91bGRDYXBpdGFsaXNlQ29udGVudCIsImdldEZpbHRlcmVkRWxlbWVudHMiLCJhZGRCYWNrIiwiY29udGVudCIsImh0bWwiLCJjb250YWluc0h0bWxDb250ZW50Iiwic2V0V29yZHNUb0V4Y2x1ZGUiLCJ0b2dnbGVPcHRpb25zVmFsdWUiLCJ2YXJpYWJsZU5hbWUiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJ1bmRlZmluZWQiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwibiIsImdldHRlciIsIl9fZXNNb2R1bGUiLCJkIiwiYSIsImRlZmluaXRpb24iLCJvIiwib2JqIl0sInNvdXJjZVJvb3QiOiIifQ==
