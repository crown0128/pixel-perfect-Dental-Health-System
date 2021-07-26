(function () {
  this.Calendly = {}, this.Calendly._util = {}
}).call(this), Calendly._util.domReady = function (t) {
    var e = !1,
      n = function () {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", o), window.removeEventListener("load", o)) : (document.detachEvent("onreadystatechange", o), window.detachEvent("onload", o))
      },
      o = function () {
        e || !document.addEventListener && "load" !== event.type && "complete" !== document.readyState || (e = !0, n(), t())
      };
    if ("complete" === document.readyState) t();
    else if (document.addEventListener) document.addEventListener("DOMContentLoaded", o), window.addEventListener("load", o);
    else {
      document.attachEvent("onreadystatechange", o), window.attachEvent("onload", o);
      var i = !1;
      try {
        i = null == window.frameElement && document.documentElement
      } catch (r) {}
      i && i.doScroll && ! function l() {
        if (!e) {
          try {
            i.doScroll("left")
          } catch (o) {
            return setTimeout(l, 50)
          }
          e = !0, n(), t()
        }
      }()
    }
  }, Calendly._util.assign = function (t) {
    "use strict";
    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
    for (var e = Object(t), n = 1; n < arguments.length; n++) {
      var o = arguments[n];
      if (null != o)
        for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
    }
    return e
  },
  function () {
    Calendly._url = {}, Calendly._url.extractQueryStringParams = function (t) {
      var e, n, o, i, r, l, a, u, d, s;
      for (a = document.createElement("a"), a.href = t, r = a.search.substr(1), l = {}, u = r.split("&"), e = 0, o = u.length; o > e; e++) i = u[e], d = i.split("="), n = d[0], s = d[1], void 0 !== s && (l[n.toLowerCase()] = decodeURIComponent(s));
      return l
    }, Calendly._url.stripQuery = function (t) {
      return t.split("?")[0]
    }
  }.call(this),
  function () {
    Calendly._util.snakeCaseKeys = function (t) {
      var e, n, o;
      o = {};
      for (n in t) e = n.split(/(?=[A-Z])/).join("_").toLowerCase(), o[e] = t[n];
      return o
    }, Calendly._util.pick = function (t, e) {
      var n, o, i, r;
      if (t) {
        for (r = {}, n = 0, i = e.length; i > n; n++) o = e[n], t[o] && (r[o] = t[o]);
        return r
      }
    }
  }.call(this),
  function (t, e) {
    if ("function" == typeof define && define.amd) define(["exports"], e);
    else if ("undefined" != typeof exports) e(exports);
    else {
      var n = {
        exports: {}
      };
      e(n.exports), t.bodyScrollLock = n.exports
    }
  }(this, function (t) {
    "use strict";

    function e(t) {
      if (Array.isArray(t)) {
        for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
        return n
      }
      return Array.from(t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = !1;
    if ("undefined" != typeof window) {
      var o = {
        get passive() {
          n = !0
        }
      };
      window.addEventListener("testPassive", null, o), window.removeEventListener("testPassive", null, o)
    }
    var i = "undefined" != typeof window && window.navigator && window.navigator.platform && /iP(ad|hone|od)/.test(window.navigator.platform),
      r = [],
      l = !1,
      a = -1,
      u = void 0,
      d = void 0,
      s = function (t) {
        return r.some(function (e) {
          return !(!e.options.allowTouchMove || !e.options.allowTouchMove(t))
        })
      },
      c = function (t) {
        var e = t || window.event;
        return s(e.target) ? !0 : e.touches.length > 1 ? !0 : (e.preventDefault && e.preventDefault(), !1)
      },
      p = function (t) {
        setTimeout(function () {
          if (void 0 === d) {
            var e = !!t && t.reserveScrollBarGap === !0,
              n = window.innerWidth - document.documentElement.clientWidth;
            e && n > 0 && (d = document.body.style.paddingRight, document.body.style.paddingRight = n + "px")
          }
          void 0 === u && (u = document.body.style.overflow, document.body.style.overflow = "hidden")
        })
      },
      h = function () {
        setTimeout(function () {
          void 0 !== d && (document.body.style.paddingRight = d, d = void 0), void 0 !== u && (document.body.style.overflow = u, u = void 0)
        })
      },
      y = function (t) {
        return t ? t.scrollHeight - t.scrollTop <= t.clientHeight : !1
      },
      m = function (t, e) {
        var n = t.targetTouches[0].clientY - a;
        return s(t.target) ? !1 : e && 0 === e.scrollTop && n > 0 ? c(t) : y(e) && 0 > n ? c(t) : (t.stopPropagation(), !0)
      };
    t.disableBodyScroll = function (t, o) {
      if (i) {
        if (!t) return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
        if (t && !r.some(function (e) {
            return e.targetElement === t
          })) {
          var u = {
            targetElement: t,
            options: o || {}
          };
          r = [].concat(e(r), [u]), t.ontouchstart = function (t) {
            1 === t.targetTouches.length && (a = t.targetTouches[0].clientY)
          }, t.ontouchmove = function (e) {
            1 === e.targetTouches.length && m(e, t)
          }, l || (document.addEventListener("touchmove", c, n ? {
            passive: !1
          } : void 0), l = !0)
        }
      } else {
        p(o);
        var d = {
          targetElement: t,
          options: o || {}
        };
        r = [].concat(e(r), [d])
      }
    }, t.clearAllBodyScrollLocks = function () {
      i ? (r.forEach(function (t) {
        t.targetElement.ontouchstart = null, t.targetElement.ontouchmove = null
      }), l && (document.removeEventListener("touchmove", c, n ? {
        passive: !1
      } : void 0), l = !1), r = [], a = -1) : (h(), r = [])
    }, t.enableBodyScroll = function (t) {
      if (i) {
        if (!t) return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
        t.ontouchstart = null, t.ontouchmove = null, r = r.filter(function (e) {
          return e.targetElement !== t
        }), l && 0 === r.length && (document.removeEventListener("touchmove", c, n ? {
          passive: !1
        } : void 0), l = !1)
      } else 1 === r.length && r[0].targetElement === t ? (h(), r = []) : r = r.filter(function (e) {
        return e.targetElement !== t
      })
    }
  }),
  function () {
    var t, e, n, o, i;
    Calendly._autoLoadInlineWidgets = function () {
      return Calendly._util.domReady(function () {
        return e()
      })
    }, Calendly.initBadgeWidget = function (e) {
      return Calendly._util.domReady(function () {
        return t(e)
      })
    }, Calendly.destroyBadgeWidget = function () {
      return Calendly.badgeWidget ? (Calendly.badgeWidget.destroy(), delete Calendly.badgeWidget) : void 0
    }, Calendly.initPopupWidget = function (t) {
      return Calendly._util.domReady(function () {
        return Calendly.showPopupWidget(t.url, "PopupText", t)
      })
    }, Calendly.initInlineWidget = function (t) {
      return t.url ? (t.parentElement || (t.parentElement = o()), Calendly._util.domReady(function () {
        return t.embedType = "Inline", new Calendly.Iframe(t)
      })) : void 0
    }, Calendly.showPopupWidget = function (t, e, n) {
      var o;
      return null == e && (e = "PopupText"), null == n && (n = {}), this.closePopupWidget(), o = function () {
        return delete Calendly.popupWidget
      }, Calendly.popupWidget = new Calendly.PopupWidget(t, o, e, n), Calendly.popupWidget.show()
    }, Calendly.closePopupWidget = function () {
      return Calendly.popupWidget ? Calendly.popupWidget.close() : void 0
    }, o = function () {
      var t;
      return t = document.scripts[document.scripts.length - 1], t.parentNode
    }, e = function () {
      var t, e, n, o, r;
      for (e = document.querySelectorAll(".calendly-inline-widget"), r = [], n = 0, o = e.length; o > n; n++) t = e[n], i(t) ? r.push(void 0) : (t.setAttribute("data-processed", !0), r.push(new Calendly.Iframe({
        parentElement: t,
        inlineStyles: !0,
        embedType: "Inline"
      })));
      return r
    }, i = function (t) {
      return t.getAttribute("data-processed") || "false" === t.getAttribute("data-auto-load")
    }, t = function (t) {
      var e, o, i;
      return Calendly.destroyBadgeWidget(), e = n(t), i = function () {
        return Calendly.showPopupWidget(t.url, "PopupWidget", t)
      }, o = Calendly._util.assign({
        onClick: i
      }, e), Calendly.badgeWidget = new Calendly.BadgeWidget(o)
    }, n = function (t) {
      var e, n;
      return e = ["color", "textColor", "text", "branding"], n = {}, e.forEach(function (e) {
        return n[e] = t[e], delete t[e]
      }), n
    }
  }.call(this),
  function () {
    Calendly.Iframe = function () {
      function t(t) {
        this.options = t, this.parseOptions(), this.build(), this.inject()
      }
      return t.prototype.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), t.prototype.parseOptions = function () {
        var t;
        if (t = {
            inlineStyles: !1
          }, this.options = Calendly._util.assign({}, t, this.options), this.parent = this.options.parentElement, !this.parent) throw "Calendly: Parent element not set";
        if (this.parent.jquery && (this.parent = this.parent[0]), this.inlineStyles = this.options.inlineStyles, this.embedType = this.options.embedType, this.url = (this.options.url || this.getUrlFromParent()).split("#")[0], !this.url) throw "Calendly: Widget URL not set"
      }, t.prototype.build = function () {
        return this.node = document.createElement("iframe"), this.node.src = this.getSource(), this.node.width = "100%", this.node.height = "100%", this.node.frameBorder = "0"
      }, t.prototype.inject = function () {
        return this.format(), this.parent.appendChild(this.buildSpinner()), this.parent.appendChild(this.node)
      }, t.prototype.getSource = function () {
        var t;
        return t = Calendly._url.stripQuery(this.url) + "?" + this.getParams(), this.filterConsentParam(t)
      }, t.prototype.getUrlFromParent = function () {
        return this.parent.getAttribute("data-url")
      }, t.prototype.getParams = function () {
        var t, e, n, o;
        e = {
          embed_domain: this.getDomain(),
          embed_type: this.embedType
        }, e = Calendly._util.assign(e, this.getUtmParamsFromHost(), this.getParamsFromUrl(), this.getParamsFromOptions()), n = [];
        for (t in e) o = e[t], n.push(t + "=" + encodeURIComponent(o));
        return n.join("&")
      }, t.prototype.getUtmParamsFromHost = function () {
        var t, e;
        return t = ["utm_campaign", "utm_source", "utm_medium", "utm_content", "utm_term"], e = Calendly._url.extractQueryStringParams(window.location.href), Calendly._util.pick(e, t)
      }, t.prototype.getParamsFromUrl = function () {
        return Calendly._url.extractQueryStringParams(this.url)
      }, t.prototype.getParamsFromOptions = function () {
        return Calendly._util.assign({}, this.getPrefillParams(), this.getUtmParams())
      }, t.prototype.getUtmParams = function () {
        var t;
        return this.options.utm ? (t = ["utmCampaign", "utmSource", "utmMedium", "utmContent", "utmTerm"], Calendly._util.snakeCaseKeys(Calendly._util.pick(this.options.utm, t))) : null
      }, t.prototype.getPrefillParams = function () {
        var t, e, n, o, i;
        if (!this.options.prefill) return null;
        if (e = ["name", "firstName", "lastName", "email"], n = Calendly._util.snakeCaseKeys(Calendly._util.pick(this.options.prefill, e)), this.options.prefill.customAnswers) {
          o = this.options.prefill.customAnswers;
          for (t in o) i = o[t], t.match(/^a\d{1,2}$/) && (n[t] = i)
        }
        return n
      }, t.prototype.getDomain = function () {
        return document.location.host
      }, t.prototype.filterConsentParam = function (t) {
        return t.replace(/consent_accept=1&?/g, "")
      }, t.prototype.format = function () {
        return this.isMobile ? this.formatMobile() : this.formatDesktop()
      }, t.prototype.formatDesktop = function () {
        return this.inlineStyles ? this.parent.setAttribute("style", "position: relative;" + this.parent.getAttribute("style")) : void 0
      }, t.prototype.formatMobile = function () {
        return this.inlineStyles ? this.parent.setAttribute("style", "position: relative;overflow-y:auto;-webkit-overflow-scrolling:touch;" + this.parent.getAttribute("style")) : this.parent.className += " mobile"
      }, t.prototype.buildSpinner = function () {
        var t;
        return t = document.createElement("div"), t.className = "spinner", t.appendChild(this.buildBounce(1)), t.appendChild(this.buildBounce(2)), t.appendChild(this.buildBounce(3)), t
      }, t.prototype.buildBounce = function (t) {
        var e;
        return e = document.createElement("div"), e.className = "bounce" + t, e
      }, t
    }()
  }.call(this),
  function () {
    var t = function (t, e) {
      return function () {
        return t.apply(e, arguments)
      }
    };
    Calendly.PopupWidget = function () {
      function e(e, n, o, i) {
        this.url = e, this.onClose = n, this.embedType = o, this.options = null != i ? i : {}, this.close = t(this.close, this)
      }
      return e.prototype.show = function () {
        return this.buildOverlay(), this.insertOverlay(), this.lockPageScroll()
      }, e.prototype.close = function () {
        return this.unlockPageScroll(), this.destroyOverlay(), this.onClose()
      }, e.prototype.buildOverlay = function () {
        return this.overlay = document.createElement("div"), this.overlay.className = "calendly-overlay", this.overlay.appendChild(this.buildCloseOverlay()), this.overlay.appendChild(this.buildPopup()), this.overlay.appendChild(this.buildCloseButton())
      }, e.prototype.insertOverlay = function () {
        return document.body.appendChild(this.overlay)
      }, e.prototype.buildCloseOverlay = function () {
        var t;
        return t = document.createElement("div"), t.className = "calendly-close-overlay", t.onclick = this.close, t
      }, e.prototype.buildPopup = function () {
        var t;
        return t = document.createElement("div"), t.className = "calendly-popup", t.appendChild(this.buildPopupContent()), t
      }, e.prototype.buildPopupContent = function () {
        var t;
        return t = document.createElement("div"), t.className = "calendly-popup-content", t.setAttribute("data-url", this.url), this.options.parentElement = t, this.options.embedType = this.embedType, new Calendly.Iframe(this.options), t
      }, e.prototype.buildCloseButton = function () {
        var t;
        return t = document.createElement("div"), t.className = "calendly-popup-close", t.onclick = this.close, t
      }, e.prototype.destroyOverlay = function () {
        return this.overlay.parentNode.removeChild(this.overlay)
      }, e.prototype.lockPageScroll = function () {
        return bodyScrollLock.disableBodyScroll(this.overlay), document.addEventListener("touchmove", this.handleLockedTouchmove, {
          passive: !1
        })
      }, e.prototype.unlockPageScroll = function () {
        return bodyScrollLock.enableBodyScroll(this.overlay), document.removeEventListener("touchmove", this.handleLockedTouchmove, {
          passive: !1
        })
      }, e.prototype.handleLockedTouchmove = function (t) {
        return t.preventDefault()
      }, e
    }()
  }.call(this),
  function () {
    Calendly.BadgeWidget = function () {
      function t(t) {
        this.options = t, this.buildWidget(), this.insertWidget()
      }
      return t.prototype.destroy = function () {
        return this.widget.parentNode.removeChild(this.widget)
      }, t.prototype.buildWidget = function () {
        return this.widget = document.createElement("div"), this.widget.className = "calendly-badge-widget", this.widget.appendChild(this.buildContent())
      }, t.prototype.insertWidget = function () {
        return document.body.insertBefore(this.widget, document.body.firstChild)
      }, t.prototype.buildContent = function () {
        var t;
        return t = document.createElement("div"), t.className = "calendly-badge-content", "#ffffff" === this.options.color && (t.className += " white"), t.onclick = this.options.onClick, t.innerHTML = this.options.text, t.style.background = this.options.color, t.style.color = this.options.textColor, this.options.branding && t.appendChild(this.buildBranding()), t
      }, t.prototype.buildBranding = function () {
        var t;
        return t = document.createElement("span"), t.innerHTML = "powered by Calendly", t
      }, t
    }()
  }.call(this), Calendly._autoLoadInlineWidgets();
