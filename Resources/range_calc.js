/*
 * PokerHandRange.com Calculator
 * http://www.pokerhandrange.com/
 *
 * Copyright 2010, PokerHandRange.com
 * All rights reswerved.
 */
var mouseDown = false;
var cards = new Array("2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A");
$(document).ready(function () {
    document.body.onselectstart = function () {
        return false
    };
    document.body.onmousedown = function () {
        mouseDown = true
    };
    document.body.onmouseup = function () {
        mouseDown = false
    };
    setHandListForVs();
    setCheckedValue(document.getElementById("opponentsSelector"), vs);
    $("#slider").slider({
        range: "min",
        value: 0,
        min: 0,
        max: 100,
        step: 0.5,
        slide: function (a, b) {
            $("#slider-value").val(b.value);
            changeGrid();
            showRangeLink()
        }
    });
    $("#slider-value").val($("#slider").slider("value"));
    if (typeof (range) !== "undefined") {
        document.getElementById("slider-value").value = range;
        changeGrid();
        showRangeLink();
        $("#slider-value").val(range);
        $("#slider").slider({
            value: range
        })
    }
    if (typeof (hand) !== "undefined") {
        setupGrid(hand);
        showHandLink()
    }
});

function setHandListForVs() {
    handList = handListVs3;
    if (typeof (vs) !== "undefined") {
        if (vs == 1) {
            handList = handListVs1
        } else {
            if (vs == 2) {
                handList = handListVs2
            }
        }
    }
    for (key in handList) {
        pocketCards[handList[key]] = false
    }
}
function onPercentChanged() {
    var a = document.getElementById("slider-value").value;
    a = a.replace(/[^0-9.]/g, "");
    document.getElementById("slider-value").value = a;
    $("#slider").slider({
        value: a
    });
    changeGrid();
    showRangeLink()
}
function selectPocket(a) {
    if (mouseDown == true) {
        flipColor(a)
    }
}
function flipColor(a) {
    setSelected(a, !isSelected(a));
    showHandLink();
    showSelectedCards()
}
function changePercent() {
    var a = 0;
    for (key in handList) {
        if (isSelected(handList[key])) {
            if (isPair(handList[key])) {
                a = a + 6
            } else {
                if (isSuited(handList[key])) {
                    a = a + 4
                } else {
                    a = a + 12
                }
            }
        }
    }
    var b = a / 1326;
    showRangeLink();
    showSelectedCards()
}
function isSuited(b) {
    var a = false;
    if (b.length == 3) {
        var c = b.charAt(2);
        if (c == "s") {
            a = true
        }
    }
    return a
}
function isPair(a) {
    var c = a.charAt(0);
    var b = a.charAt(1);
    if (c == b) {
        return true
    } else {
        return false
    }
}
function isSelected(a) {
    return pocketCards[a]
}
function setSelected(a, c) {
    var b = isSelected(c);
    if (b != c) {
        pocketCards[a] = c;
        if (c) {
            document.getElementById("cid_" + a).style.backgroundColor = "#7aba65"
        } else {
            document.getElementById("cid_" + a).style.backgroundColor = "#d9e0d6"
        }
    }
}
function showSelectedCards() {
    var g = "";
    var d = -1;
    var f = 13;
    for (var e = cards.length - 1; e >= 0; e--) {
        var b = cards[e] + cards[e];
        if (isSelected(b)) {
            d = e;
            if (f >= 13) {
                f = e
            }
        }
        if (!isSelected(b) || (d == 0)) {
            if (d >= 0) {
                if (d == f) {
                    g = addCards(g, cards[d] + cards[d])
                } else {
                    if (f >= 12) {
                        g = addCards(g, cards[d] + cards[d] + "+")
                    } else {
                        g = addCards(g, cards[d] + cards[d] + "-" + cards[f] + cards[f])
                    }
                }
            }
            d = -1;
            f = 13
        }
    }
    var a = new Array("s", "o");
    for (key in a) {
        for (var e = cards.length - 1; e >= 0; e--) {
            d = -1;
            f = e;
            for (var c = e - 1; c >= 0; c--) {
                var b = cards[e] + cards[c] + a[key];
                if (isSelected(b)) {
                    d = c;
                    if (f >= e) {
                        f = c
                    }
                }
                if (!isSelected(b) || (d == 0)) {
                    if (d >= 0) {
                        if (d == f) {
                            g = addCards(g, cards[e] + cards[d] + a[key])
                        } else {
                            if (f >= e - 1) {
                                g = addCards(g, cards[e] + cards[d] + a[key] + "+")
                            } else {
                                g = addCards(g, cards[e] + cards[d] + a[key] + "-" + cards[e] + cards[f] + a[key])
                            }
                        }
                    }
                    d = -1;
                    f = e
                }
            }
        }
    }
    document.getElementById("hands-textarea").innerHTML = g
}
function addCards(b, c) {
    var a = b;
    if (a != "") {
        a = a + ", "
    }
    a = a + c;
    return a
}
function changeGrid() {
    var c = document.getElementById("slider-value").value;
    if (c > 100) {
        document.getElementById("slider-value").value = 100
    }
    for (key in handList) {
        setSelected(handList[key], false)
    }
    var a = c * 1326 / 100;
    var b = 0;
    for (key in handList) {
        if (isPair(handList[key])) {
            b = b + 6
        } else {
            if (isSuited(handList[key])) {
                b = b + 4
            } else {
                b = b + 12
            }
        }
        if (b > a) {
            setSelected(handList[key], false)
        } else {
            setSelected(handList[key], true)
        }
    }
    showSelectedCards()
}
function showRangeLink() {
    var a = "http://" + location.host + "/range/" + document.getElementById("slider-value").value;
    if (vs != 3) {
        a = a + "?vs=" + vs
    }
    document.getElementById("link_range").value = a
}
function showHandLink() {
    var c = "";
    for (var e = 0; e < cards.length; e++) {
        for (var b = 0; b < cards.length; b++) {
            var a;
            if (e > b) {
                a = cards[e] + cards[b] + "s"
            } else {
                if (e < b) {
                    a = cards[b] + cards[e] + "o"
                } else {
                    a = cards[e] + cards[b]
                }
            }
            if (isSelected(a)) {
                c += "1"
            } else {
                c += "0"
            }
        }
    }
    var f = new BigInteger(c, 2).toString(36);
    var d = "http://" + location.host + "/hand/" + f;
    document.getElementById("link_range").value = d
}
function setupGrid(b) {
    var g = new BigInteger(b, 36);
    var d = leftPadZeros(g.toString(2), 169);
    for (var f = 0; f < cards.length; f++) {
        for (var c = 0; c < cards.length; c++) {
            var a;
            if (f > c) {
                a = cards[f] + cards[c] + "s"
            } else {
                if (f < c) {
                    a = cards[c] + cards[f] + "o"
                } else {
                    a = cards[f] + cards[c]
                }
            }
            if (d[f * 13 + c] == "1") {
                setSelected(a, true)
            } else {
                setSelected(a, false)
            }
        }
    }
    var h = g.toString(36);
    var e = "http://" + location.host + "/hand/" + h;
    document.getElementById("link_range").value = e;
    document.getElementById("link_range").select();
    changePercent()
}
function leftPadZeros(c, b) {
    var a = "" + c;
    while (a.length < b) {
        a = "0" + a
    }
    return a
}
function vsChanged(a) {
    vs = getCheckedValue(a);
    setHandListForVs();
    changeGrid();
    showRangeLink()
}
function getCheckedValue(b) {
    if (!b) {
        return ""
    }
    var c = b.length;
    if (c == undefined) {
        if (b.checked) {
            return b.value
        } else {
            return ""
        }
    }
    for (var a = 0; a < c; a++) {
        if (b[a].checked) {
            return b[a].value
        }
    }
    return ""
}
function setCheckedValue(b, d) {
    if (!b) {
        return
    }
    var c = b.length;
    if (c == undefined) {
        b.checked = (b.value == d.toString());
        return
    }
    for (var a = 0; a < c; a++) {
        b[a].checked = false;
        if (b[a].value == d.toString()) {
            b[a].checked = true
        }
    }
};