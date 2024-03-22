function createPlayer(number, firstname, position, startingDate, endingDate, status,
						lawnGoals, lawnMatches, lawnConcededGoals, lawnMatchesGoalkeeper,
						indoorGoals, indoorMatches, indoorConcededGoals, indoorMatchesGoalkeeper) {

	return {"number": number, "firstname": firstname, "position": position, "startingDate": startingDate, "endingDate": endingDate, "status": status,
			"lawn": {"scorer": {"goals": lawnGoals, "matches": lawnMatches},
					"goalkeeper": {/*conceded*/"goals": lawnConcededGoals, "matches"/*as goalkeeper*/: lawnMatchesGoalkeeper}},
			"indoor": {"scorer": {"goals": indoorGoals, "matches": indoorMatches},
					"goalkeeper": {/*conceded*/"goals": indoorConcededGoals, "matches"/*as goalkeeper*/: indoorMatchesGoalkeeper}}};
}


function createMatch(teamA, teamB, scoreA, scoreB, certainty) {
	return {"teamA": teamA, "teamB": teamB, "scoreA": scoreA, "scoreB": scoreB, "certainty": certainty};
}


function createPlayerRankings(id, category, type, date) {
	return {"id": id, "category": category, "type": type, "date": date};
}


function createTournament(id, category, type, date, place, city, groupsMatches, rankingMatches) {
	groupsMatches = groupsMatches.map((groupMatches) => {
		return {"matches": groupMatches};
	});

	return {"id": id, "category": category, "type": type, "date": date, "place": place, "city": city, "groups": groupsMatches, "rankingMatches": rankingMatches};
}


// Start Create Ranking
function inverseLetter(letter) {
	return letter === 'A' ? 'B' : 'A';
}


function getTeamRecap(letter, match) {
	const teamRecap = {
		name: match[`team${letter}`],
		matches: 1,
		victories: match[`score${letter}`] > match[`score${inverseLetter(letter)}`] ? 1 : 0,
		draws: match[`score${letter}`] === match[`score${inverseLetter(letter)}`] ? 1 : 0,
		defeats: match[`score${letter}`] < match[`score${inverseLetter(letter)}`] ? 1 : 0,
		goalsFor: match[`score${letter}`],
		goalsAgainst: match[`score${inverseLetter(letter)}`],
	}

	teamRecap.points = teamRecap.victories * 3 + teamRecap.draws;
  	teamRecap.goalDifference = teamRecap.goalsFor - teamRecap.goalsAgainst;

	return teamRecap;
}


function calculateRanking(matches) {
	let recaps = [];
	matches.forEach((match) => {
		recaps.push(getTeamRecap('A', match));
		recaps.push(getTeamRecap('B', match));
	});

	let teams = recaps.reduce((accumulator, match) => {
		let recap = accumulator.find((recap) => recap.name === match.name);

		if (!recap) {
			accumulator.push(match);
		}
		else {
			recap.points += match.points;
			recap.matches += match.matches;
			recap.victories += match.victories;
			recap.draws += match.draws;
			recap.defeats += match.defeats;
			recap.goalsFor += match.goalsFor;
			recap.goalsAgainst += match.goalsAgainst;
  			recap.goalDifference = recap.goalsFor - recap.goalsAgainst;
		}

		return accumulator;
	}, []);

	teams.sort((a, b) => {
		return a.points < b.points ? 1 : a.points > b.points ? -1 :
			(a.goalsFor - a.goalsAgainst) < (b.goalsFor - b.goalsAgainst) ? 1 :
			(a.goalsFor - a.goalsAgainst) > (b.goalsFor - b.goalsAgainst) ? -1 :
			a.goalsFor < b.goalsFor ? 1 : a.goalsFor > b.goalsFor ? -1 : 0;
	});

	return teams;
}
// End Create Ranking


types = ["lawn", "indoor"];
categories = ["scorer", "goalkeeper"];

// Start Tournaments
const tournament1Matches = [
    createMatch('FC Ste-Foy', 'AS Écully A', 0, 7, 'certain'),
    createMatch('ES Chaponost A', 'AS Écully B', 7, 0, 'certain'),

    createMatch('FC Ste-Foy', 'ES Chaponost B', 0, 9, 'certain'),
    createMatch('AS Écully A', 'AS Écully B', 8, 0, 'certain'),

    createMatch('ES Chaponost A', 'ES Chaponost B', 5, 1, 'certain'),
    createMatch('FC Ste-Foy', 'AS Écully B', 3, 0, 'certain'),

    createMatch('ES Chaponost A', 'AS Écully A', 4, 0, 'certain'),
    createMatch('ES Chaponost B', 'AS Écully B', 8, 0, 'certain'),

    createMatch('FC Ste-Foy', 'ES Chaponost A', 0, 7, 'certain'),
    createMatch('ES Chaponost B', 'AS Écully A', 3, 1, 'certain')
];

const tournament2aMatches = [
    createMatch('ES Chaponost A', 'FC Pays Viennois', 10, 0, 'certain'),
    createMatch('AS Écully B', 'FC Ste-Foy', 1, 7, 'certain'),

    createMatch('ES Chaponost A', 'AS Écully B', 13, 2, 'certain'),
    createMatch('FC Pays Viennois', 'FC Ste-Foy', 1, 7, 'certain'),

    createMatch('ES Chaponost A', 'FC Ste-Foy', 5, 1, 'certain'),
    createMatch('AS Écully B', 'FC Pays Viennois', 0, 4, 'certain')
];

const tournament2bMatches = [
    createMatch('ES Chaponost B', 'FC Villefranche', 11, 0, 'certain'),
    createMatch('AS Écully A', 'ES Chaponost C', 2, 2, 'certain'),

    createMatch('ES Chaponost B', 'AS Écully A', 4, 4, 'certain'),
    createMatch('ES Chaponost C', 'FC Villefranche', 8, 0, 'certain'),

    createMatch('ES Chaponost B', 'ES Chaponost C', 4, 0, 'certain'),
    createMatch('AS Écully A', 'FC Villefranche', 4, 3, 'certain')
];

const tournament2RankingMatches = [
    createMatch('ES Chaponost A', 'ES Chaponost B', 2, 0, 'uncertain'),
    createMatch('FC Ste-Foy', 'AS Écully B', 0, 3, 'certain'),
    createMatch('FC Pays Viennois', 'ES Chaponost C', 0, 4, 'uncertain'),
    createMatch('AS Écully B', 'FC Villefranche', 0, 1, 'uncertain')
];

const tournament3aMatches = [
    createMatch('AS Écully A', 'ES Chaponost A', 0, 4, 'uncertain'),
    createMatch('ES Chaponost B', 'FC Villefranche', 5, 0, 'uncertain'),

    createMatch('AS Écully A', 'ES Chaponost B', 0, 3, 'uncertain'),
    createMatch('ES Chaponost A', 'FC Villefranche', 7, 0, 'uncertain'),

    createMatch('AS Écully A', 'FC Villefranche', 0, 1, 'uncertain'),
    createMatch('ES Chaponost A', 'ES Chaponost B', 3, 0, 'uncertain')
];

const tournament3bMatches = [
    createMatch('AS Écully B', 'ES Chaponost C', 0, 5, 'uncertain'),
    createMatch('FC Ste-Foy', 'Saône Mont d\'Or FC', 2, 2, 'certain'),

    createMatch('AS Écully B', 'Saône Mont d\'Or FC', 0, 3, 'uncertain'),
    createMatch('ES Chaponost C', 'FC Ste-Foy', 0, 2, 'certain'),

    createMatch('AS Écully B', 'FC Ste-Foy', 1, 7, 'certain'),
    createMatch('ES Chaponost C', 'Saône Mont d\'Or FC', 2, 0, 'uncertain')
];

const tournament4aMatches = [
	createMatch('SC Ouest Lyonnais C', 'FC Sud-Ouest 69', 4, 0, 'uncertain'),
    createMatch('FC Ste-Foy', 'CO St-Fons', 0, 1, 'certain'),
    createMatch('FC Villefranche', 'Saône Mont d\'Or FC A', 0, 2, 'uncertain'),

    createMatch('SC Ouest Lyonnais C', 'FC Ste-Foy', 0, 2, 'certain'),
    createMatch('Saône Mont d\'Or FC A', 'CO St-Fons', 0, 3, 'uncertain'),
    createMatch('FC Villefranche', 'FC Sud-Ouest 69', 0, 1, 'uncertain'),

    createMatch('SC Ouest Lyonnais C', 'Saône Mont d\'Or FC A', 3, 0, 'uncertain'),
    createMatch('FC Ste-Foy', 'FC Sud-Ouest 69', 6, 0, 'certain'),
    createMatch('FC Villefranche', 'CO St-Fons', 2, 2, 'uncertain'),

    createMatch('SC Ouest Lyonnais C', 'CO St-Fons', 2, 1, 'certain'),
    createMatch('FC Ste-Foy', 'FC Villefranche', 2, 2, 'certain'),
    createMatch('Saône Mont d\'Or FC A', 'FC Sud-Ouest 69', 1, 1, 'uncertain'),

    createMatch('SC Ouest Lyonnais C', 'FC Villefranche', 6, 0, 'uncertain'),
    createMatch('FC Ste-Foy', 'Saône Mont d\'Or FC A', 1, 0, 'certain'),
    createMatch('CO St-Fons', 'FC Sud-Ouest 69', 4, 0, 'uncertain')
];

const tournament4bMatches = [
    createMatch('SC Ouest Lyonnais A', 'SC Bron Terraillon', 4, 0, 'uncertain'),
    createMatch('SC Ouest Lyonnais B', 'Saône Mont d\'Or FC B', 9, 0, 'uncertain'),
    createMatch('SC Ouest Lyonnais D', 'AS Écully A', 0, 3, 'uncertain'),
    createMatch('AS Écully B', 'ES Genas Azieu', 0, 1, 'uncertain'),

    createMatch('SC Ouest Lyonnais A', 'Saône Mont d\'Or FC B', 11, 0, 'uncertain'),
    createMatch('SC Ouest Lyonnais B', 'AS Écully B', 8, 0, 'uncertain'),
    createMatch('SC Ouest Lyonnais D', 'SC Bron Terraillon', 0, 1, 'uncertain'),
    createMatch('AS Écully A', 'ES Genas Azieu', 4, 0, 'uncertain'),

    createMatch('SC Ouest Lyonnais A', 'SC Ouest Lyonnais D', 6, 0, 'uncertain'),
    createMatch('SC Ouest Lyonnais B', 'AS Écully A', 1, 0, 'uncertain'),
    createMatch('AS Écully B', 'Saône Mont d\'Or FC B', 1, 0, 'uncertain'),
    createMatch('SC Bron Terraillon', 'ES Genas Azieu', 3, 0, 'uncertain'),

    createMatch('SC Ouest Lyonnais A', 'ES Genas Azieu', 8, 0, 'uncertain'),
    createMatch('SC Ouest Lyonnais B', 'SC Bron Terraillon', 3, 0, 'uncertain'),
    createMatch('SC Ouest Lyonnais D', 'Saône Mont d\'Or FC B', 4, 0, 'uncertain'),
    createMatch('AS Écully A', 'AS Écully B', 6, 0, 'uncertain'),

    createMatch('SC Ouest Lyonnais A', 'SC Ouest Lyonnais B', 1, 0, 'uncertain'),
    createMatch('SC Ouest Lyonnais D', 'ES Genas Azieu', 1, 0, 'uncertain'),
    createMatch('AS Écully A', 'Saône Mont d\'Or FC B', 8, 0, 'uncertain'),
    createMatch('AS Écully B', 'SC Bron Terraillon', 0, 4, 'uncertain'),

    createMatch('SC Ouest Lyonnais A', 'AS Écully A', 3, 0, 'uncertain'),
    createMatch('SC Ouest Lyonnais B', 'ES Genas Azieu', 6, 0, 'uncertain'),
    createMatch('SC Ouest Lyonnais D', 'AS Écully B', 3, 0, 'uncertain'),
    createMatch('Saône Mont d\'Or FC B', 'SC Bron Terraillon', 0, 6, 'uncertain'),

    createMatch('SC Ouest Lyonnais A', 'AS Écully B', 9, 0, 'uncertain'),
    createMatch('SC Ouest Lyonnais B', 'SC Ouest Lyonnais D', 4, 0, 'uncertain'),
    createMatch('AS Écully A', 'SC Bron Terraillon', 1, 0, 'uncertain'),
    createMatch('Saône Mont d\'Or FC B', 'ES Genas Azieu', 0, 3, 'uncertain')
];

const tournament5Matches = [
	createMatch('FC Villefranche A', 'SC Bron Terraillon', 3, 1, 'certain'),
    createMatch('FC Villefranche B', 'AS Écully B', 0, 2, 'certain'),
    createMatch('AS Écully A', 'FC Sud-Ouest 69', 4, 0, 'uncertain'),

    createMatch('FC Villefranche A', 'FC Ste-Foy', 2, 0, 'certain'),

    createMatch('AS Écully A', 'SC Bron Terraillon', 3, 1, 'uncertain'),
    createMatch('FC Villefranche B', 'FC Sud-Ouest 69', 0, 6, 'certain'),
    createMatch('AS Écully B', 'FC Ste-Foy', 1, 3, 'certain'),

    createMatch('FC Villefranche A', 'FC Sud-Ouest 69', 3, 0, 'uncertain'),
    createMatch('FC Villefranche B', 'FC Ste-Foy', 1, 7, 'certain'),
    createMatch('AS Écully A', 'AS Écully B', 5, 0, 'certain'),

    createMatch('SC Bron Terraillon', 'FC Sud-Ouest 69', 2, 2, 'certain'),

    createMatch('AS Écully A', 'FC Ste-Foy', 1, 0, 'certain'),
    createMatch('FC Villefranche A', 'AS Écully B', 8, 0, 'uncertain'),
    createMatch('FC Villefranche B', 'SC Bron Terraillon', 0, 7, 'uncertain'),

    createMatch('FC Villefranche A', 'AS Écully A', 0, 4, 'uncertain'),
    createMatch('FC Sud-Ouest 69', 'FC Ste-Foy', 3, 0, 'certain'),
    createMatch('AS Écully B', 'SC Bron Terraillon', 0, 9, 'certain'),

    createMatch('FC Villefranche B', 'AS Écully A', 0, 11, 'certain'),

    createMatch('FC Villefranche A', 'FC Villefranche B', 8, 0, 'certain'),
    createMatch('SC Bron Terraillon', 'FC Ste-Foy', 3, 1, 'certain'),
    createMatch('AS Écully B', 'FC Sud-Ouest 69', 1, 3, 'certain')
];

const friendly1Matches = [
    createMatch('FC Ste-Foy', 'CO St-Fons', 1, 5, 'certain'),
    createMatch('FC Ste-Foy', 'CO St-Fons', 1, 3, 'certain'),
    createMatch('FC Ste-Foy', 'CO St-Fons', 3, 0, 'certain'),
    createMatch('FC Ste-Foy', 'CO St-Fons', 0, 0, 'certain')
];


let tournament1 = createTournament("2023_02_04", "plateau", "sur gazon", "4 février 2023", "stade du Plan du Loup", "Sainte-Foy-lès-Lyon", [tournament1Matches], undefined);
let tournament2 = createTournament("2023_04_29", "plateau", "sur gazon", "29 avril 2023", "stade Robert Guivier", "Chaponost", [tournament2aMatches, tournament2bMatches], tournament2RankingMatches);
let tournament3 = createTournament("2023_10_21", "plateau", "sur gazon", "21 octobre 2023", "stade Camille Ninel", "Écully", [tournament3aMatches, tournament3bMatches], undefined);
let tournament4 = createTournament("2023_12_02", "plateau", "en salle", "2 décembre 2023", "gymnase Alain Mimoun", "Brindas", [tournament4aMatches, tournament4bMatches], undefined);
let tournament5 = createTournament("2024_01_20", "plateau", "en salle", "20 janvier 2024", "gymnase Montfray Sports", "Villefranche-sur-Saône", [tournament5Matches], undefined);
let friendly1 = createTournament("2024_02_18", "matchs amicaux", "sur gazon", "18 février 2024", "stade du Plan du Loup", "Sainte-Foy-lès-Lyon", [friendly1Matches], undefined);

let events = [tournament1, tournament2, tournament3, tournament4, tournament5, friendly1];

i = 0;
events.forEach((event) => {
	i += 1;

	document.getElementById("resultats_plateaux").innerHTML += `
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
		        <div class="card">
		            <img src="assets/images/${event.category}_${event.id}_ensemble.jpg" class="card-img-top" alt="image d'ensemble du ${event.category} du ${event.date}">

		            <div class="card-body">
		                <h5 class="card-title"><span class="text-capitalize">${event.category}</span> du ${event.date}</h5>
		                <p class="card-text">Type : ${event.type}<br/>Date : ${event.date}<br/>Lieu : ${event.place} (${event.city})</p>
		                <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${event.id}_event_Modal">Résultats</a>
		            </div>
		        </div>
		    </div>

            <!-- Modal -->
            <div class="modal fade text-dark" id="${event.id}_event_Modal" tabindex="-1" aria-labelledby="${event.id}_event_ModalLabel" aria-hidden="true">
              	<div class="modal-dialog">
                	<div class="modal-content">
                  		<div class="modal-header">
                    		<h1 class="modal-title" id="${event.id}_event_ModalLabel"><span class="text-capitalize">${event.category}</span> ${event.type} du ${event.date} à ${event.city}</h3>
                    		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  		</div>
                  		<div id="${event.id}_event_content" class="modal-body">

                  			<div id="${event.id}_event_teams">

                  			</div>

                  			<div id="${event.id}_event_groups">

                  			</div>

                  		</div>
                	</div>
              	</div>
            </div>`;

    j = 0;
    event.groups.forEach((eventGroup) => {
    	j += 1;

		eventGroup.ranking = calculateRanking(eventGroup.matches);

		document.getElementById(`${event.id}_event_content`).innerHTML += `
				<h2 class="mt-4 mb-3">Groupe ${j}</h2>

				<h3 class="mt-4 mb-3">Équipes</h3>
				<div id="${event.id}_event_teams_${j}">

				</div>

				<h3 class="mt-4 mb-3">Matchs</h3>
	  			<table class="text-center w-100">
	  				<thead>		
	                    <tr>
	                      	<th class="p-1 border border-dark">Équipe A</th>
	                      	<th class="p-1 border border-dark">Score</th>
	                      	<th class="p-1 border border-dark">Équipe B</th>
	                    </tr>
	  				</thead>

	  				<tbody id="${event.id}_event_matches_${j}">
	  					
	  				</tbody>
	  			</table>

				<h3 class="mt-4 mb-3">Classement</h3>
	  			<table class="text-center w-100">
	  				<thead>		
	                    <tr>
	                      	<th class="p-1 border border-dark">Rang</th>
	                      	<th class="p-1 border border-dark">Équipe</th>
	                      	<th class="p-1 border border-dark">Pts</th>
	                      	<th class="p-1 border border-dark">J</th>
	                      	<th class="p-1 border border-dark">V</th>
	                      	<th class="p-1 border border-dark">N</th>
	                  	    <th class="p-1 border border-dark">D</th>
	                  	    <th class="p-1 border border-dark">Bp</th>
	                  	    <th class="p-1 border border-dark">Bc</th>
	                  	    <th class="p-1 border border-dark">Diff</th>
	                    </tr>
	  				</thead>

	  				<tbody id="${event.id}_event_ranking_${j}">
	  					
	  				</tbody>
	  			</table>`;

  		eventGroup.matches.forEach((match) => {
  			if (match.certainty !== 'certain') {
  				match.certaintyStyle = 'italic';
  				match.certaintyText = '?';
  			} else {
  				match.certaintyStyle = 'normal';
  				match.certaintyText = '';
  			}

  			document.getElementById(`${event.id}_event_matches_${j}`).innerHTML += `
                    <tr>
                      	<td class="p-1 border border-dark">${match.teamA}</td>
                      	<td class="p-1 border border-dark fst-${match.certaintyStyle}">${match.scoreA} - ${match.scoreB} ${match.certaintyText}</td>
                      	<td class="p-1 border border-dark">${match.teamB}</td>
                    </tr>`;
        });

	  	teamRank = 0;
  		eventGroup.ranking.forEach((team) => {
  			teamRank += 1;

  			team.rank = teamRank

  			document.getElementById(`${event.id}_event_teams_${j}`).innerHTML += `
                    <p>- ${team.name}</p>`;

  			// team.goalDifference = team.goalsFor - team.goalsAgainst;

  			if (team.goalDifference > 0) {
  				team.goalDifferenceSign = '+';
  			} else {
  				team.goalDifferenceSign = '';
  			}

  			document.getElementById(`${event.id}_event_ranking_${j}`).innerHTML += `
                    <tr>
                      	<td class="p-1 border border-dark">${team.rank}</td>
                      	<td class="p-1 border border-dark text-start">${team.name}</td>
                      	<td class="p-1 border border-dark">${team.points}</td>
                      	<td class="p-1 border border-dark">${team.matches}</td>
                      	<td class="p-1 border border-dark">${team.victories}</td>
                      	<td class="p-1 border border-dark">${team.draws}</td>
                      	<td class="p-1 border border-dark">${team.defeats}</td>
                      	<td class="p-1 border border-dark">${team.goalsFor}</td>
                      	<td class="p-1 border border-dark">${team.goalsAgainst}</td>
                      	<td class="p-1 border border-dark">${team.goalDifferenceSign}${team.goalDifference}</td>
                    </tr>`;
  		});
    });

  	if (event.rankingMatches !== undefined) {
  		document.getElementById(`${event.id}_event_content`).innerHTML += `
				<h2 class="mt-4 mb-3">Matchs de classement</h2>

				<h3 class="mt-4 mb-3">Matchs</h3>
	  			<table class="text-center w-100">
	  				<thead>		
	                    <tr>
	                      	<th class="p-1 border border-dark">Équipe A</th>
	                      	<th class="p-1 border border-dark">Score</th>
	                      	<th class="p-1 border border-dark">Équipe B</th>
	                    </tr>
	  				</thead>

	  				<tbody id="${event.id}_event_ranking_matches_${i}">
	  					
	  				</tbody>
	  			</table>

	  			<h3 class="mt-4 mb-3">Classement final</h3>
	  			<table class="text-center w-100">
	  				<thead>		
	                    <tr>
	                      	<th class="p-1 border border-dark">Rang</th>
	                      	<th class="p-1 border border-dark">Équipe</th>
	                    </tr>
	  				</thead>

	  				<tbody id="${event.id}_event_final_ranking_${i}">
	  					
	  				</tbody>
	  			</table>`;

	  	finalRanking = [];

	  	matchRanking = [];

	  	k = 0;
  		event.rankingMatches.forEach((match) => {
	        matchRanking.push([]);

  			if (match.certainty !== 'certain') {
  				match.certaintyStyle = 'italic';
  				match.certaintyText = '?';
  			} else {
  				match.certaintyStyle = 'normal';
  				match.certaintyText = '';
  			}

  			document.getElementById(`${event.id}_event_ranking_matches_${i}`).innerHTML += `
                    <tr>
                      	<td class="p-1 border border-dark">${match.teamA}</td>
                      	<td class="p-1 border border-dark fst-${match.certaintyStyle}">${match.scoreA} - ${match.scoreB} ${match.certaintyText}</td>
                      	<td class="p-1 border border-dark">${match.teamB}</td>
                    </tr>`;

	        event.groups.forEach((eventGroup) => {
	        	eventGroupRanking = eventGroup.ranking.find((eventGroupTeam) => {
	        		return eventGroupTeam.rank === k + 1;
	        	});

	        	matchRanking[k].push(eventGroupRanking);
	        });

	        if (match.scoreA === match.scoreB) {
				matchRanking[k].sort((a, b) => {
					return a.points < b.points ? 1 : a.points > b.points ? -1 :
						(a.goalsFor - a.goalsAgainst) < (b.goalsFor - b.goalsAgainst) ? 1 :
						(a.goalsFor - a.goalsAgainst) > (b.goalsFor - b.goalsAgainst) ? -1 :
						a.goalsFor < b.goalsFor ? 1 : a.goalsFor > b.goalsFor ? -1 : 0;
				})
				
	        	matchRanking[k][0].finalRank = matchRanking[k][0].rank * 2 - 1;
	        	matchRanking[k][1].finalRank = matchRanking[k][1].rank * 2;
	        }
			else if (match.scoreA > match.scoreB) {
	        	matchRanking[k][0].finalRank = matchRanking[k][0].rank * 2 - 1;
	        	matchRanking[k][1].finalRank = matchRanking[k][1].rank * 2;
	        }
	        else {
	        	matchRanking[k][0].finalRank = matchRanking[k][0].rank * 2;
	        	matchRanking[k][1].finalRank = matchRanking[k][1].rank * 2 - 1;
	        }

	        finalRanking.push(matchRanking[k][0]);
	        finalRanking.push(matchRanking[k][1]);

	        k += 1;
  		});

	    finalRanking.sort((a, b) => {
	    	return a.finalRank > b.finalRank ? 1 : a.finalRank < b.finalRank ? -1 : 0;
	    });

	    finalRanking.forEach((team) => {
	    	document.getElementById(`${event.id}_event_final_ranking_${i}`).innerHTML += `
	    			<tr>
                      	<td class="p-1 border border-dark">${team.finalRank}</td>
                      	<td class="p-1 border border-dark">${team.name}</td>
                    </tr>`
	    });
  	}
});
// End Tournaments