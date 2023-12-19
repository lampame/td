(function () {
  'use strict';

  function qBittorrentClient(selectedTorrent) {
    if (selectedTorrent) {
      // Authentication request
      var authXhr = new XMLHttpRequest();
      authXhr.open("GET", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl"), ":").concat(Lampa.Storage.get("qBittorentPort"), "/api/v2/auth/login?username=").concat(Lampa.Storage.get("qBittorentUser"), "&password=").concat(Lampa.Storage.get("qBittorentPass")), true);
      authXhr.onreadystatechange = function () {
        if (authXhr.readyState === 4) {
          // Add torrent request
          var addXhr = new XMLHttpRequest();
          addXhr.open("POST", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl"), ":").concat(Lampa.Storage.get("qBittorentPort"), "/api/v2/torrents/add"), true);
          addXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          addXhr.onreadystatechange = function () {
            if (addXhr.readyState === 4) {
              // Get torrent list to find the hash of the last added torrent
              var listXhr = new XMLHttpRequest();
              listXhr.open("GET", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl"), ":").concat(Lampa.Storage.get("qBittorentPort"), "/api/v2/torrents/info?sort=added_on&reverse=true"), true);
              listXhr.onreadystatechange = function () {
                Lampa.Noty.show("Bad" + JSON.parse(listXhr.responseText));
                if (listXhr.readyState === 4) {
                  var torrents = JSON.parse(listXhr.responseText);
                  var lastAddedTorrent = torrents[0].hash;
                  // Set first/last piece priority
                  var firstXhr = new XMLHttpRequest();
                  firstXhr.open("GET", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl"), ":").concat(Lampa.Storage.get("qBittorentPort"), "/api/v2/torrents/toggleFirstLastPiecePrio?hashes=").concat(lastAddedTorrent), true);
                  firstXhr.onreadystatechange = function () {
                    if (firstXhr.readyState === 4) {
                      // Toggle sequential download
                      var toggleXhr = new XMLHttpRequest();
                      toggleXhr.open("GET", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl"), ":").concat(Lampa.Storage.get("qBittorentPort"), "/api/v2/torrents/toggleSequentialDownload?hashes=").concat(lastAddedTorrent), true);
                      toggleXhr.onreadystatechange = function () {
                        if (toggleXhr.readyState === 4) {
                          Lampa.Noty.show("Torrent is being downloaded in qBittorrent");
                        }
                      };
                      toggleXhr.send();
                    }
                  };
                  firstXhr.send();
                }
              };
              listXhr.send();
            }
          };
          var data = "urls=" + encodeURIComponent(selectedTorrent);
          addXhr.send(data);
        } else {
          Lampa.Noty.show("Authentication failed");
        }
      };
      authXhr.send();
    }
    setTimeout(function () {
      Lampa.Select.close();
    }, 10);
  }


  function getStatus$1() {
    var statusXhr = new XMLHttpRequest();
    statusXhr.withCredentials = false;
    statusXhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          $('#qBittorentgetStatus').removeClass('active error wait').addClass('active');
          $("#qBittorentgetStatusBtn").text(function (i, text) {
            return "🟢 " + text;
          });
        } else if (this.status === undefined) {
          $('#qBittorentgetStatus').removeClass('active error wait').addClass('error');
          $("#qBittorentgetStatusBtn").text(function (i, text) {
            return "🔴 " + text;
          });
        } else {
          $('#qBittorentgetStatus').removeClass('active error wait').addClass('error');
          $("#qBittorentgetStatusBtn").text(function (i, text) {
            return "🔴 " + text;
          });
        }
      }
    });
    statusXhr.open("POST", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl") || "127.0.0.1", ":").concat(parseInt(Lampa.Storage.get("qBittorentPort") || "9999"), "/api/v2/auth/login?username=").concat(Lampa.Storage.get("qBittorentUser") || "1", "&password=").concat(Lampa.Storage.get("qBittorentPass") || "1"));
    statusXhr.send();
  }
  var qBittorent = {
    qBittorrentClient: qBittorrentClient,
    getStatus: getStatus$1
  };

  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw new Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw new Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }

  function transmissionClient(_x) {
    return _transmissionClient.apply(this, arguments);
  }
  function _transmissionClient() {
    _transmissionClient = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(selectedTorrent) {
      var protocol, url, port, path, user, pass, autostart, authResponse, sessionId, data, addResponse;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (selectedTorrent) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            protocol = Lampa.Storage.get("transmissionProtocol") || "http://";
            url = Lampa.Storage.get("transmissionUrl");
            port = Lampa.Storage.get("transmissionPort");
            path = Lampa.Storage.get("transmissionPath");
            user = Lampa.Storage.get("transmissionUser");
            pass = Lampa.Storage.get("transmissionPass");
            autostart = Lampa.Storage.get("transmissionAutostart");
            _context.prev = 9;
            _context.next = 12;
            return fetch("".concat(protocol).concat(url, ":").concat(port).concat(path), {
              method: "POST",
              headers: {
                Authorization: "Basic ".concat(btoa("".concat(user, ":").concat(pass)))
              }
            });
          case 12:
            authResponse = _context.sent;
            sessionId = authResponse.headers.get("X-Transmission-Session-Id");
            if (!(authResponse.status === 409)) {
              _context.next = 22;
              break;
            }
            data = JSON.stringify({
              method: "torrent-add",
              arguments: {
                paused: autostart,
                filename: selectedTorrent.split("&")[0]
              }
            });
            _context.next = 18;
            return fetch("".concat(protocol).concat(url, ":").concat(port).concat(path), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic ".concat(btoa("".concat(user, ":").concat(pass))),
                "X-Transmission-Session-Id": sessionId
              },
              body: data
            });
          case 18:
            addResponse = _context.sent;
            if (addResponse.status === 200) {
              Lampa.Noty.show("Torrent add success");
            } else {
              Lampa.Noty.show("Something went wrong: " + addResponse.status);
            }
            _context.next = 23;
            break;
          case 22:
            Lampa.Noty.show("Login with status " + authResponse.status);
          case 23:
            _context.next = 28;
            break;
          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](9);
            Lampa.Noty.show("Error: " + _context.t0.message);
          case 28:
            setTimeout(function () {
              Lampa.Select.close();
            }, 10);
          case 29:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[9, 25]]);
    }));
    return _transmissionClient.apply(this, arguments);
  }
  function getStatus() {
    return _getStatus.apply(this, arguments);
  }
  function _getStatus() {
    _getStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var protocol, url, port, path, user, pass, authResponse, sessionId, response;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            protocol = Lampa.Storage.get("transmissionProtocol") || "http://";
            url = Lampa.Storage.get("transmissionUrl") || "127.0.0.1";
            port = parseInt(Lampa.Storage.get("transmissionPort") || "9999");
            path = Lampa.Storage.get("transmissionPath") || "/transmission/rpc";
            user = Lampa.Storage.get("transmissionUser");
            pass = Lampa.Storage.get("transmissionPass");
            _context2.prev = 6;
            _context2.next = 9;
            return fetch("".concat(protocol).concat(url, ":").concat(port).concat(path), {
              method: "POST",
              headers: {
                Authorization: "Basic ".concat(btoa("".concat(user, ":").concat(pass)))
              }
            });
          case 9:
            authResponse = _context2.sent;
            sessionId = authResponse.headers.get("X-Transmission-Session-Id");
            _context2.next = 13;
            return fetch("".concat(protocol).concat(url, ":").concat(port).concat(path), {
              method: "POST",
              headers: {
                Authorization: "Basic ".concat(btoa("".concat(user, ":").concat(pass))),
                "X-Transmission-Session-Id": sessionId
              }
            });
          case 13:
            response = _context2.sent;
            if (response.status === 200 || response.status === 409) {
              $('#transmissionStatus').removeClass('active error wait').addClass('active');
              $("#transmissionStatusBtn").text("🟢 " + $("#transmissionStatusBtn").text());
            } else {
              $('#transmissionStatus').removeClass('active error wait').addClass('error');
              $("#transmissionStatusBtn").text("🔴 " + $("#transmissionStatusBtn").text());
            }
            _context2.next = 21;
            break;
          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](6);
            $('#transmissionStatus').removeClass('active error wait').addClass('error');
            $("#transmissionStatusBtn").text("🔴 " + $("#transmissionStatusBtn").text());
          case 21:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[6, 17]]);
    }));
    return _getStatus.apply(this, arguments);
  }
  var transmission = {
    transmissionClient: transmissionClient,
    getStatus: getStatus
  };

  function downloader() {
    function send2qBittorrent(magnetUri) {
      //Lampa.Noty.show("Send to qBittorrent start");
      qBittorent.qBittorrentClient(magnetUri);
    }
    function send2transmission(magnetUri) {
      //Lampa.Noty.show("Send to transmission start");
      transmission.transmissionClient(magnetUri);
    }
    Lampa.Listener.follow('torrent', function (e) {
      if (e.type === 'onlong') {
        var selectedTorrent = e.element;
        var onSelectApp = function onSelectApp(a) {
          if (!selectedTorrent.MagnetUri) {
            Lampa.Parser.marnet(selectedTorrent, function () {
              a.send2app(selectedTorrent.MagnetUri);
            }, function (error) {
              console.error('tmenu', "Error loading magnet:", error);
              Lampa.Noty.show("Error loading magnet:", error);
            });
          } else {
            a.send2app(selectedTorrent.MagnetUri);
          }
        };
        if (Lampa.Storage.field("td_qBittorent") === true) {
          typeof Lampa.Storage.get("qBittorentUrl") !== 'undefined' && typeof Lampa.Storage.get("qBittorentPort") !== 'undefined' && typeof Lampa.Storage.get("qBittorentUser") !== 'undefined' && typeof Lampa.Storage.get("qBittorentPass") !== 'undefined' && qBittorent.getStatus();
          e.menu.push({
            title: '<p id="qBittorentgetStatusBtn">qBittorrent</p>',
            send2app: send2qBittorrent,
            onSelect: onSelectApp
          });
        }
        if (Lampa.Storage.field("td_transmission") === true) {
          typeof Lampa.Storage.get("transmissionUrl") !== 'undefined' && typeof Lampa.Storage.get("transmissionPort") !== 'undefined' && typeof Lampa.Storage.get("transmissionUser") !== 'undefined' && typeof Lampa.Storage.get("transmissionPass") !== 'undefined' && transmission.getStatus();
          e.menu.push({
            title: '<p id="transmissionStatusBtn">transmission</p>',
            send2app: send2transmission,
            onSelect: onSelectApp
          });
        }
      }
    });
  }
  var Client = {
    downloader: downloader
  };

  function setMenu() {
    //Создание пункта меню
    Lampa.SettingsApi.addComponent({
      component: "torrentDownloader",
      name: "Torrent downloader",
      //Задаём название меню
      icon: '<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M150 250L350 50V250H150Z" fill="white"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M350 50L150 250H350V50ZM400 50V300H356V435C356 446.67 360.636 457.861 368.887 466.113C377.139 474.364 388.33 479 400 479C412.195 477.526 423.422 471.614 431.537 462.393C439.652 453.171 444.089 441.284 444 429V300H513V560C500.798 557.619 489.218 552.75 478.981 545.696C468.744 538.642 460.07 529.554 453.5 519C439.162 528.333 422.669 533.832 405.598 534.97C388.527 536.108 371.45 532.847 356 525.5V650H286.5V300H150V750H650V50H400Z" fill="white"/> </svg>'
    });
    /* Menu */
    Lampa.Settings.listener.follow("open", function (e) {
      /* Legacy */
      if (e.name == "main") {
        if (Lampa.Settings.main().render().find('[data-component="qBittorent"]').length == 0) {
          Lampa.SettingsApi.addComponent({
            component: "qBittorent",
            name: "qBittorent"
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="qBittorent"]').addClass("hide");
      }
      if (e.name == "main") {
        if (Lampa.Settings.main().render().find('[data-component="transmission"]').length == 0) {
          Lampa.SettingsApi.addComponent({
            component: "transmission",
            name: "transmission"
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="transmission"]').addClass("hide");
      }
      if (e.name == "main") {
        if (Lampa.Settings.main().render().find('[data-component="td_info"]').length == 0) {
          Lampa.SettingsApi.addComponent({
            component: "td_info",
            name: "td_info"
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="td_info"]').addClass("hide");
      }
      /* Legace END */
    });
    var COMPONENT_NAME = "torrentDownloader";
    var PARAM_TYPE = {
      SELECT: "select",
      INPUT: "input",
      TRIGGER: "trigger",
      TITLE: "title",
      STATIC: "static"
    };
    var PLUGIN_COMPONENT = "td_info";
    Lampa.SettingsApi.addParam({
      component: COMPONENT_NAME,
      param: {
        name: "tdDependencies",
        type: PARAM_TYPE.TITLE,
        "default": true
      },
      field: {
        name: "\u041F\u0430\u0440\u0441\u0435\u0440 - ".concat(Lampa.Storage.get("parser_use") ? "🟢" : "🔴"),
        description: "Для корректной работы должен быть активирован парсер"
      }
    });
    Lampa.SettingsApi.addParam({
      component: COMPONENT_NAME,
      param: {
        name: "tdInfo",
        type: PARAM_TYPE.STATIC,
        "default": true
      },
      field: {
        name: "О плагине",
        description: "Информация"
      },
      onRender: function onRender(item) {
        item.show();
        var paramNameElement = $(".settings-param__name", item);
        paramNameElement.before('<div class="settings-param__status"></div>');
        item.on("hover:enter", function () {
          Lampa.Settings.create("td_info");
          var enabledController = Lampa.Controller.enabled();
          enabledController.controller.back = function () {
            Lampa.Settings.create(COMPONENT_NAME);
          };
        });
      }
    });
    /* Info block */

    Lampa.SettingsApi.addParam({
      component: PLUGIN_COMPONENT,
      param: {
        name: "group",
        type: "static"
      },
      field: {
        name: "<img src=\"https://cdn.glitch.global/d9956867-398e-4a85-9c42-31911adc9981/groupLTD.jpg?v=1702216657917\" alt=\"GroupLTD\" width=\"100%\" height=\"auto\">",
        description: "Группа плагина Torrent downloader"
      }
    });
    Lampa.SettingsApi.addParam({
      component: PLUGIN_COMPONENT,
      param: {
        name: "group",
        type: "static"
      },
      field: {
        name: "<b>Описание</b>",
        description: "\u041F\u043B\u0430\u0433\u0438\u043D \u0441\u043B\u0443\u0436\u0438\u0442 \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0442\u043E\u0440\u0440\u0435\u043D\u0442\u043E\u0432 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430\u043C\u0438 Torrent \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432. \u0412\u044B\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0447\u0435\u0440\u0435\u0437 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u043D\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0440\u0430\u0437\u0434\u0430\u0447\u0435<br>\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 - \u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043F\u0430\u0440\u0441\u0435\u0440 \u0434\u043B\u044F \u0442\u043E\u0440\u0440\u0435\u043D\u0442\u043E\u0432. Torrserver \u041D\u0415 \u0422\u0420\u0415\u0411\u0423\u0415\u0422\u0421\u042F<br>\u041F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F \u043F\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u044E\u0442\u0441\u044F \u0432 \u0447\u0430\u0442\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u0430"
      }
    });
    /* qBittorent */
    Lampa.SettingsApi.addParam({
      component: "torrentDownloader",
      param: {
        name: "td_qBittorent",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: "qBittorent",
        description: ""
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("td_qBittorent", true);else Lampa.Storage.set("td_qBittorent", false);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "torrentDownloader",
      param: {
        name: "qBittorent",
        type: "static",
        //доступно select,input,trigger,title,static
        "default": true
      },
      field: {
        name: "qBittorent",
        description: "Настройка сервера"
      },
      onRender: function onRender(item) {
        if (Lampa.Storage.field("td_qBittorent") === true) {
          typeof Lampa.Storage.get("qBittorentUrl") !== 'undefined' && typeof Lampa.Storage.get("qBittorentPort") !== 'undefined' && typeof Lampa.Storage.get("qBittorentUser") !== 'undefined' && typeof Lampa.Storage.get("qBittorentPass") !== 'undefined' && qBittorent.getStatus();
          //qBittorent.getStatus();
          item.show();
          $(".settings-param__name", item).before('<div id="qBittorentgetStatus" class="settings-param__status wait"></div>');
        } else item.hide();
        item.on("hover:enter", function () {
          Lampa.Settings.create("qBittorent");
          Lampa.Controller.enabled().controller.back = function () {
            Lampa.Settings.create("torrentDownloader");
          };
        });
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentHead",
        type: "static"
      },
      field: {
        name: 'Настройка qBittorent'
        //description: "Настройка qBittorent",
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentSSL",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: "Use HTTPS",
        description: ""
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("qBittorentProtocol", "https://");else Lampa.Storage.set("qBittorentProtocol", "http://");
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentUrl",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("qBittorentUrl") || ""}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "Adress"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentUrl", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentPort",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("qBittorentPort")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "Port"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentPort", parseInt(item.replace(/[^0-9]/g, "")));
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentUser",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("qBittorentUser")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "User"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentUser", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentPass",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("qBittorentPass")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "Password"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentPass", item);
        Lampa.Settings.update();
      }
    });

    /* Transmission */
    Lampa.SettingsApi.addParam({
      component: "torrentDownloader",
      param: {
        name: "td_transmission",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: "Transmission",
        description: ""
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("td_transmission", true);else Lampa.Storage.set("td_transmission", false);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "torrentDownloader",
      param: {
        name: "transmission",
        type: "static",
        //доступно select,input,trigger,title,static
        "default": true
      },
      field: {
        name: "transmission",
        description: "Настройка сервера"
      },
      onRender: function onRender(item) {
        if (Lampa.Storage.field("td_transmission") === true) {
          typeof Lampa.Storage.get("transmissionUrl") !== 'undefined' && typeof Lampa.Storage.get("transmissionPort") !== 'undefined' && typeof Lampa.Storage.get("transmissionUser") !== 'undefined' && typeof Lampa.Storage.get("transmissionPass") !== 'undefined' && transmission.getStatus();
          item.show();
          $(".settings-param__name", item).before('<div id="transmissionStatus" class="settings-param__status wait"></div>');
        } else item.hide();
        item.on("hover:enter", function () {
          Lampa.Settings.create("transmission");
          Lampa.Controller.enabled().controller.back = function () {
            Lampa.Settings.create("torrentDownloader");
          };
        });
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionHead",
        type: "static"
      },
      field: {
        name: 'Настройка Transmission'
        //description: "Настройка Transmission",
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionSSL",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: "Use HTTPS",
        description: ""
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("transmissionProtocol", "https://");else Lampa.Storage.set("transmissionProtocol", "http://");
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionUrl",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("transmissionUrl")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "Adress"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionUrl", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionPort",
        type: "input",
        //доступно select,input,trigger,title,static
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "Port"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionPort", parseInt(item.replace(/[^0-9]/g, "")));
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionUser",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("transmissionUser")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "User"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionUser", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionPass",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("transmissionPass")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "Password"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionPass", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionAutostart",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": true
      },
      field: {
        name: "Autostop",
        description: "Все торренты добавляются на паузе"
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("transmissionAutostart", true);else Lampa.Storage.set("transmissionAutostart", false);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionPath",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("transmissionUrl")}`,
        placeholder: '/transmission/rpc',
        values: '/transmission/rpc',
        "default": '/transmission/rpc'
      },
      field: {
        name: "RPC Path",
        description: "Изменение пути API. Не трогать без необходимости"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionPath", item);
        Lampa.Settings.update();
      }
    });
  }
  var Menu = {
    setMenu: setMenu
  };

  Lampa.Platform.tv();
  /* Some function */

  /* Start inject menu */
  function add() {
    Menu.setMenu();
  }
  /* Add menu */
  if (window.appready) add();else {
    Lampa.Listener.follow("app", function (e) {
      if (e.type == "ready") {
        add();
      }
    });
  }

  /* Add client */
  Client.downloader();

})();
