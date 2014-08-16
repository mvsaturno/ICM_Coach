var dbits;
var canary = 244837814094590;
var j_lm = ((canary & 16777215) == 15715070);

function BigInteger(e, d, f) {
    if (e != null) {
        if ("number" == typeof e) {
            this.fromNumber(e, d, f)
        } else {
            if (d == null && "string" != typeof e) {
                this.fromString(e, 256)
            } else {
                this.fromString(e, d)
            }
        }
    }
}

function nbi() {
    return new BigInteger(null)
}

function am1(f, a, b, e, h, g) {
    while (--g >= 0) {
        var d = a * this[f++] + b[e] + h;
        h = Math.floor(d / 67108864);
        b[e++] = d & 67108863
    }
    return h
}

function am2(f, q, r, e, o, a) {
    var k = q & 32767,
        p = q >> 15;
    while (--a >= 0) {
        var d = this[f] & 32767;
        var g = this[f++] >> 15;
        var b = p * d + g * k;
        d = k * d + ((b & 32767) << 15) + r[e] + (o & 1073741823);
        o = (d >>> 30) + (b >>> 15) + p * g + (o >>> 30);
        r[e++] = d & 1073741823
    }
    return o
}

function am3(f, q, r, e, o, a) {
    var k = q & 16383,
        p = q >> 14;
    while (--a >= 0) {
        var d = this[f] & 16383;
        var g = this[f++] >> 14;
        var b = p * d + g * k;
        d = k * d + ((b & 16383) << 14) + r[e] + o;
        o = (d >> 28) + (b >> 14) + p * g;
        r[e++] = d & 268435455
    }
    return o
}
if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30
} else {
    if (j_lm && (navigator.appName != "Netscape")) {
        BigInteger.prototype.am = am1;
        dbits = 26
    } else {
        BigInteger.prototype.am = am3;
        dbits = 28
    }
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv
}

function int2char(a) {
    return BI_RM.charAt(a)
}

function intAt(b, a) {
    var d = BI_RC[b.charCodeAt(a)];
    return (d == null) ? -1 : d
}

function bnpCopyTo(b) {
    for (var a = this.t - 1; a >= 0; --a) {
        b[a] = this[a]
    }
    b.t = this.t;
    b.s = this.s
}

function bnpFromInt(a) {
    this.t = 1;
    this.s = (a < 0) ? -1 : 0;
    if (a > 0) {
        this[0] = a
    } else {
        if (a < -1) {
            this[0] = a + DV
        } else {
            this.t = 0
        }
    }
}

function nbv(a) {
    var b = nbi();
    b.fromInt(a);
    return b
}

function bnpFromString(h, c) {
    var e;
    if (c == 16) {
        e = 4
    } else {
        if (c == 8) {
            e = 3
        } else {
            if (c == 256) {
                e = 8
            } else {
                if (c == 2) {
                    e = 1
                } else {
                    if (c == 32) {
                        e = 5
                    } else {
                        if (c == 4) {
                            e = 2
                        } else {
                            this.fromRadix(h, c);
                            return
                        }
                    }
                }
            }
        }
    }
    this.t = 0;
    this.s = 0;
    var g = h.length,
        d = false,
        f = 0;
    while (--g >= 0) {
        var a = (e == 8) ? h[g] & 255 : intAt(h, g);
        if (a < 0) {
            if (h.charAt(g) == "-") {
                d = true
            }
            continue
        }
        d = false;
        if (f == 0) {
            this[this.t++] = a
        } else {
            if (f + e > this.DB) {
                this[this.t - 1] |= (a & ((1 << (this.DB - f)) - 1)) << f;
                this[this.t++] = (a >> (this.DB - f))
            } else {
                this[this.t - 1] |= a << f
            }
        }
        f += e;
        if (f >= this.DB) {
            f -= this.DB
        }
    }
    if (e == 8 && (h[0] & 128) != 0) {
        this.s = -1;
        if (f > 0) {
            this[this.t - 1] |= ((1 << (this.DB - f)) - 1) << f
        }
    }
    this.clamp();
    if (d) {
        BigInteger.ZERO.subTo(this, this)
    }
}

function bnpClamp() {
    var a = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == a) {
        --this.t
    }
}

function bnToString(c) {
    if (this.s < 0) {
        return "-" + this.negate().toString(c)
    }
    var e;
    if (c == 16) {
        e = 4
    } else {
        if (c == 8) {
            e = 3
        } else {
            if (c == 2) {
                e = 1
            } else {
                if (c == 32) {
                    e = 5
                } else {
                    if (c == 4) {
                        e = 2
                    } else {
                        return this.toRadix(c)
                    }
                }
            }
        }
    }
    var g = (1 << e) - 1,
        l, a = false,
        h = "",
        f = this.t;
    var j = this.DB - (f * this.DB) % e;
    if (f-- > 0) {
        if (j < this.DB && (l = this[f] >> j) > 0) {
            a = true;
            h = int2char(l)
        }
        while (f >= 0) {
            if (j < e) {
                l = (this[f] & ((1 << j) - 1)) << (e - j);
                l |= this[--f] >> (j += this.DB - e)
            } else {
                l = (this[f] >> (j -= e)) & g;
                if (j <= 0) {
                    j += this.DB;
                    --f
                }
            } if (l > 0) {
                a = true
            }
            if (a) {
                h += int2char(l)
            }
        }
    }
    return a ? h : "0"
}

function bnNegate() {
    var a = nbi();
    BigInteger.ZERO.subTo(this, a);
    return a
}

function bnAbs() {
    return (this.s < 0) ? this.negate() : this
}

function bnCompareTo(b) {
    var d = this.s - b.s;
    if (d != 0) {
        return d
    }
    var c = this.t;
    d = c - b.t;
    if (d != 0) {
        return d
    }
    while (--c >= 0) {
        if ((d = this[c] - b[c]) != 0) {
            return d
        }
    }
    return 0
}

function nbits(a) {
    var c = 1,
        b;
    if ((b = a >>> 16) != 0) {
        a = b;
        c += 16
    }
    if ((b = a >> 8) != 0) {
        a = b;
        c += 8
    }
    if ((b = a >> 4) != 0) {
        a = b;
        c += 4
    }
    if ((b = a >> 2) != 0) {
        a = b;
        c += 2
    }
    if ((b = a >> 1) != 0) {
        a = b;
        c += 1
    }
    return c
}

function bnBitLength() {
    if (this.t <= 0) {
        return 0
    }
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM))
}

function bnpDLShiftTo(c, b) {
    var a;
    for (a = this.t - 1; a >= 0; --a) {
        b[a + c] = this[a]
    }
    for (a = c - 1; a >= 0; --a) {
        b[a] = 0
    }
    b.t = this.t + c;
    b.s = this.s
}

function bnpDRShiftTo(c, b) {
    for (var a = c; a < this.t; ++a) {
        b[a - c] = this[a]
    }
    b.t = Math.max(this.t - c, 0);
    b.s = this.s
}

function bnpLShiftTo(j, e) {
    var b = j % this.DB;
    var a = this.DB - b;
    var g = (1 << a) - 1;
    var f = Math.floor(j / this.DB),
        h = (this.s << b) & this.DM,
        d;
    for (d = this.t - 1; d >= 0; --d) {
        e[d + f + 1] = (this[d] >> a) | h;
        h = (this[d] & g) << b
    }
    for (d = f - 1; d >= 0; --d) {
        e[d] = 0
    }
    e[f] = h;
    e.t = this.t + f + 1;
    e.s = this.s;
    e.clamp()
}

function bnpRShiftTo(g, d) {
    d.s = this.s;
    var e = Math.floor(g / this.DB);
    if (e >= this.t) {
        d.t = 0;
        return
    }
    var b = g % this.DB;
    var a = this.DB - b;
    var f = (1 << b) - 1;
    d[0] = this[e] >> b;
    for (var c = e + 1; c < this.t; ++c) {
        d[c - e - 1] |= (this[c] & f) << a;
        d[c - e] = this[c] >> b
    }
    if (b > 0) {
        d[this.t - e - 1] |= (this.s & f) << a
    }
    d.t = this.t - e;
    d.clamp()
}

function bnpSubTo(d, f) {
    var e = 0,
        g = 0,
        b = Math.min(d.t, this.t);
    while (e < b) {
        g += this[e] - d[e];
        f[e++] = g & this.DM;
        g >>= this.DB
    }
    if (d.t < this.t) {
        g -= d.s;
        while (e < this.t) {
            g += this[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g += this.s
    } else {
        g += this.s;
        while (e < d.t) {
            g -= d[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g -= d.s
    }
    f.s = (g < 0) ? -1 : 0;
    if (g < -1) {
        f[e++] = this.DV + g
    } else {
        if (g > 0) {
            f[e++] = g
        }
    }
    f.t = e;
    f.clamp()
}

function bnpMultiplyTo(c, e) {
    var b = this.abs(),
        f = c.abs();
    var d = b.t;
    e.t = d + f.t;
    while (--d >= 0) {
        e[d] = 0
    }
    for (d = 0; d < f.t; ++d) {
        e[d + b.t] = b.am(0, f[d], e, d, 0, b.t)
    }
    e.s = 0;
    e.clamp();
    if (this.s != c.s) {
        BigInteger.ZERO.subTo(e, e)
    }
}

function bnpSquareTo(d) {
    var a = this.abs();
    var b = d.t = 2 * a.t;
    while (--b >= 0) {
        d[b] = 0
    }
    for (b = 0; b < a.t - 1; ++b) {
        var e = a.am(b, a[b], d, 2 * b, 0, 1);
        if ((d[b + a.t] += a.am(b + 1, 2 * a[b], d, 2 * b + 1, e, a.t - b - 1)) >= a.DV) {
            d[b + a.t] -= a.DV;
            d[b + a.t + 1] = 1
        }
    }
    if (d.t > 0) {
        d[d.t - 1] += a.am(b, a[b], d, 2 * b, 0, 1)
    }
    d.s = 0;
    d.clamp()
}

function bnpDivRemTo(n, h, g) {
    var w = n.abs();
    if (w.t <= 0) {
        return
    }
    var k = this.abs();
    if (k.t < w.t) {
        if (h != null) {
            h.fromInt(0)
        }
        if (g != null) {
            this.copyTo(g)
        }
        return
    }
    if (g == null) {
        g = nbi()
    }
    var d = nbi(),
        a = this.s,
        l = n.s;
    var v = this.DB - nbits(w[w.t - 1]);
    if (v > 0) {
        w.lShiftTo(v, d);
        k.lShiftTo(v, g)
    } else {
        w.copyTo(d);
        k.copyTo(g)
    }
    var p = d.t;
    var b = d[p - 1];
    if (b == 0) {
        return
    }
    var o = b * (1 << this.F1) + ((p > 1) ? d[p - 2] >> this.F2 : 0);
    var A = this.FV / o,
        z = (1 << this.F1) / o,
        x = 1 << this.F2;
    var u = g.t,
        s = u - p,
        f = (h == null) ? nbi() : h;
    d.dlShiftTo(s, f);
    if (g.compareTo(f) >= 0) {
        g[g.t++] = 1;
        g.subTo(f, g)
    }
    BigInteger.ONE.dlShiftTo(p, f);
    f.subTo(d, d);
    while (d.t < p) {
        d[d.t++] = 0
    }
    while (--s >= 0) {
        var c = (g[--u] == b) ? this.DM : Math.floor(g[u] * A + (g[u - 1] + x) * z);
        if ((g[u] += d.am(0, c, g, s, 0, p)) < c) {
            d.dlShiftTo(s, f);
            g.subTo(f, g);
            while (g[u] < --c) {
                g.subTo(f, g)
            }
        }
    }
    if (h != null) {
        g.drShiftTo(p, h);
        if (a != l) {
            BigInteger.ZERO.subTo(h, h)
        }
    }
    g.t = p;
    g.clamp();
    if (v > 0) {
        g.rShiftTo(v, g)
    }
    if (a < 0) {
        BigInteger.ZERO.subTo(g, g)
    }
}

function bnMod(b) {
    var c = nbi();
    this.abs().divRemTo(b, null, c);
    if (this.s < 0 && c.compareTo(BigInteger.ZERO) > 0) {
        b.subTo(c, c)
    }
    return c
}

function Classic(a) {
    this.m = a
}

function cConvert(a) {
    if (a.s < 0 || a.compareTo(this.m) >= 0) {
        return a.mod(this.m)
    } else {
        return a
    }
}

function cRevert(a) {
    return a
}

function cReduce(a) {
    a.divRemTo(this.m, null, a)
}

function cMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b)
}

function cSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

function bnpInvDigit() {
    if (this.t < 1) {
        return 0
    }
    var a = this[0];
    if ((a & 1) == 0) {
        return 0
    }
    var b = a & 3;
    b = (b * (2 - (a & 15) * b)) & 15;
    b = (b * (2 - (a & 255) * b)) & 255;
    b = (b * (2 - (((a & 65535) * b) & 65535))) & 65535;
    b = (b * (2 - a * b % this.DV)) % this.DV;
    return (b > 0) ? this.DV - b : -b
}

function Montgomery(a) {
    this.m = a;
    this.mp = a.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << (a.DB - 15)) - 1;
    this.mt2 = 2 * a.t
}

function montConvert(a) {
    var b = nbi();
    a.abs().dlShiftTo(this.m.t, b);
    b.divRemTo(this.m, null, b);
    if (a.s < 0 && b.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(b, b)
    }
    return b
}

function montRevert(a) {
    var b = nbi();
    a.copyTo(b);
    this.reduce(b);
    return b
}

function montReduce(a) {
    while (a.t <= this.mt2) {
        a[a.t++] = 0
    }
    for (var c = 0; c < this.m.t; ++c) {
        var b = a[c] & 32767;
        var d = (b * this.mpl + (((b * this.mph + (a[c] >> 15) * this.mpl) & this.um) << 15)) & a.DM;
        b = c + this.m.t;
        a[b] += this.m.am(0, d, a, c, 0, this.m.t);
        while (a[b] >= a.DV) {
            a[b] -= a.DV;
            a[++b] ++
        }
    }
    a.clamp();
    a.drShiftTo(this.m.t, a);
    if (a.compareTo(this.m) >= 0) {
        a.subTo(this.m, a)
    }
}

function montSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}

function montMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

function bnpIsEven() {
    return ((this.t > 0) ? (this[0] & 1) : this.s) == 0
}

function bnpExp(h, j) {
    if (h > 4294967295 || h < 1) {
        return BigInteger.ONE
    }
    var f = nbi(),
        a = nbi(),
        d = j.convert(this),
        c = nbits(h) - 1;
    d.copyTo(f);
    while (--c >= 0) {
        j.sqrTo(f, a);
        if ((h & (1 << c)) > 0) {
            j.mulTo(a, d, f)
        } else {
            var b = f;
            f = a;
            a = b
        }
    }
    return j.revert(f)
}

function bnModPowInt(b, a) {
    var c;
    if (b < 256 || a.isEven()) {
        c = new Classic(a)
    } else {
        c = new Montgomery(a)
    }
    return this.exp(b, c)
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);