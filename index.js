var http = require('http');

var postHTML = 
  '<html><head><title>Post Example</title></head>' +
  '<body>' +
  '<form method="post" action="/play/rock">' +
  '<input type="submit" value="Rock"><br>' +
  '</form>' +
  '<form method="post" action="/play/paper">' +
  '<input type="submit" value="Paper"><br>' +
  '</form>' +
  '<form method="post" action="/play/scissors">' +
  '<input type="submit" value="Scissors"><br>' +
  '</form>' +
  '<form method="post" action="/play/lizard">' +
  '<input type="submit" value="Lizard"><br>' +
  '</form>' +
  '<form method="post" action="/play/spock">' +
  '<input type="submit" value="Spock"><br>' +
  '</form>' +
  '</body></html>';

var record = {outcome: "tie", wins: 0, losses: 0, ties: 0};

http.createServer(function (req, res) {
	var user_input = false;
	var server_choice = Math.floor(Math.random() * 5);
	var choice_name;
	switch (server_choice) {
		case 0:
			choice_name = "Rock";
			break;
		case 1:
			choice_name = "Paper";
			break;
		case 2:
			choice_name = "Scissors";
			break;
		case 3:
			choice_name = "Lizard";
			break;
		case 4:
			choice_name = "Spock";
			break;
	}

	if (req.url === "/play/rock") {
		if (server_choice === 2 || server_choice === 3) {
			record.wins++;
			record.outcome = "win";
		} else if (server_choice === 1 || server_choice === 4) {
			record.losses++;
			record.outcome = "lose";
		} else {
			record.ties++;
			record.outcome = "tie";
		}
		user_input = true;
	}
	if (req.url === "/play/paper") {
		if (server_choice === 0 || server_choice === 4) {
			record.wins++;
			record.outcome = "win";
		} else if (server_choice === 2 || server_choice === 3) {
			record.losses++;
			record.outcome = "lose";
		} else {
			record.ties++;
			record.outcome = "tie";
		}
		user_input = true;
	}
	if (req.url === "/play/scissors") {
		if (server_choice === 1 || server_choice === 3) {
			record.wins++;
			record.outcome = "win";
		} else if (server_choice === 0 || server_choice === 4) {
			record.losses++;
			record.outcome = "lose";
		} else {
			record.ties++;
			record.outcome = "tie";
		}
		user_input = true;
	}
	if (req.url === "/play/lizard") {
		if (server_choice === 1 || server_choice === 4) {
			record.wins++;
			record.outcome = "win";
		} else if (server_choice === 0 || server_choice === 2) {
			record.losses++;
			record.outcome = "lose";
		} else {
			record.ties++;
			record.outcome = "tie";
		}
		user_input = true;
	}
	if (req.url === "/play/spock") {
		if (server_choice === 0 || server_choice === 2) {
			record.wins++;
			record.outcome = "win";
		} else if (server_choice === 1 || server_choice === 3) {
			record.losses++;
			record.outcome = "lose";
		} else {
			record.ties++;
			record.outcome = "tie";
		}
		user_input = true;
	}

	if (user_input) {
		console.log("HTTP POST: " + req.url);
		console.log("Server plays: " + choice_name);
		console.log(record);
		console.log("\n");
	}

	var body = "";
  		req.on('data', function (chunk) {
    	body += chunk;
  	});

	req.on('end', function () {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(postHTML);
	});

}).listen(3000);

console.log("Server running on port 3000");