/**
 * aframe-curve-component
 * 0.1.3 • Public • Published 2 years ago
 * https://www.npmjs.com/package/aframe-curve-component
 */


! function (e) {
    function t(n) {
        if (i[n]) return i[n].exports;
        var r = i[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return e[n].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var i = {};
    return t.m = e, t.c = i, t.p = "", t(0)
}([function (e, t) {
    function i(e) {
        var t = new THREE.Vector3(0, 1, 0);
        return a.setFromUnitVectors(n, e), t.applyQuaternion(a), t
    }
    if ("undefined" == typeof AFRAME) throw new Error("Component attempted to register before AFRAME was available.");
    var n = new THREE.Vector3(0, 0, 1),
        r = THREE.Math.degToRad;
    AFRAME.registerComponent("curve-point", {
        schema: {},
        init: function () {
            this.el.addEventListener("componentchanged", this.changeHandler.bind(this)), this.el.emit("curve-point-change")
        },
        changeHandler: function (e) {
            "position" == e.detail.name && this.el.emit("curve-point-change")
        }
    }), AFRAME.registerComponent("curve", {
        schema: {
            type: {
                type: "string",
                default: "CatmullRom",
                oneOf: ["CatmullRom", "CubicBezier", "QuadraticBezier", "Line"]
            },
            closed: {
                type: "boolean",
                default: !1
            }
        },
        init: function () {
            this.pathPoints = null, this.curve = null, this.el.addEventListener("curve-point-change", this.update.bind(this))
        },
        update: function (e) {
            if (this.points = Array.from(this.el.querySelectorAll("a-curve-point, [curve-point]")), this.points.length <= 1) console.warn("At least 2 curve-points needed to draw a curve"), this.curve = null;
            else {
                var t = this.points.map(function (e) {
                    return void 0 !== e.x && void 0 !== e.y && void 0 !== e.z ? e : e.object3D.getWorldPosition()
                });
                if (!AFRAME.utils.deepEqual(t, this.pathPoints) || "CustomEvent" !== e && !AFRAME.utils.deepEqual(this.data, e)) {
                    if (this.curve = null, this.pathPoints = t, this.threeConstructor = THREE.CatmullRomCurve3, !this.threeConstructor) throw new Error("No Three constructor of type (case sensitive): " + this.data.type + "Curve3");
                    this.curve = new this.threeConstructor(this.pathPoints), this.curve.closed = this.data.closed, this.el.emit("curve-updated")
                }
            }
        },
        remove: function () {
            this.el.removeEventListener("curve-point-change", this.update.bind(this))
        },
        closestPointInLocalSpace: function (e, t, n, r) {
            if (!this.curve) throw Error("Curve not instantiated yet.");
            t = t || .1 / this.curve.getLength(), r = r || .5, n = n || .5, r /= 2;
            var a = n + r,
                s = n - r,
                o = this.curve.getPointAt(a),
                c = this.curve.getPointAt(s),
                u = o.distanceTo(e),
                h = c.distanceTo(e),
                l = u < h;
            if (r < t) {
                var v = this.curve.getTangentAt(l ? a : s);
                if (r < t) return {
                    result: l ? a : s,
                    location: l ? o : c,
                    distance: l ? u : h,
                    normal: i(v),
                    tangent: v
                }
            }
            return u < h ? this.closestPointInLocalSpace(e, t, a, r) : this.closestPointInLocalSpace(e, t, s, r)
        }
    });
    var a = new THREE.Quaternion;
    AFRAME.registerShader("line", {
        schema: {
            color: {
                default: "#ff0000"
            }
        },
        init: function (e) {
            this.material = new THREE.LineBasicMaterial(e)
        },
        update: function (e) {
            this.material = new THREE.LineBasicMaterial(e)
        }
    }), AFRAME.registerComponent("draw-curve", {
        schema: {
            curve: {
                type: "selector"
            }
        },
        init: function () {
            this.data.curve.addEventListener("curve-updated", this.update.bind(this))
        },
        update: function () {
            if (this.data.curve && (this.curve = this.data.curve.components.curve), this.curve && this.curve.curve) {
                var e = this.el.getOrCreateObject3D("mesh", THREE.Line);
                lineMaterial = e.material ? e.material : new THREE.LineBasicMaterial({
                    color: "#ff0000"
                });
                var t = new THREE.Geometry;
                t.vertices = this.curve.curve.getPoints(10 * this.curve.curve.points.length), this.el.setObject3D("mesh", new THREE.Line(t, lineMaterial))
            }
        },
        remove: function () {
            this.data.curve.removeEventListener("curve-updated", this.update.bind(this)), this.el.getObject3D("mesh").geometry = new THREE.Geometry
        }
    }), AFRAME.registerComponent("clone-along-curve", {
        schema: {
            curve: {
                type: "selector"
            },
            spacing: {
                default: 1
            },
            rotation: {
                type: "vec3",
                default: "0 0 0"
            },
            scale: {
                type: "vec3",
                default: "1 1 1"
            }
        },
        init: function () {
            this.el.addEventListener("model-loaded", this.update.bind(this)), this.data.curve.addEventListener("curve-updated", this.update.bind(this))
        },
        update: function () {
            if (this.remove(), this.data.curve && (this.curve = this.data.curve.components.curve), !this.el.getObject3D("clones") && this.curve && this.curve.curve) {
                var e = this.el.getObject3D("mesh"),
                    t = this.curve.curve.getLength(),
                    i = 0,
                    a = i,
                    s = this.el.getOrCreateObject3D("clones", THREE.Group),
                    o = new THREE.Object3D;
                for (e.scale.set(this.data.scale.x, this.data.scale.y, this.data.scale.z), e.rotation.set(r(this.data.rotation.x), r(this.data.rotation.y), r(this.data.rotation.z)), e.rotation.order = "YXZ", o.add(e); a <= t;) {
                    var c = o.clone(!0);
                    c.position.copy(this.curve.curve.getPointAt(a / t)), tangent = this.curve.curve.getTangentAt(a / t).normalize(), c.quaternion.setFromUnitVectors(n, tangent), s.add(c), a += this.data.spacing
                }
            }
        },
        remove: function () {
            this.curve = null, this.el.getObject3D("clones") && this.el.removeObject3D("clones")
        }
    }), AFRAME.registerPrimitive("a-draw-curve", {
        defaultComponents: {
            "draw-curve": {}
        },
        mappings: {
            curveref: "draw-curve.curve"
        }
    }), AFRAME.registerPrimitive("a-curve-point", {
        defaultComponents: {
            "curve-point": {}
        },
        mappings: {}
    }), AFRAME.registerPrimitive("a-curve", {
        defaultComponents: {
            curve: {}
        },
        mappings: {
            type: "curve.type"
        }
    })
}]);