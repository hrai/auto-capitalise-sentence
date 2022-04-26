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
                  class a extends WeakMap {
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
                  const t =
                      (r, s) =>
                      (...n) => {
                        e.runtime.lastError
                          ? r.reject(new Error(e.runtime.lastError.message))
                          : s.singleCallbackArg ||
                            (n.length <= 1 && !1 !== s.singleCallbackArg)
                          ? r.resolve(n[0])
                          : r.resolve(n);
                      },
                    g = (e) => (1 == e ? 'argument' : 'arguments'),
                    o = (e, r, s) =>
                      new Proxy(r, { apply: (r, n, a) => s.call(n, e, ...a) });
                  let m = Function.call.bind(Object.prototype.hasOwnProperty);
                  const i = (e, r = {}, s = {}) => {
                      let n = Object.create(null),
                        a = {
                          has: (r, s) => s in e || s in n,
                          get(a, A, l) {
                            if (A in n) return n[A];
                            if (!(A in e)) return;
                            let c = e[A];
                            if ('function' == typeof c)
                              if ('function' == typeof r[A])
                                c = o(e, e[A], r[A]);
                              else if (m(s, A)) {
                                let r = ((e, r) =>
                                  function (s, ...n) {
                                    if (n.length < r.minArgs)
                                      throw new Error(
                                        `Expected at least ${r.minArgs} ${g(
                                          r.minArgs
                                        )} for ${e}(), got ${n.length}`
                                      );
                                    if (n.length > r.maxArgs)
                                      throw new Error(
                                        `Expected at most ${r.maxArgs} ${g(
                                          r.maxArgs
                                        )} for ${e}(), got ${n.length}`
                                      );
                                    return new Promise((a, g) => {
                                      if (r.fallbackToNoCallback)
                                        try {
                                          s[e](
                                            ...n,
                                            t({ resolve: a, reject: g }, r)
                                          );
                                        } catch (t) {
                                          console.warn(
                                            `${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,
                                            t
                                          ),
                                            s[e](...n),
                                            (r.fallbackToNoCallback = !1),
                                            (r.noCallback = !0),
                                            a();
                                        }
                                      else
                                        r.noCallback
                                          ? (s[e](...n), a())
                                          : s[e](
                                              ...n,
                                              t({ resolve: a, reject: g }, r)
                                            );
                                    });
                                  })(A, s[A]);
                                c = o(e, e[A], r);
                              } else c = c.bind(e);
                            else if (
                              'object' == typeof c &&
                              null !== c &&
                              (m(r, A) || m(s, A))
                            )
                              c = i(c, r[A], s[A]);
                            else {
                              if (!m(s, '*'))
                                return (
                                  Object.defineProperty(n, A, {
                                    configurable: !0,
                                    enumerable: !0,
                                    get: () => e[A],
                                    set(r) {
                                      e[A] = r;
                                    },
                                  }),
                                  c
                                );
                              c = i(c, r[A], s['*']);
                            }
                            return (n[A] = c), c;
                          },
                          set: (r, s, a, t) => (
                            s in n ? (n[s] = a) : (e[s] = a), !0
                          ),
                          defineProperty: (e, r, s) =>
                            Reflect.defineProperty(n, r, s),
                          deleteProperty: (e, r) =>
                            Reflect.deleteProperty(n, r),
                        },
                        A = Object.create(e);
                      return new Proxy(A, a);
                    },
                    A = (e) => ({
                      addListener(r, s, ...n) {
                        r.addListener(e.get(s), ...n);
                      },
                      hasListener: (r, s) => r.hasListener(e.get(s)),
                      removeListener(r, s) {
                        r.removeListener(e.get(s));
                      },
                    }),
                    l = new a((e) =>
                      'function' != typeof e
                        ? e
                        : function (r) {
                            const s = i(
                              r,
                              {},
                              { getContent: { minArgs: 0, maxArgs: 0 } }
                            );
                            e(s);
                          }
                    );
                  let c = !1;
                  const x = new a((e) =>
                      'function' != typeof e
                        ? e
                        : function (r, n, a) {
                            let t,
                              g,
                              o = !1,
                              m = new Promise((e) => {
                                t = function (r) {
                                  c ||
                                    (console.warn(s, new Error().stack),
                                    (c = !0)),
                                    (o = !0),
                                    e(r);
                                };
                              });
                            try {
                              g = e(r, n, t);
                            } catch (e) {
                              g = Promise.reject(e);
                            }
                            const i =
                              !0 !== g &&
                              (A = g) &&
                              'object' == typeof A &&
                              'function' == typeof A.then;
                            var A;
                            if (!0 !== g && !i && !o) return !1;
                            return (
                              (i ? g : m)
                                .then(
                                  (e) => {
                                    a(e);
                                  },
                                  (e) => {
                                    let r;
                                    (r =
                                      e &&
                                      (e instanceof Error ||
                                        'string' == typeof e.message)
                                        ? e.message
                                        : 'An unexpected error occurred'),
                                      a({
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
                    d = ({ reject: s, resolve: n }, a) => {
                      e.runtime.lastError
                        ? e.runtime.lastError.message === r
                          ? n()
                          : s(new Error(e.runtime.lastError.message))
                        : a && a.__mozWebExtensionPolyfillReject__
                        ? s(new Error(a.message))
                        : n(a);
                    },
                    u = (e, r, s, ...n) => {
                      if (n.length < r.minArgs)
                        throw new Error(
                          `Expected at least ${r.minArgs} ${g(
                            r.minArgs
                          )} for ${e}(), got ${n.length}`
                        );
                      if (n.length > r.maxArgs)
                        throw new Error(
                          `Expected at most ${r.maxArgs} ${g(
                            r.maxArgs
                          )} for ${e}(), got ${n.length}`
                        );
                      return new Promise((e, r) => {
                        const a = d.bind(null, { resolve: e, reject: r });
                        n.push(a), s.sendMessage(...n);
                      });
                    },
                    p = {
                      devtools: { network: { onRequestFinished: A(l) } },
                      runtime: {
                        onMessage: A(x),
                        onMessageExternal: A(x),
                        sendMessage: u.bind(null, 'sendMessage', {
                          minArgs: 1,
                          maxArgs: 3,
                        }),
                      },
                      tabs: {
                        sendMessage: u.bind(null, 'sendMessage', {
                          minArgs: 2,
                          maxArgs: 3,
                        }),
                      },
                    },
                    b = {
                      clear: { minArgs: 1, maxArgs: 1 },
                      get: { minArgs: 1, maxArgs: 1 },
                      set: { minArgs: 1, maxArgs: 1 },
                    };
                  return (
                    (n.privacy = {
                      network: { '*': b },
                      services: { '*': b },
                      websites: { '*': b },
                    }),
                    i(e, p, n)
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
      448: (e, r, s) => {
        'use strict';
        s.d(r, {
          Sp: () => n,
          W5: () => a,
          Xn: () => t,
          EI: () => g,
          Cp: () => o,
          T9: () => m,
          oG: () => i,
          c0: () => A,
          Nd: () => l,
          Fr: () => c,
          cs: () => x,
        });
        const n = 'auto-capitalise-extension',
          a = 'sitesToIgnore',
          t = 'wordsToExclude',
          g = 'shouldCapitaliseI',
          o = 'shouldCapitaliseNames',
          m = 'shouldCapitaliseAbbreviations',
          i = 'shouldCapitaliseLocations',
          A = 'constantsKeyVal',
          l = 'namesKeyVal',
          c = 'abbreviationsKeyVal',
          x = 'locationsKeyVal';
      },
    },
    r = {};
  function s(n) {
    var a = r[n];
    if (void 0 !== a) return a.exports;
    var t = (r[n] = { exports: {} });
    return e[n].call(t.exports, t, t.exports, s), t.exports;
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
    (() => {
      'use strict';
      var e = s(150),
        r = s.n(e),
        n = s(448);
      function a(e) {
        r()
          .storage.local.get(e)
          .then((r) => {
            const s = r[e];
            !0 === s || void 0 === s
              ? ($(`#${e}`).prop('checked', !0), g(e, !0))
              : ($(`#${e}`).prop('checked', !1), g(e, !1));
          });
      }
      function t(e) {
        $(document).on('change', `#${e}`, function (r) {
          $(r.target).prop('checked') ? g(e, !0) : g(e, !1);
        });
      }
      function g(e, s) {
        r().storage.local.set({ [e]: s });
      }
      function o() {
        var e = $('#sites').val();
        return e ? e.split('\n') : [];
      }
      r()
        .storage.local.get([n.W5, n.Xn])
        .then(
          function (e) {
            var r = e.sitesToIgnore;
            r && $('#sites').val(r.join('\n'));
            var s = e.wordsToExclude;
            s && $('#excluded_words_textbox').val(s.join('\n'));
          },
          function (e) {
            console.log(e);
          }
        ),
        $(document).on(`click.${n.Sp}`, '#ignoreSiteButton', function () {
          r()
            .tabs.query({ currentWindow: !0, active: !0 })
            .then((e) => {
              var s,
                n,
                a =
                  ((s = e[0].url),
                  ((n = document.createElement('a')).href = s),
                  n.hostname),
                t = o();
              t.push(a),
                r().storage.local.set({ sitesToIgnore: t }),
                $('#sites').val(t.join('\n')),
                $(this).prop('disabled', !0),
                $(this).val('Site added to ignore list');
            });
        }),
        $(document).on(`click.${n.Sp}`, '#submitButton', function () {
          var e = o();
          r().storage.local.set({ sitesToIgnore: e }),
            $(this).prop('disabled', !0),
            $(this).val('Saved');
        }),
        $(document).on(
          `click.${n.Sp}`,
          '#submitButtonExcludedWords',
          function () {
            var e,
              s = (e = $('#excluded_words_textbox').val()) ? e.split('\n') : [];
            r().storage.local.set({ wordsToExclude: s }),
              $(this).prop('disabled', !0),
              $(this).val('Saved');
          }
        ),
        a(n.EI),
        a(n.Cp),
        a(n.T9),
        a(n.oG),
        t(n.EI),
        t(n.Cp),
        t(n.T9),
        t(n.oG),
        $('#sites').on(`input.${n.Sp}`, function () {
          $('#submitButton').prop('disabled', !1);
        }),
        $('#excluded_words_textbox').on(`input.${n.Sp}`, function () {
          $('#submitButtonExcludedWords').prop('disabled', !1);
        });
    })(),
    (() => {
      'use strict';
      var e = s(448);
      e.EI, e.Cp, e.T9, e.oG, e.c0, e.Nd, e.Fr, e.cs;
    })();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQ3pCZ0csRUFBRXBJLE1BQU02SSxJQUFJLG1DQUloQlQsRUFBRUcsVUFBVUMsR0FBRyxTQUFTLE9BQW1CLGlCQUFpQixXQUMxRCxJQUFJa0IsRUFBUWYsSUFFWixzQkFBMEIsQ0FDeEJsQyxjQUFlaUQsSUFHakJ0QixFQUFFcEksTUFBTW9DLEtBQUssWUFBWSxHQUN6QmdHLEVBQUVwSSxNQUFNNkksSUFBSSxZQUdkVCxFQUFFRyxVQUFVQyxHQUNWLFNBQVMsT0FDVCw4QkFDQSxXQUNFLElBZ0VFbUIsRUFoRUVDLEdBZ0VGRCxFQUFjdkIsRUFBRSwyQkFBMkJTLE9BR2pDYyxFQUFZYixNQUFNLE1BSXpCLEdBckVMLHNCQUEwQixDQUN4QnBDLGVBQWdCa0QsSUFHbEJ4QixFQUFFcEksTUFBTW9DLEtBQUssWUFBWSxHQUN6QmdHLEVBQUVwSSxNQUFNNkksSUFBSSxZQUloQlosRUFBaUMsTUFDakNBLEVBQWlDLE1BQ2pDQSxFQUFpQyxNQUNqQ0EsRUFBaUMsTUFpQmpDSyxFQUFpQyxNQUNqQ0EsRUFBaUMsTUFDakNBLEVBQWlDLE1BQ2pDQSxFQUFpQyxNQXdDakNGLEVBQUUsVUFBVUksR0FBRyxTQUFTLFFBQW1CLFdBQ3pDSixFQUFFLGlCQUFpQmhHLEtBQUssWUFBWSxNQUd0Q2dHLEVBQUUsMkJBQTJCSSxHQUFHLFNBQVMsUUFBbUIsV0FDMURKLEVBQUUsOEJBQThCaEcsS0FBSyxZQUFZLE8sbUNDdEloRCxLQUNBLEtBQ0EsS0FDQSxLQUdBLEtBQ0EsS0FDQSxLQUNBLE0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXRvLWNhcGl0YWxpc2UtZXh0ZW5zaW9uLy4vbm9kZV9tb2R1bGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9kaXN0L2Jyb3dzZXItcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vYXV0by1jYXBpdGFsaXNlLWV4dGVuc2lvbi8uL3NyYy9wbHVnaW4tY29uc3RhbnRzLmpzIiwid2VicGFjazovL2F1dG8tY2FwaXRhbGlzZS1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXV0by1jYXBpdGFsaXNlLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9hdXRvLWNhcGl0YWxpc2UtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hdXRvLWNhcGl0YWxpc2UtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXV0by1jYXBpdGFsaXNlLWV4dGVuc2lvbi8uL3NyYy9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9hdXRvLWNhcGl0YWxpc2UtZXh0ZW5zaW9uLy4vc3JjL3V0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiLCBbXCJtb2R1bGVcIl0sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZmFjdG9yeShtb2R1bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QpO1xuICAgIGdsb2JhbC5icm93c2VyID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsVGhpcyA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgLyogd2ViZXh0ZW5zaW9uLXBvbHlmaWxsIC0gdjAuOC4wIC0gVHVlIEFwciAyMCAyMDIxIDExOjI3OjM4ICovXG5cbiAgLyogLSotIE1vZGU6IGluZGVudC10YWJzLW1vZGU6IG5pbDsganMtaW5kZW50LWxldmVsOiAyIC0qLSAqL1xuXG4gIC8qIHZpbTogc2V0IHN0cz0yIHN3PTIgZXQgdHc9ODA6ICovXG5cbiAgLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICAgKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gICAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICh0eXBlb2YgYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYnJvd3NlcikgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICBjb25zdCBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UgPSBcIlRoZSBtZXNzYWdlIHBvcnQgY2xvc2VkIGJlZm9yZSBhIHJlc3BvbnNlIHdhcyByZWNlaXZlZC5cIjtcbiAgICBjb25zdCBTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcgPSBcIlJldHVybmluZyBhIFByb21pc2UgaXMgdGhlIHByZWZlcnJlZCB3YXkgdG8gc2VuZCBhIHJlcGx5IGZyb20gYW4gb25NZXNzYWdlL29uTWVzc2FnZUV4dGVybmFsIGxpc3RlbmVyLCBhcyB0aGUgc2VuZFJlc3BvbnNlIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzcGVjcyAoU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3J1bnRpbWUvb25NZXNzYWdlKVwiOyAvLyBXcmFwcGluZyB0aGUgYnVsayBvZiB0aGlzIHBvbHlmaWxsIGluIGEgb25lLXRpbWUtdXNlIGZ1bmN0aW9uIGlzIGEgbWlub3JcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guIFNpbmNlIFNwaWRlcm1vbmtleSBkb2VzIG5vdCBmdWxseSBwYXJzZSB0aGVcbiAgICAvLyBjb250ZW50cyBvZiBhIGZ1bmN0aW9uIHVudGlsIHRoZSBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgc2luY2UgaXQgd2lsbFxuICAgIC8vIG5ldmVyIGFjdHVhbGx5IG5lZWQgdG8gYmUgY2FsbGVkLCB0aGlzIGFsbG93cyB0aGUgcG9seWZpbGwgdG8gYmUgaW5jbHVkZWRcbiAgICAvLyBpbiBGaXJlZm94IG5lYXJseSBmb3IgZnJlZS5cblxuICAgIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgICAvLyBKU09OIGZpbGUuXG4gICAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgKi9cblxuXG4gICAgICBjbGFzcyBEZWZhdWx0V2Vha01hcCBleHRlbmRzIFdlYWtNYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihjcmVhdGVJdGVtLCBpdGVtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1cGVyKGl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBjcmVhdGVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KGtleSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gY2FsbGVkLCB3aWxsIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICAgKiB0aGUgZ2l2ZW4gcHJvbWlzZSBiYXNlZCBvbiBob3cgaXQgaXMgY2FsbGVkOlxuICAgICAgICpcbiAgICAgICAqIC0gSWYsIHdoZW4gY2FsbGVkLCBgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yYCBjb250YWlucyBhIG5vbi1udWxsIG9iamVjdCxcbiAgICAgICAqICAgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGF0IHZhbHVlLlxuICAgICAgICogLSBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZXhhY3RseSBvbmUgYXJndW1lbnQsIHRoZSBwcm9taXNlIGlzXG4gICAgICAgKiAgIHJlc29sdmVkIHRvIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgdG8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlXG4gICAgICAgKiAgIGZ1bmN0aW9uJ3MgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9taXNlXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc29sdXRpb24gYW5kIHJlamVjdGlvbiBmdW5jdGlvbnMgb2YgYVxuICAgICAgICogICAgICAgIHByb21pc2UuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlc29sdmVcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlc29sdXRpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlamVjdFxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVqZWN0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIHdyYXBwZWQgbWV0aG9kIHdoaWNoIGhhcyBjcmVhdGVkIHRoZSBjYWxsYmFjay5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgICAqICAgICAgICBUaGUgZ2VuZXJhdGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnIHx8IGNhbGxiYWNrQXJncy5sZW5ndGggPD0gMSAmJiBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3NbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBwbHVyYWxpemVBcmd1bWVudHMgPSBudW1BcmdzID0+IG51bUFyZ3MgPT0gMSA/IFwiYXJndW1lbnRcIiA6IFwiYXJndW1lbnRzXCI7XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGZvciBhIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBtZXRhZGF0YS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAgICogICAgICAgIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgd2hpY2ggaXMgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWluQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtaW5pbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbXVzdCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5tYXhBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICAvLyBUaGlzIEFQSSBtZXRob2QgaGFzIGN1cnJlbnRseSBubyBjYWxsYmFjayBvbiBDaHJvbWUsIGJ1dCBpdCByZXR1cm4gYSBwcm9taXNlIG9uIEZpcmVmb3gsXG4gICAgICAgICAgICAgIC8vIGFuZCBzbyB0aGUgcG9seWZpbGwgd2lsbCB0cnkgdG8gY2FsbCBpdCB3aXRoIGEgY2FsbGJhY2sgZmlyc3QsIGFuZCBpdCB3aWxsIGZhbGxiYWNrXG4gICAgICAgICAgICAgIC8vIHRvIG5vdCBwYXNzaW5nIHRoZSBjYWxsYmFjayBpZiB0aGUgZmlyc3QgY2FsbCBmYWlscy5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChjYkVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IEFQSSBtZXRob2QgZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciwgYCArIFwiZmFsbGluZyBiYWNrIHRvIGNhbGwgaXQgd2l0aG91dCBhIGNhbGxiYWNrOiBcIiwgY2JFcnJvcik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpOyAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cblxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwTWV0aG9kID0gKHRhcmdldCwgbWV0aG9kLCB3cmFwcGVyKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkobWV0aG9kLCB7XG4gICAgICAgICAgYXBwbHkodGFyZ2V0TWV0aG9kLCB0aGlzT2JqLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlci5jYWxsKHRoaXNPYmosIHRhcmdldCwgLi4uYXJncyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICAgKi9cblxuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGdldChwcm94eVRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LiBDaGVjayBpZiB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAgIC8vIGFueSB3cmFwcGluZy5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwgZGVzYyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07IC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cblxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgICAqXG4gICAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBFdmVudCA9IHdyYXBwZXJNYXAgPT4gKHtcbiAgICAgICAgYWRkTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciwgLi4uYXJncykge1xuICAgICAgICAgIHRhcmdldC5hZGRMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lciksIC4uLmFyZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhbiBvblJlcXVlc3RGaW5pc2hlZCBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IHdpbGwgcmV0dXJuIGFcbiAgICAgICAgICogYGdldENvbnRlbnQoKWAgcHJvcGVydHkgd2hpY2ggcmV0dXJucyBhIGBQcm9taXNlYCByYXRoZXIgdGhhbiB1c2luZyBhXG4gICAgICAgICAqIGNhbGxiYWNrIEFQSS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgICAgICAgKiAgICAgICAgVGhlIEhBUiBlbnRyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXR3b3JrIHJlcXVlc3QuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uUmVxdWVzdEZpbmlzaGVkKHJlcSkge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRSZXEgPSB3cmFwT2JqZWN0KHJlcSwge31cbiAgICAgICAgICAvKiB3cmFwcGVycyAqL1xuICAgICAgICAgICwge1xuICAgICAgICAgICAgZ2V0Q29udGVudDoge1xuICAgICAgICAgICAgICBtaW5BcmdzOiAwLFxuICAgICAgICAgICAgICBtYXhBcmdzOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGlzdGVuZXIod3JhcHBlZFJlcSk7XG4gICAgICAgIH07XG4gICAgICB9KTsgLy8gS2VlcCB0cmFjayBpZiB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBoYXMgYmVlbiBsb2dnZWQgYXQgbGVhc3Qgb25jZS5cblxuICAgICAgbGV0IGxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyA9IGZhbHNlO1xuICAgICAgY29uc3Qgb25NZXNzYWdlV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBzIGEgbWVzc2FnZSBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IG1heSBzZW5kIHJlc3BvbnNlcyBiYXNlZCBvblxuICAgICAgICAgKiBpdHMgcmV0dXJuIHZhbHVlLCByYXRoZXIgdGhhbiBieSByZXR1cm5pbmcgYSBzZW50aW5lbCB2YWx1ZSBhbmQgY2FsbGluZyBhXG4gICAgICAgICAqIGNhbGxiYWNrLiBJZiB0aGUgbGlzdGVuZXIgZnVuY3Rpb24gcmV0dXJucyBhIFByb21pc2UsIHRoZSByZXNwb25zZSBpc1xuICAgICAgICAgKiBzZW50IHdoZW4gdGhlIHByb21pc2UgZWl0aGVyIHJlc29sdmVzIG9yIHJlamVjdHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxuICAgICAgICAgKiAgICAgICAgVGhlIG1lc3NhZ2Ugc2VudCBieSB0aGUgb3RoZXIgZW5kIG9mIHRoZSBjaGFubmVsLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gc2VuZGVyXG4gICAgICAgICAqICAgICAgICBEZXRhaWxzIGFib3V0IHRoZSBzZW5kZXIgb2YgdGhlIG1lc3NhZ2UuXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKil9IHNlbmRSZXNwb25zZVxuICAgICAgICAgKiAgICAgICAgQSBjYWxsYmFjayB3aGljaCwgd2hlbiBjYWxsZWQgd2l0aCBhbiBhcmJpdHJhcnkgYXJndW1lbnQsIHNlbmRzXG4gICAgICAgICAqICAgICAgICB0aGF0IHZhbHVlIGFzIGEgcmVzcG9uc2UuXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKiAgICAgICAgVHJ1ZSBpZiB0aGUgd3JhcHBlZCBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHdoaWNoIHdpbGwgbGF0ZXJcbiAgICAgICAgICogICAgICAgIHlpZWxkIGEgcmVzcG9uc2UuIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgICovXG5cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25NZXNzYWdlKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgbGV0IGRpZENhbGxTZW5kUmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgd3JhcHBlZFNlbmRSZXNwb25zZTtcbiAgICAgICAgICBsZXQgc2VuZFJlc3BvbnNlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgd3JhcHBlZFNlbmRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAoIWxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcsIG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGxpc3RlbmVyKG1lc3NhZ2UsIHNlbmRlciwgd3JhcHBlZFNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGlzUmVzdWx0VGhlbmFibGUgPSByZXN1bHQgIT09IHRydWUgJiYgaXNUaGVuYWJsZShyZXN1bHQpOyAvLyBJZiB0aGUgbGlzdGVuZXIgZGlkbid0IHJldHVybmVkIHRydWUgb3IgYSBQcm9taXNlLCBvciBjYWxsZWRcbiAgICAgICAgICAvLyB3cmFwcGVkU2VuZFJlc3BvbnNlIHN5bmNocm9ub3VzbHksIHdlIGNhbiBleGl0IGVhcmxpZXJcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZXJlIHdpbGwgYmUgbm8gcmVzcG9uc2Ugc2VudCBmcm9tIHRoaXMgbGlzdGVuZXIuXG5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlICYmICFpc1Jlc3VsdFRoZW5hYmxlICYmICFkaWRDYWxsU2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSAvLyBBIHNtYWxsIGhlbHBlciB0byBzZW5kIHRoZSBtZXNzYWdlIGlmIHRoZSBwcm9taXNlIHJlc29sdmVzXG4gICAgICAgICAgLy8gYW5kIGFuIGVycm9yIGlmIHRoZSBwcm9taXNlIHJlamVjdHMgKGEgd3JhcHBlZCBzZW5kTWVzc2FnZSBoYXNcbiAgICAgICAgICAvLyB0byB0cmFuc2xhdGUgdGhlIG1lc3NhZ2UgaW50byBhIHJlc29sdmVkIHByb21pc2Ugb3IgYSByZWplY3RlZFxuICAgICAgICAgIC8vIHByb21pc2UpLlxuXG5cbiAgICAgICAgICBjb25zdCBzZW5kUHJvbWlzZWRSZXN1bHQgPSBwcm9taXNlID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihtc2cgPT4ge1xuICAgICAgICAgICAgICAvLyBzZW5kIHRoZSBtZXNzYWdlIHZhbHVlLlxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgLy8gU2VuZCBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGlmIHRoZSByZWplY3RlZCB2YWx1ZVxuICAgICAgICAgICAgICAvLyBpcyBhbiBpbnN0YW5jZSBvZiBlcnJvciwgb3IgdGhlIG9iamVjdCBpdHNlbGYgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcblxuICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgfHwgdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZFwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBfX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X186IHRydWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgIC8vIFByaW50IGFuIGVycm9yIG9uIHRoZSBjb25zb2xlIGlmIHVuYWJsZSB0byBzZW5kIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzZW5kIG9uTWVzc2FnZSByZWplY3RlZCByZXBseVwiLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTsgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgc2VuZCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgYVxuICAgICAgICAgIC8vIHJlc3VsdCwgb3RoZXJ3aXNlIHdhaXQgdGhlIHByb21pc2UgcmVsYXRlZCB0byB0aGUgd3JhcHBlZFNlbmRSZXNwb25zZVxuICAgICAgICAgIC8vIGNhbGxiYWNrIHRvIHJlc29sdmUgYW5kIHNlbmQgaXQgYXMgYSByZXNwb25zZS5cblxuXG4gICAgICAgICAgaWYgKGlzUmVzdWx0VGhlbmFibGUpIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQoc2VuZFJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgICAgfSAvLyBMZXQgQ2hyb21lIGtub3cgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVwbHlpbmcuXG5cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrID0gKHtcbiAgICAgICAgcmVqZWN0LFxuICAgICAgICByZXNvbHZlXG4gICAgICB9LCByZXBseSkgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIC8vIERldGVjdCB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlbmVycyByZXBsaWVkIHRvIHRoZSBzZW5kTWVzc2FnZSBjYWxsIGFuZCByZXNvbHZlXG4gICAgICAgICAgLy8gdGhlIHByb21pc2UgdG8gdW5kZWZpbmVkIGFzIGluIEZpcmVmb3guXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9pc3N1ZXMvMTMwXG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSA9PT0gQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2UgPSAobmFtZSwgbWV0YWRhdGEsIGFwaU5hbWVzcGFjZU9iaiwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IHtcbiAgICAgICAgZGV2dG9vbHM6IHtcbiAgICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgICBvblJlcXVlc3RGaW5pc2hlZDogd3JhcEV2ZW50KG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgb25NZXNzYWdlOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIG9uTWVzc2FnZUV4dGVybmFsOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgdGFiczoge1xuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDIsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNldHRpbmdNZXRhZGF0YSA9IHtcbiAgICAgICAgY2xlYXI6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHNldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgYXBpTWV0YWRhdGEucHJpdmFjeSA9IHtcbiAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgc2VydmljZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHdlYnNpdGVzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdyYXBPYmplY3QoZXh0ZW5zaW9uQVBJcywgc3RhdGljV3JhcHBlcnMsIGFwaU1ldGFkYXRhKTtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBjaHJvbWUgIT0gXCJvYmplY3RcIiB8fCAhY2hyb21lIHx8ICFjaHJvbWUucnVudGltZSB8fCAhY2hyb21lLnJ1bnRpbWUuaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgc2NyaXB0IHNob3VsZCBvbmx5IGJlIGxvYWRlZCBpbiBhIGJyb3dzZXIgZXh0ZW5zaW9uLlwiKTtcbiAgICB9IC8vIFRoZSBidWlsZCBwcm9jZXNzIGFkZHMgYSBVTUQgd3JhcHBlciBhcm91bmQgdGhpcyBmaWxlLCB3aGljaCBtYWtlcyB0aGVcbiAgICAvLyBgbW9kdWxlYCB2YXJpYWJsZSBhdmFpbGFibGUuXG5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gd3JhcEFQSXMoY2hyb21lKTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGJyb3dzZXI7XG4gIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1wb2x5ZmlsbC5qcy5tYXBcbiIsImV4cG9ydCBjb25zdCBwbHVnaW5OYW1lc3BhY2UgPSAnYXV0by1jYXBpdGFsaXNlLWV4dGVuc2lvbic7XG5cbmV4cG9ydCBjb25zdCBzaXRlc1RvSWdub3JlID0gJ3NpdGVzVG9JZ25vcmUnLFxuICB3b3Jkc1RvRXhjbHVkZSA9ICd3b3Jkc1RvRXhjbHVkZScsXG4gIHNob3VsZENhcGl0YWxpc2VJID0gJ3Nob3VsZENhcGl0YWxpc2VJJyxcbiAgc2hvdWxkQ2FwaXRhbGlzZU5hbWVzID0gJ3Nob3VsZENhcGl0YWxpc2VOYW1lcycsXG4gIHNob3VsZENhcGl0YWxpc2VBYmJyZXZpYXRpb25zID0gJ3Nob3VsZENhcGl0YWxpc2VBYmJyZXZpYXRpb25zJyxcbiAgc2hvdWxkQ2FwaXRhbGlzZUxvY2F0aW9ucyA9ICdzaG91bGRDYXBpdGFsaXNlTG9jYXRpb25zJyxcbiAgY29uc3RhbnRzS2V5VmFsID0gJ2NvbnN0YW50c0tleVZhbCcsXG4gIG5hbWVzS2V5VmFsID0gJ25hbWVzS2V5VmFsJyxcbiAgYWJicmV2aWF0aW9uc0tleVZhbCA9ICdhYmJyZXZpYXRpb25zS2V5VmFsJyxcbiAgbG9jYXRpb25zS2V5VmFsID0gJ2xvY2F0aW9uc0tleVZhbCc7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiaW1wb3J0IGJyb3dzZXIgZnJvbSAnd2ViZXh0ZW5zaW9uLXBvbHlmaWxsJztcbmltcG9ydCB7XG4gIHBsdWdpbk5hbWVzcGFjZSxcbiAgc2l0ZXNUb0lnbm9yZSxcbiAgd29yZHNUb0V4Y2x1ZGUsXG4gIHNob3VsZENhcGl0YWxpc2VJLFxuICBzaG91bGRDYXBpdGFsaXNlTmFtZXMsXG4gIHNob3VsZENhcGl0YWxpc2VBYmJyZXZpYXRpb25zLFxuICBzaG91bGRDYXBpdGFsaXNlTG9jYXRpb25zLFxufSBmcm9tICcuL3BsdWdpbi1jb25zdGFudHMnO1xuXG5icm93c2VyLnN0b3JhZ2UubG9jYWxcbiAgLmdldChbc2l0ZXNUb0lnbm9yZSwgd29yZHNUb0V4Y2x1ZGVdKVxuICAudGhlbih1cGRhdGVJZ25vcmVMaXN0cywgb25FcnJvcik7XG5cbmZ1bmN0aW9uIHVwZGF0ZUlnbm9yZUxpc3RzKGl0ZW0pIHtcbiAgdmFyIHNpdGVzVG9FeGNsdWRlID0gaXRlbS5zaXRlc1RvSWdub3JlO1xuICBpZiAoc2l0ZXNUb0V4Y2x1ZGUpIHtcbiAgICAkKCcjc2l0ZXMnKS52YWwoc2l0ZXNUb0V4Y2x1ZGUuam9pbignXFxuJykpO1xuICB9XG5cbiAgdmFyIHdvcmRzVG9FeGNsdWRlID0gaXRlbS53b3Jkc1RvRXhjbHVkZTtcbiAgaWYgKHdvcmRzVG9FeGNsdWRlKSB7XG4gICAgJCgnI2V4Y2x1ZGVkX3dvcmRzX3RleHRib3gnKS52YWwod29yZHNUb0V4Y2x1ZGUuam9pbignXFxuJykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uRXJyb3IoZXJyb3IpIHtcbiAgY29uc29sZS5sb2coZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBnZXRVcmxEb21haW4oZGF0YSkge1xuICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgYS5ocmVmID0gZGF0YTtcbiAgcmV0dXJuIGEuaG9zdG5hbWU7XG59XG5cbiQoZG9jdW1lbnQpLm9uKGBjbGljay4ke3BsdWdpbk5hbWVzcGFjZX1gLCAnI2lnbm9yZVNpdGVCdXR0b24nLCBmdW5jdGlvbiAoKSB7XG4gIGJyb3dzZXIudGFicy5xdWVyeSh7IGN1cnJlbnRXaW5kb3c6IHRydWUsIGFjdGl2ZTogdHJ1ZSB9KS50aGVuKCh0YWJzKSA9PiB7XG4gICAgdmFyIGhvc3RuYW1lID0gZ2V0VXJsRG9tYWluKHRhYnNbMF0udXJsKTtcbiAgICB2YXIgc2l0ZXMgPSBnZXRTaXRlcygpO1xuICAgIHNpdGVzLnB1c2goaG9zdG5hbWUpO1xuXG4gICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICBzaXRlc1RvSWdub3JlOiBzaXRlcyxcbiAgICB9KTtcblxuICAgICQoJyNzaXRlcycpLnZhbChzaXRlcy5qb2luKCdcXG4nKSk7XG4gICAgJCh0aGlzKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICQodGhpcykudmFsKCdTaXRlIGFkZGVkIHRvIGlnbm9yZSBsaXN0Jyk7XG4gIH0pO1xufSk7XG5cbiQoZG9jdW1lbnQpLm9uKGBjbGljay4ke3BsdWdpbk5hbWVzcGFjZX1gLCAnI3N1Ym1pdEJ1dHRvbicsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNpdGVzID0gZ2V0U2l0ZXMoKTtcblxuICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICBzaXRlc1RvSWdub3JlOiBzaXRlcyxcbiAgfSk7XG5cbiAgJCh0aGlzKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAkKHRoaXMpLnZhbCgnU2F2ZWQnKTtcbn0pO1xuXG4kKGRvY3VtZW50KS5vbihcbiAgYGNsaWNrLiR7cGx1Z2luTmFtZXNwYWNlfWAsXG4gICcjc3VibWl0QnV0dG9uRXhjbHVkZWRXb3JkcycsXG4gIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgd29yZHMgPSBnZXRFeGNsdWRlZFdvcmRzKCk7XG5cbiAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgIHdvcmRzVG9FeGNsdWRlOiB3b3JkcyxcbiAgICB9KTtcblxuICAgICQodGhpcykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAkKHRoaXMpLnZhbCgnU2F2ZWQnKTtcbiAgfVxuKTtcblxubG9hZEZsYWdWYWx1ZXNGcm9tQnJvd3NlclN0b3JhZ2Uoc2hvdWxkQ2FwaXRhbGlzZUkpO1xubG9hZEZsYWdWYWx1ZXNGcm9tQnJvd3NlclN0b3JhZ2Uoc2hvdWxkQ2FwaXRhbGlzZU5hbWVzKTtcbmxvYWRGbGFnVmFsdWVzRnJvbUJyb3dzZXJTdG9yYWdlKHNob3VsZENhcGl0YWxpc2VBYmJyZXZpYXRpb25zKTtcbmxvYWRGbGFnVmFsdWVzRnJvbUJyb3dzZXJTdG9yYWdlKHNob3VsZENhcGl0YWxpc2VMb2NhdGlvbnMpO1xuXG5mdW5jdGlvbiBsb2FkRmxhZ1ZhbHVlc0Zyb21Ccm93c2VyU3RvcmFnZShmbGFnTmFtZSkge1xuICBicm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KGZsYWdOYW1lKS50aGVuKChpdGVtcykgPT4ge1xuICAgIGNvbnN0IGZsYWdWYWx1ZSA9IGl0ZW1zW2ZsYWdOYW1lXTtcblxuICAgIGlmIChmbGFnVmFsdWUgPT09IHRydWUgfHwgZmxhZ1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vdmFsdWUgbm90IHNldCB5ZXQvZXh0IGp1c3QgaW5zdGFsbGVkXG4gICAgICAkKGAjJHtmbGFnTmFtZX1gKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICBzZXRTaG91bGRDYXBpdGFsaXNlVmFyaWFibGUoZmxhZ05hbWUsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKGAjJHtmbGFnTmFtZX1gKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgc2V0U2hvdWxkQ2FwaXRhbGlzZVZhcmlhYmxlKGZsYWdOYW1lLCBmYWxzZSk7XG4gICAgfVxuICB9KTtcbn1cblxuc2V0dXBDaGVja2JveENoYW5nZUV2ZW50SGFuZGxlcnMoc2hvdWxkQ2FwaXRhbGlzZUkpO1xuc2V0dXBDaGVja2JveENoYW5nZUV2ZW50SGFuZGxlcnMoc2hvdWxkQ2FwaXRhbGlzZU5hbWVzKTtcbnNldHVwQ2hlY2tib3hDaGFuZ2VFdmVudEhhbmRsZXJzKHNob3VsZENhcGl0YWxpc2VBYmJyZXZpYXRpb25zKTtcbnNldHVwQ2hlY2tib3hDaGFuZ2VFdmVudEhhbmRsZXJzKHNob3VsZENhcGl0YWxpc2VMb2NhdGlvbnMpO1xuXG5mdW5jdGlvbiBzZXR1cENoZWNrYm94Q2hhbmdlRXZlbnRIYW5kbGVycyhmbGFnTmFtZSkge1xuICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgYCMke2ZsYWdOYW1lfWAsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICgkKGV2ZW50LnRhcmdldCkucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICBzZXRTaG91bGRDYXBpdGFsaXNlVmFyaWFibGUoZmxhZ05hbWUsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRTaG91bGRDYXBpdGFsaXNlVmFyaWFibGUoZmxhZ05hbWUsIGZhbHNlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRTaG91bGRDYXBpdGFsaXNlVmFyaWFibGUodmFyaWFibGVOYW1lLCB2YWx1ZSkge1xuICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICBbdmFyaWFibGVOYW1lXTogdmFsdWUsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRTaXRlcygpIHtcbiAgdmFyIHNpdGVzQm94VmFsID0gJCgnI3NpdGVzJykudmFsKCk7XG5cbiAgaWYgKHNpdGVzQm94VmFsKSB7XG4gICAgdmFyIHNpdGVzID0gc2l0ZXNCb3hWYWwuc3BsaXQoJ1xcbicpO1xuICAgIHJldHVybiBzaXRlcztcbiAgfVxuXG4gIHJldHVybiBbXTtcbn1cblxuZnVuY3Rpb24gZ2V0RXhjbHVkZWRXb3JkcygpIHtcbiAgdmFyIHdvcmRzQm94VmFsID0gJCgnI2V4Y2x1ZGVkX3dvcmRzX3RleHRib3gnKS52YWwoKTtcblxuICBpZiAod29yZHNCb3hWYWwpIHtcbiAgICB2YXIgd29yZHMgPSB3b3Jkc0JveFZhbC5zcGxpdCgnXFxuJyk7XG4gICAgcmV0dXJuIHdvcmRzO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufVxuXG4kKCcjc2l0ZXMnKS5vbihgaW5wdXQuJHtwbHVnaW5OYW1lc3BhY2V9YCwgZnVuY3Rpb24gKCkge1xuICAkKCcjc3VibWl0QnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG59KTtcblxuJCgnI2V4Y2x1ZGVkX3dvcmRzX3RleHRib3gnKS5vbihgaW5wdXQuJHtwbHVnaW5OYW1lc3BhY2V9YCwgZnVuY3Rpb24gKCkge1xuICAkKCcjc3VibWl0QnV0dG9uRXhjbHVkZWRXb3JkcycpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xufSk7XG4iLCJpbXBvcnQge1xuICBzaG91bGRDYXBpdGFsaXNlSSxcbiAgc2hvdWxkQ2FwaXRhbGlzZU5hbWVzLFxuICBzaG91bGRDYXBpdGFsaXNlQWJicmV2aWF0aW9ucyxcbiAgc2hvdWxkQ2FwaXRhbGlzZUxvY2F0aW9ucyxcbiAgY29uc3RhbnRzS2V5VmFsLFxuICBuYW1lc0tleVZhbCxcbiAgYWJicmV2aWF0aW9uc0tleVZhbCxcbiAgbG9jYXRpb25zS2V5VmFsLFxufSBmcm9tICcuL3BsdWdpbi1jb25zdGFudHMnO1xuXG5sZXQgd29yZHNUb0V4Y2x1ZGUgPSBbXTtcbmV4cG9ydCBsZXQgb3B0aW9uc0RpY3Rpb25hcnkgPSB7XG4gIFtzaG91bGRDYXBpdGFsaXNlSV06IGZhbHNlLFxuICBbc2hvdWxkQ2FwaXRhbGlzZU5hbWVzXTogZmFsc2UsXG4gIFtzaG91bGRDYXBpdGFsaXNlQWJicmV2aWF0aW9uc106IGZhbHNlLFxuICBbc2hvdWxkQ2FwaXRhbGlzZUxvY2F0aW9uc106IGZhbHNlLFxufTtcbmxldCBrZXlWYWx1ZURpY3Rpb25hcnkgPSB7XG4gIFtjb25zdGFudHNLZXlWYWxdOiB7fSxcbiAgW25hbWVzS2V5VmFsXToge30sXG4gIFthYmJyZXZpYXRpb25zS2V5VmFsXToge30sXG4gIFtsb2NhdGlvbnNLZXlWYWxdOiB7fSxcbn07XG5jb25zdCBuYnNwID0gJyZuYnNwOyc7XG5jb25zdCBjb250ZW50RWRpdGFibGVUYWdzID0gWydTUEFOJywgJ0RJVicsICdQJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXNlVGV4dChcbiAgZWxlbWVudCxcbiAgc2hvdWxkQ2FwaXRhbGlzZSxcbiAgc2hvdWxkQ2FwaXRhbGlzZUZvckksXG4gIGdldFRleHQsXG4gIHNldFRleHRcbikge1xuICBpZiAoIWVsZW1lbnQpIHJldHVybjtcblxuICBsZXQgdGFnTmFtZSA9IGVsZW1lbnQudGFnTmFtZTtcblxuICBpZiAoIWlzRWRpdGFibGVFbGVtZW50KGVsZW1lbnQsIHRhZ05hbWUpKSByZXR1cm47XG5cbiAgbGV0IHRleHQgPSBnZXRUZXh0KGVsZW1lbnQsIHRhZ05hbWUpO1xuXG4gIGlmICh0ZXh0ID09IG51bGwpIHJldHVybjtcblxuICBjb25zdCBsYXN0Q2hhciA9IHRleHQudHJpbSgpLnNsaWNlKC0xKTtcbiAgY29uc3QgaXNMYXN0Q2hhckFuQWxwaGFiZXQgPSBsYXN0Q2hhci5tYXRjaCgvW2Etel0vaSk7XG5cbiAgaWYgKHRleHQubGVuZ3RoID09IDEgJiYgIWlzTGFzdENoYXJBbkFscGhhYmV0KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy9zdXBwb3J0IGZvciBqaXJhJ3MgY29tbWVudCBzZWN0aW9uJ3MgcCB0YWdzXG4gIGlmIChpc0xhc3RDaGFyQW5BbHBoYWJldCAmJiBsYXN0Q2hhci50b1VwcGVyQ2FzZSgpID09PSBsYXN0Q2hhcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBzaG91bGRBcHBlbmRCciA9IGZhbHNlO1xuICBpZiAodGV4dC5sZW5ndGggPj0gNCAmJiB0ZXh0LnNsaWNlKC00KSA9PT0gJzxicj4nKSB7XG4gICAgdGV4dCA9IHRleHQuc2xpY2UoMCwgLTQpO1xuICAgIHNob3VsZEFwcGVuZEJyID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChzaG91bGRDYXBpdGFsaXNlKHRleHQpKSB7XG4gICAgY29uc3QgdXBkYXRlZFN0ciA9IGdldENhcGl0YWxpc2VkQ29udGVudCh0ZXh0KTtcblxuICAgIHNldFRleHQoZWxlbWVudCwgdGFnTmFtZSwgdXBkYXRlZFN0ciwgc2hvdWxkQXBwZW5kQnIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChcbiAgICB0ZXh0Lmxlbmd0aCA+PSAyICYmXG4gICAgc2hvdWxkQ2FwaXRhbGlzZUZvckkodGV4dCkgJiZcbiAgICBvcHRpb25zRGljdGlvbmFyeVtzaG91bGRDYXBpdGFsaXNlSV1cbiAgKSB7XG4gICAgY29uc3QgdXBkYXRlZFN0ciA9IGdldENhcGl0YWxpc2VkQ29udGVudEZvckkodGV4dCk7XG5cbiAgICBzZXRUZXh0KGVsZW1lbnQsIHRhZ05hbWUsIHVwZGF0ZWRTdHIsIHNob3VsZEFwcGVuZEJyKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjYXNlU2Vuc2l0aXZlID0gdHJ1ZTtcbiAgdXBkYXRlQ29uc3RhbnQoXG4gICAgdGV4dCxcbiAgICBlbGVtZW50LFxuICAgIHRhZ05hbWUsXG4gICAga2V5VmFsdWVEaWN0aW9uYXJ5W2NvbnN0YW50c0tleVZhbF0sXG4gICAgY2FzZVNlbnNpdGl2ZVxuICApO1xuXG4gIGlmIChvcHRpb25zRGljdGlvbmFyeVtzaG91bGRDYXBpdGFsaXNlTmFtZXNdKSB7XG4gICAgdXBkYXRlQ29uc3RhbnQoXG4gICAgICB0ZXh0LFxuICAgICAgZWxlbWVudCxcbiAgICAgIHRhZ05hbWUsXG4gICAgICBrZXlWYWx1ZURpY3Rpb25hcnlbbmFtZXNLZXlWYWxdLFxuICAgICAgIWNhc2VTZW5zaXRpdmVcbiAgICApO1xuICB9XG5cbiAgaWYgKG9wdGlvbnNEaWN0aW9uYXJ5W3Nob3VsZENhcGl0YWxpc2VBYmJyZXZpYXRpb25zXSkge1xuICAgIHVwZGF0ZUNvbnN0YW50KFxuICAgICAgdGV4dCxcbiAgICAgIGVsZW1lbnQsXG4gICAgICB0YWdOYW1lLFxuICAgICAga2V5VmFsdWVEaWN0aW9uYXJ5W2FiYnJldmlhdGlvbnNLZXlWYWxdLFxuICAgICAgIWNhc2VTZW5zaXRpdmVcbiAgICApO1xuICB9XG5cbiAgaWYgKG9wdGlvbnNEaWN0aW9uYXJ5W3Nob3VsZENhcGl0YWxpc2VMb2NhdGlvbnNdKSB7XG4gICAgdXBkYXRlQ29uc3RhbnQoXG4gICAgICB0ZXh0LFxuICAgICAgZWxlbWVudCxcbiAgICAgIHRhZ05hbWUsXG4gICAgICBrZXlWYWx1ZURpY3Rpb25hcnlbbG9jYXRpb25zS2V5VmFsXSxcbiAgICAgICFjYXNlU2Vuc2l0aXZlXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDb25zdGFudCh0ZXh0LCBlbGVtZW50LCB0YWdOYW1lLCBrZXlWYWx1ZVBhaXJzLCBjYXNlU2Vuc2l0aXZlKSB7XG4gIGNvbnN0IFttYXRjaGVkV29yZCwgY29ycmVjdGVkV29yZF0gPVxuICAgIGNhc2VTZW5zaXRpdmUgPT09IHRydWVcbiAgICAgID8gZ2V0Q2FzZVNlbnNpdGl2ZU1hdGNoaW5nQW5kQ29ycmVjdGVkV29yZHModGV4dCwga2V5VmFsdWVQYWlycylcbiAgICAgIDogZ2V0Q2FzZUluc2Vuc2l0aXZlTWF0Y2hpbmdBbmRDb3JyZWN0ZWRXb3Jkcyh0ZXh0LCBrZXlWYWx1ZVBhaXJzKTtcblxuICBpZiAobWF0Y2hlZFdvcmQgIT09ICcnKSB7XG4gICAgaWYgKG1hdGNoZWRXb3JkICE9PSBjb3JyZWN0ZWRXb3JkKSB7XG4gICAgICBjb25zdCB1cGRhdGVkU3RyID0gZ2V0VXBkYXRlZFN0cmluZyh0ZXh0LCBtYXRjaGVkV29yZCwgY29ycmVjdGVkV29yZCk7XG4gICAgICBzZXRUZXh0KGVsZW1lbnQsIHRhZ05hbWUsIHVwZGF0ZWRTdHIsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZENhcGl0YWxpc2VGb3JJKHRleHQpIHtcbiAgY29uc3QgcmVnZXggPSAvXFxzK2koXFxzK3wnKSQvO1xuICBjb25zdCBtYXRjaGVzID0gcmVnZXgudGVzdCh0ZXh0KTtcblxuICByZXR1cm4gbWF0Y2hlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFNob3VsZENhcGl0YWxpc2VPcHRpb24ob3B0aW9uTmFtZSwgdmFsdWUpIHtcbiAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICBvcHRpb25zRGljdGlvbmFyeVtvcHRpb25OYW1lXSA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRLZXlWYWx1ZShrZXlWYWx1ZU5hbWUsIHZhbHVlKSB7XG4gIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAga2V5VmFsdWVEaWN0aW9uYXJ5W2tleVZhbHVlTmFtZV0gPSB2YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkQ2FwaXRhbGlzZSh0ZXh0KSB7XG4gIGNvbnN0IG11bHRpbGluZVJlZ2V4ID0gL1xccypcXG4rXFxzKlxcdyQvO1xuICBsZXQgbWF0Y2hlcyA9IG11bHRpbGluZVJlZ2V4LnRlc3QodGV4dCk7XG5cbiAgaWYgKG1hdGNoZXMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHNlbnRlbmNlUmVnZXggPSAvXFx3K1xccypcXFc/KFsuPyFdKStcXHMrXFx3JC87XG4gIG1hdGNoZXMgPSBzZW50ZW5jZVJlZ2V4LnRlc3QodGV4dCk7XG5cbiAgaWYgKCFtYXRjaGVzKSB7XG4gICAgcmV0dXJuIHRleHQubGVuZ3RoID09IDE7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhc2VJbnNlbnNpdGl2ZU1hdGNoaW5nQW5kQ29ycmVjdGVkV29yZHMoXG4gIHRleHQsXG4gIGtleVZhbHVlUGFpcnNcbikge1xuICByZXR1cm4gZ2V0TWF0Y2hpbmdBbmRDb3JyZWN0ZWRXb3JkcyhcbiAgICB0ZXh0LFxuICAgIGtleVZhbHVlUGFpcnMsXG4gICAgd29yZHNUb0V4Y2x1ZGUsXG4gICAgdHJ1ZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FzZVNlbnNpdGl2ZU1hdGNoaW5nQW5kQ29ycmVjdGVkV29yZHModGV4dCwga2V5VmFsdWVQYWlycykge1xuICByZXR1cm4gZ2V0TWF0Y2hpbmdBbmRDb3JyZWN0ZWRXb3JkcyhcbiAgICB0ZXh0LFxuICAgIGtleVZhbHVlUGFpcnMsXG4gICAgd29yZHNUb0V4Y2x1ZGUsXG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hdGNoaW5nQW5kQ29ycmVjdGVkV29yZHMoXG4gIHRleHQsXG4gIGtleVZhbHVlUGFpcnMsXG4gIHdvcmRzVG9FeGNsdWRlLFxuICBjYXNlSW5zZW5zaXRpdmVcbikge1xuICBjb25zdCBsYXN0V29yZFJlZ2V4ID0gLyhcXC4/XFx3KykoW15cXHctXSkkLztcblxuICBsZXQgbWF0Y2ggPSBsYXN0V29yZFJlZ2V4LmV4ZWModGV4dCk7XG4gIGNvbnN0IG5vTWF0Y2ggPSBbJycsICcnXTtcblxuICBpZiAobWF0Y2gpIHtcbiAgICBjb25zdCBtYXRjaGVkV29yZCA9IG1hdGNoWzFdO1xuXG4gICAgaWYgKG1hdGNoZWRXb3JkICE9IG51bGwpIHtcbiAgICAgIGlmICh3b3Jkc1RvRXhjbHVkZS5pbmNsdWRlcyhtYXRjaGVkV29yZC50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICByZXR1cm4gbm9NYXRjaDtcbiAgICAgIH1cblxuICAgICAgbGV0IGNvcnJlY3RlZFdvcmQgPSBnZXRDb3JyZWN0ZWRXb3JkKFxuICAgICAgICBjYXNlSW5zZW5zaXRpdmUsXG4gICAgICAgIG1hdGNoZWRXb3JkLFxuICAgICAgICBrZXlWYWx1ZVBhaXJzXG4gICAgICApO1xuXG4gICAgICBpZiAoY29ycmVjdGVkV29yZCAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbbWF0Y2hlZFdvcmQsIGNvcnJlY3RlZFdvcmRdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBub01hdGNoO1xufVxuXG5mdW5jdGlvbiBnZXRDb3JyZWN0ZWRXb3JkKGNhc2VJbnNlbnNpdGl2ZSwgbWF0Y2hlZFdvcmQsIGtleVZhbHVlUGFpcnMpIHtcbiAgcmV0dXJuIGNhc2VJbnNlbnNpdGl2ZSA9PT0gdHJ1ZVxuICAgID8ga2V5VmFsdWVQYWlyc1ttYXRjaGVkV29yZC50b0xvd2VyQ2FzZSgpXVxuICAgIDoga2V5VmFsdWVQYWlyc1ttYXRjaGVkV29yZF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkVycm9yKGVycm9yKSB7XG4gIGNvbnNvbGUubG9nKGVycm9yKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRleHQoaHRtbENvbnRyb2wsIHRhZ05hbWUpIHtcbiAgaWYgKFxuICAgIHRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0lOUFVUJyB8fFxuICAgIHRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1RFWFRBUkVBJ1xuICApIHtcbiAgICByZXR1cm4gaHRtbENvbnRyb2wudmFsdWUgPyBodG1sQ29udHJvbC52YWx1ZSA6ICcnO1xuICB9XG5cbiAgaWYgKFxuICAgIGh0bWxDb250cm9sLmlubmVySFRNTCAmJlxuICAgIGNvbnRlbnRFZGl0YWJsZVRhZ3MuaW5jbHVkZXModGFnTmFtZS50b1VwcGVyQ2FzZSgpKVxuICApIHtcbiAgICByZXR1cm4gZ2V0VGV4dEZvclNwYW5UYWcoaHRtbENvbnRyb2wuaW5uZXJIVE1MKTtcbiAgfVxuXG4gIHJldHVybiBodG1sQ29udHJvbC5pbm5lckhUTUwgPyBodG1sQ29udHJvbC5pbm5lckhUTUwgOiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRleHRGb3JTcGFuVGFnKHRleHQpIHtcbiAgaWYgKHRleHQgJiYgZ2V0TmJzcENvdW50KHRleHQpID09PSAxKSB7XG4gICAgbGV0IHJlc3VsdCA9IHJlcGxhY2VMYXN0T2NjdXJyZW5jZUluU3RyaW5nKHRleHQsIG5ic3AsICcgJyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB0ZXh0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUxhc3RPY2N1cnJlbmNlSW5TdHJpbmcoXG4gIG9yaWdpbmFsVGV4dCxcbiAgdGV4dFRvTWF0Y2gsXG4gIHJlcGxhY2VtZW50XG4pIHtcbiAgcmV0dXJuIG9yaWdpbmFsVGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAodGV4dFRvTWF0Y2ggKyAnJCcpLCByZXBsYWNlbWVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROYnNwQ291bnQodGV4dCkge1xuICByZXR1cm4gKHRleHQubWF0Y2gobmV3IFJlZ0V4cChuYnNwLCAnZycpKSB8fCBbXSkubGVuZ3RoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VGV4dChodG1sQ29udHJvbCwgdGFnTmFtZSwgdXBkYXRlZFN0ciwgc2hvdWxkQXBwZW5kQnIpIHtcbiAgaWYgKFxuICAgIHRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0lOUFVUJyB8fFxuICAgIHRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1RFWFRBUkVBJ1xuICApIHtcbiAgICBodG1sQ29udHJvbC52YWx1ZSA9IHVwZGF0ZWRTdHI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGNvbnRlbnRFZGl0YWJsZVRhZ3MuaW5jbHVkZXModGFnTmFtZS50b1VwcGVyQ2FzZSgpKSkge1xuICAgIHVwZGF0ZWRTdHIgPSByZXBsYWNlTGFzdE9jY3VycmVuY2VJblN0cmluZyh1cGRhdGVkU3RyLCAnICcsIG5ic3ApO1xuICB9XG5cbiAgaWYgKHNob3VsZEFwcGVuZEJyKSB7XG4gICAgdXBkYXRlZFN0ciArPSAnPGJyPic7XG4gIH1cblxuICBodG1sQ29udHJvbC5pbm5lckhUTUwgPSB1cGRhdGVkU3RyO1xuICBzZXRFbmRPZkNvbnRlbnRlZGl0YWJsZShodG1sQ29udHJvbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ZpcnN0VGV4dE9mRWRpdGFibGVUZXh0Tm9kZShub2RlKSB7XG4gIGNvbnN0IGRhdGEgPSBub2RlLmRhdGE7XG4gIGNvbnN0IHRleHROb2RlID0gJyN0ZXh0JztcblxuICBpZiAoXG4gICAgbm9kZS5ub2RlTmFtZSA9PT0gdGV4dE5vZGUgJiZcbiAgICBkYXRhLmxlbmd0aCA9PT0gMSAmJlxuICAgIGRhdGEudG9VcHBlckNhc2UoKSAhPSBkYXRhICYmXG4gICAgc2hvdWxkQ2FwaXRhbGlzZUNvbnRlbnQobm9kZS5wYXJlbnROb2RlKVxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEVuZE9mQ29udGVudGVkaXRhYmxlKGNvbnRlbnRFZGl0YWJsZUVsZW1lbnQpIHtcbiAgbGV0IHJhbmdlLCBzZWxlY3Rpb247XG4gIGlmIChkb2N1bWVudC5jcmVhdGVSYW5nZSkge1xuICAgIC8vRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgU2FmYXJpLCBJRSA5K1xuICAgIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTsgLy9DcmVhdGUgYSByYW5nZSAoYSByYW5nZSBpcyBhIGxpa2UgdGhlIHNlbGVjdGlvbiBidXQgaW52aXNpYmxlKVxuICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBjb250ZW50RWRpdGFibGVFbGVtZW50LmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2RlcyA9PSBudWxsKSByZXR1cm47XG5cbiAgICBjb25zdCBjaGlsZE5vZGUgPVxuICAgICAgY2hpbGROb2Rlcy5sZW5ndGggPT0gMVxuICAgICAgICA/IGNoaWxkTm9kZXNbMF1cbiAgICAgICAgOiBjaGlsZE5vZGVzW2NoaWxkTm9kZXMubGVuZ3RoIC0gMl07XG4gICAgLy8gY2hpbGROb2Rlcy5mb3JFYWNoKHg9PmNvbnNvbGUubG9nKHgub3V0ZXJIVE1MKSk7XG5cbiAgICBpZiAoY2hpbGROb2RlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2RlLm5vZGVOYW1lID09PSAnI3RleHQnKSB7XG4gICAgICByYW5nZS5zZXRTdGFydChjaGlsZE5vZGUsIGNoaWxkTm9kZS5kYXRhLmxlbmd0aCk7XG4gICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChjaGlsZE5vZGUub3V0ZXJIVE1MID09PSAnPGJyPicpIHtcbiAgICAgIHJhbmdlLnNldFN0YXJ0KGNoaWxkTm9kZSwgMCk7XG4gICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKGNvbnRlbnRFZGl0YWJsZUVsZW1lbnQpOyAvL1NlbGVjdCB0aGUgZW50aXJlIGNvbnRlbnRzIG9mIHRoZSBlbGVtZW50IHdpdGggdGhlIHJhbmdlXG4gICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7IC8vY29sbGFwc2UgdGhlIHJhbmdlIHRvIHRoZSBlbmQgcG9pbnQuIGZhbHNlIG1lYW5zIGNvbGxhcHNlIHRvIGVuZCByYXRoZXIgdGhhbiB0aGUgc3RhcnRcbiAgICB9XG5cbiAgICBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7IC8vZ2V0IHRoZSBzZWxlY3Rpb24gb2JqZWN0IChhbGxvd3MgeW91IHRvIGNoYW5nZSBzZWxlY3Rpb24pXG4gICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpOyAvL3JlbW92ZSBhbnkgc2VsZWN0aW9ucyBhbHJlYWR5IG1hZGVcbiAgICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpOyAvL21ha2UgdGhlIHJhbmdlIHlvdSBoYXZlIGp1c3QgY3JlYXRlZCB0aGUgdmlzaWJsZSBzZWxlY3Rpb25cbiAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24pIHtcbiAgICAvL0lFIDggYW5kIGxvd2VyXG4gICAgcmFuZ2UgPSBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpOyAvL0NyZWF0ZSBhIHJhbmdlIChhIHJhbmdlIGlzIGEgbGlrZSB0aGUgc2VsZWN0aW9uIGJ1dCBpbnZpc2libGUpXG4gICAgcmFuZ2UubW92ZVRvRWxlbWVudFRleHQoY29udGVudEVkaXRhYmxlRWxlbWVudCk7IC8vU2VsZWN0IHRoZSBlbnRpcmUgY29udGVudHMgb2YgdGhlIGVsZW1lbnQgd2l0aCB0aGUgcmFuZ2VcbiAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7IC8vY29sbGFwc2UgdGhlIHJhbmdlIHRvIHRoZSBlbmQgcG9pbnQuIGZhbHNlIG1lYW5zIGNvbGxhcHNlIHRvIGVuZCByYXRoZXIgdGhhbiB0aGUgc3RhcnRcbiAgICByYW5nZS5zZWxlY3QoKTsgLy9TZWxlY3QgdGhlIHJhbmdlIChtYWtlIGl0IHRoZSB2aXNpYmxlIHNlbGVjdGlvblxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcGRhdGVkU3RyaW5nKHRleHQsIG1hdGNoZWRXb3JkLCBjb3JyZWN0ZWRXb3JkKSB7XG4gIGlmICh0ZXh0ICYmIG1hdGNoZWRXb3JkICYmIGNvcnJlY3RlZFdvcmQpIHtcbiAgICBjb25zdCBzcGxpdEF0ID0gKGluZGV4KSA9PiAoeCkgPT4gW3guc2xpY2UoMCwgaW5kZXgpLCB4LnNsaWNlKGluZGV4KV07XG4gICAgY29uc3QgYXJyID0gc3BsaXRBdCgtMSkodGV4dCk7XG5cbiAgICBjb25zdCB1cGRhdGVkU3RyID1cbiAgICAgIGFyclswXS5yZXBsYWNlKG5ldyBSZWdFeHAobWF0Y2hlZFdvcmQgKyAnJCcpLCBjb3JyZWN0ZWRXb3JkKSArIGFyclsxXTtcbiAgICByZXR1cm4gdXBkYXRlZFN0cjtcbiAgfVxuXG4gIHJldHVybiB0ZXh0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FwaXRhbGlzZWRDb250ZW50Rm9ySSh0ZXh0KSB7XG4gIGNvbnN0IGxhc3RUd29DaGFycyA9IHRleHQuc2xpY2UoLTIpO1xuICBjb25zdCB1cGRhdGVkU3RyID1cbiAgICB0ZXh0LnN1YnN0cigwLCB0ZXh0Lmxlbmd0aCAtIDIpICsgbGFzdFR3b0NoYXJzLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiB1cGRhdGVkU3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FwaXRhbGlzZWRDb250ZW50KHRleHQpIHtcbiAgY29uc3QgbGFzdENoYXIgPSB0ZXh0LnNsaWNlKC0xKTtcbiAgY29uc3QgdXBkYXRlZFN0ciA9IHRleHQuc3Vic3RyKDAsIHRleHQubGVuZ3RoIC0gMSkgKyBsYXN0Q2hhci50b1VwcGVyQ2FzZSgpO1xuICByZXR1cm4gdXBkYXRlZFN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29udGVudEVkaXRhYmxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5pc0NvbnRlbnRFZGl0YWJsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbHRlcmVkRWxlbWVudHMoYWRkZWROb2RlcywgdGFnTmFtZSkge1xuICByZXR1cm4gJChhZGRlZE5vZGVzKS5maW5kKHRhZ05hbWUpLmFkZEJhY2sodGFnTmFtZSk7IC8vIGZpbmRzIGVpdGhlciBhZGRlZCBhbG9uZSBvciBhcyB0cmVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRDYXBpdGFsaXNlQ29udGVudChlbGVtZW50KSB7XG4gIHJldHVybiBpc0NvbnRlbnRFZGl0YWJsZShlbGVtZW50KSAmJiAhY29udGFpbnNIdG1sQ29udGVudChlbGVtZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRWRpdGFibGVFbGVtZW50KGVsZW1lbnQsIHRhZ05hbWUpIHtcbiAgcmV0dXJuIChcbiAgICBlbGVtZW50LmlzQ29udGVudEVkaXRhYmxlIHx8XG4gICAgdGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnSU5QVVQnIHx8XG4gICAgdGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnVEVYVEFSRUEnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc0h0bWxDb250ZW50KGVsZW1lbnQpIHtcbiAgY29uc3QgY29udGVudCA9ICQoZWxlbWVudCkuaHRtbCgpO1xuXG4gIGNvbnN0IGJyUmVnZXggPSAvXFxzKjxicj4vO1xuICAvL2ZvciBnbWFpbFxuICBpZiAoY29udGVudCAmJiBiclJlZ2V4LnRlc3QoY29udGVudCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCByZWdleCA9IC88XFwvP1thLXpdW1xcc1xcU10qPi9pO1xuICBjb25zdCBoYXNIdG1sVGFnID0gcmVnZXgudGVzdChjb250ZW50KTtcbiAgcmV0dXJuIGhhc0h0bWxUYWc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRXb3Jkc1RvRXhjbHVkZSh2YWx1ZSkge1xuICBpZiAodmFsdWUpIHtcbiAgICB3b3Jkc1RvRXhjbHVkZSA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVPcHRpb25zVmFsdWUoY2hhbmdlcywgdmFyaWFibGVOYW1lKSB7XG4gIGlmIChjaGFuZ2VzW3ZhcmlhYmxlTmFtZV0gIT0gbnVsbCkge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gY2hhbmdlc1t2YXJpYWJsZU5hbWVdLm5ld1ZhbHVlO1xuXG4gICAgaWYgKG5ld1ZhbHVlICE9IG51bGwpIHtcbiAgICAgIHNldFNob3VsZENhcGl0YWxpc2VPcHRpb24odmFyaWFibGVOYW1lLCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiZ2xvYmFsVGhpcyIsInNlbGYiLCJtb2R1bGUiLCJicm93c2VyIiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJwcm90b3R5cGUiLCJDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UiLCJTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkciLCJ3cmFwQVBJcyIsImV4dGVuc2lvbkFQSXMiLCJhcGlNZXRhZGF0YSIsImtleXMiLCJsZW5ndGgiLCJFcnJvciIsIkRlZmF1bHRXZWFrTWFwIiwiV2Vha01hcCIsImNvbnN0cnVjdG9yIiwiY3JlYXRlSXRlbSIsIml0ZW1zIiwic3VwZXIiLCJ0aGlzIiwiZ2V0Iiwia2V5IiwiaGFzIiwic2V0IiwibWFrZUNhbGxiYWNrIiwicHJvbWlzZSIsIm1ldGFkYXRhIiwiY2FsbGJhY2tBcmdzIiwicnVudGltZSIsImxhc3RFcnJvciIsInJlamVjdCIsIm1lc3NhZ2UiLCJzaW5nbGVDYWxsYmFja0FyZyIsInJlc29sdmUiLCJwbHVyYWxpemVBcmd1bWVudHMiLCJudW1BcmdzIiwid3JhcE1ldGhvZCIsInRhcmdldCIsIm1ldGhvZCIsIndyYXBwZXIiLCJQcm94eSIsImFwcGx5IiwidGFyZ2V0TWV0aG9kIiwidGhpc09iaiIsImFyZ3MiLCJjYWxsIiwiaGFzT3duUHJvcGVydHkiLCJGdW5jdGlvbiIsImJpbmQiLCJ3cmFwT2JqZWN0Iiwid3JhcHBlcnMiLCJjYWNoZSIsImNyZWF0ZSIsImhhbmRsZXJzIiwicHJveHlUYXJnZXQiLCJwcm9wIiwicmVjZWl2ZXIiLCJ2YWx1ZSIsIm5hbWUiLCJtaW5BcmdzIiwibWF4QXJncyIsIlByb21pc2UiLCJmYWxsYmFja1RvTm9DYWxsYmFjayIsImNiRXJyb3IiLCJjb25zb2xlIiwid2FybiIsIm5vQ2FsbGJhY2siLCJ3cmFwQXN5bmNGdW5jdGlvbiIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImRlc2MiLCJSZWZsZWN0IiwiZGVsZXRlUHJvcGVydHkiLCJ3cmFwRXZlbnQiLCJ3cmFwcGVyTWFwIiwiYWRkTGlzdGVuZXIiLCJsaXN0ZW5lciIsImhhc0xpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzIiwicmVxIiwid3JhcHBlZFJlcSIsImdldENvbnRlbnQiLCJsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmciLCJvbk1lc3NhZ2VXcmFwcGVycyIsInNlbmRlciIsInNlbmRSZXNwb25zZSIsIndyYXBwZWRTZW5kUmVzcG9uc2UiLCJyZXN1bHQiLCJkaWRDYWxsU2VuZFJlc3BvbnNlIiwic2VuZFJlc3BvbnNlUHJvbWlzZSIsInJlc3BvbnNlIiwic3RhY2siLCJlcnIiLCJpc1Jlc3VsdFRoZW5hYmxlIiwidGhlbiIsIm1zZyIsImVycm9yIiwiX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fIiwiY2F0Y2giLCJ3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjayIsInJlcGx5Iiwid3JhcHBlZFNlbmRNZXNzYWdlIiwiYXBpTmFtZXNwYWNlT2JqIiwid3JhcHBlZENiIiwicHVzaCIsInNlbmRNZXNzYWdlIiwic3RhdGljV3JhcHBlcnMiLCJkZXZ0b29scyIsIm5ldHdvcmsiLCJvblJlcXVlc3RGaW5pc2hlZCIsIm9uTWVzc2FnZSIsIm9uTWVzc2FnZUV4dGVybmFsIiwidGFicyIsInNldHRpbmdNZXRhZGF0YSIsImNsZWFyIiwicHJpdmFjeSIsInNlcnZpY2VzIiwid2Vic2l0ZXMiLCJjaHJvbWUiLCJpZCIsImV4cG9ydHMiLCJwbHVnaW5OYW1lc3BhY2UiLCJzaXRlc1RvSWdub3JlIiwid29yZHNUb0V4Y2x1ZGUiLCJzaG91bGRDYXBpdGFsaXNlSSIsInNob3VsZENhcGl0YWxpc2VOYW1lcyIsInNob3VsZENhcGl0YWxpc2VBYmJyZXZpYXRpb25zIiwic2hvdWxkQ2FwaXRhbGlzZUxvY2F0aW9ucyIsImNvbnN0YW50c0tleVZhbCIsIm5hbWVzS2V5VmFsIiwiYWJicmV2aWF0aW9uc0tleVZhbCIsImxvY2F0aW9uc0tleVZhbCIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsInVuZGVmaW5lZCIsIl9fd2VicGFja19tb2R1bGVzX18iLCJuIiwiZ2V0dGVyIiwiX19lc01vZHVsZSIsImQiLCJhIiwiZGVmaW5pdGlvbiIsIm8iLCJvYmoiLCJsb2FkRmxhZ1ZhbHVlc0Zyb21Ccm93c2VyU3RvcmFnZSIsImZsYWdOYW1lIiwiZmxhZ1ZhbHVlIiwiJCIsInNldFNob3VsZENhcGl0YWxpc2VWYXJpYWJsZSIsInNldHVwQ2hlY2tib3hDaGFuZ2VFdmVudEhhbmRsZXJzIiwiZG9jdW1lbnQiLCJvbiIsImV2ZW50IiwidmFyaWFibGVOYW1lIiwiZ2V0U2l0ZXMiLCJzaXRlc0JveFZhbCIsInZhbCIsInNwbGl0IiwiaXRlbSIsInNpdGVzVG9FeGNsdWRlIiwiam9pbiIsImxvZyIsImN1cnJlbnRXaW5kb3ciLCJhY3RpdmUiLCJkYXRhIiwiaG9zdG5hbWUiLCJ1cmwiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsInNpdGVzIiwid29yZHNCb3hWYWwiLCJ3b3JkcyJdLCJzb3VyY2VSb290IjoiIn0=
