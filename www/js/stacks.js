function generatePlay(num_players) {
	var big_blind;

	//definir nível das blinds (de 0 a 12):
	var blinds_values = [
    {"value": "50"},
    {"value": "100"},
    {"value": "150"},
    {"value": "200"},
    {"value": "300"},
    {"value": "400"},
    {"value": "600"},
    {"value": "800"},
    {"value": "1000"},
    {"value": "1200"},
    {"value": "1600"},
    {"value": "2000"}
    ];

    big_blind = blinds_values[getRandomInt(0,11)].value;
    console.log("Big Blind: " + big_blind);
    // //usage:
    // blinds_values[blind_level].value; // Big Blind
    // blinds_values[blind_level].value/2; //Small Blind

    num_players = num_players || getRandomInt(3,9);
    console.log("num_players: " + num_players);
    players = [];
    for (var i = 0; i < num_players; i++) {
    	multiplier = Math.random() * (40 - 3 + 1) + 3;
    	console.log("multiplier: " + multiplier);
    	stack = multiplier * big_blind;
    	players.push({stack : stack.toFixed(2)});
    }

    return players;
}