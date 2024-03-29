/**
 * donmccurdy 6.0.0 - Feb 24, 2019 
 * https://github.com/donmccurdy/aframe-extras/commits/master
 */

! function e(t, r, a) {
    function n(o, s) {
        if (!r[o]) {
            if (!t[o]) {
                var c = "function" == typeof require && require;
                if (!s && c) return c(o, !0);
                if (i) return i(o, !0);
                var l = new Error("Cannot find module '" + o + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var u = r[o] = {
                exports: {}
            };
            t[o][0].call(u.exports, function (e) {
                var r = t[o][1][e];
                return n(r || e)
            }, u, u.exports, e, t, r, a)
        }
        return r[o].exports
    }
    for (var i = "function" == typeof require && require, o = 0; o < a.length; o++) n(a[o]);
    return n
}({
    1: [function (e, t, r) {
        "use strict";
        e("./src/loaders")
    }, {
        "./src/loaders": 9
    }],
    2: [function (e, t, r) {
        "use strict";
        t.exports = THREE.ColladaLoader = function (e) {
            this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
        }, THREE.ColladaLoader.prototype = {
            constructor: THREE.ColladaLoader,
            crossOrigin: "anonymous",
            load: function (e, t, r, a) {
                var n = this,
                    i = void 0 === n.path ? THREE.LoaderUtils.extractUrlBase(e) : n.path,
                    o = new THREE.FileLoader(n.manager);
                o.setPath(n.path), o.load(e, function (e) {
                    t(n.parse(e, i))
                }, r, a)
            },
            setPath: function (e) {
                return this.path = e, this
            },
            setResourcePath: function (e) {
                return this.resourcePath = e, this
            },
            options: {
                set convertUpAxis(e) {
                    console.warn("THREE.ColladaLoader: options.convertUpAxis() has been removed. Up axis is converted automatically.")
                }
            },
            setCrossOrigin: function (e) {
                return this.crossOrigin = e, this
            },
            parse: function (e, t) {
                function r(e, t) {
                    for (var r = [], a = e.childNodes, n = 0, i = a.length; n < i; n++) {
                        var o = a[n];
                        o.nodeName === t && r.push(o)
                    }
                    return r
                }

                function a(e) {
                    if (0 === e.length) return [];
                    for (var t = e.trim().split(/\s+/), r = new Array(t.length), a = 0, n = t.length; a < n; a++) r[a] = t[a];
                    return r
                }

                function n(e) {
                    if (0 === e.length) return [];
                    for (var t = e.trim().split(/\s+/), r = new Array(t.length), a = 0, n = t.length; a < n; a++) r[a] = parseFloat(t[a]);
                    return r
                }

                function i(e) {
                    if (0 === e.length) return [];
                    for (var t = e.trim().split(/\s+/), r = new Array(t.length), a = 0, n = t.length; a < n; a++) r[a] = parseInt(t[a]);
                    return r
                }

                function o(e) {
                    return e.substring(1)
                }

                function s() {
                    return "three_default_" + se++
                }

                function c(e) {
                    return 0 === Object.keys(e).length
                }

                function l(e, t, a, n) {
                    var i = r(e, t)[0];
                    if (void 0 !== i)
                        for (var o = r(i, a), s = 0; s < o.length; s++) n(o[s])
                }

                function u(e, t) {
                    for (var r in e) {
                        e[r].build = t(e[r])
                    }
                }

                function d(e, t) {
                    return void 0 !== e.build ? e.build : (e.build = t(e), e.build)
                }

                function f(e) {
                    var t = [],
                        r = e.channels,
                        a = e.samplers,
                        n = e.sources;
                    for (var i in r)
                        if (r.hasOwnProperty(i)) {
                            var o = r[i],
                                s = a[o.sampler],
                                c = s.inputs.INPUT,
                                l = s.inputs.OUTPUT;
                            ! function (e, t) {
                                for (var r = e.keyframes, a = e.name, n = [], i = [], o = [], s = [], c = 0, l = r.length; c < l; c++) {
                                    var u = r[c],
                                        d = u.time,
                                        f = u.value;
                                    Y.fromArray(f).transpose(), Y.decompose(K, J, Z), n.push(d), i.push(K.x, K.y, K.z), o.push(J.x, J.y, J.z, J.w), s.push(Z.x, Z.y, Z.z)
                                }
                                i.length > 0 && t.push(new THREE.VectorKeyframeTrack(a + ".position", n, i));
                                o.length > 0 && t.push(new THREE.QuaternionKeyframeTrack(a + ".quaternion", n, o));
                                s.length > 0 && t.push(new THREE.VectorKeyframeTrack(a + ".scale", n, s))
                            }(function (e, t, r) {
                                var a, n, i, o, s, c, l = ce.nodes[e.id],
                                    u = q(l.id),
                                    d = l.transforms[e.sid],
                                    f = l.matrix.clone().transpose(),
                                    p = {};
                                switch (d) {
                                    case "matrix":
                                        for (i = 0, o = t.array.length; i < o; i++)
                                            if (a = t.array[i], n = i * r.stride, void 0 === p[a] && (p[a] = {}), !0 === e.arraySyntax) {
                                                var h = r.array[n],
                                                    m = e.indices[0] + 4 * e.indices[1];
                                                p[a][m] = h
                                            } else
                                                for (s = 0, c = r.stride; s < c; s++) p[a][s] = r.array[n + s];
                                        break;
                                    case "translate":
                                    case "rotate":
                                    case "scale":
                                        console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.', d)
                                }
                                var v = function (e, t) {
                                    var r = [];
                                    for (var a in e) r.push({
                                        time: parseFloat(a),
                                        value: e[a]
                                    });
                                    r.sort(function (e, t) {
                                        return e.time - t.time
                                    });
                                    for (var n = 0; n < 16; n++) ! function (e, t, r) {
                                        var a, n, i, o = !0;
                                        for (n = 0, i = e.length; n < i; n++) void 0 === (a = e[n]).value[t] ? a.value[t] = null : o = !1;
                                        if (!0 === o)
                                            for (n = 0, i = e.length; n < i; n++)(a = e[n]).value[t] = r;
                                        else ! function (e, t) {
                                            for (var r, a, n = 0, i = e.length; n < i; n++) {
                                                var o = e[n];
                                                if (null === o.value[t]) {
                                                    if (r = function (e, t, r) {
                                                            for (; t >= 0;) {
                                                                var a = e[t];
                                                                if (null !== a.value[r]) return a;
                                                                t--
                                                            }
                                                            return null
                                                        }(e, n, t), a = function (e, t, r) {
                                                            for (; t < e.length;) {
                                                                var a = e[t];
                                                                if (null !== a.value[r]) return a;
                                                                t++
                                                            }
                                                            return null
                                                        }(e, n, t), null === r) {
                                                        o.value[t] = a.value[t];
                                                        continue
                                                    }
                                                    if (null === a) {
                                                        o.value[t] = r.value[t];
                                                        continue
                                                    }! function (e, t, r, a) {
                                                        if (r.time - t.time == 0) return void(e.value[a] = t.value[a]);
                                                        e.value[a] = (e.time - t.time) * (r.value[a] - t.value[a]) / (r.time - t.time) + t.value[a]
                                                    }(o, r, a, t)
                                                }
                                            }
                                        }(e, t)
                                    }(r, n, t.elements[n]);
                                    return r
                                }(p, f);
                                return {
                                    name: u.uuid,
                                    keyframes: v
                                }
                            }(o, n[c], n[l]), t)
                        } return t
                }

                function p(e) {
                    return d(ce.animations[e], f)
                }

                function h(e) {
                    for (var t = [], r = e.name, a = e.end - e.start || -1, n = e.animations, i = 0, o = n.length; i < o; i++)
                        for (var s = p(n[i]), c = 0, l = s.length; c < l; c++) t.push(s[c]);
                    return new THREE.AnimationClip(r, a, t)
                }

                function m(e) {
                    return d(ce.clips[e], h)
                }

                function v(e) {
                    var t = {
                            id: e.id
                        },
                        r = ce.geometries[t.id];
                    return void 0 !== e.skin && (t.skin = function (e) {
                        function t(e, t) {
                            return t.weight - e.weight
                        }
                        var r, a, n, i = {
                                joints: [],
                                indices: {
                                    array: [],
                                    stride: 4
                                },
                                weights: {
                                    array: [],
                                    stride: 4
                                }
                            },
                            o = e.sources,
                            s = e.vertexWeights,
                            c = s.vcount,
                            l = s.v,
                            u = s.inputs.JOINT.offset,
                            d = s.inputs.WEIGHT.offset,
                            f = e.sources[e.joints.inputs.JOINT],
                            p = e.sources[e.joints.inputs.INV_BIND_MATRIX],
                            h = o[s.inputs.WEIGHT.id].array,
                            m = 0;
                        for (r = 0, n = c.length; r < n; r++) {
                            var v = c[r],
                                g = [];
                            for (a = 0; a < v; a++) {
                                var E = l[m + u],
                                    y = l[m + d],
                                    b = h[y];
                                g.push({
                                    index: E,
                                    weight: b
                                }), m += 2
                            }
                            for (g.sort(t), a = 0; a < 4; a++) {
                                var T = g[a];
                                void 0 !== T ? (i.indices.array.push(T.index), i.weights.array.push(T.weight)) : (i.indices.array.push(0), i.weights.array.push(0))
                            }
                        }
                        e.bindShapeMatrix ? i.bindMatrix = (new THREE.Matrix4).fromArray(e.bindShapeMatrix).transpose() : i.bindMatrix = (new THREE.Matrix4).identity();
                        for (r = 0, n = f.array.length; r < n; r++) {
                            var w = f.array[r],
                                R = (new THREE.Matrix4).fromArray(p.array, r * p.stride).transpose();
                            i.joints.push({
                                name: w,
                                boneInverse: R
                            })
                        }
                        return i
                    }(e.skin), r.sources.skinIndices = t.skin.indices, r.sources.skinWeights = t.skin.weights), t
                }

                function g(e) {
                    return d(ce.controllers[e], v)
                }

                function E(e) {
                    return void 0 !== e.build ? e.build : e.init_from
                }

                function y(e) {
                    var t = ce.images[e];
                    return void 0 !== t ? d(t, E) : (console.warn("THREE.ColladaLoader: Couldn't find image with ID:", e), null)
                }

                function b(e) {
                    for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                        var i = e.childNodes[r];
                        if (1 === i.nodeType) switch (i.nodeName) {
                            case "color":
                                t[i.nodeName] = n(i.textContent);
                                break;
                            case "float":
                                t[i.nodeName] = parseFloat(i.textContent);
                                break;
                            case "texture":
                                t[i.nodeName] = {
                                    id: i.getAttribute("texture"),
                                    extra: function (e) {
                                        for (var t = {
                                                technique: {}
                                            }, r = 0, a = e.childNodes.length; r < a; r++) {
                                            var n = e.childNodes[r];
                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                case "extra":
                                                    ! function (e, t) {
                                                        for (var r = 0, a = e.childNodes.length; r < a; r++) {
                                                            var n = e.childNodes[r];
                                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                                case "technique":
                                                                    ! function (e, t) {
                                                                        for (var r = 0, a = e.childNodes.length; r < a; r++) {
                                                                            var n = e.childNodes[r];
                                                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                                                case "repeatU":
                                                                                case "repeatV":
                                                                                case "offsetU":
                                                                                case "offsetV":
                                                                                    t.technique[n.nodeName] = parseFloat(n.textContent);
                                                                                    break;
                                                                                case "wrapU":
                                                                                case "wrapV":
                                                                                    "TRUE" === n.textContent.toUpperCase() ? t.technique[n.nodeName] = 1 : "FALSE" === n.textContent.toUpperCase() ? t.technique[n.nodeName] = 0 : t.technique[n.nodeName] = parseInt(n.textContent)
                                                                            }
                                                                        }
                                                                    }(n, t)
                                                            }
                                                        }
                                                    }(n, t)
                                            }
                                        }
                                        return t
                                    }(i)
                                }
                        }
                    }
                    return t
                }

                function T(e) {
                    return e
                }

                function w(e) {
                    function t(e) {
                        var t = a.profile.samplers[e.id],
                            r = null;
                        if (void 0 !== t) {
                            r = y(a.profile.surfaces[t.source].init_from)
                        } else console.warn("THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530)."), r = y(e.id);
                        if (null !== r) {
                            var n = function (e) {
                                var t, r = e.slice(2 + (e.lastIndexOf(".") - 1 >>> 0));
                                switch (r = r.toLowerCase()) {
                                    case "tga":
                                        t = ne;
                                        break;
                                    default:
                                        t = ae
                                }
                                return t
                            }(r);
                            if (void 0 !== n) {
                                var i = n.load(r),
                                    o = e.extra;
                                if (void 0 !== o && void 0 !== o.technique && !1 === c(o.technique)) {
                                    var s = o.technique;
                                    i.wrapS = s.wrapU ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping, i.wrapT = s.wrapV ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping, i.offset.set(s.offsetU || 0, s.offsetV || 0), i.repeat.set(s.repeatU || 1, s.repeatV || 1)
                                } else i.wrapS = THREE.RepeatWrapping, i.wrapT = THREE.RepeatWrapping;
                                return i
                            }
                            return console.warn("THREE.ColladaLoader: Loader for texture %s not found.", r), null
                        }
                        return console.warn("THREE.ColladaLoader: Couldn't create texture with ID:", e.id), null
                    }
                    var r, a = function (e) {
                            return d(ce.effects[e], T)
                        }(e.url),
                        n = a.profile.technique,
                        i = a.profile.extra;
                    switch (n.type) {
                        case "phong":
                        case "blinn":
                            r = new THREE.MeshPhongMaterial;
                            break;
                        case "lambert":
                            r = new THREE.MeshLambertMaterial;
                            break;
                        default:
                            r = new THREE.MeshBasicMaterial
                    }
                    r.name = e.name;
                    var o = n.parameters;
                    for (var s in o) {
                        var l = o[s];
                        switch (s) {
                            case "diffuse":
                                l.color && r.color.fromArray(l.color), l.texture && (r.map = t(l.texture));
                                break;
                            case "specular":
                                l.color && r.specular && r.specular.fromArray(l.color), l.texture && (r.specularMap = t(l.texture));
                                break;
                            case "bump":
                                l.texture && (r.normalMap = t(l.texture));
                                break;
                            case "ambient":
                                l.texture && (r.lightMap = t(l.texture));
                                break;
                            case "shininess":
                                l.float && r.shininess && (r.shininess = l.float);
                                break;
                            case "emission":
                                l.color && r.emissive && r.emissive.fromArray(l.color), l.texture && (r.emissiveMap = t(l.texture))
                        }
                    }
                    var u = o.transparent,
                        f = o.transparency;
                    if (void 0 === f && u && (f = {
                            float: 1
                        }), void 0 === u && f && (u = {
                            opaque: "A_ONE",
                            data: {
                                color: [1, 1, 1, 1]
                            }
                        }), u && f)
                        if (u.data.texture) r.transparent = !0;
                        else {
                            var p = u.data.color;
                            switch (u.opaque) {
                                case "A_ONE":
                                    r.opacity = p[3] * f.float;
                                    break;
                                case "RGB_ZERO":
                                    r.opacity = 1 - p[0] * f.float;
                                    break;
                                case "A_ZERO":
                                    r.opacity = 1 - p[3] * f.float;
                                    break;
                                case "RGB_ONE":
                                    r.opacity = p[0] * f.float;
                                    break;
                                default:
                                    console.warn('THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.', u.opaque)
                            }
                            r.opacity < 1 && (r.transparent = !0)
                        } return void 0 !== i && void 0 !== i.technique && 1 === i.technique.double_sided && (r.side = THREE.DoubleSide), r
                }

                function R(e) {
                    return d(ce.materials[e], w)
                }

                function x(e) {
                    var t;
                    switch (e.optics.technique) {
                        case "perspective":
                            t = new THREE.PerspectiveCamera(e.optics.parameters.yfov, e.optics.parameters.aspect_ratio, e.optics.parameters.znear, e.optics.parameters.zfar);
                            break;
                        case "orthographic":
                            var r = e.optics.parameters.ymag,
                                a = e.optics.parameters.xmag,
                                n = e.optics.parameters.aspect_ratio;
                            a = void 0 === a ? r * n : a, r = void 0 === r ? a / n : r, a *= .5, r *= .5, t = new THREE.OrthographicCamera(-a, a, r, -r, e.optics.parameters.znear, e.optics.parameters.zfar);
                            break;
                        default:
                            t = new THREE.PerspectiveCamera
                    }
                    return t.name = e.name, t
                }

                function A(e) {
                    var t = ce.cameras[e];
                    return void 0 !== t ? d(t, x) : (console.warn("THREE.ColladaLoader: Couldn't find camera with ID:", e), null)
                }

                function N(e) {
                    var t;
                    switch (e.technique) {
                        case "directional":
                            t = new THREE.DirectionalLight;
                            break;
                        case "point":
                            t = new THREE.PointLight;
                            break;
                        case "spot":
                            t = new THREE.SpotLight;
                            break;
                        case "ambient":
                            t = new THREE.AmbientLight
                    }
                    return e.parameters.color && t.color.copy(e.parameters.color), e.parameters.distance && (t.distance = e.parameters.distance), t
                }

                function k(e) {
                    var t = ce.lights[e];
                    return void 0 !== t ? d(t, N) : (console.warn("THREE.ColladaLoader: Couldn't find light with ID:", e), null)
                }

                function H(e) {
                    for (var t = {
                            array: [],
                            stride: 3
                        }, i = 0; i < e.childNodes.length; i++) {
                        var o = e.childNodes[i];
                        if (1 === o.nodeType) switch (o.nodeName) {
                            case "float_array":
                                t.array = n(o.textContent);
                                break;
                            case "Name_array":
                                t.array = a(o.textContent);
                                break;
                            case "technique_common":
                                var s = r(o, "accessor")[0];
                                void 0 !== s && (t.stride = parseInt(s.getAttribute("stride")))
                        }
                    }
                    return t
                }

                function I(e) {
                    for (var t = 0, r = 0, a = e.length; r < a; r++) {
                        !0 === e[r].hasUV && t++
                    }
                    t > 0 && t < e.length && (e.uvsNeedsFix = !0)
                }

                function C(e) {
                    var t = {},
                        r = e.sources,
                        a = e.vertices,
                        n = e.primitives;
                    if (0 === n.length) return {};
                    var i = function (e) {
                        for (var t = {}, r = 0; r < e.length; r++) {
                            var a = e[r];
                            void 0 === t[a.type] && (t[a.type] = []), t[a.type].push(a)
                        }
                        return t
                    }(n);
                    for (var o in i) {
                        var s = i[o];
                        I(s), t[o] = function (e, t, r) {
                            for (var a = {}, n = {
                                    array: [],
                                    stride: 0
                                }, i = {
                                    array: [],
                                    stride: 0
                                }, o = {
                                    array: [],
                                    stride: 0
                                }, s = {
                                    array: [],
                                    stride: 0
                                }, c = {
                                    array: [],
                                    stride: 0
                                }, l = {
                                    array: [],
                                    stride: 4
                                }, u = {
                                    array: [],
                                    stride: 4
                                }, d = new THREE.BufferGeometry, f = [], p = 0, h = 0; h < e.length; h++) {
                                var m = e[h],
                                    v = m.inputs,
                                    g = 0;
                                switch (m.type) {
                                    case "lines":
                                    case "linestrips":
                                        g = 2 * m.count;
                                        break;
                                    case "triangles":
                                        g = 3 * m.count;
                                        break;
                                    case "polylist":
                                        for (var E = 0; E < m.count; E++) {
                                            var y = m.vcount[E];
                                            switch (y) {
                                                case 3:
                                                    g += 3;
                                                    break;
                                                case 4:
                                                    g += 6;
                                                    break;
                                                default:
                                                    g += 3 * (y - 2)
                                            }
                                        }
                                        break;
                                    default:
                                        console.warn("THREE.ColladaLoader: Unknow primitive type:", m.type)
                                }
                                d.addGroup(p, g, h), p += g, m.material && f.push(m.material);
                                for (var b in v) {
                                    var T = v[b];
                                    switch (b) {
                                        case "VERTEX":
                                            for (var w in r) {
                                                var R = r[w];
                                                switch (w) {
                                                    case "POSITION":
                                                        var x = n.array.length;
                                                        if (L(m, t[R], T.offset, n.array), n.stride = t[R].stride, t.skinWeights && t.skinIndices && (L(m, t.skinIndices, T.offset, l.array), L(m, t.skinWeights, T.offset, u.array)), !1 === m.hasUV && !0 === e.uvsNeedsFix)
                                                            for (var g = (n.array.length - x) / n.stride, A = 0; A < g; A++) o.array.push(0, 0);
                                                        break;
                                                    case "NORMAL":
                                                        L(m, t[R], T.offset, i.array), i.stride = t[R].stride;
                                                        break;
                                                    case "COLOR":
                                                        L(m, t[R], T.offset, c.array), c.stride = t[R].stride;
                                                        break;
                                                    case "TEXCOORD":
                                                        L(m, t[R], T.offset, o.array), o.stride = t[R].stride;
                                                        break;
                                                    case "TEXCOORD1":
                                                        L(m, t[R], T.offset, s.array), o.stride = t[R].stride;
                                                        break;
                                                    default:
                                                        console.warn('THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.', w)
                                                }
                                            }
                                            break;
                                        case "NORMAL":
                                            L(m, t[T.id], T.offset, i.array), i.stride = t[T.id].stride;
                                            break;
                                        case "COLOR":
                                            L(m, t[T.id], T.offset, c.array), c.stride = t[T.id].stride;
                                            break;
                                        case "TEXCOORD":
                                            L(m, t[T.id], T.offset, o.array), o.stride = t[T.id].stride;
                                            break;
                                        case "TEXCOORD1":
                                            L(m, t[T.id], T.offset, s.array), s.stride = t[T.id].stride
                                    }
                                }
                            }
                            n.array.length > 0 && d.addAttribute("position", new THREE.Float32BufferAttribute(n.array, n.stride));
                            i.array.length > 0 && d.addAttribute("normal", new THREE.Float32BufferAttribute(i.array, i.stride));
                            c.array.length > 0 && d.addAttribute("color", new THREE.Float32BufferAttribute(c.array, c.stride));
                            o.array.length > 0 && d.addAttribute("uv", new THREE.Float32BufferAttribute(o.array, o.stride));
                            s.array.length > 0 && d.addAttribute("uv2", new THREE.Float32BufferAttribute(s.array, s.stride));
                            l.array.length > 0 && d.addAttribute("skinIndex", new THREE.Float32BufferAttribute(l.array, l.stride));
                            u.array.length > 0 && d.addAttribute("skinWeight", new THREE.Float32BufferAttribute(u.array, u.stride));
                            return a.data = d, a.type = e[0].type, a.materialKeys = f, a
                        }(s, r, a)
                    }
                    return t
                }

                function L(e, t, r, a) {
                    function n(e) {
                        for (var t = i[e + r] * l, n = t + l; t < n; t++) a.push(c[t])
                    }
                    var i = e.p,
                        o = e.stride,
                        s = e.vcount,
                        c = t.array,
                        l = t.stride;
                    if (void 0 !== e.vcount)
                        for (var u = 0, d = 0, f = s.length; d < f; d++) {
                            var p = s[d];
                            if (4 === p) {
                                var h = u + 1 * o,
                                    m = u + 2 * o,
                                    v = u + 3 * o;
                                n(y = u + 0 * o), n(h), n(v), n(h), n(m), n(v)
                            } else if (3 === p) {
                                var h = u + 1 * o,
                                    m = u + 2 * o;
                                n(y = u + 0 * o), n(h), n(m)
                            } else if (p > 4)
                                for (var g = 1, E = p - 2; g <= E; g++) {
                                    var y = u + 0 * o,
                                        h = u + o * g,
                                        m = u + o * (g + 1);
                                    n(y), n(h), n(m)
                                }
                            u += o * p
                        } else
                            for (var d = 0, f = i.length; d < f; d += o) n(d)
                }

                function M(e) {
                    return d(ce.geometries[e], C)
                }

                function O(e) {
                    return void 0 !== e.build ? e.build : e
                }

                function F(e) {
                    for (var t = {
                            sid: e.getAttribute("sid"),
                            name: e.getAttribute("name") || "",
                            attachments: [],
                            transforms: []
                        }, r = 0; r < e.childNodes.length; r++) {
                        var a = e.childNodes[r];
                        if (1 === a.nodeType) switch (a.nodeName) {
                            case "attachment_full":
                                t.attachments.push(function (e) {
                                    for (var t = {
                                            joint: e.getAttribute("joint").split("/").pop(),
                                            transforms: [],
                                            links: []
                                        }, r = 0; r < e.childNodes.length; r++) {
                                        var a = e.childNodes[r];
                                        if (1 === a.nodeType) switch (a.nodeName) {
                                            case "link":
                                                t.links.push(F(a));
                                                break;
                                            case "matrix":
                                            case "translate":
                                            case "rotate":
                                                t.transforms.push(D(a))
                                        }
                                    }
                                    return t
                                }(a));
                                break;
                            case "matrix":
                            case "translate":
                            case "rotate":
                                t.transforms.push(D(a))
                        }
                    }
                    return t
                }

                function D(e) {
                    var t = {
                            type: e.nodeName
                        },
                        r = n(e.textContent);
                    switch (t.type) {
                        case "matrix":
                            t.obj = new THREE.Matrix4, t.obj.fromArray(r).transpose();
                            break;
                        case "translate":
                            t.obj = new THREE.Vector3, t.obj.fromArray(r);
                            break;
                        case "rotate":
                            t.obj = new THREE.Vector3, t.obj.fromArray(r), t.angle = THREE.Math.degToRad(r[3])
                    }
                    return t
                }

                function S(e) {
                    return void 0 !== e.build ? e.build : e
                }

                function P(e) {
                    for (var t = {
                            name: e.getAttribute("name") || "",
                            type: e.getAttribute("type"),
                            id: e.getAttribute("id"),
                            sid: e.getAttribute("sid"),
                            matrix: new THREE.Matrix4,
                            nodes: [],
                            instanceCameras: [],
                            instanceControllers: [],
                            instanceLights: [],
                            instanceGeometries: [],
                            instanceNodes: [],
                            transforms: {}
                        }, r = 0; r < e.childNodes.length; r++) {
                        var a = e.childNodes[r];
                        if (1 === a.nodeType) switch (a.nodeName) {
                            case "node":
                                t.nodes.push(a.getAttribute("id")), P(a);
                                break;
                            case "instance_camera":
                                t.instanceCameras.push(o(a.getAttribute("url")));
                                break;
                            case "instance_controller":
                                t.instanceControllers.push(B(a));
                                break;
                            case "instance_light":
                                t.instanceLights.push(o(a.getAttribute("url")));
                                break;
                            case "instance_geometry":
                                t.instanceGeometries.push(B(a));
                                break;
                            case "instance_node":
                                t.instanceNodes.push(o(a.getAttribute("url")));
                                break;
                            case "matrix":
                                i = n(a.textContent);
                                t.matrix.multiply(Y.fromArray(i).transpose()), t.transforms[a.getAttribute("sid")] = a.nodeName;
                                break;
                            case "translate":
                                i = n(a.textContent);
                                $.fromArray(i), t.matrix.multiply(Y.makeTranslation($.x, $.y, $.z)), t.transforms[a.getAttribute("sid")] = a.nodeName;
                                break;
                            case "rotate":
                                var i = n(a.textContent),
                                    s = THREE.Math.degToRad(i[3]);
                                t.matrix.multiply(Y.makeRotationAxis($.fromArray(i), s)), t.transforms[a.getAttribute("sid")] = a.nodeName;
                                break;
                            case "scale":
                                i = n(a.textContent);
                                t.matrix.scale($.fromArray(i)), t.transforms[a.getAttribute("sid")] = a.nodeName;
                                break;
                            case "extra":
                                break;
                            default:
                                console.log(a)
                        }
                    }
                    return X(t.id) ? console.warn("THREE.ColladaLoader: There is already a node with ID %s. Exclude current node from further processing.", t.id) : ce.nodes[t.id] = t, t
                }

                function B(e) {
                    for (var t = {
                            id: o(e.getAttribute("url")),
                            materials: {},
                            skeletons: []
                        }, r = 0; r < e.childNodes.length; r++) {
                        var a = e.childNodes[r];
                        switch (a.nodeName) {
                            case "bind_material":
                                for (var n = a.getElementsByTagName("instance_material"), i = 0; i < n.length; i++) {
                                    var s = n[i],
                                        c = s.getAttribute("symbol"),
                                        l = s.getAttribute("target");
                                    t.materials[c] = o(l)
                                }
                                break;
                            case "skeleton":
                                t.skeletons.push(o(a.textContent))
                        }
                    }
                    return t
                }

                function j(e, t) {
                    var r, a, n = [],
                        i = [];
                    for (r = 0; r < e.length; r++) {
                        var o = e[r];
                        if (X(o)) _(q(o), t, n);
                        else if (function (e) {
                                return void 0 !== ce.visualScenes[e]
                            }(o))
                            for (var s = ce.visualScenes[o].children, c = 0; c < s.length; c++) {
                                var l = s[c];
                                if ("JOINT" === l.type) {
                                    _(q(l.id), t, n)
                                }
                            } else console.error("THREE.ColladaLoader: Unable to find root bone of skeleton with ID:", o)
                    }
                    for (r = 0; r < t.length; r++)
                        for (c = 0; c < n.length; c++)
                            if ((a = n[c]).bone.name === t[r].name) {
                                i[r] = a, a.processed = !0;
                                break
                            } for (r = 0; r < n.length; r++) !1 === (a = n[r]).processed && (i.push(a), a.processed = !0);
                    var u = [],
                        d = [];
                    for (r = 0; r < i.length; r++) a = i[r], u.push(a.bone), d.push(a.boneInverse);
                    return new THREE.Skeleton(u, d)
                }

                function _(e, t, r) {
                    e.traverse(function (e) {
                        if (!0 === e.isBone) {
                            for (var a, n = 0; n < t.length; n++) {
                                var i = t[n];
                                if (i.name === e.name) {
                                    a = i.boneInverse;
                                    break
                                }
                            }
                            void 0 === a && (a = new THREE.Matrix4), r.push({
                                bone: e,
                                boneInverse: a,
                                processed: !1
                            })
                        }
                    })
                }

                function U(e) {
                    for (var t = [], r = e.matrix, a = e.nodes, n = e.type, i = e.instanceCameras, o = e.instanceControllers, s = e.instanceLights, c = e.instanceGeometries, l = e.instanceNodes, u = 0, d = a.length; u < d; u++) t.push(q(a[u]));
                    for (var u = 0, d = i.length; u < d; u++) {
                        var f = A(i[u]);
                        null !== f && t.push(f.clone())
                    }
                    for (var u = 0, d = o.length; u < d; u++)
                        for (var p = g((b = o[u]).id), h = G(T = M(p.id), b.materials), m = j(b.skeletons, p.skin.joints), v = 0, E = h.length; v < E; v++) {
                            (w = h[v]).isSkinnedMesh && (w.bind(m, p.skin.bindMatrix), w.normalizeSkinWeights()), t.push(w)
                        }
                    for (var u = 0, d = s.length; u < d; u++) {
                        var y = k(s[u]);
                        null !== y && t.push(y.clone())
                    }
                    for (var u = 0, d = c.length; u < d; u++)
                        for (var b = c[u], T = M(b.id), v = 0, E = (h = G(T, b.materials)).length; v < E; v++) t.push(h[v]);
                    for (var u = 0, d = l.length; u < d; u++) t.push(q(l[u]).clone());
                    var w;
                    if (0 === a.length && 1 === t.length) w = t[0];
                    else {
                        w = "JOINT" === n ? new THREE.Bone : new THREE.Group;
                        for (u = 0; u < t.length; u++) w.add(t[u])
                    }
                    return "" === w.name && (w.name = "JOINT" === n ? e.sid : e.name), w.matrix.copy(r), w.matrix.decompose(w.position, w.quaternion, w.scale), w
                }

                function V(e, t) {
                    for (var r = [], a = 0, n = e.length; a < n; a++) {
                        var i = t[e[a]];
                        void 0 === i ? (console.warn("THREE.ColladaLoader: Material with key %s not found. Apply fallback material.", e[a]), r.push(Q)) : r.push(R(i))
                    }
                    return r
                }

                function G(e, t) {
                    var r = [];
                    for (var a in e) {
                        var n = e[a],
                            i = V(n.materialKeys, t);
                        0 === i.length && ("lines" === a || "linestrips" === a ? i.push(new THREE.LineBasicMaterial) : i.push(new THREE.MeshPhongMaterial));
                        var o = void 0 !== n.data.attributes.skinIndex;
                        if (o)
                            for (var s = 0, c = i.length; s < c; s++) i[s].skinning = !0;
                        var l, u = 1 === i.length ? i[0] : i;
                        switch (a) {
                            case "lines":
                                l = new THREE.LineSegments(n.data, u);
                                break;
                            case "linestrips":
                                l = new THREE.Line(n.data, u);
                                break;
                            case "triangles":
                            case "polylist":
                                l = o ? new THREE.SkinnedMesh(n.data, u) : new THREE.Mesh(n.data, u)
                        }
                        r.push(l)
                    }
                    return r
                }

                function X(e) {
                    return void 0 !== ce.nodes[e]
                }

                function q(e) {
                    return d(ce.nodes[e], U)
                }

                function W(e) {
                    var t = new THREE.Group;
                    t.name = e.name;
                    for (var r = e.children, a = 0; a < r.length; a++) {
                        var n = r[a];
                        t.add(q(n.id))
                    }
                    return t
                }

                function z(e) {
                    return d(ce.visualScenes[e], W)
                }
                var K = new THREE.Vector3,
                    Z = new THREE.Vector3,
                    J = new THREE.Quaternion,
                    Y = new THREE.Matrix4,
                    $ = new THREE.Vector3,
                    Q = new THREE.MeshBasicMaterial({
                        color: 16711935
                    });
                if (0 === e.length) return {
                    scene: new THREE.Scene
                };
                var ee = r((new DOMParser).parseFromString(e, "application/xml"), "COLLADA")[0],
                    te = ee.getAttribute("version");
                console.log("THREE.ColladaLoader: File version", te);
                var re = function (e) {
                        return {
                            unit: function (e) {
                                return void 0 !== e && !0 === e.hasAttribute("meter") ? parseFloat(e.getAttribute("meter")) : 1
                            }(r(e, "unit")[0]),
                            upAxis: function (e) {
                                return void 0 !== e ? e.textContent : "Y_UP"
                            }(r(e, "up_axis")[0])
                        }
                    }(r(ee, "asset")[0]),
                    ae = new THREE.TextureLoader(this.manager);
                ae.setPath(this.resourcePath || t).setCrossOrigin(this.crossOrigin);
                var ne;
                THREE.TGALoader && (ne = new THREE.TGALoader(this.manager)).setPath(this.resourcePath || t);
                var ie = [],
                    oe = {},
                    se = 0,
                    ce = {
                        animations: {},
                        clips: {},
                        controllers: {},
                        images: {},
                        effects: {},
                        materials: {},
                        cameras: {},
                        lights: {},
                        geometries: {},
                        nodes: {},
                        visualScenes: {},
                        kinematicsModels: {},
                        physicsModels: {},
                        kinematicsScenes: {}
                    };
                l(ee, "library_animations", "animation", function (e) {
                        for (var t = {
                                sources: {},
                                samplers: {},
                                channels: {}
                            }, r = 0, a = e.childNodes.length; r < a; r++) {
                            var n = e.childNodes[r];
                            if (1 === n.nodeType) {
                                var i;
                                switch (n.nodeName) {
                                    case "source":
                                        i = n.getAttribute("id"), t.sources[i] = H(n);
                                        break;
                                    case "sampler":
                                        i = n.getAttribute("id"), t.samplers[i] = function (e) {
                                            for (var t = {
                                                    inputs: {}
                                                }, r = 0, a = e.childNodes.length; r < a; r++) {
                                                var n = e.childNodes[r];
                                                if (1 === n.nodeType) switch (n.nodeName) {
                                                    case "input":
                                                        var i = o(n.getAttribute("source")),
                                                            s = n.getAttribute("semantic");
                                                        t.inputs[s] = i
                                                }
                                            }
                                            return t
                                        }(n);
                                        break;
                                    case "channel":
                                        i = n.getAttribute("target"), t.channels[i] = function (e) {
                                            var t = {},
                                                r = e.getAttribute("target").split("/"),
                                                a = r.shift(),
                                                n = r.shift(),
                                                i = -1 !== n.indexOf("("),
                                                s = -1 !== n.indexOf(".");
                                            if (s) r = n.split("."), n = r.shift(), t.member = r.shift();
                                            else if (i) {
                                                var c = n.split("(");
                                                n = c.shift();
                                                for (var l = 0; l < c.length; l++) c[l] = parseInt(c[l].replace(/\)/, ""));
                                                t.indices = c
                                            }
                                            return t.id = a, t.sid = n, t.arraySyntax = i, t.memberSyntax = s, t.sampler = o(e.getAttribute("source")), t
                                        }(n);
                                        break;
                                    default:
                                        console.log(n)
                                }
                            }
                        }
                        ce.animations[e.getAttribute("id")] = t
                    }), l(ee, "library_animation_clips", "animation_clip", function (e) {
                        for (var t = {
                                name: e.getAttribute("id") || "default",
                                start: parseFloat(e.getAttribute("start") || 0),
                                end: parseFloat(e.getAttribute("end") || 0),
                                animations: []
                            }, r = 0, a = e.childNodes.length; r < a; r++) {
                            var n = e.childNodes[r];
                            if (1 === n.nodeType) switch (n.nodeName) {
                                case "instance_animation":
                                    t.animations.push(o(n.getAttribute("url")))
                            }
                        }
                        ce.clips[e.getAttribute("id")] = t
                    }), l(ee, "library_controllers", "controller", function (e) {
                        for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                            var s = e.childNodes[r];
                            if (1 === s.nodeType) switch (s.nodeName) {
                                case "skin":
                                    t.id = o(s.getAttribute("source")), t.skin = function (e) {
                                        for (var t = {
                                                sources: {}
                                            }, r = 0, a = e.childNodes.length; r < a; r++) {
                                            var s = e.childNodes[r];
                                            if (1 === s.nodeType) switch (s.nodeName) {
                                                case "bind_shape_matrix":
                                                    t.bindShapeMatrix = n(s.textContent);
                                                    break;
                                                case "source":
                                                    var c = s.getAttribute("id");
                                                    t.sources[c] = H(s);
                                                    break;
                                                case "joints":
                                                    t.joints = function (e) {
                                                        for (var t = {
                                                                inputs: {}
                                                            }, r = 0, a = e.childNodes.length; r < a; r++) {
                                                            var n = e.childNodes[r];
                                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                                case "input":
                                                                    var i = n.getAttribute("semantic"),
                                                                        s = o(n.getAttribute("source"));
                                                                    t.inputs[i] = s
                                                            }
                                                        }
                                                        return t
                                                    }(s);
                                                    break;
                                                case "vertex_weights":
                                                    t.vertexWeights = function (e) {
                                                        for (var t = {
                                                                inputs: {}
                                                            }, r = 0, a = e.childNodes.length; r < a; r++) {
                                                            var n = e.childNodes[r];
                                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                                case "input":
                                                                    var s = n.getAttribute("semantic"),
                                                                        c = o(n.getAttribute("source")),
                                                                        l = parseInt(n.getAttribute("offset"));
                                                                    t.inputs[s] = {
                                                                        id: c,
                                                                        offset: l
                                                                    };
                                                                    break;
                                                                case "vcount":
                                                                    t.vcount = i(n.textContent);
                                                                    break;
                                                                case "v":
                                                                    t.v = i(n.textContent)
                                                            }
                                                        }
                                                        return t
                                                    }(s)
                                            }
                                        }
                                        return t
                                    }(s);
                                    break;
                                case "morph":
                                    t.id = o(s.getAttribute("source")), console.warn("THREE.ColladaLoader: Morph target animation not supported yet.")
                            }
                        }
                        ce.controllers[e.getAttribute("id")] = t
                    }), l(ee, "library_images", "image", function (e) {
                        var t = {
                            init_from: r(e, "init_from")[0].textContent
                        };
                        ce.images[e.getAttribute("id")] = t
                    }), l(ee, "library_effects", "effect", function (e) {
                        for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                            var n = e.childNodes[r];
                            if (1 === n.nodeType) switch (n.nodeName) {
                                case "profile_COMMON":
                                    t.profile = function (e) {
                                        for (var t = {
                                                surfaces: {},
                                                samplers: {}
                                            }, r = 0, a = e.childNodes.length; r < a; r++) {
                                            var n = e.childNodes[r];
                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                case "newparam":
                                                    ! function (e, t) {
                                                        for (var r = e.getAttribute("sid"), a = 0, n = e.childNodes.length; a < n; a++) {
                                                            var i = e.childNodes[a];
                                                            if (1 === i.nodeType) switch (i.nodeName) {
                                                                case "surface":
                                                                    t.surfaces[r] = function (e) {
                                                                        for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                                                                            var n = e.childNodes[r];
                                                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                                                case "init_from":
                                                                                    t.init_from = n.textContent
                                                                            }
                                                                        }
                                                                        return t
                                                                    }(i);
                                                                    break;
                                                                case "sampler2D":
                                                                    t.samplers[r] = function (e) {
                                                                        for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                                                                            var n = e.childNodes[r];
                                                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                                                case "source":
                                                                                    t.source = n.textContent
                                                                            }
                                                                        }
                                                                        return t
                                                                    }(i)
                                                            }
                                                        }
                                                    }(n, t);
                                                    break;
                                                case "technique":
                                                    t.technique = function (e) {
                                                        for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                                                            var n = e.childNodes[r];
                                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                                case "constant":
                                                                case "lambert":
                                                                case "blinn":
                                                                case "phong":
                                                                    t.type = n.nodeName, t.parameters = function (e) {
                                                                        for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                                                                            var n = e.childNodes[r];
                                                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                                                case "emission":
                                                                                case "diffuse":
                                                                                case "specular":
                                                                                case "bump":
                                                                                case "ambient":
                                                                                case "shininess":
                                                                                case "transparency":
                                                                                    t[n.nodeName] = b(n);
                                                                                    break;
                                                                                case "transparent":
                                                                                    t[n.nodeName] = {
                                                                                        opaque: n.getAttribute("opaque"),
                                                                                        data: b(n)
                                                                                    }
                                                                            }
                                                                        }
                                                                        return t
                                                                    }(n)
                                                            }
                                                        }
                                                        return t
                                                    }(n);
                                                    break;
                                                case "extra":
                                                    t.extra = function (e) {
                                                        for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                                                            var n = e.childNodes[r];
                                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                                case "technique":
                                                                    t.technique = function (e) {
                                                                        for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                                                                            var n = e.childNodes[r];
                                                                            if (1 === n.nodeType) switch (n.nodeName) {
                                                                                case "double_sided":
                                                                                    t[n.nodeName] = parseInt(n.textContent)
                                                                            }
                                                                        }
                                                                        return t
                                                                    }(n)
                                                            }
                                                        }
                                                        return t
                                                    }(n)
                                            }
                                        }
                                        return t
                                    }(n)
                            }
                        }
                        ce.effects[e.getAttribute("id")] = t
                    }), l(ee, "library_materials", "material", function (e) {
                        for (var t = {
                                name: e.getAttribute("name")
                            }, r = 0, a = e.childNodes.length; r < a; r++) {
                            var n = e.childNodes[r];
                            if (1 === n.nodeType) switch (n.nodeName) {
                                case "instance_effect":
                                    t.url = o(n.getAttribute("url"))
                            }
                        }
                        ce.materials[e.getAttribute("id")] = t
                    }), l(ee, "library_cameras", "camera", function (e) {
                        for (var t = {
                                name: e.getAttribute("name")
                            }, r = 0, a = e.childNodes.length; r < a; r++) {
                            var n = e.childNodes[r];
                            if (1 === n.nodeType) switch (n.nodeName) {
                                case "optics":
                                    t.optics = function (e) {
                                        for (var t = 0; t < e.childNodes.length; t++) {
                                            var r = e.childNodes[t];
                                            switch (r.nodeName) {
                                                case "technique_common":
                                                    return function (e) {
                                                        for (var t = {}, r = 0; r < e.childNodes.length; r++) {
                                                            var a = e.childNodes[r];
                                                            switch (a.nodeName) {
                                                                case "perspective":
                                                                case "orthographic":
                                                                    t.technique = a.nodeName, t.parameters = function (e) {
                                                                        for (var t = {}, r = 0; r < e.childNodes.length; r++) {
                                                                            var a = e.childNodes[r];
                                                                            switch (a.nodeName) {
                                                                                case "xfov":
                                                                                case "yfov":
                                                                                case "xmag":
                                                                                case "ymag":
                                                                                case "znear":
                                                                                case "zfar":
                                                                                case "aspect_ratio":
                                                                                    t[a.nodeName] = parseFloat(a.textContent)
                                                                            }
                                                                        }
                                                                        return t
                                                                    }(a)
                                                            }
                                                        }
                                                        return t
                                                    }(r)
                                            }
                                        }
                                        return {}
                                    }(n)
                            }
                        }
                        ce.cameras[e.getAttribute("id")] = t
                    }), l(ee, "library_lights", "light", function (e) {
                        for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                            var i = e.childNodes[r];
                            if (1 === i.nodeType) switch (i.nodeName) {
                                case "technique_common":
                                    t = function (e) {
                                        for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                                            var i = e.childNodes[r];
                                            if (1 === i.nodeType) switch (i.nodeName) {
                                                case "directional":
                                                case "point":
                                                case "spot":
                                                case "ambient":
                                                    t.technique = i.nodeName, t.parameters = function (e) {
                                                        for (var t = {}, r = 0, a = e.childNodes.length; r < a; r++) {
                                                            var i = e.childNodes[r];
                                                            if (1 === i.nodeType) switch (i.nodeName) {
                                                                case "color":
                                                                    var o = n(i.textContent);
                                                                    t.color = (new THREE.Color).fromArray(o);
                                                                    break;
                                                                case "falloff_angle":
                                                                    t.falloffAngle = parseFloat(i.textContent);
                                                                    break;
                                                                case "quadratic_attenuation":
                                                                    var s = parseFloat(i.textContent);
                                                                    t.distance = s ? Math.sqrt(1 / s) : 0
                                                            }
                                                        }
                                                        return t
                                                    }(i)
                                            }
                                        }
                                        return t
                                    }(i)
                            }
                        }
                        ce.lights[e.getAttribute("id")] = t
                    }), l(ee, "library_geometries", "geometry", function (e) {
                        var t = {
                                name: e.getAttribute("name"),
                                sources: {},
                                vertices: {},
                                primitives: []
                            },
                            a = r(e, "mesh")[0];
                        if (void 0 !== a) {
                            for (var n = 0; n < a.childNodes.length; n++) {
                                var s = a.childNodes[n];
                                if (1 === s.nodeType) {
                                    var c = s.getAttribute("id");
                                    switch (s.nodeName) {
                                        case "source":
                                            t.sources[c] = H(s);
                                            break;
                                        case "vertices":
                                            t.vertices = function (e) {
                                                for (var t = {}, r = 0; r < e.childNodes.length; r++) {
                                                    var a = e.childNodes[r];
                                                    1 === a.nodeType && (t[a.getAttribute("semantic")] = o(a.getAttribute("source")))
                                                }
                                                return t
                                            }(s);
                                            break;
                                        case "polygons":
                                            console.warn("THREE.ColladaLoader: Unsupported primitive type: ", s.nodeName);
                                            break;
                                        case "lines":
                                        case "linestrips":
                                        case "polylist":
                                        case "triangles":
                                            t.primitives.push(function (e) {
                                                for (var t = {
                                                        type: e.nodeName,
                                                        material: e.getAttribute("material"),
                                                        count: parseInt(e.getAttribute("count")),
                                                        inputs: {},
                                                        stride: 0,
                                                        hasUV: !1
                                                    }, r = 0, a = e.childNodes.length; r < a; r++) {
                                                    var n = e.childNodes[r];
                                                    if (1 === n.nodeType) switch (n.nodeName) {
                                                        case "input":
                                                            var s = o(n.getAttribute("source")),
                                                                c = n.getAttribute("semantic"),
                                                                l = parseInt(n.getAttribute("offset")),
                                                                u = parseInt(n.getAttribute("set")),
                                                                d = u > 0 ? c + u : c;
                                                            t.inputs[d] = {
                                                                id: s,
                                                                offset: l
                                                            }, t.stride = Math.max(t.stride, l + 1), "TEXCOORD" === c && (t.hasUV = !0);
                                                            break;
                                                        case "vcount":
                                                            t.vcount = i(n.textContent);
                                                            break;
                                                        case "p":
                                                            t.p = i(n.textContent)
                                                    }
                                                }
                                                return t
                                            }(s));
                                            break;
                                        default:
                                            console.log(s)
                                    }
                                }
                            }
                            ce.geometries[e.getAttribute("id")] = t
                        }
                    }), l(ee, "library_nodes", "node", P), l(ee, "library_visual_scenes", "visual_scene", function (e) {
                        var t = {
                            name: e.getAttribute("name"),
                            children: []
                        };
                        ! function (e) {
                            for (var t = e.getElementsByTagName("node"), r = 0; r < t.length; r++) {
                                var a = t[r];
                                !1 === a.hasAttribute("id") && a.setAttribute("id", s())
                            }
                        }(e);
                        for (var a = r(e, "node"), n = 0; n < a.length; n++) t.children.push(P(a[n]));
                        ce.visualScenes[e.getAttribute("id")] = t
                    }), l(ee, "library_kinematics_models", "kinematics_model", function (e) {
                        for (var t = {
                                name: e.getAttribute("name") || "",
                                joints: {},
                                links: []
                            }, r = 0; r < e.childNodes.length; r++) {
                            var a = e.childNodes[r];
                            if (1 === a.nodeType) switch (a.nodeName) {
                                case "technique_common":
                                    ! function (e, t) {
                                        for (var r = 0; r < e.childNodes.length; r++) {
                                            var a = e.childNodes[r];
                                            if (1 === a.nodeType) switch (a.nodeName) {
                                                case "joint":
                                                    t.joints[a.getAttribute("sid")] = function (e) {
                                                        for (var t, r = 0; r < e.childNodes.length; r++) {
                                                            var a = e.childNodes[r];
                                                            if (1 === a.nodeType) switch (a.nodeName) {
                                                                case "prismatic":
                                                                case "revolute":
                                                                    t = function (e, t) {
                                                                        for (var t = {
                                                                                sid: e.getAttribute("sid"),
                                                                                name: e.getAttribute("name") || "",
                                                                                axis: new THREE.Vector3,
                                                                                limits: {
                                                                                    min: 0,
                                                                                    max: 0
                                                                                },
                                                                                type: e.nodeName,
                                                                                static: !1,
                                                                                zeroPosition: 0,
                                                                                middlePosition: 0
                                                                            }, r = 0; r < e.childNodes.length; r++) {
                                                                            var a = e.childNodes[r];
                                                                            if (1 === a.nodeType) switch (a.nodeName) {
                                                                                case "axis":
                                                                                    var i = n(a.textContent);
                                                                                    t.axis.fromArray(i);
                                                                                    break;
                                                                                case "limits":
                                                                                    var o = a.getElementsByTagName("max")[0],
                                                                                        s = a.getElementsByTagName("min")[0];
                                                                                    t.limits.max = parseFloat(o.textContent), t.limits.min = parseFloat(s.textContent)
                                                                            }
                                                                        }
                                                                        return t.limits.min >= t.limits.max && (t.static = !0), t.middlePosition = (t.limits.min + t.limits.max) / 2, t
                                                                    }(a)
                                                            }
                                                        }
                                                        return t
                                                    }(a);
                                                    break;
                                                case "link":
                                                    t.links.push(F(a))
                                            }
                                        }
                                    }(a, t)
                            }
                        }
                        ce.kinematicsModels[e.getAttribute("id")] = t
                    }), l(ee, "library_physics_models", "physics_model", function (e) {
                        for (var t = {
                                name: e.getAttribute("name") || "",
                                rigidBodies: {}
                            }, r = 0; r < e.childNodes.length; r++) {
                            var a = e.childNodes[r];
                            if (1 === a.nodeType) switch (a.nodeName) {
                                case "rigid_body":
                                    t.rigidBodies[a.getAttribute("name")] = {},
                                        function (e, t) {
                                            for (var r = 0; r < e.childNodes.length; r++) {
                                                var a = e.childNodes[r];
                                                if (1 === a.nodeType) switch (a.nodeName) {
                                                    case "technique_common":
                                                        ! function (e, t) {
                                                            for (var r = 0; r < e.childNodes.length; r++) {
                                                                var a = e.childNodes[r];
                                                                if (1 === a.nodeType) switch (a.nodeName) {
                                                                    case "inertia":
                                                                        t.inertia = n(a.textContent);
                                                                        break;
                                                                    case "mass":
                                                                        t.mass = n(a.textContent)[0]
                                                                }
                                                            }
                                                        }(a, t)
                                                }
                                            }
                                        }(a, t.rigidBodies[a.getAttribute("name")])
                            }
                        }
                        ce.physicsModels[e.getAttribute("id")] = t
                    }), l(ee, "scene", "instance_kinematics_scene", function (e) {
                        for (var t = {
                                bindJointAxis: []
                            }, r = 0; r < e.childNodes.length; r++) {
                            var a = e.childNodes[r];
                            if (1 === a.nodeType) switch (a.nodeName) {
                                case "bind_joint_axis":
                                    t.bindJointAxis.push(function (e) {
                                        for (var t = {
                                                target: e.getAttribute("target").split("/").pop()
                                            }, r = 0; r < e.childNodes.length; r++) {
                                            var a = e.childNodes[r];
                                            if (1 === a.nodeType) switch (a.nodeName) {
                                                case "axis":
                                                    var n = a.getElementsByTagName("param")[0];
                                                    t.axis = n.textContent;
                                                    var i = t.axis.split("inst_").pop().split("axis")[0];
                                                    t.jointIndex = i.substr(0, i.length - 1)
                                            }
                                        }
                                        return t
                                    }(a))
                            }
                        }
                        ce.kinematicsScenes[o(e.getAttribute("url"))] = t
                    }), u(ce.animations, f), u(ce.clips, h), u(ce.controllers, v), u(ce.images, E), u(ce.effects, T), u(ce.materials, w), u(ce.cameras, x), u(ce.lights, N), u(ce.geometries, C), u(ce.visualScenes, W),
                    function () {
                        var e = ce.clips;
                        if (!0 === c(e)) {
                            if (!1 === c(ce.animations)) {
                                var t = [];
                                for (var r in ce.animations)
                                    for (var a = p(r), n = 0, i = a.length; n < i; n++) t.push(a[n]);
                                ie.push(new THREE.AnimationClip("default", -1, t))
                            }
                        } else
                            for (var r in e) ie.push(m(r))
                    }(),
                    function () {
                        function e(e, t) {
                            var r = t.getAttribute("name"),
                                a = i.joints[e];
                            s.traverse(function (i) {
                                i.name === r && (l[e] = {
                                    object: i,
                                    transforms: function (e) {
                                        for (var t = [], r = ee.querySelector('[id="' + e.id + '"]'), a = 0; a < r.childNodes.length; a++) {
                                            var i = r.childNodes[a];
                                            if (1 === i.nodeType) switch (i.nodeName) {
                                                case "matrix":
                                                    var o = n(i.textContent),
                                                        s = (new THREE.Matrix4).fromArray(o).transpose();
                                                    t.push({
                                                        sid: i.getAttribute("sid"),
                                                        type: i.nodeName,
                                                        obj: s
                                                    });
                                                    break;
                                                case "translate":
                                                case "scale":
                                                    var o = n(i.textContent),
                                                        c = (new THREE.Vector3).fromArray(o);
                                                    t.push({
                                                        sid: i.getAttribute("sid"),
                                                        type: i.nodeName,
                                                        obj: c
                                                    });
                                                    break;
                                                case "rotate":
                                                    var o = n(i.textContent),
                                                        c = (new THREE.Vector3).fromArray(o),
                                                        l = THREE.Math.degToRad(o[3]);
                                                    t.push({
                                                        sid: i.getAttribute("sid"),
                                                        type: i.nodeName,
                                                        obj: c,
                                                        angle: l
                                                    })
                                            }
                                        }
                                        return t
                                    }(t),
                                    joint: a,
                                    position: a.zeroPosition
                                })
                            })
                        }
                        var t = Object.keys(ce.kinematicsModels)[0],
                            r = Object.keys(ce.kinematicsScenes)[0],
                            a = Object.keys(ce.visualScenes)[0];
                        if (void 0 !== t && void 0 !== r) {
                            for (var i = function (e) {
                                    return d(ce.kinematicsModels[e], O)
                                }(t), o = function (e) {
                                    return d(ce.kinematicsScenes[e], S)
                                }(r), s = z(a), c = o.bindJointAxis, l = {}, u = 0, f = c.length; u < f; u++) {
                                var p = c[u],
                                    h = ee.querySelector('[sid="' + p.target + '"]');
                                if (h) {
                                    var m = h.parentElement;
                                    e(p.jointIndex, m)
                                }
                            }
                            var v = new THREE.Matrix4;
                            oe = {
                                joints: i && i.joints,
                                getJointValue: function (e) {
                                    var t = l[e];
                                    if (t) return t.position;
                                    console.warn("THREE.ColladaLoader: Joint " + e + " doesn't exist.")
                                },
                                setJointValue: function (e, t) {
                                    var r = l[e];
                                    if (r) {
                                        var a = r.joint;
                                        if (t > a.limits.max || t < a.limits.min) console.warn("THREE.ColladaLoader: Joint " + e + " value " + t + " outside of limits (min: " + a.limits.min + ", max: " + a.limits.max + ").");
                                        else if (a.static) console.warn("THREE.ColladaLoader: Joint " + e + " is static.");
                                        else {
                                            var n = r.object,
                                                i = a.axis,
                                                o = r.transforms;
                                            Y.identity();
                                            for (var s = 0; s < o.length; s++) {
                                                var c = o[s];
                                                if (c.sid && -1 !== c.sid.indexOf(e)) switch (a.type) {
                                                    case "revolute":
                                                        Y.multiply(v.makeRotationAxis(i, THREE.Math.degToRad(t)));
                                                        break;
                                                    case "prismatic":
                                                        Y.multiply(v.makeTranslation(i.x * t, i.y * t, i.z * t));
                                                        break;
                                                    default:
                                                        console.warn("THREE.ColladaLoader: Unknown joint type: " + a.type)
                                                } else switch (c.type) {
                                                    case "matrix":
                                                        Y.multiply(c.obj);
                                                        break;
                                                    case "translate":
                                                        Y.multiply(v.makeTranslation(c.obj.x, c.obj.y, c.obj.z));
                                                        break;
                                                    case "scale":
                                                        Y.scale(c.obj);
                                                        break;
                                                    case "rotate":
                                                        Y.multiply(v.makeRotationAxis(c.obj, c.angle))
                                                }
                                            }
                                            n.matrix.copy(Y), n.matrix.decompose(n.position, n.quaternion, n.scale), l[e].position = t
                                        }
                                    } else console.log("THREE.ColladaLoader: " + e + " does not exist.")
                                }
                            }
                        }
                    }();
                var le = function (e) {
                    return z(o(r(e, "instance_visual_scene")[0].getAttribute("url")))
                }(r(ee, "scene")[0]);
                return "Z_UP" === re.upAxis && le.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)), le.scale.multiplyScalar(re.unit), {
                    animations: ie,
                    kinematics: oe,
                    library: ce,
                    scene: le
                }
            }
        }
    }, {}],
    3: [function (e, t, r) {
        "use strict";
        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            n = "function" == typeof Symbol && "symbol" === a(Symbol.iterator) ? function (e) {
                return void 0 === e ? "undefined" : a(e)
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : a(e)
            };
        t.exports = THREE.FBXLoader = function () {
            function e(e) {
                this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
            }

            function t(e) {
                this.textureLoader = e
            }

            function r() {}

            function a() {}

            function i() {}

            function o() {}

            function s(e, t) {
                this.dv = new DataView(e), this.offset = 0, this.littleEndian = void 0 === t || t
            }

            function c() {}

            function l(e) {
                var t = e.match(/FBXVersion: (\d+)/);
                if (t) {
                    return parseInt(t[1])
                }
                throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")
            }

            function u(e) {
                return e / 46186158e3
            }

            function d(e, t, r, a) {
                var n;
                switch (a.mappingType) {
                    case "ByPolygonVertex":
                        n = e;
                        break;
                    case "ByPolygon":
                        n = t;
                        break;
                    case "ByVertice":
                        n = r;
                        break;
                    case "AllSame":
                        n = a.indices[0];
                        break;
                    default:
                        console.warn("THREE.FBXLoader: unknown attribute mapping type " + a.mappingType)
                }
                "IndexToDirect" === a.referenceType && (n = a.indices[n]);
                var i = n * a.dataSize,
                    o = i + a.dataSize;
                return function (e, t, r, a) {
                    for (var n = r, i = 0; n < a; n++, i++) e[i] = t[n];
                    return e
                }(b, a.buffer, i, o)
            }

            function f(e) {
                var t = new THREE.Matrix4;
                x.set(0, 0, 0), A.identity();
                var r = p(e.eulerOrder ? e.eulerOrder : 0);
                if (e.translation && x.fromArray(e.translation), e.rotationOffset && x.add(R.fromArray(e.rotationOffset)), e.rotation) {
                    (a = e.rotation.map(THREE.Math.degToRad)).push(r), A.makeRotationFromEuler(w.fromArray(a))
                }
                if (e.preRotation) {
                    (a = e.preRotation.map(THREE.Math.degToRad)).push(r), T.makeRotationFromEuler(w.fromArray(a)), A.premultiply(T)
                }
                if (e.postRotation) {
                    var a = e.postRotation.map(THREE.Math.degToRad);
                    a.push(r), T.makeRotationFromEuler(w.fromArray(a)), T.getInverse(T), A.multiply(T)
                }
                return e.scale && t.scale(R.fromArray(e.scale)), t.setPosition(x), t.multiply(A), t
            }

            function p(e) {
                var t = ["ZYX", "YZX", "XZY", "ZXY", "YXZ", "XYZ"];
                return 6 === e ? (console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."), t[0]) : t[e]
            }

            function h(e) {
                return e.split(",").map(function (e) {
                    return parseFloat(e)
                })
            }

            function m(e, t, r) {
                return void 0 === t && (t = 0), void 0 === r && (r = e.byteLength), THREE.LoaderUtils.decodeText(new Uint8Array(e, t, r))
            }

            function v(e, t, r) {
                return e.slice(0, t).concat(r).concat(e.slice(t))
            }
            var g, E, y;
            e.prototype = {
                constructor: e,
                crossOrigin: "anonymous",
                load: function (e, t, r, a) {
                    var n = this,
                        i = THREE.LoaderUtils.extractUrlBase(e),
                        o = new THREE.FileLoader(this.manager);
                    o.setResponseType("arraybuffer"), o.load(e, function (r) {
                        try {
                            var o = n.parse(r, i);
                            t(o)
                        } catch (t) {
                            setTimeout(function () {
                                a && a(t), n.manager.itemError(e)
                            }, 0)
                        }
                    }, r, a)
                },
                setCrossOrigin: function (e) {
                    return this.crossOrigin = e, this
                },
                parse: function (e, r) {
                    if (function (e) {
                            var t = "Kaydara FBX Binary  \0";
                            return e.byteLength >= t.length && t === m(e, 0, t.length)
                        }(e)) g = (new o).parse(e);
                    else {
                        var a = m(e);
                        if (! function (e) {
                                function t(t) {
                                    var r = e[t - 1];
                                    return e = e.slice(a + t), a++, r
                                }
                                for (var r = ["K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\"], a = 0, n = 0; n < r.length; ++n)
                                    if (t(1) === r[n]) return !1;
                                return !0
                            }(a)) throw new Error("THREE.FBXLoader: Unknown format.");
                        if (l(a) < 7e3) throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + l(a));
                        g = (new i).parse(a)
                    }
                    return new t(new THREE.TextureLoader(this.manager).setPath(r).setCrossOrigin(this.crossOrigin)).parse(g)
                }
            }, t.prototype = {
                constructor: t,
                parse: function () {
                    E = this.parseConnections();
                    var e = this.parseImages(),
                        t = this.parseTextures(e),
                        a = this.parseMaterials(t),
                        n = this.parseDeformers(),
                        i = (new r).parse(n);
                    return this.parseScene(n, i, a), y
                },
                parseConnections: function () {
                    var e = new Map;
                    if ("Connections" in g) {
                        g.Connections.connections.forEach(function (t) {
                            var r = t[0],
                                a = t[1],
                                n = t[2];
                            e.has(r) || e.set(r, {
                                parents: [],
                                children: []
                            });
                            var i = {
                                ID: a,
                                relationship: n
                            };
                            e.get(r).parents.push(i), e.has(a) || e.set(a, {
                                parents: [],
                                children: []
                            });
                            var o = {
                                ID: r,
                                relationship: n
                            };
                            e.get(a).children.push(o)
                        })
                    }
                    return e
                },
                parseImages: function () {
                    var e = {},
                        t = {};
                    if ("Video" in g.Objects) {
                        var r = g.Objects.Video;
                        for (var a in r) {
                            var n = r[a];
                            if (e[c = parseInt(a)] = n.RelativeFilename || n.Filename, "Content" in n) {
                                var i = n.Content instanceof ArrayBuffer && n.Content.byteLength > 0,
                                    o = "string" == typeof n.Content && "" !== n.Content;
                                if (i || o) {
                                    var s = this.parseImage(r[a]);
                                    t[n.RelativeFilename || n.Filename] = s
                                }
                            }
                        }
                    }
                    for (var c in e) {
                        var l = e[c];
                        void 0 !== t[l] ? e[c] = t[l] : e[c] = e[c].split("\\").pop()
                    }
                    return e
                },
                parseImage: function (e) {
                    var t, r = e.Content,
                        a = e.RelativeFilename || e.Filename,
                        n = a.slice(a.lastIndexOf(".") + 1).toLowerCase();
                    switch (n) {
                        case "bmp":
                            t = "image/bmp";
                            break;
                        case "jpg":
                        case "jpeg":
                            t = "image/jpeg";
                            break;
                        case "png":
                            t = "image/png";
                            break;
                        case "tif":
                            t = "image/tiff";
                            break;
                        case "tga":
                            if ("function" != typeof THREE.TGALoader) return void console.warn("FBXLoader: THREE.TGALoader is required to load TGA textures");
                            null === THREE.Loader.Handlers.get(".tga") && THREE.Loader.Handlers.add(/\.tga$/i, new THREE.TGALoader), t = "image/tga";
                            break;
                        default:
                            return void console.warn('FBXLoader: Image type "' + n + '" is not supported.')
                    }
                    if ("string" == typeof r) return "data:" + t + ";base64," + r;
                    var i = new Uint8Array(r);
                    return window.URL.createObjectURL(new Blob([i], {
                        type: t
                    }))
                },
                parseTextures: function (e) {
                    var t = new Map;
                    if ("Texture" in g.Objects) {
                        var r = g.Objects.Texture;
                        for (var a in r) {
                            var n = this.parseTexture(r[a], e);
                            t.set(parseInt(a), n)
                        }
                    }
                    return t
                },
                parseTexture: function (e, t) {
                    var r = this.loadTexture(e, t);
                    r.ID = e.id, r.name = e.attrName;
                    var a = e.WrapModeU,
                        n = e.WrapModeV,
                        i = void 0 !== a ? a.value : 0,
                        o = void 0 !== n ? n.value : 0;
                    if (r.wrapS = 0 === i ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping, r.wrapT = 0 === o ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping, "Scaling" in e) {
                        var s = e.Scaling.value;
                        r.repeat.x = s[0], r.repeat.y = s[1]
                    }
                    return r
                },
                loadTexture: function (e, t) {
                    var r, a = this.textureLoader.path,
                        n = E.get(e.id).children;
                    void 0 !== n && n.length > 0 && void 0 !== t[n[0].ID] && (0 !== (r = t[n[0].ID]).indexOf("blob:") && 0 !== r.indexOf("data:") || this.textureLoader.setPath(void 0));
                    var i, o = e.FileName.slice(-3).toLowerCase();
                    if ("tga" === o) {
                        var s = THREE.Loader.Handlers.get(".tga");
                        null === s ? (console.warn("FBXLoader: TGALoader not found, creating empty placeholder texture for", r), i = new THREE.Texture) : i = s.load(r)
                    } else "psd" === o ? (console.warn("FBXLoader: PSD textures are not supported, creating empty placeholder texture for", r), i = new THREE.Texture) : i = this.textureLoader.load(r);
                    return this.textureLoader.setPath(a), i
                },
                parseMaterials: function (e) {
                    var t = new Map;
                    if ("Material" in g.Objects) {
                        var r = g.Objects.Material;
                        for (var a in r) {
                            var n = this.parseMaterial(r[a], e);
                            null !== n && t.set(parseInt(a), n)
                        }
                    }
                    return t
                },
                parseMaterial: function (e, t) {
                    var r = e.id,
                        a = e.attrName,
                        i = e.ShadingModel;
                    if ("object" === (void 0 === i ? "undefined" : n(i)) && (i = i.value), !E.has(r)) return null;
                    var o, s = this.parseParameters(e, t, r);
                    switch (i.toLowerCase()) {
                        case "phong":
                            o = new THREE.MeshPhongMaterial;
                            break;
                        case "lambert":
                            o = new THREE.MeshLambertMaterial;
                            break;
                        default:
                            console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', i), o = new THREE.MeshPhongMaterial({
                                color: 3342591
                            })
                    }
                    return o.setValues(s), o.name = a, o
                },
                parseParameters: function (e, t, r) {
                    var a = {};
                    e.BumpFactor && (a.bumpScale = e.BumpFactor.value), e.Diffuse ? a.color = (new THREE.Color).fromArray(e.Diffuse.value) : e.DiffuseColor && "Color" === e.DiffuseColor.type && (a.color = (new THREE.Color).fromArray(e.DiffuseColor.value)), e.DisplacementFactor && (a.displacementScale = e.DisplacementFactor.value), e.Emissive ? a.emissive = (new THREE.Color).fromArray(e.Emissive.value) : e.EmissiveColor && "Color" === e.EmissiveColor.type && (a.emissive = (new THREE.Color).fromArray(e.EmissiveColor.value)), e.EmissiveFactor && (a.emissiveIntensity = parseFloat(e.EmissiveFactor.value)), e.Opacity && (a.opacity = parseFloat(e.Opacity.value)), a.opacity < 1 && (a.transparent = !0), e.ReflectionFactor && (a.reflectivity = e.ReflectionFactor.value), e.Shininess && (a.shininess = e.Shininess.value), e.Specular ? a.specular = (new THREE.Color).fromArray(e.Specular.value) : e.SpecularColor && "Color" === e.SpecularColor.type && (a.specular = (new THREE.Color).fromArray(e.SpecularColor.value));
                    var n = this;
                    return E.get(r).children.forEach(function (e) {
                        var r = e.relationship;
                        switch (r) {
                            case "Bump":
                                a.bumpMap = n.getTexture(t, e.ID);
                                break;
                            case "DiffuseColor":
                                a.map = n.getTexture(t, e.ID);
                                break;
                            case "DisplacementColor":
                                a.displacementMap = n.getTexture(t, e.ID);
                                break;
                            case "EmissiveColor":
                                a.emissiveMap = n.getTexture(t, e.ID);
                                break;
                            case "NormalMap":
                                a.normalMap = n.getTexture(t, e.ID);
                                break;
                            case "ReflectionColor":
                                a.envMap = n.getTexture(t, e.ID), a.envMap.mapping = THREE.EquirectangularReflectionMapping;
                                break;
                            case "SpecularColor":
                                a.specularMap = n.getTexture(t, e.ID);
                                break;
                            case "TransparentColor":
                                a.alphaMap = n.getTexture(t, e.ID), a.transparent = !0;
                                break;
                            case "AmbientColor":
                            case "ShininessExponent":
                            case "SpecularFactor":
                            case "VectorDisplacementColor":
                            default:
                                console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.", r)
                        }
                    }), a
                },
                getTexture: function (e, t) {
                    return "LayeredTexture" in g.Objects && t in g.Objects.LayeredTexture && (console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."), t = E.get(t).children[0].ID), e.get(t)
                },
                parseDeformers: function () {
                    var e = {},
                        t = {};
                    if ("Deformer" in g.Objects) {
                        var r = g.Objects.Deformer;
                        for (var a in r) {
                            var n = r[a],
                                i = E.get(parseInt(a));
                            if ("Skin" === n.attrType) {
                                var o = this.parseSkeleton(i, r);
                                o.ID = a, i.parents.length > 1 && console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."), o.geometryID = i.parents[0].ID, e[a] = o
                            } else if ("BlendShape" === n.attrType) {
                                var s = {
                                    id: a
                                };
                                s.rawTargets = this.parseMorphTargets(i, r), s.id = a, i.parents.length > 1 && console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."), t[a] = s
                            }
                        }
                    }
                    return {
                        skeletons: e,
                        morphTargets: t
                    }
                },
                parseSkeleton: function (e, t) {
                    var r = [];
                    return e.children.forEach(function (e) {
                        var a = t[e.ID];
                        if ("Cluster" === a.attrType) {
                            var n = {
                                ID: e.ID,
                                indices: [],
                                weights: [],
                                transform: (new THREE.Matrix4).fromArray(a.Transform.a),
                                transformLink: (new THREE.Matrix4).fromArray(a.TransformLink.a),
                                linkMode: a.Mode
                            };
                            "Indexes" in a && (n.indices = a.Indexes.a, n.weights = a.Weights.a), r.push(n)
                        }
                    }), {
                        rawBones: r,
                        bones: []
                    }
                },
                parseMorphTargets: function (e, t) {
                    for (var r = [], a = 0; a < e.children.length; a++) {
                        if (8 === a) {
                            console.warn("FBXLoader: maximum of 8 morph targets supported. Ignoring additional targets.");
                            break
                        }
                        var n = e.children[a],
                            i = t[n.ID],
                            o = {
                                name: i.attrName,
                                initialWeight: i.DeformPercent,
                                id: i.id,
                                fullWeights: i.FullWeights.a
                            };
                        if ("BlendShapeChannel" !== i.attrType) return;
                        E.get(parseInt(n.ID)).children.forEach(function (e) {
                            void 0 === e.relationship && (o.geoID = e.ID)
                        }), r.push(o)
                    }
                    return r
                },
                parseScene: function (e, t, r) {
                    y = new THREE.Group;
                    var n = this.parseModels(e.skeletons, t, r),
                        i = g.Objects.Model,
                        o = this;
                    n.forEach(function (e) {
                        var t = i[e.ID];
                        o.setLookAtProperties(e, t);
                        E.get(e.ID).parents.forEach(function (t) {
                            var r = n.get(t.ID);
                            void 0 !== r && r.add(e)
                        }), null === e.parent && y.add(e)
                    }), this.bindSkeleton(e.skeletons, t, n), this.createAmbientLight(), this.setupMorphMaterials();
                    var s = (new a).parse();
                    1 === y.children.length && y.children[0].isGroup && (y.children[0].animations = s, y = y.children[0]), y.animations = s
                },
                parseModels: function (e, t, r) {
                    var a = new Map,
                        n = g.Objects.Model;
                    for (var i in n) {
                        var o = parseInt(i),
                            s = n[i],
                            c = E.get(o),
                            l = this.buildSkeleton(c, e, o, s.attrName);
                        if (!l) {
                            switch (s.attrType) {
                                case "Camera":
                                    l = this.createCamera(c);
                                    break;
                                case "Light":
                                    l = this.createLight(c);
                                    break;
                                case "Mesh":
                                    l = this.createMesh(c, t, r);
                                    break;
                                case "NurbsCurve":
                                    l = this.createCurve(c, t);
                                    break;
                                case "LimbNode":
                                case "Null":
                                default:
                                    l = new THREE.Group
                            }
                            l.name = THREE.PropertyBinding.sanitizeNodeName(s.attrName), l.ID = o
                        }
                        this.setModelTransforms(l, s), a.set(o, l)
                    }
                    return a
                },
                buildSkeleton: function (e, t, r, a) {
                    var n = null;
                    return e.parents.forEach(function (e) {
                        for (var i in t) {
                            var o = t[i];
                            o.rawBones.forEach(function (t, i) {
                                if (t.ID === e.ID) {
                                    var s = n;
                                    (n = new THREE.Bone).matrixWorld.copy(t.transformLink), n.name = THREE.PropertyBinding.sanitizeNodeName(a), n.ID = r, o.bones[i] = n, null !== s && n.add(s)
                                }
                            })
                        }
                    }), n
                },
                createCamera: function (e) {
                    var t, r;
                    if (e.children.forEach(function (e) {
                            var t = g.Objects.NodeAttribute[e.ID];
                            void 0 !== t && (r = t)
                        }), void 0 === r) t = new THREE.Object3D;
                    else {
                        var a = 0;
                        void 0 !== r.CameraProjectionType && 1 === r.CameraProjectionType.value && (a = 1);
                        var n = 1;
                        void 0 !== r.NearPlane && (n = r.NearPlane.value / 1e3);
                        var i = 1e3;
                        void 0 !== r.FarPlane && (i = r.FarPlane.value / 1e3);
                        var o = window.innerWidth,
                            s = window.innerHeight;
                        void 0 !== r.AspectWidth && void 0 !== r.AspectHeight && (o = r.AspectWidth.value, s = r.AspectHeight.value);
                        var c = o / s,
                            l = 45;
                        void 0 !== r.FieldOfView && (l = r.FieldOfView.value);
                        var u = r.FocalLength ? r.FocalLength.value : null;
                        switch (a) {
                            case 0:
                                t = new THREE.PerspectiveCamera(l, c, n, i), null !== u && t.setFocalLength(u);
                                break;
                            case 1:
                                t = new THREE.OrthographicCamera(-o / 2, o / 2, s / 2, -s / 2, n, i);
                                break;
                            default:
                                console.warn("THREE.FBXLoader: Unknown camera type " + a + "."), t = new THREE.Object3D
                        }
                    }
                    return t
                },
                createLight: function (e) {
                    var t, r;
                    if (e.children.forEach(function (e) {
                            var t = g.Objects.NodeAttribute[e.ID];
                            void 0 !== t && (r = t)
                        }), void 0 === r) t = new THREE.Object3D;
                    else {
                        var a;
                        a = void 0 === r.LightType ? 0 : r.LightType.value;
                        var n = 16777215;
                        void 0 !== r.Color && (n = (new THREE.Color).fromArray(r.Color.value));
                        var i = void 0 === r.Intensity ? 1 : r.Intensity.value / 100;
                        void 0 !== r.CastLightOnObject && 0 === r.CastLightOnObject.value && (i = 0);
                        var o = 0;
                        void 0 !== r.FarAttenuationEnd && (o = void 0 !== r.EnableFarAttenuation && 0 === r.EnableFarAttenuation.value ? 0 : r.FarAttenuationEnd.value);
                        switch (a) {
                            case 0:
                                t = new THREE.PointLight(n, i, o, 1);
                                break;
                            case 1:
                                t = new THREE.DirectionalLight(n, i);
                                break;
                            case 2:
                                var s = Math.PI / 3;
                                void 0 !== r.InnerAngle && (s = THREE.Math.degToRad(r.InnerAngle.value));
                                var c = 0;
                                void 0 !== r.OuterAngle && (c = THREE.Math.degToRad(r.OuterAngle.value), c = Math.max(c, 1)), t = new THREE.SpotLight(n, i, o, s, c, 1);
                                break;
                            default:
                                console.warn("THREE.FBXLoader: Unknown light type " + r.LightType.value + ", defaulting to a THREE.PointLight."), t = new THREE.PointLight(n, i)
                        }
                        void 0 !== r.CastShadows && 1 === r.CastShadows.value && (t.castShadow = !0)
                    }
                    return t
                },
                createMesh: function (e, t, r) {
                    var a, n = null,
                        i = null,
                        o = [];
                    return e.children.forEach(function (e) {
                        t.has(e.ID) && (n = t.get(e.ID)), r.has(e.ID) && o.push(r.get(e.ID))
                    }), o.length > 1 ? i = o : o.length > 0 ? i = o[0] : (i = new THREE.MeshPhongMaterial({
                        color: 13421772
                    }), o.push(i)), "color" in n.attributes && o.forEach(function (e) {
                        e.vertexColors = THREE.VertexColors
                    }), n.FBX_Deformer ? (o.forEach(function (e) {
                        e.skinning = !0
                    }), a = new THREE.SkinnedMesh(n, i)) : a = new THREE.Mesh(n, i), a
                },
                createCurve: function (e, t) {
                    var r = e.children.reduce(function (e, r) {
                            return t.has(r.ID) && (e = t.get(r.ID)), e
                        }, null),
                        a = new THREE.LineBasicMaterial({
                            color: 3342591,
                            linewidth: 1
                        });
                    return new THREE.Line(r, a)
                },
                setModelTransforms: function (e, t) {
                    var r = {};
                    "RotationOrder" in t && (r.eulerOrder = parseInt(t.RotationOrder.value)), "Lcl_Translation" in t && (r.translation = t.Lcl_Translation.value), "RotationOffset" in t && (r.rotationOffset = t.RotationOffset.value), "Lcl_Rotation" in t && (r.rotation = t.Lcl_Rotation.value), "PreRotation" in t && (r.preRotation = t.PreRotation.value), "PostRotation" in t && (r.postRotation = t.PostRotation.value), "Lcl_Scaling" in t && (r.scale = t.Lcl_Scaling.value);
                    var a = f(r);
                    e.applyMatrix(a)
                },
                setLookAtProperties: function (e, t) {
                    if ("LookAtProperty" in t) {
                        E.get(e.ID).children.forEach(function (t) {
                            if ("LookAtProperty" === t.relationship) {
                                var r = g.Objects.Model[t.ID];
                                if ("Lcl_Translation" in r) {
                                    var a = r.Lcl_Translation.value;
                                    void 0 !== e.target ? (e.target.position.fromArray(a), y.add(e.target)) : e.lookAt((new THREE.Vector3).fromArray(a))
                                }
                            }
                        })
                    }
                },
                bindSkeleton: function (e, t, r) {
                    var a = this.parsePoseNodes();
                    for (var n in e) {
                        var i = e[n];
                        E.get(parseInt(i.ID)).parents.forEach(function (e) {
                            if (t.has(e.ID)) {
                                var n = e.ID;
                                E.get(n).parents.forEach(function (e) {
                                    if (r.has(e.ID)) {
                                        r.get(e.ID).bind(new THREE.Skeleton(i.bones), a[e.ID])
                                    }
                                })
                            }
                        })
                    }
                },
                parsePoseNodes: function () {
                    var e = {};
                    if ("Pose" in g.Objects) {
                        var t = g.Objects.Pose;
                        for (var r in t)
                            if ("BindPose" === t[r].attrType) {
                                var a = t[r].PoseNode;
                                Array.isArray(a) ? a.forEach(function (t) {
                                    e[t.Node] = (new THREE.Matrix4).fromArray(t.Matrix.a)
                                }) : e[a.Node] = (new THREE.Matrix4).fromArray(a.Matrix.a)
                            }
                    }
                    return e
                },
                createAmbientLight: function () {
                    if ("GlobalSettings" in g && "AmbientColor" in g.GlobalSettings) {
                        var e = g.GlobalSettings.AmbientColor.value,
                            t = e[0],
                            r = e[1],
                            a = e[2];
                        if (0 !== t || 0 !== r || 0 !== a) {
                            var n = new THREE.Color(t, r, a);
                            y.add(new THREE.AmbientLight(n, 1))
                        }
                    }
                },
                setupMorphMaterials: function () {
                    y.traverse(function (e) {
                        if (e.isMesh && (e.geometry.morphAttributes.position || e.geometry.morphAttributes.normal)) {
                            var t = e.uuid,
                                r = e.material.uuid,
                                a = !1;
                            y.traverse(function (e) {
                                e.isMesh && e.material.uuid === r && e.uuid !== t && (a = !0)
                            }), !0 === a && (e.material = e.material.clone()), e.material.morphTargets = !0
                        }
                    })
                }
            }, r.prototype = {
                constructor: r,
                parse: function (e) {
                    var t = new Map;
                    if ("Geometry" in g.Objects) {
                        var r = g.Objects.Geometry;
                        for (var a in r) {
                            var n = E.get(parseInt(a)),
                                i = this.parseGeometry(n, r[a], e);
                            t.set(parseInt(a), i)
                        }
                    }
                    return t
                },
                parseGeometry: function (e, t, r) {
                    switch (t.attrType) {
                        case "Mesh":
                            return this.parseMeshGeometry(e, t, r);
                        case "NurbsCurve":
                            return this.parseNurbsGeometry(t)
                    }
                },
                parseMeshGeometry: function (e, t, r) {
                    var a = r.skeletons,
                        n = r.morphTargets,
                        i = e.parents.map(function (e) {
                            return g.Objects.Model[e.ID]
                        });
                    if (0 !== i.length) {
                        var o = e.children.reduce(function (e, t) {
                                return void 0 !== a[t.ID] && (e = a[t.ID]), e
                            }, null),
                            s = e.children.reduce(function (e, t) {
                                return void 0 !== n[t.ID] && (e = n[t.ID]), e
                            }, null),
                            c = i[0],
                            l = {};
                        "RotationOrder" in c && (l.eulerOrder = c.RotationOrder.value), "GeometricTranslation" in c && (l.translation = c.GeometricTranslation.value), "GeometricRotation" in c && (l.rotation = c.GeometricRotation.value), "GeometricScaling" in c && (l.scale = c.GeometricScaling.value);
                        var u = f(l);
                        return this.genGeometry(t, o, s, u)
                    }
                },
                genGeometry: function (e, t, r, a) {
                    var n = new THREE.BufferGeometry;
                    e.attrName && (n.name = e.attrName);
                    var i = this.parseGeoNode(e, t),
                        o = this.genBuffers(i),
                        s = new THREE.Float32BufferAttribute(o.vertex, 3);
                    if (a.applyToBufferAttribute(s), n.addAttribute("position", s), o.colors.length > 0 && n.addAttribute("color", new THREE.Float32BufferAttribute(o.colors, 3)), t && (n.addAttribute("skinIndex", new THREE.Uint16BufferAttribute(o.weightsIndices, 4)), n.addAttribute("skinWeight", new THREE.Float32BufferAttribute(o.vertexWeights, 4)), n.FBX_Deformer = t), o.normal.length > 0) {
                        var c = new THREE.Float32BufferAttribute(o.normal, 3);
                        (new THREE.Matrix3).getNormalMatrix(a).applyToBufferAttribute(c), n.addAttribute("normal", c)
                    }
                    if (o.uvs.forEach(function (e, t) {
                            var r = "uv" + (t + 1).toString();
                            0 === t && (r = "uv"), n.addAttribute(r, new THREE.Float32BufferAttribute(o.uvs[t], 2))
                        }), i.material && "AllSame" !== i.material.mappingType) {
                        var l = o.materialIndex[0],
                            u = 0;
                        if (o.materialIndex.forEach(function (e, t) {
                                e !== l && (n.addGroup(u, t - u, l), l = e, u = t)
                            }), n.groups.length > 0) {
                            var d = n.groups[n.groups.length - 1],
                                f = d.start + d.count;
                            f !== o.materialIndex.length && n.addGroup(f, o.materialIndex.length - f, l)
                        }
                        0 === n.groups.length && n.addGroup(0, o.materialIndex.length, o.materialIndex[0])
                    }
                    return this.addMorphTargets(n, e, r, a), n
                },
                parseGeoNode: function (e, t) {
                    var r = {};
                    if (r.vertexPositions = void 0 !== e.Vertices ? e.Vertices.a : [], r.vertexIndices = void 0 !== e.PolygonVertexIndex ? e.PolygonVertexIndex.a : [], e.LayerElementColor && (r.color = this.parseVertexColors(e.LayerElementColor[0])), e.LayerElementMaterial && (r.material = this.parseMaterialIndices(e.LayerElementMaterial[0])), e.LayerElementNormal && (r.normal = this.parseNormals(e.LayerElementNormal[0])), e.LayerElementUV) {
                        r.uv = [];
                        for (var a = 0; e.LayerElementUV[a];) r.uv.push(this.parseUVs(e.LayerElementUV[a])), a++
                    }
                    return r.weightTable = {}, null !== t && (r.skeleton = t, t.rawBones.forEach(function (e, t) {
                        e.indices.forEach(function (a, n) {
                            void 0 === r.weightTable[a] && (r.weightTable[a] = []), r.weightTable[a].push({
                                id: t,
                                weight: e.weights[n]
                            })
                        })
                    })), r
                },
                genBuffers: function (e) {
                    var t = {
                            vertex: [],
                            normal: [],
                            colors: [],
                            uvs: [],
                            materialIndex: [],
                            vertexWeights: [],
                            weightsIndices: []
                        },
                        r = 0,
                        a = 0,
                        n = !1,
                        i = [],
                        o = [],
                        s = [],
                        c = [],
                        l = [],
                        u = [],
                        f = this;
                    return e.vertexIndices.forEach(function (p, h) {
                        var m = !1;
                        p < 0 && (p ^= -1, m = !0);
                        var v = [],
                            g = [];
                        if (i.push(3 * p, 3 * p + 1, 3 * p + 2), e.color) {
                            T = d(h, r, p, e.color);
                            s.push(T[0], T[1], T[2])
                        }
                        if (e.skeleton) {
                            if (void 0 !== e.weightTable[p] && e.weightTable[p].forEach(function (e) {
                                    g.push(e.weight), v.push(e.id)
                                }), g.length > 4) {
                                n || (console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."), n = !0);
                                var E = [0, 0, 0, 0],
                                    y = [0, 0, 0, 0];
                                g.forEach(function (e, t) {
                                    var r = e,
                                        a = v[t];
                                    y.forEach(function (e, t, n) {
                                        if (r > e) {
                                            n[t] = r, r = e;
                                            var i = E[t];
                                            E[t] = a, a = i
                                        }
                                    })
                                }), v = E, g = y
                            }
                            for (; g.length < 4;) g.push(0), v.push(0);
                            for (var b = 0; b < 4; ++b) l.push(g[b]), u.push(v[b])
                        }
                        if (e.normal) {
                            var T = d(h, r, p, e.normal);
                            o.push(T[0], T[1], T[2])
                        }
                        if (e.material && "AllSame" !== e.material.mappingType) var w = d(h, r, p, e.material)[0];
                        e.uv && e.uv.forEach(function (e, t) {
                            var a = d(h, r, p, e);
                            void 0 === c[t] && (c[t] = []), c[t].push(a[0]), c[t].push(a[1])
                        }), a++, m && (f.genFace(t, e, i, w, o, s, c, l, u, a), r++, a = 0, i = [], o = [], s = [], c = [], l = [], u = [])
                    }), t
                },
                genFace: function (e, t, r, a, n, i, o, s, c, l) {
                    for (var u = 2; u < l; u++) e.vertex.push(t.vertexPositions[r[0]]), e.vertex.push(t.vertexPositions[r[1]]), e.vertex.push(t.vertexPositions[r[2]]), e.vertex.push(t.vertexPositions[r[3 * (u - 1)]]), e.vertex.push(t.vertexPositions[r[3 * (u - 1) + 1]]), e.vertex.push(t.vertexPositions[r[3 * (u - 1) + 2]]), e.vertex.push(t.vertexPositions[r[3 * u]]), e.vertex.push(t.vertexPositions[r[3 * u + 1]]), e.vertex.push(t.vertexPositions[r[3 * u + 2]]), t.skeleton && (e.vertexWeights.push(s[0]), e.vertexWeights.push(s[1]), e.vertexWeights.push(s[2]), e.vertexWeights.push(s[3]), e.vertexWeights.push(s[4 * (u - 1)]), e.vertexWeights.push(s[4 * (u - 1) + 1]), e.vertexWeights.push(s[4 * (u - 1) + 2]), e.vertexWeights.push(s[4 * (u - 1) + 3]), e.vertexWeights.push(s[4 * u]), e.vertexWeights.push(s[4 * u + 1]), e.vertexWeights.push(s[4 * u + 2]), e.vertexWeights.push(s[4 * u + 3]), e.weightsIndices.push(c[0]), e.weightsIndices.push(c[1]), e.weightsIndices.push(c[2]), e.weightsIndices.push(c[3]), e.weightsIndices.push(c[4 * (u - 1)]), e.weightsIndices.push(c[4 * (u - 1) + 1]), e.weightsIndices.push(c[4 * (u - 1) + 2]), e.weightsIndices.push(c[4 * (u - 1) + 3]), e.weightsIndices.push(c[4 * u]), e.weightsIndices.push(c[4 * u + 1]), e.weightsIndices.push(c[4 * u + 2]), e.weightsIndices.push(c[4 * u + 3])), t.color && (e.colors.push(i[0]), e.colors.push(i[1]), e.colors.push(i[2]), e.colors.push(i[3 * (u - 1)]), e.colors.push(i[3 * (u - 1) + 1]), e.colors.push(i[3 * (u - 1) + 2]), e.colors.push(i[3 * u]), e.colors.push(i[3 * u + 1]), e.colors.push(i[3 * u + 2])), t.material && "AllSame" !== t.material.mappingType && (e.materialIndex.push(a), e.materialIndex.push(a), e.materialIndex.push(a)), t.normal && (e.normal.push(n[0]), e.normal.push(n[1]), e.normal.push(n[2]), e.normal.push(n[3 * (u - 1)]), e.normal.push(n[3 * (u - 1) + 1]), e.normal.push(n[3 * (u - 1) + 2]), e.normal.push(n[3 * u]), e.normal.push(n[3 * u + 1]), e.normal.push(n[3 * u + 2])), t.uv && t.uv.forEach(function (t, r) {
                        void 0 === e.uvs[r] && (e.uvs[r] = []), e.uvs[r].push(o[r][0]), e.uvs[r].push(o[r][1]), e.uvs[r].push(o[r][2 * (u - 1)]), e.uvs[r].push(o[r][2 * (u - 1) + 1]), e.uvs[r].push(o[r][2 * u]), e.uvs[r].push(o[r][2 * u + 1])
                    })
                },
                addMorphTargets: function (e, t, r, a) {
                    if (null !== r) {
                        e.morphAttributes.position = [], e.morphAttributes.normal = [];
                        var n = this;
                        r.rawTargets.forEach(function (r) {
                            var i = g.Objects.Geometry[r.geoID];
                            void 0 !== i && n.genMorphGeometry(e, t, i, a)
                        })
                    }
                },
                genMorphGeometry: function (e, t, r, a) {
                    var n = new THREE.BufferGeometry;
                    r.attrName && (n.name = r.attrName);
                    for (var i = void 0 !== t.PolygonVertexIndex ? t.PolygonVertexIndex.a : [], o = void 0 !== t.Vertices ? t.Vertices.a.slice() : [], s = void 0 !== r.Vertices ? r.Vertices.a : [], c = void 0 !== r.Indexes ? r.Indexes.a : [], l = 0; l < c.length; l++) {
                        var u = 3 * c[l];
                        o[u] += s[3 * l], o[u + 1] += s[3 * l + 1], o[u + 2] += s[3 * l + 2]
                    }
                    var d = {
                            vertexIndices: i,
                            vertexPositions: o
                        },
                        f = this.genBuffers(d),
                        p = new THREE.Float32BufferAttribute(f.vertex, 3);
                    p.name = r.attrName, a.applyToBufferAttribute(p), e.morphAttributes.position.push(p)
                },
                parseNormals: function (e) {
                    var t = e.MappingInformationType,
                        r = e.ReferenceInformationType,
                        a = e.Normals.a,
                        n = [];
                    return "IndexToDirect" === r && ("NormalIndex" in e ? n = e.NormalIndex.a : "NormalsIndex" in e && (n = e.NormalsIndex.a)), {
                        dataSize: 3,
                        buffer: a,
                        indices: n,
                        mappingType: t,
                        referenceType: r
                    }
                },
                parseUVs: function (e) {
                    var t = e.MappingInformationType,
                        r = e.ReferenceInformationType,
                        a = e.UV.a,
                        n = [];
                    return "IndexToDirect" === r && (n = e.UVIndex.a), {
                        dataSize: 2,
                        buffer: a,
                        indices: n,
                        mappingType: t,
                        referenceType: r
                    }
                },
                parseVertexColors: function (e) {
                    var t = e.MappingInformationType,
                        r = e.ReferenceInformationType,
                        a = e.Colors.a,
                        n = [];
                    return "IndexToDirect" === r && (n = e.ColorIndex.a), {
                        dataSize: 4,
                        buffer: a,
                        indices: n,
                        mappingType: t,
                        referenceType: r
                    }
                },
                parseMaterialIndices: function (e) {
                    var t = e.MappingInformationType,
                        r = e.ReferenceInformationType;
                    if ("NoMappingInformation" === t) return {
                        dataSize: 1,
                        buffer: [0],
                        indices: [0],
                        mappingType: "AllSame",
                        referenceType: r
                    };
                    for (var a = e.Materials.a, n = [], i = 0; i < a.length; ++i) n.push(i);
                    return {
                        dataSize: 1,
                        buffer: a,
                        indices: n,
                        mappingType: t,
                        referenceType: r
                    }
                },
                parseNurbsGeometry: function (e) {
                    if (void 0 === THREE.NURBSCurve) return console.error("THREE.FBXLoader: The loader relies on THREE.NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry."), new THREE.BufferGeometry;
                    var t = parseInt(e.Order);
                    if (isNaN(t)) return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", e.Order, e.id), new THREE.BufferGeometry;
                    for (var r = t - 1, a = e.KnotVector.a, n = [], i = e.Points.a, o = 0, s = i.length; o < s; o += 4) n.push((new THREE.Vector4).fromArray(i, o));
                    var c, l;
                    if ("Closed" === e.Form) n.push(n[0]);
                    else if ("Periodic" === e.Form) {
                        c = r, l = a.length - 1 - c;
                        for (o = 0; o < r; ++o) n.push(n[o])
                    }
                    var u = new THREE.NURBSCurve(r, a, n, c, l).getPoints(7 * n.length),
                        d = new Float32Array(3 * u.length);
                    u.forEach(function (e, t) {
                        e.toArray(d, 3 * t)
                    });
                    var f = new THREE.BufferGeometry;
                    return f.addAttribute("position", new THREE.BufferAttribute(d, 3)), f
                }
            }, a.prototype = {
                constructor: a,
                parse: function () {
                    var e = [],
                        t = this.parseClips();
                    if (void 0 === t) return e;
                    for (var r in t) {
                        var a = t[r],
                            n = this.addClip(a);
                        e.push(n)
                    }
                    return e
                },
                parseClips: function () {
                    if (void 0 !== g.Objects.AnimationCurve) {
                        var e = this.parseAnimationCurveNodes();
                        this.parseAnimationCurves(e);
                        var t = this.parseAnimationLayers(e);
                        return this.parseAnimStacks(t)
                    }
                },
                parseAnimationCurveNodes: function () {
                    var e = g.Objects.AnimationCurveNode,
                        t = new Map;
                    for (var r in e) {
                        var a = e[r];
                        if (null !== a.attrName.match(/S|R|T|DeformPercent/)) {
                            var n = {
                                id: a.id,
                                attr: a.attrName,
                                curves: {}
                            };
                            t.set(n.id, n)
                        }
                    }
                    return t
                },
                parseAnimationCurves: function (e) {
                    var t = g.Objects.AnimationCurve;
                    for (var r in t) {
                        var a = {
                                id: t[r].id,
                                times: t[r].KeyTime.a.map(u),
                                values: t[r].KeyValueFloat.a
                            },
                            n = E.get(a.id);
                        if (void 0 !== n) {
                            var i = n.parents[0].ID,
                                o = n.parents[0].relationship;
                            o.match(/X/) ? e.get(i).curves.x = a : o.match(/Y/) ? e.get(i).curves.y = a : o.match(/Z/) ? e.get(i).curves.z = a : o.match(/d|DeformPercent/) && e.has(i) && (e.get(i).curves.morph = a)
                        }
                    }
                },
                parseAnimationLayers: function (e) {
                    var t = g.Objects.AnimationLayer,
                        r = new Map;
                    for (var a in t) {
                        var n = [],
                            i = E.get(parseInt(a));
                        if (void 0 !== i) {
                            var o = this;
                            i.children.forEach(function (t, r) {
                                if (e.has(t.ID)) {
                                    var a = e.get(t.ID);
                                    if (void 0 !== a.curves.x || void 0 !== a.curves.y || void 0 !== a.curves.z) {
                                        if (void 0 === n[r]) {
                                            E.get(t.ID).parents.forEach(function (e) {
                                                void 0 !== e.relationship && (d = e.ID)
                                            });
                                            var i = g.Objects.Model[d.toString()],
                                                s = {
                                                    modelName: THREE.PropertyBinding.sanitizeNodeName(i.attrName),
                                                    initialPosition: [0, 0, 0],
                                                    initialRotation: [0, 0, 0],
                                                    initialScale: [1, 1, 1],
                                                    transform: o.getModelAnimTransform(i)
                                                };
                                            "PreRotation" in i && (s.preRotations = i.PreRotation.value), "PostRotation" in i && (s.postRotations = i.PostRotation.value), n[r] = s
                                        }
                                        n[r][a.attr] = a
                                    } else if (void 0 !== a.curves.morph) {
                                        if (void 0 === n[r]) {
                                            var c;
                                            E.get(t.ID).parents.forEach(function (e) {
                                                void 0 !== e.relationship && (c = e.ID)
                                            });
                                            var l = E.get(c).parents[0].ID,
                                                u = E.get(l).parents[0].ID,
                                                d = E.get(u).parents[0].ID,
                                                i = g.Objects.Model[d],
                                                s = {
                                                    modelName: THREE.PropertyBinding.sanitizeNodeName(i.attrName),
                                                    morphName: g.Objects.Deformer[c].attrName
                                                };
                                            n[r] = s
                                        }
                                        n[r][a.attr] = a
                                    }
                                }
                            }), r.set(parseInt(a), n)
                        }
                    }
                    return r
                },
                getModelAnimTransform: function (e) {
                    var t = {};
                    return "RotationOrder" in e && (t.eulerOrder = parseInt(e.RotationOrder.value)), "Lcl_Translation" in e && (t.translation = e.Lcl_Translation.value), "RotationOffset" in e && (t.rotationOffset = e.RotationOffset.value), "Lcl_Rotation" in e && (t.rotation = e.Lcl_Rotation.value), "PreRotation" in e && (t.preRotation = e.PreRotation.value), "PostRotation" in e && (t.postRotation = e.PostRotation.value), "Lcl_Scaling" in e && (t.scale = e.Lcl_Scaling.value), f(t)
                },
                parseAnimStacks: function (e) {
                    var t = g.Objects.AnimationStack,
                        r = {};
                    for (var a in t) {
                        var n = E.get(parseInt(a)).children;
                        n.length > 1 && console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");
                        var i = e.get(n[0].ID);
                        r[a] = {
                            name: t[a].attrName,
                            layer: i
                        }
                    }
                    return r
                },
                addClip: function (e) {
                    var t = [],
                        r = this;
                    return e.layer.forEach(function (e) {
                        t = t.concat(r.generateTracks(e))
                    }), new THREE.AnimationClip(e.name, -1, t)
                },
                generateTracks: function (e) {
                    var t = [],
                        r = new THREE.Vector3,
                        a = new THREE.Quaternion,
                        n = new THREE.Vector3;
                    if (e.transform && e.transform.decompose(r, a, n), r = r.toArray(), a = (new THREE.Euler).setFromQuaternion(a).toArray(), n = n.toArray(), void 0 !== e.T && Object.keys(e.T.curves).length > 0) {
                        var i = this.generateVectorTrack(e.modelName, e.T.curves, r, "position");
                        void 0 !== i && t.push(i)
                    }
                    if (void 0 !== e.R && Object.keys(e.R.curves).length > 0) {
                        var o = this.generateRotationTrack(e.modelName, e.R.curves, a, e.preRotations, e.postRotations);
                        void 0 !== o && t.push(o)
                    }
                    if (void 0 !== e.S && Object.keys(e.S.curves).length > 0) {
                        var s = this.generateVectorTrack(e.modelName, e.S.curves, n, "scale");
                        void 0 !== s && t.push(s)
                    }
                    if (void 0 !== e.DeformPercent) {
                        var c = this.generateMorphTrack(e);
                        void 0 !== c && t.push(c)
                    }
                    return t
                },
                generateVectorTrack: function (e, t, r, a) {
                    var n = this.getTimesForAllAxes(t),
                        i = this.getKeyframeTrackValues(n, t, r);
                    return new THREE.VectorKeyframeTrack(e + "." + a, n, i)
                },
                generateRotationTrack: function (e, t, r, a, n) {
                    void 0 !== t.x && (this.interpolateRotations(t.x), t.x.values = t.x.values.map(THREE.Math.degToRad)), void 0 !== t.y && (this.interpolateRotations(t.y), t.y.values = t.y.values.map(THREE.Math.degToRad)), void 0 !== t.z && (this.interpolateRotations(t.z), t.z.values = t.z.values.map(THREE.Math.degToRad));
                    var i = this.getTimesForAllAxes(t),
                        o = this.getKeyframeTrackValues(i, t, r);
                    void 0 !== a && ((a = a.map(THREE.Math.degToRad)).push("ZYX"), a = (new THREE.Euler).fromArray(a), a = (new THREE.Quaternion).setFromEuler(a)), void 0 !== n && ((n = n.map(THREE.Math.degToRad)).push("ZYX"), n = (new THREE.Euler).fromArray(n), n = (new THREE.Quaternion).setFromEuler(n).inverse());
                    for (var s = new THREE.Quaternion, c = new THREE.Euler, l = [], u = 0; u < o.length; u += 3) c.set(o[u], o[u + 1], o[u + 2], "ZYX"), s.setFromEuler(c), void 0 !== a && s.premultiply(a), void 0 !== n && s.multiply(n), s.toArray(l, u / 3 * 4);
                    return new THREE.QuaternionKeyframeTrack(e + ".quaternion", i, l)
                },
                generateMorphTrack: function (e) {
                    var t = e.DeformPercent.curves.morph,
                        r = t.values.map(function (e) {
                            return e / 100
                        }),
                        a = y.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];
                    return new THREE.NumberKeyframeTrack(e.modelName + ".morphTargetInfluences[" + a + "]", t.times, r)
                },
                getTimesForAllAxes: function (e) {
                    var t = [];
                    return void 0 !== e.x && (t = t.concat(e.x.times)), void 0 !== e.y && (t = t.concat(e.y.times)), void 0 !== e.z && (t = t.concat(e.z.times)), t = t.sort(function (e, t) {
                        return e - t
                    }).filter(function (e, t, r) {
                        return r.indexOf(e) == t
                    })
                },
                getKeyframeTrackValues: function (e, t, r) {
                    var a = r,
                        n = [],
                        i = -1,
                        o = -1,
                        s = -1;
                    return e.forEach(function (e) {
                        if (t.x && (i = t.x.times.indexOf(e)), t.y && (o = t.y.times.indexOf(e)), t.z && (s = t.z.times.indexOf(e)), -1 !== i) {
                            var r = t.x.values[i];
                            n.push(r), a[0] = r
                        } else n.push(a[0]);
                        if (-1 !== o) {
                            var c = t.y.values[o];
                            n.push(c), a[1] = c
                        } else n.push(a[1]);
                        if (-1 !== s) {
                            var l = t.z.values[s];
                            n.push(l), a[2] = l
                        } else n.push(a[2])
                    }), n
                },
                interpolateRotations: function (e) {
                    for (var t = 1; t < e.values.length; t++) {
                        var r = e.values[t - 1],
                            a = e.values[t] - r,
                            n = Math.abs(a);
                        if (n >= 180) {
                            for (var i = n / 180, o = a / i, s = r + o, c = e.times[t - 1], l = (e.times[t] - c) / i, u = c + l, d = [], f = []; u < e.times[t];) d.push(u), u += l, f.push(s), s += o;
                            e.times = v(e.times, t, d), e.values = v(e.values, t, f)
                        }
                    }
                }
            }, i.prototype = {
                constructor: i,
                getPrevNode: function () {
                    return this.nodeStack[this.currentIndent - 2]
                },
                getCurrentNode: function () {
                    return this.nodeStack[this.currentIndent - 1]
                },
                getCurrentProp: function () {
                    return this.currentProp
                },
                pushStack: function (e) {
                    this.nodeStack.push(e), this.currentIndent += 1
                },
                popStack: function () {
                    this.nodeStack.pop(), this.currentIndent -= 1
                },
                setCurrentProp: function (e, t) {
                    this.currentProp = e, this.currentPropName = t
                },
                parse: function (e) {
                    this.currentIndent = 0, console.log("FBXTree: ", c), this.allNodes = new c, this.nodeStack = [], this.currentProp = [], this.currentPropName = "";
                    var t = this,
                        r = e.split(/[\r\n]+/);
                    return r.forEach(function (e, a) {
                        var n = e.match(/^[\s\t]*;/),
                            i = e.match(/^[\s\t]*$/);
                        if (!n && !i) {
                            var o = e.match("^\\t{" + t.currentIndent + "}(\\w+):(.*){", ""),
                                s = e.match("^\\t{" + t.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)"),
                                c = e.match("^\\t{" + (t.currentIndent - 1) + "}}");
                            o ? t.parseNodeBegin(e, o) : s ? t.parseNodeProperty(e, s, r[++a]) : c ? t.popStack() : e.match(/^[^\s\t}]/) && t.parseNodePropertyContinued(e)
                        }
                    }), this.allNodes
                },
                parseNodeBegin: function (e, t) {
                    var r = t[1].trim().replace(/^"/, "").replace(/"$/, ""),
                        a = t[2].split(",").map(function (e) {
                            return e.trim().replace(/^"/, "").replace(/"$/, "")
                        }),
                        n = {
                            name: r
                        },
                        i = this.parseNodeAttr(a),
                        o = this.getCurrentNode();
                    0 === this.currentIndent ? this.allNodes.add(r, n) : r in o ? ("PoseNode" === r ? o.PoseNode.push(n) : void 0 !== o[r].id && (o[r] = {}, o[r][o[r].id] = o[r]), "" !== i.id && (o[r][i.id] = n)) : "number" == typeof i.id ? (o[r] = {}, o[r][i.id] = n) : "Properties70" !== r && (o[r] = "PoseNode" === r ? [n] : n), "number" == typeof i.id && (n.id = i.id), "" !== i.name && (n.attrName = i.name), "" !== i.type && (n.attrType = i.type), this.pushStack(n)
                },
                parseNodeAttr: function (e) {
                    var t = e[0];
                    "" !== e[0] && (t = parseInt(e[0]), isNaN(t) && (t = e[0]));
                    var r = "",
                        a = "";
                    return e.length > 1 && (r = e[1].replace(/^(\w+)::/, ""), a = e[2]), {
                        id: t,
                        name: r,
                        type: a
                    }
                },
                parseNodeProperty: function (e, t, r) {
                    var a = t[1].replace(/^"/, "").replace(/"$/, "").trim(),
                        n = t[2].replace(/^"/, "").replace(/"$/, "").trim();
                    "Content" === a && "," === n && (n = r.replace(/"/g, "").replace(/,$/, "").trim());
                    var i = this.getCurrentNode();
                    if ("Properties70" !== i.name) {
                        if ("C" === a) {
                            var o = n.split(",").slice(1),
                                s = parseInt(o[0]),
                                c = parseInt(o[1]),
                                l = n.split(",").slice(3);
                            a = "connections",
                                function (e, t) {
                                    for (var r = 0, a = e.length, n = t.length; r < n; r++, a++) e[a] = t[r]
                                }(n = [s, c], l = l.map(function (e) {
                                    return e.trim().replace(/^"/, "")
                                })), void 0 === i[a] && (i[a] = [])
                        }
                        "Node" === a && (i.id = n), a in i && Array.isArray(i[a]) ? i[a].push(n) : "a" !== a ? i[a] = n : i.a = n, this.setCurrentProp(i, a), "a" === a && "," !== n.slice(-1) && (i.a = h(n))
                    } else this.parseNodeSpecialProperty(e, a, n)
                },
                parseNodePropertyContinued: function (e) {
                    var t = this.getCurrentNode();
                    t.a += e, "," !== e.slice(-1) && (t.a = h(t.a))
                },
                parseNodeSpecialProperty: function (e, t, r) {
                    var a = r.split('",').map(function (e) {
                            return e.trim().replace(/^\"/, "").replace(/\s/, "_")
                        }),
                        n = a[0],
                        i = a[1],
                        o = a[2],
                        s = a[3],
                        c = a[4];
                    switch (i) {
                        case "int":
                        case "enum":
                        case "bool":
                        case "ULongLong":
                        case "double":
                        case "Number":
                        case "FieldOfView":
                            c = parseFloat(c);
                            break;
                        case "Color":
                        case "ColorRGB":
                        case "Vector3D":
                        case "Lcl_Translation":
                        case "Lcl_Rotation":
                        case "Lcl_Scaling":
                            c = h(c)
                    }
                    this.getPrevNode()[n] = {
                        type: i,
                        type2: o,
                        flag: s,
                        value: c
                    }, this.setCurrentProp(this.getPrevNode(), n)
                }
            }, o.prototype = {
                constructor: o,
                parse: function (e) {
                    var t = new s(e);
                    t.skip(23);
                    var r = t.getUint32();
                    console.log("THREE.FBXLoader: FBX binary version: " + r);
                    for (var a = new c; !this.endOfContent(t);) {
                        var n = this.parseNode(t, r);
                        null !== n && a.add(n.name, n)
                    }
                    return a
                },
                endOfContent: function (e) {
                    return e.size() % 16 == 0 ? (e.getOffset() + 160 + 16 & -16) >= e.size() : e.getOffset() + 160 + 16 >= e.size()
                },
                parseNode: function (e, t) {
                    var r = {},
                        a = t >= 7500 ? e.getUint64() : e.getUint32(),
                        n = t >= 7500 ? e.getUint64() : e.getUint32(),
                        i = (t >= 7500 ? e.getUint64() : e.getUint32(), e.getUint8()),
                        o = e.getString(i);
                    if (0 === a) return null;
                    for (var s = [], c = 0; c < n; c++) s.push(this.parseProperty(e));
                    var l = s.length > 0 ? s[0] : "",
                        u = s.length > 1 ? s[1] : "",
                        d = s.length > 2 ? s[2] : "";
                    for (r.singleProperty = 1 === n && e.getOffset() === a; a > e.getOffset();) {
                        var f = this.parseNode(e, t);
                        null !== f && this.parseSubNode(o, r, f)
                    }
                    return r.propertyList = s, "number" == typeof l && (r.id = l), "" !== u && (r.attrName = u), "" !== d && (r.attrType = d), "" !== o && (r.name = o), r
                },
                parseSubNode: function (e, t, r) {
                    if (!0 === r.singleProperty) {
                        var a = r.propertyList[0];
                        Array.isArray(a) ? (t[r.name] = r, r.a = a) : t[r.name] = a
                    } else if ("Connections" === e && "C" === r.name) {
                        var n = [];
                        r.propertyList.forEach(function (e, t) {
                            0 !== t && n.push(e)
                        }), void 0 === t.connections && (t.connections = []), t.connections.push(n)
                    } else if ("Properties70" === r.name) {
                        Object.keys(r).forEach(function (e) {
                            t[e] = r[e]
                        })
                    } else if ("Properties70" === e && "P" === r.name) {
                        var i, o = r.propertyList[0],
                            s = r.propertyList[1],
                            c = r.propertyList[2],
                            l = r.propertyList[3];
                        0 === o.indexOf("Lcl ") && (o = o.replace("Lcl ", "Lcl_")), 0 === s.indexOf("Lcl ") && (s = s.replace("Lcl ", "Lcl_")), i = "Color" === s || "ColorRGB" === s || "Vector" === s || "Vector3D" === s || 0 === s.indexOf("Lcl_") ? [r.propertyList[4], r.propertyList[5], r.propertyList[6]] : r.propertyList[4], t[o] = {
                            type: s,
                            type2: c,
                            flag: l,
                            value: i
                        }
                    } else void 0 === t[r.name] ? "number" == typeof r.id ? (t[r.name] = {}, t[r.name][r.id] = r) : t[r.name] = r : "PoseNode" === r.name ? (Array.isArray(t[r.name]) || (t[r.name] = [t[r.name]]), t[r.name].push(r)) : void 0 === t[r.name][r.id] && (t[r.name][r.id] = r)
                },
                parseProperty: function (e) {
                    var t = e.getString(1);
                    switch (t) {
                        case "C":
                            return e.getBoolean();
                        case "D":
                            return e.getFloat64();
                        case "F":
                            return e.getFloat32();
                        case "I":
                            return e.getInt32();
                        case "L":
                            return e.getInt64();
                        case "R":
                            r = e.getUint32();
                            return e.getArrayBuffer(r);
                        case "S":
                            var r = e.getUint32();
                            return e.getString(r);
                        case "Y":
                            return e.getInt16();
                        case "b":
                        case "c":
                        case "d":
                        case "f":
                        case "i":
                        case "l":
                            var a = e.getUint32(),
                                n = e.getUint32(),
                                i = e.getUint32();
                            if (0 === n) switch (t) {
                                case "b":
                                case "c":
                                    return e.getBooleanArray(a);
                                case "d":
                                    return e.getFloat64Array(a);
                                case "f":
                                    return e.getFloat32Array(a);
                                case "i":
                                    return e.getInt32Array(a);
                                case "l":
                                    return e.getInt64Array(a)
                            }
                            "undefined" == typeof Zlib && console.error("THREE.FBXLoader: External library Inflate.min.js required, obtain or import from https://github.com/imaya/zlib.js");
                            var o = new s(new Zlib.Inflate(new Uint8Array(e.getArrayBuffer(i))).decompress().buffer);
                            switch (t) {
                                case "b":
                                case "c":
                                    return o.getBooleanArray(a);
                                case "d":
                                    return o.getFloat64Array(a);
                                case "f":
                                    return o.getFloat32Array(a);
                                case "i":
                                    return o.getInt32Array(a);
                                case "l":
                                    return o.getInt64Array(a)
                            }
                            default:
                                throw new Error("THREE.FBXLoader: Unknown property type " + t)
                    }
                }
            }, s.prototype = {
                constructor: s,
                getOffset: function () {
                    return this.offset
                },
                size: function () {
                    return this.dv.buffer.byteLength
                },
                skip: function (e) {
                    this.offset += e
                },
                getBoolean: function () {
                    return 1 == (1 & this.getUint8())
                },
                getBooleanArray: function (e) {
                    for (var t = [], r = 0; r < e; r++) t.push(this.getBoolean());
                    return t
                },
                getUint8: function () {
                    var e = this.dv.getUint8(this.offset);
                    return this.offset += 1, e
                },
                getInt16: function () {
                    var e = this.dv.getInt16(this.offset, this.littleEndian);
                    return this.offset += 2, e
                },
                getInt32: function () {
                    var e = this.dv.getInt32(this.offset, this.littleEndian);
                    return this.offset += 4, e
                },
                getInt32Array: function (e) {
                    for (var t = [], r = 0; r < e; r++) t.push(this.getInt32());
                    return t
                },
                getUint32: function () {
                    var e = this.dv.getUint32(this.offset, this.littleEndian);
                    return this.offset += 4, e
                },
                getInt64: function () {
                    var e, t;
                    return this.littleEndian ? (e = this.getUint32(), t = this.getUint32()) : (t = this.getUint32(), e = this.getUint32()), 2147483648 & t ? (t = 4294967295 & ~t, 4294967295 === (e = 4294967295 & ~e) && (t = t + 1 & 4294967295), e = e + 1 & 4294967295, -(4294967296 * t + e)) : 4294967296 * t + e
                },
                getInt64Array: function (e) {
                    for (var t = [], r = 0; r < e; r++) t.push(this.getInt64());
                    return t
                },
                getUint64: function () {
                    var e, t;
                    return this.littleEndian ? (e = this.getUint32(), t = this.getUint32()) : (t = this.getUint32(), e = this.getUint32()), 4294967296 * t + e
                },
                getFloat32: function () {
                    var e = this.dv.getFloat32(this.offset, this.littleEndian);
                    return this.offset += 4, e
                },
                getFloat32Array: function (e) {
                    for (var t = [], r = 0; r < e; r++) t.push(this.getFloat32());
                    return t
                },
                getFloat64: function () {
                    var e = this.dv.getFloat64(this.offset, this.littleEndian);
                    return this.offset += 8, e
                },
                getFloat64Array: function (e) {
                    for (var t = [], r = 0; r < e; r++) t.push(this.getFloat64());
                    return t
                },
                getArrayBuffer: function (e) {
                    var t = this.dv.buffer.slice(this.offset, this.offset + e);
                    return this.offset += e, t
                },
                getString: function (e) {
                    for (var t = [], r = 0; r < e; r++) t[r] = this.getUint8();
                    var a = t.indexOf(0);
                    return a >= 0 && (t = t.slice(0, a)), THREE.LoaderUtils.decodeText(new Uint8Array(t))
                }
            }, c.prototype = {
                constructor: c,
                add: function (e, t) {
                    this[e] = t
                }
            };
            var b = [],
                T = new THREE.Matrix4,
                w = new THREE.Euler,
                R = new THREE.Vector3,
                x = new THREE.Vector3,
                A = new THREE.Matrix4;
            return e
        }()
    }, {}],
    4: [function (e, t, r) {
        "use strict";

        function a(e) {
            var t = document.getElementById(e),
                r = t.parentNode;
            try {
                r && r.removeChild(t)
            } catch (e) {}
        }

        function n(e, t, r) {
            return new r(function (r, n) {
                var i = t.timeout || 5e3,
                    o = "script_" + Date.now() + "_" + Math.ceil(1e5 * Math.random()),
                    s = function (e, t) {
                        var r = document.createElement("script");
                        return r.type = "text/javascript", r.async = !0, r.id = t, r.src = e, r
                    }(e, o),
                    c = setTimeout(function () {
                        n(new Error("Script request to " + e + " timed out")), a(o)
                    }, i),
                    l = function (e) {
                        clearTimeout(e)
                    };
                s.addEventListener("load", function (e) {
                        r({
                            ok: !0
                        }), l(c), a(o)
                    }), s.addEventListener("error", function (t) {
                        n(new Error("Script request to " + e + " failed " + t)), l(c), a(o)
                    }),
                    function (e) {
                        var t = document.getElementsByTagName("script")[0];
                        t.parentNode.insertBefore(e, t)
                    }(s)
            })
        }
        t.exports = function (e) {
            return e = e || {},
                function (t, r) {
                    return r = r || {}, n(t, r, e.Promise || Promise)
                }
        }
    }, {}],
    5: [function (e, t, r) {
        "use strict";

        function a(e) {
            return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
        }
        var n = {
            once: THREE.LoopOnce,
            repeat: THREE.LoopRepeat,
            pingpong: THREE.LoopPingPong
        };
        t.exports = AFRAME.registerComponent("animation-mixer", {
            schema: {
                clip: {
                    default: "*"
                },
                duration: {
                    default: 0
                },
                clampWhenFinished: {
                    default: !1,
                    type: "boolean"
                },
                crossFadeDuration: {
                    default: 0
                },
                loop: {
                    default: "repeat",
                    oneOf: Object.keys(n)
                },
                repetitions: {
                    default: 1 / 0,
                    min: 0
                },
                timeScale: {
                    default: 1
                }
            },
            init: function () {
                var e = this;
                this.model = null, this.mixer = null, this.activeActions = [];
                var t = this.el.getObject3D("mesh");
                t ? this.load(t) : this.el.addEventListener("model-loaded", function (t) {
                    e.load(t.detail.model)
                })
            },
            load: function (e) {
                var t = this.el;
                this.model = e, this.mixer = new THREE.AnimationMixer(e), this.mixer.addEventListener("loop", function (e) {
                    t.emit("animation-loop", {
                        action: e.action,
                        loopDelta: e.loopDelta
                    })
                }), this.mixer.addEventListener("finished", function (e) {
                    t.emit("animation-finished", {
                        action: e.action,
                        direction: e.direction
                    })
                }), this.data.clip && this.update({})
            },
            remove: function () {
                this.mixer && this.mixer.stopAllAction()
            },
            update: function (e) {
                if (e) {
                    var t = this.data,
                        r = AFRAME.utils.diff(t, e);
                    if ("clip" in r) return this.stopAction(), void(t.clip && this.playAction());
                    this.activeActions.forEach(function (e) {
                        "duration" in r && t.duration && e.setDuration(t.duration), "clampWhenFinished" in r && (e.clampWhenFinished = t.clampWhenFinished), ("loop" in r || "repetitions" in r) && e.setLoop(n[t.loop], t.repetitions), "timeScale" in r && e.setEffectiveTimeScale(t.timeScale)
                    })
                }
            },
            stopAction: function () {
                for (var e = this.data, t = 0; t < this.activeActions.length; t++) e.crossFadeDuration ? this.activeActions[t].fadeOut(e.crossFadeDuration) : this.activeActions[t].stop();
                this.activeActions.length = 0
            },
            playAction: function () {
                if (this.mixer) {
                    var e = this.model,
                        t = this.data,
                        r = e.animations || (e.geometry || {}).animations || [];
                    if (r.length)
                        for (var i, o = function (e) {
                                return new RegExp("^" + e.split(/\*+/).map(a).join(".*") + "$")
                            }(t.clip), s = 0; i = r[s]; s++)
                            if (i.name.match(o)) {
                                var c = this.mixer.clipAction(i, e);
                                c.enabled = !0, c.clampWhenFinished = t.clampWhenFinished, t.duration && c.setDuration(t.duration), 1 !== t.timeScale && c.setEffectiveTimeScale(t.timeScale), c.setLoop(n[t.loop], t.repetitions).fadeIn(t.crossFadeDuration).play(), this.activeActions.push(c)
                            }
                }
            },
            tick: function (e, t) {
                this.mixer && !isNaN(t) && this.mixer.update(t / 1e3)
            }
        })
    }, {}],
    6: [function (e, t, r) {
        "use strict";
        THREE.ColladaLoader = e("../../lib/ColladaLoader"), t.exports.Component = AFRAME.registerComponent("collada-model-legacy", {
            schema: {
                type: "asset"
            },
            init: function () {
                this.model = null, this.loader = new THREE.ColladaLoader
            },
            update: function () {
                var e = this,
                    t = this.el,
                    r = this.data,
                    a = this.el.sceneEl.systems.renderer;
                r && (this.remove(), this.loader.load(r, function (r) {
                    e.model = r.scene, e.model.traverse(function (e) {
                        if (e.isMesh) {
                            var t = e.material;
                            t.color && a.applyColorCorrection(t.color), t.map && a.applyColorCorrection(t.map), t.emissive && a.applyColorCorrection(t.emissive), t.emissiveMap && a.applyColorCorrection(t.emissiveMap)
                        }
                    }), t.setObject3D("mesh", e.model), t.emit("model-loaded", {
                        format: "collada",
                        model: e.model
                    })
                }))
            },
            remove: function () {
                this.model && this.el.removeObject3D("mesh")
            }
        })
    }, {
        "../../lib/ColladaLoader": 2
    }],
    7: [function (e, t, r) {
        "use strict";
        THREE.FBXLoader = e("../../lib/FBXLoader"), t.exports = AFRAME.registerComponent("fbx-model", {
            schema: {
                src: {
                    type: "asset"
                },
                crossorigin: {
                    default: ""
                }
            },
            init: function () {
                this.model = null
            },
            update: function () {
                var e = this.data;
                if (e.src) {
                    this.remove();
                    var t = new THREE.FBXLoader;
                    e.crossorigin && t.setCrossOrigin(e.crossorigin), t.load(e.src, this.load.bind(this))
                }
            },
            load: function (e) {
                this.model = e, this.el.setObject3D("mesh", e), this.el.emit("model-loaded", {
                    format: "fbx",
                    model: e
                })
            },
            remove: function () {
                this.model && this.el.removeObject3D("mesh")
            }
        })
    }, {
        "../../lib/FBXLoader": 3
    }],
    8: [function (e, t, r) {
        "use strict";
        var a = e("../../lib/fetch-script")(),
            n = function () {
                var e = void 0;
                return function () {
                    return e = e || a("https://rawgit.com/mrdoob/three.js/r86/examples/js/loaders/GLTFLoader.js")
                }
            }();
        t.exports = AFRAME.registerComponent("gltf-model-legacy", {
            schema: {
                type: "model"
            },
            init: function () {
                var e = this;
                this.model = null, this.loader = null, this.loaderPromise = n().then(function () {
                    e.loader = new THREE.GLTFLoader, e.loader.setCrossOrigin("Anonymous")
                })
            },
            update: function () {
                var e = this,
                    t = this,
                    r = this.el,
                    a = this.data;
                a && (this.remove(), this.loaderPromise.then(function () {
                    e.loader.load(a, function (e) {
                        t.model = e.scene, t.model.animations = e.animations, r.setObject3D("mesh", t.model), r.emit("model-loaded", {
                            format: "gltf",
                            model: t.model
                        })
                    })
                }))
            },
            remove: function () {
                this.model && this.el.removeObject3D("mesh")
            }
        })
    }, {
        "../../lib/fetch-script": 4
    }],
    9: [function (e, t, r) {
        "use strict";
        e("./animation-mixer"), e("./collada-model-legacy"), e("./fbx-model"), e("./gltf-model-legacy"), e("./object-model")
    }, {
        "./animation-mixer": 5,
        "./collada-model-legacy": 6,
        "./fbx-model": 7,
        "./gltf-model-legacy": 8,
        "./object-model": 10
    }],
    10: [function (e, t, r) {
        "use strict";
        t.exports = AFRAME.registerComponent("object-model", {
            schema: {
                src: {
                    type: "asset"
                },
                crossorigin: {
                    default: ""
                }
            },
            init: function () {
                this.model = null
            },
            update: function () {
                var e = this,
                    t = void 0,
                    r = this.data;
                r.src && (this.remove(), t = new THREE.ObjectLoader, r.crossorigin && t.setCrossOrigin(r.crossorigin), t.load(r.src, function (t) {
                    t.traverse(function (e) {
                        e instanceof THREE.SkinnedMesh && e.material && (e.material.skinning = !!(e.geometry && e.geometry.bones || []).length)
                    }), e.load(t)
                }))
            },
            load: function (e) {
                this.model = e, this.el.setObject3D("mesh", e), this.el.emit("model-loaded", {
                    format: "json",
                    model: e
                })
            },
            remove: function () {
                this.model && this.el.removeObject3D("mesh")
            }
        })
    }, {}]
}, {}, [1]);