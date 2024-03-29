/**
 * ngokevin v1.2.0 - Feb 18, 2019 
 * https://github.com/supermedium/superframe/tree/master/components/gltf-part
 */

! function (t) {
    function e(o) {
        if (r[o]) return r[o].exports;
        var n = r[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(n.exports, n, n.exports, e), n.l = !0, n.exports
    }
    var r = {};
    e.m = t, e.c = r, e.d = function (t, r, o) {
        e.o(t, r) || Object.defineProperty(t, r, {
            configurable: !1,
            enumerable: !0,
            get: o
        })
    }, e.n = function (t) {
        var r = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return e.d(r, "a", r), r
    }, e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 0)
}([function (t, e) {
    var r = {},
        o = {};
    AFRAME.registerComponent("gltf-part", {
        schema: {
            buffer: {
                default: !0
            },
            part: {
                type: "string"
            },
            src: {
                type: "asset"
            }
        },
        update: function () {
            var t = this.el;
            !this.data.part && this.data.src || this.getModel(function (e) {
                e && t.setObject3D("mesh", e)
            })
        },
        getModel: function (t) {
            var e = this;
            return o[this.data.src] ? void t(this.selectFromModel(o[this.data.src])) : r[this.data.src] ? r[this.data.src].then(function (r) {
                t(e.selectFromModel(r))
            }) : void(r[this.data.src] = new Promise(function (n) {
                (new THREE.GLTFLoader).load(e.data.src, function (a) {
                    var s = a.scene || a.scenes[0];
                    o[e.data.src] = s, delete r[e.data.src], t(e.selectFromModel(s)), n(s)
                }, function () {}, console.error)
            }))
        },
        selectFromModel: function (t) {
            var e, r;
            return (r = t.getObjectByName(this.data.part)) ? (e = r.getObjectByProperty("type", "Mesh").clone(!0), this.data.buffer ? (e.geometry = e.geometry.toNonIndexed(), e) : (e.geometry = (new THREE.Geometry).fromBufferGeometry(e.geometry), e)) : void console.error("[gltf-part] `" + this.data.part + "` not found in model.")
        }
    })
}]);