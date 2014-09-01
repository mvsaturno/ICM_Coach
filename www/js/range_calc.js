var handList = new Array("AA","KK","QQ","JJ","TT","99","88","AKs","AQs","AKo","77","AJs","ATs","AQo","KQs","AJo","KJs","A9s","66","KTs","ATo","A8s","KQo","A7s","QJs","KJo","K9s","A9o","55","QTs","A6s","A5s","A8o","A4s","KTo","K8s","Q9s","QJo","A7o","A3s","JTs","K7s","A2s","44","K9o","QTo","K6s","A5o","A6o","Q8s","K5s","J9s","A4o","K8o","Q9o","K4s","A3o","JTo","Q7s","33","K7o","J8s","T9s","A2o","K3s","Q6s","K2s","K6o","Q8o","Q5s","J9o","K5o","J7s","T8s","Q4s","K4o","Q3s","22","98s","T9o","Q7o","T7s","J6s","J8o","K3o","Q2s","Q6o","J5s","K2o","Q5o","T8o","J7o","J4s","97s","T6s","J3s","Q4o","87s","J2s","T5s","96s","98o","J6o","Q3o","T7o","T4s","Q2o","J5o","86s","T3s","95s","97o","T6o","T2s","J4o","76s","85s","J3o","94s","87o","75s","J2o","T5o","93s","96o","92s","84s","65s","T4o","86o","T3o","74s","95o","83s","64s","76o","54s","T2o","82s","73s","85o","94o","53s","63s","75o","93o","72s","65o","84o","43s","92o","62s","52s","74o","42s","83o","54o","64o","32s","82o","73o","53o","63o","43o","72o","52o","62o","42o","32o");
var pocketCards = new Object();

function changeGrid(cards) {

    for (key in handList) {
        setSelected(handList[key], false)
    }
    var a = cards * 1326 / 100;
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

// function isSuitedHand(b) {
//     var a = false;
//     if (b.length == 3) {
//         var c = b.charAt(2);
//         if (c == "s") {
//             a = true
//         }
//     }
//     return a
// }

function isSuited(b){
    var a = false;
    if (b[0].indexOf("10") >= 0 && b[1].indexOf("10") >= 0 ) {
        a = false;
    } else if (b[0].indexOf("10") >= 0 && b[1].indexOf("10") == -1){
        if (b[0][2] === b[1][1]) {
            a = true;
        } else {
            a = false;
        }
    } else if (b[1].indexOf("10") >= 0 && b[0].indexOf("10") == -1){
        if (b[1][2] === b[0][1]) {
            a = true;
        } else {
            a = false;
        }
    } else {
        if (b[1][1] === b[0][1]){
            a = true;
        }
    }

    return a;
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
            // document.getElementById("cid_" + a).style.backgroundColor = "#7aba65"
        } else {
            // document.getElementById("cid_" + a).style.backgroundColor = "#d9e0d6"
        }
    }
}

function showSelectedCards() {
    var g = "";
    var d = -1;
    var f = 13;
    var cards = new Array("2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A");
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
    // document.getElementById("hands-textarea").innerHTML = g;
    return g;
}

function addCards(b, c) {
    var a = b;
    if (a != "") {
        a = a + ", "
    }
    a = a + c;
    return a
}