var friends = require("../data/friends.js");

module.exports = function (app) {
	app.get("/api/friends", function (req, res) {
		res.json(friends);
	});
	app.post("/api/friends", function (req, res) {
		friends.push(req.body);
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: Infinity
		};
		var userData = req.body;
		var totalDifference = 0;
		for (var i = 0; i < (friends.length-1); i++) {
			totalDifference = 0;
			for (var j = 0; j < friends[i].scores[j]; j++) {
				totalDifference += Math.abs(parseInt(userData.scores[j]) - parseInt(friends[i].scores[j]));
				if (totalDifference <= bestMatch.friendDifference) {
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}
		res.json(bestMatch);
	});
};