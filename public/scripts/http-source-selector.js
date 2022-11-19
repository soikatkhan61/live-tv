/**
 * videojs-http-source-selector
 * @version 1.0.2
 * @copyright 2018 [object Object]
 * @license MIT
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t(require("video.js")))
    : "function" == typeof define && define.amd
    ? define(["video.js"], t)
    : (e.videojsHttpSourceSelector = t(e.videojs));
})(this, function (l) {
  "use strict";
  l = l && l.hasOwnProperty("default") ? l.default : l;
  var o = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    e = function (e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    },
    r = function (e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    },
    a = (function (i) {
      function n(e, t) {
        o(this, n);
        var l = r(this, i.call(this, e, t));
        return (t.selectable = !0), l;
      }
      return (
        e(n, i),
        (n.prototype.sibilings = function (l) {
          var e =
              (function () {
                for (var e = l, t = []; (e = e.previousElementSibling); )
                  t.push(e);
                return t;
              })() || [],
            t =
              (function () {
                for (var e = l, t = []; (e = e.nextElementSibling); ) t.push(e);
                return t;
              })() || [];
          return e.concat(t);
        }),
        (n.prototype.handleClick = function () {
          (this.selected_ = !0), this.selected(!0);
          for (var e = 0; e < this.player().qualityLevels().length; e++)
            this.options_.index == this.player().qualityLevels().length
              ? (this.player().qualityLevels()[e].enabled = !0)
              : e == this.options_.index
              ? (this.player().qualityLevels()[e].enabled = !0)
              : (this.player().qualityLevels()[e].enabled = !1);
          for (var t = this.sibilings(this.el_), l = 0; l < t.length; l++)
            t[l].classList.remove("selected-quality");
          this.el_.classList.add("selected-quality");
        }),
        (n.prototype.update = function () {
          var e = this.player().qualityLevels().selectedIndex;
          this.selected(this.options_.index == e),
            (this.selected_ = this.options_.index === e);
        }),
        n
      );
    })(videojs.getComponent("MenuItem")),
    u = videojs.getComponent("MenuButton"),
    i = (function (n) {
      function s(e, t) {
        o(this, s);
        var l = r(this, n.call(this, e, t));
        u.apply(l, arguments);
        l.player().qualityLevels();
        if (t && t.default)
          if ("low" == t.default)
            for (var i = 0; i < l.player().qualityLevels().length; i++)
              l.player().qualityLevels()[i].enabled = 0 == i;
          else if ((t.default = "high"))
            for (i = 0; i < l.player().qualityLevels().length; i++)
              i == l.player().qualityLevels().length - 1
                ? (l.player().qualityLevels()[i].enabled = !0)
                : (l.player().qualityLevels()[i].enabled = !1);
        return l;
      }
      return (
        e(s, n),
        (s.prototype.createEl = function () {
          return videojs.dom.createEl("div", {
            className:
              "vjs-http-source-selector vjs-menu-button vjs-menu-button-popup vjs-control vjs-button",
          });
        }),
        (s.prototype.buildCSSClass = function () {
          return u.prototype.buildCSSClass.call(this) + " vjs-icon-cog";
        }),
        (s.prototype.update = function () {
          return u.prototype.update.call(this);
        }),
        (s.prototype.createItems = function () {
          for (
            var e = [], t = (this.player.qualityLevels, 0);
            t < this.player().qualityLevels().length;
            t++
          ) {
            var l = this.player().qualityLevels().length - (t + 1),
              i = "" + l;
            this.player().qualityLevels()[l].height
              ? (i = this.player().qualityLevels()[l].height)
              : this.player().qualityLevels()[l].bitrate &&
                (i =
                  Math.floor(this.player().qualityLevels()[l].bitrate / 1e3) +
                  " kbps"),
              e.push(
                new a(this.player_, {
                  label: i,
                  index: l,
                  selected:
                    l === (!!this.player().qualityLevels().selectedIndex && i),
                })
              );
          }
          if (1 < this.player().qualityLevels().length) {
            var n = new a(this.player_, {
              label: "Auto",
              index: this.player().qualityLevels().length,
              selected: !1,
            });
            n.el_.classList.add("selected-quality"), e.push(n);
          }
          return e;
        }),
        s
      );
    })(u),
    n = {},
    t = l.registerPlugin || l.plugin,
    s = function (e) {
      var t = this;
      this.ready(function () {
        !(function (t, e) {
          if ((t.addClass("vjs-http-source-selector"), "Html5" != t.techName_))
            return;
          t.on(["loadedmetadata"], function (e) {
            t.qualityLevels(),
              l.log("loadmeadata event"),
              "undefined" == t.videojs_http_source_selector_initialized ||
                1 == t.videojs_http_source_selector_initialized ||
                ((t.videojs_http_source_selector_initialized = !0),
                t.getChild("controlBar").addChild("SourceMenuButton", {}));
          });
        })(t, l.mergeOptions(n, e));
      }),
        l.registerComponent("SourceMenuButton", i),
        l.registerComponent("SourceMenuItem", a);
    };
  return t("httpSourceSelector", s), (s.VERSION = "1.0.2"), s;
});
