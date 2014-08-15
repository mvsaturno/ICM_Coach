/*
VALOR DAS CARTAS
//Paus:
0 - A
1 - 2
2 - 3
3 - 4
4 - 5
5 - 6
6 - 7
7 - 8
8 - 9
9 - 10
10 - J
11 - Q
12 - K

//Ouros:
13 - A
14 - 2
15 - 3
16 - 4
17 - 5
18 - 6
19 - 7
20 - 8
21 - 9
22 - 10
23 - J
24 - Q
25 - K

//Espadas:
26 - A
27 - 2
28 - 3
29 - 4
30 - 5
31 - 6
32 - 7
33 - 8
34 - 9
35 - 10
36 - J
37 - Q
38 - K

//Copas:
39 - A
40 - 2
41 - 3
42 - 4
43 - 5
44 - 6
45 - 7
46 - 8
47 - 9
48 - 10
49 - J
50 - Q
51 - K

*/

//Um número randômico, inteiro entre 0 e 52:
function getRandomInt(min, max, exclude) {
    x = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!isNaN(exclude)) {
        while (x === exclude){
            x = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        while (isNaN(x) === true){
          x = Math.floor(Math.random() * (max - min + 1)) + min;   
        }
    }
    return x;
}

function sortCards(){
    c1 = getRandomInt(0,51);
    c2 = getRandomInt(0,51, c1);
    cardsList = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc", "Kc", "Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "Jd", "Qd", "Kd", "As", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "Js", "Qs", "Ks", "Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh", "Qh", "Kh"];
    x1 = cardsList[c1];
    x2 = cardsList[c2];
    cards = [x1, x2];
    return cards;
}

//Test functions:
function testDuplicated(it){
    errors = 0;

    for (var x = 0; x < it; x++) {
        y = sortCards();
        console.log(y);
        if (y[1] === y[2]){
            errors++;
            console.log(errors);
        }
    }
    return errors;
}

//Test Amount of dealt cards:
function testAmmount(ammount){
    results = {};
    var cardValues = [
    {"value": "A", "count": 0},
    {"value": "2", "count": 0},
    {"value": "3", "count": 0},
    {"value": "4", "count": 0},
    {"value": "5", "count": 0},
    {"value": "6", "count": 0},
    {"value": "7", "count": 0},
    {"value": "8", "count": 0},
    {"value": "9", "count": 0},
    {"value": "10", "count": 0},
    {"value": "J", "count": 0},
    {"value": "Q", "count": 0},
    {"value": "K", "count": 0},
    ];

    var cardSuits = [
    {"suit": "h", "count": 0},
    {"suit": "c", "count": 0},
    {"suit": "s", "count": 0},
    {"suit": "d", "count": 0},
    ];

    results.cardValues = cardValues;
    results.cardSuits = cardSuits;

    var deck = [];

    for (var i = 0; i < cardValues.length; i++) {
        for (var a = 0; a < cardSuits.length; a++) {
            deck.push({
                "card": cardValues[i].value+cardSuits[a].suit, 
                "count": 0
            });
        }
    }

    for (var b = 0; b < ammount; b++) {
        y = sortCards();
        for (var z = 0; z < y.length; z++) {
            for (var i = 0; i < deck.length; i++) {
                   if (deck[i].card === y[z]){
                        deck[i].count++;
                    }
               }
        }
    }

    var countDeck = [];

    for (var i = 0; i < deck.length; i++) {
        if (deck[i].count !== 0) {
            countDeck.push(deck[i]);
        }
    };

    resultados = "";
    for (var i = 0; i < countDeck.length; i++) {
        resultados += "("+countDeck[i].card.toString()+" x"+countDeck[i].count.toString()+"); ";
    };
    return resultados;
}