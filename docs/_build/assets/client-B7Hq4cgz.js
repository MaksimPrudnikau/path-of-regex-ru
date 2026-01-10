const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/_...404_-C4Sf2Yv_.js",
      "assets/web-yCR0qigV.js",
      "assets/index-C-GBBqP_.js",
      "assets/maps-Cp_PVBqx.js",
      "assets/index-E35jO1Cu.js",
    ]),
) => i.map((i) => d[i]);

import {
  l as _e,
  k as $e,
  e as be,
  f as Ee,
  j as F,
  c as fe,
  b as ge,
  a as he,
  i as J,
  s as j,
  h as ke,
  R as me,
  g as pe,
  u as Re,
  d as ve,
  m as we,
  n as ye,
} from "docs/_build/assets/index-E35jO1Cu.js";
import {
  t as $,
  a as A,
  e as ae,
  k as C,
  r as ce,
  v as de,
  f as G,
  j as ie,
  m as K,
  n as le,
  q as M,
  o as ne,
  h as oe,
  i as R,
  g as re,
  d as se,
  u as te,
  p as U,
  b as u,
  E as ue,
  c as V,
  l as v,
  s as x,
  S as Z,
} from "docs/_build/assets/web-yCR0qigV.js";

const L = "Invariant Violation",
  { setPrototypeOf: Ce = (e, n) => ((e.__proto__ = n), e) } = Object;
class I extends Error {
  framesToPop = 1;
  name = L;
  constructor(n = L) {
    super(
      typeof n == "number"
        ? `${L}: ${n} (see https://github.com/apollographql/invariant-packages)`
        : n,
    ),
      Ce(this, I.prototype);
  }
}
function S(e, n) {
  if (!e) throw new I(n);
}
const Ae = /^[A-Za-z]:\//;
function Pe(e = "") {
  return e && e.replace(/\\/g, "/").replace(Ae, (n) => n.toUpperCase());
}
const xe = /^[/\\]{2}/,
  Le = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/,
  Se = /^[A-Za-z]:$/,
  Te = (e) => {
    if (e.length === 0) return ".";
    e = Pe(e);
    const n = e.match(xe),
      t = N(e),
      r = e[e.length - 1] === "/";
    return (
      (e = Ne(e, !t)),
      e.length === 0
        ? t
          ? "/"
          : r
            ? "./"
            : "."
        : (r && (e += "/"),
          Se.test(e) && (e += "/"),
          n ? (t ? `//${e}` : `//./${e}`) : t && !N(e) ? `/${e}` : e)
    );
  },
  X = (...e) => {
    if (e.length === 0) return ".";
    let n;
    for (const t of e) t && t.length > 0 && (n === void 0 ? (n = t) : (n += `/${t}`));
    return n === void 0 ? "." : Te(n.replace(/\/\/+/g, "/"));
  };
function Ne(e, n) {
  let t = "",
    r = 0,
    s = -1,
    o = 0,
    l = null;
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length) l = e[a];
    else {
      if (l === "/") break;
      l = "/";
    }
    if (l === "/") {
      if (!(s === a - 1 || o === 1))
        if (o === 2) {
          if (
            t.length < 2 ||
            r !== 2 ||
            t[t.length - 1] !== "." ||
            t[t.length - 2] !== "."
          ) {
            if (t.length > 2) {
              const c = t.lastIndexOf("/");
              c === -1
                ? ((t = ""), (r = 0))
                : ((t = t.slice(0, c)), (r = t.length - 1 - t.lastIndexOf("/"))),
                (s = a),
                (o = 0);
              continue;
            } else if (t.length > 0) {
              (t = ""), (r = 0), (s = a), (o = 0);
              continue;
            }
          }
          n && ((t += t.length > 0 ? "/.." : ".."), (r = 2));
        } else
          t.length > 0 ? (t += `/${e.slice(s + 1, a)}`) : (t = e.slice(s + 1, a)),
            (r = a - s - 1);
      (s = a), (o = 0);
    } else l === "." && o !== -1 ? ++o : (o = -1);
  }
  return t;
}
const N = (e) => Le.test(e);
function Ie(e) {
  return `virtual:${e}`;
}
function Oe(e) {
  return e.handler?.endsWith(".html")
    ? N(e.handler)
      ? e.handler
      : X(e.root, e.handler)
    : `$vinxi/handler/${e.name}`;
}
const De = new Proxy(
  {},
  {
    get(e, n) {
      return (
        S(typeof n == "string", "Bundler name should be a string"),
        {
          baseURL: "/path-of-regex-ru",
          chunks: new Proxy(
            {},
            {
              get(t, r) {
                S(typeof r == "string", "Chunk expected");
                const s = X("/path-of-regex-ru", r + ".mjs");
                return {
                  import() {
                    return import(s);
                  },
                  output: { path: s },
                };
              },
            },
          ),
          handler: Ie(Oe({ name: n })),
          inputs: new Proxy(
            {},
            {
              get(t, r) {
                S(typeof r == "string", "Input must be string");
                const s = window.manifest[r].output;
                return {
                  async assets() {
                    return window.manifest[r].assets;
                  },
                  async import() {
                    return import(s);
                  },
                  output: { path: s },
                };
              },
            },
          ),
          name: n,
          type: "client",
        }
      );
    },
  },
);
globalThis.MANIFEST = De;
const Ue = (e) => (n) => {
  const { base: t } = n,
    r = V(() => n.children),
    s = A(() => fe(r(), n.base || ""));
  let o;
  const l = he(e, s, () => o, {
    base: t,
    singleFlight: n.singleFlight,
    transformUrl: n.transformUrl,
  });
  return (
    e.create && e.create(l),
    u(me.Provider, {
      get children() {
        return u(Me, {
          get children() {
            return [
              K(() => (o = re()) && null),
              u(je, {
                get branches() {
                  return s();
                },
                routerState: l,
              }),
            ];
          },
          get preload() {
            return n.rootPreload || n.rootLoad;
          },
          get root() {
            return n.root;
          },
          routerState: l,
        });
      },
      value: l,
    })
  );
};
function Me(e) {
  const n = e.routerState.location,
    t = e.routerState.params,
    r = A(
      () =>
        e.preload &&
        te(() => {
          j(!0), e.preload({ intent: pe() || "initial", location: n, params: t }), j(!1);
        }),
    );
  return u(Z, {
    children: (s) =>
      u(s, {
        get children() {
          return e.children;
        },
        get data() {
          return r();
        },
        location: n,
        params: t,
      }),
    get fallback() {
      return e.children;
    },
    keyed: !0,
    get when() {
      return e.root;
    },
  });
}
function je(e) {
  const n = [];
  let t;
  const r = A(
    ne(e.routerState.matches, (s, o, l) => {
      let a = o && s.length === o.length;
      const c = [];
      for (let i = 0, h = s.length; i < h; i++) {
        const w = o && o[i],
          p = s[i];
        l && w && p.route.key === w.route.key
          ? (c[i] = l[i])
          : ((a = !1),
            n[i] && n[i](),
            se((E) => {
              (n[i] = E),
                (c[i] = ve(
                  e.routerState,
                  c[i - 1] || e.routerState.base,
                  W(() => r()[i + 1]),
                  () => {
                    const y = e.routerState.matches();
                    return y[i] ?? y[0];
                  },
                ));
            }));
      }
      return n.splice(s.length).forEach((i) => i()), l && a ? l : ((t = c[0]), c);
    }),
  );
  return W(() => r() && t)();
}
const W = (e) => () =>
  u(Z, {
    children: (n) =>
      u(ge.Provider, {
        get children() {
          return n.outlet();
        },
        value: n,
      }),
    keyed: !0,
    get when() {
      return e();
    },
  });
function Fe([e, n], t, r) {
  return [e, r ? (s) => n(r(s)) : n];
}
function We(e) {
  let n = !1;
  const t = (s) => (typeof s == "string" ? { value: s } : s),
    r = Fe(
      ae(t(e.get()), { equals: (s, o) => s.value === o.value && s.state === o.state }),
      void 0,
      (s) => (!n && e.set(s), x.registry && !x.done && (x.done = !0), s),
    );
  return (
    e.init &&
      G(
        e.init((s = e.get()) => {
          (n = !0), r[1](t(s)), (n = !1);
        }),
      ),
    Ue({ create: e.create, signal: r, utils: e.utils })
  );
}
function Be(e, n, t) {
  return e.addEventListener(n, t), () => e.removeEventListener(n, t);
}
function qe(e, n) {
  const t = e && document.getElementById(e);
  t ? t.scrollIntoView() : n && window.scrollTo(0, 0);
}
const ze = new Map();
function He(e = !0, n = !1, t = "/_server", r) {
  return (s) => {
    const o = s.base.path(),
      l = s.navigatorFactory(s.base);
    let a, c;
    function i(d) {
      return d.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function h(d) {
      if (
        d.defaultPrevented ||
        d.button !== 0 ||
        d.metaKey ||
        d.altKey ||
        d.ctrlKey ||
        d.shiftKey
      )
        return;
      const f = d
        .composedPath()
        .find((D) => D instanceof Node && D.nodeName.toUpperCase() === "A");
      if (!f || (n && !f.hasAttribute("link"))) return;
      const g = i(f),
        m = g ? f.href.baseVal : f.href;
      if ((g ? f.target.baseVal : f.target) || (!m && !f.hasAttribute("state"))) return;
      const _ = (f.getAttribute("rel") || "").split(/\s+/);
      if (f.hasAttribute("download") || (_ && _.includes("external"))) return;
      const P = g ? new URL(m, document.baseURI) : new URL(m);
      if (
        !(
          P.origin !== window.location.origin ||
          (o && P.pathname && !P.pathname.toLowerCase().startsWith(o.toLowerCase()))
        )
      )
        return [f, P];
    }
    function w(d) {
      const f = h(d);
      if (!f) return;
      const [g, m] = f,
        O = s.parsePath(m.pathname + m.search + m.hash),
        _ = g.getAttribute("state");
      d.preventDefault(),
        l(O, {
          replace: g.hasAttribute("replace"),
          resolve: !1,
          scroll: !g.hasAttribute("noscroll"),
          state: _ ? JSON.parse(_) : void 0,
        });
    }
    function p(d) {
      const f = h(d);
      if (!f) return;
      const [g, m] = f;
      r && (m.pathname = r(m.pathname)),
        s.preloadRoute(m, g.getAttribute("preload") !== "false");
    }
    function E(d) {
      clearTimeout(a);
      const f = h(d);
      if (!f) return (c = null);
      const [g, m] = f;
      c !== g &&
        (r && (m.pathname = r(m.pathname)),
        (a = setTimeout(() => {
          s.preloadRoute(m, g.getAttribute("preload") !== "false"), (c = g);
        }, 20)));
    }
    function y(d) {
      if (d.defaultPrevented) return;
      let f =
        d.submitter && d.submitter.hasAttribute("formaction")
          ? d.submitter.getAttribute("formaction")
          : d.target.getAttribute("action");
      if (!f) return;
      if (!f.startsWith("https://action/")) {
        const m = new URL(f, we);
        if (((f = s.parsePath(m.pathname + m.search)), !f.startsWith(t))) return;
      }
      if (d.target.method.toUpperCase() !== "POST")
        throw new Error("Only POST forms are supported for Actions");
      const g = ze.get(f);
      if (g) {
        d.preventDefault();
        const m = new FormData(d.target, d.submitter);
        g.call(
          { f: d.target, r: s },
          d.target.enctype === "multipart/form-data" ? m : new URLSearchParams(m),
        );
      }
    }
    oe(["click", "submit"]),
      document.addEventListener("click", w),
      e &&
        (document.addEventListener("mousemove", E, { passive: !0 }),
        document.addEventListener("focusin", p, { passive: !0 }),
        document.addEventListener("touchstart", p, { passive: !0 })),
      document.addEventListener("submit", y),
      G(() => {
        document.removeEventListener("click", w),
          e &&
            (document.removeEventListener("mousemove", E),
            document.removeEventListener("focusin", p),
            document.removeEventListener("touchstart", p)),
          document.removeEventListener("submit", y);
      });
  };
}
function Ve(e) {
  const n = () => {
      const r = window.location.pathname.replace(/^\/+/, "/") + window.location.search,
        s =
          window.history.state &&
          window.history.state._depth &&
          Object.keys(window.history.state).length === 1
            ? void 0
            : window.history.state;
      return { state: s, value: r + window.location.hash };
    },
    t = be();
  return We({
    create: He(e.preload, e.explicitLinks, e.actionBase, e.transformUrl),
    get: n,
    init: (r) =>
      Be(
        window,
        "popstate",
        ye(r, (s) => {
          if (s) return !t.confirm(s);
          {
            const o = n();
            return !t.confirm(o.value, { state: o.state });
          }
        }),
      ),
    set({ value: r, replace: s, scroll: o, state: l }) {
      s ? window.history.replaceState($e(l), "", r) : window.history.pushState(l, "", r),
        qe(decodeURIComponent(window.location.hash.slice(1)), o),
        Ee();
    },
    utils: { beforeLeave: t, go: (r) => window.history.go(r) },
  })(e);
}
var Ke = $("<a>");
function Y(e) {
  e = R({ activeClass: "active", inactiveClass: "inactive" }, e);
  const [, n] = ie(e, ["href", "state", "class", "activeClass", "inactiveClass", "end"]),
    t = Re(() => e.href),
    r = ke(t),
    s = J(),
    o = A(() => {
      const l = t();
      if (l === void 0) return [!1, !1];
      const a = F(l.split(/[?#]/, 1)[0]).toLowerCase(),
        c = decodeURI(F(s.pathname).toLowerCase());
      return [e.end ? a === c : c.startsWith(a + "/") || c === a, a === c];
    });
  return (() => {
    var l = Ke();
    return (
      C(
        l,
        R(n, {
          get "aria-current"() {
            return o()[1] ? "page" : void 0;
          },
          get classList() {
            return {
              ...(e.class && { [e.class]: !0 }),
              [e.inactiveClass]: !o()[0],
              [e.activeClass]: o()[0],
              ...n.classList,
            };
          },
          get href() {
            return r() || e.href;
          },
          link: "",
          get state() {
            return JSON.stringify(e.state);
          },
        }),
        !1,
        !1,
      ),
      l
    );
  })();
}
function Ze(e) {
  e.forEach((n) => {
    if (!n.attrs.href) return;
    let t = document.head.querySelector(`link[href="${n.attrs.href}"]`);
    t ||
      ((t = document.createElement("link")),
      t.setAttribute("rel", "preload"),
      t.setAttribute("as", "style"),
      t.setAttribute("href", n.attrs.href),
      document.head.appendChild(t));
  });
}
var Ge = $("<style>"),
  Je = $("<link>"),
  Xe = $("<script> "),
  Ye = $("<noscript>");
const Qe = {
  link: (e) =>
    (() => {
      var n = Je();
      return (
        C(
          n,
          R(() => e.attrs),
          !1,
          !1,
        ),
        n
      );
    })(),
  noscript: (e) =>
    (() => {
      var n = Ye();
      return (
        C(
          n,
          R(() => e.attrs),
          !1,
          !0,
        ),
        n
      );
    })(),
  script: (e) =>
    e.attrs.src
      ? (() => {
          var n = Xe();
          return (
            C(
              n,
              R(() => e.attrs, {
                get id() {
                  return e.key;
                },
              }),
              !1,
              !0,
            ),
            n
          );
        })()
      : null,
  style: (e) =>
    (() => {
      var n = Ge();
      return (
        C(
          n,
          R(() => e.attrs),
          !1,
          !0,
        ),
        v(n, () => e.children),
        n
      );
    })(),
};
function et(e, n) {
  const { tag: t, attrs: { key: r, ...s } = { key: void 0 }, children: o } = e;
  return Qe[t]({ attrs: { ...s, nonce: n }, children: o, key: r });
}
function tt(e, n, t, r = "default") {
  return le(async () => {
    {
      const o = (await e.import())[r],
        a = (await n.inputs?.[e.src].assets()).filter(
          (i) => i.tag === "style" || i.attrs.rel === "stylesheet",
        );
      return (
        typeof window < "u" && Ze(a),
        { default: (i) => [...a.map((h) => et(h)), u(o, i)] }
      );
    }
  });
}
const k = { NORMAL: 0, PLACEHOLDER: 2, WILDCARD: 1 };
function nt(e = {}) {
  const n = { options: e, rootNode: Q(), staticRoutesMap: {} },
    t = (r) => (e.strictTrailingSlash ? r : r.replace(/\/$/, "") || "/");
  if (e.routes) for (const r in e.routes) B(n, t(r), e.routes[r]);
  return {
    ctx: n,
    insert: (r, s) => B(n, t(r), s),
    lookup: (r) => rt(n, t(r)),
    remove: (r) => st(n, t(r)),
  };
}
function rt(e, n) {
  const t = e.staticRoutesMap[n];
  if (t) return t.data;
  const r = n.split("/"),
    s = {};
  let o = !1,
    l = null,
    a = e.rootNode,
    c = null;
  for (let i = 0; i < r.length; i++) {
    const h = r[i];
    a.wildcardChildNode !== null &&
      ((l = a.wildcardChildNode), (c = r.slice(i).join("/")));
    const w = a.children.get(h);
    if (w === void 0) {
      if (a && a.placeholderChildren.length > 1) {
        const p = r.length - i;
        a = a.placeholderChildren.find((E) => E.maxDepth === p) || null;
      } else a = a.placeholderChildren[0] || null;
      if (!a) break;
      a.paramName && (s[a.paramName] = h), (o = !0);
    } else a = w;
  }
  return (
    (a === null || a.data === null) &&
      l !== null &&
      ((a = l), (s[a.paramName || "_"] = c), (o = !0)),
    a ? (o ? { ...a.data, params: o ? s : void 0 } : a.data) : null
  );
}
function B(e, n, t) {
  let r = !0;
  const s = n.split("/");
  let o = e.rootNode,
    l = 0;
  const a = [o];
  for (const c of s) {
    let i;
    if ((i = o.children.get(c))) o = i;
    else {
      const h = at(c);
      (i = Q({ parent: o, type: h })),
        o.children.set(c, i),
        h === k.PLACEHOLDER
          ? ((i.paramName = c === "*" ? `_${l++}` : c.slice(1)),
            o.placeholderChildren.push(i),
            (r = !1))
          : h === k.WILDCARD &&
            ((o.wildcardChildNode = i), (i.paramName = c.slice(3) || "_"), (r = !1)),
        a.push(i),
        (o = i);
    }
  }
  for (const [c, i] of a.entries()) i.maxDepth = Math.max(a.length - c, i.maxDepth || 0);
  return (o.data = t), r === !0 && (e.staticRoutesMap[n] = o), o;
}
function st(e, n) {
  let t = !1;
  const r = n.split("/");
  let s = e.rootNode;
  for (const o of r) if (((s = s.children.get(o)), !s)) return t;
  if (s.data) {
    const o = r.at(-1) || "";
    (s.data = null),
      Object.keys(s.children).length === 0 &&
        s.parent &&
        (s.parent.children.delete(o),
        (s.parent.wildcardChildNode = null),
        (s.parent.placeholderChildren = [])),
      (t = !0);
  }
  return t;
}
function Q(e = {}) {
  return {
    children: new Map(),
    data: e.data || null,
    maxDepth: 0,
    paramName: e.paramName || null,
    parent: e.parent || null,
    placeholderChildren: [],
    type: e.type || k.NORMAL,
    wildcardChildNode: null,
  };
}
function at(e) {
  return e.startsWith("**")
    ? k.WILDCARD
    : e[0] === ":" || e === "*"
      ? k.PLACEHOLDER
      : k.NORMAL;
}
const ot = "modulepreload",
  it = (e) => "/path-of-regex-ru/" + e,
  q = {},
  T = (n, t, r) => {
    let s = Promise.resolve();
    if (t && t.length > 0) {
      const l = (i) =>
        Promise.all(
          i.map((h) =>
            Promise.resolve(h).then(
              (w) => ({ status: "fulfilled", value: w }),
              (w) => ({ reason: w, status: "rejected" }),
            ),
          ),
        );
      document.getElementsByTagName("link");
      const a = document.querySelector("meta[property=csp-nonce]"),
        c = a?.nonce || a?.getAttribute("nonce");
      s = l(
        t.map((i) => {
          if (((i = it(i)), i in q)) return;
          q[i] = !0;
          const h = i.endsWith(".css"),
            w = h ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${i}"]${w}`)) return;
          const p = document.createElement("link");
          if (
            ((p.rel = h ? "stylesheet" : ot),
            h || (p.as = "script"),
            (p.crossOrigin = ""),
            (p.href = i),
            c && p.setAttribute("nonce", c),
            document.head.appendChild(p),
            h)
          )
            return new Promise((E, y) => {
              p.addEventListener("load", E),
                p.addEventListener("error", () =>
                  y(new Error(`Unable to preload CSS for ${i}`)),
                );
            });
        }),
      );
    }
    function o(l) {
      const a = new Event("vite:preloadError", { cancelable: !0 });
      if (((a.payload = l), window.dispatchEvent(a), !a.defaultPrevented)) throw l;
    }
    return s.then((l) => {
      for (const a of l || []) a.status === "rejected" && o(a.reason);
      return n().catch(o);
    });
  },
  lt = {},
  ct = {
    preload() {
      _e();
    },
  },
  ee = [
    {
      $component: {
        build: () =>
          T(
            () => import("docs/_build/assets/_...404_-C4Sf2Yv_.js"),
            __vite__mapDeps([0, 1]),
          ),
        import: () =>
          import(
            globalThis.MANIFEST.client.inputs[
              "src/routes/[...404].tsx?pick=default&pick=$css"
            ].output.path
          ),
        src: "src/routes/[...404].tsx?pick=default&pick=$css",
      },
      filePath:
        "/Users/maksimprudnikau/Projects/path-of-regex-ru/src/routes/[...404].tsx",
      page: !0,
      path: "/*404",
    },
    {
      $$route: { require: () => ({ route: lt }), src: "src/routes/index.tsx?pick=route" },
      $component: {
        build: () =>
          T(
            () => import("docs/_build/assets/index-C-GBBqP_.js"),
            __vite__mapDeps([2, 1]),
          ),
        import: () =>
          import(
            globalThis.MANIFEST.client.inputs[
              "src/routes/index.tsx?pick=default&pick=$css"
            ].output.path
          ),
        src: "src/routes/index.tsx?pick=default&pick=$css",
      },
      filePath: "/Users/maksimprudnikau/Projects/path-of-regex-ru/src/routes/index.tsx",
      page: !0,
      path: "/",
    },
    {
      $$route: { require: () => ({ route: ct }), src: "src/routes/maps.tsx?pick=route" },
      $component: {
        build: () =>
          T(
            () => import("docs/_build/assets/maps-Cp_PVBqx.js"),
            __vite__mapDeps([3, 1, 4]),
          ),
        import: () =>
          import(
            globalThis.MANIFEST.client.inputs[
              "src/routes/maps.tsx?pick=default&pick=$css"
            ].output.path
          ),
        src: "src/routes/maps.tsx?pick=default&pick=$css",
      },
      filePath: "/Users/maksimprudnikau/Projects/path-of-regex-ru/src/routes/maps.tsx",
      page: !0,
      path: "/maps",
    },
  ],
  ut = dt(ee.filter((e) => e.page));
function dt(e) {
  function n(t, r, s, o) {
    const l = Object.values(t).find((a) => s.startsWith(a.id + "/"));
    return l
      ? (n(l.children || (l.children = []), r, s.slice(l.id.length)), t)
      : (t.push({ ...r, id: s, path: s.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/") }),
        t);
  }
  return e
    .sort((t, r) => t.path.length - r.path.length)
    .reduce((t, r) => n(t, r, r.path, r.path), []);
}
function ft(e) {
  return e.$HEAD || e.$GET || e.$POST || e.$PUT || e.$PATCH || e.$DELETE;
}
nt({
  routes: ee.reduce((e, n) => {
    if (!ft(n)) return e;
    const t = n.path
      .replace(/\([^)/]+\)/g, "")
      .replace(/\/+/g, "/")
      .replace(/\*([^/]*)/g, (r, s) => `**:${s}`)
      .split("/")
      .map((r) => (r.startsWith(":") || r.startsWith("*") ? r : encodeURIComponent(r)))
      .join("/");
    if (/:[^/]*\?/g.test(t))
      throw new Error(`Optional parameters are not supported in API routes: ${t}`);
    if (e[t])
      throw new Error(
        `Duplicate API routes for "${t}" found at "${e[t].route.path}" and "${n.path}"`,
      );
    return (e[t] = { route: n }), e;
  }, {}),
});
function ht() {
  function e(t) {
    return {
      ...t,
      ...(t.$$route ? t.$$route.require().route : void 0),
      children: t.children ? t.children.map(e) : void 0,
      component:
        t.$component &&
        tt(t.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr),
      info: { ...(t.$$route ? t.$$route.require().route.info : {}), filesystem: !0 },
    };
  }
  return ut.map(e);
}
let z;
const mt = () => z || (z = ht());
var pt = $("<img width=40>"),
  gt = $("<div data-tip=Скоро...>");
function b(e) {
  const n = V(() => e.children),
    t = J(),
    r = A(() => t.pathname.includes(e.icon));
  return (() => {
    var s = gt();
    return (
      v(
        s,
        u(Y, {
          get children() {
            return [
              (() => {
                var o = pt();
                return (
                  U(
                    (l) => {
                      var a = e.icon,
                        c = `/icons/${e.icon}.png`;
                      return (
                        a !== l.e && M(o, "alt", (l.e = a)),
                        c !== l.t && M(o, "src", (l.t = c)),
                        l
                      );
                    },
                    { e: void 0, t: void 0 },
                  ),
                  o
                );
              })(),
              K(() => n()),
            ];
          },
          class:
            "link link-hover flex gap-2 items-center px-3 py-2 hover:bg-base-300 rounded-xl text",
          get classList() {
            return {
              "bg-base-300": r(),
              "pointer-events-none opacity-30 line-through": e.disabled,
            };
          },
          get href() {
            return `/${e.icon}`;
          },
        }),
      ),
      U(() => s.classList.toggle("tooltip", !!e.disabled)),
      s
    );
  })();
}
var vt = $(
  '<header class="w-full col gap-10 items-start"><h1></h1><div class="flex gap-3 flex-wrap">',
);
function wt() {
  return (() => {
    var e = vt(),
      n = e.firstChild,
      t = n.nextSibling;
    return (
      v(
        n,
        u(Y, {
          children: "Path of Regex Ru (Русская версия)",
          class: "link link-hover",
          href: "/",
        }),
      ),
      v(t, u(b, { children: "Торговцы", disabled: !0, icon: "vendors" }), null),
      v(t, u(b, { children: "Карты", icon: "maps" }), null),
      v(t, u(b, { children: "Предметы", disabled: !0, icon: "items" }), null),
      v(t, u(b, { children: "Названия карт", disabled: !0, icon: "map-names" }), null),
      v(t, u(b, { children: "Экспедиция", disabled: !0, icon: "expedition" }), null),
      v(t, u(b, { children: "Кража", disabled: !0, icon: "heists" }), null),
      v(t, u(b, { children: "Флаконы", disabled: !0, icon: "flasks" }), null),
      v(t, u(b, { children: "Бестиарий", disabled: !0, icon: "bestiary" }), null),
      v(t, u(b, { children: "Скарабеи", disabled: !0, icon: "scarabs" }), null),
      v(t, u(b, { children: "Камни", disabled: !0, icon: "jewels" }), null),
      e
    );
  })();
}
var bt = $("<div class=w-full>");
function $t(e) {
  return (() => {
    var n = bt();
    return (
      v(n, u(wt, {}), null),
      v(
        n,
        u(ce, {
          get children() {
            return e.children;
          },
        }),
        null,
      ),
      n
    );
  })();
}
function Et() {
  return u(Ve, {
    get children() {
      return u(mt, {});
    },
    root: $t,
  });
}
const yt = (e) => null;
var Rt = $(
  "<span style=font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%>",
);
const kt = (e) => {
  const n = "Error | Uncaught Client Exception";
  return u(ue, {
    get children() {
      return e.children;
    },
    fallback: (t) => (
      console.error(t),
      [
        (() => {
          var r = Rt();
          return v(r, n), r;
        })(),
        u(yt, { code: 500 }),
      ]
    ),
  });
};
function H(e) {
  return e.children;
}
function _t() {
  return u(H, {
    get children() {
      return u(H, {
        get children() {
          return u(kt, {
            get children() {
              return u(Et, {});
            },
          });
        },
      });
    },
  });
}
function Ct(e, n) {
  de(e, n);
}
const At = Ct(() => u(_t, {}), document.getElementById("app")),
  Lt = At;
export { Lt as default };
