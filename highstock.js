/*
 Highstock JS v5.0.5 (2016-11-29)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (M, a) {
	"object" === typeof module && module.exports ? module.exports = M.document ? a(M) : a : M.Highcharts = a(M)
})("undefined" !== typeof window ? window : this, function (M) {
	M = function () {
		var a = window,
			D = a.document,
			C = a.navigator && a.navigator.userAgent || "",
			F = D && D.createElementNS && !!D.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
			H = /(edge|msie|trident)/i.test(C) && !window.opera,
			r = !F,
			m = /Firefox/.test(C),
			l = m && 4 > parseInt(C.split("Firefox/")[1], 10);
		return a.Highcharts ? a.Highcharts.error(16, !0) : {
			product: "Highstock",
			version: "5.0.5",
			deg2rad: 2 * Math.PI / 360,
			doc: D,
			hasBidiBug: l,
			hasTouch: D && void 0 !== D.documentElement.ontouchstart,
			isMS: H,
			isWebKit: /AppleWebKit/.test(C),
			isFirefox: m,
			isTouchDevice: /(Mobile|Android|Windows Phone)/.test(C),
			SVG_NS: "http://www.w3.org/2000/svg",
			chartCount: 0,
			seriesTypes: {},
			symbolSizes: {},
			svg: F,
			vml: r,
			win: a,
			charts: [],
			marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
			noop: function () {}
		}
	}();
	(function (a) {
		var D = [],
			C = a.charts,
			F = a.doc,
			H = a.win;
		a.error = function (a, m) {
			a = "Highcharts error #" +
				a + ": www.highcharts.com/errors/" + a;
			if (m) throw Error(a);
			H.console && console.log(a)
		};
		a.Fx = function (a, m, l) {
			this.options = m;
			this.elem = a;
			this.prop = l
		};
		a.Fx.prototype = {
			dSetter: function () {
				var a = this.paths[0],
					m = this.paths[1],
					l = [],
					t = this.now,
					p = a.length,
					k;
				if (1 === t) l = this.toD;
				else if (p === m.length && 1 > t)
					for (; p--;) k = parseFloat(a[p]), l[p] = isNaN(k) ? a[p] : t * parseFloat(m[p] - k) + k;
				else l = m;
				this.elem.attr("d", l, null, !0)
			},
			update: function () {
				var a = this.elem,
					m = this.prop,
					l = this.now,
					t = this.options.step;
				if (this[m + "Setter"]) this[m +
					"Setter"]();
				else a.attr ? a.element && a.attr(m, l, null, !0) : a.style[m] = l + this.unit;
				t && t.call(a, l, this)
			},
			run: function (a, m, l) {
				var r = this,
					p = function (a) {
						return p.stopped ? !1 : r.step(a)
					},
					k;
				this.startTime = +new Date;
				this.start = a;
				this.end = m;
				this.unit = l;
				this.now = this.start;
				this.pos = 0;
				p.elem = this.elem;
				p.prop = this.prop;
				p() && 1 === D.push(p) && (p.timerId = setInterval(function () {
					for (k = 0; k < D.length; k++) D[k]() || D.splice(k--, 1);
					D.length || clearInterval(p.timerId)
				}, 13))
			},
			step: function (a) {
				var m = +new Date,
					l, r = this.options;
				l = this.elem;
				var p = r.complete,
					k = r.duration,
					f = r.curAnim,
					b;
				if (l.attr && !l.element) l = !1;
				else if (a || m >= k + this.startTime) {
					this.now = this.end;
					this.pos = 1;
					this.update();
					a = f[this.prop] = !0;
					for (b in f) !0 !== f[b] && (a = !1);
					a && p && p.call(l);
					l = !1
				} else this.pos = r.easing((m - this.startTime) / k), this.now = this.start + (this.end - this.start) * this.pos, this.update(), l = !0;
				return l
			},
			initPath: function (a, m, l) {
				function r(a) {
					var d, b;
					for (c = a.length; c--;) d = "M" === a[c] || "L" === a[c], b = /[a-zA-Z]/.test(a[c + 3]), d && b && a.splice(c + 1, 0, a[c + 1], a[c + 2], a[c + 1], a[c +
						2])
				}

				function p(a, d) {
					for (; a.length < g;) {
						a[0] = d[g - a.length];
						var b = a.slice(0, q);
						[].splice.apply(a, [0, 0].concat(b));
						n && (b = a.slice(a.length - q), [].splice.apply(a, [a.length, 0].concat(b)), c--)
					}
					a[0] = "M"
				}

				function k(a, d) {
					for (var b = (g - a.length) / q; 0 < b && b--;) e = a.slice().splice(a.length / u - q, q * u), e[0] = d[g - q - b * q], z && (e[q - 6] = e[q - 2], e[q - 5] = e[q - 1]), [].splice.apply(a, [a.length / u, 0].concat(e)), n && b--
				}
				m = m || "";
				var f, b = a.startX,
					h = a.endX,
					z = -1 < m.indexOf("C"),
					q = z ? 7 : 3,
					g, e, c;
				m = m.split(" ");
				l = l.slice();
				var n = a.isArea,
					u = n ? 2 : 1,
					d;
				z && (r(m), r(l));
				if (b && h) {
					for (c = 0; c < b.length; c++)
						if (b[c] === h[0]) {
							f = c;
							break
						} else if (b[0] === h[h.length - b.length + c]) {
						f = c;
						d = !0;
						break
					}
					void 0 === f && (m = [])
				}
				m.length && (g = l.length + (f || 0) * u * q, d ? (p(m, l), k(l, m)) : (p(l, m), k(m, l)));
				return [m, l]
			}
		};
		a.extend = function (a, m) {
			var l;
			a || (a = {});
			for (l in m) a[l] = m[l];
			return a
		};
		a.merge = function () {
			var r, m = arguments,
				l, t = {},
				p = function (k, f) {
					var b, h;
					"object" !== typeof k && (k = {});
					for (h in f) f.hasOwnProperty(h) && (b = f[h], a.isObject(b, !0) && "renderTo" !== h && "number" !== typeof b.nodeType ? k[h] =
						p(k[h] || {}, b) : k[h] = f[h]);
					return k
				};
			!0 === m[0] && (t = m[1], m = Array.prototype.slice.call(m, 2));
			l = m.length;
			for (r = 0; r < l; r++) t = p(t, m[r]);
			return t
		};
		a.pInt = function (a, m) {
			return parseInt(a, m || 10)
		};
		a.isString = function (a) {
			return "string" === typeof a
		};
		a.isArray = function (a) {
			a = Object.prototype.toString.call(a);
			return "[object Array]" === a || "[object Array Iterator]" === a
		};
		a.isObject = function (r, m) {
			return r && "object" === typeof r && (!m || !a.isArray(r))
		};
		a.isNumber = function (a) {
			return "number" === typeof a && !isNaN(a)
		};
		a.erase = function (a,
			m) {
			for (var l = a.length; l--;)
				if (a[l] === m) {
					a.splice(l, 1);
					break
				}
		};
		a.defined = function (a) {
			return void 0 !== a && null !== a
		};
		a.attr = function (r, m, l) {
			var t, p;
			if (a.isString(m)) a.defined(l) ? r.setAttribute(m, l) : r && r.getAttribute && (p = r.getAttribute(m));
			else if (a.defined(m) && a.isObject(m))
				for (t in m) r.setAttribute(t, m[t]);
			return p
		};
		a.splat = function (r) {
			return a.isArray(r) ? r : [r]
		};
		a.syncTimeout = function (a, m, l) {
			if (m) return setTimeout(a, m, l);
			a.call(0, l)
		};
		a.pick = function () {
			var a = arguments,
				m, l, t = a.length;
			for (m = 0; m < t; m++)
				if (l =
					a[m], void 0 !== l && null !== l) return l
		};
		a.css = function (r, m) {
			a.isMS && !a.svg && m && void 0 !== m.opacity && (m.filter = "alpha(opacity\x3d" + 100 * m.opacity + ")");
			a.extend(r.style, m)
		};
		a.createElement = function (r, m, l, t, p) {
			r = F.createElement(r);
			var k = a.css;
			m && a.extend(r, m);
			p && k(r, {
				padding: 0,
				border: "none",
				margin: 0
			});
			l && k(r, l);
			t && t.appendChild(r);
			return r
		};
		a.extendClass = function (r, m) {
			var l = function () {};
			l.prototype = new r;
			a.extend(l.prototype, m);
			return l
		};
		a.pad = function (a, m, l) {
			return Array((m || 2) + 1 - String(a).length).join(l ||
				0) + a
		};
		a.relativeLength = function (a, m) {
			return /%$/.test(a) ? m * parseFloat(a) / 100 : parseFloat(a)
		};
		a.wrap = function (a, m, l) {
			var t = a[m];
			a[m] = function () {
				var a = Array.prototype.slice.call(arguments),
					k = arguments,
					f = this;
				f.proceed = function () {
					t.apply(f, arguments.length ? arguments : k)
				};
				a.unshift(t);
				a = l.apply(this, a);
				f.proceed = null;
				return a
			}
		};
		a.getTZOffset = function (r) {
			var m = a.Date;
			return 6E4 * (m.hcGetTimezoneOffset && m.hcGetTimezoneOffset(r) || m.hcTimezoneOffset || 0)
		};
		a.dateFormat = function (r, m, l) {
			if (!a.defined(m) || isNaN(m)) return a.defaultOptions.lang.invalidDate ||
				"";
			r = a.pick(r, "%Y-%m-%d %H:%M:%S");
			var t = a.Date,
				p = new t(m - a.getTZOffset(m)),
				k, f = p[t.hcGetHours](),
				b = p[t.hcGetDay](),
				h = p[t.hcGetDate](),
				z = p[t.hcGetMonth](),
				q = p[t.hcGetFullYear](),
				g = a.defaultOptions.lang,
				e = g.weekdays,
				c = g.shortWeekdays,
				n = a.pad,
				t = a.extend({
					a: c ? c[b] : e[b].substr(0, 3),
					A: e[b],
					d: n(h),
					e: n(h, 2, " "),
					w: b,
					b: g.shortMonths[z],
					B: g.months[z],
					m: n(z + 1),
					y: q.toString().substr(2, 2),
					Y: q,
					H: n(f),
					k: f,
					I: n(f % 12 || 12),
					l: f % 12 || 12,
					M: n(p[t.hcGetMinutes]()),
					p: 12 > f ? "AM" : "PM",
					P: 12 > f ? "am" : "pm",
					S: n(p.getSeconds()),
					L: n(Math.round(m %
						1E3), 3)
				}, a.dateFormats);
			for (k in t)
				for (; - 1 !== r.indexOf("%" + k);) r = r.replace("%" + k, "function" === typeof t[k] ? t[k](m) : t[k]);
			return l ? r.substr(0, 1).toUpperCase() + r.substr(1) : r
		};
		a.formatSingle = function (r, m) {
			var l = /\.([0-9])/,
				t = a.defaultOptions.lang;
			/f$/.test(r) ? (l = (l = r.match(l)) ? l[1] : -1, null !== m && (m = a.numberFormat(m, l, t.decimalPoint, -1 < r.indexOf(",") ? t.thousandsSep : ""))) : m = a.dateFormat(r, m);
			return m
		};
		a.format = function (r, m) {
			for (var l = "{", t = !1, p, k, f, b, h = [], z; r;) {
				l = r.indexOf(l);
				if (-1 === l) break;
				p = r.slice(0,
					l);
				if (t) {
					p = p.split(":");
					k = p.shift().split(".");
					b = k.length;
					z = m;
					for (f = 0; f < b; f++) z = z[k[f]];
					p.length && (z = a.formatSingle(p.join(":"), z));
					h.push(z)
				} else h.push(p);
				r = r.slice(l + 1);
				l = (t = !t) ? "}" : "{"
			}
			h.push(r);
			return h.join("")
		};
		a.getMagnitude = function (a) {
			return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
		};
		a.normalizeTickInterval = function (r, m, l, t, p) {
			var k, f = r;
			l = a.pick(l, 1);
			k = r / l;
			m || (m = p ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === t && (1 === l ? m = a.grep(m, function (a) {
				return 0 === a % 1
			}) : .1 >= l && (m = [1 / l])));
			for (t = 0; t < m.length && !(f = m[t], p && f * l >= r || !p && k <= (m[t] + (m[t + 1] || m[t])) / 2); t++);
			return f * l
		};
		a.stableSort = function (a, m) {
			var l = a.length,
				t, p;
			for (p = 0; p < l; p++) a[p].safeI = p;
			a.sort(function (a, f) {
				t = m(a, f);
				return 0 === t ? a.safeI - f.safeI : t
			});
			for (p = 0; p < l; p++) delete a[p].safeI
		};
		a.arrayMin = function (a) {
			for (var m = a.length, l = a[0]; m--;) a[m] < l && (l = a[m]);
			return l
		};
		a.arrayMax = function (a) {
			for (var m = a.length, l = a[0]; m--;) a[m] > l && (l = a[m]);
			return l
		};
		a.destroyObjectProperties = function (a, m) {
			for (var l in a) a[l] && a[l] !== m && a[l].destroy &&
				a[l].destroy(), delete a[l]
		};
		a.discardElement = function (r) {
			var m = a.garbageBin;
			m || (m = a.createElement("div"));
			r && m.appendChild(r);
			m.innerHTML = ""
		};
		a.correctFloat = function (a, m) {
			return parseFloat(a.toPrecision(m || 14))
		};
		a.setAnimation = function (r, m) {
			m.renderer.globalAnimation = a.pick(r, m.options.chart.animation, !0)
		};
		a.animObject = function (r) {
			return a.isObject(r) ? a.merge(r) : {
				duration: r ? 500 : 0
			}
		};
		a.timeUnits = {
			millisecond: 1,
			second: 1E3,
			minute: 6E4,
			hour: 36E5,
			day: 864E5,
			week: 6048E5,
			month: 24192E5,
			year: 314496E5
		};
		a.numberFormat =
			function (r, m, l, t) {
				r = +r || 0;
				m = +m;
				var p = a.defaultOptions.lang,
					k = (r.toString().split(".")[1] || "").length,
					f, b, h = Math.abs(r); - 1 === m ? m = Math.min(k, 20) : a.isNumber(m) || (m = 2);
				f = String(a.pInt(h.toFixed(m)));
				b = 3 < f.length ? f.length % 3 : 0;
				l = a.pick(l, p.decimalPoint);
				t = a.pick(t, p.thousandsSep);
				r = (0 > r ? "-" : "") + (b ? f.substr(0, b) + t : "");
				r += f.substr(b).replace(/(\d{3})(?=\d)/g, "$1" + t);
				m && (t = Math.abs(h - f + Math.pow(10, -Math.max(m, k) - 1)), r += l + t.toFixed(m).slice(2));
				return r
			};
		Math.easeInOutSine = function (a) {
			return -.5 * (Math.cos(Math.PI *
				a) - 1)
		};
		a.getStyle = function (r, m) {
			return "width" === m ? Math.min(r.offsetWidth, r.scrollWidth) - a.getStyle(r, "padding-left") - a.getStyle(r, "padding-right") : "height" === m ? Math.min(r.offsetHeight, r.scrollHeight) - a.getStyle(r, "padding-top") - a.getStyle(r, "padding-bottom") : (r = H.getComputedStyle(r, void 0)) && a.pInt(r.getPropertyValue(m))
		};
		a.inArray = function (a, m) {
			return m.indexOf ? m.indexOf(a) : [].indexOf.call(m, a)
		};
		a.grep = function (a, m) {
			return [].filter.call(a, m)
		};
		a.map = function (a, m) {
			for (var l = [], t = 0, p = a.length; t < p; t++) l[t] =
				m.call(a[t], a[t], t, a);
			return l
		};
		a.offset = function (a) {
			var m = F.documentElement;
			a = a.getBoundingClientRect();
			return {
				top: a.top + (H.pageYOffset || m.scrollTop) - (m.clientTop || 0),
				left: a.left + (H.pageXOffset || m.scrollLeft) - (m.clientLeft || 0)
			}
		};
		a.stop = function (a, m) {
			for (var l = D.length; l--;) D[l].elem !== a || m && m !== D[l].prop || (D[l].stopped = !0)
		};
		a.each = function (a, m, l) {
			return Array.prototype.forEach.call(a, m, l)
		};
		a.addEvent = function (r, m, l) {
			function t(a) {
				a.target = a.srcElement || H;
				l.call(r, a)
			}
			var p = r.hcEvents = r.hcEvents || {};
			r.addEventListener ? r.addEventListener(m, l, !1) : r.attachEvent && (r.hcEventsIE || (r.hcEventsIE = {}), r.hcEventsIE[l.toString()] = t, r.attachEvent("on" + m, t));
			p[m] || (p[m] = []);
			p[m].push(l);
			return function () {
				a.removeEvent(r, m, l)
			}
		};
		a.removeEvent = function (r, m, l) {
			function t(a, b) {
				r.removeEventListener ? r.removeEventListener(a, b, !1) : r.attachEvent && (b = r.hcEventsIE[b.toString()], r.detachEvent("on" + a, b))
			}

			function p() {
				var a, b;
				if (r.nodeName)
					for (b in m ? (a = {}, a[m] = !0) : a = f, a)
						if (f[b])
							for (a = f[b].length; a--;) t(b, f[b][a])
			}
			var k,
				f = r.hcEvents,
				b;
			f && (m ? (k = f[m] || [], l ? (b = a.inArray(l, k), -1 < b && (k.splice(b, 1), f[m] = k), t(m, l)) : (p(), f[m] = [])) : (p(), r.hcEvents = {}))
		};
		a.fireEvent = function (r, m, l, t) {
			var p;
			p = r.hcEvents;
			var k, f;
			l = l || {};
			if (F.createEvent && (r.dispatchEvent || r.fireEvent)) p = F.createEvent("Events"), p.initEvent(m, !0, !0), a.extend(p, l), r.dispatchEvent ? r.dispatchEvent(p) : r.fireEvent(m, p);
			else if (p)
				for (p = p[m] || [], k = p.length, l.target || a.extend(l, {
						preventDefault: function () {
							l.defaultPrevented = !0
						},
						target: r,
						type: m
					}), m = 0; m < k; m++)(f = p[m]) &&
					!1 === f.call(r, l) && l.preventDefault();
			t && !l.defaultPrevented && t(l)
		};
		a.animate = function (r, m, l) {
			var t, p = "",
				k, f, b;
			a.isObject(l) || (t = arguments, l = {
				duration: t[2],
				easing: t[3],
				complete: t[4]
			});
			a.isNumber(l.duration) || (l.duration = 400);
			l.easing = "function" === typeof l.easing ? l.easing : Math[l.easing] || Math.easeInOutSine;
			l.curAnim = a.merge(m);
			for (b in m) a.stop(r, b), f = new a.Fx(r, l, b), k = null, "d" === b ? (f.paths = f.initPath(r, r.d, m.d), f.toD = m.d, t = 0, k = 1) : r.attr ? t = r.attr(b) : (t = parseFloat(a.getStyle(r, b)) || 0, "opacity" !== b &&
				(p = "px")), k || (k = m[b]), k.match && k.match("px") && (k = k.replace(/px/g, "")), f.run(t, k, p)
		};
		a.seriesType = function (r, m, l, t, p) {
			var k = a.getOptions(),
				f = a.seriesTypes;
			k.plotOptions[r] = a.merge(k.plotOptions[m], l);
			f[r] = a.extendClass(f[m] || function () {}, t);
			f[r].prototype.type = r;
			p && (f[r].prototype.pointClass = a.extendClass(a.Point, p));
			return f[r]
		};
		a.uniqueKey = function () {
			var a = Math.random().toString(36).substring(2, 9),
				m = 0;
			return function () {
				return "highcharts-" + a + "-" + m++
			}
		}();
		H.jQuery && (H.jQuery.fn.highcharts = function () {
			var r = [].slice.call(arguments);
			if (this[0]) return r[0] ? (new(a[a.isString(r[0]) ? r.shift() : "Chart"])(this[0], r[0], r[1]), this) : C[a.attr(this[0], "data-highcharts-chart")]
		});
		F && !F.defaultView && (a.getStyle = function (r, m) {
			var l = {
				width: "clientWidth",
				height: "clientHeight"
			}[m];
			if (r.style[m]) return a.pInt(r.style[m]);
			"opacity" === m && (m = "filter");
			if (l) return r.style.zoom = 1, Math.max(r[l] - 2 * a.getStyle(r, "padding"), 0);
			r = r.currentStyle[m.replace(/\-(\w)/g, function (a, p) {
				return p.toUpperCase()
			})];
			"filter" === m && (r = r.replace(/alpha\(opacity=([0-9]+)\)/,
				function (a, p) {
					return p / 100
				}));
			return "" === r ? 1 : a.pInt(r)
		});
		Array.prototype.forEach || (a.each = function (a, m, l) {
			for (var t = 0, p = a.length; t < p; t++)
				if (!1 === m.call(l, a[t], t, a)) return t
		});
		Array.prototype.indexOf || (a.inArray = function (a, m) {
			var l, t = 0;
			if (m)
				for (l = m.length; t < l; t++)
					if (m[t] === a) return t;
			return -1
		});
		Array.prototype.filter || (a.grep = function (a, m) {
			for (var l = [], t = 0, p = a.length; t < p; t++) m(a[t], t) && l.push(a[t]);
			return l
		})
	})(M);
	(function (a) {
		var D = a.each,
			C = a.isNumber,
			F = a.map,
			H = a.merge,
			r = a.pInt;
		a.Color = function (m) {
			if (!(this instanceof a.Color)) return new a.Color(m);
			this.init(m)
		};
		a.Color.prototype = {
			parsers: [{
				regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
				parse: function (a) {
					return [r(a[1]), r(a[2]), r(a[3]), parseFloat(a[4], 10)]
				}
			}, {
				regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
				parse: function (a) {
					return [r(a[1], 16), r(a[2], 16), r(a[3], 16), 1]
				}
			}, {
				regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
				parse: function (a) {
					return [r(a[1]), r(a[2]), r(a[3]), 1]
				}
			}],
			names: {
				white: "#ffffff",
				black: "#000000"
			},
			init: function (m) {
				var l, t, p, k;
				if ((this.input = m = this.names[m] || m) && m.stops) this.stops = F(m.stops, function (f) {
					return new a.Color(f[1])
				});
				else
					for (p = this.parsers.length; p-- && !t;) k = this.parsers[p], (l = k.regex.exec(m)) && (t = k.parse(l));
				this.rgba = t || []
			},
			get: function (a) {
				var l = this.input,
					m = this.rgba,
					p;
				this.stops ? (p = H(l), p.stops = [].concat(p.stops), D(this.stops, function (k, f) {
						p.stops[f] = [p.stops[f][0], k.get(a)]
					})) : p = m && C(m[0]) ? "rgb" === a || !a && 1 === m[3] ? "rgb(" + m[0] + "," + m[1] + "," + m[2] + ")" : "a" === a ? m[3] :
					"rgba(" + m.join(",") + ")" : l;
				return p
			},
			brighten: function (a) {
				var l, m = this.rgba;
				if (this.stops) D(this.stops, function (p) {
					p.brighten(a)
				});
				else if (C(a) && 0 !== a)
					for (l = 0; 3 > l; l++) m[l] += r(255 * a), 0 > m[l] && (m[l] = 0), 255 < m[l] && (m[l] = 255);
				return this
			},
			setOpacity: function (a) {
				this.rgba[3] = a;
				return this
			}
		};
		a.color = function (m) {
			return new a.Color(m)
		}
	})(M);
	(function (a) {
		var D, C, F = a.addEvent,
			H = a.animate,
			r = a.attr,
			m = a.charts,
			l = a.color,
			t = a.css,
			p = a.createElement,
			k = a.defined,
			f = a.deg2rad,
			b = a.destroyObjectProperties,
			h = a.doc,
			z = a.each,
			q = a.extend,
			g = a.erase,
			e = a.grep,
			c = a.hasTouch,
			n = a.isArray,
			u = a.isFirefox,
			d = a.isMS,
			A = a.isObject,
			y = a.isString,
			x = a.isWebKit,
			J = a.merge,
			E = a.noop,
			G = a.pick,
			v = a.pInt,
			K = a.removeEvent,
			N = a.stop,
			w = a.svg,
			I = a.SVG_NS,
			O = a.symbolSizes,
			Q = a.win;
		D = a.SVGElement = function () {
			return this
		};
		D.prototype = {
			opacity: 1,
			SVG_NS: I,
			textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textOutline".split(" "),
			init: function (a, L) {
				this.element = "span" === L ? p(L) : h.createElementNS(this.SVG_NS,
					L);
				this.renderer = a
			},
			animate: function (a, L, d) {
				(L = G(L, this.renderer.globalAnimation, !0)) ? (d && (L.complete = d), H(this, a, L)) : this.attr(a, null, d);
				return this
			},
			colorGradient: function (B, L, d) {
				var b = this.renderer,
					w, c, e, I, v, y, A, g, h, x, q, G = [],
					u;
				B.linearGradient ? c = "linearGradient" : B.radialGradient && (c = "radialGradient");
				if (c) {
					e = B[c];
					v = b.gradients;
					A = B.stops;
					x = d.radialReference;
					n(e) && (B[c] = e = {
						x1: e[0],
						y1: e[1],
						x2: e[2],
						y2: e[3],
						gradientUnits: "userSpaceOnUse"
					});
					"radialGradient" === c && x && !k(e.gradientUnits) && (I = e, e = J(e, b.getRadialAttr(x,
						I), {
						gradientUnits: "userSpaceOnUse"
					}));
					for (q in e) "id" !== q && G.push(q, e[q]);
					for (q in A) G.push(A[q]);
					G = G.join(",");
					v[G] ? x = v[G].attr("id") : (e.id = x = a.uniqueKey(), v[G] = y = b.createElement(c).attr(e).add(b.defs), y.radAttr = I, y.stops = [], z(A, function (B) {
						0 === B[1].indexOf("rgba") ? (w = a.color(B[1]), g = w.get("rgb"), h = w.get("a")) : (g = B[1], h = 1);
						B = b.createElement("stop").attr({
							offset: B[0],
							"stop-color": g,
							"stop-opacity": h
						}).add(y);
						y.stops.push(B)
					}));
					u = "url(" + b.url + "#" + x + ")";
					d.setAttribute(L, u);
					d.gradient = G;
					B.toString = function () {
						return u
					}
				}
			},
			applyTextOutline: function (a) {
				var B = this.element,
					d, b, w; - 1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(B.style.fill)));
				this.fakeTS = !0;
				this.ySetter = this.xSetter;
				d = [].slice.call(B.getElementsByTagName("tspan"));
				a = a.split(" ");
				b = a[a.length - 1];
				(w = a[0]) && "none" !== w && (w = w.replace(/(^[\d\.]+)(.*?)$/g, function (a, B, d) {
					return 2 * B + d
				}), z(d, function (a) {
					"highcharts-text-outline" === a.getAttribute("class") && g(d, B.removeChild(a))
				}), z(d, function (a, d) {
					0 === d && (a.setAttribute("x", B.getAttribute("x")),
						d = B.getAttribute("y"), a.setAttribute("y", d || 0), null === d && B.setAttribute("y", 0));
					a = a.cloneNode(1);
					r(a, {
						"class": "highcharts-text-outline",
						fill: b,
						stroke: b,
						"stroke-width": w,
						"stroke-linejoin": "round"
					});
					B.insertBefore(a, B.firstChild)
				}))
			},
			attr: function (a, d, b, w) {
				var B, L = this.element,
					e, c = this,
					I;
				"string" === typeof a && void 0 !== d && (B = a, a = {}, a[B] = d);
				if ("string" === typeof a) c = (this[a + "Getter"] || this._defaultGetter).call(this, a, L);
				else {
					for (B in a) d = a[B], I = !1, w || N(this, B), this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(B) &&
						(e || (this.symbolAttr(a), e = !0), I = !0), !this.rotation || "x" !== B && "y" !== B || (this.doTransform = !0), I || (I = this[B + "Setter"] || this._defaultSetter, I.call(this, d, B, L), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(B) && this.updateShadows(B, d, I));
					this.doTransform && (this.updateTransform(), this.doTransform = !1)
				}
				b && b();
				return c
			},
			updateShadows: function (a, d, b) {
				for (var B = this.shadows, L = B.length; L--;) b.call(B[L], "height" === a ? Math.max(d - (B[L].cutHeight || 0), 0) : "d" === a ? this.d : d, a, B[L])
			},
			addClass: function (a,
				d) {
				var B = this.attr("class") || ""; - 1 === B.indexOf(a) && (d || (a = (B + (B ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
				return this
			},
			hasClass: function (a) {
				return -1 !== r(this.element, "class").indexOf(a)
			},
			removeClass: function (a) {
				r(this.element, "class", (r(this.element, "class") || "").replace(a, ""));
				return this
			},
			symbolAttr: function (a) {
				var B = this;
				z("x y r start end width height innerR anchorX anchorY".split(" "), function (d) {
					B[d] = G(a[d], B[d])
				});
				B.attr({
					d: B.renderer.symbols[B.symbolName](B.x, B.y, B.width, B.height,
						B)
				})
			},
			clip: function (a) {
				return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
			},
			crisp: function (a, d) {
				var B, b = {},
					w;
				d = d || a.strokeWidth || 0;
				w = Math.round(d) % 2 / 2;
				a.x = Math.floor(a.x || this.x || 0) + w;
				a.y = Math.floor(a.y || this.y || 0) + w;
				a.width = Math.floor((a.width || this.width || 0) - 2 * w);
				a.height = Math.floor((a.height || this.height || 0) - 2 * w);
				k(a.strokeWidth) && (a.strokeWidth = d);
				for (B in a) this[B] !== a[B] && (this[B] = b[B] = a[B]);
				return b
			},
			css: function (a) {
				var B = this.styles,
					b = {},
					e = this.element,
					c, I, y = "";
				c = !B;
				a && a.color && (a.fill = a.color);
				if (B)
					for (I in a) a[I] !== B[I] && (b[I] = a[I], c = !0);
				if (c) {
					c = this.textWidth = a && a.width && "text" === e.nodeName.toLowerCase() && v(a.width) || this.textWidth;
					B && (a = q(B, b));
					this.styles = a;
					c && !w && this.renderer.forExport && delete a.width;
					if (d && !w) t(this.element, a);
					else {
						B = function (a, B) {
							return "-" + B.toLowerCase()
						};
						for (I in a) y += I.replace(/([A-Z])/g, B) + ":" + a[I] + ";";
						r(e, "style", y)
					}
					this.added && (c && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))
				}
				return this
			},
			strokeWidth: function () {
				return this["stroke-width"] || 0
			},
			on: function (a, d) {
				var B = this,
					b = B.element;
				c && "click" === a ? (b.ontouchstart = function (a) {
					B.touchEventFired = Date.now();
					a.preventDefault();
					d.call(b, a)
				}, b.onclick = function (a) {
					(-1 === Q.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (B.touchEventFired || 0)) && d.call(b, a)
				}) : b["on" + a] = d;
				return this
			},
			setRadialReference: function (a) {
				var B = this.renderer.gradients[this.element.gradient];
				this.element.radialReference = a;
				B && B.radAttr && B.animate(this.renderer.getRadialAttr(a,
					B.radAttr));
				return this
			},
			translate: function (a, d) {
				return this.attr({
					translateX: a,
					translateY: d
				})
			},
			invert: function (a) {
				this.inverted = a;
				this.updateTransform();
				return this
			},
			updateTransform: function () {
				var a = this.translateX || 0,
					d = this.translateY || 0,
					b = this.scaleX,
					w = this.scaleY,
					c = this.inverted,
					e = this.rotation,
					I = this.element;
				c && (a += this.attr("width"), d += this.attr("height"));
				a = ["translate(" + a + "," + d + ")"];
				c ? a.push("rotate(90) scale(-1,1)") : e && a.push("rotate(" + e + " " + (I.getAttribute("x") || 0) + " " + (I.getAttribute("y") ||
					0) + ")");
				(k(b) || k(w)) && a.push("scale(" + G(b, 1) + " " + G(w, 1) + ")");
				a.length && I.setAttribute("transform", a.join(" "))
			},
			toFront: function () {
				var a = this.element;
				a.parentNode.appendChild(a);
				return this
			},
			align: function (a, d, b) {
				var B, w, c, e, I = {};
				w = this.renderer;
				c = w.alignedObjects;
				var L, v;
				if (a) {
					if (this.alignOptions = a, this.alignByTranslate = d, !b || y(b)) this.alignTo = B = b || "renderer", g(c, this), c.push(this), b = null
				} else a = this.alignOptions, d = this.alignByTranslate, B = this.alignTo;
				b = G(b, w[B], w);
				B = a.align;
				w = a.verticalAlign;
				c =
					(b.x || 0) + (a.x || 0);
				e = (b.y || 0) + (a.y || 0);
				"right" === B ? L = 1 : "center" === B && (L = 2);
				L && (c += (b.width - (a.width || 0)) / L);
				I[d ? "translateX" : "x"] = Math.round(c);
				"bottom" === w ? v = 1 : "middle" === w && (v = 2);
				v && (e += (b.height - (a.height || 0)) / v);
				I[d ? "translateY" : "y"] = Math.round(e);
				this[this.placed ? "animate" : "attr"](I);
				this.placed = !0;
				this.alignAttr = I;
				return this
			},
			getBBox: function (a, b) {
				var B, w = this.renderer,
					c, e = this.element,
					I = this.styles,
					L, v = this.textStr,
					y, A = w.cache,
					g = w.cacheKeys,
					n;
				b = G(b, this.rotation);
				c = b * f;
				L = I && I.fontSize;
				void 0 !==
					v && (n = v.toString(), -1 === n.indexOf("\x3c") && (n = n.replace(/[0-9]/g, "0")), n += ["", b || 0, L, e.style.width, e.style["text-overflow"]].join());
				n && !a && (B = A[n]);
				if (!B) {
					if (e.namespaceURI === this.SVG_NS || w.forExport) {
						try {
							(y = this.fakeTS && function (a) {
								z(e.querySelectorAll(".highcharts-text-outline"), function (B) {
									B.style.display = a
								})
							}) && y("none"), B = e.getBBox ? q({}, e.getBBox()) : {
								width: e.offsetWidth,
								height: e.offsetHeight
							}, y && y("")
						} catch (T) {}
						if (!B || 0 > B.width) B = {
							width: 0,
							height: 0
						}
					} else B = this.htmlGetBBox();
					w.isSVG && (a = B.width,
						w = B.height, d && I && "11px" === I.fontSize && "16.9" === w.toPrecision(3) && (B.height = w = 14), b && (B.width = Math.abs(w * Math.sin(c)) + Math.abs(a * Math.cos(c)), B.height = Math.abs(w * Math.cos(c)) + Math.abs(a * Math.sin(c))));
					if (n && 0 < B.height) {
						for (; 250 < g.length;) delete A[g.shift()];
						A[n] || g.push(n);
						A[n] = B
					}
				}
				return B
			},
			show: function (a) {
				return this.attr({
					visibility: a ? "inherit" : "visible"
				})
			},
			hide: function () {
				return this.attr({
					visibility: "hidden"
				})
			},
			fadeOut: function (a) {
				var B = this;
				B.animate({
					opacity: 0
				}, {
					duration: a || 150,
					complete: function () {
						B.attr({
							y: -9999
						})
					}
				})
			},
			add: function (a) {
				var B = this.renderer,
					d = this.element,
					b;
				a && (this.parentGroup = a);
				this.parentInverted = a && a.inverted;
				void 0 !== this.textStr && B.buildText(this);
				this.added = !0;
				if (!a || a.handleZ || this.zIndex) b = this.zIndexSetter();
				b || (a ? a.element : B.box).appendChild(d);
				if (this.onAdd) this.onAdd();
				return this
			},
			safeRemoveChild: function (a) {
				var B = a.parentNode;
				B && B.removeChild(a)
			},
			destroy: function () {
				var a = this.element || {},
					d = this.renderer.isSVG && "SPAN" === a.nodeName && this.parentGroup,
					b, w;
				a.onclick = a.onmouseout = a.onmouseover =
					a.onmousemove = a.point = null;
				N(this);
				this.clipPath && (this.clipPath = this.clipPath.destroy());
				if (this.stops) {
					for (w = 0; w < this.stops.length; w++) this.stops[w] = this.stops[w].destroy();
					this.stops = null
				}
				this.safeRemoveChild(a);
				for (this.destroyShadows(); d && d.div && 0 === d.div.childNodes.length;) a = d.parentGroup, this.safeRemoveChild(d.div), delete d.div, d = a;
				this.alignTo && g(this.renderer.alignedObjects, this);
				for (b in this) delete this[b];
				return null
			},
			shadow: function (a, d, b) {
				var B = [],
					w, c, e = this.element,
					I, L, v, y;
				if (!a) this.destroyShadows();
				else if (!this.shadows) {
					L = G(a.width, 3);
					v = (a.opacity || .15) / L;
					y = this.parentInverted ? "(-1,-1)" : "(" + G(a.offsetX, 1) + ", " + G(a.offsetY, 1) + ")";
					for (w = 1; w <= L; w++) c = e.cloneNode(0), I = 2 * L + 1 - 2 * w, r(c, {
						isShadow: "true",
						stroke: a.color || "#000000",
						"stroke-opacity": v * w,
						"stroke-width": I,
						transform: "translate" + y,
						fill: "none"
					}), b && (r(c, "height", Math.max(r(c, "height") - I, 0)), c.cutHeight = I), d ? d.element.appendChild(c) : e.parentNode.insertBefore(c, e), B.push(c);
					this.shadows = B
				}
				return this
			},
			destroyShadows: function () {
				z(this.shadows || [], function (a) {
					this.safeRemoveChild(a)
				}, this);
				this.shadows = void 0
			},
			xGetter: function (a) {
				"circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
				return this._defaultGetter(a)
			},
			_defaultGetter: function (a) {
				a = G(this[a], this.element ? this.element.getAttribute(a) : null, 0);
				/^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
				return a
			},
			dSetter: function (a, d, b) {
				a && a.join && (a = a.join(" "));
				/(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
				b.setAttribute(d, a);
				this[d] = a
			},
			dashstyleSetter: function (a) {
				var B, d = this["stroke-width"];
				"inherit" === d && (d = 1);
				if (a = a && a.toLowerCase()) {
					a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
					for (B = a.length; B--;) a[B] = v(a[B]) * d;
					a = a.join(",").replace(/NaN/g, "none");
					this.element.setAttribute("stroke-dasharray", a)
				}
			},
			alignSetter: function (a) {
				this.element.setAttribute("text-anchor", {
					left: "start",
					center: "middle",
					right: "end"
				}[a])
			},
			opacitySetter: function (a, d, b) {
				this[d] = a;
				b.setAttribute(d, a)
			},
			titleSetter: function (a) {
				var d = this.element.getElementsByTagName("title")[0];
				d || (d = h.createElementNS(this.SVG_NS, "title"), this.element.appendChild(d));
				d.firstChild && d.removeChild(d.firstChild);
				d.appendChild(h.createTextNode(String(G(a), "").replace(/<[^>]*>/g, "")))
			},
			textSetter: function (a) {
				a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
			},
			fillSetter: function (a, d, b) {
				"string" === typeof a ? b.setAttribute(d,
					a) : a && this.colorGradient(a, d, b)
			},
			visibilitySetter: function (a, d, b) {
				"inherit" === a ? b.removeAttribute(d) : b.setAttribute(d, a)
			},
			zIndexSetter: function (a, d) {
				var b = this.renderer,
					B = this.parentGroup,
					w = (B || b).element || b.box,
					c, e = this.element,
					I;
				c = this.added;
				var y;
				k(a) && (e.zIndex = a, a = +a, this[d] === a && (c = !1), this[d] = a);
				if (c) {
					(a = this.zIndex) && B && (B.handleZ = !0);
					d = w.childNodes;
					for (y = 0; y < d.length && !I; y++) B = d[y], c = B.zIndex, B !== e && (v(c) > a || !k(a) && k(c) || 0 > a && !k(c) && w !== b.box) && (w.insertBefore(e, B), I = !0);
					I || w.appendChild(e)
				}
				return I
			},
			_defaultSetter: function (a, d, b) {
				b.setAttribute(d, a)
			}
		};
		D.prototype.yGetter = D.prototype.xGetter;
		D.prototype.translateXSetter = D.prototype.translateYSetter = D.prototype.rotationSetter = D.prototype.verticalAlignSetter = D.prototype.scaleXSetter = D.prototype.scaleYSetter = function (a, d) {
			this[d] = a;
			this.doTransform = !0
		};
		D.prototype["stroke-widthSetter"] = D.prototype.strokeSetter = function (a, d, b) {
			this[d] = a;
			this.stroke && this["stroke-width"] ? (D.prototype.fillSetter.call(this, this.stroke, "stroke", b), b.setAttribute("stroke-width",
				this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === d && 0 === a && this.hasStroke && (b.removeAttribute("stroke"), this.hasStroke = !1)
		};
		C = a.SVGRenderer = function () {
			this.init.apply(this, arguments)
		};
		C.prototype = {
			Element: D,
			SVG_NS: I,
			init: function (a, d, b, w, c, e) {
				var B;
				w = this.createElement("svg").attr({
					version: "1.1",
					"class": "highcharts-root"
				}).css(this.getStyle(w));
				B = w.element;
				a.appendChild(B); - 1 === a.innerHTML.indexOf("xmlns") && r(B, "xmlns", this.SVG_NS);
				this.isSVG = !0;
				this.box = B;
				this.boxWrapper = w;
				this.alignedObjects = [];
				this.url = (u || x) && h.getElementsByTagName("base").length ? Q.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
				this.createElement("desc").add().element.appendChild(h.createTextNode("Created with Highstock 5.0.5"));
				this.defs = this.createElement("defs").add();
				this.allowHTML = e;
				this.forExport = c;
				this.gradients = {};
				this.cache = {};
				this.cacheKeys = [];
				this.imgCount = 0;
				this.setSize(d, b, !1);
				var I;
				u && a.getBoundingClientRect && (d = function () {
					t(a, {
						left: 0,
						top: 0
					});
					I = a.getBoundingClientRect();
					t(a, {
						left: Math.ceil(I.left) - I.left + "px",
						top: Math.ceil(I.top) - I.top + "px"
					})
				}, d(), this.unSubPixelFix = F(Q, "resize", d))
			},
			getStyle: function (a) {
				return this.style = q({
					fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
					fontSize: "12px"
				}, a)
			},
			setStyle: function (a) {
				this.boxWrapper.css(this.getStyle(a))
			},
			isHidden: function () {
				return !this.boxWrapper.getBBox().width
			},
			destroy: function () {
				var a = this.defs;
				this.box = null;
				this.boxWrapper = this.boxWrapper.destroy();
				b(this.gradients || {});
				this.gradients =
					null;
				a && (this.defs = a.destroy());
				this.unSubPixelFix && this.unSubPixelFix();
				return this.alignedObjects = null
			},
			createElement: function (a) {
				var d = new this.Element;
				d.init(this, a);
				return d
			},
			draw: E,
			getRadialAttr: function (a, d) {
				return {
					cx: a[0] - a[2] / 2 + d.cx * a[2],
					cy: a[1] - a[2] / 2 + d.cy * a[2],
					r: d.r * a[2]
				}
			},
			buildText: function (a) {
				for (var d = a.element, b = this, B = b.forExport, c = G(a.textStr, "").toString(), y = -1 !== c.indexOf("\x3c"), A = d.childNodes, g, n, x, q, J = r(d, "x"), u = a.styles, f = a.textWidth, K = u && u.lineHeight, E = u && u.textOutline, N = u &&
						"ellipsis" === u.textOverflow, k = A.length, p = f && !a.added && this.box, Q = function (a) {
							var w;
							w = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : u && u.fontSize || b.style.fontSize || 12;
							return K ? v(K) : b.fontMetrics(w, a.getAttribute("style") ? a : d).h
						}; k--;) d.removeChild(A[k]);
				y || E || N || f || -1 !== c.indexOf(" ") ? (g = /<.*class="([^"]+)".*>/, n = /<.*style="([^"]+)".*>/, x = /<.*href="(http[^"]+)".*>/, p && p.appendChild(d), c = y ? c.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,
					"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [c], c = e(c, function (a) {
					return "" !== a
				}), z(c, function (c, e) {
					var y, v = 0;
					c = c.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
					y = c.split("|||");
					z(y, function (c) {
						if ("" !== c || 1 === y.length) {
							var A = {},
								L = h.createElementNS(b.SVG_NS, "tspan"),
								G, K;
							g.test(c) && (G = c.match(g)[1], r(L, "class", G));
							n.test(c) && (K = c.match(n)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), r(L, "style", K));
							x.test(c) && !B && (r(L,
								"onclick", 'location.href\x3d"' + c.match(x)[1] + '"'), t(L, {
								cursor: "pointer"
							}));
							c = (c.replace(/<(.|\n)*?>/g, "") || " ").replace(/</g, "\x3c").replace(/>/g, "\x3e");
							if (" " !== c) {
								L.appendChild(h.createTextNode(c));
								v ? A.dx = 0 : e && null !== J && (A.x = J);
								r(L, A);
								d.appendChild(L);
								!v && e && (!w && B && t(L, {
									display: "block"
								}), r(L, "dy", Q(L)));
								if (f) {
									A = c.replace(/([^\^])-/g, "$1- ").split(" ");
									G = "nowrap" === u.whiteSpace;
									for (var z = 1 < y.length || e || 1 < A.length && !G, E, k, p = [], S = Q(L), l = a.rotation, m = c, O = m.length;
										(z || N) && (A.length || p.length);) a.rotation =
										0, E = a.getBBox(!0), k = E.width, !w && b.forExport && (k = b.measureSpanWidth(L.firstChild.data, a.styles)), E = k > f, void 0 === q && (q = E), N && q ? (O /= 2, "" === m || !E && .5 > O ? A = [] : (m = c.substring(0, m.length + (E ? -1 : 1) * Math.ceil(O)), A = [m + (3 < f ? "\u2026" : "")], L.removeChild(L.firstChild))) : E && 1 !== A.length ? (L.removeChild(L.firstChild), p.unshift(A.pop())) : (A = p, p = [], A.length && !G && (L = h.createElementNS(I, "tspan"), r(L, {
											dy: S,
											x: J
										}), K && r(L, "style", K), d.appendChild(L)), k > f && (f = k)), A.length && L.appendChild(h.createTextNode(A.join(" ").replace(/- /g,
											"-")));
									a.rotation = l
								}
								v++
							}
						}
					})
				}), q && a.attr("title", a.textStr), p && p.removeChild(d), E && a.applyTextOutline && a.applyTextOutline(E)) : d.appendChild(h.createTextNode(c.replace(/</g, "\x3c").replace(/>/g, "\x3e")))
			},
			getContrast: function (a) {
				a = l(a).rgba;
				return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
			},
			button: function (a, b, w, c, e, I, y, A, v) {
				var B = this.label(a, b, w, v, null, null, null, null, "button"),
					L = 0;
				B.attr(J({
					padding: 8,
					r: 2
				}, e));
				var g, n, h, x;
				e = J({
					fill: "#f7f7f7",
					stroke: "#cccccc",
					"stroke-width": 1,
					style: {
						color: "#333333",
						cursor: "pointer",
						fontWeight: "normal"
					}
				}, e);
				g = e.style;
				delete e.style;
				I = J(e, {
					fill: "#e6e6e6"
				}, I);
				n = I.style;
				delete I.style;
				y = J(e, {
					fill: "#e6ebf5",
					style: {
						color: "#000000",
						fontWeight: "bold"
					}
				}, y);
				h = y.style;
				delete y.style;
				A = J(e, {
					style: {
						color: "#cccccc"
					}
				}, A);
				x = A.style;
				delete A.style;
				F(B.element, d ? "mouseover" : "mouseenter", function () {
					3 !== L && B.setState(1)
				});
				F(B.element, d ? "mouseout" : "mouseleave", function () {
					3 !== L && B.setState(L)
				});
				B.setState = function (a) {
					1 !== a && (B.state = L = a);
					B.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
					B.attr([e, I, y, A][a || 0]).css([g, n, h, x][a || 0])
				};
				B.attr(e).css(q({
					cursor: "default"
				}, g));
				return B.on("click", function (a) {
					3 !== L && c.call(B, a)
				})
			},
			crispLine: function (a, d) {
				a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - d % 2 / 2);
				a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + d % 2 / 2);
				return a
			},
			path: function (a) {
				var d = {
					fill: "none"
				};
				n(a) ? d.d = a : A(a) && q(d, a);
				return this.createElement("path").attr(d)
			},
			circle: function (a, d, b) {
				a = A(a) ? a : {
					x: a,
					y: d,
					r: b
				};
				d = this.createElement("circle");
				d.xSetter =
					d.ySetter = function (a, d, b) {
						b.setAttribute("c" + d, a)
					};
				return d.attr(a)
			},
			arc: function (a, d, b, w, c, e) {
				A(a) && (d = a.y, b = a.r, w = a.innerR, c = a.start, e = a.end, a = a.x);
				a = this.symbol("arc", a || 0, d || 0, b || 0, b || 0, {
					innerR: w || 0,
					start: c || 0,
					end: e || 0
				});
				a.r = b;
				return a
			},
			rect: function (a, d, b, w, c, e) {
				c = A(a) ? a.r : c;
				var I = this.createElement("rect");
				a = A(a) ? a : void 0 === a ? {} : {
					x: a,
					y: d,
					width: Math.max(b, 0),
					height: Math.max(w, 0)
				};
				void 0 !== e && (a.strokeWidth = e, a = I.crisp(a));
				a.fill = "none";
				c && (a.r = c);
				I.rSetter = function (a, d, b) {
					r(b, {
						rx: a,
						ry: a
					})
				};
				return I.attr(a)
			},
			setSize: function (a, d, b) {
				var w = this.alignedObjects,
					c = w.length;
				this.width = a;
				this.height = d;
				for (this.boxWrapper.animate({
						width: a,
						height: d
					}, {
						step: function () {
							this.attr({
								viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
							})
						},
						duration: G(b, !0) ? void 0 : 0
					}); c--;) w[c].align()
			},
			g: function (a) {
				var d = this.createElement("g");
				return a ? d.attr({
					"class": "highcharts-" + a
				}) : d
			},
			image: function (a, d, b, w, c) {
				var e = {
					preserveAspectRatio: "none"
				};
				1 < arguments.length && q(e, {
					x: d,
					y: b,
					width: w,
					height: c
				});
				e = this.createElement("image").attr(e);
				e.element.setAttributeNS ? e.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : e.element.setAttribute("hc-svg-href", a);
				return e
			},
			symbol: function (a, d, b, w, c, e) {
				var I = this,
					B, y = this.symbols[a],
					A = k(d) && y && y(Math.round(d), Math.round(b), w, c, e),
					v = /^url\((.*?)\)$/,
					g, n;
				y ? (B = this.path(A), B.attr("fill", "none"), q(B, {
					symbolName: a,
					x: d,
					y: b,
					width: w,
					height: c
				}), e && q(B, e)) : v.test(a) && (g = a.match(v)[1], B = this.image(g), B.imgwidth = G(O[g] && O[g].width, e && e.width), B.imgheight = G(O[g] && O[g].height, e && e.height), n =
					function () {
						B.attr({
							width: B.width,
							height: B.height
						})
					}, z(["width", "height"], function (a) {
						B[a + "Setter"] = function (a, d) {
							var b = {},
								w = this["img" + d],
								c = "width" === d ? "translateX" : "translateY";
							this[d] = a;
							k(w) && (this.element && this.element.setAttribute(d, w), this.alignByTranslate || (b[c] = ((this[d] || 0) - w) / 2, this.attr(b)))
						}
					}), k(d) && B.attr({
						x: d,
						y: b
					}), B.isImg = !0, k(B.imgwidth) && k(B.imgheight) ? n() : (B.attr({
						width: 0,
						height: 0
					}), p("img", {
						onload: function () {
							var a = m[I.chartIndex];
							0 === this.width && (t(this, {
									position: "absolute",
									top: "-999em"
								}),
								h.body.appendChild(this));
							O[g] = {
								width: this.width,
								height: this.height
							};
							B.imgwidth = this.width;
							B.imgheight = this.height;
							B.element && n();
							this.parentNode && this.parentNode.removeChild(this);
							I.imgCount--;
							if (!I.imgCount && a && a.onload) a.onload()
						},
						src: g
					}), this.imgCount++));
				return B
			},
			symbols: {
				circle: function (a, d, b, w) {
					var c = .166 * b;
					return ["M", a + b / 2, d, "C", a + b + c, d, a + b + c, d + w, a + b / 2, d + w, "C", a - c, d + w, a - c, d, a + b / 2, d, "Z"]
				},
				square: function (a, d, b, w) {
					return ["M", a, d, "L", a + b, d, a + b, d + w, a, d + w, "Z"]
				},
				triangle: function (a, d, b, w) {
					return ["M",
						a + b / 2, d, "L", a + b, d + w, a, d + w, "Z"
					]
				},
				"triangle-down": function (a, d, b, w) {
					return ["M", a, d, "L", a + b, d, a + b / 2, d + w, "Z"]
				},
				diamond: function (a, d, b, w) {
					return ["M", a + b / 2, d, "L", a + b, d + w / 2, a + b / 2, d + w, a, d + w / 2, "Z"]
				},
				arc: function (a, d, b, w, c) {
					var e = c.start;
					b = c.r || b || w;
					var I = c.end - .001;
					w = c.innerR;
					var B = c.open,
						y = Math.cos(e),
						A = Math.sin(e),
						v = Math.cos(I),
						I = Math.sin(I);
					c = c.end - e < Math.PI ? 0 : 1;
					return ["M", a + b * y, d + b * A, "A", b, b, 0, c, 1, a + b * v, d + b * I, B ? "M" : "L", a + w * v, d + w * I, "A", w, w, 0, c, 0, a + w * y, d + w * A, B ? "" : "Z"]
				},
				callout: function (a, d, b, w, c) {
					var e =
						Math.min(c && c.r || 0, b, w),
						I = e + 6,
						y = c && c.anchorX;
					c = c && c.anchorY;
					var A;
					A = ["M", a + e, d, "L", a + b - e, d, "C", a + b, d, a + b, d, a + b, d + e, "L", a + b, d + w - e, "C", a + b, d + w, a + b, d + w, a + b - e, d + w, "L", a + e, d + w, "C", a, d + w, a, d + w, a, d + w - e, "L", a, d + e, "C", a, d, a, d, a + e, d];
					y && y > b ? c > d + I && c < d + w - I ? A.splice(13, 3, "L", a + b, c - 6, a + b + 6, c, a + b, c + 6, a + b, d + w - e) : A.splice(13, 3, "L", a + b, w / 2, y, c, a + b, w / 2, a + b, d + w - e) : y && 0 > y ? c > d + I && c < d + w - I ? A.splice(33, 3, "L", a, c + 6, a - 6, c, a, c - 6, a, d + e) : A.splice(33, 3, "L", a, w / 2, y, c, a, w / 2, a, d + e) : c && c > w && y > a + I && y < a + b - I ? A.splice(23, 3, "L", y + 6, d +
						w, y, d + w + 6, y - 6, d + w, a + e, d + w) : c && 0 > c && y > a + I && y < a + b - I && A.splice(3, 3, "L", y - 6, d, y, d - 6, y + 6, d, b - e, d);
					return A
				}
			},
			clipRect: function (d, b, w, c) {
				var e = a.uniqueKey(),
					I = this.createElement("clipPath").attr({
						id: e
					}).add(this.defs);
				d = this.rect(d, b, w, c, 0).add(I);
				d.id = e;
				d.clipPath = I;
				d.count = 0;
				return d
			},
			text: function (a, d, b, c) {
				var e = !w && this.forExport,
					I = {};
				if (c && (this.allowHTML || !this.forExport)) return this.html(a, d, b);
				I.x = Math.round(d || 0);
				b && (I.y = Math.round(b));
				if (a || 0 === a) I.text = a;
				a = this.createElement("text").attr(I);
				e && a.css({
					position: "absolute"
				});
				c || (a.xSetter = function (a, d, b) {
					var w = b.getElementsByTagName("tspan"),
						c, e = b.getAttribute(d),
						I;
					for (I = 0; I < w.length; I++) c = w[I], c.getAttribute(d) === e && c.setAttribute(d, a);
					b.setAttribute(d, a)
				});
				return a
			},
			fontMetrics: function (a, d) {
				a = a || d && d.style && d.style.fontSize || this.style && this.style.fontSize;
				a = /px/.test(a) ? v(a) : /em/.test(a) ? parseFloat(a) * (d ? this.fontMetrics(null, d.parentNode).f : 16) : 12;
				d = 24 > a ? a + 3 : Math.round(1.2 * a);
				return {
					h: d,
					b: Math.round(.8 * d),
					f: a
				}
			},
			rotCorr: function (a,
				d, b) {
				var w = a;
				d && b && (w = Math.max(w * Math.cos(d * f), 4));
				return {
					x: -a / 3 * Math.sin(d * f),
					y: w
				}
			},
			label: function (a, d, b, w, c, e, I, y, A) {
				var v = this,
					g = v.g("button" !== A && "label"),
					n = g.text = v.text("", 0, 0, I).attr({
						zIndex: 1
					}),
					B, h, x = 0,
					G = 3,
					u = 0,
					f, E, L, N, p, Q = {},
					m, l, O = /^url\((.*?)\)$/.test(w),
					t = O,
					S, r, P, R;
				A && g.addClass("highcharts-" + A);
				t = O;
				S = function () {
					return (m || 0) % 2 / 2
				};
				r = function () {
					var a = n.element.style,
						d = {};
					h = (void 0 === f || void 0 === E || p) && k(n.textStr) && n.getBBox();
					g.width = (f || h.width || 0) + 2 * G + u;
					g.height = (E || h.height || 0) + 2 * G;
					l =
						G + v.fontMetrics(a && a.fontSize, n).b;
					t && (B || (g.box = B = v.symbols[w] || O ? v.symbol(w) : v.rect(), B.addClass(("button" === A ? "" : "highcharts-label-box") + (A ? " highcharts-" + A + "-box" : "")), B.add(g), a = S(), d.x = a, d.y = (y ? -l : 0) + a), d.width = Math.round(g.width), d.height = Math.round(g.height), B.attr(q(d, Q)), Q = {})
				};
				P = function () {
					var a = u + G,
						d;
					d = y ? 0 : l;
					k(f) && h && ("center" === p || "right" === p) && (a += {
						center: .5,
						right: 1
					}[p] * (f - h.width));
					if (a !== n.x || d !== n.y) n.attr("x", a), void 0 !== d && n.attr("y", d);
					n.x = a;
					n.y = d
				};
				R = function (a, d) {
					B ? B.attr(a, d) :
						Q[a] = d
				};
				g.onAdd = function () {
					n.add(g);
					g.attr({
						text: a || 0 === a ? a : "",
						x: d,
						y: b
					});
					B && k(c) && g.attr({
						anchorX: c,
						anchorY: e
					})
				};
				g.widthSetter = function (a) {
					f = a
				};
				g.heightSetter = function (a) {
					E = a
				};
				g["text-alignSetter"] = function (a) {
					p = a
				};
				g.paddingSetter = function (a) {
					k(a) && a !== G && (G = g.padding = a, P())
				};
				g.paddingLeftSetter = function (a) {
					k(a) && a !== u && (u = a, P())
				};
				g.alignSetter = function (a) {
					a = {
						left: 0,
						center: .5,
						right: 1
					}[a];
					a !== x && (x = a, h && g.attr({
						x: L
					}))
				};
				g.textSetter = function (a) {
					void 0 !== a && n.textSetter(a);
					r();
					P()
				};
				g["stroke-widthSetter"] =
					function (a, d) {
						a && (t = !0);
						m = this["stroke-width"] = a;
						R(d, a)
					};
				g.strokeSetter = g.fillSetter = g.rSetter = function (a, d) {
					"fill" === d && a && (t = !0);
					R(d, a)
				};
				g.anchorXSetter = function (a, d) {
					c = a;
					R(d, Math.round(a) - S() - L)
				};
				g.anchorYSetter = function (a, d) {
					e = a;
					R(d, a - N)
				};
				g.xSetter = function (a) {
					g.x = a;
					x && (a -= x * ((f || h.width) + 2 * G));
					L = Math.round(a);
					g.attr("translateX", L)
				};
				g.ySetter = function (a) {
					N = g.y = Math.round(a);
					g.attr("translateY", N)
				};
				var V = g.css;
				return q(g, {
					css: function (a) {
						if (a) {
							var d = {};
							a = J(a);
							z(g.textProps, function (b) {
								void 0 !==
									a[b] && (d[b] = a[b], delete a[b])
							});
							n.css(d)
						}
						return V.call(g, a)
					},
					getBBox: function () {
						return {
							width: h.width + 2 * G,
							height: h.height + 2 * G,
							x: h.x - G,
							y: h.y - G
						}
					},
					shadow: function (a) {
						a && (r(), B && B.shadow(a));
						return g
					},
					destroy: function () {
						K(g.element, "mouseenter");
						K(g.element, "mouseleave");
						n && (n = n.destroy());
						B && (B = B.destroy());
						D.prototype.destroy.call(g);
						g = v = r = P = R = null
					}
				})
			}
		};
		a.Renderer = C
	})(M);
	(function (a) {
		var D = a.attr,
			C = a.createElement,
			F = a.css,
			H = a.defined,
			r = a.each,
			m = a.extend,
			l = a.isFirefox,
			t = a.isMS,
			p = a.isWebKit,
			k = a.pInt,
			f =
			a.SVGRenderer,
			b = a.win,
			h = a.wrap;
		m(a.SVGElement.prototype, {
			htmlCss: function (a) {
				var b = this.element;
				if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform();
				a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
				this.styles = m(this.styles, a);
				F(this.element, a);
				return this
			},
			htmlGetBBox: function () {
				var a = this.element;
				"text" === a.nodeName && (a.style.position = "absolute");
				return {
					x: a.offsetLeft,
					y: a.offsetTop,
					width: a.offsetWidth,
					height: a.offsetHeight
				}
			},
			htmlUpdateTransform: function () {
				if (this.added) {
					var a =
						this.renderer,
						b = this.element,
						g = this.translateX || 0,
						e = this.translateY || 0,
						c = this.x || 0,
						n = this.y || 0,
						h = this.textAlign || "left",
						d = {
							left: 0,
							center: .5,
							right: 1
						}[h],
						A = this.styles;
					F(b, {
						marginLeft: g,
						marginTop: e
					});
					this.shadows && r(this.shadows, function (a) {
						F(a, {
							marginLeft: g + 1,
							marginTop: e + 1
						})
					});
					this.inverted && r(b.childNodes, function (d) {
						a.invertChild(d, b)
					});
					if ("SPAN" === b.tagName) {
						var y = this.rotation,
							x = k(this.textWidth),
							f = A && A.whiteSpace,
							E = [y, h, b.innerHTML, this.textWidth, this.textAlign].join();
						E !== this.cTT && (A = a.fontMetrics(b.style.fontSize).b,
							H(y) && this.setSpanRotation(y, d, A), F(b, {
								width: "",
								whiteSpace: f || "nowrap"
							}), b.offsetWidth > x && /[ \-]/.test(b.textContent || b.innerText) && F(b, {
								width: x + "px",
								display: "block",
								whiteSpace: f || "normal"
							}), this.getSpanCorrection(b.offsetWidth, A, d, y, h));
						F(b, {
							left: c + (this.xCorr || 0) + "px",
							top: n + (this.yCorr || 0) + "px"
						});
						p && (A = b.offsetHeight);
						this.cTT = E
					}
				} else this.alignOnAdd = !0
			},
			setSpanRotation: function (a, h, g) {
				var e = {},
					c = t ? "-ms-transform" : p ? "-webkit-transform" : l ? "MozTransform" : b.opera ? "-o-transform" : "";
				e[c] = e.transform =
					"rotate(" + a + "deg)";
				e[c + (l ? "Origin" : "-origin")] = e.transformOrigin = 100 * h + "% " + g + "px";
				F(this.element, e)
			},
			getSpanCorrection: function (a, b, g) {
				this.xCorr = -a * g;
				this.yCorr = -b
			}
		});
		m(f.prototype, {
			html: function (a, b, g) {
				var e = this.createElement("span"),
					c = e.element,
					n = e.renderer,
					u = n.isSVG,
					d = function (a, d) {
						r(["opacity", "visibility"], function (b) {
							h(a, b + "Setter", function (a, b, c, e) {
								a.call(this, b, c, e);
								d[c] = b
							})
						})
					};
				e.textSetter = function (a) {
					a !== c.innerHTML && delete this.bBox;
					c.innerHTML = this.textStr = a;
					e.htmlUpdateTransform()
				};
				u && d(e, e.element.style);
				e.xSetter = e.ySetter = e.alignSetter = e.rotationSetter = function (a, d) {
					"align" === d && (d = "textAlign");
					e[d] = a;
					e.htmlUpdateTransform()
				};
				e.attr({
					text: a,
					x: Math.round(b),
					y: Math.round(g)
				}).css({
					fontFamily: this.style.fontFamily,
					fontSize: this.style.fontSize,
					position: "absolute"
				});
				c.style.whiteSpace = "nowrap";
				e.css = e.htmlCss;
				u && (e.add = function (a) {
					var b, g = n.box.parentNode,
						A = [];
					if (this.parentGroup = a) {
						if (b = a.div, !b) {
							for (; a;) A.push(a), a = a.parentGroup;
							r(A.reverse(), function (a) {
								var c, y = D(a.element,
									"class");
								y && (y = {
									className: y
								});
								b = a.div = a.div || C("div", y, {
									position: "absolute",
									left: (a.translateX || 0) + "px",
									top: (a.translateY || 0) + "px",
									display: a.display,
									opacity: a.opacity,
									pointerEvents: a.styles && a.styles.pointerEvents
								}, b || g);
								c = b.style;
								m(a, {
									on: function () {
										e.on.apply({
											element: A[0].div
										}, arguments);
										return a
									},
									translateXSetter: function (d, b) {
										c.left = d + "px";
										a[b] = d;
										a.doTransform = !0
									},
									translateYSetter: function (d, b) {
										c.top = d + "px";
										a[b] = d;
										a.doTransform = !0
									}
								});
								d(a, c)
							})
						}
					} else b = g;
					b.appendChild(c);
					e.added = !0;
					e.alignOnAdd &&
						e.htmlUpdateTransform();
					return e
				});
				return e
			}
		})
	})(M);
	(function (a) {
		var D, C, F = a.createElement,
			H = a.css,
			r = a.defined,
			m = a.deg2rad,
			l = a.discardElement,
			t = a.doc,
			p = a.each,
			k = a.erase,
			f = a.extend;
		D = a.extendClass;
		var b = a.isArray,
			h = a.isNumber,
			z = a.isObject,
			q = a.merge;
		C = a.noop;
		var g = a.pick,
			e = a.pInt,
			c = a.SVGElement,
			n = a.SVGRenderer,
			u = a.win;
		a.svg || (C = {
			docMode8: t && 8 === t.documentMode,
			init: function (a, b) {
				var d = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'],
					c = ["position: ", "absolute", ";"],
					e = "div" === b;
				("shape" === b || e) && c.push("left:0;top:0;width:1px;height:1px;");
				c.push("visibility: ", e ? "hidden" : "visible");
				d.push(' style\x3d"', c.join(""), '"/\x3e');
				b && (d = e || "span" === b || "img" === b ? d.join("") : a.prepVML(d), this.element = F(d));
				this.renderer = a
			},
			add: function (a) {
				var d = this.renderer,
					b = this.element,
					c = d.box,
					e = a && a.inverted,
					c = a ? a.element || a : c;
				a && (this.parentGroup = a);
				e && d.invertChild(b, c);
				c.appendChild(b);
				this.added = !0;
				this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
				if (this.onAdd) this.onAdd();
				this.className && this.attr("class", this.className);
				return this
			},
			updateTransform: c.prototype.htmlUpdateTransform,
			setSpanRotation: function () {
				var a = this.rotation,
					b = Math.cos(a * m),
					c = Math.sin(a * m);
				H(this.element, {
					filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d", b, ", M12\x3d", -c, ", M21\x3d", c, ", M22\x3d", b, ", sizingMethod\x3d'auto expand')"].join("") : "none"
				})
			},
			getSpanCorrection: function (a, b, c, e, n) {
				var d = e ? Math.cos(e * m) : 1,
					y = e ? Math.sin(e * m) : 0,
					v = g(this.elemHeight, this.element.offsetHeight),
					A;
				this.xCorr = 0 > d && -a;
				this.yCorr = 0 > y && -v;
				A = 0 > d * y;
				this.xCorr += y * b * (A ? 1 -
					c : c);
				this.yCorr -= d * b * (e ? A ? c : 1 - c : 1);
				n && "left" !== n && (this.xCorr -= a * c * (0 > d ? -1 : 1), e && (this.yCorr -= v * c * (0 > y ? -1 : 1)), H(this.element, {
					textAlign: n
				}))
			},
			pathToVML: function (a) {
				for (var d = a.length, b = []; d--;) h(a[d]) ? b[d] = Math.round(10 * a[d]) - 5 : "Z" === a[d] ? b[d] = "x" : (b[d] = a[d], !a.isArc || "wa" !== a[d] && "at" !== a[d] || (b[d + 5] === b[d + 7] && (b[d + 7] += a[d + 7] > a[d + 5] ? 1 : -1), b[d + 6] === b[d + 8] && (b[d + 8] += a[d + 8] > a[d + 6] ? 1 : -1)));
				return b.join(" ") || "x"
			},
			clip: function (a) {
				var d = this,
					b;
				a ? (b = a.members, k(b, d), b.push(d), d.destroyClip = function () {
					k(b,
						d)
				}, a = a.getCSS(d)) : (d.destroyClip && d.destroyClip(), a = {
					clip: d.docMode8 ? "inherit" : "rect(auto)"
				});
				return d.css(a)
			},
			css: c.prototype.htmlCss,
			safeRemoveChild: function (a) {
				a.parentNode && l(a)
			},
			destroy: function () {
				this.destroyClip && this.destroyClip();
				return c.prototype.destroy.apply(this)
			},
			on: function (a, b) {
				this.element["on" + a] = function () {
					var a = u.event;
					a.target = a.srcElement;
					b(a)
				};
				return this
			},
			cutOffPath: function (a, b) {
				var d;
				a = a.split(/[ ,]/);
				d = a.length;
				if (9 === d || 11 === d) a[d - 4] = a[d - 2] = e(a[d - 2]) - 10 * b;
				return a.join(" ")
			},
			shadow: function (a, b, c) {
				var d = [],
					n, y = this.element,
					h = this.renderer,
					v, A = y.style,
					u, w = y.path,
					I, f, q, B;
				w && "string" !== typeof w.value && (w = "x");
				f = w;
				if (a) {
					q = g(a.width, 3);
					B = (a.opacity || .15) / q;
					for (n = 1; 3 >= n; n++) I = 2 * q + 1 - 2 * n, c && (f = this.cutOffPath(w.value, I + .5)), u = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"', I, '" filled\x3d"false" path\x3d"', f, '" coordsize\x3d"10 10" style\x3d"', y.style.cssText, '" /\x3e'], v = F(h.prepVML(u), null, {
						left: e(A.left) + g(a.offsetX, 1),
						top: e(A.top) + g(a.offsetY, 1)
					}), c && (v.cutOff = I + 1), u = ['\x3cstroke color\x3d"',
						a.color || "#000000", '" opacity\x3d"', B * n, '"/\x3e'
					], F(h.prepVML(u), null, null, v), b ? b.element.appendChild(v) : y.parentNode.insertBefore(v, y), d.push(v);
					this.shadows = d
				}
				return this
			},
			updateShadows: C,
			setAttr: function (a, b) {
				this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b)
			},
			classSetter: function (a) {
				(this.added ? this.element : this).className = a
			},
			dashstyleSetter: function (a, b, c) {
				(c.getElementsByTagName("stroke")[0] || F(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, c))[b] = a || "solid";
				this[b] = a
			},
			dSetter: function (a,
				b, c) {
				var d = this.shadows;
				a = a || [];
				this.d = a.join && a.join(" ");
				c.path = a = this.pathToVML(a);
				if (d)
					for (c = d.length; c--;) d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a;
				this.setAttr(b, a)
			},
			fillSetter: function (a, b, c) {
				var d = c.nodeName;
				"SPAN" === d ? c.style.color = a : "IMG" !== d && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)))
			},
			"fill-opacitySetter": function (a, b, c) {
				F(this.renderer.prepVML(["\x3c", b.split("-")[0], ' opacity\x3d"', a, '"/\x3e']), null, null, c)
			},
			opacitySetter: C,
			rotationSetter: function (a,
				b, c) {
				c = c.style;
				this[b] = c[b] = a;
				c.left = -Math.round(Math.sin(a * m) + 1) + "px";
				c.top = Math.round(Math.cos(a * m)) + "px"
			},
			strokeSetter: function (a, b, c) {
				this.setAttr("strokecolor", this.renderer.color(a, c, b, this))
			},
			"stroke-widthSetter": function (a, b, c) {
				c.stroked = !!a;
				this[b] = a;
				h(a) && (a += "px");
				this.setAttr("strokeweight", a)
			},
			titleSetter: function (a, b) {
				this.setAttr(b, a)
			},
			visibilitySetter: function (a, b, c) {
				"inherit" === a && (a = "visible");
				this.shadows && p(this.shadows, function (d) {
					d.style[b] = a
				});
				"DIV" === c.nodeName && (a = "hidden" ===
					a ? "-999em" : 0, this.docMode8 || (c.style[b] = a ? "visible" : "hidden"), b = "top");
				c.style[b] = a
			},
			xSetter: function (a, b, c) {
				this[b] = a;
				"x" === b ? b = "left" : "y" === b && (b = "top");
				this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a
			},
			zIndexSetter: function (a, b, c) {
				c.style[b] = a
			}
		}, C["stroke-opacitySetter"] = C["fill-opacitySetter"], a.VMLElement = C = D(c, C), C.prototype.ySetter = C.prototype.widthSetter = C.prototype.heightSetter = C.prototype.xSetter, C = {
			Element: C,
			isIE8: -1 < u.navigator.userAgent.indexOf("MSIE 8.0"),
			init: function (a,
				b, c) {
				var d, e;
				this.alignedObjects = [];
				d = this.createElement("div").css({
					position: "relative"
				});
				e = d.element;
				a.appendChild(d.element);
				this.isVML = !0;
				this.box = e;
				this.boxWrapper = d;
				this.gradients = {};
				this.cache = {};
				this.cacheKeys = [];
				this.imgCount = 0;
				this.setSize(b, c, !1);
				if (!t.namespaces.hcv) {
					t.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
					try {
						t.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
					} catch (E) {
						t.styleSheets[0].cssText +=
							"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
					}
				}
			},
			isHidden: function () {
				return !this.box.offsetWidth
			},
			clipRect: function (a, b, c, e) {
				var d = this.createElement(),
					g = z(a);
				return f(d, {
					members: [],
					count: 0,
					left: (g ? a.x : a) + 1,
					top: (g ? a.y : b) + 1,
					width: (g ? a.width : c) - 1,
					height: (g ? a.height : e) - 1,
					getCSS: function (a) {
						var b = a.element,
							d = b.nodeName,
							c = a.inverted,
							w = this.top - ("shape" === d ? b.offsetTop : 0),
							e = this.left,
							b = e + this.width,
							g = w + this.height,
							w = {
								clip: "rect(" + Math.round(c ?
									e : w) + "px," + Math.round(c ? g : b) + "px," + Math.round(c ? b : g) + "px," + Math.round(c ? w : e) + "px)"
							};
						!c && a.docMode8 && "DIV" === d && f(w, {
							width: b + "px",
							height: g + "px"
						});
						return w
					},
					updateClipping: function () {
						p(d.members, function (a) {
							a.element && a.css(d.getCSS(a))
						})
					}
				})
			},
			color: function (b, c, e, g) {
				var d = this,
					n, h = /^rgba/,
					v, y, u = "none";
				b && b.linearGradient ? y = "gradient" : b && b.radialGradient && (y = "pattern");
				if (y) {
					var w, I, f = b.linearGradient || b.radialGradient,
						q, B, A, x, z, k = "";
					b = b.stops;
					var l, m = [],
						t = function () {
							v = ['\x3cfill colors\x3d"' + m.join(",") +
								'" opacity\x3d"', A, '" o:opacity2\x3d"', B, '" type\x3d"', y, '" ', k, 'focus\x3d"100%" method\x3d"any" /\x3e'
							];
							F(d.prepVML(v), null, null, c)
						};
					q = b[0];
					l = b[b.length - 1];
					0 < q[0] && b.unshift([0, q[1]]);
					1 > l[0] && b.push([1, l[1]]);
					p(b, function (b, d) {
						h.test(b[1]) ? (n = a.color(b[1]), w = n.get("rgb"), I = n.get("a")) : (w = b[1], I = 1);
						m.push(100 * b[0] + "% " + w);
						d ? (A = I, x = w) : (B = I, z = w)
					});
					if ("fill" === e)
						if ("gradient" === y) e = f.x1 || f[0] || 0, b = f.y1 || f[1] || 0, q = f.x2 || f[2] || 0, f = f.y2 || f[3] || 0, k = 'angle\x3d"' + (90 - 180 * Math.atan((f - b) / (q - e)) / Math.PI) + '"',
							t();
						else {
							var u = f.r,
								r = 2 * u,
								C = 2 * u,
								D = f.cx,
								H = f.cy,
								U = c.radialReference,
								T, u = function () {
									U && (T = g.getBBox(), D += (U[0] - T.x) / T.width - .5, H += (U[1] - T.y) / T.height - .5, r *= U[2] / T.width, C *= U[2] / T.height);
									k = 'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + r + "," + C + '" origin\x3d"0.5,0.5" position\x3d"' + D + "," + H + '" color2\x3d"' + z + '" ';
									t()
								};
							g.added ? u() : g.onAdd = u;
							u = x
						}
					else u = w
				} else h.test(b) && "IMG" !== c.tagName ? (n = a.color(b), g[e + "-opacitySetter"](n.get("a"), e, c), u = n.get("rgb")) : (u = c.getElementsByTagName(e),
					u.length && (u[0].opacity = 1, u[0].type = "solid"), u = b);
				return u
			},
			prepVML: function (a) {
				var b = this.isIE8;
				a = a.join("");
				b ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a = -1 === a.indexOf('style\x3d"') ? a.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : a.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");
				return a
			},
			text: n.prototype.html,
			path: function (a) {
				var d = {
					coordsize: "10 10"
				};
				b(a) ? d.d =
					a : z(a) && f(d, a);
				return this.createElement("shape").attr(d)
			},
			circle: function (a, b, c) {
				var d = this.symbol("circle");
				z(a) && (c = a.r, b = a.y, a = a.x);
				d.isCircle = !0;
				d.r = c;
				return d.attr({
					x: a,
					y: b
				})
			},
			g: function (a) {
				var b;
				a && (b = {
					className: "highcharts-" + a,
					"class": "highcharts-" + a
				});
				return this.createElement("div").attr(b)
			},
			image: function (a, b, c, e, g) {
				var d = this.createElement("img").attr({
					src: a
				});
				1 < arguments.length && d.attr({
					x: b,
					y: c,
					width: e,
					height: g
				});
				return d
			},
			createElement: function (a) {
				return "rect" === a ? this.symbol(a) : n.prototype.createElement.call(this,
					a)
			},
			invertChild: function (a, b) {
				var d = this;
				b = b.style;
				var c = "IMG" === a.tagName && a.style;
				H(a, {
					flip: "x",
					left: e(b.width) - (c ? e(c.top) : 1),
					top: e(b.height) - (c ? e(c.left) : 1),
					rotation: -90
				});
				p(a.childNodes, function (b) {
					d.invertChild(b, a)
				})
			},
			symbols: {
				arc: function (a, b, c, e, g) {
					var d = g.start,
						n = g.end,
						v = g.r || c || e;
					c = g.innerR;
					e = Math.cos(d);
					var h = Math.sin(d),
						u = Math.cos(n),
						w = Math.sin(n);
					if (0 === n - d) return ["x"];
					d = ["wa", a - v, b - v, a + v, b + v, a + v * e, b + v * h, a + v * u, b + v * w];
					g.open && !c && d.push("e", "M", a, b);
					d.push("at", a - c, b - c, a + c, b + c, a + c * u,
						b + c * w, a + c * e, b + c * h, "x", "e");
					d.isArc = !0;
					return d
				},
				circle: function (a, b, c, e, g) {
					g && r(g.r) && (c = e = 2 * g.r);
					g && g.isCircle && (a -= c / 2, b -= e / 2);
					return ["wa", a, b, a + c, b + e, a + c, b + e / 2, a + c, b + e / 2, "e"]
				},
				rect: function (a, b, c, e, g) {
					return n.prototype.symbols[r(g) && g.r ? "callout" : "square"].call(0, a, b, c, e, g)
				}
			}
		}, a.VMLRenderer = D = function () {
			this.init.apply(this, arguments)
		}, D.prototype = q(n.prototype, C), a.Renderer = D);
		n.prototype.measureSpanWidth = function (a, b) {
			var c = t.createElement("span");
			a = t.createTextNode(a);
			c.appendChild(a);
			H(c,
				b);
			this.box.appendChild(c);
			b = c.offsetWidth;
			l(c);
			return b
		}
	})(M);
	(function (a) {
		function D() {
			var t = a.defaultOptions.global,
				p, k = t.useUTC,
				f = k ? "getUTC" : "get",
				b = k ? "setUTC" : "set";
			a.Date = p = t.Date || l.Date;
			p.hcTimezoneOffset = k && t.timezoneOffset;
			p.hcGetTimezoneOffset = k && t.getTimezoneOffset;
			p.hcMakeTime = function (a, b, f, g, e, c) {
				var n;
				k ? (n = p.UTC.apply(0, arguments), n += H(n)) : n = (new p(a, b, m(f, 1), m(g, 0), m(e, 0), m(c, 0))).getTime();
				return n
			};
			F("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
				p["hcGet" + a] = f +
					a
			});
			F("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
				p["hcSet" + a] = b + a
			})
		}
		var C = a.color,
			F = a.each,
			H = a.getTZOffset,
			r = a.merge,
			m = a.pick,
			l = a.win;
		a.defaultOptions = {
			colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
			symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
			lang: {
				loading: "Loading...",
				months: "January February March April May June July August September October November December".split(" "),
				shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
				weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
				decimalPoint: ".",
				numericSymbols: "kMGTPE".split(""),
				resetZoom: "Reset zoom",
				resetZoomTitle: "Reset zoom level 1:1",
				thousandsSep: " "
			},
			global: {
				useUTC: !0,
				VMLRadialGradientURL: "http://code.highcharts.com/5.0.5/gfx/vml-radial-gradient.png"
			},
			chart: {
				borderRadius: 0,
				defaultSeriesType: "line",
				ignoreHiddenSeries: !0,
				spacing: [10, 10, 15, 10],
				resetZoomButton: {
					theme: {
						zIndex: 20
					},
					position: {
						align: "right",
						x: -10,
						y: 10
					}
				},
				width: null,
				height: null,
				borderColor: "#335cad",
				backgroundColor: "#ffffff",
				plotBorderColor: "#cccccc"
			},
			title: {
				text: "Chart title",
				align: "center",
				margin: 15,
				widthAdjust: -44
			},
			subtitle: {
				text: "",
				align: "center",
				widthAdjust: -44
			},
			plotOptions: {},
			labels: {
				style: {
					position: "absolute",
					color: "#333333"
				}
			},
			legend: {
				enabled: !0,
				align: "center",
				layout: "horizontal",
				labelFormatter: function () {
					return this.name
				},
				borderColor: "#999999",
				borderRadius: 0,
				navigation: {
					activeColor: "#003399",
					inactiveColor: "#cccccc"
				},
				itemStyle: {
					color: "#333333",
					fontSize: "12px",
					fontWeight: "bold"
				},
				itemHoverStyle: {
					color: "#000000"
				},
				itemHiddenStyle: {
					color: "#cccccc"
				},
				shadow: !1,
				itemCheckboxStyle: {
					position: "absolute",
					width: "13px",
					height: "13px"
				},
				squareSymbol: !0,
				symbolPadding: 5,
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				title: {
					style: {
						fontWeight: "bold"
					}
				}
			},
			loading: {
				labelStyle: {
					fontWeight: "bold",
					position: "relative",
					top: "45%"
				},
				style: {
					position: "absolute",
					backgroundColor: "#ffffff",
					opacity: .5,
					textAlign: "center"
				}
			},
			tooltip: {
				enabled: !0,
				animation: a.svg,
				borderRadius: 3,
				dateTimeLabelFormats: {
					millisecond: "%A, %b %e, %H:%M:%S.%L",
					second: "%A, %b %e, %H:%M:%S",
					minute: "%A, %b %e, %H:%M",
					hour: "%A, %b %e, %H:%M",
					day: "%A, %b %e, %Y",
					week: "Week from %A, %b %e, %Y",
					month: "%B %Y",
					year: "%Y"
				},
				footerFormat: "",
				padding: 8,
				snap: a.isTouchDevice ? 25 : 10,
				backgroundColor: C("#f7f7f7").setOpacity(.85).get(),
				borderWidth: 1,
				headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
				pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
				shadow: !0,
				style: {
					color: "#333333",
					cursor: "default",
					fontSize: "12px",
					pointerEvents: "none",
					whiteSpace: "nowrap"
				}
			},
			credits: {
				enabled: !0,
				href: "http://www.fritz-gruppe.de",
				position: {
					align: "right",
					x: -10,
					verticalAlign: "bottom",
					y: -5
				},
				style: {
					cursor: "pointer",
					color: "#999999",
					fontSize: "9px"
				},
				text: "Fritz-Gruppe"
			}
		};
		a.setOptions = function (l) {
			a.defaultOptions = r(!0, a.defaultOptions, l);
			D();
			return a.defaultOptions
		};
		a.getOptions = function () {
			return a.defaultOptions
		};
		a.defaultPlotOptions = a.defaultOptions.plotOptions;
		D()
	})(M);
	(function (a) {
		var D = a.arrayMax,
			C = a.arrayMin,
			F = a.defined,
			H = a.destroyObjectProperties,
			r = a.each,
			m = a.erase,
			l = a.merge,
			t = a.pick;
		a.PlotLineOrBand = function (a, k) {
			this.axis = a;
			k && (this.options = k, this.id = k.id)
		};
		a.PlotLineOrBand.prototype = {
			render: function () {
				var a = this,
					k = a.axis,
					f = k.horiz,
					b = a.options,
					h = b.label,
					z = a.label,
					q = b.to,
					g = b.from,
					e = b.value,
					c = F(g) && F(q),
					n = F(e),
					u = a.svgElem,
					d = !u,
					A = [],
					y, x = b.color,
					J = t(b.zIndex, 0),
					E = b.events,
					A = {
						"class": "highcharts-plot-" + (c ? "band " : "line ") + (b.className || "")
					},
					G = {},
					v = k.chart.renderer,
					K = c ? "bands" : "lines",
					N = k.log2lin;
				k.isLog && (g = N(g), q =
					N(q), e = N(e));
				n ? (A = {
					stroke: x,
					"stroke-width": b.width
				}, b.dashStyle && (A.dashstyle = b.dashStyle)) : c && (x && (A.fill = x), b.borderWidth && (A.stroke = b.borderColor, A["stroke-width"] = b.borderWidth));
				G.zIndex = J;
				K += "-" + J;
				(x = k[K]) || (k[K] = x = v.g("plot-" + K).attr(G).add());
				d && (a.svgElem = u = v.path().attr(A).add(x));
				if (n) A = k.getPlotLinePath(e, u.strokeWidth());
				else if (c) A = k.getPlotBandPath(g, q, b);
				else return;
				if (d && A && A.length) {
					if (u.attr({
							d: A
						}), E)
						for (y in b = function (b) {
								u.on(b, function (c) {
									E[b].apply(a, [c])
								})
							}, E) b(y)
				} else u &&
					(A ? (u.show(), u.animate({
						d: A
					})) : (u.hide(), z && (a.label = z = z.destroy())));
				h && F(h.text) && A && A.length && 0 < k.width && 0 < k.height && !A.flat ? (h = l({
					align: f && c && "center",
					x: f ? !c && 4 : 10,
					verticalAlign: !f && c && "middle",
					y: f ? c ? 16 : 10 : c ? 6 : -4,
					rotation: f && !c && 90
				}, h), this.renderLabel(h, A, c, J)) : z && z.hide();
				return a
			},
			renderLabel: function (a, k, f, b) {
				var h = this.label,
					z = this.axis.chart.renderer;
				h || (h = {
						align: a.textAlign || a.align,
						rotation: a.rotation,
						"class": "highcharts-plot-" + (f ? "band" : "line") + "-label " + (a.className || "")
					}, h.zIndex = b,
					this.label = h = z.text(a.text, 0, 0, a.useHTML).attr(h).add(), h.css(a.style));
				b = [k[1], k[4], f ? k[6] : k[1]];
				k = [k[2], k[5], f ? k[7] : k[2]];
				f = C(b);
				z = C(k);
				h.align(a, !1, {
					x: f,
					y: z,
					width: D(b) - f,
					height: D(k) - z
				});
				h.show()
			},
			destroy: function () {
				m(this.axis.plotLinesAndBands, this);
				delete this.axis;
				H(this)
			}
		};
		a.AxisPlotLineOrBandExtension = {
			getPlotBandPath: function (a, k) {
				k = this.getPlotLinePath(k, null, null, !0);
				(a = this.getPlotLinePath(a, null, null, !0)) && k ? (a.flat = a.toString() === k.toString(), a.push(k[4], k[5], k[1], k[2], "z")) : a = null;
				return a
			},
			addPlotBand: function (a) {
				return this.addPlotBandOrLine(a, "plotBands")
			},
			addPlotLine: function (a) {
				return this.addPlotBandOrLine(a, "plotLines")
			},
			addPlotBandOrLine: function (l, k) {
				var f = (new a.PlotLineOrBand(this, l)).render(),
					b = this.userOptions;
				f && (k && (b[k] = b[k] || [], b[k].push(l)), this.plotLinesAndBands.push(f));
				return f
			},
			removePlotBandOrLine: function (a) {
				for (var k = this.plotLinesAndBands, f = this.options, b = this.userOptions, h = k.length; h--;) k[h].id === a && k[h].destroy();
				r([f.plotLines || [], b.plotLines || [], f.plotBands || [], b.plotBands || []], function (b) {
					for (h = b.length; h--;) b[h].id === a && m(b, b[h])
				})
			}
		}
	})(M);
	(function (a) {
		var D = a.correctFloat,
			C = a.defined,
			F = a.destroyObjectProperties,
			H = a.isNumber,
			r = a.merge,
			m = a.pick,
			l = a.deg2rad;
		a.Tick = function (a, l, k, f) {
			this.axis = a;
			this.pos = l;
			this.type = k || "";
			this.isNew = !0;
			k || f || this.addLabel()
		};
		a.Tick.prototype = {
			addLabel: function () {
				var a = this.axis,
					l = a.options,
					k = a.chart,
					f = a.categories,
					b = a.names,
					h = this.pos,
					z = l.labels,
					q = a.tickPositions,
					g = h === q[0],
					e = h === q[q.length - 1],
					b = f ? m(f[h],
						b[h], h) : h,
					f = this.label,
					q = q.info,
					c;
				a.isDatetimeAxis && q && (c = l.dateTimeLabelFormats[q.higherRanks[h] || q.unitName]);
				this.isFirst = g;
				this.isLast = e;
				l = a.labelFormatter.call({
					axis: a,
					chart: k,
					isFirst: g,
					isLast: e,
					dateTimeLabelFormat: c,
					value: a.isLog ? D(a.lin2log(b)) : b
				});
				C(f) ? f && f.attr({
					text: l
				}) : (this.labelLength = (this.label = f = C(l) && z.enabled ? k.renderer.text(l, 0, 0, z.useHTML).css(r(z.style)).add(a.labelGroup) : null) && f.getBBox().width, this.rotation = 0)
			},
			getLabelSize: function () {
				return this.label ? this.label.getBBox()[this.axis.horiz ?
					"height" : "width"] : 0
			},
			handleOverflow: function (a) {
				var p = this.axis,
					k = a.x,
					f = p.chart.chartWidth,
					b = p.chart.spacing,
					h = m(p.labelLeft, Math.min(p.pos, b[3])),
					b = m(p.labelRight, Math.max(p.pos + p.len, f - b[1])),
					z = this.label,
					q = this.rotation,
					g = {
						left: 0,
						center: .5,
						right: 1
					}[p.labelAlign],
					e = z.getBBox().width,
					c = p.getSlotWidth(),
					n = c,
					u = 1,
					d, A = {};
				if (q) 0 > q && k - g * e < h ? d = Math.round(k / Math.cos(q * l) - h) : 0 < q && k + g * e > b && (d = Math.round((f - k) / Math.cos(q * l)));
				else if (f = k + (1 - g) * e, k - g * e < h ? n = a.x + n * (1 - g) - h : f > b && (n = b - a.x + n * g, u = -1), n = Math.min(c,
						n), n < c && "center" === p.labelAlign && (a.x += u * (c - n - g * (c - Math.min(e, n)))), e > n || p.autoRotation && (z.styles || {}).width) d = n;
				d && (A.width = d, (p.options.labels.style || {}).textOverflow || (A.textOverflow = "ellipsis"), z.css(A))
			},
			getPosition: function (a, l, k, f) {
				var b = this.axis,
					h = b.chart,
					z = f && h.oldChartHeight || h.chartHeight;
				return {
					x: a ? b.translate(l + k, null, null, f) + b.transB : b.left + b.offset + (b.opposite ? (f && h.oldChartWidth || h.chartWidth) - b.right - b.left : 0),
					y: a ? z - b.bottom + b.offset - (b.opposite ? b.height : 0) : z - b.translate(l + k, null,
						null, f) - b.transB
				}
			},
			getLabelPosition: function (a, m, k, f, b, h, z, q) {
				var g = this.axis,
					e = g.transA,
					c = g.reversed,
					n = g.staggerLines,
					u = g.tickRotCorr || {
						x: 0,
						y: 0
					},
					d = b.y;
				C(d) || (d = 0 === g.side ? k.rotation ? -8 : -k.getBBox().height : 2 === g.side ? u.y + 8 : Math.cos(k.rotation * l) * (u.y - k.getBBox(!1, 0).height / 2));
				a = a + b.x + u.x - (h && f ? h * e * (c ? -1 : 1) : 0);
				m = m + d - (h && !f ? h * e * (c ? 1 : -1) : 0);
				n && (k = z / (q || 1) % n, g.opposite && (k = n - k - 1), m += g.labelOffset / n * k);
				return {
					x: a,
					y: Math.round(m)
				}
			},
			getMarkPath: function (a, l, k, f, b, h) {
				return h.crispLine(["M", a, l, "L", a + (b ?
					0 : -k), l + (b ? k : 0)], f)
			},
			render: function (a, l, k) {
				var f = this.axis,
					b = f.options,
					h = f.chart.renderer,
					z = f.horiz,
					q = this.type,
					g = this.label,
					e = this.pos,
					c = b.labels,
					n = this.gridLine,
					u = q ? q + "Tick" : "tick",
					d = f.tickSize(u),
					A = this.mark,
					y = !A,
					x = c.step,
					J = {},
					E = !0,
					G = f.tickmarkOffset,
					v = this.getPosition(z, e, G, l),
					K = v.x,
					v = v.y,
					N = z && K === f.pos + f.len || !z && v === f.pos ? -1 : 1,
					w = q ? q + "Grid" : "grid",
					I = b[w + "LineWidth"],
					O = b[w + "LineColor"],
					Q = b[w + "LineDashStyle"],
					w = m(b[u + "Width"], !q && f.isXAxis ? 1 : 0),
					u = b[u + "Color"];
				k = m(k, 1);
				this.isActive = !0;
				n || (J.stroke =
					O, J["stroke-width"] = I, Q && (J.dashstyle = Q), q || (J.zIndex = 1), l && (J.opacity = 0), this.gridLine = n = h.path().attr(J).addClass("highcharts-" + (q ? q + "-" : "") + "grid-line").add(f.gridGroup));
				if (!l && n && (e = f.getPlotLinePath(e + G, n.strokeWidth() * N, l, !0))) n[this.isNew ? "attr" : "animate"]({
					d: e,
					opacity: k
				});
				d && (f.opposite && (d[0] = -d[0]), y && (this.mark = A = h.path().addClass("highcharts-" + (q ? q + "-" : "") + "tick").add(f.axisGroup), A.attr({
					stroke: u,
					"stroke-width": w
				})), A[y ? "attr" : "animate"]({
					d: this.getMarkPath(K, v, d[0], A.strokeWidth() *
						N, z, h),
					opacity: k
				}));
				g && H(K) && (g.xy = v = this.getLabelPosition(K, v, g, z, c, G, a, x), this.isFirst && !this.isLast && !m(b.showFirstLabel, 1) || this.isLast && !this.isFirst && !m(b.showLastLabel, 1) ? E = !1 : !z || f.isRadial || c.step || c.rotation || l || 0 === k || this.handleOverflow(v), x && a % x && (E = !1), E && H(v.y) ? (v.opacity = k, g[this.isNew ? "attr" : "animate"](v)) : g.attr("y", -9999), this.isNew = !1)
			},
			destroy: function () {
				F(this, this.axis)
			}
		}
	})(M);
	(function (a) {
		var D = a.addEvent,
			C = a.animObject,
			F = a.arrayMax,
			H = a.arrayMin,
			r = a.AxisPlotLineOrBandExtension,
			m = a.color,
			l = a.correctFloat,
			t = a.defaultOptions,
			p = a.defined,
			k = a.deg2rad,
			f = a.destroyObjectProperties,
			b = a.each,
			h = a.error,
			z = a.extend,
			q = a.fireEvent,
			g = a.format,
			e = a.getMagnitude,
			c = a.grep,
			n = a.inArray,
			u = a.isArray,
			d = a.isNumber,
			A = a.isString,
			y = a.merge,
			x = a.normalizeTickInterval,
			J = a.pick,
			E = a.PlotLineOrBand,
			G = a.removeEvent,
			v = a.splat,
			K = a.syncTimeout,
			N = a.Tick;
		a.Axis = function () {
			this.init.apply(this, arguments)
		};
		a.Axis.prototype = {
			defaultOptions: {
				dateTimeLabelFormats: {
					millisecond: "%H:%M:%S.%L",
					second: "%H:%M:%S",
					minute: "%H:%M",
					hour: "%H:%M",
					day: "%e. %b",
					week: "%e. %b",
					month: "%b '%y",
					year: "%Y"
				},
				endOnTick: !1,
				labels: {
					enabled: !0,
					style: {
						color: "#666666",
						cursor: "default",
						fontSize: "11px"
					},
					x: 0
				},
				minPadding: .01,
				maxPadding: .01,
				minorTickLength: 2,
				minorTickPosition: "outside",
				startOfWeek: 1,
				startOnTick: !1,
				tickLength: 10,
				tickmarkPlacement: "between",
				tickPixelInterval: 100,
				tickPosition: "outside",
				title: {
					align: "middle",
					style: {
						color: "#666666"
					}
				},
				type: "linear",
				minorGridLineColor: "#f2f2f2",
				minorGridLineWidth: 1,
				minorTickColor: "#999999",
				lineColor: "#ccd6eb",
				lineWidth: 1,
				gridLineColor: "#e6e6e6",
				tickColor: "#ccd6eb"
			},
			defaultYAxisOptions: {
				endOnTick: !0,
				tickPixelInterval: 72,
				showLastLabel: !0,
				labels: {
					x: -8
				},
				maxPadding: .05,
				minPadding: .05,
				startOnTick: !0,
				title: {
					rotation: 270,
					text: "Values"
				},
				stackLabels: {
					enabled: !1,
					formatter: function () {
						return a.numberFormat(this.total, -1)
					},
					style: {
						fontSize: "11px",
						fontWeight: "bold",
						color: "#000000",
						textOutline: "1px contrast"
					}
				},
				gridLineWidth: 1,
				lineWidth: 0
			},
			defaultLeftAxisOptions: {
				labels: {
					x: -15
				},
				title: {
					rotation: 270
				}
			},
			defaultRightAxisOptions: {
				labels: {
					x: 15
				},
				title: {
					rotation: 90
				}
			},
			defaultBottomAxisOptions: {
				labels: {
					autoRotation: [-45],
					x: 0
				},
				title: {
					rotation: 0
				}
			},
			defaultTopAxisOptions: {
				labels: {
					autoRotation: [-45],
					x: 0
				},
				title: {
					rotation: 0
				}
			},
			init: function (a, b) {
				var c = b.isX;
				this.chart = a;
				this.horiz = a.inverted ? !c : c;
				this.isXAxis = c;
				this.coll = this.coll || (c ? "xAxis" : "yAxis");
				this.opposite = b.opposite;
				this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
				this.setOptions(b);
				var d = this.options,
					w = d.type;
				this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter;
				this.userOptions = b;
				this.minPixelPadding = 0;
				this.reversed = d.reversed;
				this.visible = !1 !== d.visible;
				this.zoomEnabled = !1 !== d.zoomEnabled;
				this.hasNames = "category" === w || !0 === d.categories;
				this.categories = d.categories || this.hasNames;
				this.names = this.names || [];
				this.isLog = "logarithmic" === w;
				this.isDatetimeAxis = "datetime" === w;
				this.isLinked = p(d.linkedTo);
				this.ticks = {};
				this.labelEdge = [];
				this.minorTicks = {};
				this.plotLinesAndBands = [];
				this.alternateBands = {};
				this.len = 0;
				this.minRange = this.userMinRange = d.minRange || d.maxZoom;
				this.range = d.range;
				this.offset = d.offset || 0;
				this.stacks = {};
				this.oldStacks = {};
				this.stacksTouched = 0;
				this.min = this.max = null;
				this.crosshair = J(d.crosshair, v(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
				var e;
				b = this.options.events; - 1 === n(this, a.axes) && (c ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
				this.series = this.series || [];
				a.inverted && c && void 0 === this.reversed && (this.reversed = !0);
				this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
				for (e in b) D(this, e, b[e]);
				this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
			},
			setOptions: function (a) {
				this.options = y(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], y(t[this.coll], a))
			},
			defaultLabelFormatter: function () {
				var b = this.axis,
					c = this.value,
					d = b.categories,
					e = this.dateTimeLabelFormat,
					n = t.lang,
					v = n.numericSymbols,
					n = n.numericSymbolMagnitude || 1E3,
					h = v && v.length,
					u, f = b.options.labels.format,
					b = b.isLog ? c : b.tickInterval;
				if (f) u = g(f, this);
				else if (d) u = c;
				else if (e) u = a.dateFormat(e, c);
				else if (h && 1E3 <= b)
					for (; h-- && void 0 === u;) d = Math.pow(n, h + 1), b >= d && 0 === 10 * c % d && null !== v[h] && 0 !== c && (u = a.numberFormat(c / d, -1) + v[h]);
				void 0 === u && (u = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
				return u
			},
			getSeriesExtremes: function () {
				var a = this,
					e = a.chart;
				a.hasVisibleSeries = !1;
				a.dataMin = a.dataMax = a.threshold = null;
				a.softThreshold = !a.isXAxis;
				a.buildStacks && a.buildStacks();
				b(a.series, function (b) {
					if (b.visible ||
						!e.options.chart.ignoreHiddenSeries) {
						var w = b.options,
							I = w.threshold,
							g;
						a.hasVisibleSeries = !0;
						a.isLog && 0 >= I && (I = null);
						if (a.isXAxis) w = b.xData, w.length && (b = H(w), d(b) || b instanceof Date || (w = c(w, function (a) {
							return d(a)
						}), b = H(w)), a.dataMin = Math.min(J(a.dataMin, w[0]), b), a.dataMax = Math.max(J(a.dataMax, w[0]), F(w)));
						else if (b.getExtremes(), g = b.dataMax, b = b.dataMin, p(b) && p(g) && (a.dataMin = Math.min(J(a.dataMin, b), b), a.dataMax = Math.max(J(a.dataMax, g), g)), p(I) && (a.threshold = I), !w.softThreshold || a.isLog) a.softThreshold = !1
					}
				})
			},
			translate: function (a, b, c, e, g, n) {
				var w = this.linkedParent || this,
					I = 1,
					v = 0,
					h = e ? w.oldTransA : w.transA;
				e = e ? w.oldMin : w.min;
				var u = w.minPixelPadding;
				g = (w.isOrdinal || w.isBroken || w.isLog && g) && w.lin2val;
				h || (h = w.transA);
				c && (I *= -1, v = w.len);
				w.reversed && (I *= -1, v -= I * (w.sector || w.len));
				b ? (a = (a * I + v - u) / h + e, g && (a = w.lin2val(a))) : (g && (a = w.val2lin(a)), a = I * (a - e) * h + v + I * u + (d(n) ? h * n : 0));
				return a
			},
			toPixels: function (a, b) {
				return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
			},
			toValue: function (a, b) {
				return this.translate(a -
					(b ? 0 : this.pos), !0, !this.horiz, null, !0)
			},
			getPlotLinePath: function (a, b, c, e, g) {
				var w = this.chart,
					I = this.left,
					n = this.top,
					v, h, u = c && w.oldChartHeight || w.chartHeight,
					B = c && w.oldChartWidth || w.chartWidth,
					f;
				v = this.transB;
				var q = function (a, b, c) {
					if (a < b || a > c) e ? a = Math.min(Math.max(b, a), c) : f = !0;
					return a
				};
				g = J(g, this.translate(a, null, null, c));
				a = c = Math.round(g + v);
				v = h = Math.round(u - g - v);
				d(g) ? this.horiz ? (v = n, h = u - this.bottom, a = c = q(a, I, I + this.width)) : (a = I, c = B - this.right, v = h = q(v, n, n + this.height)) : f = !0;
				return f && !e ? null : w.renderer.crispLine(["M",
					a, v, "L", c, h
				], b || 1)
			},
			getLinearTickPositions: function (a, b, c) {
				var e, w = l(Math.floor(b / a) * a),
					g = l(Math.ceil(c / a) * a),
					I = [];
				if (b === c && d(b)) return [b];
				for (b = w; b <= g;) {
					I.push(b);
					b = l(b + a);
					if (b === e) break;
					e = b
				}
				return I
			},
			getMinorTickPositions: function () {
				var a = this.options,
					b = this.tickPositions,
					c = this.minorTickInterval,
					d = [],
					e, g = this.pointRangePadding || 0;
				e = this.min - g;
				var g = this.max + g,
					n = g - e;
				if (n && n / c < this.len / 3)
					if (this.isLog)
						for (g = b.length, e = 1; e < g; e++) d = d.concat(this.getLogTickPositions(c, b[e - 1], b[e], !0));
					else if (this.isDatetimeAxis &&
					"auto" === a.minorTickInterval) d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), e, g, a.startOfWeek));
				else
					for (b = e + (b[0] - e) % c; b <= g && b !== d[0]; b += c) d.push(b);
				0 !== d.length && this.trimTicks(d, a.startOnTick, a.endOnTick);
				return d
			},
			adjustForMinRange: function () {
				var a = this.options,
					c = this.min,
					d = this.max,
					e, g = this.dataMax - this.dataMin >= this.minRange,
					n, v, h, u, f, q;
				this.isXAxis && void 0 === this.minRange && !this.isLog && (p(a.min) || p(a.max) ? this.minRange = null : (b(this.series, function (a) {
					u = a.xData;
					for (v = f = a.xIncrement ?
						1 : u.length - 1; 0 < v; v--)
						if (h = u[v] - u[v - 1], void 0 === n || h < n) n = h
				}), this.minRange = Math.min(5 * n, this.dataMax - this.dataMin)));
				d - c < this.minRange && (q = this.minRange, e = (q - d + c) / 2, e = [c - e, J(a.min, c - e)], g && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), c = F(e), d = [c + q, J(a.max, c + q)], g && (d[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), d = H(d), d - c < q && (e[0] = d - q, e[1] = J(a.min, d - q), c = F(e)));
				this.min = c;
				this.max = d
			},
			getClosest: function () {
				var a;
				this.categories ? a = 1 : b(this.series, function (b) {
					var c = b.closestPointRange,
						d = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
					!b.noSharedTooltip && p(c) && d && (a = p(a) ? Math.min(a, c) : c)
				});
				return a
			},
			nameToX: function (a) {
				var b = u(this.categories),
					c = b ? this.categories : this.names,
					d = a.options.x,
					e;
				a.series.requireSorting = !1;
				p(d) || (d = !1 === this.options.uniqueNames ? a.series.autoIncrement() : n(a.name, c)); - 1 === d ? b || (e = c.length) : e = d;
				this.names[e] = a.name;
				return e
			},
			updateNames: function () {
				var a = this;
				0 < this.names.length && (this.names.length = 0, this.minRange = void 0, b(this.series || [], function (c) {
					c.xIncrement =
						null;
					if (!c.points || c.isDirtyData) c.processData(), c.generatePoints();
					b(c.points, function (b, d) {
						var e;
						b.options && void 0 === b.options.x && (e = a.nameToX(b), e !== b.x && (b.x = e, c.xData[d] = e))
					})
				}))
			},
			setAxisTranslation: function (a) {
				var c = this,
					d = c.max - c.min,
					e = c.axisPointRange || 0,
					w, g = 0,
					n = 0,
					v = c.linkedParent,
					h = !!c.categories,
					u = c.transA,
					f = c.isXAxis;
				if (f || h || e) w = c.getClosest(), v ? (g = v.minPointOffset, n = v.pointRangePadding) : b(c.series, function (a) {
					var b = h ? 1 : f ? J(a.options.pointRange, w, 0) : c.axisPointRange || 0;
					a = a.options.pointPlacement;
					e = Math.max(e, b);
					c.single || (g = Math.max(g, A(a) ? 0 : b / 2), n = Math.max(n, "on" === a ? 0 : b))
				}), v = c.ordinalSlope && w ? c.ordinalSlope / w : 1, c.minPointOffset = g *= v, c.pointRangePadding = n *= v, c.pointRange = Math.min(e, d), f && (c.closestPointRange = w);
				a && (c.oldTransA = u);
				c.translationSlope = c.transA = u = c.len / (d + n || 1);
				c.transB = c.horiz ? c.left : c.bottom;
				c.minPixelPadding = u * g
			},
			minFromRange: function () {
				return this.max - this.range
			},
			setTickInterval: function (a) {
				var c = this,
					w = c.chart,
					g = c.options,
					n = c.isLog,
					v = c.log2lin,
					u = c.isDatetimeAxis,
					f = c.isXAxis,
					G = c.isLinked,
					y = g.maxPadding,
					K = g.minPadding,
					A = g.tickInterval,
					z = g.tickPixelInterval,
					k = c.categories,
					E = c.threshold,
					m = c.softThreshold,
					N, t, r, C;
				u || k || G || this.getTickAmount();
				r = J(c.userMin, g.min);
				C = J(c.userMax, g.max);
				G ? (c.linkedParent = w[c.coll][g.linkedTo], w = c.linkedParent.getExtremes(), c.min = J(w.min, w.dataMin), c.max = J(w.max, w.dataMax), g.type !== c.linkedParent.options.type && h(11, 1)) : (!m && p(E) && (c.dataMin >= E ? (N = E, K = 0) : c.dataMax <= E && (t = E, y = 0)), c.min = J(r, N, c.dataMin), c.max = J(C, t, c.dataMax));
				n && (!a && 0 >= Math.min(c.min,
					J(c.dataMin, c.min)) && h(10, 1), c.min = l(v(c.min), 15), c.max = l(v(c.max), 15));
				c.range && p(c.max) && (c.userMin = c.min = r = Math.max(c.min, c.minFromRange()), c.userMax = C = c.max, c.range = null);
				q(c, "foundExtremes");
				c.beforePadding && c.beforePadding();
				c.adjustForMinRange();
				!(k || c.axisPointRange || c.usePercentage || G) && p(c.min) && p(c.max) && (v = c.max - c.min) && (!p(r) && K && (c.min -= v * K), !p(C) && y && (c.max += v * y));
				d(g.floor) ? c.min = Math.max(c.min, g.floor) : d(g.softMin) && (c.min = Math.min(c.min, g.softMin));
				d(g.ceiling) ? c.max = Math.min(c.max,
					g.ceiling) : d(g.softMax) && (c.max = Math.max(c.max, g.softMax));
				m && p(c.dataMin) && (E = E || 0, !p(r) && c.min < E && c.dataMin >= E ? c.min = E : !p(C) && c.max > E && c.dataMax <= E && (c.max = E));
				c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : G && !A && z === c.linkedParent.options.tickPixelInterval ? A = c.linkedParent.tickInterval : J(A, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, k ? 1 : (c.max - c.min) * z / Math.max(c.len, z));
				f && !a && b(c.series, function (a) {
					a.processData(c.min !== c.oldMin || c.max !== c.oldMax)
				});
				c.setAxisTranslation(!0);
				c.beforeSetTickPositions && c.beforeSetTickPositions();
				c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
				c.pointRange && !A && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
				a = J(g.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
				!A && c.tickInterval < a && (c.tickInterval = a);
				u || n || A || (c.tickInterval = x(c.tickInterval, null, e(c.tickInterval), J(g.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount));
				this.tickAmount || (c.tickInterval =
					c.unsquish());
				this.setTickPositions()
			},
			setTickPositions: function () {
				var a = this.options,
					b, c = a.tickPositions,
					d = a.tickPositioner,
					e = a.startOnTick,
					g = a.endOnTick,
					n;
				this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
				this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
				this.tickPositions = b = c && c.slice();
				!b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units),
					this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = b = d);
				this.isLinked || (this.trimTicks(b, e, g), this.min === this.max && p(this.min) && !this.tickAmount && (n = !0, this.min -= .5, this.max += .5), this.single = n, c || d || this.adjustTickAmount())
			},
			trimTicks: function (a, b, c) {
				var d = a[0],
					e = a[a.length - 1],
					g = this.minPointOffset || 0;
				if (b) this.min = d;
				else
					for (; this.min - g > a[0];) a.shift();
				if (c) this.max = e;
				else
					for (; this.max + g < a[a.length - 1];) a.pop();
				0 === a.length && p(d) && a.push((e + d) / 2)
			},
			alignToOthers: function () {
				var a = {},
					c, d = this.options;
				!1 !== this.chart.options.chart.alignTicks && !1 !== d.alignTicks && b(this.chart[this.coll], function (b) {
					var d = b.options,
						d = [b.horiz ? d.left : d.top, d.width, d.height, d.pane].join();
					b.series.length && (a[d] ? c = !0 : a[d] = 1)
				});
				return c
			},
			getTickAmount: function () {
				var a =
					this.options,
					b = a.tickAmount,
					c = a.tickPixelInterval;
				!p(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
				!b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
				4 > b && (this.finalTickAmt = b, b = 5);
				this.tickAmount = b
			},
			adjustTickAmount: function () {
				var a = this.tickInterval,
					b = this.tickPositions,
					c = this.tickAmount,
					d = this.finalTickAmt,
					e = b && b.length;
				if (e < c) {
					for (; b.length < c;) b.push(l(b[b.length - 1] + a));
					this.transA *= (e - 1) / (c - 1);
					this.max = b[b.length - 1]
				} else e > c && (this.tickInterval *=
					2, this.setTickPositions());
				if (p(d)) {
					for (a = c = b.length; a--;)(3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < c - 1) && b.splice(a, 1);
					this.finalTickAmt = void 0
				}
			},
			setScale: function () {
				var a, c;
				this.oldMin = this.min;
				this.oldMax = this.max;
				this.oldAxisLength = this.len;
				this.setAxisSize();
				c = this.len !== this.oldAxisLength;
				b(this.series, function (b) {
					if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
				});
				c || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks &&
					this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = c || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
			},
			setExtremes: function (a, c, d, e, g) {
				var w = this,
					n = w.chart;
				d = J(d, !0);
				b(w.series, function (a) {
					delete a.kdTree
				});
				g = z(g, {
					min: a,
					max: c
				});
				q(w, "setExtremes", g, function () {
					w.userMin = a;
					w.userMax = c;
					w.eventArgs = g;
					d && n.redraw(e)
				})
			},
			zoom: function (a, b) {
				var c = this.dataMin,
					d = this.dataMax,
					e = this.options,
					g = Math.min(c, J(e.min, c)),
					e = Math.max(d, J(e.max, d));
				if (a !== this.min || b !== this.max) this.allowZoomOutside || (p(c) && (a < g && (a = g), a > e && (a = e)), p(d) && (b < g && (b = g), b > e && (b = e))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {
					trigger: "zoom"
				});
				return !0
			},
			setAxisSize: function () {
				var a = this.chart,
					b = this.options,
					c = b.offsetLeft || 0,
					d = this.horiz,
					e = J(b.width, a.plotWidth - c + (b.offsetRight || 0)),
					g = J(b.height, a.plotHeight),
					n = J(b.top, a.plotTop),
					b = J(b.left, a.plotLeft + c),
					c = /%$/;
				c.test(g) && (g = Math.round(parseFloat(g) / 100 * a.plotHeight));
				c.test(n) && (n = Math.round(parseFloat(n) / 100 * a.plotHeight + a.plotTop));
				this.left = b;
				this.top = n;
				this.width = e;
				this.height = g;
				this.bottom = a.chartHeight - g - n;
				this.right = a.chartWidth - e - b;
				this.len = Math.max(d ? e : g, 0);
				this.pos = d ? b : n
			},
			getExtremes: function () {
				var a = this.isLog,
					b = this.lin2log;
				return {
					min: a ? l(b(this.min)) : this.min,
					max: a ? l(b(this.max)) : this.max,
					dataMin: this.dataMin,
					dataMax: this.dataMax,
					userMin: this.userMin,
					userMax: this.userMax
				}
			},
			getThreshold: function (a) {
				var b =
					this.isLog,
					c = this.lin2log,
					d = b ? c(this.min) : this.min,
					b = b ? c(this.max) : this.max;
				null === a ? a = d : d > a ? a = d : b < a && (a = b);
				return this.translate(a, 0, 1, 0, 1)
			},
			autoLabelAlign: function (a) {
				a = (J(a, 0) - 90 * this.side + 720) % 360;
				return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
			},
			tickSize: function (a) {
				var b = this.options,
					c = b[a + "Length"],
					d = J(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
				if (d && c) return "inside" === b[a + "Position"] && (c = -c), [c, d]
			},
			labelMetrics: function () {
				return this.chart.renderer.fontMetrics(this.options.labels.style &&
					this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label)
			},
			unsquish: function () {
				var a = this.options.labels,
					c = this.horiz,
					d = this.tickInterval,
					e = d,
					g = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / d),
					n, v = a.rotation,
					h = this.labelMetrics(),
					u, f = Number.MAX_VALUE,
					q, G = function (a) {
						a /= g || 1;
						a = 1 < a ? Math.ceil(a) : 1;
						return a * d
					};
				c ? (q = !a.staggerLines && !a.step && (p(v) ? [v] : g < J(a.autoRotationLimit, 80) && a.autoRotation)) && b(q, function (a) {
					var b;
					if (a === v || a && -90 <= a && 90 >= a) u = G(Math.abs(h.h / Math.sin(k * a))), b = u +
						Math.abs(a / 360), b < f && (f = b, n = a, e = u)
				}) : a.step || (e = G(h.h));
				this.autoRotation = q;
				this.labelRotation = J(n, v);
				return e
			},
			getSlotWidth: function () {
				var a = this.chart,
					b = this.horiz,
					c = this.options.labels,
					d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
					e = a.margin[3];
				return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * a.plotWidth / d || !b && (e && e - a.spacing[3] || .33 * a.chartWidth)
			},
			renderUnsquish: function () {
				var a = this.chart,
					c = a.renderer,
					d = this.tickPositions,
					e = this.ticks,
					g = this.options.labels,
					n = this.horiz,
					v = this.getSlotWidth(),
					h = Math.max(1, Math.round(v - 2 * (g.padding || 5))),
					u = {},
					f = this.labelMetrics(),
					q = g.style && g.style.textOverflow,
					G, K = 0,
					x, J;
				A(g.rotation) || (u.rotation = g.rotation || 0);
				b(d, function (a) {
					(a = e[a]) && a.labelLength > K && (K = a.labelLength)
				});
				this.maxLabelLength = K;
				if (this.autoRotation) K > h && K > f.h ? u.rotation = this.labelRotation : this.labelRotation = 0;
				else if (v && (G = {
						width: h + "px"
					}, !q))
					for (G.textOverflow = "clip", x = d.length; !n && x--;)
						if (J = d[x], h = e[J].label) h.styles && "ellipsis" === h.styles.textOverflow ? h.css({
								textOverflow: "clip"
							}) :
							e[J].labelLength > v && h.css({
								width: v + "px"
							}), h.getBBox().height > this.len / d.length - (f.h - f.f) && (h.specCss = {
								textOverflow: "ellipsis"
							});
				u.rotation && (G = {
					width: (K > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
				}, q || (G.textOverflow = "ellipsis"));
				if (this.labelAlign = g.align || this.autoLabelAlign(this.labelRotation)) u.align = this.labelAlign;
				b(d, function (a) {
					var b = (a = e[a]) && a.label;
					b && (b.attr(u), G && b.css(y(G, b.specCss)), delete b.specCss, a.rotation = u.rotation)
				});
				this.tickRotCorr = c.rotCorr(f.b, this.labelRotation ||
					0, 0 !== this.side)
			},
			hasData: function () {
				return this.hasVisibleSeries || p(this.min) && p(this.max) && !!this.tickPositions
			},
			getOffset: function () {
				var a = this,
					c = a.chart,
					d = c.renderer,
					e = a.options,
					g = a.tickPositions,
					n = a.ticks,
					v = a.horiz,
					h = a.side,
					u = c.inverted ? [1, 0, 3, 2][h] : h,
					f, q, G = 0,
					y, K = 0,
					A = e.title,
					x = e.labels,
					z = 0,
					k = a.opposite,
					l = c.axisOffset,
					c = c.clipOffset,
					E = [-1, 1, 1, -1][h],
					m, t = e.className,
					r = a.axisParent,
					C = this.tickSize("tick");
				f = a.hasData();
				a.showAxis = q = f || J(e.showEmpty, !0);
				a.staggerLines = a.horiz && x.staggerLines;
				a.axisGroup ||
					(a.gridGroup = d.g("grid").attr({
						zIndex: e.gridZIndex || 1
					}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (t || "")).add(r), a.axisGroup = d.g("axis").attr({
						zIndex: e.zIndex || 2
					}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (t || "")).add(r), a.labelGroup = d.g("axis-labels").attr({
						zIndex: x.zIndex || 7
					}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (t || "")).add(r));
				if (f || a.isLinked) b(g, function (b) {
					n[b] ? n[b].addLabel() : n[b] = new N(a, b)
				}), a.renderUnsquish(), !1 === x.reserveSpace || 0 !== h && 2 !== h && {
					1: "left",
					3: "right"
				}[h] !== a.labelAlign && "center" !== a.labelAlign || b(g, function (a) {
					z = Math.max(n[a].getLabelSize(), z)
				}), a.staggerLines && (z *= a.staggerLines, a.labelOffset = z * (a.opposite ? -1 : 1));
				else
					for (m in n) n[m].destroy(), delete n[m];
				A && A.text && !1 !== A.enabled && (a.axisTitle || ((m = A.textAlign) || (m = (v ? {
						low: "left",
						middle: "center",
						high: "right"
					} : {
						low: k ? "right" : "left",
						middle: "center",
						high: k ? "left" : "right"
					})[A.align]), a.axisTitle = d.text(A.text, 0, 0, A.useHTML).attr({
						zIndex: 7,
						rotation: A.rotation || 0,
						align: m
					}).addClass("highcharts-axis-title").css(A.style).add(a.axisGroup),
					a.axisTitle.isNew = !0), q && (G = a.axisTitle.getBBox()[v ? "height" : "width"], y = A.offset, K = p(y) ? 0 : J(A.margin, v ? 5 : 10)), a.axisTitle[q ? "show" : "hide"](!0));
				a.renderLine();
				a.offset = E * J(e.offset, l[h]);
				a.tickRotCorr = a.tickRotCorr || {
					x: 0,
					y: 0
				};
				d = 0 === h ? -a.labelMetrics().h : 2 === h ? a.tickRotCorr.y : 0;
				K = Math.abs(z) + K;
				z && (K = K - d + E * (v ? J(x.y, a.tickRotCorr.y + 8 * E) : x.x));
				a.axisTitleMargin = J(y, K);
				l[h] = Math.max(l[h], a.axisTitleMargin + G + E * a.offset, K, f && g.length && C ? C[0] : 0);
				e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
				c[u] =
					Math.max(c[u], e)
			},
			getLinePath: function (a) {
				var b = this.chart,
					c = this.opposite,
					d = this.offset,
					e = this.horiz,
					g = this.left + (c ? this.width : 0) + d,
					d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
				c && (a *= -1);
				return b.renderer.crispLine(["M", e ? this.left : g, e ? d : this.top, "L", e ? b.chartWidth - this.right : g, e ? d : b.chartHeight - this.bottom], a)
			},
			renderLine: function () {
				this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
					stroke: this.options.lineColor,
					"stroke-width": this.options.lineWidth,
					zIndex: 7
				}))
			},
			getTitlePosition: function () {
				var a = this.horiz,
					b = this.left,
					c = this.top,
					d = this.len,
					e = this.options.title,
					g = a ? b : c,
					n = this.opposite,
					v = this.offset,
					h = e.x || 0,
					u = e.y || 0,
					f = this.chart.renderer.fontMetrics(e.style && e.style.fontSize, this.axisTitle).f,
					d = {
						low: g + (a ? 0 : d),
						middle: g + d / 2,
						high: g + (a ? d : 0)
					}[e.align],
					b = (a ? c + this.height : b) + (a ? 1 : -1) * (n ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? f : 0);
				return {
					x: a ? d + h : b + (n ? this.width : 0) + v + h,
					y: a ? b + u - (n ? this.height : 0) + v : d + u
				}
			},
			render: function () {
				var a =
					this,
					c = a.chart,
					e = c.renderer,
					g = a.options,
					n = a.isLog,
					v = a.lin2log,
					h = a.isLinked,
					u = a.tickPositions,
					f = a.axisTitle,
					q = a.ticks,
					G = a.minorTicks,
					y = a.alternateBands,
					A = g.stackLabels,
					x = g.alternateGridColor,
					z = a.tickmarkOffset,
					J = a.axisLine,
					k = c.hasRendered && d(a.oldMin),
					l = a.showAxis,
					m = C(e.globalAnimation),
					p, t;
				a.labelEdge.length = 0;
				a.overlap = !1;
				b([q, G, y], function (a) {
					for (var b in a) a[b].isActive = !1
				});
				if (a.hasData() || h) a.minorTickInterval && !a.categories && b(a.getMinorTickPositions(), function (b) {
						G[b] || (G[b] = new N(a, b, "minor"));
						k && G[b].isNew && G[b].render(null, !0);
						G[b].render(null, !1, 1)
					}), u.length && (b(u, function (b, c) {
						if (!h || b >= a.min && b <= a.max) q[b] || (q[b] = new N(a, b)), k && q[b].isNew && q[b].render(c, !0, .1), q[b].render(c)
					}), z && (0 === a.min || a.single) && (q[-1] || (q[-1] = new N(a, -1, null, !0)), q[-1].render(-1))), x && b(u, function (b, d) {
						t = void 0 !== u[d + 1] ? u[d + 1] + z : a.max - z;
						0 === d % 2 && b < a.max && t <= a.max + (c.polar ? -z : z) && (y[b] || (y[b] = new E(a)), p = b + z, y[b].options = {
							from: n ? v(p) : p,
							to: n ? v(t) : t,
							color: x
						}, y[b].render(), y[b].isActive = !0)
					}), a._addedPlotLB ||
					(b((g.plotLines || []).concat(g.plotBands || []), function (b) {
						a.addPlotBandOrLine(b)
					}), a._addedPlotLB = !0);
				b([q, G, y], function (a) {
					var b, d, e = [],
						g = m.duration;
					for (b in a) a[b].isActive || (a[b].render(b, !1, 0), a[b].isActive = !1, e.push(b));
					K(function () {
						for (d = e.length; d--;) a[e[d]] && !a[e[d]].isActive && (a[e[d]].destroy(), delete a[e[d]])
					}, a !== y && c.hasRendered && g ? g : 0)
				});
				J && (J[J.isPlaced ? "animate" : "attr"]({
					d: this.getLinePath(J.strokeWidth())
				}), J.isPlaced = !0, J[l ? "show" : "hide"](!0));
				f && l && (f[f.isNew ? "attr" : "animate"](a.getTitlePosition()),
					f.isNew = !1);
				A && A.enabled && a.renderStackTotals();
				a.isDirty = !1
			},
			redraw: function () {
				this.visible && (this.render(), b(this.plotLinesAndBands, function (a) {
					a.render()
				}));
				b(this.series, function (a) {
					a.isDirty = !0
				})
			},
			keepProps: "extKey hcEvents names series userMax userMin".split(" "),
			destroy: function (a) {
				var c = this,
					d = c.stacks,
					e, g = c.plotLinesAndBands,
					v;
				a || G(c);
				for (e in d) f(d[e]), d[e] = null;
				b([c.ticks, c.minorTicks, c.alternateBands], function (a) {
					f(a)
				});
				if (g)
					for (a = g.length; a--;) g[a].destroy();
				b("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
					function (a) {
						c[a] && (c[a] = c[a].destroy())
					});
				for (v in c) c.hasOwnProperty(v) && -1 === n(v, c.keepProps) && delete c[v]
			},
			drawCrosshair: function (a, b) {
				var c, d = this.crosshair,
					e = J(d.snap, !0),
					g, n = this.cross;
				a || (a = this.cross && this.cross.e);
				this.crosshair && !1 !== (p(b) || !e) ? (e ? p(b) && (g = this.isXAxis ? b.plotX : this.len - b.plotY) : g = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), p(g) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : J(b.stackY, b.y)), null, null, null, g) || null), p(c) ? (b = this.categories && !this.isRadial,
					n || (this.cross = n = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + d.className).attr({
						zIndex: J(d.zIndex, 2)
					}).add(), n.attr({
						stroke: d.color || (b ? m("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
						"stroke-width": J(d.width, 1)
					}), d.dashStyle && n.attr({
						dashstyle: d.dashStyle
					})), n.show().attr({
						d: c
					}), b && !d.width && n.attr({
						"stroke-width": this.transA
					}), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
			},
			hideCrosshair: function () {
				this.cross && this.cross.hide()
			}
		};
		z(a.Axis.prototype, r)
	})(M);
	(function (a) {
		var D = a.Axis,
			C = a.Date,
			F = a.dateFormat,
			H = a.defaultOptions,
			r = a.defined,
			m = a.each,
			l = a.extend,
			t = a.getMagnitude,
			p = a.getTZOffset,
			k = a.normalizeTickInterval,
			f = a.pick,
			b = a.timeUnits;
		D.prototype.getTimeTicks = function (a, z, q, g) {
			var e = [],
				c = {},
				n = H.global.useUTC,
				h, d = new C(z - p(z)),
				A = C.hcMakeTime,
				y = a.unitRange,
				x = a.count,
				J;
			if (r(z)) {
				d[C.hcSetMilliseconds](y >= b.second ? 0 : x * Math.floor(d.getMilliseconds() / x));
				if (y >= b.second) d[C.hcSetSeconds](y >= b.minute ? 0 : x * Math.floor(d.getSeconds() /
					x));
				if (y >= b.minute) d[C.hcSetMinutes](y >= b.hour ? 0 : x * Math.floor(d[C.hcGetMinutes]() / x));
				if (y >= b.hour) d[C.hcSetHours](y >= b.day ? 0 : x * Math.floor(d[C.hcGetHours]() / x));
				if (y >= b.day) d[C.hcSetDate](y >= b.month ? 1 : x * Math.floor(d[C.hcGetDate]() / x));
				y >= b.month && (d[C.hcSetMonth](y >= b.year ? 0 : x * Math.floor(d[C.hcGetMonth]() / x)), h = d[C.hcGetFullYear]());
				if (y >= b.year) d[C.hcSetFullYear](h - h % x);
				if (y === b.week) d[C.hcSetDate](d[C.hcGetDate]() - d[C.hcGetDay]() + f(g, 1));
				h = d[C.hcGetFullYear]();
				g = d[C.hcGetMonth]();
				var k = d[C.hcGetDate](),
					G = d[C.hcGetHours]();
				if (C.hcTimezoneOffset || C.hcGetTimezoneOffset) J = (!n || !!C.hcGetTimezoneOffset) && (q - z > 4 * b.month || p(z) !== p(q)), d = d.getTime(), d = new C(d + p(d));
				n = d.getTime();
				for (z = 1; n < q;) e.push(n), n = y === b.year ? A(h + z * x, 0) : y === b.month ? A(h, g + z * x) : !J || y !== b.day && y !== b.week ? J && y === b.hour ? A(h, g, k, G + z * x) : n + y * x : A(h, g, k + z * x * (y === b.day ? 1 : 7)), z++;
				e.push(n);
				y <= b.hour && m(e, function (a) {
					"000000000" === F("%H%M%S%L", a) && (c[a] = "day")
				})
			}
			e.info = l(a, {
				higherRanks: c,
				totalRange: y * x
			});
			return e
		};
		D.prototype.normalizeTimeTickInterval =
			function (a, f) {
				var h = f || [
					["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
					["second", [1, 2, 5, 10, 15, 30]],
					["minute", [1, 2, 5, 10, 15, 30]],
					["hour", [1, 2, 3, 4, 6, 8, 12]],
					["day", [1, 2]],
					["week", [1, 2]],
					["month", [1, 2, 3, 4, 6]],
					["year", null]
				];
				f = h[h.length - 1];
				var g = b[f[0]],
					e = f[1],
					c;
				for (c = 0; c < h.length && !(f = h[c], g = b[f[0]], e = f[1], h[c + 1] && a <= (g * e[e.length - 1] + b[h[c + 1][0]]) / 2); c++);
				g === b.year && a < 5 * g && (e = [1, 2, 5]);
				a = k(a / g, e, "year" === f[0] ? Math.max(t(a / g), 1) : 1);
				return {
					unitRange: g,
					count: a,
					unitName: f[0]
				}
			}
	})(M);
	(function (a) {
		var D = a.Axis,
			C = a.getMagnitude,
			F = a.map,
			H = a.normalizeTickInterval,
			r = a.pick;
		D.prototype.getLogTickPositions = function (a, l, t, p) {
			var k = this.options,
				f = this.len,
				b = this.lin2log,
				h = this.log2lin,
				z = [];
			p || (this._minorAutoInterval = null);
			if (.5 <= a) a = Math.round(a), z = this.getLinearTickPositions(a, l, t);
			else if (.08 <= a)
				for (var f = Math.floor(l), q, g, e, c, n, k = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < t + 1 && !n; f++)
					for (g = k.length, q = 0; q < g && !n; q++) e = h(b(f) * k[q]), e > l && (!p || c <= t) && void 0 !== c && z.push(c), c > t && (n = !0), c = e;
			else l = b(l), t =
				b(t), a = k[p ? "minorTickInterval" : "tickInterval"], a = r("auto" === a ? null : a, this._minorAutoInterval, k.tickPixelInterval / (p ? 5 : 1) * (t - l) / ((p ? f / this.tickPositions.length : f) || 1)), a = H(a, null, C(a)), z = F(this.getLinearTickPositions(a, l, t), h), p || (this._minorAutoInterval = a / 5);
			p || (this.tickInterval = a);
			return z
		};
		D.prototype.log2lin = function (a) {
			return Math.log(a) / Math.LN10
		};
		D.prototype.lin2log = function (a) {
			return Math.pow(10, a)
		}
	})(M);
	(function (a) {
		var D = a.dateFormat,
			C = a.each,
			F = a.extend,
			H = a.format,
			r = a.isNumber,
			m = a.map,
			l =
			a.merge,
			t = a.pick,
			p = a.splat,
			k = a.syncTimeout,
			f = a.timeUnits;
		a.Tooltip = function () {
			this.init.apply(this, arguments)
		};
		a.Tooltip.prototype = {
			init: function (a, h) {
				this.chart = a;
				this.options = h;
				this.crosshairs = [];
				this.now = {
					x: 0,
					y: 0
				};
				this.isHidden = !0;
				this.split = h.split && !a.inverted;
				this.shared = h.shared || this.split
			},
			cleanSplit: function (a) {
				C(this.chart.series, function (b) {
					var h = b && b.tt;
					h && (!h.isActive || a ? b.tt = h.destroy() : h.isActive = !1)
				})
			},
			getLabel: function () {
				var a = this.chart.renderer,
					h = this.options;
				this.label || (this.split ?
					this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, h.shape || "callout", null, null, h.useHTML, null, "tooltip").attr({
						padding: h.padding,
						r: h.borderRadius
					}), this.label.attr({
						fill: h.backgroundColor,
						"stroke-width": h.borderWidth
					}).css(h.style).shadow(h.shadow)), this.label.attr({
						zIndex: 8
					}).add());
				return this.label
			},
			update: function (a) {
				this.destroy();
				this.init(this.chart, l(!0, this.options, a))
			},
			destroy: function () {
				this.label && (this.label = this.label.destroy());
				this.split && this.tt && (this.cleanSplit(this.chart, !0),
					this.tt = this.tt.destroy());
				clearTimeout(this.hideTimer);
				clearTimeout(this.tooltipTimeout)
			},
			move: function (a, h, f, q) {
				var b = this,
					e = b.now,
					c = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(a - e.x) || 1 < Math.abs(h - e.y)),
					n = b.followPointer || 1 < b.len;
				F(e, {
					x: c ? (2 * e.x + a) / 3 : a,
					y: c ? (e.y + h) / 2 : h,
					anchorX: n ? void 0 : c ? (2 * e.anchorX + f) / 3 : f,
					anchorY: n ? void 0 : c ? (e.anchorY + q) / 2 : q
				});
				b.getLabel().attr(e);
				c && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
					b && b.move(a, h, f, q)
				}, 32))
			},
			hide: function (a) {
				var b =
					this;
				clearTimeout(this.hideTimer);
				a = t(a, this.options.hideDelay, 500);
				this.isHidden || (this.hideTimer = k(function () {
					b.getLabel()[a ? "fadeOut" : "hide"]();
					b.isHidden = !0
				}, a))
			},
			getAnchor: function (a, h) {
				var b, f = this.chart,
					g = f.inverted,
					e = f.plotTop,
					c = f.plotLeft,
					n = 0,
					u = 0,
					d, A;
				a = p(a);
				b = a[0].tooltipPos;
				this.followPointer && h && (void 0 === h.chartX && (h = f.pointer.normalize(h)), b = [h.chartX - f.plotLeft, h.chartY - e]);
				b || (C(a, function (a) {
					d = a.series.yAxis;
					A = a.series.xAxis;
					n += a.plotX + (!g && A ? A.left - c : 0);
					u += (a.plotLow ? (a.plotLow + a.plotHigh) /
						2 : a.plotY) + (!g && d ? d.top - e : 0)
				}), n /= a.length, u /= a.length, b = [g ? f.plotWidth - u : n, this.shared && !g && 1 < a.length && h ? h.chartY - e : g ? f.plotHeight - n : u]);
				return m(b, Math.round)
			},
			getPosition: function (a, h, f) {
				var b = this.chart,
					g = this.distance,
					e = {},
					c = f.h || 0,
					n, u = ["y", b.chartHeight, h, f.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight],
					d = ["x", b.chartWidth, a, f.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth],
					A = !this.followPointer && t(f.ttBelow, !b.inverted === !!f.negative),
					y = function (a, b, d, n, h, f) {
						var v = d < n - g,
							u = n + g + d < b,
							G =
							n - g - d;
						n += g;
						if (A && u) e[a] = n;
						else if (!A && v) e[a] = G;
						else if (v) e[a] = Math.min(f - d, 0 > G - c ? G : G - c);
						else if (u) e[a] = Math.max(h, n + c + d > b ? n : n + c);
						else return !1
					},
					x = function (a, b, c, d) {
						var n;
						d < g || d > b - g ? n = !1 : e[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2;
						return n
					},
					J = function (a) {
						var b = u;
						u = d;
						d = b;
						n = a
					},
					k = function () {
						!1 !== y.apply(0, u) ? !1 !== x.apply(0, d) || n || (J(!0), k()) : n ? e.x = e.y = 0 : (J(!0), k())
					};
				(b.inverted || 1 < this.len) && J();
				k();
				return e
			},
			defaultFormatter: function (a) {
				var b = this.points || p(this),
					f;
				f = [a.tooltipFooterHeaderFormatter(b[0])];
				f = f.concat(a.bodyFormatter(b));
				f.push(a.tooltipFooterHeaderFormatter(b[0], !0));
				return f
			},
			refresh: function (a, h) {
				var b = this.chart,
					f, g = this.options,
					e, c, n = {},
					u = [];
				f = g.formatter || this.defaultFormatter;
				var n = b.hoverPoints,
					d = this.shared;
				clearTimeout(this.hideTimer);
				this.followPointer = p(a)[0].series.tooltipOptions.followPointer;
				c = this.getAnchor(a, h);
				h = c[0];
				e = c[1];
				!d || a.series && a.series.noSharedTooltip ? n = a.getLabelConfig() : (b.hoverPoints = a, n && C(n, function (a) {
						a.setState()
					}), C(a, function (a) {
						a.setState("hover");
						u.push(a.getLabelConfig())
					}),
					n = {
						x: a[0].category,
						y: a[0].y
					}, n.points = u, this.len = u.length, a = a[0]);
				n = f.call(n, this);
				d = a.series;
				this.distance = t(d.tooltipOptions.distance, 16);
				!1 === n ? this.hide() : (f = this.getLabel(), this.isHidden && f.attr({
					opacity: 1
				}).show(), this.split ? this.renderSplit(n, b.hoverPoints) : (f.attr({
					text: n && n.join ? n.join("") : n
				}), f.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(a.colorIndex, d.colorIndex)), f.attr({
					stroke: g.borderColor || a.color || d.color || "#666666"
				}), this.updatePosition({
					plotX: h,
					plotY: e,
					negative: a.negative,
					ttBelow: a.ttBelow,
					h: c[2] || 0
				})), this.isHidden = !1)
			},
			renderSplit: function (b, h) {
				var f = this,
					q = [],
					g = this.chart,
					e = g.renderer,
					c = !0,
					n = this.options,
					u, d = this.getLabel();
				C(b.slice(0, b.length - 1), function (a, b) {
					b = h[b - 1] || {
						isHeader: !0,
						plotX: h[0].plotX
					};
					var y = b.series || f,
						A = y.tt,
						k = b.series || {},
						G = "highcharts-color-" + t(b.colorIndex, k.colorIndex, "none");
					A || (y.tt = A = e.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + G).attr({
						padding: n.padding,
						r: n.borderRadius,
						fill: n.backgroundColor,
						stroke: b.color || k.color || "#333333",
						"stroke-width": n.borderWidth
					}).add(d));
					A.isActive = !0;
					A.attr({
						text: a
					});
					A.css(n.style);
					a = A.getBBox();
					k = a.width + A.strokeWidth();
					b.isHeader ? (u = a.height, k = Math.max(0, Math.min(b.plotX + g.plotLeft - k / 2, g.chartWidth - k))) : k = b.plotX + g.plotLeft - t(n.distance, 16) - k;
					0 > k && (c = !1);
					a = (b.series && b.series.yAxis && b.series.yAxis.pos) + (b.plotY || 0);
					a -= g.plotTop;
					q.push({
						target: b.isHeader ? g.plotHeight + u : a,
						rank: b.isHeader ? 1 : 0,
						size: y.tt.getBBox().height + 1,
						point: b,
						x: k,
						tt: A
					})
				});
				this.cleanSplit();
				a.distribute(q, g.plotHeight + u);
				C(q, function (a) {
					var b = a.point;
					a.tt.attr({
						visibility: void 0 === a.pos ? "hidden" : "inherit",
						x: c || b.isHeader ? a.x : b.plotX + g.plotLeft + t(n.distance, 16),
						y: a.pos + g.plotTop,
						anchorX: b.plotX + g.plotLeft,
						anchorY: b.isHeader ? a.pos + g.plotTop - 15 : b.plotY + g.plotTop
					})
				})
			},
			updatePosition: function (a) {
				var b = this.chart,
					f = this.getLabel(),
					f = (this.options.positioner || this.getPosition).call(this, f.width, f.height, a);
				this.move(Math.round(f.x), Math.round(f.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop)
			},
			getXDateFormat: function (a, h, k) {
				var b;
				h = h.dateTimeLabelFormats;
				var g = k && k.closestPointRange,
					e, c = {
						millisecond: 15,
						second: 12,
						minute: 9,
						hour: 6,
						day: 3
					},
					n, u = "millisecond";
				if (g) {
					n = D("%m-%d %H:%M:%S.%L", a.x);
					for (e in f) {
						if (g === f.week && +D("%w", a.x) === k.options.startOfWeek && "00:00:00.000" === n.substr(6)) {
							e = "week";
							break
						}
						if (f[e] > g) {
							e = u;
							break
						}
						if (c[e] && n.substr(c[e]) !== "01-01 00:00:00.000".substr(c[e])) break;
						"week" !== e && (u = e)
					}
					e && (b = h[e])
				} else b = h.day;
				return b || h.year
			},
			tooltipFooterHeaderFormatter: function (a, f) {
				var b =
					f ? "footer" : "header";
				f = a.series;
				var h = f.tooltipOptions,
					g = h.xDateFormat,
					e = f.xAxis,
					c = e && "datetime" === e.options.type && r(a.key),
					b = h[b + "Format"];
				c && !g && (g = this.getXDateFormat(a, h, e));
				c && g && (b = b.replace("{point.key}", "{point.key:" + g + "}"));
				return H(b, {
					point: a,
					series: f
				})
			},
			bodyFormatter: function (a) {
				return m(a, function (a) {
					var b = a.series.tooltipOptions;
					return (b.pointFormatter || a.point.tooltipFormatter).call(a.point, b.pointFormat)
				})
			}
		}
	})(M);
	(function (a) {
		var D = a.addEvent,
			C = a.attr,
			F = a.charts,
			H = a.color,
			r = a.css,
			m =
			a.defined,
			l = a.doc,
			t = a.each,
			p = a.extend,
			k = a.fireEvent,
			f = a.offset,
			b = a.pick,
			h = a.removeEvent,
			z = a.splat,
			q = a.Tooltip,
			g = a.win;
		a.Pointer = function (a, b) {
			this.init(a, b)
		};
		a.Pointer.prototype = {
			init: function (a, c) {
				this.options = c;
				this.chart = a;
				this.runChartClick = c.chart.events && !!c.chart.events.click;
				this.pinchDown = [];
				this.lastValidTouch = {};
				q && c.tooltip.enabled && (a.tooltip = new q(a, c.tooltip), this.followTouchMove = b(c.tooltip.followTouchMove, !0));
				this.setDOMEvents()
			},
			zoomOption: function (a) {
				var c = this.chart,
					e = c.options.chart,
					g = e.zoomType || "",
					c = c.inverted;
				/touch/.test(a.type) && (g = b(e.pinchType, g));
				this.zoomX = a = /x/.test(g);
				this.zoomY = g = /y/.test(g);
				this.zoomHor = a && !c || g && c;
				this.zoomVert = g && !c || a && c;
				this.hasZoom = a || g
			},
			normalize: function (a, b) {
				var c, e;
				a = a || g.event;
				a.target || (a.target = a.srcElement);
				e = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
				b || (this.chartPosition = b = f(this.chart.container));
				void 0 === e.pageX ? (c = Math.max(a.x, a.clientX - b.left), b = a.y) : (c = e.pageX - b.left, b = e.pageY - b.top);
				return p(a, {
					chartX: Math.round(c),
					chartY: Math.round(b)
				})
			},
			getCoordinates: function (a) {
				var b = {
					xAxis: [],
					yAxis: []
				};
				t(this.chart.axes, function (c) {
					b[c.isXAxis ? "xAxis" : "yAxis"].push({
						axis: c,
						value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
					})
				});
				return b
			},
			runPointActions: function (e) {
				var c = this.chart,
					g = c.series,
					f = c.tooltip,
					d = f ? f.shared : !1,
					h = !0,
					q = c.hoverPoint,
					x = c.hoverSeries,
					k, E, G, v = [],
					K;
				if (!d && !x)
					for (k = 0; k < g.length; k++)
						if (g[k].directTouch || !g[k].options.stickyTracking) g = [];
				x && (d ? x.noSharedTooltip : x.directTouch) && q ? v = [q] : (d || !x || x.options.stickyTracking ||
					(g = [x]), t(g, function (a) {
						E = a.noSharedTooltip && d;
						G = !d && a.directTouch;
						a.visible && !E && !G && b(a.options.enableMouseTracking, !0) && (K = a.searchPoint(e, !E && 1 === a.kdDimensions)) && K.series && v.push(K)
					}), v.sort(function (a, b) {
						var c = a.distX - b.distX,
							e = a.dist - b.dist,
							g = b.series.group.zIndex - a.series.group.zIndex;
						return 0 !== c && d ? c : 0 !== e ? e : 0 !== g ? g : a.series.index > b.series.index ? -1 : 1
					}));
				if (d)
					for (k = v.length; k--;)(v[k].x !== v[0].x || v[k].series.noSharedTooltip) && v.splice(k, 1);
				if (v[0] && (v[0] !== this.prevKDPoint || f && f.isHidden)) {
					if (d &&
						!v[0].series.noSharedTooltip) {
						for (k = 0; k < v.length; k++) v[k].onMouseOver(e, v[k] !== (x && x.directTouch && q || v[0]));
						v.length && f && f.refresh(v.sort(function (a, b) {
							return a.series.index - b.series.index
						}), e)
					} else if (f && f.refresh(v[0], e), !x || !x.directTouch) v[0].onMouseOver(e);
					this.prevKDPoint = v[0];
					h = !1
				}
				h && (g = x && x.tooltipOptions.followPointer, f && g && !f.isHidden && (g = f.getAnchor([{}], e), f.updatePosition({
					plotX: g[0],
					plotY: g[1]
				})));
				this.unDocMouseMove || (this.unDocMouseMove = D(l, "mousemove", function (b) {
					if (F[a.hoverChartIndex]) F[a.hoverChartIndex].pointer.onDocumentMouseMove(b)
				}));
				t(d ? v : [b(q, v[0])], function (a) {
					t(c.axes, function (b) {
						(!a || a.series && a.series[b.coll] === b) && b.drawCrosshair(e, a)
					})
				})
			},
			reset: function (a, b) {
				var c = this.chart,
					e = c.hoverSeries,
					d = c.hoverPoint,
					g = c.hoverPoints,
					f = c.tooltip,
					h = f && f.shared ? g : d;
				a && h && t(z(h), function (b) {
					b.series.isCartesian && void 0 === b.plotX && (a = !1)
				});
				if (a) f && h && (f.refresh(h), d && (d.setState(d.state, !0), t(c.axes, function (a) {
					a.crosshair && a.drawCrosshair(null, d)
				})));
				else {
					if (d) d.onMouseOut();
					g && t(g, function (a) {
						a.setState()
					});
					if (e) e.onMouseOut();
					f && f.hide(b);
					this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
					t(c.axes, function (a) {
						a.hideCrosshair()
					});
					this.hoverX = this.prevKDPoint = c.hoverPoints = c.hoverPoint = null
				}
			},
			scaleGroups: function (a, b) {
				var c = this.chart,
					e;
				t(c.series, function (d) {
					e = a || d.getPlotBox();
					d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(e), d.markerGroup && (d.markerGroup.attr(e), d.markerGroup.clip(b ? c.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(e))
				});
				c.clipRect.attr(b || c.clipBox)
			},
			dragStart: function (a) {
				var b = this.chart;
				b.mouseIsDown = a.type;
				b.cancelClick = !1;
				b.mouseDownX = this.mouseDownX = a.chartX;
				b.mouseDownY = this.mouseDownY = a.chartY
			},
			drag: function (a) {
				var b = this.chart,
					e = b.options.chart,
					g = a.chartX,
					d = a.chartY,
					f = this.zoomHor,
					h = this.zoomVert,
					q = b.plotLeft,
					k = b.plotTop,
					l = b.plotWidth,
					G = b.plotHeight,
					v, K = this.selectionMarker,
					z = this.mouseDownX,
					w = this.mouseDownY,
					m = e.panKey && a[e.panKey + "Key"];
				K && K.touch || (g < q ? g = q : g > q + l && (g = q + l), d < k ? d = k : d > k + G && (d = k + G), this.hasDragged = Math.sqrt(Math.pow(z - g, 2) + Math.pow(w - d, 2)), 10 < this.hasDragged &&
					(v = b.isInsidePlot(z - q, w - k), b.hasCartesianSeries && (this.zoomX || this.zoomY) && v && !m && !K && (this.selectionMarker = K = b.renderer.rect(q, k, f ? 1 : l, h ? 1 : G, 0).attr({
						fill: e.selectionMarkerFill || H("#335cad").setOpacity(.25).get(),
						"class": "highcharts-selection-marker",
						zIndex: 7
					}).add()), K && f && (g -= z, K.attr({
						width: Math.abs(g),
						x: (0 < g ? 0 : g) + z
					})), K && h && (g = d - w, K.attr({
						height: Math.abs(g),
						y: (0 < g ? 0 : g) + w
					})), v && !K && e.panning && b.pan(a, e.panning)))
			},
			drop: function (a) {
				var b = this,
					e = this.chart,
					g = this.hasPinched;
				if (this.selectionMarker) {
					var d = {
							originalEvent: a,
							xAxis: [],
							yAxis: []
						},
						f = this.selectionMarker,
						h = f.attr ? f.attr("x") : f.x,
						q = f.attr ? f.attr("y") : f.y,
						l = f.attr ? f.attr("width") : f.width,
						z = f.attr ? f.attr("height") : f.height,
						G;
					if (this.hasDragged || g) t(e.axes, function (c) {
						if (c.zoomEnabled && m(c.min) && (g || b[{
								xAxis: "zoomX",
								yAxis: "zoomY"
							}[c.coll]])) {
							var e = c.horiz,
								f = "touchend" === a.type ? c.minPixelPadding : 0,
								n = c.toValue((e ? h : q) + f),
								e = c.toValue((e ? h + l : q + z) - f);
							d[c.coll].push({
								axis: c,
								min: Math.min(n, e),
								max: Math.max(n, e)
							});
							G = !0
						}
					}), G && k(e, "selection", d, function (a) {
						e.zoom(p(a,
							g ? {
								animation: !1
							} : null))
					});
					this.selectionMarker = this.selectionMarker.destroy();
					g && this.scaleGroups()
				}
				e && (r(e.container, {
					cursor: e._cursor
				}), e.cancelClick = 10 < this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
			},
			onContainerMouseDown: function (a) {
				a = this.normalize(a);
				this.zoomOption(a);
				a.preventDefault && a.preventDefault();
				this.dragStart(a)
			},
			onDocumentMouseUp: function (b) {
				F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(b)
			},
			onDocumentMouseMove: function (a) {
				var b = this.chart,
					e = this.chartPosition;
				a = this.normalize(a, e);
				!e || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
			},
			onContainerMouseLeave: function (b) {
				var c = F[a.hoverChartIndex];
				c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
			},
			onContainerMouseMove: function (b) {
				var c = this.chart;
				m(a.hoverChartIndex) && F[a.hoverChartIndex] && F[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
				b = this.normalize(b);
				b.returnValue = !1;
				"mousedown" === c.mouseIsDown && this.drag(b);
				!this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
			},
			inClass: function (a, b) {
				for (var c; a;) {
					if (c = C(a, "class")) {
						if (-1 !== c.indexOf(b)) return !0;
						if (-1 !== c.indexOf("highcharts-container")) return !1
					}
					a = a.parentNode
				}
			},
			onTrackerMouseOut: function (a) {
				var b = this.chart.hoverSeries;
				a = a.relatedTarget || a.toElement;
				if (!(!b || !a || b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") ||
						this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
			},
			onContainerClick: function (a) {
				var b = this.chart,
					e = b.hoverPoint,
					g = b.plotLeft,
					d = b.plotTop;
				a = this.normalize(a);
				b.cancelClick || (e && this.inClass(a.target, "highcharts-tracker") ? (k(e.series, "click", p(a, {
					point: e
				})), b.hoverPoint && e.firePointEvent("click", a)) : (p(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - g, a.chartY - d) && k(b, "click", a)))
			},
			setDOMEvents: function () {
				var b = this,
					c = b.chart.container;
				c.onmousedown =
					function (a) {
						b.onContainerMouseDown(a)
					};
				c.onmousemove = function (a) {
					b.onContainerMouseMove(a)
				};
				c.onclick = function (a) {
					b.onContainerClick(a)
				};
				D(c, "mouseleave", b.onContainerMouseLeave);
				1 === a.chartCount && D(l, "mouseup", b.onDocumentMouseUp);
				a.hasTouch && (c.ontouchstart = function (a) {
					b.onContainerTouchStart(a)
				}, c.ontouchmove = function (a) {
					b.onContainerTouchMove(a)
				}, 1 === a.chartCount && D(l, "touchend", b.onDocumentTouchEnd))
			},
			destroy: function () {
				var b;
				h(this.chart.container, "mouseleave", this.onContainerMouseLeave);
				a.chartCount ||
					(h(l, "mouseup", this.onDocumentMouseUp), h(l, "touchend", this.onDocumentTouchEnd));
				clearInterval(this.tooltipTimeout);
				for (b in this) this[b] = null
			}
		}
	})(M);
	(function (a) {
		var D = a.charts,
			C = a.each,
			F = a.extend,
			H = a.map,
			r = a.noop,
			m = a.pick;
		F(a.Pointer.prototype, {
			pinchTranslate: function (a, m, p, k, f, b) {
				this.zoomHor && this.pinchTranslateDirection(!0, a, m, p, k, f, b);
				this.zoomVert && this.pinchTranslateDirection(!1, a, m, p, k, f, b)
			},
			pinchTranslateDirection: function (a, m, p, k, f, b, h, z) {
				var q = this.chart,
					g = a ? "x" : "y",
					e = a ? "X" : "Y",
					c = "chart" +
					e,
					n = a ? "width" : "height",
					u = q["plot" + (a ? "Left" : "Top")],
					d, A, y = z || 1,
					x = q.inverted,
					l = q.bounds[a ? "h" : "v"],
					E = 1 === m.length,
					G = m[0][c],
					v = p[0][c],
					K = !E && m[1][c],
					N = !E && p[1][c],
					w;
				p = function () {
					!E && 20 < Math.abs(G - K) && (y = z || Math.abs(v - N) / Math.abs(G - K));
					A = (u - v) / y + G;
					d = q["plot" + (a ? "Width" : "Height")] / y
				};
				p();
				m = A;
				m < l.min ? (m = l.min, w = !0) : m + d > l.max && (m = l.max - d, w = !0);
				w ? (v -= .8 * (v - h[g][0]), E || (N -= .8 * (N - h[g][1])), p()) : h[g] = [v, N];
				x || (b[g] = A - u, b[n] = d);
				b = x ? 1 / y : y;
				f[n] = d;
				f[g] = m;
				k[x ? a ? "scaleY" : "scaleX" : "scale" + e] = y;
				k["translate" + e] = b *
					u + (v - b * G)
			},
			pinch: function (a) {
				var l = this,
					p = l.chart,
					k = l.pinchDown,
					f = a.touches,
					b = f.length,
					h = l.lastValidTouch,
					z = l.hasZoom,
					q = l.selectionMarker,
					g = {},
					e = 1 === b && (l.inClass(a.target, "highcharts-tracker") && p.runTrackerClick || l.runChartClick),
					c = {};
				1 < b && (l.initiated = !0);
				z && l.initiated && !e && a.preventDefault();
				H(f, function (a) {
					return l.normalize(a)
				});
				"touchstart" === a.type ? (C(f, function (a, b) {
					k[b] = {
						chartX: a.chartX,
						chartY: a.chartY
					}
				}), h.x = [k[0].chartX, k[1] && k[1].chartX], h.y = [k[0].chartY, k[1] && k[1].chartY], C(p.axes, function (a) {
					if (a.zoomEnabled) {
						var b =
							p.bounds[a.horiz ? "h" : "v"],
							c = a.minPixelPadding,
							e = a.toPixels(m(a.options.min, a.dataMin)),
							g = a.toPixels(m(a.options.max, a.dataMax)),
							f = Math.max(e, g);
						b.min = Math.min(a.pos, Math.min(e, g) - c);
						b.max = Math.max(a.pos + a.len, f + c)
					}
				}), l.res = !0) : l.followTouchMove && 1 === b ? this.runPointActions(l.normalize(a)) : k.length && (q || (l.selectionMarker = q = F({
					destroy: r,
					touch: !0
				}, p.plotBox)), l.pinchTranslate(k, f, g, q, c, h), l.hasPinched = z, l.scaleGroups(g, c), l.res && (l.res = !1, this.reset(!1, 0)))
			},
			touch: function (l, r) {
				var p = this.chart,
					k, f;
				if (p.index !== a.hoverChartIndex) this.onContainerMouseLeave({
					relatedTarget: !0
				});
				a.hoverChartIndex = p.index;
				1 === l.touches.length ? (l = this.normalize(l), (f = p.isInsidePlot(l.chartX - p.plotLeft, l.chartY - p.plotTop)) && !p.openMenu ? (r && this.runPointActions(l), "touchmove" === l.type && (r = this.pinchDown, k = r[0] ? 4 <= Math.sqrt(Math.pow(r[0].chartX - l.chartX, 2) + Math.pow(r[0].chartY - l.chartY, 2)) : !1), m(k, !0) && this.pinch(l)) : r && this.reset()) : 2 === l.touches.length && this.pinch(l)
			},
			onContainerTouchStart: function (a) {
				this.zoomOption(a);
				this.touch(a, !0)
			},
			onContainerTouchMove: function (a) {
				this.touch(a)
			},
			onDocumentTouchEnd: function (l) {
				D[a.hoverChartIndex] && D[a.hoverChartIndex].pointer.drop(l)
			}
		})
	})(M);
	(function (a) {
		var D = a.addEvent,
			C = a.charts,
			F = a.css,
			H = a.doc,
			r = a.extend,
			m = a.noop,
			l = a.Pointer,
			t = a.removeEvent,
			p = a.win,
			k = a.wrap;
		if (p.PointerEvent || p.MSPointerEvent) {
			var f = {},
				b = !!p.PointerEvent,
				h = function () {
					var a, b = [];
					b.item = function (a) {
						return this[a]
					};
					for (a in f) f.hasOwnProperty(a) && b.push({
						pageX: f[a].pageX,
						pageY: f[a].pageY,
						target: f[a].target
					});
					return b
				},
				z = function (b, g, e, c) {
					"touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !C[a.hoverChartIndex] || (c(b), c = C[a.hoverChartIndex].pointer, c[g]({
						type: e,
						target: b.currentTarget,
						preventDefault: m,
						touches: h()
					}))
				};
			r(l.prototype, {
				onContainerPointerDown: function (a) {
					z(a, "onContainerTouchStart", "touchstart", function (a) {
						f[a.pointerId] = {
							pageX: a.pageX,
							pageY: a.pageY,
							target: a.currentTarget
						}
					})
				},
				onContainerPointerMove: function (a) {
					z(a, "onContainerTouchMove", "touchmove", function (a) {
						f[a.pointerId] = {
							pageX: a.pageX,
							pageY: a.pageY
						};
						f[a.pointerId].target || (f[a.pointerId].target = a.currentTarget)
					})
				},
				onDocumentPointerUp: function (a) {
					z(a, "onDocumentTouchEnd", "touchend", function (a) {
						delete f[a.pointerId]
					})
				},
				batchMSEvents: function (a) {
					a(this.chart.container, b ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
					a(this.chart.container, b ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
					a(H, b ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
				}
			});
			k(l.prototype, "init", function (a, b, e) {
				a.call(this, b, e);
				this.hasZoom &&
					F(b.container, {
						"-ms-touch-action": "none",
						"touch-action": "none"
					})
			});
			k(l.prototype, "setDOMEvents", function (a) {
				a.apply(this);
				(this.hasZoom || this.followTouchMove) && this.batchMSEvents(D)
			});
			k(l.prototype, "destroy", function (a) {
				this.batchMSEvents(t);
				a.call(this)
			})
		}
	})(M);
	(function (a) {
		var D, C = a.addEvent,
			F = a.css,
			H = a.discardElement,
			r = a.defined,
			m = a.each,
			l = a.extend,
			t = a.isFirefox,
			p = a.marginNames,
			k = a.merge,
			f = a.pick,
			b = a.setAnimation,
			h = a.stableSort,
			z = a.win,
			q = a.wrap;
		D = a.Legend = function (a, b) {
			this.init(a, b)
		};
		D.prototype = {
			init: function (a, b) {
				this.chart = a;
				this.setOptions(b);
				b.enabled && (this.render(), C(this.chart, "endResize", function () {
					this.legend.positionCheckboxes()
				}))
			},
			setOptions: function (a) {
				var b = f(a.padding, 8);
				this.options = a;
				this.itemStyle = a.itemStyle;
				this.itemHiddenStyle = k(this.itemStyle, a.itemHiddenStyle);
				this.itemMarginTop = a.itemMarginTop || 0;
				this.initialItemX = this.padding = b;
				this.initialItemY = b - 5;
				this.itemHeight = this.maxItemWidth = 0;
				this.symbolWidth = f(a.symbolWidth, 16);
				this.pages = []
			},
			update: function (a, b) {
				var c =
					this.chart;
				this.setOptions(k(!0, this.options, a));
				this.destroy();
				c.isDirtyLegend = c.isDirtyBox = !0;
				f(b, !0) && c.redraw()
			},
			colorizeItem: function (a, b) {
				a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
				var c = this.options,
					e = a.legendItem,
					g = a.legendLine,
					d = a.legendSymbol,
					f = this.itemHiddenStyle.color,
					c = b ? c.itemStyle.color : f,
					h = b ? a.color || f : f,
					q = a.options && a.options.marker,
					k = {
						fill: h
					},
					l;
				e && e.css({
					fill: c,
					color: c
				});
				g && g.attr({
					stroke: h
				});
				if (d) {
					if (q && d.isMarker && (k = a.pointAttribs(), !b))
						for (l in k) k[l] =
							f;
					d.attr(k)
				}
			},
			positionItem: function (a) {
				var b = this.options,
					c = b.symbolPadding,
					b = !b.rtl,
					g = a._legendItemPos,
					f = g[0],
					g = g[1],
					d = a.checkbox;
				(a = a.legendGroup) && a.element && a.translate(b ? f : this.legendWidth - f - 2 * c - 4, g);
				d && (d.x = f, d.y = g)
			},
			destroyItem: function (a) {
				var b = a.checkbox;
				m(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
					a[b] && (a[b] = a[b].destroy())
				});
				b && H(a.checkbox)
			},
			destroy: function () {
				var a = this.group,
					b = this.box;
				b && (this.box = b.destroy());
				m(this.getAllItems(), function (a) {
					m(["legendItem",
						"legendGroup"
					], function (b) {
						a[b] && (a[b] = a[b].destroy())
					})
				});
				a && (this.group = a.destroy());
				this.display = null
			},
			positionCheckboxes: function (a) {
				var b = this.group && this.group.alignAttr,
					c, g = this.clipHeight || this.legendHeight,
					f = this.titleHeight;
				b && (c = b.translateY, m(this.allItems, function (d) {
					var e = d.checkbox,
						h;
					e && (h = c + f + e.y + (a || 0) + 3, F(e, {
						left: b.translateX + d.checkboxOffset + e.x - 20 + "px",
						top: h + "px",
						display: h > c - 6 && h < c + g - 6 ? "" : "none"
					}))
				}))
			},
			renderTitle: function () {
				var a = this.padding,
					b = this.options.title,
					c = 0;
				b.text &&
					(this.title || (this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
						zIndex: 1
					}).css(b.style).add(this.group)), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
						translateY: c
					}));
				this.titleHeight = c
			},
			setText: function (b) {
				var e = this.options;
				b.legendItem.attr({
					text: e.labelFormat ? a.format(e.labelFormat, b) : e.labelFormatter.call(b)
				})
			},
			renderItem: function (a) {
				var b = this.chart,
					c = b.renderer,
					g = this.options,
					h = "horizontal" === g.layout,
					d = this.symbolWidth,
					q = g.symbolPadding,
					y = this.itemStyle,
					x = this.itemHiddenStyle,
					l = this.padding,
					z = h ? f(g.itemDistance, 20) : 0,
					G = !g.rtl,
					v = g.width,
					K = g.itemMarginBottom || 0,
					m = this.itemMarginTop,
					w = this.initialItemX,
					p = a.legendItem,
					r = !a.series,
					t = !r && a.series.drawLegendSymbol ? a.series : a,
					B = t.options,
					B = this.createCheckboxForItem && B && B.showCheckbox,
					L = g.useHTML;
				p || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + t.type + "-series highcharts-color-" + a.colorIndex + (a.options.className ? " " + a.options.className : "") + (r ? " highcharts-series-" +
					a.index : "")).attr({
					zIndex: 1
				}).add(this.scrollGroup), a.legendItem = p = c.text("", G ? d + q : -q, this.baseline || 0, L).css(k(a.visible ? y : x)).attr({
					align: G ? "left" : "right",
					zIndex: 2
				}).add(a.legendGroup), this.baseline || (y = y.fontSize, this.fontMetrics = c.fontMetrics(y, p), this.baseline = this.fontMetrics.f + 3 + m, p.attr("y", this.baseline)), t.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, p, L), B && this.createCheckboxForItem(a));
				this.colorizeItem(a, a.visible);
				this.setText(a);
				c = p.getBBox();
				d = a.checkboxOffset =
					g.itemWidth || a.legendItemWidth || d + q + c.width + z + (B ? 20 : 0);
				this.itemHeight = q = Math.round(a.legendItemHeight || c.height);
				h && this.itemX - w + d > (v || b.chartWidth - 2 * l - w - g.x) && (this.itemX = w, this.itemY += m + this.lastLineHeight + K, this.lastLineHeight = 0);
				this.maxItemWidth = Math.max(this.maxItemWidth, d);
				this.lastItemY = m + this.itemY + K;
				this.lastLineHeight = Math.max(q, this.lastLineHeight);
				a._legendItemPos = [this.itemX, this.itemY];
				h ? this.itemX += d : (this.itemY += m + q + K, this.lastLineHeight = q);
				this.offsetWidth = v || Math.max((h ? this.itemX -
					w - z : d) + l, this.offsetWidth)
			},
			getAllItems: function () {
				var a = [];
				m(this.chart.series, function (b) {
					var c = b && b.options;
					b && f(c.showInLegend, r(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
				});
				return a
			},
			adjustMargins: function (a, b) {
				var c = this.chart,
					e = this.options,
					g = e.align.charAt(0) + e.verticalAlign.charAt(0) + e.layout.charAt(0);
				e.floating || m([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (d, h) {
					d.test(g) && !r(a[h]) && (c[p[h]] = Math.max(c[p[h]], c.legend[(h +
						1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][h] * e[h % 2 ? "x" : "y"] + f(e.margin, 12) + b[h]))
				})
			},
			render: function () {
				var a = this,
					b = a.chart,
					c = b.renderer,
					f = a.group,
					q, d, k, y, x = a.box,
					z = a.options,
					E = a.padding;
				a.itemX = a.initialItemX;
				a.itemY = a.initialItemY;
				a.offsetWidth = 0;
				a.lastItemY = 0;
				f || (a.group = f = c.g("legend").attr({
					zIndex: 7
				}).add(), a.contentGroup = c.g().attr({
					zIndex: 1
				}).add(f), a.scrollGroup = c.g().add(a.contentGroup));
				a.renderTitle();
				q = a.getAllItems();
				h(q, function (a, b) {
					return (a.options && a.options.legendIndex || 0) -
						(b.options && b.options.legendIndex || 0)
				});
				z.reversed && q.reverse();
				a.allItems = q;
				a.display = d = !!q.length;
				a.lastLineHeight = 0;
				m(q, function (b) {
					a.renderItem(b)
				});
				k = (z.width || a.offsetWidth) + E;
				y = a.lastItemY + a.lastLineHeight + a.titleHeight;
				y = a.handleOverflow(y);
				y += E;
				x || (a.box = x = c.rect().addClass("highcharts-legend-box").attr({
					r: z.borderRadius
				}).add(f), x.isNew = !0);
				x.attr({
					stroke: z.borderColor,
					"stroke-width": z.borderWidth || 0,
					fill: z.backgroundColor || "none"
				}).shadow(z.shadow);
				0 < k && 0 < y && (x[x.isNew ? "attr" : "animate"](x.crisp({
					x: 0,
					y: 0,
					width: k,
					height: y
				}, x.strokeWidth())), x.isNew = !1);
				x[d ? "show" : "hide"]();
				a.legendWidth = k;
				a.legendHeight = y;
				m(q, function (b) {
					a.positionItem(b)
				});
				d && f.align(l({
					width: k,
					height: y
				}, z), !0, "spacingBox");
				b.isResizing || this.positionCheckboxes()
			},
			handleOverflow: function (a) {
				var b = this,
					c = this.chart,
					g = c.renderer,
					h = this.options,
					d = h.y,
					c = c.spacingBox.height + ("top" === h.verticalAlign ? -d : d) - this.padding,
					d = h.maxHeight,
					q, k = this.clipRect,
					x = h.navigation,
					l = f(x.animation, !0),
					z = x.arrowSize || 12,
					G = this.nav,
					v = this.pages,
					K = this.padding,
					p, w = this.allItems,
					I = function (a) {
						a ? k.attr({
							height: a
						}) : k && (b.clipRect = k.destroy(), b.contentGroup.clip());
						b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + K + "px,9999px," + (K + a) + "px,0)" : "auto")
					};
				"horizontal" !== h.layout || "middle" === h.verticalAlign || h.floating || (c /= 2);
				d && (c = Math.min(c, d));
				v.length = 0;
				a > c && !1 !== x.enabled ? (this.clipHeight = q = Math.max(c - 20 - this.titleHeight - K, 0), this.currentPage = f(this.currentPage, 1), this.fullHeight = a, m(w, function (a, b) {
						var c = a._legendItemPos[1];
						a = Math.round(a.legendItem.getBBox().height);
						var d = v.length;
						if (!d || c - v[d - 1] > q && (p || c) !== v[d - 1]) v.push(p || c), d++;
						b === w.length - 1 && c + a - v[d - 1] > q && v.push(c);
						c !== p && (p = c)
					}), k || (k = b.clipRect = g.clipRect(0, K, 9999, 0), b.contentGroup.clip(k)), I(q), G || (this.nav = G = g.g().attr({
						zIndex: 1
					}).add(this.group), this.up = g.symbol("triangle", 0, 0, z, z).on("click", function () {
						b.scroll(-1, l)
					}).add(G), this.pager = g.text("", 15, 10).addClass("highcharts-legend-navigation").css(x.style).add(G), this.down = g.symbol("triangle-down", 0, 0, z, z).on("click", function () {
						b.scroll(1, l)
					}).add(G)),
					b.scroll(0), a = c) : G && (I(), G.hide(), this.scrollGroup.attr({
					translateY: 1
				}), this.clipHeight = 0);
				return a
			},
			scroll: function (a, e) {
				var c = this.pages,
					g = c.length;
				a = this.currentPage + a;
				var f = this.clipHeight,
					d = this.options.navigation,
					h = this.pager,
					q = this.padding;
				a > g && (a = g);
				0 < a && (void 0 !== e && b(e, this.chart), this.nav.attr({
					translateX: q,
					translateY: f + this.padding + 7 + this.titleHeight,
					visibility: "visible"
				}), this.up.attr({
					"class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
				}), h.attr({
					text: a + "/" +
						g
				}), this.down.attr({
					x: 18 + this.pager.getBBox().width,
					"class": a === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
				}), this.up.attr({
					fill: 1 === a ? d.inactiveColor : d.activeColor
				}).css({
					cursor: 1 === a ? "default" : "pointer"
				}), this.down.attr({
					fill: a === g ? d.inactiveColor : d.activeColor
				}).css({
					cursor: a === g ? "default" : "pointer"
				}), e = -c[a - 1] + this.initialItemY, this.scrollGroup.animate({
					translateY: e
				}), this.currentPage = a, this.positionCheckboxes(e))
			}
		};
		a.LegendSymbolMixin = {
			drawRectangle: function (a, b) {
				var c =
					a.options,
					e = c.symbolHeight || a.fontMetrics.f,
					c = c.squareSymbol;
				b.legendSymbol = this.chart.renderer.rect(c ? (a.symbolWidth - e) / 2 : 0, a.baseline - e + 1, c ? e : a.symbolWidth, e, f(a.options.symbolRadius, e / 2)).addClass("highcharts-point").attr({
					zIndex: 3
				}).add(b.legendGroup)
			},
			drawLineMarker: function (a) {
				var b = this.options,
					c = b.marker,
					f = a.symbolWidth,
					g = this.chart.renderer,
					d = this.legendGroup;
				a = a.baseline - Math.round(.3 * a.fontMetrics.b);
				var h;
				h = {
					"stroke-width": b.lineWidth || 0
				};
				b.dashStyle && (h.dashstyle = b.dashStyle);
				this.legendLine =
					g.path(["M", 0, a, "L", f, a]).addClass("highcharts-graph").attr(h).add(d);
				c && !1 !== c.enabled && (b = 0 === this.symbol.indexOf("url") ? 0 : c.radius, this.legendSymbol = c = g.symbol(this.symbol, f / 2 - b, a - b, 2 * b, 2 * b, c).addClass("highcharts-point").add(d), c.isMarker = !0)
			}
		};
		(/Trident\/7\.0/.test(z.navigator.userAgent) || t) && q(D.prototype, "positionItem", function (a, b) {
			var c = this,
				e = function () {
					b._legendItemPos && a.call(c, b)
				};
			e();
			setTimeout(e)
		})
	})(M);
	(function (a) {
		var D = a.addEvent,
			C = a.animate,
			F = a.animObject,
			H = a.attr,
			r = a.doc,
			m = a.Axis,
			l = a.createElement,
			t = a.defaultOptions,
			p = a.discardElement,
			k = a.charts,
			f = a.css,
			b = a.defined,
			h = a.each,
			z = a.error,
			q = a.extend,
			g = a.fireEvent,
			e = a.getStyle,
			c = a.grep,
			n = a.isNumber,
			u = a.isObject,
			d = a.isString,
			A = a.Legend,
			y = a.marginNames,
			x = a.merge,
			J = a.Pointer,
			E = a.pick,
			G = a.pInt,
			v = a.removeEvent,
			K = a.seriesTypes,
			N = a.splat,
			w = a.svg,
			I = a.syncTimeout,
			O = a.win,
			Q = a.Renderer,
			B = a.Chart = function () {
				this.getArgs.apply(this, arguments)
			};
		a.chart = function (a, b, c) {
			return new B(a, b, c)
		};
		B.prototype = {
			callbacks: [],
			getArgs: function () {
				var a = [].slice.call(arguments);
				if (d(a[0]) || a[0].nodeName) this.renderTo = a.shift();
				this.init(a[0], a[1])
			},
			init: function (b, c) {
				var d, e = b.series;
				b.series = null;
				d = x(t, b);
				d.series = b.series = e;
				this.userOptions = b;
				this.respRules = [];
				b = d.chart;
				e = b.events;
				this.margin = [];
				this.spacing = [];
				this.bounds = {
					h: {},
					v: {}
				};
				this.callback = c;
				this.isResizing = 0;
				this.options = d;
				this.axes = [];
				this.series = [];
				this.hasCartesianSeries = b.showAxes;
				var f;
				this.index = k.length;
				k.push(this);
				a.chartCount++;
				if (e)
					for (f in e) D(this, f, e[f]);
				this.xAxis = [];
				this.yAxis = [];
				this.pointCount =
					this.colorCounter = this.symbolCounter = 0;
				this.firstRender()
			},
			initSeries: function (a) {
				var b = this.options.chart;
				(b = K[a.type || b.type || b.defaultSeriesType]) || z(17, !0);
				b = new b;
				b.init(this, a);
				return b
			},
			isInsidePlot: function (a, b, c) {
				var d = c ? b : a;
				a = c ? a : b;
				return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
			},
			redraw: function (b) {
				var c = this.axes,
					d = this.series,
					e = this.pointer,
					f = this.legend,
					v = this.isDirtyLegend,
					n, G, w = this.hasCartesianSeries,
					k = this.isDirtyBox,
					u = d.length,
					K = u,
					x = this.renderer,
					y = x.isHidden(),
					l = [];
				a.setAnimation(b,
					this);
				y && this.cloneRenderTo();
				for (this.layOutTitles(); K--;)
					if (b = d[K], b.options.stacking && (n = !0, b.isDirty)) {
						G = !0;
						break
					}
				if (G)
					for (K = u; K--;) b = d[K], b.options.stacking && (b.isDirty = !0);
				h(d, function (a) {
					a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), v = !0);
					a.isDirtyData && g(a, "updatedData")
				});
				v && f.options.enabled && (f.render(), this.isDirtyLegend = !1);
				n && this.getStacks();
				w && h(c, function (a) {
					a.updateNames();
					a.setScale()
				});
				this.getMargins();
				w && (h(c, function (a) {
					a.isDirty && (k = !0)
				}), h(c,
					function (a) {
						var b = a.min + "," + a.max;
						a.extKey !== b && (a.extKey = b, l.push(function () {
							g(a, "afterSetExtremes", q(a.eventArgs, a.getExtremes()));
							delete a.eventArgs
						}));
						(k || n) && a.redraw()
					}));
				k && this.drawChartBox();
				h(d, function (a) {
					(k || a.isDirty) && a.visible && a.redraw()
				});
				e && e.reset(!0);
				x.draw();
				g(this, "redraw");
				y && this.cloneRenderTo(!0);
				h(l, function (a) {
					a.call()
				})
			},
			get: function (a) {
				var b = this.axes,
					c = this.series,
					d, e;
				for (d = 0; d < b.length; d++)
					if (b[d].options.id === a) return b[d];
				for (d = 0; d < c.length; d++)
					if (c[d].options.id ===
						a) return c[d];
				for (d = 0; d < c.length; d++)
					for (e = c[d].points || [], b = 0; b < e.length; b++)
						if (e[b].id === a) return e[b];
				return null
			},
			getAxes: function () {
				var a = this,
					b = this.options,
					c = b.xAxis = N(b.xAxis || {}),
					b = b.yAxis = N(b.yAxis || {});
				h(c, function (a, b) {
					a.index = b;
					a.isX = !0
				});
				h(b, function (a, b) {
					a.index = b
				});
				c = c.concat(b);
				h(c, function (b) {
					new m(a, b)
				})
			},
			getSelectedPoints: function () {
				var a = [];
				h(this.series, function (b) {
					a = a.concat(c(b.points || [], function (a) {
						return a.selected
					}))
				});
				return a
			},
			getSelectedSeries: function () {
				return c(this.series,
					function (a) {
						return a.selected
					})
			},
			setTitle: function (a, b, c) {
				var d = this,
					e = d.options,
					f;
				f = e.title = x({
					style: {
						color: "#333333",
						fontSize: e.isStock ? "16px" : "18px"
					}
				}, e.title, a);
				e = e.subtitle = x({
					style: {
						color: "#666666"
					}
				}, e.subtitle, b);
				h([
					["title", a, f],
					["subtitle", b, e]
				], function (a, b) {
					var c = a[0],
						e = d[c],
						f = a[1];
					a = a[2];
					e && f && (d[c] = e = e.destroy());
					a && a.text && !e && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
						align: a.align,
						"class": "highcharts-" + c,
						zIndex: a.zIndex || 4
					}).add(), d[c].update = function (a) {
						d.setTitle(!b && a, b &&
							a)
					}, d[c].css(a.style))
				});
				d.layOutTitles(c)
			},
			layOutTitles: function (a) {
				var b = 0,
					c, d = this.renderer,
					e = this.spacingBox;
				h(["title", "subtitle"], function (a) {
					var c = this[a],
						f = this.options[a],
						g;
					c && (g = f.style.fontSize, g = d.fontMetrics(g, c).b, c.css({
						width: (f.width || e.width + f.widthAdjust) + "px"
					}).align(q({
						y: b + g + ("title" === a ? -3 : 2)
					}, f), !1, "spacingBox"), f.floating || f.verticalAlign || (b = Math.ceil(b + c.getBBox().height)))
				}, this);
				c = this.titleOffset !== b;
				this.titleOffset = b;
				!this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered &&
					E(a, !0) && this.isDirtyBox && this.redraw())
			},
			getChartSize: function () {
				var a = this.options.chart,
					c = a.width,
					a = a.height,
					d = this.renderToClone || this.renderTo;
				b(c) || (this.containerWidth = e(d, "width"));
				b(a) || (this.containerHeight = e(d, "height"));
				this.chartWidth = Math.max(0, c || this.containerWidth || 600);
				this.chartHeight = Math.max(0, E(a, 19 < this.containerHeight ? this.containerHeight : 400))
			},
			cloneRenderTo: function (a) {
				var b = this.renderToClone,
					c = this.container;
				if (a) {
					if (b) {
						for (; b.childNodes.length;) this.renderTo.appendChild(b.firstChild);
						p(b);
						delete this.renderToClone
					}
				} else c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), f(b, {
					position: "absolute",
					top: "-9999px",
					display: "block"
				}), b.style.setProperty && b.style.setProperty("display", "block", "important"), r.body.appendChild(b), c && b.appendChild(c)
			},
			setClassName: function (a) {
				this.container.className = "highcharts-container " + (a || "")
			},
			getContainer: function () {
				var b, c = this.options,
					e = c.chart,
					f, g;
				b = this.renderTo;
				var h = a.uniqueKey(),
					v;
				b ||
					(this.renderTo = b = e.renderTo);
				d(b) && (this.renderTo = b = r.getElementById(b));
				b || z(13, !0);
				f = G(H(b, "data-highcharts-chart"));
				n(f) && k[f] && k[f].hasRendered && k[f].destroy();
				H(b, "data-highcharts-chart", this.index);
				b.innerHTML = "";
				e.skipClone || b.offsetWidth || this.cloneRenderTo();
				this.getChartSize();
				f = this.chartWidth;
				g = this.chartHeight;
				v = q({
					position: "relative",
					overflow: "hidden",
					width: f + "px",
					height: g + "px",
					textAlign: "left",
					lineHeight: "normal",
					zIndex: 0,
					"-webkit-tap-highlight-color": "rgba(0,0,0,0)"
				}, e.style);
				this.container =
					b = l("div", {
						id: h
					}, v, this.renderToClone || b);
				this._cursor = b.style.cursor;
				this.renderer = new(a[e.renderer] || Q)(b, f, g, null, e.forExport, c.exporting && c.exporting.allowHTML);
				this.setClassName(e.className);
				this.renderer.setStyle(e.style);
				this.renderer.chartIndex = this.index
			},
			getMargins: function (a) {
				var c = this.spacing,
					d = this.margin,
					e = this.titleOffset;
				this.resetMargins();
				e && !b(d[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + c[0]));
				this.legend.display && this.legend.adjustMargins(d, c);
				this.extraBottomMargin &&
					(this.marginBottom += this.extraBottomMargin);
				this.extraTopMargin && (this.plotTop += this.extraTopMargin);
				a || this.getAxisMargins()
			},
			getAxisMargins: function () {
				var a = this,
					c = a.axisOffset = [0, 0, 0, 0],
					d = a.margin;
				a.hasCartesianSeries && h(a.axes, function (a) {
					a.visible && a.getOffset()
				});
				h(y, function (e, f) {
					b(d[f]) || (a[e] += c[f])
				});
				a.setChartSize()
			},
			reflow: function (a) {
				var c = this,
					d = c.options.chart,
					f = c.renderTo,
					g = b(d.width),
					h = d.width || e(f, "width"),
					d = d.height || e(f, "height"),
					f = a ? a.target : O;
				if (!g && !c.isPrinting && h && d && (f ===
						O || f === r)) {
					if (h !== c.containerWidth || d !== c.containerHeight) clearTimeout(c.reflowTimeout), c.reflowTimeout = I(function () {
						c.container && c.setSize(void 0, void 0, !1)
					}, a ? 100 : 0);
					c.containerWidth = h;
					c.containerHeight = d
				}
			},
			initReflow: function () {
				var a = this,
					b;
				b = D(O, "resize", function (b) {
					a.reflow(b)
				});
				D(a, "destroy", b)
			},
			setSize: function (b, c, d) {
				var e = this,
					v = e.renderer;
				e.isResizing += 1;
				a.setAnimation(d, e);
				e.oldChartHeight = e.chartHeight;
				e.oldChartWidth = e.chartWidth;
				void 0 !== b && (e.options.chart.width = b);
				void 0 !== c && (e.options.chart.height =
					c);
				e.getChartSize();
				b = v.globalAnimation;
				(b ? C : f)(e.container, {
					width: e.chartWidth + "px",
					height: e.chartHeight + "px"
				}, b);
				e.setChartSize(!0);
				v.setSize(e.chartWidth, e.chartHeight, d);
				h(e.axes, function (a) {
					a.isDirty = !0;
					a.setScale()
				});
				e.isDirtyLegend = !0;
				e.isDirtyBox = !0;
				e.layOutTitles();
				e.getMargins();
				e.setResponsive && e.setResponsive(!1);
				e.redraw(d);
				e.oldChartHeight = null;
				g(e, "resize");
				I(function () {
					e && g(e, "endResize", null, function () {
						--e.isResizing
					})
				}, F(b).duration)
			},
			setChartSize: function (a) {
				var b = this.inverted,
					c = this.renderer,
					d = this.chartWidth,
					e = this.chartHeight,
					f = this.options.chart,
					g = this.spacing,
					v = this.clipOffset,
					n, G, q, w;
				this.plotLeft = n = Math.round(this.plotLeft);
				this.plotTop = G = Math.round(this.plotTop);
				this.plotWidth = q = Math.max(0, Math.round(d - n - this.marginRight));
				this.plotHeight = w = Math.max(0, Math.round(e - G - this.marginBottom));
				this.plotSizeX = b ? w : q;
				this.plotSizeY = b ? q : w;
				this.plotBorderWidth = f.plotBorderWidth || 0;
				this.spacingBox = c.spacingBox = {
					x: g[3],
					y: g[0],
					width: d - g[3] - g[1],
					height: e - g[0] - g[2]
				};
				this.plotBox =
					c.plotBox = {
						x: n,
						y: G,
						width: q,
						height: w
					};
				d = 2 * Math.floor(this.plotBorderWidth / 2);
				b = Math.ceil(Math.max(d, v[3]) / 2);
				c = Math.ceil(Math.max(d, v[0]) / 2);
				this.clipBox = {
					x: b,
					y: c,
					width: Math.floor(this.plotSizeX - Math.max(d, v[1]) / 2 - b),
					height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, v[2]) / 2 - c))
				};
				a || h(this.axes, function (a) {
					a.setAxisSize();
					a.setAxisTranslation()
				})
			},
			resetMargins: function () {
				var a = this,
					b = a.options.chart;
				h(["margin", "spacing"], function (c) {
					var d = b[c],
						e = u(d) ? d : [d, d, d, d];
					h(["Top", "Right", "Bottom", "Left"],
						function (d, f) {
							a[c][f] = E(b[c + d], e[f])
						})
				});
				h(y, function (b, c) {
					a[b] = E(a.margin[c], a.spacing[c])
				});
				a.axisOffset = [0, 0, 0, 0];
				a.clipOffset = [0, 0, 0, 0]
			},
			drawChartBox: function () {
				var a = this.options.chart,
					b = this.renderer,
					c = this.chartWidth,
					d = this.chartHeight,
					e = this.chartBackground,
					f = this.plotBackground,
					g = this.plotBorder,
					h, v = this.plotBGImage,
					n = a.backgroundColor,
					G = a.plotBackgroundColor,
					q = a.plotBackgroundImage,
					w, k = this.plotLeft,
					u = this.plotTop,
					K = this.plotWidth,
					x = this.plotHeight,
					y = this.plotBox,
					l = this.clipRect,
					z = this.clipBox,
					B = "animate";
				e || (this.chartBackground = e = b.rect().addClass("highcharts-background").add(), B = "attr");
				h = a.borderWidth || 0;
				w = h + (a.shadow ? 8 : 0);
				n = {
					fill: n || "none"
				};
				if (h || e["stroke-width"]) n.stroke = a.borderColor, n["stroke-width"] = h;
				e.attr(n).shadow(a.shadow);
				e[B]({
					x: w / 2,
					y: w / 2,
					width: c - w - h % 2,
					height: d - w - h % 2,
					r: a.borderRadius
				});
				B = "animate";
				f || (B = "attr", this.plotBackground = f = b.rect().addClass("highcharts-plot-background").add());
				f[B](y);
				f.attr({
					fill: G || "none"
				}).shadow(a.plotShadow);
				q && (v ? v.animate(y) : this.plotBGImage =
					b.image(q, k, u, K, x).add());
				l ? l.animate({
					width: z.width,
					height: z.height
				}) : this.clipRect = b.clipRect(z);
				B = "animate";
				g || (B = "attr", this.plotBorder = g = b.rect().addClass("highcharts-plot-border").attr({
					zIndex: 1
				}).add());
				g.attr({
					stroke: a.plotBorderColor,
					"stroke-width": a.plotBorderWidth || 0,
					fill: "none"
				});
				g[B](g.crisp({
					x: k,
					y: u,
					width: K,
					height: x
				}, -g.strokeWidth()));
				this.isDirtyBox = !1
			},
			propFromSeries: function () {
				var a = this,
					b = a.options.chart,
					c, d = a.options.series,
					e, f;
				h(["inverted", "angular", "polar"], function (g) {
					c = K[b.type ||
						b.defaultSeriesType];
					f = b[g] || c && c.prototype[g];
					for (e = d && d.length; !f && e--;)(c = K[d[e].type]) && c.prototype[g] && (f = !0);
					a[g] = f
				})
			},
			linkSeries: function () {
				var a = this,
					b = a.series;
				h(b, function (a) {
					a.linkedSeries.length = 0
				});
				h(b, function (b) {
					var c = b.options.linkedTo;
					d(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = E(b.options.visible, c.options.visible, b.visible))
				})
			},
			renderSeries: function () {
				h(this.series, function (a) {
					a.translate();
					a.render()
				})
			},
			renderLabels: function () {
				var a = this,
					b = a.options.labels;
				b.items && h(b.items, function (c) {
					var d = q(b.style, c.style),
						e = G(d.left) + a.plotLeft,
						f = G(d.top) + a.plotTop + 12;
					delete d.left;
					delete d.top;
					a.renderer.text(c.html, e, f).attr({
						zIndex: 2
					}).css(d).add()
				})
			},
			render: function () {
				var a = this.axes,
					b = this.renderer,
					c = this.options,
					d, e, f;
				this.setTitle();
				this.legend = new A(this, c.legend);
				this.getStacks && this.getStacks();
				this.getMargins(!0);
				this.setChartSize();
				c = this.plotWidth;
				d = this.plotHeight -= 21;
				h(a, function (a) {
					a.setScale()
				});
				this.getAxisMargins();
				e = 1.1 < c / this.plotWidth;
				f = 1.05 < d / this.plotHeight;
				if (e || f) h(a, function (a) {
					(a.horiz && e || !a.horiz && f) && a.setTickInterval(!0)
				}), this.getMargins();
				this.drawChartBox();
				this.hasCartesianSeries && h(a, function (a) {
					a.visible && a.render()
				});
				this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
					zIndex: 3
				}).add());
				this.renderSeries();
				this.renderLabels();
				this.addCredits();
				this.setResponsive && this.setResponsive();
				this.hasRendered = !0
			},
			addCredits: function (a) {
				var b = this;
				a = x(!0, this.options.credits,
					a);
				a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
					a.href && (O.location.href = a.href)
				}).attr({
					align: a.position.align,
					zIndex: 8
				}).css(a.style).add().align(a.position), this.credits.update = function (a) {
					b.credits = b.credits.destroy();
					b.addCredits(a)
				})
			},
			destroy: function () {
				var b = this,
					c = b.axes,
					d = b.series,
					e = b.container,
					f, n = e && e.parentNode;
				g(b, "destroy");
				k[b.index] = void 0;
				a.chartCount--;
				b.renderTo.removeAttribute("data-highcharts-chart");
				v(b);
				for (f = c.length; f--;) c[f] = c[f].destroy();
				this.scroller && this.scroller.destroy && this.scroller.destroy();
				for (f = d.length; f--;) d[f] = d[f].destroy();
				h("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
					var c = b[a];
					c && c.destroy && (b[a] = c.destroy())
				});
				e && (e.innerHTML = "", v(e), n && p(e));
				for (f in b) delete b[f]
			},
			isReadyToRender: function () {
				var a = this;
				return w || O != O.top || "complete" ===
					r.readyState ? !0 : (r.attachEvent("onreadystatechange", function () {
						r.detachEvent("onreadystatechange", a.firstRender);
						"complete" === r.readyState && a.firstRender()
					}), !1)
			},
			firstRender: function () {
				var a = this,
					b = a.options;
				if (a.isReadyToRender()) {
					a.getContainer();
					g(a, "init");
					a.resetMargins();
					a.setChartSize();
					a.propFromSeries();
					a.getAxes();
					h(b.series || [], function (b) {
						a.initSeries(b)
					});
					a.linkSeries();
					g(a, "beforeRender");
					J && (a.pointer = new J(a, b));
					a.render();
					a.renderer.draw();
					if (!a.renderer.imgCount && a.onload) a.onload();
					a.cloneRenderTo(!0)
				}
			},
			onload: function () {
				h([this.callback].concat(this.callbacks), function (a) {
					a && void 0 !== this.index && a.apply(this, [this])
				}, this);
				g(this, "load");
				!1 !== this.options.chart.reflow && this.initReflow();
				this.onload = null
			}
		}
	})(M);
	(function (a) {
		var D, C = a.each,
			F = a.extend,
			H = a.erase,
			r = a.fireEvent,
			m = a.format,
			l = a.isArray,
			t = a.isNumber,
			p = a.pick,
			k = a.removeEvent;
		D = a.Point = function () {};
		D.prototype = {
			init: function (a, b, h) {
				this.series = a;
				this.color = a.color;
				this.applyOptions(b, h);
				a.options.colorByPoint ? (b = a.options.colors ||
					a.chart.options.colors, this.color = this.color || b[a.colorCounter], b = b.length, h = a.colorCounter, a.colorCounter++, a.colorCounter === b && (a.colorCounter = 0)) : h = a.colorIndex;
				this.colorIndex = p(this.colorIndex, h);
				a.chart.pointCount++;
				return this
			},
			applyOptions: function (a, b) {
				var f = this.series,
					k = f.options.pointValKey || f.pointValKey;
				a = D.prototype.optionsToObject.call(this, a);
				F(this, a);
				this.options = this.options ? F(this.options, a) : a;
				a.group && delete this.group;
				k && (this.y = this[k]);
				this.isNull = p(this.isValid && !this.isValid(),
					null === this.x || !t(this.y, !0));
				this.selected && (this.state = "select");
				"name" in this && void 0 === b && f.xAxis && f.xAxis.hasNames && (this.x = f.xAxis.nameToX(this));
				void 0 === this.x && f && (this.x = void 0 === b ? f.autoIncrement(this) : b);
				return this
			},
			optionsToObject: function (a) {
				var b = {},
					f = this.series,
					k = f.options.keys,
					q = k || f.pointArrayMap || ["y"],
					g = q.length,
					e = 0,
					c = 0;
				if (t(a) || null === a) b[q[0]] = a;
				else if (l(a))
					for (!k && a.length > g && (f = typeof a[0], "string" === f ? b.name = a[0] : "number" === f && (b.x = a[0]), e++); c < g;) k && void 0 === a[e] || (b[q[c]] =
						a[e]), e++, c++;
				else "object" === typeof a && (b = a, a.dataLabels && (f._hasPointLabels = !0), a.marker && (f._hasPointMarkers = !0));
				return b
			},
			getClassName: function () {
				return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "")
			},
			getZone: function () {
				var a = this.series,
					b = a.zones,
					a = a.zoneAxis || "y",
					h = 0,
					k;
				for (k =
					b[h]; this[a] >= k.value;) k = b[++h];
				k && k.color && !this.options.color && (this.color = k.color);
				return k
			},
			destroy: function () {
				var a = this.series.chart,
					b = a.hoverPoints,
					h;
				a.pointCount--;
				b && (this.setState(), H(b, this), b.length || (a.hoverPoints = null));
				if (this === a.hoverPoint) this.onMouseOut();
				if (this.graphic || this.dataLabel) k(this), this.destroyElements();
				this.legendItem && a.legend.destroyItem(this);
				for (h in this) this[h] = null
			},
			destroyElements: function () {
				for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"],
						b, h = 6; h--;) b = a[h], this[b] && (this[b] = this[b].destroy())
			},
			getLabelConfig: function () {
				return {
					x: this.category,
					y: this.y,
					color: this.color,
					key: this.name || this.category,
					series: this.series,
					point: this,
					percentage: this.percentage,
					total: this.total || this.stackTotal
				}
			},
			tooltipFormatter: function (a) {
				var b = this.series,
					f = b.tooltipOptions,
					k = p(f.valueDecimals, ""),
					q = f.valuePrefix || "",
					g = f.valueSuffix || "";
				C(b.pointArrayMap || ["y"], function (b) {
					b = "{point." + b;
					if (q || g) a = a.replace(b + "}", q + b + "}" + g);
					a = a.replace(b + "}", b + ":,." + k + "f}")
				});
				return m(a, {
					point: this,
					series: this.series
				})
			},
			firePointEvent: function (a, b, h) {
				var f = this,
					k = this.series.options;
				(k.point.events[a] || f.options && f.options.events && f.options.events[a]) && this.importEvents();
				"click" === a && k.allowPointSelect && (h = function (a) {
					f.select && f.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
				});
				r(this, a, b, h)
			},
			visible: !0
		}
	})(M);
	(function (a) {
		var D = a.addEvent,
			C = a.animObject,
			F = a.arrayMax,
			H = a.arrayMin,
			r = a.correctFloat,
			m = a.Date,
			l = a.defaultOptions,
			t = a.defaultPlotOptions,
			p = a.defined,
			k = a.each,
			f =
			a.erase,
			b = a.error,
			h = a.extend,
			z = a.fireEvent,
			q = a.grep,
			g = a.isArray,
			e = a.isNumber,
			c = a.isString,
			n = a.merge,
			u = a.pick,
			d = a.removeEvent,
			A = a.splat,
			y = a.stableSort,
			x = a.SVGElement,
			J = a.syncTimeout,
			E = a.win;
		a.Series = a.seriesType("line", null, {
			lineWidth: 2,
			allowPointSelect: !1,
			showCheckbox: !1,
			animation: {
				duration: 1E3
			},
			events: {},
			marker: {
				lineWidth: 0,
				lineColor: "#ffffff",
				radius: 4,
				states: {
					hover: {
						animation: {
							duration: 50
						},
						enabled: !0,
						radiusPlus: 2,
						lineWidthPlus: 1
					},
					select: {
						fillColor: "#cccccc",
						lineColor: "#000000",
						lineWidth: 2
					}
				}
			},
			point: {
				events: {}
			},
			dataLabels: {
				align: "center",
				formatter: function () {
					return null === this.y ? "" : a.numberFormat(this.y, -1)
				},
				style: {
					fontSize: "11px",
					fontWeight: "bold",
					color: "contrast",
					textOutline: "1px contrast"
				},
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				padding: 5
			},
			cropThreshold: 300,
			pointRange: 0,
			softThreshold: !0,
			states: {
				hover: {
					lineWidthPlus: 1,
					marker: {},
					halo: {
						size: 10,
						opacity: .25
					}
				},
				select: {
					marker: {}
				}
			},
			stickyTracking: !0,
			turboThreshold: 1E3
		}, {
			isCartesian: !0,
			pointClass: a.Point,
			sorted: !0,
			requireSorting: !0,
			directTouch: !1,
			axisTypes: ["xAxis", "yAxis"],
			colorCounter: 0,
			parallelArrays: ["x", "y"],
			coll: "series",
			init: function (a, b) {
				var c = this,
					d, e, f = a.series,
					g, v = function (a, b) {
						return u(a.options.index, a._i) - u(b.options.index, b._i)
					};
				c.chart = a;
				c.options = b = c.setOptions(b);
				c.linkedSeries = [];
				c.bindAxes();
				h(c, {
					name: b.name,
					state: "",
					visible: !1 !== b.visible,
					selected: !0 === b.selected
				});
				e = b.events;
				for (d in e) D(c, d, e[d]);
				if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
				c.getColor();
				c.getSymbol();
				k(c.parallelArrays, function (a) {
					c[a +
						"Data"] = []
				});
				c.setData(b.data, !1);
				c.isCartesian && (a.hasCartesianSeries = !0);
				f.length && (g = f[f.length - 1]);
				c._i = u(g && g._i, -1) + 1;
				f.push(c);
				y(f, v);
				this.yAxis && y(this.yAxis.series, v);
				k(f, function (a, b) {
					a.index = b;
					a.name = a.name || "Series " + (b + 1)
				})
			},
			bindAxes: function () {
				var a = this,
					c = a.options,
					d = a.chart,
					e;
				k(a.axisTypes || [], function (f) {
					k(d[f], function (b) {
						e = b.options;
						if (c[f] === e.index || void 0 !== c[f] && c[f] === e.id || void 0 === c[f] && 0 === e.index) b.series.push(a), a[f] = b, b.isDirty = !0
					});
					a[f] || a.optionalAxis === f || b(18, !0)
				})
			},
			updateParallelArrays: function (a, b) {
				var c = a.series,
					d = arguments,
					f = e(b) ? function (d) {
						var e = "y" === d && c.toYData ? c.toYData(a) : a[d];
						c[d + "Data"][b] = e
					} : function (a) {
						Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
					};
				k(c.parallelArrays, f)
			},
			autoIncrement: function () {
				var a = this.options,
					b = this.xIncrement,
					c, d = a.pointIntervalUnit,
					b = u(b, a.pointStart, 0);
				this.pointInterval = c = u(this.pointInterval, a.pointInterval, 1);
				d && (a = new m(b), "day" === d ? a = +a[m.hcSetDate](a[m.hcGetDate]() + c) : "month" === d ? a = +a[m.hcSetMonth](a[m.hcGetMonth]() +
					c) : "year" === d && (a = +a[m.hcSetFullYear](a[m.hcGetFullYear]() + c)), c = a - b);
				this.xIncrement = b + c;
				return b
			},
			setOptions: function (a) {
				var b = this.chart,
					c = b.options.plotOptions,
					b = b.userOptions || {},
					d = b.plotOptions || {},
					e = c[this.type];
				this.userOptions = a;
				c = n(e, c.series, a);
				this.tooltipOptions = n(l.tooltip, l.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip);
				null === e.marker && delete c.marker;
				this.zoneAxis = c.zoneAxis;
				a = this.zones = (c.zones || []).slice();
				!c.negativeColor &&
					!c.negativeFillColor || c.zones || a.push({
						value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
						className: "highcharts-negative",
						color: c.negativeColor,
						fillColor: c.negativeFillColor
					});
				a.length && p(a[a.length - 1].value) && a.push({
					color: this.color,
					fillColor: this.fillColor
				});
				return c
			},
			getCyclic: function (a, b, c) {
				var d, e = this.userOptions,
					f = a + "Index",
					g = a + "Counter",
					h = c ? c.length : u(this.chart.options.chart[a + "Count"], this.chart[a + "Count"]);
				b || (d = u(e[f], e["_" + f]), p(d) || (e["_" + f] = d = this.chart[g] % h, this.chart[g] += 1), c &&
					(b = c[d]));
				void 0 !== d && (this[f] = d);
				this[a] = b
			},
			getColor: function () {
				this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || t[this.type].color, this.chart.options.colors)
			},
			getSymbol: function () {
				this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
			setData: function (a, d, f, h) {
				var v = this,
					n = v.points,
					q = n && n.length || 0,
					G, x = v.options,
					y = v.chart,
					l = null,
					A = v.xAxis,
					z = x.turboThreshold,
					m = this.xData,
					K = this.yData,
					J = (G = v.pointArrayMap) && G.length;
				a = a || [];
				G = a.length;
				d = u(d, !0);
				if (!1 !== h && G && q === G && !v.cropped && !v.hasGroupedData && v.visible) k(a, function (a, b) {
					n[b].update && a !== x.data[b] && n[b].update(a, !1, null, !1)
				});
				else {
					v.xIncrement = null;
					v.colorCounter = 0;
					k(this.parallelArrays, function (a) {
						v[a + "Data"].length = 0
					});
					if (z && G > z) {
						for (f = 0; null === l && f < G;) l = a[f], f++;
						if (e(l))
							for (f = 0; f < G; f++) m[f] = this.autoIncrement(), K[f] = a[f];
						else if (g(l))
							if (J)
								for (f = 0; f < G; f++) l = a[f], m[f] = l[0], K[f] = l.slice(1, J + 1);
							else
								for (f = 0; f < G; f++) l = a[f], m[f] =
									l[0], K[f] = l[1];
						else b(12)
					} else
						for (f = 0; f < G; f++) void 0 !== a[f] && (l = {
							series: v
						}, v.pointClass.prototype.applyOptions.apply(l, [a[f]]), v.updateParallelArrays(l, f));
					c(K[0]) && b(14, !0);
					v.data = [];
					v.options.data = v.userOptions.data = a;
					for (f = q; f--;) n[f] && n[f].destroy && n[f].destroy();
					A && (A.minRange = A.userMinRange);
					v.isDirty = y.isDirtyBox = !0;
					v.isDirtyData = !!n;
					f = !1
				}
				"point" === x.legendType && (this.processData(), this.generatePoints());
				d && y.redraw(f)
			},
			processData: function (a) {
				var c = this.xData,
					d = this.yData,
					e = c.length,
					f;
				f =
					0;
				var g, h, n = this.xAxis,
					k, q = this.options;
				k = q.cropThreshold;
				var u = this.getExtremesFromAll || q.getExtremesFromAll,
					G = this.isCartesian,
					q = n && n.val2lin,
					x = n && n.isLog,
					l, y;
				if (G && !this.isDirty && !n.isDirty && !this.yAxis.isDirty && !a) return !1;
				n && (a = n.getExtremes(), l = a.min, y = a.max);
				if (G && this.sorted && !u && (!k || e > k || this.forceCrop))
					if (c[e - 1] < l || c[0] > y) c = [], d = [];
					else if (c[0] < l || c[e - 1] > y) f = this.cropData(this.xData, this.yData, l, y), c = f.xData, d = f.yData, f = f.start, g = !0;
				for (k = c.length || 1; --k;) e = x ? q(c[k]) - q(c[k - 1]) : c[k] - c[k -
					1], 0 < e && (void 0 === h || e < h) ? h = e : 0 > e && this.requireSorting && b(15);
				this.cropped = g;
				this.cropStart = f;
				this.processedXData = c;
				this.processedYData = d;
				this.closestPointRange = h
			},
			cropData: function (a, b, c, d) {
				var e = a.length,
					f = 0,
					g = e,
					h = u(this.cropShoulder, 1),
					v;
				for (v = 0; v < e; v++)
					if (a[v] >= c) {
						f = Math.max(0, v - h);
						break
					}
				for (c = v; c < e; c++)
					if (a[c] > d) {
						g = c + h;
						break
					}
				return {
					xData: a.slice(f, g),
					yData: b.slice(f, g),
					start: f,
					end: g
				}
			},
			generatePoints: function () {
				var a = this.options.data,
					b = this.data,
					c, d = this.processedXData,
					e = this.processedYData,
					f = this.pointClass,
					g = d.length,
					h = this.cropStart || 0,
					n, k = this.hasGroupedData,
					q, u = [],
					x;
				b || k || (b = [], b.length = a.length, b = this.data = b);
				for (x = 0; x < g; x++) n = h + x, k ? (q = (new f).init(this, [d[x]].concat(A(e[x]))), q.dataGroup = this.groupMap[x]) : (q = b[n]) || void 0 === a[n] || (b[n] = q = (new f).init(this, a[n], d[x])), q.index = n, u[x] = q;
				if (b && (g !== (c = b.length) || k))
					for (x = 0; x < c; x++) x !== h || k || (x += g), b[x] && (b[x].destroyElements(), b[x].plotX = void 0);
				this.data = b;
				this.points = u
			},
			getExtremes: function (a) {
				var b = this.yAxis,
					c = this.processedXData,
					d, f = [],
					h = 0;
				d = this.xAxis.getExtremes();
				var n = d.min,
					k = d.max,
					q, x, u, l;
				a = a || this.stackedYData || this.processedYData || [];
				d = a.length;
				for (l = 0; l < d; l++)
					if (x = c[l], u = a[l], q = (e(u, !0) || g(u)) && (!b.isLog || u.length || 0 < u), x = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[l + 1] || x) >= n && (c[l - 1] || x) <= k, q && x)
						if (q = u.length)
							for (; q--;) null !== u[q] && (f[h++] = u[q]);
						else f[h++] = u;
				this.dataMin = H(f);
				this.dataMax = F(f)
			},
			translate: function () {
				this.processedXData || this.processData();
				this.generatePoints();
				var a =
					this.options,
					b = a.stacking,
					c = this.xAxis,
					d = c.categories,
					f = this.yAxis,
					g = this.points,
					h = g.length,
					n = !!this.modifyValue,
					k = a.pointPlacement,
					q = "between" === k || e(k),
					x = a.threshold,
					l = a.startFromThreshold ? x : 0,
					y, A, z, m, J = Number.MAX_VALUE;
				"between" === k && (k = .5);
				e(k) && (k *= u(a.pointRange || c.pointRange));
				for (a = 0; a < h; a++) {
					var E = g[a],
						t = E.x,
						C = E.y;
					A = E.low;
					var D = b && f.stacks[(this.negStacks && C < (l ? 0 : x) ? "-" : "") + this.stackKey],
						F;
					f.isLog && null !== C && 0 >= C && (E.isNull = !0);
					E.plotX = y = r(Math.min(Math.max(-1E5, c.translate(t, 0, 0, 0, 1, k,
						"flags" === this.type)), 1E5));
					b && this.visible && !E.isNull && D && D[t] && (m = this.getStackIndicator(m, t, this.index), F = D[t], C = F.points[m.key], A = C[0], C = C[1], A === l && m.key === D[t].base && (A = u(x, f.min)), f.isLog && 0 >= A && (A = null), E.total = E.stackTotal = F.total, E.percentage = F.total && E.y / F.total * 100, E.stackY = C, F.setOffset(this.pointXOffset || 0, this.barW || 0));
					E.yBottom = p(A) ? f.translate(A, 0, 1, 0, 1) : null;
					n && (C = this.modifyValue(C, E));
					E.plotY = A = "number" === typeof C && Infinity !== C ? Math.min(Math.max(-1E5, f.translate(C, 0, 1, 0, 1)), 1E5) :
						void 0;
					E.isInside = void 0 !== A && 0 <= A && A <= f.len && 0 <= y && y <= c.len;
					E.clientX = q ? r(c.translate(t, 0, 0, 0, 1, k)) : y;
					E.negative = E.y < (x || 0);
					E.category = d && void 0 !== d[E.x] ? d[E.x] : E.x;
					E.isNull || (void 0 !== z && (J = Math.min(J, Math.abs(y - z))), z = y)
				}
				this.closestPointRangePx = J
			},
			getValidPoints: function (a, b) {
				var c = this.chart;
				return q(a || this.points || [], function (a) {
					return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
				})
			},
			setClip: function (a) {
				var b = this.chart,
					c = this.options,
					d = b.renderer,
					e = b.inverted,
					f = this.clipBox,
					g = f || b.clipBox,
					h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(),
					n = b[h],
					k = b[h + "m"];
				n || (a && (g.width = 0, b[h + "m"] = k = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[h] = n = d.clipRect(g), n.count = {
					length: 0
				});
				a && !n.count[this.index] && (n.count[this.index] = !0, n.count.length += 1);
				!1 !== c.clip && (this.group.clip(a || f ? n : b.clipRect), this.markerGroup.clip(k), this.sharedClipKey = h);
				a || (n.count[this.index] && (delete n.count[this.index], --n.count.length),
					0 === n.count.length && h && b[h] && (f || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
			},
			animate: function (a) {
				var b = this.chart,
					c = C(this.options.animation),
					d;
				a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
					width: b.plotSizeX
				}, c), b[d + "m"] && b[d + "m"].animate({
					width: b.plotSizeX + 99
				}, c), this.animate = null)
			},
			afterAnimate: function () {
				this.setClip();
				z(this, "afterAnimate")
			},
			drawPoints: function () {
				var a = this.points,
					b = this.chart,
					c, d, f, g, h = this.options.marker,
					n, k, q, x, l = this.markerGroup,
					y = u(h.enabled,
						this.xAxis.isRadial ? !0 : null, this.closestPointRangePx > 2 * h.radius);
				if (!1 !== h.enabled || this._hasPointMarkers)
					for (d = a.length; d--;) f = a[d], c = f.plotY, g = f.graphic, n = f.marker || {}, k = !!f.marker, q = y && void 0 === n.enabled || n.enabled, x = f.isInside, q && e(c) && null !== f.y ? (c = u(n.symbol, this.symbol), f.hasImage = 0 === c.indexOf("url"), q = this.markerAttribs(f, f.selected && "select"), g ? g[x ? "show" : "hide"](!0).animate(q) : x && (0 < q.width || f.hasImage) && (f.graphic = g = b.renderer.symbol(c, q.x, q.y, q.width, q.height, k ? n : h).add(l)), g && g.attr(this.pointAttribs(f,
						f.selected && "select")), g && g.addClass(f.getClassName(), !0)) : g && (f.graphic = g.destroy())
			},
			markerAttribs: function (a, b) {
				var c = this.options.marker,
					d = a && a.options,
					e = d && d.marker || {},
					d = u(e.radius, c.radius);
				b && (c = c.states[b], b = e.states && e.states[b], d = u(b && b.radius, c && c.radius, d + (c && c.radiusPlus || 0)));
				a.hasImage && (d = 0);
				a = {
					x: Math.floor(a.plotX) - d,
					y: a.plotY - d
				};
				d && (a.width = a.height = 2 * d);
				return a
			},
			pointAttribs: function (a, b) {
				var c = this.options.marker,
					d = a && a.options,
					e = d && d.marker || {},
					f = this.color,
					g = d && d.color,
					h = a &&
					a.color,
					d = u(e.lineWidth, c.lineWidth),
					n;
				a && this.zones.length && (a = a.getZone()) && a.color && (n = a.color);
				f = g || n || h || f;
				n = e.fillColor || c.fillColor || f;
				f = e.lineColor || c.lineColor || f;
				b && (c = c.states[b], b = e.states && e.states[b] || {}, d = u(b.lineWidth, c.lineWidth, d + u(b.lineWidthPlus, c.lineWidthPlus, 0)), n = b.fillColor || c.fillColor || n, f = b.lineColor || c.lineColor || f);
				return {
					stroke: f,
					"stroke-width": d,
					fill: n
				}
			},
			destroy: function () {
				var a = this,
					b = a.chart,
					c = /AppleWebKit\/533/.test(E.navigator.userAgent),
					e, g = a.data || [],
					h, n, q;
				z(a,
					"destroy");
				d(a);
				k(a.axisTypes || [], function (b) {
					(q = a[b]) && q.series && (f(q.series, a), q.isDirty = q.forceRedraw = !0)
				});
				a.legendItem && a.chart.legend.destroyItem(a);
				for (e = g.length; e--;)(h = g[e]) && h.destroy && h.destroy();
				a.points = null;
				clearTimeout(a.animationTimeout);
				for (n in a) a[n] instanceof x && !a[n].survive && (e = c && "group" === n ? "hide" : "destroy", a[n][e]());
				b.hoverSeries === a && (b.hoverSeries = null);
				f(b.series, a);
				for (n in a) delete a[n]
			},
			getGraphPath: function (a, b, c) {
				var d = this,
					e = d.options,
					f = e.step,
					g, h = [],
					n = [],
					q;
				a = a ||
					d.points;
				(g = a.reversed) && a.reverse();
				(f = {
					right: 1,
					center: 2
				}[f] || f && 3) && g && (f = 4 - f);
				!e.connectNulls || b || c || (a = this.getValidPoints(a));
				k(a, function (g, k) {
					var v = g.plotX,
						x = g.plotY,
						u = a[k - 1];
					(g.leftCliff || u && u.rightCliff) && !c && (q = !0);
					g.isNull && !p(b) && 0 < k ? q = !e.connectNulls : g.isNull && !b ? q = !0 : (0 === k || q ? k = ["M", g.plotX, g.plotY] : d.getPointSpline ? k = d.getPointSpline(a, g, k) : f ? (k = 1 === f ? ["L", u.plotX, x] : 2 === f ? ["L", (u.plotX + v) / 2, u.plotY, "L", (u.plotX + v) / 2, x] : ["L", v, u.plotY], k.push("L", v, x)) : k = ["L", v, x], n.push(g.x), f && n.push(g.x),
						h.push.apply(h, k), q = !1)
				});
				h.xMap = n;
				return d.graphPath = h
			},
			drawGraph: function () {
				var a = this,
					b = this.options,
					c = (this.gappedPath || this.getGraphPath).call(this),
					d = [
						["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
					];
				k(this.zones, function (c, e) {
					d.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle])
				});
				k(d, function (d, e) {
					var f = d[0],
						g = a[f];
					g ? (g.endX = c.xMap, g.animate({
						d: c
					})) : c.length && (a[f] = a.chart.renderer.path(c).addClass(d[1]).attr({
							zIndex: 1
						}).add(a.group),
						g = {
							stroke: d[2],
							"stroke-width": b.lineWidth,
							fill: a.fillGraph && a.color || "none"
						}, d[3] ? g.dashstyle = d[3] : "square" !== b.linecap && (g["stroke-linecap"] = g["stroke-linejoin"] = "round"), g = a[f].attr(g).shadow(2 > e && b.shadow));
					g && (g.startX = c.xMap, g.isArea = c.isArea)
				})
			},
			applyZones: function () {
				var a = this,
					b = this.chart,
					c = b.renderer,
					d = this.zones,
					e, f, g = this.clips || [],
					h, n = this.graph,
					q = this.area,
					x = Math.max(b.chartWidth, b.chartHeight),
					l = this[(this.zoneAxis || "y") + "Axis"],
					y, A, m = b.inverted,
					z, E, J, p, r = !1;
				d.length && (n || q) && l && void 0 !==
					l.min && (A = l.reversed, z = l.horiz, n && n.hide(), q && q.hide(), y = l.getExtremes(), k(d, function (d, k) {
						e = A ? z ? b.plotWidth : 0 : z ? 0 : l.toPixels(y.min);
						e = Math.min(Math.max(u(f, e), 0), x);
						f = Math.min(Math.max(Math.round(l.toPixels(u(d.value, y.max), !0)), 0), x);
						r && (e = f = l.toPixels(y.max));
						E = Math.abs(e - f);
						J = Math.min(e, f);
						p = Math.max(e, f);
						l.isXAxis ? (h = {
							x: m ? p : J,
							y: 0,
							width: E,
							height: x
						}, z || (h.x = b.plotHeight - h.x)) : (h = {
							x: 0,
							y: m ? p : J,
							width: x,
							height: E
						}, z && (h.y = b.plotWidth - h.y));
						m && c.isVML && (h = l.isXAxis ? {
							x: 0,
							y: A ? J : p,
							height: h.width,
							width: b.chartWidth
						} : {
							x: h.y - b.plotLeft - b.spacingBox.x,
							y: 0,
							width: h.height,
							height: b.chartHeight
						});
						g[k] ? g[k].animate(h) : (g[k] = c.clipRect(h), n && a["zone-graph-" + k].clip(g[k]), q && a["zone-area-" + k].clip(g[k]));
						r = d.value > y.max
					}), this.clips = g)
			},
			invertGroups: function (a) {
				function b() {
					var b = {
						width: c.yAxis.len,
						height: c.xAxis.len
					};
					k(["group", "markerGroup"], function (d) {
						c[d] && c[d].attr(b).invert(a)
					})
				}
				var c = this,
					d;
				c.xAxis && (d = D(c.chart, "resize", b), D(c, "destroy", d), b(a), c.invertGroups = b)
			},
			plotGroup: function (a, b, c, d, e) {
				var f = this[a],
					g = !f;
				g && (this[a] = f = this.chart.renderer.g(b).attr({
					zIndex: d || .1
				}).add(e), f.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
				f.attr({
					visibility: c
				})[g ? "attr" : "animate"](this.getPlotBox());
				return f
			},
			getPlotBox: function () {
				var a = this.chart,
					b = this.xAxis,
					c = this.yAxis;
				a.inverted && (b = c, c = this.xAxis);
				return {
					translateX: b ? b.left : a.plotLeft,
					translateY: c ? c.top : a.plotTop,
					scaleX: 1,
					scaleY: 1
				}
			},
			render: function () {
				var a = this,
					b = a.chart,
					c, d = a.options,
					e = !!a.animate && b.renderer.isSVG && C(d.animation).duration,
					f = a.visible ? "inherit" : "hidden",
					g = d.zIndex,
					h = a.hasRendered,
					n = b.seriesGroup,
					k = b.inverted;
				c = a.plotGroup("group", "series", f, g, n);
				a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, n);
				e && a.animate(!0);
				c.inverted = a.isCartesian ? k : !1;
				a.drawGraph && (a.drawGraph(), a.applyZones());
				a.drawDataLabels && a.drawDataLabels();
				a.visible && a.drawPoints();
				a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
				a.invertGroups(k);
				!1 === d.clip || a.sharedClipKey || h || c.clip(b.clipRect);
				e && a.animate();
				h || (a.animationTimeout = J(function () {
					a.afterAnimate()
				}, e));
				a.isDirty = a.isDirtyData = !1;
				a.hasRendered = !0
			},
			redraw: function () {
				var a = this.chart,
					b = this.isDirty || this.isDirtyData,
					c = this.group,
					d = this.xAxis,
					e = this.yAxis;
				c && (a.inverted && c.attr({
					width: a.plotWidth,
					height: a.plotHeight
				}), c.animate({
					translateX: u(d && d.left, a.plotLeft),
					translateY: u(e && e.top, a.plotTop)
				}));
				this.translate();
				this.render();
				b && delete this.kdTree
			},
			kdDimensions: 1,
			kdAxisArray: ["clientX",
				"plotY"
			],
			searchPoint: function (a, b) {
				var c = this.xAxis,
					d = this.yAxis,
					e = this.chart.inverted;
				return this.searchKDTree({
					clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
					plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
				}, b)
			},
			buildKDTree: function () {
				function a(c, d, e) {
					var f, g;
					if (g = c && c.length) return f = b.kdAxisArray[d % e], c.sort(function (a, b) {
						return a[f] - b[f]
					}), g = Math.floor(g / 2), {
						point: c[g],
						left: a(c.slice(0, g), d + 1, e),
						right: a(c.slice(g + 1), d + 1, e)
					}
				}
				var b = this,
					c = b.kdDimensions;
				delete b.kdTree;
				J(function () {
					b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c)
				}, b.options.kdNow ? 0 : 1)
			},
			searchKDTree: function (a, b) {
				function c(a, b, h, n) {
					var k = b.point,
						q = d.kdAxisArray[h % n],
						x, u, v = k;
					u = p(a[e]) && p(k[e]) ? Math.pow(a[e] - k[e], 2) : null;
					x = p(a[f]) && p(k[f]) ? Math.pow(a[f] - k[f], 2) : null;
					x = (u || 0) + (x || 0);
					k.dist = p(x) ? Math.sqrt(x) : Number.MAX_VALUE;
					k.distX = p(u) ? Math.sqrt(u) : Number.MAX_VALUE;
					q = a[q] - k[q];
					x = 0 > q ? "left" : "right";
					u = 0 > q ? "right" : "left";
					b[x] && (x = c(a, b[x], h + 1, n), v = x[g] < v[g] ? x : k);
					b[u] && Math.sqrt(q * q) < v[g] && (a = c(a, b[u], h + 1, n), v = a[g] < v[g] ? a : v);
					return v
				}
				var d =
					this,
					e = this.kdAxisArray[0],
					f = this.kdAxisArray[1],
					g = b ? "distX" : "dist";
				this.kdTree || this.buildKDTree();
				if (this.kdTree) return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
			}
		})
	})(M);
	(function (a) {
		function D(a, f, b, h, l) {
			var k = a.chart.inverted;
			this.axis = a;
			this.isNegative = b;
			this.options = f;
			this.x = h;
			this.total = null;
			this.points = {};
			this.stack = l;
			this.rightCliff = this.leftCliff = 0;
			this.alignOptions = {
				align: f.align || (k ? b ? "left" : "right" : "center"),
				verticalAlign: f.verticalAlign || (k ? "middle" : b ? "bottom" : "top"),
				y: p(f.y,
					k ? 4 : b ? 14 : -6),
				x: p(f.x, k ? b ? -6 : 6 : 0)
			};
			this.textAlign = f.textAlign || (k ? b ? "right" : "left" : "center")
		}
		var C = a.Axis,
			F = a.Chart,
			H = a.correctFloat,
			r = a.defined,
			m = a.destroyObjectProperties,
			l = a.each,
			t = a.format,
			p = a.pick;
		a = a.Series;
		D.prototype = {
			destroy: function () {
				m(this, this.axis)
			},
			render: function (a) {
				var f = this.options,
					b = f.format,
					b = b ? t(b, this) : f.formatter.call(this);
				this.label ? this.label.attr({
					text: b,
					visibility: "hidden"
				}) : this.label = this.axis.chart.renderer.text(b, null, null, f.useHTML).css(f.style).attr({
					align: this.textAlign,
					rotation: f.rotation,
					visibility: "hidden"
				}).add(a)
			},
			setOffset: function (a, f) {
				var b = this.axis,
					h = b.chart,
					k = h.inverted,
					q = b.reversed,
					q = this.isNegative && !q || !this.isNegative && q,
					g = b.translate(b.usePercentage ? 100 : this.total, 0, 0, 0, 1),
					b = b.translate(0),
					b = Math.abs(g - b);
				a = h.xAxis[0].translate(this.x) + a;
				var e = h.plotHeight,
					k = {
						x: k ? q ? g : g - b : a,
						y: k ? e - a - f : q ? e - g - b : e - g,
						width: k ? b : f,
						height: k ? f : b
					};
				if (f = this.label) f.align(this.alignOptions, null, k), k = f.alignAttr, f[!1 === this.options.crop || h.isInsidePlot(k.x, k.y) ? "show" : "hide"](!0)
			}
		};
		F.prototype.getStacks = function () {
			var a = this;
			l(a.yAxis, function (a) {
				a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
			});
			l(a.series, function (f) {
				!f.options.stacking || !0 !== f.visible && !1 !== a.options.chart.ignoreHiddenSeries || (f.stackKey = f.type + p(f.options.stack, ""))
			})
		};
		C.prototype.buildStacks = function () {
			var a = this.series,
				f, b = p(this.options.reversedStacks, !0),
				h = a.length,
				l;
			if (!this.isXAxis) {
				this.usePercentage = !1;
				for (l = h; l--;) a[b ? l : h - l - 1].setStackedPoints();
				for (l = h; l--;) f = a[b ? l : h - l - 1], f.setStackCliffs &&
					f.setStackCliffs();
				if (this.usePercentage)
					for (l = 0; l < h; l++) a[l].setPercentStacks()
			}
		};
		C.prototype.renderStackTotals = function () {
			var a = this.chart,
				f = a.renderer,
				b = this.stacks,
				h, l, q = this.stackTotalGroup;
			q || (this.stackTotalGroup = q = f.g("stack-labels").attr({
				visibility: "visible",
				zIndex: 6
			}).add());
			q.translate(a.plotLeft, a.plotTop);
			for (h in b)
				for (l in a = b[h], a) a[l].render(q)
		};
		C.prototype.resetStacks = function () {
			var a = this.stacks,
				f, b;
			if (!this.isXAxis)
				for (f in a)
					for (b in a[f]) a[f][b].touched < this.stacksTouched ? (a[f][b].destroy(),
						delete a[f][b]) : (a[f][b].total = null, a[f][b].cum = null)
		};
		C.prototype.cleanStacks = function () {
			var a, f, b;
			if (!this.isXAxis)
				for (f in this.oldStacks && (a = this.stacks = this.oldStacks), a)
					for (b in a[f]) a[f][b].cum = a[f][b].total
		};
		a.prototype.setStackedPoints = function () {
			if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
				var a = this.processedXData,
					f = this.processedYData,
					b = [],
					h = f.length,
					l = this.options,
					q = l.threshold,
					g = l.startFromThreshold ? q : 0,
					e = l.stack,
					l = l.stacking,
					c = this.stackKey,
					n = "-" + c,
					u = this.negStacks,
					d = this.yAxis,
					A = d.stacks,
					y = d.oldStacks,
					x, m, E, G, v, K, t;
				d.stacksTouched += 1;
				for (v = 0; v < h; v++) K = a[v], t = f[v], x = this.getStackIndicator(x, K, this.index), G = x.key, E = (m = u && t < (g ? 0 : q)) ? n : c, A[E] || (A[E] = {}), A[E][K] || (y[E] && y[E][K] ? (A[E][K] = y[E][K], A[E][K].total = null) : A[E][K] = new D(d, d.options.stackLabels, m, K, e)), E = A[E][K], null !== t && (E.points[G] = E.points[this.index] = [p(E.cum, g)], r(E.cum) || (E.base = G), E.touched = d.stacksTouched, 0 < x.index && !1 === this.singleStacks && (E.points[G][0] = E.points[this.index +
					"," + K + ",0"][0])), "percent" === l ? (m = m ? c : n, u && A[m] && A[m][K] ? (m = A[m][K], E.total = m.total = Math.max(m.total, E.total) + Math.abs(t) || 0) : E.total = H(E.total + (Math.abs(t) || 0))) : E.total = H(E.total + (t || 0)), E.cum = p(E.cum, g) + (t || 0), null !== t && (E.points[G].push(E.cum), b[v] = E.cum);
				"percent" === l && (d.usePercentage = !0);
				this.stackedYData = b;
				d.oldStacks = {}
			}
		};
		a.prototype.setPercentStacks = function () {
			var a = this,
				f = a.stackKey,
				b = a.yAxis.stacks,
				h = a.processedXData,
				m;
			l([f, "-" + f], function (f) {
				for (var g = h.length, e, c; g--;)
					if (e = h[g], m = a.getStackIndicator(m,
							e, a.index, f), e = (c = b[f] && b[f][e]) && c.points[m.key]) c = c.total ? 100 / c.total : 0, e[0] = H(e[0] * c), e[1] = H(e[1] * c), a.stackedYData[g] = e[1]
			})
		};
		a.prototype.getStackIndicator = function (a, f, b, h) {
			!r(a) || a.x !== f || h && a.key !== h ? a = {
				x: f,
				index: 0,
				key: h
			} : a.index++;
			a.key = [b, f, a.index].join();
			return a
		}
	})(M);
	(function (a) {
		var D = a.addEvent,
			C = a.animate,
			F = a.Axis,
			H = a.createElement,
			r = a.css,
			m = a.defined,
			l = a.each,
			t = a.erase,
			p = a.extend,
			k = a.fireEvent,
			f = a.inArray,
			b = a.isNumber,
			h = a.isObject,
			z = a.merge,
			q = a.pick,
			g = a.Point,
			e = a.Series,
			c = a.seriesTypes,
			n = a.setAnimation,
			u = a.splat;
		p(a.Chart.prototype, {
			addSeries: function (a, b, c) {
				var d, e = this;
				a && (b = q(b, !0), k(e, "addSeries", {
					options: a
				}, function () {
					d = e.initSeries(a);
					e.isDirtyLegend = !0;
					e.linkSeries();
					b && e.redraw(c)
				}));
				return d
			},
			addAxis: function (a, b, c, e) {
				var d = b ? "xAxis" : "yAxis",
					f = this.options;
				a = z(a, {
					index: this[d].length,
					isX: b
				});
				new F(this, a);
				f[d] = u(f[d] || {});
				f[d].push(a);
				q(c, !0) && this.redraw(e)
			},
			showLoading: function (a) {
				var b = this,
					c = b.options,
					d = b.loadingDiv,
					e = c.loading,
					f = function () {
						d && r(d, {
							left: b.plotLeft +
								"px",
							top: b.plotTop + "px",
							width: b.plotWidth + "px",
							height: b.plotHeight + "px"
						})
					};
				d || (b.loadingDiv = d = H("div", {
					className: "highcharts-loading highcharts-loading-hidden"
				}, null, b.container), b.loadingSpan = H("span", {
					className: "highcharts-loading-inner"
				}, null, d), D(b, "redraw", f));
				d.className = "highcharts-loading";
				b.loadingSpan.innerHTML = a || c.lang.loading;
				r(d, p(e.style, {
					zIndex: 10
				}));
				r(b.loadingSpan, e.labelStyle);
				b.loadingShown || (r(d, {
					opacity: 0,
					display: ""
				}), C(d, {
					opacity: e.style.opacity || .5
				}, {
					duration: e.showDuration ||
						0
				}));
				b.loadingShown = !0;
				f()
			},
			hideLoading: function () {
				var a = this.options,
					b = this.loadingDiv;
				b && (b.className = "highcharts-loading highcharts-loading-hidden", C(b, {
					opacity: 0
				}, {
					duration: a.loading.hideDuration || 100,
					complete: function () {
						r(b, {
							display: "none"
						})
					}
				}));
				this.loadingShown = !1
			},
			propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
			propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "),
			update: function (a, c) {
				var d, e = {
						credits: "addCredits",
						title: "setTitle",
						subtitle: "setSubtitle"
					},
					g = a.chart,
					h, n;
				if (g) {
					z(!0, this.options.chart, g);
					"className" in g && this.setClassName(g.className);
					if ("inverted" in g || "polar" in g) this.propFromSeries(), h = !0;
					for (d in g) g.hasOwnProperty(d) && (-1 !== f("chart." + d, this.propsRequireUpdateSeries) && (n = !0), -1 !== f(d, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
					"style" in g && this.renderer.setStyle(g.style)
				}
				for (d in a) {
					if (this[d] && "function" === typeof this[d].update) this[d].update(a[d], !1);
					else if ("function" === typeof this[e[d]]) this[e[d]](a[d]);
					"chart" !== d && -1 !== f(d, this.propsRequireUpdateSeries) && (n = !0)
				}
				a.colors && (this.options.colors = a.colors);
				a.plotOptions && z(!0, this.options.plotOptions, a.plotOptions);
				l(["xAxis", "yAxis", "series"], function (b) {
					a[b] && l(u(a[b]), function (a) {
						var c = m(a.id) && this.get(a.id) || this[b][0];
						c && c.coll === b && c.update(a, !1)
					}, this)
				}, this);
				h && l(this.axes, function (a) {
					a.update({}, !1)
				});
				n && l(this.series, function (a) {
					a.update({}, !1)
				});
				a.loading && z(!0, this.options.loading, a.loading);
				d = g && g.width;
				g = g && g.height;
				b(d) && d !== this.chartWidth || b(g) && g !== this.chartHeight ? this.setSize(d, g) : q(c, !0) && this.redraw()
			},
			setSubtitle: function (a) {
				this.setTitle(void 0, a)
			}
		});
		p(g.prototype, {
			update: function (a, b, c, e) {
				function d() {
					f.applyOptions(a);
					null === f.y && n && (f.graphic = n.destroy());
					h(a, !0) && (n && n.element && a && a.marker && a.marker.symbol && (f.graphic = n.destroy()),
						a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()));
					k = f.index;
					g.updateParallelArrays(f, k);
					u.data[k] = h(u.data[k], !0) ? f.options : a;
					g.isDirty = g.isDirtyData = !0;
					!g.fixedBox && g.hasCartesianSeries && (l.isDirtyBox = !0);
					"point" === u.legendType && (l.isDirtyLegend = !0);
					b && l.redraw(c)
				}
				var f = this,
					g = f.series,
					n = f.graphic,
					k, l = g.chart,
					u = g.options;
				b = q(b, !0);
				!1 === e ? d() : f.firePointEvent("update", {
					options: a
				}, d)
			},
			remove: function (a, b) {
				this.series.removePoint(f(this, this.series.data), a, b)
			}
		});
		p(e.prototype, {
			addPoint: function (a,
				b, c, e) {
				var d = this.options,
					f = this.data,
					g = this.chart,
					h = this.xAxis && this.xAxis.names,
					n = d.data,
					k, l, u = this.xData,
					x, y;
				b = q(b, !0);
				k = {
					series: this
				};
				this.pointClass.prototype.applyOptions.apply(k, [a]);
				y = k.x;
				x = u.length;
				if (this.requireSorting && y < u[x - 1])
					for (l = !0; x && u[x - 1] > y;) x--;
				this.updateParallelArrays(k, "splice", x, 0, 0);
				this.updateParallelArrays(k, x);
				h && k.name && (h[y] = k.name);
				n.splice(x, 0, a);
				l && (this.data.splice(x, 0, null), this.processData());
				"point" === d.legendType && this.generatePoints();
				c && (f[0] && f[0].remove ?
					f[0].remove(!1) : (f.shift(), this.updateParallelArrays(k, "shift"), n.shift()));
				this.isDirtyData = this.isDirty = !0;
				b && g.redraw(e)
			},
			removePoint: function (a, b, c) {
				var d = this,
					e = d.data,
					f = e[a],
					g = d.points,
					h = d.chart,
					k = function () {
						g && g.length === e.length && g.splice(a, 1);
						e.splice(a, 1);
						d.options.data.splice(a, 1);
						d.updateParallelArrays(f || {
							series: d
						}, "splice", a, 1);
						f && f.destroy();
						d.isDirty = !0;
						d.isDirtyData = !0;
						b && h.redraw()
					};
				n(c, h);
				b = q(b, !0);
				f ? f.firePointEvent("remove", null, k) : k()
			},
			remove: function (a, b, c) {
				function d() {
					e.destroy();
					f.isDirtyLegend = f.isDirtyBox = !0;
					f.linkSeries();
					q(a, !0) && f.redraw(b)
				}
				var e = this,
					f = e.chart;
				!1 !== c ? k(e, "remove", null, d) : d()
			},
			update: function (a, b) {
				var d = this,
					e = this.chart,
					f = this.userOptions,
					g = this.type,
					h = a.type || f.type || e.options.chart.type,
					n = c[g].prototype,
					k = ["group", "markerGroup", "dataLabelsGroup"],
					u;
				if (h && h !== g || void 0 !== a.zIndex) k.length = 0;
				l(k, function (a) {
					k[a] = d[a];
					delete d[a]
				});
				a = z(f, {
					animation: !1,
					index: this.index,
					pointStart: this.xData[0]
				}, {
					data: this.options.data
				}, a);
				this.remove(!1, null, !1);
				for (u in n) this[u] =
					void 0;
				p(this, c[h || g].prototype);
				l(k, function (a) {
					d[a] = k[a]
				});
				this.init(e, a);
				e.linkSeries();
				q(b, !0) && e.redraw(!1)
			}
		});
		p(F.prototype, {
			update: function (a, b) {
				var c = this.chart;
				a = c.options[this.coll][this.options.index] = z(this.userOptions, a);
				this.destroy(!0);
				this.init(c, p(a, {
					events: void 0
				}));
				c.isDirtyBox = !0;
				q(b, !0) && c.redraw()
			},
			remove: function (a) {
				for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--;) d[e] && d[e].remove(!1);
				t(b.axes, this);
				t(b[c], this);
				b.options[c].splice(this.options.index, 1);
				l(b[c],
					function (a, b) {
						a.options.index = b
					});
				this.destroy();
				b.isDirtyBox = !0;
				q(a, !0) && b.redraw()
			},
			setTitle: function (a, b) {
				this.update({
					title: a
				}, b)
			},
			setCategories: function (a, b) {
				this.update({
					categories: a
				}, b)
			}
		})
	})(M);
	(function (a) {
		var D = a.color,
			C = a.each,
			F = a.map,
			H = a.pick,
			r = a.Series,
			m = a.seriesType;
		m("area", "line", {
			softThreshold: !1,
			threshold: 0
		}, {
			singleStacks: !1,
			getStackPoints: function () {
				var a = [],
					m = [],
					p = this.xAxis,
					k = this.yAxis,
					f = k.stacks[this.stackKey],
					b = {},
					h = this.points,
					z = this.index,
					q = k.series,
					g = q.length,
					e, c = H(k.options.reversedStacks, !0) ? 1 : -1,
					n, u;
				if (this.options.stacking) {
					for (n = 0; n < h.length; n++) b[h[n].x] = h[n];
					for (u in f) null !== f[u].total && m.push(u);
					m.sort(function (a, b) {
						return a - b
					});
					e = F(q, function () {
						return this.visible
					});
					C(m, function (d, h) {
						var q = 0,
							u, l;
						if (b[d] && !b[d].isNull) a.push(b[d]), C([-1, 1], function (a) {
							var q = 1 === a ? "rightNull" : "leftNull",
								k = 0,
								x = f[m[h + a]];
							if (x)
								for (n = z; 0 <= n && n < g;) u = x.points[n], u || (n === z ? b[d][q] = !0 : e[n] && (l = f[d].points[n]) && (k -= l[1] - l[0])), n += c;
							b[d][1 === a ? "rightCliff" : "leftCliff"] = k
						});
						else {
							for (n = z; 0 <= n && n < g;) {
								if (u =
									f[d].points[n]) {
									q = u[1];
									break
								}
								n += c
							}
							q = k.toPixels(q, !0);
							a.push({
								isNull: !0,
								plotX: p.toPixels(d, !0),
								plotY: q,
								yBottom: q
							})
						}
					})
				}
				return a
			},
			getGraphPath: function (a) {
				var l = r.prototype.getGraphPath,
					m = this.options,
					k = m.stacking,
					f = this.yAxis,
					b, h, z = [],
					q = [],
					g = this.index,
					e, c = f.stacks[this.stackKey],
					n = m.threshold,
					u = f.getThreshold(m.threshold),
					d, m = m.connectNulls || "percent" === k,
					A = function (b, d, h) {
						var l = a[b];
						b = k && c[l.x].points[g];
						var x = l[h + "Null"] || 0;
						h = l[h + "Cliff"] || 0;
						var v, m, l = !0;
						h || x ? (v = (x ? b[0] : b[1]) + h, m = b[0] + h, l = !!x) : !k &&
							a[d] && a[d].isNull && (v = m = n);
						void 0 !== v && (q.push({
							plotX: e,
							plotY: null === v ? u : f.getThreshold(v),
							isNull: l
						}), z.push({
							plotX: e,
							plotY: null === m ? u : f.getThreshold(m),
							doCurve: !1
						}))
					};
				a = a || this.points;
				k && (a = this.getStackPoints());
				for (b = 0; b < a.length; b++)
					if (h = a[b].isNull, e = H(a[b].rectPlotX, a[b].plotX), d = H(a[b].yBottom, u), !h || m) m || A(b, b - 1, "left"), h && !k && m || (q.push(a[b]), z.push({
						x: b,
						plotX: e,
						plotY: d
					})), m || A(b, b + 1, "right");
				b = l.call(this, q, !0, !0);
				z.reversed = !0;
				h = l.call(this, z, !0, !0);
				h.length && (h[0] = "L");
				h = b.concat(h);
				l =
					l.call(this, q, !1, m);
				h.xMap = b.xMap;
				this.areaPath = h;
				return l
			},
			drawGraph: function () {
				this.areaPath = [];
				r.prototype.drawGraph.apply(this);
				var a = this,
					m = this.areaPath,
					p = this.options,
					k = [
						["area", "highcharts-area", this.color, p.fillColor]
					];
				C(this.zones, function (f, b) {
					k.push(["zone-area-" + b, "highcharts-area highcharts-zone-area-" + b + " " + f.className, f.color || a.color, f.fillColor || p.fillColor])
				});
				C(k, function (f) {
					var b = f[0],
						h = a[b];
					h ? (h.endX = m.xMap, h.animate({
						d: m
					})) : (h = a[b] = a.chart.renderer.path(m).addClass(f[1]).attr({
						fill: H(f[3],
							D(f[2]).setOpacity(H(p.fillOpacity, .75)).get()),
						zIndex: 0
					}).add(a.group), h.isArea = !0);
					h.startX = m.xMap;
					h.shiftUnit = p.step ? 2 : 1
				})
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
		})
	})(M);
	(function (a) {
		var D = a.pick;
		a = a.seriesType;
		a("spline", "line", {}, {
			getPointSpline: function (a, F, H) {
				var r = F.plotX,
					m = F.plotY,
					l = a[H - 1];
				H = a[H + 1];
				var t, p, k, f;
				if (l && !l.isNull && !1 !== l.doCurve && H && !H.isNull && !1 !== H.doCurve) {
					a = l.plotY;
					k = H.plotX;
					H = H.plotY;
					var b = 0;
					t = (1.5 * r + l.plotX) / 2.5;
					p = (1.5 * m + a) / 2.5;
					k = (1.5 * r + k) / 2.5;
					f = (1.5 * m + H) / 2.5;
					k !== t && (b = (f - p) * (k - r) / (k - t) + m - f);
					p += b;
					f += b;
					p > a && p > m ? (p = Math.max(a, m), f = 2 * m - p) : p < a && p < m && (p = Math.min(a, m), f = 2 * m - p);
					f > H && f > m ? (f = Math.max(H, m), p = 2 * m - f) : f < H && f < m && (f = Math.min(H, m), p = 2 * m - f);
					F.rightContX = k;
					F.rightContY = f
				}
				F = ["C", D(l.rightContX, l.plotX), D(l.rightContY, l.plotY), D(t, r), D(p, m), r, m];
				l.rightContX = l.rightContY = null;
				return F
			}
		})
	})(M);
	(function (a) {
		var D = a.seriesTypes.area.prototype,
			C = a.seriesType;
		C("areaspline", "spline", a.defaultPlotOptions.area, {
			getStackPoints: D.getStackPoints,
			getGraphPath: D.getGraphPath,
			setStackCliffs: D.setStackCliffs,
			drawGraph: D.drawGraph,
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
		})
	})(M);
	(function (a) {
		var D = a.animObject,
			C = a.color,
			F = a.each,
			H = a.extend,
			r = a.isNumber,
			m = a.merge,
			l = a.pick,
			t = a.Series,
			p = a.seriesType,
			k = a.svg;
		p("column", "line", {
			borderRadius: 0,
			groupPadding: .2,
			marker: null,
			pointPadding: .1,
			minPointLength: 0,
			cropThreshold: 50,
			pointRange: null,
			states: {
				hover: {
					halo: !1,
					brightness: .1,
					shadow: !1
				},
				select: {
					color: "#cccccc",
					borderColor: "#000000",
					shadow: !1
				}
			},
			dataLabels: {
				align: null,
				verticalAlign: null,
				y: null
			},
			softThreshold: !1,
			startFromThreshold: !0,
			stickyTracking: !1,
			tooltip: {
				distance: 6
			},
			threshold: 0,
			borderColor: "#ffffff"
		}, {
			cropShoulder: 0,
			directTouch: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			negStacks: !0,
			init: function () {
				t.prototype.init.apply(this, arguments);
				var a = this,
					b = a.chart;
				b.hasRendered && F(b.series, function (b) {
					b.type === a.type && (b.isDirty = !0)
				})
			},
			getColumnMetrics: function () {
				var a = this,
					b = a.options,
					h = a.xAxis,
					k = a.yAxis,
					q = h.reversed,
					g, e = {},
					c = 0;
				!1 === b.grouping ? c = 1 : F(a.chart.series, function (b) {
					var d =
						b.options,
						f = b.yAxis,
						h;
					b.type === a.type && b.visible && k.len === f.len && k.pos === f.pos && (d.stacking ? (g = b.stackKey, void 0 === e[g] && (e[g] = c++), h = e[g]) : !1 !== d.grouping && (h = c++), b.columnIndex = h)
				});
				var n = Math.min(Math.abs(h.transA) * (h.ordinalSlope || b.pointRange || h.closestPointRange || h.tickInterval || 1), h.len),
					u = n * b.groupPadding,
					d = (n - 2 * u) / c,
					b = Math.min(b.maxPointWidth || h.len, l(b.pointWidth, d * (1 - 2 * b.pointPadding)));
				a.columnMetrics = {
					width: b,
					offset: (d - b) / 2 + (u + ((a.columnIndex || 0) + (q ? 1 : 0)) * d - n / 2) * (q ? -1 : 1)
				};
				return a.columnMetrics
			},
			crispCol: function (a, b, h, k) {
				var f = this.chart,
					g = this.borderWidth,
					e = -(g % 2 ? .5 : 0),
					g = g % 2 ? .5 : 1;
				f.inverted && f.renderer.isVML && (g += 1);
				h = Math.round(a + h) + e;
				a = Math.round(a) + e;
				k = Math.round(b + k) + g;
				e = .5 >= Math.abs(b) && .5 < k;
				b = Math.round(b) + g;
				k -= b;
				e && k && (--b, k += 1);
				return {
					x: a,
					y: b,
					width: h - a,
					height: k
				}
			},
			translate: function () {
				var a = this,
					b = a.chart,
					h = a.options,
					k = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
					k = a.borderWidth = l(h.borderWidth, k ? 0 : 1),
					q = a.yAxis,
					g = a.translatedThreshold = q.getThreshold(h.threshold),
					e = l(h.minPointLength,
						5),
					c = a.getColumnMetrics(),
					n = c.width,
					u = a.barW = Math.max(n, 1 + 2 * k),
					d = a.pointXOffset = c.offset;
				b.inverted && (g -= .5);
				h.pointPadding && (u = Math.ceil(u));
				t.prototype.translate.apply(a);
				F(a.points, function (c) {
					var f = l(c.yBottom, g),
						h = 999 + Math.abs(f),
						h = Math.min(Math.max(-h, c.plotY), q.len + h),
						k = c.plotX + d,
						m = u,
						z = Math.min(h, f),
						v, p = Math.max(h, f) - z;
					Math.abs(p) < e && e && (p = e, v = !q.reversed && !c.negative || q.reversed && c.negative, z = Math.abs(z - g) > e ? f - e : g - (v ? e : 0));
					c.barX = k;
					c.pointWidth = n;
					c.tooltipPos = b.inverted ? [q.len + q.pos - b.plotLeft -
						h, a.xAxis.len - k - m / 2, p
					] : [k + m / 2, h + q.pos - b.plotTop, p];
					c.shapeType = "rect";
					c.shapeArgs = a.crispCol.apply(a, c.isNull ? [c.plotX, q.len / 2, 0, 0] : [k, z, m, p])
				})
			},
			getSymbol: a.noop,
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
			drawGraph: function () {
				this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
			},
			pointAttribs: function (a, b) {
				var f = this.options,
					k = this.pointAttrToOptions || {},
					q = k.stroke || "borderColor",
					g = k["stroke-width"] || "borderWidth",
					e = a && a.color || this.color,
					c = a[q] || f[q] || this.color || e,
					k =
					f.dashStyle,
					n;
				a && this.zones.length && (e = (e = a.getZone()) && e.color || a.options.color || this.color);
				b && (b = f.states[b], n = b.brightness, e = b.color || void 0 !== n && C(e).brighten(b.brightness).get() || e, c = b[q] || c, k = b.dashStyle || k);
				a = {
					fill: e,
					stroke: c,
					"stroke-width": a[g] || f[g] || this[g] || 0
				};
				f.borderRadius && (a.r = f.borderRadius);
				k && (a.dashstyle = k);
				return a
			},
			drawPoints: function () {
				var a = this,
					b = this.chart,
					h = a.options,
					k = b.renderer,
					q = h.animationLimit || 250,
					g;
				F(a.points, function (e) {
					var c = e.graphic;
					if (r(e.plotY) && null !== e.y) {
						g =
							e.shapeArgs;
						if (c) c[b.pointCount < q ? "animate" : "attr"](m(g));
						else e.graphic = c = k[e.shapeType](g).attr({
							"class": e.getClassName()
						}).add(e.group || a.group);
						c.attr(a.pointAttribs(e, e.selected && "select")).shadow(h.shadow, null, h.stacking && !h.borderRadius)
					} else c && (e.graphic = c.destroy())
				})
			},
			animate: function (a) {
				var b = this,
					f = this.yAxis,
					l = b.options,
					q = this.chart.inverted,
					g = {};
				k && (a ? (g.scaleY = .001, a = Math.min(f.pos + f.len, Math.max(f.pos, f.toPixels(l.threshold))), q ? g.translateX = a - f.len : g.translateY = a, b.group.attr(g)) :
					(g[q ? "translateX" : "translateY"] = f.pos, b.group.animate(g, H(D(b.options.animation), {
						step: function (a, c) {
							b.group.attr({
								scaleY: Math.max(.001, c.pos)
							})
						}
					})), b.animate = null))
			},
			remove: function () {
				var a = this,
					b = a.chart;
				b.hasRendered && F(b.series, function (b) {
					b.type === a.type && (b.isDirty = !0)
				});
				t.prototype.remove.apply(a, arguments)
			}
		})
	})(M);
	(function (a) {
		a = a.seriesType;
		a("bar", "column", null, {
			inverted: !0
		})
	})(M);
	(function (a) {
		var D = a.Series;
		a = a.seriesType;
		a("scatter", "line", {
			lineWidth: 0,
			marker: {
				enabled: !0
			},
			tooltip: {
				headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
				pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
			}
		}, {
			sorted: !1,
			requireSorting: !1,
			noSharedTooltip: !0,
			trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
			takeOrdinalPosition: !1,
			kdDimensions: 2,
			drawGraph: function () {
				this.options.lineWidth && D.prototype.drawGraph.call(this)
			}
		})
	})(M);
	(function (a) {
		var D = a.pick,
			C = a.relativeLength;
		a.CenteredSeriesMixin = {
			getCenter: function () {
				var a = this.options,
					H = this.chart,
					r = 2 * (a.slicedOffset || 0),
					m = H.plotWidth - 2 * r,
					H = H.plotHeight -
					2 * r,
					l = a.center,
					l = [D(l[0], "50%"), D(l[1], "50%"), a.size || "100%", a.innerSize || 0],
					t = Math.min(m, H),
					p, k;
				for (p = 0; 4 > p; ++p) k = l[p], a = 2 > p || 2 === p && /%$/.test(k), l[p] = C(k, [m, H, t, l[2]][p]) + (a ? r : 0);
				l[3] > l[2] && (l[3] = l[2]);
				return l
			}
		}
	})(M);
	(function (a) {
		var D = a.addEvent,
			C = a.defined,
			F = a.each,
			H = a.extend,
			r = a.inArray,
			m = a.noop,
			l = a.pick,
			t = a.Point,
			p = a.Series,
			k = a.seriesType,
			f = a.setAnimation;
		k("pie", "line", {
			center: [null, null],
			clip: !1,
			colorByPoint: !0,
			dataLabels: {
				distance: 30,
				enabled: !0,
				formatter: function () {
					return null === this.y ?
						void 0 : this.point.name
				},
				x: 0
			},
			ignoreHiddenPoint: !0,
			legendType: "point",
			marker: null,
			size: null,
			showInLegend: !1,
			slicedOffset: 10,
			stickyTracking: !1,
			tooltip: {
				followPointer: !0
			},
			borderColor: "#ffffff",
			borderWidth: 1,
			states: {
				hover: {
					brightness: .1,
					shadow: !1
				}
			}
		}, {
			isCartesian: !1,
			requireSorting: !1,
			directTouch: !0,
			noSharedTooltip: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			axisTypes: [],
			pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
			animate: function (a) {
				var b = this,
					f = b.points,
					k = b.startAngleRad;
				a || (F(f, function (a) {
					var e =
						a.graphic,
						c = a.shapeArgs;
					e && (e.attr({
						r: a.startR || b.center[3] / 2,
						start: k,
						end: k
					}), e.animate({
						r: c.r,
						start: c.start,
						end: c.end
					}, b.options.animation))
				}), b.animate = null)
			},
			updateTotals: function () {
				var a, f = 0,
					k = this.points,
					q = k.length,
					g, e = this.options.ignoreHiddenPoint;
				for (a = 0; a < q; a++) g = k[a], 0 > g.y && (g.y = null), f += e && !g.visible ? 0 : g.y;
				this.total = f;
				for (a = 0; a < q; a++) g = k[a], g.percentage = 0 < f && (g.visible || !e) ? g.y / f * 100 : 0, g.total = f
			},
			generatePoints: function () {
				p.prototype.generatePoints.call(this);
				this.updateTotals()
			},
			translate: function (a) {
				this.generatePoints();
				var b = 0,
					f = this.options,
					k = f.slicedOffset,
					g = k + (f.borderWidth || 0),
					e, c, n, u = f.startAngle || 0,
					d = this.startAngleRad = Math.PI / 180 * (u - 90),
					u = (this.endAngleRad = Math.PI / 180 * (l(f.endAngle, u + 360) - 90)) - d,
					m = this.points,
					y = f.dataLabels.distance,
					f = f.ignoreHiddenPoint,
					x, p = m.length,
					E;
				a || (this.center = a = this.getCenter());
				this.getX = function (b, c) {
					n = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + y), 1));
					return a[0] + (c ? -1 : 1) * Math.cos(n) * (a[2] / 2 + y)
				};
				for (x = 0; x < p; x++) {
					E = m[x];
					e = d + b * u;
					if (!f || E.visible) b += E.percentage / 100;
					c = d + b * u;
					E.shapeType =
						"arc";
					E.shapeArgs = {
						x: a[0],
						y: a[1],
						r: a[2] / 2,
						innerR: a[3] / 2,
						start: Math.round(1E3 * e) / 1E3,
						end: Math.round(1E3 * c) / 1E3
					};
					n = (c + e) / 2;
					n > 1.5 * Math.PI ? n -= 2 * Math.PI : n < -Math.PI / 2 && (n += 2 * Math.PI);
					E.slicedTranslation = {
						translateX: Math.round(Math.cos(n) * k),
						translateY: Math.round(Math.sin(n) * k)
					};
					e = Math.cos(n) * a[2] / 2;
					c = Math.sin(n) * a[2] / 2;
					E.tooltipPos = [a[0] + .7 * e, a[1] + .7 * c];
					E.half = n < -Math.PI / 2 || n > Math.PI / 2 ? 1 : 0;
					E.angle = n;
					g = Math.min(g, y / 5);
					E.labelPos = [a[0] + e + Math.cos(n) * y, a[1] + c + Math.sin(n) * y, a[0] + e + Math.cos(n) * g, a[1] + c + Math.sin(n) *
						g, a[0] + e, a[1] + c, 0 > y ? "center" : E.half ? "right" : "left", n
					]
				}
			},
			drawGraph: null,
			drawPoints: function () {
				var a = this,
					f = a.chart.renderer,
					k, q, g, e, c = a.options.shadow;
				c && !a.shadowGroup && (a.shadowGroup = f.g("shadow").add(a.group));
				F(a.points, function (b) {
					if (null !== b.y) {
						q = b.graphic;
						e = b.shapeArgs;
						k = b.sliced ? b.slicedTranslation : {};
						var h = b.shadowGroup;
						c && !h && (h = b.shadowGroup = f.g("shadow").add(a.shadowGroup));
						h && h.attr(k);
						g = a.pointAttribs(b, b.selected && "select");
						q ? q.setRadialReference(a.center).attr(g).animate(H(e, k)) : (b.graphic =
							q = f[b.shapeType](e).addClass(b.getClassName()).setRadialReference(a.center).attr(k).add(a.group), b.visible || q.attr({
								visibility: "hidden"
							}), q.attr(g).attr({
								"stroke-linejoin": "round"
							}).shadow(c, h))
					}
				})
			},
			searchPoint: m,
			sortByAngle: function (a, f) {
				a.sort(function (a, b) {
					return void 0 !== a.angle && (b.angle - a.angle) * f
				})
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
			getCenter: a.CenteredSeriesMixin.getCenter,
			getSymbol: m
		}, {
			init: function () {
				t.prototype.init.apply(this, arguments);
				var a = this,
					f;
				a.name = l(a.name, "Slice");
				f = function (b) {
					a.slice("select" === b.type)
				};
				D(a, "select", f);
				D(a, "unselect", f);
				return a
			},
			setVisible: function (a, f) {
				var b = this,
					h = b.series,
					g = h.chart,
					e = h.options.ignoreHiddenPoint;
				f = l(f, e);
				a !== b.visible && (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a, h.options.data[r(b, h.data)] = b.options, F(["graphic", "dataLabel", "connector", "shadowGroup"], function (c) {
					if (b[c]) b[c][a ? "show" : "hide"](!0)
				}), b.legendItem && g.legend.colorizeItem(b, a), a || "hover" !== b.state || b.setState(""), e && (h.isDirty = !0), f && g.redraw())
			},
			slice: function (a, h, k) {
				var b = this.series;
				f(k, b.chart);
				l(h, !0);
				this.sliced = this.options.sliced = a = C(a) ? a : !this.sliced;
				b.options.data[r(this, b.data)] = this.options;
				a = a ? this.slicedTranslation : {
					translateX: 0,
					translateY: 0
				};
				this.graphic.animate(a);
				this.shadowGroup && this.shadowGroup.animate(a)
			},
			haloPath: function (a) {
				var b = this.shapeArgs;
				return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(b.x, b.y, b.r + a, b.r + a, {
					innerR: this.shapeArgs.r,
					start: b.start,
					end: b.end
				})
			}
		})
	})(M);
	(function (a) {
		var D =
			a.addEvent,
			C = a.arrayMax,
			F = a.defined,
			H = a.each,
			r = a.extend,
			m = a.format,
			l = a.map,
			t = a.merge,
			p = a.noop,
			k = a.pick,
			f = a.relativeLength,
			b = a.Series,
			h = a.seriesTypes,
			z = a.stableSort;
		a.distribute = function (a, b) {
			function e(a, b) {
				return a.target - b.target
			}
			var c, f = !0,
				g = a,
				d = [],
				h;
			h = 0;
			for (c = a.length; c--;) h += a[c].size;
			if (h > b) {
				z(a, function (a, b) {
					return (b.rank || 0) - (a.rank || 0)
				});
				for (h = c = 0; h <= b;) h += a[c].size, c++;
				d = a.splice(c - 1, a.length)
			}
			z(a, e);
			for (a = l(a, function (a) {
					return {
						size: a.size,
						targets: [a.target]
					}
				}); f;) {
				for (c = a.length; c--;) f =
					a[c], h = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) / 2, f.pos = Math.min(Math.max(0, h - f.size / 2), b - f.size);
				c = a.length;
				for (f = !1; c--;) 0 < c && a[c - 1].pos + a[c - 1].size > a[c].pos && (a[c - 1].size += a[c].size, a[c - 1].targets = a[c - 1].targets.concat(a[c].targets), a[c - 1].pos + a[c - 1].size > b && (a[c - 1].pos = b - a[c - 1].size), a.splice(c, 1), f = !0)
			}
			c = 0;
			H(a, function (a) {
				var b = 0;
				H(a.targets, function () {
					g[c].pos = a.pos + b;
					b += g[c].size;
					c++
				})
			});
			g.push.apply(g, d);
			z(g, e)
		};
		b.prototype.drawDataLabels = function () {
			var a = this,
				b = a.options,
				e = b.dataLabels,
				c = a.points,
				f, h, d = a.hasRendered || 0,
				l, y, x = k(e.defer, !0),
				p = a.chart.renderer;
			if (e.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(e), y = a.plotGroup("dataLabelsGroup", "data-labels", x && !d ? "hidden" : "visible", e.zIndex || 6), x && (y.attr({
				opacity: +d
			}), d || D(a, "afterAnimate", function () {
				a.visible && y.show(!0);
				y[b.animation ? "animate" : "attr"]({
					opacity: 1
				}, {
					duration: 200
				})
			})), h = e, H(c, function (c) {
				var d, g = c.dataLabel,
					n, u, q = c.connector,
					x = !0,
					E, A = {};
				f = c.dlOptions || c.options && c.options.dataLabels;
				d = k(f && f.enabled, h.enabled) && null !== c.y;
				if (g && !d) c.dataLabel = g.destroy();
				else if (d) {
					e = t(h, f);
					E = e.style;
					d = e.rotation;
					n = c.getLabelConfig();
					l = e.format ? m(e.format, n) : e.formatter.call(n, e);
					E.color = k(e.color, E.color, a.color, "#000000");
					if (g) F(l) ? (g.attr({
						text: l
					}), x = !1) : (c.dataLabel = g = g.destroy(), q && (c.connector = q.destroy()));
					else if (F(l)) {
						g = {
							fill: e.backgroundColor,
							stroke: e.borderColor,
							"stroke-width": e.borderWidth,
							r: e.borderRadius || 0,
							rotation: d,
							padding: e.padding,
							zIndex: 1
						};
						"contrast" === E.color && (A.color = e.inside ||
							0 > e.distance || b.stacking ? p.getContrast(c.color || a.color) : "#000000");
						b.cursor && (A.cursor = b.cursor);
						for (u in g) void 0 === g[u] && delete g[u];
						g = c.dataLabel = p[d ? "text" : "label"](l, 0, -9999, e.shape, null, null, e.useHTML, null, "data-label").attr(g);
						g.addClass("highcharts-data-label-color-" + c.colorIndex + " " + (e.className || "") + (e.useHTML ? "highcharts-tracker" : ""));
						g.css(r(E, A));
						g.add(y);
						g.shadow(e.shadow)
					}
					g && a.alignDataLabel(c, g, e, null, x)
				}
			})
		};
		b.prototype.alignDataLabel = function (a, b, e, c, f) {
			var g = this.chart,
				d = g.inverted,
				h = k(a.plotX, -9999),
				n = k(a.plotY, -9999),
				l = b.getBBox(),
				q, m = e.rotation,
				p = e.align,
				v = this.visible && (a.series.forceDL || g.isInsidePlot(h, Math.round(n), d) || c && g.isInsidePlot(h, d ? c.x + 1 : c.y + c.height - 1, d)),
				z = "justify" === k(e.overflow, "justify");
			v && (q = e.style.fontSize, q = g.renderer.fontMetrics(q, b).b, c = r({
				x: d ? g.plotWidth - n : h,
				y: Math.round(d ? g.plotHeight - h : n),
				width: 0,
				height: 0
			}, c), r(e, {
				width: l.width,
				height: l.height
			}), m ? (z = !1, d = g.renderer.rotCorr(q, m), d = {
				x: c.x + e.x + c.width / 2 + d.x,
				y: c.y + e.y + {
						top: 0,
						middle: .5,
						bottom: 1
					}[e.verticalAlign] *
					c.height
			}, b[f ? "attr" : "animate"](d).attr({
				align: p
			}), h = (m + 720) % 360, h = 180 < h && 360 > h, "left" === p ? d.y -= h ? l.height : 0 : "center" === p ? (d.x -= l.width / 2, d.y -= l.height / 2) : "right" === p && (d.x -= l.width, d.y -= h ? 0 : l.height)) : (b.align(e, null, c), d = b.alignAttr), z ? this.justifyDataLabel(b, e, d, l, c, f) : k(e.crop, !0) && (v = g.isInsidePlot(d.x, d.y) && g.isInsidePlot(d.x + l.width, d.y + l.height)), e.shape && !m && b.attr({
				anchorX: a.plotX,
				anchorY: a.plotY
			}));
			v || (b.attr({
				y: -9999
			}), b.placed = !1)
		};
		b.prototype.justifyDataLabel = function (a, b, e, c, f, h) {
			var d =
				this.chart,
				g = b.align,
				k = b.verticalAlign,
				n, l, q = a.box ? 0 : a.padding || 0;
			n = e.x + q;
			0 > n && ("right" === g ? b.align = "left" : b.x = -n, l = !0);
			n = e.x + c.width - q;
			n > d.plotWidth && ("left" === g ? b.align = "right" : b.x = d.plotWidth - n, l = !0);
			n = e.y + q;
			0 > n && ("bottom" === k ? b.verticalAlign = "top" : b.y = -n, l = !0);
			n = e.y + c.height - q;
			n > d.plotHeight && ("top" === k ? b.verticalAlign = "bottom" : b.y = d.plotHeight - n, l = !0);
			l && (a.placed = !h, a.align(b, null, f))
		};
		h.pie && (h.pie.prototype.drawDataLabels = function () {
			var f = this,
				g = f.data,
				e, c = f.chart,
				h = f.options.dataLabels,
				u =
				k(h.connectorPadding, 10),
				d = k(h.connectorWidth, 1),
				m = c.plotWidth,
				y = c.plotHeight,
				x, p = h.distance,
				E = f.center,
				z = E[2] / 2,
				v = E[1],
				r = 0 < p,
				t, w, I, D, F = [
					[],
					[]
				],
				B, L, S, R, P = [0, 0, 0, 0];
			f.visible && (h.enabled || f._hasPointLabels) && (b.prototype.drawDataLabels.apply(f), H(g, function (a) {
				a.dataLabel && a.visible && (F[a.half].push(a), a.dataLabel._pos = null)
			}), H(F, function (b, d) {
				var g, k, n = b.length,
					q, x, A;
				if (n)
					for (f.sortByAngle(b, d - .5), 0 < p && (g = Math.max(0, v - z - p), k = Math.min(v + z + p, c.plotHeight), q = l(b, function (a) {
							if (a.dataLabel) return A =
								a.dataLabel.getBBox().height || 21, {
									target: a.labelPos[1] - g + A / 2,
									size: A,
									rank: a.y
								}
						}), a.distribute(q, k + A - g)), R = 0; R < n; R++) e = b[R], I = e.labelPos, t = e.dataLabel, S = !1 === e.visible ? "hidden" : "inherit", x = I[1], q ? void 0 === q[R].pos ? S = "hidden" : (D = q[R].size, L = g + q[R].pos) : L = x, B = h.justify ? E[0] + (d ? -1 : 1) * (z + p) : f.getX(L < g + 2 || L > k - 2 ? x : L, d), t._attr = {
						visibility: S,
						align: I[6]
					}, t._pos = {
						x: B + h.x + ({
							left: u,
							right: -u
						}[I[6]] || 0),
						y: L + h.y - 10
					}, I.x = B, I.y = L, null === f.options.size && (w = t.width, B - w < u ? P[3] = Math.max(Math.round(w - B + u), P[3]) : B + w > m - u &&
						(P[1] = Math.max(Math.round(B + w - m + u), P[1])), 0 > L - D / 2 ? P[0] = Math.max(Math.round(-L + D / 2), P[0]) : L + D / 2 > y && (P[2] = Math.max(Math.round(L + D / 2 - y), P[2])))
			}), 0 === C(P) || this.verifyDataLabelOverflow(P)) && (this.placeDataLabels(), r && d && H(this.points, function (a) {
				var b;
				x = a.connector;
				if ((t = a.dataLabel) && t._pos && a.visible) {
					S = t._attr.visibility;
					if (b = !x) a.connector = x = c.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(f.dataLabelsGroup), x.attr({
						"stroke-width": d,
						stroke: h.connectorColor ||
							a.color || "#666666"
					});
					x[b ? "attr" : "animate"]({
						d: f.connectorPath(a.labelPos)
					});
					x.attr("visibility", S)
				} else x && (a.connector = x.destroy())
			}))
		}, h.pie.prototype.connectorPath = function (a) {
			var b = a.x,
				e = a.y;
			return k(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), e, "C", b, e, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), e, "L", a[2], a[3], "L", a[4], a[5]]
		}, h.pie.prototype.placeDataLabels = function () {
			H(this.points, function (a) {
				var b = a.dataLabel;
				b && a.visible && ((a = b._pos) ?
					(b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
						y: -9999
					}))
			})
		}, h.pie.prototype.alignDataLabel = p, h.pie.prototype.verifyDataLabelOverflow = function (a) {
			var b = this.center,
				e = this.options,
				c = e.center,
				h = e.minSize || 80,
				k, d;
			null !== c[0] ? k = Math.max(b[2] - Math.max(a[1], a[3]), h) : (k = Math.max(b[2] - a[1] - a[3], h), b[0] += (a[3] - a[1]) / 2);
			null !== c[1] ? k = Math.max(Math.min(k, b[2] - Math.max(a[0], a[2])), h) : (k = Math.max(Math.min(k, b[2] - a[0] - a[2]), h), b[1] += (a[0] - a[2]) / 2);
			k < b[2] ? (b[2] = k, b[3] = Math.min(f(e.innerSize ||
				0, k), k), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : d = !0;
			return d
		});
		h.column && (h.column.prototype.alignDataLabel = function (a, f, e, c, h) {
			var g = this.chart.inverted,
				d = a.series,
				n = a.dlBox || a.shapeArgs,
				l = k(a.below, a.plotY > k(this.translatedThreshold, d.yAxis.len)),
				m = k(e.inside, !!this.options.stacking);
			n && (c = t(n), 0 > c.y && (c.height += c.y, c.y = 0), n = c.y + c.height - d.yAxis.len, 0 < n && (c.height -= n), g && (c = {
				x: d.yAxis.len - c.y - c.height,
				y: d.xAxis.len - c.x - c.width,
				width: c.height,
				height: c.width
			}), m || (g ? (c.x += l ?
				0 : c.width, c.width = 0) : (c.y += l ? c.height : 0, c.height = 0)));
			e.align = k(e.align, !g || m ? "center" : l ? "right" : "left");
			e.verticalAlign = k(e.verticalAlign, g || m ? "middle" : l ? "top" : "bottom");
			b.prototype.alignDataLabel.call(this, a, f, e, c, h)
		})
	})(M);
	(function (a) {
		var D = a.Chart,
			C = a.each,
			F = a.pick,
			H = a.addEvent;
		D.prototype.callbacks.push(function (a) {
			function m() {
				var l = [];
				C(a.series, function (a) {
					var m = a.options.dataLabels,
						k = a.dataLabelCollections || ["dataLabel"];
					(m.enabled || a._hasPointLabels) && !m.allowOverlap && a.visible && C(k, function (f) {
						C(a.points,
							function (a) {
								a[f] && (a[f].labelrank = F(a.labelrank, a.shapeArgs && a.shapeArgs.height), l.push(a[f]))
							})
					})
				});
				a.hideOverlappingLabels(l)
			}
			m();
			H(a, "redraw", m)
		});
		D.prototype.hideOverlappingLabels = function (a) {
			var m = a.length,
				l, r, p, k, f, b, h, z, q, g = function (a, b, f, g, d, h, k, l) {
					return !(d > a + f || d + k < a || h > b + g || h + l < b)
				};
			for (r = 0; r < m; r++)
				if (l = a[r]) l.oldOpacity = l.opacity, l.newOpacity = 1;
			a.sort(function (a, b) {
				return (b.labelrank || 0) - (a.labelrank || 0)
			});
			for (r = 0; r < m; r++)
				for (p = a[r], l = r + 1; l < m; ++l)
					if (k = a[l], p && k && p.placed && k.placed && 0 !==
						p.newOpacity && 0 !== k.newOpacity && (f = p.alignAttr, b = k.alignAttr, h = p.parentGroup, z = k.parentGroup, q = 2 * (p.box ? 0 : p.padding), f = g(f.x + h.translateX, f.y + h.translateY, p.width - q, p.height - q, b.x + z.translateX, b.y + z.translateY, k.width - q, k.height - q)))(p.labelrank < k.labelrank ? p : k).newOpacity = 0;
			C(a, function (a) {
				var b, e;
				a && (e = a.newOpacity, a.oldOpacity !== e && a.placed && (e ? a.show(!0) : b = function () {
					a.hide()
				}, a.alignAttr.opacity = e, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
			})
		}
	})(M);
	(function (a) {
		var D = a.addEvent,
			C = a.Chart,
			F = a.createElement,
			H = a.css,
			r = a.defaultOptions,
			m = a.defaultPlotOptions,
			l = a.each,
			t = a.extend,
			p = a.fireEvent,
			k = a.hasTouch,
			f = a.inArray,
			b = a.isObject,
			h = a.Legend,
			z = a.merge,
			q = a.pick,
			g = a.Point,
			e = a.Series,
			c = a.seriesTypes,
			n = a.svg;
		a = a.TrackerMixin = {
			drawTrackerPoint: function () {
				var a = this,
					b = a.chart,
					c = b.pointer,
					e = function (a) {
						for (var c = a.target, d; c && !d;) d = c.point, c = c.parentNode;
						if (void 0 !== d && d !== b.hoverPoint) d.onMouseOver(a)
					};
				l(a.points, function (a) {
					a.graphic && (a.graphic.element.point = a);
					a.dataLabel && (a.dataLabel.div ?
						a.dataLabel.div.point = a : a.dataLabel.element.point = a)
				});
				a._hasTracking || (l(a.trackerGroups, function (b) {
					if (a[b]) {
						a[b].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function (a) {
							c.onTrackerMouseOut(a)
						});
						if (k) a[b].on("touchstart", e);
						a.options.cursor && a[b].css(H).css({
							cursor: a.options.cursor
						})
					}
				}), a._hasTracking = !0)
			},
			drawTrackerGraph: function () {
				var a = this,
					b = a.options,
					c = b.trackByArea,
					e = [].concat(c ? a.areaPath : a.graphPath),
					f = e.length,
					g = a.chart,
					h = g.pointer,
					m = g.renderer,
					q = g.options.tooltip.snap,
					p = a.tracker,
					z, w = function () {
						if (g.hoverSeries !== a) a.onMouseOver()
					},
					r = "rgba(192,192,192," + (n ? .0001 : .002) + ")";
				if (f && !c)
					for (z = f + 1; z--;) "M" === e[z] && e.splice(z + 1, 0, e[z + 1] - q, e[z + 2], "L"), (z && "M" === e[z] || z === f) && e.splice(z, 0, "L", e[z - 2] + q, e[z - 1]);
				p ? p.attr({
					d: e
				}) : a.graph && (a.tracker = m.path(e).attr({
					"stroke-linejoin": "round",
					visibility: a.visible ? "visible" : "hidden",
					stroke: r,
					fill: c ? r : "none",
					"stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * q),
					zIndex: 2
				}).add(a.group), l([a.tracker, a.markerGroup], function (a) {
					a.addClass("highcharts-tracker").on("mouseover",
						w).on("mouseout", function (a) {
						h.onTrackerMouseOut(a)
					});
					b.cursor && a.css({
						cursor: b.cursor
					});
					if (k) a.on("touchstart", w)
				}))
			}
		};
		c.column && (c.column.prototype.drawTracker = a.drawTrackerPoint);
		c.pie && (c.pie.prototype.drawTracker = a.drawTrackerPoint);
		c.scatter && (c.scatter.prototype.drawTracker = a.drawTrackerPoint);
		t(h.prototype, {
			setItemEvents: function (a, b, c) {
				var d = this,
					e = d.chart,
					f = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
				(c ? b : a.legendGroup).on("mouseover", function () {
					a.setState("hover");
					e.seriesGroup.addClass(f);
					b.css(d.options.itemHoverStyle)
				}).on("mouseout", function () {
					b.css(a.visible ? d.itemStyle : d.itemHiddenStyle);
					e.seriesGroup.removeClass(f);
					a.setState()
				}).on("click", function (b) {
					var c = function () {
						a.setVisible && a.setVisible()
					};
					b = {
						browserEvent: b
					};
					a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : p(a, "legendItemClick", b, c)
				})
			},
			createCheckboxForItem: function (a) {
				a.checkbox = F("input", {
					type: "checkbox",
					checked: a.selected,
					defaultChecked: a.selected
				}, this.options.itemCheckboxStyle, this.chart.container);
				D(a.checkbox,
					"click",
					function (b) {
						p(a.series || a, "checkboxClick", {
							checked: b.target.checked,
							item: a
						}, function () {
							a.select()
						})
					})
			}
		});
		r.legend.itemStyle.cursor = "pointer";
		t(C.prototype, {
			showResetZoom: function () {
				var a = this,
					b = r.lang,
					c = a.options.chart.resetZoomButton,
					e = c.theme,
					f = e.states,
					g = "chart" === c.relativeTo ? null : "plotBox";
				this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
					a.zoomOut()
				}, e, f && f.hover).attr({
					align: c.position.align,
					title: b.resetZoomTitle
				}).addClass("highcharts-reset-zoom").add().align(c.position, !1, g)
			},
			zoomOut: function () {
				var a = this;
				p(a, "selection", {
					resetSelection: !0
				}, function () {
					a.zoom()
				})
			},
			zoom: function (a) {
				var c, e = this.pointer,
					f = !1,
					g;
				!a || a.resetSelection ? l(this.axes, function (a) {
					c = a.zoom()
				}) : l(a.xAxis.concat(a.yAxis), function (a) {
					var b = a.axis;
					e[b.isXAxis ? "zoomX" : "zoomY"] && (c = b.zoom(a.min, a.max), b.displayBtn && (f = !0))
				});
				g = this.resetZoomButton;
				f && !g ? this.showResetZoom() : !f && b(g) && (this.resetZoomButton = g.destroy());
				c && this.redraw(q(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
			},
			pan: function (a, b) {
				var c = this,
					d = c.hoverPoints,
					e;
				d && l(d, function (a) {
					a.setState()
				});
				l("xy" === b ? [1, 0] : [1], function (b) {
					b = c[b ? "xAxis" : "yAxis"][0];
					var d = b.horiz,
						f = b.reversed,
						g = a[d ? "chartX" : "chartY"],
						d = d ? "mouseDownX" : "mouseDownY",
						h = c[d],
						k = (b.pointRange || 0) / (f ? -2 : 2),
						n = b.getExtremes(),
						l = b.toValue(h - g, !0) + k,
						k = b.toValue(h + b.len - g, !0) - k,
						h = h > g;
					f && (h = !h, f = l, l = k, k = f);
					b.series.length && (h || l > Math.min(n.dataMin, n.min)) && (!h || k < Math.max(n.dataMax, n.max)) && (b.setExtremes(l, k, !1, !1, {
						trigger: "pan"
					}), e = !0);
					c[d] = g
				});
				e && c.redraw(!1);
				H(c.container, {
					cursor: "move"
				})
			}
		});
		t(g.prototype, {
			select: function (a, b) {
				var c = this,
					d = c.series,
					e = d.chart;
				a = q(a, !c.selected);
				c.firePointEvent(a ? "select" : "unselect", {
					accumulate: b
				}, function () {
					c.selected = c.options.selected = a;
					d.options.data[f(c, d.data)] = c.options;
					c.setState(a && "select");
					b || l(e.getSelectedPoints(), function (a) {
						a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[f(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
					})
				})
			},
			onMouseOver: function (a, b) {
				var c = this.series,
					d = c.chart,
					e = d.tooltip,
					f = d.hoverPoint;
				if (this.series) {
					if (!b) {
						if (f && f !== this) f.onMouseOut();
						if (d.hoverSeries !== c) c.onMouseOver();
						d.hoverPoint = this
					}!e || e.shared && !c.noSharedTooltip ? e || this.setState("hover") : (this.setState("hover"), e.refresh(this, a));
					this.firePointEvent("mouseOver")
				}
			},
			onMouseOut: function () {
				var a = this.series.chart,
					b = a.hoverPoints;
				this.firePointEvent("mouseOut");
				b && -1 !== f(this, b) || (this.setState(), a.hoverPoint = null)
			},
			importEvents: function () {
				if (!this.hasImportedEvents) {
					var a = z(this.series.options.point,
							this.options).events,
						b;
					this.events = a;
					for (b in a) D(this, b, a[b]);
					this.hasImportedEvents = !0
				}
			},
			setState: function (a, b) {
				var c = Math.floor(this.plotX),
					d = this.plotY,
					e = this.series,
					f = e.options.states[a] || {},
					g = m[e.type].marker && e.options.marker,
					h = g && !1 === g.enabled,
					k = g && g.states && g.states[a] || {},
					n = !1 === k.enabled,
					l = e.stateMarkerGraphic,
					u = this.marker || {},
					p = e.chart,
					z = e.halo,
					r, B = g && e.markerAttribs;
				a = a || "";
				if (!(a === this.state && !b || this.selected && "select" !== a || !1 === f.enabled || a && (n || h && !1 === k.enabled) || a && u.states &&
						u.states[a] && !1 === u.states[a].enabled)) {
					B && (r = e.markerAttribs(this, a));
					if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.attr(e.pointAttribs(this, a)), r && this.graphic.animate(r, q(p.options.chart.animation, k.animation, g.animation)), l && l.hide();
					else {
						if (a && k) {
							g = u.symbol || e.symbol;
							l && l.currentSymbol !== g && (l = l.destroy());
							if (l) l[b ? "animate" : "attr"]({
								x: r.x,
								y: r.y
							});
							else g && (e.stateMarkerGraphic = l = p.renderer.symbol(g,
								r.x, r.y, r.width, r.height).add(e.markerGroup), l.currentSymbol = g);
							l && l.attr(e.pointAttribs(this, a))
						}
						l && (l[a && p.isInsidePlot(c, d, p.inverted) ? "show" : "hide"](), l.element.point = this)
					}(c = f.halo) && c.size ? (z || (e.halo = z = p.renderer.path().add(B ? e.markerGroup : e.group)), z[b ? "animate" : "attr"]({
						d: this.haloPath(c.size)
					}), z.attr({
						"class": "highcharts-halo highcharts-color-" + q(this.colorIndex, e.colorIndex)
					}), z.attr(t({
						fill: this.color || e.color,
						"fill-opacity": c.opacity,
						zIndex: -1
					}, c.attributes))) : z && z.animate({
						d: this.haloPath(0)
					});
					this.state = a
				}
			},
			haloPath: function (a) {
				return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
			}
		});
		t(e.prototype, {
			onMouseOver: function () {
				var a = this.chart,
					b = a.hoverSeries;
				if (b && b !== this) b.onMouseOut();
				this.options.events.mouseOver && p(this, "mouseOver");
				this.setState("hover");
				a.hoverSeries = this
			},
			onMouseOut: function () {
				var a = this.options,
					b = this.chart,
					c = b.tooltip,
					e = b.hoverPoint;
				b.hoverSeries = null;
				if (e) e.onMouseOut();
				this && a.events.mouseOut && p(this, "mouseOut");
				!c || a.stickyTracking ||
					c.shared && !this.noSharedTooltip || c.hide();
				this.setState()
			},
			setState: function (a) {
				var b = this,
					c = b.options,
					e = b.graph,
					f = c.states,
					g = c.lineWidth,
					c = 0;
				a = a || "";
				if (b.state !== a && (l([b.group, b.markerGroup], function (c) {
						c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
					}), b.state = a, !f[a] || !1 !== f[a].enabled) && (a && (g = f[a].lineWidth || g + (f[a].lineWidthPlus || 0)), e && !e.dashstyle))
					for (f = {
							"stroke-width": g
						}, e.attr(f); b["zone-graph-" + c];) b["zone-graph-" + c].attr(f), c += 1
			},
			setVisible: function (a,
				b) {
				var c = this,
					d = c.chart,
					e = c.legendItem,
					f, g = d.options.chart.ignoreHiddenSeries,
					h = c.visible;
				f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !h : a) ? "show" : "hide";
				l(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
					if (c[a]) c[a][f]()
				});
				if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
				e && d.legend.colorizeItem(c, a);
				c.isDirty = !0;
				c.options.stacking && l(d.series, function (a) {
					a.options.stacking && a.visible && (a.isDirty = !0)
				});
				l(c.linkedSeries, function (b) {
					b.setVisible(a, !1)
				});
				g && (d.isDirtyBox = !0);
				!1 !== b && d.redraw();
				p(c, f)
			},
			show: function () {
				this.setVisible(!0)
			},
			hide: function () {
				this.setVisible(!1)
			},
			select: function (a) {
				this.selected = a = void 0 === a ? !this.selected : a;
				this.checkbox && (this.checkbox.checked = a);
				p(this, a ? "select" : "unselect")
			},
			drawTracker: a.drawTrackerGraph
		})
	})(M);
	(function (a) {
		var D = a.Chart,
			C = a.each,
			F = a.inArray,
			H = a.isObject,
			r = a.pick,
			m = a.splat;
		D.prototype.setResponsive = function (a) {
			var l = this.options.responsive;
			l && l.rules && C(l.rules, function (l) {
				this.matchResponsiveRule(l,
					a)
			}, this)
		};
		D.prototype.matchResponsiveRule = function (l, m) {
			var p = this.respRules,
				k = l.condition,
				f;
			f = k.callback || function () {
				return this.chartWidth <= r(k.maxWidth, Number.MAX_VALUE) && this.chartHeight <= r(k.maxHeight, Number.MAX_VALUE) && this.chartWidth >= r(k.minWidth, 0) && this.chartHeight >= r(k.minHeight, 0)
			};
			void 0 === l._id && (l._id = a.uniqueKey());
			f = f.call(this);
			!p[l._id] && f ? l.chartOptions && (p[l._id] = this.currentOptions(l.chartOptions), this.update(l.chartOptions, m)) : p[l._id] && !f && (this.update(p[l._id], m), delete p[l._id])
		};
		D.prototype.currentOptions = function (a) {
			function l(a, f, b) {
				var h, k;
				for (h in a)
					if (-1 < F(h, ["series", "xAxis", "yAxis"]))
						for (a[h] = m(a[h]), b[h] = [], k = 0; k < a[h].length; k++) b[h][k] = {}, l(a[h][k], f[h][k], b[h][k]);
					else H(a[h]) ? (b[h] = {}, l(a[h], f[h] || {}, b[h])) : b[h] = f[h] || null
			}
			var p = {};
			l(a, this.options, p);
			return p
		}
	})(M);
	(function (a) {
		var D = a.addEvent,
			C = a.Axis,
			F = a.Chart,
			H = a.css,
			r = a.dateFormat,
			m = a.defined,
			l = a.each,
			t = a.extend,
			p = a.noop,
			k = a.Series,
			f = a.timeUnits;
		a = a.wrap;
		a(k.prototype, "init", function (a) {
			var b;
			a.apply(this,
				Array.prototype.slice.call(arguments, 1));
			(b = this.xAxis) && b.options.ordinal && D(this, "updatedData", function () {
				delete b.ordinalIndex
			})
		});
		a(C.prototype, "getTimeTicks", function (a, h, k, l, g, e, c, n) {
			var b = 0,
				d, q, p = {},
				x, z, E, t = [],
				v = -Number.MAX_VALUE,
				K = this.options.tickPixelInterval;
			if (!this.options.ordinal && !this.options.breaks || !e || 3 > e.length || void 0 === k) return a.call(this, h, k, l, g);
			z = e.length;
			for (d = 0; d < z; d++) {
				E = d && e[d - 1] > l;
				e[d] < k && (b = d);
				if (d === z - 1 || e[d + 1] - e[d] > 5 * c || E) {
					if (e[d] > v) {
						for (q = a.call(this, h, e[b], e[d],
								g); q.length && q[0] <= v;) q.shift();
						q.length && (v = q[q.length - 1]);
						t = t.concat(q)
					}
					b = d + 1
				}
				if (E) break
			}
			a = q.info;
			if (n && a.unitRange <= f.hour) {
				d = t.length - 1;
				for (b = 1; b < d; b++) r("%d", t[b]) !== r("%d", t[b - 1]) && (p[t[b]] = "day", x = !0);
				x && (p[t[0]] = "day");
				a.higherRanks = p
			}
			t.info = a;
			if (n && m(K)) {
				n = a = t.length;
				d = [];
				var C;
				for (x = []; n--;) b = this.translate(t[n]), C && (x[n] = C - b), d[n] = C = b;
				x.sort();
				x = x[Math.floor(x.length / 2)];
				x < .6 * K && (x = null);
				n = t[a - 1] > l ? a - 1 : a;
				for (C = void 0; n--;) b = d[n], l = C - b, C && l < .8 * K && (null === x || l < .8 * x) ? (p[t[n]] && !p[t[n + 1]] ?
					(l = n + 1, C = b) : l = n, t.splice(l, 1)) : C = b
			}
			return t
		});
		t(C.prototype, {
			beforeSetTickPositions: function () {
				var a, f = [],
					k = !1,
					m, g = this.getExtremes(),
					e = g.min,
					c = g.max,
					n, p = this.isXAxis && !!this.options.breaks,
					g = this.options.ordinal,
					d = this.chart.options.chart.ignoreHiddenSeries;
				if (g || p) {
					l(this.series, function (b, c) {
						if (!(d && !1 === b.visible || !1 === b.takeOrdinalPosition && !p) && (f = f.concat(b.processedXData), a = f.length, f.sort(function (a, b) {
								return a - b
							}), a))
							for (c = a - 1; c--;) f[c] === f[c + 1] && f.splice(c, 1)
					});
					a = f.length;
					if (2 < a) {
						m = f[1] -
							f[0];
						for (n = a - 1; n-- && !k;) f[n + 1] - f[n] !== m && (k = !0);
						!this.options.keepOrdinalPadding && (f[0] - e > m || c - f[f.length - 1] > m) && (k = !0)
					}
					k ? (this.ordinalPositions = f, m = this.val2lin(Math.max(e, f[0]), !0), n = Math.max(this.val2lin(Math.min(c, f[f.length - 1]), !0), 1), this.ordinalSlope = c = (c - e) / (n - m), this.ordinalOffset = e - m * c) : this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0
				}
				this.isOrdinal = g && k;
				this.groupIntervalFactor = null
			},
			val2lin: function (a, f) {
				var b = this.ordinalPositions;
				if (b) {
					var h = b.length,
						g, e;
					for (g = h; g--;)
						if (b[g] ===
							a) {
							e = g;
							break
						}
					for (g = h - 1; g--;)
						if (a > b[g] || 0 === g) {
							a = (a - b[g]) / (b[g + 1] - b[g]);
							e = g + a;
							break
						}
					f = f ? e : this.ordinalSlope * (e || 0) + this.ordinalOffset
				} else f = a;
				return f
			},
			lin2val: function (a, f) {
				var b = this.ordinalPositions;
				if (b) {
					var h = this.ordinalSlope,
						g = this.ordinalOffset,
						e = b.length - 1,
						c;
					if (f) 0 > a ? a = b[0] : a > e ? a = b[e] : (e = Math.floor(a), c = a - e);
					else
						for (; e--;)
							if (f = h * e + g, a >= f) {
								h = h * (e + 1) + g;
								c = (a - f) / (h - f);
								break
							} return void 0 !== c && void 0 !== b[e] ? b[e] + (c ? c * (b[e + 1] - b[e]) : 0) : a
				}
				return a
			},
			getExtendedPositions: function () {
				var a = this.chart,
					f = this.series[0].currentDataGrouping,
					k = this.ordinalIndex,
					m = f ? f.count + f.unitName : "raw",
					g = this.getExtremes(),
					e, c;
				k || (k = this.ordinalIndex = {});
				k[m] || (e = {
						series: [],
						chart: a,
						getExtremes: function () {
							return {
								min: g.dataMin,
								max: g.dataMax
							}
						},
						options: {
							ordinal: !0
						},
						val2lin: C.prototype.val2lin
					}, l(this.series, function (b) {
						c = {
							xAxis: e,
							xData: b.xData,
							chart: a,
							destroyGroupedData: p
						};
						c.options = {
							dataGrouping: f ? {
								enabled: !0,
								forced: !0,
								approximation: "open",
								units: [
									[f.unitName, [f.count]]
								]
							} : {
								enabled: !1
							}
						};
						b.processData.apply(c);
						e.series.push(c)
					}),
					this.beforeSetTickPositions.apply(e), k[m] = e.ordinalPositions);
				return k[m]
			},
			getGroupIntervalFactor: function (a, f, k) {
				var b;
				k = k.processedXData;
				var g = k.length,
					e = [];
				b = this.groupIntervalFactor;
				if (!b) {
					for (b = 0; b < g - 1; b++) e[b] = k[b + 1] - k[b];
					e.sort(function (a, b) {
						return a - b
					});
					e = e[Math.floor(g / 2)];
					a = Math.max(a, k[0]);
					f = Math.min(f, k[g - 1]);
					this.groupIntervalFactor = b = g * e / (f - a)
				}
				return b
			},
			postProcessTickInterval: function (a) {
				var b = this.ordinalSlope;
				return b ? this.options.breaks ? this.closestPointRange : a / (b / this.closestPointRange) :
					a
			}
		});
		a(F.prototype, "pan", function (a, f) {
			var b = this.xAxis[0],
				h = f.chartX,
				g = !1;
			if (b.options.ordinal && b.series.length) {
				var e = this.mouseDownX,
					c = b.getExtremes(),
					k = c.dataMax,
					m = c.min,
					d = c.max,
					p = this.hoverPoints,
					r = b.closestPointRange,
					e = (e - h) / (b.translationSlope * (b.ordinalSlope || r)),
					x = {
						ordinalPositions: b.getExtendedPositions()
					},
					r = b.lin2val,
					t = b.val2lin,
					E;
				x.ordinalPositions ? 1 < Math.abs(e) && (p && l(p, function (a) {
						a.setState()
					}), 0 > e ? (p = x, E = b.ordinalPositions ? b : x) : (p = b.ordinalPositions ? b : x, E = x), x = E.ordinalPositions, k >
					x[x.length - 1] && x.push(k), this.fixedRange = d - m, e = b.toFixedRange(null, null, r.apply(p, [t.apply(p, [m, !0]) + e, !0]), r.apply(E, [t.apply(E, [d, !0]) + e, !0])), e.min >= Math.min(c.dataMin, m) && e.max <= Math.max(k, d) && b.setExtremes(e.min, e.max, !0, !1, {
						trigger: "pan"
					}), this.mouseDownX = h, H(this.container, {
						cursor: "move"
					})) : g = !0
			} else g = !0;
			g && a.apply(this, Array.prototype.slice.call(arguments, 1))
		});
		k.prototype.gappedPath = function () {
			var a = this.options.gapSize,
				f = this.points.slice(),
				k = f.length - 1;
			if (a && 0 < k)
				for (; k--;) f[k + 1].x - f[k].x >
					this.closestPointRange * a && f.splice(k + 1, 0, {
						isNull: !0
					});
			return this.getGraphPath(f)
		}
	})(M);
	(function (a) {
		function D() {
			return Array.prototype.slice.call(arguments, 1)
		}

		function C(a) {
			a.apply(this);
			this.drawBreaks(this.xAxis, ["x"]);
			this.drawBreaks(this.yAxis, F(this.pointArrayMap, ["y"]))
		}
		var F = a.pick,
			H = a.wrap,
			r = a.each,
			m = a.extend,
			l = a.fireEvent,
			t = a.Axis,
			p = a.Series;
		m(t.prototype, {
			isInBreak: function (a, f) {
				var b = a.repeat || Infinity,
					h = a.from,
					k = a.to - a.from;
				f = f >= h ? (f - h) % b : b - (h - f) % b;
				return a.inclusive ? f <= k : f < k && 0 !== f
			},
			isInAnyBreak: function (a, f) {
				var b = this.options.breaks,
					h = b && b.length,
					k, l, g;
				if (h) {
					for (; h--;) this.isInBreak(b[h], a) && (k = !0, l || (l = F(b[h].showPoints, this.isXAxis ? !1 : !0)));
					g = k && f ? k && !l : k
				}
				return g
			}
		});
		H(t.prototype, "setTickPositions", function (a) {
			a.apply(this, Array.prototype.slice.call(arguments, 1));
			if (this.options.breaks) {
				var f = this.tickPositions,
					b = this.tickPositions.info,
					h = [],
					k;
				for (k = 0; k < f.length; k++) this.isInAnyBreak(f[k]) || h.push(f[k]);
				this.tickPositions = h;
				this.tickPositions.info = b
			}
		});
		H(t.prototype, "init",
			function (a, f, b) {
				b.breaks && b.breaks.length && (b.ordinal = !1);
				a.call(this, f, b);
				if (this.options.breaks) {
					var h = this;
					h.isBroken = !0;
					this.val2lin = function (a) {
						var b = a,
							f, e;
						for (e = 0; e < h.breakArray.length; e++)
							if (f = h.breakArray[e], f.to <= a) b -= f.len;
							else if (f.from >= a) break;
						else if (h.isInBreak(f, a)) {
							b -= a - f.from;
							break
						}
						return b
					};
					this.lin2val = function (a) {
						var b, f;
						for (f = 0; f < h.breakArray.length && !(b = h.breakArray[f], b.from >= a); f++) b.to < a ? a += b.len : h.isInBreak(b, a) && (a += b.len);
						return a
					};
					this.setExtremes = function (a, b, f, e, c) {
						for (; this.isInAnyBreak(a);) a -=
							this.closestPointRange;
						for (; this.isInAnyBreak(b);) b -= this.closestPointRange;
						t.prototype.setExtremes.call(this, a, b, f, e, c)
					};
					this.setAxisTranslation = function (a) {
						t.prototype.setAxisTranslation.call(this, a);
						var b = h.options.breaks;
						a = [];
						var f = [],
							e = 0,
							c, k, m = h.userMin || h.min,
							d = h.userMax || h.max,
							p, r;
						for (r in b) k = b[r], c = k.repeat || Infinity, h.isInBreak(k, m) && (m += k.to % c - m % c), h.isInBreak(k, d) && (d -= d % c - k.from % c);
						for (r in b) {
							k = b[r];
							p = k.from;
							for (c = k.repeat || Infinity; p - c > m;) p -= c;
							for (; p < m;) p += c;
							for (; p < d; p += c) a.push({
								value: p,
								move: "in"
							}), a.push({
								value: p + (k.to - k.from),
								move: "out",
								size: k.breakSize
							})
						}
						a.sort(function (a, b) {
							return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
						});
						b = 0;
						p = m;
						for (r in a) k = a[r], b += "in" === k.move ? 1 : -1, 1 === b && "in" === k.move && (p = k.value), 0 === b && (f.push({
							from: p,
							to: k.value,
							len: k.value - p - (k.size || 0)
						}), e += k.value - p - (k.size || 0));
						h.breakArray = f;
						l(h, "afterBreaks");
						h.transA *= (d - h.min) / (d - m - e);
						h.min = m;
						h.max = d
					}
				}
			});
		H(p.prototype, "generatePoints", function (a) {
			a.apply(this, D(arguments));
			var f =
				this.xAxis,
				b = this.yAxis,
				h = this.points,
				k, l = h.length,
				g = this.options.connectNulls,
				e;
			if (f && b && (f.options.breaks || b.options.breaks))
				for (; l--;) k = h[l], e = null === k.y && !1 === g, e || !f.isInAnyBreak(k.x, !0) && !b.isInAnyBreak(k.y, !0) || (h.splice(l, 1), this.data[l] && this.data[l].destroyElements())
		});
		a.Series.prototype.drawBreaks = function (a, f) {
			var b = this,
				h = b.points,
				k, m, g, e;
			r(f, function (c) {
				k = a.breakArray || [];
				m = a.isXAxis ? a.min : F(b.options.threshold, a.min);
				r(h, function (b) {
					e = F(b["stack" + c.toUpperCase()], b[c]);
					r(k, function (c) {
						g = !1;
						if (m < c.from && e > c.to || m > c.from && e < c.from) g = "pointBreak";
						else if (m < c.from && e > c.from && e < c.to || m > c.from && e > c.to && e < c.from) g = "pointInBreak";
						g && l(a, g, {
							point: b,
							brk: c
						})
					})
				})
			})
		};
		H(a.seriesTypes.column.prototype, "drawPoints", C);
		H(a.Series.prototype, "drawPoints", C)
	})(M);
	(function (a) {
		var D = a.arrayMax,
			C = a.arrayMin,
			F = a.Axis,
			H = a.defaultPlotOptions,
			r = a.defined,
			m = a.each,
			l = a.error,
			t = a.extend,
			p = a.format,
			k = a.isNumber,
			f = a.merge,
			b = a.pick,
			h = a.Point,
			z = a.Tooltip,
			q = a.wrap,
			g = a.Series.prototype,
			e = g.processData,
			c = g.generatePoints,
			n = g.destroy,
			u = {
				approximation: "average",
				groupPixelWidth: 2,
				dateTimeLabelFormats: {
					millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
					second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
					minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
					hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
					day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
					week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
					month: ["%B %Y", "%B", "-%B %Y"],
					year: ["%Y", "%Y", "-%Y"]
				}
			},
			d = {
				line: {},
				spline: {},
				area: {},
				areaspline: {},
				column: {
					approximation: "sum",
					groupPixelWidth: 10
				},
				arearange: {
					approximation: "range"
				},
				areasplinerange: {
					approximation: "range"
				},
				columnrange: {
					approximation: "range",
					groupPixelWidth: 10
				},
				candlestick: {
					approximation: "ohlc",
					groupPixelWidth: 10
				},
				ohlc: {
					approximation: "ohlc",
					groupPixelWidth: 5
				}
			},
			A = a.defaultDataGroupingUnits = [
				["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
				["second", [1, 2, 5, 10, 15, 30]],
				["minute", [1, 2, 5, 10, 15, 30]],
				["hour", [1, 2, 3, 4, 6, 8, 12]],
				["day", [1]],
				["week", [1]],
				["month", [1, 3, 6]],
				["year", null]
			],
			y = {
				sum: function (a) {
					var b = a.length,
						c;
					if (!b && a.hasNulls) c = null;
					else if (b)
						for (c = 0; b--;) c += a[b];
					return c
				},
				average: function (a) {
					var b = a.length;
					a = y.sum(a);
					k(a) && b && (a /= b);
					return a
				},
				open: function (a) {
					return a.length ? a[0] : a.hasNulls ? null : void 0
				},
				high: function (a) {
					return a.length ? D(a) : a.hasNulls ? null : void 0
				},
				low: function (a) {
					return a.length ? C(a) : a.hasNulls ? null : void 0
				},
				close: function (a) {
					return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
				},
				ohlc: function (a, b, c, d) {
					a = y.open(a);
					b = y.high(b);
					c = y.low(c);
					d = y.close(d);
					if (k(a) || k(b) || k(c) || k(d)) return [a, b, c, d]
				},
				range: function (a, b) {
					a = y.low(a);
					b = y.high(b);
					if (k(a) || k(b)) return [a, b]
				}
			};
		g.groupData = function (a, b, c, d) {
			var e = this.data,
				f = this.options.data,
				g = [],
				h = [],
				l = [],
				n = a.length,
				m, p, q = !!b,
				r = [
					[],
					[],
					[],
					[]
				];
			d = "function" === typeof d ? d : y[d];
			var x = this.pointArrayMap,
				u = x && x.length,
				t, E = 0;
			for (t = p = 0; t <= n && !(a[t] >= c[0]); t++);
			for (t; t <= n; t++) {
				for (;
					(void 0 !== c[E + 1] && a[t] >= c[E + 1] || t === n) && (m = c[E], this.dataGroupInfo = {
						start: p,
						length: r[0].length
					}, p = d.apply(this,
						r), void 0 !== p && (g.push(m), h.push(p), l.push(this.dataGroupInfo)), p = t, r[0] = [], r[1] = [], r[2] = [], r[3] = [], E += 1, t !== n););
				if (t === n) break;
				if (x) {
					m = this.cropStart + t;
					m = e && e[m] || this.pointClass.prototype.applyOptions.apply({
						series: this
					}, [f[m]]);
					var z, G;
					for (z = 0; z < u; z++) G = m[x[z]], k(G) ? r[z].push(G) : null === G && (r[z].hasNulls = !0)
				} else m = q ? b[t] : null, k(m) ? r[0].push(m) : null === m && (r[0].hasNulls = !0)
			}
			return [g, h, l]
		};
		g.processData = function () {
			var a = this.chart,
				c = this.options.dataGrouping,
				d = !1 !== this.allowDG && c && b(c.enabled, a.options.isStock),
				f = this.visible || !a.options.chart.ignoreHiddenSeries,
				h;
			this.forceCrop = d;
			this.groupPixelWidth = null;
			this.hasProcessed = !0;
			if (!1 !== e.apply(this, arguments) && d && f) {
				this.destroyGroupedData();
				var k = this.processedXData,
					l = this.processedYData,
					n = a.plotSizeX,
					a = this.xAxis,
					m = a.options.ordinal,
					p = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth();
				if (p) {
					this.isDirty = h = !0;
					f = a.getExtremes();
					d = f.min;
					f = f.max;
					m = m && a.getGroupIntervalFactor(d, f, this) || 1;
					n = p * (f - d) / n * m;
					p = a.getTimeTicks(a.normalizeTimeTickInterval(n,
						c.units || A), Math.min(d, k[0]), Math.max(f, k[k.length - 1]), a.options.startOfWeek, k, this.closestPointRange);
					k = g.groupData.apply(this, [k, l, p, c.approximation]);
					l = k[0];
					m = k[1];
					if (c.smoothed) {
						c = l.length - 1;
						for (l[c] = Math.min(l[c], f); c-- && 0 < c;) l[c] += n / 2;
						l[0] = Math.max(l[0], d)
					}
					this.currentDataGrouping = p.info;
					this.closestPointRange = p.info.totalRange;
					this.groupMap = k[2];
					r(l[0]) && l[0] < a.dataMin && (a.min === a.dataMin && (a.min = l[0]), a.dataMin = l[0]);
					this.processedXData = l;
					this.processedYData = m
				} else this.currentDataGrouping =
					this.groupMap = null;
				this.hasGroupedData = h
			}
		};
		g.destroyGroupedData = function () {
			var a = this.groupedData;
			m(a || [], function (b, c) {
				b && (a[c] = b.destroy ? b.destroy() : null)
			});
			this.groupedData = null
		};
		g.generatePoints = function () {
			c.apply(this);
			this.destroyGroupedData();
			this.groupedData = this.hasGroupedData ? this.points : null
		};
		q(h.prototype, "update", function (a) {
			this.dataGroup ? l(24) : a.apply(this, [].slice.call(arguments, 1))
		});
		q(z.prototype, "tooltipFooterHeaderFormatter", function (b, c, d) {
			var f = c.series,
				e = f.tooltipOptions,
				g =
				f.options.dataGrouping,
				h = e.xDateFormat,
				l, n = f.xAxis,
				m = a.dateFormat;
			return n && "datetime" === n.options.type && g && k(c.key) ? (b = f.currentDataGrouping, g = g.dateTimeLabelFormats, b ? (n = g[b.unitName], 1 === b.count ? h = n[0] : (h = n[1], l = n[2])) : !h && g && (h = this.getXDateFormat(c, e, n)), h = m(h, c.key), l && (h += m(l, c.key + b.totalRange - 1)), p(e[(d ? "footer" : "header") + "Format"], {
				point: t(c.point, {
					key: h
				}),
				series: f
			})) : b.call(this, c, d)
		});
		g.destroy = function () {
			for (var a = this.groupedData || [], b = a.length; b--;) a[b] && a[b].destroy();
			n.apply(this)
		};
		q(g, "setOptions", function (a, b) {
			a = a.call(this, b);
			var c = this.type,
				e = this.chart.options.plotOptions,
				g = H[c].dataGrouping;
			d[c] && (g || (g = f(u, d[c])), a.dataGrouping = f(g, e.series && e.series.dataGrouping, e[c].dataGrouping, b.dataGrouping));
			this.chart.options.isStock && (this.requireSorting = !0);
			return a
		});
		q(F.prototype, "setScale", function (a) {
			a.call(this);
			m(this.series, function (a) {
				a.hasProcessed = !1
			})
		});
		F.prototype.getGroupPixelWidth = function () {
			var a = this.series,
				b = a.length,
				c, d = 0,
				f = !1,
				e;
			for (c = b; c--;)(e = a[c].options.dataGrouping) &&
				(d = Math.max(d, e.groupPixelWidth));
			for (c = b; c--;)(e = a[c].options.dataGrouping) && a[c].hasProcessed && (b = (a[c].processedXData || a[c].data).length, a[c].groupPixelWidth || b > this.chart.plotSizeX / d || b && e.forced) && (f = !0);
			return f ? d : 0
		};
		F.prototype.setDataGrouping = function (a, c) {
			var d;
			c = b(c, !0);
			a || (a = {
				forced: !1,
				units: null
			});
			if (this instanceof F)
				for (d = this.series.length; d--;) this.series[d].update({
					dataGrouping: a
				}, !1);
			else m(this.chart.options.series, function (b) {
				b.dataGrouping = a
			}, !1);
			c && this.chart.redraw()
		}
	})(M);
	(function (a) {
		var D = a.each,
			C = a.Point,
			F = a.seriesType,
			H = a.seriesTypes;
		F("ohlc", "column", {
			lineWidth: 1,
			tooltip: {
				pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'
			},
			threshold: null,
			states: {
				hover: {
					lineWidth: 3
				}
			}
		}, {
			pointArrayMap: ["open", "high", "low", "close"],
			toYData: function (a) {
				return [a.open, a.high, a.low, a.close]
			},
			pointValKey: "high",
			pointAttribs: function (a, m) {
				m = H.column.prototype.pointAttribs.call(this, a, m);
				var l = this.options;
				delete m.fill;
				m["stroke-width"] = l.lineWidth;
				m.stroke = a.options.color || (a.open < a.close ? l.upColor || this.color : this.color);
				return m
			},
			translate: function () {
				var a = this,
					m = a.yAxis,
					l = !!a.modifyValue,
					t = ["plotOpen", "yBottom", "plotClose"];
				H.column.prototype.translate.apply(a);
				D(a.points, function (p) {
					D([p.open, p.low, p.close], function (k, f) {
						null !== k && (l && (k = a.modifyValue(k)), p[t[f]] = m.toPixels(k, !0))
					})
				})
			},
			drawPoints: function () {
				var a =
					this,
					m = a.chart;
				D(a.points, function (l) {
					var r, p, k, f, b = l.graphic,
						h, z = !b;
					void 0 !== l.plotY && (b || (l.graphic = b = m.renderer.path().add(a.group)), b.attr(a.pointAttribs(l, l.selected && "select")), p = b.strokeWidth() % 2 / 2, h = Math.round(l.plotX) - p, k = Math.round(l.shapeArgs.width / 2), f = ["M", h, Math.round(l.yBottom), "L", h, Math.round(l.plotY)], null !== l.open && (r = Math.round(l.plotOpen) + p, f.push("M", h, r, "L", h - k, r)), null !== l.close && (r = Math.round(l.plotClose) + p, f.push("M", h, r, "L", h + k, r)), b[z ? "attr" : "animate"]({
						d: f
					}).addClass(l.getClassName(), !0))
				})
			},
			animate: null
		}, {
			getClassName: function () {
				return C.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
			}
		})
	})(M);
	(function (a) {
		var D = a.defaultPlotOptions,
			C = a.each,
			F = a.merge,
			H = a.seriesType,
			r = a.seriesTypes;
		H("candlestick", "ohlc", F(D.column, {
			states: {
				hover: {
					lineWidth: 2
				}
			},
			tooltip: D.ohlc.tooltip,
			threshold: null,
			lineColor: "#000000",
			lineWidth: 1,
			upColor: "#ffffff"
		}), {
			pointAttribs: function (a, l) {
				var m = r.column.prototype.pointAttribs.call(this, a, l),
					p = this.options,
					k = a.open < a.close,
					f = p.lineColor || this.color;
				m["stroke-width"] = p.lineWidth;
				m.fill = a.options.color || (k ? p.upColor || this.color : this.color);
				m.stroke = a.lineColor || (k ? p.upLineColor || f : f);
				l && (a = p.states[l], m.fill = a.color || m.fill, m.stroke = a.stroke || m.stroke);
				return m
			},
			drawPoints: function () {
				var a = this,
					l = a.chart;
				C(a.points, function (m) {
					var p = m.graphic,
						k, f, b, h, r, q, g, e = !p;
					void 0 !== m.plotY && (p || (m.graphic = p = l.renderer.path().add(a.group)), p.attr(a.pointAttribs(m, m.selected && "select")).shadow(a.options.shadow), r =
						p.strokeWidth() % 2 / 2, q = Math.round(m.plotX) - r, k = m.plotOpen, f = m.plotClose, b = Math.min(k, f), k = Math.max(k, f), g = Math.round(m.shapeArgs.width / 2), f = Math.round(b) !== Math.round(m.plotY), h = k !== m.yBottom, b = Math.round(b) + r, k = Math.round(k) + r, r = [], r.push("M", q - g, k, "L", q - g, b, "L", q + g, b, "L", q + g, k, "Z", "M", q, b, "L", q, f ? Math.round(m.plotY) : b, "M", q, k, "L", q, h ? Math.round(m.yBottom) : k), p[e ? "attr" : "animate"]({
							d: r
						}).addClass(m.getClassName(), !0))
				})
			}
		})
	})(M);
	(function (a) {
		var D = a.addEvent,
			C = a.each,
			F = a.merge,
			H = a.noop,
			r = a.Renderer,
			m = a.seriesType,
			l = a.seriesTypes,
			t = a.TrackerMixin,
			p = a.VMLRenderer,
			k = a.SVGRenderer.prototype.symbols;
		m("flags", "column", {
			pointRange: 0,
			shape: "flag",
			stackDistance: 12,
			textAlign: "center",
			tooltip: {
				pointFormat: "{point.text}\x3cbr/\x3e"
			},
			threshold: null,
			y: -30,
			fillColor: "#ffffff",
			lineWidth: 1,
			states: {
				hover: {
					lineColor: "#000000",
					fillColor: "#ccd6eb"
				}
			},
			style: {
				fontSize: "11px",
				fontWeight: "bold"
			}
		}, {
			sorted: !1,
			noSharedTooltip: !0,
			allowDG: !1,
			takeOrdinalPosition: !1,
			trackerGroups: ["markerGroup"],
			forceCrop: !0,
			init: a.Series.prototype.init,
			pointAttribs: function (a, b) {
				var f = this.options,
					k = a && a.color || this.color,
					l = f.lineColor,
					g = a && a.lineWidth;
				a = a && a.fillColor || f.fillColor;
				b && (a = f.states[b].fillColor, l = f.states[b].lineColor, g = f.states[b].lineWidth);
				return {
					fill: a || k,
					stroke: l || k,
					"stroke-width": g || f.lineWidth || 0
				}
			},
			translate: function () {
				l.column.prototype.translate.apply(this);
				var a = this.options,
					b = this.chart,
					k = this.points,
					m = k.length - 1,
					p, g, e = a.onSeries;
				p = e && b.get(e);
				var a = a.onKey || "y",
					e = p && p.options.step,
					c = p && p.points,
					n = c && c.length,
					r = this.xAxis,
					d = r.getExtremes(),
					t = 0,
					y, x, J;
				if (p && p.visible && n)
					for (t = (p.pointXOffset || 0) + (p.barW || 0) / 2, p = p.currentDataGrouping, x = c[n - 1].x + (p ? p.totalRange : 0), k.sort(function (a, b) {
							return a.x - b.x
						}), a = "plot" + a[0].toUpperCase() + a.substr(1); n-- && k[m] && !(p = k[m], y = c[n], y.x <= p.x && void 0 !== y[a] && (p.x <= x && (p.plotY = y[a], y.x < p.x && !e && (J = c[n + 1]) && void 0 !== J[a] && (p.plotY += (p.x - y.x) / (J.x - y.x) * (J[a] - y[a]))), m--, n++, 0 > m)););
				C(k, function (a, c) {
					var e;
					void 0 === a.plotY && (a.x >= d.min && a.x <= d.max ? a.plotY = b.chartHeight - r.bottom - (r.opposite ?
						r.height : 0) + r.offset - b.plotTop : a.shapeArgs = {});
					a.plotX += t;
					(g = k[c - 1]) && g.plotX === a.plotX && (void 0 === g.stackIndex && (g.stackIndex = 0), e = g.stackIndex + 1);
					a.stackIndex = e
				})
			},
			drawPoints: function () {
				var a = this.points,
					b = this.chart,
					k = b.renderer,
					l, m, g = this.options,
					e = g.y,
					c, n, p, d, r, y, x, t = this.yAxis;
				for (n = a.length; n--;) p = a[n], x = p.plotX > this.xAxis.len, l = p.plotX, d = p.stackIndex, c = p.options.shape || g.shape, m = p.plotY, void 0 !== m && (m = p.plotY + e - (void 0 !== d && d * g.stackDistance)), r = d ? void 0 : p.plotX, y = d ? void 0 : p.plotY, d = p.graphic,
					void 0 !== m && 0 <= l && !x ? (d || (d = p.graphic = k.label("", null, null, c, null, null, g.useHTML).attr(this.pointAttribs(p)).css(F(g.style, p.style)).attr({
						align: "flag" === c ? "left" : "center",
						width: g.width,
						height: g.height,
						"text-align": g.textAlign
					}).addClass("highcharts-point").add(this.markerGroup), d.shadow(g.shadow)), 0 < l && (l -= d.strokeWidth() % 2), d.attr({
						text: p.options.title || g.title || "A",
						x: l,
						y: m,
						anchorX: r,
						anchorY: y
					}), p.tooltipPos = b.inverted ? [t.len + t.pos - b.plotLeft - m, this.xAxis.len - l] : [l, m]) : d && (p.graphic = d.destroy())
			},
			drawTracker: function () {
				var a = this.points;
				t.drawTrackerPoint.apply(this);
				C(a, function (b) {
					var f = b.graphic;
					f && D(f.element, "mouseover", function () {
						0 < b.stackIndex && !b.raised && (b._y = f.y, f.attr({
							y: b._y - 8
						}), b.raised = !0);
						C(a, function (a) {
							a !== b && a.raised && a.graphic && (a.graphic.attr({
								y: a._y
							}), a.raised = !1)
						})
					})
				})
			},
			animate: H,
			buildKDTree: H,
			setClip: H
		});
		k.flag = function (a, b, k, l, m) {
			return ["M", m && m.anchorX || a, m && m.anchorY || b, "L", a, b + l, a, b, a + k, b, a + k, b + l, a, b + l, "Z"]
		};
		C(["circle", "square"], function (a) {
			k[a + "pin"] = function (b,
				f, l, m, g) {
				var e = g && g.anchorX;
				g = g && g.anchorY;
				"circle" === a && m > l && (b -= Math.round((m - l) / 2), l = m);
				b = k[a](b, f, l, m);
				e && g && b.push("M", e, f > g ? f : f + m, "L", e, g);
				return b
			}
		});
		r === p && C(["flag", "circlepin", "squarepin"], function (a) {
			p.prototype.symbols[a] = k[a]
		})
	})(M);
	(function (a) {
		function D(a, b, e) {
			this.init(a, b, e)
		}
		var C = a.addEvent,
			F = a.Axis,
			H = a.correctFloat,
			r = a.defaultOptions,
			m = a.defined,
			l = a.destroyObjectProperties,
			t = a.doc,
			p = a.each,
			k = a.fireEvent,
			f = a.hasTouch,
			b = a.isTouchDevice,
			h = a.merge,
			z = a.pick,
			q = a.removeEvent,
			g = a.wrap,
			e = {
				height: b ? 20 : 14,
				barBorderRadius: 0,
				buttonBorderRadius: 0,
				liveRedraw: a.svg && !b,
				margin: 10,
				minWidth: 6,
				step: .2,
				zIndex: 3,
				barBackgroundColor: "#cccccc",
				barBorderWidth: 1,
				barBorderColor: "#cccccc",
				buttonArrowColor: "#333333",
				buttonBackgroundColor: "#e6e6e6",
				buttonBorderColor: "#cccccc",
				buttonBorderWidth: 1,
				rifleColor: "#333333",
				trackBackgroundColor: "#f2f2f2",
				trackBorderColor: "#f2f2f2",
				trackBorderWidth: 1
			};
		r.scrollbar = h(!0, e, r.scrollbar);
		D.prototype = {
			init: function (a, b, f) {
				this.scrollbarButtons = [];
				this.renderer = a;
				this.userOptions =
					b;
				this.options = h(e, b);
				this.chart = f;
				this.size = z(this.options.size, this.options.height);
				b.enabled && (this.render(), this.initEvents(), this.addEvents())
			},
			render: function () {
				var a = this.renderer,
					b = this.options,
					e = this.size,
					d;
				this.group = d = a.g("scrollbar").attr({
					zIndex: b.zIndex,
					translateY: -99999
				}).add();
				this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
					x: 0,
					r: b.trackBorderRadius || 0,
					height: e,
					width: e
				}).add(d);
				this.track.attr({
					fill: b.trackBackgroundColor,
					stroke: b.trackBorderColor,
					"stroke-width": b.trackBorderWidth
				});
				this.trackBorderWidth = this.track.strokeWidth();
				this.track.attr({
					y: -this.trackBorderWidth % 2 / 2
				});
				this.scrollbarGroup = a.g().add(d);
				this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
					height: e,
					width: e,
					r: b.barBorderRadius || 0
				}).add(this.scrollbarGroup);
				this.scrollbarRifles = a.path(this.swapXY(["M", -3, e / 4, "L", -3, 2 * e / 3, "M", 0, e / 4, "L", 0, 2 * e / 3, "M", 3, e / 4, "L", 3, 2 * e / 3], b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
				this.scrollbar.attr({
					fill: b.barBackgroundColor,
					stroke: b.barBorderColor,
					"stroke-width": b.barBorderWidth
				});
				this.scrollbarRifles.attr({
					stroke: b.rifleColor,
					"stroke-width": 1
				});
				this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
				this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
				this.drawScrollbarButton(0);
				this.drawScrollbarButton(1)
			},
			position: function (a, b, e, d) {
				var c = this.options.vertical,
					f = 0,
					g = this.rendered ? "animate" : "attr";
				this.x = a;
				this.y = b + this.trackBorderWidth;
				this.width = e;
				this.xOffset = this.height = d;
				this.yOffset = f;
				c ? (this.width =
					this.yOffset = e = f = this.size, this.xOffset = b = 0, this.barWidth = d - 2 * e, this.x = a += this.options.margin) : (this.height = this.xOffset = d = b = this.size, this.barWidth = e - 2 * d, this.y += this.options.margin);
				this.group[g]({
					translateX: a,
					translateY: this.y
				});
				this.track[g]({
					width: e,
					height: d
				});
				this.scrollbarButtons[1].attr({
					translateX: c ? 0 : e - b,
					translateY: c ? d - f : 0
				})
			},
			drawScrollbarButton: function (a) {
				var b = this.renderer,
					c = this.scrollbarButtons,
					d = this.options,
					e = this.size,
					f;
				f = b.g().add(this.group);
				c.push(f);
				f = b.rect().addClass("highcharts-scrollbar-button").add(f);
				f.attr({
					stroke: d.buttonBorderColor,
					"stroke-width": d.buttonBorderWidth,
					fill: d.buttonBackgroundColor
				});
				f.attr(f.crisp({
					x: -.5,
					y: -.5,
					width: e + 1,
					height: e + 1,
					r: d.buttonBorderRadius
				}, f.strokeWidth()));
				f = b.path(this.swapXY(["M", e / 2 + (a ? -1 : 1), e / 2 - 3, "L", e / 2 + (a ? -1 : 1), e / 2 + 3, "L", e / 2 + (a ? 2 : -2), e / 2], d.vertical)).addClass("highcharts-scrollbar-arrow").add(c[a]);
				f.attr({
					fill: d.buttonArrowColor
				})
			},
			swapXY: function (a, b) {
				var c = a.length,
					d;
				if (b)
					for (b = 0; b < c; b += 3) d = a[b + 1], a[b + 1] = a[b + 2], a[b + 2] = d;
				return a
			},
			setRange: function (a,
				b) {
				var c = this.options,
					d = c.vertical,
					e = c.minWidth,
					f = this.barWidth,
					g, k, h = this.rendered && !this.hasDragged ? "animate" : "attr";
				m(f) && (a = Math.max(a, 0), g = f * a, this.calculatedWidth = k = H(f * Math.min(b, 1) - g), k < e && (g = (f - e + k) * a, k = e), e = Math.floor(g + this.xOffset + this.yOffset), f = k / 2 - .5, this.from = a, this.to = b, d ? (this.scrollbarGroup[h]({
					translateY: e
				}), this.scrollbar[h]({
					height: k
				}), this.scrollbarRifles[h]({
					translateY: f
				}), this.scrollbarTop = e, this.scrollbarLeft = 0) : (this.scrollbarGroup[h]({
						translateX: e
					}), this.scrollbar[h]({
						width: k
					}),
					this.scrollbarRifles[h]({
						translateX: f
					}), this.scrollbarLeft = e, this.scrollbarTop = 0), 12 >= k ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0), !1 === c.showFull && (0 >= a && 1 <= b ? this.group.hide() : this.group.show()), this.rendered = !0)
			},
			initEvents: function () {
				var a = this;
				a.mouseMoveHandler = function (b) {
					var c = a.chart.pointer.normalize(b),
						d = a.options.vertical ? "chartY" : "chartX",
						e = a.initPositions;
					!a.grabbedCenter || b.touches && 0 === b.touches[0][d] || (c = a.cursorToScrollbarPosition(c)[d], d = a[d], d = c - d, a.hasDragged = !0,
						a.updatePosition(e[0] + d, e[1] + d), a.hasDragged && k(a, "changed", {
							from: a.from,
							to: a.to,
							trigger: "scrollbar",
							DOMType: b.type,
							DOMEvent: b
						}))
				};
				a.mouseUpHandler = function (b) {
					a.hasDragged && k(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMType: b.type,
						DOMEvent: b
					});
					a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null
				};
				a.mouseDownHandler = function (b) {
					b = a.chart.pointer.normalize(b);
					b = a.cursorToScrollbarPosition(b);
					a.chartX = b.chartX;
					a.chartY = b.chartY;
					a.initPositions = [a.from, a.to];
					a.grabbedCenter = !0
				};
				a.buttonToMinClick =
					function (b) {
						var c = H(a.to - a.from) * a.options.step;
						a.updatePosition(H(a.from - c), H(a.to - c));
						k(a, "changed", {
							from: a.from,
							to: a.to,
							trigger: "scrollbar",
							DOMEvent: b
						})
					};
				a.buttonToMaxClick = function (b) {
					var c = (a.to - a.from) * a.options.step;
					a.updatePosition(a.from + c, a.to + c);
					k(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMEvent: b
					})
				};
				a.trackClick = function (b) {
					var c = a.chart.pointer.normalize(b),
						d = a.to - a.from,
						e = a.y + a.scrollbarTop,
						f = a.x + a.scrollbarLeft;
					a.options.vertical && c.chartY > e || !a.options.vertical && c.chartX >
						f ? a.updatePosition(a.from + d, a.to + d) : a.updatePosition(a.from - d, a.to - d);
					k(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMEvent: b
					})
				}
			},
			cursorToScrollbarPosition: function (a) {
				var b = this.options,
					b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
				return {
					chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - b),
					chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - b)
				}
			},
			updatePosition: function (a, b) {
				1 < b && (a = H(1 - H(b - a)), b = 1);
				0 > a && (b = H(b - a), a = 0);
				this.from = a;
				this.to = b
			},
			update: function (a) {
				this.destroy();
				this.init(this.chart.renderer,
					h(!0, this.options, a), this.chart)
			},
			addEvents: function () {
				var a = this.options.inverted ? [1, 0] : [0, 1],
					b = this.scrollbarButtons,
					e = this.scrollbarGroup.element,
					d = this.mouseDownHandler,
					g = this.mouseMoveHandler,
					k = this.mouseUpHandler,
					a = [
						[b[a[0]].element, "click", this.buttonToMinClick],
						[b[a[1]].element, "click", this.buttonToMaxClick],
						[this.track.element, "click", this.trackClick],
						[e, "mousedown", d],
						[t, "mousemove", g],
						[t, "mouseup", k]
					];
				f && a.push([e, "touchstart", d], [t, "touchmove", g], [t, "touchend", k]);
				p(a, function (a) {
					C.apply(null,
						a)
				});
				this._events = a
			},
			removeEvents: function () {
				p(this._events, function (a) {
					q.apply(null, a)
				});
				this._events = void 0
			},
			destroy: function () {
				var a = this.chart.scroller;
				this.removeEvents();
				p(["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"], function (a) {
					this[a] && this[a].destroy && (this[a] = this[a].destroy())
				}, this);
				a && (a.scrollbar = null, l(a.scrollbarButtons))
			}
		};
		g(F.prototype, "init", function (a) {
			var b = this;
			a.apply(b, [].slice.call(arguments, 1));
			b.options.scrollbar && b.options.scrollbar.enabled && (b.options.scrollbar.vertical = !b.horiz, b.options.startOnTick = b.options.endOnTick = !1, b.scrollbar = new D(b.chart.renderer, b.options.scrollbar, b.chart), C(b.scrollbar, "changed", function (a) {
				var c = Math.min(z(b.options.min, b.min), b.min, b.dataMin),
					e = Math.max(z(b.options.max, b.max), b.max, b.dataMax) - c,
					f;
				b.horiz && !b.reversed || !b.horiz && b.reversed ? (f = c + e * this.to, c += e * this.from) : (f = c + e * (1 - this.from), c += e * (1 - this.to));
				b.setExtremes(c, f, !0, !1, a)
			}))
		});
		g(F.prototype, "render", function (a) {
			var b = Math.min(z(this.options.min, this.min), this.min, this.dataMin),
				c = Math.max(z(this.options.max, this.max), this.max, this.dataMax),
				d = this.scrollbar,
				e;
			a.apply(this, [].slice.call(arguments, 1));
			d && (this.horiz ? d.position(this.left, this.top + this.height + this.offset + 2 + (this.opposite ? 0 : this.axisTitleMargin), this.width, this.height) : d.position(this.left + this.width + 2 + this.offset + (this.opposite ? this.axisTitleMargin : 0), this.top, this.width, this.height), isNaN(b) || isNaN(c) || !m(this.min) || !m(this.max) ? d.setRange(0, 0) : (e = (this.min - b) / (c - b), b = (this.max - b) / (c - b), this.horiz && !this.reversed ||
				!this.horiz && this.reversed ? d.setRange(e, b) : d.setRange(1 - b, 1 - e)))
		});
		g(F.prototype, "getOffset", function (a) {
			var b = this.horiz ? 2 : 1,
				c = this.scrollbar;
			a.apply(this, [].slice.call(arguments, 1));
			c && (this.chart.axisOffset[b] += c.size + c.options.margin)
		});
		g(F.prototype, "destroy", function (a) {
			this.scrollbar && (this.scrollbar = this.scrollbar.destroy());
			a.apply(this, [].slice.call(arguments, 1))
		});
		a.Scrollbar = D
	})(M);
	(function (a) {
		function D(a) {
			this.init(a)
		}
		var C = a.addEvent,
			F = a.Axis,
			H = a.Chart,
			r = a.color,
			m = a.defaultOptions,
			l = a.defined,
			t = a.destroyObjectProperties,
			p = a.doc,
			k = a.each,
			f = a.erase,
			b = a.error,
			h = a.extend,
			z = a.grep,
			q = a.hasTouch,
			g = a.isNumber,
			e = a.isObject,
			c = a.isTouchDevice,
			n = a.merge,
			u = a.pick,
			d = a.removeEvent,
			A = a.Scrollbar,
			y = a.Series,
			x = a.seriesTypes,
			J = a.wrap,
			E = [].concat(a.defaultDataGroupingUnits),
			G = function (a) {
				var b = z(arguments, g);
				if (b.length) return Math[a].apply(0, b)
			};
		E[4] = ["day", [1, 2, 3, 4]];
		E[5] = ["week", [1, 2, 3]];
		x = void 0 === x.areaspline ? "line" : "areaspline";
		h(m, {
			navigator: {
				height: 40,
				margin: 25,
				maskInside: !0,
				handles: {
					backgroundColor: "#f2f2f2",
					borderColor: "#999999"
				},
				maskFill: r("#6685c2").setOpacity(.3).get(),
				outlineColor: "#cccccc",
				outlineWidth: 1,
				series: {
					type: x,
					color: "#335cad",
					fillOpacity: .05,
					lineWidth: 1,
					compare: null,
					dataGrouping: {
						approximation: "average",
						enabled: !0,
						groupPixelWidth: 2,
						smoothed: !0,
						units: E
					},
					dataLabels: {
						enabled: !1,
						zIndex: 2
					},
					id: "highcharts-navigator-series",
					className: "highcharts-navigator-series",
					lineColor: null,
					marker: {
						enabled: !1
					},
					pointRange: 0,
					shadow: !1,
					threshold: null
				},
				xAxis: {
					className: "highcharts-navigator-xaxis",
					tickLength: 0,
					lineWidth: 0,
					gridLineColor: "#e6e6e6",
					gridLineWidth: 1,
					tickPixelInterval: 200,
					labels: {
						align: "left",
						style: {
							color: "#999999"
						},
						x: 3,
						y: -4
					},
					crosshair: !1
				},
				yAxis: {
					className: "highcharts-navigator-yaxis",
					gridLineWidth: 0,
					startOnTick: !1,
					endOnTick: !1,
					minPadding: .1,
					maxPadding: .1,
					labels: {
						enabled: !1
					},
					crosshair: !1,
					title: {
						text: null
					},
					tickLength: 0,
					tickWidth: 0
				}
			}
		});
		D.prototype = {
			drawHandle: function (a, b) {
				var c = this.chart.renderer,
					d = this.handles;
				this.rendered || (d[b] = c.path(["M", -4.5, .5, "L", 3.5, .5, 3.5, 15.5, -4.5, 15.5, -4.5, .5, "M", -1.5, 4, "L", -1.5, 12, "M", .5, 4, "L", .5, 12]).attr({
					zIndex: 10 - b
				}).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][b]).add(), c = this.navigatorOptions.handles, d[b].attr({
					fill: c.backgroundColor,
					stroke: c.borderColor,
					"stroke-width": 1
				}).css({
					cursor: "ew-resize"
				}));
				d[b][this.rendered && !this.hasDragged ? "animate" : "attr"]({
					translateX: Math.round(this.scrollerLeft + this.scrollbarHeight + parseInt(a, 10)),
					translateY: Math.round(this.top + this.height / 2 - 8)
				})
			},
			update: function (a) {
				this.destroy();
				n(!0, this.chart.options.navigator, this.options, a);
				this.init(this.chart)
			},
			render: function (a, b, c, d) {
				var e = this.chart,
					f = e.renderer,
					k, h, m, n;
				n = this.scrollbarHeight;
				var p = this.xAxis,
					v = this.navigatorOptions,
					q = v.maskInside,
					r = this.height,
					w = this.top,
					y = this.navigatorEnabled,
					x = this.outlineHeight,
					t;
				t = this.rendered;
				if (g(a) && g(b) && (!this.hasDragged || l(c)) && (this.navigatorLeft = k = u(p.left, e.plotLeft + n), this.navigatorWidth = h = u(p.len, e.plotWidth - 2 * n), this.scrollerLeft = m = k - n, this.scrollerWidth = n = n = h + 2 * n, c = u(c, p.translate(a)),
						d = u(d, p.translate(b)), g(c) && Infinity !== Math.abs(c) || (c = 0, d = n), !(p.translate(d, !0) - p.translate(c, !0) < e.xAxis[0].minRange))) {
					this.zoomedMax = Math.min(Math.max(c, d, 0), h);
					this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(c, d), 0), h);
					this.range = this.zoomedMax - this.zoomedMin;
					b = Math.round(this.zoomedMax);
					a = Math.round(this.zoomedMin);
					!t && y && (this.navigatorGroup = c = f.g("navigator").attr({
						zIndex: 3
					}).add(), this.leftShade = f.rect().addClass("highcharts-navigator-mask" + (q ? "-inside" :
						"")).attr({
						fill: v.maskFill
					}).css(q && {
						cursor: "ew-resize"
					}).add(c), q || (this.rightShade = f.rect().addClass("highcharts-navigator-mask").attr({
						fill: v.maskFill
					}).add(c)), this.outline = f.path().addClass("highcharts-navigator-outline").attr({
						"stroke-width": v.outlineWidth,
						stroke: v.outlineColor
					}).add(c));
					if (y) {
						f = t && !this.hasDragged ? "animate" : "attr";
						q = this.outline.strokeWidth();
						q /= 2;
						t = w + q;
						this.leftShade[f](v.maskInside ? {
							x: k + a,
							y: w,
							width: b - a,
							height: r
						} : {
							x: k,
							y: w,
							width: a,
							height: r
						});
						if (this.rightShade) this.rightShade[f]({
							x: k +
								b,
							y: w,
							width: h - b,
							height: r
						});
						this.outline[f]({
							d: ["M", m, t, "L", k + a - q, t, k + a - q, t + x, "L", k + b - q, t + x, "L", k + b - q, t, m + n, t].concat(v.maskInside ? ["M", k + a + q, t, "L", k + b - q, t] : [])
						});
						this.drawHandle(a + q, 0);
						this.drawHandle(b + q, 1)
					}
					this.scrollbar && (this.scrollbar.hasDragged = this.hasDragged, this.scrollbar.position(this.scrollerLeft, this.top + (y ? this.height : -this.scrollbarHeight), this.scrollerWidth, this.scrollbarHeight), this.scrollbar.setRange(a / h, b / h));
					this.rendered = !0
				}
			},
			addEvents: function () {
				var a = this.chart,
					b = a.container,
					c = this.mouseDownHandler,
					d = this.mouseMoveHandler,
					e = this.mouseUpHandler,
					f;
				f = [
					[b, "mousedown", c],
					[b, "mousemove", d],
					[p, "mouseup", e]
				];
				q && f.push([b, "touchstart", c], [b, "touchmove", d], [p, "touchend", e]);
				k(f, function (a) {
					C.apply(null, a)
				});
				this._events = f;
				this.series && this.series[0] && C(this.series[0].xAxis, "foundExtremes", function () {
					a.scroller.modifyNavigatorAxisExtremes()
				});
				C(a, "redraw", function () {
					var a = this.scroller,
						b = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || a.scrollbar && this.xAxis[0]);
					b && a.render(b.min,
						b.max)
				})
			},
			removeEvents: function () {
				this._events && (k(this._events, function (a) {
					d.apply(null, a)
				}), this._events = void 0);
				this.removeBaseSeriesEvents()
			},
			removeBaseSeriesEvents: function () {
				var a = this.baseSeries || [];
				this.navigatorEnabled && a[0] && !1 !== this.navigatorOptions.adaptToUpdatedData && (k(a, function (a) {
					d(a, "updatedData", this.updatedDataHandler)
				}, this), a[0].xAxis && d(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
			},
			init: function (a) {
				var b = a.options,
					d = b.navigator,
					e = d.enabled,
					b = b.scrollbar,
					f = b.enabled,
					g = e ? d.height : 0,
					k = f ? b.height : 0;
				this.handles = [];
				this.scrollbarButtons = [];
				this.elementsToDestroy = [];
				this.chart = a;
				this.setBaseSeries();
				this.height = g;
				this.scrollbarHeight = k;
				this.scrollbarEnabled = f;
				this.navigatorEnabled = e;
				this.navigatorOptions = d;
				this.scrollbarOptions = b;
				this.outlineHeight = g + k;
				var h = this,
					m, p, e = h.baseSeries;
				h.mouseDownHandler = function (b) {
					b = a.pointer.normalize(b);
					var d = h.zoomedMin,
						e = h.zoomedMax,
						f = h.top,
						k = h.scrollerLeft,
						l = h.scrollerWidth,
						n = h.navigatorLeft,
						q = h.navigatorWidth,
						v = h.scrollbarPad ||
						0,
						r = h.range,
						w = b.chartX,
						y = b.chartY;
					b = a.xAxis[0];
					var t, x = c ? 10 : 7;
					y > f && y < f + g && (Math.abs(w - d - n) < x ? (h.grabbedLeft = !0, h.otherHandlePos = e, h.fixedExtreme = b.max, a.fixedRange = null) : Math.abs(w - e - n) < x ? (h.grabbedRight = !0, h.otherHandlePos = d, h.fixedExtreme = b.min, a.fixedRange = null) : w > n + d - v && w < n + e + v ? (h.grabbedCenter = w, h.fixedWidth = r, p = w - d) : w > k && w < k + l && (e = w - n - r / 2, 0 > e ? e = 0 : e + r >= q && (e = q - r, t = h.getUnionExtremes().dataMax), e !== d && (h.fixedWidth = r, d = m.toFixedRange(e, e + r, null, t), b.setExtremes(d.min, d.max, !0, null, {
						trigger: "navigator"
					}))))
				};
				h.mouseMoveHandler = function (b) {
					var c = h.scrollbarHeight,
						d = h.navigatorLeft,
						e = h.navigatorWidth,
						f = h.scrollerLeft,
						g = h.scrollerWidth,
						k = h.range,
						l;
					b.touches && 0 === b.touches[0].pageX || (b = a.pointer.normalize(b), l = b.chartX, l < d ? l = d : l > f + g - c && (l = f + g - c), h.grabbedLeft ? (h.hasDragged = !0, h.render(0, 0, l - d, h.otherHandlePos)) : h.grabbedRight ? (h.hasDragged = !0, h.render(0, 0, h.otherHandlePos, l - d)) : h.grabbedCenter && (h.hasDragged = !0, l < p ? l = p : l > e + p - k && (l = e + p - k), h.render(0, 0, l - p, l - p + k)), h.hasDragged && h.scrollbar && h.scrollbar.options.liveRedraw &&
						(b.DOMType = b.type, setTimeout(function () {
							h.mouseUpHandler(b)
						}, 0)))
				};
				h.mouseUpHandler = function (b) {
					var c, d, e = b.DOMEvent || b;
					if (h.hasDragged || "scrollbar" === b.trigger) h.zoomedMin === h.otherHandlePos ? c = h.fixedExtreme : h.zoomedMax === h.otherHandlePos && (d = h.fixedExtreme), h.zoomedMax === h.navigatorWidth && (d = h.getUnionExtremes().dataMax), c = m.toFixedRange(h.zoomedMin, h.zoomedMax, c, d), l(c.min) && a.xAxis[0].setExtremes(c.min, c.max, !0, h.hasDragged ? !1 : null, {
						trigger: "navigator",
						triggerOp: "navigator-drag",
						DOMEvent: e
					});
					"mousemove" !== b.DOMType && (h.grabbedLeft = h.grabbedRight = h.grabbedCenter = h.fixedWidth = h.fixedExtreme = h.otherHandlePos = h.hasDragged = p = null)
				};
				var b = a.xAxis.length,
					f = a.yAxis.length,
					q = e && e[0] && e[0].xAxis || a.xAxis[0];
				a.extraBottomMargin = h.outlineHeight + d.margin;
				a.isDirtyBox = !0;
				h.navigatorEnabled ? (h.xAxis = m = new F(a, n({
					breaks: q.options.breaks,
					ordinal: q.options.ordinal
				}, d.xAxis, {
					id: "navigator-x-axis",
					yAxis: "navigator-y-axis",
					isX: !0,
					type: "datetime",
					index: b,
					height: g,
					offset: 0,
					offsetLeft: k,
					offsetRight: -k,
					keepOrdinalPadding: !0,
					startOnTick: !1,
					endOnTick: !1,
					minPadding: 0,
					maxPadding: 0,
					zoomEnabled: !1
				})), h.yAxis = new F(a, n(d.yAxis, {
					id: "navigator-y-axis",
					alignTicks: !1,
					height: g,
					offset: 0,
					index: f,
					zoomEnabled: !1
				})), e || d.series.data ? h.addBaseSeries() : 0 === a.series.length && J(a, "redraw", function (b, c) {
					0 < a.series.length && !h.series && (h.setBaseSeries(), a.redraw = b);
					b.call(a, c)
				})) : h.xAxis = m = {
					translate: function (b, c) {
						var d = a.xAxis[0],
							e = d.getExtremes(),
							f = a.plotWidth - 2 * k,
							g = G("min", d.options.min, e.dataMin),
							d = G("max", d.options.max, e.dataMax) - g;
						return c ?
							b * d / f + g : f * (b - g) / d
					},
					toFixedRange: F.prototype.toFixedRange,
					fake: !0
				};
				a.options.scrollbar.enabled && (a.scrollbar = h.scrollbar = new A(a.renderer, n(a.options.scrollbar, {
					margin: h.navigatorEnabled ? 0 : 10
				}), a), C(h.scrollbar, "changed", function (b) {
					var c = h.navigatorWidth,
						d = c * this.to,
						c = c * this.from;
					h.hasDragged = h.scrollbar.hasDragged;
					h.render(0, 0, c, d);
					(a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType) && setTimeout(function () {
						h.mouseUpHandler(b)
					})
				}));
				h.addBaseSeriesEvents();
				h.addEvents()
			},
			getUnionExtremes: function (a) {
				var b =
					this.chart.xAxis[0],
					c = this.xAxis,
					d = c.options,
					e = b.options,
					f;
				a && null === b.dataMin || (f = {
					dataMin: u(d && d.min, G("min", e.min, b.dataMin, c.dataMin, c.min)),
					dataMax: u(d && d.max, G("max", e.max, b.dataMax, c.dataMax, c.max))
				});
				return f
			},
			setBaseSeries: function (a) {
				var b = this.chart,
					c = this.baseSeries = [];
				a = a || b.options && b.options.navigator.baseSeries || 0;
				this.series && (this.removeBaseSeriesEvents(), k(this.series, function (a) {
					a.destroy()
				}));
				k(b.series || [], function (b, d) {
					(b.options.showInNavigator || (d === a || b.options.id === a) &&
						!1 !== b.options.showInNavigator) && c.push(b)
				});
				this.xAxis && !this.xAxis.fake && this.addBaseSeries()
			},
			addBaseSeries: function () {
				var a = this,
					b = a.chart,
					c = a.series = [],
					d = a.baseSeries,
					e, f, g = a.navigatorOptions.series,
					h, l = {
						enableMouseTracking: !1,
						group: "nav",
						padXAxis: !1,
						xAxis: "navigator-x-axis",
						yAxis: "navigator-y-axis",
						showInLegend: !1,
						stacking: !1,
						isInternal: !0,
						visible: !0
					};
				d ? k(d, function (d, k) {
					l.name = "Navigator " + (k + 1);
					e = d.options || {};
					h = e.navigatorOptions || {};
					f = n(e, l, g, h);
					k = h.data || g.data;
					a.hasNavigatorData = a.hasNavigatorData ||
						!!k;
					f.data = k || e.data && e.data.slice(0);
					d.navigatorSeries = b.initSeries(f);
					c.push(d.navigatorSeries)
				}) : (f = n(g, l), f.data = g.data, a.hasNavigatorData = !!f.data, c.push(b.initSeries(f)));
				this.addBaseSeriesEvents()
			},
			addBaseSeriesEvents: function () {
				var a = this,
					b = a.baseSeries || [];
				b[0] && b[0].xAxis && C(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
				!1 !== this.navigatorOptions.adaptToUpdatedData && k(b, function (b) {
					b.xAxis && (C(b, "updatedData", this.updatedDataHandler), b.userOptions.events = h(b.userOptions.event, {
						updatedData: this.updatedDataHandler
					}));
					C(b, "remove", function () {
						this.navigatorSeries && (f(a.series, this.navigatorSeries), this.navigatorSeries.remove(), delete this.navigatorSeries)
					})
				}, this)
			},
			modifyNavigatorAxisExtremes: function () {
				var a = this.xAxis,
					b;
				a.getExtremes && (!(b = this.getUnionExtremes(!0)) || b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax))
			},
			modifyBaseAxisExtremes: function () {
				var a = this.chart.scroller,
					b = this.getExtremes(),
					c = b.dataMin,
					d = b.dataMax,
					b = b.max - b.min,
					e = a.stickToMin,
					f = a.stickToMax,
					h, k, l = a.series && a.series[0],
					m = !!this.setExtremes;
				this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (e && (k = c, h = k + b), f && (h = d, e || (k = Math.max(h - b, l && l.xData ? l.xData[0] : -Number.MAX_VALUE))), m && (e || f) && g(k) && (this.min = this.userMin = k, this.max = this.userMax = h));
				a.stickToMin = a.stickToMax = null
			},
			updatedDataHandler: function () {
				var a = this.chart.scroller,
					b = this.navigatorSeries;
				a.stickToMin = g(this.xAxis.min) && this.xAxis.min <= this.xData[0];
				a.stickToMax = Math.round(a.zoomedMax) >= Math.round(a.navigatorWidth);
				b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0], b.setData(this.options.data, !1, null, !1))
			},
			destroy: function () {
				this.removeEvents();
				this.xAxis && (f(this.chart.xAxis, this.xAxis), f(this.chart.axes, this.xAxis));
				this.yAxis && (f(this.chart.yAxis, this.yAxis), f(this.chart.axes, this.yAxis));
				k(this.series || [], function (a) {
					a.destroy && a.destroy()
				});
				k("series xAxis yAxis leftShade rightShade outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "), function (a) {
					this[a] &&
						this[a].destroy && this[a].destroy();
					this[a] = null
				}, this);
				k([this.handles, this.elementsToDestroy], function (a) {
					t(a)
				}, this)
			}
		};
		a.Navigator = D;
		J(F.prototype, "zoom", function (a, b, c) {
			var d = this.chart,
				e = d.options,
				f = e.chart.zoomType,
				g = e.navigator,
				e = e.rangeSelector,
				h;
			this.isXAxis && (g && g.enabled || e && e.enabled) && ("x" === f ? d.resetZoomButton = "blocked" : "y" === f ? h = !1 : "xy" === f && (d = this.previousZoom, l(b) ? this.previousZoom = [this.min, this.max] : d && (b = d[0], c = d[1], delete this.previousZoom)));
			return void 0 !== h ? h : a.call(this, b,
				c)
		});
		J(H.prototype, "init", function (a, b, c) {
			C(this, "beforeRender", function () {
				var a = this.options;
				if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new D(this)
			});
			a.call(this, b, c)
		});
		J(H.prototype, "getMargins", function (a) {
			var b = this.legend,
				c = b.options,
				d = this.scroller,
				e, f;
			a.apply(this, [].slice.call(arguments, 1));
			d && (e = d.xAxis, f = d.yAxis, d.top = d.navigatorOptions.top || this.chartHeight - d.height - d.scrollbarHeight - this.spacing[2] - ("bottom" === c.verticalAlign && c.enabled && !c.floating ? b.legendHeight +
				u(c.margin, 10) : 0), e && f && (e.options.top = f.options.top = d.top, e.setAxisSize(), f.setAxisSize()))
		});
		J(y.prototype, "addPoint", function (a, c, d, f, g) {
			var h = this.options.turboThreshold;
			h && this.xData.length > h && e(c, !0) && this.chart.scroller && b(20, !0);
			a.call(this, c, d, f, g)
		});
		J(H.prototype, "addSeries", function (a, b, c, d) {
			a = a.call(this, b, !1, d);
			this.scroller && this.scroller.setBaseSeries();
			u(c, !0) && this.redraw();
			return a
		});
		J(y.prototype, "update", function (a, b, c) {
			a.call(this, b, !1);
			this.chart.scroller && this.chart.scroller.setBaseSeries();
			u(c, !0) && this.chart.redraw()
		})
	})(M);
	(function (a) {
		function D(a) {
			this.init(a)
		}
		var C = a.addEvent,
			F = a.Axis,
			H = a.Chart,
			r = a.css,
			m = a.createElement,
			l = a.dateFormat,
			t = a.defaultOptions,
			p = t.global.useUTC,
			k = a.defined,
			f = a.destroyObjectProperties,
			b = a.discardElement,
			h = a.each,
			z = a.extend,
			q = a.fireEvent,
			g = a.Date,
			e = a.isNumber,
			c = a.merge,
			n = a.pick,
			u = a.pInt,
			d = a.splat,
			A = a.wrap;
		z(t, {
			rangeSelector: {
				buttonTheme: {
					"stroke-width": 0,
					width: 28,
					height: 18,
					padding: 2,
					zIndex: 7
				},
				height: 35,
				inputPosition: {
					align: "right"
				},
				labelStyle: {
					color: "#666666"
				}
			}
		});
		t.lang = c(t.lang, {
			rangeSelectorZoom: "Zoom",
			rangeSelectorFrom: "From",
			rangeSelectorTo: "To"
		});
		D.prototype = {
			clickButton: function (a, b) {
				var c = this,
					f = c.chart,
					g = c.buttonOptions[a],
					k = f.xAxis[0],
					l = f.scroller && f.scroller.getUnionExtremes() || k || {},
					m = l.dataMin,
					q = l.dataMax,
					r, t = k && Math.round(Math.min(k.max, n(q, k.max))),
					y = g.type,
					x, l = g._range,
					u, z, A, D = g.dataGrouping;
				if (null !== m && null !== q) {
					f.fixedRange = l;
					D && (this.forcedDataGrouping = !0, F.prototype.setDataGrouping.call(k || {
						chart: this.chart
					}, D, !1));
					if ("month" === y || "year" ===
						y) k ? (y = {
						range: g,
						max: t,
						dataMin: m,
						dataMax: q
					}, r = k.minFromRange.call(y), e(y.newMax) && (t = y.newMax)) : l = g;
					else if (l) r = Math.max(t - l, m), t = Math.min(r + l, q);
					else if ("ytd" === y)
						if (k) void 0 === q && (m = Number.MAX_VALUE, q = Number.MIN_VALUE, h(f.series, function (a) {
							a = a.xData;
							m = Math.min(a[0], m);
							q = Math.max(a[a.length - 1], q)
						}), b = !1), t = c.getYTDExtremes(q, m, p), r = u = t.min, t = t.max;
						else {
							C(f, "beforeRender", function () {
								c.clickButton(a)
							});
							return
						}
					else "all" === y && k && (r = m, t = q);
					c.setSelected(a);
					k ? k.setExtremes(r, t, n(b, 1), null, {
						trigger: "rangeSelectorButton",
						rangeSelectorButton: g
					}) : (x = d(f.options.xAxis)[0], A = x.range, x.range = l, z = x.min, x.min = u, C(f, "load", function () {
						x.range = A;
						x.min = z
					}))
				}
			},
			setSelected: function (a) {
				this.selected = this.options.selected = a
			},
			defaultButtons: [{
				type: "month",
				count: 1,
				text: "1m"
			}, {
				type: "month",
				count: 3,
				text: "3m"
			}, {
				type: "month",
				count: 6,
				text: "6m"
			}, {
				type: "ytd",
				text: "YTD"
			}, {
				type: "year",
				count: 1,
				text: "1y"
			}, {
				type: "all",
				text: "All"
			}],
			init: function (a) {
				var b = this,
					c = a.options.rangeSelector,
					d = c.buttons || [].concat(b.defaultButtons),
					e = c.selected,
					f = function () {
						var a =
							b.minInput,
							c = b.maxInput;
						a && a.blur && q(a, "blur");
						c && c.blur && q(c, "blur")
					};
				b.chart = a;
				b.options = c;
				b.buttons = [];
				a.extraTopMargin = c.height;
				b.buttonOptions = d;
				this.unMouseDown = C(a.container, "mousedown", f);
				this.unResize = C(a, "resize", f);
				h(d, b.computeButtonRange);
				void 0 !== e && d[e] && this.clickButton(e, !1);
				C(a, "load", function () {
					C(a.xAxis[0], "setExtremes", function (c) {
						this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && this.setDataGrouping(!1, !1)
					})
				})
			},
			updateButtonStates: function () {
				var a = this.chart,
					b = a.xAxis[0],
					c = Math.round(b.max - b.min),
					d = !b.hasVisibleSeries,
					a = a.scroller && a.scroller.getUnionExtremes() || b,
					f = a.dataMin,
					g = a.dataMax,
					a = this.getYTDExtremes(g, f, p),
					k = a.min,
					l = a.max,
					m = this.selected,
					n = e(m),
					q = this.options.allButtonsEnabled,
					r = this.buttons;
				h(this.buttonOptions, function (a, e) {
					var h = a._range,
						p = a.type,
						t = a.count || 1;
					a = r[e];
					var v = 0;
					e = e === m;
					var w = h > g - f,
						y = h < b.minRange,
						x = !1,
						u = !1,
						h = h === c;
					("month" === p || "year" === p) && c >= 864E5 * {
						month: 28,
						year: 365
					}[p] * t && c <= 864E5 * {
						month: 31,
						year: 366
					}[p] * t ? h = !0 : "ytd" === p ? (h = l - k === c, x = !e) : "all" === p && (h = b.max - b.min >= g - f, u = !e && n && h);
					p = !q && (w || y || u || d);
					h = e && h || h && !n && !x;
					p ? v = 3 : h && (n = !0, v = 2);
					a.state !== v && a.setState(v)
				})
			},
			computeButtonRange: function (a) {
				var b = a.type,
					c = a.count || 1,
					d = {
						millisecond: 1,
						second: 1E3,
						minute: 6E4,
						hour: 36E5,
						day: 864E5,
						week: 6048E5
					};
				if (d[b]) a._range = d[b] * c;
				else if ("month" === b || "year" === b) a._range = 864E5 * {
					month: 30,
					year: 365
				}[b] * c
			},
			setInputValue: function (a, b) {
				var c = this.chart.options.rangeSelector,
					d = this[a + "Input"];
				k(b) &&
					(d.previousValue = d.HCTime, d.HCTime = b);
				d.value = l(c.inputEditDateFormat || "%Y-%m-%d", d.HCTime);
				this[a + "DateBox"].attr({
					text: l(c.inputDateFormat || "%b %e, %Y", d.HCTime)
				})
			},
			showInput: function (a) {
				var b = this.inputGroup,
					c = this[a + "DateBox"];
				r(this[a + "Input"], {
					left: b.translateX + c.x + "px",
					top: b.translateY + "px",
					width: c.width - 2 + "px",
					height: c.height - 2 + "px",
					border: "2px solid silver"
				})
			},
			hideInput: function (a) {
				r(this[a + "Input"], {
					border: 0,
					width: "1px",
					height: "1px"
				});
				this.setInputValue(a)
			},
			drawInput: function (a) {
				function b() {
					var a =
						q.value,
						b = (k.inputDateParser || Date.parse)(a),
						c = f.xAxis[0],
						g = f.scroller && f.scroller.xAxis ? f.scroller.xAxis : c,
						h = g.dataMin,
						g = g.dataMax;
					b !== q.previousValue && (q.previousValue = b, e(b) || (b = a.split("-"), b = Date.UTC(u(b[0]), u(b[1]) - 1, u(b[2]))), e(b) && (p || (b += 6E4 * (new Date).getTimezoneOffset()), n ? b > d.maxInput.HCTime ? b = void 0 : b < h && (b = h) : b < d.minInput.HCTime ? b = void 0 : b > g && (b = g), void 0 !== b && c.setExtremes(n ? b : c.min, n ? c.max : b, void 0, void 0, {
						trigger: "rangeSelectorInput"
					})))
				}
				var d = this,
					f = d.chart,
					g = f.renderer.style || {},
					h = f.renderer,
					k = f.options.rangeSelector,
					l = d.div,
					n = "min" === a,
					q, y, A = this.inputGroup;
				this[a + "Label"] = y = h.label(t.lang[n ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({
					padding: 2
				}).add(A);
				A.offset += y.width + 5;
				this[a + "DateBox"] = h = h.label("", A.offset).addClass("highcharts-range-input").attr({
					padding: 2,
					width: k.inputBoxWidth || 90,
					height: k.inputBoxHeight || 17,
					stroke: k.inputBoxBorderColor || "#cccccc",
					"stroke-width": 1,
					"text-align": "center"
				}).on("click", function () {
					d.showInput(a);
					d[a + "Input"].focus()
				}).add(A);
				A.offset += h.width + (n ? 10 : 0);
				this[a + "Input"] = q = m("input", {
					name: a,
					className: "highcharts-range-selector",
					type: "text"
				}, {
					top: f.plotTop + "px"
				}, l);
				y.css(c(g, k.labelStyle));
				h.css(c({
					color: "#333333"
				}, g, k.inputStyle));
				r(q, z({
					position: "absolute",
					border: 0,
					width: "1px",
					height: "1px",
					padding: 0,
					textAlign: "center",
					fontSize: g.fontSize,
					fontFamily: g.fontFamily,
					left: "-9em"
				}, k.inputStyle));
				q.onfocus = function () {
					d.showInput(a)
				};
				q.onblur = function () {
					d.hideInput(a)
				};
				q.onchange = b;
				q.onkeypress = function (a) {
					13 ===
						a.keyCode && b()
				}
			},
			getPosition: function () {
				var a = this.chart,
					b = a.options.rangeSelector,
					a = n((b.buttonPosition || {}).y, a.plotTop - a.axisOffset[0] - b.height);
				return {
					buttonTop: a,
					inputTop: a - 10
				}
			},
			getYTDExtremes: function (a, b, c) {
				var d = new g(a),
					e = d[g.hcGetFullYear]();
				c = c ? g.UTC(e, 0, 1) : +new g(e, 0, 1);
				b = Math.max(b || 0, c);
				d = d.getTime();
				return {
					max: Math.min(a || d, d),
					min: b
				}
			},
			render: function (a, b) {
				var c = this,
					d = c.chart,
					e = d.renderer,
					f = d.container,
					g = d.options,
					l = g.exporting && !1 !== g.exporting.enabled && g.navigation && g.navigation.buttonOptions,
					p = g.rangeSelector,
					q = c.buttons,
					g = t.lang,
					r = c.div,
					r = c.inputGroup,
					x = p.buttonTheme,
					u = p.buttonPosition || {},
					y = p.inputEnabled,
					A = x && x.states,
					C = d.plotLeft,
					D, F = this.getPosition(),
					H = c.group,
					M = c.rendered;
				!1 !== p.enabled && (M || (c.group = H = e.g("range-selector-buttons").add(), c.zoomText = e.text(g.rangeSelectorZoom, n(u.x, C), 15).css(p.labelStyle).add(H), D = n(u.x, C) + c.zoomText.getBBox().width + 5, h(c.buttonOptions, function (a, b) {
					q[b] = e.button(a.text, D, 0, function () {
							c.clickButton(b);
							c.isActive = !0
						}, x, A && A.hover, A && A.select, A &&
						A.disabled).attr({
						"text-align": "center"
					}).add(H);
					D += q[b].width + n(p.buttonSpacing, 5)
				}), !1 !== y && (c.div = r = m("div", null, {
					position: "relative",
					height: 0,
					zIndex: 1
				}), f.parentNode.insertBefore(r, f), c.inputGroup = r = e.g("input-group").add(), r.offset = 0, c.drawInput("min"), c.drawInput("max"))), c.updateButtonStates(), H[M ? "animate" : "attr"]({
					translateY: F.buttonTop
				}), !1 !== y && (r.align(z({
					y: F.inputTop,
					width: r.offset,
					x: l && F.inputTop < (l.y || 0) + l.height - d.spacing[0] ? -40 : 0
				}, p.inputPosition), !0, d.spacingBox), k(y) || (d = H.getBBox(),
					r[r.alignAttr.translateX < d.x + d.width + 10 ? "hide" : "show"]()), c.setInputValue("min", a), c.setInputValue("max", b)), c.rendered = !0)
			},
			update: function (a) {
				var b = this.chart;
				c(!0, b.options.rangeSelector, a);
				this.destroy();
				this.init(b)
			},
			destroy: function () {
				var a = this.minInput,
					c = this.maxInput,
					d;
				this.unMouseDown();
				this.unResize();
				f(this.buttons);
				a && (a.onfocus = a.onblur = a.onchange = null);
				c && (c.onfocus = c.onblur = c.onchange = null);
				for (d in this) this[d] && "chart" !== d && (this[d].destroy ? this[d].destroy() : this[d].nodeType && b(this[d])),
					this[d] !== D.prototype[d] && (this[d] = null)
			}
		};
		F.prototype.toFixedRange = function (a, b, c, d) {
			var f = this.chart && this.chart.fixedRange;
			a = n(c, this.translate(a, !0));
			b = n(d, this.translate(b, !0));
			c = f && (b - a) / f;
			.7 < c && 1.3 > c && (d ? a = b - f : b = a + f);
			e(a) || (a = b = void 0);
			return {
				min: a,
				max: b
			}
		};
		F.prototype.minFromRange = function () {
			var a = this.range,
				b = {
					month: "Month",
					year: "FullYear"
				}[a.type],
				c, d = this.max,
				f, g, h = function (a, c) {
					var d = new Date(a);
					d["set" + b](d["get" + b]() + c);
					return d.getTime() - a
				};
			e(a) ? (c = d - a, g = a) : (c = d + h(d, -a.count), this.chart &&
				(this.chart.fixedRange = d - c));
			f = n(this.dataMin, Number.MIN_VALUE);
			e(c) || (c = f);
			c <= f && (c = f, void 0 === g && (g = h(c, a.count)), this.newMax = Math.min(c + g, this.dataMax));
			e(d) || (c = void 0);
			return c
		};
		A(H.prototype, "init", function (a, b, c) {
			C(this, "init", function () {
				this.options.rangeSelector.enabled && (this.rangeSelector = new D(this))
			});
			a.call(this, b, c)
		});
		a.RangeSelector = D
	})(M);
	(function (a) {
		var D = a.addEvent,
			C = a.isNumber;
		a.Chart.prototype.callbacks.push(function (a) {
			function F() {
				r = a.xAxis[0].getExtremes();
				C(r.min) && l.render(r.min,
					r.max)
			}
			var r, m = a.scroller,
				l = a.rangeSelector,
				t, p;
			m && (r = a.xAxis[0].getExtremes(), m.render(r.min, r.max));
			l && (p = D(a.xAxis[0], "afterSetExtremes", function (a) {
				l.render(a.min, a.max)
			}), t = D(a, "redraw", F), F());
			D(a, "destroy", function () {
				l && (t(), p())
			})
		})
	})(M);
	(function (a) {
		var D = a.arrayMax,
			C = a.arrayMin,
			F = a.Axis,
			H = a.Chart,
			r = a.defined,
			m = a.each,
			l = a.extend,
			t = a.format,
			p = a.inArray,
			k = a.isNumber,
			f = a.isString,
			b = a.map,
			h = a.merge,
			z = a.pick,
			q = a.Point,
			g = a.Renderer,
			e = a.Series,
			c = a.splat,
			n = a.SVGRenderer,
			u = a.VMLRenderer,
			d = a.wrap,
			A = e.prototype,
			y = A.init,
			x = A.processData,
			J = q.prototype.tooltipFormatter;
		a.StockChart = a.stockChart = function (d, e, g) {
			var k = f(d) || d.nodeName,
				l = arguments[k ? 1 : 0],
				m = l.series,
				n = a.getOptions(),
				p, q = z(l.navigator && l.navigator.enabled, !0) ? {
					startOnTick: !1,
					endOnTick: !1
				} : null,
				r = {
					marker: {
						enabled: !1,
						radius: 2
					}
				},
				t = {
					shadow: !1,
					borderWidth: 0
				};
			l.xAxis = b(c(l.xAxis || {}), function (a) {
				return h({
						minPadding: 0,
						maxPadding: 0,
						ordinal: !0,
						title: {
							text: null
						},
						labels: {
							overflow: "justify"
						},
						showLastLabel: !0
					}, n.xAxis, a, {
						type: "datetime",
						categories: null
					},
					q)
			});
			l.yAxis = b(c(l.yAxis || {}), function (a) {
				p = z(a.opposite, !0);
				return h({
					labels: {
						y: -2
					},
					opposite: p,
					showLastLabel: !1,
					title: {
						text: null
					}
				}, n.yAxis, a)
			});
			l.series = null;
			l = h({
				chart: {
					panning: !0,
					pinchType: "x"
				},
				navigator: {
					enabled: !0
				},
				scrollbar: {
					enabled: !0
				},
				rangeSelector: {
					enabled: !0
				},
				title: {
					text: null
				},
				tooltip: {
					shared: !0,
					crosshairs: !0
				},
				legend: {
					enabled: !1
				},
				plotOptions: {
					line: r,
					spline: r,
					area: r,
					areaspline: r,
					arearange: r,
					areasplinerange: r,
					column: t,
					columnrange: t,
					candlestick: t,
					ohlc: t
				}
			}, l, {
				isStock: !0,
				chart: {
					inverted: !1
				}
			});
			l.series = m;
			return k ? new H(d, l, g) : new H(l, e)
		};
		d(F.prototype, "autoLabelAlign", function (a) {
			var b = this.chart,
				c = this.options,
				b = b._labelPanes = b._labelPanes || {},
				d = this.options.labels;
			return this.chart.options.isStock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled) ? (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = 1, "right") : a.call(this, [].slice.call(arguments, 1))
		});
		d(F.prototype, "getPlotLinePath", function (a, c, d, e, g, h) {
			var l = this,
				n = this.isLinked && !this.series ? this.linkedParent.series :
				this.series,
				q = l.chart,
				t = q.renderer,
				v = l.left,
				w = l.top,
				u, x, y, A, E = [],
				G = [],
				C, D;
			if ("colorAxis" === l.coll) return a.apply(this, [].slice.call(arguments, 1));
			G = function (a) {
				var c = "xAxis" === a ? "yAxis" : "xAxis";
				a = l.options[c];
				return k(a) ? [q[c][a]] : f(a) ? [q.get(a)] : b(n, function (a) {
					return a[c]
				})
			}(l.coll);
			m(l.isXAxis ? q.yAxis : q.xAxis, function (a) {
				if (r(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
					var b = a.isXAxis ? "yAxis" : "xAxis",
						b = r(a.options[b]) ? q[b][a.options[b]] : q[b][0];
					l === b && G.push(a)
				}
			});
			C = G.length ? [] : [l.isXAxis ?
				q.yAxis[0] : q.xAxis[0]
			];
			m(G, function (a) {
				-1 === p(a, C) && C.push(a)
			});
			D = z(h, l.translate(c, null, null, e));
			k(D) && (l.horiz ? m(C, function (a) {
				var b;
				x = a.pos;
				A = x + a.len;
				u = y = Math.round(D + l.transB);
				if (u < v || u > v + l.width) g ? u = y = Math.min(Math.max(v, u), v + l.width) : b = !0;
				b || E.push("M", u, x, "L", y, A)
			}) : m(C, function (a) {
				var b;
				u = a.pos;
				y = u + a.len;
				x = A = Math.round(w + l.height - D);
				if (x < w || x > w + l.height) g ? x = A = Math.min(Math.max(w, x), l.top + l.height) : b = !0;
				b || E.push("M", u, x, "L", y, A)
			}));
			return 0 < E.length ? t.crispPolyLine(E, d || 1) : null
		});
		F.prototype.getPlotBandPath =
			function (a, b) {
				b = this.getPlotLinePath(b, null, null, !0);
				a = this.getPlotLinePath(a, null, null, !0);
				var c = [],
					d;
				if (a && b && a.toString() !== b.toString())
					for (d = 0; d < a.length; d += 6) c.push("M", a[d + 1], a[d + 2], "L", a[d + 4], a[d + 5], b[d + 4], b[d + 5], b[d + 1], b[d + 2], "z");
				else c = null;
				return c
			};
		n.prototype.crispPolyLine = function (a, b) {
			var c;
			for (c = 0; c < a.length; c += 6) a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + b % 2 / 2);
			return a
		};
		g === u && (u.prototype.crispPolyLine = n.prototype.crispPolyLine);
		d(F.prototype, "hideCrosshair", function (a, b) {
			a.call(this, b);
			this.crossLabel && (this.crossLabel = this.crossLabel.hide())
		});
		d(F.prototype, "drawCrosshair", function (a, b, c) {
			var d, e;
			a.call(this, b, c);
			if (r(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
				a = this.chart;
				var f = this.options.crosshair.label,
					g = this.horiz;
				d = this.opposite;
				e = this.left;
				var h = this.top,
					k = this.crossLabel,
					m, n = f.format,
					p = "",
					q = "inside" === this.options.tickPosition,
					u = !1 !== this.crosshair.snap,
					v = 0;
				b || (b = this.cross && this.cross.e);
				m = g ? "center" : d ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
				k || (k = this.crossLabel = a.renderer.label(null, null, null, f.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({
					align: f.align || m,
					padding: z(f.padding, 8),
					r: z(f.borderRadius, 3),
					zIndex: 2
				}).add(this.labelGroup), k.attr({
					fill: f.backgroundColor || this.series[0] && this.series[0].color || "#666666",
					stroke: f.borderColor || "",
					"stroke-width": f.borderWidth ||
						0
				}).css(l({
					color: "#ffffff",
					fontWeight: "normal",
					fontSize: "11px",
					textAlign: "center"
				}, f.style)));
				g ? (m = u ? c.plotX + e : b.chartX, h += d ? 0 : this.height) : (m = d ? this.width + e : 0, h = u ? c.plotY + h : b.chartY);
				n || f.formatter || (this.isDatetimeAxis && (p = "%b %d, %Y"), n = "{value" + (p ? ":" + p : "") + "}");
				b = u ? c[this.isXAxis ? "x" : "y"] : this.toValue(g ? b.chartX : b.chartY);
				k.attr({
					text: n ? t(n, {
						value: b
					}) : f.formatter.call(this, b),
					x: m,
					y: h,
					visibility: "visible"
				});
				b = k.getBBox();
				if (g) {
					if (q && !d || !q && d) h = k.y - b.height
				} else h = k.y - b.height / 2;
				g ? (d = e - b.x, e =
					e + this.width - b.x) : (d = "left" === this.labelAlign ? e : 0, e = "right" === this.labelAlign ? e + this.width : a.chartWidth);
				k.translateX < d && (v = d - k.translateX);
				k.translateX + b.width >= e && (v = -(k.translateX + b.width - e));
				k.attr({
					x: m + v,
					y: h,
					anchorX: g ? m : this.opposite ? 0 : a.chartWidth,
					anchorY: g ? this.opposite ? a.chartHeight : 0 : h + b.height / 2
				})
			}
		});
		A.init = function () {
			y.apply(this, arguments);
			this.setCompare(this.options.compare)
		};
		A.setCompare = function (a) {
			this.modifyValue = "value" === a || "percent" === a ? function (b, c) {
				var d = this.compareValue;
				if (void 0 !==
					b && void 0 !== d) return b = "value" === a ? b - d : b = b / d * 100 - 100, c && (c.change = b), b
			} : null;
			this.userOptions.compare = a;
			this.chart.hasRendered && (this.isDirty = !0)
		};
		A.processData = function () {
			var a, b = -1,
				c, d, e, f;
			x.apply(this, arguments);
			if (this.xAxis && this.processedYData)
				for (c = this.processedXData, d = this.processedYData, e = d.length, this.pointArrayMap && (b = p("close", this.pointArrayMap), -1 === b && (b = p(this.pointValKey || "y", this.pointArrayMap))), a = 0; a < e - 1; a++)
					if (f = -1 < b ? d[a][b] : d[a], k(f) && c[a + 1] >= this.xAxis.min && 0 !== f) {
						this.compareValue =
							f;
						break
					}
		};
		d(A, "getExtremes", function (a) {
			var b;
			a.apply(this, [].slice.call(arguments, 1));
			this.modifyValue && (b = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)], this.dataMin = C(b), this.dataMax = D(b))
		});
		F.prototype.setCompare = function (a, b) {
			this.isXAxis || (m(this.series, function (b) {
				b.setCompare(a)
			}), z(b, !0) && this.chart.redraw())
		};
		q.prototype.tooltipFormatter = function (b) {
			b = b.replace("{point.change}", (0 < this.change ? "+" : "") + a.numberFormat(this.change, z(this.series.tooltipOptions.changeDecimals,
				2)));
			return J.apply(this, [b])
		};
		d(e.prototype, "render", function (a) {
			this.chart.is3d && this.chart.is3d() || !this.xAxis || (!this.clipBox && this.animate ? (this.clipBox = h(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] ? this.chart[this.sharedClipKey].attr({
				width: this.xAxis.len,
				height: this.yAxis.len
			}) : this.clipBox && (this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len));
			a.call(this)
		})
	})(M);
	return M
});
